import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';
import AdmZip from 'adm-zip';
import { tmpdir } from 'os';
import { join } from 'path';
import https from 'https';
import { createWriteStream, readdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export async function downloadAndExtractRepo(url: string, token: string): Promise<string> {
  const parsedUrl = new URL(url);
  const octokit = new Octokit({
    auth: `token ${token}`,
    baseUrl: `${parsedUrl.protocol}//api.${parsedUrl.host}`
  });

  // Get the primary branch name
  const [owner, repo] = url.split('/').slice(3, 5);
  const repoData = await octokit.repos.get({
    owner,
    repo
  });
  const branchName = repoData.data.default_branch;

  // Get the URL to download the ZIP file of the primary branch
  const response = await octokit.repos.downloadZipballArchive({
    owner,
    repo,
    ref: branchName
  });
  const zipUrl = response.url;

  // Download the ZIP file
  const tmpDir = tmpdir();
  const zipPath = join(tmpDir, 'repo.zip');
  const response2 = await fetch(zipUrl, {
    agent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  const stream = response2.body.pipe(createWriteStream(zipPath));
  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  // Extract the ZIP file to a temporary directory
  const extractPath = join(tmpDir, `repo-${uuidv4()}`);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(extractPath, true);

  // Find the extracted repository directory
  const files = readdirSync(extractPath);
  const repoDir = files.find(file => file.startsWith(`${owner}-${repo}`));
  if (!repoDir) {
    throw new Error(`Could not find extracted repository directory for ${owner}/${repo}`);
  }

  return join(extractPath, repoDir);
}

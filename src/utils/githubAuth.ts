import { dialog, safeStorage } from 'electron';

export async function getAuthorizationLink(repositoryUrl: string): Promise<string | null> {
  const url = new URL(repositoryUrl);
  const server = url.origin;

  const tokenKey = `${server}-token`;
  const encryptedToken = localStorage.getItem(tokenKey);
  if (encryptedToken) {
    const token = safeStorage.decryptString(Buffer.from(encryptedToken, 'hex'));
    console.log(`Already authorized for server: ${server}`);
    return null;
  }

  let clientId = safeStorage.decryptString(Buffer.from(localStorage.getItem('clientId') || '', 'hex'));
  if (!clientId) {
    clientId = await promptForClientId();
    const encryptedClientId = safeStorage.encryptString(clientId).toString('hex');
    localStorage.setItem('clientId', encryptedClientId);
  }

  const redirectUri = `graphql-diagram://oauth/callback/${Buffer.from(server).toString('base64')}`; // Replace with your redirect URI
  const scope = "repo,gist,public_repo,repo:status,repo_deployment,write:discussion"; // This scope requests read/write access to repos, gists, and PRs

  const authorizationUrl = `${server}/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  return authorizationUrl;
}

async function promptForClientId(): Promise<string> {
  const result = await dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    title: 'Enter Client ID',
    message: 'Please enter your GitHub OAuth Client ID:',
    input: {
      type: 'input',
      placeholder: 'Enter Client ID'
    }
  });

  if (!result.response) {
    throw new Error('Client ID is required');
  }

  return result.input;
}

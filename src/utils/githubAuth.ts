const { clientIDs } = window.electron;

export function getAuthorizationLink(repositoryUrl: string): string | null {
  const url = new URL(repositoryUrl);
  const server = url.origin;

  if (!clientIDs[server]) {
    throw new Error(`No client ID configured for ${server}`);
  }
  const clientId = clientIDs[server].id;
  const redirectUri = `graphql-diagram://oauth/callback/${Buffer.from(repositoryUrl).toString('base64')}`; // Replace with your redirect URI
  const scope = "repo,gist,public_repo,repo:status,repo_deployment,write:discussion"; // This scope requests read/write access to repos, gists, and PRs
  const authorizationUrl = `${server}/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  return authorizationUrl;
}

export async function getAccessToken(code: string, repositoryUrl: string): Promise<string> {
  const url = new URL(repositoryUrl);
  const server = url.origin;
  
  if (!clientIDs[server]) {
    throw new Error(`No client ID configured for ${server}`);
  }
  const clientId = clientIDs[server].id;
  const clientSecret = clientIDs[server].secret;

  const response = await fetch(`${server}/login/oauth/access_token`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Couldn\'t authenticate with GitHub. Please check your client ID and secret.');
    }
  }

  const data = await response.json();
  if (!data.access_token) {
    if (data.error && data.error === 'bad_verification_code') {
      // code has expired renew it
      const authorizationUrl = getAuthorizationLink(repositoryUrl);
      if (authorizationUrl) {
        window.location.href = authorizationUrl;
      }
    }
  } 
  return data.access_token;
}
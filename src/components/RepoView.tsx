import React, { FC } from 'react';
import { getAccessToken } from '../utils/githubAuth';
import { updateRepositories } from '../utils/repositories';
import { GraphQLSchema } from 'graphql';

export type RepoViewProps = {
  repository: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const RepoView: FC<RepoViewProps> = ({ repository }) => {
  const [accessToken, setAccessToken] = React.useState('');
  const [repoPath, setRepoPath] = React.useState('');
  const [schema, setSchema] = React.useState({} as GraphQLSchema);
    
  React.useEffect(() => {
    window.electron.onGithubAuthenticated(async (event: any, { server, code }: { server: string, code: string }) => {
      if (server === repository) {
        updateRepositories({ server, code, accessToken: null });
        const token = await getAccessToken(code, server);
        updateRepositories({ server, code, accessToken: token });
        setAccessToken(token);
      }
    });
    const getAccessTokenFromUrl = async () => {
      const repositories = JSON.parse(window.localStorage.getItem('repositories')) || [];
      const repo = repositories.find((repo: { code: string, server: string }) => repo.server === repository);
      if (repo?.accessToken) {
        setAccessToken(repo.accessToken);
      } else {
        if (repo?.code) {
          const token = await getAccessToken(repo.code, repository);
          updateRepositories({ server: repository, code: repo.code, accessToken: token });
          setAccessToken(token);
        }
      }
    };
    getAccessTokenFromUrl();
  }, []);

  React.useEffect(() => {
    const downloadRepo = async () => {
      const repoPath = await window.electron.downloadAndExtractRepo(repository, accessToken);
      setRepoPath(repoPath);
      const loadedSchema = await window.electron.loadSchema(repoPath);
      setSchema(loadedSchema);
    };

    downloadRepo();
  }, [accessToken]);
    
  return (
    <div>
      <h1>RepoView</h1>
      Access Token: { accessToken }<br/>
      Repository Directory: { repoPath}
      Schema: { JSON.stringify(schema) }
    </div>
  );
};

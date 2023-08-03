import React, { useState, useEffect, FC } from 'react';
import { ButtonType, Button } from './Button';
import { RepoList } from './RepoList';
import { Input } from './Input';
import { getAuthorizationLink } from '../utils/githubAuth';
import { Repository, updateRepositories } from '../utils/repositories';

export type RepositoryListProps = {
  onOpen: (repository: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const RepositoryList: FC<RepositoryListProps> = ({ onOpen }) => {
  const [repositories, setRepositories] = useState(JSON.parse(window.localStorage.getItem('repositories') || '[]') as [Repository]);
  const [addRepoVisible, setAddRepoVisible] = useState(false);
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('');

  useEffect(() => {
    const storedRepositories = window.localStorage.getItem('repositories');
    if (storedRepositories) {
      setRepositories(JSON.parse(storedRepositories));
    }
    window.electron.onGithubAuthenticated((event: any, { server, code }: { server: string, code: string }) => {
      const newRepositories = updateRepositories({ server, code, accessToken: null });
      setRepositories(newRepositories);
    });
  }, []);

  const isUrlValid = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const verifyUrlExists = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      } else {
        console.error(response);
      }
    }
    catch (e) {
      console.error(e);
    }
    return false;
  };

  const addNewUrl = async (url: string) => {
    if (await verifyUrlExists(url)) {
      const link = await getAuthorizationLink(url);
      setNewRepoUrl('');
      setAddRepoVisible(false);
      window.location.href = link;
    }
  };

  const deleteRepository = (repository: string) => {
    const newRepositories = repositories.filter((repo) => repo.server !== repository);
    window.localStorage.setItem('repositories', JSON.stringify(newRepositories));
    setRepositories(newRepositories as [Repository]);
  };

  return (
    <div className="grid place-items-center w-full h-full bg-[#f8fafc] p-6 border border-blue-grey-50 scroll-mt-48 overflow-x-scroll lg:overflow-visible">
      <div className="p-2 flex mb-0 bg-white lg:w-2/5 shadow-xl rounded-lg bg-clip-border min-h-[40%]">
          <div className="relative flex flex-col flex-1 p-3 min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" style={{ display: !addRepoVisible ? 'flex' : 'none' }}>
            <div className="flex-1 min-w-0 ">
              <RepoList repositories={repositories.map(repo => repo.server)} selectedRepository={selectedRepo} onSelectionChange={(repository: string) => { setSelectedRepo(repository); }} onDelete={deleteRepository} />
            </div>
          <div className="flex flex-row min-w-full">
            <div className="flex flex-1 justify-center">
              <Button type={ButtonType.Secondary} onClick={() => setAddRepoVisible(true)}>Add</Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button disabled={ selectedRepo === '' } onClick={() => onOpen(selectedRepo)}>Open</Button>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col flex-1 p-3 min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" style={{ display: addRepoVisible ? 'flex' : 'none' }}>
          <div className="flex-1 min-w-0">
            <Input placeholder="Repository URL" onChange={(e: React.FormEvent<HTMLInputElement>) => setNewRepoUrl(e.currentTarget.value)} value={newRepoUrl} />
          </div>
          <div className="flex flex-row min-w-full">
            <div className="flex flex-1 justify-center">
              <Button type={ButtonType.Secondary} onClick={() => setAddRepoVisible(false)}>Back</Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button disabled={ !isUrlValid(newRepoUrl) } onClick={async () => { await addNewUrl(newRepoUrl); }}>Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
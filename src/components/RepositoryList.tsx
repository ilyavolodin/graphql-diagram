import React, { useState, useEffect } from 'react';
import { ButtonType, Button } from './Button';
import { RepoList } from './RepoList';
import { Input } from './Input';

export const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [addRepoVisible, setAddRepoVisible] = useState(false);
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [authLink, setAuthLink] = useState('');

  useEffect(() => {
    const storedRepositories = window.localStorage.getItem('repositories');
    if (storedRepositories) {
      setRepositories(JSON.parse(storedRepositories));
    }
    window.electron.onGithubAuthenticated((event: any, { server, code }: { server: string, code: string }) => {
      console.log(server, code);
      setAuthToken(code);
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
    const newRepositories = [...repositories, url];
    //setAuthLink(await getAuthorizationLink(url));
    window.localStorage.setItem('repositories', JSON.stringify(newRepositories));
    setNewRepoUrl('');
    setRepositories(newRepositories);
    setAddRepoVisible(false);
  };

  return (
    <div className="grid place-items-center w-full h-full bg-[#f8fafc] p-6 border border-blue-grey-50 scroll-mt-48 overflow-x-scroll lg:overflow-visible">
      <div className="p-2 flex mb-0 bg-white lg:w-2/5 shadow-xl rounded-lg bg-clip-border min-h-[40%]">
          <div className="relative flex flex-col flex-1 p-3 min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" style={{ display: !addRepoVisible ? 'flex' : 'none' }}>
            <div className="flex-1 min-w-0 ">
              <RepoList repositories={repositories} selectedRepository={selectedRepo} onSelectionChange={(repository: string) => { setSelectedRepo(repository); }} />
            </div>
          <div className="flex flex-row min-w-full">
            <div className="flex flex-1 justify-center">
              <Button type={ButtonType.Secondary} onClick={() => setAddRepoVisible(true)}>Add</Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button disabled={ selectedRepo === '' }>Open</Button>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col flex-1 p-3 min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border" style={{ display: addRepoVisible ? 'flex' : 'none' }}>
          <div className="flex-1 min-w-0">
            <Input placeholder="Repository URL" onChange={(e: React.FormEvent<HTMLInputElement>) => setNewRepoUrl(e.currentTarget.value)} />
          </div>
          <div className="flex flex-row min-w-full">
            <div className="flex flex-1 justify-center">
              <Button type={ButtonType.Secondary} onClick={() => setAddRepoVisible(false)}>Back</Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button disabled={ !isUrlValid(newRepoUrl) } onClick={async () => {if (await verifyUrlExists(newRepoUrl)) { await addNewUrl(newRepoUrl); }}}>Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
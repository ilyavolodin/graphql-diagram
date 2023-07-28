import React, { useState, useEffect } from 'react';
import { ButtonType, Button } from './Button';
import { Input } from './Input';

export const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [addRepoVisible, setAddRepoVisible] = useState(false);
  useEffect(() => {
    const storedRepositories = window.localStorage.getItem('repositories');
    if (storedRepositories) {
      setRepositories(JSON.parse(storedRepositories));
    }
  }, []);

  return (
    <div className="grid place-items-center w-full h-full bg-[#f8fafc] p-6 border border-blue-grey-50 rounded-lg scroll-mt-48 overflow-x-scroll lg:overflow-visible">
      <div className="p-2 flex mb-0 bg-white lg:w-2/5 shadow-xl bg-clip-border min-h-[40%]" style={{ display: !addRepoVisible ? 'flex' : 'none' }}>
          <div className="relative flex flex-col flex-1 p-3 min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
            <div className="flex-1 min-w-0">
            {repositories.length <= 0 ? (
              <span className="text-gray-500">No repositories</span>
            ) : (
                <ul>
                {repositories.map((repository) => (
                    <li key={repository}>{repository}</li>
                ))}
                </ul>
            )}
            </div>
          <div className="flex flex-row min-w-full">
            <div className="flex flex-1 justify-center">
              <Button type={ButtonType.Secondary} onClick={() => setAddRepoVisible(true)}>Add</Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button disabled={ repositories.length <= 0 }>Open</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 flex mb-0 bg-white lg:w-2/5 shadow-xl bg-clip-border min-h-[40%]" style={{ display: addRepoVisible ? 'flex' : 'none' }}>
        <div className="relative flex flex-col flex-1 p-3 min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="flex-1 min-w-0">
            <Input placeholder="Repository URL" />
          </div>
          <div className="flex flex-row min-w-full">
          </div>
        </div>
      </div>
    </div>
  );
};
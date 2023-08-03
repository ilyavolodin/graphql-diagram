import React, { useState } from 'react';
import { RepositoryList } from './components/RepositoryList';
import { RepoView } from './components/RepoView';

export const Main = () => {
  const [repo, setRepo] = useState('');

  return (
    <>
      { !repo
        ?
          <RepositoryList onOpen={(repository) => setRepo(repository)} />
        :
          <RepoView repository={repo} />
      }
    </>
  );
};

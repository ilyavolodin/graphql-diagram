import React, { useState } from 'react';

export type RepoListProps = {
  repositories: string[];
  selectedRepository?: string;
  onSelectionChange?: (repository: string) => void;
  onDelete?: (repository: string) => void;
} & React.HTMLAttributes<HTMLInputElement>;

export const RepoList = ({ repositories, selectedRepository='', onSelectionChange, onDelete }: RepoListProps) => {
  const [selectedRepo, setSelectedRepo] = useState(selectedRepository);

  const handleSelectionChange = (repository: string) => {
    console.log(repository, selectedRepo);
    if (selectedRepo !== repository) {
      setSelectedRepo(repository);
      onSelectionChange(repository);
    } else {
      setSelectedRepo('');
      onSelectionChange('');
    }
  };

  return (
    <>
      { repositories.length <= 0 ? (
        <span className="text-gray-500">No repositories</span>
        ) : (
        <ul className="list-inside list-image-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNCAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjMzhiZGY4Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy42ODUuMTUzYS43NTIuNzUyIDAgMCAxIC4xNDMgMS4wNTJsLTggMTAuNWEuNzUuNzUgMCAwIDEtMS4xMjcuMDc1bC00LjUtNC41YS43NS43NSAwIDAgMSAxLjA2LTEuMDZsMy44OTQgMy44OTMgNy40OC05LjgxN2EuNzUuNzUgMCAwIDEgMS4wNS0uMTQzWiIgLz48L3N2Zz4=')]">
          {repositories.map((repository) => (
            <li
              key={repository}
              className="leading-normal text-sm border-b border-grey-200 p-2 bg-transparent transition-all hover:scale-102 hover:shadow-soft-xs truncate cursor-pointer"
              style={{ listStyle: selectedRepo === repository ? 'inherit' : 'none'}}>
                <div className="flex flex-row items-center">
                  <span className="flex-1" onClick={() => handleSelectionChange(repository)}>{repository}</span>
                  <button alert-close type="button" className="flex-0 box-content text-sm text-white bg-transparent border-0 rounded w-4 h-4 z-2">
                    <span aria-hidden="true" className="text-center cursor-pointer">&#10005;</span>
                  </button>
                </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
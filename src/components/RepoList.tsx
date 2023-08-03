import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

export type RepoListProps = {
  repositories: string[];
  selectedRepository?: string;
  onSelectionChange?: (repository: string) => void;
  onDelete?: (repository: string) => void;
} & React.HTMLAttributes<HTMLInputElement>;

export const RepoList = ({ repositories, selectedRepository='', onSelectionChange, onDelete }: RepoListProps) => {
  const [selectedRepo, setSelectedRepo] = useState(selectedRepository);

  const handleSelectionChange = (repository: string) => {
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
        <ul>
          {repositories.map((repository) => (
            <li
              key={repository}
              className="leading-normal px-2 text-sm border-b border-grey-200 bg-transparent transition-all hover:scale-102 hover:shadow-soft-xs truncate cursor-pointer">
                <div className="flex flex-row items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2 flex-0" style={{ visibility: selectedRepo === repository ? 'visible' : 'hidden'}} />
                  <span className="flex-1 py-2" onClick={() => handleSelectionChange(repository)}>{repository}</span>
                  <button type="button" className="flex-0 box-content text-sm text-white bg-transparent border-0" onClick={() => onDelete(repository)}>
                    <FontAwesomeIcon icon={faXmark} className="text-gray-700 p-2 hover:text-red-400" />
                  </button>
                </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
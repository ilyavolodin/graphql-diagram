export type Repository = {
  server: string,
  code: string,
  accessToken: string | null
};

export const updateRepositories = (newRepository: Repository) => {
  const repositories = JSON.parse(localStorage.getItem('repositories') || '[]');
  const index = repositories.findIndex((repository: { server: string }) => repository.server === newRepository.server);
  if (index === -1) {
    repositories.push(newRepository);
  } else {
    repositories[index] = {...repositories[index], ...newRepository};
  }
  localStorage.setItem('repositories', JSON.stringify(repositories));
  return repositories;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks: number;
  language: string;
  topics?: string[];
}

export type GithubResponse = {
  total: number;
  items: GithubRepo[];
};

export type SearchQuery = {
  query: string;
  languages?: string;
  minFollowers?: number;
  minStars?: number;
  sortBy?: "stars" | "forks";
};

export type SearchResult = {
  createdAt: Date;
  query: SearchQuery;
  response: GithubResponse;
};

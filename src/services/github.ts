import { GithubRepo, SearchQuery, SearchResult } from "../types";
import { SearchHistoryStorage } from "./storage";

export const searchRepositories = async (
  params: SearchQuery
): Promise<SearchResult> => {
  const queryParts = [
    `${encodeURIComponent(params.query)}+in:name,description,topics,readme`,
  ];

  if (params.languages) {
    queryParts.push(`language:${params.languages}`);
  }

  if (params.minStars) {
    queryParts.push(`stars:>=${params.minStars}`);
  }

  if (params.minFollowers) {
    queryParts.push(`followers:>=${params.minFollowers}`);
  }

  let url = `https://api.github.com/search/repositories?q=${queryParts.join(
    "+"
  )}&per_page=10`;

  if (params.sortBy) {
    url += `&sort=${params.sortBy}`;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("failed to fetch from github api");

    const data = (await res.json()) as {
      total_count: number;
      items: GithubRepo[];
    };

    const result = {
      createdAt: new Date(),
      query: params,
      response: {
        total: data.total_count,
        items: data.items,
      },
    };

    SearchHistoryStorage.saveResult(result);

    return result;
  } catch (e) {
    console.error(e);
    return Promise.reject("Could not retrieve repositories");
  }
};

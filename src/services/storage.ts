import { SearchResult } from "../types";

const STORAGE_KEY = "githubSearchHistory";

function load(): SearchResult[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as SearchResult[];

    return parsed.map((entry) => ({
      ...entry,
      createdAt: new Date(entry.createdAt),
    }));
  } catch (err) {
    console.error("Failed to parse local storage:", err);
    return [];
  }
}

function save(results: SearchResult[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export const SearchHistoryStorage = {
  saveResult(result: SearchResult) {
    const history = load();
    history.unshift(result);
    save(history);
  },

  getAllResults(): SearchResult[] {
    return load();
  },
};

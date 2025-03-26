import { SearchResult } from "../types";

const STORAGE_KEY = "githubSearchHistory";

function loadFromLocalStorage(): SearchResult[] {
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

export const StorageService = {
  saveResult(result: SearchResult) {
    const history = loadFromLocalStorage();
    history.unshift(result);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  },

  getResults(): SearchResult[] {
    return loadFromLocalStorage();
  },
};

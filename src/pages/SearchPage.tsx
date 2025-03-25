import { useCallback, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { searchRepositories } from "../services/github";
import { SearchQuery, SearchResult } from "../types";
import { Card } from "../components/Card";
import { SearchResultCard } from "../components/SearchResultCard";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<SearchQuery | null>(null);

  const handleSearch = useCallback(async (query: SearchQuery) => {
    setIsLoading(true);
    setError(null);
    setLastQuery(query);

    try {
      const result = await searchRepositories(query);
      setResult(result);
    } catch (err) {
      setError(typeof err === "string" ? err : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-8">
      <Card className="bg-slate-50 rounded-2xl p-8  flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          🔍 Search GitHub Repositories
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isLoading}></SearchBar>

        {error && (
          <div className="text-red-600 bg-red-100 px-4 py-2 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}
      </Card>

      {result && result.response.items?.length > 0 && lastQuery && (
        <SearchResultCard result={result} open />
      )}
    </div>
  );
}

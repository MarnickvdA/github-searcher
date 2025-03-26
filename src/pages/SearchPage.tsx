import { useCallback, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SearchQuery, SearchResult } from "../types";
import { Card } from "../components/Card";
import { SearchResultCard } from "../components/SearchResultCard";
import { GithubService } from "../services/github";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (query: SearchQuery, onSuccess: () => void) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await GithubService.queryRepositories(query);
        setResult(result);
        onSuccess();
      } catch (err) {
        setError(typeof err === "string" ? err : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <>
      <Card className="bg-slate-50 rounded-2xl p-8  flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          🔍 Search GitHub Repositories
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isLoading}></SearchBar>

        {error && (
          <div className="text-red-600 bg-red-100 px-4 py-2 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}
      </Card>

      {result && result.response.items?.length > 0 && (
        <SearchResultCard result={result} open />
      )}
    </>
  );
}

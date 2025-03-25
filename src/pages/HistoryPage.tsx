import { SearchResultCard } from "../components/SearchResultCard";
import { SearchHistoryStorage } from "../services/storage";

export default function HistoryPage() {
  const results = SearchHistoryStorage.getAllResults();

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-gray-800">
        🔍 Search History
      </h1>

      {results.map((result, i) => (
        <SearchResultCard key={i} result={result} open={false} />
      ))}
    </div>
  );
}

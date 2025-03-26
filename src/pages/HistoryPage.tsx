import { SearchResultCard } from "../components/SearchResultCard";
import { StorageService } from "../services/storage";

export default function HistoryPage() {
  const results = StorageService.getResults();

  return (
    <>
      <h1 className="text-2xl font-semibold text-slate-800">
        🔍 Search History
      </h1>

      {results.map((result, i) => (
        <SearchResultCard key={i} result={result} open={false} />
      ))}
    </>
  );
}

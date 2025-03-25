import { SearchResult } from "../types";
import { Card } from "./Card";

export const SearchResultCard = ({
  result,
  open = false,
}: {
  result: SearchResult;
  open: boolean;
}) => {
  return (
    <Card className="space-y-4">
      <details open={open} className="group">
        <summary className="list-none cursor-pointer flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              🚀 Showing top {Math.min(result.response.items.length, 10)}{" "}
              results{" "}
              {result.response.total > 10
                ? `of ${result.response.total} search results`
                : ""}
            </h2>

            <p className="text-sm text-gray-600">
              At {result.createdAt.toLocaleString()}, we executed the query for{" "}
              <b>"{result.query.query}"</b>
              {result.query.languages && (
                <>
                  {" "}
                  in <b>{result.query.languages}</b>
                </>
              )}
              {result.query.minStars && (
                <>
                  {" "}
                  with at least <b>{result.query.minStars} ⭐'s</b>
                </>
              )}
              {result.query.minFollowers && (
                <>
                  {" "}
                  and at least <b>{result.query.minFollowers} followers 👥</b>
                </>
              )}
              {result.query.sortBy && (
                <>
                  , sorted by <b>{result.query.sortBy}</b> in descending order
                </>
              )}
            </p>
          </div>
          <svg
            className="size-8 text-gray-600 transition-transform duration-300 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        <ul className="divide-y divide-gray-200">
          {result.response.items.map((entry) => (
            <li key={entry.id} className="py-3">
              <a
                href={entry.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {entry.name}
              </a>
              <p className="text-sm text-gray-600">{entry.description}</p>
              <div className="text-xs text-gray-500 mt-1">
                ⭐ {entry.stargazers_count} | 🍴 {entry.forks} |{" "}
                {entry.language}
              </div>
            </li>
          ))}
        </ul>
      </details>
    </Card>
  );
};

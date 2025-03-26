import { SearchResult } from "../types";
import { Card } from "./Card";

export const SearchResultCard = ({
  result,
  open = false,
}: {
  result: SearchResult;
  open: boolean;
}) => {
  const queryFilters = [
    result.query.languages,
    result.query.minStars && `${result.query.minStars}+ ⭐`,
    result.query.minFollowers && `${result.query.minFollowers}+ 👥`,
    result.query.sortBy && `sorted by "${result.query.sortBy}"`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="space-y-4">
      <details open={open} className="group">
        <summary className="list-none cursor-pointer flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-400">
              {new Date(result.createdAt).toLocaleString()}
            </span>
            <h2 className="text-xl font-semibold text-slate-800">
              "{result.query.query}"
            </h2>
            {queryFilters && (
              <p className="text-sm text-slate-500">{queryFilters}</p>
            )}
          </div>
          <svg
            className="size-8 min-w-8 text-slate-600 transition-transform duration-300 group-open:rotate-180"
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

        <ul className="divide-y mt-8 border-t border-t-slate-200 divide-slate-200">
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
              <p className="text-sm text-slate-600">{entry.description}</p>
              <div className="text-xs text-slate-500 mt-1">
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

import { useState } from "react";
import { z } from "zod";
import { SearchQuery } from "../types";

export type SearchBarProps = {
  onSearch: (query: SearchQuery, onSuccess: () => void) => void;
  isLoading: boolean;
};

const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  languages: z.string().optional(),
  minFollowers: z.coerce.number().optional(),
  minStars: z.coerce.number().optional(),
  sortBy: z.enum(["stars", "forks"]).optional(),
});

const initialFormState: SearchQuery = {
  query: "",
  languages: undefined,
  minFollowers: undefined,
  minStars: undefined,
  sortBy: undefined,
};

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [form, setForm] = useState<SearchQuery>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedForm: SearchQuery = {
      ...form,
      minStars: form.minStars ? Number(form.minStars) : undefined,
      minFollowers: form.minFollowers ? Number(form.minFollowers) : undefined,
    };

    const result = searchSchema.safeParse(parsedForm);

    if (!result.success) {
      setError("Please fill in the required fields correctly.");
      return;
    }

    const resetFormValues = () => setForm(initialFormState);
    onSearch(result.data, resetFormValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="query"
              className="block text-sm font-medium text-slate-700"
            >
              Search Query<span className="text-red-500">*</span>
            </label>
            <input
              id="query"
              type="text"
              className="mt-1 w-full p-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              value={form.query}
              onChange={handleChange}
              placeholder="e.g. chat, AI, open source"
              required
            />
          </div>

          <div>
            <label
              htmlFor="minStars"
              className="block text-sm font-medium text-slate-700"
            >
              Minimum Stars
            </label>
            <input
              id="minStars"
              type="number"
              min={0}
              className="mt-1 w-full p-2 rounded-lg border border-slate-200 ring-slate-200 focus:border-blue-500 focus:ring-blue-500"
              value={form.minStars ?? ""}
              onChange={handleChange}
              placeholder="e.g. 100"
            />
          </div>

          <div>
            <label
              htmlFor="minFollowers"
              className="block text-sm font-medium text-slate-700"
            >
              Minimum Followers
            </label>
            <input
              id="minFollowers"
              type="number"
              min={0}
              className="mt-1 w-full p-2 rounded-lg border border-slate-200 ring-slate-200 focus:border-blue-500 focus:ring-blue-500"
              value={form.minFollowers ?? ""}
              onChange={handleChange}
              placeholder="e.g. 50"
            />
          </div>

          <div>
            <label
              htmlFor="languages"
              className="block text-sm font-medium text-slate-700"
            >
              Languages
            </label>
            <input
              id="languages"
              type="text"
              className="mt-1 w-full p-2 rounded-lg border border-slate-200 ring-slate-200 focus:border-blue-500 focus:ring-blue-500"
              value={form.languages}
              onChange={handleChange}
              placeholder="e.g. javascript"
            />
          </div>

          <div className="">
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-slate-700"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              className="mt-1 w-full p-2 rounded-lg border border-slate-200 ring-slate-200 focus:border-blue-500 focus:ring-blue-500"
              value={form.sortBy ?? ""}
              onChange={handleChange}
            >
              <option value="">Best Match</option>
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </fieldset>
    </form>
  );
};

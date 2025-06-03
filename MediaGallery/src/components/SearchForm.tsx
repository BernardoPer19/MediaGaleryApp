import React, { useState } from "react";
import { useSearch } from "../context/SearchContext";

function SearchForm() {
  const { setQuery,query } = useSearch();
  const [input, setInput] = useState("");
  console.log(input,query);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setQuery(input.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search beautiful images..."
          aria-label="Search images"
          className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-semibold transition-colors"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchForm;

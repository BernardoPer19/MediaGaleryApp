import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearch } from "../../context/SearchContext";

function NavBar() {
  const navigate = useNavigate();
  const { setQuery } = useSearch();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setQuery(searchInput);
    navigate("/search");
    setSearchInput("");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-gray-800">
        FreeLanceGram
      </Link>

      <nav className="space-x-4 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/topic/nature" className="hover:text-blue-500">
          Nature
        </Link>

        <Link to="/topic/wallpapers" className="hover:text-blue-500">
          Wallpapers
        </Link>

        <Link to="/topic/renderes-3D" className="hover:text-blue-500">
          Renderes-3D
        </Link>

        <Link to="/topic/textures" className="hover:text-blue-500">
          Textures
        </Link>

        <Link to="/topic/travel" className="hover:text-blue-500">
          Travel
        </Link>

        <Link to="/topic/movies" className="hover:text-blue-500">
          Movies
        </Link>
        <Link to="/topic/architect" className="hover:text-blue-500">
          Architect
        </Link>
      </nav>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search photos..."
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Search
        </button>
      </form>
    </header>
  );
}

export default NavBar;

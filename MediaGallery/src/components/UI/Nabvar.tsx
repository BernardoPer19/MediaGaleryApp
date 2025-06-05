import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { useAuthContext } from "../../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { setQuery } = useSearch();
  const { isAuthenticated, logout, user } = useAuthContext();

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setQuery(searchInput);
    navigate("/search");
    setSearchInput("");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-black hover:text-gray-700"
        >
          FreeLanceGram
        </Link>

        {/* Links */}
        <nav className="hidden md:flex space-x-6 text-gray-900 font-medium text-sm">
          <Link to="/" className="hover:text-gray-600 transition">
            Home
          </Link>
          <Link to="/topic/nature" className="hover:text-gray-600 transition">
            Nature
          </Link>
          <Link to="/topic/wallpapers" className="hover:text-gray-600 transition">
            Wallpapers
          </Link>
          <Link to="/topic/renderes-3D" className="hover:text-gray-600 transition">
            Renderes-3D
          </Link>
          <Link to="/topic/textures" className="hover:text-gray-600 transition">
            Textures
          </Link>
          <Link to="/topic/travel" className="hover:text-gray-600 transition">
            Travel
          </Link>
          <Link to="/topic/movies" className="hover:text-gray-600 transition">
            Movies
          </Link>
          <Link to="/topic/architect" className="hover:text-gray-600 transition">
            Architect
          </Link>
        </nav>

        {/* Search + Auth Buttons */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search photos..."
              className="border border-black rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 text-sm transition"
            >
              Search
            </button>
          </form>

          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-black">
                Hola, <strong>{user?.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded text-sm transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <div className="space-x-3 text-sm font-medium">
              <Link
                to="/login"
                className="px-3 py-1 rounded border border-black text-black hover:bg-black hover:text-white transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800 transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;

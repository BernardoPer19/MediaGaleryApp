import PhotoLists from "../components/PhotoLists";
import { useSearch } from "../context/SearchContext";

function SearchPage() {
  const { query } = useSearch();

  return <PhotoLists currentQuery={query} />;
}

export default SearchPage;

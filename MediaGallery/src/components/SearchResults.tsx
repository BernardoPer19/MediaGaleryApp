import { useSearch } from "../context/SearchContext";
import PhotoCard from "./PhotoCard";
import Loader from "./Loader";
import { useSearchImages } from "../hooks/useSearchImg";

function SearchResults() {
  const { query } = useSearch();
  const { data, isLoading, isError } = useSearchImages(query);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-red-500 text-center">Error cargando resultados.</p>
    );

  return (
    <section className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4 space-y-4">
      {data?.results.map((img) => (
        <div key={img.id} className="break-inside-avoid">
          <PhotoCard img={img} />
        </div>
      ))}
    </section>
  );
}

export default SearchResults;

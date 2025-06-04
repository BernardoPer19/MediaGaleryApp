import { useEffect, useRef, useCallback } from "react";
import PhotoCard from "./PhotoCard";
import Loader from "./UI/Loader";
import { useImagesFull } from "../hooks/useApi";

interface PhotoListsProps {
  currentQuery: string;
}

function PhotoLists({ currentQuery }: PhotoListsProps) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useImagesFull(currentQuery); // 👈 Usamos el query dinámico

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const handleFetchNext = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!observerRef.current) return;

    if (observerInstance.current) observerInstance.current.disconnect();

    observerInstance.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleFetchNext();
        }
      },
      { threshold: 1 }
    );

    observerInstance.current.observe(observerRef.current);

    return () => {
      observerInstance.current?.disconnect();
    };
  }, [handleFetchNext]);

  return (
    <section
      className="columns-2 sm:columns-2 md:columns-3 gap-4 p-4 space-y-4 max-w-[1480px] m-auto md:m-auto"
      aria-live="polite"
      aria-busy={isLoading || isFetchingNextPage}
    >
      {data?.pages.map((page) =>
        page.results.map((img) => (
          <div key={img.id} className="break-inside-avoid">
            <PhotoCard img={img} />
          </div>
        ))
      )}

      <div ref={observerRef} className="h-10" />

      {(isLoading || isFetchingNextPage) && <Loader />}

      {isError && (
        <p
          className="text-red-600 text-center"
          role="alert"
          aria-live="assertive"
        >
          Error al cargar imágenes. Intenta recargar la página.
        </p>
      )}
    </section>
  );
}

export default PhotoLists;

import { useEffect, useRef, useCallback } from "react";

type UseInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export function useInfiniteScroll({ fetchNextPage, hasNextPage }: UseInfiniteScrollProps) {
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

  return observerRef;
}

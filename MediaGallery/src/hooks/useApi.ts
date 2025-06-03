import { useInfiniteQuery } from "@tanstack/react-query";
import { getImagesFull, type UnsplashSearchResponse } from "../api/apiRequest";

export const useImagesFull = (queryVariable: string) => {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    UnsplashSearchResponse,
    unknown,
    UnsplashSearchResponse,
    ["imagesFull", string]
  >({
    queryKey: ["imagesFull", queryVariable],  // queryKey dinámico según búsqueda
    queryFn: ({ pageParam = 1 }) => getImagesFull(queryVariable, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  };
};

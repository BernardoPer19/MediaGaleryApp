import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
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
    UnsplashSearchResponse,     // tipo de cada página
    unknown,                    // tipo de error
    InfiniteData<UnsplashSearchResponse>, // tipo completo de "data"
    ["imagesFull", string],
    number
  >({
    queryKey: ["imagesFull", queryVariable],
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

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
} from "react";
import { useImagesFull } from "../hooks/useApi";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { UnsplashSearchResponse } from "../api/apiRequest";

interface SearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  data: UseInfiniteQueryResult<UnsplashSearchResponse, unknown>["data"];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ChildrenType {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: FC<ChildrenType> = ({ children }) => {
  const [query, setQuery] = useState<string>("");

  const { data, isLoading, error, isError } = useImagesFull(query);

  return (
    <SearchContext.Provider
      value={{
        query,
        isError,
        setQuery,
        data,
        isLoading,
        error:
          typeof error === "string"
            ? error
            : error instanceof Error
              ? error.message
              : null,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

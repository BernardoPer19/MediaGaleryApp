import { useQuery } from "@tanstack/react-query";
import { getImageById } from "../api/apiRequest";

export const useImage = (id: string) => {
  return useQuery({
    queryKey: ["imgKey", id],
    queryFn: () => getImageById(id),
    enabled: !!id, 
  });
};

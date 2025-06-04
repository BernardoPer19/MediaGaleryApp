import { createContext, useContext, type ReactNode } from "react";
import type { UserType } from "../types/UserType";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserRequest } from "../api/AuthRequest";

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
};

interface ChildrenType {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenType) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserRequest,
    retry: false,
  });

  return (
    <AuthContext.Provider value={{ user: user ? user.data : null, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

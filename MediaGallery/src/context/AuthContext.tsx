import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserType } from "../types/UserType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUserRequest, logoutRequest } from "../api/AuthRequest";

import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

interface ChildrenType {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenType) => {
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserRequest,
    retry: false,
  });

  const logout = async () => {
    try {
      await logoutRequest(); // ⬅️ la función real que hace el logout en backend
      Cookies.remove("access_token");
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      setIsAuthenticated(false);
      navigate("/login");
      toast.success("¡Sesión cerrada exitosamente!");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  useEffect(() => {
    setIsAuthenticated(!isLoading && !!user);
  }, [user, isLoading]);
  return (
    <AuthContext.Provider
      value={{
        user: user ? user.data : null,
        isLoading,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

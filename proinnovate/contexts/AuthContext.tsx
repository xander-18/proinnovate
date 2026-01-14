import storageService from "@/services/storageService";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    try {
      console.log("AuthContext: Verificando autenticación...");

      // Verifica si hay token y usuario guardados
      const token = await storageService.getDataLocal("token");
      const userData = await storageService.getDataLocal("user");

      console.log("AuthContext: Token encontrado:", token ? "SÍ" : "NO");
      console.log("AuthContext: Usuario encontrado:", userData ? "SÍ" : "NO");

      if (token && userData) {
        setAuthenticated(true);
        setUser(userData);
        console.log("AuthContext: Usuario autenticado");
      } else {
        setAuthenticated(false);
        setUser(null);
        console.log("AuthContext: No autenticado");
      }
    } catch (error) {
      console.error("AuthContext: Error verificando auth:", error);
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (token: string, userData: User) => {
    try {
      console.log("AuthContext: Guardando token y usuario...");

      await storageService.saveDataLocal("token", token);
      await storageService.saveDataLocal("user", userData);

      setAuthenticated(true);
      setUser(userData);

      console.log("AuthContext: Login exitoso");
    } catch (error) {
      console.error("AuthContext: Error en login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("🚪 AuthContext: Cerrando sesión...");

      await storageService.removeDataLocal("token");
      await storageService.removeDataLocal("user");

      setAuthenticated(false);
      setUser(null);

      console.log("AuthContext: Logout exitoso");
    } catch (error) {
      console.error("AuthContext: Error en logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}

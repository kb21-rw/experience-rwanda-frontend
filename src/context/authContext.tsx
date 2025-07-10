import jwt from "jsonwebtoken";
import { TokenPayload } from "@/types/Admin";
import { redirect, usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
interface AuthContextType {
  token?: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const currentRoute = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      throw redirect(`/login?redirect=${currentRoute}`);
    }
    const payload = jwt.decode(storedToken) as TokenPayload;
    if (payload.exp < Date.now() / 1000) {
      throw redirect(`/login?redirect=${currentRoute}`);
    }
    setToken(storedToken);
  }, [currentRoute]);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

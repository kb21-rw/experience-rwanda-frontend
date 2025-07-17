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
  token: string | null;
  user: TokenPayload | null;
  setUser: Dispatch<SetStateAction<TokenPayload | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  setUser: () => {},
  setToken: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<TokenPayload | null>(null);
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
    setUser(payload);
    setToken(storedToken);
  }, [currentRoute]);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    const payload = jwt.decode(token) as TokenPayload;
    setToken(token);
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, setUser, setToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

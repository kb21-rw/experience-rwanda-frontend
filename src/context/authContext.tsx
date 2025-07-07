import { User } from "@/types/User";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import jwt from "jsonwebtoken";
interface AuthContextType {
  token?: string | null;
  setToken: Dispatch<SetStateAction<string | null | undefined>>;
  user?: User | null;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setToken: () => {},
  user: undefined,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) return;
    setToken(storedToken);
    const payload = jwt.decode(storedToken) as User;
    setUser(payload);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    const payload = jwt.decode(token) as User;
    console.log(payload);
    setToken(token);
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

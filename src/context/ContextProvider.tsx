import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  loading: boolean;
}

interface User {
  name: string;
  email: string;
  role: string;
  image: string;
}

export const Context = createContext<AuthContextType | undefined>(undefined);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isLoggedIn = useMemo(() => !!user, [user]);
  const router = useRouter();

  const value = {
    user,
    setUser,
    isLoggedIn,
    loading,
  };

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("/api/me", { withCredentials: true });
      setUser(res.data);
    } catch {
      try {
        await axios.post("/api/refresh-token", {}, { withCredentials: true });
        const res = await axios.get("/api/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default ContextProvider;

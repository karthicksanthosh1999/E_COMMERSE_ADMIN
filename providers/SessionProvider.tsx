"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  image?: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logOut: () => Promise<void>;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const response = await api.post("/auth/refresh");

        const loggedUser = response.data?.data?.user;

        if (loggedUser) {
          setUser(loggedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Status:", error.response?.status);
          console.log("Response:", error.response?.data);
          console.log("URL:", error.config?.url);
        }

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedUser();
  }, []);

  const logOut = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
      toast.success("User Logout Successfully");
      router.push("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used inside SessionProvider");
  }

  return session;
};
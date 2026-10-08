"use client";

import {
    createContext,
    useEffect,
    useState,
} from "react";

import { AuthData } from "@/types/auth";

import {
    getAuth,
    clearAuth,
} from "@/lib/auth-storage";

interface AuthContextData {
    user: AuthData["user"] | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (auth: AuthData) => void;
    logout: () => void;
}

export const AuthContext = createContext<
    AuthContextData | undefined
>(undefined);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<AuthData["user"] | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        if (auth) {
            setUser(auth.user);
            setIsAuthenticated(true);
        }

        setIsLoading(false);
    }, []);

    const login = (auth: AuthData) => {
        setUser(auth.user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearAuth();

        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
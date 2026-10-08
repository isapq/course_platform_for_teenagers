import { AuthData } from "@/types/auth";

const AUTH_KEY = "auth";

export function saveAuth(auth: AuthData) {
    localStorage.setItem(
        AUTH_KEY,
        JSON.stringify(auth)
    );
}

export function getAuth(): AuthData | null {
    const auth = localStorage.getItem(AUTH_KEY);

    if (!auth) {
        return null;
    }

    return JSON.parse(auth);
}

export function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
}
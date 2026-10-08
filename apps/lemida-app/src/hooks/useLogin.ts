import { login } from "../services/auth";
import { saveAuth } from "@/lib/auth-storage";

export function useLogin() {
    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);

        if (!response?.token || !response?.user) {
            throw new Error("Resposta de autenticação inválida.");
        };

        saveAuth(response);

        return response;
    }

    return {
        login: handleLogin,
    };
}
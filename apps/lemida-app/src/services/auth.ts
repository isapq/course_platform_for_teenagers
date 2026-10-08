import { api } from "./api";

export async function login(email: string, password: string) {
    const response = await api.post("/auth/login", {
        email,
        password,
    })

    if (!response) {
        throw new Error("E-mail ou senha inválidos.")
    }

    return response.data;
}

export async function register(
    first_name: string,
    last_name: string,
    email: string, 
    password: string
) {
    const response = await api.post("/auth/register", {
        first_name, 
        last_name,
        email,
        password,
    })

    if (!response) {
        throw new Error("Dados inválidos.")
    }

    return response.data;
}

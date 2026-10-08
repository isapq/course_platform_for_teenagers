import { api } from "./api";

export async function createAccessesCode(email: string) {
    const response = await api.post("/accessesCodeRouter/CreateAccessesCode", {
        email
    });

    if (!response) {
        throw new Error("E-mail inválido.")
    };

    return response.data;
}

export async function validateAccessesCode(email: string, code: string) {
    const response = await api.get("/accessesCodeRouter/validateAccessesCode", {
        params: {
            code,
            email
        }
    });

    if (!response) {
        throw new Error("Código ou e-mail inválidos.")
    };

    return response.data;
}

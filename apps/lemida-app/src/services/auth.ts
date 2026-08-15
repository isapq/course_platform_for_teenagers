import { api } from "./api";

export const login = async (
    email: string,
    password: string,
) => {
    const responser = await api.post("/login", {
        email,
        password,
    });

    return responser.data;
};

import { register } from "../services/auth";

export function useRegister() {
    const handleRegister = async (
        first_name: string,
        last_name: string,
        email: string, 
        password: string
    ) => {
        const response = register(first_name, last_name, email, password);

        return response;
    }

    return {
        register: handleRegister,
    };
}
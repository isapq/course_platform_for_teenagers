import { validateAccessesCode } from "@/services/accessesCode";

export function useValidateAccessesCode() {

    const handleValidateAccessesCode = async (
        email: string,
        code: string
    ) => {
        const response = await validateAccessesCode(email, code);

        return response;
    };

    return {
        validateAccessesCode: handleValidateAccessesCode,
    };
}
import { createAccessesCode } from "@/services/accessesCode";

export function useCreateAccessesCode() {
    const handleCreateAccessesCode = async (email: string) => {
        const response = await createAccessesCode(email);

        return response;
    }

    return {
        createAccessesCode: handleCreateAccessesCode,
    };
}
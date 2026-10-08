"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [
        isLoading,
        isAuthenticated,
        router,
    ]);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
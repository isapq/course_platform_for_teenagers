import { CircularProgress, Box } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Loading() {
    const [imageIndex, setImageIndex] = useState(0);

    const images = [
        "/images/povo_posicao_1_sem_fundo.png",
        "/images/povo_posicao_3_sem_fundo.png",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % images.length);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Área das camadas */}
            <Box
                sx={{
                    position: "relative",
                    width: 115,
                    height: 80,
                }}
            >
                {/* CAMADA 1 — CÍRCULO */}
                <CircularProgress
                    size={100}
                    sx={{
                        position: "absolute",
                        top: "-10%",
                        left: "8%",
                        transform: "translate(-50%, -50%)",
                        color: "#919cec",
                        zIndex: 1,
                    }}
                />

                {/* CAMADA 2 — PERSONAGEM */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 115,
                        height: 80,
                        zIndex: 2,
                    }}
                >
                    <Image
                        src={images[imageIndex]}
                        alt="Logo povo azul nadando"
                        width={115}
                        height={80}
                    />
                </Box>
            </Box>
        </Box>
    );
}
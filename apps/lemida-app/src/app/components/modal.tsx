"use client";

import { 
    Button,
    Modal,
    Box,
    Typography,
    Icon
} from "@mui/material";
import Image from "next/image";
import React, { createContext, useContext, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type ModalType = "success" | "error" | "info";

type ModalContextType = {
    openModal: (message: string, type?: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [message, setMessage] = useState("");
    const [type, setType] = useState<ModalType>("info");
    const [open, setOpen] = useState(false);

    const openModal = (message: string, type: ModalType = "info") => {
        setMessage(message);
        setType(type);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            <Modal
                open={open}
                onClose={closeModal}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: 
                            type === "error"
                                ? "#ffb5b7"
                                    : type === "success"
                                        ? "#c4ffd6"
                                        : "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    {type === "error" && (
                        <Box
                            sx={{
                                position: "absolute",
                                zIndex: 10,
                                left: {
                                    xs: "110px",
                                    md: "-75px",
                                },
                                top: {
                                    xs: "-110px",
                                    md: "-10px",
                                },
                            }}
                        > 
                            <Image
                                src="/images/povo_posicao_4_sem_fundo.png"
                                alt="povo triste"
                                width={130}
                                height={150}
                                // style={{
                                //     position: "absolute",
                                //     //zIndex: 1,
                                //     top: -10,
                                //     left: -75,
                                //     zIndex: 10,
                                // }}
                            />
                        </Box>
                    )}
            
                    {type === "error" ? (
                        <DangerousIcon />
                    ) : type === "info" ? (
                        <InfoIcon />
                    ) : (
                        <CheckCircleIcon />
                    )}
                    <Typography variant="h6" color="brack">
                        {message}
                    </Typography>
                </Box>
            </Modal>
        </ModalContext.Provider>
    );
};

export function useModal() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error(
            "useModal deve ser utilizado dentro de um ModalProvider"
        );
    }

    return context;
}
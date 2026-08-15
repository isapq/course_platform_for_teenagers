"use client";

import {
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material"
import Image from "next/image";

import { useState } from "react";
import { login } from "@/services/auth";

import {
    loginContainerSx,
    loginCardSx,
    loginFormSx,
    loginHeroSx,
    quoteTextSx,
    loginFieldSx,
    loginButtonSx,
    forgotPasswordTextSx,
} from "./styles";

export default function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = async () => {
        try {
            const user = await login(email, password);

            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={loginContainerSx}
        >
            <Box
                sx={loginCardSx}
            >

                <Box
                    sx={loginFormSx}
                >

                    <TextField
                        label="E-mail"
                        sx={loginFieldSx}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        sx={loginFieldSx}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        sx={loginButtonSx}
                        onClick={handleLogin}
                    >
                        Entrar
                    </Button>

                    <Button
                        sx={loginButtonSx}
                    >
                        Cadastrar-se
                    </Button>

                    <Typography
                        sx={forgotPasswordTextSx}
                    >
                        esqueci a senha
                    </Typography>
                </Box>


                <Box
                    sx={loginHeroSx}
                >
                    <Box
                        sx={{
                            width: {
                                xs: 350,
                                md: 311,
                            },
                        }}
                    >
                        <Image
                            src="/images/povo_posicao_3_sem_fundo.png"
                            alt="logo povo azul"
                            width={311}
                            height={207}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            width: {
                                xs: 300,
                                md: 260,
                            },
                        }}
                    >
                        <Image
                            src="/images/lemida_sem_fundo.svg"
                            alt="logo lemida" 
                            width={260}
                            height={88}
                            style={{
                                marginTop: "-55px",
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </Box>

                        
                    <Typography
                        sx={quoteTextSx}
                    >
                        "a educação tem raízes amargas, mas os seus frutos são doces" -Aristóteles
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

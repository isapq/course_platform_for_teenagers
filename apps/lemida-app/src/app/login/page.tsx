"use client";

import {
    Box,
    Typography,
    TextField,
    Button,
    Modal
} from "@mui/material"
import Image from "next/image";
import { Loading } from "../components/loading";
import { useModal } from "../components/modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { useLogin } from "@/hooks/useLogin";
import { useRegister } from "@/hooks/useRegister";
import axios from "axios";
import { useCreateAccessesCode } from "@/hooks/useCreateAccessesCode";
import { useValidateAccessesCode } from "@/hooks/useValidateAccessesCode";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login } = useLogin();
    const { login: loginContext } = useAuth()

    const [ isRegister, setIsRegister ] = useState(false);
    const [ isForgotPasswor, setIsForgotPasswor ] = useState(false);
    const [ isInsertCode, setIsInsertCode ] = useState(false);
    const { register } = useRegister();
    const { validateAccessesCode } = useValidateAccessesCode();
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ code, setCode ] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const { openModal } = useModal();
    const router = useRouter();
    const { createAccessesCode } = useCreateAccessesCode();

    const handleLogin = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            if (email.trim() === '' || password.trim() === '') {
                openModal(`Campo de ${email.trim() === '' ? 'E-MAIL' : 'SENHA'} está vazio`, "error")
                setIsLoading(false);
                return;
            }

            const user = await login(email.trim(), password.trim());

            if (user) {
                loginContext(user);
                router.push("/")
                return
            }
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                openModal(
                    error.response?.data.message ?? "Erro ao realizar login.",
                    "error"
                )
            } else {
                openModal(`Erro: ${error}`, "error")
            }
        }

        setIsLoading(false);
    };

    const handleRegister = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const fields = [
                { value: firstName, name: "Primeiro nome"},
                { value: lastName, name: "Segundo nome"},
                { value: email, name: "E-mail"},
                { value: password, name: "Senha"},
            ];

            const emptyField = fields.filter((field) => field.value.trim() === "");

            if (emptyField.length > 0) {
                if (emptyField.length > 1) {
                    openModal("Preencha os campos vazios", "error")
                } else {
                    openModal(`Preencha o campo "${emptyField[0].name}"`, "error")
                }
                
                setIsLoading(false);
                return;
            }

            const user = await register(
                firstName, lastName, email, password
            );

            openModal("Cadastro realizado com sucesso!");

            console.log(user);

            if (user) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                router.push("/")
            }
        } catch (error) {
            console.log(error);

            openModal(`Erro: ${error}`, "error");
        }

        setIsLoading(false);
    };

    const handleCreateAccessesCode = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            if (email.trim() === '') {
                openModal('Preencha o campo de e-mail.', "error");
                setIsLoading(true);
                return
            };

            const accessesCode = await createAccessesCode(email);

            openModal("Enviamos um código de recuperação para o seu e-mail. Verifique sua caixa de entrada.", "info")

            setIsInsertCode(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openModal(
                    error.response?.data?.message ?? "Erro ao validar o código.",
                    "error"
                );
            } else {
                openModal(
                    "Ocorreu um erro inesperado.",
                    "error"
                );
            }
            setEmail("");
        }

        setIsLoading(false);
    }

    const handleValideteAccessesCode = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            if (email.trim() === '' || code.trim() === '') {
                openModal(`Preencha o campo de ${
                    email.trim() === '' ? 'e-mail' : 'código'
                }.`, "error");
                setIsLoading(false);
                return
            };

            const valideteCode = await validateAccessesCode(email, code);

            if (valideteCode) {
                router.push("/")
            }

            openModal("Código validado com sucesso!", "success")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                openModal(
                    error.response?.data?.message ?? "Erro ao validar o código.",
                    "error"
                );
            } else {
                openModal(
                    "Ocorreu um erro inesperado.",
                    "error"
                );
            }
        }

        setIsLoading(false);
    }

    return (
        <Box
            sx={loginContainerSx}
        >
            <Box
                sx={loginCardSx}
            >
                {isLoading && (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: {
                                md: "120px"
                            }
                        }}
                    >
                        <Loading />
                    </Box>
                )}

                <Box
                    sx={loginFormSx}
                >
                    {isRegister && !isLoading && (
                        <TextField
                            label="Primeiro nome"
                            sx={loginFieldSx}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    )}

                    {isRegister && !isLoading && (
                        <TextField
                            label="Segundo nome"
                            sx={loginFieldSx}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    )}

                    {!isLoading && (
                        <TextField
                            label="E-mail"
                            sx={{
                                ...loginFieldSx, 
                                ...(isInsertCode && {
                                    marginLeft: {
                                        xs: "0%",
                                        md: "190%",
                                    },
                                    marginTop: {
                                        xs: "50%"
                                    }
                                }),
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}

                    {!isLoading && !isForgotPasswor && (
                        <TextField
                            label="Senha"
                            type="password"
                            sx={loginFieldSx}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}

                    {!isRegister && !isLoading && !isForgotPasswor && (
                        <Button
                            sx={loginButtonSx}
                            onClick={handleLogin}
                        >
                            Entrar
                        </Button>
                    )}

                    {isRegister && !isLoading && (
                        <Button
                            sx={loginButtonSx}
                            onClick={handleRegister}
                        >
                            Seguir com cadastro
                        </Button>
                    )}

                    {isForgotPasswor && !isLoading && !isInsertCode && (
                        <Button
                            sx={loginButtonSx}
                            onClick={handleCreateAccessesCode}
                        >
                            Recuperar senha
                        </Button>
                    )}

                    {!isLoading && !isForgotPasswor && (
                        <Button
                            sx={loginButtonSx}
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setEmail("");
                                setPassword("");
                            }}
                        >
                            {isRegister ?
                            'Retornar para login'
                            : 'Cadastrar-se'
                            }
                        </Button>
                    )}
                    

                    {!isRegister && !isLoading && !isInsertCode && (
                        <Typography
                            sx={forgotPasswordTextSx}
                            onClick={(e) => {
                                setIsForgotPasswor(!isForgotPasswor);
                                setEmail("");
                            }}
                        >
                            {isForgotPasswor ?
                            'Voltar para login...'
                            : 'esqueci a senha'}
                        </Typography>
                    )}

                    {isInsertCode && !isLoading && (
                        <TextField
                            label="Código"
                            sx={{
                                ...loginFieldSx,
                                marginLeft: {
                                    md: "190%"
                                },
                            }}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    )}

                    {isInsertCode && !isLoading && (
                        <Button
                            sx={{
                                ...loginButtonSx,
                                marginLeft: {
                                    md: "190%"
                                }
                            }}
                            onClick={handleValideteAccessesCode}
                        >
                            Validar
                        </Button>
                    )}

                    {isInsertCode && !isLoading && (
                        <Button
                            sx={{
                                ...loginButtonSx,
                                marginLeft: {
                                    md: "190%"
                                }
                            }}
                            onClick={() => {
                                setIsInsertCode(false); 
                                setIsForgotPasswor(false);
                                setEmail("");
                            }}
                        >
                            Voltar
                        </Button>
                    )}
                </Box>

                {!isLoading && (
                    <Box
                        sx={loginHeroSx}
                    >
                        {!isForgotPasswor && (
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
                        )}

                        {!isForgotPasswor && (
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
                        )}

                        {isForgotPasswor && !isInsertCode && (
                            <Box
                                sx={{
                                    width: {
                                        xs: 350,
                                        md: 350,
                                    },
                                    marginTop: {
                                        md: 5
                                    }
                                }}
                            >
                                <Image
                                    src="/images/povo_posicao_6_sem_fundo.png"
                                    alt="polvo assustado" 
                                    width={350}
                                    height={150}
                                    style={{
                                        marginTop: "-55px",
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </Box>
                        )}
                    
                        {!isForgotPasswor && (
                            <Typography
                                sx={quoteTextSx}
                            >
                            '"a educação tem raízes amargas, mas os seus frutos são doces" -Aristóteles'
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

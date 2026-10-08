import { BrevoClient } from "@getbrevo/brevo";

export class EmailService {
    private brevo: BrevoClient;

    constructor() {
        this.brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY!,
        });
    }

    async sendRecoveryCode(
        email: string,
        first_name: string,
        code: string
    ) {
        return await this.brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Lemida",
                email: "isaquevidaltube@gmail.com",
            },

            to: [
                {
                    email,
                    name: first_name,
                },
            ],

            subject: "Código para recuperação de senha",

            htmlContent: `
                <div style="
                    margin: 0;
                    padding: 30px 15px;
                    background-color: #ffffff;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #222222;
                ">

                    <div style="
                        max-width: 600px;
                        margin: 0 auto;
                    ">

                        <!-- LOGO PRINCIPAL -->
                        <div style="
                            text-align: center;
                            margin-bottom: 35px;
                        ">
                            <img
                                src="https://res.cloudinary.com/teyhjhkw/image/upload/f_auto/q_auto/topo_email.png"
                                alt="LemidA"
                                width="540"
                                height="160"
                                style="
                                    display: block;
                                    width: 100%;
                                    max-width: 540px;
                                    height: auto;
                                    margin: 0 auto;
                                "
                            />
                        </div>


                        <!-- SAUDAÇÃO -->
                        <p style="
                            margin: 0 0 24px 0;
                            font-size: 16px;
                            line-height: 1.5;
                        ">
                            Olá, <strong>${first_name}!</strong>
                        </p>


                        <!-- MENSAGEM -->
                        <p style="
                            margin: 0 0 22px 0;
                            font-size: 15px;
                            line-height: 1.6;
                        ">
                            Recebemos uma solicitação para recuperação da sua senha.
                        </p>


                        <!-- CÓDIGO -->
                        <p style="
                            margin: 0 0 8px 0;
                            font-size: 15px;
                            line-height: 1.5;
                        ">
                            Seu código de recuperação é:
                        </p>

                        <div style="
                            margin: 0 0 28px 0;
                            text-align: left;
                        ">
                            <span style="
                                display: inline-block;
                                font-size: 22px;
                                font-weight: bold;
                                letter-spacing: 2px;
                                color: #222222;
                            ">
                                ${code}
                            </span>
                        </div>


                        <!-- INFORMAÇÕES -->
                        <ul style="
                            margin: 0 0 30px 20px;
                            padding: 0;
                            font-size: 15px;
                            line-height: 1.7;
                        ">
                            <li>
                                Esse código é válido por
                                <strong>15 minutos.</strong>
                            </li>

                            <li>
                                Se você não solicitou essa alteração,
                                ignore este e-mail.
                            </li>
                        </ul>


                        <!-- ASSINATURA -->
                        <p style="
                            margin: 0 0 5px 0;
                            font-size: 15px;
                            line-height: 1.5;
                        ">
                            Atenciosamente,
                        </p>

                        <div style="
                            margin-top: 0;
                        ">
                            <img
                                src="https://res.cloudinary.com/teyhjhkw/image/upload/f_auto/q_auto/lemida_sem_fundo.svg"
                                alt="LemidA"
                                width="120"
                                height="40"
                                style="
                                    display: block;
                                    width: 120px;
                                    height: auto;
                                "
                            />
                        </div>

                    </div>
                </div>
            `,
        });
    }
}
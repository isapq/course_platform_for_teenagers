import { userAccessesCodeService } from "../services/userAccessesCode.service.js";
import { EmailService } from "../services/email.service.js";
import { Request, Response } from "express";

export class UserAccessesCodeController {

    private userAccessesCodeService = new userAccessesCodeService();
    private emailService = new EmailService();

    async createAccessesCode(req: Request, res: Response) {

        const { email } = req.body;

        try {
            const code = await this.userAccessesCodeService.newCode(email);

            await this.emailService.sendRecoveryCode(
                code.email,
                code.first_name,
                code.code
            );

            return res.status(201).json({
                message: "Código criado com sucesso."
            });

        } catch (error) {

            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno do servidor."
            });
        }
    }

    async validateAccessesCode(req: Request, res: Response) {
        const { email, code } = req.query;

        if (typeof email !== "string" || typeof code !== "string") {
            return res.status(400).json({
                message: "E-mail e code são obrigatórios."
            });
        }

        try {
            const codeIsValid = await this.userAccessesCodeService.validateCode(email, code);

            return res.status(200).json(codeIsValid);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: `Erro ao validar o código. Erro: ${error}`
            });
        }
    }
}
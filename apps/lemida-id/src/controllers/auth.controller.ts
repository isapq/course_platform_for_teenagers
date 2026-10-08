import { AuthService } from "../services/auth.service.js";
import { Request, Response } from "express";

export class AuthController {
    private authService = new AuthService();

    async register(req: Request, res: Response) {
        const createdUser = await this.authService.register(req.body);

        return res.status(201).json(createdUser);
    }

    async login(req: Request, res: Response) { 
        try {
            const { email, password } = req.body;

            const validateLogin = await this.authService.login(
                email,
                password
            );

            return res.status(200).json(validateLogin);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            return res.status(500).json({
                message: "Erro interno do servidor.",
            });
        }
    }

    async changePassword(req: Request, res: Response) {
        const { id, oldPassword, newPassword } = req.body;

        const chageNewPassword = await this.authService.modifyPassword(id, oldPassword, newPassword);

        return res.status(200).json(chageNewPassword)
    }
}

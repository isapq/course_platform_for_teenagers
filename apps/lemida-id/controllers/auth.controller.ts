import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
    private authService = new AuthService();

    async register(req: Request, res: Response) {
        const createdUser = await this.authService.register(req.body);

        return res.status(201).json(createdUser);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const validateLogin = await this.authService.login(email, password)

        return res.status(200).json(validateLogin)
    }

    async changePassword(req: Request, res: Response) {
        const { id, oldPassword, newPassword } = req.body;

        const chageNewPassword = await this.authService.modifyPassword(id, oldPassword, newPassword);

        return res.status(200).json(chageNewPassword)
    }
}

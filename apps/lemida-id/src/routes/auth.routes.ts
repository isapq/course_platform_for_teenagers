import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller.js";


const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", (req: Request, res: Response) => {
    authController.register(req, res);
});

authRouter.post("/login", (req: Request, res: Response) => {
    authController.login(req, res);
});

authRouter.patch("/modifyPassword", (req: Request, res: Response) => {
    authController.changePassword(req, res);
});

export default authRouter;

import { Router, Request, Response } from "express";
import { UserAccessesCodeController } from "../controllers/userAccessesCode.controller.js";


const accessesCodeRouter = Router();

const userAccessesCodeController = new UserAccessesCodeController();

accessesCodeRouter.post("/CreateAccessesCode", (req: Request, res: Response) => {
    userAccessesCodeController.createAccessesCode(req, res);
});

accessesCodeRouter.get("/validateAccessesCode", (req: Request, res: Response) => {
    userAccessesCodeController.validateAccessesCode(req, res);
});

export default accessesCodeRouter;

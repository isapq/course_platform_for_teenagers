import express from "express";
import cors from "cors";
import authRouter from './routes/auth.routes.js';
import accessesCodeRouter from './routes/userAccessesCode.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/accessesCodeRouter", accessesCodeRouter);

export default app;

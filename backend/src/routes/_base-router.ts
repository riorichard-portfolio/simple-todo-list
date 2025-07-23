import { Router } from "express";

import authRouter from "./auth-router";
import todoRouter from "./todo-router";
import { invalidRouter } from "../middleware/invalid-route-handler";

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/todo', todoRouter);

baseRouter.all('*', invalidRouter);

export default baseRouter;
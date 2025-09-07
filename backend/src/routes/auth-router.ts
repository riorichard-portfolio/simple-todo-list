import { Router } from "express";

import { authHandler } from "../handler/auth-handler";
import { handlerWrapper as h } from "../middleware/handler-wrapper";

const authRouter = Router();

authRouter.post('/login', h(authHandler.login)); // login
authRouter.post('/login/google', h(authHandler.loginGoogle)) // login with google

export default authRouter;
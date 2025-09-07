import { Request } from "express"
import { validateRequest } from "../utils/common"
import { loginGoogleSchema, loginSchema } from "../joi/schema/auth-joi"
import { authUsecase } from "../usecase/auth-usecase"
import { DefaultHandler } from "./type"

const login: DefaultHandler = async (req: Request) => {
    const validatedBody = validateRequest(loginSchema, req.body)
    const data = await authUsecase.login(validatedBody)
    return { data }
}

const loginGoogle: DefaultHandler = async (req: Request) => {
    const validatedBody = validateRequest(loginGoogleSchema, req.body)
    const data = await authUsecase.loginGoogle(validatedBody)
    return { data }
}

export const authHandler = {
    login,
    loginGoogle
}
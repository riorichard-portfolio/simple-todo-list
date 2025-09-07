import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

import prisma from "../models/primsa-client"
import { LoginGoogleRequest, LoginRequest } from "../joi/interface/auth-joi"
import { throwRequestError } from "../middleware/error-handler"
import { AUTH_ERROR_MESSAGE } from "../constants/auth-error-message"
import { env } from '../environment/environment'
import googleOauthClient from '../models/google-client'
import { GENERAL_ERROR_MESSAGE } from '../constants/general-error-message'
import { TokenPayload } from 'google-auth-library'


const login = async ({ email, password }: LoginRequest) => {
    const emailFound = await prisma.user.findFirst({
        where: { email }
    })
    if (!emailFound) throwRequestError(AUTH_ERROR_MESSAGE.INVALID_EMAIL)
    const isPasswordValid = await bcrypt.compare(password, (emailFound as User).passwordHash)
    if (!isPasswordValid) throwRequestError(AUTH_ERROR_MESSAGE.INVALID_PASSWORD)
    const token = jwt.sign({ userId: (emailFound as User).userId }, env.JWT_SECRET)
    return { token }
}

const loginGoogle = async ({ credential }: LoginGoogleRequest) => {
    const ticket = await googleOauthClient.verifyIdToken({
        idToken: credential,
        audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    const { email, name } = payload as TokenPayload
    if (!email) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    let user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: email as string,
                fullName: name || 'google-user',
                passwordHash: '1'
            }
        })
    }
    const token = jwt.sign({ userId: (user as User).userId }, env.JWT_SECRET)
    return { token }
}

export const authUsecase = {
    login,
    loginGoogle
}
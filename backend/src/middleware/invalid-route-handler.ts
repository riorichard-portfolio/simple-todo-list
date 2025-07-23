import { Request, Response, NextFunction } from "express";
import { RESPONSE_CODE } from "../constants/response-code";

export const invalidRouter = (req: Request, res: Response, next: NextFunction) => {
    res.status(RESPONSE_CODE.NOT_FOUND).json('url not found')
};
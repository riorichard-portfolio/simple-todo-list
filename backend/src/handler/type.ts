import { Request } from "express"

export type DefaultHandler = (req: Request) => Promise<{ data: any, statusCode?: number }>
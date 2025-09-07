import { Request } from "express"
import { DefaultHandler } from "./type"
import { validateRequest } from "../utils/common"
import { addTodoSchema, todoCategoryListSchema, todoListSchema, updateTodoSchema } from "../joi/schema/todo-joi"
import { todoUsecase } from "../usecase/todo-usecase"
import { RESPONSE_CODE } from "../constants/response-code"

const addTodo: DefaultHandler = async (req: Request) => {
    const validatedBody = validateRequest(addTodoSchema, req.body)
    const data = await todoUsecase.addTodo(validatedBody, req.user.userId)
    return { data, statusCode: RESPONSE_CODE.CREATED }
}

const todoList: DefaultHandler = async (req: Request) => {
    const validatedQuery = validateRequest(todoListSchema, req.query)
    const data = await todoUsecase.todoList(validatedQuery, req.user.userId)
    return { data }
}

const todoCategoryList: DefaultHandler = async (req: Request) => {
    const validatedQuery = validateRequest(todoCategoryListSchema, req.query)
    const data = await todoUsecase.todoCategoryList(validatedQuery)
    return { data }
}

const updateTodo: DefaultHandler = async (req: Request) => {
    const validatedBody = validateRequest(updateTodoSchema, req.body)
    const data = await todoUsecase.updateTodo(validatedBody)
    return { data }
}

export const todoHandler = {
    addTodo,
    todoList,
    todoCategoryList,
    updateTodo
}
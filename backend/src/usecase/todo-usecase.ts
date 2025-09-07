import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message"
import { AddTodoRequest, TodoCategoryListRequest, TodoListRequest, updateTodoRequest } from "../joi/interface"
import { throwRequestError } from "../middleware/error-handler"
import prisma from "../models/primsa-client"

const addTodo = async ({ category, name, createdAt }: AddTodoRequest, userId: string) => {
    const foundCategory = await prisma.todoCategory.findFirst({
        where: { categoryTitle: category }
    })
    let todoCategoryId: string
    if (!foundCategory) {
        const createdCategory = await prisma.todoCategory.create({
            data: { categoryTitle: category }
        })
        todoCategoryId = createdCategory.todoCategoryId
    } else {
        todoCategoryId = foundCategory.todoCategoryId
    }
    const createdTodo = await prisma.todo.create({
        data: {
            todoTitle: name,
            completed: false,
            todoCategoryId,
            userId,
            createdAt
        }
    })
    return createdTodo
}

const todoList = ({ createdAt }: TodoListRequest, userId: string) => {
    return prisma.todo.findMany({
        where: { createdAt, userId },
        include: {
            todoCategory: {
                select: {
                    categoryTitle: true
                }
            }
        }
    })
}

const todoCategoryList = async ({ limit, offset }: TodoCategoryListRequest) => {
    return prisma.todoCategory.findMany({
        skip: offset,
        take: limit
    })
}

const updateTodo = async ({ todoId, completed }: updateTodoRequest) => {
    const foundTodo = await prisma.todo.findUnique({
        where: { todoId }
    })
    if (!foundTodo) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    const updatedTodo = await prisma.todo.update({
        where: { todoId },
        data: { completed }
    })
    return { updatedTodoId: todoId }
}

export const todoUsecase = {
    addTodo,
    todoList,
    todoCategoryList,
    updateTodo
}
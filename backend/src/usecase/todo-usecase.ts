import { AddTodoRequest, TodoCategoryListRequest, TodoListRequest } from "../joi/interface"
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
        where: { createdAt, userId }
    })
}

const todoCategoryList = async ({ limit, offset }: TodoCategoryListRequest) => {
    return prisma.todoCategory.findMany({
        skip: offset,
        take: limit
    })
}

export const todoUsecase = {
    addTodo,
    todoList,
    todoCategoryList
}
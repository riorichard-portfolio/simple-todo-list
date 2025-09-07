import Joi from "joi";

export const addTodoSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    createdAt: Joi.date().required()
}).meta({ className: 'AddTodoRequest' })

export const todoListSchema = Joi.object({
    createdAt: Joi.date().required()
}).meta({ className: 'TodoListRequest' })

export const todoCategoryListSchema = Joi.object({
    limit: Joi.number().default(10).optional(),
    offset: Joi.number().default(0).optional()
}).meta({ className: 'TodoCategoryListRequest' })

export const updateTodoSchema = Joi.object({
    todoId: Joi.string().uuid().required(),
    completed: Joi.boolean().required()
}).meta({className: 'updateTodoRequest'})
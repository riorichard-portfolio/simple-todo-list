import apiClient from "./client";

export interface AddTodoRequest {
    category: string;
    createdAt: string;
    name: string;
}

export interface TodoCategoryListRequest {
    limit?: number;
    offset?: number;
}

export interface TodoListRequest {
    createdAt: string;
}

export interface updateTodoRequest {
    completed: boolean;
    todoId: string;
}

export interface AddTodoResponse {
    todoId: string
    userId: string
    todoCategoryId: string
    todoTitle: string
    completed: boolean
    createdAt: string
    updatedAt: string
}

export type TodoListResponse = (AddTodoResponse & {
    todoCategory: {
        categoryTitle: string
    }
})[]

export interface TodoCategory {
    todoCategoryId: string
    categoryTitle: string
    createdAt: string
}

export type TodoCategoriesResponse = TodoCategory[]

export interface updateTodoResponse {
    updatedTodoId: string;
}

export const todoApi = {
    addTodo: (data: AddTodoRequest) => apiClient.post<AddTodoResponse>('/todo', data),
    todoCategory: (params: TodoCategoryListRequest) => apiClient.get<TodoCategoriesResponse>('/todo/categories', { params }),
    todoList: (params: TodoListRequest) => apiClient.get<TodoListResponse>('/todo', { params }),
    updateTodo: (data: updateTodoRequest) => apiClient.patch<updateTodoResponse>('/todo', data)
}
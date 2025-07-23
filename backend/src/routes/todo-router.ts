import { Router } from "express";

import { handlerWrapper as h } from "../middleware/handler-wrapper";
import { todoHandler } from "../handler/todo-handler";
import { authMiddleware } from "../middleware/auth-middleware";

const todoRouter = Router();

todoRouter.use(authMiddleware)
todoRouter.post('', h(todoHandler.addTodo)); // add todo
todoRouter.get('', h(todoHandler.todoList)); // list todo
todoRouter.get('/categories', h(todoHandler.todoCategoryList)); // list todo categories

export default todoRouter;
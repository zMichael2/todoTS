import { Router } from 'express';
import {
    getTodos,
    getTodo,
    postTodo,
    putTodo,
    deleteTodo,
} from '../controllers/todo.controllers';
import { idUsuarioExiste } from '../middlewares/idUsuario.middlewares';

export const routerTodo = Router();

routerTodo.get('/', getTodos);
routerTodo.get('/:id', getTodo);
routerTodo.post('/', [idUsuarioExiste], postTodo);
routerTodo.put('/:id', putTodo);
routerTodo.delete('/:id', deleteTodo);

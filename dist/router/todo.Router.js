"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTodo = void 0;
const express_1 = require("express");
const todo_controllers_1 = require("../controllers/todo.controllers");
const idUsuario_middlewares_1 = require("../middlewares/idUsuario.middlewares");
exports.routerTodo = (0, express_1.Router)();
exports.routerTodo.get('/', todo_controllers_1.getTodos);
exports.routerTodo.get('/:id', todo_controllers_1.getTodo);
exports.routerTodo.post('/', [idUsuario_middlewares_1.idUsuarioExiste], todo_controllers_1.postTodo);
exports.routerTodo.put('/:id', todo_controllers_1.putTodo);
exports.routerTodo.delete('/:id', todo_controllers_1.deleteTodo);
//# sourceMappingURL=todo.Router.js.map
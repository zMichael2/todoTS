"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.putTodo = exports.postTodo = exports.getTodo = exports.getTodos = void 0;
const client_1 = require("@prisma/client");
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
const prisma = new client_1.PrismaClient();
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaGet = yield prisma.todo.findMany({
        where: {
            estado: 1,
        },
        select: {
            id: true,
            fecha: true,
            comentario: true,
            estado: true,
        },
    });
    res.status(201).json(respuestaGet);
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const numeroID = Number(id); //quitarlo mañana
    const respuestaGet = yield prisma.todo.findFirst({
        where: {
            id: Number(numeroID),
            estado: 1,
        },
        select: {
            id: true,
            fecha: true,
            comentario: true,
            estado: true,
        },
    });
    if (!respuestaGet) {
        res.status(201).json({ message: 'no hay ningun todo con esa id' });
    }
    res.status(201).json(respuestaGet);
});
exports.getTodo = getTodo;
const postTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, comentario } = req.body;
    const idUsuario = yield prisma.usuario.findFirst({
        where: {
            nombre: nombre,
        },
        select: {
            id: true,
        },
    });
    yield prisma.todo.create({
        data: {
            usuarioID: idUsuario.id,
            fecha: hoy.toLocaleDateString(),
            comentario: comentario,
            estado: 1,
        },
    });
    res.status(201).json({ message: 'To-Do creado correctamente' });
});
exports.postTodo = postTodo;
const putTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, comentario } = req.body;
    const numeroID = Number(id);
    const nombreUsuario = yield prisma.usuario.findFirst({
        where: {
            nombre: nombre,
        },
        select: {
            id: true,
        },
    });
    if (!nombreUsuario) {
        return res.status(400).json({
            message: 'Usuario no registrado',
        });
    }
    const updateTodo = yield prisma.todo.update({
        where: {
            id: numeroID,
        },
        data: {
            comentario: comentario,
            usuarioID: nombreUsuario.id,
        },
    });
    res.status(201).json({
        message: 'To-Do actualizado correctamente',
        todoActualizado: updateTodo,
    });
});
exports.putTodo = putTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const numeroID = Number(id);
    const deleteTodo = yield prisma.todo.update({
        where: {
            id: numeroID,
        },
        data: {
            estado: 0,
        },
    });
    res.status(201).json({
        message: 'To-Do eliminado correctamente',
        todoDeleter: deleteTodo,
    });
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.controllers.js.map
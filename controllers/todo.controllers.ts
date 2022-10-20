import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UpdateUserBody } from '../interface/env';
const tiempoTranscurrido = Date.now();
const hoy: any = new Date(tiempoTranscurrido);
const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
    const respuestaGet = await prisma.todo.findMany({
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
};

export const getTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const numeroID = Number(id); //quitarlo mañana
    const respuestaGet = await prisma.todo.findFirst({
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
};

export const postTodo = async (req: Request, res: Response) => {
    const { nombre, comentario }: any = req.body;

    const idUsuario = await prisma.usuario.findFirst({
        where: {
            nombre: nombre,
        },
        select: {
            id: true,
        },
    });

    await prisma.todo.create({
        data: {
            usuarioID: idUsuario!.id,
            fecha: hoy.toLocaleDateString(),
            comentario: comentario,
            estado: 1,
        },
    });

    res.status(201).json({ message: 'To-Do creado correctamente' });
};

export const putTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, comentario }: UpdateUserBody = req.body;
    const numeroID = Number(id);
    const nombreUsuario = await prisma.usuario.findFirst({
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

    const updateTodo = await prisma.todo.update({
        where: {
            id: numeroID,
        },
        data: {
            comentario: comentario,
            usuarioID: nombreUsuario!.id,
        },
    });

    res.status(201).json({
        message: 'To-Do actualizado correctamente',
        todoActualizado: updateTodo,
    });
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const numeroID = Number(id);
    const deleteTodo = await prisma.todo.update({
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
};

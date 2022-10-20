import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const idUsuarioExiste = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { nombre } = req.body;
    try {
        const idUsuario = await prisma.usuario.findFirst({
            where: {
                nombre: nombre,
            },
            select: {
                id: true,
            },
        });
        if (!idUsuario) {
            await prisma.usuario.create({
                data: {
                    nombre: nombre,
                },
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: 'la base de datos no se ha conectado correctamente',
        });
    }
    next();
};

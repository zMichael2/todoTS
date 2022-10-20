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
exports.idUsuarioExiste = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const idUsuarioExiste = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const idUsuario = yield prisma.usuario.findFirst({
            where: {
                nombre: nombre,
            },
            select: {
                id: true,
            },
        });
        if (!idUsuario) {
            yield prisma.usuario.create({
                data: {
                    nombre: nombre,
                },
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: 'la base de datos no se ha conectado correctamente',
        });
    }
    next();
});
exports.idUsuarioExiste = idUsuarioExiste;
//# sourceMappingURL=idUsuario.middlewares.js.map
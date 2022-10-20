import express, { Application } from 'express';
import { routerTodo } from '../router/todo.Router';
import cors from 'cors';

export class Server {
    private app: Application;
    private port: string; //:string | undefined
    private apiPaths: { usuario: string } = {
        usuario: '/api/usuarios',
    };
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.router();
        this.app.use(express.static('public'));
    }

    router() {
        this.app.use(this.apiPaths.usuario, routerTodo);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }
}

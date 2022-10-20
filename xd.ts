import { UpdateUserBody } from './interface/env';

const xd = (data: UpdateUserBody): UpdateUserBody => {
    return {
        nombre: data.nombre,
        comentario: data.nombre,
    };
};

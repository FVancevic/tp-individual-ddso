import { esTextoNoVacio } from '../utils/validaciones.js';

export class Usuario {
    constructor({nombre, apellido, favoritos = []} = {}) {
        validarParametros({ nombre, apellido, favoritos });
        this.nombre = nombre;
        this.apellido = apellido;
        this.favoritos = favoritos;
    }
}

function validarParametros({ nombre, apellido, favoritos }) {
    if (!esTextoNoVacio(nombre)) {
        throw new Error('El nombre es obligatorio');
    }
    if (!esTextoNoVacio(apellido)) {
        throw new Error('El apellido es obligatorio');
    }
    if (!Array.isArray(favoritos)) {
        throw new Error('Los favoritos deben ser un arreglo');
    }
}
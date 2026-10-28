import { esTextoNoVacio } from '../utils/validaciones.js';

export class TipoEntrada {
    constructor({ nombre, descripcion, precio, cupo } = {}) {
        validarParametros({ nombre, descripcion, precio, cupo });
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cupo = cupo;
    }

    hayCupoPara(cantidad) {
        return this.cupo >= cantidad;
    }
}

function validarParametros({ nombre, descripcion, precio, cupo }) {
    if (!esTextoNoVacio(nombre)) {
        throw new Error('El nombre es obligatorio');
    }
    if (descripcion !== undefined && typeof descripcion !== 'string') {
        throw new Error('La descripcion debe ser un texto');
    }
    if (!Number.isFinite(precio) || precio < 0) {
        throw new Error('El precio debe ser un numero mayor o igual a 0');
    }
    if (!Number.isInteger(cupo) || cupo < 0) {
        throw new Error('El cupo debe ser un numero entero mayor o igual a 0');
    }
}
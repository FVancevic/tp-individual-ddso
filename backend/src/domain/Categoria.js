import { esTextoNoVacio } from '../utils/validaciones.js';

export class Categoria {
  constructor({nombre, descripcion} = {}) {
    validarParametros({ nombre, descripcion });
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}

function validarParametros({ nombre, descripcion }) {
    if (!esTextoNoVacio(nombre)) {
        throw new Error('El nombre es obligatorio');
    }
    if (descripcion !== undefined && typeof descripcion !== 'string') {
        throw new Error('La descripcion debe ser un texto');
    }
}
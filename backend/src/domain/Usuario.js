import { esTextoNoVacio } from '../utils/validaciones.js';
import { Evento } from './Evento.js';

export class Usuario {
    constructor({ nombre, apellido } = {}) {
        validarParametros({ nombre, apellido });
        this.nombre = nombre;
        this.apellido = apellido;
        this.favoritos = [];
    }

    agregarFavorito(evento) {
        if (!(evento instanceof Evento)) {
            throw new Error('El evento no es válido');
        }

        if (!this.favoritos.includes(evento)) {
            this.favoritos.push(evento);
        }
    }
}

function validarParametros({ nombre, apellido }) {
    if (!esTextoNoVacio(nombre)) {
        throw new Error('El nombre es obligatorio');
    }
    if (!esTextoNoVacio(apellido)) {
        throw new Error('El apellido es obligatorio');
    }
}

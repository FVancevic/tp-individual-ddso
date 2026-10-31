import { Usuario } from './Usuario.js';
import { esTextoNoVacio } from '../utils/validaciones.js';

export class Mensaje {
    constructor({ usuario, mensaje } = {}) {
        validarParametros({ usuario, mensaje });
        this.usuario = usuario;
        this.mensaje = mensaje;
        this.enviado = new Date();
    }
}

function validarParametros({ usuario, mensaje }) {
    if (!(usuario instanceof Usuario)) {
        throw new Error('El usuario debe ser una instancia de Usuario');
    }
    if (!esTextoNoVacio(mensaje)) {
        throw new Error('El mensaje es requerido');
    }
}
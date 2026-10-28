import { esTextoNoVacio } from '../utils/validaciones.js';
import { Categoria } from './Categoria.js';
import { TipoEntrada } from './TipoEntrada.js';
import { Usuario } from './Usuario.js';

export class Evento {
    constructor({
        nombre,
        descripcion,
        categoria,
        fecha,
        ubicacion,
        tiposEntrada,
        multimedia = [],
        organizador
    } = {}) {
        validarParametros({ nombre, descripcion, categoria, fecha, ubicacion, tiposEntrada, multimedia, organizador });
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.fecha = fecha;
        this.ubicacion = ubicacion;
        this.tiposEntrada = tiposEntrada;
        this.multimedia = multimedia;
        this.organizador = organizador;
    }

    tuPrecioEstaEntre(min, max) {
        if (!Number.isFinite(min) || !Number.isFinite(max) || min > max || min < 0 || max < 0) {
            throw new Error('Los valores min y max deben ser números mayores a cero y min no puede ser mayor que max');
        }
        return this.tiposEntrada.some(tipoEntrada => tipoEntrada.precio >= min && tipoEntrada.precio <= max);
    }
}

function validarParametros({ nombre, descripcion, categoria, fecha, ubicacion, tiposEntrada, multimedia, organizador }) {
    if (!esTextoNoVacio(nombre)) {
        throw new Error('El nombre del evento es obligatorio y no puede estar vacío');
    }
    if (descripcion !== undefined && typeof descripcion !== 'string') {
        throw new Error('La descripcion debe ser un texto');
    }
    if (!(categoria instanceof Categoria)) {
        throw new Error('La categoria debe ser una instancia de Categoria');
    }
    if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) {
        throw new Error('La fecha debe ser una instancia de Date valida');
    }
    if (!esTextoNoVacio(ubicacion)) {
        throw new Error('La ubicación del evento es obligatoria y no puede estar vacia');
    }
    if (
        !Array.isArray(tiposEntrada) ||
        tiposEntrada.length === 0 ||
        !tiposEntrada.every(te => te instanceof TipoEntrada)
    ) {
        throw new Error('Los tipos de entrada deben ser un arreglo de instancias de TipoEntrada y debe haber al menos un TipoEntrada');
    }
    if (!Array.isArray(multimedia) || !multimedia.every(m => typeof m === 'string')) {
        throw new Error('El multimedia debe ser un arreglo de strings');
    }
    if (!(organizador instanceof Usuario)) {
        throw new Error('El organizador debe ser una instancia de Usuario');
    }
}

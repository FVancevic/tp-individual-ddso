import { Evento } from '../../src/domain/Evento.js';
import { Categoria } from '../../src/domain/Categoria.js';
import { TipoEntrada } from '../../src/domain/TipoEntrada.js';
import { Usuario } from '../../src/domain/Usuario.js';

const UN_DIA = 24 * 60 * 60 * 1000;
// Relativa a "ahora": una fecha fija se volvería pasada con el tiempo y rompería los tests.
const FECHA_FUTURA = new Date(Date.now() + 365 * UN_DIA);
const MENSAJE_RANGO = 'Los valores min y max deben ser números mayores o iguales a cero y min no puede ser mayor que max';

function crearUsuario(overrides = {}) {
    return new Usuario({
        nombre: 'Organizador',
        apellido: 'Evento',
        ...overrides,
    });
}

function crearEvento(overrides = {}) {
    return new Evento({
        nombre: 'Concierto de Rock',
        descripcion: 'Un concierto de rock increíble',
        categoria: new Categoria({ nombre: 'Música' }),
        fecha: FECHA_FUTURA,
        ubicacion: 'Teatro Principal',
        tiposEntrada: [
            new TipoEntrada({ nombre: 'General', precio: 50, cupo: 100 }),
        ],
        organizador: crearUsuario(),
        ...overrides,
    });
}

describe('Evento', () => {
    describe('creación', () => {
        test('se crea con datos válidos', () => {
            const evento = crearEvento();
            expect(evento.nombre).toBe('Concierto de Rock');
            expect(evento.descripcion).toBe('Un concierto de rock increíble');
            expect(evento.categoria.nombre).toBe('Música');
            expect(evento.fecha).toEqual(FECHA_FUTURA);
            expect(evento.ubicacion).toBe('Teatro Principal');
            expect(evento.tiposEntrada.length).toBe(1);
            expect(evento.tiposEntrada[0].nombre).toBe('General');
            expect(evento.tiposEntrada[0].precio).toBe(50);
            expect(evento.tiposEntrada[0].cupo).toBe(100);
            expect(evento.organizador.nombre).toBe('Organizador');
            expect(evento.organizador.apellido).toBe('Evento');
            expect(evento.multimedia).toEqual([]);
        });

        test('se crea sin descripcion', () => {
            const evento = crearEvento({ descripcion: undefined });
            expect(evento.descripcion).toBeUndefined();
        });

        test('se crea con multimedia', () => {
            const multimedia = ['imagen1.jpg', 'video1.mp4'];
            const evento = crearEvento({ multimedia });
            expect(evento.multimedia).toEqual(multimedia);
        });
    });

    describe('validaciones', () => {
        test('rechaza un nombre vacío', () => {
            expect(() => crearEvento({ nombre: '' })).toThrow('El nombre del evento es obligatorio y no puede estar vacío');
        });

        test('rechaza un nombre de solo espacios', () => {
            expect(() => crearEvento({ nombre: '   ' })).toThrow('El nombre del evento es obligatorio y no puede estar vacío');
        });

        test('rechaza una descripción que no es texto', () => {
            expect(() => crearEvento({ descripcion: 123 })).toThrow('La descripcion debe ser un texto');
        });

        test('rechaza una categoria inválida', () => {
            expect(() => crearEvento({ categoria: {} })).toThrow('La categoria debe ser una instancia de Categoria');
        });

        test('rechaza una fecha que no es un Date', () => {
            expect(() => crearEvento({ fecha: '2030-01-10' })).toThrow('La fecha debe ser una instancia de Date valida');
        });

        test('rechaza una fecha Date inválida', () => {
            expect(() => crearEvento({ fecha: new Date('abc') })).toThrow('La fecha debe ser una instancia de Date valida');
        });

        test('rechaza una fecha pasada', () => {
            expect(() => crearEvento({ fecha: new Date('2020-01-01') })).toThrow('La fecha del evento no puede ser anterior a la fecha actual');
        });

        test('rechaza una ubicación vacía', () => {
            expect(() => crearEvento({ ubicacion: '' })).toThrow('La ubicación del evento es obligatoria y no puede estar vacia');
        });

        test('rechaza tipos de entrada inválidos', () => {
            expect(() => crearEvento({ tiposEntrada: [] })).toThrow('Los tipos de entrada deben ser un arreglo de instancias de TipoEntrada y debe haber al menos un TipoEntrada');
            expect(() => crearEvento({ tiposEntrada: [{}] })).toThrow('Los tipos de entrada deben ser un arreglo de instancias de TipoEntrada y debe haber al menos un TipoEntrada');
        });

        test('rechaza tipos de entrada que no son un arreglo', () => {
            expect(() => crearEvento({ tiposEntrada: undefined })).toThrow('Los tipos de entrada deben ser un arreglo de instancias de TipoEntrada y debe haber al menos un TipoEntrada');
        });

        test('rechaza un organizador inválido', () => {
            expect(() => crearEvento({ organizador: {} })).toThrow('El organizador debe ser una instancia de Usuario');
        });

        test('rechaza multimedia inválido', () => {
            expect(() => crearEvento({ multimedia: 'imagen1.jpg' })).toThrow('El multimedia debe ser un arreglo de strings');
            expect(() => crearEvento({ multimedia: [123] })).toThrow('El multimedia debe ser un arreglo de strings');
        });
    });

    describe('tuPrecioEstaEntre', () => {
        test('retorna true si hay un tipo de entrada dentro del rango', () => {
            const evento = crearEvento();
            expect(evento.tuPrecioEstaEntre(40, 60)).toBe(true);
        });

        test('retorna true si hay un tipo de entrada igual al min y max', () => {
            const evento = crearEvento();
            expect(evento.tuPrecioEstaEntre(50, 50)).toBe(true);
        });

        test('retorna false si no hay tipos de entrada dentro del rango', () => {
            const evento = crearEvento();
            expect(evento.tuPrecioEstaEntre(60, 100)).toBe(false);
        });

        test('con varios tipos de entrada alcanza con que uno esté en el rango', () => {
            const evento = crearEvento({
                tiposEntrada: [
                    new TipoEntrada({ nombre: 'General', precio: 50, cupo: 100 }),
                    new TipoEntrada({ nombre: 'VIP', precio: 500, cupo: 10 }),
                ],
            });
            expect(evento.tuPrecioEstaEntre(40, 60)).toBe(true);
            expect(evento.tuPrecioEstaEntre(400, 600)).toBe(true);
            expect(evento.tuPrecioEstaEntre(100, 200)).toBe(false);
        });

        test('lanza error si min es mayor que max', () => {
            const evento = crearEvento();
            expect(() => evento.tuPrecioEstaEntre(60, 50)).toThrow(MENSAJE_RANGO);
        });

        test('lanza error si algún límite es negativo', () => {
            const evento = crearEvento();
            expect(() => evento.tuPrecioEstaEntre(-1, 50)).toThrow(MENSAJE_RANGO);
        });

        test('lanza error si algún límite es NaN', () => {
            const evento = crearEvento();
            expect(() => evento.tuPrecioEstaEntre(NaN, 50)).toThrow(MENSAJE_RANGO);
        });

        test('lanza error si algún límite no es un número', () => {
            const evento = crearEvento();
            expect(() => evento.tuPrecioEstaEntre('10', 50)).toThrow(MENSAJE_RANGO);
        });

        test('lanza error si no recibe límites', () => {
            const evento = crearEvento();
            expect(() => evento.tuPrecioEstaEntre()).toThrow(MENSAJE_RANGO);
        });
    });
});
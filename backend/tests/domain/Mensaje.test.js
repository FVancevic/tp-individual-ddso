import { Mensaje } from '../../src/domain/Mensaje.js';
import { Usuario } from '../../src/domain/Usuario.js';

function crearMensaje(overrides = {}) {
    return new Mensaje({
        usuario: crearUsuario(),
        mensaje: 'Hola',
        ...overrides,
    });
}

function crearUsuario(overrides = {}) {
    return new Usuario({
        nombre: 'Juan',
        apellido: 'Pérez',
        ...overrides,
    });
}

describe('Mensaje', () => {
    describe('creacion', () => {
        test('se crea con datos válidos', () => {
            const antes = Date.now();
            const mensaje = crearMensaje();
            const despues = Date.now();
            expect(mensaje.usuario.nombre).toBe('Juan');
            expect(mensaje.usuario.apellido).toBe('Pérez');
            expect(mensaje.mensaje).toBe('Hola');
            expect(mensaje.enviado).toBeInstanceOf(Date);
            expect(mensaje.enviado.getTime()).toBeGreaterThanOrEqual(antes);
            expect(mensaje.enviado.getTime()).toBeLessThanOrEqual(despues);
        });
    });

    describe('validaciones', () => {
        test('rechaza un mensaje vacío', () => {
            expect(() => crearMensaje({ mensaje: '' })).toThrow('El mensaje es requerido');
        });

        test('rechaza un mensaje de solo espacios', () => {
            expect(() => crearMensaje({ mensaje: '   ' })).toThrow('El mensaje es requerido');
        });

        test('rechaza un mensaje que no es texto', () => {
            expect(() => crearMensaje({ mensaje: 123 })).toThrow('El mensaje es requerido');
            expect(() => crearMensaje({ mensaje: null })).toThrow('El mensaje es requerido');
            expect(() => crearMensaje({ mensaje: undefined })).toThrow('El mensaje es requerido');
        });

        test('acepta un mensaje con números escritos como texto', () => {
            const mensaje = crearMensaje({ mensaje: '123' });
            expect(mensaje.mensaje).toBe('123');
        });

        test('rechaza un usuario invalido', () => {
            expect(() => crearMensaje({ usuario: {} })).toThrow('El usuario debe ser una instancia de Usuario');
        });

        test('rechaza un usuario ausente', () => {
            expect(() => crearMensaje({ usuario: undefined })).toThrow('El usuario debe ser una instancia de Usuario');
        });

        test('rechaza la creación sin argumentos', () => {
            expect(() => new Mensaje()).toThrow('El usuario debe ser una instancia de Usuario');
        });
    });
});
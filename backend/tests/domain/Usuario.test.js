import { Usuario } from '../../src/domain/Usuario.js';

function crearUsuario(overrides = {}) {
    return new Usuario({
        nombre: 'Juan',
        apellido: 'Pérez',
        favoritos: ['evento1', 'evento2'],
        ...overrides,
    });
}

describe('Usuario', () => {
    describe('creación', () => {
        test('se crea con datos válidos', () => {
            const usuario = crearUsuario();
            expect(usuario.nombre).toBe('Juan');
            expect(usuario.apellido).toBe('Pérez');
            expect(usuario.favoritos).toEqual(['evento1', 'evento2']);
        });

        test('se crea con favoritos vacíos', () => {
            const usuario = crearUsuario({ favoritos: undefined });
            expect(usuario.favoritos).toEqual([]);
        });
    });

    describe('validaciones', () => {
        test('rechaza un nombre vacío', () => {
            expect(() => crearUsuario({ nombre: '' })).toThrow('El nombre es obligatorio');
        });

        test('rechaza un apellido vacío', () => {
            expect(() => crearUsuario({ apellido: '' })).toThrow('El apellido es obligatorio');
        });

        test('rechaza favoritos que no son un arreglo', () => {
            expect(() => crearUsuario({ favoritos: 'no es un arreglo' })).toThrow('Los favoritos deben ser un arreglo');
        });
    });
});
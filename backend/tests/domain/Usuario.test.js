import { Usuario } from '../../src/domain/Usuario.js';
import { Evento } from '../../src/domain/Evento.js';
import { Categoria } from '../../src/domain/Categoria.js';
import { TipoEntrada } from '../../src/domain/TipoEntrada.js';

function crearUsuario(overrides = {}) {
    return new Usuario({
        nombre: 'Juan',
        apellido: 'Pérez',
        ...overrides,
    });
}

function crearEvento(overrides = {}) {
    return new Evento({
        nombre: 'Concierto de Rock',
        descripcion: 'Un concierto de rock increíble',
        categoria: new Categoria({ nombre: 'Música' }),
        fecha: new Date(),
        ubicacion: 'Teatro Principal',
        tiposEntrada: [
            new TipoEntrada({ nombre: 'General', precio: 50, cupo: 100 }),
        ],
        organizador: crearUsuario({ nombre: 'Organizador', apellido: 'Evento' }),
        ...overrides,
    });
}


describe('Usuario', () => {
    describe('creación', () => {
        test('se crea con datos válidos', () => {
            const usuario = crearUsuario();
            expect(usuario.nombre).toBe('Juan');
            expect(usuario.apellido).toBe('Pérez');
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
    });

    describe('agregarFavorito', () => {
        test('agrega un evento a favoritos', () => {
            const usuario = crearUsuario();
            const evento = crearEvento();
            usuario.agregarFavorito(evento);
            expect(usuario.favoritos).toContain(evento);
        });

        test('no agrega un evento inválido', () => {
            const usuario = crearUsuario();
            expect(() => usuario.agregarFavorito({})).toThrow('El evento no es válido');
        });

        test('no agrega un evento duplicado', () => {
            const usuario = crearUsuario();
            const evento = crearEvento();
            usuario.agregarFavorito(evento);
            usuario.agregarFavorito(evento);
            expect(usuario.favoritos.length).toBe(1);
        });
    });
});
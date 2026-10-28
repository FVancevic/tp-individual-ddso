import { Categoria } from '../../src/domain/Categoria.js';

function crearCategoria(overrides = {}) {
    return new Categoria({
        nombre: 'Conciertos',
        descripcion: 'Eventos de música en vivo',
        ...overrides,
    });
}

describe('Categoria', () => {
    describe('creación', () => {
        test('se crea con datos válidos', () => {
            const categoria = crearCategoria();
            expect(categoria.nombre).toBe('Conciertos');
            expect(categoria.descripcion).toBe('Eventos de música en vivo');
        });

        test('se crea con descripción vacía', () => {
            const categoria = crearCategoria({ descripcion: '' });
            expect(categoria.descripcion).toBe('');
        });

        test('se crea sin descripción', () => {
            const categoria = crearCategoria({ descripcion: undefined });
            expect(categoria.descripcion).toBeUndefined();
        });
    });

    describe('validaciones', () => {
        test('rechaza un nombre vacío', () => {
            expect(() => crearCategoria({ nombre: '' })).toThrow('El nombre es obligatorio');
        });

        test('rechaza un nombre de solo espacios', () => {
            expect(() => crearCategoria({ nombre: '   ' })).toThrow('El nombre es obligatorio');
        });

        test('rechaza un nombre que no es texto', () => {
            expect(() => crearCategoria({ nombre: 123 })).toThrow('El nombre es obligatorio');
        });

        test('rechaza una descripción que no es texto', () => {
            expect(() => crearCategoria({ descripcion: 123 })).toThrow('La descripcion debe ser un texto');
        });

    });
});
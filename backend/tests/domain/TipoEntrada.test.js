import { TipoEntrada } from "../../src/domain/TipoEntrada.js";

function crearTipoEntrada(overrides = {}) {
    return new TipoEntrada({
        nombre: "General",
        descripcion: "Acceso general",
        precio: 5000,
        cupo: 100,
        ...overrides,
    });
}

describe("TipoEntrada", () => {
    describe("creación", () => {
        test("se crea con datos válidos", () => {
            const entrada = crearTipoEntrada();
            expect(entrada.nombre).toBe("General");
            expect(entrada.descripcion).toBe("Acceso general");
            expect(entrada.precio).toBe(5000);
            expect(entrada.cupo).toBe(100);
        });

        test("se crea con descripción vacía", () => {
            const entrada = crearTipoEntrada({ descripcion: "" });
            expect(entrada.descripcion).toBe("");
        });

        test("se crea sin descripción", () => {
            const entrada = crearTipoEntrada({ descripcion: undefined });
            expect(entrada.descripcion).toBeUndefined();
        });

        test("se crea con precio 0", () => {
            const entrada = crearTipoEntrada({ precio: 0 });
            expect(entrada.precio).toBe(0);
        });

        test("se crea con cupo 0", () => {
            const entrada = crearTipoEntrada({ cupo: 0 });
            expect(entrada.cupo).toBe(0);
        });
    });

    describe("validaciones", () => {
        test("rechaza un nombre vacío", () => {
            expect(() => crearTipoEntrada({ nombre: "" })).toThrow("El nombre es obligatorio");
        });

        test("rechaza un nombre de solo espacios", () => {
            expect(() => crearTipoEntrada({ nombre: "   " })).toThrow("El nombre es obligatorio");
        });

        test("rechaza un nombre que no es texto", () => {
            expect(() => crearTipoEntrada({ nombre: 123 })).toThrow("El nombre es obligatorio");
        });

        test("rechaza una descripción que no es texto", () => {
            expect(() => crearTipoEntrada({ descripcion: 123 })).toThrow("La descripcion debe ser un texto");
        });

        test("rechaza un precio negativo", () => {
            expect(() => crearTipoEntrada({ precio: -100 })).toThrow("El precio debe ser un numero mayor o igual a 0");
        });

        test("rechaza un precio que no es número", () => {
            expect(() => crearTipoEntrada({ precio: "abc" })).toThrow("El precio debe ser un numero mayor o igual a 0");
        });

        test("rechaza un cupo negativo", () => {
            expect(() => crearTipoEntrada({ cupo: -10 })).toThrow("El cupo debe ser un numero entero mayor o igual a 0");
        });

        test("rechaza un cupo decimal", () => {
            expect(() => crearTipoEntrada({ cupo: 2.5 })).toThrow("El cupo debe ser un numero entero mayor o igual a 0");
        });

        test("rechaza crear sin ningún argumento", () => {
            expect(() => new TipoEntrada()).toThrow("El nombre es obligatorio");
        });
    });

    describe("hayCupoPara", () => {
        test("hay cupo si la cantidad es menor al cupo", () => {
            const entrada = crearTipoEntrada();
            expect(entrada.hayCupoPara(5)).toBe(true);
        });

        test("hay cupo si la cantidad es igual al cupo", () => {
            const entrada = crearTipoEntrada();
            expect(entrada.hayCupoPara(100)).toBe(true);
        });

        test("no hay cupo si la cantidad supera al cupo", () => {
            const entrada = crearTipoEntrada();
            expect(entrada.hayCupoPara(101)).toBe(false);
        });
    });
});

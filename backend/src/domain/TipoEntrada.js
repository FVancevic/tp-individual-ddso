export class TipoEntrada {
    constructor(nombre, descripcion, precio, cupo) {
        this.validarParametros(nombre, descripcion, precio, cupo);
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cupo = cupo;
    }

    validarParametros(nombre, descripcion, precio, cupo) {
        if (!nombre || !descripcion || !Number.isFinite(precio) || !Number.isInteger(cupo)) {
            throw new Error('Los campos nombre, descripcion, precio y cupo son obligatorios');
        }
        if( precio < 0 || cupo < 0) {
            throw new Error('El precio y el cupo deben ser mayores o iguales a 0');
        }
    }

    hayCupoPara(cantidad) {
        return this.cupo >= cantidad;
    }
}
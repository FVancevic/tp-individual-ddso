export function esTextoNoVacio(valor) {
    return typeof valor === 'string' && valor.trim() !== '';
}
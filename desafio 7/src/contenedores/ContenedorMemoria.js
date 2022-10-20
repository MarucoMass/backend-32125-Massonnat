class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    listar(id) {
        const productoId = this.elementos.find(elem => elem.id == id);
        return productoId;
    }

    listarAll() {
        return this.elementos;
    }

    guardar(elem) {
        const id = this.elementos.length === 0 ? 1 : this.elementos[this.elementos.length - 1].id + 1;
        elem.id = id;
        this.elementos.push(elem);
        return elem;
    }

    actualizar(elem, id) {
        const elemEncontrado = this.listar(id);
        elemEncontrado.title = elem.title;
        elemEncontrado.price = elem.price;
        elemEncontrado.thumbnail = elem.thumbnail;
    }

    borrar(id) {
        this.elementos = this.elementos.filter(elem => elem.id != id);
    }

    borrarAll() {
        this.elementos = [];
    }
}

export default ContenedorMemoria;
import { promises as fs } from 'fs'
import config from '../config.js'

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = `${config.fileSystem.path}/${ruta}`;
    }

    async listar(id) {
        try {
            const array = await this.listarAll()
            const archivoId = array.find(elem => elem.id === id)
            const booleano = archivoId ? archivoId : { error : 'el ID que buscas no se encuentra en este arreglo' }
            return booleano;
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
            
        }
    }

    async listarAll() {
        try {
            const array = await fs.readFile(this.routeFile);
        
            const arrayParseado = JSON.parse(array);
    
            return arrayParseado;
            
        } catch (error) {
            const array = []
    
            return array
        }
    }

    async guardar(elem) {
        try {
            const array = await this.listarAll()
            const id = array.length === 0 ? 1 : array[array.length - 1].id + 1
            elem.id = id;
            elem.timestamp = new Date().toLocaleString();
            array.push(elem);
            
            const stringifyArray = JSON.stringify(array, null, 3)
            await fs.writeFile(this.ruta, stringifyArray)
    
            return elem;
            
        } catch (error) {
            console.log(`Error al guardar: ${error}`)
            return error
        }
    }

    async actualizar(elem, id) {
        try {
            const array = await this.listarAll();
            const archivoEncontrado = array.findIndex(elem => elem.id === id);
            array[archivoEncontrado] = {
                ...array[archivoEncontrado],
                ...elem,
            };

            const stringifyArray = JSON.stringify(array, null, 3);
            await fs.writeFile(this.ruta, stringifyArray);

            const booleano = archivoEncontrado ? archivoEncontrado : { error : 'el ID que buscas no se encuentra en este arreglo' }
            return booleano;
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
    }

    async borrar(id) {
        try {
            const array = await this.listarAll();
            const arrayFiltrado = array.filter(elem => elem.id !== id);
            const archivoEncontrado = array.find(elem => elem.id === id);

            const stringifyArray = JSON.stringify(arrayFiltrado, null, 3);
            await fs.writeFile(this.ruta, stringifyArray);

            const booleano = archivoEncontrado ? arrayFiltrado : { error : 'el ID que buscas no se encuentra en este arreglo' }
            return booleano;
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
    }

    async borrarAll() {
        try {
            // await fs.promises.unlink(this.ruta)
            await fs.writeFile(this.ruta, []);
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
    }
}

export default ContenedorArchivo;
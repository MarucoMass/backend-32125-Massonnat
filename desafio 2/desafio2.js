const fs = require('fs')

class Contenedor{
    constructor(routeFile){
        this.routeFile = routeFile
    }

    async getAll(){
        try {
            
            const data = await fs.promises.readFile(this.routeFile)
    
            const dataParse = JSON.parse(data)
    
            return dataParse

        } catch (error) {

            const array = []
            await fs.promises.writeFile(this.routeFile, array)
            return array
        }
    }

    async save(object){
        try {
            
            const elements = await this.getAll()

            const newId = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1
            object.id = newId

            elements.push(object)

            const stringifyElements = JSON.stringify(elements, null, 3)

            await fs.promises.writeFile(this.routeFile, stringifyElements)

            return newId
        } catch (error) {

            console.log(`Errer al guardar: ${error}`)
            return error
        }

    }
    async getById(id){
        try {
            
            const elements = await this.getAll()

            const elementId = elements.find(elem => elem.id === id)

            return elementId

        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            
            const elements = await this.getAll()

            const newArray = elements.filter(elem => elem.id !== id)

            const newArrayStringify = JSON.stringify(newArray, null, 3)

            await fs.promises.writeFile(this.routeFile, newArrayStringify)

            return 'Producto eliminado'

        } catch (error) {
            
            console.log(error)
        }
    }
    async deleteAll() {
        try {

            await fs.promises.writeFile(this.routeFile, JSON.stringify([]))

        } catch (error) {

            console.log(error)

        }
    }
}

module.exports = Contenedor
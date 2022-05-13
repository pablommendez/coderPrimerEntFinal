const fs = require('fs')
const ErrorResponse = require('../models/ErrorResponse')
class ProductosEnArchivoDB {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = nombreDeArchivo
    }

    obtenerRuta() {
        return `./${this.nombreDeArchivo}`
    }

    obtenerID(itemsEnArchivo) {
        const cantidadDeitems = itemsEnArchivo.length
        if (cantidadDeitems === 0 || cantidadDeitems === undefined) {
            return 1
        }
        return itemsEnArchivo[cantidadDeitems - 1].id + 1
    }

    async save(objetoAGuardar) {
        try {
            const itemsEnArchivo = await this.getAll()
            const objetoConId = { ...objetoAGuardar, id: this.obtenerID(itemsEnArchivo) }
            const nuevoContenidoDeArchivo = [...itemsEnArchivo, objetoConId]
            await fs.promises.writeFile(this.obtenerRuta(), JSON.stringify(nuevoContenidoDeArchivo, null, 2))
            return objetoConId
        }
        catch (error) {
            throw Error('Ha ocurrido el siguiente error' + error)
        }
    }

    async getById(id) {
        try {
            const itemsEnArchivo = await this.getAll()
            const objetoEncontradoPorId = itemsEnArchivo.find(item => item.id === id)
            return objetoEncontradoPorId !== undefined ? objetoEncontradoPorId : null
        }
        catch (error) {
            throw Error('Ha ocurrido el siguiente error' + error)
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.nombreDeArchivo, 'utf-8'))
        } catch (error) {
            throw Error('Ha ocurrido el siguiente error' + error)
        }
    }

    async deleteById(id) {
        try {
            const itemsEnArchivo = await this.getAll()
            const item = itemsEnArchivo.find(item => item.id === id)
            if (item === undefined) {
                throw  new ErrorResponse("Item no econtrado para actualizar",404)
            }
            const itemsFiltrados = itemsEnArchivo.filter(item => item.id !== id)
            const nuevoContenidoDeArchivo = [...itemsFiltrados]
            await fs.promises.writeFile(this.obtenerRuta(), JSON.stringify(nuevoContenidoDeArchivo, null, 2))
            return item
        }
        catch (error) {
            throw Error(error);
        }
    }

    async update(item, id) {
        try {
            const itemOriginal = await this.getById(id)
            if (!itemOriginal) throw new ErrorResponse("Item no econtrado para actualizar",404)
            let productos = await this.getAll()
            productos = productos.map(producto => producto.id == id ? { ...itemOriginal, ...item } : producto)
            await fs.promises.writeFile(this.obtenerRuta(), JSON.stringify(productos, null, 2))
        } catch (error) {
            throw error
        }
    }
}

module.exports = new ProductosEnArchivoDB('productos.txt')
const Producto = require("../models/Producto")

class ProductosController{
    constructor(db) {
        this.db = db
    }

    async getProductos(){
        try {
            return await this.db.getAll()
        } catch (error) {
            throw error
        }
    }

    async addProducto(prod) {
        try {
            const {nombre, descripcion, codigo, fotoUrl, precio, stock} = prod
            const producto = new Producto(nombre, descripcion, codigo, fotoUrl,precio, stock)
            return await this.db.save(producto)
        } catch (error) {
            throw error
        }
    }

    async getProductoById(id){
        try {
            return await this.db.getById(Number(id))
        } catch (error) {
            throw error
        }
    }

    async update(producto, id){
        try {
            await this.db.update(producto, Number(id))
        } catch (error) {
            throw error
        }
    }
    async deleteById(id){
        try {
            const item = await this.db.deleteById(Number(id))
            return item
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductosController

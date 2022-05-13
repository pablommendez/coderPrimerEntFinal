class Producto{
    constructor(nombre, descripcion, codigo, fotoUrl, precio, stock, id){
        this.timeStamp = Date.now()
        this.nombre = nombre
        this.descripcion = descripcion || ''
        this.codigo = codigo
        this.fotoUrl = fotoUrl || ''
        this.precio = precio || 0
        this.stock = stock || 0
        this.id = id
    }
}

module.exports = Producto
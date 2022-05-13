const { Router } = require("express");
const ProductosController = require("../../controllers/productosController");
const db = require('../../db/db');
const isAdmin = require("../../middleware/auth");
const ErrorResponse = require("../../models/ErrorResponse");

const router = Router()
const controller = new ProductosController(db.ProductosEnArchivoDB)


router.get('/', async (req, res) => {
    try {
        const productos = await controller.getProductos()
        res.json(productos).status(200)
    } catch (error) {
        res.status(500).json(new ErrorResponse(`Lo sentimos ha ocurrido el error ${error}`, 500))

    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const producto = await controller.getProductoById(id)
        if (!producto) res.status(404).json(new ErrorResponse('No se han encontrado productos para el id' + id, 404))
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json(new ErrorResponse(`Lo sentimos ha ocurrido el error ${error}`, 500))
    }
})

router.post('/', isAdmin, async (req, res) => {
    try {
        const producto = req.body
        const productoGuardado = await controller.addProducto(producto)
        res.json(productoGuardado).status(200)
    } catch (error) {
        res.status(500).json(new ErrorResponse(`Lo sentimos ha ocurrido el error ${error}`, 500))
    }
})

router.put('/:id', isAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const producto = req.body
        await controller.update(producto, id)
        res.status(204).json()

    } catch (error) {
        if (!error.codigo === 404) {
            res.status(404).json(error)
        } else {
            res.status(500).json(new ErrorResponse(`Lo sentimos ha ocurrido el error ${error}`, 500))
        }
    }
})

router.delete('/:id', isAdmin, async (req, res) => {
    try {
        const id = req.params.id
        const item = await controller.deleteById(id)
        res.status(200).json({deetedItem:item})
    } catch (error) {
        if (!error.codigo === 404) {
            res.status(404).json(error)
        } else {
            res.status(500).json(new ErrorResponse(`Lo sentimos ha ocurrido el error ${error}`, 500))
        }
    }
})

module.exports = router
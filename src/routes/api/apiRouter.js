const { Router } = require("express");
const productosRouter = require('./productosRouter')
const carritoRouter = require('./carritoRouter.js')

const router = Router()

router.use('/productos', productosRouter)
router.use('/carrito', carritoRouter)

module.exports = router
const ErrorResponse = require("../models/ErrorResponse")

module.exports = (req, res, next) => {
    const isAdmin = req.headers.admin
    if(isAdmin !== "true"){
        res.status(403).json(new ErrorResponse("No tenes acceso a la ruta solicitada",403))
        return
    }
    next()
}
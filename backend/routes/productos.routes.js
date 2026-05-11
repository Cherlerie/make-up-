const express = require('express');

const router = express.Router();

const controller = require('../controllers/productos.controller');

const validarProducto = require('../middlewares/validator');

router.get('/productos', controller.obtenerProductos);

router.get('/productos/:id', controller.obtenerProducto);

router.post(
    '/productos',
    validarProducto,
    controller.crearProducto
);

router.put(
    '/productos/:id',
    validarProducto,
    controller.actualizarProducto
);

router.delete(
    '/productos/:id',
    controller.eliminarProducto
);

module.exports = router;
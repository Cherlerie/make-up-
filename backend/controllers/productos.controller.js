const Producto = require('../models/Producto');

exports.obtenerProductos = async (req, res) => {

    try {

        const filtros = {};

        if(req.query.categoria){
            filtros.categoria = req.query.categoria;
        }

        if(req.query.marca){
            filtros.marca = req.query.marca;
        }

        const productos = await Producto.findAll({
            where: filtros
        });

        res.json(productos);

    } catch(error){

        res.status(500).json(error);

    }

};

exports.obtenerProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if(!producto){
            return res.status(404).json({
                mensaje:'Producto no encontrado'
            });
        }

        res.json(producto);

    } catch(error){

        res.status(500).json(error);

    }

};

exports.crearProducto = async (req, res) => {

    try {

        const producto = await Producto.create(req.body);

        res.status(201).json(producto);

    } catch(error){

        res.status(500).json(error);

    }

};

exports.actualizarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if(!producto){
            return res.status(404).json({
                mensaje:'Producto no encontrado'
            });
        }

        await producto.update(req.body);

        res.json(producto);

    } catch(error){

        res.status(500).json(error);

    }

};

exports.eliminarProducto = async (req, res) => {

    try {

        const producto = await Producto.findByPk(req.params.id);

        if(!producto){
            return res.status(404).json({
                mensaje:'Producto no encontrado'
            });
        }

        await producto.destroy();

        res.json({
            mensaje:'Producto eliminado'
        });

    } catch(error){

        res.status(500).json(error);

    }

};
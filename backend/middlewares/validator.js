const validarProducto = (req, res, next) => {

    const { nombre, marca, precio, stock, categoria } = req.body;

    if(
        !nombre ||
        !marca ||
        !precio ||
        stock === undefined ||
        !categoria
    ){
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    if(isNaN(precio) || precio <= 0){
        return res.status(400).json({
            mensaje: 'Precio inválido'
        });
    }

    next();
};

module.exports = validarProducto;
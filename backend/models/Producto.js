const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },

    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0.01
        }
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Producto;
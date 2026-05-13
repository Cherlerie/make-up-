const express = require('express');
const cors = require('cors');
const path = require('path');  // 👈 Agregar esta línea (importante)
require('dotenv').config();

const sequelize = require('./config/database');
const productosRoutes = require('./routes/productos.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 👇 SERVIR ARCHIVOS ESTÁTICOS (ANTES de las rutas) 👇
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 👇 RUTAS DE LA API
app.use('/api', productosRoutes);

// 👇 INICIAR SERVIDOR
sequelize.sync()
    .then(() => {
        console.log('Base de datos conectada');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`);
        });
    })
    .catch(error => {
        console.log(error);
    });
const express = require('express');

const cors = require('cors');

require('dotenv').config();

const sequelize = require('./config/database');

const productosRoutes = require('./routes/productos.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', productosRoutes);

sequelize.sync()
.then(() => {

    console.log('Base de datos conectada');

    app.listen(process.env.PORT, () => {

        console.log(
            `Servidor corriendo en puerto ${process.env.PORT}`
        );

    });

})
.catch(error => {

    console.log(error);

});
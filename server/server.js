// Archivo de configuración
require('./config/config');

// Importamos Express
const express = require('express');
// Importamos mongoose que permite la conexión con mongodb
const mongoose = require('mongoose');
// APP EXPRESS
const app = express();
// Body-Parser
const bodyParser = require('body-parser');

// body-parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }))
// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));

// Conexión a mongodb con mongoose
mongoose.connect(process.env.URLDB, (err, res) => {
    if(err) throw err;

    console.log("Base de datos ONLINE");
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando server...");
});

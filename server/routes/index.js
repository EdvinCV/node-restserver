const express = require('express');
const app = express();

// Importar las rutas del archivo usuario
app.use(require('./usuario'));
// Importar rutas de categorias
app.use(require('./categoria'));
// Importar las rutas del login
app.use(require('./login'));

module.exports = app;
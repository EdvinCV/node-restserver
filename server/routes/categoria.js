// Express App
const express = require('express');
// Authentication middlewares
let { verifyToken } = require('../middlewares/authentication');
// App
let app = express();
// Models
const Categoria = require('../models/categoria');

// Mostrar todas las categorias : GET
app.get('/categorias', verifyToken, (req, res, next) => {
    Categoria.find({})
        .populate('usuario', 'nombre')
        .then((categorias) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                status: "ok",
                data: categorias
            });
        })
        .catch((err) => next(err));
});
// Mostrar una categoria por id : GET
app.get('/categorias/:id', verifyToken, (req, res, next) => {
    let id = req.params.id;
    Categoria.findById(id)
        .then((categoria) => {
            res.status(200).json({
                ok: true,
                data: categoria
            });
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                err
            });
        });
});
// Crear nueva categoria : POST
app.post('/categorias', verifyToken, (req, res, next) => {
    let usuarioId = req.usuario._id;
    const categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: usuarioId
    });
    categoria.save((err, categoria) => {
        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            });
        }
        res.status(200).json({
            ok: true,
            message: "Categoría creada satisfactoriamente",
            data: categoria
        })
    })
});
// Actualizar una categoria : PUT
app.put('/categorias/:id', verifyToken, (req, res, next) => {
    let categoriaId = req.params.id;
    Categoria.findByIdAndUpdate(categoriaId, {descripcion: req.body.descripcion}, {new: true}, (err, categoria) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            message: "Categoría actualizada correctamente",
            data: categoria
        });
    });
});
// Eliminar una categoria : DELETE
app.delete('/categorias/:id', verifyToken, (req, res, next) => {
    let categoriaId = req.params.id;
    Categoria.findByIdAndDelete(categoriaId, {}, (err, categoria) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            message: "Categoria eliminada correctamente",
            data: categoria
        });
    })
})

module.exports = app;
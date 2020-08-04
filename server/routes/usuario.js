const express = require('express');
const app = express();

// Import Bcrypt
const bcrypt = require('bcrypt');
// Import underscore _
const _ = require('underscore');

// Import Models
const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {

    let desde = Number(req.query.desde) || 0;


    Usuario.find({}, 'nombre email role estado google img')
        .skip(desde)
        .limit(5)
        .exec( (err, data) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        Usuario.count( {estado: true}, (err, count) => {
            res.json({
                ok: true,
                usuarios: data,
                count
            });
        });

        
    });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save( (err, user) => {

        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            user
        })

    });

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

    let options = {
        new: true,
        runValidators: true,
    }

    Usuario.findByIdAndUpdate(id, body, options, (err, user) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: user
        });

    });
});

app.delete('/usuario/:id', (req, res) => {
    
    let id = req.params.id;

    // Cambio de estado
    let cambioEstado = {
        estado: false
    }

    //Usuario.findByIdAndRemove(id, (err, user) => {

    Usuario.findByIdAndUpdate(id, cambioEstado, (err, user) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        if(!user){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            user
        })
    });

});

module.exports = app;
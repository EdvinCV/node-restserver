// Express App
const express = require('express');
const app = express();
// Bcrypt
const bcrypt = require('bcrypt');
// Models
const Usuario = require('../models/usuario');
// JWT
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, user) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!user){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseñas incorrecto'
                }
            });
        }

        if( !bcrypt.compareSync(body.password, user.password) ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseñas incorrecto'
                }
            });
        }

        let token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok: true,
            user,
            token
        });
    })
});

module.exports = app;
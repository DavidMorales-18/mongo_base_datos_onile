const express = require('express');
const bcrypt = require('bcrypt');
const app = express(); //objeto app de express
const Usuario = require('../models/usuario')
const _ = require('underscore');
const usuario = require('../models/usuario');

app.get('/usuario', (req, res) => { // peticion a la raiz --> peticiones get 
    //res.json("get Usuario"); // El json es el que domina 
    //obtener un servicion en la base de datos 
    let desde = req.query.desde || 0;
    desde = Number(desde)
    let limite = req.query.limite || 5;
    limite = Number(limite)
    Usuario.find({ estado: true }, 'nombre email role ')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                });

            }
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo
                });
            });

        });

});

app.post('/usuario', (req, res) => { //peticiones post /* ---->crear nuevos recuersos -->creaccion  */
    let body = req.body //cuerpo de la peticion

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });
    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            });
        }


        res.json({
            ok: true,
            usuario: usuarioBD

        });

    });
});

app.put('/usuario/:id', (req, res) => { //actualizar un usuario pero debe de ir con el id  //cambiar datos de ya existentes 
    //res.json("put Usiario")
    context = 'query'
    let id = req.params.id; //llega a travez de la peticion del id 
    let body = _.pick(req.body, ['mombre', 'email', 'img', 'role']);
    //busqueda el usuario que necesito encontrar 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => { //puedo actualizar todo menos el ID
        if (err) {
            return res.status(400).json({
                ok: false,
                err


            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});



app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, runValidators: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }
        if (!usuarioBD) {
            res.json({
                ok: true,
                err: {
                    menssage: 'Usuario no encontrado'
                }
            });

        } else {
            res.json({
                ok: true,
                usuario: usuarioBD
            });
        }






    });

});




module.exports = app;


// npm update -->autualizar 
//npm outdate --> desactualizados
//npm list ---> listar
//npm show express //nombre el apquete te ensena toda las caracteristica del paquete
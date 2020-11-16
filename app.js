'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const router = require('express').Router();
const fcm = require('./firebase-config').admin;

const multer = require('multer');
const uploader = multer({dest: 'images/'});

// importo los controladores
const cUsuario = require('./controllers/usuario');
const cAnuncio = require('./controllers/anuncio');
const cPropuesta = require('./controllers/propuesta');
const cChat = require('./controllers/chat');
const cNotificacion = require('./controllers/notificacion');
const cContacto = require('./controllers/contacto');

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1', router);

router.get('/test', function (req, res) {
    res.send('test');
});

router.post('/usuario/registro', cUsuario.registro);
router.post('/usuario/login', cUsuario.login);
router.get('/usuario/getPerfil', cUsuario.getPerfil);
router.put('/usuario/updateDatosPersonales', cUsuario.updateDatosPersonales);
router.put('/usuario/updatePerfilProfesional', cUsuario.updatePerfilProfesional);
router.put('/usuario/baja', cUsuario.baja);
router.put('/usuario/cambiarPwd', cUsuario.cambiarPwd);
router.post('/usuario/actualizarFoto', uploader.single('foto'), cUsuario.actualizarFoto);
router.put('/usuario/eliminarFoto', cUsuario.eliminarFoto);

router.put('/usuario/updatePerfil', uploader.single('foto'), cUsuario.updatePerfil);
router.get('/usuario/getProfesionales', cUsuario.getProfesionales);
router.get('/usuario/getProfesionalesCount', cUsuario.getProfesionalesCount);
router.get('/usuario/getProfesional', cUsuario.getProfesional);
router.get('/usuario/getReputacion', cUsuario.getReputacion);


router.get('/anuncio/getAnuncios', cAnuncio.getAnuncios);
router.get('/anuncio/getAnunciosCount', cAnuncio.getAnunciosCount);
router.get('/anuncio/getAnuncio', cAnuncio.getAnuncio);

router.get('/anuncio/getAnunciosPublicados', cAnuncio.getAnunciosPublicados);
router.get('/anuncio/getAnunciosPublicadosCount', cAnuncio.getAnunciosPublicadosCount);
router.get('/anuncio/getAnuncioPublicado', cAnuncio.getAnuncioPublicado);

router.post('/anuncio/publicarAnuncio', cAnuncio.publicarAnuncio);
router.put('/anuncio/editarAnuncio', cAnuncio.editarAnuncio);
router.put('/anuncio/eliminarAnuncio', cAnuncio.eliminarAnuncio);

router.get('/anuncio/getTrabajos', cAnuncio.getTrabajos);
router.get('/anuncio/getTrabajosCount', cAnuncio.getTrabajosCount);
router.get('/anuncio/getTrabajosPendientes', cAnuncio.getTrabajosPendientes);
router.get('/anuncio/getTrabajosFinalizados', cAnuncio.getTrabajosFinalizados);

router.post('/anuncio/calificarUsuario', cAnuncio.calificarUsuario);
router.post('/anuncio/calificarProfesional', cAnuncio.calificarProfesional);


router.get('/propuesta/getPropuestasEnviadas', cPropuesta.getPropuestasEnviadas);
router.post('/propuesta/enviarPropuesta', cPropuesta.enviarPropuesta);
router.put('/propuesta/editarPropuesta', cPropuesta.editarPropuesta);
router.post('/propuesta/aceptarPropuesta', cPropuesta.aceptarPropuesta);

router.get('/notificacion/getNotificaciones', cNotificacion.getNotificaciones);
router.put('/notificacion/setLeido', cNotificacion.setLeido);

router.get('/chat/getChat', cChat.getChat);
router.get('/chat/getChats', cChat.getChats);
router.post('/chat/nuevoMensaje', cChat.nuevoMensaje);

router.get('/contacto/getContactos', cContacto.getContactos);

router.post('/firebase/prueba', (req, res) => {
    const token = req.body.token;
    const titulo = req.body.titulo;
    const tipo = req.body.tipo;
    const message = req.body.message;
    const payload = {
        data: {
            titulo: titulo,
            tipo: tipo,
            message: message
        }
    };
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    fcm.messaging().sendToDevice(token, payload, options)
        .then(response => {
            res.status(200).send("Notificacion enviada");
        })
        .catch(error => {
            console.log(error);
        });
});

router.get('/img/:file', (req, res) => {
    const path = require('path');
    const options = {
        root: 'images/'
    };

    res.sendFile(req.params.file, options, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("img " + req.params.file);
        }
    });
});

module.exports = http;

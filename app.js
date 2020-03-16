const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const router = require('express').Router();


// importo los controladores
const cUsuario = require('./controllers/usuario');
const cPerfilLaboral = require('./controllers/perfilLaboral');
const cTrabajo = require('./controllers/trabajo');
const cProfesion = require('./controllers/profesion');
const cPropuesta = require('./controllers/propuesta');
const cChat = require('./controllers/chat');
const cNotificacion = require('./controllers/notificacion');

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1', router);

router.get('/test', function (req, res) {
    res.send('test');
});

router.post('/usuario/registro', cUsuario.registro);
router.post('/usuario/login', cUsuario.login);
router.put('/usuario', cUsuario.updateUsuario);
router.get('/usuarios/:usuarioId', cUsuario.getUsuario);
router.get('/usuarios-profesionales', cUsuario.getProfesionales);

// La idea es cambiar todo lo de perfil laboral a usuario y unificar las tablas.

router.post('/perfil-laboral', cPerfilLaboral.registro);
router.put('/perfil-laboral/activar', cPerfilLaboral.activar);
router.put('/perfil-laboral/desactivar', cPerfilLaboral.desactivar);
router.get('/perfil-profesional/:id', cPerfilLaboral.getPerfilProfesional);

router.post('/trabajo', cTrabajo.insert);
router.put('/trabajo', cTrabajo.update);
router.put('/trabajo/cancelar', cTrabajo.delete);
router.get('/trabajos', cTrabajo.getTrabajos);
router.get('/trabajo/:id', cTrabajo.getTrabajo);
router.get('/trabajo/:trabajoId/:profesionalId', cTrabajo.getTrabajoConPropuesta);

router.get('/trabajos/:usuarioId', cTrabajo.getMisTrabajos);
router.get('/trabajos/:usuarioId/:trabajoId', cTrabajo.getMiTrabajo);

router.post('/propuesta', cPropuesta.insert);
router.put('/propuesta', cPropuesta.update);
router.get('/propuestas/:profesionalId/:trabajoId', cPropuesta.getPropuesta);
router.get('/propuestas/:usuarioId', cPropuesta.getMisPropuestas);

router.get('/profesiones', cProfesion.getProfesiones);

router.get('/chats/:usuarioId', cChat.getChats);
router.get('/chats/:chatId/mensajes', cChat.getMensajes);
router.post('/chats/:chatId/enviar-mensaje', cChat.enviarMensaje);

router.get('/notificacion/all/no-leidas/:usuarioId', cNotificacion.getAllNoLeidas);
router.get('/notificacion/all/:usuarioId', cNotificacion.getAll);
router.put('/notificacion/read', cNotificacion.setReaded);

module.exports = http;

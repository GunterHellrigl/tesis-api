const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const router = require('express').Router();


// importo los controladores
const cUsuario = require('./controllers/usuario');
const cPerfilLaboral = require('./controllers/perfilLaboral');
const cSearch = require('./controllers/search');
const cTrabajo = require('./controllers/trabajo');
const cProfesion = require('./controllers/profesion');
const cPropuesta = require('./controllers/propuesta');

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1', router);

router.get('/test', function (req, res) {
    res.send('test');
});

router.post('/usuario/registro', cUsuario.registro);
router.post('/usuario/login', cUsuario.login);

router.post('/perfil-laboral', cPerfilLaboral.registro);
router.put('/perfil-laboral/activar', cPerfilLaboral.activar);
router.put('/perfil-laboral/desactivar', cPerfilLaboral.desactivar);
router.get('/perfil-profesional/:id', cPerfilLaboral.getPerfilProfesional);

router.post('/search/profesionales', cSearch.getProfesionales);
router.post('/search/trabajos', cSearch.getTrabajos);

router.post('/trabajo', cTrabajo.insert);
router.get('/trabajos', cTrabajo.getTrabajos);
router.get('/trabajos/:id', cTrabajo.getTrabajo);

router.post('/propuesta', cPropuesta.insert);
router.put('/propuesta', cPropuesta.update);
router.get('/propuestas/:profesionalId/:trabajoId', cPropuesta.getPropuesta);

router.get('/profesiones', cProfesion.getProfesiones);

module.exports = http;

const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const router = require('express').Router();


// importo los controladores
const cUsuario = require('./controllers/usuario');
const cPerfilLaboral = require('./controllers/perfilLaboral');
const cSearch = require('./controllers/search');
// const cError = require('./controllers/error');
// const cMovilUsuario = require('./controllers/movilusuario');
// const cControlVersion = require('./controllers/controlVersion');
// const cControlVersionRegistro = require('./controllers/controlVersionRegistro');
// const cControlVersionLog = require('./controllers/controlVersionLog');
// const cCenso = require('./controllers/censo');
// const cCensoRegistro = require('./controllers/censoRegistro');

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
router.post('/search/profesionales', cSearch.getProfesionales);
router.post('/search/trabajos', cSearch.getTrabajos);
// router.post('/error', cError.insert);
// router.post('/movilusuario', cMovilUsuario.insert);

// router.get('/controlversion/check/:id(\\d+)', cControlVersion.checkVersion);
// router.get('/controlversionregistro/:versionid(\\d+)', cControlVersionRegistro.getRegistros);
// router.post('/controlversionlog', cControlVersionLog.insert);
// router.get('/censo/dni/:dni', cCenso.getByDni);
// router.get('/censo/censado/:fecha', cCenso.getCensados);
// router.post('/censoregistro', cCensoRegistro.insert);

module.exports = http;

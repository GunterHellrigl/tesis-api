const v = require('validator');

exports.login = (req, res) => {
    console.log('');
    console.log("------- Usuario.login --------");
    console.log('');

    let username = (req.body.username || '').trim();
    let pwd = (req.body.pwd || '').trim();
    let token = (req.body.token || '').trim();

    if (v.isEmpty(username)) return res.status(400).json(false);
    if (v.isEmpty(pwd)) return res.status(400).json(false);

    console.log('username:', username);
    console.log('pwd:', pwd);
    console.log('token:', token);

    db.query('call usuarioLogin(?, ?, ?)', [username, pwd, token], function (error, results) {
        if (error != null) return res.status(400).json(false);

        return res.status(200).json(results[0][0].vId);
    });
};

exports.registro = (req, res) => {
    console.log('');
    console.log("------- Usuario.registro --------");
    console.log('');

    let username = (req.body.username || '').trim();
    let pwd = (req.body.pwd || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();
    let telefono = (req.body.telefono || '').trim();

    if (v.isEmpty(username)) return res.status(400).json(false);
    if (v.isEmpty(pwd)) return res.status(400).json(false);
    if (v.isEmpty(apellido)) return res.status(400).json(false);
    if (v.isEmpty(nombre)) return res.status(400).json(false);
    if (v.isEmpty(email)) return res.status(400).json(false);
    if (!v.isEmail(email)) return res.status(400).json(false);
    if (v.isEmpty(telefono)) return res.status(400).json(false);
    if (!v.isMobilePhone(telefono)) return res.status(400).json(false);

    db.query('call usuarioRegistro(?, ?, ?, ?, ?, ?)', [username, pwd, apellido, nombre, email, telefono], function (error, results) {
        if (error != null) return res.status(400).json(false);

        res.status(201).json(results[0][0].id);
    });
};

exports.getPerfil = (req, res) => {
    console.log('');
    console.log("------- Usuario.getPerfil --------");
    console.log('');

    let usuarioId = (req.query.usuarioId || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);


    db.query('call usuarioGetPerfil(?)', usuarioId, function (error, results) {
        if (error != null) return res.status(400).json(false);

        if (results[0].length === 0) return res.status(200).json(null);

        res.status(200).json({
            id: results[0][0].id,
            username: results[0][0].username,
            apellido: results[0][0].apellido,
            nombre: results[0][0].nombre,
            email: results[0][0].email,
            telefono: results[0][0].telefono,
            reputacion: results[0][0].reputacion,
            isActivo: results[0][0].isActivo === 1,
            isProfesional: results[0][0].isProfesional === 1,
            profesiones: results[0][0].profesiones || '',
            acercaDeMi: results[0][0].acercaDeMi || ''
        });
    });
};

exports.updatePerfil = (req, res) => {
    console.log('');
    console.log("------- Usuario.updatePerfil --------");
    console.log('');

    let id = (req.body.id || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();
    let telefono = (req.body.telefono || '').trim();
    let isProfesional = (req.body.isProfesional === 1);
    let profesiones = (req.body.profesiones || '').trim();
    let acercaDeMi = (req.body.acercaDeMi || '').trim();

    console.log(id);
    console.log(apellido);
    console.log(nombre);
    console.log(email);
    console.log(telefono);
    console.log(isProfesional);
    console.log(profesiones);
    console.log(acercaDeMi);

    if (v.isEmpty(id)) return res.status(400).json(false);
    if (v.isEmpty(apellido)) return res.status(400).json(false);
    if (v.isEmpty(nombre)) return res.status(400).json(false);
    if (v.isEmpty(email)) return res.status(400).json(false);
    if (!v.isEmail(email)) return res.status(400).json(false);
    if (v.isEmpty(telefono)) return res.status(400).json(false);
    if (!v.isMobilePhone(telefono)) return res.status(400).json(false);
    if (!v.isBoolean(isProfesional)) return res.status(400).json(false);

    if (isProfesional === true) {
        if (v.isEmpty(profesiones)) return res.status(400).json(false);
        if (v.isEmpty(acercaDeMi)) return res.status(400).json(false);
    }

    db.query('call usuarioUpdatePerfil(?, ?, ?, ?, ?, ?, ?, ?)', [id, apellido, nombre, email, telefono, isProfesional, profesiones, acercaDeMi], function (error, results) {
        if (error != null) return res.status(400).json(false);

        return res.status(200).send(results[0][0].ok === 1);
    });
};

exports.getProfesionales = (req, res) => {
    console.log('');
    console.log("------- Usuario.getProfesionales --------");
    console.log('');

    let query = (req.query.query || '').trim();
    let usuarioId = (req.query.usuarioId || '').trim();

    console.log('query:', query);
    console.log('usuarioId:', usuarioId);

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);

    db.query('call usuarioGetProfesionales(?, ?)', [query, usuarioId], function (error, results) {
        if (error != null) return res.status(400).json(false);

        let usuarios = [];

        for (let i = 0; i < results[0].length; i++) {
            usuarios[i] = {
                id: results[0][i].id,
                username: results[0][i].username,
                apellido: results[0][i].apellido,
                nombre: results[0][i].nombre,
                reputacion: results[0][i].reputacion,
                profesiones: results[0][i].profesiones
            }
        }

        return res.status(200).send(usuarios);
    });
};

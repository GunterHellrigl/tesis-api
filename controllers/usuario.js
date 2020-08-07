'use strict';

const v = require('validator');

exports.registro = (req, res) => {
    console.log('');
    console.log("------- Usuario.registro --------");
    console.log('');

    let username = (req.body.username || '').trim();
    let pwd = (req.body.pwd || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();

    if (v.isEmpty(username)) return res.status(400).json(false);
    if (v.isEmpty(pwd)) return res.status(400).json(false);
    if (v.isEmpty(apellido)) return res.status(400).json(false);
    if (v.isEmpty(nombre)) return res.status(400).json(false);
    if (v.isEmpty(email)) return res.status(400).json(false);
    if (!v.isEmail(email)) return res.status(400).json(false);

    const sql = 'call usuarioRegistro(?,?,?,?,?)';

    db.query(sql, [username, pwd, apellido, nombre, email], (error, results) => {
        if (error != null) return res.status(400).json(false);

        res.status(200).json(results[0][0].id);
    });
};

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
        console.log(error);
        if (error != null) return res.status(400).json(false);
        console.log(results);

        return res.status(200).json({
            id: results[0][0].vId,
            username: results[0][0].vUsername,
            apellido: results[0][0].vApellido,
            nombre: results[0][0].vNombre,
            reputacion: results[0][0].vReputacion,
	    foto: results[0][0].vFoto
        });
    });
};

exports.getPerfil = (req, res) => {
    console.log('');
    console.log("------- Usuario.getPerfil --------");
    console.log('');

    let usuarioId = (req.query.usuarioId || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);

    console.log("usuarioId", usuarioId);

    db.query('call usuarioGetPerfil(?)', usuarioId, function (e1, r1) {
        if (e1 != null) {
            console.log(e1);
            return res.status(400).json(false);
        }

        if (r1[0].length === 0) return res.status(200).json(false);

        db.query('call profesionGetByUsuario(?)', usuarioId, (e2, r2) => {
            if (e2 != null) {
                console.log(e2);
                return res.status(400).json(false);
            }

            let profesiones = [];

            for (let i = 0; i < r2[0].length; i++) {
                profesiones[i] = {
                    id: r2[0][i].id,
                    dsc: r2[0][i].dsc
                }
            }

            res.status(200).json({
                id: usuarioId,
                apellido: r1[0][0].apellido,
                nombre: r1[0][0].nombre,
                email: r1[0][0].email,
                isProfesional: r1[0][0].isProfesional === 1,
                acercaDeMi: r1[0][0].acercaDeMi || '',
                profesiones: profesiones
            });
        });
    });
};

exports.updatePerfil = (req, res) => {
    console.log('');
    console.log("------- Usuario.updatePerfil --------");
    console.log('');

    let id = (req.body.usuarioId || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();
    let isProfesional = (req.body.isProfesional == 'true')? 1 : 0;
    let profesiones = (req.body.profesiones || '').trim();
    let acercaDeMi = (req.body.acercaDeMi || '').trim();

    const fs = require('fs');
    const file = req.file;
    let foto = null;

    if (file.size > 0) {
        foto = new Buffer(fs.readFileSync(file.path));
    }

    console.log(id);
    console.log(apellido);
    console.log(nombre);
    console.log(email);
    console.log(isProfesional);
    console.log(profesiones);
    console.log(acercaDeMi);
    console.log(file);

    if (v.isEmpty(id)) return res.status(400).json(false);
    if (v.isEmpty(apellido)) return res.status(400).json(false);
    if (v.isEmpty(nombre)) return res.status(400).json(false);
    if (v.isEmpty(email)) return res.status(400).json(false);
    if (!v.isEmail(email)) return res.status(400).json(false);

    if (isProfesional === true) {
        if (v.isEmpty(profesiones)) return res.status(400).json(false);
        if (v.isEmpty(acercaDeMi)) return res.status(400).json(false);
    }

    db.query('call usuarioUpdatePerfil(?, ?, ?, ?, ?, ?, ?, ?)', [id, apellido, nombre, email, isProfesional, profesiones, acercaDeMi, file.filename], (error, results) => {
        console.log(error);
        if (error != null) return res.status(400).json(false);

        return res.status(200).send({
	    ok: results[0][0].ok === 1,
	    updated: results[0][0].ok === 1,
	    foto: file.filename	
	});
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

exports.getReputacion = (req, res) => {
    console.log('');
    console.log("------- Usuario.getReputacion --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    console.log('usuarioId:', usuarioId);

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);

    db.query('call usuarioGetReputacion(?)', [usuarioId], function (error, results) {
        if (error != null) return res.status(400).json(false);

        if (results[0].length === 0) return res.status(200).json(false);

        return res.status(200).json({
            reputacion: results[0][0].reputacion,
            anunciosPublicados: results[0][0].anunciosPublicados,
            trabajosFinalizados: results[0][0].trabajosFinalizados,
            propuestasEnviadas: results[0][0].propuestasEnviadas
        });
    });
};

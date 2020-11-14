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

    console.log('username', username);
    console.log('pwd', pwd);
    console.log('apellido', apellido);
    console.log('nombre', nombre);
    console.log('email', email);

    if (v.isEmpty(username)) return res.status(400).json(false);
    if (v.isEmpty(pwd)) return res.status(400).json(false);
    if (v.isEmpty(apellido)) return res.status(400).json(false);
    if (v.isEmpty(nombre)) return res.status(400).json(false);
    if (v.isEmpty(email)) return res.status(400).json(false);
    if (!v.isEmail(email)) return res.status(400).json(false);

    const sql = 'call usuarioRegistro(?,?,?,?,?)';

    db.query(sql, [username, pwd, apellido, nombre, email], (error, results) => {
        if (error != null) {
            console.log('error', error);
            return res.status(400).json(false);
        }

        console.log('res', results[0][0].id);
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

            db.query('call usuarioGetContactos(?)', usuarioId, (e3, r3) => {
                if (e3 != null) {
                    console.log(e3);
                    return res.status(400).json(false);
                }

                let contactos = [];

                for (let i = 0; i < r3[0].length; i++) {
                    contactos[i] = {
                        id: r3[0][i].id,
                        dsc: r3[0][i].dsc,
                        valor: r3[0][i].valor
                    }
                }

                db.query('call usuarioGetEtiquetas(?)', usuarioId, (e4, r4) => {
                    if (e4 != null) {
                        console.log(e4);
                        return res.status(400).json(false);
                    }

                    let etiquetas = [];

                    for (let i = 0; i < r4[0].length; i++) {
                        etiquetas[i] = {
                            dsc: r4[0][i].dsc
                        }
                    }

                    console.log('res', {
                        id: usuarioId,
                        apellido: r1[0][0].apellido,
                        nombre: r1[0][0].nombre,
                        email: r1[0][0].email,
                        foto: r1[0][0].foto,
                        isProfesional: r1[0][0].isProfesional === 1,
                        dni: r1[0][0].dni,
                        acercaDeMi: r1[0][0].acercaDeMi || '',
                        profesiones: profesiones,
                        contactos: contactos,
                        etiquetas: etiquetas
                    });

                    res.status(200).json({
                        id: usuarioId,
                        apellido: r1[0][0].apellido,
                        nombre: r1[0][0].nombre,
                        email: r1[0][0].email,
                        foto: r1[0][0].foto,
                        isProfesional: r1[0][0].isProfesional === 1,
                        dni: r1[0][0].dni,
                        acercaDeMi: r1[0][0].acercaDeMi || '',
                        profesiones: profesiones,
                        contactos: contactos,
                        etiquetas: etiquetas
                    });
                });
            });
        });
    });
};

exports.updateDatosPersonales = (req, res) => {
    console.log('');
    console.log("------- Usuario.updateDatosPersonales --------");
    console.log('');

    let id = (req.body.id || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();

    console.log(id);
    console.log(apellido);
    console.log(nombre);
    console.log(email);

    if (v.isEmpty(id)) return res.status(400).json(false);
    if (v.isEmpty(apellido)) return res.status(400).json(false);
    if (v.isEmpty(nombre)) return res.status(400).json(false);
    if (v.isEmpty(email)) return res.status(400).json(false);
    if (!v.isEmail(email)) return res.status(400).json(false);

    db.query('call usuarioUpdateDatosPersonales(?, ?, ?, ?)', [id, apellido, nombre, email], (e1, r1) => {
        if (e1 != null) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok);

        res.status(200).json({
            ok: r1[0][0].ok
        });
    });
};

exports.updatePerfilProfesional = (req, res) => {
    console.log('');
    console.log("------- Usuario.updatePerfilProfesional --------");
    console.log('');

    let id = (req.body.id || '').trim();
    let tags = (req.body.tags || '').trim();
    let profesiones = (req.body.profesiones || '').trim();
    let contactos = (req.body.contactos || '').trim();
    let isProfesional = (req.body.isProfesional || '').trim();
    let dni = (req.body.dni || '').trim();
    let acercaDeMi = (req.body.acercaDeMi || '').trim();
    let patronBusqueda = (req.body.patronBusqueda || '').trim();
    isProfesional = isProfesional === 'true';
    console.log(id);
    console.log(tags);
    console.log(profesiones);
    console.log(contactos);
    console.log(isProfesional);
    console.log(dni);
    console.log(acercaDeMi);
    console.log(patronBusqueda);

    db.query('call usuarioUpdatePerfilProfesional(?, ?, ?, ?, ?, ?, ?, ?)', [id, tags, profesiones, contactos, isProfesional, dni, acercaDeMi, patronBusqueda], (e1, r1) => {
        if (e1 != null) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok);

        res.status(200).json({
            ok: r1[0][0].ok
        });
    });
};

exports.baja = (req, res) => {
    console.log('');
    console.log("------- Usuario.baja --------");
    console.log('');

    const id = (req.body.id || '').trim();

    db.query('call usuarioBaja(?)', id, (e1, r1) => {
        if (e1 != null) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok);

        res.status(200).json({
            ok: r1[0][0].ok
        });
    });
};

exports.cambiarPwd = (req, res) => {
    console.log('');
    console.log("------- Usuario.cambiarPwd --------");
    console.log('');

    const id = (req.body.id || '').trim();
    const pwdActual = (req.body.pwdActual || '').trim();
    const pwdNuevo = (req.body.pwdNuevo || '').trim();

    db.query('call usuarioCambiarPwd(?, ?, ?)', [id, pwdActual, pwdNuevo], (e1, r1) => {
        if (e1 != null) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok);

        res.status(200).json({
            ok: r1[0][0].ok
        });
    });
};

exports.actualizarFoto = (req, res) => {
    console.log('');
    console.log("------- Usuario.actualizarFoto --------");
    console.log('');

    let id = (req.body.id || '').trim();

    const fs = require('fs');
    const file = req.file;

    let foto = null;

    if (file.size > 0) {
        foto = new Buffer(fs.readFileSync(file.path));
    }

    console.log(id);
    console.log(file);

    db.query('call usuarioActualizarFoto(?, ?)', [id, file.filename], (e1, r1) => {
        if (e1 != null) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok);

        res.status(200).jsonp({
            ok: r1[0][0].ok
        });
    });
};

exports.eliminarFoto = (req, res) => {
    console.log('');
    console.log("------- Usuario.eliminarFoto --------");
    console.log('');

    const id = (req.body.id || '').trim();

    db.query('call usuarioActualizarFoto(?, null)', id, (e1, r1) => {
        if (e1 != null) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok);

        res.status(200).json({
            ok: r1[0][0].ok
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
    let isProfesional = (req.body.isProfesional == 'true') ? 1 : 0;
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

    const query = (req.query.query || '').trim();
    const usuarioId = (req.query.usuarioId || '').trim();

    console.log('query:', query);
    console.log('usuarioId:', usuarioId);

    // if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    // if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);

    db.query('call usuarioGetProfesionales(?, ?)', [query, usuarioId], function (error, results) {
        if (error != null) {
            console.log("Error:", error);
            return res.status(400).json(false);
        }

        let usuarios = [];

        for (let i = 0; i < results[0].length; i++) {
            usuarios[i] = {
                id: results[0][i].id,
                username: results[0][i].username,
                apellido: results[0][i].apellido,
                nombre: results[0][i].nombre,
                reputacion: results[0][i].reputacion,
                foto: results[0][i].foto,
                profesionesString: results[0][i].profesiones
            }
        }
        console.log(usuarios);
        return res.status(200).send(usuarios);
    });
};

exports.getProfesionales10 = (req, res) => {
    console.log('');
    console.log("------- Usuario.getProfesionales10 --------");
    console.log('');

    const query = (req.query.query || '').trim();
    const usuarioId = (req.query.usuarioId || '').trim();

    console.log('query:', query);
    console.log('usuarioId:', usuarioId);

    // if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    // if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);

    db.query('call usuarioGetProfesionales10(?, ?)', [query, usuarioId], function (error, results) {
        if (error != null) {
            console.log("Error:", error);
            return res.status(400).json(false);
        }

        let usuarios = [];

        for (let i = 0; i < results[0].length; i++) {
            usuarios[i] = {
                id: results[0][i].id,
                username: results[0][i].username,
                apellido: results[0][i].apellido,
                nombre: results[0][i].nombre,
                reputacion: results[0][i].reputacion,
                foto: results[0][i].foto,
                profesionesString: results[0][i].profesiones
            }
        }
        console.log(usuarios);
        return res.status(200).send(usuarios);
    });
};

exports.getProfesional = (req, res) => {
    console.log('');
    console.log("------- Usuario.getProfesional --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    console.log('usuarioId:', usuarioId);

    db.query('call usuarioGetProfesional(?)', usuarioId, (error, results) => {
        if (error != null) {
            console.log("Error:", error);
            return res.status(400).json(false);
        }

        return res.status(200).json({
            id: usuarioId,
            username: results[0][0].username,
            apellido: results[0][0].apellido,
            nombre: results[0][0].nombre,
            reputacion: results[0][0].reputacion,
            foto: results[0][0].foto,
            acercaDeMi: results[0][0].acercaDeMi,
            profesionesString: results[0][0].profesiones
        });
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

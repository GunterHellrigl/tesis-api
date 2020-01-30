const v = require('validator');

exports.login = (req, res) => {
    console.log('');
    console.log("------- Usuario - Login --------");
    console.log('');

    let username = (req.body.username || '').trim();
    let pwd = (req.body.pwd || '').trim();

    if (v.isEmpty(username)) return res.status(400).send({
        ok: false,
        message: "username está vacío"
    });

    if (v.isEmpty(pwd)) return res.status(400).send({
        ok: false,
        message: "pwd está vacío"
    });


    db.query('call login(?, ?)', [username, pwd], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        if (results[0].length == 0) {
            return res.status(200).send({
                ok: false,
                message: 'Usuario y/o Contraseña incorrectos.'
            });
        }

        return res.status(200).send({
            ok: true,
            usuario: {
                id: results[0][0].id,
                username: results[0][0].username,
                apellido: results[0][0].apellido,
                nombre: results[0][0].nombre,
                email: results[0][0].email,
                telefono: results[0][0].telefono,
                reputacion: results[0][0].reputacion,
                activo: (results[0][0].activo == 1) ? true : false,
                perfilProfesional: {
                    activo: (results[0][0].perfilProfesionalActivo == 1)?true:false,
                    profesiones: results[0][0].profesiones,
                    cono_habi: results[0][0].cono_habi
                }
            }
        });
    });
};

exports.registro = (req, res) => {
    console.log('');
    console.log("------- Usuario - Registro --------");
    console.log('');

    let username = (req.body.username || '').trim();
    let pwd = (req.body.pwd || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();
    let telefono = (req.body.telefono || '').trim();

    if (v.isEmpty(username)) return res.status(200).send({
        ok: false,
        message: "username está vacío"
    });

    if (v.isEmpty(pwd)) return res.status(200).send({
        ok: false,
        message: "pwd está vacío"
    });

    if (v.isEmpty(apellido)) return res.status(200).send({
        ok: false,
        message: "apellido está vacío"
    });

    if (v.isEmpty(nombre)) return res.status(200).send({
        ok: false,
        message: "nombre está vacío"
    });

    if (v.isEmpty(email)) return res.status(200).send({
        ok: false,
        message: "email está vacío"
    });
    if (!v.isEmail(email)) return res.status(200).send({
        ok: false,
        message: "email con formato incorrecto"
    });

    if (v.isEmpty(telefono)) return res.status(200).send({
        ok: false,
        message: "telefono está vacío"
    });
    if (!v.isMobilePhone(telefono)) return res.status(200).send({
        ok: false,
        message: "telefono con formato incorrecto"
    });

    db.query('call registro(?, ?, ?, ?, ?, ?)', [username, pwd, apellido, nombre, email, telefono], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        if (!results[0][0].ok) {

            return res.status(200).send({
                ok: false,
                message: results[0][0].message
            });
        }

        return res.status(201).send({
            ok: true,
            usuario: {
		            id: results[0][0].id,
                username,
                apellido,
                nombre,
                email,
                telefono,
                activo: true,
                reputacion: 0
            }
        });
    });
};

exports.getUsuario = (req, res) => {
    console.log('');
    console.log("------- Usuario - GetUsuario --------");
    console.log('');

    let usuarioId = (req.params.usuarioId || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).send({
        ok: false,
        message: "usuarioId está vacío"
    });
    if (!v.isInt(usuarioId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'usuarioId con formato incorrecto'
    });


    db.query('call getUsuario(?)', [usuarioId], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        if (results[0].length == 0) {
            return res.status(200).send({
                ok: false,
                message: 'Sin resultados'
            });
        }

        return res.status(200).send({
            ok: true,
            usuario: {
                id: results[0][0].id,
                username: results[0][0].username,
                apellido: results[0][0].apellido,
                nombre: results[0][0].nombre,
                email: results[0][0].email,
                telefono: results[0][0].telefono,
                reputacion: results[0][0].reputacion,
                activo: (results[0][0].activo == 1) ? true : false,
                perfilProfesional: {
                    activo: (results[0][0].perfilProfesionalActivo == 1) ? true : false,
                    profesiones: (results[0][0].profesiones == null) ? '' : results[0][0].profesiones,
                    cono_habi: (results[0][0].cono_habi == null) ? '' : results[0][0].cono_habi
                }
            }
        });
    });
};

exports.updateUsuario = (req, res) => {
    console.log('');
    console.log("------- Usuario - Update --------");
    console.log('');

    let usuarioId = (req.body.usuarioId || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();
    let telefono = (req.body.telefono || '').trim();
    let ppActivo = (req.body.ppActivo || '').trim();
    let ppProfesiones = (req.body.ppProfesiones || '').trim();
    let ppConoHabi = (req.body.ppConoHabi || '').trim();

    console.log(usuarioId);
    console.log(apellido);
    console.log(nombre);
    console.log(email);
    console.log(telefono);
    console.log(ppActivo);
    console.log(ppProfesiones);
    console.log(ppConoHabi);

    if (v.isEmpty(usuarioId)) return res.status(200).send({
        ok: false,
        message: "usuarioId está vacío"
    });

    if (v.isEmpty(apellido)) return res.status(200).send({
        ok: false,
        message: "apellido está vacío"
    });

    if (v.isEmpty(nombre)) return res.status(200).send({
        ok: false,
        message: "nombre está vacío"
    });

    if (v.isEmpty(email)) return res.status(200).send({
        ok: false,
        message: "email está vacío"
    });
    if (!v.isEmail(email)) return res.status(200).send({
        ok: false,
        message: "email con formato incorrecto"
    });
    if (v.isEmpty(telefono)) return res.status(200).send({
        ok: false,
        message: "telefono está vacío"
    });
    if (!v.isMobilePhone(telefono)) return res.status(200).send({
        ok: false,
        message: "telefono con formato incorrecto"
    });

    if (!v.isBoolean(ppActivo)) return res.status(200).send({
        ok: false,
        message: "ppActivo está vacío"
    });

    if (v.isEmpty(ppProfesiones)) return res.status(200).send({
        ok: false,
        message: "ppProfesiones está vacío"
    });

    if (v.isEmpty(ppConoHabi)) return res.status(200).send({
        ok: false,
        message: "ppConoHabi está vacío"
    });

    console.log('Todo correcto');

    ppActivo = (ppActivo == 'true') ? 1 : 0;
    console.log(ppActivo);

    db.query('call updateUsuario(?, ?, ?, ?, ?, ?, ?, ?)', [usuarioId, apellido, nombre, email, telefono, ppActivo, ppProfesiones, ppConoHabi], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        console.log('Results: ', results);
        if (results != null) {

            return res.status(200).send({
                ok: (results[0][0].ok == 1) ? true : false
            });
        }
    });
};

exports.getProfesionales = (req, res) => {
    console.log('');
    console.log("------- Usuario - getProfesionales --------");
    console.log('');

    let query = (req.query.query || '').trim();
    let usuarioId = (req.query.usuarioId || '').trim();

    console.log(query);
    console.log(usuarioId);

    if (v.isEmpty(query)) return res.status(400).send({
        ok: false,
        message: "query está vacío"
    });
    if (v.isEmpty(usuarioId)) return res.status(400).send({
        ok: false,
        message: "usuarioId está vacío"
    });
    if (!v.isInt(usuarioId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'usuarioId con formato incorrecto'
    });

    let words = query.split(' ');
    query = "";
    words.forEach(word => {
        query += word + '* ';
    });

    db.query('call getProfesionales(?, ?)', [query, usuarioId], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        let usuarios = new Array();

        for (var i = 0; i < results[0].length; i++) {
            usuarios[i] = {
                id: results[0][i].id,
                username: results[0][i].username,
                apellido: results[0][i].apellido,
                nombre: results[0][i].nombre,
                reputacion: results[0][i].reputacion,
                perfilProfesional: {
                    profesiones: results[0][i].profesiones
                }
            }
        }

        return res.status(200).send({
            ok: true,
            usuarios: usuarios
        });
    });
}

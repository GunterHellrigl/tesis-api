const v = require('validator');

exports.getChats = (req, res) => {
    console.log('');
    console.log("------- Chat - getChats --------");
    console.log('');

    let usuarioId = (req.params.usuarioId || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(200).send({
        ok: false,
        message: "usuarioId está vacío"
    });
    if (!v.isInt(usuarioId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'usuarioId con formato incorrecto'
    });

    db.query('call getChats(?)', [usuarioId], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});
        console.log('Results: ', results);

        if (results[0].length == 0) return res.status(200).send({ok:false});

        let lista = new Array();
        for (var i = 0; i < results[0].length; i++) {
            lista[i] = {
                id: results[0][i].id,
                emisor: {
                    id: results[0][i].emisorid,
                    apellido: results[0][i].emisorapellido,
                    nombre: results[0][i].emisornombre,
                },
                receptor: {
                    id: results[0][i].receptorid,
                    apellido: results[0][i].receptorapellido,
                    nombre: results[0][i].receptornombre,
                },
                mensaje: {
                    emisorid: results[0][i].mensajeemisorid,
                    receptorid: results[0][i].mensajereceptorid,
                    dsc: results[0][i].mensaje,
                    leido: (results[0][i].leido == 1) ? true : false,
                    fechahora: results[0][i].fechahorainsert
                }
            }
        }

        return res.status(200).send({
            ok: true,
            chats: lista
        });
    });
};

exports.getMensajes = (req, res) => {
    console.log('');
    console.log("------- Chat - getMensajes --------");
    console.log('');

    let chatId = (req.params.chatId || '').trim();

    if (v.isEmpty(chatId)) return res.status(200).send({
        ok: false,
        message: "chatId está vacío"
    });
    if (!v.isInt(chatId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'chatId con formato incorrecto'
    });

    db.query('call getMensajes(?)', [chatId], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});
        console.log('Results: ', results);

        if (results[0].length == 0) return res.status(200).send({ok:false});

        let lista = new Array();
        for (var i = 0; i < results[0].length; i++) {
            lista[i] = {
                emisorid: results[0][i].emisorid,
                receptorid: results[0][i].receptorid,
                dsc: results[0][i].mensaje,
                leido: (results[0][i].leido == 1) ? true : false,
                fechahora: results[0][i].fechahorainsert
            }
        }

        console.log(lista);

        return res.status(200).send({
            ok: true,
            mensajes: lista
        });
    });
};

exports.enviarMensaje = (req, res) => {
    console.log('');
    console.log("------- Chat - enviarMensaje --------");
    console.log('');

    let chatId = (req.params.chatId || '').trim();
    let emisorId = (req.body.emisorId || '').trim();
    let receptorId = (req.body.receptorId || '').trim();
    let mensaje = (req.body.mensaje || '').trim();

    if (v.isEmpty(chatId)) return res.status(200).send({
        ok: false,
        message: "chatId está vacío"
    });
    if (!v.isInt(chatId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'chatId con formato incorrecto'
    });

    if (v.isEmpty(emisorId)) return res.status(200).send({
        ok: false,
        message: "emisorId está vacío"
    });
    if (!v.isInt(emisorId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'emisorId con formato incorrecto'
    });

    if (v.isEmpty(receptorId)) return res.status(200).send({
        ok: false,
        message: "receptorId está vacío"
    });
    if (!v.isInt(receptorId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'receptorId con formato incorrecto'
    });

    if (v.isEmpty(mensaje)) return res.status(200).send({
        ok: false,
        message: "mensaje está vacío"
    });

    db.query('call insertMensaje(?, ?, ?, ?)', [chatId, emisorId, receptorId, mensaje], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});
        console.log('Results: ', results);

        if (results[0].length == 0) return res.status(200).send({ok:false});

        return res.status(200).send({
            ok: true,
            mensaje: {
                id: results[0][0].id,
                fechahorainsert: results[0][0].fechahorainsert
            }
        });
    });
};

'use strict'

exports.getChats = (req, res) => {
    console.log('');
    console.log("------- Chat - getChats --------");
    console.log('');

    // let usuarioId = (req.params.usuarioId || '').trim();
    //
    // if (v.isEmpty(usuarioId)) return res.status(200).send({
    //     ok: false,
    //     message: "usuarioId está vacío"
    // });
    // if (!v.isInt(usuarioId, {min:1})) return res.status(400).send({
    //     ok: false,
    //     message: 'usuarioId con formato incorrecto'
    // });
    //
    // db.query('call getChats(?)', [usuarioId], (error, results) => {
    //     if (error != null) {
    //         console.log('Error: ', error);
    //         return res.status(500).send({error});
    //     }
    //
    //     if (results == null) return res.status(200).send({ok:false});
    //     console.log('Results: ', results);
    //
    //     if (results[0].length == 0) return res.status(200).send({ok:false});
    //
    //     let lista = new Array();
    //     for (var i = 0; i < results[0].length; i++) {
    //         lista[i] = {
    //             id: results[0][i].id,
    //             emisor: {
    //                 id: results[0][i].emisorId,
    //                 apellido: results[0][i].emisorApellido,
    //                 nombre: results[0][i].emisorNombre,
    //             },
    //             receptor: {
    //                 id: results[0][i].receptorId,
    //                 apellido: results[0][i].receptorApellido,
    //                 nombre: results[0][i].receptorNombre,
    //             },
    //             mensaje: {
    //                 emisorId: results[0][i].mensajeEmisorId,
    //                 receptorId: results[0][i].mensajeReceptorId,
    //                 dsc: results[0][i].mensaje,
    //                 isLeido: (results[0][i].isLeido == 1) ? true : false,
    //                 fechaHora: results[0][i].fechaHoraInsert
    //             }
    //         }
    //     }
    //
    //     return res.status(200).send({
    //         ok: true,
    //         chats: lista
    //     });
    // });
};

exports.getMensajes = (req, res) => {
    console.log('');
    console.log("------- Chat - getMensajes --------");
    console.log('');

    // let chatId = (req.params.chatId || '').trim();
    //
    // if (v.isEmpty(chatId)) return res.status(200).send({
    //     ok: false,
    //     message: "chatId está vacío"
    // });
    // if (!v.isInt(chatId, {min:1})) return res.status(400).send({
    //     ok: false,
    //     message: 'chatId con formato incorrecto'
    // });
    //
    // db.query('call getMensajes(?)', [chatId], (error, results) => {
    //     if (error != null) {
    //         console.log('Error: ', error);
    //         return res.status(500).send({error});
    //     }
    //
    //     if (results == null) return res.status(200).send({ok:false});
    //     console.log('Results: ', results);
    //
    //     if (results[0].length == 0) return res.status(200).send({ok:false});
    //
    //     let lista = new Array();
    //     for (var i = 0; i < results[0].length; i++) {
    //         lista[i] = {
    //             emisorid: results[0][i].emisorId,
    //             receptorid: results[0][i].receptorId,
    //             dsc: results[0][i].mensaje,
    //             leido: (results[0][i].isLeido == 1) ? true : false,
    //             fechahora: results[0][i].fechaHoraInsert
    //         }
    //     }
    //
    //     console.log(lista);
    //
    //     return res.status(200).send({
    //         ok: true,
    //         mensajes: lista
    //     });
    // });
};

exports.enviarMensaje = (req, res) => {
    console.log('');
    console.log("------- Chat - enviarMensaje --------");
    console.log('');

    // let chatId = (req.params.chatId || '').trim();
    // let emisorId = (req.body.emisorId || '').trim();
    // let receptorId = (req.body.receptorId || '').trim();
    // let mensaje = (req.body.mensaje || '').trim();
    //
    // if (v.isEmpty(chatId)) return res.status(200).send({
    //     ok: false,
    //     message: "chatId está vacío"
    // });
    // if (!v.isInt(chatId, {min:1})) return res.status(400).send({
    //     ok: false,
    //     message: 'chatId con formato incorrecto'
    // });
    //
    // if (v.isEmpty(emisorId)) return res.status(200).send({
    //     ok: false,
    //     message: "emisorId está vacío"
    // });
    // if (!v.isInt(emisorId, {min:1})) return res.status(400).send({
    //     ok: false,
    //     message: 'emisorId con formato incorrecto'
    // });
    //
    // if (v.isEmpty(receptorId)) return res.status(200).send({
    //     ok: false,
    //     message: "receptorId está vacío"
    // });
    // if (!v.isInt(receptorId, {min:1})) return res.status(400).send({
    //     ok: false,
    //     message: 'receptorId con formato incorrecto'
    // });
    //
    // if (v.isEmpty(mensaje)) return res.status(200).send({
    //     ok: false,
    //     message: "mensaje está vacío"
    // });
    //
    // db.query('call insertMensaje(?, ?, ?, ?)', [chatId, emisorId, receptorId, mensaje], (error, results) => {
    //     if (error != null) {
    //         console.log('Error: ', error);
    //         return res.status(500).send({error});
    //     }
    //
    //     if (results == null) return res.status(200).send({ok:false});
    //     console.log('Results: ', results);
    //
    //     if (results[0].length == 0) return res.status(200).send({ok:false});
    //
    //     return res.status(200).send({
    //         ok: true,
    //         mensaje: {
    //             id: results[0][0].id,
    //             fechahorainsert: results[0][0].fechahorainsert
    //         }
    //     });
    // });
};

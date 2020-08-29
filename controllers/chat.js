'use strict'

const fcm = require('../firebase-config').admin;

exports.getChats = (req, res) => {
    console.log('');
    console.log("------- Chat.getChats --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();
    console.log('usuarioId', usuarioId);

    db.query('call chatGetChats(?)', usuarioId, (e1, r1) => {
        if (e1) {
            console.log('Error: ', e1);
            return res.status(400).json(false);
        }

        if (r1[0] == null) return res.status(200).json([]);

        let response = [];
        for (let i = 0; i < r1[0].length; i++) {
            response[i] = {
                id: r1[0][i].id,
                usuario1: {
                    id: r1[0][i].usuario1Id,
                    apellido: r1[0][i].u1Apellido,
                    nombre: r1[0][i].u1Nombre,
                    foto: r1[0][i].u1Foto
                },
                usuario2: {
                    id: r1[0][i].usuario2Id,
                    apellido: r1[0][i].u2Apellido,
                    nombre: r1[0][i].u2Nombre,
                    foto: r1[0][i].u2Foto
                },
                cantidadMensajesNoLeidos: r1[0][i].cantidadMensajesNoLeidos,
                mensajes: []
            }

            if (r1[0][i].fechaHoraInsert !== null) {
                response[i].mensajes[0] = {
                    texto: r1[0][i].texto,
                    isLeido: (r1[0][i].isLeido === 1),
                    fechaHoraInsert: r1[0][i].fechaHoraInsert
                }

                console.log(response[i].mensajes[0]);
            }
        }

        console.log(response);
        res.status(200).json(response);
    });
};

exports.getChat = (req, res) => {
    console.log('');
    console.log("------- Chat.getChat --------");
    console.log('');

    const emisorId = (req.query.emisorId || '').trim();
    const receptorId = (req.query.receptorId || '').trim();
    console.log('emisorId', emisorId);
    console.log('receptorId', receptorId);

    db.query('call chatGetChat(?,?)', [emisorId, receptorId], (e1, r1) => {
        if (e1) {
            console.log('Error: ', e1);
            return res.status(400).json(false);
        }

        const chatId = r1[0][0].id;

        db.query('call chatGetMensajes(?)', chatId, (e2, r2) => {
            if (e2) {
                console.log('Error: ', e2);
                return res.status(400).json(false);
            }

            let result = {
                id: chatId,
                usuario1Id: emisorId,
                usuario2Id: receptorId,
                mensajes: []
            }

            for (let i = 0; i < r2[0].length; i++) {
                result.mensajes[i] = {
                    id: r2[0][i].id,
                    chatId: r2[0][i].chatId,
                    emisorId: r2[0][i].emisorId,
                    receptorId: r2[0][i].receptorId,
                    texto: r2[0][i].texto,
                    isLeido: (r2[0][i].isLeido === 1),
                    fechaHoraInsert: r2[0][i].fechaHoraInsert
                }
            }

            res.status(200).json(result);

            const ultimoMensajeId = result.mensajes[result.mensajes.length-1].id;
            console.log('ultimoMensajeId', ultimoMensajeId);
            db.query('call chatSetMensajesLeidos(?, ?, ?)', [chatId, receptorId, ultimoMensajeId], (e3, r3) => {
                if (e3) {
                    console.log('Error: ', e3);
                    return res.status(400).json(false);
                }
            });
        });
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
    });
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

exports.nuevoMensaje = (req, res) => {
    console.log('');
    console.log("------- Chat.nuevoMensaje --------");
    console.log('');

    const chatId = (req.body.chatId || '').trim();
    const emisorId = (req.body.emisorId || '').trim();
    const receptorId = (req.body.receptorId || '').trim();
    const texto = (req.body.texto || '').trim();
    const fechaHoraInsert = (req.body.fechaHoraInsert || '').trim();

    console.log('chatId', chatId);
    console.log('emisorId', emisorId);
    console.log('receptorId', receptorId);
    console.log('texto', texto);
    console.log('fechaHoraInsert', fechaHoraInsert);

    db.query('call mensajeInsert(?,?,?,?,?)', [chatId, emisorId, receptorId, texto, fechaHoraInsert], (e1, r1) => {
        if (e1) {
            console.log("Error:", e1)
            return res.status(400).json(false);
        }

        let idRemoto = r1[0][0].id;
        res.status(200).json(idRemoto);

        db.query('call usuarioGetToken(?)', receptorId, (e2, r2) =>{
            if (e2) {
                console.log("Error:", e2)
                return;
            }

            const token = r2[0][0].token;
            const payload = {
                data: {
                    action: 'mensajeRecibido',
                    idRemoto: idRemoto.toString(),
                    chatId: chatId,
                    texto: texto,
                    fechaHoraInsert: fechaHoraInsert
                }
            };
            const options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };

            fcm.messaging().sendToDevice(token, payload, options)
                .then(response => {
                    console.log('Action executed');
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
};

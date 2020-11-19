'use strict';

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

    const id = (req.query.id || '').trim();
    console.log('id', id);

    db.query('call chatGetChat(?)', id, (e1, r1) => {
        if (e1) {
            console.log('Error: ', e1);
            return res.status(400).json(false);
        }

        console.log('res', {
            id: r1[0][0].id,
            usuario1: {
                id: r1[0][0].usuario1Id,
                apellido: r1[0][0].usuario1Apellido,
                nombre: r1[0][0].usuario1Nombre,
                foto: r1[0][0].usuario1Foto
            },
            usuario2: {
                id: r1[0][0].usuario2Id,
                apellido: r1[0][0].usuario2Apellido,
                nombre: r1[0][0].usuario2Nombre,
                foto: r1[0][0].usuario2Foto
            }
        });

        res.status(200).json({
            id: r1[0][0].id,
            usuario1: {
                id: r1[0][0].usuario1Id,
                apellido: r1[0][0].usuario1Apellido,
                nombre: r1[0][0].usuario1Nombre,
                foto: r1[0][0].usuario1Foto
            },
            usuario2: {
                id: r1[0][0].usuario2Id,
                apellido: r1[0][0].usuario2Apellido,
                nombre: r1[0][0].usuario2Nombre,
                foto: r1[0][0].usuario2Foto
            }
        });

        // db.query('call chatGetMensajes(?)', chatId, (e2, r2) => {
        //     if (e2) {
        //         console.log('Error: ', e2);
        //         return res.status(400).json(false);
        //     }
        //
        //     let result = {
        //         id: chatId,
        //         usuario1Id: usuario1Id,
        //         usuario2Id: usuario2Id,
        //         mensajes: []
        //     }
        //
        //     for (let i = 0; i < r2[0].length; i++) {
        //         console.log(r2[0][i]);
        //
        //         result.mensajes[i] = {
        //             id: r2[0][i].id,
        //             chatId: r2[0][i].chatId,
        //             emisorId: r2[0][i].emisorId,
        //             receptorId: r2[0][i].receptorId,
        //             texto: r2[0][i].texto,
        //             isLeido: (r2[0][i].isLeido === 1),
        //             fechaHoraInsert: r2[0][i].fechaHoraInsert
        //         }
        //     }
        //
        //     res.status(200).json(result);
        //
        //     if (result.mensajes.length > 0) {
        //         const ultimoMensajeId = result.mensajes[result.mensajes.length - 1].id;
        //         console.log('ultimoMensajeId', ultimoMensajeId);
        //         db.query('call chatSetMensajesLeidos(?, ?, ?)', [chatId, receptorId, ultimoMensajeId], (e3, r3) => {
        //             if (e3) {
        //                 console.log('Error: ', e3);
        //                 return res.status(400).json(false);
        //             }
        //         });
        //     }
        // });
    });
};

exports.getMensajes = (req, res) => {
    console.log('');
    console.log("------- Chat.getMensajes --------");
    console.log('');

    const id = (req.query.id || '').trim();

    db.query('call chatGetMensajes(?)', id, (e1, r1) => {
        if (e1) {
            console.log('Error: ', e1);
            return res.status(400).json(false);
        }

        console.log(r1[0]);
        res.status(200).json(r1[0]);
    });
};

exports.nuevoMensaje = (req, res) => {
    console.log('');
    console.log("------- Chat.nuevoMensaje --------");
    console.log('');

    const chatId = (req.body.chatId || '').trim();
    const isUsuario1Emisor = (req.body.isUsuario1Emisor || '').trim();
    const texto = (req.body.texto || '').trim();
    const fechaHoraInsert = (req.body.fechaHoraInsert || '').trim();

    console.log('chatId', chatId);
    console.log('isUsuario1Emisor', isUsuario1Emisor);
    console.log('texto', texto);
    console.log('fechaHoraInsert', fechaHoraInsert);

    db.query('call chatNuevoMensaje(?,?,?,?)', [chatId, isUsuario1Emisor, texto, fechaHoraInsert], (e1, r1) => {
        if (e1) {
            console.log("Error:", e1)
            return res.status(400).json(false);
        }

        let idRemoto = r1[0][0].id;
        res.status(200).json(idRemoto);

        // db.query('call usuarioGetToken(?)', receptorId, (e2, r2) => {
        //     if (e2) {
        //         console.log("Error:", e2)
        //         return;
        //     }
        //
        //     const token = r2[0][0].token;
        //     const payload = {
        //         data: {
        //             action: 'mensajeRecibido',
        //             idRemoto: idRemoto.toString(),
        //             chatId: chatId,
        //             texto: texto,
        //             fechaHoraInsert: fechaHoraInsert
        //         }
        //     };
        //     const options = {
        //         priority: "high",
        //         timeToLive: 60 * 60 * 24
        //     };
        //
        //     fcm.messaging().sendToDevice(token, payload, options)
        //         .then(response => {
        //             console.log('Action executed');
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // });
    });
};

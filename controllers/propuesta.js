'use strict';

const v = require('validator');
const fcm = require('../firebase-config').admin;

exports.getPropuestasEnviadas = (req, res) => {
    console.log('');
    console.log("------- Propuesta.getPropuestasEnviadas --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();
    console.log(usuarioId);

    db.query('call propuestaGetPropuestasEnviadas(?)', usuarioId, (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(400).json(false);
        }

        console.log(results[0]);

        let propuestas = [];

        for (let i = 0; i < results[0].length; i++) {
            propuestas[i] = {
                id: results[0][i].id,
                dsc: results[0][i].dsc,
                anuncio: {
                    titulo: results[0][i].titulo
                },
                profesional: {
                    id: results[0][i].profesionalId
                }
            }
        }

        res.status(200).json(propuestas);
    });
}

exports.enviarPropuesta = (req, res) => {
    console.log('');
    console.log("------- Propuesta.enviarPropuesta --------");
    console.log('');

    const anuncioId = (req.body.anuncioId || '').trim();
    const profesionalId = (req.body.profesionalId || '').trim();
    const dsc = (req.body.dsc || '').trim();
    const precio = (req.body.id || '0').trim();

    db.query('call propuestaInsert(?,?,?,?)', [anuncioId, profesionalId, dsc, precio], (e1, r1) => {
        if (e1) {
            console.log("Error:", e1)
            return res.status(400).json(false);
        }

        res.status(200).json(r1[0][0].id);

        // db.query('call getDataFromAnuncioToNotify(?, ?)', [anuncioId, profesionalId], (e2, r2) => {
        //     if (e2) {
        //         console.log("Error", e2);
        //         return;
        //     }
        //
        //     const token = r2[0][0].token || '';
        //     const anuncioTitulo = r2[0][0].titulo || '';
        //     const profesionalUsername = r2[0][0].username || '';
        //
        //     const payload = {
        //         data: {
        //             action: 'notification',
        //             tipo: '1',
        //             drawable: 'ic_work',
        //             title: anuncioTitulo,
        //             contentText: "@" + profesionalUsername + " te ha enviado una propuesta"
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

exports.editarPropuesta = (req, res) => {
    console.log('');
    console.log("------- Propuesta.editarPropuesta --------");
    console.log('');

    const id = (req.body.id || '').trim();
    const dsc = (req.body.dsc || '').trim();
    const precio = (req.body.precio || '0').trim();

    console.log('id', id);
    console.log('dsc', dsc);
    console.log('precio', precio);

    db.query('call propuestaUpdate(?,?,?)', [id, dsc, precio], (e1, r1) => {
        if (e1) {
            console.log("Error:", e1);
            return res.status(400).json(false);
        }

        res.status(200).json(r1[0][0].ok === 1);
    });
};

exports.aceptarPropuesta = (req, res) => {
    console.log('');
    console.log("------- Propuesta.aceptarPropuesta --------");
    console.log('');

    const propuestaId = req.body.propuestaId || '';
    const anuncioId = req.body.anuncioId || '';
    const anuncioTitulo = req.body.anuncioTitulo || '';
    const profesionalId = req.body.profesionalId || '';

    console.log('propuestaId:', propuestaId);
    console.log('anuncioId:', anuncioId);
    console.log('anuncioTitulo:', anuncioTitulo);
    console.log('profesionalId:', profesionalId);

    db.query('call propuestaAceptar(?,?,?,?)', [propuestaId, anuncioId, anuncioTitulo, profesionalId], (e1, r1) => {
        if (e1) {
            console.log('Error', e1);
            return res.status(400).json(false);
        }

        res.status(200).json(true);
        //
        //     db.query('call getDataFromPropuestaToNotify(?)', propuestaId, (e2, r2) => {
        //     	console.log('e2:', e2);
        //         if (e2 != null) return;
        //
        //         console.log(r2);
        //
        //         const token = r2[0][0].token || '';
        //         const anuncioTitulo = r2[0][0].titulo || '';
        //
        //         console.log('token:', token);
        //         console.log('anuncioTitulo:', anuncioTitulo);
        //
        //         const payload = {
        //             data: {
        //                 action: 'notification',
        //                 tipo: '1',
        //                 drawable: 'ic_work',
        //                 title: '¡Aceptaron tu propuesta!',
        //                 contentText: "Tu propuesta en '" + anuncioTitulo + "' ha sido aceptada!!"
        //             }
        //         };
        //         const options = {
        //             priority: "high",
        //             timeToLive: 60 * 60 * 24
        //         };
        //
        //         fcm.messaging().sendToDevice(token, payload, options)
        //             .then(response => {
        //                 console.log('Action executed');
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             });
        //
        //     });
    });
};

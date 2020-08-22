const v = require('validator');
const fcm = require('../firebase-config').admin;

// exports.getPropuesta = (req, res) => {
//     console.log('');
//     console.log("------- Propuesta - GetPropuesta --------");
//     console.log('');
//
//     let profesionalId = (req.params.profesionalId || '').trim();
//     let trabajoId = (req.params.trabajoId || '').trim();
//
//     console.log(profesionalId);
//     console.log(trabajoId);
//
//     if (v.isEmpty(trabajoId)) return res.status(200).send({
//         ok: false,
//         message: "trabajoId está vacío"
//     });
//     if (!v.isInt(trabajoId, {min: 1})) return res.status(400).send({
//         ok: false,
//         message: 'trabajoId con formato incorrecto'
//     });
//     if (v.isEmpty(profesionalId)) return res.status(200).send({
//         ok: false,
//         message: "profesionalId está vacío"
//     });
//     if (!v.isInt(profesionalId, {min: 1})) return res.status(400).send({
//         ok: false,
//         message: 'profesionalId con formato incorrecto'
//     });
//
//     db.query('call getPropuesta(?, ?)', [profesionalId, trabajoId], (error, results) => {
//         if (error != null) {
//             console.log('Error: ', error);
//             return res.status(500).send({error});
//         }
//
//         if (results == null) return res.status(200).send({ok: false});
//         console.log('Results: ', results);
//
//         if (results[0].length == 0) return res.status(200).send({ok: false});
//
//         return res.status(200).send({
//             ok: true,
//             propuesta: {
//                 profesionalid: results[0][0].profesionalid,
//                 trabajoid: results[0][0].trabajoid,
//                 dsc: results[0][0].dsc,
//                 precio: results[0][0].precio
//             }
//         });
//     });
// };
//
// exports.getMisPropuestas = (req, res) => {
//     console.log('');
//     console.log("------- Propuesta - GetMisPropuestas --------");
//     console.log('');
//
//     let usuarioId = (req.params.usuarioId || '').trim();
//
//     console.log(usuarioId);
//
//     if (v.isEmpty(usuarioId)) return res.status(200).send({
//         ok: false,
//         message: "usuarioId está vacío"
//     });
//     if (!v.isInt(usuarioId, {min: 1})) return res.status(400).send({
//         ok: false,
//         message: 'usuarioId con formato incorrecto'
//     });
//
//     db.query('call getMisPropuestas(?)', [usuarioId], (error, results) => {
//         if (error != null) {
//             console.log('Error: ', error);
//             return res.status(500).send({error});
//         }
//
//         if (results == null) return res.status(200).send({ok: false});
//         console.log('Results: ', results);
//
//         if (results[0].length == 0) return res.status(200).send({ok: false});
//
//         return res.status(200).send({
//             ok: true,
//             propuestas: results[0]
//         });
//     });
// };

exports.getPropuestasEnviadas = (req, res) => {
    console.log('');
    console.log("------- Propuesta.getPropuestasEnviadas --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();
    console.log(usuarioId);
    //
    // if (v.isEmpty(usuarioId)) return res.status(200).send({
    //     ok: false,
    //     message: "usuarioId está vacío"
    // });
    // if (!v.isInt(usuarioId, {min: 1})) return res.status(400).send({
    //     ok: false,
    //     message: 'usuarioId con formato incorrecto'
    // });
    //
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

    // if (v.isEmpty(data[0])) return res.status(400).json(false);
    // if (v.isEmpty(data[1])) return res.status(400).json(false);
    // if (v.isEmpty(data[2])) return res.status(400).json(false);
    // if (!v.isEmpty(data[3]) && !v.isDecimal(data[3])) return res.status(400).json(false);
    //
    db.query('call propuestaInsert(?,?,?,?)', [anuncioId, profesionalId, dsc, precio], (e1, r1) => {
        if (e1) {
            console.log("Error:", e1)
            return res.status(400).json(false);
        }

        res.status(200).json(r1[0][0].id);

        // db.query('call getDataFromAnuncioToNotify(?, ?)', [data[0], data[1]], (e2, r2) => {
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

    console.log('id',id);
    console.log('dsc',dsc);
    console.log('precio', precio);
    // if (v.isEmpty(data[0])) return res.status(400).json(false);
    // if (v.isEmpty(data[1])) return res.status(400).json(false);
    // if (!v.isEmpty(data[2]) && !v.isDecimal(data[2])) return res.status(400).json(false);
    //
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

    // const propuestaId = req.body.propuestaId || '';
    //
    // if (v.isEmpty(propuestaId)) return res.status(400).json(false);
    //
    // console.log('propuestaId:', propuestaId);
    //
    // db.query('call propuestaAceptar(?)', propuestaId, (e1, r1) => {
    // 	console.log('e1:', e1);
    //     if (e1) return res.status(400).json(false);
    //
    //     res.status(200).json({
    // 		id: r1[0][0].chatId,
    // 		emisor: {
    // 			id: r1[0][0].emisorId
    // 		},
    // 		receptor: {
    // 			id: r1[0][0].receptorId
    // 		}
    // 	});
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
    // });
};

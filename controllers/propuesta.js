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

exports.enviarPropuesta = (req, res) => {
    console.log('');
    console.log("------- Propuesta.enviarPropuesta --------");
    console.log('');

    const data = [
        anuncioId = (req.body.anuncioId || '').trim(),
        profesionalId = (req.body.profesionalId || '').trim(),
        dsc = (req.body.dsc || '').trim(),
        precio = (req.body.id || '0').trim()
    ];

    if (v.isEmpty(data[0])) return res.status(400).json(false);
    if (v.isEmpty(data[1])) return res.status(400).json(false);
    if (v.isEmpty(data[2])) return res.status(400).json(false);
    if (!v.isEmpty(data[3]) && !v.isDecimal(data[3])) return res.status(400).json(false);

    db.query('call propuestaInsert(?,?,?,?)', data, (err, r1) => {
        if (err) return res.status(400).json(false);

        res.status(200).json(r1[0][0].id);

		db.query('call getDataFromAnuncioToNotify(?, ?)', [data[0], data[1]], (e2, r2) => {
			const token = r2[0][0].token || '';
			const anuncioTitulo = r2[0][0].titulo || '';
			const profesionalUsername = r2[0][0].username || '';

			const payload = {
				data: {
					action: 'notification',
					tipo: '1',
					drawable: 'ic_work',
					title: anuncioTitulo,
					contentText: "@" + profesionalUsername + " te ha enviado una propuesta"	
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

exports.editarPropuesta = (req, res) => {
    console.log('');
    console.log("------- Propuesta.editarPropuesta --------");
    console.log('');

    const data = [
        id = (req.body.id || '').trim(),
        dsc = (req.body.dsc || '').trim(),
        precio = (req.body.id || '0').trim()
    ];

    if (v.isEmpty(data[0])) return res.status(400).json(false);
    if (v.isEmpty(data[1])) return res.status(400).json(false);
    if (!v.isEmpty(data[2]) && !v.isDecimal(data[2])) return res.status(400).json(false);

    db.query('call propuestaUpdate(?,?,?)', data, (err, r1) => {
        if (err) return res.status(400).json(false);

        res.status(200).json(r1[0][0].ok === 1);
    });
};

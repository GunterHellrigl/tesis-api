const v = require('validator');

exports.getNotificaciones = (req, res) => {
    console.log('');
    console.log("------- Notificacion.getNotificaciones --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    console.log("usuarioId:", usuarioId);

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min:1})) return res.status(400).json(false);

    db.query('call getNotificaciones(?)', usuarioId, (error, results) => {
        if (error != null) return res.status(400).json(false);

		let notificaciones = [];
console.log(results[0]);
		for(let i = 0; i < results[0].length; i++) {
			notificaciones[i] = {
				id: results[0][i].id,
				usuario: {
					id: results[0][i].usuarioid 				
				},
				titulo: results[0][i].titulo,
				fechaHora: results[0][i].fechahora,
				leido: results[0][i].leido === 1,
				tipo: results[0][i].tipo
			}		
		}

        return res.status(200).json(notificaciones);
    });
};

exports.getAllNoLeidas = (req, res) => {
	console.log('');
    console.log("------- Notificacion - getAllNoLeidas --------");
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


    db.query('call getNotificacionesNoLeidas(?)', [usuarioId], (error, results) => {
    	if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});

        console.log(results[0]);

        return res.status(200).send({
            ok: true,
            notificaciones: results[0]
        });
    });
};

exports.getAll = (req, res) => {
    console.log('');
    console.log("------- Notificacion - getAll --------");
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


    db.query('call getNotificaciones(?)', [usuarioId], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});

        console.log(results[0]);

        return res.status(200).send({
            ok: true,
            notificaciones: results[0]
        });
    });
};

exports.setReaded = (req, res) => {
    console.log('');
    console.log("------- Notificacion - setReaded --------");
    console.log('');

    let id = (req.body.id || '').trim();

    if (v.isEmpty(id)) return res.status(200).send({
        ok: false,
        message: "id está vacío"
    });
    if (!v.isInt(id, {min:1})) return res.status(400).send({
        ok: false,
        message: 'id con formato incorrecto'
    });


    db.query('call updateNotificacion(?)', [id], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});

        console.log(results[0]);

        return res.status(200).send({
            ok: true
        });
    });
};

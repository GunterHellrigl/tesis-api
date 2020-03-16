const v = require('validator');

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
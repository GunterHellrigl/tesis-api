'use strict';

exports.getNotificaciones = (req, res) => {
    console.log('');
    console.log("------- Notificacion.getNotificaciones --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    console.log("usuarioId:", usuarioId);

    db.query('call notificacionGetNotificaciones(?)', usuarioId, (error, results) => {
        if (error != null) {
            console.log("Error", error);
            return res.status(400).json(false);
        }

        let notificaciones = [];

        for (let i = 0; i < results[0].length; i++) {
            notificaciones[i] = {
                id: results[0][i].id,
                usuario: {
                    id: results[0][i].usuarioId
                },
                titulo: results[0][i].titulo,
                fechaHora: results[0][i].fechaHora,
                isLeido: results[0][i].isLeido === 1,
                tipo: results[0][i].tipo,
                data: results[0][i].data
            }
        }

        console.log(notificaciones);

        return res.status(200).json(notificaciones);
    });
};

exports.setLeido = (req, res) => {
    console.log('');
    console.log("------- Notificacion.setLeido --------");
    console.log('');

    const id = (req.body.id || '').trim();

    console.log('id', id);

    db.query('call notificacionSetLeido(?)', id, (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(400).json(false);
        }

        res.status(200).json(results[0][0].ok === 1);
    });
};

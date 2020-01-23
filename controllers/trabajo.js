const v = require('validator');

exports.insert = (req, res) => {
    console.log('');
    console.log("------- Trabajo - insert --------");
    console.log('');

    let usuarioId = (req.body.usuarioId || '').trim();
    let titulo = (req.body.titulo || '').trim();
    let profesiones = (req.body.profesiones || '').trim();
    let dsc = (req.body.dsc || '').trim();
    let precioDesde = (req.body.precioDesde || '').trim();
    let precioHasta = (req.body.precioHasta || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).send({
        ok: false,
        message: "usuarioId está vacío"
    });
    if (!v.isInt(usuarioId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'usuarioId con formato incorrecto'
    });

    if (v.isEmpty(titulo)) return res.status(400).send({
        ok: false,
        message: "titulo está vacío"
    });

    if (v.isEmpty(profesiones)) return res.status(400).send({
        ok: false,
        message: "profesiones está vacío"
    });

    if (!v.isDecimal(precioDesde)) return res.status(400).send({
        ok: false,
        message: "precioDesde con formato incorrecto"
    });

    if (!v.isDecimal(precioHasta)) return res.status(400).send({
        ok: false,
        message: "precioHasta con formato incorrecto"
    });



    db.query('call insertTrabajo(?,?,?,?,?,?)',
        [usuarioId, titulo, profesiones, dsc, precioDesde, precioHasta], (error, results) => {
            if (error != null) {
                console.log('Error: ', error);
                return res.status(500).send({error});
            }

            if (results != null) {
                console.log('Results: ', results[0]);

                return res.status(200).send({
                    ok: true
                });

            } else {
                return res.status(200).send({
                    ok: false,
                    message: 'Error'
                });
            }
    });
};

exports.getTrabajos = (req, res) => {
    console.log('');
    console.log("------- Trabajo - GetTrabajos --------");
    console.log('');

    let query = (req.query.query || '').trim();

    let words = query.split(' ');
    query = "";
    words.forEach(word => {
        query += word + '* ';
    });

    db.query('call getTrabajos(?)', [query], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);

            return res.status(200).send({
                ok: true,
                trabajos: results[0]
            });
        } else {
            return res.status(200).send({
                ok: false
            });
        }
    });
};

exports.getTrabajo = (req, res) => {
    console.log('');
    console.log("------- Trabajo - GetTrabajo --------");
    console.log('');

    let id = (req.params.id || '').trim();

    db.query('call getTrabajo(?)', [id], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);

            if (results[0].length == 0) return res.status(200).send({
               ok: false,
               message: 'Trabajo erroneo'
            });

            return res.status(200).send({
               ok: true,
               trabajo: {
                   id: results[0][0].id,
                   titulo: results[0][0].titulo,
                   profesiones: results[0][0].profesiones,
                   preciodesde: results[0][0].preciodesde,
                   preciohasta: results[0][0].preciohasta,
                   dsc: results[0][0].dsc,
                   cantidadpropuestas: results[0][0].cantidadpropuestas,
                   fechahorapublicacion: results[0][0].fechahorapublicacion
               },
               usuario: {
                   id: results[0][0].usuarioid,
                   apellido: results[0][0].apellido,
                   nombre: results[0][0].nombre,
                   reputacion: results[0][0].reputacion
               }
            });
        } else {
            return res.status(200).send({
                ok: false
            });
        }
    });
};

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

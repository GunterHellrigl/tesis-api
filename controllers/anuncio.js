const v = require('validator');

exports.getAnuncios = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnuncios --------");
    console.log('');

    const data = [
        query = (req.query.query || '').trim(),
        precioDesde = (req.query.precioDesde || '').trim(),
        precioHasta = (req.query.precioHasta || '').trim()
    ];

    if (data[1] === '') data[1] = null;
    if (data[2] === '') data[2] = null;

    db.query('call getAnuncios(?, ?, ?)', data, function (error, results) {
        if (error) return res.status(400);

        return res.status(200).send(results[0]);
    });
};

exports.getAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnuncio --------");
    console.log('');

    let anuncioId = (req.query.anuncioId || '').trim();
    let usuarioId = (req.query.usuarioId || '').trim();

    db.query('call getTrabajo(?)', anuncioId, function (err1, r1) {
        if (err1) throw err1;

        db.query('call getPropuesta(?, ?)', [usuarioId, anuncioId], function (err2, r2) {
            if (err2) throw err2;

            res.status(200).json({
                id: r1[0][0].id,
                titulo: r1[0][0].titulo,
                profesiones: r1[0][0].profesiones,
                preciodesde: r1[0][0].preciodesde,
                preciohasta: r1[0][0].preciohasta,
                fechahorapublicacion: r1[0][0].fechahorapublicacion,
                cantidadpropuestas: r1[0][0].cantidadpropuestas,
                estado: r1[0][0].estado,
                dsc: r1[0][0].dsc,
                usuario: {
                    id: r1[0][0].usuarioid,
                    apellido: r1[0][0].apellido,
                    nombre: r1[0][0].nombre,
                    reputacion: r1[0][0].reputacion
                },
                propuesta: r2[0][0]
            });
        });
    });
};

exports.getAnunciosPublicados = (req, res) => {
    console.log('');
    console.log("------- Anuncio - getAnunciosPublicados --------");
    console.log('');

    let usuarioId = (req.query.usuarioId || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).send({
        ok: false,
        message: "usuarioId está vacío"
    });
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).send({
        ok: false,
        message: 'usuarioId con formato incorrecto'
    });

    db.query('call getMisTrabajos(?)', usuarioId, function (error, results) {
        if (error) throw error;

        console.log(results[0]);

        res.status(200).json((results[0] == null) ? [] : results[0]);
    });
};

exports.getAnuncioPublicado = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnuncioPublicado --------");
    console.log('');

    let anuncioId = (req.query.anuncioId || '').trim();

    if (v.isEmpty(anuncioId)) return res.status(400).send({
        ok: false,
        message: "anuncioId está vacío"
    });
    if (!v.isInt(anuncioId, {min: 1})) return res.status(400).send({
        ok: false,
        message: 'anuncioId con formato incorrecto'
    });


    db.query('call getTrabajoConPropuesta(?)', anuncioId, function (err, results) {
        if (err) throw err;

        db.query('call getPropuestasPorTrabajo(?)', anuncioId, function (err2, results2) {
            if (err2) throw err2;

            let anuncio = {
                id: results[0][0].id,
                titulo: results[0][0].titulo,
                profesiones: results[0][0].profesiones,
                preciodesde: results[0][0].preciodesde,
                preciohasta: results[0][0].preciohasta,
                fechahorapublicacion: results[0][0].fechahorapublicacion,
                cantidadpropuestas: results[0][0].cantidadpropuestas,
                estado: results[0][0].estado,
                dsc: results[0][0].dsc,
                usuario: {
                    id: results[0][0].usuarioid,
                    apellido: results[0][0].apellido,
                    nombre: results[0][0].nombre,
                    reputacion: results[0][0].reputacion
                },
                propuestas: []
            };

            if (results2[0] != null) {
                for (var i = 0; i < results2[0].length; i++) {
                    anuncio.propuestas[i] = {
                        id: results2[0][i].id,
                        dsc: results2[0][i].dsc,
                        precio: results2[0][i].precio,
                        aceptado: results2[0][i].aceptado == 1,
                        fechahorainsert: results2[0][i].fechahorainsert,
                        profesional: {
                            id: results2[0][i].profesionalid,
                            username: results2[0][i].username
                        }
                    }
                }
            }

            return res.status(200).json(anuncio);
        });
    });
};

exports.publicarAnuncio = (req, res) => {
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
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).send({
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
                return res.status(500).send({message: error});
            }


            return res.status(200).json(results[0][0].id);
        });
};

exports.editarAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.editarAnuncio --------");
    console.log('');

    let id = (req.body.id || '').trim();
    let titulo = (req.body.titulo || '').trim();
    let profesiones = (req.body.profesiones || '').trim();
    let precioDesde = (req.body.precioDesde || '').trim();
    let precioHasta = (req.body.precioHasta || '').trim();
    let dsc = (req.body.dsc || '').trim();

    if (v.isEmpty(id)) return res.status(400).send({
        ok: false,
        message: "id está vacío"
    });
    if (!v.isInt(id, {min: 1})) return res.status(400).send({
        ok: false,
        message: 'id con formato incorrecto'
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


    db.query('call updateTrabajo(?,?,?,?,?,?)',
        [id, titulo, profesiones, precioDesde, precioHasta, dsc], (error, results) => {
            if (error) throw error;

            res.status(200).json(results[0][0].ok == 1)
        });
};

exports.eliminarAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.eliminarAnuncio --------");
    console.log('');

    let id = (req.body.id || '').trim();

    if (v.isEmpty(id)) return res.status(400).send({
        ok: false,
        message: "id está vacío"
    });
    if (!v.isInt(id, {min: 1})) return res.status(400).send({
        ok: false,
        message: 'id con formato incorrecto'
    });

    db.query('call deleteTrabajo(?)', id, (error, results) => {
        if (error) throw error;

        res.status(200).json(results[0][0].ok == 1);
    });
};

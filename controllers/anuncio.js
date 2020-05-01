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

    db.query('call anuncioGetAnuncios(?, ?, ?)', data, function (error, results) {
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

    db.query('call anuncioGetAnuncio(?)', anuncioId, function (err1, r1) {
        if (err1) return res.status(400).json(false);

        db.query('call propuestaGetPropuesta(?, ?)', [usuarioId, anuncioId], function (err2, r2) {
            if (err2) return res.status(400).json(false);

            res.status(200).json({
                id: r1[0][0].id,
                titulo: r1[0][0].titulo,
                profesiones: r1[0][0].profesiones,
                precioDesde: r1[0][0].precioDesde,
                precioHasta: r1[0][0].precioHasta,
                fechaHoraPublicacion: r1[0][0].fechaHoraPublicacion,
                cantidadPropuestas: r1[0][0].cantidadPropuestas,
                estado: r1[0][0].estado,
                dsc: r1[0][0].dsc,
                usuario: {
                    id: r1[0][0].usuarioId,
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
    console.log("------- Anuncio.getAnunciosPublicados --------");
    console.log('');

    let usuarioId = (req.query.usuarioId || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);

    db.query('call anuncioGetAnunciosPublicados(?)', usuarioId, function (error, results) {
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

    if (v.isEmpty(anuncioId)) return res.status(400).json(false);
    if (!v.isInt(anuncioId, {min: 1})) return res.status(400).json(false);

    db.query('call anuncioGetAnuncioPublicado(?)', anuncioId, function (err, results) {
        if (err) return res.status(400).json(false);

        db.query('call propuestaGetPropuestas(?)', anuncioId, function (err2, results2) {
            if (err2) return res.status(400).json(false);

            let anuncio = {
                id: results[0][0].id,
                titulo: results[0][0].titulo,
                profesiones: results[0][0].profesiones,
                precioDesde: results[0][0].precioDesde,
                precioHasta: results[0][0].precioHasta,
                fechaHoraPublicacion: results[0][0].fechaHoraPublicacion,
                cantidadPropuestas: results[0][0].cantidadPropuestas,
                estado: results[0][0].estado,
                dsc: results[0][0].dsc,
                usuario: {
                    id: results[0][0].usuarioId,
                    apellido: results[0][0].apellido,
                    nombre: results[0][0].nombre,
                    reputacion: results[0][0].reputacion
                },
                propuestas: []
            };

            if (results2[0] != null) {
                for (let i = 0; i < results2[0].length; i++) {
                    anuncio.propuestas[i] = {
                        id: results2[0][i].id,
                        dsc: results2[0][i].dsc,
                        precio: results2[0][i].precio,
                        isAceptado: results2[0][i].isAceptado === 1,
                        fechaHoraInsert: results2[0][i].fechaHoraInsert,
                        profesional: {
                            id: results2[0][i].profesionalId,
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
    console.log("------- Anuncio.publicarAnuncio --------");
    console.log('');

    let usuarioId = (req.body.usuarioId || '').trim();
    let titulo = (req.body.titulo || '').trim();
    let profesiones = (req.body.profesiones || '').trim();
    let dsc = (req.body.dsc || '').trim();
    let precioDesde = (req.body.precioDesde || '').trim();
    let precioHasta = (req.body.precioHasta || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).json(false);
    if (!v.isInt(usuarioId, {min: 1})) return res.status(400).json(false);
    if (v.isEmpty(titulo)) return res.status(400).json(false);
    if (v.isEmpty(profesiones)) return res.status(400).json(false);
    if (!v.isDecimal(precioDesde)) return res.status(400).json(false);
    if (!v.isDecimal(precioHasta)) return res.status(400).json(false);

    db.query('call anuncioInsert(?,?,?,?,?,?)', [usuarioId, titulo, profesiones, dsc, precioDesde, precioHasta], (error, results) => {
        if (error != null) return res.status(400).json(false);

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

    if (v.isEmpty(id)) return res.status(400).json(false);
    if (!v.isInt(id, {min: 1})) return res.status(400).json(false);
    if (v.isEmpty(titulo)) return res.status(400).json(false);
    if (v.isEmpty(profesiones)) return res.status(400).json(false);
    if (!v.isDecimal(precioDesde)) return res.status(400).json(false);
    if (!v.isDecimal(precioHasta)) return res.status(400).json(false);

    db.query('call anuncioUpdate(?,?,?,?,?,?)', [id, titulo, profesiones, precioDesde, precioHasta, dsc], (error, results) => {
        if (error) return res.status(400).json(false);

        res.status(200).json(results[0][0].ok === 1)
    });
};

exports.eliminarAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.eliminarAnuncio --------");
    console.log('');

    let id = (req.body.id || '').trim();

    if (v.isEmpty(id)) return res.status(400).json(false);
    if (!v.isInt(id, {min: 1})) return res.status(400).json(false);

    db.query('call anuncioDelete(?)', id, (error, results) => {
        if (error) return res.status(400).json(false);

        res.status(200).json(results[0][0].ok === 1);
    });
};

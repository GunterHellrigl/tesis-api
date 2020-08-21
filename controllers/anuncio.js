'use strict';

exports.getAnuncios = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnuncios --------");
    console.log('');

    const query = (req.query.query || '').trim();
    const usuarioId = (req.query.usuarioId || '').trim();
    let precioDesde = (req.query.precioDesde || '').trim()
    let precioHasta = (req.query.precioHasta || '').trim()

    console.log(query);
    console.log(usuarioId);
    console.log(precioDesde);
    console.log(precioHasta);

    if (precioDesde === '') precioDesde = null;
    if (precioHasta === '') precioHasta = null;

    db.query('call anuncioGetAnuncios(?, ?, ?, ?)', [query, usuarioId, precioDesde, precioHasta], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400);
        }

        console.log('res', results[0]);
        return res.status(200).send(results[0]);
    });
};

exports.getAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnuncio --------");
    console.log('');

    const anuncioId = (req.query.anuncioId || '').trim();
    const usuarioId = (req.query.usuarioId || '').trim();

    console.log("anuncioId", anuncioId);
    console.log("usuarioId", usuarioId);

    //TODO validaciones

    db.query('call anuncioGetAnuncio(?)', anuncioId, (e1, r1) => {
        if (e1) {
            console.log(e1);
            return res.status(400).json(false);
        }

        db.query('call propuestaGetPropuesta(?, ?)', [usuarioId, anuncioId], (e2, r2) => {
            if (e2) {
                console.log(e2);
                return res.status(400).json(false);
            }

            const anuncio = {
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
            };

            console.log('res', anuncio)
            res.status(200).json(anuncio);
        });
    });
};

exports.getAnunciosPublicados = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnunciosPublicados --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    //TODO validaciones

    db.query('call anuncioGetAnunciosPublicados(?)', usuarioId, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json(false);
        }

        console.log('res', results[0]);
        res.status(200).json((results[0] == null) ? [] : results[0]);
    });
};

exports.getAnuncioPublicado = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnuncioPublicado --------");
    console.log('');

    const anuncioId = (req.query.anuncioId || '').trim();

    //TODO validaciones

    db.query('call anuncioGetAnuncioPublicado(?)', anuncioId, (e1, r1) => {
        if (e1) {
            console.log(e1);
            return res.status(400).json(false);
        }

        db.query('call propuestaGetPropuestas(?)', anuncioId, (e2, r2) => {
            if (e2) {
                console.log(e2);
                return res.status(400).json(false);
            }
            
            db.query('call profesionGetByAnuncio(?)', anuncioId, (e3, r3) => {
            	if (e3) {
		            console.log(e3);
		            return res.status(400).json(false);
		        }
		        
		        let response = {
		        	ok: true,
		        	anuncio: {
		        		id: r1[0][0].id,
						titulo: r1[0][0].titulo,
						precioDesde: r1[0][0].precioDesde,
						precioHasta: r1[0][0].precioHasta,
						fechaHoraPublicacion: r1[0][0].fechaHoraPublicacion,
						cantidadPropuestas: r1[0][0].cantidadPropuestas,
						estadoId: r1[0][0].estadoId,
						dsc: r1[0][0].dsc,
						profesiones: []
		        	},
		            propuestas: []
		        };
		        
		        if (r2[0] != null) {
		            for (let i = 0; i < r2[0].length; i++) {
		                response.propuestas[i] = {
		                    id: r2[0][i].id,
		                    dsc: r2[0][i].dsc,
		                    precio: r2[0][i].precio,
		                    isAceptado: r2[0][i].isAceptado === 1,
		                    fechaHoraInsert: r2[0][i].fechaHoraInsert,
		                    profesional: {
		                        id: r2[0][i].profesionalId,
		                        username: r2[0][i].username
		                    }
		                }
		            }
		        }
		        
		        if (r3[0] != null) {
		        	for (let i = 0; i < r3[0].length; i++) {
		        		response.anuncio.profesiones[i] = {
		        			id: r3[0][i].id,
		        			dsc: r3[0][i].dsc
		        		}
		        	}
		        }

		        console.log('res', response);
		        return res.status(200).json(response);
            });
        });
    });
};

exports.publicarAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.publicarAnuncio --------");
    console.log('');

    const usuarioId = (req.body.usuarioId || '').trim();
    const titulo = (req.body.titulo || '').trim();
    const dsc = (req.body.dsc || '').trim();
    const profesiones = (req.body.profesiones || '').trim();
    const precioDesde = (req.body.precioDesde || '').trim();
    const precioHasta = (req.body.precioHasta || '').trim();

    console.log(usuarioId);
    console.log(titulo);
    console.log(dsc);
    console.log(profesiones);
    console.log(precioDesde);
    console.log(precioHasta);

    //TODO validaciones

    db.query('call anuncioInsert(?,?,?,?,?,?)', [usuarioId, titulo, dsc, profesiones, precioDesde, precioHasta], (error, results) => {
        if (error != null) {
            console.log(error);
            return res.status(400).json(false);
        }

        console.log('res', results[0][0].id);
        return res.status(200).json(results[0][0].id);
    });
};

exports.editarAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.editarAnuncio --------");
    console.log('');

    const id = (req.body.id || '').trim();
    const titulo = (req.body.titulo || '').trim();
    const dsc = (req.body.dsc || '').trim();
    const profesiones = (req.body.profesiones || '').trim();
    const precioDesde = (req.body.precioDesde || '').trim();
    const precioHasta = (req.body.precioHasta || '').trim();

    console.log(id);
    console.log(titulo);
    console.log(dsc);
    console.log(profesiones);
    console.log(precioDesde);
    console.log(precioHasta);

    //TODO validaciones

    db.query('call anuncioUpdate(?,?,?,?,?,?)', [id, titulo, dsc, profesiones, precioDesde, precioHasta], (error, results) => {
        if (error != null) {
            console.log(error);
            return res.status(400).json(false);
        }

        console.log('res', results[0][0].ok === 1)
        res.status(200).json(results[0][0].ok === 1)
    });
};

exports.eliminarAnuncio = (req, res) => {
    console.log('');
    console.log("------- Anuncio.eliminarAnuncio --------");
    console.log('');

    const id = (req.body.id || '').trim();

    console.log(id);

    //TODO validaciones

    db.query('call anuncioDelete(?)', id, (error, results) => {
        if (error != null) {
            console.log(error);
            return res.status(400).json(false);
        }

        console.log('res', results[0][0].ok === 1)
        res.status(200).json(results[0][0].ok === 1);
    });
};

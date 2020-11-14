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

            db.query('call profesionGetByAnuncio(?)', anuncioId, (e3, r3) => {
                if (e3) {
                    console.log(e3);
                    return res.status(400).json(false);
                }

                let response = {
                    ok: true,
                    anuncio: {
                        id: r1[0][0].id,
                        usuario: {
                            id: r1[0][0].usuarioId,
                            username: r1[0][0].username,
                            apellido: r1[0][0].apellido,
                            nombre: r1[0][0].nombre,
                            reputacion: r1[0][0].reputacion,
                            foto: r1[0][0].foto
                        },
                        titulo: r1[0][0].titulo,
                        precioDesde: r1[0][0].precioDesde,
                        precioHasta: r1[0][0].precioHasta,
                        fechaHoraPublicacion: r1[0][0].fechaHoraPublicacion,
                        cantidadPropuestas: r1[0][0].cantidadPropuestas,
                        estadoId: r1[0][0].estadoId,
                        dsc: r1[0][0].dsc,
                        profesiones: []
                    },
                    propuesta: null
                };

                if (r2[0][0] != null) {
                    response.propuesta = {
                        id: r2[0][0].id,
                        profesional: {
                            id: r2[0][0].profesionalId
                        },
                        anuncio: {
                            id: r2[0][0].anuncioId
                        },
                        dsc: r2[0][0].dsc,
                        precio: r2[0][0].precio
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

exports.getAnunciosPublicados = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getAnunciosPublicados --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();
    const query = (req.query.query || '').trim();

    console.log("usuarioId", usuarioId);
    console.log("query", query);

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

    // En caso de estar aceptado busco el profesional aceptado
    let profesionalId;

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
		            propuestas: [],
                    contactos: []
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
		                        username: r2[0][i].username,
		                        foto: r2[0][i].foto
		                    }
		                }

		                if (r2[0][i].isAceptado === 1) {
		                    profesionalId = r2[0][i].profesionalId;
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

                if (r1[0][0].estadoId === 2 || r1[0][0].estadoId === 3) {

                    db.query('call usuarioGetContactos(?)', profesionalId, (e4, r4) => {
                        if (e4) {
                            console.log(e4);
                            return res.status(400).json(false);
                        }
                        console.log('contactos', r4[0]);
                        if (r4[0] != null) {
                            for (let i = 0; i < r4[0].length; i++) {
                                response.contactos[i] = {
                                    id: r4[0][i].id,
                                    dsc: r4[0][i].dsc,
                                    valor: r4[0][i].valor
                                }
                            }
                        }

                        console.log('res', response);
                        return res.status(200).json(response);
                    });

                } else {
                    console.log('res', response);
                    return res.status(200).json(response);
                }
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

exports.getTrabajosPendientes = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getTrabajosPendientes --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    console.log(usuarioId);

    db.query('call anuncioGetTrabajosPendientes(?)', usuarioId, (e1, r1) => {
        if (e1) {
            console.log("Error", e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0]);
        return res.status(200).send(r1[0]);
    });
};

exports.getTrabajosFinalizados = (req, res) => {
    console.log('');
    console.log("------- Anuncio.getTrabajosFinalizados --------");
    console.log('');

    const usuarioId = (req.query.usuarioId || '').trim();

    console.log(usuarioId);

    db.query('call anuncioGetTrabajosFinalizados(?)', usuarioId, (e1, r1) => {
        if (e1) {
            console.log("Error", e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0]);
        return res.status(200).send(r1[0]);
    });
};

exports.calificarUsuario = (req, res) => {
    console.log('');
    console.log('------- Anuncio.calificarUsuario --------');
    console.log('');

    const id = (req.body.id || '').trim();
    const reputacion = (req.body.reputacion || '').trim();
    const dsc = (req.body.dsc || '').trim();

    console.log("id", id);
    console.log("reputacion", reputacion);
    console.log("dsc", dsc);

    db.query('call anuncioCalificarUsuario(?, ?, ?)', [id, reputacion, dsc], (e1, r1) => {
        if (e1) {
            console.log("Error", e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok === 1)
        res.status(200).json(r1[0][0].ok === 1);
    });
};

exports.calificarProfesional = (req, res) => {
    console.log('');
    console.log('------- Anuncio.calificarProfesional --------');
    console.log('');

    const id = (req.body.id || '').trim();
    const trabajo = (req.body.trabajo || '').trim();
    const trabajador = (req.body.trabajador || '').trim();
    const precio = (req.body.precio || '').trim();
    const dsc = (req.body.dsc || '').trim();

    console.log("id", id);
    console.log("trabajo", trabajo);
    console.log("trabajador", trabajador);
    console.log("precio", precio);
    console.log("dsc", dsc);

    db.query('call anuncioCalificarProfesional(?, ?, ?, ?, ?)', [id, trabajo, trabajador, precio, dsc], (e1, r1) => {
        if (e1) {
            console.log("Error", e1);
            return res.status(400).json(false);
        }

        console.log('res', r1[0][0].ok === 1)
        res.status(200).json(r1[0][0].ok === 1);
    });
};
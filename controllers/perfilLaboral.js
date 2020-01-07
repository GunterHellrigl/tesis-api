exports.registro = (req, res) => {
    console.log('');
    console.log("------- Perfil Laboral - Registro --------");
    console.log('');

    let usuarioId = (req.body.usuarioId || '').trim();
    let cono_habi = (req.body.cono_habi || '').trim();
    let profesiones = (req.body.profesiones || '').trim();

    if (v.isEmpty(usuarioId)) return res.status(400).send({
        ok: false,
        message: "usuarioId está vacío"
    });
    if (!v.isInt(usuarioId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'usuarioId con formato incorrecto'
    });

    if (v.isEmpty(cono_habi)) return res.status(400).send({
        ok: false,
        message: "cono_habi está vacío"
    });

    if (v.isEmpty(profesiones)) return res.status(400).send({
        ok: false,
        message: "profesiones está vacío"
    });

    
    

    db.query('call perfilLaboralRegistro(?, ?, ?)', [usuarioId, cono_habi, profesiones], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        if (!results[0][0].ok) {
            
            return res.status(400).send({
                ok: false,
                message: results[0][0].message
            });
        }
        
        return res.status(201).send({
            ok: true
        });
    });
};

exports.desactivar = (req, res) => {

};

exports.activar = (req, res) => {
    console.log('');
    console.log("------- Perfil Laboral - Activate --------");
    console.log('');

    let username = (req.body.username || '').trim();
    let pwd = (req.body.pwd || '').trim();
    let apellido = (req.body.apellido || '').trim();
    let nombre = (req.body.nombre || '').trim();
    let email = (req.body.email || '').trim();
    let telefono = (req.body.telefono || '').trim();

    if (v.isEmpty(username)) return res.status(400).send({
        ok: false,
        message: "username está vacío"
    });

    if (v.isEmpty(pwd)) return res.status(400).send({
        ok: false,
        message: "pwd está vacío"
    });

    if (v.isEmpty(apellido)) return res.status(400).send({
        ok: false,
        message: "apellido está vacío"
    });

    if (v.isEmpty(nombre)) return res.status(400).send({
        ok: false,
        message: "nombre está vacío"
    });

    if (v.isEmpty(email)) return res.status(400).send({
        ok: false,
        message: "email está vacío"
    });
    if (!v.isEmail(email)) return res.status(400).send({
        ok: false,
        message: "email con formato incorrecto"
    });

    if (v.isEmpty(telefono)) return res.status(400).send({
        ok: false,
        message: "telefono está vacío"
    });
    if (!v.isMobilePhone(telefono)) return res.status(400).send({
        ok: false,
        message: "telefono con formato incorrecto"
    });

    db.query('call registro(?, ?, ?, ?, ?, ?)', [username, pwd, apellido, nombre, email, telefono], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        if (!results[0][0].ok) {
            
            return res.status(400).send({
                ok: false,
                message: results[0][0].message
            });
        }
        
        return res.status(201).send({
            ok: true,
            usuario: {
                username,
                apellido,
                nombre,
                email,
                telefono
            }
        });
    });
};
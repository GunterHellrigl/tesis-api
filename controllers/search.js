const v = require('validator');

exports.getProfesionales = (req, res) => {
    console.log('');
    console.log("------- Search - getProfesionales --------");
    console.log('');


    let query = (req.body.query || '').trim();
    console.log('query: ', query);


    let words = query.split(' ');
    query = "";
    words.forEach(word => {
        query += word + '* ';
    });

    console.log('query: ', query);

    db.query('call searchProfesionales(?)', [query], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        return res.status(200).send({
            ok: true,
            usuarios: results[0]
        });
    });
}

exports.getTrabajos = (req, res) => {
    console.log('');
    console.log("------- Search - getTrabajos --------");
    console.log('');

    let query = (req.body.query || '').trim();
    let profesiones = (req.body.profesiones || '').trim();

    console.log('query: ', query);
    console.log('profesiones: ', profesiones);


    let words = query.split(' ');
    query = "";
    words.forEach(word => {
        query += word + '* ';
    });

    console.log('query: ', query);

    db.query('call searchTrabajos(?, ?)', [query, profesiones], function (error, results) {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null) {
            console.log('Results: ', results);
        }

        return res.status(200).send({
            ok: true,
            trabajos: results[0]
        });
    });
}

// id: results[0][0].id,
//             apellido: results[0][0].apellido,
//             email: results[0][0].email,
//             nombre: results[0][0].nombre,
//             telefono: results[0][0].telefono,
//             username: results[0][0].username,
//             cono_habi: results[0][0].cono_habi,
//             profesiones: results[0][0].profesiones

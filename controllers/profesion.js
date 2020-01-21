exports.getProfesiones = (req, res) => {
    console.log('');
    console.log("------- Profesiones - getProfesiones --------");
    console.log('');

    let query = (req.query.query || '').trim();

		console.log(query);

    db.query('call getProfesiones(?)', [query], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results != null && results[0].length > 0) {
            console.log('Results: ', results[0]);

            return res.status(200).send({
                ok: true,
                profesiones: results[0]
            });

        } else {
            return res.status(200).send({
                ok: false,
                message: 'Sin resultados'
            });
        }
    });
};

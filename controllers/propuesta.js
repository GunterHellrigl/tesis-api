const v = require('validator');

exports.insert = (req, res) => {
    console.log('');
    console.log("------- Propuesta - Insert --------");
    console.log('');

    let trabajoId = (req.body.trabajoId || '').trim();
    let profesionalId = (req.body.profesionalId || '').trim();
    let dsc = (req.body.dsc || '').trim();
    let precio = (req.body.precio || '').trim();

    if (v.isEmpty(trabajoId)) return res.status(200).send({
        ok: false,
        message: "trabajoId está vacío"
    });
    if (!v.isInt(trabajoId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'trabajoId con formato incorrecto'
    });
    if (v.isEmpty(profesionalId)) return res.status(200).send({
        ok: false,
        message: "profesionalId está vacío"
    });
    if (!v.isInt(profesionalId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'profesionalId con formato incorrecto'
    });
    if (v.isEmpty(dsc)) return res.status(200).send({
        ok: false,
        message: "dsc está vacío"
    });
    if (v.isEmpty(precio)) return res.status(200).send({
        ok: false,
        message: "precio está vacío"
    });
    if (!v.isDecimal(precio)) return res.status(400).send({
        ok: false,
        message: "precio con formato incorrecto"
    });

    db.query('call insertPropuesta(?, ?, ?, ?)', [trabajoId, profesionalId, dsc, precio], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});
        console.log('Results: ', results);

        return res.status(201).send({ok: true});
    });
};

exports.update = (req, res) => {
    console.log('');
    console.log("------- Propuesta - Update --------");
    console.log('');

    let trabajoId = (req.body.trabajoId || '').trim();
    let profesionalId = (req.body.profesionalId || '').trim();
    let dsc = (req.body.dsc || '').trim();
    let precio = (req.body.precio || '').trim();

    if (v.isEmpty(trabajoId)) return res.status(200).send({
        ok: false,
        message: "trabajoId está vacío"
    });
    if (!v.isInt(trabajoId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'trabajoId con formato incorrecto'
    });
    if (v.isEmpty(profesionalId)) return res.status(200).send({
        ok: false,
        message: "profesionalId está vacío"
    });
    if (!v.isInt(profesionalId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'profesionalId con formato incorrecto'
    });
    if (v.isEmpty(dsc)) return res.status(200).send({
        ok: false,
        message: "dsc está vacío"
    });
    if (v.isEmpty(precio)) return res.status(200).send({
        ok: false,
        message: "precio está vacío"
    });
    if (!v.isDecimal(precio)) return res.status(400).send({
        ok: false,
        message: "precio con formato incorrecto"
    });

    db.query('call updatePropuesta(?, ?, ?, ?)', [profesionalId, trabajoId, dsc, precio], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});
        console.log('Results: ', results);

        return res.status(200).send({ok: true});
    });
};

exports.getPropuesta = (req, res) => {
    console.log('');
    console.log("------- Propuesta - GetPropuesta --------");
    console.log('');

    let profesionalId = (req.params.profesionalId || '').trim();
    let trabajoId = (req.params.trabajoId || '').trim();

    console.log(profesionalId);
    console.log(trabajoId);

    if (v.isEmpty(trabajoId)) return res.status(200).send({
        ok: false,
        message: "trabajoId está vacío"
    });
    if (!v.isInt(trabajoId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'trabajoId con formato incorrecto'
    });
    if (v.isEmpty(profesionalId)) return res.status(200).send({
        ok: false,
        message: "profesionalId está vacío"
    });
    if (!v.isInt(profesionalId, {min:1})) return res.status(400).send({
        ok: false,
        message: 'profesionalId con formato incorrecto'
    });

    db.query('call getPropuesta(?, ?)', [profesionalId, trabajoId], (error, results) => {
        if (error != null) {
            console.log('Error: ', error);
            return res.status(500).send({error});
        }

        if (results == null) return res.status(200).send({ok:false});
        console.log('Results: ', results);

        if (results[0].length == 0) return res.status(200).send({ok:false});

        return res.status(200).send({
            ok: true,
            propuesta: {
                profesionalid: results[0][0].profesionalid,
                trabajoid: results[0][0].trabajoid,
                dsc: results[0][0].dsc,
                precio: results[0][0].precio
            }
        });
    });
};

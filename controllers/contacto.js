exports.getContactos = (req, res) => {
    db.query('call contactoGetContactos', (e1, r1) => {
        if (e1) {
            console.log('e1', e1);
            return res.status(400).json(false);
        }

        res.status(200).json(r1[0]);
    })
};
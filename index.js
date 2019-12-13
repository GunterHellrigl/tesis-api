const mysql = require('mysql');
const http = require("./app");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trabajo'
});

db.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    global.db = db;

    http.listen(3000, function () {
        console.log('App listening at port 3000');
    });
});
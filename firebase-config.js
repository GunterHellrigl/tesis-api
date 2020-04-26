var admin = require("firebase-admin");

var serviceAccount = require("./guni-tesis-firebase-adminsdk");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://guni-tesis.firebaseio.com"
});

module.exports.admin = admin;
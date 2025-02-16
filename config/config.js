const admin = require("firebase-admin");
const serviceAccount = require("./restapi-1d162-firebase-adminsdk-fbsvc-dfd812bfb5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://restapi-1d162-default-rtdb.firebaseio.com"
  });

const database = admin.database(); // Use .database() instead of .firestore()
module.exports = database;

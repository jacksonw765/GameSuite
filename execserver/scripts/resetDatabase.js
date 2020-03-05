try {
    console.log(require.resolve("firebase-admin"));
} catch (e) {
    console.error("firebase-admin is not installed");
    process.exit(e.code);
}

var admin = require("firebase-admin");

var serviceAccount = require("./firebase_secret_auth.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gamesuite-2a4b8.firebaseio.com"
});

function deleteUser(uid) {
    admin.auth().deleteUser(uid)
        .then(function () {
            console.log('Successfully deleted user', uid);
        })
        .catch(function (error) {
            console.log('Error deleting user:', error);
        });
}

function getAllUsers(nextPageToken) {
    admin.auth().listUsers(100, nextPageToken)
        .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                uid = userRecord.toJSON().uid;
                deleteUser(uid);
            });
            if (listUsersResult.pageToken) {
                getAllUsers(listUsersResult.pageToken);
            }
        })
        .catch(function (error) {
            console.log('Error listing users:', error);
        });
}

getAllUsers();
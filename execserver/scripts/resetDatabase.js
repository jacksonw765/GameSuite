try {
    console.log(require.resolve("firebase-admin"));
} catch(e) {
    console.error("firebase-admin is not installed");
    process.exit(e.code);
}

var admin = require("firebase-admin");

var serviceAccount = require("./firebase_secret_auth.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gamesuite-2a4b8.firebaseio.com"
});

function deleteUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                admin.auth().deleteUser(userRecord['uid'])
                    .then(function () {
                        console.log('Successfully deleted user');
                    })
                    .catch(function (error) {
                        console.log('Error deleting user:', error);
                    });
            });
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken);
            } else {
                process.exit(-1);
            }
        })
        .catch(function (error) {
            console.log('Error listing users:', error);
        });
}

deleteUsers();
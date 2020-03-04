window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location = '/'
        }
    });
};


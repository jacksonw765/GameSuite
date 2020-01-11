window.onload = function () {
    handleSignIn();
};

function handleSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            $('#img-loading').hide();
            $('#game-contents').show();

        } else {
            console.log('not signed in');
            $('#img-loading').hide();
            $('#content-main-no-auth').show();
        }
    });
}

function showSignIn() {
    $(function () {
        $('#auth-modal').modal('toggle');
        $('#auth-modal-sign-in').modal('toggle');
    });
}

function signInUser() {
    console.log('sign in user');
    var email = $('#sign_in_id_email').val();
    var password = $('#sign_in_id_password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
    });
}

function createNewUser() {
    console.log('create user');
    var email = $('#create_id_email').val();
    var password = $('#create_id_password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
    });
}
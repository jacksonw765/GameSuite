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
    var email = $('#sign_in_id_email').val();
    var password = $('#sign_in_id_password').val();
    if (emailValidation(email)) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            showAlertSignIn(errorMessage, 'alert-danger');
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user)
                location.reload();
        });
    } else {
        showAlertSignIn("Email is invalid", 'alert-danger');
    }
}

function emailValidation(email) {
    let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email.match(pattern);
}

function showAlertCreate(message, alert) {
    console.log('alert');
    $('#create-account-modal-content').append('<div style="margin: 5px" id="alertdiv" class="alert" ' + alert + '"><a class="close" data-dismiss="alert">X</a><span style="font-size:14px">' + message + '</span></div>');
    setTimeout(function () {
        $("#alertdiv").remove();
    }, 5000);
}

function showAlertSignIn(message) {
    console.log('alert');
    $('#modal-sign-in-body').append('<div id="alertdiv" style="margin: 10px" class="alert alert-danger"><a class="close" data-dismiss="alert">X</a><span style="font-size:14px">' + message + '</span></div>');
    setTimeout(function () {
        $("#alertdiv").remove();
    }, 5000);
}

function createNewUser() {
    console.log('create user');
    var email = $('#create_id_email').val();
    var password = $('#create_id_password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $('#create-account-danger-alert').alert();
        console.log(errorMessage)
    });
}
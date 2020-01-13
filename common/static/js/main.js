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
    let email = $('#sign_in_id_email').val();
    let password = $('#sign_in_id_password').val();
    if (emailValidation(email)) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            showAlertSignIn(errorMessage);
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user)
                location.reload();
        });
    } else {
        showAlertSignIn("Email is invalid");
    }
}

function emailValidation(email) {
    let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email.match(pattern);
}

function showAlertCreate(message) {
    $('#create-account-modal-content').append('<div id="alertdiv" style="margin: 10px" class="alert alert-danger"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
    setTimeout(function () {
        $("#alertdiv").remove();
    }, 5000);
}

function showAlertSignIn(message) {
    $('#modal-sign-in-body').append('<div id="alertdiv" style="margin: 10px" class="alert alert-danger"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
    setTimeout(function () {
        $("#alertdiv").remove();
    }, 5000);
}

function createNewUser() {
    let username = $('#create_id_username').val();
    let email = $('#create_id_email').val();
    let password = $('#create_id_password').val();
    if (emailValidation(email)) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            showAlertCreate(errorMessage);
            console.log(errorMessage);
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user)
                location.reload();
        });
    } else {
        showAlertCreate('Email is Invalid');
    }
}

function sendData(username, email) {
    let retval = "An error occurred";
    if (username !== null && email !== null) {
        $.ajaxSetup({
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        });
        $.ajax(
            {
                type: 'POST',
                url: '',
                async: false,
                data: {
                    'email': email,
                    'username': username,
                },
                dataType: 'json',
                success: (data) => {
                    retval = data;
                }
            }
        )
    }
    return retval;
}
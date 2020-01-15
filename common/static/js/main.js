window.onload = function () {
    handleSignIn();
};

function handleSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#img-loading').hide();
            $('#game-contents').show();
            $('#main-sign-out').show();
        } else {
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
            var errorMessage = error.message;
            showAlertSignIn(errorMessage);
        });
        showAlertGoodSignIn("Signed in");
        firebase.auth().onAuthStateChanged(function (user) {
            if (user)
                location.reload();
        });
    } else {
        showAlertSignIn("Email is invalid");
    }
}

function createNewUser() {
    let username = $('#create_id_username').val();
    let email = $('#create_id_email').val();
    let password = $('#create_id_password').val();
    if (emailValidation(email)) {
        if (password.length >= 6) {
            if (!/[^a-zA-Z0-9]/.test(username)) {
                if (checkUsernameTaken(username)['check']) {
                    var hasError = false;
                    var errorMessage;
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(function (user) {
                            $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?').then(function (data) {
                                let city = data['geoplugin_city'];
                                let state = data['geoplugin_regionCode'];
                                console.log(data);
                                let userLocation = city + ', ' + state;
                                sendData(username, email, userLocation);
                                showAlertGoodCreate("User Added!");
                                firebase.auth().onAuthStateChanged(function (user) {
                                    if (user)
                                        location.reload();
                                });
                            });
                        })
                        .catch(function (error) {
                            hasError = true;
                            errorMessage = error.message;
                            showAlertCreate(errorMessage);
                            console.log(errorMessage);
                        });
                } else {
                    showAlertCreate('Username is already in use');
                }
            } else {
                showAlertCreate('Username is invalid');
            }
        } else {
            showAlertCreate("Password is less than 6 characters");
        }
    } else {
        showAlertCreate('Email is invalid');
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

function showAlertGoodCreate(message) {
    $('#create-account-modal-content').append('<div id="alertdiv-good" style="margin: 10px" class="alert alert-success"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
}

function showAlertGoodSignIn(message) {
    $('#modal-sign-in-body').append('<div id="alertdiv-good" style="margin: 10px" class="alert alert-success"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
}

function showAlertSignIn(message) {
    $('#modal-sign-in-body').append('<div id="alertdiv" style="margin: 10px" class="alert alert-danger"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
    setTimeout(function () {
        $("#alertdiv").remove();
    }, 5000);
}

function sendData(username, email, location) {
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
                    'location': location,
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

function checkUsernameTaken(username) {
    let retval = "An error occurred";
    if (username !== null) {
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
                    'check': true,
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

function signOut() {
    firebase.auth().signOut();
    location.reload();
}
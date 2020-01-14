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

function getUserLocation() {
    $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (data) {
        let city = data['geoplugin_city'];
        let state = data['geoplugin_regionCode'];
        console.log(city + ', ' + state);
        return city + ', ' + state;
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
        if (!/[^a-zA-Z0-9]/.test(username)) {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                var errorMessage = error.message;
                showAlertCreate(errorMessage);
                console.log(errorMessage);
            });
            let location = getUserLocation();
            retval = sendData(username, email, location);
            console.log(retval);
            if (retval['result'] === 1) {
                showAlertGoodCreate(retval['message']);
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user)
                        location.reload();
                });
            } else {
                showAlertCreate(retval['message']);
            }
        } else {
            showAlertCreate('Username is invalid');
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

function isSignedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user)

            user[displayName]
    });
}

function signOut() {
    firebase.auth().signOut();
}
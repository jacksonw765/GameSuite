// called when page loads
window.onload = function () {
    userSignIn();
};

// checks if user is signed in
function userSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let auth = getUserAuthMethod(user['uid']);
            if (auth['auth'] === 'twitter') {
                $('#img-loading').hide();
                $('#content-account-twitter-suc').show();
                $('#content-account-no').hide();
                if (user['displayName'] !== undefined) {
                    $('#name-account').empty().append(user['displayName']);
                    $('#handle-account').empty().append('@' + auth['username']);
                } else {
                    $('#name-account').empty().append('Unable to get display name');
                }
                $('#img-account').attr('src', user['photoURL']);
            } else {
                $('#img-loading').hide();
                $('#content-account-userpass-suc').show();
                $('#content-account-no').hide();
                $('#handle-account-up').empty().append('Welcome, ' + auth['username']);
            }
        } else {
            $('#img-loading').hide();
            $('#content-main-no-auth').show();
        }
    });
}

function getUserAuthMethod(uid) {
    let retval = "";
    if (uid !== null) {
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
                    'auth_method': '_',
                    'uid': uid,
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

function showSignIn() {
    $(function () {
        $('#auth-modal').modal('toggle');
        $('#auth-modal-sign-in').modal('toggle');
    });
}

function showReset() {
    $(function () {
        $('#auth-modal-sign-in').modal('toggle');
        $('#auth-modal-reset-password').modal('toggle');
    });
}

function signInUser() {
    let email = $('#sign_in_id_email').val();
    let password = $('#sign_in_id_password').val();
    if (emailValidation(email)) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (data) {
            showAlertGoodSignIn("Signed in");
            firebase.auth().onAuthStateChanged(function (user) {
                if (user)
                    window.location.reload();
                else {
                    $('#content-main-no-auth').hide();
                }
            });
        }).catch(function (error) {
            var errorMessage = error.message;
            showAlertSignIn(errorMessage);
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
                    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                        showAlertCreate(error.message);
                    }).then(function (result) {
                        $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?').then(function (data) {
                            let city = data['geoplugin_city'];
                            let state = data['geoplugin_regionCode'];
                            let userLocation = city + ', ' + state;
                            sendUserPassAuth(result.user['uid'], username, email, userLocation, 'user_pass');
                            showAlertGoodCreate("User Added!");
                        });
                    }).catch(function (error) {
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

function resetPassword() {
    let email = $('#sign_in_id_email_reset').val();
    if (emailValidation(email)) {
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            showAlertGoodReset("Please check your email");
        }).catch(function (error) {
            showAlertReset(error.message);
        });
    } else {
        showAlertReset("Email is invalid");
    }
}

function sendUserPassAuth(uid, username, email, location, auth_type) {
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
                    'create_user': '_',
                    'auth_type': auth_type,
                    'uid': uid,
                    'email': email,
                    'username': username,
                    'location': location,
                },
                dataType: 'json',
                success: (data) => {
                    retval = data;
                    //window.location = '/account';
                }
            }
        )
    }
    return retval;
}

function sendTwitterAuth(uid, twitterID, userName, email, location, auth_type) {
    let retval = {};
    if (uid !== null && twitterID) {
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
                    'create_user': '_',
                    'auth_type': auth_type,
                    'twitter_id': twitterID,
                    'uid': uid,
                    'email': email,
                    'name': userName,
                    'location': location,
                },
                dataType: 'json',
                success: (data) => {
                    retval = data;
                    window.location.reload();
                }
            }
        )
    }
    return retval;
}

function twitterSignin() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(function (error) {
        alert(error.toString());
    }).then(function (result) {
        let user = result.user;
        let uid = user['uid'];
        let twitterID = user['providerData'][0]['uid'];
        let email = user['providerData'][0]['email'];
        let userName = user['displayName'];
        $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?').then(function (data) {
            let city = data['geoplugin_city'];
            let state = data['geoplugin_regionCode'];
            let userLocation = city + ', ' + state;
            sendTwitterAuth(uid, twitterID, userName, email, userLocation, 'twitter');
            /*
            firebase.auth().onAuthStateChanged(function (user) {
                if (user)
                    location.reload();
            });

             */
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            showAlertCreate(error.message);
            //alert("error: " + error.code + " : " + error.message);
        });
    });
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
    firebase.auth().signOut().catch(function (error) {
        alert(error.toString());
    });
    window.location.reload();
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

function showAlertReset(message) {
    $('#modal-sign-in-body-reset').append('<div id="alertdiv" style="margin: 10px" class="alert alert-danger"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
    setTimeout(function () {
        $("#alertdiv").remove();
    }, 5000);
}

function showAlertGoodReset(message) {
    $('#modal-sign-in-body-reset').append('<div id="alertdiv-good" style="margin: 10px" class="alert alert-success"><a class="close" data-dismiss="alert">X</a><span style="font-size:16px">' + message + '</span></div>');
}
// called when page loads
window.onload = function () {
    userSignIn();
};

// checks if user is signed in
function userSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let auth = getUserAuthMethod(user['uid']);
            if(auth['auth'] === 'twitter') {
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
            window.location = '/'
        }
    });
}

function signOut() {
    firebase.auth().signOut();
    location.reload();
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
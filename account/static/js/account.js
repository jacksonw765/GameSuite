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
                $('#content-account-suc').show();
                $('#content-account-no').hide();
                if (user['displayName'] !== undefined) {
                    $('#name-account').empty().append(user['displayName']);
                    $('#handle-account').empty().append('@' + auth['username']);
                } else {
                    $('#name-account').empty().append('Unable to get display name');
                }
                $('#img-account').attr('src', user['photoURL']);
            } else {
                console.log('userpass');
            }
        } else {
            window.location = '/'
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
                    'check': true,
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
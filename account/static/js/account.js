// called when page loads
window.onload = function () {
    userSignIn();
};

// checks if user is signed in
function userSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            $('#content-account-suc').show();
            $('#content-account-no').hide();
            if (user['displayName'] !== undefined) {
                $('#name-account').append(user['displayName']);
                getUserScreenName(user['providerData'][0]['uid'])
            } else
                $('#name-account').append('Unable to get display name');
            $('#img-account').attr('src', user['photoURL'])
        } else {
            console.log('signed out');
            $('#content-account-suc').hide();
            $('#content-account-no').show();
        }
    });
}

// ajax function to convert uid to user handle
function getUserScreenName(uid) {
    var retval = "";
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
                async: true,
                data: {
                    'uid': uid
                },
                dataType: 'json',
                success: (data) => {
                    retval = data;
                    console.log(data);
                }
            }
        )
    }
    return retval;
}
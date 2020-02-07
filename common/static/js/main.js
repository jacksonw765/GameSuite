window.onload = function () {
    handleSignIn();
};

function handleSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#main-sign-out').show();
        } else {
            $('#main-create').show();
            $('#img-loading').hide();
            //$('#content-main-no-auth').show();
        }
    });
    $('#img-loading').hide();
    $('#game-contents').show();
    $('#content-main-no-auth').hide();
}

function redirectToAccount() {
    window.location = '/account';
}
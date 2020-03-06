window.onload = function () {
    handleSignIn();
};

function handleSignIn() {
    console.log("SIGN IN?");
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
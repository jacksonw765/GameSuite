// called when page loads
window.onload = function() {
    userSignIn();
};

// checks if user is signed in
// checks if user is signed in
function userSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            $('#content-account-suc').show();
            $('#content-account-no').hide();
            if(user['displayName'] !== undefined) {
                $('#name-account').append(user['displayName']);
            }
            else
                $('#name-account').append('Unable to get display name');
            $('#img-account').attr('src', user['photoURL'])
        } else {
            console.log('signed out');
            $('#content-account-suc').hide();
            $('#content-account-no').show();
        }
    });
}
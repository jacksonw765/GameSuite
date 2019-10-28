// called when page loads
window.onload = function() {
    userSignIn();
};

// checks if user is signed in
function userSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
        } else {
            console.log("user is null");
        }
    });
}
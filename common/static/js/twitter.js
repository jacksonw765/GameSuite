function twitterSignin() {
    var provider = new firebase.auth.TwitterAuthProvider();
   firebase.auth().signInWithPopup(provider)
  .then(function(result) {
      var globalUser = result.user;
      console.log(globalUser);
   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
      alert("error: " + error.code + " : " + error.message );
   });
}

function twitterSignout() {
   firebase.auth().signOut()
   .then(function() {
      console.log('Signout successful!');
      alert("signed out!")
   }, function(error) {
      console.log('Signout failed!');
      alert("error: " + error);
   });
}
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
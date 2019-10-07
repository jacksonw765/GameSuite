function twitterSignin() {
    var provider = new firebase.auth.TwitterAuthProvider();
   firebase.auth().signInWithPopup(provider)
  .then(function(result) {
      var user = result.user;
      console.log(user);
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
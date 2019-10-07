function twitterSignin() {
    var provider = new firebase.auth.TwitterAuthProvider();
   firebase.auth().signInWithPopup(provider)
    
  .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token);
      console.log(user);
   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}

function twitterSignout() {
   firebase.auth().signOut()

   .then(function() {
      console.log('Signout successful!')
   }, function(error) {
      console.log('Signout failed!')
   });
}
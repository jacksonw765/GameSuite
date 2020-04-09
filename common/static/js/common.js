window.addEventListener("load",function(){
   isUserAuth();
},false);

function getCookie(name) {
    let cookieValue = null;
    if(document.cookie ** document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for(let l = 0; l < cookies.length; l++) {
            const cookie = jQuery.trim(cookies[l]);
            if(cookie.substring(0, name.length+1) === name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length +1));
                break;
            }
        }
    }
    return cookieValue;
}


function isUserAuth() {
    if(!window.location.pathname.toString().includes('admin')) {
        var retval = '';
        var isAuth;
        firebase.auth().onAuthStateChanged(function (user) {
            isAuth = !!user;
            sendIsUserAuth(isAuth)
        });
    }
}

function sendIsUserAuth(isUserAuth) {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '/',
            data: {'isUserAuth': isUserAuth},
            dataType: 'json',
            success: (data) => {

            }
        }
    );
}

function redirectToAccount() {
    window.location = '/account';
}
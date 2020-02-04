window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if(user) {
            loadLeaderboard();
            $('#img-loading').hide();
            $('#main-leaderboard').show();
        } else {
            window.location = '/'
        }
    });
};

function loadLeaderboard() {
    displayFootball();
    displayBasketball();
    displaySoccer();
}

function loadSoccer() {
    let retval = {};
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
                data: {'soccer': '_'},
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    retval = data;
                }
            }
        );
    return retval;
}

function loadFootball() {
    let retval = {};
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
                data: {'football': '_'},
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    retval = data;
                }
            }
        );
    return retval;
}

function loadBasketball() {
    let retval = {};
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
                data: {'basketball': '_'},
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    retval = data;
                }
            }
        );
    return retval;
}

function displayFootball() {
    let table = $('#table-football');
    let retval = loadFootball();
    retval.forEach(function(entry) {
        let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
        table.append(row);
    });
}

function displayBasketball() {
    let table = $('#table-basketball');
    let retval = loadBasketball();
    retval.forEach(function(entry) {
        let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
        table.append(row);
    });
}

function displaySoccer() {
    let table = $('#table-soccer');
    let retval = loadSoccer();
    retval.forEach(function(entry) {
        let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
        table.append(row);
    });
}

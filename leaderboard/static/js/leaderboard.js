window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#main-sign-out').show();
        } else {
            $('#main-create').show();
            $('#img-loading').hide();
        }
    });
    loadLeaderboard();
    $('#img-loading').hide();
    $('#main-leaderboard').show();
};

function loadLeaderboard() {
    loadBasketball();
    loadSoccer();
    loadFootball();
}

function loadSoccer() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'soccer': '_'},
            dataType: 'json',
            success: (data) => {
                let table = $('#table-basketball');
                data.forEach(function (entry) {
                    let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
                    table.append(row);
                });
            }
        }
    );
}

function loadFootball() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'football': '_'},
            dataType: 'json',
            success: (data) => {
                let table = $('#table-football');
                data.forEach(function (entry) {
                    let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
                    table.append(row);
                });
            }
        }
    );
}

function loadBasketball() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'basketball': '_'},
            dataType: 'json',
            success: (data) => {
                let table = $('#table-basketball');
                data.forEach(function (entry) {
                    let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
                    table.append(row);
                });
            }
        }
    );
}
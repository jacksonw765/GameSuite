window.onload = function () {
    loadLeaderboard();
};

function loadLeaderboard() {
    displayFootball();
}

function loadPK() {
    
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

}

function displayFootball() {
    let table = $('#table-football');
    let retval = loadFootball();
    retval.forEach(function(entry) {
        let row = `<tr><td>${entry["username"]}</td><td>${entry["score"]}</td></tr>`;
        table.append(row);
    });
}


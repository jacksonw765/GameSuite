function showResetDatabaseModal() {
    $('#reset-modal').modal('toggle');
}

function showResetLeaderboard() {
    $('#reset-modal-leaderboard').modal('toggle');
}

function sendRestDatabasePost() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'reset_database': '_'},
            dataType: 'json',
            success: (data) => {
                $('#reset-model-text').text(data)
            }
        }
    );
}

function sendRestLeaderboardPost() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'reset_leaderboard': '_'},
            dataType: 'json',
            success: (data) => {
                $('#reset-model-leaderboard-text').text(data)
            }
        }
    );
}
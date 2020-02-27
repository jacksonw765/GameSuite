function showResetDatabaseModal() {
    $('#reset-modal').modal('toggle');
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
                $('#reset-modal').innerHTML = `<h3>${data}</h3>`
            }
        }
    );
}
function showResetDatabaseModal() {
    $('#reset-modal').modal('toggle');
}

function resetDatabase() {
    let result = sendRestDatabasePost();
    $('#reset-modal').innerHTML = `<h3>${result}</h3>`
}

function sendRestDatabasePost() {
    let retval = [];
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
                data: {'reset_database': '_'},
                dataType: 'json',
                success: (data) => {
                    retval = data;
                }
            }
        );
    return retval;
}
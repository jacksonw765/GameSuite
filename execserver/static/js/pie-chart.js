window.onload = function () {
    auths = getUserAuthData();
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["UserPass", "Twitter"],
            datasets: [{
                data: [auths['user_pass'], auths['twitter']],
                backgroundColor: ['#dc3545', '#17a2b8'],
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItems, data) {
                        return data.labels[tooltipItems.index] +
                            ": " +
                            data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index]
                    }
                }
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });
};

// ajax request
function getUserAuthData() {
    let retval = [0, 0];
        $.ajaxSetup({
            headers: {
                'pieHeader': 'pieIsGood',
                "X-CSRFToken": getCookie("csrftoken")
            }
        });
        $.ajax(
            {
                type: 'POST',
                url: '',
                async: false,
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    retval = data;
                }
            }
        );
    return retval;
}
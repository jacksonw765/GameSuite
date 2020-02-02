window.onload = function () {
    displayUserAuthPie();
    displayUserLocations();
};

function displayUserAuthPie() {
    auths = getUserAuthData();
    var ctx = document.getElementById("user-auth-pie");
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
}

function displayUserLocations() {
    let locations = getUserTopLocations();
    let labels = formatUserLocationsLabel(locations);
    let data = formatUserLocationData(locations);
    var ctx2 = document.getElementById("user-locations");
    var myLocationChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
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
}

// ajax request
function getUserAuthData() {
    let retval = [0, 0];
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
                data: {'pieHeader': '_'},
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    retval = data;
                }
            }
        );
    return retval;
}

// ajax request
function getUserTopLocations() {
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
                data: {'locationHeader': '_'},
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    retval = data;
                }
            }
        );
    return retval;
}

function formatUserLocationsLabel(locations) {
    let keys = Object.keys(locations);
    let retval = [];
    let index = 0;
    keys.forEach(function(key) {
        if(index <= 4) {
            retval.push(key);
            ++index;
        }
        else {
            if(keys.length > 4) {
                retval.push('Other');
            }
        }
    });
    return retval;
}

function formatUserLocationData(locations) {
    let values = Object.values(locations);
    let retval = [];
    let other = [];
    let index = 0;
    values.forEach(function(value) {
        if(index <= 4) {
            retval.push(value);
            ++index;
        }
        else {
            other = other + values;
        }
    });
    return retval;
}
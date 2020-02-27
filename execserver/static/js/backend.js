window.onload = function () {
    getTwitterUserHashtags();
    getUserAuthData();
    getEvents();
    getUserTopLocations();
};


// ajax request
function getUserAuthData() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'pieHeader': '_'},
            dataType: 'json',
            success: (data) => {
                var ctx = document.getElementById("user-auth-pie");
                var myPieChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["UserPass", "Twitter"],
                        datasets: [{
                            data: [data['user_pass'], data['twitter']],
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
        }
    );
}

// ajax request
function getTwitterUserHashtags() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'hashtagHeader': '_'},
            dataType: 'json',
            success: (data) => {
                let table = $('#table-hashtags');
                data.forEach(function (entry) {
                    formated = formatHashtags(entry['hashtags']);
                    let row = `<tr><td>${"@" + entry["id"]}</td><td>${formated.join('</br>')}</td></tr>`;
                    table.append(row);
                });

                function formatHashtags(hastags) {
                    var list = [];
                    for (x = 0; x < hastags.length; x++) {
                        list.push(hastags[x][0] + ': ' + hastags[x][1] + '\n');
                    }
                    return list;
                }
            }
        }
    );
}

// ajax request
function getUserTopLocations() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'locationHeader': '_'},
            dataType: 'json',
            success: (data) => {
                var retval = JSON.parse(data);
                let labels = formatUserLocationsLabel(retval);
                let formated = formatUserLocationData(retval);
                let colors = formatColors(retval);
                buildHashtagLabelDisplay(labels, colors);
                var ctx2 = document.getElementById("user-locations");
                var myLocationChart = new Chart(ctx2, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: formated,
                            backgroundColor: colors,
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
        }
    );
}

// ajax request
function getEvents() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {'eventsHeader': '_'},
            dataType: 'json',
            success: (data) => {
                let table = $('#table-events');
                data.forEach(function (event) {
                    var style = '';
                    var exception = event['exception'];
                    var message = event['message'];
                    var date = new Date(event['date']);
                    var code = event['code'];
                    var row;
                    if (exception == null)
                        exception = "N/A";
                    if (code === 0) {
                        row = `<tr><td>${exception}</td><td>${message}</td><td>${date}</td></tr>`;
                    }
                    if (code === 1) {
                        row = `<tr class="table-danger"><td>${exception}</td><td>${message}</td><td>${date}</td></tr>`;
                    }
                    table.append(row);
                });
            }
        }
    );
}

function formatUserLocationsLabel(locations) {
    let keys = getAtIndex(locations, 0);
    let retval = [];
    let index = 0;
    keys.forEach(function (key) {
        if (index <= 4) {
            retval.push(key);
            ++index;
        } else {
            if (keys.length > 4) {
                retval.push('Other');
            }
        }
    });
    return retval;
}

// 0 is key
// 1 is value
function getAtIndex(array, index) {
    let retval = [];
    for (x = 0; x < array.length; ++x) {
        retval.push(array[x][index]);
    }
    return retval;
}

function formatUserLocationData(locations) {
    let values = getAtIndex(locations, 1);
    let retval = [];
    let other = [];
    let index = 0;
    values.forEach(function (value) {
        if (index <= 4) {
            retval.push(value);
            ++index;
        } else {
            other = other + values;
        }
    });
    return retval;
}

function formatColors(locations) {
    let values = locations.length;
    let colors = ['#F5B700', '#DC0073', '#7692FF', '#53917E', '#BBC7CE'];
    return colors.slice(0, values);
}

function buildHashtagLabelDisplay(labels, colors) {
    let display = $('#locations-text-display');
    colors.forEach(function (value, index) {
        let style = 'style="color: ' + value + ' "> ';
        var current = '<span class=\"mr-2\"><i class="fas fa-circle"' + style + '</i>' + '   ' + labels[index] + '</span>';
        display.append(current);
    });
}
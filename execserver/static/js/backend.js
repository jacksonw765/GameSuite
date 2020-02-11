window.onload = function () {
    displayUserHashtags();
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
    let colors = formatColors(locations);
    buildLabelDisplay(labels, colors);
    var ctx2 = document.getElementById("user-locations");
    var myLocationChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
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

function displayUserHashtags() {
    let data = getTwitterUserHashtags();
    let table = $('#table-hashtags');
    data.forEach(function(entry) {
        formated = formatHashtags(entry['hashtags']);
        let row = `<tr><td>${"@"+entry["id"]}</td><td>${formated.join('</br>')}</td></tr>`;
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
                    retval = data;
                }
            }
        );
    return retval;
}

// ajax request
function getTwitterUserHashtags() {
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
                data: {'hashtagHeader': '_'},
                dataType: 'json',
                success: (data) => {
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
                    retval = JSON.parse(data);
                    console.log(retval);
                }
            }
        );
    return retval;
}

function formatUserLocationsLabel(locations) {
    let keys = getAtIndex(locations, 0);
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

// 0 is key
// 1 is value
function getAtIndex(array, index) {
    let retval = [];
    for(x = 0; x < array.length; ++x) {
        retval.push(array[x][index]);
    }
    return retval;
}

function formatUserLocationData(locations) {
    let values = getAtIndex(locations, 1);
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

function formatColors(locations) {
    let values = locations.length;
    let colors = ['#F5B700', '#DC0073', '#7692FF', '#53917E', '#BBC7CE'];
    return colors.slice(0, values);
}

function buildLabelDisplay(labels, colors) {
    let display = $('#locations-text-display');
    colors.forEach(function(value, index) {
        let style = 'style="color: ' + value + ' "> ';
        var current = '<span class=\"mr-2\"><i class="fas fa-circle"' + style + '</i>' + '   '+ labels[index] + '</span>';
        display.append(current);
    });
}
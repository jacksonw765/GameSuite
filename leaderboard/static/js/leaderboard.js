window.onload = function () {
    loadLeaderboard();
    $.getJSON('https://json.geoiplookup.io', function(data) {
  console.log(JSON.stringify(data, null, 2));
});
};

function loadLeaderboard() {
    loadPK();
    loadFieldGoal();
    loadBasketball();
}

function loadPK() {
    
}

function loadFieldGoal() {

}

function loadBasketball() {

}
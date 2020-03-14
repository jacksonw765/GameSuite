let globalUser;

window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            globalUser = user;
        }
    });
};

// NOTE: Originally 640x1000. Other possible sizes: 512x800, 400x625
var game = new Phaser.Game(400, 625, Phaser.CANVAS, '', { 
    preload: preload, 
    create: create, 
    update: update 
});

	// Load Assets
function preload() {
	game.load.image('background', background);
    game.load.image('ball', ball);
    game.load.image('hoop', hoop);
	game.load.image('side_rim', side_rim);
	game.load.image('front_rim', front_rim);
}

var hoop,
left_rim,
right_rim,
ball,
front_rim,
current_score = 0,
current_score_text,
high_score = 0,
high_score_text,
current_best_text,
current_best_score_text;

var collisionGroup;

function create() {
		// Starts old version of Phaser
	game.physics.startSystem(Phaser.Physics.P2JS);

	game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 0.63;
    game.physics.p2.gravity.y = 0;

		// Creates Collision Grouping
	collisionGroup = game.physics.p2.createCollisionGroup();

		// Background Color (for now)
	game.stage.backgroundColor = "#ffffff";
	background = game.add.sprite(0, 0, 'background');
	background.x = 0;
	background.y = 0;
	background.width = game.width;
	background.height = game.height;

		// Game Text on Make or Miss
	current_score_text = game.add.text(190, 127, '', { font: 'Arial', fontSize: '40px', fill: '#fff', align: 'center' }); // 300, 500
	current_best_text = game.add.text(125, 80, '', { font: 'Arial', fontSize: '25px', fill: '#fff', align: 'center' });// 230, 450
	current_best_score_text = game.add.text(190, 127, '', { font: 'Arial', fontSize: '40px', fill: '#00e6e6', align: 'center' }); // 300, 500

		// Adding Hoop Images
	hoop = game.add.sprite(88, 62, 'hoop'); // 141, 100
	left_rim = game.add.sprite(150, 184, 'side_rim'); // 241, 296
	right_rim = game.add.sprite(249, 184, 'side_rim'); // 398, 296
	front_rim = game.add.sprite(148, 182, 'front_rim');

		// Adding hoop physics
	game.physics.p2.enable([ left_rim, right_rim], false);

	left_rim.body.setCircle(2.5);
	left_rim.body.static = true;
	left_rim.body.setCollisionGroup(collisionGroup);
	left_rim.body.collides([collisionGroup]);

	right_rim.body.setCircle(2.5);
	right_rim.body.static = true;
	right_rim.body.setCollisionGroup(collisionGroup);
	right_rim.body.collides([collisionGroup]);

	createBall();
	cursors = game.input.keyboard.createCursorKeys();

	game.input.onDown.add(click, this);
	game.input.onUp.add(release, this);

		// Text Instructions at bottom of Page
	// var instructions = document.createElement("span");
	// instructions.innerHTML = "Instructions: Quickly drag the ball to shoot the ball into the hoop!";
	// document.body.appendChild(instructions);
}

function update() {
		// Ball short and hitting front of rim
	if (ball && ball.body.velocity.y > 0) {
		front_rim = game.add.sprite(148, 182, 'front_rim');
		ball.body.collides([collisionGroup], hitRim, this);
	}
		// Ball went "through" hoop and was inside the made basket coordinates
	if (ball && ball.body.velocity.y > 0 && ball.body.y > 188 && !ball.isBelowHoop) {
		ball.isBelowHoop = true;
		ball.body.collideWorldBounds = false;
		if (ball.body.x > 151 && ball.body.x < 249) {
			current_score += 1;
			current_score_text.text = current_score;
		} else { // Checking for high score
			if (current_score > high_score) {
				high_score = current_score;
				if(globalUser) {
					postHighScore(current_score)
				}
			}
			current_score = 0;
			current_score_text.text = '';
			current_best_text.text = 'Current Best';
			current_best_score_text.text = high_score;
		}
	}
		// After falling, destroy Ball and set new ball
	if (ball && ball.body.y > 1200) {
		game.physics.p2.gravity.y = 0;
		ball.kill();
		createBall();
	}
}

	// Empty Function if wanted to added more after miss
function hitRim() {
	// Add Sound?
}

	// Creating new ball after make or miss
function createBall() {
	var xpos;
	if (current_score === 0) {
		xpos = 200;
	} else {
		xpos = 60 + Math.random() * 280;
	}
	ball = game.add.sprite(xpos, 547, 'ball');
	game.add.tween(ball.scale).from({x : 0.7, y : 0.7}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
	game.physics.p2.enable(ball, false);
	ball.body.setCircle(60); // NOTE: Goes from 60 to 36
	ball.launched = false;
	ball.isBelowHoop = false;
}

var location_interval;
var isDown = false;
var start_location;
var end_location;

	// When mouse is clicked
function click(pointer) {
	var bodies = game.physics.p2.hitTest(pointer.position, [ ball.body ]);
	if (bodies.length) {
		start_location = [pointer.x, pointer.y];
		isDown = true;
		location_interval = setInterval(function () {
			start_location = [pointer.x, pointer.y];
		}.bind(this), 200);
	}
}

	// On release of the click
function release(pointer) {
	if (isDown) {
		window.clearInterval(location_interval);
		isDown = false;
		end_location = [pointer.x, pointer.y];

		if (end_location[1] < start_location[1]) {
			var slope = [end_location[0] - start_location[0], end_location[1] - start_location[1]];
			var x_traj = -2300 * slope[0] / slope[1];
			launch(x_traj);
		}
	}
}

	// Launch Trajectory and Speed of ball
function launch(x_traj) {
	if (ball.launched === false) {
		ball.body.setCircle(36);
		ball.body.setCollisionGroup(collisionGroup);
		current_best_text.text = '';
		current_best_score_text.text = '';
		ball.launched = true;
		game.physics.p2.gravity.y = 3000;
		game.add.tween(ball.scale).to({x : 0.55, y : 0.55}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
		ball.body.velocity.x = x_traj;
		ball.body.velocity.y = -1750;
		ball.body.rotateRight(x_traj / 3);
	}
}

// send ajax to post high score
function postHighScore(score) {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });
    $.ajax(
        {
            type: 'POST',
            url: '',
            data: {
            	'basketballHeader': '_',
            	'uid': globalUser['uid'],
				'score': score
			},
            dataType: 'json',
            success: (data) => {
            	console.log('high score logged')
            }
        }
    );
}

// send ajax to post high score
function loadHighScore(score) {
	retval = '';
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
            data: {
            	'getBasketballScore': '_',
            	'uid': globalUser['uid'],
			},
            dataType: 'json',
            success: (data) => {
            	retval = data;
            }
        }
    );
    return retval;
}
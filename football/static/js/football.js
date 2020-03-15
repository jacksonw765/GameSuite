let globalUser;

window.onload = function () {
    console.log('here');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            globalUser = user;
        } else {
            //window.location = '/'
        }
    });
};


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var enemies;
var ball;
var enemys;
var endzone;
var sideline;
var cursors;
var graphics;
var moveCam = false;
var score = 0;
var gameOver = false;
var touchdown = false;
var scoreText;
var loseText;
var newGame;
var endScore;
var highScore;
var cam;
var dpad;
var btnUp;
var btnDown;
var btnLeft;
var btnRight;
var moving = false;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', backgroundSprite);
    this.load.spritesheet('sprite', userSprite, {frameWidth: 66, frameHeight: 66});
    this.load.image('enemy', enemySprite);
    this.load.image('dpad', dpad);
    this.load.image('hidden', hidden);
}

function create ()
{
        // Game Background
    background = this.add.image(250, 200, 'background').setScale(1.75);
    background.x = 0;
    background.y = 0;
    background.height = this.height;
    background.width = this.width;

        // Setting Camera Boundary
    this.cameras.main.setBounds(-550, -1120, 550 * 2, 1120 * 2);

        // Setting Game Boundary
    sideline = this.physics.world.setBounds(-500, -1050, 500 * 2, 1050 * 2);

        // Input Events
    cursors = this.input.keyboard.createCursorKeys();

        // Player Spawn Location
    player = this.physics.add.sprite(
        0, // x coordinate
        175, // y coordinate
        'sprite'
    );
    player.body.setSize(40,50,true);

        //  Produce Enemies
    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 15,
        runChildUpdate: true,
        collideWorldBounds: true
    });

        //  Give each enemy a slightly different speed
    enemies.children.iterate(function (child) {
        child.x = Phaser.Math.FloatBetween(-475, 475);
        child.y = Phaser.Math.FloatBetween(-200, -800);
        child.body.setSize(27,45,true);
    });

        // Enemies Collide
    this.physics.add.collider(enemies, enemies);
    this.physics.add.collider(enemies, sideline);

        // Player Collision is ON
    player.setCollideWorldBounds(true);

        // Setting score text to a fixed position in the top-left corner
    scoreText = this.add.text(0, 0, "Score: 0").setScrollFactor(0).setFontSize(40).setColor('#000000');

        // Add DPad
    dpad = this.add.image(700, 500, 'dpad').setScale(.30).setScrollFactor(0);

        // Add directional buttons
    btnUp = this.add.image(dpad.x, dpad.y - (dpad.displayHeight / 2) + 10, 'hidden').setScale(1.7).setScrollFactor(0).setInteractive();
    btnDown = this.add.image(dpad.x, dpad.y + (dpad.displayHeight / 2) - 10, 'hidden').setScale(1.7).setScrollFactor(0).setInteractive();
    btnLeft = this.add.image(dpad.x - (dpad.displayWidth / 2) + 10, dpad.y, 'hidden').setScale(1.7).setScrollFactor(0).setInteractive();
    btnRight = this.add.image(dpad.x + (dpad.displayWidth / 2) - 10, dpad.y, 'hidden').setScale(1.7).setScrollFactor(0).setInteractive();

        // Hide Buttons
    btnUp.alpha = .01;
    btnDown.alpha = .01;
    btnLeft.alpha = .01;
    btnRight.alpha = .01;

        // On Click of dpad
    btnUp.on('pointerdown', goUp);
    btnDown.on('pointerdown', goDown);
    btnLeft.on('pointerdown', goLeft);
    btnRight.on('pointerdown', goRight);

        // On release of dpad
    btnUp.on('pointerout', goStopY);
    btnDown.on('pointerout', goStopY);
    btnLeft.on('pointerout', goStopX);
    btnRight.on('pointerout', goStopX);

        // Set Camera to follow Player
    this.cameras.main.startFollow(player, true);

    if (this.cameras.main.deadzone)
    {
        graphics = this.add.graphics().setScrollFactor(0);
        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
    }

        // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('sprite', { start: 4, end: 7 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'forward',
        frames: this.anims.generateFrameNumbers('sprite', { start: 12, end: 15 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'backward',
        frames: this.anims.generateFrameNumbers('sprite', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sprite', { start: 8, end: 11 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'stop',
        frames: [ { key: 'sprite', frame: 12 } ],
        frameRate: 10
    });

        // Check to see if player collides with enemy or sideline
    this.physics.add.overlap(player, sideline, outOfBounds, null, this);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
};

function update ()
{
        // Check to see if Window is resized
    var windowWidth = window.innerWidth;
    var gameWidth = game.config.width;
    if(windowWidth <= gameWidth) {
        window.focus()
        resize();
        window.addEventListener("resize", resize, false);
    }

    if (gameOver)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('stop', true);

        saveHighScore(score);
            // Game Over Screen
        var camx = player.x; // Location of player
        var camy = player.y;
        var text = this.add.text(camx - 105, camy + 20, 'Game Over!', { fontSize: '40px', fill: '#000', align: 'center' });
        //loseText = this.add.text(300, 200, 'Game Over!', { fontSize: '40px', fill: '#000' });
        //endScore = this.add.text(240, 250, 'Your Score was ' + score, { fontSize: '32px', fill: '#000' });
        //highScore = this.add.text(270, 300, 'High Score: ' + localStorage.getItem("highScore"),  { fontSize: '32px', fill: '#000' });
        newGame = this.add.text(camx - 60, camy + 60, 'Restart', { fontSize: '32px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', function(){
                location.reload();
            });
    };

    if (touchdown)
    {
        score += 100;
        scoreText.setText("Score: " + score);

            // Resetting Player and Enemies
        player.setPosition(0, 175);
        enemies.children.iterate(function (child) {
            child.x = Phaser.Math.FloatBetween(-475, 475);
            child.y = Phaser.Math.FloatBetween(-200, -800);
            child.body.setSize(27,45,true);
        });

        touchdown = false;

        var camx = player.x; // Location of player
        var camy = player.y;
        var text = this.add.text(camx - 85, camy + 20, 'Touchdown!', { fontSize: '30px', fill: '#000', align: 'center' });
    }

    var cam = this.cameras.main;

    // Input Controls and Speed of Player
    if(!moving) {
        if (cursors.up.isDown) {
            player.setVelocityY(-100);
            player.anims.play('forward', true);
        } else if (cursors.down.isDown) {
            player.setVelocityY(100);
            player.anims.play('backward', true);
        } else {
            player.setVelocityY(0);
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-100);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(100);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
        }
        if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            player.anims.play('stop', true);
        }
    }

        // Find Players Coordinates
    var xCord = player.x;
    var yCord = player.y;

        // If player enters EndZone, call scoreTD() function
    if (yCord < -880) {
        scoreTD();
        player.setX = 0;
        player.sety = 175;
    }

        // If Player goes out of bounds, call outOfBounds() function
    if (xCord > 478) {
        outOfBounds();
    }
    else if (xCord < -478) {
        outOfBounds();
    }

        // Enemies Follow Player && Setting Speed of Enemies
    enemies.children.iterate(function (child) {

        var diffX = player.x - child.x;
        var diffY = player.y - child.y;

        if((diffX < 100 && diffX > -100 ) || (diffY < 100 && diffY > -100)) {
            if(diffX > 0) {
                child.setVelocityX(50); // Moves Left
            } else {
                child.setVelocityX(-50); // Moves Right
            }

            if(diffY < 0) {
                child.setVelocityY(-50); // Moves Up
            } else {
                child.setVelocityY(50); // Moves Down
            }
        } else {
            child.setVelocityX(0);
            child.setVelocityY(50)
        }
    });
};

    // Functions for dpad controls
function goUp () {
    player.setVelocityY(-100);
    player.anims.play('forward', true);
    moving = true;
}
function goDown () {
    player.setVelocityY(100);
    player.anims.play('backward', true);
    moving = true;
}
function goLeft () {
    player.setVelocityX(-100);
    player.anims.play('left', true);
    moving = true;
}
function goRight () {
    player.setVelocityX(100);
    player.anims.play('right', true);
    moving = true;
}
function goStopX () {
    player.setVelocityX(0);
    moving = false;
}
function goStopY () {
    player.setVelocityY(0);
    moving = false;
}

    // Score TD Function
function scoreTD ()
{
    touchdown = true;
}

    //Hit Enemy Function
function hitEnemy (player, enemy)
{
    gameOver = true;
}

    // Bounds Function
function outOfBounds ()
{
    gameOver = true;
}

function saveHighScore (score)
{
    let hs = localStorage.getItem("highScore");
    if(score > hs)
    {
    localStorage.setItem('highScore', score);
    }
}

    // pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

// send ajax to post high score
function postHighScore(score) {
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
            data: {'user': globalUser['uid'], 'score': score},
            dataType: 'json',
            success: (data) => {
                setTimeout(function () {
                    alert(data['retval']);
                    window.location = '/'
                }, 3000);
            }
        }
    );
    return retval;
}
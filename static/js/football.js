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
var ball;
var counter = 0;
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', backgroundSprite);
    this.load.spritesheet('sprite', userSprite, {frameWidth: 66, frameHeight: 66});
    this.load.image('enemy', enemySprite);
}

function create() {
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

    //  Produce Enemiess
    enemies1 = this.physics.add.group({
        key: 'enemy',
        repeat: 10,
        runChildUpdate: true,
        setXY: {x: -475, y: -200, stepX: 95},
        collideWorldBounds: true
    });

    enemies2 = this.physics.add.group({
        key: 'enemy',
        repeat: 10,
        runChildUpdate: true,
        setXY: {x: -475, y: -500, stepX: 95},
        collideWorldBounds: true
    });

    enemies3 = this.physics.add.group({
        key: 'enemy',
        repeat: 10,
        runChildUpdate: true,
        setXY: {x: -475, y: -800, stepX: 95},
        collideWorldBounds: true
    });

    enemies4 = this.physics.add.group({
        key: 'enemy',
        repeat: 10,
        runChildUpdate: true,
        setXY: {x: -475, y: -1000, stepX: 95},
        collideWorldBounds: true
    });

    //  Give each enemy a slightly different speed
    enemies1.children.iterate(function (child) {
        child.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
        child.setVelocityY(Phaser.Math.FloatBetween(70, 100));
        child.body.setSize(27,45,true);
    });

    enemies2.children.iterate(function (child) {
        child.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
        child.setVelocityY(Phaser.Math.FloatBetween(60, 90));
        child.body.setSize(27,45,true);
    });

    enemies3.children.iterate(function (child) {
        child.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
        child.setVelocityY(Phaser.Math.FloatBetween(50, 80));
        child.body.setSize(27,45,true);
    });

    enemies4.children.iterate(function (child) {
        child.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
        child.setVelocityY(Phaser.Math.FloatBetween(40, 70));
        child.body.setSize(27,45,true);
    });

    // Enemies Follow Player
    // enemies.startFollow(player);

    // Enemies Collide
    // this.physics.add.collider(enemies, enemies);
    this.physics.add.collider(enemies1, sideline);
    this.physics.add.collider(enemies2, sideline);
    this.physics.add.collider(enemies3, sideline);
    this.physics.add.collider(enemies4, sideline);


    // Player Collision is ON
    player.setCollideWorldBounds(true);

    // Setting score text to a fixed position in the top-left corner
    scoreText = this.add.text(0, 0, "Score: 0").setScrollFactor(0).setFontSize(40).setColor('#000000');


    // Set Camera to follow Player
    this.cameras.main.startFollow(player, true);

    if (this.cameras.main.deadzone) {
        graphics = this.add.graphics().setScrollFactor(0);
        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
    }

    // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('sprite', {start: 4, end: 7}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'forward',
        frames: this.anims.generateFrameNumbers('sprite', {start: 12, end: 15}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'backward',
        frames: this.anims.generateFrameNumbers('sprite', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sprite', {start: 8, end: 11}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'stop',
        frames: [{key: 'sprite', frame: 12}],
        frameRate: 10
    });

    // Check to see if player collides with enemy or sideline
    this.physics.add.overlap(player, sideline, outOfBounds, null, this);

    //this.physics.add.collider(player, enemy, hitEnemy, null, this);
    this.physics.add.collider(player, enemies1, hitEnemy, null, this);
    this.physics.add.collider(player, enemies2, hitEnemy, null, this);
    this.physics.add.collider(player, enemies3, hitEnemy, null, this);
    this.physics.add.collider(player, enemies4, hitEnemy, null, this);
}

function update() {
    if (gameOver) {
        this.physics.pause();
        player.setTint(0xff0000);

        saveHighScore(score);
        if(globalUser) {
            if (score > 0 && counter === 0) {
                postHighScore(score);
                counter++;
            } else {
                setTimeout(function () {
                    window.location = '/'
                }, 3000);
            }
        } else {
            alert("You are not signed in :(");
            window.location = "/"
        }

        // Game Over Screen
        var camx = player.x; // Location of player
        var camy = player.y;
        var text = this.add.text(camx - 105, camy + 20, 'Game Over!', {
            fontSize: '40px',
            fill: '#000',
            align: 'center'
        });
        //loseText = this.add.text(300, 200, 'Game Over!', { fontSize: '40px', fill: '#000' });
        //endScore = this.add.text(240, 250, 'Your Score was ' + score, { fontSize: '32px', fill: '#000' });
        //highScore = this.add.text(270, 300, 'High Score: ' + localStorage.getItem("highScore"),  { fontSize: '32px', fill: '#000' });
        newGame = this.add.text(camx - 60, camy + 60, 'Restart', {fontSize: '32px', fill: '#000'})
            .setInteractive()
            .on('pointerdown', function () {
                window.location.reload();
            });
    }

    if (touchdown) {
        score += 100;
        scoreText.setText("Score: " + score);

        player.setPosition(0, 175);
        enemies1.setXY(-475, -200, 95);
        enemies2.setXY(-475, -500, 95);
        enemies3.setXY(-475, -800, 95);
        enemies4.setXY(-475, -1000, 95);

        touchdown = false;

        var camx = player.x; // Location of player
        var camy = player.y;
        var text = this.add.text(camx - 85, camy + 20, 'Touchdown!', {fontSize: '30px', fill: '#000', align: 'center'});
        // newGame = this.add.text(camx - 80, camy + 55, 'Score:' + score, { fontSize: '32px', fill: '#000' })
        //     .setInteractive()
        //     .on('pointerdown', function(){
        //         this.game.restart();
        //     });

        // this.time.events.add(3000, this.text.destroy, this.text);
    }

    var cam = this.cameras.main;

    // Input Controls and Speed of Player
    if (cursors.left.isDown) {
        player.setVelocityX(-100);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(100);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-100);

        player.anims.play('forward', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(100);

        player.anims.play('backward', true);
    } else {
        player.setVelocityY(0);

        player.anims.play('stop');
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
    } else if (xCord < -478) {
        outOfBounds();
    }
}

function scoreTD() {
    // Pause Game Physics
    // Touchdown Text Appears
    // Add Score
    // Next Round Button
    touchdown = true;
}

function hitEnemy(player, enemy) {
    gameOver = true;
}

function outOfBounds() {
    gameOver = true;
}

function saveHighScore(score) {
    let hs = localStorage.getItem("highScore");
    if (score > hs) {
        localStorage.setItem('highScore', score);
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
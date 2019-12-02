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
    this.load.image('background', field);
    this.load.spritesheet('sprite', sprite, {frameWidth: 41.3, frameHeight: 36});
    this.load.image('enemy', enemy);
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

    //  Produce Enemies
    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 10,
        setXY: {x: -475, y: -500, stepX: 95},
        collideWorldBounds: true
    });

    //  Give each enemy a slightly different speed
    enemies.children.iterate(function (child) {
        child.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
        child.setVelocityY(Phaser.Math.FloatBetween(25, 100));
    });

    // Enemies Follow Player
    //this.enemies.startFollow(player, true);

    // Enemies Collide
    this.physics.add.collider(enemies, enemies);
    this.physics.add.collider(enemies, sideline);

    // Player Collision is ON
    player.setCollideWorldBounds(true);

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
        frames: this.anims.generateFrameNumbers('sprite', {start: 9, end: 11}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'forward',
        frames: this.anims.generateFrameNumbers('sprite', {start: 6, end: 8}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'backward',
        frames: this.anims.generateFrameNumbers('sprite', {start: 0, end: 2}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sprite', {start: 3, end: 5}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'stop',
        frames: [{key: 'sprite', frame: 1}],
        frameRate: 20
    });

    // Check to see if player collides with enemy or sideline
    this.physics.add.overlap(player, sideline, outOfBounds, null, this);

    //this.physics.add.collider(player, enemy, hitEnemy, null, this);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);

    text = this.add.text(0, 0).setScrollFactor(0).setFontSize(32).setColor('#ffffff');

}

function update() {
    if (gameOver) {
        this.physics.pause();
        player.setTint(0xff0000);

        saveHighScore(score);
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
                location.reload();
            });
    }

    if (touchdown) {
        this.physics.pause();

        var camx = player.x; // Location of player
        var camy = player.y;
        var text = this.add.text(camx - 105, camy + 20, 'Touchdown!', {
            fontSize: '40px',
            fill: '#000',
            align: 'center'
        });
        newGame = this.add.text(camx - 80, camy + 55, 'Next Level', {fontSize: '32px', fill: '#000'})
            .setInteractive()
            .on('pointerdown', function () {
                location.reload();
            });
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
    /*
        text.setText([
            'MidX: ' + player.x,
            'MidY: ' + player.y
        ]);
    */
    // Find Players Coordinates
    var xCord = player.x;
    var yCord = player.y;

    // If player enters EndZone, call scoreTD() function
    if (yCord < -880) {
        scoreTD();
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
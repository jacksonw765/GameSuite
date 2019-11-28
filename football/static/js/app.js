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
        update: update,
        render: render
    }
};

var player;
var cursors;
var graphics;
var moveCam = false;

var game = new Phaser.Game(config);

function preload () {
    this.load.image('background', field);
    this.load.spritesheet('sprite', sprite, { frameWidth: 41.3, frameHeight: 36 });
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
    this.physics.world.setBounds(-500, -1050, 500 * 2, 1050 * 2);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Player Spawn Location
    player = this.physics.add.sprite(
        0, // x coordinate
        175, // y coordinate
        'Sprite'
    );

    // Player Collision is ON
    player.setCollideWorldBounds(true);

    // Set Camera to follow Player
    this.cameras.main.startFollow(player, true);

    if (this.cameras.main.deadzone)
    {
        graphics = this.add.graphics().setScrollFactor(0);
        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
    }

    //  Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('sprite', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'forward',
        frames: this.anims.generateFrameNumbers('sprite', { start: 6, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'backward',
        frames: this.anims.generateFrameNumbers('sprite', { start: 0, end: 2 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sprite', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'stop',
        frames: [ { key: 'sprite', frame: 1 } ],
        frameRate: 20
    });

};

function update ()
{
    var cam = this.cameras.main;

    // Input Controls and Speed of Player
    if (cursors.left.isDown)
    {
        player.x -= 1.75;

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.x += 1.75;

        player.anims.play('right', true);
    }
    else if (cursors.up.isDown)
    {
        player.y -= 1.75;

        player.anims.play('forward', true);
    }
    else if (cursors.down.isDown)
    {
        player.y += 1.75;

        player.anims.play('backward', true);
    }
    else
    {
        player.anims.play('stop');
    }
};

function render() {
    game.debug.spriteInfo(player, 20, 32);

}
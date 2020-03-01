// the game itself
var game;
var spins = 0;
var array = [];
var count = 0;
 
var gameOptions = {
 
    // slices (prizes) placed in the wheel
    slices: 8,
 
    // prize names, starting from 12 o'clock going clockwise
    // slicePrizes: ["THE BEARCAT!", "50 POINTS", "500 POINTS", "BAD LUCK!", "200 POINTS", "100 POINTS", "150 POINTS", "BAD LUCK!"],
    results: [
        {
            name: 'THE BEARCAT!',
            chanceOfWinning: 0.05,
            degrees: Phaser.Math.Between(316, 360)
        },
        {
            name: '50 POINTS',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(271, 315)
        },
        {
            name: '500 POINTS',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(226, 270)
        },
        {
            name: 'BAD LUCK!',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(181, 225)
        },
        {
            name: '200 POINTS',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(136, 180)
        },
        {
            name: '100 POINTS',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(91, 135)
        },
        {
            name: '150 POINTS',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(46, 90)
        },
        {
            name: 'BAD LUCK!',
            chanceOfWinning: 0.19,
            degrees: Phaser.Math.Between(0, 45)
        }
    ],
    // wheel rotation duration, in milliseconds
    rotationTime: 8000
}
 
// once the window loads...
window.onload = function() {
 
    // game configuration object
    var gameConfig = {
        type: Phaser.CANVAS,
        width: 550,
        height: 550,
        backgroundColor: 0xffffff,
        scene: [playGame],
    };

    function preload() {
        // loading assets
        this.load.image('wheel', wheel);
        this.load.image('pin', pin);
    }
 
    // game constructor
    game = new Phaser.Game(gameConfig);
 
    // pure javascript to give focus to the page/frame and scale the game
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
};
 
// PlayGame scene
class playGame extends Phaser.Scene {
 
    // constructor
    constructor() {
        super("PlayGame");
    }
 
    // method to be executed when the scene preloads

 
    // method to be executed once the scene has been created
    create() {
        // adding the wheel in the middle of the canvas
        this.wheel = this.add.sprite(game.config.width / 2, game.config.height / 2, "wheel");
 
        // adding the pin in the middle of the canvas
        this.pin = this.add.sprite(game.config.width / 2, game.config.height / 2, "pin");
 
        // adding the text field
        this.prizeText = this.add.text(game.config.width / 2, game.config.height - 20, "Spin the wheel", {
            font: "bold 32px Arial",
            align: "center",
            color: "black"
        });
 
        // center the text
        this.prizeText.setOrigin(0.5);
 
        // the game has just started = we can spin the wheel
        this.canSpin = true;
 
        // waiting for your input, then calling "spinWheel" function
        this.input.on("pointerdown", this.spinWheel, this);
    }
 
    // function to spin the wheel
    spinWheel(){

        // can we spin the wheel?
        if(this.canSpin){

            spins++;

            this.prizeText.setText("");

            var rounds = Phaser.Math.Between(6, 8);
            // var degrees = Phaser.Math.Between(0, 360);
            var degrees;
            var prize;
            var winnerName;
            var results = gameOptions.results;





    var totalChance = 0;

    for (var i = 0; i < results.length; i++) {
        totalChance += results[i].chanceOfWinning;
    }

    // Get a random prize.

    var r = Math.random() * totalChance;
    var curr = 0;
    var prize = results[0];

    for (var i = 0; i < results.length; i++) {

        curr += results[i].chanceOfWinning;

        if (r < curr) {
            // prize = results[i];
            prize = gameOptions.slices - 1 - Math.floor(gameOptions.results[i].degrees / (360 / gameOptions.slices));
            degrees = gameOptions.results[i].degrees;
            winnerName = gameOptions.results[i].name;
            console.log(prize);
            break;
        }
    }





            // var probability = Phaser.Math.Between(1, 100);

            // if (probability > 88 && probability <= 100) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(0, 45);
            //     console.log("bad luck 2");
            //     // BAD LUCK!
            // } else if (probability >= 75 && probability <= 87) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(46, 90);
            //     console.log("150pts");
            //     // 150 POINTS
            // } else if (probability >= 61 && probability <=74) { // Yes there are 2 Bad Lucks
            //     // Degrees for
            //     degrees = Phaser.Math.Between(91, 135);
            //     console.log("100pts");
            //     // 100 POINTS
            // } else if (probability >= 47 && probability <= 60) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(136, 180);
            //     console.log("200pts");
            //     // 200 POINTS
            // } else if (probability >= 33 && probability <= 46) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(181, 225);
            //     console.log("bad luck 1");
            //     // BAD LUCK!
            // } else if (probability >= 19 && probability <= 32) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(226, 270);
            //     console.log("500pts");
            //     // 500 POINTS
            // } else if (probability >= 6 && probability <= 18) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(271, 315);
            //     console.log("50pts");
            //     // 50 POINTS
            // } else if (probability >= 0 && probability <= 5) {
            //     // Degrees for
            //     degrees = Phaser.Math.Between(316, 360);
            //     console.log("bearcat");
            //     // THE BEARCAT!
            // } else {
            //     window.alert("ERROR");
            // }

                // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            // var prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));
            // console.log(prize);

            this.canSpin = false;

            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.tweens.add({

                // adding the wheel to tween targets
                targets: [this.wheel],

                // angle destination
                // angle: 360 * rounds + degrees,
                angle: 360 * rounds + degrees,

                // tween duration
                duration: gameOptions.rotationTime,

                // tween easing
                ease: "Cubic.easeOut",

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function(tween){

                    // displaying prize text
                    // this.prizeText.setText("YOU GOT " + gameOptions.slicePrizes[prize]);
                    this.prizeText.setText("YOU GOT " + winnerName);

                    // array.push(gameOptions.slicePrizes[prize]);
                    array.push(winnerName);
                    console.log(array);

                        // Check to see if landed on Bearcat. If so = Winner
                    var bearcatCount = countInArray(array, "THE BEARCAT!");
                    if (bearcatCount > 0) {
                        this.canSpin = false;
                        winner();
                    }

                        // If spun 3 times, check to see if winner, if not gameover
                    if (spins == 3) {
                        this.canSpin = false;
                        if (bearcatCount > 0) {
                            winner();
                        } else {
                            gameover();
                        }
                    } else {
                        this.canSpin = true;
                    }
                }
            });
        }
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

function gameover() {
    var modal = document.getElementById("myModal");
    var textArea = document.getElementById("textArea");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    textArea.innerHTML = "Game Over! Try Again Tomorrow!<br><br><a href=''>Return to Home</a>"
}

// Checks if player landed on the Bearcat Head 3 times
function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

function winner() {
    var modal = document.getElementById("myModal");
    var textArea = document.getElementById("textArea");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    textArea.innerHTML = "Congratulations! You're A Winner!<br><a href=''>Click Here to Claim Reward!</a>"
}
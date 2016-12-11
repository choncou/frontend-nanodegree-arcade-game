var startingYPositions = [56, 146, 202]; // Different positions where the enemy can start on the y-axis

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = startingYPositions[Math.floor(Math.random() * startingYPositions.length)];
    this.speed = (Math.random() * 200) + 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // move enemy back to the left if they go out of screen
    if (this.x >= 505) {
        pos = allEnemies.indexOf(this);
        delete allEnemies[pos];
        allEnemies.splice(pos, 1);
        allEnemies.push(new Enemy());
    }

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 202.5;
    this.y = 383;

    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(dt) {
    // Not required
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// set the player back to the original starting position
Player.prototype.restart = function () {
    this.x = 202.5;
    this.y = 383;
};

Player.prototype.handleInput = function (key) {
    switch(key) {
        case 'left':
            if (6.5 < player.x) {
                player.x -= 98;
            }
            break;
        case 'up':
            player.y -= 80;
            break;
        case 'right':
            if (398.5 > player.x) {
                player.x += 98;
            }
            break;
        case 'down':
            if (383 > player.y) {
                player.y += 80;
            }
            break;
    }
    console.log('Player Move: ' + key);

    if (player.y - 60 <= 0) {
        console.log("You reached the water!");
        player.restart()
    }
};

var checkCollision = function (bug) {
    if (player.y + 131 >= bug.y + 90
        && player.x + 25 <= bug.x + 88
        && player.y + 73 <= bug.y + 135
        && player.x + 76 >= bug.x + 11) {
        console.log('OUCH! The bugs got you');
        player.restart()
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy())
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

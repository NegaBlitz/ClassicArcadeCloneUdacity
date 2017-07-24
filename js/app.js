// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (startX, startY) {
		this.sprite = 'images/char-boy.png';
		this.x = startX;
		this.y = startY;
		this.offsetY = 10; //Offset for Y axis
};

//Runs every tick
Player.prototype.update = function() {
	//Check win condition
	if(this.y <= 0) {
		console.log("Got 'em");
		this.reset();
	}
};

//Renders
Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Checks collision with bugs
Player.prototype.checkCollision = function() {
	
};

//Movement for the player, the tiles are currently 101x80, so this will be the coords we use.
var tileWidth = 101;
var tileHeight = 82;

//Board dimensions (starts from 0 on both, array style, so a 5x6 board is 4x5)
var boardDimX = 4;
var boardDimY = 5;

Player.prototype.handleInput = function(key) {
	if(key === 'left' && this.x >= tileWidth) {
		this.x -= tileWidth;
	}
	else if(key === 'right' && this.x < tileWidth * boardDimX) {
		this.x += tileWidth;
	}
	else if(key === 'up' && this.y >= tileHeight - this.offsetY) {
		this.y -= tileHeight;
	}
	else if(key === 'down' && this.y < (tileHeight * boardDimY) - this.offsetY) {
		this.y += tileHeight;
	}
};

Player.prototype.reset = function() {
	this.x = (tileWidth*2); 
	this.y = (tileHeight*boardDimY) - this.offsetY; //10 is an offset to center the player a little better.
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
player.reset();


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

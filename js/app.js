// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
		this.x = startX; //Starting position X
		this.offsetY = 15; //Offset to be centered because I'm OCD.
		this.y = startY - this.offsetY; //Starting position Y
		this.speed = speed; //Speed the bug moves.
};

//The hitbox for the enemies to use. The larger this number, the harder they are to avoid, as they are bigger.
var hitbox = 40;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
		this.x = this.x + (this.speed * dt);
		
		//Reposition the bug once it goes off screen.
		if(this.x >= ((boardDimX + 2) * tileWidth)) {
			this.reset();
		}
		
		//If this enemy gets to the player, then the player gets reset
		if(Math.abs(this.x - player.x) < hitbox) {
			if(Math.abs(this.y - player.y) < hitbox) {
				player.reset();
				console.log("Hit");
			}
		}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//When an enemy goes offscreen. this happens.
Enemy.prototype.reset = function() {
		//Randomizes which row they appear on.
		var randomizer = getRandomInt(1, 4);
		
		//Set X to far left.
		this.x = -tileWidth;
		
		//Moves the enemy to the specified random row.
		this.y = (tileHeight*randomizer) - this.offsetY;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
		this.sprite = 'images/char-boy.png';
		this.x = 0;
		this.y = 0;
		this.offsetY = 10; //Offset for Y axis
		this.hitbox = 60; //Hitbox for enemy collision, once an enemy is within this many px of you, you are colliding with them.
};

// Runs every tick
Player.prototype.update = function() {
	// Check win condition
	if(this.y <= 0) {
		console.log("Got 'em");
		this.reset();
	}
};

// Renders
Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks collision with bugs
Player.prototype.bugCollide = function() {
	this.reset();
};

// Movement for the player, the tiles are currently 101x80, so this will be the coords we use.
var tileWidth = 101;
var tileHeight = 82;

// Board dimensions (starts from 0 on both, array style, so a 5x6 board is 4x5)
var boardDimX = 4;
var boardDimY = 5;

// Player Input is handled here, the function checks ensure the player remains within the specified bounds.
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

// Resets player to bottom of the screen.
Player.prototype.reset = function() {
	this.x = (tileWidth*2); // 2 is the Center column.
	this.y = (tileHeight*boardDimY) - this.offsetY; // Bottom row. 10 is an offset to center the player a little better.
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Total number of enemies made.
var enemyCount = 3;

//Speed incrementor for each enemy (They each get faster as this number increases)
var enemySpeedIncr = 150;

//Loop to create 3 enemies, or more, specified above
for(i = 1; i <= enemyCount; i++) {
	//Randomizes which row they appear on.
	var randomizer = getRandomInt(1, 4);
	
	//Creates an enemy at a specified row, and each enemy iteration is faster than the last.
	var enemy = new Enemy((tileWidth*2), (tileHeight*randomizer), i * enemySpeedIncr);
	
	//Pushes into allEnemies array.
	allEnemies.push(enemy);
}

var player = new Player();
player.reset(); // Calls position reset


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

//Random integer function via Mozilla Developer Network
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

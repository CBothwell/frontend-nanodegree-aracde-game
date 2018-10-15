// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initialPosition = -135;

    // The enemines initial speed
    this.speed = (Math.random() * Math.floor(100)) + 1 * 300;
    this.y = row * 83;
    this.x = this.initialPosition;

    this.width  = 80;
    this.height = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > (83 * 7) ) {
      this.x = this.initialPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(enemies) {
  this.horizontal = 101;
  this.virtical   = 83;

  this.width  = 80;
  this.height = 80;

  this.enemies = enemies;

  this.score = 0;

  this.reset();

  this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {

  this.x = this.horizontal * 2;
  this.y = this.virtical * 5;

};

Player.prototype.update = function(dt) {
  let self = this;

  // Collision detection
  this.enemies.forEach(function (enemy) {
    console.log(self.x < enemy.x + enemy.width, self.x , enemy.x + enemy.width);
    console.log(self.x + self.width > enemy.x, self.x + self.width , enemy.x);
    console.log(self.y < enemy.y + enemy.height, self.y , enemy.y + enemy.height);
    console.log(self.y + self.height > enemy.y, self.y + self.height , enemy.y);

    if (self.x < enemy.x + enemy.width &&
        self.x + self.width > enemy.x &&
        self.y < enemy.y + enemy.height &&
        self.y + self.height > enemy.y) {
      console.log('collision detected');
      self.reset();
    }
  });
};

Player.prototype.handleInput = function(keyCode) {
  this.nextMove = keyCode;

  if (this.nextMove === 'left'
    && this.x - this.horizontal >= 0) {

    this.x -= this.horizontal;

  } else if (this.nextMove === 'right'
    && this.x + this.horizontal < 5 * this.horizontal ) {

    this.x += this.horizontal;

  } else if (this.nextMove === 'up' && this.y - this.virtical >= 0) {

    this.y -= this.virtical;

    if (this.y - this.virtical < 0) {
      this.score += 1;
      this.reset();
    }

  } else if (this.nextMove === 'down' && this.y + this.virtical < this.virtical * 6 ) {
    this.y += this.virtical;
  }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '32px serif';
    ctx.fillText('Score: ' + this.score, 390, 30);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [
  new Enemy(3),
  new Enemy(2),
  new Enemy(1),
  new Enemy(3),
  new Enemy(2),
  new Enemy(1)
];

let player = new Player(allEnemies);

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

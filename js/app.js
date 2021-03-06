
let win = false;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = [68, 151, 234][Math.floor(Math.random()*3)];
    this.speed = Math.random() * 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;

    if (Math.floor(this.x + 47) == player.x && this.y == player.y) {
        console.log("collision");
        player.reset();
        return;
    }
    if (this.x >= 600) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }
    update (){
        if (this.y < -15) {
            win = true;
            alert("Congrats, you've won the game!");
            this.reset();
        }

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        if (key === 'left' && this.x >= 100) {
            this.x -= 100;
        }
        if (key === 'right' && this.x <= 300) {
            this.x += 100;
        }
        if (key === 'up'  && this.y >= -15) {
            this.y -= 83;
        }
        if (key === 'down' && this.y <= 317) {
            this.y += 83;
        }
        // console.log(this.x, this.y);

        // reset
        this.update();
    }
    
    reset() {
        this.x = 200;
        this.y = 400;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemy1 = new Enemy();
allEnemies.push(enemy1);
let player = new Player();

for (let i = 3; i > 0 && (!win); i--){
    // setTimeout(function () {
    //     enemy1 = new Enemy();
    //     allEnemies.push(enemy1);
    // }, 3000);
    enemy1 = new Enemy();
    allEnemies.push(enemy1);
}



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

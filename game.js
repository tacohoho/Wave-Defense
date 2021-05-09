var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

var game = new Phaser.Game(config);

// dictionary of keyboard inputs
var keyboard = {};
var player;
var playerBullets;
var reticle;
var time = 0;

// copy and pasted bullet class
// https://phaser.io/examples/v3/view/games/top-down-shooter/topdowncombatmechanics#
var Bullet = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize:

    // Bullet Constructor
    function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
      this.speed = 1;
      this.born = 0;
      this.direction = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.setSize(12, 12, true);
    },

  // Fires a bullet from the player to the reticle
  fire: function(shooter, target) {
    this.setPosition(shooter.x, shooter.y); // Initial position
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

    // Calculate X and y velocity of bullet to moves it from shooter to target
    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }

    this.rotation = shooter.rotation; // angle bullet with shooters rotation
    this.born = 0; // Time since new bullet spawned
  },

  // Updates the position of the bullet each cycle
  update: function(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;
    if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

});

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.spritesheet('character', 'assets/matt_char.png', {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.image('bullet', 'assets/giant-worm.png');
  this.load.image('target', 'assets/attack-icon.png');
}

function create() {
  this.add.image(400, 300, 'sky');
  player = this.physics.add.sprite(100, 450, 'character');
  player.setCollideWorldBounds(true);

  playerBullets = this.physics.add.group({
    classType: Bullet,
    runChildUpdate: true
  });
  reticle = this.physics.add.sprite(100, 460, 'target');
  reticle.setDisplaySize(10, 10).setCollideWorldBounds(true);

  // add keys to keyboard
  keyboard['W'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyboard['A'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyboard['S'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyboard['D'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  // code for camera below
  this.cameras.main.setZoom(3);
  this.cameras.main.startFollow(player);
  this.cameras.main.setBounds(0, 0, 800, 600);

  // Fires bullet from player on left click of mouse
  this.input.on('pointerdown', function(pointer, time, lastFired) {
    if (player.active === false)
      return;

    // Get bullet from bullets group
    var bullet = playerBullets.get().setActive(true).setVisible(true);

    if (bullet) {
      bullet.fire(player, reticle);
      // this.physics.add.collider(enemy, bullet, enemyHitCallback);
    }
  }, this);

  // Pointer lock will only work after mousedown
  // exit pointer lock by pressing escape (this is by default)
  game.canvas.addEventListener('mousedown', function() {
    game.input.mouse.requestPointerLock();
  });

  // Move reticle upon locked pointer move
  this.input.on('pointermove', function(pointer) {
    if (this.input.mouse.locked) {
      reticle.x += pointer.movementX;
      reticle.y += pointer.movementY;
    }
  }, this);
}

// Ensures reticle does not move offscreen
function constrainReticle(reticle) {
  var distX = reticle.x - player.x; // X distance between player & reticle
  var distY = reticle.y - player.y; // Y distance between player & reticle

  // Ensures reticle cannot be moved offscreen (player follow)
  if (distX > 125)
    reticle.x = player.x + 125;
  else if (distX < -125)
    reticle.x = player.x - 125;

  if (distY > 95)
    reticle.y = player.y + 95;
  else if (distY < -95)
    reticle.y = player.y - 95;
}

function update() {
  player.setVelocity(0);
  // Horizontal movement
  if (keyboard['A'].isDown) {
    player.setVelocityX(-160);
  } else if (keyboard['D'].isDown) {
    player.setVelocityX(160);
  }

  // Vertical movement
  if (keyboard['W'].isDown) {
    player.setVelocityY(-160);
  } else if (keyboard['S'].isDown) {
    player.setVelocityY(160);
  }

  // Make reticle move with player
  reticle.body.velocity.x = player.body.velocity.x;
  reticle.body.velocity.y = player.body.velocity.y;

  // Constrain position of constrainReticle
  constrainReticle(reticle);
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
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

var Bullet = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

})

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.spritesheet('character', 'assets/matt_char.png', { frameWidth: 32, frameHeight: 32 });
}

function create () {
  this.add.image(400,300, 'sky');
  player = this.physics.add.sprite(100, 450, 'character');

  player.setCollideWorldBounds(true);

  // add keys to keyboard
  keyboard['W'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyboard['A'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyboard['S'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyboard['D'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  // code for camera below
  this.cameras.main.setZoom(3);
  this.cameras.main.startFollow(player);
  this.cameras.main.setBounds(0, 0, 800, 600);
}

function update () {
  player.setVelocity(0);
  // Horizontal movement
  if (keyboard['A'].isDown) {
    player.setVelocityX(-160);
  }
  else if (keyboard['D'].isDown) {
    player.setVelocityX(160);
  }

  // Vertical movement
  if (keyboard['W'].isDown) {
    player.setVelocityY(-160);
  }
  else if (keyboard['S'].isDown) {
    player.setVelocityY(160);
  }
}

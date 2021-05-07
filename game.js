var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
        extend: {
          player: null,
          moveKeys: null,
          time: 0,
        }
    }
};

var game = new Phaser.Game(config);

// dictionary of keyboard inputs
var keyboard = {};

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.spritesheet('character', 'assets/matt_char.png', { frameWidth: 32, frameHeight: 32 });
}

function create () {
  this.add.image(400,300, 'sky');
  player = this.physics.add.sprite(100, 450, 'character');

  player.setCollideWorldBounds(true);

  keyboard["W"] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyboard["A"] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyboard["S"] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyboard["D"] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  // Horizontal movement
  if (keyboard["A"].isDown) {
    this.player.body.setVelocityX(-80);
  } else if (keyboard["D"].isDown) {
    this.player.body.setVelocityX(80);
  }

  // Vertical movement
  if (keyboard["W"].isDown) {
    this.player.body.setVelocityY(-80);
  } else if (keyboard["S"].isDown) {
    this.player.body.setVelocityY(80);
  }
}

function update () {
}

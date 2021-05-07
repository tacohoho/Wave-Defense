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

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.spritesheet('character', 'assets/matt_char.png', { frameWidth: 32, frameHeight: 32 });
}

function create () {
  this.add.image(400,300, 'sky');
  player = this.physics.add.sprite(100, 450, 'character');

  player.setCollideWorldBounds(true);

  // Enables movement of player with WASD keys
  this.input.keyboard.on('keydown_W', function (event) {
      player.setAccelerationY(-800);
  });
  this.input.keyboard.on('keydown_S', function (event) {
      player.setAccelerationY(800);
  });
  this.input.keyboard.on('keydown_A', function (event) {
      player.setAccelerationX(-800);
  });
  this.input.keyboard.on('keydown_D', function (event) {
      player.setAccelerationX(800);
  });
}

function update () {
}

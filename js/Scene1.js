// this scene is for loading all the images, sounds, animations and starting the second scene
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet('character', 'assets/spritesheets/main_char.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('walker', 'assets/spritesheets/walker.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('shooter', 'assets/spritesheets/shooter.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('tank', 'assets/spritesheets/tank.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('flamethrower', 'assets/spritesheets/flamethrower.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image('bullet', 'assets/images/big_bullet.png');
    this.load.image('target', 'assets/spritesheets/attack-icon.png');
    this.load.image('background', 'assets/images/map1_v01.png');
    this.load.image('full_heart', 'assets/images/full_heart_v01.png');
    this.load.image('half_heart', 'assets/images/half_heart_v01.png');
    this.load.image('empty_heart', 'assets/images/empty_heart_v01.png');

    // propssa
    this.load.image('cactus', 'assets/images/cactus_prop2.png');
    this.load.image('rocks', 'assets/images/rocks_prop.png');
    this.load.image('rock_bush', 'assets/images/rock_bush_prop.png');
    this.load.image('stop_sign', 'assets/images/stop_sign_prop.png');

    this.load.bitmapFont('pixelFont', 'assets/fonts/font.png', 'assets/fonts/font.xml');

    this.load.audio('audio_shoot', ['assets/sounds/beam.ogg', 'assets/sounds/beam.mp3']);
    this.load.audio('music', ['assets/sounds/sci-fi_platformer12.ogg', 'assets/sounds/sci-fi_platformer12.mp3']);
  }

  create() {
    this.scene.start('playGame');
  }
}

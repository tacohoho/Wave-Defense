// this scene is for loading all the images, sounds, animations and starting the second scene
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet('character', 'assets/spritesheets/matt_char.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image('bullet', 'assets/spritesheets/giant-worm.png');
    this.load.image('target', 'assets/spritesheets/attack-icon.png');
    this.load.image('walker', 'assets/spritesheets/coppergolem.png');
    this.load.image('shooter', 'assets/spritesheets/dark-ent.png');
    this.load.image('background', 'assets/images/sky.png');

    this.load.bitmapFont('pixelFont', 'assets/fonts/font.png', 'assets/fonts/font.xml');

    this.load.audio('audio_shoot', ['assets/sounds/beam.ogg', 'assets/sounds/beam.mp3']);
    this.load.audio('music', ['assets/sounds/sci-fi_platformer12.ogg', 'assets/sounds/sci-fi_platformer12.mp3']);
  }

  create() {
    this.scene.start('playGame');
  }
}

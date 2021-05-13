var playerStats = {
  health: 3,
  fireRate: 1,
  speed: 160
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};

var game = new Phaser.Game(config);

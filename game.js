var playerStats = {
  health: 6,
  fireRate: 1,
  speed: 160,
  waveNumber: 0
}

var config = {
  type: Phaser.AUTO,
  width: 540,
  height: 405,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
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
// game.world.setBounds(0, 0, 10, 10, true, true, true, true);

class Walker extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'walker');
    this.health = 3;
    this.speed = .25;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.direction = 0;
    this.playerX = scene.player.x;
    this.playerY = scene.player.y;
    // this.attackSpeed = 0;
  }

  update() {
    // fix behavior of walker
    this.direction = Math.atan((this.playerX - this.x) / (this.playerY - this.y));

    if (this.playerY >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }

    // this.setVelocity(this.xSpeed, this.ySpeed);
    if (this.health === 0) {
      this.destroy();
    }
  }
}

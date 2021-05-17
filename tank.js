class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'tank');
    this.health = 6;
    this.speed = 20;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.direction = 0;
    // this.attackSpeed = 0;
  }

  changeDirection(player) {
    this.direction = Math.atan((player.x - this.x) / (player.y - this.y));

    if (player.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
  }

  update() {
    // add code here for behavior
    this.body.setVelocity(this.xSpeed, this.ySpeed);

    if (this.health === 0) {
      this.destroy();
    }
  }
}

class Shooter extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'shooter');
    this.health = 3;
    this.speed = 40;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.direction = 0;
    this.distFromPlayer = 0;
    this.canShoot = true;
    this.fireRate = 2000;
    this.standStill = false;
    // this.attackSpeed = 0;
  }

  changeDirection(player) {
    var xDist = player.x - this.x;
    var yDist = player.y - this.y;

    this.direction = Math.atan((xDist) / (yDist));

    if (player.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }

    this.distFromPlayer = Math.pow(Math.pow(xDist, 2) + Math.pow(yDist, 2), 0.5);
  }

  update() {
    // add code here for behavior
    if (this.distFromPlayer < 120) {
      this.body.setVelocity(0);
      this.standStill = true;
    }
    else {
      this.body.setVelocity(this.xSpeed, this.ySpeed);
      this.standStill = false;
    }

    if (this.health === 0) {
      this.destroy();
    }
  }
}

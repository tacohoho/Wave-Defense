// this scene is for the actual game
class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    // background
    this.add.image(270, 202.5, 'background');

    this.keyboard = {};
    // add keys to keyboard
    this.keyboard['W'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyboard['A'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyboard['S'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyboard['D'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.player = this.physics.add.sprite(100, 300, 'character');
    this.player.setCollideWorldBounds(true);

    // scoreboard
    this.score = 0;
    this.scoreBoard = this.add.bitmapText(this.player.x - 100, this.player.y - 100, 'pixelFont', 'SCORE 0', 16);

    // sounds
    // maybe make a config for shootSound as well. It is a bit loud
    this.shootSound = this.sound.add('audio_shoot');
    this.music = this.sound.add('music');

    var musicConfig = {
      mute: false,
      volume: 0.5,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.music.play(musicConfig);

    this.playerBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    });

    this.enemyBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

    this.enemies = this.physics.add.group({
      classType: Phaser.GameObjects.Sprite,
      runChildUpdate: true
    });

    this.reticle = this.physics.add.sprite(100, 300, 'target');
    this.reticle.setDisplaySize(10, 10)/*.setCollideWorldBounds(true)*/;

    // code for camera below
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setBounds(0, 0, 800, 600);

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function(pointer, time, lastFired) {
      if (this.player.active === false)
        return;

      // Get bullet from bullets group
      var bullet = this.playerBullets.get();

      if (bullet) {
        bullet.fire(this.player, this.reticle);
        this.shootSound.play();
      }
    }, this);

    // Pointer lock will only work after mousedown
    // exit pointer lock by pressing escape (this is by default)
    game.canvas.addEventListener('mousedown', function() {
      game.input.mouse.requestPointerLock();
    });

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function(pointer) {
      if (this.input.mouse.locked) {
        this.reticle.x += pointer.movementX;
        this.reticle.y += pointer.movementY;
      }
    }, this);

    // collision between enemy and bullets
    this.physics.add.overlap(this.enemies, this.playerBullets, this.hitEnemy, null, this);

    //collision between enemy bullets and player
    this.physics.add.overlap(this.player, this.enemyBullets, this.hitPlayer, null, this);

    // collision between enemies so they don't overlap
    this.physics.add.collider(this.enemies, this.enemies);

    // collision between player and enemy
    this.physics.add.collider(this.enemies, this.player, this.touchPlayer, null, this);

    // variables used for waves
    this.waveDone = true;
    this.maxEnemies = 3;
  }

  update() {
    this.player.setVelocity(0);
    // Horizontal movement
    if (this.keyboard['A'].isDown) {
      this.player.setVelocityX(-playerStats.speed);
    } else if (this.keyboard['D'].isDown) {
      this.player.setVelocityX(playerStats.speed);
    }

    // Vertical movement
    if (this.keyboard['W'].isDown) {
      this.player.setVelocityY(-playerStats.speed);
    } else if (this.keyboard['S'].isDown) {
      this.player.setVelocityY(playerStats.speed);
    }

    // Make reticle move with player
    this.reticle.body.velocity.x = this.player.body.velocity.x;
    this.reticle.body.velocity.y = this.player.body.velocity.y;

    // make scoreboard move with player
    this.scoreBoard.setPosition(this.player.x - 100, this.player.y - 100);

    // Constrain position of constrainReticle
    this.constrainReticle(this.reticle);

    // update enemy
    this.enemies.getChildren().forEach((enemy) => {
      enemy.changeDirection(this.player);

      var bullet = this.enemyBullets.get();
      if (bullet && enemy.canShoot && enemy.standStill) {

        bullet.fire(enemy, this.player);
        this.shootSound.play();
        enemy.canShoot = false;

        this.time.addEvent({
          delay: enemy.fireRate,
          callback: function() {
            enemy.canShoot = true;
          },
        });

      }
    });

    if (playerStats.health === 0) {
      this.player.destroy();
    }

    if (this.waveDone) {
      this.spawnWaves(0, this.maxEnemies);
      this.waveDone = false;
      this.maxEnemies++;
      //alert('next wave');
    }
  }

  // Ensures reticle does not move offscreen
  constrainReticle(reticle) {
    var distX = reticle.x - this.player.x; // X distance between player & reticle
    var distY = reticle.y - this.player.y; // Y distance between player & reticle

    // Ensures reticle cannot be moved offscreen (player follow)
    // reticle movement limit calculated by game width/height / (zoom * 2)
    if (distX > 135)
      reticle.x = this.player.x + 135;
    else if (distX < -135)
      reticle.x = this.player.x - 135;

    if (distY > 101.25)
      reticle.y = this.player.y + 101.25;
    else if (distY < -101.25)
      reticle.y = this.player.y - 101.25;
  }

  hitEnemy(enemy, bullet) {
    bullet.destroy();

    if (enemy.health === 1) {
      this.score += 1;
      this.scoreBoard.text = 'SCORE ' + this.score;
    }

    enemy.health -= 1;
  }

  hitPlayer(player, bullet) {
    bullet.destroy();
    this.touchPlayer(player, bullet);
  }

  // after being hit, the player will be invulnerable for 1 second and it will be shown by his opacity
  setInvincible(player) {
    player.alpha = 0.5;

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        player.alpha = 1;
      },
    });
  }

  touchPlayer(player, enemy) {
    if (player.alpha < 1) {
      return;
    }
    playerStats.health -= 1;

    this.setInvincible(player);
  }

  spawnWaves(waveCount, maxEnemies) {
    if (waveCount === 5) {
      this.waveDone = true;
      return;
    }

    var maxEnemies = 3;
    for (var i = 0; i < maxEnemies; i++) {
      var walker = new Walker(this);
      this.enemies.add(walker, true);
      walker.setRandomPosition(0, 0, 800, 0);

      var shooter = new Shooter(this);
      this.enemies.add(shooter, true);
      shooter.setRandomPosition(0, 0, 800, 0);

      var tank = new Tank(this);
      this.enemies.add(tank, true);
      tank.setRandomPosition(0, 0, 800, 0);
    }
    // for some reason doesn't work if i use spawnWaves function instead of creating a new one
    this.time.addEvent({
      delay: 10000,
      callback: function() {
        //alert('10 seconds');
        this.spawnWaves(++waveCount, maxEnemies);
      },
      callbackScope: this,
    });
  }
}

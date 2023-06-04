class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.bullets = [];
    this.enemies = [];
    this.player = new Player(this.root, this.bullets);
    addBackground(this.root);
  }

  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.bullets.forEach((bullet) => {
      bullet.update(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.bullets = this.bullets.filter((bullet) => {
      return !bullet.destroyed;
    });

    this.player.updateBullets(this.bullets);

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    this.isEnemyDead();

    if (this.isPlayerDead()) {
      BGMusic.pause();
      DeadMusic.play();
      document.removeEventListener("keydown", keydownHandler);
      document.getElementById("pley").disabled = true;
      document.getElementById("pley").style.pointerEvents = "none";
      document.getElementById("RButton").disabled = false;
      document.getElementById("RButton").style.display = "block";
      document.getElementById("udedimg").style.display = "block";
      document.getElementById("YourFinalScore").style.display = "block";
      stopPoints();
      return;
    }

    setTimeout(this.gameLoop, 20);
  };

  isPlayerDead = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      let EnemyX = this.enemies[i].x;
      let EnemyY = this.enemies[i].y;
      let PlayerX = this.player.x;
      let PlayerY = this.player.y;
      console.log(this.player.y);
      if (
        PlayerX < EnemyX + ENEMY_WIDTH &&
        PlayerX + PLAYER_WIDTH > EnemyX &&
        PlayerY < EnemyY + ENEMY_HEIGHT - 10 &&
        PLAYER_HEIGHT + PlayerY > EnemyY
      ) {
        return true;
      }
    }
    return false;
  };
  isEnemyDead = () => {
    for (let b = 0; b < this.enemies.length; b++) {
      for (let i = 0; i < this.bullets.length; i++) {
        let EnemyX = this.enemies[b].x;
        let EnemyY = this.enemies[b].y;
        let BulletX = this.player.bullets[i].x;
        let BulletY = this.player.bullets[i].y;
        if (
          BulletX < EnemyX + ENEMY_WIDTH &&
          BulletX + PLAYER_WIDTH > EnemyX &&
          BulletY < EnemyY + ENEMY_HEIGHT &&
          PLAYER_HEIGHT + BulletY > EnemyY
        ) {
          this.player.bullets[i].destroyed = true;
          this.enemies[b].destroyed = true;
          this.enemies[b].domElement.style.display = "none";
          this.player.bullets[i].domElement.style.display = "none";
        }
      }
    }
  };
}

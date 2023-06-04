class Player {
  constructor(root, bullets) {
    this.bullets = bullets;
    this.Life = 3;
    this.root = root;
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/GIGACHAD.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.border = "1px white solid";
    this.domElement.style.borderRadius = "5px";
    this.Left = this.domElement.style.left = `${this.x}px`;
    this.Top = this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }
    Music.play();
    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    Music.play();
    this.domElement.style.left = `${this.x}px`;
  }
  shoot() {
    const newgun = new Gun(this.root, this.x);
    this.bullets.push(newgun);
  }

  updateBullets(newBullets) {
    this.bullets = newBullets;
  }
}

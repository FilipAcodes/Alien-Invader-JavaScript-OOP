class Gun {
  constructor(theRoot, xPosition) {
    this.root = theRoot;
    this.x = xPosition;
    this.y = GAME_HEIGHT - 156;
    this.IsDestroyed = this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.src = "./images/Gun.jpg";
    this.domElement.style.position = "absolute";
    this.LeftRight = this.domElement.style.left = `${this.x}px`;
    this.TopBottom = this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    this.domElement.style.width = PLAYER_WIDTH;
    this.domElement.style.height = PLAYER_HEIGHT;
    this.domElement.style.borderRadius = "50%";
    theRoot.appendChild(this.domElement);
    this.speed = 0.75;
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (parseInt(this.TopBottom) > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}

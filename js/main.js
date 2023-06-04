// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
let GetDiv = document.getElementById("scoretxt");
let GetDivTxt = document.getElementById("scoretxt").textContent;
let Get2ndDiv = document.getElementById("YourFinalScore");

const gameEngine = new Engine(document.getElementById("app"));
let Music = new Audio("/images/LeftRight.wav");
let BGMusic = new Audio("/images/NyanCat.mp3");
let DeadMusic = new Audio("/images/DarkSoulsDeath.mp3");

const keydownHandler = (event) => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
  if (event.code === "Space") {
    gameEngine.player.shoot();
  }
};

resetGame = () => {
  location.reload();
};

PlayButtonStuff = () => {
  document.addEventListener("keydown", keydownHandler);
  document.getElementById("CatJamming").style.display = "block";
  startPoints();
  BGMusic.play();
  gameEngine.gameLoop();
};
let milliseconsd = 0;
let starter = null;
startPoints = () => {
  if (starter !== null) {
    clearInterval(starter);
  }
  starter = setInterval(ScoreContent, 10);
};
stopPoints = () => {
  clearInterval(starter);
};
ScoreContent = () => {
  milliseconsd += 1;
  let mills = milliseconsd < 10 ? "0" + milliseconsd : milliseconsd;
  GetDiv.textContent = `Score: ${mills}`;
  Get2ndDiv.textContent = `Your Final Score: ${mills}`;
  if (milliseconsd > 1000 && MAX_ENEMIES < 8) {
    MAX_ENEMIES += 2;
  }
  if (milliseconsd > 1500 && MAX_ENEMIES < 10) {
    MAX_ENEMIES += 2;
  }
  if (milliseconsd > 2000 && MAX_ENEMIES < 15) {
    MAX_ENEMIES += 1;
  }
  if (milliseconsd > 2250 && MAX_ENEMIES < 16) {
    MAX_ENEMIES += 1;
  }
};

//shoot stuff

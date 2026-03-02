let score = 0;
let timeLeft = 30;
let timerId = null;
let playing = false;

const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function spawnTarget() {
  if (!playing) return;

  const old = document.querySelector(".target");
  if (old) old.remove();

  const target = document.createElement("div");
  target.classList.add("target");

  const size = 50;
  const x = randomNumber(gameArea.clientWidth - size);
  const y = randomNumber(gameArea.clientHeight - size);

  target.style.left = x + "px";
  target.style.top = y + "px";

  target.addEventListener("click", () => {
    score++;
    scoreSpan.textContent = score;
    spawnTarget();
  });

  gameArea.appendChild(target);
}

function startGame() {
  if (playing) return;

  score = 0;
  timeLeft = 30;
  playing = true;
  scoreSpan.textContent = score;
  timeSpan.textContent = timeLeft;

  spawnTarget();

  timerId = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;

    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  playing = false;
  clearInterval(timerId);

  const target = document.querySelector(".target");
  if (target) target.remove();

  alert("Time! Final score: " + score);
}

startBtn.addEventListener("click", startGame);

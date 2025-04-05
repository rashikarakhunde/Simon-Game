let userSeq = [];
let gameSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "blue"];

let start = document.querySelector(".start-btn");

start.addEventListener("click", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  audio();

  let randomIdx = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  // console.log(gameSeq);
  gameFlash(randomBtn);
}

function checkAns(idx) {
  // console.log(`curr level: ${level}`);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    highScore = HighScr(level);
    h2.innerHTML = `Game Over! Your score was <b>${level}<b><br><b>High Score: ${highScore}</b><br> Click on Start to play again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "#FDE5EC";
    }, 150);
    audiolose();
    reset();
  }
}
function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  // console.log(userColor);
  userSeq.push(userColor);
  audioclick();

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
}

function HighScr(lvl) {
  if (lvl > highScore) {
    highScore = lvl;
  }
  return highScore;
}
function audio() {
  let msc = new Audio("level.mp3");
  msc.play();
}

function audiolose() {
  let msc = new Audio("buzzer.mp3");
  msc.play();
}

function audioclick() {
  let msc = new Audio("click-button.mp3");
  msc.play();
}
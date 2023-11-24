const geometricFigures = [
  "losango",
  "losango",
  "triangulo",
  "triangulo",
  "quadrado",
  "quadrado",
  "circulo",
  "circulo",
  "piramide",
  "piramide",
  "hexagono",
  "hexagono",
  "octogono",
  "octogono",
  "rubik",
  "rubik",
];
let openCards = [];

let shuffleGeometricFigures = geometricFigures.sort(() =>
  Math.random() > 0.5 ? 2 : -1
);

for (let i = 0; i < geometricFigures.length; i++) {
  let box = document.createElement("div");
  box.className = "card";
  box.innerHTML = `<img src="./src/images/${shuffleGeometricFigures[i]}.png" alt="" />`;
  box.onclick = handleClick;

  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    this.onclick = null;
    openCards.push(this);
  }

  if (openCards.length === 2) setTimeout(checkMatch, 500);
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    playSound("hit.m4a");
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
    openCards[0].onclick = null;
    openCards[1].onclick = null;
  } else {
    playSound("wrong-buzzer.mp3");
    openCards.forEach((card) => {
      card.classList.remove("boxOpen");
      card.onclick = handleClick;
    });
  }

  openCards = [];

  if (
    document.querySelectorAll(".boxMatch").length === geometricFigures.length
  ) {
    playSound("game-win.mp3");
    document.querySelector("#victoryModal").classList.add("visible");
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}`);
  audio.volume = audioName === "game-win.mp3" ? 1 : 0.2;

  audio.addEventListener("loadeddata", () => {
    audio.play();
  });
}

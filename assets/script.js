let turn = "X";
let gameover = false;

const changeTurn = () => {
  if (turn === "X") return "O";
  else return "X";
};

const checkDraw = () => {
  let boxtext = document.getElementsByClassName("text");
  for (let i = 0; i < boxtext.length; i++) {
    if (boxtext[i].innerText === "") {
      return false; // If any cell is still empty, it's not a draw
    }
  }
  return true;
};

const checkResult = () => {
  if (checkDraw()) {
    document.querySelector(".turn").innerText = "It's a Draw!";
    document.querySelector(".grid").classList.remove("visible");
    gameover = true;
    return true;
  }
  let boxtext = document.getElementsByClassName("text");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < wins.length; i++) {
    let [a, b, c] = wins[i];
    if (
      boxtext[a].innerText !== "" &&
      boxtext[a].innerText === boxtext[b].innerText &&
      boxtext[b].innerText === boxtext[c].innerText
    ) {
      document.querySelector(".turn").innerText =
        boxtext[a].innerText + " Won";
      document.querySelector(".grid").classList.remove("visible");
      gameover = true;
      return true;
    }
  }
  return false;
};

let boxes = document.getElementsByClassName("cell");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".text");
  element.addEventListener("click", () => {
    if (!gameover && boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      if (!checkResult()) {
        document.getElementsByClassName("turn")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

document.querySelector(".reset").addEventListener("click", function () {
  let boxtexts = document.querySelectorAll(".text");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "O";
  gameover = false;
  document.querySelector(".grid").classList.remove("visible");
  document.querySelector(".turn").innerText = "Turn for " + turn;
});

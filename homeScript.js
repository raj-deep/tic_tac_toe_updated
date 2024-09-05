let bigBox = document.querySelectorAll(".b_box");
let smallBox = document.querySelectorAll(".s_box");
let BigBoxText = document.querySelectorAll(".b_box_text");
let mainGame = document.querySelector(".Game");
let realGame = document.querySelector(".mainGame");
let result = document.querySelector(".result");
let resultName = document.querySelector("#resultName");
let newGameButton = document.querySelector("#new_btn");
let resetGameButton = document.querySelector("#reset_btn");

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = true;
let finalWinnerFound = false;
let count = 0;

const enableBox = (row, col) => {
  mainGame.classList.remove("glow");
  let space = false;
  let textFound = false;
  let smallBoxes = document.querySelectorAll(`[data-row = "${col}"]`);

  for (let i = 0; i < smallBoxes.length; i++) {
    const box = smallBoxes[i];
    //row --> previous big box
    //col --> next big box

    if (BigBoxText[row].innerText !== "") {
      console.log("BIG BOX TEXT FOUND");
      textFound = true;
    }

    if (BigBoxText[col].innerText == "") {
      if (box.innerText == "") {
        mainGame.classList.remove("glow");
        bigBox[col].classList.add("glow");
        box.disabled = false;
        space = true;
      }
    }
  }

  if (space == true) {
    for (var i = 0; i < 9; i++) {
      if (i != col) {
        smallBoxes = document.querySelectorAll(`[data-row = "${i}"]`);
        bigBox[i].classList.remove("glow");
        smallBoxes.forEach((box) => {
          box.disabled = true;
        });
      }
    }
  } else {
    bigBox.forEach((box) => {
      box.classList.remove("glow");
    });
    mainGame.classList.add("glow");
    smallBox.forEach((box) => {
      if (box.innerText == "") {
        box.disabled = false;
      }
    });
    for (var i = 0; i < 9; i++) {
      if (BigBoxText[i].innerText != "") {
        smallBoxes = document.querySelectorAll(`[data-row = "${i}"]`);
        smallBoxes.forEach((box) => {
          if (box.innerText == "") {
            box.disabled = true;
          }
        });
      }
    }
  }
};

const checkBigBoxWinner = () => {
  count++;
  for (let pattern of winningPattern) {
    let pos1 = BigBoxText[pattern[0]].innerText;
    let pos2 = BigBoxText[pattern[1]].innerText;
    let pos3 = BigBoxText[pattern[2]].innerText;
    if (pos1 != "" && pos1 == pos2 && pos2 == pos3) {
      finalWinnerFound = true;
    }
  }
};

const removeSmallGame = (row) => {
  BigBoxText[row].classList.remove("hide");
  let smallBoxes = document.querySelectorAll(`[data-row = "${row}"]`);
  smallBoxes.forEach((box) => {
    box.classList.add("hide");
  });
};

const printWinner = (row, winner) => {
  BigBoxText[row].innerText = winner.toUpperCase();
  removeSmallGame(row);
  checkBigBoxWinner();
};

const checkSmallBoxWinner = (row) => {
  let smallBoxes = document.querySelectorAll(`[data-row = "${row}"]`);
  for (let pattern of winningPattern) {
    let pos1 = smallBoxes[pattern[0]].innerText.trim();
    let pos2 = smallBoxes[pattern[1]].innerText.trim();
    let pos3 = smallBoxes[pattern[2]].innerText.trim();

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      console.log("Winner found!");
      printWinner(row, pos1);
    }
  }
};

const checkDraw = (row) => {
  let smallBoxes = document.querySelectorAll(`[data-row = "${row}"]`);
  for (var i = 0; i < 9; i++) {
    const box = smallBoxes[i];
    if (box.innerText == "") {
      return;
    }
  }
  if (BigBoxText[row].innerText == "") {
    BigBoxText[row].innerText = "D";
    count++;
    removeSmallGame(row);
  }
};

const showResult = () => {
  result.classList.remove("hide");
  realGame.classList.add("hide");
};

const printDraw = () => {
  resultName.innerText = "It's a Drawww....";
  showResult();
};

const printFinalWinner = (turn) => {
  if (turn == true) {
    resultName.innerText = "Congratulations, Winner is player O";
  } else {
    resultName.innerText = "Congratulations, Winner is player X";
  }
  showResult();
};

const removeText = () => {
  smallBox.forEach((box) => {
    box.innerText = "";
  });
  BigBoxText.forEach((box) => {
    box.innerText = "";
  });
  bigBox.forEach((box) => {
    box.classList.remove("glow");
  });
};

const enableAll = () => {
  mainGame.classList.add("glow");
  smallBox.forEach((box) => {
    box.disabled = false;
    box.classList.remove("hide");
  });
};

const newGameStart = () => {
  result.classList.add("hide");
  realGame.classList.remove("hide");
  enableAll();
  removeText();
};

const resetGame = () => {
  enableAll();
  removeText();
};

smallBox.forEach((s_box) => {
  s_box.addEventListener("click", () => {
    if (turn) {
      s_box.innerText = "o";
      turn = false;
    } else {
      s_box.innerText = "x";
      turn = true;
    }
    checkSmallBoxWinner(s_box.getAttribute("data-row"));
    checkDraw(s_box.getAttribute("data-row"));
    if (finalWinnerFound == true) {
      printFinalWinner(!turn);
    } else if (count == 9) {
      printDraw();
    } else {
      enableBox(s_box.getAttribute("data-row"), s_box.getAttribute("data-col"));
    }
  });
});

newGameButton.addEventListener("click", newGameStart);
resetGameButton.addEventListener("click", resetGame);

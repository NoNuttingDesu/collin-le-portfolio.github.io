let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let turnX = true;
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let gameTitle = document.querySelector('#game-title')

const winPatterns = [
    /* horizontal */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    /* diagonal  */
    [0, 4, 8],
    [2, 4, 6],

    /* vertical*/
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

/* logic */
boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnX) {
            box.innerText = 'X';
            box.style.color = 'white';
            turnX = false;
            box.disabled = true;
            checkWinner();
        } else {
            box.innerText = 'O';
            box.style.color = 'white';
            turnX = true;
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = '';
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msgContainer.classList.remove('hide');

    gameTitle.innerText = `${winner} Wins!!`;
    disableBoxes();
};

const checkWinner = () => {
    let hasWin = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== ""
            && pos1Val === pos2Val && pos2Val === pos3Val) {
            boxes[pattern[0]].style.color = 'green';
            boxes[pattern[1]].style.color = 'green';
            boxes[pattern[2]].style.color = 'green';

            boxes[pattern[0]].style.backgroundColor = 'darkGrey';
            boxes[pattern[1]].style.backgroundColor = 'darkGrey';
            boxes[pattern[2]].style.backgroundColor = 'darkGrey';

            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }

    const allBoxes = [...boxes].every((box) => box.innerText !== "");

    if (!hasWin && allBoxes) {
        gameTitle.innerText = `Draw`;
    }
};

const resetGame = () => {
    turnX = true;
    enableBoxes();

    gameTitle.innerText = 'TIC-TAC-TOE';
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
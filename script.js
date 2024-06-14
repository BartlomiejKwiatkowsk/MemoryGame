let started = false;
let correctBlocks =3;
let correctCount = 0;
let wrongGuess=0;
let wrongCount = 0;
let level = 0;
let numberOfBlocks=9;
let board=3;

const startButton = document.getElementById("startButton");
function clearContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
function generateBlocks(x) {
    clearContainer();
    const container = document.getElementById('container');
    const gridSize = Math.sqrt(x);

    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 1; i <= x; i++) {
        const div = document.createElement('div');
        div.className = 'block';
        div.id = i;

        container.appendChild(div);
    }
}

function resetBlocks() {
    let blocks = document.getElementsByClassName("block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#35A8AC";
        blocks[i].style.pointerEvents = "auto";
    }
}

function changeColorRight(event) {
    let div = event.target;
    div.style.backgroundColor = "#04585D";
    correctCount++;
    if (correctCount === correctBlocks) {
        removeEventListenersFromBlocks();
        setTimeout(resetBlocks, 200);
        setTimeout(generateRightBlocks, 1000);
        correctCount = 0;
        level++;
        document.getElementById("level").innerHTML = "Level " + level.toString();
        correctBlocks++;
    }
    else
    {
        div.removeEventListener("click",changeColorRight)
    }

}

function changeColorWrong(event) {
    let heart = document.getElementById("heart" + (wrongCount + 1));
    if (wrongGuess <= 1) {
    event.target.style.backgroundColor="#B1E5E7";
    event.target.removeEventListener('click',changeColorWrong);
    wrongGuess++;
    }
    else
    {
        wrongGuess=0
        correctCount = 0;
        if (wrongCount >= 2) {
            heart.style.color = "grey";
            alert("Game ended at level " + level);
            resetGame();
        } else {
            wrongCount++;
            heart.style.color = "grey";
            resetBlocks();
            generateRightBlocks();
        }
    }
}

function addWrongEventListenersToBlocks() {
    for (let i = 1; i <= numberOfBlocks; i++) {
        let block = document.getElementById(i.toString());
        block.addEventListener("click", changeColorWrong);
    }
}

function removeEventListenersFromBlocks() {
    for (let i = 1; i <= numberOfBlocks; i++) {
        let block = document.getElementById(i.toString());
        block.removeEventListener("click", changeColorWrong);
        block.removeEventListener("click", changeColorRight);
    }
}

function generateRightBlocks() {
    if((correctBlocks/numberOfBlocks)>=0.5)
    {
        board++
        numberOfBlocks=Math.pow(board,2);
        setTimeout(generateBlocks(numberOfBlocks),100);
    }
    wrongGuess=0;
    let count = 0;
    let goodDivs = []; //Array with generated blocks
    while (count < correctBlocks) {
        let rand = Math.floor(Math.random() * numberOfBlocks) + 1;
        let div = document.getElementById(rand.toString());
        if (div.style.backgroundColor !== "black") {
            div.style.backgroundColor = "black";
            goodDivs.push(div);
            count++;
        }
    }
    startButton.disabled = true;
    started = false;
    setTimeout(function () {
        let blocks = document.getElementsByClassName("block");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundColor = "#35A8AC";
        }

        startButton.disabled = false;
        started = true;
    }, 1000);
    setTimeout(addWrongEventListenersToBlocks,1000)
    setTimeout(function (){
        for (let i =0;i<=goodDivs.length-1;i++)
        {
            goodDivs[i].removeEventListener('click',changeColorWrong);
            goodDivs[i].addEventListener('click',changeColorRight);
        }
    },1001);
}


function resetGame() {
    started = false;
    correctCount = 0;
    wrongCount = 0;
    level = 0;
    correctBlocks=3;
    numberOfBlocks=9;
    board=3;
    resetBlocks();
    for (let i = 1; i <= 3; i++) {
        document.getElementById("heart" + i).style.color = "red";
    }
    document.getElementById("level").innerHTML = "Level " + level.toString();
    startButton.style.backgroundColor = "green";
    startButton.innerHTML = "Start";
    startButton.disabled = false;
    removeEventListenersFromBlocks();
    generateBlocks(numberOfBlocks);
}
function startGame() {
    if (!started) {
        startButton.style.backgroundColor = "red";
        startButton.innerHTML = "Stop";
        started = true;
        generateRightBlocks();
    } else {

        resetGame();
    }

}
generateBlocks(numberOfBlocks);
startButton.addEventListener("click", startGame);
//#04585D activated
//#35A8AC deactivated
//#B1E5E7 clicked wrong
let btnRef = document.querySelectorAll(".btn-option");
let popupRef = document.querySelector(".popup");
let messageRef = document.getElementById("message");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart-btn");

// Winning Pattern
let winningPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// Player X Play's First
let xturn = true;
let count = 0;

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // Enable popup
    setTimeout(() => {
        popupRef.classList.remove("hide");
    }, 500); 
}

// Enable New Game & Restart Button

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
        element.classList.remove("flip")
        element.classList.remove("bg-color")
    });
    // Disable popup
    popupRef.classList.add("hide");
};

// New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// // Restart Game
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// This function is executed when one player wins
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X") {
        messageRef.innerHTML = "🎉 <br> 'X' Wins";
    } else {
        messageRef.innerHTML = "🎉 <br> 'O' Wins";
    }
};

// Function for draw
const drawFunction = () => {
    disableButtons();
    messageRef.innerHTML = "&#x1F60E; <br> It's a Draw";
}

// Win Logic
const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if ((element1 != "") && (element2 != "") && (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
            }
        }
    }
}

// Adding X/O after clicking button
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xturn) {
            xturn = false;
            element.classList.add("flip")
            element.innerText = "X";
            element.disabled = true;
        } else {
            xturn = true;
            element.innerText = "O";
            element.disabled = true;
        }
        // increment count on click
        count += 1;
        if(count == 9){
            // Its a draw
            drawFunction();
        }
        // check for win on every click
        winChecker();
    });
});

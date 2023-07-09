const gameboard =(() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const _verifySquare = (index) => {
        if (board[index] === ""){
            return true;
        }
        return false;
    };
    // const _updateBoard = () => {
    //     const squares = document.querySelectorAll(".square");
    //     squares.forEach((square, index) => {
    //         square.textContent = board[index];
    //     })
    // };

    const setSquare = (index, value) => {
        if (_verifySquare(index)){
            board[index] = value;
            if (_verifyWin() === "X"){
                player1.incrementScore();
                console.log("X wins");
            }
            if (_verifyWin() === "O"){
                player2.incrementScore();
                console.log("O wins");
            }

        }
        else{
            console.log("Square already taken");
        }
        displayController.drawSquares();
        // _updateBoard();
    };

    const resetBoard = () => {
        const squares= document.querySelectorAll(".square");
        squares.forEach((e,index) => {
            gameboard.board[index] = "";
            // gameboard.setSquare(e.target.setAttribute("data-index"), "");
        });
        displayController.drawSquares();
    };

    const _verifyWin = () => {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== ""){
            return board[0];
        }
        if (board[3] === board[4] && board[4] === board[5] && board[3] !== ""){
            return board[3];
        }
        if (board[6] === board[7] && board[7] === board[8] && board[6] !== ""){
            return board[6];
        }
        if (board[0] === board[3] && board[3] === board[6] && board[0] !== ""){
            return board[0];
        }
        if (board[1] === board[4] && board[4] === board[7] && board[1] !== ""){
            return board[1];
        }
        if (board[2] === board[5] && board[5] === board[8] && board[2] !== ""){
            return board[1];
        }
        if (board[0] === board[4] && board[4] === board[8] && board[0] !== ""){
            return board[0];
        }
        if (board[2] === board[4] && board[4] === board[6] && board[2] !== ""){
            return board[2];
        }
        return false;

        
    };
    return {board, setSquare, resetBoard};
})();

const playerData = (name, symbol)=>{
    let score = 0;
    const getName = () => name
    const getSymbol = () => symbol
    const getScore = () => score
    const incrementScore = () => score++
    return {getName, getSymbol, getScore, incrementScore}
}
const currentPlayer = (() => {
    let _currentPlayer = 0;
    const getSymbol = () => {
        if (_currentPlayer === 0){
            _currentPlayer = 1;
            return "X";
        }
        else{
            _currentPlayer = 0;
            return "O";
        }
    };
    return {getSymbol};
})();

const displayController =(()=>{
    const drawSquares = () => {
        const _squares = document.querySelectorAll(".square");
        _squares.forEach((square, index) => {
            square.textContent = gameboard.board[index];
        })
    };
    const updatePlayers = () => {
        const _players = document.querySelectorAll(".player");
        _players.forEach((player, index) => {
            player.textContent = playerData.getName();
        })
    };
    return {drawSquares};
})();


function drawSquares(){
    const board = document.querySelector("#board");
    const squares = document.querySelectorAll(".square");
    for(let i=0; i<9; i++){
        let squareDiv= document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.setAttribute("data-index", i);
        squareDiv.addEventListener("click", (e) => {
            gameboard.setSquare(e.target.getAttribute("data-index"), currentPlayer.getSymbol());
        });
        board.appendChild(squareDiv);
    };
};

function drawPlayers(){
    player1 = playerData(document.querySelector("#Player1").value, "X");
    player2 = playerData(document.querySelector("#Player2").value, "O");
    console.log(player1.getName());
    const players = document.querySelector("#players");
    const player1Div = document.createElement("div");
    player1Div.classList.add("player");
    player1Div.textContent = player1.getName();
    const player2Div = document.createElement("div");
    player2Div.classList.add("player");
    player2Div.textContent = player2.getName();
    players.appendChild(player1Div);
    players.appendChild(player2Div);
};
function startGame(){
    const board = document.querySelector("#board");
    const players = document.querySelector("#players");
    board.style.display = "grid";
    drawPlayers();
    drawSquares();
    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
        gameboard.resetBoard();
        console.log("bruh")
        displayController.drawSquares();
    }
    
    );
    resetButton.style.display = "block";

}
const startButton = document.querySelector("#start");
const form = document.querySelector("#form");
var player1;
var player2;
form.addEventListener("submit", (e)=> {
    let readyToStart = true;
    if (document.querySelector("#Player1").value === ""){
        alert("Please enter a name for Player 1");
        readyToStart = false;
    }
    if (document.querySelector("#Player2").value === ""){
        alert("Please enter a name for Player 2");
        readyToStart = false;
    }

    e.preventDefault();
    if(readyToStart||DEBUG){
        startGame();
    }
});
DEBUG=true;


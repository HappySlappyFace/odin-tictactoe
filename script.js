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
                console.log("X wins");
            }
            if (_verifyWin() === "O"){
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
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                let res=0;
                if (board[i*3+j] === "X"){
                    res++;
                }
                else if (board[i*3+j] === "O"){
                    res--;
                }
                if (res === 3){
                    return "X";
                }
                else if (res === -3){
                    return "O";
                }
            }

        }
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                let res=0;
                if (board[j*3+i] === "X"){
                    res++;
                }
                else if (board[j*3+i] === "O"){
                    res--;
                }
                if (res === 3){
                    return "X";
                }
                else if (res === -3){
                    return "O";
                }
            }
        }
        let res=0;
    };
    return {board, setSquare, resetBoard};
})();

const playerData = (name, symbol)=>{
    const getName = () => name
    const getSymbol = () => symbol
    return {getName, getSymbol}
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
    const player1 = playerData(document.querySelector("#Player1").value, "X");
    const player2 = playerData(document.querySelector("#Player2").value, "O");
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


}
const startButton = document.querySelector("#start");
const form = document.querySelector("#form");
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


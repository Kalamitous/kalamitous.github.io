//Define variables
var userWins = 0;
var compWins = 0;
var numTies = 0;

var roundNum = 0;
var totalMoves = 0;
var gameOver = false;

var userTurn = "O";
var compTurn = "X";

var curTurn = "X";

var winningMoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

var emptyTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Important functions
function setElementText(id, text) {
    if (document.getElementById(String(id)) != null) {
        document.getElementById(String(id)).innerText = text;
    }
}

function getElementText(id) {
    if (document.getElementById(String(id)) != null) {
        return document.getElementById(String(id)).innerText;
    }
}

function setElementBackgroundColor(id, col) {
    if (document.getElementById(String(id)) != null) {
        document.getElementById(String(id)).style.backgroundColor = col;
    }
}

function getElementBackgroundColor(id, col) {
    if (document.getElementById(String(id)) != null) {
        return document.getElementById(String(id)).style.backgroundColor;
    }
}

//Game mechanics
function startGame() {
    roundNum = roundNum + 1;
    totalMoves = 0;
    gameOver = false;

    curTurn = "X";

    emptyTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (userTurn == "X") {
        userTurn = "O";
        compTurn = "X";
    } else {
        userTurn = "X";
        compTurn = "O";
    }

    for (var i = 1; i <= 9; i++) {
        setElementText("tile" + String(i), "");
        setElementBackgroundColor("tile" + String(i), "white");
    }

    if (compTurn == curTurn) {
        setTimeout(function() { compMove("none"); }, 500);
    }

    setElementText("userMove", "Player(" + userTurn + ")");
    setElementText("compMove", "Computer(" + compTurn + ")");

    setElementText("roundNum", "Round " + String(roundNum));
}

function makeMove(tile, player) {
    if (gameOver == false) {
        var turnCheck;

        if (player == "user") {
            turnCheck = userTurn;
        } else {
            turnCheck = compTurn;
        }

        if (curTurn == turnCheck) {
            var tileID = "tile" + String(tile);

            if (getElementText(tileID) == "") {
                setElementText(tileID, curTurn);

                emptyTiles.splice(emptyTiles.indexOf(tile), 1);

                switchTurn(tile);
            }
        }
    }
}

function switchTurn(userMove) {
    totalMoves = totalMoves + 1;

    var winner = checkWin();

    if (winner != false) {
        if (winner == userTurn) {
            userWins = userWins + 1;
        } else if (winner == compTurn) {
            compWins = compWins + 1;
        } else {
            numTies = numTies + 1;
        }

        setElementText("userWins", String(userWins));
        setElementText("compWins", String(compWins));

        setTimeout(function() { startGame(); }, 2000);

        gameOver = true;
    } else {
        if (curTurn == "X") {
            curTurn = "O";
        } else {
            curTurn = "X";
        }

        if (userTurn != curTurn) {
            for (var i = 1; i <= 9; i++) {
                setElementBackgroundColor("tile" + String(i), "#e1e7e9");
            }
        } else {
            for (var i = 1; i <= 9; i++) {
                setElementBackgroundColor("tile" + String(i), "white");
            }
        }

        if (curTurn == compTurn) {
            setTimeout(function() { compMove(userMove); }, 500);
        }
    }
}

function checkWin() {
    var result = false;
    var win = false;

    var tile1;
    var tile2;
    var tile3;

    for (var i = 0; i < winningMoves.length; i++) {
        tile1 = "tile" + String(winningMoves[i][0]);
        tile2 = "tile" + String(winningMoves[i][1]);
        tile3 = "tile" + String(winningMoves[i][2]);

        if (getElementText(tile1) == getElementText(tile2) && getElementText(tile1) == getElementText(tile3) && getElementText(tile1) != "") {
            win = true;

            break;
        }
    }

    if (win == true) {
        result = getElementText(tile1);

        setElementBackgroundColor(tile1, "#2ecc71");
        setElementBackgroundColor(tile2, "#2ecc71");
        setElementBackgroundColor(tile3, "#2ecc71");

        for (var i = 1; i <= 9; i++) {
            if ("tile" + String(i) != tile1 && "tile" + String(i) != tile2 && "tile" + String(i) != tile3) {
                setElementBackgroundColor("tile" + String(i), "#e1e7e9");
            }
        }
    }

    if (result == false && emptyTiles.length == 0) {
        result = "tie";
    }

    return result;
}

//"Brain" of the bot
function compMove(userMove) {
    if (compTurn == "X") {
        if (totalMoves == 0) {
            moveMiddle();
        } else if (totalMoves == 2) {
            if (userMove == 2 || userMove == 4 || userMove == 6 || userMove == 8) {
                counterSideAtZero(userMove);
            } else {
                counterCornerMove(userMove);
            }
        } else if (totalMoves == 4) {
            if (makeWinningMove() != false) {
                makeWinningMove();
            } else if (makeBlockingMove() != false) {
                makeBlockingMove();
            } else if (trapTrianglePattern() != false) {
                trapTrianglePattern();
            } else {
                makeBasicMove();
            }
        } else if (totalMoves > 2 && totalMoves % 2 == 0) {
            if (makeWinningMove() != false) {
                makeWinningMove();
            } else if (makeBlockingMove() != false) {
                makeBlockingMove();
            } else {
                makeBasicMove();
            }
        }
    } else {
        if (totalMoves == 1) {
            if (userMove == 5) {
                counterMiddleAtOne();
            } else {
                moveMiddle();
            }
        } else if (totalMoves == 3) {
            if (userMove == 1 || userMove == 3 || userMove == 7 || userMove == 9) {
                if (userAdjacentPattern(userMove)) {
                    if (getElementText("tile5") == compTurn) {
                        counterAdjacentPattern();
                    } else {
                        makeBasicMove();
                    }
                } else if (userDiagonalPattern(userMove)) {
                    if (getElementText("tile5") == userTurn) {
                        counterDiagonalPattern(userMove);
                    } else {
                        makeBasicMove();
                    }
                } else if (counterTrianglePattern() != false) {
                    counterTrianglePattern();
                } else {
                    makeBasicMove();
                }
            } else {
                if (counterCornerPattern() != false) {
                    counterCornerPattern();
                } else {
                    makeBasicMove();
                }
            }
        } else if (totalMoves > 3 && totalMoves % 2 == 1) {
            if (makeWinningMove() != false) {
                makeWinningMove();
            } else if (makeBlockingMove() != false) {
                makeBlockingMove();
            } else if (counterCornerPattern() != false) {
                counterCornerPattern();
            } else {
                makeBasicMove();
            }
        }
    }
}

//-Basic moves
function makeBasicMove() {
    if (makeWinningMove() != false) {
        makeWinningMove();
    } else {
        if (makeBlockingMove() != false) {
            makeBlockingMove();
        } else {
            makeRandomMove();
        }
    }
}

function makeWinningMove() {
    var move = false;

    for (var i = 0; i < winningMoves.length; i++) {
        if (getElementText("tile" + String(winningMoves[i][0])) == compTurn && getElementText("tile" + String(winningMoves[i][1])) == compTurn) {
            if (getElementText("tile" + String(winningMoves[i][2])) == "") {
                move = winningMoves[i][2];
            }
        } else if (getElementText("tile" + String(winningMoves[i][1])) == compTurn && getElementText("tile" + String(winningMoves[i][2])) == compTurn) {
            if (getElementText("tile" + String(winningMoves[i][0])) == "") {
                move = winningMoves[i][0];
            }
        } else if (getElementText("tile" + String(winningMoves[i][0])) == compTurn && getElementText("tile" + String(winningMoves[i][2])) == compTurn) {
            if (getElementText("tile" + String(winningMoves[i][1])) == "") {
                move = winningMoves[i][1];
            }
        }
    }

    if (move != false) {
        if (getElementText("tile" + String(move)) != "") {
            move = false;
        }
    }

    if (move != false) {
        makeMove(move, "comp");
    }

    return move;
}

function makeBlockingMove() {
    var move = false;

    for (var i = 0; i < winningMoves.length; i++) {
        if (getElementText("tile" + String(winningMoves[i][0])) == userTurn && getElementText("tile" + String(winningMoves[i][1])) == userTurn) {
            if (getElementText("tile" + String(winningMoves[i][2])) == "") {
                move = winningMoves[i][2];
            }
        } else if (getElementText("tile" + String(winningMoves[i][1])) == userTurn && getElementText("tile" + String(winningMoves[i][2])) == userTurn) {
            if (getElementText("tile" + String(winningMoves[i][0])) == "") {
                move = winningMoves[i][0];
            }
        } else if (getElementText("tile" + String(winningMoves[i][0])) == userTurn && getElementText("tile" + String(winningMoves[i][2])) == userTurn) {
            if (getElementText("tile" + String(winningMoves[i][1])) == "") {
                move = winningMoves[i][1];
            }
        }
    }

    if (move != false) {
        if (getElementText("tile" + String(move)) != "") {
            move = false;
        }
    }

    if (move != false) {
        makeMove(move, "comp");
    }

    return move;
}

function makeRandomMove() {
    var move = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

    if (getElementText("tile" + String(move)) == "") {
        makeMove(move, "comp");
    } else {
        makeRandomMove();
    }
}

//Traps
//-X
function trapTrianglePattern() {
    var move = false;

    if (getElementText("tile2") == userTurn && getElementText("tile7") == userTurn || getElementText("tile4") == userTurn && getElementText("tile3") == userTurn) {
        move = 9;
    } else if (getElementText("tile2") == userTurn && getElementText("tile9") == userTurn || getElementText("tile6") == userTurn && getElementText("tile1") == userTurn) {
        move = 7;
    } else if (getElementText("tile6") == userTurn && getElementText("tile7") == userTurn || getElementText("tile8") == userTurn && getElementText("tile3") == userTurn) {
        move = 1;
    } else if (getElementText("tile8") == userTurn && getElementText("tile1") == userTurn || getElementText("tile4") == userTurn && getElementText("tile9") == userTurn) {
        move = 3;
    }

    if (move != false) {
        makeMove(move, "comp")
    }

    return move;
}

//-Counter attacks
//--Shared
function moveMiddle() {
    makeMove(5, "comp");
}

//--X
function counterSideAtZero(tile) {
    var move;

    if (tile == 2) {
        move = 7;
    } else if (tile == 4) {
        move = 9;
    } else if (tile == 6) {
        move = 1;
    } else if (tile == 8) {
        move = 3;
    }

    makeMove(move, "comp");
}

function counterCornerMove(tile) {
    var move;

    if (tile == 1) {
        move = 9;
    } else if (tile == 3) {
        move = 7;
    } else if (tile == 7) {
        move = 3;
    } else if (tile == 9) {
        move = 1;
    }

    makeMove(move, "comp");
}

//--O
function counterMiddleAtOne() {
    var possibleMoves = [1, 3, 7, 9];

    var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    makeMove(move, "comp");
}

function counterAdjacentPattern() {
    var possibleMoves = [2, 4, 6, 8];

    var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    if (getElementText("tile" + String(move)) == "") {
        makeMove(move, "comp");
    } else {
        makeBasicMove();
    }
}

function counterDiagonalPattern(tile) {
    var possibleMoves;

    if (tile == 1 || tile == 9) {
        possibleMoves = [3, 7];
    } else if (tile == 3 || tile == 7) {
        possibleMoves = [1, 9];
    }

    var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    if (getElementText("tile" + String(move)) == "") {
        makeMove(move, "comp");
    } else {
        makeBasicMove();
    }
}

function counterTrianglePattern() {
    var move = false;

    if (getElementText("tile2") == userTurn && getElementText("tile7") == userTurn || getElementText("tile8") == userTurn && getElementText("tile1") == userTurn) {
        move = 4;
    } else if (getElementText("tile2") == userTurn && getElementText("tile9") == userTurn || getElementText("tile8") == userTurn && getElementText("tile3") == userTurn) {
        move = 6;
    } else if (getElementText("tile6") == userTurn && getElementText("tile1") == userTurn || getElementText("tile4") == userTurn && getElementText("tile3") == userTurn) {
        move = 2;
    } else if (getElementText("tile6") == userTurn && getElementText("tile7") == userTurn || getElementText("tile4") == userTurn && getElementText("tile9") == userTurn) {
        move = 8;
    }

    if (move != false) {
        makeMove(move, "comp");
    }

    return move;
}

function counterCornerPattern() {
    var move = false;

    if (getElementText("tile2") == userTurn && getElementText("tile4") == userTurn) {
        if (getElementText("tile1") == "") {
            move = 1;
        }
    } else if (getElementText("tile2") && getElementText("tile6") == userTurn) {
        if (getElementText("tile3") == "") {
            move = 3;
        }
    } else if (getElementText("tile4") && getElementText("tile8") == userTurn) {
        if (getElementText("tile7") == "") {
            move = 7;
        }
    } else if (getElementText("tile6") && getElementText("tile8") == userTurn) {
        if (getElementText("tile9") == "") {
            move = 9;
        }
    }

    if (move != false) {
        makeMove(move, "comp");
    }

    return move;
}

//-User strategy detection
function userAdjacentPattern(tile) {
    var diagonalPattern = false;

    if (tile == 1) {
        if (getElementText("tile9") == userTurn) {
            diagonalPattern = true;
        }
    } else if (tile == 9) {
        if (getElementText("tile1") == userTurn) {
            diagonalPattern = true;
        }
    } else if (tile == 3) {
        if (getElementText("tile7") == userTurn) {
            diagonalPattern = true;
        }
    } else if (tile == 7) {
        if (getElementText("tile3") == userTurn) {
            diagonalPattern = true;
        }
    }

    return diagonalPattern;
}

function userDiagonalPattern(tile) {
    var diagonalPattern = false;

    if (tile == 1) {
        if (getElementText("tile9") == compTurn) {
            diagonalPattern = true;
        }
    } else if (tile == 9) {
        if (getElementText("tile1") == compTurn) {
            diagonalPattern = true;
        }
    } else if (tile == 3) {
        if (getElementText("tile7") == compTurn) {
            diagonalPattern = true;
        }
    } else if (tile == 7) {
        if (getElementText("tile3") == compTurn) {
            diagonalPattern = true;
        }
    }

    return diagonalPattern;
}

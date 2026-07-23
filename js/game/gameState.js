// ==========================
// GAME STATE
// ==========================

const gameState = {

    mode:
    sessionStorage.getItem("mode") || "",

    currentTurn:
    Number(sessionStorage.getItem("currentTurn")) || 1,

    currentPlayer:
    Number(sessionStorage.getItem("currentPlayer")) || 1,

    winner:
    sessionStorage.getItem("winner") || null,

    player1:{

        hero:null,

        team:[]

    },

    player2:{

        hero:null,

        team:[]

    }

};

// ==========================
// SAVE
// ==========================

function saveGameState(){

    sessionStorage.setItem(
        "mode",
        gameState.mode
    );

    sessionStorage.setItem(
        "currentTurn",
        gameState.currentTurn
    );

    sessionStorage.setItem(
        "currentPlayer",
        gameState.currentPlayer
    );

    sessionStorage.setItem(
        "winner",
        gameState.winner
    );

}

// ==========================
// MODE
// ==========================

function setGameMode(mode){

    gameState.mode = mode;

    saveGameState();

}

// ==========================
// RESET
// ==========================

function resetGame(){

    sessionStorage.clear();

    gameState.mode="";

    gameState.currentTurn=1;

    gameState.currentPlayer=1;

    gameState.winner=null;

    gameState.player1.team=[];

    gameState.player2.team=[];

}
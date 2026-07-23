const playerName =
localStorage.getItem("playerName");

const player1 =
document.getElementById("player1");

if(playerName && player1){

    player1.textContent = playerName;

}
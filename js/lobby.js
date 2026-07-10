// ==========================================
// Miraculous Clash - Lobby
// Version 2.0
// ==========================================


// ---------- Player Profile ----------
const playerName =
localStorage.getItem("playerName") || "Player";

document.getElementById("playerName").textContent = playerName;

const playerAvatar =
    localStorage.getItem("playerAvatar") || "../hero/hero1.jpg";

document.getElementById("playerName").textContent = playerName;
document.getElementById("playerAvatar").src = playerAvatar;

const favorites =
JSON.parse(localStorage.getItem("favoriteKwamis")) || [];
// ---------- Statistics ----------

const wins = localStorage.getItem("wins") || 0;
const games = localStorage.getItem("games") || 0;

document.getElementById("wins").textContent = wins;
document.getElementById("games").textContent = games;


// ---------- Favourite Kwamis ----------
// (Temporary)

document.getElementById("fav1").src = "../photos/Tikki.jpg";
document.getElementById("fav2").src = "../photos/plagg.jpg";
document.getElementById("fav3").src = "../photos/Wayz.png";


// ---------- Buttons ----------

document.getElementById("playButton").addEventListener("click", () => {

    goTo("kwami.html");

});


document.getElementById("infoButton").addEventListener("click", () => {

    // Change later to Kwami Index page
    goTo("kwami_index.html");

});


document.getElementById("profileButton").addEventListener("click", () => {

    goTo("avatar.html");

});


document.getElementById("settingButton").addEventListener("click", () => {

    goTo("settings.html");
});


document.getElementById("creditButton").addEventListener("click", () => {

    goTo("credits.html");

});


// ---------- Back ----------

document.getElementById("backBtn").addEventListener("click", () => {

    goTo("index.html");

});


// ---------- Page Fade ----------

window.addEventListener("load", () => {

    const fade = document.getElementById("fadeScreen");

    setTimeout(() => {

        fade.classList.add("fadeIn");

    }, 100);

});


document.getElementById("changeFavoriteBtn").onclick = ()=>{

    goTo("kwami_index.html");

};

function loadFavoriteKwamis(){

    const favorites =
    JSON.parse(localStorage.getItem("favoriteKwamis")) || [];

    for(let i=0;i<3;i++){

        const img =
        document.getElementById("fav"+(i+1));

        if(favorites[i]){

            const kwami =
            kwamis.find(k=>k.name===favorites[i]);

            if(kwami){

                img.src = kwami.image;

            }

        }

        else{

            img.src = "../photos/question.png";
            // or "" if you don't have a placeholder image

        }

    }

}

loadFavoriteKwamis();
// ---------- Console ----------

console.log("Miraculous Clash Lobby Loaded");


let currentHero = parseInt(localStorage.getItem("selectedHero")) || 0;

const heroImage = document.getElementById("heroImage");
const heroName = document.getElementById("heroName");
const heroQuote = document.getElementById("heroQuote");
const statusText = document.getElementById("statusText");
const savedName = localStorage.getItem("playerName") || "";

document.getElementById("nameInput").value = savedName;


function updateHero(){

    heroImage.src = heroes[currentHero].image;
    heroName.textContent = heroes[currentHero].name;
    heroQuote.textContent = heroes[currentHero].quote;

}

document.getElementById("nextBtn").onclick = ()=>{

    currentHero++;

    if(currentHero >= heroes.length){

        currentHero = 0;

    }

    updateHero();

};

document.getElementById("prevBtn").onclick = ()=>{

    currentHero--;

    if(currentHero < 0){

        currentHero = heroes.length-1;

    }

    updateHero();

};

document.getElementById("selectBtn").onclick = ()=>{

    const playerName =
    document.getElementById("nameInput").value.trim();

    if(playerName !== ""){

        localStorage.setItem("playerName", playerName);

    }

    localStorage.setItem("playerAvatar", heroes[currentHero].image);

    localStorage.setItem("selectedHero", currentHero);

    goTo("lobby.html");

};

document.getElementById("backBtn").onclick = ()=>{

    goTo("lobby.html");

};

updateHero();

window.addEventListener("load",()=>{

    setTimeout(()=>{

        fadeScreen.classList.add("fadeIn");

    },100);

});
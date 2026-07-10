const favoriteBtn =document.getElementById("favoriteBtn");

const player = document.getElementById("themePlayer");

const audioContext = new AudioContext();

const source = audioContext.createMediaElementSource(player);

const gainNode = audioContext.createGain();

source.connect(gainNode);
gainNode.connect(audioContext.destination);

document.body.addEventListener("click", () => {
    audioContext.resume();
}, { once: true });



let currentIndex =
parseInt(localStorage.getItem("lastViewedKwami")) || 0;

function createKwamiStrip(){

    const strip =
    document.getElementById("kwamiStrip");

    strip.innerHTML = "";

    kwamis.forEach((kwami,index)=>{

        const img = document.createElement("img");

        img.src = kwami.image;

        img.title = kwami.name;

        img.className = "stripIcon";
        img.id = "strip-" + index;
        img.onclick = ()=>{

            currentIndex = index;

            updateKwami(currentIndex);

        };

        strip.appendChild(img);

    });

}

function updateKwami(index){

    const kwami = kwamis[index];

   const favorites =
JSON.parse(localStorage.getItem("favoriteKwamis")) || [];

   if(favorites.includes(kwami.name)){

        favoriteBtn.textContent =
        "⭐ Favorited";

        favoriteBtn.classList.add(
            "favoriteSelected"
        );

    }
    else{

        favoriteBtn.textContent =
        "⭐ Set as Favorite";

        favoriteBtn.classList.remove(
            "favoriteSelected"
        );

    }




    document.getElementById("kwamiName").textContent =
    kwami.name;

    document.getElementById("kwamiTitle").textContent =
    "KWAMI OF " + kwami.type.toUpperCase();

    document.getElementById("kwamiImage").src =
    kwami.image;

    document.getElementById("activeName").textContent =
    kwami.active;

    document.getElementById("activeEffect").textContent =
    kwami.effect;

    document.getElementById("passiveEffect").textContent =
    kwami.passive;

    document.getElementById("stats").innerHTML =
    `
    HP : ${kwami.hp}<br>
    Damage : ${kwami.damage}<br>
    Speed : ${kwami.speed}<br>
    Luck : ${kwami.luck}<br>
    Charge : ${kwami.charge}
    `;

    // ======================
    // Theme Music
    // ======================

    player.pause();

player.currentTime = 0;

player.src = kwami.voice;

gainNode.gain.value = 1.5;

player.play();

    document.documentElement.style.setProperty(
"--accent",
kwami.accent


);

// ======================
// Synergy / Preferred Partner
// ======================

const heading = document.getElementById("partnerHeading");
const partnerImage = document.getElementById("partnerImage");
const partnerName = document.getElementById("partnerName");
const partnerTitle = document.getElementById("partnerTitle");
const partnerDescription = document.getElementById("partnerDescription");

// ❤️ Synergy
if(kwami.synergy){

    heading.textContent = "❤️ Synergy";

    const partner =
    kwamis.find(k => k.name === kwami.synergy.partner);

    partnerImage.src = partner.image;
    partnerName.textContent = partner.name;
    partnerTitle.textContent = kwami.synergy.name;
    partnerDescription.textContent = kwami.synergy.effect;

}

// ⭐ Preferred Partner
else if(kwami.preferred){

    heading.textContent = "⭐ Preferred Partner";

    const partner =
    kwamis.find(k => k.name === kwami.preferred.partner);

    partnerImage.src = partner.image;
    partnerName.textContent = partner.name;
    partnerTitle.textContent = "Recommended Combination";
    partnerDescription.textContent = kwami.preferred.reason;

}

// Nothing
else{

    heading.textContent = "🤝 No Partner";

    partnerImage.removeAttribute("src");

    partnerName.textContent = "None";

    partnerTitle.textContent = "";

    partnerDescription.textContent =
    "This kwami currently has no Synergy or Preferred Partner.";

}

localStorage.setItem(
    "lastViewedKwami",
    index
);

// Remove previous highlight
document.querySelectorAll(".stripIcon").forEach(icon=>{

    icon.classList.remove("selectedKwami");

});




// Highlight current kwami
document.getElementById("strip-"+index)
.classList.add("selectedKwami");





}





document.getElementById("nextBtn").onclick = ()=>{

    currentIndex++;

    if(currentIndex>=kwamis.length){

        currentIndex=0;

    }

    updateKwami(currentIndex);

};

document.getElementById("prevBtn").onclick = ()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=kwamis.length-1;

    }

    updateKwami(currentIndex);

};

document.addEventListener("keydown",(event)=>{

    // Ignore if the user is typing in an input
    if(event.target.tagName==="INPUT") return;

    if(event.key==="ArrowRight"){

        document.getElementById("nextBtn").click();

    }

    else if(event.key==="ArrowLeft"){

        document.getElementById("prevBtn").click();

    }

});




createKwamiStrip();
updateKwami(currentIndex);

favoriteBtn.onclick = ()=>{

    let favorites =
    JSON.parse(localStorage.getItem("favoriteKwamis")) || [];

    const currentName =
    kwamis[currentIndex].name;

    // Remove if already favorite
    if(favorites.includes(currentName)){

        favorites =
        favorites.filter(name=>name!==currentName);

    }

    // Add if space available
    else{

        if(favorites.length>=3){

            alert("You can only select 3 favorite kwamis.");

            return;

        }

        favorites.push(currentName);

    }

    localStorage.setItem(
        "favoriteKwamis",
        JSON.stringify(favorites)
    );

    updateKwami(currentIndex);

};
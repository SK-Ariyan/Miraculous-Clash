// ==========================
// CARD CONTAINER
// ==========================

const cardContainer = document.getElementById("cardContainer");

// ==========================
// HTML ELEMENTS
// ==========================

const player1Title = document.getElementById("player1");
const player2Title = document.getElementById("player2");

const turnText = document.getElementById("turnText");



const pickInfo = document.getElementById("pickInfo");

// PLAYER SLOTS

const p1Slots = [
document.getElementById("p1slot1"),
document.getElementById("p1slot2"),
document.getElementById("p1slot3")
];

const p2Slots = [
document.getElementById("p2slot1"),
document.getElementById("p2slot2"),
document.getElementById("p2slot3")
];

// ==========================
// ALL KWAMIS
// ==========================



// ==========================
// CREATE CARDS
// ==========================

kwamis.forEach((kwami,index)=>{

const card=document.createElement("div");

card.className="card";

card.dataset.index=index;

card.innerHTML=`

<img src="${kwami.image}">

<h3>${kwami.name}</h3>

<div class="stats">

❤️ HP : +${kwami.hp}<br>

⚔ Damage : +${kwami.damage}<br>

⚡ Speed : ${kwami.speed}<br>

🔥 Active : ${kwami.active}<br>

✨ Effect : ${kwami.effect}<br>

💚 Passive : ${kwami.passive}<br>

⏳ Charge : ${kwami.charge} Turns

</div>

`;
card.addEventListener("click",()=>{

    selectKwami(card,kwami);

});

cardContainer.appendChild(card);

});



// ==========================
// DRAFT VARIABLES
// ==========================
// ==========================
// DRAFT VARIABLES
// ==========================

let draftOrder;

if(Math.random() < 0.5){

    draftOrder = [
        "p1",
        "p2",
        "p2",
        "p1",
        "p1",
        "p2"
    ];

}else{

    draftOrder = [
        "p2",
        "p1",
        "p1",
        "p2",
        "p2",
        "p1"
    ];

}
let turn = 0;

let player1Team = [];
let player2Team = [];

let phase = "ban";
let bannedKwamis = [];

// ==========================
// UPDATE UI
// ==========================
// ==========================
// ADVANCE TURN
// ==========================
let uiLocked = false;

function lockUI(duration = 1500){

    uiLocked = true;

    setTimeout(()=>{

        uiLocked = false;

    }, duration);

}
function advanceTurn(){

    // Draft finished
    if(turn >= draftOrder.length){

        localStorage.setItem("player1", JSON.stringify(player1Team));
        localStorage.setItem("player2", JSON.stringify(player2Team));

        if(window.bgMusic){
            bgMusic.pause();
        }

        goTo("battle.html");
        return;
    }

    updateTurnUI();

    const mode = sessionStorage.getItem("mode");

    if(mode != "ai")
    return;

// AI Ban
if(phase == "ban" && turn == 1){

    nextBanTurn();
    return;

}

// AI Draft
if(phase == "draft" && draftOrder[turn] == "p2"){

    nextDraftTurn();
    return;

}

}
function updateTurnUI(){

    if(uiLocked)
    return;

    player1Title.classList.remove("active");
    player2Title.classList.remove("active");

    if(phase=="ban"){

        if(turn==0){

            player1Title.classList.add("active");
            turnText.innerHTML=`❌ ${playerName} BANNING`;

        }else{

            player2Title.classList.add("active");
            turnText.innerHTML=`❌ Opponent BANNING`;

        }

        pickInfo.innerHTML="Ban "+(turn+1)+" of 2";
        return;

    }

    if(draftOrder[turn]=="p1"){

        player1Title.classList.add("active");
        turnText.innerHTML=`✨ ${playerName} SELECTING ✨`;

    }else{

        player2Title.classList.add("active");
        turnText.innerHTML=`✨ Opponent SELECTING ✨`;

    }

    pickInfo.innerHTML="Pick "+(turn+1)+" of 6";

}

// ==========================
// SELECT A KWAMI
// ==========================

function selectKwami(card,kwami){

    if(card.classList.contains("selected"))
        return;

    if(card.classList.contains("banned"))
        return;

    // -------------------------
    // BAN PHASE
    // -------------------------

    if(phase=="ban"){

    bannedKwamis.push(kwami.name);

    card.classList.add("banned");

    banSound.currentTime = 0;
    banSound.play();

    turn++;

    if(turn == 2){

        phase = "draft";
        turn = 0;

    }

    advanceTurn();

    return;

}

    // -------------------------
    // PICK PHASE
    // -------------------------

const currentPlayer = draftOrder[turn];

if(currentPlayer=="p1"){

    player1Team.push(kwami);

}else{

    player2Team.push(kwami);

}

card.classList.add("selected");
selectSound.currentTime = 0;
selectSound.play();

updateSlots();

updatePreviewStats();

turn++;

advanceTurn();

return;

}

function updatePreviewStats(){

    let p1HP = 200;
    let p1Damage = 0;
    let p1Speed = 0;

    player1Team.forEach(k=>{
        p1HP += k.hp;
        p1Damage += k.damage;
        p1Speed += k.speed;
    });

    document.getElementById("player1HPPreview").innerHTML = p1HP;
    document.getElementById("player1DamagePreview").innerHTML = p1Damage;
    document.getElementById("player1SpeedPreview").innerHTML = p1Speed;

    let p2HP = 200;
    let p2Damage = 0;
    let p2Speed = 0;

    player2Team.forEach(k=>{
        p2HP += k.hp;
        p2Damage += k.damage;
        p2Speed += k.speed;
    });

    document.getElementById("player2HPPreview").innerHTML = p2HP;
    document.getElementById("player2DamagePreview").innerHTML = p2Damage;
    document.getElementById("player2SpeedPreview").innerHTML = p2Speed;

}

function nextDraftTurn(){
    if(uiLocked)
    return;

    const thinkTime = 1200 + Math.random() * 800;

    turnText.innerHTML = "🤖 Opponent is analyzing...";

    setTimeout(()=>{

        const aiPick = DraftAI.choosePick(player2Team);

        if(!aiPick){
            console.log("No AI Pick");
            return;
        }

        const aiCard = [...document.querySelectorAll(".card")].find(card=>{

            return Number(card.dataset.index) === kwamis.indexOf(aiPick);

        });

        if(!aiCard){
            console.log("Card not found");
            return;
        }

        turnText.innerHTML =
        `🤖 Opponent selected ${aiPick.name}`;

        setTimeout(()=>{

            selectKwami(aiCard, aiPick);

        },700);

    },thinkTime);

}

function nextBanTurn(){

    turnText.innerHTML = "🤖 Opponent is analyzing...";

    const thinkTime = 1000 + Math.random() * 700;

    setTimeout(()=>{

        const aiBan = DraftAI.chooseBan(
            kwamis,
            bannedKwamis
        );

        if(!aiBan){
            console.log("No AI Ban");
            return;
        }

        const aiCard = [...document.querySelectorAll(".card")].find(card=>{

            return Number(card.dataset.index) === kwamis.indexOf(aiBan);

        });

        if(!aiCard){
            console.log("Ban card not found");
            return;
        }

        turnText.innerHTML =
        `🤖 Opponent banned ${aiBan.name}`;

        setTimeout(()=>{

            selectKwami(aiCard, aiBan);

        },700);

    },thinkTime);

}




function updateSlots(){

    p1Slots.forEach(slot => slot.innerHTML = "");
    p2Slots.forEach(slot => slot.innerHTML = "");

    player1Team.forEach((kwami,index)=>{
        p1Slots[index].innerHTML = `<img src="${kwami.image}">`;
    });

    player2Team.forEach((kwami,index)=>{
        p2Slots[index].innerHTML = `<img src="${kwami.image}">`;
    });

}
const personality = PersonalityManager.choose();





updateTurnUI();
updatePreviewStats();


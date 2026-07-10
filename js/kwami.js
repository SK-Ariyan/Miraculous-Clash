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

const kwamis = [

{
name:"Tikki",
image:"../photos/Tikki.jpg",
hp:30,
damage:3,
speed:4,
active:"Lucky Charm",
effect:"Heal 40 HP and deal 30 damage",
passive:"Heal 2 HP each turn",
charge:6,
luck:5
},

{
name:"Plagg",
image:"../photos/plagg.jpg",
hp:10,
damage:20,
speed:40,
active:"Cataclysm",
effect:"Deal 80 damage and destroy the enemy shield",
passive:"Deal 10 True Damage each turn",
charge:3,
luck:5
},

{
name:"Wayz",
image:"../photos/Wayz.png",
hp:35,
damage:1,
speed:1,
active:"Shell-ter",
effect:"Deal 30 damage, gain 70 Shield, +20 Damage Reduction and an Extra Turn",
passive:"Heal 5 HP each turn",
charge:6,
luck:5
},

{
name:"Trics",
image:"../photos/Trics.jpg",
hp:15,
damage:3,
speed:5,
active:"Mirage",
effect:"Deal 40 damage, Heal 10 HP and gain an Extra Turn",
passive:"None",
charge:6,
luck:5
},

{
name:"Pollen",
image:"../photos/Pollen.jpg",
hp:15,
damage:5,
speed:4,
active:"Venom",
effect:"Deal 35 damage and Stun the enemy",
passive:"None",
charge:5,
luck:5
},

{
name:"Roaar",
image:"../photos/Roaar.jpg",
hp:10,
damage:5,
speed:3,
active:"Clout",
effect:"Deal 70 damage and gain an Extra Turn",
passive:"None",
charge:6,
luck:5
},

{
name:"Longg",
image:"../photos/Longg.jpg",
hp:20,
damage:4,
speed:3,
active:"Elemental Burst",
effect:"Deal 45 damage, Heal 10 HP, Deal 10 True Damage and gain Double Attack",
passive:"None",
charge:2,
luck:5
},

{
name:"Kaalki",
image:"../photos/Kaalki.jpg",
hp:20,
damage:2,
speed:5,
active:"Voyage",
effect:"Deal 40 damage, Break Shield and gain Dodge",
passive:"Dodge the next incoming attack",
charge:4,
luck:5
},

{
name:"Fluff",
image:"../photos/Fluff.jpg",
hp:15,
damage:2,
speed:5,
active:"Burrow",
effect:"Deal 30 damage and and immediately restore every kwami",
passive:"None",
charge:2,
luck:5
},

{
name:"Sass",
image:"../photos/Sass.jpg",
hp:20,
damage:2,
speed:2,
active:"Second Chance",
effect:"Deal 30 damage, Undo Last Damage and Reset Ally Cooldowns",
passive:"None",
charge:4,
luck:5
},

{
name:"Daizzi",
image:"../photos/Daizzi.jpg",
hp:25,
damage:2,
speed:3,
active:"Jubilation",
effect:"Heal 50 HP",
passive:"Reduce incoming damage by 40",
charge:5,
luck:5
},

{
name:"Mullo",
image:"../photos/Mullo.jpg",
hp:15,
damage:4,
speed:4,
active:"Multitude",
effect:"Deal 30 damage and your next attack hits twice",
passive:"None",
charge:2,
luck:50
},

{
name:"Nuroo",
image:"../photos/Nuroo.jpg",
hp:15,
damage:3,
speed:3,
active:"Akumatize",
effect:"Deal 40 damage, gain +40 Damage and Regenerate 10 HP for 2 turns",
passive:"None",
charge:4,
luck:5
},

{
name:"Orikko",
image:"../photos/Orikko.jpg",
hp:20,
damage:2,
speed:3,
active:"Sublimation",
effect:"Randomly gain Healing, Damage Buff, Shield, Dodge or Cooldown Reduction",
passive:"None",
charge:4,
luck:5
},

{
name:"Stomp",
image:"../photos/Stomp.jpg",
hp:40,
damage:0,
speed:1,
active:"Resistance",
effect:"Deal 30 damage, gain 30 Shield, Immunity and an Extra Turn",
passive:"None",
charge:6,
luck:5
},

{
name:"Tussoo",
image:"../photos/Tussoo.jpg",
hp:30,
damage:2,
speed:2,
active:"Senti monster",
effect:"Heal 10 HP and deal 60 damage",
passive:"Heal 10 HP every 2 turns",
charge:4,
luck:5
},

{
name:"Xuppu",
image:"../photos/Xuppu.jpg",
hp:15,
damage:3,
speed:4,
active:"Uproar",
effect:"Deal 60 damage and Disable Enemy Passive",
passive:"None",
charge:4,
luck:5
},

{
name:"Ziggy",
image:"../photos/Ziggy.jpg",
hp:25,
damage:2,
speed:2,
active:"Genesis",
effect:"Boost the next Ability",
passive:"None",
charge:3,
luck:5
},
{
    name:"Bark",
    image:"../photos/Bark.jpg",
    hp:30,
    damage:5,
    speed:10,
    active:"Fetch",
    effect:"Do the same move last kwami used doesn't matter from own team or opponent. do 20 damage if no move used yet",
    passive:"None",
    charge:4,
    luck:5,

    copiedAbility:null,
    hasFetched:false
}

];

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

function updateTurnUI(){

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

        if(turn==2){

            phase="draft";
            turn=0;
        }

        updateTurnUI();
        return;

    }

    // -------------------------
    // PICK PHASE
    // -------------------------

    if(draftOrder[turn]=="p1"){

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

    if(turn>=draftOrder.length){

        localStorage.setItem("player1",JSON.stringify(player1Team));
        localStorage.setItem("player2",JSON.stringify(player2Team));
        if(window.bgMusic){
    bgMusic.pause();
}
        goTo("battle.html");

        return;

    }

    updateTurnUI();

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


updateTurnUI();
updatePreviewStats();
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
image:"Tikki.jpg",
hp:30,
damage:3,
speed:4,
active:"Lucky Charm",
effect:"Heal 40 HP and deal 30 damage",
passive:"Heal 2 HP each turn",
charge:6
},

{
name:"Plagg",
image:"plagg.jpg",
hp:10,
damage:20,
speed:40,
active:"Cataclysm",
effect:"Deal 80 damage and destroy the enemy shield",
passive:"Deal 10 True Damage each turn",
charge:3
},

{
name:"Wayz",
image:"wayz.png",
hp:35,
damage:1,
speed:1,
active:"Shell-ter",
effect:"Deal 30 damage, gain 70 Shield, +20 Damage Reduction and an Extra Turn",
passive:"Heal 5 HP each turn",
charge:6
},

{
name:"Trics",
image:"Trics.jpg",
hp:15,
damage:3,
speed:5,
active:"Mirage",
effect:"Deal 40 damage, Heal 10 HP and gain an Extra Turn",
passive:"None",
charge:5
},

{
name:"Pollen",
image:"Pollen.jpg",
hp:15,
damage:5,
speed:4,
active:"Venom",
effect:"Deal 35 damage and Stun the enemy",
passive:"None",
charge:6
},

{
name:"Roaar",
image:"Roaar.jpg",
hp:10,
damage:5,
speed:3,
active:"Clout",
effect:"Deal 70 damage and gain an Extra Turn",
passive:"None",
charge:6
},

{
name:"Longg",
image:"Longg.jpg",
hp:20,
damage:4,
speed:3,
active:"Elemental Burst",
effect:"Deal 45 damage, Heal 10 HP, Deal 10 True Damage and gain Double Attack",
passive:"None",
charge:2
},

{
name:"Kaalki",
image:"Kaalki.jpg",
hp:20,
damage:2,
speed:5,
active:"Voyage",
effect:"Deal 40 damage, Break Shield and gain Dodge",
passive:"Dodge the next incoming attack",
charge:4
},

{
name:"Fluff",
image:"Fluff.jpg",
hp:15,
damage:2,
speed:5,
active:"Burrow",
effect:"Deal 30 damage and and immediately restore every kwami",
passive:"None",
charge:2
},

{
name:"Sass",
image:"Sass.jpg",
hp:20,
damage:2,
speed:2,
active:"Second Chance",
effect:"Deal 30 damage, Undo Last Damage and Reset Ally Cooldowns",
passive:"None",
charge:4
},

{
name:"Daizzi",
image:"Daizzi.jpg",
hp:25,
damage:2,
speed:3,
active:"Jubilation",
effect:"Heal 50 HP",
passive:"Reduce incoming damage by 40",
charge:5
},

{
name:"Mullo",
image:"Mullo.jpg",
hp:15,
damage:4,
speed:4,
active:"Multitude",
effect:"Deal 30 damage and your next attack hits twice",
passive:"None",
charge:2
},

{
name:"Nuroo",
image:"Nuroo.jpg",
hp:15,
damage:3,
speed:3,
active:"Akumatize",
effect:"Deal 40 damage, gain +40 Damage and Regenerate 10 HP for 2 turns",
passive:"None",
charge:4
},

{
name:"Orikko",
image:"Orikko.jpg",
hp:20,
damage:2,
speed:3,
active:"Sublimation",
effect:"Randomly gain Healing, Damage Buff, Shield, Dodge or Cooldown Reduction",
passive:"None",
charge:4
},

{
name:"Stomp",
image:"Stomp.jpg",
hp:40,
damage:0,
speed:1,
active:"Resistance",
effect:"Deal 30 damage, gain 30 Shield, Immunity and an Extra Turn",
passive:"None",
charge:6
},

{
name:"Tussoo",
image:"Tussoo.jpg",
hp:30,
damage:2,
speed:2,
active:"Senti monster",
effect:"Heal 10 HP and deal 60 damage",
passive:"Heal 10 HP every 2 turns",
charge:4
},

{
name:"Xuppu",
image:"Xuppu.jpg",
hp:15,
damage:3,
speed:4,
active:"Uproar",
effect:"Deal 60 damage and Disable Enemy Passive",
passive:"None",
charge:4
},

{
name:"Ziggy",
image:"Ziggy.jpg",
hp:25,
damage:2,
speed:2,
active:"Genesis",
effect:"Boost the next Ability",
passive:"None",
charge:3
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

const draftOrder = [
"p1",
"p2",
"p2",
"p1",
"p1",
"p2"
];

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
            turnText.innerHTML="❌ PLAYER 1 BANNING";

        }else{

            player2Title.classList.add("active");
            turnText.innerHTML="❌ PLAYER 2 BANNING";

        }

        pickInfo.innerHTML="Ban "+(turn+1)+" of 2";
        return;

    }

    if(draftOrder[turn]=="p1"){

        player1Title.classList.add("active");
        turnText.innerHTML="✨ PLAYER 1 SELECTING ✨";

    }else{

        player2Title.classList.add("active");
        turnText.innerHTML="✨ PLAYER 2 SELECTING ✨";

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

    updateSlots();

    turn++;

    if(turn>=draftOrder.length){

        localStorage.setItem("player1",JSON.stringify(player1Team));
        localStorage.setItem("player2",JSON.stringify(player2Team));

        window.location.href="battle.html";

        return;

    }

    updateTurnUI();

}

updateTurnUI();



function updateSlots(){

    player1Team.forEach((kwami,index)=>{

        p1Slots[index].innerHTML =
        `<img src="${kwami.image}">`;

    });

    player2Team.forEach((kwami,index)=>{

        p2Slots[index].innerHTML =
        `<img src="${kwami.image}">`;

    });

}

updateTurnUI();
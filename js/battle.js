const player1Team = JSON.parse(localStorage.getItem("player1")) || [];
const player2Team = JSON.parse(localStorage.getItem("player2")) || [];

// Give every selected kwami a current cooldown
player1Team.forEach(kwami => kwami.cooldown = 0);
player2Team.forEach(kwami => kwami.cooldown = 0);

const p1Div = document.getElementById("player1Kwamis");
const p2Div = document.getElementById("player2Kwamis");
const p1Health = document.getElementById("player1HP");
const p2Health = document.getElementById("player2HP");
const p1ShieldText = document.getElementById("player1Shield");
const p2ShieldText = document.getElementById("player2Shield");
const log = document.getElementById("log");

// Player 1 selected hero
// ===============================
// Hero Selection
// ===============================

// Player's selected hero
const selectedHero =
parseInt(localStorage.getItem("selectedHero")) || 0;

// Total heroes available
const TOTAL_HEROES = heroes.length;

// Choose a random opponent (cannot be the same hero)
let enemyHero;

do{

    enemyHero = Math.floor(Math.random() * TOTAL_HEROES);

}while(enemyHero === selectedHero);

// Hero objects
const player1Hero = heroes[selectedHero];
const player2Hero = heroes[enemyHero];

const playerName =
localStorage.getItem("playerName") || "Player";

document.getElementById("player1Name").textContent =
playerName;

document.getElementById("player2Name").textContent =
player2Hero.name;

// Load hero images
document.getElementById("player1Sprite").src = player1Hero.image;
document.getElementById("player2Sprite").src = player2Hero.image;

console.log("Player Hero:", player1Hero.name);
console.log("Enemy Hero:", player2Hero.name);


const attackButton = document.getElementById("normalAttack");
const turnDisplay = document.getElementById("turnDisplay");
const abilityPanel = document.getElementById("abilityPanel");

const victoryScreen = document.getElementById("victoryScreen");
const winnerText = document.getElementById("winnerText");
const continueBtn = document.getElementById("continueBtn");



// UI Setup
player1Team.forEach(kwami => {
    const img = document.createElement("img");
    img.src = kwami.image;
    img.className = "kwamiIcon";
    p1Div.appendChild(img);
});

player2Team.forEach(kwami => {
    const img = document.createElement("img");
    img.src = kwami.image;
    img.className = "kwamiIcon";
    p2Div.appendChild(img);
});

// Stats Setup
let player1HP = 200;
let player2HP = 200;

let player1Damage = 0;
let player2Damage = 0;

let player1Speed = 0;
let player2Speed = 0;

let player1DragonRider = false;
let player2DragonRider = false;

let player1IgnoreShield = false;
let player2IgnoreShield = false;

let player1CreationDestruction = false;
let player2CreationDestruction = false;

let player1FirstTurn = true;
let player2FirstTurn = true;

let player1Guardian = false;
let player2Guardian = false;

let player1ChaosIllusion = false;
let player2ChaosIllusion = false;

let player1LifeExchange = false;
let player2LifeExchange = false;

let player1FirstTurnTaken = false;
let player2FirstTurnTaken = false;

let player1TimeLoop = false;
let player2TimeLoop = false;

// Luck System
let defaultMissChance = 5;      // everyone has 5% dodge
let globalLuckBonus = 0;         // increased by Ziggy

let actionLocked = false;
let lastAbilityUsed = null;

let startMessage = "";

player1Team.forEach(kwami => {

    player1HP += kwami.hp;
    player1Damage += kwami.damage;
    player1Speed += kwami.speed;

});

if(
    player1Team.some(k => k.name == "Longg") &&
    player1Team.some(k => k.name == "Kaalki")
){
    player1DragonRider = true;
}

player2Team.forEach(kwami => {

    player2HP += kwami.hp;
    player2Damage += kwami.damage;
    player2Speed += kwami.speed;

});

if(
    player2Team.some(k => k.name == "Longg") &&
    player2Team.some(k => k.name == "Kaalki")
){
    player2DragonRider = true;
}



p1Health.innerHTML = "❤️ " + player1HP;
p2Health.innerHTML = "❤️ " + player2HP;
let player1MaxHP = player1HP;
let player2MaxHP = player2HP;

function updateHealthBars(){

    document.getElementById("player1HP").innerHTML =
        "❤️ " + player1HP + "/" + player1MaxHP;

    document.getElementById("player2HP").innerHTML =
        "❤️ " + player2HP + "/" + player2MaxHP;

    document.getElementById("player1HealthFill").style.width =
        (player1HP/player1MaxHP*100)+"%";

    document.getElementById("player2HealthFill").style.width =
        (player2HP/player2MaxHP*100)+"%";

}



function updateStatusEffects(){

    let p1 = "";
    let p2 = "";

    if(player1Shield>0) p1+="🛡️ ";
    if(player1RegenTurns>0) p1+="💚 ";
    if(player1DamageBuff>0) p1+="⚔️ ";
    if(player1DamageReduction>0) p1+="🪨 ";
    if(player1Frozen) p1+="❄️ ";
    if(player1Stunned) p1+="⚡ ";
    if(player1Dodge) p1+="👻 ";
    if(player1Immune) p1+="✨ ";
    if(player1AbilityBoost) p1+="⭐ ";
    if(player1PassiveDisabled) p1+="☠️ ";

    if(player2Shield>0) p2+="🛡️ ";
    if(player2RegenTurns>0) p2+="💚 ";
    if(player2DamageBuff>0) p2+="⚔️ ";
    if(player2DamageReduction>0) p2+="🪨 ";
    if(player2Frozen) p2+="❄️ ";
    if(player2Stunned) p2+="⚡ ";
    if(player2Dodge) p2+="👻 ";
    if(player2Immune) p2+="✨ ";
    if(player2AbilityBoost) p2+="⭐ ";
    if(player2PassiveDisabled) p2+="☠️ ";

    document.getElementById("player1Status").innerHTML = p1;
    document.getElementById("player2Status").innerHTML = p2;
}

updateHealthBars();

// --- GAME STATE VARIABLES ---
let currentTurn;
let extraTurn = false;

let player1Shield = 0;
let player2Shield = 0;
let player1Stunned = false;
let player2Stunned = false;
let player1Dodge = false;
let player2Dodge = false;
let doubleAttack = false;
let player1Immune = false;
let player2Immune = false;
let player1DamageBuff = 0;
let player2DamageBuff = 0;
let player1DamageReduction = 0;
let player2DamageReduction = 0;
let player1PassiveDisabled = false;
let player2PassiveDisabled = false;

// NEW VARIABLES for missing functions
let player1Frozen = false;
let player2Frozen = false;
let player1PreviousHP = player1HP;
let player2PreviousHP = player2HP;
let player1RegenAmount = 0, player1RegenTurns = 0;
let player2RegenAmount = 0, player2RegenTurns = 0;
let player1AbilityBoost = false;
let player2AbilityBoost = false;

let currentPlayer;
let enemyPlayer;

// ==========================
// RANDOM BATTLE MUSIC
// ==========================
const victoryMusic = document.getElementById("victoryMusic");
const battleMusic = document.getElementById("battleMusic");
const victorySound = new Audio("../sounds/Victory.mp3");
victorySound.volume = 1;
const battleTracks = [
    "../sounds/Miraculous-Battle-theme.wav",
    "../sounds/Miraculous-Battle-theme2.wav"
];

// Pick one randomly
const randomTrack = battleTracks[Math.floor(Math.random() * battleTracks.length)];

battleMusic.src = randomTrack;
battleMusic.volume = 0.6;
battleMusic.currentTime = 0;

// Start from the beginning every battle
battleMusic.play().catch(() => {});


function isCritical(attacker){

    let chance = attacker.luck + globalLuckBonus;

    return Math.random() * 100 < chance;

}

function attackMissed(){

    return Math.random() * 100 < defaultMissChance;

}

function activateSynergies(){

    // Decide who starts

    if(
        player1Team.some(k => k.name === "Longg") &&
        player1Team.some(k => k.name === "Kaalki")
    ){
        currentTurn = 1;
        addLog(`🐉 Dragon Rider activated! ${playerName} attacks first. `);
    }
    else if(
        player2Team.some(k => k.name === "Longg") &&
        player2Team.some(k => k.name === "Kaalki")
    ){
        currentTurn = 2;
        addLog(`🐉 Dragon Rider activated! ${player2Hero.name} attacks first.1`);
    }
    else if(player1Speed > player2Speed){
        currentTurn = 1;
    }
    else if(player2Speed > player1Speed){
        currentTurn = 2;
    }
    else{
        currentTurn = Math.random() < 0.5 ? 1 : 2;
    }



    // Creation & Destruction
if(
    player1Team.some(k => k.name === "Tikki") &&
    player1Team.some(k => k.name === "Plagg")
){
    player1CreationDestruction = true;

    player1HP += 20;
    player1MaxHP += 20;

    addLog(`🐞 Creation & Destruction activated! for ${playerName}`);
}

if(
    player2Team.some(k => k.name === "Tikki") &&
    player2Team.some(k => k.name === "Plagg")
){
    player2CreationDestruction = true;

    player2HP += 20;
    player2MaxHP += 20;

    addLog(`🐞 Creation & Destruction activated! for ${player2Hero.name}`);
}

// Guardian
if(
    player1Team.some(k => k.name === "Wayz") &&
    player1Team.some(k => k.name === "Stomp")
){
    player1Shield += 30;
    p1ShieldText.innerHTML = "🛡 " + player1Shield;
    addLog(`🛡 Guardian activated! ${playerName} starts with 30 Shield.`);
}

if(
    player2Team.some(k => k.name === "Wayz") &&
    player2Team.some(k => k.name === "Stomp")
){
    player2Shield += 30;
    p2ShieldText.innerHTML = "🛡 " + player2Shield;
    addLog(`🛡 Guardian activated! ${player2Hero.name} starts with 30 Shield.`);
}


// Chaos Illusion
if(
    player1Team.some(k => k.name === "Trics") &&
    player1Team.some(k => k.name === "Nuroo")
){
    player1ChaosIllusion = true;
    addLog(`🎭 Chaos Illusion activated! ${playerName} ignores shields.`);
}

if(
    player2Team.some(k => k.name === "Trics") &&
    player2Team.some(k => k.name === "Nuroo")
){
    player2ChaosIllusion = true;
    addLog(`🎭 Chaos Illusion activated! ${player2Hero.name} ignores shields.`);
}


//Time Loop
if(
    player1Team.some(k => k.name === "Fluff") &&
    player1Team.some(k => k.name === "Sass")
){
    player1TimeLoop = true;
    addLog("⏳ Time Loop activated! Cooldowns are reduced by 1. ");
}

if(
    player2Team.some(k => k.name === "Fluff") &&
    player2Team.some(k => k.name === "Sass")
){
    player2TimeLoop = true;
    addLog("⏳ Time Loop activated! Cooldowns are reduced by 1. ");
}

// Life Exchange
// if(
//     player1Team.some(k => k.name === "Pollen") &&
//     player1Team.some(k => k.name === "Daizzi")
// ){
//     player1LifeExchange = true;
//     addLog("💞 Life Exchange activated! Regeneration and True Damage are swapped.");
// }

// if(
//     player2Team.some(k => k.name === "Pollen") &&
//     player2Team.some(k => k.name === "Daizzi")
// ){
//     player2LifeExchange = true;
//     addLog("💞 Life Exchange activated! Regeneration and True Damage are swapped.");
// }

}
// --- CORE GAME LOOP ---

function updateTurn() {
    // Time Loop: first turn gets an extra turn

    if (currentTurn == 1) {
        turnDisplay.innerHTML = `${playerName}'s TURN`;
    } else {
        turnDisplay.innerHTML = `${player2Hero.name}'s TURN`;
    }
    createAbilityButtons();
}


function getCurrentLuck(){

    let team = currentTurn == 1 ? player1Team : player2Team;

    let highestLuck = 5 + globalLuckBonus;

    team.forEach(kwami=>{

        if(kwami.luck > highestLuck){

            highestLuck = kwami.luck;

        }

    });

    return highestLuck;

}


attackButton.addEventListener("click", async () => {

    let dmg = (currentTurn == 1) ? player1Damage : player2Damage;

    playAttackAnimation();

    // ---------- Critical & Dodge ----------

    let finalDamage = dmg;

    let luck = 5 + globalLuckBonus;
    let missChance = defaultMissChance;

    let attackerTeam = (currentTurn == 1) ? player1Team : player2Team;

    attackerTeam.forEach(kwami => {

        if(kwami.luck > luck){

            luck = kwami.luck;

        }

    });

    // Dodge
    if(Math.random() * 100 < missChance){

        addLog("💨 Attack Missed!");

    }else{

        // Critical
        if(Math.random() * 100 < luck){

            finalDamage = Math.floor(finalDamage * 1.5);

            addLog("💥 Critical Hit!");

            // Mullo Passive
            if(luck >= 50){

                extraTurn = true;

                attackerTeam.forEach(kwami => {

                    if(kwami.name == "Mullo"){

                        kwami.cooldown = 0;

                    }

                });

                addLog("🐭 Mullo is ready again!");

                updateAbilityPanel();

            }

        }

        dealDamage(finalDamage);

    }

    setTimeout(() => {

        if (checkWinConditions()) return;

        if (doubleAttack) {

            doubleAttack = false;

            addLog("⚔ Double Attack!");

            playAttackAnimation();

            setTimeout(() => {

                dealDamage(dmg);

                if (checkWinConditions()) return;

                if(extraTurn){

                    extraTurn = false;

                    addLog("🔁 Extra Turn!");

                    updateTurnDisplay();

                    return;

                }

                endTurn();

            },250);

        }else{

            updateStatusEffects();

            if(extraTurn){

                extraTurn = false;

                addLog("🔁 Extra Turn!");

                updateTurnDisplay();

                return;

            }

            endTurn();

        }

    },250);

});



continueBtn.addEventListener("click", () => {

    localStorage.setItem("musicTime", 0);

    goTo("lobby.html");

});

function checkWinConditions(){

    if(player1HP <= 0 || player2HP <= 0){

        // Disable controls
        attackButton.disabled = true;
        abilityPanel.style.pointerEvents = "none";
        document.body.style.pointerEvents = "none";

        // Stop battle music
        battleMusic.pause();
        battleMusic.currentTime = 0;

        // Play victory sound
        victorySound.currentTime = 0;
        victorySound.play();

        // Player's custom name
        const playerName =
        localStorage.getItem("playerName") || "Player";

        // Winner
        if(player1HP <= 0){

            winnerText.innerHTML =
            `🏆 ${player2Hero.name.toUpperCase()} WINS!`;

        }else{

            winnerText.innerHTML =
            `🏆 ${playerName.toUpperCase()} WINS!`;

        }

        // Show victory screen after a short delay
        setTimeout(()=>{

            document.body.style.pointerEvents = "auto";

            victoryScreen.style.display = "flex";

            setTimeout(()=>{

                victoryScreen.classList.add("show");

            },20);

        },1200);

        return true;

    }

    return false;

}

// --- ABILITIES & COMBAT ---

function createAbilityButtons() {
    abilityPanel.innerHTML = "";
    let currentTeam = (currentTurn == 1) ? player1Team : player2Team;

    currentTeam.forEach(kwami => {
        const button = document.createElement("button");
        button.className = "abilityButton";

        if (kwami.cooldown == 0) {
            button.innerHTML = `${kwami.name} • ${kwami.active} ✅`;
        } else {
            button.innerHTML = `${kwami.name} • ${kwami.active} (${kwami.cooldown})`;
        }

        button.addEventListener("click", () => {
            useAbility(kwami);
        });

        abilityPanel.appendChild(button);
    });
}

function animatedDamage(amount){

    playAttackAnimation();

    setTimeout(()=>{

        dealDamage(amount);

        if(checkWinConditions()) return;

    },250);

}

function criticalAbility(kwami, damage){

    // Dodge (5%)
    if(Math.random()*100 < defaultMissChance){

        addLog("💨 Attack Missed!");
        return false;

    }

    let finalDamage = damage;

    // Critical
    if(Math.random()*100 < (kwami.luck + globalLuckBonus)){

        finalDamage = Math.floor(finalDamage * 1.5);

        addLog("💥 Critical Hit!");

        // Mullo Passive
        if(kwami.name=="Mullo"){

            kwami.cooldown = 0;

            extraTurn = true;

            addLog("🐭 Multitude recharged!");

        }

    }

    playAttackAnimation();
    dealDamage(finalDamage);

    return true;
}

function executeAbility(kwami){

    switch(kwami.name){

        case "Tikki":
            heal(40);
            criticalAbility(kwami,30);
            addLog("✨ Tikki used Lucky Charm!");
            break;

        case "Plagg":
            breakShield();
            updateStatusEffects();
            criticalAbility(kwami,80);
            addLog("💥 Plagg used Cataclysm!");
            break;

        case "Wayz":
            criticalAbility(kwami,35);
            giveShield(30);
            giveDamageReduction(10);
            updateStatusEffects();
            extraTurn = true;
            addLog("🛡 Wayz used Shell-ter!");
            break;

        // ...continue moving every case here...
    }

}

function useAbility(kwami) {

    // ===============================
// Bark using copied ability
// ===============================



    if (kwami.cooldown > 0) {
        alert("Ability is on cooldown!");
        return;
    }

    if(kwami.name=="Bark"){

    if(!kwami.hasFetched){

        if(lastAbilityUsed){

            kwami.copiedAbility =
            JSON.parse(JSON.stringify(lastAbilityUsed));

            kwami.hasFetched = true;

            addLog(`🐶 Bark fetched ${kwami.copiedAbility.active}!`);

        }
        else{

            criticalAbility(kwami,20);

            addLog("🐶 Bark found nothing!");

        }

    }

    else{

        executeAbility(kwami.copiedAbility);

    }

}

    let cooldown = kwami.charge;

    if(currentTurn == 1 && player1TimeLoop) cooldown--;
    if(currentTurn == 2 && player2TimeLoop) cooldown--;

    kwami.cooldown = Math.max(1, cooldown);
    
    // ===============================
// Bark - Fetch
// ===============================

if(kwami.name === "Bark"){

    // Bark has already copied an ability
    if(kwami.hasFetched){

        kwami.name = kwami.copiedAbility.name;
        

    }

}

// Bark has already copied someone
if(kwami.originalName !== "Bark"){
    lastAbilityUsed = JSON.parse(JSON.stringify(kwami));
}
    switch (kwami.name) {

        case "Tikki":
            heal(40);
            criticalAbility(kwami,30);
            addLog("✨ Tikki used Lucky Charm!");
            break;

        case "Plagg":
            breakShield();
            updateStatusEffects();
            criticalAbility(kwami,80);
            addLog("💥 Plagg used Cataclysm!");
            break;

        case "Wayz":
            criticalAbility(kwami,35);
            giveShield(30);
            updateStatusEffects();
            giveDamageReduction(10);
            updateStatusEffects();
            extraTurn = true;
            addLog("🛡 Wayz used Shell-ter!");
            break;

        case "Trics":
            criticalAbility(kwami,40);
            heal(10);
            extraTurn = true;
            addLog("🦊 Trics used Mirage!");
            break;

        case "Pollen":
            criticalAbility(kwami,30);
            stunEnemy();
            updateStatusEffects();
            addLog("🐝 Pollen used Venom!");
            break;

        case "Roaar":
            criticalAbility(kwami,70);
            extraTurn = true;
            addLog("🦁 Roaar used Clout!");
            break;

        case "Longg":
            criticalAbility(kwami,45);
            heal(10);
            giveDoubleAttack();
            dealTrueDamage(10);
            updateStatusEffects();
            addLog("🐉 Longg used Elemental Burst!");
            break;

        case "Kaalki":
            giveDodge();
            criticalAbility(kwami,40);
            breakShield();
            updateStatusEffects();
            addLog("🐎 Kaalki used Voyage!");
            break;

        case "Fluff":
            criticalAbility(kwami,40);
            reduceCooldowns(10);
            updateStatusEffects();
            addLog("🐇 Fluff used Burrow!");
            break;

        case "Sass":
            criticalAbility(kwami,20);
            reduceCooldowns(1);
            updateStatusEffects();
            extraTurn = true;
            addLog("🐍 Sass used Second Chance!");
            break;

        case "Daizzi":
            heal(50);
            addLog("🐷 Daizzi used Jubilation!");
            break;

        case "Mullo":
            criticalAbility(kwami,25);
            giveDoubleAttack();
            updateStatusEffects();
            addLog("🐭 Mullo used Multitude!");
            break;

        case "Nuroo":
            criticalAbility(kwami,40);
            giveDamageBuff(40);
            giveRegeneration(10,2);
            updateStatusEffects();
            addLog("🦋 Nuroo used Akumatize!");
            break;

        case "Orikko":
            const randomBuff = Math.floor(Math.random()*5);

            if(randomBuff===0){
                heal(40);
                addLog("🪽 Orikko granted Healing!");
            }
            else if(randomBuff===1){
                giveDamageBuff(50);
                updateStatusEffects();
                addLog("🪽 Orikko granted Strength!");
            }
            else if(randomBuff===2){
                giveShield(50);
                updateStatusEffects();
                addLog("🪽 Orikko granted Protection!");
            }
            else if(randomBuff===3){
                giveDodge();
                updateStatusEffects();
                addLog("🪽 Orikko granted Agility!");
            }
            else{
                reduceCooldowns(0);
                updateStatusEffects();
                addLog("🪽 Orikko granted Wisdom!");
            }
            break;

        case "Stomp":
            giveImmunity();
            updateStatusEffects();
            giveShield(10);
            extraTurn = true;
            criticalAbility(kwami,30);
            addLog("🐂 Stomp used Resistance!");
            break;

        case "Tussoo":
            heal(10);
            criticalAbility(kwami,60);
            addLog("🐖 Tussoo used Genesis Feast!");
            break;

        case "Xuppu":
            criticalAbility(kwami,60);
            disableEnemyPassive();
            updateStatusEffects();
            addLog("🐵 Xuppu used Uproar!");
            break;

        case "Ziggy":
            globalLuckBonus = 20;
            boostNextAbility();
            updateStatusEffects();
            addLog("🐐 Ziggy used Genesis!");
            break;
        }

        

    

    

    lastAbilityUsed = JSON.parse(JSON.stringify(kwami));
    if(checkWinConditions()) return;

    endTurn();
}
// --- NEW/MISSING FUNCTIONS ---

function freezeEnemy() {
    if (currentTurn == 1) player2Frozen = true;
    else player1Frozen = true;
}

function undoLastDamage() {

    if(currentTurn == 1){

        if(player1PreviousHP > player1HP){

            const recovered = player1PreviousHP - player1HP;

            player1HP = player1PreviousHP;

            updateHealthBars();

            addLog("⏪ Player 1 recovered " + recovered + " HP!");

        }
        else{

            addLog("⏪ Nothing to undo!");

        }

    }

    else{

        if(player2PreviousHP > player2HP){

            const recovered = player2PreviousHP - player2HP;

            player2HP = player2PreviousHP;

            updateHealthBars();

            addLog("⏪ Player 2 recovered " + recovered + " HP!");

        }
        else{

            addLog("⏪ Nothing to undo!");

        }

    }

}

function reduceCooldowns(amount) {
    let currentTeam = (currentTurn == 1) ? player1Team : player2Team;
    currentTeam.forEach(kwami => {
        if (kwami.cooldown > 0) {
            kwami.cooldown = Math.max(0, kwami.cooldown - amount);
        }
    });
}

function giveRegeneration(amount, turns) {

    if (currentTurn == 1) {

        player1RegenAmount = amount;
        player1RegenTurns = turns;

    } else {

        player2RegenAmount = amount;
        player2RegenTurns = turns;

    }

}

function disableEnemyPassive() {
    if (currentTurn == 1) player2PassiveDisabled = true;
    else player1PassiveDisabled = true;
}

function boostNextAbility() {
    if (currentTurn == 1) player1AbilityBoost = true;
    else player2AbilityBoost = true;
}

function wait(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}
// --- UTILITY/COMBAT FUNCTIONS ---

function dealDamage(amount) {
    // =======================
// MISS CHANCE
// =======================



    // Creation & Destruction
    if(currentTurn == 1 && player1CreationDestruction && player1FirstTurn){
        amount += 20;
        player1FirstTurn = false;
    }

    if(currentTurn == 2 && player2CreationDestruction && player2FirstTurn){
        amount += 20;
        player2FirstTurn = false;
    }

    // Ziggy Ability Boost
    if(currentTurn == 1 && player1AbilityBoost){
        amount = Math.floor(amount * 1.5);
        player1AbilityBoost = false;
    }
    else if(currentTurn == 2 && player2AbilityBoost){
        amount = Math.floor(amount * 1.5);
        player2AbilityBoost = false;
    }

    // =======================
// CRITICAL HIT
// =======================


    // Dodge & Immunity
    if(currentTurn == 1){

        if(player2Dodge){
            player2Dodge = false;
            addLog(`💨 ${player2Hero.name} dodged!`);
            return;
        }

        if(player2Immune){
            player2Immune = false;
            addLog(`✨ ${player2Hero.name} Player 2 is immune!`);
            return;
        }

    }else{

        if(player1Dodge){
            player1Dodge = false;
            addLog(`💨 ${playerName} dodged!`);
            return;
        }

        if(player1Immune){
            player1Immune = false;
            addLog(`✨ ${playerName} is immune!`);
            return;
        }

    }

    // =========================
    // PLAYER 1 ATTACKS
    // =========================
    if(currentTurn == 1){

        amount = Math.max(0, amount + player1DamageBuff - player2DamageReduction);

        

        if(!player1ChaosIllusion){

            if(player2Shield > 0){

                if(player2Shield >= amount){

                    player2Shield -= amount;
                    amount = 0;

                }else{

                    amount -= player2Shield;
                    player2Shield = 0;

                }

                p2ShieldText.innerHTML = "🛡 " + player2Shield;
            }

        }

        player2HP = Math.max(0, player2HP - amount);

        showFloatingText(
            "-" + amount,
            "#ff4444",
            document.getElementById("player2Effects")
        );

    }

    // =========================
    // PLAYER 2 ATTACKS
    // =========================
    else{

        amount = Math.max(0, amount + player2DamageBuff - player1DamageReduction);

        addLog("Damage = " + amount + " | Shield = " + player1Shield);

        if(!player2ChaosIllusion){

            if(player1Shield > 0){

                if(player1Shield >= amount){

                    player1Shield -= amount;
                    amount = 0;

                }else{

                    amount -= player1Shield;
                    player1Shield = 0;

                }

                p1ShieldText.innerHTML = "🛡 " + player1Shield;
            }

        }

        player1HP = Math.max(0, player1HP - amount);

        showFloatingText(
            "-" + amount,
            "#ff4444",
            document.getElementById("player1Effects")
        );

    }

    updateHealthBars();
}

function playAttackAnimation(){

    const hero =
        currentTurn == 1
        ? document.getElementById("player1Sprite")
        : document.getElementById("player2Sprite");

    hero.classList.add(
        currentTurn == 1
        ? "heroAttackRight"
        : "heroAttackLeft"
    );

    setTimeout(()=>{

        hero.classList.remove("heroAttackRight");
        hero.classList.remove("heroAttackLeft");

    },350);

}

function heal(amount) {
    if (currentTurn == 1 && player1AbilityBoost) {
        amount = Math.floor(amount * 1.5);
        player1AbilityBoost = false;
    } else if (currentTurn == 2 && player2AbilityBoost) {
        amount = Math.floor(amount * 1.5);
        player2AbilityBoost = false;
    }

    if (currentTurn == 1) {
        player1HP += amount;
        showFloatingText(
"+"+amount,
"#00ff66",
document.getElementById("player1Effects")
);
        updateHealthBars();
    } else {
        player2HP += amount;
        showFloatingText(
"+"+amount,
"#00ff66",
document.getElementById("player2Effects")
);
        updateHealthBars();
    }
}

function giveShield(amount) {
    if (currentTurn == 1) {
        player1Shield += amount;
        p1ShieldText.innerHTML = "🛡 " + player1Shield;
    } else {
        player2Shield += amount;
        p2ShieldText.innerHTML = "🛡 " + player2Shield;
    }
}

function breakShield() {
    if (currentTurn == 1) {
        player2Shield = 0;
        p2ShieldText.innerHTML = "🛡 0";
    } else {
        player1Shield = 0;
        p1ShieldText.innerHTML = "🛡 0";
    }
}

function giveDamageBuff(amount) {
    if (currentTurn == 1) player1DamageBuff += amount;
    else player2DamageBuff += amount;
}

function giveDamageReduction(amount){
    if(currentTurn==1)
        player1DamageReduction = amount;
    else
        player2DamageReduction = amount;
}

function dealTrueDamage(amount) {
// Life Exchange
// Life Exchange
if(currentTurn == 1 && player1LifeExchange){

    player1HP = Math.min(player1HP + amount, player1MaxHP);
    updateHealthBars();
    showFloatingText(
        "+"+amount,
        "#00ff66",
        document.getElementById("player1Effects")
    );
    addLog("💞 Life Exchange converted True Damage into Healing!");
    return;
}

if(currentTurn == 2 && player2LifeExchange){

    player2HP = Math.min(player2HP + amount, player2MaxHP);
    updateHealthBars();
    showFloatingText(
        "+"+amount,
        "#00ff66",
        document.getElementById("player2Effects")
    );
    addLog("💞 Life Exchange converted True Damage into Healing!");
    return;
}

    if (currentTurn == 1) {
        player2HP = Math.max(0, player2HP - amount);
        updateHealthBars();
    } else {
        player1HP = Math.max(0, player1HP - amount);
        updateHealthBars();
    }
}

function stunEnemy() {
    if (currentTurn == 1) player2Stunned = true;
    else player1Stunned = true;
}

function giveDodge() {
    if (currentTurn == 1) player1Dodge = true;
    else player2Dodge = true;
}

function giveImmunity() {
    if (currentTurn == 1) player1Immune = true;
    else player2Immune = true;
}

function giveDoubleAttack() {
    doubleAttack = true;
}

function showFloatingText(text,color,target){

    const effect=document.createElement("div");

    effect.innerHTML=text;

    effect.className="damageText";

    effect.style.color=color;

    effect.style.left=Math.random()*80+"px";

    effect.style.top=Math.random()*40+"px";

    target.appendChild(effect);

    setTimeout(()=>{

        effect.remove();

    },800);

}

// --- LOGGING SYSTEM ---

let logQueue = [];
let writing = false;

function addLog(text) {
    logQueue.push(text);
    if (!writing) showNextLog();
}

function showNextLog() {
    if (logQueue.length == 0) {
        writing = false;
        return;
    }
    writing = true;
    const text = logQueue.shift();

    setTimeout(() => {
        log.innerHTML += "<br>" + text;
        log.scrollTop = log.scrollHeight;
        showNextLog();
    }, 500);
}

// --- TURN MANAGEMENT ---

function endTurn() {
    // 1. Snapshot HP for 'Undo Last Damage' mechanic
    player1PreviousHP = player1HP;
    player2PreviousHP = player2HP;

    // 2. Reduce cooldowns for the active player's team before passing the turn
    let activeTeam = (currentTurn == 1) ? player1Team : player2Team;

activeTeam.forEach(kwami => {

    if (kwami.cooldown > 0) {
        kwami.cooldown--;
    }

});
    // 3. Process extra turns
   // 3. Process extra turns
if (extraTurn) {

    extraTurn = false;

    activatePassives();

    updateStatusEffects();

    updateTurn();

    return;

}

    // 4. Switch Turns
    // Time Loop synergy

if(currentTurn == 1){
    player1DamageBuff = 0;
    player1DamageReduction = 0;
}
else{
    player2DamageBuff = 0;
    player2DamageReduction = 0;
}
// Switch Turns
currentTurn = (currentTurn == 1) ? 2 : 1;



    // 5. Check Stuns/Freezes for the new current player
    if (currentTurn == 1 && (player1Stunned || player1Frozen)) {
        let msg = player1Stunned ? "⚡ Player 1 is stunned!" : "❄️ Player 1 is frozen!";
        player1Stunned = false; 
        player1Frozen = false;
        addLog(msg);
        
        // Decrement their cooldowns since they skipped a turn
        player1Team.forEach(k => { if(k.cooldown > 0) k.cooldown--; });
        
        currentTurn = 2; // pass back to Player 2
        updateTurn();
        return;
    }
    
    if (currentTurn == 2 && (player2Stunned || player2Frozen)) {
        let msg = player2Stunned ? "⚡ Player 2 is stunned!" : "❄️ Player 2 is frozen!";
        player2Stunned = false; 
        player2Frozen = false;
        addLog(msg);
        
        // Decrement their cooldowns since they skipped a turn
        player2Team.forEach(k => { if(k.cooldown > 0) k.cooldown--; });
        
        currentTurn = 1; // pass back to Player 1
        updateTurn();
        return;
    }
    
    activatePassives();
    
    updateTurn();
    updateStatusEffects();
}

function activatePassives() {
    // Handle Regeneration ticks
    if (currentTurn == 1 && player1RegenTurns > 0) {

    if(player1LifeExchange){
        player2HP = Math.max(0, player2HP - player1RegenAmount);
        updateHealthBars();
        showFloatingText(
            "-" + player1RegenAmount,
            "#ff4444",
            document.getElementById("player2Effects")
        );
        addLog("💞 Life Exchange dealt " + player1RegenAmount + " True Damage!");
    }
    else{
        heal(player1RegenAmount);
        addLog(`🌿 ${playerName} regenerated ${player1RegenAmount} HP!`);
    }

    updateStatusEffects();
    player1RegenTurns--;
}
    
    else if (currentTurn == 2 && player2RegenTurns > 0) {

    if(player2LifeExchange){
        player1HP = Math.max(0, player1HP - player2RegenAmount);
        updateHealthBars();
        showFloatingText(
            "-" + player2RegenAmount,
            "#ff4444",
            document.getElementById("player1Effects")
        );
        addLog("💞 Life Exchange dealt " + player2RegenAmount + " True Damage!");
    }
    else{
        heal(player2RegenAmount);
        addLog(`🌿 ${player2Hero.name} regenerated ${player2RegenAmount} HP!`);
    }

    updateStatusEffects();
    player2RegenTurns--;

}

    // Handle Disabled Passives
    if (currentTurn == 1 && player1PassiveDisabled) {
        player1PassiveDisabled = false; // Wears off after this turn
        return;
    }
    if (currentTurn == 2 && player2PassiveDisabled) {
        player2PassiveDisabled = false; // Wears off after this turn
        return;
    }

    // Trigger Kwami Passives
    let currentTeam = (currentTurn == 1) ? player1Team : player2Team;
    currentTeam.forEach(kwami => {
        switch (kwami.name) {
            case "Tikki":
                giveRegeneration(4,3);
                
                addLog("✨ Tikki passively healed 2 HP.");
                break;
            case "Plagg":
                dealTrueDamage(5);
                
                addLog("💥 Plagg passively dealt 3 True Damage.");
                break;
            case "Wayz":
                giveRegeneration(2,2);
                
                addLog("🛡 Wayz passively restored 5 HP.");
                break;
            case "Daizzi":
                giveDamageReduction(40);
                 // Keep stacking or reset? Based on your original code, it keeps adding.
                break;
            case "Tussoo":
                giveRegeneration(10,2);
                
                addLog("🍽 Tussoo passively healed 3 HP.");
                break;
        }
    });
    updateStatusEffects();
}

// Initial Game Boot
// Initial Game Boot
// Dragon Rider synergy
activateSynergies();


updateHealthBars();
updateStatusEffects();

updateTurn();





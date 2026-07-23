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
    player1HP = Math.min(player1HP, player1MaxHP);
player2HP = Math.min(player2HP, player2MaxHP);

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

let selectedIndex = 0;
let battleButtons = [];

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
let uiLocked = false;

function lockUI(){

    uiLocked = true;

}

function unlockUI(){

    uiLocked = false;

}

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



document.addEventListener("keydown", function(e){

    // LEFT
if(e.key=="ArrowLeft"){

    if(selectedIndex % 2 == 1)
        selectedIndex--;
    else
        selectedIndex++;

}

// RIGHT
else if(e.key=="ArrowRight"){

    if(selectedIndex % 2 == 0)
        selectedIndex++;
    else
        selectedIndex--;

}

// UP
else if(e.key=="ArrowUp"){

    if(selectedIndex >= 2)
        selectedIndex -= 2;
    else
        selectedIndex += 2;

}

// DOWN
else if(e.key=="ArrowDown"){

    if(selectedIndex <= 1)
        selectedIndex += 2;
    else
        selectedIndex -= 2;

}

if(selectedIndex >= battleButtons.length)
    selectedIndex = battleButtons.length - 1;



    // Enter
    else if(e.key == "Enter"){

    if(selectedIndex == 0){

        normalAttack();

    }else{

        let currentTeam =
            currentTurn == 1 ? player1Team : player2Team;

        let kwami = currentTeam[selectedIndex - 1];

        if(kwami.cooldown == 0){

            useAbility(kwami);

        }

    }

    return;

}

    updateSelection();

});





attackButton.addEventListener("click", () => {

    if(currentTurn != 1)
        return;

    normalAttack();

});





attackButton.style.pointerEvents = "none";

function normalAttack(){

// Only the human player can select during their turn.
if(actionLocked)
        return;

    if(currentTurn == 1 && uiLocked)
        return;

actionLocked = true;


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

}




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

        if(kwami.cooldown==0){

    button.innerHTML = `
        <div>${kwami.name}</div>
        <div>${kwami.active} <span class="ready">✅</span></div>
    `;

}
else{

    button.innerHTML = `
        <div>${kwami.name}</div>
        <div>${kwami.active} (${kwami.cooldown})</div>
    `;

}

        button.style.pointerEvents = "none";

        abilityPanel.appendChild(button);
    });

    battleButtons = [
    document.getElementById("normalAttack"),
    ...document.querySelectorAll(".abilityButton")
];

selectedIndex = 0;

updateSelection();
}

function updateSelection(){

    battleButtons.forEach(btn=>{

        btn.classList.remove("selectedMove");

    });

    if(battleButtons.length>0){

        battleButtons[selectedIndex].classList.add("selectedMove");

    }

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


// --- NEW/MISSING FUNCTIONS ---


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

const logBox = document.getElementById("battleLog");

let logQueue = [];
let typing = false;

function addLog(text, callback = null){

    logQueue.push({
        text,
        callback
    });

    if(!typing)
        processLog();

}

function processLog(){

    if(logQueue.length == 0){

        typing = false;
        return;

    }

    typing = true;

    const item = logQueue.shift();

    logBox.innerHTML = "";

    let i = 0;

    const speed = 35;

    const interval = setInterval(()=>{

        logBox.innerHTML += item.text.charAt(i);

        i++;

        if(i >= item.text.length){

            clearInterval(interval);

            setTimeout(()=>{

                if(item.callback)
                    item.callback();

                processLog();

            },800);

        }

    },speed);

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
    }, 1000);
}

// --- TURN MANAGEMENT ---

function endTurn() {

    if(uiLocked)
    return;
    try{
    console.log("=== endTurn START ===");
console.log("Current Turn Before:", currentTurn);

    // Save HP for Time Loop
    player1PreviousHP = player1HP;
    player2PreviousHP = player2HP;

    // Reduce cooldowns
    let activeTeam = (currentTurn == 1) ? player1Team : player2Team;

    activeTeam.forEach(kwami => {
        if (kwami.cooldown > 0)
            kwami.cooldown--;
    });

    // ==========================
    // EXTRA TURN
    // ==========================
    if(extraTurn){

    // Only the human player can select during their turn.


    extraTurn = false;

    activatePassives();
    updateTurn();
    updateStatusEffects();

    const mode = sessionStorage.getItem("mode");

    if(mode == "ai" && currentTurn == 2){

        setTimeout(()=>{

            BattleAI.takeTurn();

        },700);

    }

    actionLocked = false;

// Only unlock if the extra turn belongs to the player.


return;

}

    // ==========================
    // REMOVE TEMP BUFFS
    // ==========================
    if(currentTurn == 1){

        player1DamageBuff = 0;
        player1DamageReduction = 0;

    }
    else{

        player2DamageBuff = 0;
        player2DamageReduction = 0;

    }

    // ==========================
    // SWITCH TURN
    // ==========================
    currentTurn = (currentTurn == 1) ? 2 : 1;
    console.log("Turn Switched To:", currentTurn);

    // ==========================
    // STUN / FREEZE
    // ==========================

    if(currentTurn == 1 && (player1Stunned || player1Frozen)){

        addLog(player1Stunned ?
            "⚡ Player 1 is stunned!" :
            "❄️ Player 1 is frozen!"
        );

        player1Stunned = false;
        player1Frozen = false;

        player1Team.forEach(k=>{
            if(k.cooldown > 0)
                k.cooldown--;
        });

        currentTurn = 2;

    }

    else if(currentTurn == 2 && (player2Stunned || player2Frozen)){

        addLog(player2Stunned ?
            "⚡ Player 2 is stunned!" :
            "❄️ Player 2 is frozen!"
        );

        player2Stunned = false;
        player2Frozen = false;

        player2Team.forEach(k=>{
            if(k.cooldown > 0)
                k.cooldown--;
        });

        currentTurn = 1;

    }

    // ==========================
    // PASSIVES
    // ==========================

    activatePassives();

    updateTurn();
    updateStatusEffects();

    // ==========================
    // AI TURN
    // ==========================

    const mode = sessionStorage.getItem("mode");

    if(mode == "ai" && currentTurn == 2){

        setTimeout(()=>{

            BattleAI.takeTurn();

        },700);

    }

    actionLocked = false;
    console.log("=== endTurn END ===");
console.log("Final Turn:", currentTurn);

// Only unlock if the extra turn belongs to the player.




return;}

catch(err){

    console.error("END TURN ERROR:", err);

}


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
        
        addLog(`🌿 ${playerName} regenerated ${player1RegenAmount} HP!`, ()=>{
            heal(player1RegenAmount);
        });
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
                
                
                addLog("✨ Tikki passively healed 2 HP.", ()=>{
            giveRegeneration(4,3);
        });
                break;
            case "Plagg":
                dealTrueDamage(5);
                
                addLog("💥 Plagg passively dealt 3 True Damage.", ()=>{
            dealTrueDamage(5);
        });
                break;
            case "Wayz":
                
                
                addLog("🛡 Wayz passively restored 5 HP.", ()=>{
            giveRegeneration(5,2);
        });
                break;
            case "Daizzi":
                addLog("🛡 Daizzi remove the damage by 40.", ()=>{
            giveDamageReduction(10);
        });
                
                 // Keep stacking or reset? Based on your original code, it keeps adding.
                break;
            case "Tussoo":
                
                
                addLog("🍽 Tussoo passively healed 3 HP.", ()=>{
                      giveRegeneration(10,2);
                });
                break;
        }
    });
    updateStatusEffects();
}

// ==========================
// Initial Game Boot
// ==========================

activateSynergies();

updateHealthBars();
updateStatusEffects();
updateTurn();

// ==========================
// AI starts if it won first turn
// ==========================

const mode = sessionStorage.getItem("mode");

if (mode == "ai" && currentTurn == 2) {

    setTimeout(() => {

        BattleAI.takeTurn();

    }, 700);

}




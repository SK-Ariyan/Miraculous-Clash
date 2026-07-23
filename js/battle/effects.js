
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

        if(kwami.name == "Fluff")
            return;

        if(kwami.cooldown > 0){

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
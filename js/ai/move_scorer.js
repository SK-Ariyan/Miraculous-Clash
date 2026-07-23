// ==========================
// MOVE SCORER
// ==========================

const MoveScorer = {

    scoreAttack(state){

    let score = 40;

    if(KillDetector.canNormalAttackKill(state))
        score += 1000;

    if(state.enemyDodge)
        score -= 50;

    if(state.enemyImmune)
        score -= 80;

    return score;

},

    scoreAbility(state, kwami){

    let score = 0;

    score += kwami.ai.priority * 0.5;
    score += kwami.ai.aggression * 0.4;
    score += kwami.ai.support * 0.35;
    score += kwami.ai.defense * 0.35;
    score += kwami.ai.synergy * 0.25;

  



score += ComboAnalyzer.score(state, kwami);

// ------------------------
// Save low HP teammates
// ------------------------

if(
    BattleEvaluator.shouldHeal(state)
){

    if(
        kwami.name == "Tikki" ||
        kwami.name == "Daizzi"
    ){
        score += 90;
    }

}

// ------------------------
// Finishing Blow
// ------------------------

if(
    BattleEvaluator.canKill(state, kwami)
){
    score += 120;
}

// ------------------------
// Don't Waste Strong Moves
// ------------------------

if(BattleEvaluator.canKill(state, kwami)){

    const overkill =
        Math.max(0,
        kwami.damage - state.enemyHP);

    score -= overkill * 0.4;

}

// ===============================
// HP Awareness
// ===============================

console.log(state);



// Healers become valuable when low HP
if(state.myHP <= 25){

    if(
        kwami.name == "Tikki" ||
        kwami.name == "Daizzi" ||
        kwami.name == "Tussoo"
    ){
        score += 80;
    }

}


// Defensive kwamis become valuable
if(state.myHP <= 20){

    if(
        kwami.name == "Wayz" ||
        kwami.name == "Stomp"
    ){
        score += 70;
    }

}

// ===============================
// Kill Detection
// ===============================

let estimatedDamage = kwami.damage;





// ===============================
// Threat Analysis
// ===============================

let enemyBestDamage = 0;

for(const enemyKwami of state.enemyTeam){

    // Skip dead kwamis
    if(enemyKwami.hp <= 0) continue;

    // Skip abilities on cooldown
    if(enemyKwami.cooldown > 0) continue;

    let damage = enemyKwami.damage;

    switch(enemyKwami.name){

        case "Roaar":
            damage = 50;
            break;

        case "Plagg":
            damage = 80;
            break;

        case "Longg":
            damage = 45;
            break;

        case "Kaalki":
            damage = 40;
            break;

        case "Tussoo":
            damage = 60;
            break;

        case "Xuppu":
            damage = 60;
            break;

    }

    enemyBestDamage = Math.max(enemyBestDamage, damage);

}

// Can the enemy almost kill us?
if(state.myHP <= enemyBestDamage){

    if(
        kwami.name == "Wayz" ||
        kwami.name == "Stomp" ||
        kwami.name == "Daizzi" ||
        kwami.name == "Tikki"
    ){

        score += 180;

    }

}

// ===============================
// Extra Turn Value
// ===============================

if(
    kwami.name == "Roaar" ||
    kwami.name == "Wayz" ||
    kwami.name == "Trics" ||
    kwami.name == "Stomp" ||
    kwami.name == "Daizzi" ||
    kwami.name == "Sass"
){

    score += 120;

}

// ===============================
// Shield Break Priority
// ===============================

if(state.enemyShield > 0){

    if(
        kwami.name == "Plagg" ||
        kwami.name == "Kaalki"
    ){
        score += 140;
    }

    // Ordinary attacks lose value against shields.
    else{
        score -= Math.min(80, state.enemyShield * 0.4);
    }

}

// ===============================
// Cooldown Intelligence
// ===============================

let importantCooldowns = 0;

for(const ally of state.myTeam){

    if(ally.cooldown <= 0)
        continue;

    switch(ally.name){

        case "Roaar":
        case "Plagg":
        case "Longg":
        case "Tussoo":
        case "Xuppu":
            importantCooldowns++;
            break;

    }

}

// Fluff becomes smarter
if(kwami.name == "Fluff"){

    score += importantCooldowns * 80;

}

// Sass becomes smarter
if(kwami.name == "Sass"){

    score += importantCooldowns * 60;

}

// ===============================
// Healing Intelligence
// ===============================

const myHealthPercent = (state.myHP / 300) * 100;

// Strong healers
if(
    kwami.name == "Daizzi" ||
    kwami.name == "Tikki"
){

    if(myHealthPercent <= 25){

        // Emergency heal
        score += 220;

    }
    else if(myHealthPercent <= 50){

        // Good time to heal
        score += 120;

    }
    else if(myHealthPercent <= 75){

        // Slight value
        score += 30;

    }
    else{

        // Don't waste heals
        score -= 120;

    }

}

// ===============================
// Survival Intelligence
// ===============================



// If the strongest enemy can kill us...
if(state.myHP <= state.enemyHighestDamage){

    // Defensive heroes become much smarter.
    if(
        kwami.name == "Wayz" ||
        kwami.name == "Stomp"
    ){
        score += 220;
    }

    if(
        kwami.name == "Kaalki"
    ){
        score += 170;
    }

    if(
        kwami.name == "Daizzi" ||
        kwami.name == "Tikki"
    ){
        score += 180;
    }

}

// ===============================
// Synergy Intelligence
// ===============================

if(kwami.synergy){

    const partnerAlive = state.myTeam.some(k =>
        k.name === kwami.synergy.partner &&
        k.hp > 0
    );

    if(partnerAlive){

        score += 100;

    }

}

// ===============================
// Counter Intelligence
// ===============================

// Enemy has shield
if(state.enemyShield > 0){

    if(kwami.name == "Plagg" || kwami.name == "Kaalki"){
        score += 180;
    }

}

// Enemy has passive
if(state.enemyHasPassive){

    if(kwami.name == "Xuppu"){
        score += 170;
    }

}

// Enemy can act next turn and deals lots of damage
if(state.enemyHighestDamage >= 45){

    if(kwami.name == "Pollen"){
        score += 160;
    }

}

// Enemy is almost dead
if(state.enemyHP <= 40){

    if(
        kwami.name == "Roaar" ||
        kwami.name == "Plagg" ||
        kwami.name == "Tussoo"
    ){
        score += 120;
    }

}

const predictedThreat =
    BattleEvaluator.predictEnemyNextMove(state);

if(predictedThreat >= 180){

    if(
        kwami.name == "Wayz" ||
        kwami.name == "Stomp" ||
        kwami.name == "Kaalki"
    ){
        score += 120;
    }

}

// ===============================
// Predict Enemy's Next Move
// ===============================



// Enemy is likely to use a powerful move next turn
if(predictedThreat >= 180){

    // Defensive heroes become more valuable
    if(
        kwami.name == "Wayz" ||
        kwami.name == "Stomp"
    ){
        score += 120;
    }

    // Dodge is also valuable
    if(
        kwami.name == "Kaalki"
    ){
        score += 90;
    }

}

score += HeroBrains.score(state, kwami);

// ===============================
// Focus dangerous enemies
// ===============================

if(state.enemyPriority){

    if(state.enemyPriority.hp <= 100){

        score += 70;

    }

}

score += ComboPlanner.score(state, kwami);

    return score;

},

bestMove(state){

    let bestMove = {
        type: "attack",
        score: this.scoreAttack(state)
    };

    state.myTeam.forEach(kwami=>{

        // Skip abilities on cooldown
        if(kwami.cooldown > 0)
            return;

        let score = this.scoreAbility(state, kwami);

        if(score > bestMove.score){

            bestMove = {
                type: "ability",
                kwami: kwami,
                score: score
            };

        }

    });

    return bestMove;

}

};
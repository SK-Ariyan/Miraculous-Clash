// ==========================
// BATTLE EVALUATOR
// ==========================

const BattleEvaluator = {

    scoreAbility(kwami){

    },

    scoreAttack(){

    },

    canKill(state, kwami){

    let estimatedDamage = kwami.damage;

    // If the ability has a known stronger damage value,
    // use it instead of the basic attack damage.
    switch(kwami.name){

        case "Plagg":
            estimatedDamage = 80;
            break;

        case "Roaar":
            estimatedDamage = 50;
            break;

        case "Tussoo":
            estimatedDamage = 60;
            break;

        case "Longg":
            estimatedDamage = 55; // 45 + 10 true damage
            break;

        case "Pollen":
            estimatedDamage = 35;
            break;

        case "Wayz":
            estimatedDamage = 30;
            break;

        case "Kaalki":
            estimatedDamage = 40;
            break;

        case "Trics":
            estimatedDamage = 40;
            break;

        case "Fluff":
            estimatedDamage = 40;
            break;

        case "Nuroo":
            estimatedDamage = 40;
            break;

        case "Stomp":
            estimatedDamage = 30;
            break;

        case "Mullo":
            estimatedDamage = 25;
            break;

        case "Tikki":
            estimatedDamage = 35;
            break;

        case "Xuppu":
            estimatedDamage = 60;
            break;

    }

    // Shield absorbs damage first
    const effectiveHP = state.enemyHP + state.enemyShield;

    return estimatedDamage >= effectiveHP;

},

    shouldHeal(state){

    const lowTeammate = state.myTeam.find(k =>
        k.hp > 0 &&
        k.hp <= 35
    );

    return lowTeammate != null;

},

    shouldSetup(){

    },

    predictEnemyNextMove(state){

    let highest = 0;

    for(const enemy of state.enemyTeam){

        if(enemy.hp <= 0) continue;
        if(enemy.cooldown > 0) continue;

        let score = enemy.ai.priority;

        score += enemy.ai.aggression;

        if(enemy.ai.support > 80 && state.enemyHP < 120)
            score += 60;

        if(score > highest)
            highest = score;

    }

    return highest;

},

    shouldBait(){

    }

};
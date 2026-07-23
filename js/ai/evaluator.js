// ==========================
// EVALUATOR
// ==========================

const Evaluator = {

    score(kwami, personality){

        let score = 0;

        const ai = kwami.ai;

        if(!ai)
            return 0;

        switch(personality){

            case AI_PERSONALITIES.AGGRESSIVE:

                score += ai.priority * 0.35;
                score += ai.aggression * 0.50;
                score += ai.synergy * 0.15;

                break;

            case AI_PERSONALITIES.DEFENSIVE:

                score += ai.priority * 0.25;
                score += ai.defense * 0.45;
                score += ai.support * 0.30;

                break;

            case AI_PERSONALITIES.BALANCED:

                score += ai.priority * 0.30;
                score += ai.aggression * 0.25;
                score += ai.defense * 0.20;
                score += ai.support * 0.15;
                score += ai.synergy * 0.10;

                break;

            case AI_PERSONALITIES.SYNERGY:

                score += ai.priority * 0.20;
                score += ai.synergy * 0.60;
                score += ai.support * 0.20;

                break;

            case AI_PERSONALITIES.TRICKSTER:

                score += ai.priority * 0.40;
                score += ai.aggression * 0.30;
                score += ai.synergy * 0.30;

                break;

        }

        return score;

    },
    totalScore(kwami, team, enemyTeam){

    let score = 0;

    const needs = NeedsAnalyzer.analyze(team);

    // --------------------
    // Base AI values
    // --------------------

    score += kwami.ai.priority * 0.8;
    score += kwami.ai.aggression * 0.5;
    score += kwami.ai.support * 0.5;
    score += kwami.ai.defense * 0.5;

    // --------------------
    // Team Needs
    // --------------------

    if(needs.needPriority)
        score += kwami.ai.priority;

    if(needs.needDamage)
        score += kwami.ai.aggression;

    if(needs.needSupport)
        score += kwami.ai.support;

    if(needs.needTank)
        score += kwami.ai.defense;

    if(needs.needSpeed)
        score += kwami.speed * 8;

    // --------------------
    // Randomness
    // --------------------

    score += Math.random() * 8;

    // =========================
// Counter Pick Bonus
// =========================

if(enemyTeam){

    // Enemy has Plagg
    if(enemyTeam.some(k => k.name === "Plagg")){

        if(
            kwami.name === "Wayz" ||
            kwami.name === "Stomp"
        ){
            score += 80;
        }

    }

    // Enemy has Roaar
    if(enemyTeam.some(k => k.name === "Roaar")){

        if(
            kwami.name === "Wayz" ||
            kwami.name === "Daizzi"
        ){
            score += 60;
        }

    }

    // Enemy has Mullo
    if(enemyTeam.some(k => k.name === "Mullo")){

        if(
            kwami.name === "Pollen" ||
            kwami.name === "Plagg"
        ){
            score += 60;
        }

    }

    // Enemy has Wayz
    if(enemyTeam.some(k => k.name === "Wayz")){

        if(
            kwami.name === "Plagg" ||
            kwami.name === "Kaalki"
        ){
            score += 75;
        }

    }

    // Enemy has Daizzi
    if(enemyTeam.some(k => k.name === "Daizzi")){

        if(
            kwami.name === "Xuppu"
        ){
            score += 70;
        }

    }

}

    return score;

}

};



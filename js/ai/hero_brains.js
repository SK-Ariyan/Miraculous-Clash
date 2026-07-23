// ==========================
// HERO BRAINS
// ==========================

const HeroBrains = {

    score(state, kwami){

        switch(kwami.name){

            case "Roaar":
                return this.roaar(state);

            case "Plagg":
                return this.plagg(state);

            case "Wayz":
                return this.wayz(state);

            case "Daizzi":
                return this.daizzi(state);

            case "Mullo":
                return this.mullo(state);

            case "Fluff":
                return this.fluff(state);
            
            case "Bark":
                return this.bark(state);

            default:
                return 0;

        }

    },

    roaar(state){

    let score = 0;

    // Execute low HP enemies
    if(state.enemyHP <= 60)
    score += 220;

if(BattleMemory.usedOften("Daizzi"))
    score += 60;

    // Don't waste Roaar if we're about to die
    if(
        state.myHP <= state.enemyHighestDamage
    ){
        score -= 120;
    }

if(BattleMemory.usedOften("Roaar")){

    if(
        kwami.name=="Pollen" ||
        kwami.name=="Wayz"
    ){
        score += 40;
    }

}

    return score;

},

    plagg(state){

        let score = 0;

        if(state.enemyShield > 0)
            score += 250;

       if(state.enemyHP <= 90)
    score += 180;

if(state.enemyHP <= 25)
    score -= 120;

if(BattleMemory.usedOften("Wayz"))
    score += 70;

        return score;

    },

    wayz(state){

    let score = 0;

    if(
        state.myHP <= state.enemyHighestDamage
    ){
        score += 250;
    }

    if(state.enemyShield > 0)
        score -= 20;

    return score;

},

    daizzi(state){

    let score = 0;

    if(
        state.myHP <= state.enemyHighestDamage
    ){
        score += 260;
    }

    if(state.myHP > 220)
        score -= 150;

    return score;

},

    mullo(state){

        let score = 0;

        if(state.enemyHP <= 80)
            score += 150;

        return score;

    },

    fluff(state){

        let score = 0;

        let important = 0;

        state.myTeam.forEach(k=>{

            if(k.cooldown > 0){

                if(
                    k.name=="Roaar" ||
                    k.name=="Plagg" ||
                    k.name=="Longg"
                ){

                    important++;

                }

            }

        });

        score += important * 80;

        return score;

    },

    bark(state){

    let score = 0;

    // Copy strong abilities when the enemy is healthy.
    if(state.enemyHP > 100)
        score += 140;

    // Don't waste Fetch if the fight is almost over.
    if(state.enemyHP <= 60)
        score -= 80;

    return score;

},

pollen(state){

    let score = 0;

    if(BattleMemory.usedOften("Roaar"))
        score += 120;

    return score;

},

};
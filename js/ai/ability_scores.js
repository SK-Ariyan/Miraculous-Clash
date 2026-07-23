// ==========================
// ABILITY SCORES
// ==========================

const AbilityScores = {

    score(state, kwami){

        switch(kwami.name){

    case "Roaar":
        return this.roaar(state);

    case "Storm":
        return this.storm(state);

    case "Daizzi":
        return this.daizzi(state);

    default:
        return 50;

}

    },

    roaar(state){

    let score = 20;

    // Guaranteed kill
    if(state.myDamage + 40 >= state.enemyHP)
        score += 100;

    // Enemy is healthy
    if(state.enemyHP > state.myHP)
        score += 20;

    return score;

},

    storm(state){

    let score = 10;

    // Enemy can kill us
    if(state.enemyDamage >= state.myHP)
        score += 120;

    // Low HP
    if(state.myHP < 80)
        score += 50;

    return score;

},

    daizzi(state){

    let score = 15;

    if(state.myHP < 100)
        score += 60;

    if(state.enemyDamage > state.myDamage)
        score += 25;

    return score;

}

};
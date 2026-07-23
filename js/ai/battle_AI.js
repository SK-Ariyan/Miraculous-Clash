// ==========================
// BATTLE AI
// ==========================

const BattleAI = {

    chooseAction(){

    

    const state = GameState.read();

    

    const move = MoveScorer.bestMove(state);

    

    return move;

},

    chooseAbility(){

    },

    chooseAttack(){

    },

    evaluateState(){

    return{

        myHP,
        enemyHP,

        myShield,
        enemyShield,

        myTeam,
        enemyTeam,

        myAbilities,

        enemyEffects,

        turn

    };

},
takeTurn(){

    if(currentTurn != 2)
        return;

    const move = this.chooseAction();

    setTimeout(()=>{

        // Safety fallback
        if(
            !move ||
            move.type == "attack" ||
            (move.type == "ability" && !move.kwami)
        ){

            normalAttack();
            return;

        }

        useAbility(move.kwami);

    },600);

}

}


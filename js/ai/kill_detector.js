// ==========================
// KILL DETECTOR
// ==========================

const KillDetector = {

    canNormalAttackKill(state){

        return state.myDamage >= state.enemyHP;

    },

    enemyCanKill(state){

        return state.enemyDamage >= state.myHP;

    },

    bestKillingMove(state){

        if(this.canNormalAttackKill(state)){

            return{
                type:"attack"
            };

        }

        return null;

    }

};
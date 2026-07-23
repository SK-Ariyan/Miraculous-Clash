// ==========================
// AI MEMORY
// ==========================

const AIMemory = {

    enemy:{

        dodge:false,

        immune:false,

        shield:0,

        damageBuff:0,

        passiveDisabled:false,

        doubleAttack:false

    },

    self:{

        dodge:false,

        immune:false,

        shield:0,

        damageBuff:0,

        passiveDisabled:false,

        doubleAttack:false

    },

    reset(){

        this.enemy = {

            dodge:false,
            immune:false,
            shield:0,
            damageBuff:0,
            passiveDisabled:false,
            doubleAttack:false

        };

        this.self = {

            dodge:false,
            immune:false,
            shield:0,
            damageBuff:0,
            passiveDisabled:false,
            doubleAttack:false

        };

    }

};

// ==========================
// BATTLE MEMORY
// ==========================

const BattleMemory = {

    openedWith:{},

    abilityCount:{},

    remember(kwami){

        if(!kwami) return;

        // Count ability usage
        this.abilityCount[kwami.name] =
            (this.abilityCount[kwami.name] || 0) + 1;

        // Remember first ability
        if(Object.keys(this.openedWith).length==0){

            this.openedWith[kwami.name]=1;

        }

    },

    usedOften(name){

        return (this.abilityCount[name] || 0) >= 2;

    }

};
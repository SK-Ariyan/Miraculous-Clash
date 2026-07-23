const ComboAnalyzer = {

    score(state, kwami){

        let score = 0;

        score += this.bark(state, kwami);
        score += this.sass(state, kwami);
        score += this.triks(state, kwami);
        score += this.roaar(state, kwami);
        score += this.fluff(state, kwami);
        score += this.longg(state, kwami);
        score += this.kaalki(state, kwami);
        score += this.wayzz(state, kwami);
        score += this.pollen(state, kwami);
        score += this.plagg(state, kwami);

        return score;

    },

    bark(state, kwami){

        if(kwami.name != "Bark")
            return 0;

        let best = 0;

        state.myTeam.forEach(other=>{

            if(other === kwami)
                return;

            if(other.cooldown <= 0)
                return;

            if(other.cooldown > 2)
                return;

            let value =
                other.ai.priority * 0.5 +
                other.ai.aggression * 0.4 +
                other.ai.support * 0.3;

            best = Math.max(best, value);

        });

        return best;

    },

    sass(state, kwami){

        if(kwami.name != "Sass")
            return 0;

        let best = 0;

        state.myTeam.forEach(other=>{

            if(other === kwami)
                return;

            if(other.cooldown < 1)
                return;

            let value =
                other.ai.priority * 0.6 +
                other.ai.aggression * 0.4;

            best = Math.max(best, value);

        });

        return best * 0.8;

    },

    triks(state, kwami){

        if(kwami.name != "Triks")
            return 0;

        let best = 0;

        state.myTeam.forEach(other=>{

            if(other === kwami)
                return;

            if(other.charge < 4)
                return;

            best = Math.max(best,40);

        });

        return best;

    },

    roaar(state, kwami){

        if(kwami.name != "Roaar")
            return 0;

        if(state.enemyHP <= state.myDamage * 2)
            return 70;

        return 0;

    },

    fluff(state, kwami){

        if(kwami.name != "Fluff")
            return 0;

        let total = 0;

        state.myTeam.forEach(other=>{

            if(other.cooldown > 0)
                total++;

        });

        return total * 15;

    },

    longg(state, kwami){

        if(kwami.name != "Longg")
            return 0;

        if(state.myHP < 50)
            return 30;

        return 15;

    },

    kaalki(state, kwami){

        if(kwami.name != "Kaalki")
            return 0;

        if(state.enemyDamage >= state.myHP)
            return 80;

        return 10;

    },

    wayzz(state, kwami){

        if(kwami.name != "Wayzz")
            return 0;

        if(state.myShield < 20)
            return 45;

        return 10;

    },

    pollen(state, kwami){

        if(kwami.name != "Pollen")
            return 0;

        if(state.enemyImmune)
            return -100;

        return 35;

    },

    plagg(state, kwami){

        if(kwami.name != "Plagg")
            return 0;

        if(state.enemyShield > 0)
            return 80;

        return 20;

    }

};
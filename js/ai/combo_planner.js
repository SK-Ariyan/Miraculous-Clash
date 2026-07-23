// ==========================
// COMBO PLANNER
// ==========================

const ComboPlanner = {

    score(state, kwami){

        let score = 0;

        // Fluff prepares big hitters
        if(kwami.name == "Fluff"){

            const bigDamage = state.myTeam.some(k =>

                k.cooldown > 0 &&
                (
                    k.name == "Plagg" ||
                    k.name == "Roaar" ||
                    k.name == "Longg" ||
                    k.name == "Tussoo"
                )

            );

            if(bigDamage)
                score += 180;

        }

        // Sass prepares another burst turn
        if(kwami.name == "Sass"){

            if(state.enemyHP > 120)
                score += 100;

        }

        // Wayz sets up survival
        if(kwami.name == "Wayz"){

            if(state.myHP < 120)
                score += 120;

        }

        return score;

    }

};
// ==========================
// NEEDS ANALYZER
// ==========================

const NeedsAnalyzer = {

    analyze(team){

        let priority = false;
        let damage = 0;
        let support = 0;
        let tank = 0;
        let speed = 0;

        team.forEach(kwami=>{

            if(kwami.ai.priority >= 95)
                priority = true;

            damage += kwami.ai.aggression;
            support += kwami.ai.support;
            tank += kwami.ai.defense;
            speed += kwami.speed;

        });

        return{

            needPriority : !priority,

            needDamage : damage < 140,

            needSupport : support < 120,

            needTank : tank < 120,

            needSpeed : speed < 18,

            needSynergy : true,

            needPreferred : true

        };

    }

};
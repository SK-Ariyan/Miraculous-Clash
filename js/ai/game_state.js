// ==========================
// GAME STATE
// ==========================

const GameState = {

    read(){

        const aiTurn = (currentTurn == 2);

        const enemyPriority =
    ThreatDetector.highest(
        aiTurn ? player1Team : player2Team
    );

        return {

            enemyPriority: enemyPriority,

            myHP: aiTurn ? player2HP : player1HP,
            enemyHP: aiTurn ? player1HP : player2HP,

            myShield: aiTurn ? player2Shield : player1Shield,
            enemyShield: aiTurn ? player1Shield : player2Shield,

            myTeam: aiTurn ? player2Team : player1Team,
            enemyTeam: aiTurn ? player1Team : player2Team,

            myDamage: aiTurn ? player2Damage : player1Damage,
            enemyDamage: aiTurn ? player1Damage : player2Damage,

            myHero: aiTurn ? player2Hero : player1Hero,
            enemyHero: aiTurn ? player1Hero : player2Hero,

            myDodge: aiTurn ? player2Dodge : player1Dodge,
            enemyDodge: aiTurn ? player1Dodge : player2Dodge,

            myImmune: aiTurn ? player2Immune : player1Immune,
            enemyImmune: aiTurn ? player1Immune : player2Immune,

            myFrozen: aiTurn ? player2Frozen : player1Frozen,
            enemyFrozen: aiTurn ? player1Frozen : player2Frozen,

            myStunned: aiTurn ? player2Stunned : player1Stunned,
            enemyStunned: aiTurn ? player1Stunned : player2Stunned,

            // ==========================
// Team Statistics
// ==========================

        myAlive: (aiTurn ? player2Team : player1Team)
            .filter(k => k.hp > 0).length,

        enemyAlive: (aiTurn ? player1Team : player2Team)
            .filter(k => k.hp > 0).length,

        myHighestDamage: Math.max(
            ...(aiTurn ? player2Team : player1Team)
                .filter(k => k.hp > 0)
                .map(k => k.damage)
        ),

        enemyHighestDamage: Math.max(
            ...(aiTurn ? player1Team : player2Team)
                .filter(k => k.hp > 0)
                .map(k => k.damage)
        ),

        myAverageCooldown:
            (aiTurn ? player2Team : player1Team)
                .reduce((a,b)=>a+b.cooldown,0) /
            (aiTurn ? player2Team : player1Team).length,

        enemyAverageCooldown:
            (aiTurn ? player1Team : player2Team)
                .reduce((a,b)=>a+b.cooldown,0) /
            (aiTurn ? player1Team : player2Team).length,

        myTeamHP:
            (aiTurn ? player2Team : player1Team)
                .reduce((a,b)=>a+b.hp,0),

        enemyTeamHP:
            (aiTurn ? player1Team : player2Team)
                .reduce((a,b)=>a+b.hp,0),

        enemyHasPassive:
            (aiTurn ? player1Team : player2Team)
                .some(k => k.passive && k.passive !== "None."),

        myHasPassive:
            (aiTurn ? player2Team : player1Team)
                .some(k => k.passive && k.passive !== "None."),

        enemyHighestDamage: Math.max(
    ...(
        (aiTurn ? player1Team : player2Team)
        .filter(k => k.hp > 0)
        .map(k => {

            switch(k.name){

                case "Plagg": return 80;
                case "Roaar": return 50;
                case "Tussoo": return 60;
                case "Xuppu": return 60;
                case "Longg": return 45;
                case "Kaalki": return 40;
                default: return k.damage;

            }

        })
    )
),

enemyAlive:
(aiTurn ? player1Team : player2Team)
.filter(k=>k.hp>0).length,
        
        };

        

    }

};
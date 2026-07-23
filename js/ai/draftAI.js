// ==========================
// DRAFT AI
// ==========================

const DraftAI = {

    chooseBan(kwamis, bannedKwamis){

        const available = kwamis.filter(kwami =>

            !bannedKwamis.includes(kwami.name)

        );

        const ranked = [...available].sort((a,b)=>{

            return Evaluator.score(
                b,
                PersonalityManager.current
            ) - Evaluator.score(
                a,
                PersonalityManager.current
            );

        });

        const topChoices = ranked.slice(0,3);

        return Randomizer.choose(topChoices);

    },

    choosePick(aiTeam){

    const available = kwamis.filter(kwami=>

        !bannedKwamis.includes(kwami.name) &&
        !player1Team.some(k=>k.name===kwami.name) &&
        !player2Team.some(k=>k.name===kwami.name)

    );

    if(available.length == 0)
        return null;

    const needs = NeedsAnalyzer.analyze(aiTeam);

    const filtered = RoleFilter.filter(
        available,
        needs
    );

    console.log(
        "Filtered:",
        filtered.map(k=>k.name)
    );

    const pool =
filtered.length > 0 ? filtered : available;

const ranked = [...pool].sort((a,b)=>{

    return Evaluator.totalScore(
    b,
    aiTeam,
    player1Team
) -
Evaluator.totalScore(
    a,
    aiTeam,
    player1Team
);

});

console.log(

    ranked.map(k=>({

        name:k.name,

        score: Evaluator.totalScore(
    k,
    aiTeam,
    player1Team
)

    }))

);

const topChoices = ranked.slice(0,5);

return Randomizer.choose(topChoices);

}


};

const DraftEvaluator = {

    scoreTeam(team){

        let score = 0;

        // Damage
        score += TeamAnalyzer.damage(team);

        // Tankiness
        score += TeamAnalyzer.defense(team);

        // Healing
        score += TeamAnalyzer.support(team);

        // Crowd Control
        score += TeamAnalyzer.control(team);

        // Synergy
        score += TeamAnalyzer.synergy(team);

        return score;

    }

};
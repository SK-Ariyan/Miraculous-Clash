// ==========================
// AI PERSONALITIES
// ==========================

const AI_PERSONALITIES = {

    AGGRESSIVE: "aggressive",

    DEFENSIVE: "defensive",

    BALANCED: "balanced",

    SYNERGY: "synergy",

    TRICKSTER: "trickster"

};

const PersonalityManager = {

    current:null,

    choose(){

        const personalities = [

            AI_PERSONALITIES.AGGRESSIVE,

            AI_PERSONALITIES.DEFENSIVE,

            AI_PERSONALITIES.BALANCED,

            AI_PERSONALITIES.SYNERGY,

            AI_PERSONALITIES.TRICKSTER

        ];

        const randomIndex = Math.floor(

            Math.random() * personalities.length

        );

        this.current = personalities[randomIndex];

        return this.current;

    }

};
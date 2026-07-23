// ==========================
// RANDOMIZER
// ==========================

const Randomizer = {

    choose(candidates){

        if(candidates.length === 0)
            return null;

        const randomIndex = Math.floor(

            Math.random() * candidates.length

        );

        return candidates[randomIndex];

    }

};
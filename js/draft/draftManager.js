// ==========================
// DRAFT MANAGER
// ==========================

const draftManager = {

    phase: "ban",

    turn: 0,

    banOrder: [],

    draftOrder: []

};

// ==========================
// RESET
// ==========================

function resetDraft(){

    draftManager.phase = "ban";

    draftManager.turn = 0;

    draftManager.banOrder = [];

    draftManager.draftOrder = [];

}

// ==========================
// SAVE
// ==========================

function saveDraft(){

    sessionStorage.setItem(
        "draftManager",
        JSON.stringify(draftManager)
    );

}
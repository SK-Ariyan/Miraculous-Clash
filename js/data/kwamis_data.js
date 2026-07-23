const kwamis = [

{
name:"Tikki",
type:"Creation",
image:"../photos/Tikki.jpg",
voice:"../voices/tikki.mp3",
accent:"#FFD54A",

active:"Lucky Charm",
effect:"Heal 50 HP and deal 35 damage.",
passive:"Heal 2 HP every turn.",

hp:50,
damage:5,
speed:5,
luck:5,
charge:6,

synergy:{
partner:"Plagg",
name:"Creation & Destruction",
effect:"Whenever Tikki or Plagg uses an ability, both recover 20 HP."
},



ai:{

    role:"support",

    priority:90,

    aggression:20,

    defense:60,

    support:100,

    synergy:95,

    strategy:60

}
},

{
name:"Plagg",
type:"Destruction",
image:"../photos/plagg.jpg",
voice:"../voices/plagg.mp3",
accent:"#7E57C2",

active:"Cataclysm",
effect:"Deal 80 damage and destroy the enemy shield.",
passive:"Deal 10 True Damage every turn.",

hp:10,
damage:20,
speed:8,
luck:5,
charge:3,

synergy:{
partner:"Tikki",
name:"Creation & Destruction",
effect:"Whenever Tikki or Plagg uses an ability, both recover 20 HP."
},

preferred:null,

ai:{

    role:"damage",

    priority:100,

    aggression:100,

    defense:5,

    support:0,

    synergy:90,

    strategy:70

}
},

{
name:"Wayz",
type:"Protection",
image:"../photos/Wayz.png",
voice:"../voices/wayz.mp3",
accent:"#43A047",

active:"Shell-ter",
effect:"Deal 30 damage, gain 70 Shield, +20 Damage Reduction and an Extra Turn.",
passive:"Heal 5 HP every turn.",

hp:40,
damage:8,
speed:1,
luck:5,
charge:6,

synergy:{
partner:"Stomp",
name:"Guardian",
effect:"Get 30 shield points at the start of the match. "
},

preferred: null,
ai:{

    role:"tank",

    priority:85,

    aggression:15,

    defense:100,

    support:75,

    synergy:80,

    strategy:75

}

},

{
name:"Trics",
type:"Illusion",
image:"../photos/Trics.jpg",
voice:"../voices/trics.mp3",
accent:"#FF9800",

active:"Mirage",
effect:"Deal 40 damage, Heal 10 HP and gain an Extra Turn.",
passive:"None.",

hp:30,
damage:4,
speed:12,
luck:5,
charge:6,

synergy:{
partner:"Nuroo",
name:"Chaos Illusion",
effect:"Ignore shield points while doing damage. "
},
preferred: null,
ai:{

    role:"trickster",

    priority:80,

    aggression:70,

    defense:20,

    support:65,

    synergy:85,

    strategy:90

}
},

{
name:"Pollen",
type:"Subjection",
image:"../photos/Pollen.jpg",
voice:"../voices/pollen.mp3",
accent:"#FDD835",

active:"Venom",
effect:"Deal 35 damage and Stun the enemy.",
passive:"None.",

hp:15,
damage:12,
speed:12,
luck:5,
charge:5,
synergy:null,
preferred:{
    partner:"Xuppu",
    reason:"Stun + Disable Passive is a Strong combo.  "
},
ai:{

    role:"controller",

    priority:90,

    aggression:70,

    defense:25,

    support:40,

    synergy:65,

    strategy:75

}
},

{
name:"Roaar",
type:"Exaltation",
image:"../photos/Roaar.jpg",
voice:"../voices/Roaar.mp3",
accent:"#E53935",

active:"Clout",
effect:"Deal 50 damage and gain an Extra Turn.",
passive:"None.",

hp:10,
damage:20,
speed:7,
luck:5,
charge:8,
synergy:null,
preferred:{
    partner:"Sass",
    reason:"It strong but have a high recharge turn so getting your turn faster will help alot. "
},
ai:{

    role:"burst",

    priority:100,

    aggression:100,

    defense:0,

    support:5,

    synergy:40,

    strategy:95

}
},

{
name:"Longg",
type:"Perfection",
image:"../photos/Longg.jpg",
voice:"../voices/long.mp3",
accent:"#1565C0",

active:"Elemental Burst",
effect:"Deal 45 damage, Heal 10 HP, Deal 10 True Damage and gain Double Attack.",
passive:"None.",

hp:30,
damage:15,
speed:3,
luck:5,
charge:2,

synergy:{
partner:"Kaalki",
name:"Dragon Rider",
effect:"Longg and Kaalki both gain +20 Speed and their abilities recharge 1 turn faster."
},

preferred:null,
ai:{

    role:"fighter",

    priority:95,

    aggression:85,

    defense:50,

    support:55,

    synergy:90,

    strategy:90

}
},

{
name:"Kaalki",
type:"Migration",
image:"../photos/Kaalki.jpg",
voice:"../voices/kalki.mp3",
accent:"#00ACC1",

active:"Voyage",
effect:"Deal 40 damage, Break Shield and gain Dodge.",
passive:"Dodge the next incoming attack.",

hp:30,
damage:2,
speed:5,
luck:5,
charge:4,

synergy:{
partner:"Longg",
name:"Dragon Rider",
effect:"Longg and Kaalki both gain +20 Speed and their abilities recharge 1 turn faster."
},

preferred:null,
ai:{

    role:"fighter",

    priority:95,

    aggression:70,

    defense:45,

    support:60,

    synergy:90,

    strategy:85

}
},

{
name:"Fluff",
type:"Evolution",
image:"../photos/Fluff.jpg",
voice:"../voices/fluff.mp3",
accent:"#F48FB1",

active:"Burrow",
effect:"Deal 30 damage and immediately restore every ally cooldown.",
passive:"None.",

hp:20,
damage:2,
speed:10,
luck:5,
charge:6,

synergy:null,
preferred:{
    partner:"Roaar",
    reason:"Works well with heavy hitters. "
},
ai:{

    role:"support",

    priority:95,

    aggression:20,

    defense:30,

    support:100,

    synergy:70,

    strategy:100

}
},

{
name:"Sass",
type:"Intuition",
image:"../photos/Sass.jpg",
voice:"../voices/sass.mp3",
accent:"#8E24AA",

active:"Second Chance",
effect:"Deal 30 damage, Undo Last Damage and Reset Ally Cooldowns.",
passive:"None.",

hp:20,
damage:12,
speed:10,
luck:5,
charge:4,

synergy:null,
preferred:{
    partner:"Roaar",
    reason:"Helps partners to hit continuously. "
},
ai:{

    role:"support",

    priority:95,

    aggression:35,

    defense:35,

    support:100,

    synergy:75,

    strategy:100

}
},

{
name:"Daizzi",
type:"Emotion",
image:"../photos/Daizzi.jpg",
voice:"../voices/daizzi.mp3",
accent:"#F48FB1",

active:"Jubilation",
effect:"Heal 80 HP and keeps the move. ",
passive:"Reduce incoming damage by 40.",

hp:60,
damage:2,
speed:3,
luck:5,
charge:5,

synergy:null,
preferred:{
    partner:"Mullo",
    reason:"Mullo is a very open to hit kwami so it can provide extra health. "
},
ai:{

    role:"healer",

    priority:90,

    aggression:10,

    defense:80,

    support:100,

    synergy:60,

    strategy:70

}
},

{
name:"Mullo",
type:"Multiplication",
image:"../photos/Mullo.jpg",
voice:"../voices/mullo.mp3",
accent:"#B0BEC5",

active:"Multitude",
effect:"Deal 30 damage and your next attack hits twice.",
passive:"None.",

hp:15,
damage:20,
speed:4,
luck:50,
charge:2,

synergy:null,
preferred:{
    partner:"Ziggy",
    reason:"Genesis greatly strengthens Multitude, allowing Mullo to deal explosive burst damage."
},
ai:{

    role:"burst",

    priority:100,

    aggression:95,

    defense:20,

    support:25,

    synergy:60,

    strategy:95

}
},

{
name:"Nuroo",
type:"Transmission",
image:"../photos/Nuroo.jpg",
voice:"../voices/nuroo.mp3",
accent:"#7E57C2",

active:"Akumatize",
effect:"Deal 40 damage, gain +40 Damage and Regenerate 10 HP for 2 turns.",
passive:"None.",

hp:35,
damage:15,
speed:9,
luck:5,
charge:4,

synergy:{
    partner:"Trics",
    name:"Chaos illusion",
    effect:"Ignore shield points while doing damage. "
},

preferred:null,
ai:{

    role:"fighter",

    priority:90,

    aggression:90,

    defense:25,

    support:40,

    synergy:80,

    strategy:80

}

},

{
name:"Orikko",
type:"Pretension",
image:"../photos/Orikko.jpg",
voice:"../voices/orikko.wav",
accent:"#FFFFFF",

active:"Sublimation",
effect:"Randomly gain Healing, Damage Buff, Shield, Dodge or Cooldown Reduction.",
passive:"None.",

hp:40,
damage:20,
speed:3,
luck:5,
charge:4,

synergy:null,

preferred:{
    partner:"Tikki",
    reason:"Depends on luck so may get extra health works"
},
ai:{

    role:"trickster",

    priority:75,

    aggression:50,

    defense:40,

    support:70,

    synergy:60,

    strategy:95

}
},

{
name:"Stomp",
type:"Determination",
image:"../photos/Stomp.jpg",
voice:"../voices/stomp.mp3",
accent:"#795548",

active:"Resistance",
effect:"Deal 30 damage, gain 30 Shield, Immunity and an Extra Turn.",
passive:"None.",

hp:40,
damage:4,
speed:1,
luck:5,
charge:6,

synergy:{
partner:"Wayz",
name:"Guardian",
effect:"Get 30 shield points at the start of the match. "
},
preferred:null,
ai:{

    role:"tank",

    priority:85,

    aggression:20,

    defense:100,

    support:60,

    synergy:80,

    strategy:70

}
},

{
name:"Tussoo",
type:"Elation",
image:"../photos/Tussoo.jpg",
voice:"../voices/tusso.mp3",
accent:"#D81B60",

active:"Senti Monster",
effect:"Heal 10 HP and deal 60 damage.",
passive:"Heal 10 HP every 2 turns.",

hp:30,
damage:18,
speed:2,
luck:5,
charge:4,

synergy:null,
preferred:{
    partner:"Wayz",
    reason:"Having multiple shield will be a game changer. "
},
ai:{

    role:"fighter",

    priority:90,

    aggression:85,

    defense:50,

    support:55,

    synergy:55,

    strategy:75

}
},

{
name:"Xuppu",
type:"Derision",
image:"../photos/Xuppu.jpg",
voice:"../voices/xuppu.mp3",
accent:"#FF7043",

active:"Uproar",
effect:"Deal 60 damage and Disable Enemy Passive.",
passive:"None.",

hp:10,
damage:15,
speed:4,
luck:5,
charge:4,

synergy:null,
synergy:null,

preferred:{
    partner:"Pollen",
    reason:"Having get rid of passive with huge damage. "
},
ai:{

    role:"controller",

    priority:95,

    aggression:90,

    defense:20,

    support:25,

    synergy:65,

    strategy:80

}
},

{
name:"Ziggy",
type:"Passion",
image:"../photos/Ziggy.jpg",
voice:"../voices/ziggy.mp3",
accent:"#9CCC65",

active:"Genesis",
effect:"Boost the next Ability.",
passive:"None.",

hp:45,
damage:10,
speed:2,
luck:5,
charge:3,

synergy:null,

preferred:{
    partner:"Mullo",
    reason:"Genesis greatly strengthens Multitude, allowing Mullo to deal explosive burst damage."
},
ai:{

    role:"support",

    priority:95,

    aggression:10,

    defense:35,

    support:95,

    synergy:70,

    strategy:100

}
},

{
name:"Bark",
type:"Adoration",
image:"../photos/Bark.jpg",
voice:"../voices/bark.mp3",
accent:"#8D6E63",

active:"Fetch",
effect:"Copy the first ability used by any other kwami. Bark permanently keeps that ability, its cooldown, and all of its effects for the rest of the match.",
passive:"None.",

hp:30,
damage:5,
speed:10,
luck:5,
charge:3,
hasFetched:false,

hasUsedCopiedAbility:false,

synergy:null,
preferred:{
    partner:"Roaar",
    reason:"Getting to use two Roaar will be a punishment for the opponent. "
},
ai:{

    role:"trickster",

    priority:100,

    aggression:75,

    defense:35,

    support:70,

    synergy:50,

    strategy:100

}
}
];

function useAbility(kwami) {

    if(actionLocked)
    return;

actionLocked = true;






    if (kwami.cooldown > 0) {
        alert("Ability is on cooldown!");
        actionLocked = false;
        return;
    }

   
    switch (kwami.name) {

        case "Tikki":
            addLog("✨ Tikki used Lucky Charm!");
            heal(50);
            criticalAbility(kwami,35);
            
            break;

        case "Plagg":
            addLog("💥 Plagg used Cataclysm!");
            breakShield();
            updateStatusEffects();
            criticalAbility(kwami,80);
            
            break;

        case "Wayz":
            addLog("🛡 Wayz used Shell-ter!");
            criticalAbility(kwami,35);
            giveShield(30);
            updateStatusEffects();
            giveDamageReduction(10);
            updateStatusEffects();
            extraTurn = true;
            
            break;

        case "Trics":
            addLog("🦊 Trics used Mirage!");
            criticalAbility(kwami,40);
            heal(10);
            extraTurn = true;
            
            break;

        case "Pollen":
            addLog("🐝 Pollen used Venom!");
            criticalAbility(kwami,30);
            stunEnemy();
            updateStatusEffects();
            
            break;

        case "Roaar":
            addLog("🦁 Roaar used Clout!");
            criticalAbility(kwami,50);
            extraTurn = true;
            
            break;

        case "Longg":
            addLog("🐉 Longg used Elemental Burst!");
            criticalAbility(kwami,45);
            heal(10);
            giveDoubleAttack();
            dealTrueDamage(10);
            updateStatusEffects();
        
            break;

        case "Kaalki":
            addLog("🐎 Kaalki used Voyage!");
            giveDodge();
            criticalAbility(kwami,40);
            breakShield();
            updateStatusEffects();
            addLog("🐎 Kaalki used Voyage!");
        break;

        case "Fluff":
            addLog("🐇 Fluff used Burrow!");
            criticalAbility(kwami,40);
            reduceCooldowns(10);
            updateStatusEffects();
            
            break;

        case "Sass":
            addLog("🐍 Sass used Second Chance!");
            criticalAbility(kwami,20);
            reduceCooldowns(1);
            updateStatusEffects();
            extraTurn = true;
            
            break;

        case "Daizzi":
            addLog("🐷 Daizzi used Jubilation!");
            heal(60);
            extraTurn = true;
            
            break;

        case "Mullo":
            addLog("🐭 Mullo used Multitude!");
            criticalAbility(kwami,25);
            giveDoubleAttack();
            updateStatusEffects();
            
            break;

        case "Nuroo":
            addLog("🦋 Nuroo used Akumatize!");
            criticalAbility(kwami,40);
            giveDamageBuff(40);
            giveRegeneration(10,2);
            updateStatusEffects();
            
            break;

        case "Orikko":
            const randomBuff = Math.floor(Math.random()*5);

            if(randomBuff===0){
                addLog("🪽 Orikko granted Healing!");
                heal(40);
                
            }
            else if(randomBuff===1){
                addLog("🪽 Orikko granted Strength!");
                giveDamageBuff(50);
                updateStatusEffects();
                
            }
            else if(randomBuff===2){
                addLog("🪽 Orikko granted Protection!");
                giveShield(50);
                updateStatusEffects();
                
            }
            else if(randomBuff===3){
                addLog("🪽 Orikko granted Agility!");
                giveDodge();
                updateStatusEffects();
                
            }
            else{
                addLog("🪽 Orikko granted Wisdom!");
                reduceCooldowns(0);
                updateStatusEffects();
                
            }
            break;

        case "Stomp":
            addLog("🐂 Stomp used Resistance!");
            giveImmunity();
            updateStatusEffects();
            giveShield(10);
            extraTurn = true;
            criticalAbility(kwami,30);
            
            break;

        case "Tussoo":
            addLog("🐖 Tussoo used Genesis Feast!");
            heal(10);
            criticalAbility(kwami,60);
            
            break;

        case "Xuppu":
            addLog("🐵 Xuppu used Uproar!");
            
            disableEnemyPassive();
            updateStatusEffects();
            criticalAbility(kwami,60);
            
            break;

        case "Ziggy":
            addLog("🐐 Ziggy used Genesis!");
            globalLuckBonus = 20;
            boostNextAbility();
            updateStatusEffects();
            
            break;
        
        case "Bark":

    if(lastAbilityUsed){

        addLog(`🐶 Bark copied ${lastAbilityUsed.active}!`);

        const copied = JSON.parse(JSON.stringify(lastAbilityUsed));

        const originalName = kwami.name;

        kwami.name = copied.name;

        switch(copied.name){

            case "Tikki":
                heal(50);
                criticalAbility(kwami,35);
                break;

            case "Plagg":
                breakShield();
                updateStatusEffects();
                criticalAbility(kwami,80);
                break;

            case "Wayz":
                criticalAbility(kwami,35);
                giveShield(30);
                giveDamageReduction(10);
                updateStatusEffects();
                extraTurn = true;
                break;

            case "Trics":
                criticalAbility(kwami,40);
                heal(10);
                extraTurn=true;
                break;

            case "Pollen":
                criticalAbility(kwami,30);
                stunEnemy();
                updateStatusEffects();
                break;

            case "Roaar":
                criticalAbility(kwami,50);
                extraTurn=true;
                break;

            case "Longg":
                criticalAbility(kwami,45);
                heal(10);
                giveDoubleAttack();
                dealTrueDamage(10);
                updateStatusEffects();
                break;

            case "Kaalki":
                giveDodge();
                criticalAbility(kwami,40);
                breakShield();
                updateStatusEffects();
                break;

            case "Fluff":
                criticalAbility(kwami,40);
                reduceCooldowns(10);
                updateStatusEffects();
                break;

            case "Sass":
                criticalAbility(kwami,20);
                reduceCooldowns(1);
                updateStatusEffects();
                extraTurn=true;
                break;

            case "Daizzi":
                heal(60);
                extraTurn=true;
                break;

            case "Mullo":
                criticalAbility(kwami,25);
                giveDoubleAttack();
                updateStatusEffects();
                break;

            case "Nuroo":
                criticalAbility(kwami,40);
                giveDamageBuff(40);
                giveRegeneration(10,2);
                updateStatusEffects();
                break;

            case "Orikko":

                const randomBuff = Math.floor(Math.random()*5);

                if(randomBuff===0) heal(40);
                else if(randomBuff===1) giveDamageBuff(50);
                else if(randomBuff===2) giveShield(50);
                else if(randomBuff===3) giveDodge();
                else reduceCooldowns(0);

                updateStatusEffects();
                break;

            case "Stomp":
                giveImmunity();
                giveShield(10);
                criticalAbility(kwami,30);
                extraTurn=true;
                updateStatusEffects();
                break;

            case "Tussoo":
                heal(10);
                criticalAbility(kwami,60);
                break;

            case "Xuppu":
                criticalAbility(kwami,60);
                disableEnemyPassive();
                updateStatusEffects();
                break;

            case "Ziggy":
                globalLuckBonus=20;
                boostNextAbility();
                updateStatusEffects();
                break;
        }

        kwami.name = originalName;

    }else{
        addLog("🐶 Bark found nothing!");
        criticalAbility(kwami,20);
        

    }

    break;}
        

        

    

    

    if(kwami.copiedAbility){

    kwami.name = "Bark";
    kwami.active = "Fetch";
    kwami.effect = "Copy the first ability used by any other kwami.";
    kwami.hasUsedCopiedAbility = false;
}

// Put ability on cooldown AFTER using it
let cooldown = kwami.charge;

if(currentTurn == 1 && player1TimeLoop) cooldown--;
if(currentTurn == 2 && player2TimeLoop) cooldown--;

kwami.cooldown = Math.max(1, cooldown);

lastAbilityUsed = JSON.parse(JSON.stringify(kwami));
    if(checkWinConditions()) return;

    actionLocked = false;
endTurn();
}


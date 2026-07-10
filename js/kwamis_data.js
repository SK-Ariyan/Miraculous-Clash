const kwamis = [

{
name:"Tikki",
type:"Creation",
image:"../photos/Tikki.jpg",
voice:"../voices/tikki.mp3",
accent:"#FFD54A",

active:"Lucky Charm",
effect:"Heal 40 HP and deal 30 damage.",
passive:"Heal 2 HP every turn.",

hp:30,
damage:3,
speed:4,
luck:5,
charge:6,

synergy:{
partner:"Plagg",
name:"Creation & Destruction",
effect:"Whenever Tikki or Plagg uses an ability, both recover 20 HP."
},

preferred:null
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
speed:40,
luck:5,
charge:3,

synergy:{
partner:"Tikki",
name:"Creation & Destruction",
effect:"Whenever Tikki or Plagg uses an ability, both recover 20 HP."
},

preferred:null
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

hp:35,
damage:1,
speed:1,
luck:5,
charge:6,

synergy:{
partner:"Stomp",
name:"Guardian",
effect:"Get 30 shield points at the start of the match. "
},

preferred: null
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

hp:15,
damage:3,
speed:5,
luck:5,
charge:6,

synergy:{
partner:"Nuroo",
name:"Chaos Illusion",
effect:"Ignore shield points while doing damage. "
},
preferred: null
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
damage:5,
speed:4,
luck:5,
charge:5,
synergy:null,
preferred:{
    partner:"Xuppu",
    reason:"Stun + Disable Passive is a Strong combo.  "
}
},

{
name:"Roaar",
type:"Exaltation",
image:"../photos/Roaar.jpg",
voice:"../voices/Roaar.mp3",
accent:"#E53935",

active:"Clout",
effect:"Deal 70 damage and gain an Extra Turn.",
passive:"None.",

hp:10,
damage:5,
speed:3,
luck:5,
charge:6,
synergy:null,
preferred:{
    partner:"Sass",
    reason:"It strong but have a high recharge turn so getting your turn faster will help alot. "
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

hp:20,
damage:4,
speed:3,
luck:5,
charge:2,

synergy:{
partner:"Kaalki",
name:"Dragon Rider",
effect:"Longg and Kaalki both gain +20 Speed and their abilities recharge 1 turn faster."
},

preferred:null
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

hp:20,
damage:2,
speed:5,
luck:5,
charge:4,

synergy:{
partner:"Longg",
name:"Dragon Rider",
effect:"Longg and Kaalki both gain +20 Speed and their abilities recharge 1 turn faster."
},

preferred:null
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

hp:15,
damage:2,
speed:5,
luck:5,
charge:2,

synergy:null,
preferred:{
    partner:"Roaar",
    reason:"Works well with heavy hitters. "
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
damage:2,
speed:2,
luck:5,
charge:4,

synergy:null,
preferred:{
    partner:"Roaar",
    reason:"Helps partners to hit continuously. "
}
},

{
name:"Daizzi",
type:"Emotion",
image:"../photos/Daizzi.jpg",
voice:"../voices/daizzi.mp3",
accent:"#F48FB1",

active:"Jubilation",
effect:"Heal 50 HP.",
passive:"Reduce incoming damage by 40.",

hp:25,
damage:2,
speed:3,
luck:5,
charge:5,

synergy:null,
preferred:{
    partner:"Mullo",
    reason:"Mullo is a very open to hit kwami so it can provide extra health. "
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
damage:4,
speed:4,
luck:50,
charge:2,

synergy:null,
preferred:{
    partner:"Ziggy",
    reason:"Genesis greatly strengthens Multitude, allowing Mullo to deal explosive burst damage."
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

hp:15,
damage:3,
speed:3,
luck:5,
charge:4,

synergy:{
    partner:"Trics",
    name:"Chaos illusion",
    effect:"Ignore shield points while doing damage. "
},

preferred:null

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

hp:20,
damage:2,
speed:3,
luck:5,
charge:4,

synergy:null,

preferred:{
    partner:"Tikki",
    reason:"Depends on luck so may get extra health works"
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
damage:0,
speed:1,
luck:5,
charge:6,

synergy:{
partner:"Wayz",
name:"Guardian",
effect:"Get 30 shield points at the start of the match. "
},
preferred:null
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
damage:2,
speed:2,
luck:5,
charge:4,

synergy:null,
preferred:{
    partner:"Wayz",
    reason:"Having multiple shield will be a game changer. "
},
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

hp:15,
damage:3,
speed:4,
luck:5,
charge:4,

synergy:null,
synergy:null,

preferred:{
    partner:"Pollen",
    reason:"Having get rid of passive with huge damage. "
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

hp:25,
damage:2,
speed:2,
luck:5,
charge:3,

synergy:null,

preferred:{
    partner:"Mullo",
    reason:"Genesis greatly strengthens Multitude, allowing Mullo to deal explosive burst damage."
},

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
charge:4,

synergy:null,
preferred:{
    partner:"Roaar",
    reason:"Getting to use two Roaar will be a punishment for the opponent. "
},
}
];
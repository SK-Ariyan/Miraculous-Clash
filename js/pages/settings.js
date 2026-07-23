const seekBar = document.getElementById("musicSeek");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
// ==========================
// PROFILE
// ==========================



const profileAvatar =
document.getElementById("profileAvatar");

const profileName =
document.getElementById("profileName");

// Load saved name
const savedName =
localStorage.getItem("playerName") || "Player";

// Load saved avatar
const savedAvatar =
localStorage.getItem("playerAvatar");

// Show name
profileName.textContent = savedName;

// Show avatar
if(savedAvatar){

    profileAvatar.src = savedAvatar;

}
else{

    profileAvatar.src = "../hero/Ariyan.png";

}

// ==========================
// AUDIO
// ==========================

// ==========================
// AUDIO SETTINGS
// ==========================



const masterSlider =
document.getElementById("masterVolume");

const musicSlider =
document.getElementById("musicVolume");

const sfxSlider =
document.getElementById("sfxVolume");

// Load saved values into sliders

masterSlider.value =
localStorage.getItem("masterVolume") || 100;

musicSlider.value =
localStorage.getItem("musicVolume") || 80;

sfxSlider.value =
localStorage.getItem("sfxVolume") || 100;

applyMusicVolume();

// ==========================
// MASTER VOLUME
// ==========================

masterSlider.oninput = () => {

    localStorage.setItem(
        "masterVolume",
        masterSlider.value
    );

    music.volume =
    (masterSlider.value / 100) *
    (musicSlider.value / 100);

};

// ==========================
// MUSIC VOLUME
// ==========================

musicSlider.oninput = () => {

    localStorage.setItem(
        "musicVolume",
        musicSlider.value
    );

    music.volume =
    (masterSlider.value / 100) *
    (musicSlider.value / 100);

};

// ==========================
// SFX VOLUME
// ==========================

sfxSlider.oninput = () => {

    localStorage.setItem(
        "sfxVolume",
        sfxSlider.value
    );

};

const autoMusicCheck =
document.getElementById("autoMusic");

autoMusicCheck.checked =
localStorage.getItem("autoMusic") !== "false";

autoMusicCheck.onchange = ()=>{

    localStorage.setItem(
        "autoMusic",
        autoMusicCheck.checked
    );

    if(autoMusicCheck.checked){

        music.play().catch(()=>{});

    }
    else{

        music.pause();

    }

};

const transitionCheck =
document.getElementById("transitionToggle");

transitionCheck.checked =
localStorage.getItem("enableTransitions") !== "false";

transitionCheck.onchange = () => {

    localStorage.setItem(
        "enableTransitions",
        transitionCheck.checked
    );

};

const prevBtn = document.getElementById("prevMusic");
const nextBtn = document.getElementById("nextMusic");
const seek = document.getElementById("musicSeek");

playBtn.onclick = () => {

    music.play().catch(()=>{});

};

pauseBtn.onclick = () => {

    Music.pause();

};

prevBtn.onclick = () => {

    Music.currentTime =
    Math.max(0, Music.currentTime - 5);

};

nextBtn.onclick = () => {

    Music.currentTime =
    Math.min(
        Music.duration,
        Music.currentTime + 5
    );

};

music.addEventListener("loadedmetadata",()=>{

    seekBar.max = music.duration;

});

music.addEventListener("timeupdate",()=>{

    seekBar.value = music.currentTime;

});

seekBar.oninput = ()=>{

    music.currentTime = seekBar.value;

};

music.addEventListener("timeupdate",()=>{

    localStorage.setItem(
        "musicTime",
        music.currentTime
    );

});
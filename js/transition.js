// Fade in when page loads
window.addEventListener("load", () => {

    const fade = document.getElementById("fadeScreen");

    if (fade) {

        setTimeout(() => {

            fade.classList.add("fadeIn");

        }, 100);

    }

});

// Global page transition
function goTo(page){

    const transitionEnabled =
    localStorage.getItem("enableTransitions") !== "false";

    if(!transitionEnabled){

        window.location.href = page;
        return;

    }

    fadeScreen.classList.add("fadeOut");

    setTimeout(()=>{

        window.location.href = page;

    },500);

}

// Load player's name

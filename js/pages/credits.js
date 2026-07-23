// ==========================
// Floating Magical Particles
// ==========================



const particleContainer =
document.getElementById("particles");

const colors = [

"#ff3b3b",   // Ladybug Red
"#53ff53",   // Cat Green
"#ffd700",   // Gold
"#ffffff",   // White
"#8ec5ff",   // Blue
"#b96bff"    // Purple

];

const TOTAL_PARTICLES = 60;

for(let i=0;i<TOTAL_PARTICLES;i++){

    const p =
    document.createElement("div");

    p.className="particle";

    const size =
    Math.random()*6+2;

    p.style.width=size+"px";
    p.style.height=size+"px";

    p.style.left=
    Math.random()*100+"vw";

    p.style.top=
    Math.random()*100+"vh";

    p.style.background=

    colors[
        Math.floor(
            Math.random()*colors.length
        )
    ];

    p.style.animationDuration=

    (10+Math.random()*20)+"s";

    p.style.animationDelay=

    (-Math.random()*20)+"s";

    p.style.opacity=

    Math.random()*0.8+0.2;

    particleContainer.appendChild(p);

}
// ==========================
// THREAT DETECTOR
// ==========================

const ThreatDetector = {

    score(kwami){

        let threat = 0;

        switch(kwami.name){

            case "Plagg":
                threat = 100;
                break;

            case "Roaar":
                threat = 95;
                break;

            case "Mullo":
                threat = 90;
                break;

            case "Longg":
                threat = 88;
                break;

            case "Tussoo":
                threat = 82;
                break;

            case "Xuppu":
                threat = 80;
                break;

            case "Pollen":
                threat = 75;
                break;

            case "Kaalki":
                threat = 72;
                break;

            case "Wayz":
                threat = 65;
                break;

            case "Daizzi":
                threat = 65;
                break;

            case "Fluff":
                threat = 62;
                break;

            case "Sass":
                threat = 60;
                break;

            case "Bark":
                threat = 55;
                break;

            default:
                threat = 50;

        }

        return threat;

    },

    highest(team){

        let highest = null;
        let best = -1;

        team.forEach(k=>{

            if(k.hp <= 0)
                return;

            const threat = this.score(k);

            if(threat > best){

                best = threat;
                highest = k;

            }

        });

        return highest;

    }

};
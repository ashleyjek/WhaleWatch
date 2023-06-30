import WHALEDATA from "./data/whale-data"
import POPULATION from "./data/population";

document.addEventListener("DOMContentLoaded", () => {
    const tab = document.querySelector(".nav-bar");
    
    tab.addEventListener("click", species => {
        updateBasicFacts(species)
 
    })
})

function updateBasicFacts(species) {
    const whaleSpecies = species.target.innerText;

    const name = document.querySelector("#species-name");
    name.innerText = WHALEDATA[whaleSpecies]["species"];

    const weight = document.querySelector("#weight");
    weight.innerText = WHALEDATA[whaleSpecies]["weight"];

    const length = document.querySelector("#length");
    length.innerText = WHALEDATA[whaleSpecies]["length"];

    const lifespan = document.querySelector("#life-span");
    lifespan.innerText = WHALEDATA[whaleSpecies]["lifespan"];

    const threats = document.querySelector("#threats");
    threats.innerText = WHALEDATA[whaleSpecies]["threats"];

    const region = document.querySelector("#region");
    region.innerText = WHALEDATA[whaleSpecies]["region"];

    const rangeMap = document.getElementById('map');
    rangeMap.src = WHALEDATA[whaleSpecies]["map"];

}













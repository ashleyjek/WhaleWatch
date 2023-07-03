import WHALEDATA from "./data/whale-data";
import POPULATION from "./data/population";
import Chart from 'chart.js/auto';
import SPRITES from './data/sprites';


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal");
    const tutButton = document.querySelector(".tutorial-button");
    const exit = document.querySelector(".x")
    tutButton.onclick = function() {
        modal.style.display = "flex";
      }
    exit.onclick = function() {
        modal.style.display = "none";
    }

    let activeTab;
    const tab = document.querySelector(".nav-bar");
    tab.addEventListener("click", species => {
        const whaleSpecies = species.target.innerText;
        updateBasicFacts(whaleSpecies);
        updatePop(whaleSpecies);
        changeWhale(whaleSpecies); 
        activeTab = whaleSpecies;
    })
    
    const myAudio = new Audio("assets/audio/audio.mp3")
    const audioButton = document.querySelector("#audio-button");
    let toggle = true;
    audioButton.addEventListener("click", () => {
        toggle = !toggle;
        if (!toggle) {
            audioButton.src = ("assets/images/audio-off.png")
            myAudio.play();
        } else {
            audioButton.src = ("assets/images/audio-on.png")
            myAudio.pause();
        }
    });

    const rangeMapContainer = document.querySelector('.range-map');
    const rangeMap = document.querySelector('#map-png');
    const rangeText = document.querySelector('#map-text');
    let mapToggle = true;
    rangeMapContainer.addEventListener("click", () => {
        console.log( WHALEDATA[activeTab]);
        mapToggle = !mapToggle;
        if (!mapToggle) {
            rangeMap.style.visibility = "hidden";
            rangeText.innerText = WHALEDATA[activeTab]["region"]
            rangeText.style.visibility = "visible";
        } else {
            rangeText.style.visibility = "hidden";
            rangeMap.src = WHALEDATA[activeTab]["map"];
            rangeMap.style.visibility = "visible";
        }
    });


})



function updateBasicFacts(whaleSpecies) {
    
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

    const region = document.querySelector('#map-text');
    const map = document.querySelector("#map-png");
    if (map.style.visibility !== "hidden") {
        map.src = WHALEDATA[whaleSpecies]["map"];
    } else {
        region.innerText = WHALEDATA[whaleSpecies]["region"];
    }



}

let chart;
function updatePop(whaleSpecies) {
    const popData = POPULATION[whaleSpecies]["population"]
    const years = POPULATION[whaleSpecies]["years"]
    
    const popGraph = document.querySelector("#popGraph");
    if (chart) {
        chart.data = {
            datasets: [{
                label: 'Estimates of global whale populations in pre-whaling periods versus the year 2001'.toUpperCase(),
                data: popData,
                pointRadius: 15,
                pointStyle: 'triangle',
                borderColor: 'green',
            }],
            labels: years,
        }
        chart.update();
    } else {
        chart = new Chart(popGraph, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Estimates of global whale populations in pre-whaling periods versus the year 2001'.toUpperCase(),
                    data: popData,
                    pointRadius: 15,
                    pointStyle: 'triangle',
                    borderColor: 'green',
                }],
                labels: years,
            },
            options: {
                title:{
                  fontSize:40
                },
            }
        });
    }
}



let nIntervId;
let i = 0;

function changeWhale(whaleSpecies) {
    // nIntervId = null
    // if (!nIntervId) {
    //     nIntervId = setInterval(() => {
            const images = SPRITES[whaleSpecies]["imgSrc"] 
            document.querySelector("#size-comp").src = images[0];
//             i++;

//             if (images.length === i) {
//                 clearInterval(nIntervId);
//                 i = 0;
//             }
//         }, 500);
// }
}



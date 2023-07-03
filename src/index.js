import WHALEDATA from "./data/whale-data";
import POPULATION from "./data/population";
import Chart from 'chart.js/auto';
import SPRITES from './data/sprites';
// import { getRelativePosition } from 'chart.js/helpers';


document.addEventListener("DOMContentLoaded", () => {
    let activeTab;
    const tab = document.querySelector(".nav-bar");
    tab.addEventListener("click", species => {
        const whaleSpecies = species.target.innerText;
        updateBasicFacts(whaleSpecies);
        updatePop(whaleSpecies);
        changeWhale(whaleSpecies); 
        // toggleMap(whaleSpecies);
        activeTab = whaleSpecies;
    })
    
    const myAudio = new Audio("src/images/audio.mp3")
    const audioButton = document.querySelector("#audio-button");
    let toggle = true;
    audioButton.addEventListener("click", () => {
        toggle = !toggle;
        if (!toggle) {
            audioButton.src = ("src/images/audio-off.png")
            myAudio.play();
        } else {
            audioButton.src = ("src/images/audio-on.png")
            myAudio.pause();
        }
    });

    const rangeMapContainer = document.querySelector('.range-map');
    const rangeMap = document.querySelector('#map-png');
    const rangeText = document.querySelector('#range-map');
    let mapToggle = true;
    rangeMapContainer.addEventListener("click", () => {
        console.log( WHALEDATA[activeTab]);
        mapToggle = !mapToggle;
        if (!mapToggle) {
            rangeText.innerText = "";
            rangeMap.src = WHALEDATA[activeTab]["map"];
        } else {
            rangeText.innerText = WHALEDATA[activeTab]["region"];
            rangeMap.src = "";
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

}

let chart;
function updatePop(whaleSpecies) {
    const popData = POPULATION[whaleSpecies]["population"]
    const years = POPULATION[whaleSpecies]["years"]
    
    const popGraph = document.querySelector("#popGraph");
    if (chart) {
        chart.data = {
            datasets: [{
                label: 'Estimates of global whale populations in pre-whaling periods versus the year 2001',
                data: popData,
                pointRadius: 15,
                pointStyle: 'triangle',
                borderColor: 'green'
            }],
            labels: years,
        }
        chart.update();
    } else {
        chart = new Chart(popGraph, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Estimates of global whale populations in pre-whaling periods versus the year 2001',
                    data: popData,
                    pointRadius: 15,
                    pointStyle: 'triangle',
                    borderColor: 'green'
                }],
                labels: years,
            },
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


function toggleMap(whaleSpecies) {
    // const rangeMap = document.querySelector('#map-png');
    // rangeMap.src = WHALEDATA[whaleSpecies]["map"];
    const rangeMapContainer = document.querySelector('.range-map');
    const rangeMap = document.querySelector('#map-png');
    const rangeText = document.querySelector('#range-map');
    let toggle = true;
    rangeMapContainer.addEventListener("click", () => {
        console.log( WHALEDATA[whaleSpecies]);
        toggle = !toggle;
        if (!toggle) {
            rangeText.innerText = "";
            rangeMap.src = WHALEDATA[whaleSpecies]["map"];
        } else {
            rangeText.innerText = WHALEDATA[whaleSpecies]["region"];
            rangeMap.src = "";
        }
    });
}

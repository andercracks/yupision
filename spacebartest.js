const spaceArea = document.getElementById("spaceArea");

const pressesText = document.getElementById("presses");
const ppsText = document.getElementById("pps");
const timeText = document.getElementById("time");
const bestScore = document.getElementById("bestScore");

const finalResult = document.getElementById("finalResult");
const finalPresses = document.getElementById("finalPresses");
const finalPPS = document.getElementById("finalPPS");

const modeButtons = document.querySelectorAll(".mode");
const restartButton = document.getElementById("restartButton");
const applyTime = document.getElementById("applyTime");
const customTime = document.getElementById("customTime");

let gameTime = 10;

let presses = 0;
let timeLeft = gameTime;
let timerStarted = false;
let interval;

// el record por el mejor despues actualizo esto
let best = localStorage.getItem("bestPPS");

if(best == null){
    best = 0;
}

bestScore.textContent = best + " PPS";

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(timerStarted) return;

        modeButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        gameTime = parseInt(button.dataset.time);

        timeLeft = gameTime;

        timeText.textContent = gameTime;

    });

});

applyTime.addEventListener("click", () => {

    if(timerStarted) return;

    const value = parseInt(customTime.value);

    if(isNaN(value) || value < 1 || value > 300){
        alert("Choose a value between 1 and 300.");
        return;
    }

    modeButtons.forEach(btn => btn.classList.remove("active"));

    gameTime = value;
    timeLeft = gameTime;
    timeText.textContent = gameTime;

    customTime.value = "";

});

document.addEventListener("keydown", (e) => {

    if(e.code !== "Space") return;

    e.preventDefault();

    if(!timerStarted){

        timerStarted = true;

        interval = setInterval(() => {

            timeLeft--;

            timeText.textContent = timeLeft;

            const pps = (presses / (gameTime - timeLeft)).toFixed(1);

            ppsText.textContent = isNaN(pps) ? "0.0" : pps;

            if(timeLeft <= 0){

                clearInterval(interval);

                timerStarted = false;

                const score = (presses / gameTime).toFixed(1);

                ppsText.textContent = score;

                if(score > best){

                    best = score;

                    localStorage.setItem("bestPPS", best);

                    bestScore.textContent = best + " PPS";

                }

                finalResult.style.display = "block";
                finalPresses.textContent = presses;
                finalPPS.textContent = score;

            }

        },1000);

    }

    if(timeLeft <= 0) return;

    presses++;

    pressesText.textContent = presses;

});

restartButton.addEventListener("click", () => {

    clearInterval(interval);

    presses = 0;

    timerStarted = false;

    timeLeft = gameTime;

    pressesText.textContent = 0;
    ppsText.textContent = "0.0";
    timeText.textContent = gameTime;

    finalResult.style.display = "none";

    customTime.value = "";

});

const button = document.getElementById("dragButton");

const clicksText = document.getElementById("dragClicks");
const cpsText = document.getElementById("cps");
const timeText = document.getElementById("time");
const bestScore = document.getElementById("bestScore");

const modeButtons = document.querySelectorAll(".mode");
const restartButton = document.getElementById("restartButton");
const applyTime = document.getElementById("applyTime");
const customTime = document.getElementById("customTime");

let gameTime = 10;
let timeLeft = gameTime;

let clicks = 0;
let timerStarted = false;
let interval;

let best = localStorage.getItem("bestDragClick");

if(best === null){
    bestScore.textContent = "0 CPS";
}else{
    bestScore.textContent = best + " CPS";
}

modeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        if(timerStarted) return;

        modeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        gameTime = parseInt(btn.dataset.time);
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

button.addEventListener("mousedown", () => {

    if(!timerStarted){

        timerStarted = true;

        interval = setInterval(() => {

            timeLeft--;
            timeText.textContent = timeLeft;

            if(timeLeft <= 0){

                clearInterval(interval);

                button.disabled = true;

                const cps = (clicks / gameTime).toFixed(1);

                if(best === null || parseFloat(cps) > parseFloat(best)){

                    best = cps;
                    localStorage.setItem("bestDragClick", best);
                    bestScore.textContent = best + " CPS";

                }

            }

        },1000);

    }

});

button.addEventListener("click", () => {

    if(!timerStarted) return;

    clicks++;

    clicksText.textContent = clicks;

    cpsText.textContent = (clicks / (gameTime - timeLeft || 1)).toFixed(1);

});

restartButton.addEventListener("click", () => {

    clearInterval(interval);

    timerStarted = false;

    clicks = 0;

    timeLeft = gameTime;

    clicksText.textContent = 0;
    cpsText.textContent = "0.0";
    timeText.textContent = gameTime;

    button.disabled = false;

    customTime.value = "";

});

const clickButton = document.getElementById("clickButton");

const clicksText = document.getElementById("clicks");
const cpsText = document.getElementById("cps");
const timeText = document.getElementById("time");
const bestScore = document.getElementById("bestScore");
const modeButtons = document.querySelectorAll(".mode");
const restartButton = document.getElementById("restartButton");

let gameTime = 10;

let clicks = 0;
let timeLeft = gameTime;
let timerStarted = false;
let interval;

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

// Cargar récord
let best = localStorage.getItem("bestCPS");

if(best == null){
    best = 0;
}

bestScore.textContent = best + " CPS";

clickButton.addEventListener("click", () => {

    if(!timerStarted){

        timerStarted = true;

        interval = setInterval(() => {

            timeLeft--;

            timeText.textContent = timeLeft;

            const cps = (clicks / (gameTime - timeLeft)).toFixed(1);

            cpsText.textContent = isNaN(cps) ? "0.0" : cps;

            if(timeLeft <= 0){

                clearInterval(interval);

                clickButton.disabled = true;

                const finalCPS = (clicks / gameTime).toFixed(1);

                cpsText.textContent = finalCPS;

                if(finalCPS > best){

                    best = finalCPS;

                    localStorage.setItem("bestCPS", best);

                    bestScore.textContent = best + " CPS";

                }

                setTimeout(() => {

                    alert("🎉 Tiempo terminado\n\nClicks: " + clicks + "\nCPS: " + finalCPS);

                },200);

            }

        },1000);

    }

    clicks++;

    clicksText.textContent = clicks;

    restartButton.addEventListener("click", () => {

        clearInterval(interval);

        clicks = 0;
        timerStarted = false;
        timeLeft = gameTime;

        clicksText.textContent = 0;
        cpsText.textContent = "0.0";
        timeText.textContent = gameTime;

        clickButton.disabled = false;

    });

});
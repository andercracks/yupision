const reactionBox = document.getElementById("reactionBox");

const reactionTitle = document.getElementById("reactionTitle");
const reactionText = document.getElementById("reactionText");

const currentTime = document.getElementById("currentTime");
const bestTime = document.getElementById("bestTime");
const attempts = document.getElementById("attempts");
const bestScore = document.getElementById("bestScore");

const restartButton = document.getElementById("restartButton");

let state = "idle";
let startTime = 0;
let timeout;

let totalAttempts = 0;

let best = localStorage.getItem("bestReaction");

if(best === null){

    bestTime.textContent = "--";
    bestScore.textContent = "-- ms";

}else{

    bestTime.textContent = best + " ms";
    bestScore.textContent = best + " ms";

}

reactionBox.addEventListener("click", () => {

    // Iniciar
    if(state === "idle"){

        state = "waiting";

        reactionBox.classList.add("waiting");

        reactionTitle.textContent = "Wait...";
        reactionText.textContent = "Wait for green.";

        const delay = Math.floor(Math.random() * 3000) + 2000;

        timeout = setTimeout(() => {

            state = "ready";

            reactionBox.classList.remove("waiting");
            reactionBox.classList.add("ready");

            reactionTitle.textContent = "CLICK!";
            reactionText.textContent = "Click now!";

            startTime = Date.now();

        }, delay);

        return;

    }

    // hizo el clik muy pronto
    if(state === "waiting"){

        clearTimeout(timeout);

        state = "idle";

        reactionBox.classList.remove("waiting");

        reactionTitle.textContent = "Too Soon!";
        reactionText.textContent = "Click to try again.";

        return;

    }

    // midiendo la reaccion
    if(state === "ready"){

        const reaction = Date.now() - startTime;

        totalAttempts++;

        attempts.textContent = totalAttempts;

        currentTime.textContent = reaction + " ms";

        if(best === null || reaction < parseInt(best)){

            best = reaction;

            localStorage.setItem("bestReaction", best);

            bestTime.textContent = best + " ms";
            bestScore.textContent = best + " ms";

        }

        state = "idle";

        reactionBox.classList.remove("ready");

        reactionTitle.textContent = reaction + " ms";
        reactionText.textContent = "Click to play again.";

    }

});

restartButton.addEventListener("click", () => {

    clearTimeout(timeout);

    state = "idle";

    totalAttempts = 0;

    attempts.textContent = 0;

    currentTime.textContent = "0 ms";

    reactionBox.classList.remove("waiting");
    reactionBox.classList.remove("ready");

    reactionTitle.textContent = "Click to Start";
    reactionText.textContent = "Click anywhere inside this box.";

});

const button = document.getElementById("doubleClickButton");

const doubleClicks = document.getElementById("doubleClicks");
const clickTime = document.getElementById("clickTime");
const bestTime = document.getElementById("bestTime");

const rating = document.getElementById("rating");
const resultTime = document.getElementById("resultTime");

let firstClick = 0;
let waitingSecondClick = false;
let totalDoubleClicks = 0;

// el mejor tiempo se guarda 
let best = localStorage.getItem("bestDoubleClick");

if(best === null){

    bestTime.textContent = "--";

}else{

    bestTime.textContent = best + " ms";

}

button.addEventListener("click", () => {

    const now = Date.now();

    if(!waitingSecondClick){

        firstClick = now;
        waitingSecondClick = true;

        rating.textContent = "Waiting...";
        resultTime.textContent = "Click again!";

        return;

    }

    const time = now - firstClick;

    waitingSecondClick = false;

    totalDoubleClicks++;

    doubleClicks.textContent = totalDoubleClicks;
    clickTime.textContent = time + " ms";
    resultTime.textContent = time + " ms";

    if(time < 200){

        rating.textContent = "🟢 Excellent";

    }else if(time < 300){

        rating.textContent = "🔵 Very Good";

    }else if(time < 500){

        rating.textContent = "🟡 Good";

    }else if(time < 700){

        rating.textContent = "🟠 Average";

    }else{

        rating.textContent = "🔴 Slow";

    }

    if(best === null || time < parseInt(best)){

        best = time;

        localStorage.setItem("bestDoubleClick", best);

        bestTime.textContent = best + " ms";

    }

});

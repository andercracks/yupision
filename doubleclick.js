const button = document.getElementById("doubleClickButton");

const doubleClicks = document.getElementById("doubleClicks");
const bestTime = document.getElementById("bestTime");

const rating = document.getElementById("rating");
const resultTime = document.getElementById("resultTime");

const timeText = document.getElementById("time");
const modeButtons = document.querySelectorAll(".mode");
const restartButton = document.getElementById("restartButton");
const applyTime = document.getElementById("applyTime");
const customTime = document.getElementById("customTime");

let firstClick = 0;
let waitingSecondClick = false;
let totalDoubleClicks = 0;

let gameTime = 10;
let timeLeft = gameTime;
let timerStarted = false;
let interval;

// el mejor tiempo se guarda 
let best = localStorage.getItem("bestDoubleClick");

if(best === null){

    bestTime.textContent = "--";

}else{

    bestTime.textContent = best + " ms";

}

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
        
    });
    


button.addEventListener("click", () => {

    if(!timerStarted){

        timerStarted = true;
    
        interval = setInterval(() => {
    
            timeLeft--;
    
            timeText.textContent = timeLeft;
    
            if(timeLeft <= 0){
    
                clearInterval(interval);
    
                button.disabled = true;
    
            }
    
        },1000);
    
    }
    
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

    restartButton.addEventListener("click", () => {
    
        clearInterval(interval);
    
        timerStarted = false;
    
        timeLeft = gameTime;
    
        firstClick = 0;
    
        waitingSecondClick = false;
    
        totalDoubleClicks = 0;
    
        doubleClicks.textContent = 0;
    
        rating.textContent = "Waiting...";
    
        resultTime.textContent = "Double click to start.";
    
        timeText.textContent = gameTime;
    
        button.disabled = false;
        customTime.value = "";
    });

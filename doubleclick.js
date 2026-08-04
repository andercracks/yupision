const button = document.getElementById("doubleClickButton");

const doubleClicks = document.getElementById("doubleClicks");
const bestTime = document.getElementById("bestTime");

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
timeText.textContent = gameTime;

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
            customTime.value = "";
        
    });
    


button.addEventListener("click", () => {
console.log("Click detectado");
    if(!timerStarted){

        timerStarted = true;
    
        interval = setInterval(() => {
    
            timeLeft--;
    
            timeText.textContent = timeLeft;
    
            if(timeLeft <= 0){
    
                clearInterval(interval);

                timerStarted = false;
                button.disabled = true;
    
            }
    
        },1000);
    
    }
    
        const now = Date.now();
    
        if(!waitingSecondClick){
    
            firstClick = now;
            waitingSecondClick = true;
    
            return;

        }
    
        const time = now - firstClick;
        firstClick = 0;
    
        waitingSecondClick = false;
    
        totalDoubleClicks++;
    
        doubleClicks.textContent = totalDoubleClicks;
    
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
    
        timeText.textContent = gameTime;
    
        button.disabled = false;
        customTime.value = "";
    });

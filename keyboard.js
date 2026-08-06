const keys = document.querySelectorAll(".key");

const pressedKeys = document.getElementById("pressedKeys");
const lastKey = document.getElementById("lastKey");
const workingKeys = document.getElementById("workingKeys");

const resetButton = document.getElementById("resetKeyboard");

let totalPressed = 0;

const testedKeys = new Set();

document.addEventListener("keydown", (event) => {

    totalPressed++;

    pressedKeys.textContent = totalPressed;

    lastKey.textContent = event.key;

    const key = document.querySelector(`[data-key="${event.code}"]`);

    if(key){

        key.classList.add("active");

        testedKeys.add(event.code);

        workingKeys.textContent = testedKeys.size;

    }

});

document.addEventListener("keyup", (event) => {

    const key = document.querySelector(`[data-key="${event.code}"]`);

    if(key){

        key.classList.remove("active");

    }

});

resetButton.addEventListener("click", () => {

    totalPressed = 0;

    testedKeys.clear();

    pressedKeys.textContent = 0;

    workingKeys.textContent = 0;

    lastKey.textContent = "-";

    keys.forEach(key => {

        key.classList.remove("active");

    });

});

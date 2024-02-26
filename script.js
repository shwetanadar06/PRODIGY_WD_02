let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let lapDisplay = document.querySelector(".lap-display");
let int = null;
let startButton = document.getElementById("start-timer");
let lapButton = document.getElementById("pause-timer"); // assuming pause-timer is the lap button

startButton.addEventListener("click", () => {
    if (int === null) {
        int = setInterval(displayTimer, 10);
        startButton.textContent = "Lap";
    } else {
        console.log(getFormattedTime());
        // Display lap time on UI
        displayLap(getFormattedTime());
    }
});

lapButton.addEventListener("click", () => {
    console.log(getFormattedTime());
    // Display lap time on UI
    displayLap(getFormattedTime());
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
    int = null;
    startButton.textContent = "Start";
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.textContent = "00 : 00 : 00 : 000 ";
    startButton.textContent = "Start";
    lapDisplay.innerHTML = ""; // Clear lap times on reset
}); 

function displayTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = 
        milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timeRef.textContent = h + " : " + m + " : " + s + " : " + ms;
}

function getFormattedTime() {
    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

function displayLap(time) {
    // Create a new element for displaying lap time
    let lapTimeElement = document.createElement("div");
    lapTimeElement.textContent = time;
    lapDisplay.appendChild(lapTimeElement);
}
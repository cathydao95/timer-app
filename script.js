const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#btnStart");
const pauseButton = document.querySelector("#btnPause");
const circle = document.querySelector("circle");

const circumference = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", circumference);

let duration;
const timerApp = new Timer(durationInput, startButton, pauseButton, {
  // adding onStart, onTick, and onComplete to communicate with outside world that something happened
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (circumference * timeRemaining) / duration - circumference
    );
  },
  onComplete() {
    console.log("timer is complete");
  },
});

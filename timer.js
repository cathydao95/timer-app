class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    // to show that callbacksare optional:
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    // why need to put this before start.bind? and why does eventlistener go into constructor?
    startButton.addEventListener("click", this.start);
    pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    // Changed const interval to this.interval to allow pause method to access timer???
    this.interval = setInterval(this.tick, 50);
  };

  pause = () => {
    console.log("Pausing");
    clearInterval(this.interval);
  };

  tick = () => {
    //   const timeRemaining = parseFloat(this.duration.value); rewriting using the get timeRemaining to get:
    // const timeRemaining = this.timeRemaining;
    // // this.durationInput.value = timeRemaining - 1; rewriting using the set timeRemaining to get:
    // this.timeRemaining = timeRemaining - 1;
    // reducing everything above and simplyfing to

    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}

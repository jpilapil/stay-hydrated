import React, { useState } from "react";
import { useEffect, useRef } from "react";
import "./style/master.scss";
import Hydrate from "./components/Hydrate";
import Reset from "./components/Reset";
import Title from "./components/Title";
import Timer from "./components/Timer";
import SetTime from "./components/SetTime";

function App() {
  const audioElement = useRef();
  const [timerLength, setTimerLength] = useState(60 * 30);
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timerLength);

  // change time left whenever timerLength changes
  useEffect(() => {
    setTimeLeft(timerLength);
  }, [timerLength]);

  const decrementTimerLengthByOneMinute = () => {
    const newTimerLength = timerLength - 60;

    if (newTimerLength > 0) {
      setTimerLength(newTimerLength);
    }
  };

  const incrementTimerLengthByOneMinute = () => {
    const newTimerLength = timerLength + 60;
    if (newTimerLength <= 60 * 60) {
      setTimerLength(newTimerLength);
    }
  };

  const isStarted = intervalId !== null;

  const handleStartStopClick = () => {
    if (isStarted) {
      // if timer is started, we want to stop timer // if timer is started, we want to stop timer
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // decrement timeleft by one every second (1000ms)
      // setInterval runs every second (1000ms)
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          } else {
            audioElement.current.play();
            return prevTimeLeft;
          }
        });
      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load();
    // clear timeout interval
    clearInterval(intervalId);
    // set intervalId to null
    setIntervalId(null);

    // reset the timer to 30 minutes (timerLength)
    setTimerLength(60 * 30);
  };

  return (
    <div className="container">
      <Title />
      <Timer
        timerLength={timerLength}
        handleStartStopClick={handleStartStopClick}
        timeLeft={timeLeft}
      />

      <SetTime
        timerLength={timerLength}
        decrementTimerLengthByOneMinute={decrementTimerLengthByOneMinute}
        incrementTimerLengthByOneMinute={incrementTimerLengthByOneMinute}
      />
      {/* <button id="reset" onClick={handleResetButtonClick}>
        RESET
      </button> */}
      <Hydrate
        startStopButtonLabel={isStarted ? "STOP" : "HYDRATE"}
        handleStartStopClick={handleStartStopClick}
      />
      <Reset handleResetButtonClick={handleResetButtonClick} />
      <audio id="water" ref={audioElement}>
        <source
          src="https://actions.google.com/sounds/v1/foley/drinking_from_water_fountain.ogg"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;

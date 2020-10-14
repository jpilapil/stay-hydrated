import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function SetTime(props) {
  return (
    <>
      <div className="row mt-1">
        <div className="col-12 d-flex justify-content-center">
          <label
            className="set-timer-buttons mx-2"
            id="timer-decrement"
            onClick={props.decrementTimerLengthByOneMinute}
          >
            <FontAwesomeIcon icon={faMinus} className="minus-button" />
          </label>
          <label
            className="set-timer-buttons mx-2"
            id="timer-increment"
            onClick={props.incrementTimerLengthByOneMinute}
          >
            <FontAwesomeIcon icon={faPlus} className="plus-button" />
          </label>
        </div>
      </div>
    </>
  );
}

export default SetTime;

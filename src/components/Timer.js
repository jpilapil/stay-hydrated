import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";

momentDurationFormatSetup(moment);

const Timer = ({ timeLeft }) => {
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-center">
          <h1 className="text-primary" id="time-left">
            {formattedTimeLeft}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Timer;

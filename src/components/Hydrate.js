import React from "react";

function Hydrate({ startStopButtonLabel, handleStartStopClick }) {
  return (
    <div className="row mt-5">
      <div className="col-12 d-flex justify-content-center">
        <button
          type="button"
          className="btn-lg btn-primary"
          onClick={handleStartStopClick}
        >
          {startStopButtonLabel}
        </button>
      </div>
    </div>
  );
}

export default Hydrate;

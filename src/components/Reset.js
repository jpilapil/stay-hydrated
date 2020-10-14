import React from "react";

function Reset({ handleResetButtonClick }) {
  return (
    <div className="row mt-3">
      <div className="col-12 d-flex justify-content-center">
        <button
          className="btn btn-link"
          id="reset"
          onClick={handleResetButtonClick}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default Reset;

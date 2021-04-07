import React, { Fragment } from "react";

const Spinner = () => {
  return (
    <Fragment>
      <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-100 z-50">
        <span
          class="text-indigo-600 opacity-100 top-1/2 my-0 mx-auto block relative w-0 h-0"
          style={{ top: "50%" }}>
          <i class="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    </Fragment>
  );
};

export default Spinner;

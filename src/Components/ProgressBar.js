import React from "react";
import loading from "./loading.gif";

const ProgressBar = () => {
  return (
    <div className="my-3 text-center">
      <img src={loading} alt="loading..." />
    </div>
  );
};

export default ProgressBar;

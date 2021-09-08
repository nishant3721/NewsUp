import React from "react";

export default function ScrollUp(props) {
  const handleOnTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
      }}
    >
      <button
        onClick={handleOnTop}
        type="button"
        className={`btn btn-danger rounded-circle ${
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
            ? `visible`
            : `invisible`
        }`}
      >
        &#8593;
      </button>
    </div>
  );
}

import React from "react";

const Loader = () => {
  return (
    <div className="pt-10 justify-center items-center flex">
      <div
        className="animate-spin"
        style={{
          border: "8px solid #f3f3f3",
          borderTop: "8px solid #3498db",
          borderRadius: "50%",
          width: "80px",
          height: "80px",
        }}
      ></div>
    </div>
  );
};

export default Loader;

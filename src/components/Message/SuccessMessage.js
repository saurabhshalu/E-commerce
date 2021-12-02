import React from "react";

const SuccessMessage = ({ children }) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4"
      role="alert"
    >
      {children}
    </div>
  );
};

export default SuccessMessage;

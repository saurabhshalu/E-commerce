import React from "react";

const InformationMessage = ({ children }) => {
  return (
    <div
      className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
      role="alert"
    >
      {children}
    </div>
  );
};

export default InformationMessage;

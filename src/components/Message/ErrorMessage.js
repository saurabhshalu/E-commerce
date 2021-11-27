import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4"
      role="alert"
    >
      {children}
    </div>
  );
};

export default ErrorMessage;

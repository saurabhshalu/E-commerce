import React from "react";

const SuccessMessage = ({ children }) => {
  return (
    // <div
    //   className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4"
    //   role="alert"
    // >
    //   {children}
    // </div>
    <div
      className="
        my-3
        text-sm text-left text-black
        font-bold
        bg-green-500
        h-12
        flex
        items-center
        p-4
        rounded-md
      "
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="w-6 h-6 mx-2 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      {children}
    </div>
  );
};

export default SuccessMessage;

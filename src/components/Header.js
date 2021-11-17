import React from "react";

const Header = () => {
  return (
    <nav className="bg-gray-900 h-16 flex items-center justify-between text-white p-8">
      <div className="font-bold text-xl">brandName</div>
      <div className="flex items-center">
        <ul className="flex ">
          <li className="pl-4">Home</li>
          <li className="pl-4">Instagram</li>
          <li className="pl-4">Login</li>
        </ul>
        <button className="font-bold rounded-md py-2 px-6 ml-4 bg-indigo-700 hover:bg-opacity-50">Create Account</button>
      </div>
    </nav>
  );
};

export default Header;

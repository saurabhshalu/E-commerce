import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-900 h-16 flex items-center justify-between text-white p-8 fixed w-full z-10">
      <div className="font-bold text-xl">
        <Link to="/">SurabhiArtGallery</Link>
      </div>
      <div className="flex items-center">
        <ul className="flex ">
          <li className="pl-4">Home</li>
          <li className="pl-4">Cart</li>
          <li className="pl-4">Login</li>
        </ul>
        <button className="font-bold rounded-md py-2 px-6 ml-4 bg-indigo-700 hover:bg-opacity-50">
          Create Account
        </button>
      </div>
    </nav>
  );
};

export default Header;

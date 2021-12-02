import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 h-16 flex items-center justify-between text-white p-8 fixed w-full z-10">
      <div className="font-bold text-xl">
        <Link to="/">SurabhiArtGallery</Link>
      </div>
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="pl-4">
            <Link to="/">Home</Link>
          </li>
          <li className="pl-4">
            <Link to="/cart">Cart</Link>
          </li>
          {!userInfo ? (
            <li className="pl-4">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <div className="pl-4">
              <div className="dropdown">
                <button className="dropbtn">
                  <b>{userInfo.name} V</b>
                </button>
                <div className="dropdown-content">
                  <Link to="profile">Profile</Link>
                  <button className="w-full text-left" onClick={logoutHandler}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </ul>
        {/* <button className="font-bold rounded-md py-2 px-6 ml-4 bg-indigo-700 hover:bg-opacity-50">
          Create Account
        </button> */}
      </div>
    </nav>
  );
};

export default Header;

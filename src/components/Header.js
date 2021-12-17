import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";

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
        <Link to="/">E-Commerce App</Link>
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
                <button className="dropbtn flex">
                  <b>{userInfo.name}</b>
                  <svg
                    viewBox="0 0 140 140"
                    width="15"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                  >
                    <g>
                      <path
                        d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                        fill="white"
                      />
                    </g>
                  </svg>
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
          {userInfo && userInfo.isAdmin && (
            <div>
              <div className="dropdown">
                <button className="dropbtn flex">
                  <b>Admin</b>
                  <svg
                    viewBox="0 0 140 140"
                    width="15"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                  >
                    <g>
                      <path
                        d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <Link to="admin/userList">Users</Link>
                  <Link to="admin/productList">Products</Link>
                  <Link to="admin/orderList">Orders</Link>
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

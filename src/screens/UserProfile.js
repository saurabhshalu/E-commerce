import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import {
  getUserDetails,
  updateProfile,
  USER_UPDATE_PROFILE_RESET,
} from "../redux/user/userDetailsSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { user, updatedProfile } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, dispatch, user]);

  useEffect(() => {
    dispatch(USER_UPDATE_PROFILE_RESET());
  }, [dispatch]);

  const updateHandler = () => {
    setMessage(null);
    if (password && password.length < 6) {
      setMessage("Password must be of 6 or more character");
    } else if (password !== confirmPassword) {
      setMessage("Password does not match.");
    } else {
      dispatch(updateProfile({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <div className="p-8 flex">
      <div className="w-96">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="border-2 mt-6 mr-6 p-6 flex flex-col">
          {updatedProfile.error && (
            <ErrorMessage>{updatedProfile.error}</ErrorMessage>
          )}
          {updatedProfile.success && (
            <SuccessMessage>Profile updated successfully</SuccessMessage>
          )}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="text"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="password"
            placeholder="password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 rounded-md p-2 m-2"
            type="password"
            placeholder="confirm password"
          />
          {message && <div className="mx-2 my-1 text-red-700">{message}</div>}

          <div>
            <button
              onClick={updateHandler}
              disabled={updatedProfile.loading}
              className={`px-8 py-2 rounded-md text-white font-bold m-2 ${
                updatedProfile.loading
                  ? "bg-gray-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {updatedProfile.loading ? "Please wait..." : "Update"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold">Orders</h1>
      </div>
    </div>
  );
};

export default UserProfile;

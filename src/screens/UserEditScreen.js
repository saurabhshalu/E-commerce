import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import { getUserDetails } from "../redux/user/userDetailsSlice";
import {
  reset as resetUpdate,
  updateUser,
} from "../redux/user/userUpdateSlice";
const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user, loading, error } = useSelector((state) => state.userDetails);

  const {
    user: userUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.userUpdate);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    if (Object.keys(userUpdate).length > 0) {
      dispatch(resetUpdate());
      navigate("/admin/userList");
    } else {
      if (!user || !user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user, navigate, userUpdate]);

  const updateUserHandler = () => {
    const payload = { name, email, isAdmin };
    dispatch(updateUser({ id, payload }));
  };

  return (
    <div className="flex p-6 flex-col items-center">
      <h1 className="text-2xl">Update User</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="border-2 m-6 p-6 flex flex-col">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {errorUpdate && <ErrorMessage>{errorUpdate}</ErrorMessage>}
          {userUpdate.name && (
            <SuccessMessage>User updated successfully.</SuccessMessage>
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
          <div>
            <input
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="border-2 rounded-md p-2 m-2"
              type="checkbox"
            />{" "}
            isAdmin
          </div>
          <div>
            <button
              onClick={updateUserHandler}
              disabled={loadingUpdate}
              className={`px-8 py-2 rounded-md text-white font-bold m-2 ${
                loadingUpdate
                  ? "bg-gray-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loadingUpdate ? "Please wait..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEditScreen;

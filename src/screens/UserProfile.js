import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import { getMyOrders } from "../redux/order/myOrderSlice";
import {
  getUserDetails,
  updateProfile,
  USER_UPDATE_PROFILE_RESET,
} from "../redux/user/userDetailsSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.myOrder);
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
        dispatch(getMyOrders());
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
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : orders.length === 0 ? (
          <ErrorMessage>No order found</ErrorMessage>
        ) : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div
                  className="
          shadow
          overflow-hidden
          border-b border-gray-200
          sm:rounded-lg
        "
                >
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                        >
                          Paid
                        </th>
                        <th
                          scope="col"
                          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                        >
                          Delivered
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {order._id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {order.createdAt.substring(0, 10)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {order.totalPrice}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.isPaid
                              ? order.paidAt.substring(0, 10)
                              : "NO"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.isDelivered
                              ? order.deliveredAt.substring(0, 10)
                              : "NO"}
                          </td>
                          <td
                            className="
                  px-6
                  py-4
                  whitespace-nowrap
                  text-right text-sm
                  font-medium
                "
                          >
                            <Link
                              to={`/order/${order._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import { deleteUser } from "../redux/user/userDeleteSlice";
import { getUserList } from "../redux/user/userListSlice";

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.userList);
  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.userDelete
  );

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Users</h1>
      {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
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
                        Name
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
                        Email
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
                        Admin
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.isAdmin ? (
                            <span className="font-bold text-green-700">
                              YES
                            </span>
                          ) : (
                            "NO"
                          )}
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
                            to={`/user/${user._id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              deleteHandler(user._id);
                            }}
                            className="text-red-600 hover:text-red-900 ml-4"
                          >
                            Delete
                          </button>
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
  );
};

export default UserListScreen;

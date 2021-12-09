import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/Message/ErrorMessage";
import { login } from "../redux/user/userSlice";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");

  const { error, userInfo, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo) {
      navigate(redirect ? `/${redirect}` : "/");
    }
  }, [userInfo, redirect, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    dispatch(login({ email, password }));
  };
  return (
    <div className="flex p-6 flex-col items-center">
      <h1 className="text-2xl">Login</h1>
      <div className="border-2 m-6 p-6">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 rounded-md p-2 m-2"
          type="text"
          placeholder="email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 rounded-md p-2 m-2"
          type="password"
          placeholder="password"
        />
        {/* <br />
        {error && <div className="mx-2 my-1 text-red-700">{error}</div>} */}

        <div>
          <button
            onClick={loginHandler}
            disabled={loading}
            className={`px-8 py-2 rounded-md text-white font-bold m-2 ${
              loading ? "bg-gray-700" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
          <div>
            New Customer,&nbsp;
            <Link
              className="font-bold"
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/Message/ErrorMessage";
import { register } from "../redux/user/userRegisterSlice";
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");

  const { error, userInfo, loading } = useSelector(
    (state) => state.userRegister
  );
  useEffect(() => {
    if (userInfo) {
      navigate(redirect ? `/${redirect}` : "/");
    }
  }, [userInfo, redirect, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);

  const registerHandler = () => {
    setMessage(null);
    if (password.length < 6) {
      setMessage("Password must be of 6 or more character");
    } else if (password !== confirmPassword) {
      setMessage("Password does not match.");
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  return (
    <div className="flex p-6 flex-col items-center">
      <h1 className="text-2xl">Sign Up</h1>
      <div className="border-2 m-6 p-6 flex flex-col">
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
            onClick={registerHandler}
            disabled={loading}
            className={`px-8 py-2 rounded-md text-white font-bold m-2 ${
              loading ? "bg-gray-700" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Please wait..." : "Register"}
          </button>
          <div>
            Already have account?,&nbsp;
            <Link
              className="font-bold"
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;

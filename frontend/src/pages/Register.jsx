import axios from "axios";
import { useState, useContext } from "react";

import { UserContext } from "../UserContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pageView, setPageView] = useState("register");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`/auth/${pageView}`, {
      username,
      password,
    });
    setLoggedInUsername(response.data.user.username);
    setId(response.data.user._id);
  };

  return (
    <>
      <div className="w-full max-w-xs mx-auto my-10">
        <h4 className="mb-5 text-2xl font-bold">
          {pageView === "register" ? "Register" : "Login"}
        </h4>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {pageView !== "register" ? "Login" : "Register"}
            </button>
          </div>

          {pageView === "register" && (
            <p className="block mt-4">
              Already a member? &nbsp;
              <button onClick={() => setPageView("login")}>Login In</button>
            </p>
          )}
          {pageView === "login" && (
            <p className="block mt-4">
              Not a member? &nbsp;
              <button onClick={() => setPageView("register")}>Register</button>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;

import React from "react";
import request from "request";
import { proxy } from "../constants";

const Login = ({ email, password, setEmail, setPassword, setUserData }) => {
  const handleLogin = async e => {
    e.preventDefault();

    request(
      proxy + "https://projedex.herokuapp.com/users/login",
      {
        json: true,
        body: { email, password },
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      },
      (error, response, body) => {
        if (error) {
          return console.error(error);
        }

        setUserData(body);
      }
    );
  };
  return (
    <div id="login">
      <h2>Login</h2>
      <label>Email</label>
      <input
        id="login-email"
        onChange={e => setEmail(e.target.value)}
        type="text"
      />
      <label>Password</label>
      <input
        id="login-password"
        onChange={e => setPassword(e.target.value)}
        type="text"
      />
      <button onClick={handleLogin} type="button">
        Login
      </button>
    </div>
  );
};

export default Login;

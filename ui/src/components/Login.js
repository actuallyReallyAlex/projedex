import React from "react";
import { login } from "../requests";

const Login = ({ email, password, setEmail, setPassword, setUserData }) => {
  const handleLogin = async e => {
    e.preventDefault();

    login(email, password, setUserData);
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

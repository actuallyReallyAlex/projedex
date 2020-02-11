import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../redux/actions/user";
import { connect } from "react-redux";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
      <button onClick={() => handleLogin(email, password)} type="button">
        Login
      </button>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleLogin: (email, password) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(Login);

import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../requests";
import { connect } from "react-redux";
import { setUserData } from "../redux/actions/app";

const Login = ({ handleSetUserData }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async e => {
    e.preventDefault();

    login(email, password, handleSetUserData);
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

Login.propTypes = {
  handleSetUserData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(null, mapDispatchToProps)(Login);

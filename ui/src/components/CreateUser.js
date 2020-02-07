import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUser } from "../requests";
import { connect } from "react-redux";
import { setUserData } from "../redux/actions/app";

const CreateUser = ({ handleSetUserData }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleCreateUser = async e => {
    e.preventDefault();

    createUser(email, password, name, handleSetUserData);
  };
  return (
    <div id="createUser">
      <h2>Create User</h2>
      <label>Name</label>
      <input
        id="create-user-name"
        onChange={e => setName(e.target.value)}
        type="text"
      />
      <label>Email</label>
      <input
        id="create-user-email"
        onChange={e => setEmail(e.target.value)}
        type="text"
      />
      <label>Password</label>
      <input
        id="create-user-password"
        onChange={e => setPassword(e.target.value)}
        type="text"
      />
      <button onClick={handleCreateUser} type="button">
        Create User
      </button>
    </div>
  );
};

CreateUser.propTypes = {
  handleSetUserData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(null, mapDispatchToProps)(CreateUser);

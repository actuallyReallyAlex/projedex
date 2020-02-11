import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUser } from "../redux/actions/user";
import { connect } from "react-redux";

const CreateUser = ({ handleCreateUser }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
      <button
        onClick={() => handleCreateUser(email, name, password)}
        type="button"
      >
        Create User
      </button>
    </div>
  );
};

CreateUser.propTypes = {
  handleCreateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleCreateUser: (email, name, password) =>
    dispatch(createUser(email, name, password))
});

export default connect(null, mapDispatchToProps)(CreateUser);

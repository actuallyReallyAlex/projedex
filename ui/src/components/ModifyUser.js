import React, { useState } from "react";
import PropTypes from "prop-types";
import { modifyUser } from "../redux/actions/user";
import { connect } from "react-redux";

const ModifyUser = ({ handleModifyUser }) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const createModification = () => {
    const modification = {};

    const fields = [{ email }, { name }, { password }];

    fields.forEach(field => {
      const key = Object.keys(field);
      if (field[key]) modification[key] = field[key];
    });

    handleModifyUser(modification);
  };

  return (
    <div id="modify-user">
      <h2>Modify User</h2>
      <span>Not all fields are required.</span>
      <div>
        <label>Email</label>
        <input
          id="modify-user-email"
          onChange={e => setEmail(e.target.value)}
          type="text"
        />
        <label>Name</label>
        <input
          id="modify-user-name"
          onChange={e => setName(e.target.value)}
          type="text"
        />
        <label>Password</label>
        <input
          id="modify-user-password"
          onChange={e => setPassword(e.target.value)}
          type="text"
        />
        <button onClick={() => createModification()} type="button">
          Modify User
        </button>
      </div>
    </div>
  );
};

ModifyUser.propTypes = {
  handleModifyUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleModifyUser: modification => dispatch(modifyUser(modification))
});

export default connect(null, mapDispatchToProps)(ModifyUser);

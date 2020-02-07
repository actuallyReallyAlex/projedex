import React, { useState } from "react";
import PropTypes from "prop-types";
import { modifyUser } from "../requests";
import { connect } from "react-redux";
import { setUserData } from "../redux/actions/app";

const ModifyUser = ({ handleSetUserData, userData }) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleModifyUser = () => {
    const requestBody = {};
    const fields = [{ email }, { name }, { password }];

    fields.forEach(field => {
      const key = Object.keys(field);
      if (field[key]) requestBody[key] = field[key];
    });

    modifyUser(requestBody, userData, setUserData);
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
        <button onClick={handleModifyUser} type="button">
          Modify User
        </button>
      </div>
    </div>
  );
};

ModifyUser.propTypes = {
  handleSetUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({ userData: app.userData });

const mapDispatchToProps = dispatch => ({
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyUser);

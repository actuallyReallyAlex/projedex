import React from "react";
import PropTypes from "prop-types";
import { deleteUser } from "../requests";
import { connect } from "react-redux";
import { setUserData } from "../redux/actions/app";

const DeleteUser = ({ handleSetUserData, userData }) => {
  const handleDeleteUser = () => deleteUser(userData, handleSetUserData);
  return (
    <div id="delete-user">
      <h2>Delete User</h2>
      <button onClick={handleDeleteUser} type="button">
        Delete User
      </button>
    </div>
  );
};

DeleteUser.propTypes = {
  handleSetUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({ userData: app.userData });

const mapDispatchToProps = dispatch => ({
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);

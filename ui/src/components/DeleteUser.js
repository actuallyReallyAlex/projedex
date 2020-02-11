import React from "react";
import PropTypes from "prop-types";
import { deleteUser } from "../redux/actions/user";
import { connect } from "react-redux";

const DeleteUser = ({ handleDeleteUser }) => {
  return (
    <div id="delete-user">
      <h2>Delete User</h2>
      <button onClick={() => handleDeleteUser()} type="button">
        Delete User
      </button>
    </div>
  );
};

DeleteUser.propTypes = {
  handleDeleteUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleDeleteUser: () => dispatch(deleteUser())
});

export default connect(null, mapDispatchToProps)(DeleteUser);

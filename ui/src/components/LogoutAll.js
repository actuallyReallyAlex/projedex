import React from "react";
import PropTypes from "prop-types";
import { logoutAll } from "../redux/actions/user";
import { connect } from "react-redux";

const LogoutAll = ({ handleLogoutAll }) => {
  return (
    <div id="logout-all">
      <h2>Logout All</h2>
      <button onClick={() => handleLogoutAll()} type="button">
        Logout All
      </button>
    </div>
  );
};

LogoutAll.propTypes = {
  handleLogoutAll: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleLogoutAll: () => dispatch(logoutAll())
});

export default connect(null, mapDispatchToProps)(LogoutAll);

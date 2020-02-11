import React from "react";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/user";
import { connect } from "react-redux";

const Logout = ({ handleLogout }) => {
  return (
    <div id="logout">
      <h2>Logout</h2>
      <button onClick={() => handleLogout()} type="button">
        Logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

const mapStateToProps = ({ app, projects, user }) => ({
  userData: user.userData
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

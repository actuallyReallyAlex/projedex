import React from "react";
import PropTypes from "prop-types";
import { Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";
import { setContent } from "../redux/actions/app";

const Sidebar = ({ handleLogOut, handleSelectHome, handleSelectSettings }) => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <Header as="h1">
        <Header.Content>Projédex</Header.Content>
      </Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Icon
            link
            name="home"
            onClick={handleSelectHome}
            size="large"
            style={{ marginBottom: "25px" }}
          />
          <Icon
            link
            name="settings"
            onClick={handleSelectSettings}
            size="large"
          />
        </div>
        <Icon link name="log out" onClick={handleLogOut} size="large" />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleSelectHome: PropTypes.func.isRequired,
  handleSelectSettings: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleLogOut: () => dispatch(logout()),
  handleSelectHome: () => dispatch(setContent("home")),
  handleSelectSettings: () => dispatch(setContent("settings"))
});

export default connect(null, mapDispatchToProps)(Sidebar);

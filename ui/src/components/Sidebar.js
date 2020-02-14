import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";
import { setContent } from "../redux/actions/app";
import Info from "./Info";

const Sidebar = ({ handleLogOut, handleSelectHome, handleSelectSettings }) => {
  const [activeItem, setActiveItem] = useState("");
  return (
    <Menu style={{ maxWidth: "100%" }} vertical>
      <Header
        as="h1"
        style={{ fontSize: "1.5rem", marginTop: "14px", textAlign: "center" }}
      >
        <Header.Content>Projédex</Header.Content>
      </Header>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={() => {
          setActiveItem("home");
          handleSelectHome();
        }}
      >
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item
        name="settings"
        active={activeItem === "settings"}
        onClick={() => {
          setActiveItem("settings");
          handleSelectSettings();
        }}
      >
        <Icon name="settings" />
        Settings
      </Menu.Item>
      <Menu.Item
        name="log out"
        active={activeItem === "log out"}
        onClick={() => {
          setActiveItem("log out");
          handleLogOut();
        }}
      >
        <Icon name="log out" />
        Log out
      </Menu.Item>
      <Info />
    </Menu>
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

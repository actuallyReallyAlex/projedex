import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";
import { setContent } from "../redux/actions/app";
import Info from "./Info";

const Sidebar = ({
  handleLogOut,
  handleSelectHome,
  handleSelectSettings,
  projectData
}) => {
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
        name="projects"
        active={activeItem === "projects"}
        onClick={() => {
          setActiveItem("projects");
          // TODO - Display projects in middle
        }}
      >
        <Icon name="book" />
        Projects
        {projectData.length > 0 && (
          <Menu.Menu>
            {projectData.map(project => {
              // TODO - Add 'active' and 'onClick' props
              return <Menu.Item key={project.id} name={project.name} />;
            })}
          </Menu.Menu>
        )}
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
  handleSelectSettings: PropTypes.func.isRequired,
  projectData: PropTypes.array.isRequired
};

const mapStateToProps = ({ projects }) => ({
  projectData: projects.projectData
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: () => dispatch(logout()),
  handleSelectHome: () => dispatch(setContent("home")),
  handleSelectSettings: () => dispatch(setContent("settings"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

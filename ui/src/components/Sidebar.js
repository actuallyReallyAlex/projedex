import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Menu, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";
import { setContent } from "../redux/actions/app";
import { setCurrentProjectId } from "../redux/actions/projects";
import Info from "./Info";

const Sidebar = ({
  handleNewProject,
  handleLogOut,
  handleSelectHome,
  handleSelectProjects,
  handleSelectSettings,
  handleViewProject,
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
          handleSelectProjects();
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          Projects
          <Button
            onClick={handleNewProject}
            positive
            size="mini"
            style={{ marginRight: "0", padding: "6px" }}
          >
            New
          </Button>
        </div>

        {projectData.length > 0 && (
          <Menu.Menu>
            {projectData.map(project => {
              // TODO - Add 'active' and 'onClick' props
              return (
                <Menu.Item
                  as="div"
                  key={project._id}
                  link
                  name={project.name}
                  onClick={e => {
                    e.stopPropagation();
                    handleViewProject(project._id);
                  }}
                />
              );
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
  handleNewProject: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleSelectHome: PropTypes.func.isRequired,
  handleSelectProjects: PropTypes.func.isRequired,
  handleSelectSettings: PropTypes.func.isRequired,
  handleViewProject: PropTypes.func.isRequired,
  projectData: PropTypes.array.isRequired
};

const mapStateToProps = ({ projects }) => ({
  projectData: projects.projectData
});

const mapDispatchToProps = dispatch => ({
  handleNewProject: () => dispatch(setContent("newProject")),
  handleLogOut: () => dispatch(logout()),
  handleSelectHome: () => dispatch(setContent("home")),
  handleSelectProjects: () => dispatch(setContent("projects")),
  handleSelectSettings: () => dispatch(setContent("settings")),
  handleViewProject: id => {
    dispatch(setCurrentProjectId(id));
    dispatch(setContent("viewProject"));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

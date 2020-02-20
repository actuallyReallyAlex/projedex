import React from "react";
import PropTypes from "prop-types";
import { Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

// TODO - Make this look nice
const Projects = ({ projectData }) => {
  return (
    <div>
      <Header as="h2">Projects</Header>
      {projectData.map(project => (
        <Segment key={project._id} raised>
          <Header as="h3">{project.name}</Header>
          {project.description && (
            <Header.Subheader>{project.description}</Header.Subheader>
          )}
        </Segment>
      ))}
    </div>
  );
};

Projects.propTypes = {
  projectData: PropTypes.array.isRequired
};

const mapStateToProps = ({ projects }) => ({
  projectData: projects.projectData
});

export default connect(mapStateToProps, null)(Projects);

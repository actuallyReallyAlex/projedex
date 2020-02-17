import React from "react";
import PropTypes from "prop-types";
import { Form, Header, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";

const ViewProject = ({ currentProjectId, projectData }) => {
  const currentProject = projectData.find(
    project => project._id === currentProjectId
  );
  return (
    <div>
      <Header as="h2">View Project</Header>
      <Segment raised color="green">
        <Header as="h3">Basic Info</Header>
        <Form>
          <Form.Field
            control={Input}
            label="Name"
            value={currentProject.name}
          />
          <Form.Field
            control={Input}
            label="Description"
            value={currentProject.description || ""}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>
              Created at{" "}
              {moment(currentProject.createdAt).format("MMMM Do, YYYY - LT")}
            </span>
            <span>
              Updated at{" "}
              {moment(currentProject.updatedAt).format("MMMM Do, YYYY - LT")}
            </span>
          </div>
        </Form>
      </Segment>
    </div>
  );
};

ViewProject.propTypes = {
  currentProjectId: PropTypes.string.isRequired,
  projectData: PropTypes.array.isRequired
};

const mapStateToProps = ({ projects }) => ({
  currentProjectId: projects.currentProjectId,
  projectData: projects.projectData
});

export default connect(mapStateToProps, null)(ViewProject);

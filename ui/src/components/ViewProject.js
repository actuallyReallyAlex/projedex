import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Header, Segment, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import { setLoading } from "../redux/actions/app";
import { modifyProject } from "../redux/actions/projects";

const ViewProject = ({
  currentProjectId,
  handleModifyProject,
  loading,
  projectData
}) => {
  const [currentProject, setCurrentProject] = useState(
    projectData.find(project => project._id === currentProjectId)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentProject.name);
  const [description, setDescription] = useState(
    currentProject.description || ""
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    const modification = { name, description };

    Object.keys(modification).forEach(field => {
      const currentValue = modification[field];
      const storedValue = currentProject[field];

      if (
        currentValue === storedValue ||
        (currentValue === "" && storedValue === undefined)
      )
        delete modification[field];
    });

    setFormSubmitted(true);
    handleModifyProject(currentProject._id, modification);
  };

  useEffect(() => {
    if (!loading && formSubmitted) {
      setFormSubmitted(false);
      setIsEditing(false);
    }

    setCurrentProject(
      projectData.find(project => project._id === currentProjectId)
    );
    setName(projectData.find(project => project._id === currentProjectId).name);
    setDescription(
      projectData.find(project => project._id === currentProjectId)
        .description || ""
    );
  }, [loading, formSubmitted, currentProjectId, projectData]);

  return (
    <div>
      <Header as="h2">View Project</Header>
      <Segment raised color="green">
        <Header as="h3">
          Basic Info{" "}
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} size="mini">
              Edit
            </Button>
          )}
        </Header>
        <Form loading={loading} onSubmit={handleSubmit}>
          <Form.Field
            control={Input}
            label="Name"
            onChange={e => {
              if (isEditing) setName(e.target.value);
            }}
            value={name}
          />
          <Form.Field
            control={Input}
            label="Description"
            onChange={e => {
              if (isEditing) setDescription(e.target.value);
            }}
            value={description}
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
          {isEditing && (
            <div
              style={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Button
                primary
                style={{ marginBottom: "14px", marginTop: "14px" }}
                type="submit"
              >
                Update project
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                secondary
                style={{ marginBottom: "14px", marginTop: "14px" }}
                type="button"
              >
                Cancel
              </Button>
            </div>
          )}
        </Form>
      </Segment>
    </div>
  );
};

ViewProject.propTypes = {
  currentProjectId: PropTypes.string.isRequired,
  handleModifyProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  projectData: PropTypes.array.isRequired
};

const mapStateToProps = ({ app, projects }) => ({
  currentProjectId: projects.currentProjectId,
  loading: app.loading,
  projectData: projects.projectData
});

const mapDispatchToProps = dispatch => ({
  handleModifyProject: (id, modification) => {
    dispatch(setLoading(true));
    dispatch(modifyProject(id, modification));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProject);

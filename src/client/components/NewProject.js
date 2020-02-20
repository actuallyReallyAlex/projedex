import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Header, Input, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { createProject } from "../redux/actions/projects";
import { setLoading } from "../redux/actions/app";

const NewProject = ({ handleCreateNewProject, loading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);
    const project = { name, description };
    Object.keys(project).forEach(key => {
      if (project[key] === "") delete project[key];
    });

    handleCreateNewProject(project);
  };

  useEffect(() => {
    if (!loading && formSubmitted) {
      setName("");
      setDescription("");
      setFormSubmitted(false);
    }
  }, [loading, formSubmitted]);

  return (
    <div>
      <Header as="h2">New Project</Header>
      <Segment raised color="green">
        <Header as="h3">Basic Info</Header>
        <Form loading={loading} onSubmit={handleSubmit}>
          <Form.Field
            control={Input}
            label="Name"
            onChange={e => setName(e.target.value)}
            required
            value={name}
            width="4"
          />
          <Form.Field
            control={Input}
            label="Description"
            onChange={e => setDescription(e.target.value)}
            value={description}
            width="10"
          />
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Button
              disabled={!name}
              primary
              style={{ marginBottom: "14px", marginTop: "14px" }}
              type="submit"
            >
              Create project
            </Button>
          </div>
        </Form>
      </Segment>
    </div>
  );
};

NewProject.propTypes = {
  handleCreateNewProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ app }) => ({ loading: app.loading });

const mapDispatchToProps = dispatch => ({
  handleCreateNewProject: project => {
    dispatch(setLoading(true));
    dispatch(createProject(project));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);

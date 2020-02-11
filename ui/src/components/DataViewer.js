import React from "react";
import PropTypes from "prop-types";
import DeleteProjectButton from "./DeleteProjectButton";
import ModifyProjectButton from "./ModifyProjectButton";
import { connect } from "react-redux";

const DataViewer = ({ projectData, userData }) => {
  return (
    <div id="data-viewer">
      <pre>{JSON.stringify({ userData }, null, 2)}</pre>
      {projectData.length > 0 && <h2>Projects:</h2>}
      {projectData.map(({ _id, name }) => (
        <div key={_id}>
          <span>{name}</span>
          <DeleteProjectButton id={_id} />
          <ModifyProjectButton id={_id} />
        </div>
      ))}
    </div>
  );
};

DataViewer.propTypes = {
  projectData: PropTypes.array.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = ({ app, projects, user }) => ({
  projectData: projects.projectData,
  userData: user.userData
});

export default connect(mapStateToProps, null)(DataViewer);

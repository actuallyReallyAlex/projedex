import React from "react";
import PropTypes from "prop-types";
import DeleteProjectButton from "./DeleteProjectButton";
import ModifyProjectButton from "./ModifyProjectButton";
import { connect } from "react-redux";

const DataViewer = ({ projects, userData }) => {
  return (
    <div id="data-viewer">
      <pre>{JSON.stringify({ userData }, null, 2)}</pre>
      {projects.length > 0 && <h2>Projects:</h2>}
      {projects.map(({ _id, name }) => (
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
  projects: PropTypes.array.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = ({ app }) => ({
  projects: app.projects,
  userData: app.userData
});

export default connect(mapStateToProps, null)(DataViewer);

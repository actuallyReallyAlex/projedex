import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { getRepos, importRepos } from "../requests";
import { connect } from "react-redux";
import { setProjectData } from "../redux/actions/projects";

const GetRepos = ({ handleSetProjects, userData }) => {
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);

  const handleGetRepos = () => getRepos(userData, setRepos);
  const handleImportAll = () => {
    console.log("import all button clicked");
    importRepos(userData, repos, handleSetProjects);
  };
  const handleImportSelected = () => {
    console.log("import selected button clicked");
    importRepos(
      userData,
      selectedRepos.map(id => ({ id })),
      handleSetProjects
    );
  };
  return (
    <Fragment>
      {repos.length === 0 && (
        <button onClick={handleGetRepos} type="button">
          Get Repos
        </button>
      )}
      <div id="repos">
        {repos.length > 0 && (
          <Fragment>
            <button onClick={handleImportAll} type="button">
              Import All
            </button>
            <button onClick={handleImportSelected} type="button">
              Import Selected
            </button>
          </Fragment>
        )}
        {repos.map(({ id, name }) => (
          <div key={id}>
            <input
              checked={selectedRepos.includes(id)}
              type="checkbox"
              id={id}
              name={name}
              onChange={e => {
                if (e.target.checked) {
                  const newArray = Array.from(selectedRepos);
                  newArray.push(id);
                  console.log({ newArray });

                  setSelectedRepos(newArray);
                } else {
                  const newArray = Array.from(selectedRepos).filter(
                    selectedRepoId => selectedRepoId !== id
                  );
                  console.log({ newArray });
                  selectedRepos(newArray);
                }
              }}
            />
            <label htmlFor={id}>{name}</label>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

GetRepos.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app, projects, user }) => ({ userData: user.userData });

const mapDispatchToProps = dispatch => ({
  handleSetProjects: projectData => dispatch(setProjectData(projectData))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetRepos);

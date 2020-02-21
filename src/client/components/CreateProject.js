import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createProject } from '../redux/actions/projects'
import { connect } from 'react-redux'
import { setProjectData } from '../redux/actions/projects'

const CreateProject = ({ handleCreateProject, handleSetProjects, projectData, userData }) => {
  const [name, setName] = useState(null)

  return (
    <div id="create-project">
      <h2>Create Project</h2>
      <div>
        <label>Project Name</label>
        <input id="create-project-name" onChange={e => setName(e.target.value)} type="text" />
        <button onClick={() => handleCreateProject(name)} type="button">
          Create Project
        </button>
      </div>
    </div>
  )
}

CreateProject.propTypes = {
  handleCreateProject: PropTypes.func.isRequired,
  handleSetProjects: PropTypes.func.isRequired,
  projectData: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
}

const mapStateToProps = ({ app, projects, user }) => ({
  projectData: projects.projectData,
  userData: user.userData
})

const mapDispatchToProps = dispatch => ({
  handleCreateProject: name => dispatch(createProject(name)),
  handleSetProjects: projectData => dispatch(setProjectData(projectData))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)

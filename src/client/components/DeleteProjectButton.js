import React from 'react'
import PropTypes from 'prop-types'
import { deleteProject } from '../redux/actions/projects'
import { connect } from 'react-redux'

const DeleteProjectButton = ({ handleDeleteProject, id }) => {
  return (
    <button onClick={() => handleDeleteProject(id)} type="button">
      Delete Project
    </button>
  )
}

DeleteProjectButton.propTypes = {
  handleDeleteProject: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleDeleteProject: id => dispatch(deleteProject(id))
})

export default connect(null, mapDispatchToProps)(DeleteProjectButton)

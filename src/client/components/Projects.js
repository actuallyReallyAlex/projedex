import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { integrateWithGitHub } from '../redux/actions/app'

// TODO - Make this look nice
const Projects = ({ handleIntegrateWithGitHub, isIntegratedWithGitHub, projectData }) => {
  return (
    <div>
      <Header as="h2">Projects</Header>
      {!isIntegratedWithGitHub && (
        <Button onClick={handleIntegrateWithGitHub}>
          <Icon name="github" /> Integrate with Github
        </Button>
      )}
      {projectData.map(project => (
        <Segment key={project._id} raised>
          <Header as="h3">{project.name}</Header>
          {project.description && <Header.Subheader>{project.description}</Header.Subheader>}
        </Segment>
      ))}
    </div>
  )
}

Projects.propTypes = {
  handleIntegrateWithGitHub: PropTypes.func.isRequired,
  isIntegratedWithGitHub: PropTypes.bool.isRequired,
  projectData: PropTypes.array.isRequired
}

const mapStateToProps = ({ projects, user }) => ({
  isIntegratedWithGitHub: user.userData.user.accessToken,
  projectData: projects.projectData
})

const mapDispatchToProps = dispatch => ({
  handleIntegrateWithGitHub: () => dispatch(integrateWithGitHub())
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)

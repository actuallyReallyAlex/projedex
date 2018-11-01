import React from 'react'
import { Box, Heading } from 'grommet'

const ProjectsList = () => {
  return (
    <Box
      direction="row"
      justify="start"
      fill="horizontal"
      pad={{ top: 'none', horizontal: 'xlarge' }}
      gap="xlarge"
      background="light-1"
    >
      <Heading level={3}>Projects</Heading>
    </Box>
  )
}

export default ProjectsList

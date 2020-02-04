import React from 'react'
import { Box } from 'grommet'

const Section = ({ children }) => (
  <Box align="center" pad={{ horizontal: 'xlarge', vertical: 'large' }}>
    <Box width="xlarge">{children}</Box>
  </Box>
)

export default Section

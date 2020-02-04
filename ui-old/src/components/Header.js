import React from 'react'
import { Box, Heading, Paragraph } from 'grommet'

const Header = ({ label, summary }) => (
  <Box justify="center" align="start" margin={{ horizontal: 'large' }}>
    <Heading level={1} size="large" margin="none">
      {label}
    </Heading>
    {summary && (
      <Paragraph size="xxlarge">
        {summary}
      </Paragraph>
    )}
  </Box>
)

export default Header

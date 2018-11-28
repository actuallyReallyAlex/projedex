import React from 'react'
import { Box, Button } from 'grommet'

const CircleButton = ({ icon, link, color }) => {
  const Icon = icon
  return (
    <Box
      background={color ? color : 'accent-1'}
      elevation="medium"
      style={{ borderRadius: '50%' }}
    >
      <Button
        style={{ borderRadius: '50%' }}
        hoverIndicator
        icon={<Icon color="white" />}
        href={link}
        target="_blank"
      />
    </Box>
  )
}

export default CircleButton

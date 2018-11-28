import React, { Component } from 'react'
import { Box, Button } from 'grommet'

class CircleButton extends Component {
  render() {
    const Icon = this.props.icon
    const { link, color } = this.props

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
}

// const CircleButton = ({ icon }) => (
//   <Box background="accent-1" elevation="medium" style={{ borderRadius: '50%' }}>
//     <Button
//       color="accent-1"
//       style={{ borderRadius: '50%' }}
//       hoverIndicator
//       icon={icon}
//       onClick={() => alert('clicked')}
//     />
//   </Box>
// )

export default CircleButton

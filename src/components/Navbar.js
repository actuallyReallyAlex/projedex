import React from 'react'
import { Box, Heading, Menu, Anchor } from 'grommet'
import { User, Notification } from 'grommet-icons'
import Responsive from '../icons/Responsive'

const Navbar = () => {
  return (
    <Box
      tag="header"
      background="brand"
      pad="small"
      elevation="small"
      justify="between"
      direction="row"
      align="center"
      flex={false}
    >
      <Box direction="row" size="small" justify="center" align="center">
        <Responsive style={{ padding: '0px 15px 0px 10px' }} />
        <Heading level={3} margin="none">
          Projédex
        </Heading>
      </Box>
      <Box direction="row" size="small" justify="center" align="center" >
        <Anchor
          margin={{ horizontal: 'small' }}
          label="Go to docs"
          a11yTitle="Docs link"
          color="light-1"
          onClick={() => alert('clicked')}
        />
        <Menu
          dropAlign={{ top: 'bottom', right: 'right' }}
          icon={<Notification color="white" />}
          items={[{ label: 'Notifications', href: '#' }]}
        />
        <Menu
          dropAlign={{ top: 'bottom', right: 'right' }}
          items={[{ label: 'Logout', href: '#' }]}
          icon={<User color="white" />}
        />
      </Box>
    </Box>
  )
}

export default Navbar

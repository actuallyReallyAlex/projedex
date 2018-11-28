import React from 'react'
import { ResponsiveContext, Box } from 'grommet'
import Header from './Header'
import Fader from './Fader'
import Beer from './svg/Beer'
import Dashboard from './svg/Dashboard'
import Wireframe from './svg/Wireframe'

const Hero = () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box direction="row">
        <Box pad="medium" align="center">
          <Fader>
            <Beer size={size} />
            <Dashboard size={size} />
            <Wireframe size={size} />
          </Fader>
        </Box>
        <Header
          label="Projédex"
          summary={<span>Like a pokédex, but for your projects.</span>}
        />
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Hero

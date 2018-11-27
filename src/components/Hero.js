import React from 'react'
import { ResponsiveContext, Box } from 'grommet'
import Beer from './svg/Beer'
import Header from './Header'

const Hero = () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box direction="row">
        <Box pad="medium" align="center">
          <Beer size={size} />
        </Box>
        <Header
          label="Projédex"
          summary={
            <span>
              Like a pokédex, but for your projects.
            </span>
          }
        />
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Hero

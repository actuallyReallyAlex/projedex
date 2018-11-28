import React from 'react'
import { ResponsiveContext, Box, Anchor, Text, Button } from 'grommet'
import { RadialSelected } from 'grommet-icons'

const Nav = () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        direction="row"
        justify="between"
        align="center"
        width="xlarge"
        alignSelf="center"
      >
        <Anchor
          href="/"
          icon={<RadialSelected size="large" color="neutral-4" />}
          label={size !== 'small' && <Text size="xlarge" color="neutral-4">projédex</Text>}
        />
        <Button
          plain
          href="/"
          type="button"
          label={
            <Box
              pad={{ vertical: 'small', horizontal: 'medium' }}
              round="xlarge"
              background="neutral-4"
            >
              <Text size="large" color="light-1">projects</Text>
            </Box>
          }
        />
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Nav

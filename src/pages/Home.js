import React from 'react'
import { Helmet } from 'react-helmet'
import { Box } from 'grommet'
import Section from '../components/Section'
import Hero from '../components/Hero'

const Home = () => (
  <React.Fragment>
    <Helmet>
      <title>Projédex</title>
      <meta
        name="description"
        content="Like a pokédex, but for your projects."
      />
    </Helmet>
    <Box
      animation={[
        { type: 'zoomIn', duration: 500, delay: 100 + 100 * 0 },
        { type: 'fadeIn', duration: 500, delay: 100 * 0 }
      ]}
    >
      <Section>
        <Hero />
      </Section>
    </Box>
  </React.Fragment>
)

export default Home

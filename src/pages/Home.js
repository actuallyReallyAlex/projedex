import React from 'react'
import { Helmet } from 'react-helmet'
import { Box } from 'grommet'
import Section from '../components/Section'
import Classification from '../components/Classification'
import Hero from '../components/Hero'
import Card from '../components/Card'
import projects from '../projects'

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
      <Section>
        <Classification name="Projects">
          {projects.sort((a, b) => {
            if (a.title < b.title) {
              return -1
            } else {
              return 1
            }
          }).map(project => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              imgSrc={project.imgSrc}
              color={project.color}
              links={project.links}
            />
          ))}
        </Classification>
      </Section>
    </Box>
  </React.Fragment>
)

export default Home

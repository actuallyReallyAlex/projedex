import React from 'react'
import { Helmet } from 'react-helmet'
import { Box } from 'grommet'
import Section from '../components/Section'
import Classification from '../components/Classification'
import Card from '../components/Card'
import projects from '../projects'

const Projects = () => (
  <React.Fragment>
    <Helmet>
      <title>Projects | Projédex</title>
      <meta
        name="description"
        content="A dashboard of your projects."
      />
    </Helmet>
    <Box
      animation={[
        { type: 'zoomIn', duration: 500, delay: 100 + 100 * 0 },
        { type: 'fadeIn', duration: 500, delay: 100 * 0 }
      ]}
    >
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

export default Projects

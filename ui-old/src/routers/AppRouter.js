import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import Nav from '../components/Nav'
import Section from '../components/Section'
import Home from '../pages/Home'
import Projects from '../pages/Projects'

const NotFound = () => <h1>NotFound</h1>

grommet.global.colors.brand = '#6194EB'

const AppRouter = () => {
  const currentPath = window.location.pathname
  return (
    <BrowserRouter>
      <Grommet theme={grommet}>
        <Section>
          <Nav currentPath={currentPath}/>
        </Section>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/projects" component={Projects} exact />
          <Route component={NotFound} />
        </Switch>
      </Grommet>
    </BrowserRouter>
  )
}

export default AppRouter

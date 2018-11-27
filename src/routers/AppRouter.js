import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import Nav from '../components/Nav'
import Section from '../components/Section'
import Home from '../pages/Home'


const NotFound = () => <h1>NotFound</h1>

grommet.global.colors.brand = "#6194EB"

const AppRouter = () => {
  console.log(grommet)
  return ( <BrowserRouter>
    <Grommet theme={grommet}>
      <Section>
        <Nav />
      </Section>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </Grommet>
  </BrowserRouter>
)}

export default AppRouter

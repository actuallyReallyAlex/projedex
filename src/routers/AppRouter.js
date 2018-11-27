import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import { RadialSelected } from 'grommet-icons'

const Home = () => (<RadialSelected size="xlarge" color="neutral-4" />)
const NotFound = () => (<h1>NotFound</h1>)


const AppRouter = () => (
  <BrowserRouter>
    <Grommet theme={grommet}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </Grommet>
  </BrowserRouter>
)

export default AppRouter

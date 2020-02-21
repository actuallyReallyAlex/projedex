import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Redirect from './pages/Redirect'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/gh" children={<Redirect />} />
        <Route path="/" children={<Home />} />
      </Switch>
    </Router>
  )
}

App.propTypes = {}

export default App

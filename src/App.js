import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Organize from './icons/Organize'
import ProjectsList from './components/ProjectsList'

class App extends Component {
  state = {}
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Hero
          heading="Welcome to Projédex!"
          icon={<Organize />}
          subHeading="Tools from Google for developing great apps, engaging with your users, and earning more through mobile ads."
        />
        <ProjectsList />
      </React.Fragment>
    )
  }
}

export default App

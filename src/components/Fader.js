import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'

class Fader extends Component {
  state = {
    currentIndex: 0
  }

  updateIndex = () => {
    const { children } = this.props
    let currentIndex = this.state.currentIndex
    if (currentIndex === children.length - 1) {
      currentIndex = 0
    } else {
      currentIndex++
    }
    this.setState(() => ({ currentIndex }))
  }

  componentDidMount() {
    const { rate } = this.props
    setInterval(this.updateIndex, rate)
  }

  render() {
    const { currentIndex } = this.state
    const Comp = ({ item }) => (
      <Box
        animation={[
          { type: 'fadeIn', duration: 2000 },
          { type: 'fadeOut', delay: 3000 }
        ]}
      >
        {item}
      </Box>
    )
    return (
      <Box width="medium">
        <Comp item={this.props.children[currentIndex]} />
      </Box>
    )
  }
}

Fader.defaultProps = {
  rate: 5000
}

Fader.propTypes = {
  rate: PropTypes.number
}

export default Fader

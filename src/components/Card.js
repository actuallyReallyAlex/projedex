import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Image, Text } from 'grommet'
import CircleButton from './CircleButton'

class Card extends Component {
  static propTypes = {
    color: PropTypes.string,
    description: PropTypes.string,
    imgSrc: PropTypes.string,
    links: PropTypes.array,
    title: PropTypes.string
  }
  state = {}

  render() {
    const { color, description, imgSrc, links, title } = this.props
    return (
      <Box
        margin={{ horizontal: 'small' }}
        round="small"
        elevation="small"
        background="white"
      >
        <Box
          height="xsmall"
          background={color}
          style={{ borderRadius: '12px 12px 0px 0px' }}
        >
          {imgSrc && (
            <Image
              src={imgSrc}
              fit="cover"
              style={{ borderRadius: '12px 12px 0px 0px' }}
            />
          )}
        </Box>
        <Box flex pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <Heading level={3}>{title}</Heading>
          <Text margin={{ bottom: 'large' }}>{description}</Text>
          {links && (
            <Box direction="row" margin={{ top: 'auto' }} gap="medium">
              {links.map((link, i) => {
                return <CircleButton key={i} icon={link.icon} link={link.link} color={link.color} />
              })}
            </Box>
          )}
        </Box>
      </Box>
    )
  }
}

export default Card

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Paragraph, Anchor } from 'grommet'
import { Info, TextAlignFull, Chat } from 'grommet-icons'

const Hero = props => {
  return (
    <Box
      direction="row"
      justify="center"
      fill="horizontal"
      pad="xlarge"
      gap="xlarge"
      background="light-1"
    >
      <Box>
        <Heading level={2}>{props.heading}</Heading>
        <Paragraph>{props.subHeading}</Paragraph>
        <Box direction="row" gap="medium" justify="start">
          <Anchor
            label="Learn More"
            icon={<Info />}
            onClick={() => alert('clicked')}
          />
          <Anchor
            label="Documentation"
            icon={<TextAlignFull />}
            onClick={() => alert('clicked')}
          />
          <Anchor
            label="Support"
            icon={<Chat />}
            onClick={() => alert('clicked')}
          />
        </Box>
      </Box>
      <Box>{props.icon}</Box>
    </Box>
  )
}

Hero.propTypes = {
  heading: PropTypes.string,
  icon: PropTypes.element,
  subHeading: PropTypes.string
}

export default Hero

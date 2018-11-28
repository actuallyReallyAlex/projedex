import { Github } from 'grommet-icons'
import { iconColors } from './constants'

// Array of Project Information
export default [
  {
    title: 'projédex',
    description: 'Like a pokédex, but for your projects.',
    color: '#6194eb',
    links: [
      {
        name: 'github',
        link: 'https://github.com/alexlee-dev/projedex',
        icon: Github,
        color: iconColors.github
      }
    ]
  },
  {
    title: 'grommet-patterns',
    description: 'Common patterns and layouts for applications using Grommet.',
    color: '#7D4CDB'
  },
  {
    title: 'portfolio',
    description: "Alex Lee's Web Developer Portfolio.",
    color: '#0a64a0'
  },
  {
    title: 'pickitt',
    description:
      'When you need you need a computer to just pick it, reach for Pickitt!',
    color: '#0b5fff'
  },
  {
    title: 'remembera',
    description: 'A knowledge bank.',
    color: '#0b5fff'
  },
  {
    title: 'trimettra',
    description: "Fitbit app using TriMet's developer API.",
    color: '#e0e0e0'
  },
  {
    title: 'bitburner-community',
    description:
      'For inspiration, assistance, and discussion around the amazing cyperpunk-themed incremental RPG, Bitburner.',
    color: '#00C781'
  },
  {
    title: 'splague',
    description: 'Be prepared.',
    color: '#ef860c'
  },
  {
    title: 'reposier',
    description:
      "Tasty CLI on the outside, simple integration with GitHub's API on the inside.",
    color: '#42b983'
  }
]

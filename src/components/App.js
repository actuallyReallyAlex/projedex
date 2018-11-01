import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Responsive from '../icons/Responsive'
import Notifications from '@material-ui/icons/Notifications'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

const App = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Responsive width={28} style={{ padding: '0px 15px 0px 0px' }} />
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          Projedex
        </Typography>
        <Button>Go to docs</Button>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default App

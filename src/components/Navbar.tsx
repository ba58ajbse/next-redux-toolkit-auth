import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)
const Navbar: React.FC = () => {
  const classes = useStyles()
  const useState = useSelector(selectAuth)
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        {useState.authenticated
          ? <Button color="inherit">Logout</Button>
          : <Button color="inherit">Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

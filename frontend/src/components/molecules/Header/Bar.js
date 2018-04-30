import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"
import IconButton from "material-ui/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { Link } from "react-router-dom"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

function ButtonAppBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            APP
          </Typography>
          <Link to="/signout">
            <Button variant="raised" color="secondary">
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)

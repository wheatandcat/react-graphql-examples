import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Paper from "material-ui/Paper"
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
} from "material-ui/List"
import IconButton from "material-ui/IconButton"
import WifiIcon from "@material-ui/icons/AccountBox"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"

export default ({ users }) => (
  <Root>
    <Paper>
      <List component="nav" subheader={<ListSubheader>Users</ListSubheader>}>
        {users.map((user, index) => (
          <Link to={`user/${user.key}`} key={index}>
            <ListItem button>
              <ListItemIcon>
                <WifiIcon />
              </ListItemIcon>
              <ListItemText primary={`${user.name}`} />
              <ListItemIcon>
                <KeyboardArrowRight />
              </ListItemIcon>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  </Root>
)

const Root = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;

  > div {
    width: 30rem;
  }
`

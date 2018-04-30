import React from "react"
import styled from "styled-components"
import Paper from "material-ui/Paper"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"

export default ({ children }) => (
  <div>
    <Root>
      <Paper>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Login
          </Typography>
        </Toolbar>
        <Divider />
        <br />
        <br />
        <div>{children}</div>
        <br />
        <br />
      </Paper>
    </Root>
  </div>
)

const Root = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;

  > div {
    padding: 2.5rem;
    width: 30rem;
  }
`

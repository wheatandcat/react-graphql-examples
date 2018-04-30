import React, { Component } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"

class App extends Component {
  state = { signedIn: null }

  render() {
    return this.props.auth.signedIn() ? (
      <Route children={this.props.children} />
    ) : (
      <Redirect to="/signin" />
    )
  }
}

export default withRouter(App)

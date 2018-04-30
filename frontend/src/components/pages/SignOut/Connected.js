import React from "react"
import { Redirect, withRouter } from "react-router-dom"
import { Consumer } from "containers/Provider"

class Connected extends React.Component {
  state = {
    signedOut: false,
    error: null,
  }

  async componentDidMount() {
    try {
      await this.props.auth.signOut()

      this.setState({
        signedOut: true,
      })
    } catch (error) {
      this.setState({
        error,
      })
    }
  }

  render() {
    if (!this.state.signedOut) {
      return null
    }

    return <Redirect to="/signin" />
  }
}

const SignOut = props => (
  <Consumer>{({ auth }) => <Connected {...props} auth={auth} />}</Consumer>
)

export default withRouter(SignOut)

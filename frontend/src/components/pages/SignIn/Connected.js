import React from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Redirect, withRouter } from "react-router-dom"
import { Consumer } from "containers/Provider"
import Page from "./Page"

class Connected extends React.Component {
  state = {
    signedIn: false,
  }
  uiConfig = () => {
    return {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: async () => {
          await this.props.auth.setSession()
          if (this.props.auth.signedIn()) {
            this.setState({ signedIn: true })
          }
        },
      },
    }
  }

  render() {
    if (this.state.signedIn) {
      return <Redirect to="/" />
    }

    return (
      <Page>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig()}
          firebaseAuth={firebase.auth()}
        />
      </Page>
    )
  }
}

const SignIn = props => (
  <Consumer>{({ auth }) => <Connected {...props} auth={auth} />}</Consumer>
)

export default withRouter(SignIn)

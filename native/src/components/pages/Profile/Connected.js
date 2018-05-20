import React, { Component } from "react"
import { View } from "react-native"
import { Text, Button } from "react-native-elements"
import firebase from "react-native-firebase"
import { GoogleSignin } from "react-native-google-signin"
import { Consumer } from "../../../containers/Provider"

export default class extends Component {
  render() {
    return (
      <Consumer>
        {({ auth }) => <Connected {...this.props} auth={auth} />}
      </Consumer>
    )
  }
}

class Connected extends Component {
  onSignOut = async () => {
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
    await this.props.auth.signOut()

    this.props.navigator.showModal({
      screen: "native.SignIn",
      title: "Sign In",
    })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          title="Sign out"
          style={{ width: 200 }}
          onPress={this.onSignOut}
        />
      </View>
    )
  }
}

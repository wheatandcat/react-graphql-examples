import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import firebase from "react-native-firebase"
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin"
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
  state = {
    user: null,
  }

  componentDidMount() {
    this.setupGoogleSignin()
  }

  setupGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true })
      await GoogleSignin.configure({
        iosClientId:
          "222855909542-hlvg250s8i41b77pd59ig58cppuvhc4g.apps.googleusercontent.com",
        webClientId:
          "222855909542-i5c3bbas2mfdepjs6jgcnsjsc3kqqfl8.apps.googleusercontent.com",
        offlineAccess: false,
      })

      const user = await GoogleSignin.currentUserAsync()
      this.setState({ user })

      this.setAuth()
    } catch (err) {
      console.log("Google signin error", err.code, err.message)
    }
  }

  signIn = async () => {
    const data = await GoogleSignin.signIn()
    this.setState({ user: data })

    this.setAuth()
  }

  signOut = async () => {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    this.setState({ user: null })
  }

  setAuth = async () => {
    const data = await GoogleSignin.signIn()

    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    )

    const currentUser = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)

    this.props.auth.setSession()
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this.signIn.bind(this)}
          />
        </View>
      )
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={this.signOut}>
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})

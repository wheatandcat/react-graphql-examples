/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"

import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this._setupGoogleSignin()
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._signIn.bind(this)}
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

          <TouchableOpacity
            onPress={() => {
              this._signOut()
            }}
          >
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  async _setupGoogleSignin() {
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
      console.log(user)
      this.setState({ user })
    } catch (err) {
      console.log("Google signin error", err.code, err.message)
    }
  }

  _signIn() {
    GoogleSignin.signIn()
      .then(user => {
        console.log(user)
        this.setState({ user: user })
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err)
      })
      .done()
  }

  _signOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({ user: null })
      })
      .done()
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

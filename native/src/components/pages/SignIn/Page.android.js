import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin"

export default class extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this._setupGoogleSignin()
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true })
      await GoogleSignin.configure({
        webClientId:
          "222855909542-i5c3bbas2mfdepjs6jgcnsjsc3kqqfl8.apps.googleusercontent.com",
        offlineAccess: false,
      })

      const user = await GoogleSignin.currentUserAsync()
      console.log(user)
      this.setState({ user })
    } catch (err) {
      console.log("Play services error", err.code, err.message)
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

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 120, height: 44 }}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={this._signIn}
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

          <TouchableOpacity onPress={this._signOut}>
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
})

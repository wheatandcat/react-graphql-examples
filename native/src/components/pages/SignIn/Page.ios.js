import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import { Navigation } from "react-native-navigation"
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
    email: "",
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
    } catch (err) {
      console.log("Google signin error", err.code, err.message)
    }
  }

  signIn() {
    GoogleSignin.signIn()
      .then(async data => {
        this.setState({
          email: data.email,
        })
        await this.setAuth(data)
        Navigation.dismissModal()
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err)
      })
      .done()
  }

  signOut = async () => {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
  }

  setAuth = async data => {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    )

    const currentUser = await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)

    await this.props.auth.setSession()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.email ? (
          <View>
            <Text>Welcome: {this.state.email}</Text>{" "}
          </View>
        ) : null}

        <GoogleSigninButton
          style={{ width: 212, height: 48 }}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={() => this.signIn()}
        />
      </View>
    )
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

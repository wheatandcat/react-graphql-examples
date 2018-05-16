import firebase from "react-native-firebase"
import { AsyncStorage } from "react-native"
import moment from "moment"

export default class Auth {
  signOut = async () => {
    await AsyncStorage.clear()
    await firebase.auth().signOut()
  }

  signedIn = async () => {
    const idToken = await AsyncStorage.getItem("id_token")

    return !!idToken
  }

  setSession = async () => {
    const idToken = await firebase.auth().currentUser.getIdToken()

    await AsyncStorage.setItem("id_token", idToken)
    await AsyncStorage.setItem("expiration", `${moment().unix() + 60 * 60}`)
  }
}

import firebase from "firebase"
import moment from "moment"

const config = {
  apiKey: "AIzaSyAbDq1R3q6-dpJ9axF0dohrm1I70gzieS8",
  authDomain: "example-202505.firebaseapp.com",
}
firebase.initializeApp(config)

export default class Auth {
  signOut = () => {
    firebase.auth().signOut()
  }

  signedIn = () => {
    return !!localStorage.getItem("id_token")
  }

  setSession = async () => {
    const idToken = await firebase.auth().currentUser.getIdToken()

    await localStorage.setItem("id_token", idToken)
    await localStorage.setItem("expiration", moment().unix() + 60 * 60)
  }
}

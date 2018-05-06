import firebase from "firebase";
import moment from "moment";
import { config } from "../config";

firebase.initializeApp(config);

export default class Auth {
  signOut = () => {
    firebase.auth().signOut();
  };

  signedIn = () => {
    return !!localStorage.getItem("id_token");
  };

  setSession = async () => {
    const idToken = await firebase.auth().currentUser.getIdToken();

    await localStorage.setItem("id_token", idToken);
    await localStorage.setItem("expiration", moment().unix() + 60 * 60);
  };
}

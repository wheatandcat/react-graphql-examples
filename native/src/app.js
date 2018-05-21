import { Platform, AsyncStorage } from "react-native"
import moment from "moment"
import firebase from "react-native-firebase"
import { Navigation } from "react-native-navigation"
import {
  registerScreens,
  registerScreenVisibilityListener,
} from "./containers/Routers"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const host = "https://us-central1-example-202505.cloudfunctions.net"

const httpLink = createHttpLink({
  uri: `${host}/app/graphql`,
})

const getIdToken = async () => {
  let idToken = await AsyncStorage.getItem("id_token")
  const expiration = await AsyncStorage.getItem("expiration")

  if (Number(expiration) > moment().unix()) {
    return idToken
  }

  idToken = await firebase.auth().currentUser.getIdToken(true)
  // console.log(idToken)

  await AsyncStorage.setItem("id_token", idToken)
  await AsyncStorage.setItem("expiration", `${moment().unix() + 60 * 60}`)

  return idToken
}

const authLink = setContext(async (_, { headers }) => {
  const token = await getIdToken()

  if (!token) {
    return {
      headers,
    }
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

registerScreens(client)
registerScreenVisibilityListener()

const tabs = [
  {
    label: "users",
    screen: "native.Users",
    icon: require("../img/list.png"),
    title: "users",
  },
  {
    label: "profile",
    screen: "native.Profile",
    icon: require("../img/user.png"),
    title: "profile",
  },
]

Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === "ios" ? "slide-down" : "fade",
  tabsStyle: {
    tabBarBackgroundColor: "#ffffff",
    tabBarButtonColor: "#888888",
    tabBarSelectedButtonColor: "#FF9933",
    tabFontFamily: "BioRhyme-Bold",
  },
  appStyle: {
    tabBarBackgroundColor: "#003a66",
    navBarButtonColor: "#000000",
    tabBarButtonColor: "#000000",
    navBarTextColor: "#111111",
    tabBarSelectedButtonColor: "#ff505c",
    navigationBarColor: "#003a66",
    navBarBackgroundColor: "#ffffff",
    statusBarColor: "#002b4c",
    tabFontFamily: "BioRhyme-Bold",
  },
})

console.disableYellowBox = true

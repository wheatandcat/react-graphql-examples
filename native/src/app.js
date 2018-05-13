import { Platform } from "react-native"
import { Navigation } from "react-native-navigation"
import {
  registerScreens,
  registerScreenVisibilityListener,
} from "./containers/Routers"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const host = "https://us-central1-example-202505.cloudfunctions.net/app/graphql"

const httpLink = createHttpLink({
  uri: `${host}/app/graphql`,
})

const authLink = setContext((_, { headers }) => {
  /*
  const token = window.localStorage.getItem("id_token")

  if (!token) {
    return {
      headers,
    }
  }
*/
  const token = ""
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

// screen related book keeping
registerScreens(client)
registerScreenVisibilityListener()

const tabs = [
  {
    label: "xxxxx",
    screen: "tampatsu.SignIn",
    icon: require("../img/list.png"),
    title: "xxxxx",
  },
  {
    label: "xxxxx",
    screen: "tampatsu.MyPage",
    icon: require("../img/swap.png"),
    title: "xxxxx",
  },
]

// this will start our app
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
    navBarButtonColor: "#ffffff",
    tabBarButtonColor: "#ffffff",
    navBarTextColor: "#111111",
    tabBarSelectedButtonColor: "#ff505c",
    navigationBarColor: "#003a66",
    navBarBackgroundColor: "#ffffff",
    statusBarColor: "#002b4c",
    tabFontFamily: "BioRhyme-Bold",
  },
  /*
  drawer: {
    left: {
      screen: "example.Types.Drawer"
    }
  }
  */
})

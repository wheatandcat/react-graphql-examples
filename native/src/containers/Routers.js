import React, { Component } from "react"
import { Navigation, ScreenVisibilityListener } from "react-native-navigation"
import { ApolloProvider } from "react-apollo"
import Auth from "./Auth"
import Provider from "./Provider"
import Users from "../components/pages/Users/Connected"
import User from "../components/pages/User/Connected"
import SignIn from "../components/pages/SignIn/Page"
import Profile from "../components/pages/Profile/Connected"

const auth = new Auth()

const withProvider = (Component, client) => {
  return class extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <Provider auth={auth}>
            <Component {...this.props} />
          </Provider>
        </ApolloProvider>
      )
    }
  }
}

export function registerScreens(client) {
  Navigation.registerComponent("native.Users", () =>
    withProvider(Users, client)
  )
  Navigation.registerComponent("native.Users.User", () =>
    withProvider(User, client)
  )
  Navigation.registerComponent("native.Profile", () =>
    withProvider(Profile, client)
  )
  Navigation.registerComponent("native.SignIn", () =>
    withProvider(SignIn, client)
  )
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
    didAppear: ({ screen, startTime, endTime, commandType }) =>
      console.log(
        "screenVisibility",
        `Screen ${screen} displayed in ${endTime -
          startTime} millis [${commandType}]`
      ),
    willDisappear: ({ screen }) =>
      console.log(`Screen will disappear ${screen}`),
    didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`),
  }).register()
}

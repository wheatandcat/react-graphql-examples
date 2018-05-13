import React, { Component } from "react"
import { Navigation, ScreenVisibilityListener } from "react-native-navigation"
import { ApolloProvider } from "react-apollo"
import MyPage from "../components/pages/MyPage/Page"

const withProvider = (Component, client) => {
  return class extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      )
    }
  }
}

export function registerScreens(client) {
  Navigation.registerComponent("tampatsu.MyPage", () =>
    withProvider(MyPage, client)
  )
  Navigation.registerComponent("tampatsu.Setting", () =>
    withProvider(MyPage, client)
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

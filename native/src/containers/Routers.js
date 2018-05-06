import { Navigation, ScreenVisibilityListener } from "react-native-navigation";
import MyPage from "../components/pages/MyPage/Page";
import SignIn from "../components/pages/SignIn/Connected";
import React, { Component } from "react";
import { View, Text } from "react-native";

const wrapWithContext = Comp => {
  return props => {
    return (
      <View>
        <Text>test</Text>
        <Comp
          {...props}
          someOtherProp="this will be available in the screen root component"
        />
      </View>
    );
  };
};

const registrations = {
  "example.MyPage": MyPage,
  "example.SignIn": SignIn
};

export const registerScreens = async () => {
  await Object.keys(registrations).forEach(key => {
    Navigation.registerComponent(key, () =>
      wrapWithContext(registrations[key])
    );
  });
};

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
    didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`)
  }).register();
}

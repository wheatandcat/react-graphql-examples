import React, { Component } from "react";
import { Text, View, Button } from "react-native-ui-lib";
import { Linking } from "react-native";

export default class extends Component {
  open = () => {
    Linking.openURL("https://auth-dot-example-202505.appspot.com");
  };
  render() {
    return (
      <View useSafeArea>
        <View centerH>
          <Button
            backgroundColor="#30B650"
            label="Login"
            labelStyle={{ fontWeight: "600" }}
            size="small"
            enableShadow
            onPress={this.open}
          />
        </View>
      </View>
    );
  }
}

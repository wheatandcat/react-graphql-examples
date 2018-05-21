import React, { Component } from "react"
import { View, Image } from "react-native"
import {
  Card,
  ListItem,
  Button,
  Icon,
  Text,
  Divider,
} from "react-native-elements"

export default class extends Component {
  render() {
    return (
      <View>
        <Card title="User" image={require("./dummy.png")}>
          <View style={{ marginVertical: 15 }}>
            <Text>id: {this.props.user.key}</Text>

            <Text>name: {this.props.user.name}</Text>
          </View>
          <Divider style={{ backgroundColor: "blue" }} />
          <Text style={{ marginVertical: 30 }}>User Detail...</Text>
        </Card>
      </View>
    )
  }
}

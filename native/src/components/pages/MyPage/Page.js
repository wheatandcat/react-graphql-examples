import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Input } from "react-native-elements";
import Carousel from "./Carousel/Board";
import Card from "./Card/Board";

export default class Bananas extends Component {
  render() {
    return (
      <ScrollView style={{ paddingVertical: 20, backgroundColor: "#eeeeee" }}>
        <Root>
          <View style={{ paddingLeft: 10, paddingBottom: 15 }}>
            <View style={{ paddingBottom: 10 }}>
              <Big>xxxxx</Big>
            </View>
            <View style={{ width: "105%" }}>
              <Input
                placeholder="xxxxx"
                rightIcon={{ type: "font-awesome", name: "search" }}
                containerStyle={{ backgroundColor: "#ffffff" }}
              />
            </View>
          </View>
          <Title>
            <Big>xxxxx</Big>
          </Title>
          <Carousel />
          <Title>
            <Big>xxxxx</Big>
          </Title>
          <Form>
            <Card />
          </Form>
          <Title>
            <Big>xxxxx</Big>
          </Title>
          <Carousel />
        </Root>
      </ScrollView>
    );
  }
}

const Root = styled.View``;

const InputBack = styled.View`
  background-color: #ffffff;
`;

const Title = styled.View`
  padding-horizontal: 10;
  padding-vertical: 10;
`;

const Big = styled.Text`
  font-size: 15;
`;

const Form = styled.View`
  padding-left: 10;
  padding-vertical: 10;
`;

const InputTitle = styled.View`
  padding-top: 10;
  padding-bottom: 10;
`;

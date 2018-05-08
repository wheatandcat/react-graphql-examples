import React from "react";
import styled from "styled-components/native";
import { View, Text, Card } from "react-native-ui-lib";

export default () => (
  <Card shadowType="white10" width={200} containerStyle={{ marginRight: 20 }}>
    <View padding-15>
      <Pay>
        xxxxx
        <Big>xxxxx</Big>
      </Pay>
      <Access>
        <Text text15 style={{ color: "#968167" }}>
        xxxxx
        </Text>
      </Access>
      <Text text15 dark30>
        xxxxx
      </Text>
    </View>
  </Card>
);

const Access = styled.View`
  padding-vertical: 10;
`;

const Big = styled.Text`
  font-size: 25;
`;

const Pay = styled.Text`
  color: #e9a852;
  font-size: 15;
`;

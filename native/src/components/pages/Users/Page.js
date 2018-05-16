import React, { Component } from "react"
import { ListView, ScrollView, StyleSheet } from "react-native"
import { View, ListItem, Colors, ThemeManager } from "react-native-ui-lib"
import { Icon, Text } from "react-native-elements"

export default class extends Component {
  state = {
    dataSource: [],
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })

    console.log(this.props)
    this.state = {
      dataSource: ds.cloneWithRows(this.props.users.items),
    }
  }

  onOrders = () => {}

  renderRow(item, id) {
    return (
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
        onPress={this.onOrders}
      >
        <ListItem.Part left>
          <View style={{ paddingHorizontal: 15 }}>
            <Icon type="material-community" name="account" />
          </View>
        </ListItem.Part>
        <ListItem.Part
          middle
          column
          containerStyle={[
            styles.border,
            { paddingRight: 17, paddingLeft: 20 },
          ]}
        >
          <ListItem.Part containerStyle={{ marginBottom: 3 }}>
            <Text dark10 text70 style={{ flex: 1, marginRight: 10 }}>
              {item.name}
            </Text>
          </ListItem.Part>
        </ListItem.Part>
        <ListItem.Part right>
          <Icon name="chevron-right" />
        </ListItem.Part>
      </ListItem>
    )
  }

  render() {
    return (
      <View style={{ paddingVertical: 20, backgroundColor: "#eeeeee" }}>
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})

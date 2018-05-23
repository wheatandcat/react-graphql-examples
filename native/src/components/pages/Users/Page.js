import React, { Component } from "react"
import {
  FlatList,
  ListView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { View, ListItem, Colors, ThemeManager } from "react-native-ui-lib"
import { Icon, Text, Button } from "react-native-elements"
import PTRView from "react-native-pull-to-refresh"

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
})

export default class extends Component {
  state = {
    isLoading: false,
  }

  _keyExtractor = (item, index) => {
    return String(item.key)
  }

  renderRow({ item }) {
    return (
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
        onPress={() => this.props.onUserDetail(item.key)}
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
            <Text style={{ flex: 1, marginRight: 10 }}>{item.name}</Text>
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
      <View style={{ flex: 1 }}>
        <View style={{ paddingVertical: 20, backgroundColor: "#eeeeee" }}>
          <Text h4>List</Text>
        </View>
        <PTRView onRefresh={this.props.onRefresh}>
          <View>
            <FlatList
              data={this.props.items}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={this._keyExtractor}
              ListFooterComponent={
                <Button
                  title="more"
                  onPress={() => {
                    this.props.onLoading()
                    this.props.onNext(this.props.users.pageInfo.endCursor)
                  }}
                  loading={this.props.isLoading}
                  loadingProps={{
                    size: "large",
                    color: "rgba(111, 202, 186, 1)",
                  }}
                  disabled={!this.props.users.pageInfo.endCursor}
                />
              }
            />
          </View>
        </PTRView>
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

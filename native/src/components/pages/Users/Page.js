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
import InfiniteScrollView from "react-native-infinite-scroll-view"
import { Icon, Text, Button } from "react-native-elements"
import PTRView from "react-native-pull-to-refresh"

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
})

export default class extends Component {
  state = {
    dataSource: [],
    isLoading: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      dataSource: this.props.users.items,
    }
  }

  onOrders = () => {}

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
            <Text style={{ flex: 1, marginRight: 10 }}>{item.name}</Text>
          </ListItem.Part>
        </ListItem.Part>
        <ListItem.Part right>
          <Icon name="chevron-right" />
        </ListItem.Part>
      </ListItem>
    )
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl refreshing={false} onRefresh={this.props.onRefresh} />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text h4>List</Text>
        <PTRView onRefresh={this.props.onRefresh}>
          <View style={{ paddingVertical: 20, backgroundColor: "#eeeeee" }}>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderRow}
              onEndReachedThreshold={100}
              onEndReached={() =>
                this.setState({ isLoadingMore: true }, () => {
                  console.log("--onEndReached--")
                })
              }
              ListFooterComponent={
                this.state.isLoadingMore && (
                  <View style={{ flex: 1, padding: 10 }}>
                    <ActivityIndicator size="small" />
                  </View>
                )
              }
            />
          </View>
        </PTRView>
      </View>
    )
  }
}

/*
<Button
  title="BUTTON"
  onPress={() => this.props.onNext(this.props.users.pageInfo.endCursor)}
  disabled={!this.props.users.pageInfo.endCursor}
/>
*/

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})

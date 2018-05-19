import React, { Component } from "react"
import firebase from "react-native-firebase"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Spinner from "react-native-loading-spinner-overlay"
import { View, Text } from "react-native-ui-lib"
import { Consumer } from "../../../containers/Provider"
import Page from "./Page"

export default class extends Component {
  state = { load: false }

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({
          load: true,
        })
      })
      .bind(this)
  }

  render() {
    if (!this.state.load) {
      return null
    }

    return (
      <Consumer>
        {({ auth }) => <Connected {...this.props} auth={auth} />}
      </Consumer>
    )
  }
}

class Connected extends Component {
  state = {
    startCursor: "",
    signedIn: false,
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent = async event => {
    if (!(event.id === "didAppear" && event.type == "ScreenChangedEvent")) {
      return
    }

    /*
    const signedIn = await this.props.auth.signedIn()

    if (!signedIn) {
      this.props.navigator.showModal({
        screen: "native.SignIn",
        title: "Sign In",
      })
      return
    }

    this.setState({ signedIn })
    */
  }

  async componentDidMount() {
    const signedIn = await this.props.auth.signedIn()

    if (!signedIn) {
      this.props.navigator.showModal({
        screen: "native.SignIn",
        title: "Sign In",
      })
      return
    }

    this.setState({
      startCursor: "",
      signedIn: signedIn,
    })
  }

  onNext = cursor => {
    this.setState({
      startCursor: cursor,
    })
  }

  render() {
    console.log(this.state.signedIn)

    if (!this.state.signedIn) {
      return null
    }

    return (
      <PlainWithData
        {...this.props}
        startCursor={this.state.startCursor}
        onNext={this.onNext}
      />
    )
  }
}

class Plain extends Component {
  state = {
    items: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.users) {
      return null
    }

    if (
      JSON.stringify(nextProps.users.items) === JSON.stringify(prevState.items)
    ) {
      return null
    }

    return {
      items: [...(prevState.items || []), ...nextProps.users.items],
    }
  }

  render() {
    if (!this.state.items) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner visible />
        </View>
      )
    }

    return <Page {...this.props} items={this.state.items} />
  }
}

const Users = gql`
  query Users($startCursor: String) {
    users(startCursor: $startCursor, limit: 15) {
      items {
        key
        name
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

const PlainWithData = graphql(Users, {
  options: ({ startCursor }) => ({
    variables: { startCursor: startCursor },
  }),
  props: ({ data }) => ({ ...data }),
})(Plain)

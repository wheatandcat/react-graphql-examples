import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Spinner from "react-native-loading-spinner-overlay"
import { View } from "react-native-ui-lib"
import { Consumer } from "../../../containers/Provider"
import Page from "./Page"

export default class extends Component {
  render() {
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

    const signedIn = await this.props.auth.signedIn()

    if (!signedIn) {
      this.props.navigator.showModal({
        screen: "native.SignIn",
        title: "Sign In",
      })
      return
    }

    this.setState({ signedIn })
  }

  async componentDidMount() {
    this.setState({
      startCursor: "",
    })
  }

  onNext = cursor => {
    this.setState({
      startCursor: cursor,
    })
  }
  onPrev = cursor => {
    this.setState({
      startCursor: cursor,
    })
  }

  render() {
    if (!this.state.signedIn) {
      return null
    }

    return (
      <PlainWithData
        {...this.props}
        startCursor={this.state.startCursor}
        onNext={this.onNext}
        onPrev={this.onPrev}
      />
    )
  }
}

const Plain = props => {
  if (!props.users) {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible />
      </View>
    )
  }

  return <Page {...props} />
}

const Users = gql`
  query Users($startCursor: String) {
    users(startCursor: $startCursor) {
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

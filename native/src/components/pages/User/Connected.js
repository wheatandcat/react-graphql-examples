import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Page from "./Page"

export default class extends Component {
  render() {
    return <PlainWithData userId={this.props.userId} />
  }
}

class Plain extends Component {
  render() {
    if (!this.props.user) {
      return null
    }

    return <Page {...this.props} />
  }
}

const User = gql`
  query User($key: Int) {
    user(key: $key) {
      key
      name
    }
  }
`

const PlainWithData = graphql(User, {
  options: props => {
    return { variables: { key: props.userId } }
  },
  props: ({ data }) => ({ ...data }),
})(Plain)

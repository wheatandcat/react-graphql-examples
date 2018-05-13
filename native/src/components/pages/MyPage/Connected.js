import React, { Component } from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Page from "./Page"

const Plain = props => {
  if (!props.users) {
    return null
  }

  return <Page {...props} />
}

const Users = gql`
  {
    users {
      items {
        key
        name
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

export default class extends Component {
  state = {
    startCursor: "",
  }

  componentDidMount() {}

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

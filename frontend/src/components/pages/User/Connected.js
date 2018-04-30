import React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Page from "./Page"

const Plain = ({ user }) => {
  if (!user) {
    return null
  }

  return <Page user={user} />
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
  options: ({ match }) => ({ variables: { key: match.params.key } }),
  props: ({ data }) => ({ ...data }),
})(Plain)

export default PlainWithData

import React from "react"
import gql from "graphql-tag"
import connect from "lib/connect"
import Page from "./Page"

const MuiFeedWithData = ({ users }) => <Page users={users || []} />

export default connect(
  gql`
    query Users {
      users {
        key
        name
      }
    }
  `,
  MuiFeedWithData
)

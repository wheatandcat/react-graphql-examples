import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Page from "./Page";

const Plain = ({ users }) => {
  console.log(users);
  if (!users) {
    return null;
  }

  return <Page users={users.items || []} />;
};

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
`;

const PlainWithData = graphql(Users, {
  options: ({ match }) => ({ variables: { startCursor: "" } }),
  props: ({ data }) => ({ ...data })
})(Plain);

export default PlainWithData;

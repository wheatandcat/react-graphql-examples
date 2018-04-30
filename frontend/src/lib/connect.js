import { graphql } from "react-apollo"

const withCharacter = query =>
  graphql(query, {
    options: ({ episode }) => ({
      variables: { episode },
    }),
    props: ({ data }) => ({ ...data }),
  })

export default (query, component) => withCharacter(query)(component)

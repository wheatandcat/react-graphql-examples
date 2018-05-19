import { GraphQLString } from "graphql"

export const scheme = {
  type: GraphQLString,
  resolve: function(source, args) {
    return "Hello world!"
  },
}

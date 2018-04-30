import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql"

export const scheme = new GraphQLObjectType({
  name: "User",
  fields: {
    key: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
})

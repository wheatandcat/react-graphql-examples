import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";

export const scheme = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    hasPreviousPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean },
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString }
  }
});

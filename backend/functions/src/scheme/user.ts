import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";
import { scheme as pageInfoType } from "./pageInfo";

export const scheme = new GraphQLObjectType({
  name: "User",
  fields: {
    key: { type: GraphQLInt },
    name: { type: GraphQLString }
  }
});

export const schemes = new GraphQLObjectType({
  name: "Users",
  fields: {
    items: { type: new GraphQLList(scheme) },
    pageInfo: { type: pageInfoType }
  }
});

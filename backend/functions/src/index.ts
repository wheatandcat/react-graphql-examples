import * as functions from "firebase-functions"
import * as express from "express"
import * as graphqlHTTP from "express-graphql"
import { buildSchema } from "graphql"
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql"
import { scheme as hello } from "./scheme/hello"
import { scheme as userType } from "./scheme/user"

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello,
      user: {
        type: userType,
        args: { id: { type: GraphQLInt } },
        resolve: (_, args) => {
          console.log(args)

          return { id: 1, name: "foo" }
        },
      },
      users: {
        type: new GraphQLList(userType),
        args: { id: { type: GraphQLInt } },
        resolve: (_, args) => {
          console.log(args)

          return [{ id: 1, name: "foo" }, { id: 2, name: "bar" }]
        },
      },
    },
  }),
})

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
  })
)

exports.app = functions.https.onRequest(app)

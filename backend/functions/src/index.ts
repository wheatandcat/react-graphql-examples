import * as functions from "firebase-functions"
import * as express from "express"
import * as graphqlHTTP from "express-graphql"
import { buildSchema } from "graphql"
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} from "graphql"
import * as Datastore from "@google-cloud/datastore"
import { scheme as hello } from "./scheme/hello"
import { scheme as userType } from "./scheme/user"
import { user, users } from "./utils/user"

const datastore = new Datastore({
  projectId: process.env.PROJECT_ID || "test",
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello,
      user: {
        type: userType,
        args: { key: { type: GraphQLInt } },
        resolve: async (_, args) => {
          return await user(datastore, args.key)
        },
      },
      users: {
        type: new GraphQLList(userType),
        resolve: (_, args) => {
          return users(datastore)
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

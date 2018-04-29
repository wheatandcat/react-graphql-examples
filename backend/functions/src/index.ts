import * as functions from "firebase-functions"
import * as express from "express"
import * as graphqlHTTP from "express-graphql"
import { buildSchema } from "graphql"

// Init express
const app = express()

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!"
  },
}

app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

exports.graphql = functions.https.onRequest(app)

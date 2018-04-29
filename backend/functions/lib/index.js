"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
// Init express
const app = express();
// Construct a schema, using GraphQL schema language
const schema = graphql_1.buildSchema(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return "Hello world!";
    },
};
app.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
exports.graphql = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
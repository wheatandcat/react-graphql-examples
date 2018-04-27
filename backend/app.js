import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
      character(val: Int): Character!,
      func(val: Int): Int
  },
  type Episode {
      name: String!
  },
  type Character {
      name: String!
      episodes: [Episode]!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  character: {
    name: "name1",
    episodes: [{ name: "child1" }, { name: "child2" }, { name: "child3" }]
  },
  func: val => {
    console.log(val);
    return val.val * 2;
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
const hello_1 = require("./scheme/hello");
const user_1 = require("./scheme/user");
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: {
            hello: hello_1.scheme,
            user: {
                type: user_1.scheme,
                args: { id: { type: graphql_1.GraphQLInt } },
                resolve: (_, args) => {
                    console.log(args);
                    return { id: 1, name: "foo" };
                },
            },
            users: {
                type: new graphql_1.GraphQLList(user_1.scheme),
                args: { id: { type: graphql_1.GraphQLInt } },
                resolve: (_, args) => {
                    console.log(args);
                    return [{ id: 1, name: "foo" }, { id: 2, name: "bar" }];
                },
            },
        },
    }),
});
const app = express();
app.use("/graphql", graphqlHTTP({
    schema: schema,
}));
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
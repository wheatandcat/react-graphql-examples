"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const graphql_1 = require("graphql");
const Datastore = require("@google-cloud/datastore");
const hello_1 = require("./scheme/hello");
const user_1 = require("./scheme/user");
const user_2 = require("./utils/user");
const datastore = new Datastore({
    projectId: process.env.PROJECT_ID || "test",
});
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: {
            hello: hello_1.scheme,
            user: {
                type: user_1.scheme,
                args: { key: { type: graphql_1.GraphQLInt } },
                resolve: (_, args) => __awaiter(this, void 0, void 0, function* () {
                    return yield user_2.user(datastore, args.key);
                }),
            },
            users: {
                type: new graphql_1.GraphQLList(user_1.scheme),
                resolve: (_, args) => {
                    return user_2.users(datastore);
                },
            },
        },
    }),
});
const app = express();
app.use("/graphql", cors(), graphqlHTTP((req, res) => {
    return {
        schema: schema,
        pretty: true,
    };
}));
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
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
const admin = require("firebase-admin");
const graphql_1 = require("graphql");
const Datastore = require("@google-cloud/datastore");
const hello_1 = require("./scheme/hello");
const user_1 = require("./scheme/user");
const user_2 = require("./utils/user");
const datastore = new Datastore({
    projectId: process.env.NODE_ENV === "production" ? "example-202505" : "test",
});
if (process.env.NODE_ENV === "production") {
    admin.initializeApp(functions.config().firebase);
}
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
                type: user_1.schemes,
                args: { startCursor: { type: graphql_1.GraphQLString } },
                resolve: (_, args) => {
                    console.log(args);
                    return user_2.users(datastore, args.startCursor);
                },
            },
        },
    }),
});
const app = express();
app.use("/graphql", cors(), graphqlHTTP((req, res) => __awaiter(this, void 0, void 0, function* () {
    //if (process.env.NODE_ENV !== "production") {
    return {
        schema: schema,
        pretty: true,
    };
    //}
    /*
    const idToken = req.headers.authorization.replace("Bearer ", "");

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    return {
      schema: schema,
      pretty: true
    };
    */
})));
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
import * as functions from "firebase-functions";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import * as cors from "cors";
import * as admin from "firebase-admin";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql";
import * as Datastore from "@google-cloud/datastore";
import { scheme as hello } from "./scheme/hello";
import { scheme as userType, schemes as usersType } from "./scheme/user";
import { user, users } from "./utils/user";

const datastore = new Datastore({
  projectId: process.env.NODE_ENV === "production" ? "example-202505" : "test"
});

if (process.env.NODE_ENV === "production") {
  admin.initializeApp(functions.config().firebase);
}

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello,
      user: {
        type: userType,
        args: { key: { type: GraphQLInt } },
        resolve: async (_, args) => {
          return await user(datastore, args.key);
        }
      },
      users: {
        type: usersType,
        args: { startCursor: { type: GraphQLString } },
        resolve: (_, args) => {
          console.log(args);
          return users(datastore, args.startCursor);
        }
      }
    }
  })
});

const app = express();
app.use(
  "/graphql",
  cors(),
  graphqlHTTP(async (req, res) => {
    if (process.env.NODE_ENV !== "production") {
      return {
        schema: schema,
        pretty: true
      };
    }

    const idToken = req.headers.authorization.replace("Bearer ", "");

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    return {
      schema: schema,
      pretty: true
    };
  })
);

exports.app = functions.https.onRequest(app);

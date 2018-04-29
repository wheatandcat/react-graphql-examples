import { GraphQLString } from "graphql"

export const scheme = {
  type: GraphQLString,
  resolve: function(source, args) {
    return "Hello world!"
  },
}

/*
import * as Datastore from "@google-cloud/datastore"
import { default as config } from "./config"

const datastore = new Datastore({
  projectId: config.projectId,
})

// The kind for the new entity
const kind = "Task"
// The name/ID for the new entity
const name = "sampletask1"
// The Cloud Datastore key for the new entity
const taskKey = datastore.key([kind, name])

// Prepares the new entity
const task = {
  key: taskKey,
  data: {
    description: "Buy milk",
  },
}


// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    console.log(process.env)
    // Saves the entity
    datastore
      .save(task)
      .then(() => {
        console.log(`Saved ${task.key.name}: ${task.data.description}`)
      })
      .catch(err => {
        console.error("ERROR:", err)
      })
    const query = datastore.createQuery("Task")
    datastore.runQuery(query).then(results => {
      console.log(results)
    })
    return "Hello world!"
  },
}*/

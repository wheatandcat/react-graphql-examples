import * as Datastore from "@google-cloud/datastore"

const kind = "User"

export const user = async (datastore, key) => {
  const query = await datastore.createQuery(kind).filter("key", "=", key)
  const result = await datastore.runQuery(query)

  return result[0][0] || null
}

export const users = async datastore => {
  const query = await datastore.createQuery(kind)
  const result = await datastore.runQuery(query)

  return result[0] || []
}

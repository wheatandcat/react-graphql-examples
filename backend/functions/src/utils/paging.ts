import * as Datastore from "@google-cloud/datastore";

const param = {
  pageCursor: "",
  order: "key",
  limit: 5
};

export const search = async (datastore, kind, startCursor, endCursor) => {
  const p =
    startCursor !== ""
      ? await prev(datastore, await datastore.createQuery(kind), startCursor)
      : [[], { endCursor: "" }];

  const n = await next(datastore, await datastore.createQuery(kind), endCursor);

  return {
    hasPreviousPage: p[0].length > 0,
    hasNextPage: n[0].length > 0,
    startCursor: p[1].endCursor,
    endCursor: n[0].length > 0 ? endCursor : ""
  };
};

const prev = async (datastore, query, cursor) => {
  let q = await query
    .select("key")
    .order(param.order, {
      descending: true
    })
    .limit(param.limit)
    .start(cursor);

  const result = await datastore.runQuery(q);

  return result;
};

const next = async (datastore, query, cursor) => {
  let q = await query
    .select("key")
    .order(param.order, {
      descending: false
    })
    .limit(param.limit)
    .start(cursor);

  const result = await datastore.runQuery(q);

  return result;
};

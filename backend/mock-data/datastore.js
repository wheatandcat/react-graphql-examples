const Datastore = require("@google-cloud/datastore");

const projectId = "example-202505";

let config = {
  projectId: process.env.PROJECT_ID || "test"
};

if (process.env.NODE_ENV === "production") {
  config = {
    projectId: process.env.PROJECT_ID,
    keyFilename: "key.json"
  };
}

const datastore = new Datastore(config);

const kind = "User";
const data = [
  {
    key: 1,
    name: "aaa"
  },
  {
    key: 2,
    name: "bbb"
  },
  {
    key: 3,
    name: "ccc"
  },
  {
    key: 4,
    name: "ddd"
  },
  {
    key: 5,
    name: "eee"
  },
  {
    key: 6,
    name: "fff"
  },
  {
    key: 7,
    name: "ggg"
  },
  {
    key: 8,
    name: "hhh"
  },
  {
    key: 9,
    name: "iii"
  },
  {
    key: 10,
    name: "jjj"
  },
  {
    key: 11,
    name: "kkk"
  },
  {
    key: 12,
    name: "lll"
  },
  {
    key: 13,
    name: "mmm"
  }
];

const deleteAll = async () => {
  const query = await datastore.createQuery(kind);
  const result = await datastore.runQuery(query);

  await Promise.all(
    result[0].map(async v => {
      const key = await datastore.key([kind, v.key]);
      await datastore.delete(key);
    })
  );
};

const save = async () => {
  await Promise.all(
    data.map(async v => {
      const key = await datastore.key([kind, v.key]);
      const value = {
        key,
        data: v
      };

      await datastore.save(value);
    })
  );
};

const read = async () => {
  const query = await datastore.createQuery(kind);
  const result = await datastore.runQuery(query);

  await result[0].map(async v => await console.log(v));
};

const start = async () => {
  await deleteAll();
  await save();
  await read();
};

start();

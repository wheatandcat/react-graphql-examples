# frontend

### init

* make file 「src/config.js」
* write firebase config

```
export const config = {
  apiKey: "xxxxxxxxxxxxxxx",
  authDomain: "exxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxx",
}
```

### local

```
npm start
```

### deploy

```
npm run build
gcloud -q app deploy
```

# backend

### setup

```
gcloud components install cloud-datastore-emulator
```

### local datastore

```
export DATASTORE_PROJECT_ID=test
gcloud beta emulators datastore start --no-legacy
```

### local mock data

```
cd backend/mock-data
DATASTORE_EMULATOR_HOST=127.0.0.1:8081 npm run mock
```

### local start

```
DATASTORE_EMULATOR_HOST=127.0.0.1:8081 firebase serve --only functions
```

### production mock datas

```
cd backend/mock-data
NODE_ENV=production PROJECT_ID=xxxx npm run mock
```

### deploy

```
firebase deploy --only functions
```

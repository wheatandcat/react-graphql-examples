# backend

### setup

```
gcloud components install cloud-datastore-emulator
```

### local datastore

```
export DATASTORE_PROJECT_ID=test
gcloud beta emulators datastore start
```

### local start

```
firebase serve --only functions
```

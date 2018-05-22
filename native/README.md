## init

```
brew install node
```

## local ios

```
react-native run-ios
```

## local android

```
react-native run-android
```

## build ios

```
npm run ios:bate
```

### ios appetize.io upload

#### build

```
npm run xcode

// exec build
// end

ls   ~/Library/Developer/Xcode/DerivedData/<project-name>/Build/Products/Release-iphonesimulator/<project-name>.app
```

Create <project-name>.app.zip from <project-name>.app

#### upload

Upload <project-name>.app.zip

https://appetize.io/upload

## build android

```
npm run android:bate
npm run android:bate:jarsigner
open android/app/build/outputs/apk/release/
```

## android key list

```
keytool -list -v -keystore android/app/android-release.keystore
```

### android appetize.io upload

#### get APITOKEN

https://appetize.io/docs#request-api-token

#### upload

```
curl https://APITOKEN@api.appetize.io/v1/apps \
  -F "file=@app-release-unsigned.apk" -F "platform=android"
```

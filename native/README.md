## setup

```
npm install -g react-native-cli
brew install node
```

# android

### setup

```
vi ./android/gradle.properties
```

↓ 　 android/gradle.properties save

```
android.useDeprecatedNdk=true
android.enableAapt2=false
```

## local android

```
react-native run-android
```

## build android

### setup

```
keytool -genkey -v -keystore ./android/app/android-release.keystore -alias android-release -keyalg RSA -keysize 2048 -validity 36524
```

↓ 　 native/android/gradle.properties save

```
android.useDeprecatedNdk=true
android.enableAapt2=false

MYAPP_RELEASE_STORE_FILE=android-release.keystore
MYAPP_RELEASE_KEY_ALIAS=android-release
MYAPP_RELEASE_STORE_PASSWORD=xxxxxxxxxx
MYAPP_RELEASE_KEY_PASSWORD=xxxxxxxxxx
```

### command

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

# ios

## setup

```
cd ios
pod install
```

## local ios

```
react-native run-ios
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

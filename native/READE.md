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

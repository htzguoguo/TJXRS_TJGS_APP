## 解决react-native-dynamically-selected-picker 在嵌套view里不触发滑动事件
1. 在node_modules找到对应的文件夹；
2. 添加 nestedScrollEnabled = {true}； 137 line.


## Error type 3. Activity class {com.awesome_project/ com.awesome_project.MainActivity} does not exist in react native (Android device)
adb uninstall com.rnboilerplate

## React Native 0.62.* [TypeError: Network request failed] on file upload

I faced same issue, it happens in Android, but works well in IOS.
I guess this issue about Flipper Network.

For while, I commented
initializeFlipper(this, getReactNativeHost().getReactInstanceManager())

in this file
/android/app/src/main/java/com/{your_project}/MainApplication.java



## Build and Install unsigned apk on device without the development server

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android
#Create debug build:
./gradlew assembleDebug
#Create release build:
./gradlew assembleRelease
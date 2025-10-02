# MDani Store 📱

Your personal Android app store built with React Native. Download and install APK files directly to your device.

## Features

- 🔍 Browse apps with detailed information (name, icon, version, description)
- 📥 Direct APK download to Downloads folder using react-native-fs
- 📱 Automatic APK installer launch after download
- 🔒 Runtime permission handling for storage and installation
- 🎨 Beautiful Material Design interface
- 🔄 Pull-to-refresh app list
- 📊 Download progress tracking

## Requirements

- React Native development environment
- Android device or emulator (API level 21+)
- Enable "Install unknown apps" permission for MDani Store

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd mdanistore
npm install
```

### 2. Install react-native-fs (Already Done)

```bash
npm install react-native-fs
```

### 3. Build and Run

```bash
# Start Metro
npm start

# Run on Android (in another terminal)
npx react-native run-android
```


## User Instructions

### Enable Install Unknown Apps

For users to install APKs from MDani Store:

1. Go to **Settings** > **Apps** > **MDani Store**
2. Tap **Install unknown apps**
3. Toggle **Allow from this source**

Or when prompted during installation:
1. Tap **Settings** when the install is blocked
2. Enable **Install unknown apps**
3. Return to the installer

## Troubleshooting

### Downloads Fail
- Check internet connection
- Verify APK URL is accessible
- Ensure storage permissions are granted

### Installation Fails
- Enable "Install unknown apps" in Settings
- Check if APK file exists in Downloads folder
- Verify APK is not corrupted



## License

MIT License - feel free to modify and distribute.
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

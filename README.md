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

## Backend Setup (Free Hosting)

### 1. GitHub Repository Setup

Your apps repository: `https://github.com/mdani25/mdanistore-apps`

Repository structure:
```
mdanistore-apps/
├── store.json          # Main app store data
├── icons/              # App icons
│   ├── calculator.png
│   └── expensetracker.png
└── screenshots/        # App screenshots
    ├── calculator1.png
    ├── expensetracker1.png
    └── expensetracker2.png
```

### 2. Upload APK Files to GitHub Releases ✅

1. ✅ Repository created: `mdanistore-apps`
2. ✅ Apps uploaded:
   - **v1.0.0**: `MDaniCalculator.apk` - `https://github.com/mdani25/mdanistore-apps/releases/download/v1.0.0/MDaniCalculator.apk`
   - **v2.0.0**: `MyExpenseTracker.apk` - `https://github.com/mdani25/mdanistore-apps/releases/download/v2.0.0/MyExpenseTracker.apk`

### 3. Create store.json

Create `store.json` in your repository root:

```json
{
  "storeVersion": "1.0.0",
  "lastUpdated": "2025-10-02T00:00:00Z",
  "apps": [
    {
      "id": "com.mdani.calculator",
      "name": "MDani Calculator",
      "version": "1.0.0",
      "description": "A clean and simple calculator app",
      "iconUrl": "https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/icons/calculator.png",
      "apkUrl": "https://github.com/mdani25/mdanistore-apps/releases/download/v1.0.0/MDaniCalculator.apk",
      "packageName": "com.mdani.calculator",
      "size": "4.2 MB",
      "minAndroidVersion": "21",
      "category": "Productivity"
    }
  ]
}
```

### 4. Update App Configuration

The app is already configured to use your repository:

```typescript
const storeUrl = 'https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/store.json';
```

### Alternative: Deploy to Netlify

1. Upload your app assets to Netlify
2. Host `store.json` on Netlify with APK files
3. Use Netlify URL in your app

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

## Project Structure

```
src/
├── components/
│   ├── AppStore.tsx     # Main store component
│   └── AppCard.tsx      # Individual app display
├── types/
│   └── index.ts         # TypeScript interfaces
└── utils/
    ├── DownloadManager.ts    # APK download logic
    └── PermissionManager.ts  # Runtime permissions
```

## Permissions

The app requests these permissions:

- `INTERNET` - Fetch app data and download APKs
- `WRITE_EXTERNAL_STORAGE` - Save APKs to Downloads folder
- `READ_EXTERNAL_STORAGE` - Read downloaded files
- `REQUEST_INSTALL_PACKAGES` - Install APKs (Android 8+)

## Troubleshooting

### Downloads Fail
- Check internet connection
- Verify APK URL is accessible
- Ensure storage permissions are granted

### Installation Fails
- Enable "Install unknown apps" in Settings
- Check if APK file exists in Downloads folder
- Verify APK is not corrupted

### App List Not Loading
- Check internet connection
- Verify store.json URL is accessible
- Pull down to refresh the list

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

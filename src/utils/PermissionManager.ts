import { PermissionsAndroid, Platform, Alert } from 'react-native';

export class PermissionManager {
  static async requestStoragePermission(): Promise<boolean> {
    console.log('🔍 Requesting storage permission...');
    console.log('📱 Platform:', Platform.OS);
    console.log('📊 Android API Level:', Platform.Version);
    
    if (Platform.OS !== 'android') {
      console.log('✅ Non-Android platform - permission granted by default');
      return true;
    }

    try {
      // Android 13+ (API 33+) uses scoped storage - no WRITE_EXTERNAL_STORAGE needed for Downloads
      if (Platform.Version >= 33) {
        console.log('🆕 Android 13+ detected - Using scoped storage (no permission needed for Downloads)');
        console.log('✅ STORAGE ACCESS: TRUE - Scoped storage allows Downloads directory access');
        return true;
      }
      
      // For Android 6.0+ to Android 12 (API 23-32) we need runtime permissions
      if (Platform.Version >= 23) {
        console.log('🔐 Requesting WRITE_EXTERNAL_STORAGE permission...');
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'MDani Store needs storage permission to download APK files to your device.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        console.log('📋 Permission result:', granted);
        console.log('✅ Permission granted:', granted === PermissionsAndroid.RESULTS.GRANTED);
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('🎉 STORAGE ACCESS: TRUE - Permission granted!');
        } else {
          console.log('❌ STORAGE ACCESS: FALSE - Permission denied!');
          console.log('💡 Possible values: GRANTED, DENIED, NEVER_ASK_AGAIN');
        }

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      
      // For older Android versions, permissions are granted at install time
      console.log('📱 Android < 6.0 - permissions granted at install time');
      console.log('✅ STORAGE ACCESS: TRUE (legacy Android)');
      return true;
    } catch (error) {
      console.error('❌ STORAGE ACCESS: FALSE - Permission request error:', error);
      return false;
    }
  }

  static async checkStoragePermission(): Promise<boolean> {
    console.log('🔍 Checking current storage permission status...');
    
    if (Platform.OS !== 'android') {
      console.log('✅ Non-Android platform - permission check passed');
      return true;
    }

    try {
      // Android 13+ (API 33+) uses scoped storage - no WRITE_EXTERNAL_STORAGE needed for Downloads
      if (Platform.Version >= 33) {
        console.log('🆕 Android 13+ detected - Scoped storage enabled');
        console.log('✅ STORAGE ACCESS CHECK: TRUE - Downloads directory access available');
        return true;
      }
      
      if (Platform.Version >= 23) {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        
        console.log('📋 Current permission status:', hasPermission);
        if (hasPermission) {
          console.log('✅ STORAGE ACCESS CHECK: TRUE - Already have permission');
        } else {
          console.log('❌ STORAGE ACCESS CHECK: FALSE - Need to request permission');
        }
        
        return hasPermission;
      }
      
      console.log('📱 Android < 6.0 - permission check passed (legacy)');
      return true;
    } catch (error) {
      console.error('❌ Permission check error:', error);
      return false;
    }
  }

  static async requestInstallPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      // For Android 8.0+ (API 26+) we need REQUEST_INSTALL_PACKAGES permission
      if (Platform.Version >= 26) {
        const granted = await PermissionsAndroid.request(
          'android.permission.REQUEST_INSTALL_PACKAGES' as any,
          {
            title: 'Install Permission',
            message: 'MDani Store needs permission to install APK files on your device.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Required',
            'To install APK files, you need to enable "Install unknown apps" in Settings > Apps > MDani Store > Install unknown apps.',
            [
              { text: 'OK' }
            ]
          );
          return false;
        }

        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Install permission request error:', error);
      Alert.alert(
        'Permission Error',
        'Unable to request install permission. Please enable "Install unknown apps" manually in Settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
  }

  static async ensureAllPermissions(): Promise<boolean> {
    console.log('🚀 STARTING PERMISSION FLOW...');
    
    try {
      // Check and request storage permission first
      console.log('1️⃣ Step 1: Checking existing storage permission...');
      let hasStoragePermission = await this.checkStoragePermission();
      
      if (!hasStoragePermission) {
        console.log('2️⃣ Step 2: Storage permission not found, requesting...');
        hasStoragePermission = await this.requestStoragePermission();
        
        if (!hasStoragePermission) {
          console.log('❌ FINAL RESULT: STORAGE ACCESS DENIED - Cannot download files');
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download APK files. Please enable it in Settings.',
            [{ text: 'OK' }]
          );
          return false;
        }
      } else {
        console.log('✅ Step 1 Complete: Storage permission already granted');
      }

      // For install permission, we'll request it when needed during installation
      // as it's better UX to request it at the point of use
      
      console.log('🎉 FINAL RESULT: ALL PERMISSIONS GRANTED - Ready to download!');
      return true;
    } catch (error) {
      console.error('❌ FINAL RESULT: PERMISSION FLOW ERROR:', error);
      return false;
    }
  }
}
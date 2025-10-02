import { PermissionsAndroid, Platform, Alert } from 'react-native';

export class PermissionManager {
  static async requestStoragePermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      // For Android 6.0+ we need runtime permissions
      if (Platform.Version >= 23) {
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

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      
      // For older Android versions, permissions are granted at install time
      return true;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  }

  static async checkStoragePermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      if (Platform.Version >= 23) {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return hasPermission;
      }
      
      return true;
    } catch (error) {
      console.error('Permission check error:', error);
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
    try {
      // Check and request storage permission first
      let hasStoragePermission = await this.checkStoragePermission();
      
      if (!hasStoragePermission) {
        hasStoragePermission = await this.requestStoragePermission();
        
        if (!hasStoragePermission) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download APK files. Please enable it in Settings.',
            [{ text: 'OK' }]
          );
          return false;
        }
      }

      // For install permission, we'll request it when needed during installation
      // as it's better UX to request it at the point of use
      
      return true;
    } catch (error) {
      console.error('Permission setup error:', error);
      return false;
    }
  }
}
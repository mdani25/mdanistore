import RNFS from 'react-native-fs';
import { Alert, Linking, Platform } from 'react-native';
import { PermissionManager } from './PermissionManager';

export class DownloadManager {
  private getDownloadsPath(): string {
    // Use the public Downloads directory - accessible on all Android versions
    // On Android 13+, this works with scoped storage without special permissions
    console.log('📁 Using Downloads directory:', RNFS.DownloadDirectoryPath);
    console.log('📱 Android API Level:', Platform.Version);
    
    const apiLevel = typeof Platform.Version === 'number' ? Platform.Version : parseInt(Platform.Version as string, 10);
    console.log('🔧 Storage approach:', apiLevel >= 33 ? 'Scoped Storage (Android 13+)' : 'Traditional Storage');
    return RNFS.DownloadDirectoryPath;
  }

  private generateFileName(appName: string, version: string): string {
    // Clean the app name to make it file-system safe
    const cleanName = appName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    return `${cleanName}_v${version}.apk`;
  }

  async downloadAPK(
    url: string,
    appName: string,
    version: string,
    onProgress?: (progress: number) => void
  ): Promise<boolean> {
    try {
      console.log('📁 DOWNLOAD MANAGER: Starting download process...');
      console.log('📱 App:', appName, 'v' + version);
      console.log('🔗 URL:', url);
      
      // Check and request storage permissions first
      console.log('🔐 DOWNLOAD MANAGER: Checking permissions...');
      const hasPermissions = await PermissionManager.ensureAllPermissions();
      
      if (!hasPermissions) {
        console.log('❌ DOWNLOAD MANAGER: Storage access DENIED - Cannot proceed');
        return false;
      }
      
      console.log('✅ DOWNLOAD MANAGER: Storage access GRANTED - Proceeding with download');

      const fileName = this.generateFileName(appName, version);
      const downloadPath = `${this.getDownloadsPath()}/${fileName}`;

      console.log(`Starting download: ${url}`);
      console.log(`Download path: ${downloadPath}`);

      // Check if file already exists
      const fileExists = await RNFS.exists(downloadPath);
      if (fileExists) {
        const shouldRedownload = await new Promise<boolean>((resolve) => {
          Alert.alert(
            'File Exists',
            `${appName} v${version} is already downloaded. Do you want to download it again?`,
            [
              { text: 'Cancel', onPress: () => resolve(false) },
              { text: 'Re-download', onPress: () => resolve(true) }
            ]
          );
        });

        if (!shouldRedownload) {
          // File exists and user doesn't want to re-download, try to install existing file
          return this.installAPK(downloadPath);
        }

        // Delete existing file if user wants to re-download
        await RNFS.unlink(downloadPath);
      }

      // Start download
      const downloadResult = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadPath,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          onProgress?.(progress);
        },
      });

      const result = await downloadResult.promise;

      if (result.statusCode === 200) {
        console.log('Download completed successfully');
        
        // Verify file exists and has content
        const stat = await RNFS.stat(downloadPath);
        if (stat.size > 0) {
          // Install the APK
          return this.installAPK(downloadPath);
        } else {
          throw new Error('Downloaded file is empty');
        }
      } else {
        throw new Error(`Download failed with status code: ${result.statusCode}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      return false;
    }
  }

  private async installAPK(filePath: string): Promise<boolean> {
    try {
      if (Platform.OS !== 'android') {
        Alert.alert('Error', 'APK installation is only supported on Android');
        return false;
      }

      // Check if file exists
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        Alert.alert('Error', 'APK file not found');
        return false;
      }

      // Request install permission for Android 8.0+
      const hasInstallPermission = await PermissionManager.requestInstallPermission();
      if (!hasInstallPermission) {
        // Still continue as the user might enable it manually
        console.log('Install permission not granted, but continuing...');
      }

      console.log(`Installing APK: ${filePath}`);

      // Create content URI for the APK file
      const contentUri = `content://com.mdanistore.fileprovider${filePath.replace(RNFS.ExternalDirectoryPath, '')}`;
      
      // Try to open the APK installer
      const canOpen = await Linking.canOpenURL(contentUri);
      
      if (canOpen) {
        await Linking.openURL(contentUri);
        return true;
      } else {
        // Fallback: try to open with file:// URI (may not work on newer Android versions)
        const fileUri = `file://${filePath}`;
        const canOpenFile = await Linking.canOpenURL(fileUri);
        
        if (canOpenFile) {
          await Linking.openURL(fileUri);
          return true;
        } else {
          this.showInstallInstructions(filePath);
          return true; // Consider it successful as we've guided the user
        }
      }
    } catch (error) {
      console.error('Install error:', error);
      this.showInstallInstructions(filePath);
      return true; // Consider it successful as we've guided the user
    }
  }

  private showInstallInstructions(filePath: string): void {
    const fileName = filePath.split('/').pop();
    
    Alert.alert(
      'Installation Instructions',
      `The APK "${fileName}" has been downloaded to your Downloads folder.\n\n` +
      'To install:\n' +
      '1. Open your file manager\n' +
      '2. Navigate to Downloads folder\n' +
      '3. Tap on the APK file\n' +
      '4. Enable "Install unknown apps" if prompted\n' +
      '5. Follow the installation steps',
      [
        { 
          text: 'Open Downloads', 
          onPress: () => {
            // Try to open file manager to Downloads folder
            Linking.openURL('content://com.android.externalstorage.documents/document/primary%3ADownload')
              .catch(() => {
                // Fallback: open file manager app
                Linking.openURL('content://com.android.documentsui.documents/document/primary%3ADownload')
                  .catch(() => {
                    console.log('Could not open Downloads folder');
                  });
              });
          }
        },
        { text: 'OK' }
      ]
    );
  }

  async getDownloadedAPKs(): Promise<string[]> {
    try {
      const downloadsPath = this.getDownloadsPath();
      const files = await RNFS.readDir(downloadsPath);
      
      return files
        .filter(file => file.name.endsWith('.apk'))
        .map(file => file.path);
    } catch (error) {
      console.error('Error reading downloads:', error);
      return [];
    }
  }

  async deleteAPK(filePath: string): Promise<boolean> {
    try {
      const exists = await RNFS.exists(filePath);
      if (exists) {
        await RNFS.unlink(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting APK:', error);
      return false;
    }
  }
}
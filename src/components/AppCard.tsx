import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { AppInfo, DownloadStatus } from '../types';
import { DownloadManager } from '../utils/DownloadManager';

interface AppCardProps {
  app: AppInfo;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    try {
      setDownloadStatus(DownloadStatus.DOWNLOADING);
      setDownloadProgress(0);

      const downloadManager = new DownloadManager();
      
      const success = await downloadManager.downloadAPK(
        app.apkUrl,
        app.name,
        app.version,
        (progress) => {
          setDownloadProgress(progress);
        }
      );

      if (success) {
        setDownloadStatus(DownloadStatus.COMPLETED);
        Alert.alert(
          'Download Complete! 🎉',
          `${app.name} has been downloaded successfully!\n\n📁 Check your Downloads folder in File Manager to find the APK file.\n\n💡 Tap the APK file to install the app.`,
          [{ 
            text: 'OK', 
            onPress: () => {
              // Reset download button to allow re-download if needed
              setDownloadStatus(DownloadStatus.IDLE);
              setDownloadProgress(0);
            }
          }]
        );
      } else {
        setDownloadStatus(DownloadStatus.ERROR);
        Alert.alert(
          'Download Failed',
          'Failed to download the app. Please try again.',
          [{ text: 'OK', onPress: () => setDownloadStatus(DownloadStatus.IDLE) }]
        );
      }
    } catch (error) {
      setDownloadStatus(DownloadStatus.ERROR);
      console.error('Download error:', error);
      Alert.alert(
        'Download Error',
        'An error occurred while downloading. Please try again.',
        [{ text: 'OK', onPress: () => setDownloadStatus(DownloadStatus.IDLE) }]
      );
    }
  };

  const getButtonText = () => {
    switch (downloadStatus) {
      case DownloadStatus.DOWNLOADING:
        return `Downloading... ${Math.round(downloadProgress)}%`;
      case DownloadStatus.COMPLETED:
        return 'Downloaded';
      case DownloadStatus.ERROR:
        return 'Retry';
      default:
        return 'Download';
    }
  };

  const getButtonStyle = () => {
    switch (downloadStatus) {
      case DownloadStatus.DOWNLOADING:
        return [styles.downloadButton, styles.downloadingButton];
      case DownloadStatus.COMPLETED:
        return [styles.downloadButton, styles.completedButton];
      case DownloadStatus.ERROR:
        return [styles.downloadButton, styles.errorButton];
      default:
        return styles.downloadButton;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: app.iconUrl }}
          style={styles.appIcon}
        />
        
        <View style={styles.appInfo}>
          <Text style={styles.appName}>{app.name}</Text>
          <Text style={styles.appVersion}>v{app.version}</Text>
          <Text style={styles.appDescription} numberOfLines={2}>
            {app.description}
          </Text>
          
          <View style={styles.appMetadata}>
            <Text style={styles.appSize}>{app.size}</Text>
            <Text style={styles.appCategory}>{app.category}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handleDownload}
        disabled={downloadStatus === DownloadStatus.DOWNLOADING}
      >
        <Text style={styles.downloadButtonText}>
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  appMetadata: {
    flexDirection: 'row',
    gap: 12,
  },
  appSize: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  appCategory: {
    fontSize: 12,
    color: '#fbc531',
    backgroundColor: '#fff9e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  downloadButton: {
    backgroundColor: '#fbc531',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadingButton: {
    backgroundColor: '#ff9800',
  },
  completedButton: {
    backgroundColor: '#4caf50',
  },
  errorButton: {
    backgroundColor: '#f44336',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppCard;
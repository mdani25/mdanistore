export interface AppInfo {
  id: string;
  name: string;
  version: string;
  description: string;
  iconUrl: string;
  apkUrl: string;
  packageName: string;
  size: string;
  minAndroidVersion: string;
  category: string;
  screenshots?: string[];
  changelog?: string;
}

export interface StoreData {
  apps: AppInfo[];
  lastUpdated: string;
  storeVersion: string;
}

export enum DownloadStatus {
  IDLE = 'idle',
  DOWNLOADING = 'downloading',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export interface DownloadProgress {
  appId: string;
  status: DownloadStatus;
  progress: number;
  filePath?: string;
  error?: string;
}
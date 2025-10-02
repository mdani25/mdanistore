import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { AppInfo, StoreData } from '../types';
import AppCard from './AppCard';
import sampleStore from '../../assets/sample-store';

interface AppStoreProps {
  storeUrl?: string;
}

export const AppStore: React.FC<AppStoreProps> = ({ 
  storeUrl = 'https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/store.json' 
}) => {
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = async () => {
    try {
      setError(null);
      console.log('🔄 Fetching apps from:', storeUrl);
      
      const response = await fetch(storeUrl);
      
      if (response.ok) {
        console.log('✅ Remote store is available');
        const storeData: StoreData = await response.json();
        console.log('📱 Loaded', storeData.apps.length, 'apps from remote store');
        setApps(storeData.apps);
      } else {
        // If remote store.json is not available, use local sample data
        console.log('❌ Remote store not available, using local sample data');
        console.log('📱 Loading', sampleStore.apps.length, 'sample apps');
        setApps(sampleStore.apps);
        setError('Using offline data - some features may be limited');
      }
    } catch (err) {
      console.error('❌ Failed to fetch apps:', err);
      
      // Fallback to local sample data
      console.log('📱 Using fallback sample data -', sampleStore.apps.length, 'apps loaded');
      setApps(sampleStore.apps);
      setError('Using offline data - some features may be limited');
      
      // Show informative alert
      Alert.alert(
        'Offline Mode',
        'Could not connect to app store. Showing sample apps. Please check your internet connection for the latest apps.',
        [{ text: 'Retry', onPress: () => fetchApps() }, { text: 'Continue Offline' }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchApps();
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const renderAppItem = ({ item }: { item: AppInfo }) => (
    <AppCard app={item} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        {error ? 'Failed to load apps' : 'No apps available'}
      </Text>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fbc531" />
        <Text style={styles.loadingText}>Loading apps...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MD'ani Store</Text>
        <Text style={styles.subtitle}>Discover amazing MD'ani apps!!</Text>
      </View>
      
      <FlatList
        data={apps}
        renderItem={renderAppItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fbc531',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#f44336',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default AppStore;
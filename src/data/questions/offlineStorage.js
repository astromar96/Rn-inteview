// Offline & Storage Interview Questions
export const offlineStorageQuestions = [
    {
        id: 36,
        category: "Offline & Storage",
        icon: "💾",
        question: "Compare different storage solutions in React Native. When would you use each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Storage Solutions Comparison</h4>

            <h4>1. AsyncStorage</h4>
            <ul>
                <li>Simple key-value storage</li>
                <li>Unencrypted</li>
                <li>Good for: Settings, preferences, non-sensitive cache</li>
            </ul>
            <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', JSON.stringify(data));</code></pre>

            <h4>2. MMKV</h4>
            <ul>
                <li>10x faster than AsyncStorage</li>
                <li>Supports encryption</li>
                <li>Good for: High-frequency access, performance-critical</li>
            </ul>
            <pre><code>import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'app', encryptionKey: 'key' });
storage.set('user', JSON.stringify(user));</code></pre>

            <h4>3. SQLite (via WatermelonDB or Realm)</h4>
            <ul>
                <li>Relational database</li>
                <li>Complex queries, large datasets</li>
                <li>Good for: Offline-first apps, sync scenarios</li>
            </ul>

            <h4>4. Secure Storage (Keychain/Keystore)</h4>
            <ul>
                <li>Hardware-backed encryption</li>
                <li>Good for: Tokens, passwords, sensitive data</li>
            </ul>

            <h4>Decision Matrix</h4>
            <table>
                <tr><td>Small, simple data</td><td>→ AsyncStorage/MMKV</td></tr>
                <tr><td>High performance needs</td><td>→ MMKV</td></tr>
                <tr><td>Complex queries</td><td>→ SQLite/WatermelonDB</td></tr>
                <tr><td>Sensitive data</td><td>→ Keychain/Keystore</td></tr>
            </table>
        `
     },
    {
        id: 37,
        category: "Offline & Storage",
        icon: "💾",
        question: "How do you implement offline-first functionality in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Offline-First Architecture</h4>

            <h4>1. Network State Detection</h4>
            <pre><code>import NetInfo from '@react-native-community/netinfo';

function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected && state.isInternetReachable);
        });
        return unsubscribe;
    }, []);

    return isOnline;
}</code></pre>

            <h4>2. Request Queue for Offline Actions</h4>
            <pre><code>class OfflineQueue {
    private queue: QueuedRequest[] = [];

    async add(request: QueuedRequest) {
        this.queue.push(request);
        await this.persist();
    }

    async processQueue() {
        while (this.queue.length > 0) {
            const request = this.queue[0];
            try {
                await api.request(request);
                this.queue.shift();
                await this.persist();
            } catch (error) {
                if (!isNetworkError(error)) {
                    this.queue.shift(); // Remove failed request
                }
                break;
            }
        }
    }
}</code></pre>

            <h4>3. React Query Offline Support</h4>
            <pre><code>import { onlineManager, focusManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

// Sync online status
onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
    });
});

// Query with offline support
const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: Infinity,
    gcTime: Infinity, // Keep in cache
    networkMode: 'offlineFirst',
});</code></pre>
        `
     },
    {
        id: 145,
        category: "Offline & Storage",
        icon: "💾",
        question: "What are the differences between AsyncStorage, MMKV, and SQLite? When would you use each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Choosing the right storage solution affects app performance and capabilities. This tests practical decision-making skills.</p>

            <h4>Comparison Table</h4>
            <pre><code>┌─────────────────┬──────────────┬──────────────┬──────────────┐
│ Feature         │ AsyncStorage │ MMKV         │ SQLite       │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│ Speed           │ Slow         │ Very Fast    │ Fast         │
│ Data Type       │ String only  │ Multiple     │ Structured   │
│ Query Support   │ Key-value    │ Key-value    │ Full SQL     │
│ Size Limit      │ ~6MB Android │ No limit     │ No limit     │
│ Encryption      │ No           │ Yes          │ With ext     │
│ Sync API        │ No           │ Yes          │ No           │
│ Bundle Size     │ Small        │ Medium       │ Large        │
└─────────────────┴──────────────┴──────────────┴──────────────┘</code></pre>

            <h4>AsyncStorage (Simple Key-Value)</h4>
            <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';

// Store and retrieve
await AsyncStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse(await AsyncStorage.getItem('user'));

// Best for:
// - Small amounts of data
// - Simple settings/preferences
// - When you need minimal dependencies</code></pre>

            <h4>MMKV (High Performance)</h4>
            <pre><code>import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'app-storage', encryptionKey: 'secret' });

// Synchronous API - much faster
storage.set('user', JSON.stringify(user));
const user = JSON.parse(storage.getString('user'));
storage.set('count', 42); // Supports numbers directly
storage.set('enabled', true); // Supports booleans

// Best for:
// - High-frequency reads/writes
// - Performance-critical apps
// - When you need encryption</code></pre>

            <h4>SQLite (Relational Data)</h4>
            <pre><code>import SQLite from 'react-native-sqlite-storage';

const db = await SQLite.openDatabase({ name: 'app.db' });

// Create tables and query
await db.executeSql(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE
  )
\`);

const [results] = await db.executeSql(
  'SELECT * FROM users WHERE name LIKE ?',
  ['%john%']
);

// Best for:
// - Complex data relationships
// - Large datasets with querying needs
// - Offline-first apps with sync requirements</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>MMKV is 30x faster than AsyncStorage</li>
                <li>Use SQLite when you need JOINs or complex queries</li>
                <li>Consider WatermelonDB for reactive SQLite with sync</li>
            </ul>
        `
     },
    {
        id: 146,
        category: "Offline & Storage",
        icon: "💾",
        question: "How do you design an offline-first architecture in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Offline-first apps provide better UX in unreliable network conditions. This tests system design and data management skills.</p>

            <h4>Architecture Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│                    React Native App                  │
├─────────────────────────────────────────────────────┤
│  UI Layer                                           │
│  ├── Optimistic Updates                             │
│  └── Loading/Sync States                            │
├─────────────────────────────────────────────────────┤
│  Data Layer                                         │
│  ├── Local Database (SQLite/WatermelonDB)           │
│  ├── Sync Queue (Pending Changes)                   │
│  └── Conflict Resolution Logic                      │
├─────────────────────────────────────────────────────┤
│  Network Layer                                      │
│  ├── Online/Offline Detection                       │
│  ├── Background Sync                                │
│  └── Retry Logic                                    │
└─────────────────────────────────────────────────────┘</code></pre>

            <h4>Sync Queue Implementation</h4>
            <pre><code>interface SyncOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  data: any;
  timestamp: number;
  retries: number;
}

class SyncQueue {
  private queue: SyncOperation[] = [];
  private isOnline = true;

  async addOperation(op: Omit<SyncOperation, 'id' | 'timestamp' | 'retries'>) {
    const operation = {
      ...op,
      id: uuid(),
      timestamp: Date.now(),
      retries: 0,
    };
    this.queue.push(operation);
    await this.persistQueue();

    if (this.isOnline) {
      this.processQueue();
    }
  }

  async processQueue() {
    for (const op of this.queue) {
      try {
        await this.syncOperation(op);
        this.queue = this.queue.filter(o => o.id !== op.id);
      } catch (error) {
        op.retries++;
        if (op.retries > 3) {
          // Move to dead letter queue
          await this.handleFailedOperation(op);
        }
      }
    }
    await this.persistQueue();
  }
}</code></pre>

            <h4>Network State Management</h4>
            <pre><code>import NetInfo from '@react-native-community/netinfo';

function useOfflineFirst() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasOffline = !isOnline;
      setIsOnline(state.isConnected);

      // Trigger sync when coming back online
      if (wasOffline && state.isConnected) {
        syncQueue.processQueue();
      }
    });
    return unsubscribe;
  }, [isOnline]);

  return { isOnline, pendingSync };
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always write to local DB first, then sync</li>
                <li>Use timestamps for conflict resolution</li>
                <li>Show sync status to users (pending changes count)</li>
            </ul>
        `
     },
    {
        id: 147,
        category: "Offline & Storage",
        icon: "💾",
        question: "How do you handle data synchronization conflicts in React Native apps?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Sync conflicts are inevitable in offline-first apps. This tests your ability to design robust data consistency strategies.</p>

            <h4>Conflict Resolution Strategies</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Strategy          │ Use Case                        │
├───────────────────┼─────────────────────────────────┤
│ Last Write Wins   │ Simple data, low conflict risk  │
│ First Write Wins  │ Reservation systems             │
│ Manual Merge      │ Collaborative editing           │
│ Field-Level Merge │ Complex objects                 │
│ CRDT              │ Real-time collaboration         │
└─────────────────────────────────────────────────────┘</code></pre>

            <h4>Last Write Wins Implementation</h4>
            <pre><code>interface SyncableEntity {
  id: string;
  updatedAt: number;
  version: number;
  data: any;
}

async function syncEntity(local: SyncableEntity, remote: SyncableEntity) {
  if (local.updatedAt > remote.updatedAt) {
    // Local is newer, push to server
    await api.update(local);
    return local;
  } else if (remote.updatedAt > local.updatedAt) {
    // Remote is newer, update local
    await db.update(remote);
    return remote;
  }
  // Same timestamp - use version number
  return local.version > remote.version ? local : remote;
}</code></pre>

            <h4>Field-Level Merge</h4>
            <pre><code>function mergeDocuments(local: Doc, remote: Doc, base: Doc): Doc {
  const merged = { ...base };

  for (const key of Object.keys(local)) {
    const localChanged = local[key] !== base[key];
    const remoteChanged = remote[key] !== base[key];

    if (localChanged && !remoteChanged) {
      merged[key] = local[key];
    } else if (!localChanged && remoteChanged) {
      merged[key] = remote[key];
    } else if (localChanged && remoteChanged) {
      // Both changed - need conflict resolution
      if (local[key] === remote[key]) {
        merged[key] = local[key]; // Same change
      } else {
        // Actual conflict - use timestamp or prompt user
        merged[key] = resolveConflict(key, local, remote);
      }
    }
  }
  return merged;
}</code></pre>

            <h4>User-Facing Conflict Resolution</h4>
            <pre><code>function ConflictResolver({ local, remote, onResolve }) {
  return (
    <View style={styles.conflictModal}>
      <Text>This item was modified on another device</Text>

      <TouchableOpacity onPress={() => onResolve(local)}>
        <Text>Keep my version</Text>
        <Text style={styles.preview}>{local.title}</Text>
        <Text>Modified: {formatDate(local.updatedAt)}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onResolve(remote)}>
        <Text>Use server version</Text>
        <Text style={styles.preview}>{remote.title}</Text>
        <Text>Modified: {formatDate(remote.updatedAt)}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onResolve(merge(local, remote))}>
        <Text>Merge both versions</Text>
      </TouchableOpacity>
    </View>
  );
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Track base version for three-way merge</li>
                <li>Use vector clocks for distributed conflict detection</li>
                <li>Always preserve conflicting data - never silently lose changes</li>
            </ul>
        `
     },
    {
        id: 148,
        category: "Offline & Storage",
        icon: "💾",
        question: "How do you implement background data synchronization in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Background sync keeps data fresh without user intervention. This tests knowledge of platform-specific background task APIs.</p>

            <h4>iOS Background Fetch</h4>
            <pre><code>// ios/AppDelegate.m
- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Enable background fetch
  [application setMinimumBackgroundFetchInterval:
    UIApplicationBackgroundFetchIntervalMinimum];
  return YES;
}

- (void)application:(UIApplication *)application
    performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))handler {
  // Trigger JS sync
  [RNBackgroundSync performSyncWithCompletion:^(BOOL success) {
    handler(success ? UIBackgroundFetchResultNewData
                   : UIBackgroundFetchResultNoData);
  }];
}</code></pre>

            <h4>React Native Background Task</h4>
            <pre><code>import BackgroundFetch from 'react-native-background-fetch';

async function initBackgroundSync() {
  await BackgroundFetch.configure({
    minimumFetchInterval: 15, // minutes
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
  }, async (taskId) => {
    console.log('[BackgroundFetch] Task:', taskId);

    try {
      // Perform sync operations
      await syncPendingChanges();
      await fetchNewData();

      BackgroundFetch.finish(taskId);
    } catch (error) {
      console.error('Background sync failed:', error);
      BackgroundFetch.finish(taskId);
    }
  }, (taskId) => {
    // Task timeout
    BackgroundFetch.finish(taskId);
  });
}

// Headless task for Android
BackgroundFetch.registerHeadlessTask(async ({ taskId }) => {
  await syncPendingChanges();
  BackgroundFetch.finish(taskId);
});</code></pre>

            <h4>WorkManager for Android</h4>
            <pre><code>// Using react-native-workmanager
import WorkManager from 'react-native-workmanager';

// Register periodic sync
await WorkManager.enqueuePeriodicWork(
  'data-sync',
  WorkManager.ExistingPeriodicWorkPolicy.KEEP,
  {
    repeatInterval: 15, // minutes
    constraints: {
      networkType: WorkManager.NetworkType.CONNECTED,
      requiresBatteryNotLow: true,
    },
  }
);

// Worker implementation
WorkManager.setWorker('data-sync', async () => {
  const pending = await db.getPendingChanges();
  for (const change of pending) {
    await api.sync(change);
    await db.markSynced(change.id);
  }
  return WorkManager.Result.SUCCESS;
});</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>iOS limits background fetch to ~30 seconds</li>
                <li>Android WorkManager survives app restarts</li>
                <li>Use constraints to sync only on WiFi/charging</li>
            </ul>
        `
    },
];

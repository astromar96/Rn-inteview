// System Design Interview Questions
export const systemDesignQuestions = [
    {
        id: 69,
        category: "System Design",
        icon: "🏛️",
        question: "Design the architecture for a large-scale e-commerce app with offline support",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Scale:</strong> How many products in the catalog? (10K vs 1M+ impacts storage strategy)</li>
                <li><strong>User behavior:</strong> What percentage of users shop offline? (determines sync priority)</li>
                <li><strong>Sync frequency:</strong> How often does inventory change? (real-time vs periodic sync)</li>
                <li><strong>Checkout flow:</strong> Can users complete purchases offline, or just queue them?</li>
                <li><strong>Multi-device:</strong> Should cart sync across user's devices?</li>
                <li><strong>Data freshness:</strong> How stale can product prices/availability be before showing warnings?</li>
                <li><strong>Storage constraints:</strong> What's the acceptable app size increase for offline data?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Browse product catalog offline with cached data (last 1000 viewed products)</li>
                <li>Add/remove items from cart while offline with instant UI feedback</li>
                <li>View order history without network (last 50 orders)</li>
                <li>Queue purchases for sync when back online (max 10 pending orders)</li>
                <li>Real-time inventory updates when connected via WebSocket</li>
                <li>Search products with offline full-text index</li>
                <li>Wishlist management with offline support</li>
                <li>Product image caching with progressive loading</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Performance:</strong> Sync latency &lt; 5 seconds when reconnecting; UI response &lt; 100ms</li>
                <li><strong>Storage:</strong> Local storage &lt; 100MB for core catalog data; images cached separately</li>
                <li><strong>Reliability:</strong> Zero data loss on conflicts; 99.9% sync success rate</li>
                <li><strong>Battery:</strong> Background sync must use &lt; 1% battery per hour</li>
                <li><strong>Security:</strong> Encrypted local storage for user data; secure token refresh offline</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Payment processing offline (only queue orders)</li>
                <li>Real-time collaborative cart (single user per cart)</li>
                <li>Offline customer support chat</li>
                <li>AR product preview offline</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                        React Native App                         │
├─────────────────────────────────────────────────────────────────┤
│  UI Layer                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Screens   │  │  Components │  │  Navigation │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
├─────────▼────────────────▼────────────────▼─────────────────────┤
│  State Layer (Zustand + TanStack Query)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Auth Store  │  │ Cart Store  │  │ Query Cache │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
├─────────▼────────────────▼────────────────▼─────────────────────┤
│  Repository Layer                                               │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ ProductRepository   │  │   CartRepository    │              │
│  │ (local-first reads) │  │ (optimistic writes) │              │
│  └─────────┬───────────┘  └─────────┬───────────┘              │
│            │                        │                           │
├────────────▼────────────────────────▼───────────────────────────┤
│  Sync Engine                                                    │
│  ┌─────────────────────────────────────────────┐               │
│  │ Operation Queue │ Conflict Resolver │ Retry │               │
│  └─────────────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐        │
│  │WatermelonDB│ │   API    │ │  MMKV    │ │   NetInfo   │        │
│  │ (SQLite) │ │ (Axios)  │ │ (Cache)  │ │ (Connectivity)│       │
│  └──────────┘ └──────────┘ └──────────┘ └─────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Backend API   │
                    │  (REST/GraphQL) │
                    └─────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>UI Layer</td><td>Render screens, handle user input, display sync status</td><td>React Native, React Navigation</td></tr>
                <tr><td>State Layer</td><td>Manage global state, cache server data, handle optimistic updates</td><td>Zustand, TanStack Query</td></tr>
                <tr><td>Repository Layer</td><td>Abstract data access, implement local-first pattern</td><td>Custom repositories</td></tr>
                <tr><td>Sync Engine</td><td>Queue operations, resolve conflicts, retry failed syncs</td><td>Custom sync logic</td></tr>
                <tr><td>Infrastructure</td><td>Persist data, make API calls, detect connectivity</td><td>WatermelonDB, MMKV, Axios, NetInfo</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>User Action (Add to Cart)
        │
        ▼
┌───────────────────┐
│ Update Local DB   │ ◀── Instant UI feedback (&lt;100ms)
│ (WatermelonDB)    │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐     No      ┌─────────────────┐
│ Network Available?│────────────▶│ Queue Operation │
└────────┬──────────┘             │ (persist queue) │
         │ Yes                    └────────┬────────┘
         ▼                                 │
┌───────────────────┐                      │
│ Sync to Server    │                      │
└────────┬──────────┘                      │
         │                                 │
         ▼                                 │
┌───────────────────┐                      │
│ Handle Response   │                      │
│ - Success: clear  │◀─────────────────────┘
│ - Conflict: merge │   (when online)
│ - Error: retry    │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Update UI State   │
│ (mark as synced)  │
└───────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>Local-first architecture:</strong> All reads hit local DB first for instant response. Background sync keeps data fresh. Trade-off: potential stale data vs guaranteed responsiveness.</li>
                <li><strong>Optimistic updates:</strong> Cart changes reflect immediately in UI before server confirmation. Requires rollback handling on conflicts.</li>
                <li><strong>Operation queue pattern:</strong> All write operations are queued and persisted. Survives app kills and network failures.</li>
                <li><strong>CQRS-lite:</strong> Separate read path (local DB queries) from write path (sync queue) for simplicity and performance.</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// Product entity - cached from server
interface Product {
    id: string;                    // UUID from server
    name: string;                  // Display name
    description: string;           // Full product description
    price: number;                 // Current price in cents
    originalPrice?: number;        // Original price if on sale
    inventory: number;             // Available stock count
    categoryId: string;            // FK to Category
    images: string[];              // Array of image URLs
    thumbnailUrl: string;          // Primary thumbnail
    attributes: Record&lt;string, string&gt;; // Size, color, etc.
    rating: number;                // Average rating 0-5
    reviewCount: number;           // Number of reviews
    syncedAt: number;              // Last sync timestamp
    isAvailable: boolean;          // Currently purchasable
}

// Cart item - local with sync status
interface CartItem {
    id: string;                    // Local UUID
    productId: string;             // FK to Product
    quantity: number;              // Item quantity
    selectedAttributes: Record&lt;string, string&gt;; // Selected size, color
    priceAtAdd: number;            // Price when added (for change detection)
    syncStatus: 'synced' | 'pending' | 'failed' | 'conflict';
    localCreatedAt: number;        // Local creation timestamp
    localUpdatedAt: number;        // Local update timestamp
    serverUpdatedAt?: number;      // Server timestamp (after sync)
    errorMessage?: string;         // Sync error details
}

// Sync operation - persisted queue
interface SyncOperation {
    id: string;                    // UUID
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    entity: 'cart' | 'order' | 'wishlist' | 'user_prefs';
    entityId: string;              // ID of affected entity
    payload: unknown;              // Operation data
    timestamp: number;             // When queued
    retryCount: number;            // Current retry attempt
    maxRetries: number;            // Max attempts (default 3)
    priority: 'high' | 'normal' | 'low'; // Sync priority
    deviceId: string;              // For multi-device conflict resolution
}

// Order - append-only, server-authoritative
interface Order {
    id: string;                    // Server-assigned ID
    items: OrderItem[];            // Snapshot of cart at purchase
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    totalAmount: number;           // Total in cents
    shippingAddress: Address;      // Delivery address
    createdAt: number;             // Order creation time
    updatedAt: number;             // Last status update
    syncedAt: number;              // Last local sync
}

// Category - for offline navigation
interface Category {
    id: string;
    name: string;
    parentId?: string;             // For nested categories
    imageUrl: string;
    productCount: number;
    sortOrder: number;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌──────────────┐       ┌──────────────┐
│   Category   │──1:N──│   Product    │
└──────────────┘       └──────┬───────┘
                              │
                             1:N
                              │
                       ┌──────▼───────┐       ┌──────────────┐
                       │   CartItem   │──N:1──│     Cart     │
                       └──────────────┘       └──────────────┘
                              │
                              │ (snapshot)
                              ▼
                       ┌──────────────┐
                       │  OrderItem   │──N:1──│    Order     │
                       └──────────────┘       └──────────────┘

SyncOperation references any entity by (entity, entityId)</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Products (catalog)</td><td>WatermelonDB (SQLite)</td><td>Complex queries, lazy loading, large dataset</td></tr>
                <tr><td>Cart items</td><td>WatermelonDB</td><td>Relational queries with products, sync metadata</td></tr>
                <tr><td>Sync queue</td><td>WatermelonDB</td><td>Persistent, survives app kills, ordered processing</td></tr>
                <tr><td>User session</td><td>MMKV (encrypted)</td><td>Fast access, secure storage for tokens</td></tr>
                <tr><td>App settings</td><td>MMKV</td><td>Simple key-value, sync access needed</td></tr>
                <tr><td>Image cache</td><td>expo-image disk cache</td><td>Automatic LRU eviction, memory efficient</td></tr>
                <tr><td>Search index</td><td>SQLite FTS5</td><td>Full-text search on product names/descriptions</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <ul>
                <li><strong>Server State (TanStack Query):</strong> Products, categories, orders, inventory - cached with stale-while-revalidate</li>
                <li><strong>Client State (Zustand):</strong> Auth state, cart totals, sync status indicators, UI preferences</li>
                <li><strong>Local State (useState):</strong> Form inputs, modal visibility, scroll position, selected filters</li>
                <li><strong>Persisted State (MMKV):</strong> Auth tokens, user preferences, recently viewed products</li>
            </ul>

            <h4>I - Interface Definition (API)</h4>

            <h5>Repository APIs</h5>
            <pre><code>/**
 * ProductRepository - handles all product data access
 * Implements local-first pattern with background sync
 */
interface IProductRepository {
    /**
     * Get products by category with offline support
     * @param categoryId - Category to filter by
     * @param options - Pagination and sort options
     * @returns Products from local DB, triggers background sync
     */
    getProducts(
        categoryId: string,
        options?: { limit?: number; offset?: number; sortBy?: 'price' | 'rating' | 'name' }
    ): Promise&lt;Product[]&gt;;

    /**
     * Search products with full-text search
     * @param query - Search term
     * @returns Matching products from local FTS index
     */
    searchProducts(query: string): Promise&lt;Product[]&gt;;

    /**
     * Get single product with freshness check
     * @param productId - Product ID
     * @param maxAge - Max acceptable age in ms (default 5min)
     * @returns Product data, null if not found
     */
    getProduct(productId: string, maxAge?: number): Promise&lt;Product | null&gt;;

    /**
     * Force sync products from server
     * @param categoryId - Optional category filter
     * @returns Sync result with stats
     */
    syncProducts(categoryId?: string): Promise&lt;SyncResult&gt;;
}

/**
 * CartRepository - manages cart with optimistic updates
 */
interface ICartRepository {
    /**
     * Add item to cart (optimistic)
     * @returns Created cart item with pending sync status
     */
    addItem(productId: string, quantity: number, attributes?: Record&lt;string, string&gt;): Promise&lt;CartItem&gt;;

    /**
     * Update item quantity (optimistic)
     * @returns Updated item, throws if item not found
     */
    updateQuantity(itemId: string, quantity: number): Promise&lt;CartItem&gt;;

    /**
     * Remove item from cart (optimistic)
     */
    removeItem(itemId: string): Promise&lt;void&gt;;

    /**
     * Get current cart with sync status
     * @returns Cart items with sync status indicators
     */
    getCart(): Promise&lt;CartItem[]&gt;;

    /**
     * Get cart total with price validation
     * @returns Total and any price change warnings
     */
    getCartTotal(): Promise&lt;{ total: number; warnings: PriceWarning[] }&gt;;
}</code></pre>

            <h5>Hook Interfaces</h5>
            <pre><code>// Product hooks
function useProducts(categoryId: string): {
    data: Product[];
    isLoading: boolean;
    isOffline: boolean;
    lastSyncedAt: number | null;
    error: Error | null;
    refetch: () =&gt; Promise&lt;void&gt;;
};

function useProduct(productId: string): {
    data: Product | null;
    isLoading: boolean;
    isStale: boolean;  // Data older than threshold
    error: Error | null;
};

// Cart hooks
function useCart(): {
    items: CartItem[];
    itemCount: number;
    total: number;
    pendingCount: number;  // Items not yet synced
    failedCount: number;   // Items that failed to sync
    isLoading: boolean;
    actions: {
        addItem: (productId: string, qty: number) =&gt; Promise&lt;void&gt;;
        updateQuantity: (itemId: string, qty: number) =&gt; Promise&lt;void&gt;;
        removeItem: (itemId: string) =&gt; Promise&lt;void&gt;;
        retryFailed: () =&gt; Promise&lt;void&gt;;
        clearCart: () =&gt; Promise&lt;void&gt;;
    };
};

// Sync status hook
function useSyncStatus(): {
    isOnline: boolean;
    isSyncing: boolean;
    pendingOperations: number;
    lastSyncAt: number | null;
    syncError: Error | null;
    forceSync: () =&gt; Promise&lt;void&gt;;
};</code></pre>

            <h5>Sync Engine Events</h5>
            <pre><code>// Event types emitted by sync engine
type SyncEventMap = {
    'sync:started': { operationCount: number };
    'sync:progress': { completed: number; total: number; currentOp: SyncOperation };
    'sync:completed': { successful: number; failed: number; duration: number };
    'sync:error': { operation: SyncOperation; error: Error };
    'sync:conflict': { operation: SyncOperation; resolution: 'local' | 'remote' | 'merge' };
    'connectivity:changed': { isOnline: boolean };
};

// Subscribe to sync events
interface ISyncEngine {
    on&lt;K extends keyof SyncEventMap&gt;(event: K, handler: (data: SyncEventMap[K]) =&gt; void): () =&gt; void;
    processQueue(): Promise&lt;SyncResult&gt;;
    getQueueSize(): number;
    clearQueue(): Promise&lt;void&gt;;
}</code></pre>

            <h5>Native Bridge APIs</h5>
            <pre><code>// iOS - BackgroundSync.swift
@objc(BackgroundSync)
class BackgroundSync: NSObject {

    /**
     * Schedule background sync task
     * @param intervalMinutes - Minimum interval between syncs
     */
    @objc func scheduleSync(_ intervalMinutes: Int,
                            resolve: @escaping RCTPromiseResolveBlock,
                            reject: @escaping RCTPromiseRejectBlock) {
        let request = BGAppRefreshTaskRequest(identifier: "com.app.sync")
        request.earliestBeginDate = Date(timeIntervalSinceNow: Double(intervalMinutes * 60))
        do {
            try BGTaskScheduler.shared.submit(request)
            resolve(true)
        } catch {
            reject("SCHEDULE_ERROR", error.localizedDescription, error)
        }
    }

    /**
     * Check if background sync is permitted
     */
    @objc func canScheduleSync(_ resolve: @escaping RCTPromiseResolveBlock,
                                reject: @escaping RCTPromiseRejectBlock) {
        resolve(BGTaskScheduler.shared.pendingTaskRequests.count &lt; 10)
    }
}

// Android - BackgroundSyncModule.kt
class BackgroundSyncModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    /**
     * Schedule periodic background sync with WorkManager
     */
    @ReactMethod
    fun scheduleSync(intervalMinutes: Int, promise: Promise) {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .setRequiresBatteryNotLow(true)
            .build()

        val syncRequest = PeriodicWorkRequestBuilder&lt;SyncWorker&gt;(
            intervalMinutes.toLong(), TimeUnit.MINUTES
        ).setConstraints(constraints).build()

        WorkManager.getInstance(reactApplicationContext)
            .enqueueUniquePeriodicWork("ecommerce_sync", KEEP, syncRequest)
        promise.resolve(true)
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Lazy Loading with WatermelonDB:</strong>
                    <ul>
                        <li>Problem: Loading 10K+ products causes memory pressure and slow startup</li>
                        <li>Solution: WatermelonDB loads records on-demand, only hydrating what's visible</li>
                        <li>Impact: Startup time reduced from 3s to 400ms; memory usage down 60%</li>
                    </ul>
                </li>
                <li><strong>Incremental Sync:</strong>
                    <ul>
                        <li>Problem: Full catalog sync takes 30+ seconds on slow connections</li>
                        <li>Solution: Delta sync using updatedAt timestamp; only fetch changed products</li>
                        <li>Impact: Average sync time reduced to 2-3 seconds</li>
                    </ul>
                </li>
                <li><strong>Image Preloading:</strong>
                    <ul>
                        <li>Problem: Images flash/pop in as user scrolls product list</li>
                        <li>Solution: Preload next 10 images during idle time; use blurhash placeholders</li>
                        <li>Impact: Perceived instant image loading; smooth scrolling at 60fps</li>
                    </ul>
                </li>
                <li><strong>Query Batching:</strong>
                    <ul>
                        <li>Problem: Multiple cart operations create multiple sync requests</li>
                        <li>Solution: Debounce queue processing; batch operations within 500ms window</li>
                        <li>Impact: Network requests reduced by 70% during active shopping</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background Sync</td><td>BGTaskScheduler (15min minimum)</td><td>WorkManager (flexible intervals)</td></tr>
                <tr><td>Storage Encryption</td><td>Keychain Services</td><td>EncryptedSharedPreferences</td></tr>
                <tr><td>Network Detection</td><td>NWPathMonitor</td><td>ConnectivityManager</td></tr>
                <tr><td>Battery Optimization</td><td>Low Power Mode detection</td><td>Doze mode handling</td></tr>
                <tr><td>Push for Sync</td><td>Silent push notifications</td><td>FCM data messages</td></tr>
            </table>

            <h5>Conflict Resolution Strategy</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────┐
│                  CONFLICT RESOLUTION STRATEGY                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CART ITEMS: Last-Write-Wins with Merge                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ Local: qty=2 │ +  │ Server: qty=3│ =  │ Result: qty=3│  │
│  │ ts: 1000     │    │ ts: 1001     │    │ (server wins)│  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
│  INVENTORY: Server Authority (always)                        │
│  • Local changes are suggestions only                        │
│  • Server inventory is source of truth                       │
│  • Show "limited stock" warning on conflicts                 │
│                                                              │
│  ORDERS: Append-Only Log                                     │
│  • Orders are immutable once created                         │
│  • Status changes come from server only                      │
│  • Local queue holds pending orders                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Cart item deleted on server while offline:</strong> Show "item unavailable" toast on sync, auto-remove from cart, offer similar products</li>
                <li><strong>Price changed during offline session:</strong> Display price difference modal before checkout with old vs new price comparison</li>
                <li><strong>Inventory depleted:</strong> Reduce quantity to available stock with explanation; if zero, move to wishlist</li>
                <li><strong>Sync queue grows too large (&gt;100 ops):</strong> Compress by merging sequential updates; drop superseded operations</li>
                <li><strong>App killed during sync:</strong> Mark in-flight operation as "unknown"; verify on next launch before retrying</li>
                <li><strong>Multiple devices:</strong> Use device ID + user ID compound key; last-write-wins across devices</li>
                <li><strong>Token expired while offline:</strong> Queue operations continue; refresh token on reconnect before processing</li>
                <li><strong>Partial sync failure:</strong> Commit successful operations; retry failed ones with exponential backoff</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Local DB</td><td>WatermelonDB</td><td>Realm</td><td>Better lazy loading, smaller bundle size, sync primitives built-in</td></tr>
                <tr><td>Conflict Strategy</td><td>Last-Write-Wins</td><td>CRDT</td><td>Simpler to implement, sufficient for e-commerce (not collaborative)</td></tr>
                <tr><td>Sync Trigger</td><td>Connectivity change + periodic</td><td>Server push only</td><td>Works without persistent connection; battery efficient</td></tr>
                <tr><td>Storage Format</td><td>SQLite + MMKV</td><td>SQLite only</td><td>MMKV is 10x faster for frequent small reads (auth, settings)</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong> Repository methods, conflict resolver logic, sync queue operations</li>
                <li><strong>Integration Tests:</strong> Full offline → online → sync cycle with mock API</li>
                <li><strong>E2E Tests:</strong> Add to cart offline → kill app → reopen → verify sync completes</li>
                <li><strong>Network Simulation:</strong> Use iOS Network Link Conditioner / Android emulator throttling</li>
                <li><strong>Conflict Scenarios:</strong> Scripted tests for price changes, inventory depletion, concurrent edits</li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why WatermelonDB over Realm?</strong><br/>A: Lazy loading prevents memory issues with large catalogs (50K+ products). Realm loads entire objects into memory. WatermelonDB also has built-in sync primitives and smaller bundle size (~200KB vs ~4MB).</li>
                <li><strong>Q: How would you handle CRDT if this were collaborative?</strong><br/>A: For shopping carts, LWW suffices since one user owns the cart. For collaborative wishlists, I'd use an add-wins set CRDT where adds always succeed and removals require confirmation.</li>
                <li><strong>Q: What about optimistic UI rollback?</strong><br/>A: Store previous state in sync operation metadata. On conflict, revert UI to previous state, show error toast, and let user retry. Use React Query's onMutate/onError pattern.</li>
                <li><strong>Q: How do you test offline scenarios?</strong><br/>A: Combination of Network Link Conditioner (iOS) and Android emulator throttling for manual testing. For automated tests, mock NetInfo to simulate connectivity changes.</li>
                <li><strong>Q: What if sync queue becomes a bottleneck?</strong><br/>A: Implement operation compaction (merge sequential quantity updates), priority queuing (checkout ops first), and parallel sync for independent entities.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Local Database</td><td>WatermelonDB</td><td>SQLite with lazy loading, sync primitives, great DX</td></tr>
                <tr><td>Fast KV Storage</td><td>react-native-mmkv</td><td>10x faster than AsyncStorage, synchronous API, encryption</td></tr>
                <tr><td>Network State</td><td>@react-native-community/netinfo</td><td>Reliable connectivity detection, connection type info</td></tr>
                <tr><td>Server State</td><td>TanStack Query v5</td><td>Caching, background refetch, optimistic updates, offline support</td></tr>
                <tr><td>Global State</td><td>Zustand</td><td>Lightweight, persist middleware, selector subscriptions</td></tr>
                <tr><td>Image Caching</td><td>expo-image</td><td>Disk caching, blurhash placeholders, memory efficient</td></tr>
                <tr><td>Background Tasks</td><td>react-native-background-fetch</td><td>Cross-platform background sync scheduling</td></tr>
            </table>
        `
     },
    {
        id: 70,
        category: "System Design",
        icon: "🏛️",
        question: "How would you structure state management for an app with complex data flows across 50+ screens?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>State sharing patterns:</strong> How many screens share the same data? (auth across all vs order details on 2-3 screens)</li>
                <li><strong>Real-time needs:</strong> Which data needs live updates? (chat messages, notifications, stock prices)</li>
                <li><strong>Persistence requirements:</strong> What must survive app restarts? (auth, preferences, draft forms)</li>
                <li><strong>Offline support:</strong> Should the app work offline? (affects caching strategy significantly)</li>
                <li><strong>Team structure:</strong> How many teams? Do they need isolated state domains?</li>
                <li><strong>Performance constraints:</strong> Any screens with special requirements? (60fps lists, animations)</li>
                <li><strong>Migration path:</strong> Is this greenfield or migrating from existing state solution?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Global state shared across all 50+ screens (auth, theme, settings, feature flags)</li>
                <li>Server data with automatic caching, background refetching, and optimistic updates</li>
                <li>Form state with cross-field validation across multi-step wizards (5-10 steps)</li>
                <li>Complex UI flows (checkout, onboarding, booking) with explicit state transitions</li>
                <li>Real-time data subscriptions (notifications, chat, live prices) with automatic reconnection</li>
                <li>Navigation-aware state (reset on logout, preserve on background)</li>
                <li>Cross-screen data dependencies (order affects inventory, cart affects checkout)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Performance:</strong> Only components using changed state re-render; max 16ms render time</li>
                <li><strong>Memory:</strong> No leaks from subscriptions; cache eviction after 30 minutes unused</li>
                <li><strong>DX:</strong> Easy debugging with Redux DevTools compatible logging; predictable updates</li>
                <li><strong>Persistence:</strong> Critical state survives restarts; cold start with cached data &lt; 500ms</li>
                <li><strong>Type safety:</strong> Full TypeScript coverage with inference; no any types in state</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Server-side state management (focus on client)</li>
                <li>Cross-app state sharing (single app boundary)</li>
                <li>Undo/redo functionality (unless specifically required)</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     STATE ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           LAYER 1: GLOBAL STATE (Zustand)                 │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │  │
│  │  │ Auth Store  │ │Theme Store  │ │Settings Store│          │  │
│  │  │ user, token │ │ mode, colors│ │ prefs, locale│          │  │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘          │  │
│  │         │    Persisted to MMKV (encrypted)                │  │
│  └─────────┼───────────────────────┼──────────────────────────┘  │
│            │                       │                             │
│  ┌─────────▼───────────────────────▼──────────────────────────┐  │
│  │           LAYER 2: SERVER STATE (TanStack Query)          │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │  │
│  │  │  Products   │ │   Orders    │ │    Users    │          │  │
│  │  │ useQuery()  │ │useMutation()│ │useInfinite()│          │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘          │  │
│  │         │  Auto cache, refetch, optimistic updates         │  │
│  └─────────┼──────────────────────────────────────────────────┘  │
│            │                                                     │
│  ┌─────────▼──────────────────────────────────────────────────┐  │
│  │           LAYER 3: LOCAL STATE (useState/useReducer)       │  │
│  │  • Form inputs    • Modal visibility    • Scroll position  │  │
│  │  • Tab selection  • Expanded sections   • Input focus      │  │
│  └─────────┬──────────────────────────────────────────────────┘  │
│            │                                                     │
│  ┌─────────▼──────────────────────────────────────────────────┐  │
│  │           LAYER 4: FLOW STATE (XState Machines)            │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │  │
│  │  │  Checkout   │ │ Onboarding  │ │   Booking   │          │  │
│  │  │   Machine   │ │   Machine   │ │   Machine   │          │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘          │  │
│  │         │  Explicit states, transitions, side effects      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Layer</th><th>Responsibility</th><th>Technology</th><th>Persistence</th></tr>
                <tr><td>Global State</td><td>App-wide singleton data (auth, theme, settings)</td><td>Zustand</td><td>MMKV (encrypted)</td></tr>
                <tr><td>Server State</td><td>Remote data with caching, mutations, real-time</td><td>TanStack Query</td><td>Memory + optional persist</td></tr>
                <tr><td>Local State</td><td>Component-specific UI state, form inputs</td><td>useState/useReducer</td><td>None (ephemeral)</td></tr>
                <tr><td>Flow State</td><td>Multi-step processes with explicit transitions</td><td>XState</td><td>Optional (for resume)</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>User Interaction
        │
        ▼
┌───────────────────────────────────┐
│ Determine State Category          │
│ Is it global? server? local? flow?│
└───────────────────┬───────────────┘
                    │
    ┌───────────────┼───────────────┬───────────────┐
    ▼               ▼               ▼               ▼
┌───────┐     ┌───────────┐   ┌─────────┐    ┌──────────┐
│Zustand│     │TanStack Q │   │useState │    │ XState   │
│ Store │     │  Cache    │   │  Local  │    │ Machine  │
└───┬───┘     └─────┬─────┘   └────┬────┘    └─────┬────┘
    │               │              │               │
    ▼               ▼              ▼               ▼
┌───────┐     ┌───────────┐   ┌─────────┐    ┌──────────┐
│Selector│    │ Query Key │   │Component│    │  State   │
│ Hooks │     │Subscribers│   │  State  │    │ Matches  │
└───┬───┘     └─────┬─────┘   └────┬────┘    └─────┬────┘
    │               │              │               │
    └───────────────┴──────────────┴───────────────┘
                    │
                    ▼
            ┌───────────────┐
            │  Component    │
            │  Re-render    │
            └───────────────┘

State Category Decision Tree:
├── Does it come from the server? → TanStack Query
├── Is it shared across unrelated screens? → Zustand
├── Is it a multi-step flow with rules? → XState
└── Otherwise → Local useState/useReducer</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>4-layer separation:</strong> Each layer has clear ownership. Prevents "where does this state go?" debates. Trade-off: more concepts to learn upfront.</li>
                <li><strong>Zustand over Redux:</strong> 10x less boilerplate, no Provider wrappers, built-in persistence middleware, better TypeScript inference.</li>
                <li><strong>TanStack Query for server state:</strong> Automatic cache invalidation, background refetch, optimistic updates. Eliminates manual cache management.</li>
                <li><strong>XState for flows:</strong> Prevents impossible states (can't be in 'payment' without 'shipping'). Visual debugging with XState Inspector.</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// ============ GLOBAL STATE TYPES ============

// Auth slice - persisted, encrypted
interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    tokenExpiresAt: number | null;
    isAuthenticated: boolean;        // Derived from token presence
    isInitialized: boolean;          // Hydration complete
}

interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    role: 'user' | 'admin' | 'guest';
    preferences: UserPreferences;
}

// Theme slice - persisted
interface ThemeState {
    mode: 'light' | 'dark' | 'system';
    resolvedMode: 'light' | 'dark';  // Computed from system preference
    accentColor: string;
    fontSize: 'small' | 'medium' | 'large';
}

// Settings slice - persisted
interface SettingsState {
    locale: string;                  // 'en-US', 'es-ES', etc.
    notificationsEnabled: boolean;
    biometricsEnabled: boolean;
    hapticFeedback: boolean;
    analyticsOptIn: boolean;
}

// Feature flags slice - server-synced
interface FeatureFlagsState {
    flags: Record&lt;string, boolean&gt;;
    lastFetchedAt: number;
    isStale: boolean;
}

// ============ SERVER STATE TYPES ============

// Generic server state wrapper (TanStack Query provides this)
interface ServerState&lt;T&gt; {
    data: T | undefined;
    isLoading: boolean;
    isFetching: boolean;             // Background refetch
    isError: boolean;
    error: Error | null;
    isStale: boolean;
    dataUpdatedAt: number;
}

// ============ FLOW STATE TYPES ============

// Checkout machine context
interface CheckoutContext {
    cartId: string;
    items: CartItem[];
    subtotal: number;
    shipping: ShippingInfo | null;
    payment: PaymentMethod | null;
    promoCode: string | null;
    discount: number;
    total: number;
    error: CheckoutError | null;
    orderId: string | null;
}

// Checkout machine states (exhaustive)
type CheckoutState =
    | { value: 'idle'; context: CheckoutContext }
    | { value: 'loadingCart'; context: CheckoutContext }
    | { value: 'cart'; context: CheckoutContext }
    | { value: 'shipping'; context: CheckoutContext }
    | { value: 'payment'; context: CheckoutContext }
    | { value: 'review'; context: CheckoutContext }
    | { value: 'processing'; context: CheckoutContext }
    | { value: 'success'; context: CheckoutContext &amp; { orderId: string } }
    | { value: 'error'; context: CheckoutContext &amp; { error: CheckoutError } };</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌──────────────────────────────────────────────────────────────┐
│                    STATE RELATIONSHIPS                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  AuthState ──────────────────┐                               │
│     │                        │                               │
│     │ gates access to        │ determines                    │
│     ▼                        ▼                               │
│  ServerState queries     UserPreferences                     │
│     │                        │                               │
│     │ populates              │ affects                       │
│     ▼                        ▼                               │
│  TanStack Query Cache    ThemeState                         │
│     │                                                        │
│     │ feeds data to                                          │
│     ▼                                                        │
│  XState Machine Contexts                                     │
│     │                                                        │
│     │ drives                                                 │
│     ▼                                                        │
│  Component Props → UI                                        │
│                                                               │
└──────────────────────────────────────────────────────────────┘

Cross-cutting concerns:
• Auth token used by all API calls (Axios interceptor)
• Theme affects all components (context provider)
• Feature flags gate features at route level</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>State Type</th><th>Storage</th><th>Encryption</th><th>Rationale</th></tr>
                <tr><td>Auth tokens</td><td>MMKV</td><td>Yes (AES-256)</td><td>Sensitive, needs sync access for interceptors</td></tr>
                <tr><td>User profile</td><td>MMKV</td><td>No</td><td>Fast hydration, non-sensitive display data</td></tr>
                <tr><td>Theme/Settings</td><td>MMKV</td><td>No</td><td>Sync access for immediate UI application</td></tr>
                <tr><td>Query cache</td><td>Memory + AsyncStorage</td><td>No</td><td>Large dataset, async OK, auto-eviction</td></tr>
                <tr><td>Draft forms</td><td>MMKV</td><td>No</td><td>Restore on crash, small data</td></tr>
                <tr><td>Machine state</td><td>Memory (optional MMKV)</td><td>No</td><td>Resume interrupted flows if needed</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <ul>
                <li><strong>Global State (Zustand):</strong> AuthState, ThemeState, SettingsState, FeatureFlagsState, AppConfigState</li>
                <li><strong>Server State (TanStack Query):</strong> Products, Orders, Users, Categories, Reviews, Notifications</li>
                <li><strong>Flow State (XState):</strong> CheckoutMachine, OnboardingMachine, BookingMachine, AuthFlowMachine</li>
                <li><strong>Local State (useState):</strong> Form inputs, modal visibility, scroll position, tab selection, expanded sections</li>
            </ul>

            <h4>I - Interface Definition (API)</h4>

            <h5>Zustand Store APIs</h5>
            <pre><code>// Auth store interface
interface IAuthStore {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;

    // Actions
    login: (credentials: LoginCredentials) =&gt; Promise&lt;void&gt;;
    loginWithBiometrics: () =&gt; Promise&lt;void&gt;;
    logout: () =&gt; void;
    refreshToken: () =&gt; Promise&lt;boolean&gt;;
    updateUser: (updates: Partial&lt;User&gt;) =&gt; void;

    // Hydration
    hydrate: () =&gt; Promise&lt;void&gt;;
}

// Selector hooks for minimal re-renders
const useAuth = (): IAuthStore =&gt; useAuthStore();
const useUser = (): User | null =&gt; useAuthStore((s) =&gt; s.user);
const useIsAuthenticated = (): boolean =&gt; useAuthStore((s) =&gt; s.isAuthenticated);

// Theme store interface
interface IThemeStore {
    mode: 'light' | 'dark' | 'system';
    resolvedMode: 'light' | 'dark';
    accentColor: string;

    setMode: (mode: IThemeStore['mode']) =&gt; void;
    setAccentColor: (color: string) =&gt; void;
    toggleMode: () =&gt; void;
}</code></pre>

            <h5>TanStack Query Hook Interfaces</h5>
            <pre><code>// Query hooks with full typing
function useProducts(categoryId: string): {
    data: Product[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () =&gt; Promise&lt;QueryObserverResult&lt;Product[]&gt;&gt;;
};

function useProduct(productId: string): {
    data: Product | undefined;
    isLoading: boolean;
    isError: boolean;
};

function useInfiniteProducts(categoryId: string): {
    data: InfiniteData&lt;ProductPage&gt; | undefined;
    fetchNextPage: () =&gt; void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
};

// Mutation hooks
function useAddToCart(): {
    mutate: (item: AddToCartInput) =&gt; void;
    mutateAsync: (item: AddToCartInput) =&gt; Promise&lt;CartItem&gt;;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    reset: () =&gt; void;
};

function useUpdateCart(): {
    mutate: (update: UpdateCartInput) =&gt; void;
    isLoading: boolean;
    variables: UpdateCartInput | undefined;  // For optimistic UI
};</code></pre>

            <h5>XState Machine Interface</h5>
            <pre><code>// Checkout machine events (exhaustive union)
type CheckoutEvent =
    | { type: 'LOAD_CART' }
    | { type: 'PROCEED' }
    | { type: 'BACK' }
    | { type: 'SET_SHIPPING'; data: ShippingInfo }
    | { type: 'SET_PAYMENT'; data: PaymentMethod }
    | { type: 'APPLY_PROMO'; code: string }
    | { type: 'REMOVE_PROMO' }
    | { type: 'SUBMIT_ORDER' }
    | { type: 'RETRY' }
    | { type: 'CANCEL' };

// Hook interface for using the machine
function useCheckoutMachine(): {
    state: CheckoutState;
    context: CheckoutContext;
    send: (event: CheckoutEvent) =&gt; void;

    // Convenience matchers
    isCart: boolean;
    isShipping: boolean;
    isPayment: boolean;
    isProcessing: boolean;
    isSuccess: boolean;
    isError: boolean;

    // Computed values
    canProceed: boolean;
    canGoBack: boolean;
    progress: number;  // 0-100
};</code></pre>

            <h5>Event Bus for Cross-Store Communication</h5>
            <pre><code>// Event types for decoupled communication
type AppEventMap = {
    'auth:login': { userId: string };
    'auth:logout': { reason: 'user' | 'expired' | 'revoked' };
    'cart:updated': { itemCount: number };
    'order:placed': { orderId: string };
    'notification:received': { id: string; type: string };
    'connectivity:changed': { isOnline: boolean };
};

// Event bus interface
interface IEventBus {
    emit&lt;K extends keyof AppEventMap&gt;(event: K, data: AppEventMap[K]): void;
    on&lt;K extends keyof AppEventMap&gt;(event: K, handler: (data: AppEventMap[K]) =&gt; void): () =&gt; void;
    once&lt;K extends keyof AppEventMap&gt;(event: K, handler: (data: AppEventMap[K]) =&gt; void): void;
}

// Usage example: clear cache on logout
eventBus.on('auth:logout', () =&gt; {
    queryClient.clear();
    checkoutMachine.send('CANCEL');
});</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Selector-based subscriptions:</strong>
                    <ul>
                        <li>Problem: Components re-render when any store property changes</li>
                        <li>Solution: Use Zustand selectors to subscribe only to needed slices</li>
                        <li>Impact: 60-80% reduction in unnecessary re-renders</li>
                    </ul>
                    <pre><code>// Bad: subscribes to entire store
const { user, token, theme } = useAppStore();

// Good: subscribes only to user
const user = useAppStore((s) =&gt; s.user);
const token = useAppStore((s) =&gt; s.token);</code></pre>
                </li>
                <li><strong>Query key optimization:</strong>
                    <ul>
                        <li>Problem: Over-fetching when params change frequently</li>
                        <li>Solution: Stable query keys, debounced search queries</li>
                        <li>Impact: 50% reduction in API calls for search features</li>
                    </ul>
                </li>
                <li><strong>Stale-while-revalidate:</strong>
                    <ul>
                        <li>Problem: Loading spinners on every navigation</li>
                        <li>Solution: Show cached data immediately, refetch in background</li>
                        <li>Impact: Instant screen transitions for returning users</li>
                    </ul>
                </li>
                <li><strong>Immer for mutations:</strong>
                    <ul>
                        <li>Problem: Deep cloning objects for immutable updates is expensive</li>
                        <li>Solution: Immer middleware provides efficient structural sharing</li>
                        <li>Impact: 3x faster updates for nested state</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Storage encryption</td><td>Keychain (hardware)</td><td>Android Keystore</td></tr>
                <tr><td>Background state</td><td>Preserved in memory longer</td><td>More aggressive killing</td></tr>
                <tr><td>Biometric auth</td><td>Face ID / Touch ID</td><td>Fingerprint / Face Unlock</td></tr>
                <tr><td>Deep link state</td><td>Universal Links restore state</td><td>App Links may cold start</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Stale closures:</strong> Use refs or useCallback with proper deps; Zustand getState() for latest value in async</li>
                <li><strong>Memory leaks:</strong> Clean up subscriptions in useEffect return; TanStack Query gcTime handles cache eviction</li>
                <li><strong>Circular dependencies:</strong> Keep stores independent; use event bus for cross-store communication</li>
                <li><strong>Hydration race:</strong> Show skeleton until isInitialized=true; batch hydration calls</li>
                <li><strong>Token refresh race:</strong> Queue requests during refresh; retry with new token</li>
                <li><strong>Machine state loss:</strong> Optionally persist machine state for long flows; reset on navigation away</li>
                <li><strong>Optimistic rollback:</strong> Store previous state in mutation context; revert on error</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Global state</td><td>Zustand</td><td>Redux Toolkit</td><td>90% less boilerplate, no providers, better TS inference</td></tr>
                <tr><td>Server state</td><td>TanStack Query</td><td>SWR, RTK Query</td><td>Best caching, optimistic updates, infinite queries support</td></tr>
                <tr><td>Flow state</td><td>XState</td><td>useReducer</td><td>Visual debugging, impossible states prevention, actor model</td></tr>
                <tr><td>Persistence</td><td>MMKV</td><td>AsyncStorage</td><td>10x faster, sync API, encryption built-in</td></tr>
                <tr><td>Fine-grained</td><td>Zustand selectors</td><td>Jotai atoms</td><td>Simpler mental model, Jotai for special cases only</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong> Zustand stores in isolation (create fresh store per test), XState machine transitions</li>
                <li><strong>Integration Tests:</strong> Query hooks with MSW for API mocking, machine with real async services</li>
                <li><strong>E2E Tests:</strong> Full flows (login → browse → checkout), state persistence across app restarts</li>
                <li><strong>Performance Tests:</strong> why-did-you-render to catch unnecessary re-renders, React Profiler for render timing</li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why Zustand over Redux?</strong><br/>A: 90% less boilerplate (no actions, reducers, selectors separately). No Provider wrappers needed. Built-in persistence middleware. Better TypeScript inference without manual typing. For 50+ screens, this compounds to significant DX improvement.</li>
                <li><strong>Q: When would you use Context instead?</strong><br/>A: Only for truly static data that never changes (theme provider configuration, i18n instance). Context causes all consumers to re-render on any change - fine for static data, terrible for frequently updating state.</li>
                <li><strong>Q: How do you handle state normalization?</strong><br/>A: TanStack Query handles server data normalization automatically via query keys. For complex client state with relationships, I'd consider a normalized structure with IDs and lookup maps, but only if actually needed.</li>
                <li><strong>Q: What about Redux DevTools compatibility?</strong><br/>A: Zustand has built-in devtools middleware that works with Redux DevTools. XState has its own Inspector. TanStack Query has React Query Devtools. Full debugging coverage.</li>
                <li><strong>Q: How do you prevent prop drilling with 50+ screens?</strong><br/>A: Direct store access via hooks at any level. No prop drilling needed. Components subscribe directly to what they need. This also means no unnecessary intermediate re-renders.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Global State</td><td>Zustand v4+</td><td>Minimal boilerplate, selector subscriptions, persist middleware</td></tr>
                <tr><td>Server State</td><td>TanStack Query v5</td><td>Caching, deduplication, optimistic updates, infinite queries</td></tr>
                <tr><td>Complex Flows</td><td>XState v5</td><td>Explicit states, visual debugging, TypeScript-first</td></tr>
                <tr><td>Form State</td><td>React Hook Form v7</td><td>Minimal re-renders, validation, uncontrolled inputs</td></tr>
                <tr><td>Persistence</td><td>react-native-mmkv</td><td>Synchronous, 10x faster than AsyncStorage, encryption</td></tr>
                <tr><td>Atomic State</td><td>Jotai</td><td>For fine-grained reactivity when Zustand selectors aren't enough</td></tr>
                <tr><td>DevTools</td><td>Flipper + plugins</td><td>Network, storage, performance inspection</td></tr>
            </table>
        `
     },
    {
        id: 71,
        category: "System Design",
        icon: "🏛️",
        question: "Design a modular architecture that supports feature teams working independently",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Team structure:</strong> How many teams? (5 vs 20 changes coordination complexity)</li>
                <li><strong>Release cadence:</strong> How often do you ship? (daily vs weekly affects CI/CD needs)</li>
                <li><strong>Feature independence:</strong> Can features be deployed separately, or must they ship together?</li>
                <li><strong>Code sharing:</strong> What percentage of code is shared vs team-specific?</li>
                <li><strong>Native dependencies:</strong> Do different features need different native module versions?</li>
                <li><strong>Testing strategy:</strong> Who owns integration tests between features?</li>
                <li><strong>Migration timeline:</strong> Greenfield or migrating existing monolith?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Multiple teams (5+) can develop features independently without blocking each other</li>
                <li>Features can be shipped/toggled without full app releases via feature flags</li>
                <li>Shared UI components (design system) and core utilities across all features</li>
                <li>Clear ownership boundaries with CODEOWNERS enforced in CI</li>
                <li>Independent testing per feature module with isolated test environments</li>
                <li>Feature teams can add screens and navigation without modifying shell app</li>
                <li>Cross-feature communication through well-defined contracts</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Build time:</strong> &lt; 5 minutes for affected packages only (incremental builds)</li>
                <li><strong>Dependency safety:</strong> No circular dependencies between feature modules</li>
                <li><strong>Type safety:</strong> Type-safe contracts between modules, caught at compile time</li>
                <li><strong>Migration:</strong> Incremental adoption - migrate existing code gradually</li>
                <li><strong>DX:</strong> Hot reload works across package boundaries during development</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Runtime module federation (focus on build-time integration)</li>
                <li>Multi-app architecture (single app with modules)</li>
                <li>Backend microservices design</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                        MONOREPO STRUCTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              apps/mobile (Shell Application)              │  │
│  │  • Navigation registration    • Provider composition      │  │
│  │  • Feature flag gating        • Entry point &amp; bootstrap   │  │
│  └─────────────────────────────────┬─────────────────────────┘  │
│                                    │                             │
│      ┌─────────────────────────────┼─────────────────────────┐  │
│      ▼                             ▼                         ▼  │
│  ┌─────────────┐           ┌─────────────┐          ┌───────────┐│
│  │ features/   │           │ features/   │          │ features/ ││
│  │   auth      │           │  checkout   │          │  catalog  ││
│  │  (Team A)   │           │  (Team B)   │          │ (Team C)  ││
│  │             │           │             │          │           ││
│  │ ┌─────────┐ │           │ ┌─────────┐ │          │┌─────────┐││
│  │ │ screens │ │           │ │ screens │ │          ││ screens │││
│  │ │  hooks  │ │           │ │  hooks  │ │          ││  hooks  │││
│  │ │  api    │ │           │ │  api    │ │          ││  api    │││
│  │ │ index.ts│ │           │ │ index.ts│ │          ││index.ts │││
│  │ └─────────┘ │           │ └─────────┘ │          │└─────────┘││
│  └──────┬──────┘           └──────┬──────┘          └─────┬─────┘│
│         │                        │                        │      │
│         └────────────────────────┼────────────────────────┘      │
│                                  ▼                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    packages/ (Shared)                      │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │  │
│  │  │   ui    │  │  core   │  │  api    │  │ config  │      │  │
│  │  │ Button  │  │ hooks   │  │ client  │  │tsconfig │      │  │
│  │  │ Input   │  │ storage │  │ types   │  │ eslint  │      │  │
│  │  │ Theme   │  │ events  │  │ codegen │  │ jest    │      │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  RULE: features → packages (NEVER packages → features)          │
│  RULE: features ↛ features (no direct imports between features) │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Layer</th><th>Responsibility</th><th>Owner</th></tr>
                <tr><td>apps/mobile</td><td>Shell: navigation, providers, feature composition</td><td>Platform team</td></tr>
                <tr><td>features/*</td><td>Business logic, screens, feature-specific state</td><td>Feature teams</td></tr>
                <tr><td>packages/ui</td><td>Design system: atoms, molecules, tokens</td><td>Design system team</td></tr>
                <tr><td>packages/core</td><td>Shared hooks, utilities, DI, event bus</td><td>Platform team</td></tr>
                <tr><td>packages/api</td><td>API client, generated types, network layer</td><td>Platform team</td></tr>
                <tr><td>packages/config</td><td>Shared configs: TS, ESLint, Jest, Metro</td><td>Platform team</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>Feature Team Develops
        │
        ▼
┌───────────────────────────┐
│ Work in features/xxx      │
│ - Own screens             │
│ - Own components          │
│ - Own state (Zustand)     │
│ - Own tests               │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│ Import from packages/     │
│ - @app/ui (Button, Input) │
│ - @app/core (useAuth)     │
│ - @app/api (apiClient)    │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│ Export public API         │
│ via features/xxx/index.ts │
│ (screens, hooks, types)   │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│ Shell app registers       │
│ feature screens in nav    │
│ Wraps with feature flag   │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│ Feature flag service      │
│ controls visibility       │
│ &amp; gradual rollout         │
└───────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>Monorepo over polyrepo:</strong> Atomic commits across packages, easier refactoring, single CI. Trade-off: requires good tooling (Nx/Turbo).</li>
                <li><strong>Feature modules as npm packages:</strong> Clear boundaries, explicit public APIs, dependency graph enforcement.</li>
                <li><strong>Event bus for cross-feature communication:</strong> Features don't import each other; communicate via typed events. Decoupling over convenience.</li>
                <li><strong>Dependency injection for services:</strong> Features request services via context, shell provides implementations. Testable, swappable.</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// ============ MODULE STRUCTURE ============

// Feature module package.json structure
interface FeaturePackageJson {
    name: string;                    // "@app/feature-auth"
    version: string;                 // "1.0.0" (semver for breaking changes)
    main: string;                    // "src/index.ts"
    dependencies: {
        "@app/ui": "workspace:*";    // Internal packages
        "@app/core": "workspace:*";
        "@app/api": "workspace:*";
    };
    peerDependencies: {              // Shared externals
        "react": "*";
        "react-native": "*";
    };
}

// Feature module public API contract
interface FeatureModule {
    // Screens exported for navigation registration
    screens: Record&lt;string, React.ComponentType&gt;;

    // Navigation param types for type-safe navigation
    paramList: Record&lt;string, object | undefined&gt;;

    // Hooks for cross-feature data access
    hooks?: {
        useFeatureData?: () =&gt; unknown;
    };

    // Feature configuration
    config: {
        featureFlagKey: string;
        requiredPermissions?: string[];
    };
}

// ============ SERVICE CONTRACTS ============

// Services provided by shell, consumed by features
interface AppServices {
    api: IAPIClient;
    analytics: IAnalyticsService;
    storage: IStorageService;
    featureFlags: IFeatureFlagService;
    navigation: INavigationService;
    auth: IAuthService;
}

interface IAPIClient {
    get&lt;T&gt;(path: string): Promise&lt;T&gt;;
    post&lt;T&gt;(path: string, body: unknown): Promise&lt;T&gt;;
    // ... other methods
}

interface IAnalyticsService {
    track(event: string, properties?: Record&lt;string, unknown&gt;): void;
    identify(userId: string, traits?: Record&lt;string, unknown&gt;): void;
    screen(name: string): void;
}

interface IFeatureFlagService {
    isEnabled(flag: string): boolean;
    getVariant&lt;T&gt;(flag: string, defaultValue: T): T;
}

// ============ EVENT CONTRACTS ============

// Typed event bus for cross-feature communication
interface AppEventMap {
    // Auth events
    'auth:login': { userId: string; method: 'email' | 'social' };
    'auth:logout': { reason: 'user' | 'expired' | 'revoked' };
    'auth:tokenRefreshed': { expiresAt: number };

    // Cart events (checkout listens)
    'cart:itemAdded': { productId: string; quantity: number };
    'cart:itemRemoved': { productId: string };
    'cart:cleared': undefined;

    // Order events (multiple features listen)
    'order:placed': { orderId: string; total: number };
    'order:statusChanged': { orderId: string; status: string };

    // Navigation events
    'navigation:deepLink': { url: string; params: Record&lt;string, string&gt; };
}</code></pre>

            <h5>Directory Structure</h5>
            <pre><code>my-app/
├── apps/
│   ├── mobile/                    # Shell application
│   │   ├── src/
│   │   │   ├── App.tsx           # Root component
│   │   │   ├── navigation/
│   │   │   │   ├── RootNavigator.tsx
│   │   │   │   └── linking.ts    # Deep link config
│   │   │   ├── providers/
│   │   │   │   ├── ServiceProvider.tsx
│   │   │   │   └── FeatureFlagProvider.tsx
│   │   │   └── features/         # Feature registration
│   │   │       └── index.ts      # Import all features
│   │   ├── metro.config.js       # Watch all packages
│   │   └── package.json
│   └── storybook/                # Component playground
│
├── packages/
│   ├── ui/                       # Design system
│   │   ├── src/
│   │   │   ├── atoms/            # Button, Text, Input
│   │   │   ├── molecules/        # Card, ListItem
│   │   │   ├── organisms/        # Header, TabBar
│   │   │   ├── tokens/           # Colors, spacing, typography
│   │   │   └── index.ts          # Public exports
│   │   └── package.json
│   │
│   ├── core/                     # Shared utilities
│   │   ├── src/
│   │   │   ├── hooks/            # useDebounce, useAsync
│   │   │   ├── storage/          # MMKV wrapper
│   │   │   ├── di/               # ServiceProvider
│   │   │   ├── events/           # EventBus
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── api/                      # API layer
│       ├── src/
│       │   ├── client.ts         # Axios instance
│       │   ├── types/            # Generated API types
│       │   └── index.ts
│       └── package.json
│
├── features/
│   ├── auth/                     # Auth team owns this
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   └── SignupScreen.tsx
│   │   │   ├── components/       # Feature-internal components
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── store/            # Feature-local Zustand store
│   │   │   └── index.ts          # PUBLIC API ONLY
│   │   ├── __tests__/            # Feature tests
│   │   ├── CODEOWNERS            # @company/auth-team
│   │   └── package.json
│   │
│   ├── checkout/                 # Payments team owns this
│   ├── catalog/                  # Discovery team owns this
│   └── profile/                  # Growth team owns this
│
├── tools/
│   ├── generators/               # Plop templates
│   └── scripts/                  # Build scripts
│
├── turbo.json                    # Turborepo config
├── pnpm-workspace.yaml           # Workspace definition
└── package.json                  # Root dependencies</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage Location</th><th>Owner</th></tr>
                <tr><td>Feature configs</td><td>packages/config</td><td>Platform team</td></tr>
                <tr><td>Shared types</td><td>packages/api/types</td><td>Auto-generated</td></tr>
                <tr><td>Feature state</td><td>features/xxx/store</td><td>Feature team</td></tr>
                <tr><td>Design tokens</td><td>packages/ui/tokens</td><td>Design system team</td></tr>
                <tr><td>Build cache</td><td>.turbo / .nx</td><td>CI system</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Feature Module Public API</h5>
            <pre><code>// features/auth/src/index.ts
// This is the ONLY file other modules can import from

// Screen exports for navigation registration
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';
export { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';

// Hook exports for cross-feature data access
export { useAuth } from './hooks/useAuth';
export { useCurrentUser } from './hooks/useCurrentUser';

// Type exports for type-safe integration
export type { User, AuthState, LoginCredentials } from './types';
export type { AuthStackParamList } from './navigation/types';

// Feature configuration export
export const authFeatureConfig = {
    featureFlagKey: 'feature_auth_v2',
    requiredPermissions: [],
    analyticsPrefix: 'auth',
};

// IMPORTANT: Internal components, utilities, and state are NOT exported
// This enforces encapsulation and prevents tight coupling</code></pre>

            <h5>Service Provider Interface</h5>
            <pre><code>// packages/core/src/di/ServiceProvider.tsx
interface ServiceProviderProps {
    children: ReactNode;
    services: AppServices;
}

/**
 * Provides app-wide services to all features via Context
 * Features access services without knowing implementations
 */
export function ServiceProvider({ children, services }: ServiceProviderProps): JSX.Element;

/**
 * Hook to access services from any feature
 * @throws Error if used outside ServiceProvider
 */
export function useServices(): AppServices;

// Convenience hooks for common services
export function useAPI(): IAPIClient;
export function useAnalytics(): IAnalyticsService;
export function useFeatureFlags(): IFeatureFlagService;</code></pre>

            <h5>Event Bus Interface</h5>
            <pre><code>// packages/core/src/events/eventBus.ts
interface IEventBus {
    /**
     * Emit an event to all listeners
     * @param event - Event name from AppEventMap
     * @param payload - Event payload (type-safe)
     */
    emit&lt;K extends keyof AppEventMap&gt;(event: K, payload: AppEventMap[K]): void;

    /**
     * Subscribe to an event
     * @param event - Event name from AppEventMap
     * @param handler - Callback function
     * @returns Unsubscribe function
     */
    on&lt;K extends keyof AppEventMap&gt;(
        event: K,
        handler: (payload: AppEventMap[K]) =&gt; void
    ): () =&gt; void;

    /**
     * Subscribe to an event once
     */
    once&lt;K extends keyof AppEventMap&gt;(
        event: K,
        handler: (payload: AppEventMap[K]) =&gt; void
    ): void;
}

// Usage in auth feature
const eventBus = useEventBus();

// Emit when user logs in
eventBus.emit('auth:login', { userId: user.id, method: 'email' });

// Usage in checkout feature - listen for auth changes
useEffect(() =&gt; {
    return eventBus.on('auth:logout', () =&gt; {
        // Clear checkout state when user logs out
        clearCheckoutState();
    });
}, []);</code></pre>

            <h5>Navigation Registration Interface</h5>
            <pre><code>// apps/mobile/src/features/index.ts
// Central feature registration

import { authFeatureConfig, LoginScreen, SignupScreen } from '@app/feature-auth';
import { catalogFeatureConfig, CatalogScreen, ProductScreen } from '@app/feature-catalog';
import { checkoutFeatureConfig, CartScreen, CheckoutScreen } from '@app/feature-checkout';

interface FeatureRegistration {
    config: FeatureConfig;
    screens: {
        name: string;
        component: React.ComponentType;
        options?: NavigationOptions;
    }[];
}

export const registeredFeatures: FeatureRegistration[] = [
    {
        config: authFeatureConfig,
        screens: [
            { name: 'Login', component: LoginScreen },
            { name: 'Signup', component: SignupScreen },
        ],
    },
    {
        config: catalogFeatureConfig,
        screens: [
            { name: 'Catalog', component: CatalogScreen },
            { name: 'Product', component: ProductScreen },
        ],
    },
    // ... more features
];

// RootNavigator uses this to build navigation
function RootNavigator() {
    const featureFlags = useFeatureFlags();

    return (
        &lt;Stack.Navigator&gt;
            {registeredFeatures
                .filter(f =&gt; featureFlags.isEnabled(f.config.featureFlagKey))
                .flatMap(f =&gt; f.screens.map(s =&gt; (
                    &lt;Stack.Screen key={s.name} name={s.name} component={s.component} /&gt;
                )))}
        &lt;/Stack.Navigator&gt;
    );
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Affected-only builds:</strong>
                    <ul>
                        <li>Problem: Full rebuild takes 15+ minutes as codebase grows</li>
                        <li>Solution: Nx/Turbo detects changed packages via git diff, only rebuilds affected</li>
                        <li>Impact: Average CI time reduced from 15min to 3min</li>
                    </ul>
                </li>
                <li><strong>Remote caching:</strong>
                    <ul>
                        <li>Problem: Same packages rebuilt across different PRs/developers</li>
                        <li>Solution: Nx Cloud or Turbo Remote Cache stores build artifacts</li>
                        <li>Impact: 70% cache hit rate, massive CI cost reduction</li>
                    </ul>
                </li>
                <li><strong>Metro watchFolders optimization:</strong>
                    <ul>
                        <li>Problem: Hot reload slow when watching entire monorepo</li>
                        <li>Solution: Configure watchFolders to only include active packages</li>
                        <li>Impact: Hot reload time from 5s to &lt;1s</li>
                    </ul>
                </li>
            </ul>

            <h5>Build System Configuration</h5>
            <pre><code>// turbo.json - Turborepo configuration
{
    "$schema": "https://turbo.build/schema.json",
    "pipeline": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**"],
            "cache": true
        },
        "test": {
            "dependsOn": ["build"],
            "outputs": ["coverage/**"],
            "cache": true
        },
        "lint": {
            "outputs": [],
            "cache": true
        },
        "typecheck": {
            "dependsOn": ["^typecheck"],
            "outputs": [],
            "cache": true
        }
    }
}

// metro.config.js - Watch monorepo packages
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;</code></pre>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Native modules</td><td>CocoaPods workspace</td><td>Gradle composite builds</td></tr>
                <tr><td>Build caching</td><td>Xcode DerivedData</td><td>Gradle build cache</td></tr>
                <tr><td>Module linking</td><td>Auto-linked via Podfile</td><td>Auto-linked via settings.gradle</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Circular dependencies:</strong> Use dependency-cruiser rules in CI to detect and fail on circular imports between features</li>
                <li><strong>Version conflicts:</strong> Pin shared dependencies in root package.json; use pnpm overrides for conflicts</li>
                <li><strong>Breaking API changes:</strong> Require RFC process, 2-week deprecation period, semantic versioning for packages</li>
                <li><strong>Hot reload across packages:</strong> Configure metro watchFolders to include all workspace packages</li>
                <li><strong>Native module conflicts:</strong> Hoist all native deps to root, enforce single version policy</li>
                <li><strong>Feature flag race conditions:</strong> Load flags before navigation initialization; show loading state</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Monorepo tool</td><td>Turborepo</td><td>Nx</td><td>Simpler setup, faster for basic needs; Nx for advanced generators</td></tr>
                <tr><td>Package manager</td><td>pnpm</td><td>yarn workspaces</td><td>Strict hoisting prevents phantom deps, faster installs</td></tr>
                <tr><td>Module loading</td><td>Build-time</td><td>Re.Pack federation</td><td>Simpler debugging, no runtime complexity; federation for huge apps only</td></tr>
                <tr><td>Cross-feature comms</td><td>Event bus</td><td>Shared state</td><td>Decoupling over convenience; features remain independently testable</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong> Each feature has isolated tests; mock services via DI</li>
                <li><strong>Integration Tests:</strong> Shell app tests feature composition; test event flows</li>
                <li><strong>E2E Tests:</strong> Critical user journeys crossing features (login → browse → checkout)</li>
                <li><strong>Contract Tests:</strong> Validate feature public APIs don't break between versions</li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Nx vs Turborepo?</strong><br/>A: Turborepo is simpler and faster for basic task orchestration. Nx offers generators, plugins, and affected graph visualization. For 5 teams, Turbo usually suffices. For 20+ teams with complex deps, Nx's features pay off.</li>
                <li><strong>Q: When would you use module federation?</strong><br/>A: Re.Pack enables loading features at runtime, useful for A/B testing entire features or reducing initial bundle. But it adds significant complexity (versioning, testing, debugging). Only justified for very large apps (50+ features).</li>
                <li><strong>Q: How do you prevent features from directly importing each other?</strong><br/>A: ESLint rules (eslint-plugin-import) + dependency-cruiser in CI. Features can only import from packages/* and their own internals. Cross-feature data flows through event bus or shared services.</li>
                <li><strong>Q: Migration strategy from monolith?</strong><br/>A: Start with packages/ extraction (UI components, utilities). Then extract one low-risk feature as pilot. Establish patterns, document, then parallelize remaining feature extractions.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Monorepo Tooling</td><td>Turborepo or Nx</td><td>Affected builds, caching, task orchestration</td></tr>
                <tr><td>Package Manager</td><td>pnpm</td><td>Faster installs, strict hoisting, workspace support</td></tr>
                <tr><td>Feature Flags</td><td>LaunchDarkly / Statsig</td><td>Gradual rollouts, A/B testing, kill switches</td></tr>
                <tr><td>Dependency Linting</td><td>dependency-cruiser</td><td>Enforce module boundaries, prevent circular deps</td></tr>
                <tr><td>Code Generation</td><td>Plop.js or Nx generators</td><td>Consistent feature scaffolding</td></tr>
                <tr><td>API Types</td><td>OpenAPI Generator</td><td>Type-safe API contracts from schema</td></tr>
            </table>
        `
     },
    {
        id: 72,
        category: "System Design",
        icon: "🏛️",
        question: "Design a social media feed (like Instagram/Twitter) that handles infinite scroll with smooth 60fps performance",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Content types:</strong> What media types? (text, images, videos, carousels, stories, ads)</li>
                <li><strong>Video behavior:</strong> Auto-play muted or click-to-play? Max simultaneous videos?</li>
                <li><strong>Feed algorithm:</strong> Chronological or ranked? Does ranking affect prefetch strategy?</li>
                <li><strong>Interaction patterns:</strong> Like/comment inline or in detail view? Double-tap to like?</li>
                <li><strong>Real-time updates:</strong> Live like counts? New post notifications?</li>
                <li><strong>Device targets:</strong> What's the minimum device spec? (affects memory budget)</li>
                <li><strong>Offline behavior:</strong> Show cached feed when offline?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Infinite scroll with cursor-based pagination (no duplicate posts on new content)</li>
                <li>Mixed content types: text, images, videos, carousels with nested horizontal scroll</li>
                <li>Auto-play videos when &gt;60% visible, pause when scrolled away, max 1 playing at a time</li>
                <li>Pull-to-refresh for new content with "new posts" banner option</li>
                <li>Like/comment/share interactions without scroll position interruption</li>
                <li>Real-time like count updates via WebSocket</li>
                <li>Image zoom with pan gesture support</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Performance:</strong> Maintain 60fps during fast scrolling (16.67ms frame budget)</li>
                <li><strong>Memory:</strong> Usage &lt; 200MB even with 1000+ items scrolled (virtualization)</li>
                <li><strong>Load time:</strong> First meaningful paint &lt; 500ms with skeleton UI</li>
                <li><strong>Visual stability:</strong> Zero layout shifts - no content jumping during image load</li>
                <li><strong>Scroll position:</strong> Preserve position on tab switch and app background</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Feed ranking algorithm (assume API returns ranked posts)</li>
                <li>Story tray implementation (separate component)</li>
                <li>Comment thread UI (separate screen)</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                        FEED ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    FlashList (Virtualized)                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Visible Window (~5 items)               │  │  │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │  │  │
│  │  │  │ Image Post  │ │ Video Post  │ │ Carousel    │   │  │  │
│  │  │  │ expo-image  │ │ (auto-play) │ │ (nested FL) │   │  │  │
│  │  │  └─────────────┘ └─────────────┘ └─────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │         Recycled Pool (off-screen items)            │  │  │
│  │  │  • Cells recycled by type (getItemType)             │  │  │
│  │  │  • Videos paused &amp; unloaded                         │  │  │
│  │  │  • Images kept in memory cache (LRU eviction)       │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                    State Management                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │ TanStack    │  │ Active Video│  │ Optimistic  │       │  │
│  │  │ Infinite Q  │  │ Controller  │  │ Like Cache  │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>FlashList</td><td>Virtualized rendering, cell recycling, scroll handling</td><td>@shopify/flash-list</td></tr>
                <tr><td>FeedItem</td><td>Render post by type, handle interactions</td><td>React.memo + getItemType</td></tr>
                <tr><td>ImageCell</td><td>Optimized image loading with placeholder</td><td>expo-image + blurhash</td></tr>
                <tr><td>VideoCell</td><td>Auto-play video with visibility control</td><td>react-native-video</td></tr>
                <tr><td>CarouselCell</td><td>Horizontal media scroll within post</td><td>Nested FlashList</td></tr>
                <tr><td>InteractionBar</td><td>Like, comment, share buttons</td><td>Optimistic mutations</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>User Scrolls Down
        │
        ▼
┌───────────────────────┐
│ onEndReached fires    │
│ (threshold: 50%)      │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ fetchNextPage()       │
│ TanStack Query        │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐     ┌─────────────────────┐
│ API returns new page  │────▶│ Append to pages[]   │
│ with nextCursor       │     │ Flatten to posts[]  │
└───────────────────────┘     └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │ FlashList re-renders│
                              │ (only new items)    │
                              └──────────┬──────────┘
                                         │
         ┌───────────────────────────────┼────────────────────────┐
         ▼                               ▼                        ▼
┌─────────────────┐           ┌─────────────────┐      ┌─────────────────┐
│ Recycle old     │           │ Mount new items │      │ Prefetch images │
│ off-screen cells│           │ into visible    │      │ for next batch  │
└─────────────────┘           └─────────────────┘      └─────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>FlashList over FlatList:</strong> Cell recycling by type (getItemType) reduces memory 60%, improves scroll by 10x. Trade-off: slightly more complex setup.</li>
                <li><strong>Cursor pagination:</strong> Unlike offset, cursors remain stable when new posts are added at top. No duplicate posts.</li>
                <li><strong>Visibility-based video control:</strong> Only 1 video plays at a time, determined by viewability threshold. Saves battery and bandwidth.</li>
                <li><strong>Optimistic likes:</strong> UI updates immediately on tap, server sync in background. Rollback on error.</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// Post entity - from API
interface Post {
    id: string;
    type: 'text' | 'image' | 'video' | 'carousel';
    author: {
        id: string;
        username: string;
        avatarUrl: string;
        isVerified: boolean;
    };
    content: string;                 // Caption text
    media: MediaItem[];              // Array for carousels
    aspectRatio: number;             // CRITICAL: prevents layout shifts
    blurhash: string;                // Instant placeholder
    likes: number;
    comments: number;
    isLiked: boolean;                // Current user's state
    isSaved: boolean;
    createdAt: string;
    cursor: string;                  // For stable pagination
}

interface MediaItem {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;           // For video poster
    blurhash: string;
    aspectRatio: number;
    duration?: number;               // Video duration in seconds
}

// Feed page from API (cursor-based)
interface FeedPage {
    posts: Post[];
    nextCursor: string | null;       // null = end of feed
    hasMore: boolean;
}

// Interaction state (optimistic)
interface InteractionState {
    [postId: string]: {
        isLiked: boolean;
        likeCount: number;
        isSaved: boolean;
        pendingLike: boolean;        // Optimistic update in flight
    };
}

// Video playback state
interface VideoPlaybackState {
    activePostId: string | null;     // Currently playing video
    mutedByDefault: boolean;         // User preference
    volumes: Record&lt;string, number&gt;; // Per-video volume memory
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌──────────────┐       ┌──────────────┐
│     Feed     │──1:N──│     Post     │
│   (pages)    │       │              │
└──────────────┘       └──────┬───────┘
                              │
                             1:N
                              │
                       ┌──────▼───────┐
                       │  MediaItem   │
                       │ (image/video)│
                       └──────────────┘

Feed pagination: cursor-based, append-only
Post media: 1 (image/video) or N (carousel)</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Feed posts</td><td>TanStack Query cache</td><td>Auto-managed, background refetch, infinite query support</td></tr>
                <tr><td>Interaction state</td><td>Zustand + optimistic</td><td>Instant UI updates, persist pending likes across sessions</td></tr>
                <tr><td>Image cache</td><td>expo-image (disk)</td><td>LRU eviction, blurhash decoding, memory efficient</td></tr>
                <tr><td>Video cache</td><td>react-native-video cache</td><td>Configurable size limit, preload next video</td></tr>
                <tr><td>Scroll position</td><td>FlashList internal</td><td>Automatic restoration on re-mount</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <ul>
                <li><strong>Server State (TanStack Query):</strong> Feed pages, post details, comments count</li>
                <li><strong>Client State (Zustand):</strong> Active video ID, mute preference, optimistic interactions</li>
                <li><strong>Local State (useState):</strong> Carousel index per post, expanded captions</li>
            </ul>

            <h4>I - Interface Definition (API)</h4>

            <h5>Feed API Contract</h5>
            <pre><code>// API endpoints
interface FeedAPI {
    /**
     * Get paginated feed posts
     * @param cursor - Pagination cursor (null for first page)
     * @param limit - Posts per page (default 10)
     */
    getFeed(cursor: string | null, limit?: number): Promise&lt;FeedPage&gt;;

    /**
     * Refresh feed (get latest posts)
     * @returns New posts count and first page
     */
    refreshFeed(): Promise&lt;{ newCount: number; page: FeedPage }&gt;;

    /**
     * Like/unlike a post
     * @param postId - Post to interact with
     * @param liked - New like state
     */
    toggleLike(postId: string, liked: boolean): Promise&lt;{ likes: number }&gt;;
}</code></pre>

            <h5>Component Interfaces</h5>
            <pre><code>// FlashList feed hook
function useFeed(): {
    posts: Post[];
    isLoading: boolean;
    isRefreshing: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    error: Error | null;
    fetchNextPage: () =&gt; void;
    refresh: () =&gt; Promise&lt;void&gt;;
};

// FeedItem component props
interface FeedItemProps {
    post: Post;
    isVideoActive: boolean;
    onLike: (postId: string) =&gt; void;
    onComment: (postId: string) =&gt; void;
    onShare: (postId: string) =&gt; void;
    onAuthorPress: (userId: string) =&gt; void;
}

// Video controller hook
function useVideoPlayback(): {
    activePostId: string | null;
    isMuted: boolean;
    setActivePost: (postId: string | null) =&gt; void;
    toggleMute: () =&gt; void;
};</code></pre>

            <h5>FlashList Configuration</h5>
            <pre><code>// Optimized FlashList props for feed
&lt;FlashList&lt;Post&gt;
    data={posts}
    renderItem={({ item }) =&gt; &lt;FeedItem post={item} ... /&gt;}

    // CRITICAL: Enables cell recycling by post type
    getItemType={(item) =&gt; item.type}

    // Estimated average height (adjust based on content mix)
    estimatedItemSize={450}

    // Stable key for reconciliation
    keyExtractor={(item) =&gt; item.id}

    // Pagination
    onEndReached={fetchNextPage}
    onEndReachedThreshold={0.5}

    // Pre-render buffer (pixels beyond viewport)
    drawDistance={300}

    // Pull to refresh
    refreshing={isRefreshing}
    onRefresh={refresh}

    // Viewability for video auto-play
    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}

    // Performance props
    removeClippedSubviews={true}
    maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
/&gt;</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Cell recycling with getItemType:</strong>
                    <ul>
                        <li>Problem: Creating new cell instances on scroll causes jank</li>
                        <li>Solution: FlashList recycles cells by type - video cells reused for videos, image cells for images</li>
                        <li>Impact: 60% memory reduction, consistent 60fps scroll</li>
                    </ul>
                </li>
                <li><strong>Image loading with blurhash:</strong>
                    <ul>
                        <li>Problem: White boxes or spinners while images load cause visual noise</li>
                        <li>Solution: Render blurhash placeholder instantly, crossfade to actual image</li>
                        <li>Impact: Zero perceived loading time, no layout shifts</li>
                    </ul>
                </li>
                <li><strong>Aspect ratio from API:</strong>
                    <ul>
                        <li>Problem: Images load → calculate dimensions → layout shift</li>
                        <li>Solution: API provides aspectRatio, reserve exact space before image loads</li>
                        <li>Impact: Zero Cumulative Layout Shift (CLS)</li>
                    </ul>
                </li>
                <li><strong>Video instance limiting:</strong>
                    <ul>
                        <li>Problem: Multiple video players consume memory and battery</li>
                        <li>Solution: Max 1 playing video, others show thumbnail. Preload 1 video ahead.</li>
                        <li>Impact: 70% memory reduction for video-heavy feeds</li>
                    </ul>
                </li>
            </ul>

            <h5>Video Auto-play Strategy</h5>
            <pre><code>// Video visibility management
const viewabilityConfig = {
    itemVisiblePercentThreshold: 60,  // 60% visible to play
    minimumViewTime: 300,             // Must be visible 300ms
};

const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) =&gt; {
        // Find first visible video post
        const visibleVideo = viewableItems.find(
            (item) =&gt; item.isViewable &amp;&amp; item.item.type === 'video'
        );
        setActiveVideoId(visibleVideo?.item.id ?? null);
    },
    []
);

// Video cell pauses when not active
const VideoCell = memo(({ url, isActive, poster }: Props) =&gt; {
    return (
        &lt;Video
            source={{ uri: url }}
            posterSource={{ uri: poster }}
            shouldPlay={isActive}
            isLooping
            isMuted={isMuted}
            resizeMode="cover"
            onLoad={() =&gt; {/* preload complete */}}
        /&gt;
    );
});</code></pre>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>List implementation</td><td>UICollectionView (native)</td><td>RecyclerView (native)</td></tr>
                <tr><td>Image loading</td><td>SDWebImage via expo-image</td><td>Glide via expo-image</td></tr>
                <tr><td>Video player</td><td>AVPlayer</td><td>ExoPlayer</td></tr>
                <tr><td>Smooth scroll</td><td>contentInsetAdjustmentBehavior</td><td>nestedScrollingEnabled</td></tr>
                <tr><td>Animations</td><td>CoreAnimation</td><td>Hardware layer</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Rapid scrolling:</strong> Increase drawDistance to 500px; debounce video play/pause transitions</li>
                <li><strong>Memory pressure:</strong> Monitor with Performance API; reduce image cache size; pause all videos</li>
                <li><strong>Layout shifts:</strong> Always provide aspectRatio from API; use placeholder dimensions</li>
                <li><strong>Stale data on return:</strong> Show "new posts" banner at top instead of auto-refresh scroll jump</li>
                <li><strong>Network failure mid-scroll:</strong> Show inline error card with retry button; preserve scroll position</li>
                <li><strong>Multiple videos visible:</strong> Only play topmost video (first in viewableItems array)</li>
                <li><strong>Tab switch:</strong> Pause video, preserve scroll position, resume on return</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>List component</td><td>FlashList</td><td>FlatList</td><td>10x faster scroll, cell recycling, better memory</td></tr>
                <tr><td>Pagination</td><td>Cursor-based</td><td>Offset-based</td><td>Stable with new posts at top, no duplicates</td></tr>
                <tr><td>Image library</td><td>expo-image</td><td>FastImage</td><td>Better maintained, blurhash built-in, transitions</td></tr>
                <tr><td>Video visibility</td><td>viewabilityConfig</td><td>IntersectionObserver</td><td>Native integration, configurable threshold</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Performance Tests:</strong> Perf Monitor for FPS, Flipper for memory, systrace for render times</li>
                <li><strong>Scroll Tests:</strong> Automated scroll to end, measure dropped frames</li>
                <li><strong>Memory Tests:</strong> Scroll 1000 items, verify memory stays under 200MB</li>
                <li><strong>Interaction Tests:</strong> Like/unlike rapid tapping, verify optimistic updates</li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: FlashList vs FlatList?</strong><br/>A: FlashList recycles cells by type (getItemType), uses native list components under the hood, and handles variable heights better. It's 10x faster for large lists because it doesn't create new JS objects on scroll.</li>
                <li><strong>Q: Why cursor pagination over offset?</strong><br/>A: If new posts are added while scrolling, offset pagination causes duplicates (post at offset 10 is now at offset 11). Cursors reference a specific post, so pagination remains stable.</li>
                <li><strong>Q: How do you measure feed performance?</strong><br/>A: Enable Perf Monitor (Cmd+M) to watch FPS. Use Flipper for memory profiling. React DevTools Profiler for component render times. Systrace for native thread analysis.</li>
                <li><strong>Q: What causes layout shifts and how to prevent?</strong><br/>A: Images loading without reserved dimensions. Solution: API must return aspectRatio, render placeholder at exact size before image loads. Zero CLS.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>List Virtualization</td><td>@shopify/flash-list</td><td>10x faster than FlatList, cell recycling, memory efficient</td></tr>
                <tr><td>Image Loading</td><td>expo-image</td><td>Blurhash, memory-disk cache, smooth transitions</td></tr>
                <tr><td>Video Playback</td><td>react-native-video v6</td><td>Native players, caching, background audio support</td></tr>
                <tr><td>Server State</td><td>TanStack Query v5</td><td>Infinite queries, background refetch, optimistic updates</td></tr>
                <tr><td>Animations</td><td>Reanimated 3</td><td>JS thread-free animations via worklets</td></tr>
                <tr><td>Gestures</td><td>react-native-gesture-handler</td><td>Native gesture recognition, smooth interactions</td></tr>
            </table>
        `
     },
    {
        id: 73,
        category: "System Design",
        icon: "🏛️",
        question: "How would you architect an app to minimize startup time to under 2 seconds?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Startup Definition:</strong> What does "startup" mean - cold start, warm start, or hot start? What's the target metric (Time to Interactive, Time to First Meaningful Paint)?</li>
                <li><strong>Target Devices:</strong> What's the minimum device spec? Budget phones (2GB RAM) or flagship only? Which Android API levels / iOS versions?</li>
                <li><strong>Initial Content:</strong> What must be displayed on the first screen? Can we show cached/skeleton content or must it be fresh?</li>
                <li><strong>Authentication:</strong> Is there a login flow? Can users access content without signing in? How is session persistence handled?</li>
                <li><strong>Data Requirements:</strong> How much data is needed for the initial screen? Can it be pre-fetched or bundled?</li>
                <li><strong>Feature Flags:</strong> Are there remote config/feature flags that need loading before rendering?</li>
                <li><strong>Deep Links:</strong> Does the app need to support deep linking at startup? This adds complexity to the critical path.</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Cold start to interactive home screen &lt; 2 seconds on target devices</li>
                <li>Show meaningful content during loading (skeleton UI, cached content - not just spinner)</li>
                <li>Restore user session without re-login (silent auth token refresh)</li>
                <li>Prefetch critical data before hiding splash screen</li>
                <li>Support offline launch with cached data (graceful degradation)</li>
                <li>Handle deep links during startup without breaking the flow</li>
                <li>Load feature flags/remote config for initial screen rendering</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>JS bundle size &lt; 2MB compressed for initial load</li>
                <li>No white flash between native splash and React content</li>
                <li>Works on low-end devices (2GB RAM, older CPUs, Android 7+)</li>
                <li>Consistent startup time across app versions (no regression)</li>
                <li>Warm start &lt; 500ms, hot start &lt; 100ms</li>
                <li>Memory footprint &lt; 100MB during startup phase</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Server-side rendering (not applicable to RN)</li>
                <li>Web app startup optimization</li>
                <li>Backend API optimization (assume APIs are performant)</li>
                <li>App Store/Play Store download optimization</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    STARTUP OPTIMIZATION LAYERS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  0ms ─────────── NATIVE INIT ─────────── 150ms                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Native splash screen displayed (windowBackground)       │  │
│  │  • Load native modules (minimal set only)                  │  │
│  │  • Initialize Hermes VM with bytecode                      │  │
│  │  • Start JS bridge initialization                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  150ms ─────────── JS BUNDLE LOAD ─────────── 500ms             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Load Hermes bytecode (pre-compiled, no parsing)         │  │
│  │  • Execute critical path only (inline requires)            │  │
│  │  • Defer non-critical modules via React.lazy               │  │
│  │  • Read MMKV cache synchronously (session, user data)      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  500ms ─────────── REACT RENDER ─────────── 800ms               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Render shell/skeleton UI immediately                    │  │
│  │  • Hydrate state from MMKV cache (no network wait)         │  │
│  │  • Start critical data fetches in parallel                 │  │
│  │  • Resolve deep link target (if applicable)                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  800ms ─────────── INTERACTIVE ─────────── 1500ms               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Hide splash, show real content (crossfade animation)    │  │
│  │  • User can interact with UI                               │  │
│  │  • Background: load deferred modules                       │  │
│  │  • Navigate to deep link target if applicable              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  1500ms+ ─────────── POST-INTERACTIVE ───────────               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Initialize analytics, crash reporting (Sentry/Firebase) │  │
│  │  • Prefetch secondary screens (profile, settings)          │  │
│  │  • Register push notifications (FCM/APNs)                  │  │
│  │  • Validate session token with server                      │  │
│  │  • Sync pending offline actions                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Splash Controller</td><td>Show/hide native splash, prevent white flash</td><td>react-native-splash-screen</td></tr>
                <tr><td>Bootstrap Manager</td><td>Orchestrate startup sequence, track phases</td><td>Custom hook + state machine</td></tr>
                <tr><td>Cache Hydrator</td><td>Restore session, user data from cache</td><td>react-native-mmkv (sync reads)</td></tr>
                <tr><td>Critical Data Fetcher</td><td>Fetch initial screen data with timeout</td><td>TanStack Query with suspense</td></tr>
                <tr><td>Deferred Loader</td><td>Load non-critical modules after interactive</td><td>React.lazy + InteractionManager</td></tr>
                <tr><td>Deep Link Resolver</td><td>Parse and queue deep links during startup</td><td>React Navigation linking</td></tr>
                <tr><td>Skeleton System</td><td>Render meaningful placeholders</td><td>Reanimated + Skeleton components</td></tr>
                <tr><td>Startup Metrics</td><td>Measure and report startup performance</td><td>Custom performance marks</td></tr>
            </table>

            <h5>Startup Data Flow</h5>
            <pre><code>App Launch
    │
    ▼
┌─────────────────────┐
│ Native Splash Shows │  ◄── windowBackground (instant)
│ (iOS/Android native)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Hermes loads        │  ◄── Pre-compiled bytecode
│ bytecode bundle     │      No JS parsing needed
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Execute critical    │────▶│ MMKV cache read     │  ◄── Sync, instant
│ path only           │     │ (session, user)     │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Render skeleton     │◀────│ Restore user state  │
│ with cached data    │     │ from MMKV           │
└──────────┬──────────┘     └─────────────────────┘
           │
           ├────────────────────────────────┐
           ▼                                ▼
┌─────────────────────┐          ┌─────────────────────┐
│ Fetch critical data │          │ Load feature flags  │
│ (with 2s timeout)   │          │ (remote config)     │
└──────────┬──────────┘          └──────────┬──────────┘
           │                                │
           └────────────────┬───────────────┘
                            ▼
┌─────────────────────────────────────────────┐
│ Hide splash, show real content              │
│ (crossfade animation, no white flash)       │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│ POST-INTERACTIVE (after InteractionManager) │
│ • Analytics init    • Push notifications    │
│ • Session validate  • Prefetch screens      │
│ • Sync offline queue                        │
└─────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>Hermes as JS Engine:</strong> Pre-compiles JS to bytecode at build time. Eliminates parsing overhead at runtime. 50%+ faster startup compared to JSC.</li>
                <li><strong>MMKV for Session Storage:</strong> Synchronous reads during startup (AsyncStorage is async). 30x faster than AsyncStorage. Enables instant state hydration.</li>
                <li><strong>Inline Requires:</strong> Metro transforms imports to defer execution until first use. Only critical path code runs during startup. Remaining modules load lazily.</li>
                <li><strong>Skeleton-First Rendering:</strong> Show meaningful UI shape immediately using cached layout. User perceives faster startup. Actual content fills in as data loads.</li>
                <li><strong>InteractionManager Deferral:</strong> Analytics, crash reporting, push notifications run after first frame. Keeps main thread free for initial render. No impact on TTI metric.</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/startup.ts

/** Startup phase tracking */
type StartupPhase =
    | 'native_init'      // 0-150ms: Native modules loading
    | 'js_loading'       // 150-500ms: JS bundle execution
    | 'react_render'     // 500-800ms: Initial React render
    | 'interactive'      // 800-1500ms: User can interact
    | 'post_interactive' // 1500ms+: Background tasks
    | 'complete';        // All startup tasks finished

/** Bootstrap state machine state */
interface BootstrapState {
    phase: StartupPhase;
    startTime: number;           // Performance.now() at app launch
    phaseTimings: Record&lt;StartupPhase, number&gt;;  // Duration per phase
    isSessionRestored: boolean;
    isCacheHydrated: boolean;
    isCriticalDataLoaded: boolean;
    isFeatureFlagsLoaded: boolean;
    hasPendingDeepLink: boolean;
    deepLinkUrl: string | null;
    errors: StartupError[];
}

/** Cached session data structure */
interface CachedSession {
    hasSession: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    tokenExpiry: number | null;   // Unix timestamp
    userId: string | null;
}

/** Cached user data for instant hydration */
interface CachedUserData {
    id: string;
    name: string;
    avatarUrl: string | null;
    preferences: UserPreferences;
    lastSyncedAt: number;         // Unix timestamp
}

/** Feature flags loaded at startup */
interface FeatureFlags {
    maintenanceMode: boolean;
    newHomeEnabled: boolean;
    experimentGroup: string;
    minimumAppVersion: string;
    loadedAt: number;
}

/** Startup error tracking */
interface StartupError {
    phase: StartupPhase;
    error: string;
    timestamp: number;
    recovered: boolean;
}

/** Critical data needed for initial screen */
interface CriticalScreenData {
    homeContent: HomeContent[];
    unreadNotifications: number;
    userStatus: UserStatus;
}

/** Startup metrics for performance tracking */
interface StartupMetrics {
    coldStartTime: number;        // Total time to interactive
    nativeInitTime: number;       // Native module init
    jsBundleLoadTime: number;     // JS bundle execution
    firstRenderTime: number;      // Time to first React render
    ttInteractive: number;        // Time to interactive
    cacheHitRate: number;         // % of data served from cache
    networkRequestCount: number;  // API calls during startup
    memoryAtStartup: number;      // MB used at TTI
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    STARTUP DATA RELATIONSHIPS                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BootstrapState (1)                                             │
│       │                                                          │
│       ├─── controls ───▶ StartupPhase progression               │
│       │                                                          │
│       ├─── uses ───▶ CachedSession (1)                          │
│       │                    │                                     │
│       │                    └─── restores ───▶ CachedUserData (1)│
│       │                                                          │
│       ├─── loads ───▶ FeatureFlags (1)                          │
│       │                    │                                     │
│       │                    └─── gates ───▶ CriticalScreenData   │
│       │                                                          │
│       ├─── tracks ───▶ StartupError (0..N)                      │
│       │                                                          │
│       └─── emits ───▶ StartupMetrics (1)                        │
│                             │                                    │
│                             └─── sent to ───▶ Analytics         │
│                                                                  │
│  CachedSession ──── determines ────▶ Navigation Route           │
│       │                              (Auth vs Main)              │
│       │                                                          │
│       └──── refreshed by ────▶ Token Refresh (background)       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Session tokens</td><td>MMKV (encrypted)</td><td>Sync read at startup, secure storage</td></tr>
                <tr><td>User profile cache</td><td>MMKV</td><td>Instant hydration, small payload</td></tr>
                <tr><td>Feature flags</td><td>MMKV + memory</td><td>Cache with TTL, fallback to defaults</td></tr>
                <tr><td>Home screen cache</td><td>TanStack Query cache</td><td>Stale-while-revalidate strategy</td></tr>
                <tr><td>Startup metrics</td><td>Memory → batch send</td><td>Don't persist, send to analytics</td></tr>
                <tr><td>Deep link queue</td><td>Memory (volatile)</td><td>Only needed during startup</td></tr>
                <tr><td>Deferred modules</td><td>Bundle (lazy chunks)</td><td>Loaded after interactive</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Location</th><th>Rationale</th></tr>
                <tr><td>Bootstrap phase</td><td>React state (useState)</td><td>Drives conditional rendering</td></tr>
                <tr><td>Session data</td><td>MMKV → Zustand</td><td>Persisted, sync hydration</td></tr>
                <tr><td>Feature flags</td><td>React Context</td><td>Read-only, app-wide access</td></tr>
                <tr><td>Critical data</td><td>TanStack Query</td><td>Server state with caching</td></tr>
                <tr><td>Startup errors</td><td>Local state + ref</td><td>Collected, not rendered</td></tr>
                <tr><td>Performance marks</td><td>Native performance API</td><td>High-precision timing</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Bootstrap Manager API</h5>
            <pre><code>// hooks/useBootstrap.ts

/**
 * Core bootstrap hook that orchestrates app startup sequence.
 * Returns state and controls for managing startup phases.
 */
interface UseBootstrapReturn {
    /** Current bootstrap state */
    state: BootstrapState;

    /** Whether app is ready for user interaction */
    isReady: boolean;

    /** Whether splash screen should be visible */
    showSplash: boolean;

    /** Session restored from cache */
    session: CachedSession | null;

    /** Manually advance to next phase (for testing) */
    advancePhase: () =&gt; void;

    /** Record error during startup */
    recordError: (phase: StartupPhase, error: Error) =&gt; void;

    /** Get startup metrics */
    getMetrics: () =&gt; StartupMetrics;
}

function useBootstrap(config: BootstrapConfig): UseBootstrapReturn;

interface BootstrapConfig {
    /** Maximum time to wait for critical data (ms) */
    criticalDataTimeout: number;

    /** Whether to block on feature flags */
    requireFeatureFlags: boolean;

    /** Callback when startup completes */
    onComplete: (metrics: StartupMetrics) =&gt; void;

    /** Callback when startup fails */
    onError: (errors: StartupError[]) =&gt; void;
}</code></pre>

            <h5>Cache Hydration API</h5>
            <pre><code>// services/cacheHydrator.ts

/**
 * Synchronously reads cached data during startup.
 * Must use MMKV for sync access - AsyncStorage won't work here.
 */
interface CacheHydrator {
    /** Restore session tokens (sync) */
    getSession(): CachedSession | null;

    /** Restore user profile (sync) */
    getUserData(): CachedUserData | null;

    /** Get cached feature flags with TTL check */
    getFeatureFlags(): FeatureFlags | null;

    /** Check if cache is stale and needs refresh */
    isCacheStale(key: string, maxAgeMs: number): boolean;

    /** Clear all startup caches (for logout) */
    clearAll(): void;
}

// MMKV-based implementation
const cacheHydrator: CacheHydrator = {
    getSession: () =&gt; {
        const data = mmkv.getString('session');
        return data ? JSON.parse(data) : null;
    },
    // ... other methods
};</code></pre>

            <h5>Deferred Loading API</h5>
            <pre><code>// services/deferredLoader.ts

/**
 * Manages loading of non-critical modules after app becomes interactive.
 * Uses InteractionManager to avoid blocking main thread.
 */
interface DeferredLoader {
    /** Queue a module for deferred loading */
    defer(
        moduleId: string,
        loader: () =&gt; Promise&lt;any&gt;,
        priority: 'high' | 'medium' | 'low'
    ): void;

    /** Start processing deferred queue */
    startProcessing(): void;

    /** Check if a module has been loaded */
    isLoaded(moduleId: string): boolean;

    /** Get loading status */
    getStatus(): DeferredLoadingStatus;
}

interface DeferredLoadingStatus {
    pending: string[];
    loading: string[];
    completed: string[];
    failed: string[];
}

// Usage example
deferredLoader.defer('analytics', () =&gt; import('./analytics'), 'medium');
deferredLoader.defer('crashReporting', () =&gt; import('./crashReporting'), 'high');
deferredLoader.defer('pushNotifications', () =&gt; import('./push'), 'low');</code></pre>

            <h5>Startup Metrics API</h5>
            <pre><code>// services/startupMetrics.ts

/**
 * High-precision startup performance measurement.
 * Uses native performance APIs for accuracy.
 */
interface StartupMetricsService {
    /** Mark the start of a phase */
    markPhaseStart(phase: StartupPhase): void;

    /** Mark the end of a phase */
    markPhaseEnd(phase: StartupPhase): void;

    /** Record a custom metric */
    recordMetric(name: string, value: number): void;

    /** Get all collected metrics */
    getMetrics(): StartupMetrics;

    /** Send metrics to analytics backend */
    reportMetrics(): Promise&lt;void&gt;;
}

// Native module for high-precision timing
interface StartupMetricsNative {
    // iOS: Uses CACurrentMediaTime()
    // Android: Uses SystemClock.elapsedRealtimeNanos()
    getNativeStartTime(): number;
    markNativeEvent(name: string): void;
}</code></pre>

            <h5>Native Bridge APIs</h5>
            <pre><code>// iOS - SplashScreenModule.swift

@objc(SplashScreenModule)
class SplashScreenModule: NSObject {

    /// Shows the splash screen (called from AppDelegate)
    @objc static func show() {
        DispatchQueue.main.async {
            // Present launch storyboard view
        }
    }

    /// Hides splash with optional fade animation
    @objc func hide(_ animated: Bool,
                    duration: Double,
                    resolver: @escaping RCTPromiseResolveBlock,
                    rejecter: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            if animated {
                UIView.animate(withDuration: duration) {
                    // Fade out splash
                } completion: { _ in
                    resolver(nil)
                }
            } else {
                // Immediate hide
                resolver(nil)
            }
        }
    }
}

// Android - SplashScreenModule.kt

class SplashScreenModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "SplashScreenModule"

    @ReactMethod
    fun hide(animated: Boolean, duration: Int, promise: Promise) {
        currentActivity?.runOnUiThread {
            val splashView = currentActivity?.window?.decorView
                ?.findViewById&lt;View&gt;(R.id.splash_view)

            if (animated) {
                splashView?.animate()
                    ?.alpha(0f)
                    ?.setDuration(duration.toLong())
                    ?.withEndAction {
                        splashView.visibility = View.GONE
                        promise.resolve(null)
                    }
            } else {
                splashView?.visibility = View.GONE
                promise.resolve(null)
            }
        }
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Hermes bytecode precompilation:</strong>
                    <ul>
                        <li>Problem: JSC parses and compiles JS at runtime, adding 500ms+ to startup</li>
                        <li>Solution: Hermes compiles JS to bytecode at build time, loads directly into memory</li>
                        <li>Impact: 50%+ reduction in JS init time, from ~800ms to ~300ms on mid-range devices</li>
                    </ul>
                </li>
                <li><strong>Inline requires (Metro transform):</strong>
                    <ul>
                        <li>Problem: Importing a module executes its entire dependency tree immediately</li>
                        <li>Solution: Metro's inlineRequires transforms imports to be lazy - code runs only when first accessed</li>
                        <li>Impact: 30-40% reduction in JS execution time, only critical path runs at startup</li>
                    </ul>
                </li>
                <li><strong>MMKV synchronous cache reads:</strong>
                    <ul>
                        <li>Problem: AsyncStorage is async, adds await overhead during critical startup path</li>
                        <li>Solution: MMKV provides sync reads via C++ bindings, instant access to cached data</li>
                        <li>Impact: Zero async overhead for session restoration, 30x faster than AsyncStorage</li>
                    </ul>
                </li>
                <li><strong>Native splash with windowBackground:</strong>
                    <ul>
                        <li>Problem: White flash between native init and React content rendering</li>
                        <li>Solution: Set splash as windowBackground in Android styles / LaunchScreen.storyboard in iOS</li>
                        <li>Impact: Splash shows before any code runs, seamless visual experience</li>
                    </ul>
                </li>
                <li><strong>InteractionManager deferral:</strong>
                    <ul>
                        <li>Problem: Analytics, crash reporting, push init compete with render thread</li>
                        <li>Solution: InteractionManager.runAfterInteractions queues work after first frame</li>
                        <li>Impact: Main thread stays free for initial render, TTI unaffected by background tasks</li>
                    </ul>
                </li>
                <li><strong>Bundle size reduction:</strong>
                    <ul>
                        <li>Problem: Large bundles take longer to load and execute</li>
                        <li>Solution: Tree shaking, avoiding barrel imports, replacing moment.js with date-fns</li>
                        <li>Impact: 40% bundle size reduction (4MB → 2.4MB), proportional startup improvement</li>
                    </ul>
                </li>
            </ul>

            <h5>Bundle Optimization Strategy</h5>
            <pre><code>// metro.config.js - Optimized configuration
const { getDefaultConfig } = require('metro-config');

module.exports = (async () =&gt; {
    const config = await getDefaultConfig();
    return {
        ...config,
        transformer: {
            ...config.transformer,
            getTransformOptions: async () =&gt; ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,  // CRITICAL: defer module execution
                },
            }),
            minifierConfig: {
                keep_classnames: false,
                keep_fnames: false,
                mangle: true,
                toplevel: true,
            },
        },
    };
})();

// AVOID: Barrel imports load entire module tree
// BAD - loads ALL components even if you only use Button
import { Button, Input, Card } from '@ui';

// GOOD - only loads Button and its dependencies
import Button from '@ui/Button';

// Analyze bundle to find bloat:
// npx react-native-bundle-visualizer

// Common culprits to check:
// - moment.js (use date-fns or dayjs instead)
// - lodash (use lodash-es with tree shaking, or individual imports)
// - Large icon libraries (import individual icons, not entire set)
// - Unused native modules (remove from Podfile/build.gradle)</code></pre>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Splash implementation</td><td>LaunchScreen.storyboard</td><td>windowBackground drawable + SplashActivity</td></tr>
                <tr><td>Prewarming</td><td>iOS 15+ scene prewarming</td><td>Not available (use baseline profiles)</td></tr>
                <tr><td>Bytecode format</td><td>Hermes iOS binary</td><td>Hermes Android binary + baseline profiles</td></tr>
                <tr><td>Static linking</td><td>use_frameworks! :linkage =&gt; :static</td><td>N/A (dynamic by default)</td></tr>
                <tr><td>Startup tracing</td><td>Xcode Instruments</td><td>adb shell am start + systrace</td></tr>
                <tr><td>AOT compilation</td><td>Hermes bytecode</td><td>Baseline profiles (Android 7+)</td></tr>
                <tr><td>Memory measurement</td><td>Instruments Allocations</td><td>Android Profiler / adb dumpsys</td></tr>
            </table>

            <h5>iOS-Specific Optimizations</h5>
            <pre><code>// ios/AppDelegate.mm
#import "RNSplashScreen.h"

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Show splash immediately - prevents white flash
    [RNSplashScreen show];

    // Minimize modules loaded at startup
    // Only link native modules you actually use
    // Podfile: use_frameworks! :linkage =&gt; :static

    return [super application:application
        didFinishLaunchingWithOptions:launchOptions];
}

// Info.plist - Enable prewarming (iOS 15+)
// Scene-based lifecycle allows iOS to pre-launch app
&lt;key&gt;UIApplicationSceneManifest&lt;/key&gt;
&lt;dict&gt;
    &lt;key&gt;UIApplicationSupportsMultipleScenes&lt;/key&gt;
    &lt;false/&gt;
    &lt;key&gt;UISceneConfigurations&lt;/key&gt;
    &lt;dict/&gt;
&lt;/dict&gt;</code></pre>

            <h5>Android-Specific Optimizations</h5>
            <pre><code>// android/app/build.gradle
android {
    defaultConfig {
        // Hermes is enabled by default in RN 0.70+
    }

    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
        }
    }
}

// android/app/src/main/res/values/styles.xml
// Use windowBackground for instant splash
&lt;style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"&gt;
    &lt;item name="android:windowBackground"&gt;@drawable/splash&lt;/item&gt;
    &lt;item name="android:windowNoTitle"&gt;true&lt;/item&gt;
&lt;/style&gt;

// Baseline Profiles (Android 7+) - AOT for critical paths
// android/app/src/main/baseline-prof.txt
HSPLcom/facebook/react/**-&gt;**(**)**
HSPLcom/yourapp/MainActivity;-&gt;onCreate(**)</code></pre>

            <h5>Critical Path Implementation</h5>
            <pre><code>// App.tsx - Optimized startup sequence
import { useEffect, useState, Suspense, lazy } from 'react';
import { InteractionManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';

// EAGERLY import ONLY screens needed at startup
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';

// DEFER everything else - loads after app is interactive
const ProfileScreen = lazy(() =&gt; import('./screens/ProfileScreen'));
const SettingsScreen = lazy(() =&gt; import('./screens/SettingsScreen'));
const NotificationsScreen = lazy(() =&gt; import('./screens/Notifications'));

function App() {
    const [isReady, setIsReady] = useState(false);

    // MMKV reads are SYNC - no await needed
    const [hasSession] = useMMKVBoolean('hasSession');
    const [cachedUser] = useMMKVString('cachedUser');

    useEffect(() =&gt; {
        async function bootstrap() {
            const startTime = performance.now();

            // PHASE 1: Restore session from cache (INSTANT - sync read)
            if (hasSession &amp;&amp; cachedUser) {
                restoreUserFromCache(JSON.parse(cachedUser));
            }

            // PHASE 2: Fetch critical data with TIMEOUT
            // Don't let slow network block startup
            const criticalData = await Promise.race([
                fetchHomeData(),
                timeout(2000), // Proceed after 2s regardless
            ]);

            // PHASE 3: Mark ready, hide splash with animation
            setIsReady(true);
            SplashScreen.hide();

            console.log('TTI:', performance.now() - startTime, 'ms');

            // PHASE 4: Defer ALL non-critical work
            InteractionManager.runAfterInteractions(() =&gt; {
                // These run AFTER first frame renders
                initAnalytics();
                initCrashReporting();
                registerPushNotifications();
                prefetchSecondaryScreens();
                validateSessionWithServer(); // Background token refresh
            });
        }

        bootstrap();
    }, []);

    // Keep native splash visible until ready
    if (!isReady) {
        return null;
    }

    return (
        &lt;NavigationContainer&gt;
            &lt;Suspense fallback={&lt;ScreenSkeleton /&gt;}&gt;
                {hasSession ? &lt;MainNavigator /&gt; : &lt;AuthNavigator /&gt;}
            &lt;/Suspense&gt;
        &lt;/NavigationContainer&gt;
    );
}</code></pre>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>First launch (no cache):</strong> Show skeleton UI immediately, don't block on network. Use default/empty state until data arrives.</li>
                <li><strong>Expired session token:</strong> Show home with cached data, background token refresh. Only redirect to login if refresh fails.</li>
                <li><strong>Slow/no network:</strong> Set 2s timeout on critical data fetch. Proceed with cached data. Show "offline mode" indicator if needed.</li>
                <li><strong>App update (cache schema mismatch):</strong> Version-stamp cache keys. Clear incompatible cache on version bump. Re-fetch fresh data.</li>
                <li><strong>Low-end devices:</strong> Test on budget phones (2GB RAM). Reduce skeleton animations. Increase timeouts. Consider "lite mode".</li>
                <li><strong>Debug vs Release builds:</strong> ALWAYS measure startup in Release mode. Dev builds are 5-10x slower due to debugging overhead.</li>
                <li><strong>Deep link at startup:</strong> Queue deep link, resolve after bootstrap completes. Don't interrupt startup sequence.</li>
                <li><strong>Feature flag fetch failure:</strong> Use cached flags with TTL. Fall back to defaults if cache is stale. Don't block startup.</li>
                <li><strong>Crash during startup:</strong> Implement startup crash detection (count rapid crashes). Offer "safe mode" with cleared cache.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>JS Engine</td><td>Hermes</td><td>JSC (JavaScriptCore)</td><td>Bytecode precompilation, 50% faster startup</td></tr>
                <tr><td>Cache storage</td><td>MMKV</td><td>AsyncStorage</td><td>Sync reads critical for startup, 30x faster</td></tr>
                <tr><td>Module loading</td><td>Inline requires</td><td>Eager loading</td><td>Only critical path executes at startup</td></tr>
                <tr><td>Splash strategy</td><td>Native windowBackground</td><td>JS-rendered splash</td><td>Shows before any code runs, no white flash</td></tr>
                <tr><td>Data fetching</td><td>Timeout + cache fallback</td><td>Block until complete</td><td>Guarantees &lt;2s startup regardless of network</td></tr>
                <tr><td>Code splitting</td><td>React.lazy</td><td>Re.Pack true splitting</td><td>Simpler setup, adequate for most apps</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Startup Time Tests:</strong>
                    <ul>
                        <li>Automated cold start measurement on CI (iOS Simulator, Android Emulator)</li>
                        <li>Real device testing on min-spec hardware (budget Android phones)</li>
                        <li>Regression alerts if startup exceeds threshold (2s cold, 500ms warm)</li>
                    </ul>
                </li>
                <li><strong>Cache Scenario Tests:</strong>
                    <ul>
                        <li>First launch (no cache) - verify skeleton shows, no crashes</li>
                        <li>Expired session - verify background refresh, no login redirect</li>
                        <li>Corrupted cache - verify graceful recovery, cache cleared</li>
                    </ul>
                </li>
                <li><strong>Network Condition Tests:</strong>
                    <ul>
                        <li>Offline startup - verify cached content displays</li>
                        <li>Slow network (3G throttled) - verify timeout works</li>
                        <li>Network failure - verify error handling, retry option</li>
                    </ul>
                </li>
                <li><strong>Performance Profiling:</strong>
                    <ul>
                        <li>Flipper Performance plugin for JS-side metrics</li>
                        <li>Xcode Instruments for iOS native profiling</li>
                        <li>Android Profiler for Android native profiling</li>
                        <li>Bundle size analysis on each release</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: How do you measure startup time accurately?</strong><br/>A: Use platform-native tools: Xcode Instruments (Time Profiler) for iOS, adb shell am start-activity with -W flag for Android. For JS-side, use performance.now() marks. Always measure in RELEASE mode - dev builds have 5-10x overhead from debugging.</li>
                <li><strong>Q: Hermes vs JSC - what's the difference?</strong><br/>A: Hermes precompiles JS to bytecode at build time - no parsing at runtime. JSC interprets and JIT-compiles at runtime. Hermes trades peak performance for startup speed and memory. For most RN apps, Hermes is 50% faster to start.</li>
                <li><strong>Q: Can you do true code splitting in React Native?</strong><br/>A: React.lazy enables lazy loading but bundles are still monolithic. True code splitting requires Re.Pack (webpack for RN) which produces separate chunks loaded on demand. Most apps don't need this complexity.</li>
                <li><strong>Q: What are inline requires and why do they help?</strong><br/>A: Metro's inlineRequires transforms import statements to defer module execution until first use. Without it, importing any module executes its entire dependency tree. With it, only code that's actually called during startup runs.</li>
                <li><strong>Q: How do you handle deep links during startup?</strong><br/>A: Queue the deep link URL, complete normal bootstrap, then navigate. Don't try to handle deep links before the app is ready - it causes race conditions and crashes. React Navigation's linking config handles this automatically if configured correctly.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Splash Screen</td><td>react-native-splash-screen / expo-splash-screen</td><td>Smooth transition, no white flash, native implementation</td></tr>
                <tr><td>Fast Storage</td><td>react-native-mmkv</td><td>Sync reads during startup, 30x faster than AsyncStorage</td></tr>
                <tr><td>Bundle Analysis</td><td>react-native-bundle-visualizer</td><td>Identify large dependencies, find optimization targets</td></tr>
                <tr><td>JS Engine</td><td>Hermes (built-in)</td><td>Bytecode precompilation, faster startup, lower memory</td></tr>
                <tr><td>Navigation</td><td>@react-navigation/native</td><td>Lazy screen loading, deep link handling built-in</td></tr>
                <tr><td>Performance</td><td>Flipper + react-native-performance</td><td>Measure startup metrics, identify bottlenecks</td></tr>
                <tr><td>Feature Flags</td><td>LaunchDarkly / Firebase Remote Config</td><td>Cache flags locally, async refresh</td></tr>
            </table>
        `
     },
    {
        id: 74,
        category: "System Design",
        icon: "🏛️",
        question: "Design a system to handle large lists with complex cells containing images, videos, and interactive elements",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>List Size:</strong> How many items total? Is it infinite scroll or fixed? What's the expected maximum items in memory?</li>
                <li><strong>Cell Complexity:</strong> What types of content in cells? Images, videos, carousels, interactive elements? Variable or fixed heights?</li>
                <li><strong>Video Behavior:</strong> Auto-play when visible? How many videos can play simultaneously? Muted by default?</li>
                <li><strong>Interactions:</strong> What actions can users perform? Like, comment, share? Do these need optimistic updates?</li>
                <li><strong>Target Devices:</strong> What's the minimum device spec? How should we degrade on low-end devices?</li>
                <li><strong>Offline Support:</strong> Should content be cached? Can users interact while offline?</li>
                <li><strong>Performance Targets:</strong> What FPS is acceptable? Maximum memory budget? Frame drop tolerance?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Render infinite-scrolling feed with 10,000+ items without memory issues</li>
                <li>Support mixed cell types: images, videos, carousels, text-only posts</li>
                <li>Auto-play videos when 60%+ visible, pause when scrolled away</li>
                <li>Interactive elements: likes, comments, shares with instant visual feedback</li>
                <li>Pull-to-refresh and infinite scroll pagination with cursor-based loading</li>
                <li>Smooth scroll performance at consistent 60fps on mid-range devices</li>
                <li>Show blurhash placeholders during image loading (no white boxes)</li>
                <li>Support deep scroll jump (scroll to specific item by ID)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Memory footprint under 150MB with 100 items in render buffer</li>
                <li>Frame drops &lt; 5% during fast scrolling (measure with systrace)</li>
                <li>Initial render under 100ms for first 10 items (Time to Interactive)</li>
                <li>Graceful degradation on low-end devices (reduce video quality, simpler animations)</li>
                <li>Image cache: 100MB memory + 500MB disk</li>
                <li>Maximum 3 video player instances active at once</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Content creation/upload flow</li>
                <li>Full-screen video player</li>
                <li>Comment thread UI (separate screen)</li>
                <li>User profile screens</li>
                <li>Backend API design</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     COMPLEX LIST ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    UI LAYER (React Native)                  ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ ││
│  │  │  FlashList  │  │ Visibility  │  │ Cell Type Registry  │ ││
│  │  │  (Recycler) │  │   Manager   │  │  (Factory Pattern)  │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ ││
│  └─────────┼────────────────┼───────────────────┼──────────────┘│
│            │                │                   │                │
│  ┌─────────▼────────────────▼───────────────────▼──────────────┐│
│  │                   CELL COMPONENTS                           ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   ││
│  │  │ImageCell │ │VideoCell │ │Carousel  │ │  TextCell    │   ││
│  │  │(expo-img)│ │(rn-video)│ │  Cell    │ │              │   ││
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘   ││
│  └───────┼────────────┼────────────┼──────────────┼────────────┘│
│          │            │            │              │              │
│  ┌───────▼────────────▼────────────▼──────────────▼────────────┐│
│  │                   MEDIA MANAGEMENT                          ││
│  │  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐ ││
│  │  │  Image Cache    │  │ Video Player │  │ Blurhash       │ ││
│  │  │  (Memory+Disk)  │  │ Pool (3 max) │  │ Placeholders   │ ││
│  │  └─────────────────┘  └──────────────┘  └────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   DATA LAYER                                ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ TanStack Query │  │ Optimistic     │  │ Interaction   │ ││
│  │  │ (Infinite)     │  │ Updates Store  │  │ State (Zustand)│ ││
│  │  └────────────────┘  └────────────────┘  └───────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>FlashList</td><td>Virtualized list rendering with cell recycling</td><td>@shopify/flash-list</td></tr>
                <tr><td>Visibility Manager</td><td>Track which cells are visible for video autoplay</td><td>viewabilityConfig + callback</td></tr>
                <tr><td>Cell Type Registry</td><td>Map post type to cell component (factory pattern)</td><td>getItemType + renderItem switch</td></tr>
                <tr><td>Image Cache</td><td>Memory + disk caching with blurhash placeholders</td><td>expo-image</td></tr>
                <tr><td>Video Player Pool</td><td>Reuse limited video player instances</td><td>react-native-video + native pool</td></tr>
                <tr><td>Optimistic Updates</td><td>Instant UI feedback for interactions</td><td>TanStack Query + Zustand</td></tr>
                <tr><td>Infinite Query</td><td>Cursor-based pagination with caching</td><td>TanStack Query useInfiniteQuery</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Scrolls Down                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐    onEndReached    ┌──────────────────────┐│
│  │   FlashList     │ ─────────────────► │  TanStack Query      ││
│  │   (Recycler)    │                    │  fetchNextPage()     ││
│  └────────┬────────┘                    └───────────┬──────────┘│
│           │                                         │            │
│           │ onViewableItemsChanged                  │ API Call   │
│           ▼                                         ▼            │
│  ┌─────────────────┐                    ┌──────────────────────┐│
│  │ Visibility      │                    │  Backend Server      ││
│  │ Manager         │                    │  (Cursor Pagination) ││
│  └────────┬────────┘                    └───────────┬──────────┘│
│           │                                         │            │
│           │ visibleIds (Set)                        │ Posts[]    │
│           ▼                                         ▼            │
│  ┌─────────────────┐                    ┌──────────────────────┐│
│  │ Video Cells     │◄───────────────────│  Query Cache         ││
│  │ (play/pause)    │    Re-render       │  (Merged Pages)      ││
│  └─────────────────┘                    └──────────────────────┘│
│                                                                  │
│  User Likes Post:                                                │
│  ┌─────────┐    ┌─────────────┐    ┌─────────┐    ┌───────────┐│
│  │ Tap     │───►│ Optimistic  │───►│ Zustand │───►│ Re-render ││
│  │ Like    │    │ Update      │    │ Store   │    │ Cell      ││
│  └─────────┘    └──────┬──────┘    └─────────┘    └───────────┘│
│                        │                                         │
│                        ▼ Background                              │
│               ┌────────────────┐                                │
│               │ API: POST /like │                                │
│               │ (reconcile)     │                                │
│               └────────────────┘                                │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>FlashList over FlatList:</strong> Cell recycling by type (getItemType) eliminates unmount/remount overhead. 5-10x faster for large lists. Native RecyclerView/UICollectionView under the hood.</li>
                <li><strong>Video Player Pooling:</strong> Max 3 native video players, swap content instead of creating new instances. Avoids memory bloat with video-heavy feeds. Pool managed by native module.</li>
                <li><strong>Cursor-based Pagination:</strong> Stable pagination when new posts added at top. No duplicate items like offset pagination. Essential for real-time feeds.</li>
                <li><strong>Optimistic Updates:</strong> Update like count immediately in Zustand, reconcile with server response. Perceived instant feedback. Rollback on failure.</li>
                <li><strong>Blurhash Placeholders:</strong> Show content preview instantly (from API). Smooth crossfade to actual image. Zero layout shift (aspect ratio known).</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/feed.ts

/** Cell types supported in the feed */
type CellType = 'image' | 'video' | 'carousel' | 'text';

/** Author information displayed in post header */
interface Author {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
}

/** Base post properties shared by all cell types */
interface BasePost {
    id: string;
    type: CellType;
    author: Author;
    createdAt: string;              // ISO timestamp
    likeCount: number;
    commentCount: number;
    shareCount: number;
    isLiked: boolean;               // Current user's like status
    isBookmarked: boolean;
    caption: string;
    hashtags: string[];
    mentions: string[];
}

/** Image post with blurhash placeholder */
interface ImagePost extends BasePost {
    type: 'image';
    imageUrl: string;
    blurhash: string;               // Base83 encoded placeholder
    aspectRatio: number;            // height/width for layout
    width: number;
    height: number;
}

/** Video post with thumbnail and duration */
interface VideoPost extends BasePost {
    type: 'video';
    videoUrl: string;
    thumbnailUrl: string;
    blurhash: string;
    duration: number;               // Seconds
    aspectRatio: number;
    hasAudio: boolean;
}

/** Carousel with multiple media items */
interface CarouselPost extends BasePost {
    type: 'carousel';
    media: Array&lt;{
        id: string;
        url: string;
        type: 'image' | 'video';
        aspectRatio: number;
        blurhash: string;
        duration?: number;          // For videos
    }&gt;;
}

/** Text-only post */
interface TextPost extends BasePost {
    type: 'text';
    backgroundColor: string;        // For styled text posts
    textColor: string;
}

/** Union type for all post types */
type Post = ImagePost | VideoPost | CarouselPost | TextPost;

/** Paginated feed response from API */
interface FeedPage {
    posts: Post[];
    nextCursor: string | null;      // Null when no more pages
    hasMore: boolean;
}

/** Cell height estimates for FlashList layout */
const CELL_HEIGHTS: Record&lt;CellType, number&gt; = {
    image: 500,
    video: 600,
    carousel: 550,
    text: 200,
};

/** Interaction state for optimistic updates */
interface InteractionState {
    likedPosts: Set&lt;string&gt;;        // Post IDs user has liked
    bookmarkedPosts: Set&lt;string&gt;;   // Post IDs user has bookmarked
    mutedPosts: Set&lt;string&gt;;        // Post IDs user has muted
    pendingLikes: Map&lt;string, 'like' | 'unlike'&gt;;  // In-flight requests
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    FEED DATA RELATIONSHIPS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FeedPage (1) ─────────── contains ─────────► Post (N)          │
│       │                                           │              │
│       └── nextCursor ───► FeedPage (next)         │              │
│                                                   │              │
│                                                   ▼              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Post (discriminated union by type)                         ││
│  │       │                                                      ││
│  │       ├── ImagePost ─── imageUrl, blurhash, aspectRatio     ││
│  │       │                                                      ││
│  │       ├── VideoPost ─── videoUrl, thumbnailUrl, duration    ││
│  │       │                                                      ││
│  │       ├── CarouselPost ─── media[] (1:N)                    ││
│  │       │                                                      ││
│  │       └── TextPost ─── backgroundColor, textColor           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Post (N) ─────────── authored by ─────────► Author (1)         │
│                                                                  │
│  Post (N) ◄────────── interactions ──────── InteractionState    │
│                       (likedPosts, bookmarkedPosts)              │
│                                                                  │
│  CarouselPost.media (N) ── can be ──► 'image' | 'video'         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Feed pages</td><td>TanStack Query cache (memory)</td><td>Automatic invalidation, pagination support</td></tr>
                <tr><td>Interaction state</td><td>Zustand + MMKV persist</td><td>Fast reads, survives restart</td></tr>
                <tr><td>Images</td><td>expo-image cache (memory + disk)</td><td>100MB memory, 500MB disk limit</td></tr>
                <tr><td>Video thumbnails</td><td>Same as images</td><td>Shared cache, same behavior</td></tr>
                <tr><td>Video content</td><td>Not cached (streamed)</td><td>Too large, bandwidth concerns</td></tr>
                <tr><td>Blurhash placeholders</td><td>In post data (API response)</td><td>Tiny payload, instant display</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Location</th><th>Rationale</th></tr>
                <tr><td>Feed data (posts)</td><td>TanStack Query</td><td>Server state, auto-refetch, pagination</td></tr>
                <tr><td>Like/bookmark state</td><td>Zustand store</td><td>Optimistic updates, cross-component sync</td></tr>
                <tr><td>Visible items</td><td>Local state (useState)</td><td>Ephemeral, only needed for video control</td></tr>
                <tr><td>Mute state</td><td>Zustand store</td><td>Shared across all video cells</td></tr>
                <tr><td>Scroll position</td><td>FlashList internal</td><td>Managed by virtualization library</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Feed List Component API</h5>
            <pre><code>// components/Feed.tsx

interface FeedProps {
    /** Query key for the feed (e.g., ['feed', 'home'] or ['feed', 'user', userId]) */
    queryKey: QueryKey;

    /** API function to fetch a page */
    fetchPage: (cursor: string | null) =&gt; Promise&lt;FeedPage&gt;;

    /** Header component (e.g., stories row) */
    ListHeaderComponent?: React.ComponentType;

    /** Empty state component */
    ListEmptyComponent?: React.ComponentType;

    /** Callback when user taps a post */
    onPostPress?: (postId: string) =&gt; void;

    /** Callback when user taps author avatar/name */
    onAuthorPress?: (authorId: string) =&gt; void;

    /** Enable/disable pull-to-refresh */
    enableRefresh?: boolean;

    /** Test ID for E2E testing */
    testID?: string;
}

/**
 * Virtualized feed list with infinite scroll, video autoplay,
 * and optimistic updates for interactions.
 */
export function Feed(props: FeedProps): JSX.Element;</code></pre>

            <h5>Cell Component APIs</h5>
            <pre><code>// components/cells/ImageCell.tsx

interface ImageCellProps {
    /** The image post data */
    post: ImagePost;

    /** Whether this cell is currently visible (for analytics) */
    isVisible: boolean;

    /** Callback when like button tapped */
    onLike: () =&gt; void;

    /** Callback when post tapped (navigate to detail) */
    onPress: () =&gt; void;
}

/**
 * Image post cell with blurhash placeholder, like/comment actions.
 * Memoized to prevent unnecessary re-renders during scroll.
 */
export const ImageCell = memo(function ImageCell(props: ImageCellProps): JSX.Element);

// components/cells/VideoCell.tsx

interface VideoCellProps {
    /** The video post data */
    post: VideoPost;

    /** Whether this cell is visible (controls play/pause) */
    isVisible: boolean;

    /** Whether video should play (false if another video is playing) */
    isActive: boolean;

    /** Global mute state */
    isMuted: boolean;

    /** Toggle mute callback */
    onToggleMute: () =&gt; void;

    /** Callback when like button tapped */
    onLike: () =&gt; void;
}

/**
 * Video post cell with autoplay when visible, mute toggle,
 * and thumbnail poster during loading.
 */
export const VideoCell = memo(function VideoCell(props: VideoCellProps): JSX.Element);</code></pre>

            <h5>Visibility Manager Hook</h5>
            <pre><code>// hooks/useVisibilityManager.ts

interface UseVisibilityManagerReturn {
    /** Set of currently visible item IDs */
    visibleItems: Set&lt;string&gt;;

    /** ID of the topmost visible video (for autoplay) */
    activeVideoId: string | null;

    /** viewabilityConfig for FlashList */
    viewabilityConfig: ViewabilityConfig;

    /** Callback for FlashList onViewableItemsChanged */
    onViewableItemsChanged: (info: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) =&gt; void;
}

/**
 * Manages visibility tracking for video autoplay.
 * Only one video plays at a time (topmost visible).
 */
export function useVisibilityManager(): UseVisibilityManagerReturn;</code></pre>

            <h5>Interaction Store API</h5>
            <pre><code>// stores/interactionStore.ts

interface InteractionStore {
    /** Posts the user has liked */
    likedPosts: Set&lt;string&gt;;

    /** Posts the user has bookmarked */
    bookmarkedPosts: Set&lt;string&gt;;

    /** Global video mute state */
    isMuted: boolean;

    /** Optimistically like a post */
    likePost: (postId: string) =&gt; void;

    /** Optimistically unlike a post */
    unlikePost: (postId: string) =&gt; void;

    /** Toggle bookmark on a post */
    toggleBookmark: (postId: string) =&gt; void;

    /** Toggle global mute */
    toggleMute: () =&gt; void;

    /** Sync interaction state with server response */
    reconcile: (postId: string, serverState: { isLiked: boolean; likeCount: number }) =&gt; void;
}

/**
 * Zustand store for interaction state with MMKV persistence.
 */
export const useInteractionStore = create&lt;InteractionStore&gt;(...);</code></pre>

            <h5>Native Video Player Pool API</h5>
            <pre><code>// native/VideoPlayerPool (iOS - Swift)

/// Pool of reusable AVPlayer instances for efficient video playback
@objc class VideoPlayerPool: NSObject {

    /// Maximum number of players in the pool
    static let maxPlayers = 3

    /// Get an available player or create/recycle one
    @objc func getPlayer() -&gt; AVPlayer

    /// Return a player to the pool when cell unmounts
    @objc func releasePlayer(_ player: AVPlayer)

    /// Pause all players (e.g., when app backgrounds)
    @objc func pauseAll()

    /// Release all players (memory pressure)
    @objc func releaseAll()
}

// native/VideoPlayerPool (Android - Kotlin)

object VideoPlayerPool {
    private const val MAX_PLAYERS = 3

    /** Get an available player or create/recycle one */
    fun getPlayer(context: Context): ExoPlayer

    /** Return a player to the pool when cell unmounts */
    fun releasePlayer(player: ExoPlayer)

    /** Pause all players (e.g., when app backgrounds) */
    fun pauseAll()

    /** Release all players (memory pressure) */
    fun releaseAll()
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Cell recycling with getItemType:</strong>
                    <ul>
                        <li>Problem: Creating new cell instances on scroll causes jank and memory churn</li>
                        <li>Solution: FlashList recycles cells by type - video cells reused for videos, image cells for images</li>
                        <li>Impact: 60% memory reduction, consistent 60fps scroll, 5x faster than FlatList</li>
                    </ul>
                </li>
                <li><strong>Video player pooling:</strong>
                    <ul>
                        <li>Problem: Creating native video players is expensive (300ms+), destroys on unmount</li>
                        <li>Solution: Pool of 3 AVPlayer/ExoPlayer instances, swap content instead of recreating</li>
                        <li>Impact: Instant video playback, 70% memory reduction for video-heavy feeds</li>
                    </ul>
                </li>
                <li><strong>Blurhash placeholders:</strong>
                    <ul>
                        <li>Problem: White boxes or spinners during image loading creates visual noise</li>
                        <li>Solution: API returns 20-character blurhash, render instantly, crossfade to real image</li>
                        <li>Impact: Zero perceived loading time, no layout shifts (aspect ratio in payload)</li>
                    </ul>
                </li>
                <li><strong>Pause loading during fling:</strong>
                    <ul>
                        <li>Problem: Loading images during fast scroll wastes bandwidth, causes jank</li>
                        <li>Solution: Detect scroll state, pause Glide/SDWebImage requests during SCROLL_STATE_SETTLING</li>
                        <li>Impact: Smoother fast scroll, 40% less wasted bandwidth</li>
                    </ul>
                </li>
                <li><strong>Optimistic like updates:</strong>
                    <ul>
                        <li>Problem: Waiting for server response makes UI feel sluggish (200-500ms delay)</li>
                        <li>Solution: Update Zustand store immediately, animate heart, reconcile with server async</li>
                        <li>Impact: Perceived instant response, 100% faster interaction feedback</li>
                    </ul>
                </li>
            </ul>

            <h5>Feed Implementation</h5>
            <pre><code>// components/Feed.tsx
import { FlashList, ViewToken } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';

export function Feed({ queryKey, fetchPage, ...props }: FeedProps) {
    const { data, fetchNextPage, hasNextPage, refetch, isRefetching } =
        useInfiniteQuery({
            queryKey,
            queryFn: ({ pageParam }) =&gt; fetchPage(pageParam ?? null),
            getNextPageParam: (lastPage) =&gt; lastPage.nextCursor,
            staleTime: 5 * 60 * 1000,  // 5 minutes
        });

    const posts = useMemo(
        () =&gt; data?.pages.flatMap(page =&gt; page.posts) ?? [],
        [data]
    );

    const { visibleItems, activeVideoId, viewabilityConfig, onViewableItemsChanged } =
        useVisibilityManager();

    const isMuted = useInteractionStore(state =&gt; state.isMuted);

    const renderItem = useCallback(
        ({ item }: { item: Post }) =&gt; {
            const isVisible = visibleItems.has(item.id);

            switch (item.type) {
                case 'image':
                    return &lt;ImageCell post={item} isVisible={isVisible} /&gt;;
                case 'video':
                    return (
                        &lt;VideoCell
                            post={item}
                            isVisible={isVisible}
                            isActive={activeVideoId === item.id}
                            isMuted={isMuted}
                        /&gt;
                    );
                case 'carousel':
                    return &lt;CarouselCell post={item} isVisible={isVisible} /&gt;;
                case 'text':
                    return &lt;TextCell post={item} /&gt;;
            }
        },
        [visibleItems, activeVideoId, isMuted]
    );

    const onEndReached = useCallback(() =&gt; {
        if (hasNextPage) fetchNextPage();
    }, [hasNextPage, fetchNextPage]);

    return (
        &lt;FlashList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item =&gt; item.id}
            getItemType={item =&gt; item.type}
            estimatedItemSize={450}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            refreshing={isRefetching}
            onRefresh={refetch}
            drawDistance={500}
            overrideItemLayout={(layout, item) =&gt; {
                layout.size = CELL_HEIGHTS[item.type];
            }}
            {...props}
        /&gt;
    );
}</code></pre>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>List implementation</td><td>UICollectionView (native)</td><td>RecyclerView (native)</td></tr>
                <tr><td>Image loading</td><td>SDWebImage via expo-image</td><td>Glide via expo-image</td></tr>
                <tr><td>Video player</td><td>AVPlayer (pool of 3)</td><td>ExoPlayer (pool of 3)</td></tr>
                <tr><td>Scroll physics</td><td>contentInsetAdjustmentBehavior</td><td>nestedScrollingEnabled</td></tr>
                <tr><td>Fling detection</td><td>scrollViewWillEndDragging</td><td>SCROLL_STATE_SETTLING</td></tr>
                <tr><td>Memory warning</td><td>didReceiveMemoryWarning</td><td>onTrimMemory</td></tr>
            </table>

            <h5>Native iOS Video Pool</h5>
            <pre><code>// ios/VideoPlayerPool.swift

@objc class VideoPlayerPool: NSObject {
    static let shared = VideoPlayerPool()
    private var players: [AVPlayer] = []
    private let maxPlayers = 3

    @objc func getPlayer() -&gt; AVPlayer {
        // Return available player
        if let available = players.first(where: { $0.currentItem == nil }) {
            return available
        }

        // Create new if under limit
        if players.count &lt; maxPlayers {
            let player = AVPlayer()
            player.automaticallyWaitsToMinimizeStalling = false
            players.append(player)
            return player
        }

        // Recycle oldest player
        let player = players.removeFirst()
        player.replaceCurrentItem(with: nil)
        players.append(player)
        return player
    }

    @objc func releasePlayer(_ player: AVPlayer) {
        player.pause()
        player.replaceCurrentItem(with: nil)
    }

    @objc func pauseAll() {
        players.forEach { $0.pause() }
    }
}</code></pre>

            <h5>Native Android Video Pool</h5>
            <pre><code>// android/VideoPlayerPool.kt

object VideoPlayerPool {
    private val players = mutableListOf&lt;ExoPlayer&gt;()
    private const val MAX_PLAYERS = 3

    fun getPlayer(context: Context): ExoPlayer {
        synchronized(this) {
            // Return available player
            players.find { !it.isPlaying }?.let { return it }

            // Create new if under limit
            if (players.size &lt; MAX_PLAYERS) {
                val player = ExoPlayer.Builder(context)
                    .setLoadControl(
                        DefaultLoadControl.Builder()
                            .setBufferDurationsMs(2000, 5000, 1000, 1000)
                            .build()
                    )
                    .build()
                players.add(player)
                return player
            }

            // Recycle oldest
            return players.removeAt(0).also {
                it.stop()
                it.clearMediaItems()
                players.add(it)
            }
        }
    }

    fun pauseAll() {
        players.forEach { it.pause() }
    }
}</code></pre>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Rapid scrolling:</strong> Pause image/video loading during fling (SCROLL_STATE_SETTLING), resume on idle. Prevents wasted bandwidth and jank.</li>
                <li><strong>Memory pressure:</strong> Listen for didReceiveMemoryWarning (iOS) / onTrimMemory (Android). Release all video players, reduce image cache size.</li>
                <li><strong>Orientation changes:</strong> Recalculate cell heights based on new screen width. Use maintainVisibleContentPosition to preserve scroll position.</li>
                <li><strong>Network degradation:</strong> Show cached thumbnails for videos. Queue prefetch for next page. Display "offline mode" banner.</li>
                <li><strong>Multiple videos visible:</strong> Only play topmost video (first in viewableItems array). Others show thumbnail with play icon.</li>
                <li><strong>Deep scroll jump:</strong> Use scrollToIndex for navigation. Pre-calculate item offsets if heights are variable.</li>
                <li><strong>Tab switch:</strong> Pause all videos when screen loses focus. Resume active video when returning.</li>
                <li><strong>Corrupted media:</strong> Show error placeholder image. Log to analytics. Retry button for user recovery.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>List component</td><td>FlashList</td><td>FlatList</td><td>5x faster, cell recycling, better memory</td></tr>
                <tr><td>Pagination</td><td>Cursor-based</td><td>Offset-based</td><td>Stable with new posts, no duplicates</td></tr>
                <tr><td>Image library</td><td>expo-image</td><td>FastImage</td><td>Better maintained, blurhash built-in, transitions</td></tr>
                <tr><td>Video pooling</td><td>Native pool (3)</td><td>Create/destroy</td><td>Instant playback, 70% less memory</td></tr>
                <tr><td>State for likes</td><td>Zustand</td><td>Query cache mutation</td><td>Faster optimistic updates, persisted</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>Scroll 10,000 items with Perf Monitor enabled, verify &lt;5% frame drops</li>
                        <li>Monitor memory with Flipper, ensure &lt;150MB at 100 items in buffer</li>
                        <li>Measure initial render time with systrace, target &lt;100ms for 10 items</li>
                    </ul>
                </li>
                <li><strong>Video Behavior Tests:</strong>
                    <ul>
                        <li>Verify only one video plays at a time during scroll</li>
                        <li>Test video pause on app background, resume on foreground</li>
                        <li>Test mute state persists across sessions</li>
                    </ul>
                </li>
                <li><strong>Interaction Tests:</strong>
                    <ul>
                        <li>Like/unlike rapid tapping, verify no duplicate requests</li>
                        <li>Test optimistic update rollback on server error</li>
                        <li>Verify like state syncs across devices</li>
                    </ul>
                </li>
                <li><strong>Edge Case Tests:</strong>
                    <ul>
                        <li>Memory pressure simulation, verify graceful degradation</li>
                        <li>Offline mode, verify cached content displays</li>
                        <li>Deep scroll jump, verify smooth transition</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why FlashList over FlatList?</strong><br/>A: FlashList recycles cells by type (getItemType), uses native RecyclerView/UICollectionView under the hood, and handles variable heights better. It's 5x faster for large lists because it doesn't create new JS objects on scroll - it reuses them.</li>
                <li><strong>Q: How does video player pooling work?</strong><br/>A: Maintain a pool of 3 native AVPlayer/ExoPlayer instances. When a video cell mounts, grab an available player and swap in the video URL. When it unmounts, return the player to the pool instead of destroying it. Avoids 300ms+ creation overhead per video.</li>
                <li><strong>Q: How do you determine which video to play?</strong><br/>A: Use onViewableItemsChanged with viewabilityConfig (60% visible, 300ms minimum view time). Filter viewableItems for video posts, take the first one (topmost). Store active video ID in state, pass to VideoCell to control paused prop.</li>
                <li><strong>Q: How do optimistic updates work for likes?</strong><br/>A: Update Zustand store immediately on tap (likedPosts.add(postId)). Trigger like animation. Send API request in background. On success, reconcile counts. On failure, rollback (likedPosts.delete(postId)) and show error toast.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>List Virtualization</td><td>@shopify/flash-list</td><td>5x faster than FlatList, cell recycling, memory efficient</td></tr>
                <tr><td>Image Loading</td><td>expo-image</td><td>Blurhash, memory-disk cache, smooth transitions, recyclingKey</td></tr>
                <tr><td>Video Playback</td><td>react-native-video v6</td><td>Native players, buffer config, poster support</td></tr>
                <tr><td>Server State</td><td>TanStack Query v5</td><td>Infinite queries, background refetch, stale-while-revalidate</td></tr>
                <tr><td>Client State</td><td>Zustand</td><td>Lightweight, persist middleware, optimistic updates</td></tr>
                <tr><td>Animations</td><td>Reanimated 3</td><td>JS thread-free animations for like hearts, etc.</td></tr>
                <tr><td>Profiling</td><td>Flipper + Perf Monitor</td><td>Memory tracking, frame rate monitoring, network inspector</td></tr>
            </table>
        `
     },
    {
        id: 75,
        category: "System Design",
        icon: "🏛️",
        question: "Design a note-taking app (like Notion) that works fully offline and syncs when online",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Content Types:</strong> What kinds of content? Text, images, files, embedded media, databases/tables? Is rich text formatting required?</li>
                <li><strong>Collaboration:</strong> Single-user or multi-user? Real-time collaboration or async sync? How many concurrent editors?</li>
                <li><strong>Offline Duration:</strong> How long might users be offline? Hours, days, weeks? What's the expected data volume during offline?</li>
                <li><strong>Conflict Handling:</strong> How should conflicts be resolved? Automatic merge, last-write-wins, or manual resolution UI?</li>
                <li><strong>Sync Scope:</strong> Full sync or selective sync? Should users choose which notebooks sync offline?</li>
                <li><strong>Device Types:</strong> Phone, tablet, desktop, web? Should sync work across all platforms?</li>
                <li><strong>Data Sensitivity:</strong> Is end-to-end encryption required? Are there compliance requirements (HIPAA, GDPR)?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Create, edit, delete pages with block-based content (text, headings, lists, images, code blocks)</li>
                <li>Nested page hierarchy (pages within pages, unlimited depth)</li>
                <li>Full offline editing capability with zero data loss guarantee</li>
                <li>Automatic sync when connectivity returns (push local changes, pull remote changes)</li>
                <li>Conflict detection and resolution for concurrent edits across devices</li>
                <li>Cross-device sync (phone, tablet, web) with consistent data</li>
                <li>Search across all pages (including offline content)</li>
                <li>Support for embedded images and file attachments</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Local edits persisted within 100ms (instant save feel)</li>
                <li>Sync latency under 2s when reconnecting after offline period</li>
                <li>Handle 10,000+ pages with 100+ blocks each without performance degradation</li>
                <li>Battery-efficient background sync (15-30 minute intervals)</li>
                <li>Cold start to usable editor &lt; 1 second</li>
                <li>Offline database size &lt; 500MB for typical user (10K pages)</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Real-time collaborative cursor/selection visibility</li>
                <li>Version history UI (view past versions)</li>
                <li>Sharing/permissions management</li>
                <li>Templates and integrations</li>
                <li>Export functionality</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                 OFFLINE-FIRST NOTE APP ARCHITECTURE              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    UI LAYER (React Native)                  ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ ││
│  │  │ Page Editor │  │ Block       │  │ Navigation Tree     │ ││
│  │  │ (Rich Text) │  │ Renderer    │  │ (Nested Pages)      │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ ││
│  └─────────┼────────────────┼───────────────────┼──────────────┘│
│            │                │                   │                │
│  ┌─────────▼────────────────▼───────────────────▼──────────────┐│
│  │                  STATE &amp; SYNC LAYER                         ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ Zustand Store  │  │ Sync Engine    │  │ Operation Log │ ││
│  │  │ (UI State)     │  │ (Push/Pull)    │  │ (Change Queue)│ ││
│  │  └────────┬───────┘  └────────┬───────┘  └───────┬───────┘ ││
│  └───────────┼──────────────────┼──────────────────┼───────────┘│
│              │                  │                  │             │
│  ┌───────────▼──────────────────▼──────────────────▼───────────┐│
│  │                  LOCAL PERSISTENCE                          ││
│  │  ┌───────────────────────────────────────────────────────┐ ││
│  │  │              WatermelonDB (SQLite)                    │ ││
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │ ││
│  │  │  │ pages   │  │ blocks  │  │ assets  │  │ sync_log│  │ ││
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  │ ││
│  │  └───────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼ (When Online)                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    CLOUD SYNC                               ││
│  │  ┌────────────────┐      ┌────────────────────────────────┐││
│  │  │ Sync API       │ ◄──► │ Backend (PostgreSQL + Redis)   │││
│  │  │ (REST + WS)    │      │ Operation Transform Server     │││
│  │  └────────────────┘      └────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Page Editor</td><td>Block-based rich text editing interface</td><td>Custom React Native + Reanimated</td></tr>
                <tr><td>Block Renderer</td><td>Render different block types (text, heading, list, image)</td><td>Memoized components</td></tr>
                <tr><td>Navigation Tree</td><td>Display nested page hierarchy, quick navigation</td><td>FlashList + recursive rendering</td></tr>
                <tr><td>Sync Engine</td><td>Orchestrate push/pull, conflict detection, retry logic</td><td>Custom service class</td></tr>
                <tr><td>Operation Log</td><td>Track local changes for sync, enable offline edits</td><td>WatermelonDB operations table</td></tr>
                <tr><td>WatermelonDB</td><td>Local SQLite database with reactive queries</td><td>@nozbe/watermelondb</td></tr>
                <tr><td>Sync API</td><td>Push changes, pull updates, handle conflicts</td><td>REST + WebSocket for live updates</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    OFFLINE SYNC DATA FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Edits Block                                                │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐    Immediate    ┌──────────────────────────┐│
│  │  UI Component   │ ──────────────► │  WatermelonDB           ││
│  │  (Optimistic)   │                 │  (Local Write &lt;100ms)   ││
│  └────────┬────────┘                 └───────────┬──────────────┘│
│           │                                      │               │
│           │ Re-render (reactive)                 │ Create Op     │
│           ▼                                      ▼               │
│  ┌─────────────────┐                 ┌──────────────────────────┐│
│  │ Updated Block   │                 │  Operations Table        ││
│  │ (syncStatus:    │                 │  (synced: false)         ││
│  │  pending)       │                 │  {type, entityId, diff}  ││
│  └─────────────────┘                 └───────────┬──────────────┘│
│                                                  │               │
│  ═══════════════════ WHEN ONLINE ════════════════════════════════│
│                                                  │               │
│                                     ┌────────────▼──────────────┐│
│                                     │  Sync Engine              ││
│                                     │  1. pushChanges()         ││
│                                     │  2. pullChanges()         ││
│                                     │  3. resolveConflicts()    ││
│                                     └────────────┬──────────────┘│
│                                                  │               │
│                                                  ▼               │
│  ┌─────────────────┐    Accepted    ┌──────────────────────────┐│
│  │  Mark synced    │ ◄───────────── │  Backend Server          ││
│  │  Delete from    │                │  (Apply, Store, Version) ││
│  │  operations log │                └───────────┬──────────────┘│
│  └─────────────────┘                            │               │
│                                                 │ Broadcast      │
│                                                 ▼               │
│                                     ┌──────────────────────────┐│
│                                     │  Other Clients           ││
│                                     │  (WebSocket push or poll)││
│                                     └──────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <ul>
                <li><strong>Offline-First with Operation Log:</strong> All edits write to local SQLite immediately. Changes queued in operations table for sync. User never waits for network. Zero data loss guarantee.</li>
                <li><strong>WatermelonDB over Realm/SQLite:</strong> Built for sync scenarios. Lazy-loading prevents loading entire database into memory. Reactive queries update UI automatically when data changes. Native SQLite performance.</li>
                <li><strong>Block-Level Sync Granularity:</strong> Sync individual blocks, not entire pages. Minimizes conflicts (two users editing different paragraphs don't conflict). Smaller payloads, faster sync.</li>
                <li><strong>Version Vectors for Conflict Detection:</strong> Each entity has version number. Server rejects operations with stale base version. Client rebases local changes on server state before retrying.</li>
                <li><strong>Background Sync with Platform APIs:</strong> iOS BGTaskScheduler, Android WorkManager. Battery-efficient periodic sync. Immediate sync on network available event.</li>
            </ul>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/notes.ts

/** Supported block types in the editor */
type BlockType = 'text' | 'heading' | 'todo' | 'bullet' | 'numbered' |
                 'image' | 'code' | 'quote' | 'divider' | 'toggle' | 'callout';

/** Heading levels */
type HeadingLevel = 1 | 2 | 3;

/** Sync status for offline tracking */
type SyncStatus = 'synced' | 'pending' | 'conflict' | 'error';

/** Individual content block within a page */
interface Block {
    id: string;                       // UUID
    pageId: string;                   // Foreign key to parent page
    type: BlockType;
    content: string;                  // Plain text or markdown
    properties: BlockProperties;      // Type-specific properties
    order: number;                    // Position within parent (fractional for reorder)
    parentBlockId: string | null;     // For nested blocks (toggle children)
    indentLevel: number;              // 0-6 for visual nesting
    createdAt: number;                // Unix timestamp
    updatedAt: number;
    syncStatus: SyncStatus;
    version: number;                  // Increments on each edit
}

/** Type-specific block properties */
interface BlockProperties {
    // Heading
    level?: HeadingLevel;

    // Todo
    checked?: boolean;

    // Code
    language?: string;

    // Image
    url?: string;
    caption?: string;
    width?: number;

    // Callout
    emoji?: string;
    backgroundColor?: string;
}

/** Page (document) containing blocks */
interface Page {
    id: string;                       // UUID
    title: string;
    icon: string | null;              // Emoji or image URL
    coverImage: string | null;
    parentId: string | null;          // For nested pages
    workspaceId: string;
    createdAt: number;
    updatedAt: number;
    syncStatus: SyncStatus;
    version: number;
    isArchived: boolean;
    archivedAt: number | null;
}

/** Operation log entry for sync */
interface Operation {
    id: string;                       // UUID
    type: 'INSERT' | 'UPDATE' | 'DELETE';
    entity: 'page' | 'block';
    entityId: string;
    changes: Record&lt;string, unknown&gt;; // Diff of changed fields
    timestamp: number;
    clientId: string;                 // Device identifier
    baseVersion: number;              // Version this change is based on
    synced: boolean;                  // Whether pushed to server
}

/** Local asset (image, file) pending upload */
interface Asset {
    id: string;
    localUri: string;                 // file:// path
    remoteUrl: string | null;         // Populated after upload
    mimeType: string;
    sizeBytes: number;
    uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'failed';
    createdAt: number;
}</code></pre>

            <h5>WatermelonDB Model Definition</h5>
            <pre><code>// models/Page.ts
import { Model, Q, Query } from '@nozbe/watermelondb';
import { field, children, date, readonly, writer, lazy } from '@nozbe/watermelondb/decorators';

export class PageModel extends Model {
    static table = 'pages';
    static associations = {
        blocks: { type: 'has_many' as const, foreignKey: 'page_id' },
        children: { type: 'has_many' as const, foreignKey: 'parent_id' },
    };

    @field('title') title!: string;
    @field('icon') icon!: string | null;
    @field('cover_image') coverImage!: string | null;
    @field('parent_id') parentId!: string | null;
    @field('workspace_id') workspaceId!: string;
    @field('sync_status') syncStatus!: SyncStatus;
    @field('version') version!: number;
    @field('is_archived') isArchived!: boolean;
    @readonly @date('created_at') createdAt!: Date;
    @date('updated_at') updatedAt!: Date;

    @children('blocks') blocks!: Query&lt;BlockModel&gt;;
    @lazy childPages = this.collections
        .get&lt;PageModel&gt;('pages')
        .query(Q.where('parent_id', this.id));

    @writer async updateTitle(newTitle: string) {
        await this.update(page =&gt; {
            page.title = newTitle;
            page.syncStatus = 'pending';
            page.version += 1;
        });
        await this.logOperation('UPDATE', { title: newTitle });
    }

    @writer async archive() {
        await this.update(page =&gt; {
            page.isArchived = true;
            page.syncStatus = 'pending';
            page.version += 1;
        });
        await this.logOperation('UPDATE', { isArchived: true });
    }

    private async logOperation(type: 'UPDATE' | 'DELETE', changes: object) {
        await this.database.write(async () =&gt; {
            await this.database.get('operations').create(op =&gt; {
                op.type = type;
                op.entity = 'page';
                op.entityId = this.id;
                op.changes = changes;
                op.baseVersion = this.version - 1;
            });
        });
    }
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    NOTE APP DATA RELATIONSHIPS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Workspace (1) ────────── contains ─────────► Page (N)          │
│                                                   │              │
│  Page (1) ────────── parent of ─────────► Page (N) [nested]     │
│       │                                                          │
│       └────────── contains ─────────► Block (N)                 │
│                                           │                      │
│  Block (1) ────── parent of ──► Block (N) [toggle children]     │
│                                                                  │
│  Page/Block ────── tracked by ─────────► Operation (N)          │
│       │                                                          │
│       └────── references ─────────► Asset (0..N)                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Sync Relationships:                                        ││
│  │                                                              ││
│  │  Operation.entityId ──► Page.id or Block.id                 ││
│  │  Operation.baseVersion ──► Entity.version (at time of edit) ││
│  │  Operation.synced ──► false (pending) / true (confirmed)    ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Pages &amp; Blocks</td><td>WatermelonDB (SQLite)</td><td>Relational queries, reactive updates, offline-first</td></tr>
                <tr><td>Operations Log</td><td>WatermelonDB table</td><td>Same transaction as data writes, atomic</td></tr>
                <tr><td>Sync metadata</td><td>MMKV</td><td>Fast sync timestamps, client ID, last sync cursor</td></tr>
                <tr><td>Images (local)</td><td>FileSystem + Assets table</td><td>Reference in DB, file on disk, upload queue</td></tr>
                <tr><td>UI preferences</td><td>MMKV</td><td>Theme, font size, last opened page</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Location</th><th>Rationale</th></tr>
                <tr><td>Document content</td><td>WatermelonDB</td><td>Persisted, reactive, offline-first</td></tr>
                <tr><td>Sync status</td><td>WatermelonDB field</td><td>Per-entity tracking, persisted</td></tr>
                <tr><td>Current editor state</td><td>Zustand</td><td>Cursor position, selection, unsaved buffer</td></tr>
                <tr><td>Navigation state</td><td>React Navigation</td><td>Screen stack, deep linking</td></tr>
                <tr><td>Sync progress</td><td>Zustand</td><td>Show sync indicator in UI</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Sync Engine API</h5>
            <pre><code>// services/SyncEngine.ts

interface SyncEngine {
    /** Start sync process (push + pull + conflicts) */
    sync(): Promise&lt;SyncResult&gt;;

    /** Push local changes to server */
    pushChanges(): Promise&lt;PushResult&gt;;

    /** Pull remote changes from server */
    pullChanges(): Promise&lt;PullResult&gt;;

    /** Resolve detected conflicts */
    resolveConflicts(conflicts: Conflict[]): Promise&lt;void&gt;;

    /** Subscribe to sync state changes */
    onSyncStateChange(callback: (state: SyncState) =&gt; void): () =&gt; void;

    /** Force immediate sync (user-triggered) */
    forceSync(): Promise&lt;SyncResult&gt;;

    /** Cancel in-progress sync */
    cancelSync(): void;
}

interface SyncResult {
    success: boolean;
    pushed: number;       // Operations pushed
    pulled: number;       // Changes pulled
    conflicts: number;    // Conflicts detected
    errors: SyncError[];
}

interface SyncState {
    status: 'idle' | 'syncing' | 'error';
    lastSyncAt: number | null;
    pendingOperations: number;
    progress: number;     // 0-100 for UI
}

interface Conflict {
    entityType: 'page' | 'block';
    entityId: string;
    localVersion: object;
    serverVersion: object;
    baseVersion: object;  // Common ancestor
}</code></pre>

            <h5>Page Repository API</h5>
            <pre><code>// repositories/PageRepository.ts

interface PageRepository {
    /** Get page by ID with blocks */
    getPage(id: string): Promise&lt;PageWithBlocks | null&gt;;

    /** Get root pages (no parent) */
    getRootPages(): Promise&lt;Page[]&gt;;

    /** Get child pages of a parent */
    getChildPages(parentId: string): Promise&lt;Page[]&gt;;

    /** Create new page */
    createPage(data: CreatePageInput): Promise&lt;Page&gt;;

    /** Update page metadata */
    updatePage(id: string, changes: UpdatePageInput): Promise&lt;Page&gt;;

    /** Archive page (soft delete) */
    archivePage(id: string): Promise&lt;void&gt;;

    /** Search pages by title/content */
    searchPages(query: string): Promise&lt;Page[]&gt;;

    /** Subscribe to page changes (reactive) */
    observePage(id: string): Observable&lt;PageWithBlocks&gt;;
}

interface CreatePageInput {
    title: string;
    parentId?: string;
    icon?: string;
}

interface PageWithBlocks extends Page {
    blocks: Block[];
}</code></pre>

            <h5>Block Editor API</h5>
            <pre><code>// hooks/useBlockEditor.ts

interface UseBlockEditorReturn {
    /** Current blocks in order */
    blocks: Block[];

    /** Loading state */
    isLoading: boolean;

    /** Create new block after specified block */
    insertBlock(afterBlockId: string | null, type: BlockType): Promise&lt;Block&gt;;

    /** Update block content */
    updateBlock(blockId: string, content: string): Promise&lt;void&gt;;

    /** Update block properties (heading level, todo checked, etc.) */
    updateBlockProperties(blockId: string, props: Partial&lt;BlockProperties&gt;): Promise&lt;void&gt;;

    /** Delete block */
    deleteBlock(blockId: string): Promise&lt;void&gt;;

    /** Move block to new position */
    moveBlock(blockId: string, afterBlockId: string | null): Promise&lt;void&gt;;

    /** Indent block (increase nesting) */
    indentBlock(blockId: string): Promise&lt;void&gt;;

    /** Outdent block (decrease nesting) */
    outdentBlock(blockId: string): Promise&lt;void&gt;;

    /** Change block type (text → heading, bullet → numbered, etc.) */
    changeBlockType(blockId: string, newType: BlockType): Promise&lt;void&gt;;
}

/**
 * Hook for block-based editing within a page.
 * Handles local persistence and operation logging for sync.
 */
function useBlockEditor(pageId: string): UseBlockEditorReturn;</code></pre>

            <h5>Native Background Sync API</h5>
            <pre><code>// iOS - BackgroundSyncModule.swift

@objc(BackgroundSyncModule)
class BackgroundSyncModule: NSObject {

    /// Register background task with system
    @objc static func register() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: "com.notesapp.sync",
            using: nil
        ) { task in
            Self.handleSync(task: task as! BGProcessingTask)
        }
    }

    /// Schedule next background sync
    @objc func scheduleSync() {
        let request = BGProcessingTaskRequest(identifier: "com.notesapp.sync")
        request.requiresNetworkConnectivity = true
        request.requiresExternalPower = false
        request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)
        try? BGTaskScheduler.shared.submit(request)
    }

    /// Handle background sync execution
    private static func handleSync(task: BGProcessingTask) {
        task.expirationHandler = { SyncEngine.shared.cancelSync() }
        SyncEngine.shared.performSync { success in
            task.setTaskCompleted(success: success)
        }
    }
}

// Android - SyncWorker.kt

class SyncWorker(context: Context, params: WorkerParameters) :
    CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            SyncEngine.getInstance(applicationContext).sync()
            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount &lt; 3) Result.retry() else Result.failure()
        }
    }

    companion object {
        fun schedule(context: Context) {
            val request = PeriodicWorkRequestBuilder&lt;SyncWorker&gt;(15, TimeUnit.MINUTES)
                .setConstraints(Constraints.Builder()
                    .setRequiredNetworkType(NetworkType.CONNECTED)
                    .build())
                .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 1, TimeUnit.MINUTES)
                .build()

            WorkManager.getInstance(context)
                .enqueueUniquePeriodicWork("notes-sync", ExistingPeriodicWorkPolicy.KEEP, request)
        }
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>WatermelonDB lazy loading:</strong>
                    <ul>
                        <li>Problem: Loading 10,000+ pages into memory at startup kills performance</li>
                        <li>Solution: WatermelonDB lazy-loads records only when accessed. Queries return observables, not arrays.</li>
                        <li>Impact: Instant startup regardless of data size, ~10MB memory baseline</li>
                    </ul>
                </li>
                <li><strong>Fractional ordering for block reorder:</strong>
                    <ul>
                        <li>Problem: Reordering blocks requires updating order field of all subsequent blocks</li>
                        <li>Solution: Use fractional indices (0.5 between 0 and 1). Insert between existing values.</li>
                        <li>Impact: O(1) reorder operations, single write to database</li>
                    </ul>
                </li>
                <li><strong>Debounced content sync:</strong>
                    <ul>
                        <li>Problem: Syncing on every keystroke wastes bandwidth and battery</li>
                        <li>Solution: Debounce operations by 2 seconds. Batch changes before push.</li>
                        <li>Impact: 90% reduction in sync operations during active editing</li>
                    </ul>
                </li>
                <li><strong>Incremental sync with cursors:</strong>
                    <ul>
                        <li>Problem: Full sync after long offline period is slow</li>
                        <li>Solution: Track last sync cursor, only fetch changes since. Paginate large changesets.</li>
                        <li>Impact: 95% faster sync for typical "overnight offline" scenarios</li>
                    </ul>
                </li>
                <li><strong>Asset upload queue with retry:</strong>
                    <ul>
                        <li>Problem: Large image uploads block text sync, fail on poor network</li>
                        <li>Solution: Separate queue for assets. Text syncs first. Exponential backoff for retries.</li>
                        <li>Impact: Text always syncs immediately, images eventually consistent</li>
                    </ul>
                </li>
            </ul>

            <h5>Sync Engine Implementation</h5>
            <pre><code>// services/SyncEngine.ts
import NetInfo from '@react-native-community/netinfo';
import { database } from './database';
import { Q } from '@nozbe/watermelondb';

class SyncEngine {
    private clientId: string;
    private lastSyncCursor: string | null = null;
    private isSyncing = false;
    private syncAbortController: AbortController | null = null;

    constructor() {
        this.clientId = getDeviceId();
        this.lastSyncCursor = MMKV.getString('lastSyncCursor') ?? null;
        this.setupNetworkListener();
    }

    private setupNetworkListener() {
        NetInfo.addEventListener(state =&gt; {
            if (state.isConnected &amp;&amp; this.hasPendingOperations()) {
                this.sync(); // Auto-sync when coming online
            }
        });
    }

    async sync(): Promise&lt;SyncResult&gt; {
        if (this.isSyncing) {
            return { success: false, pushed: 0, pulled: 0, conflicts: 0, errors: [] };
        }

        this.isSyncing = true;
        this.syncAbortController = new AbortController();

        try {
            // Phase 1: Push local changes
            const pushResult = await this.pushChanges();

            // Phase 2: Pull remote changes
            const pullResult = await this.pullChanges();

            // Phase 3: Resolve conflicts
            if (pullResult.conflicts.length &gt; 0) {
                await this.resolveConflicts(pullResult.conflicts);
            }

            return {
                success: true,
                pushed: pushResult.count,
                pulled: pullResult.count,
                conflicts: pullResult.conflicts.length,
                errors: [],
            };
        } catch (error) {
            return {
                success: false,
                pushed: 0,
                pulled: 0,
                conflicts: 0,
                errors: [{ message: error.message }],
            };
        } finally {
            this.isSyncing = false;
            this.syncAbortController = null;
        }
    }

    private async pushChanges(): Promise&lt;{ count: number }&gt; {
        const operations = await database
            .get('operations')
            .query(Q.where('synced', false))
            .fetch();

        if (operations.length === 0) return { count: 0 };

        const response = await api.pushOperations({
            operations: operations.map(op =&gt; op._raw),
            clientId: this.clientId,
        }, { signal: this.syncAbortController?.signal });

        // Mark accepted operations as synced
        await database.write(async () =&gt; {
            for (const opId of response.accepted) {
                const op = operations.find(o =&gt; o.id === opId);
                if (op) await op.update(o =&gt; { o.synced = true; });
            }
        });

        // Handle rejections (version conflicts)
        for (const rejection of response.rejected) {
            await this.handleRejection(rejection);
        }

        return { count: response.accepted.length };
    }

    private async pullChanges(): Promise&lt;{ count: number; conflicts: Conflict[] }&gt; {
        const response = await api.getChanges({
            cursor: this.lastSyncCursor,
            clientId: this.clientId,
        }, { signal: this.syncAbortController?.signal });

        const conflicts: Conflict[] = [];

        await database.write(async () =&gt; {
            for (const change of response.changes) {
                const conflict = await this.applyRemoteChange(change);
                if (conflict) conflicts.push(conflict);
            }
        });

        // Update cursor for next sync
        this.lastSyncCursor = response.cursor;
        MMKV.set('lastSyncCursor', response.cursor);

        return { count: response.changes.length, conflicts };
    }

    private async applyRemoteChange(change: RemoteChange): Promise&lt;Conflict | null&gt; {
        const collection = database.get(change.entity + 's'); // 'page' =&gt; 'pages'
        const existing = await collection.find(change.entityId).catch(() =&gt; null);

        if (!existing) {
            // New entity from server - create locally
            await collection.create(record =&gt; {
                Object.assign(record._raw, change.data);
                record.syncStatus = 'synced';
            });
            return null;
        }

        // Check for conflict
        if (existing.syncStatus === 'pending' &amp;&amp; existing.version !== change.baseVersion) {
            return {
                entityType: change.entity,
                entityId: change.entityId,
                localVersion: existing._raw,
                serverVersion: change.data,
                baseVersion: change.baseVersion,
            };
        }

        // No conflict - apply server version
        await existing.update(record =&gt; {
            Object.assign(record._raw, change.data);
            record.syncStatus = 'synced';
        });
        return null;
    }
}</code></pre>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background sync</td><td>BGTaskScheduler (15-30 min)</td><td>WorkManager (15 min minimum)</td></tr>
                <tr><td>Immediate sync trigger</td><td>Silent push notification</td><td>NetworkCallback + WorkManager</td></tr>
                <tr><td>Database location</td><td>Application Support folder</td><td>Internal storage (getDatabasePath)</td></tr>
                <tr><td>File attachments</td><td>Documents folder</td><td>getFilesDir()</td></tr>
                <tr><td>Sync on app launch</td><td>applicationDidBecomeActive</td><td>onResume lifecycle</td></tr>
                <tr><td>Memory pressure</td><td>didReceiveMemoryWarning</td><td>onTrimMemory</td></tr>
            </table>

            <h5>Conflict Resolution Strategy</h5>
            <pre><code>// services/ConflictResolver.ts

class ConflictResolver {
    /**
     * Resolve conflict between local and server versions.
     * Strategy depends on content type:
     * - Text content: Three-way merge
     * - Structural changes: Last-write-wins with history
     * - Deletions: Server wins (prevent resurrection)
     */
    async resolve(conflict: Conflict): Promise&lt;ResolvedChange&gt; {
        const { localVersion, serverVersion, baseVersion } = conflict;

        // Check if it's a delete conflict
        if (serverVersion.isDeleted &amp;&amp; !localVersion.isDeleted) {
            // Server deleted, but we edited locally
            // Option A: Server wins (content lost)
            // Option B: Create new entity with local content (fork)
            return this.handleDeleteConflict(conflict);
        }

        // Text content conflict - attempt three-way merge
        if (conflict.entityType === 'block') {
            const merged = this.threeWayMerge(
                baseVersion.content,
                localVersion.content,
                serverVersion.content
            );

            if (merged.success) {
                return { type: 'auto-merged', data: { content: merged.result } };
            } else {
                return { type: 'manual-required', conflict };
            }
        }

        // Structural changes (order, parent) - last-write-wins
        if (localVersion.updatedAt &gt; serverVersion.updatedAt) {
            return { type: 'local-wins', data: localVersion };
        } else {
            return { type: 'server-wins', data: serverVersion };
        }
    }

    private threeWayMerge(base: string, local: string, server: string): MergeResult {
        // Use diff-match-patch for text merging
        const dmp = new DiffMatchPatch();

        const patch1 = dmp.patch_make(base, local);
        const patch2 = dmp.patch_make(base, server);

        // Apply server patch to local
        const [result1, success1] = dmp.patch_apply(patch2, local);

        // Check for conflicts
        if (success1.every(s =&gt; s)) {
            return { success: true, result: result1 };
        }

        // Conflicts detected - need manual resolution
        return { success: false, result: null };
    }
}</code></pre>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Long offline period (weeks):</strong> Paginate sync with cursor. Process in batches. Show progress UI. Allow user to cancel and retry.</li>
                <li><strong>Conflicting edits on same block:</strong> Three-way merge for text. Show diff UI for manual resolution if auto-merge fails.</li>
                <li><strong>Large attachments (100MB+ images):</strong> Sync text first, queue assets separately. Resume interrupted uploads. Show upload progress per asset.</li>
                <li><strong>Page deleted on another device:</strong> Soft delete with 30-day retention. Show "restore" option during sync. Archive instead of hard delete.</li>
                <li><strong>App killed mid-sync:</strong> Operations log ensures no data loss. Resume from last successful operation. Idempotent operations prevent duplicates.</li>
                <li><strong>Version mismatch:</strong> Server rejects stale base version. Client rebases local changes on server state. Retry with updated base.</li>
                <li><strong>Database corruption:</strong> Verify SQLite integrity on startup. Restore from server if corrupt. Keep last-known-good backup.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Local database</td><td>WatermelonDB</td><td>Realm, SQLite direct</td><td>Built for sync, lazy loading, reactive queries</td></tr>
                <tr><td>Sync granularity</td><td>Block-level</td><td>Page-level</td><td>Fewer conflicts, smaller payloads</td></tr>
                <tr><td>Conflict resolution</td><td>Three-way merge + LWW</td><td>CRDT (Yjs)</td><td>Simpler, works for async editing (not real-time)</td></tr>
                <tr><td>Background sync</td><td>Platform APIs (BGTask/WorkManager)</td><td>Keep-alive connection</td><td>Battery efficient, OS-managed scheduling</td></tr>
                <tr><td>Asset storage</td><td>Local files + reference</td><td>Base64 in database</td><td>Better performance, platform file APIs</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Offline Editing Tests:</strong>
                    <ul>
                        <li>Create/edit/delete pages while offline, verify persistence</li>
                        <li>Restart app while offline, verify data intact</li>
                        <li>Simulate long offline period (100+ operations), verify all sync</li>
                    </ul>
                </li>
                <li><strong>Sync Tests:</strong>
                    <ul>
                        <li>Edit same page on two devices, verify merge works</li>
                        <li>Kill app mid-sync, verify resume without data loss</li>
                        <li>Simulate server errors, verify retry with backoff</li>
                    </ul>
                </li>
                <li><strong>Conflict Tests:</strong>
                    <ul>
                        <li>Edit same block offline on two devices, verify conflict detection</li>
                        <li>Delete page on one device, edit on another, verify handling</li>
                        <li>Test three-way merge with overlapping text edits</li>
                    </ul>
                </li>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>Create 10,000 pages, verify startup &lt; 1 second</li>
                        <li>Sync 1,000 operations, verify &lt; 10 seconds</li>
                        <li>Monitor memory during large sync, verify no leaks</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why operation log instead of direct sync?</strong><br/>A: Operations capture intent (what changed), not just state. Enables conflict detection at the operation level. Allows offline accumulation without blocking UI. Provides audit trail for debugging sync issues.</li>
                <li><strong>Q: CRDT vs Operation Transform vs Version Vectors?</strong><br/>A: CRDTs (Yjs) excel at real-time collaboration - automatic merge, no server. OT needs server ordering. Version vectors work well for async sync (like this app) - simpler implementation, explicit conflict handling, easier to reason about.</li>
                <li><strong>Q: How do you handle tombstones for deletes?</strong><br/>A: Keep deleted items with isDeleted flag for 30 days. Prevents "resurrection" when offline device syncs old data. Server filters tombstones from queries. Periodic cleanup job removes old tombstones.</li>
                <li><strong>Q: Block-level vs page-level sync?</strong><br/>A: Block-level reduces conflicts (two users editing different paragraphs don't conflict). Smaller sync payloads. More granular versioning. Trade-off: more complex merge logic, more operations to track.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Local Database</td><td>WatermelonDB</td><td>Lazy-loading, reactive queries, built for offline-first sync</td></tr>
                <tr><td>Key-Value Store</td><td>react-native-mmkv</td><td>Sync cursors, preferences, 30x faster than AsyncStorage</td></tr>
                <tr><td>Network Status</td><td>@react-native-community/netinfo</td><td>Reliable connectivity detection for sync triggers</td></tr>
                <tr><td>Rich Text</td><td>react-native-pell-rich-editor or custom</td><td>Block-based editing, markdown support</td></tr>
                <tr><td>Text Merge</td><td>diff-match-patch</td><td>Google's three-way merge library for text conflicts</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>UI state separate from persisted data</td></tr>
                <tr><td>File System</td><td>expo-file-system</td><td>Asset storage, local file management</td></tr>
            </table>
        `
     },
    {
        id: 76,
        category: "System Design",
        icon: "🏛️",
        question: "How would you handle conflict resolution in a collaborative editing feature?",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Collaboration mode:</strong> Real-time simultaneous editing (Google Docs) or async with sync (Notion offline)? How many concurrent editors per document?</li>
                <li><strong>Document type:</strong> Plain text, rich text with formatting, structured blocks, or mixed content types?</li>
                <li><strong>Offline support:</strong> How long can users edit offline? Hours, days, or indefinitely?</li>
                <li><strong>Conflict visibility:</strong> Should conflicts auto-resolve silently, or show UI for manual resolution?</li>
                <li><strong>History requirements:</strong> Need full version history? Undo/redo across collaborative sessions?</li>
                <li><strong>Latency targets:</strong> Acceptable delay for seeing others' changes? Real-time (&lt;100ms) or near-real-time (&lt;1s)?</li>
                <li><strong>Platform specifics:</strong> iOS/Android native, React Native, or web? Background sync requirements?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Multiple users can edit the same document simultaneously with changes propagated in &lt;100ms</li>
                <li>Real-time cursor positions and selections visible for all active collaborators</li>
                <li>Offline editing supported with automatic sync on reconnection</li>
                <li>Automatic conflict resolution for concurrent edits using CRDT (no data loss)</li>
                <li>Manual conflict resolution UI when structural conflicts cannot auto-merge</li>
                <li>Full edit history with version tracking and restore capability</li>
                <li>Presence awareness showing who is currently viewing/editing</li>
                <li>Undo/redo respects collaboration boundaries (only affects own changes)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Keystroke-to-broadcast latency &lt;100ms on good network</li>
                <li>Guaranteed eventual consistency across all clients (CRDT property)</li>
                <li>Support 20+ concurrent editors on a single document</li>
                <li>Handle 100,000+ character documents without performance degradation</li>
                <li>Offline edits persist through app kills and device restarts</li>
                <li>Sync completion within 5 seconds of network restoration</li>
                <li>Memory usage &lt;50MB per document for CRDT state</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Comments/annotations system</li>
                <li>Permission management (edit vs view)</li>
                <li>Real-time voice/video during collaboration</li>
                <li>Document search and indexing</li>
                <li>Version branching/merging (Git-style)</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────┐
│             COLLABORATIVE EDITING ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                        CLIENT A (React Native)                   │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐  │ │
│  │  │  Editor UI    │  │   Yjs Doc     │  │  IndexedDB/MMKV     │  │ │
│  │  │  (Quill/PM)   │  │   (CRDT)      │  │  (Persistence)      │  │ │
│  │  └───────┬───────┘  └───────┬───────┘  └──────────┬──────────┘  │ │
│  │          │                  │                     │              │ │
│  │          └──────────────────┼─────────────────────┘              │ │
│  │                             │                                    │ │
│  │                    ┌────────▼────────┐                           │ │
│  │                    │ Awareness State │                           │ │
│  │                    │ (Cursor, Select)│                           │ │
│  │                    └────────┬────────┘                           │ │
│  └─────────────────────────────┼───────────────────────────────────┘ │
│                                │                                      │
│                       WebSocket (y-websocket)                         │
│                                │                                      │
│  ┌─────────────────────────────▼───────────────────────────────────┐ │
│  │                       SYNC SERVER                                │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐   │ │
│  │  │ y-websocket    │  │ Hocuspocus     │  │ Presence Service │   │ │
│  │  │ Server         │  │ (Doc Manager)  │  │ (User Awareness) │   │ │
│  │  └────────┬───────┘  └────────┬───────┘  └────────┬─────────┘   │ │
│  │           │                   │                   │              │ │
│  │           └───────────────────┼───────────────────┘              │ │
│  │                               │                                  │ │
│  │                    ┌──────────▼──────────┐                       │ │
│  │                    │   Redis Pub/Sub     │                       │ │
│  │                    │   (Multi-server)    │                       │ │
│  │                    └──────────┬──────────┘                       │ │
│  │                               │                                  │ │
│  │                    ┌──────────▼──────────┐                       │ │
│  │                    │  PostgreSQL/S3      │                       │ │
│  │                    │  (Doc Snapshots)    │                       │ │
│  │                    └─────────────────────┘                       │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                │                                      │
│                       WebSocket (y-websocket)                         │
│                                │                                      │
│  ┌─────────────────────────────▼───────────────────────────────────┐ │
│  │                        CLIENT B                                  │ │
│  │                   (Same structure as A)                          │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Editor UI</td><td>Text editing interface, rendering CRDT state</td><td>Quill, ProseMirror, or custom</td></tr>
                <tr><td>Yjs Document</td><td>CRDT state management, conflict-free merging</td><td>Yjs library</td></tr>
                <tr><td>Awareness State</td><td>Track cursor positions, selections, user presence</td><td>y-protocols/awareness</td></tr>
                <tr><td>Local Persistence</td><td>Persist CRDT state for offline support</td><td>y-indexeddb / MMKV</td></tr>
                <tr><td>WebSocket Provider</td><td>Bidirectional sync between client and server</td><td>y-websocket</td></tr>
                <tr><td>Hocuspocus Server</td><td>Document lifecycle, authentication, webhooks</td><td>@hocuspocus/server</td></tr>
                <tr><td>Redis Pub/Sub</td><td>Multi-server coordination for horizontal scaling</td><td>Redis</td></tr>
                <tr><td>Document Storage</td><td>Persistent snapshots, version history</td><td>PostgreSQL + S3</td></tr>
            </table>

            <h5>CRDT Synchronization Flow</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                  CRDT SYNC FLOW (Yjs)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A Types "Hello"          User B Types "World"              │
│  at position 0                 at position 0                     │
│         │                              │                         │
│         ▼                              ▼                         │
│  ┌─────────────────┐          ┌─────────────────┐               │
│  │ Y.Text.insert() │          │ Y.Text.insert() │               │
│  │ Unique Item ID  │          │ Unique Item ID  │               │
│  │ clientID:clock  │          │ clientID:clock  │               │
│  └────────┬────────┘          └────────┬────────┘               │
│           │                            │                         │
│           └──────────┬─────────────────┘                         │
│                      ▼                                           │
│           ┌──────────────────────┐                               │
│           │    Yjs CRDT Engine   │                               │
│           │  (Deterministic ID   │                               │
│           │   ordering rules)    │                               │
│           └──────────┬───────────┘                               │
│                      │                                           │
│                      ▼                                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Ordering: clientID with lower value wins tie             │  │
│  │  If A.clientID &lt; B.clientID:  "HelloWorld"                │  │
│  │  If A.clientID &gt; B.clientID:  "WorldHello"                │  │
│  │  Result: Deterministic on ALL clients                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                      │                                           │
│                      ▼                                           │
│           ┌──────────────────────┐                               │
│           │  Eventual Consistency│                               │
│           │  Guaranteed          │                               │
│           └──────────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Conflict resolution</td><td>CRDT (Yjs)</td><td>Automatic conflict-free merging, no central authority needed, works offline</td></tr>
                <tr><td>Sync protocol</td><td>WebSocket with binary encoding</td><td>Low latency, efficient update encoding, bidirectional</td></tr>
                <tr><td>Server role</td><td>Relay + persistence only</td><td>CRDT allows serverless sync; server adds durability and multi-device</td></tr>
                <tr><td>Presence system</td><td>Separate awareness protocol</td><td>Ephemeral data (cursors) shouldn't bloat document history</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/collaboration.ts

/** Represents a single editing operation in the system */
interface Operation {
    /** Type of operation */
    type: 'insert' | 'delete' | 'format' | 'retain';
    /** Position in the document */
    position: number;
    /** Content for insert operations */
    content?: string;
    /** Length for delete/retain operations */
    length?: number;
    /** Formatting attributes for format operations */
    attributes?: Record&lt;string, unknown&gt;;
    /** Unique client identifier */
    clientId: string;
    /** Lamport timestamp for ordering */
    clock: number;
}

/** Vector clock for causality tracking */
interface VectorClock {
    /** Maps clientId to their latest known clock value */
    [clientId: string]: number;
}

/** User presence information */
interface Presence {
    /** Unique client session ID */
    clientId: string;
    /** User account ID */
    userId: string;
    /** Display name shown to others */
    name: string;
    /** Color for cursor/selection highlight */
    color: string;
    /** Current cursor position (null if not focused) */
    cursor: CursorPosition | null;
    /** Last activity timestamp */
    lastActive: number;
}

/** Cursor position within document */
interface CursorPosition {
    /** Absolute index in document */
    index: number;
    /** Selection length (0 for cursor, &gt;0 for selection) */
    length: number;
}

/** Conflict that requires manual resolution */
interface ConflictData {
    /** Unique conflict ID */
    id: string;
    /** Document ID */
    documentId: string;
    /** Local version before conflict */
    localVersion: string;
    /** Remote version that caused conflict */
    remoteVersion: string;
    /** Common ancestor version */
    baseVersion: string;
    /** Type of conflict */
    conflictType: 'text' | 'structure' | 'delete';
    /** Timestamp when conflict detected */
    detectedAt: number;
}

/** Resolution choice for a conflict */
interface ConflictResolution {
    /** Auto-resolved or required user input */
    type: 'auto' | 'manual';
    /** Resolution strategy applied */
    strategy: 'merge' | 'local' | 'remote' | 'both';
    /** Resulting content after resolution */
    result: string;
    /** User who resolved (for manual) */
    resolvedBy?: string;
}

/** Document snapshot for persistence */
interface DocumentSnapshot {
    /** Document ID */
    id: string;
    /** Yjs encoded state as base64 */
    state: string;
    /** State vector for incremental sync */
    stateVector: string;
    /** Version number */
    version: number;
    /** Last modified timestamp */
    updatedAt: number;
    /** List of contributor user IDs */
    contributors: string[];
}

/** Yjs document wrapper for React Native */
interface CollaborativeDocument {
    /** Unique document identifier */
    id: string;
    /** Yjs Y.Doc instance */
    doc: Y.Doc;
    /** Main text content type */
    text: Y.Text;
    /** WebSocket sync provider */
    provider: WebsocketProvider | null;
    /** Awareness instance for presence */
    awareness: Awareness;
    /** Connection status */
    status: 'connecting' | 'connected' | 'disconnected';
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    ENTITY RELATIONSHIPS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐         ┌──────────────┐                      │
│  │   Document   │ 1     N │   Snapshot   │                      │
│  │              │─────────│  (version)   │                      │
│  └──────┬───────┘         └──────────────┘                      │
│         │                                                        │
│         │ 1                                                      │
│         │                                                        │
│         │ N                                                      │
│  ┌──────▼───────┐         ┌──────────────┐                      │
│  │  Y.Doc State │ ◄───────│  Operation   │                      │
│  │  (CRDT)      │  embeds │  (insert,    │                      │
│  └──────┬───────┘         │   delete)    │                      │
│         │                 └──────────────┘                      │
│         │ 1                                                      │
│         │                                                        │
│         │ N                                                      │
│  ┌──────▼───────┐                                               │
│  │  Awareness   │ 1     N ┌──────────────┐                      │
│  │  State       │─────────│   Presence   │                      │
│  └──────────────┘         │  (per user)  │                      │
│                           └──────────────┘                      │
│                                                                  │
│  Conflict Resolution:                                            │
│  ┌──────────────┐         ┌──────────────┐                      │
│  │ ConflictData │ 1     1 │ Resolution   │                      │
│  │              │─────────│              │                      │
│  └──────────────┘         └──────────────┘                      │
│                                                                  │
│  Legend: ─── 1:N relationship   ◄─── embedded within            │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>CRDT document state</td><td>IndexedDB (web) / MMKV (RN)</td><td>Persistent offline state, survives app restarts</td></tr>
                <tr><td>Awareness/presence</td><td>Memory only</td><td>Ephemeral data, no persistence needed</td></tr>
                <tr><td>Document snapshots</td><td>PostgreSQL + S3</td><td>Version history, server-side durability</td></tr>
                <tr><td>Pending operations</td><td>Embedded in Y.Doc</td><td>Yjs tracks unsynced changes automatically</td></tr>
                <tr><td>User preferences</td><td>MMKV</td><td>Cursor color, editor settings</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Location</th><th>Example</th></tr>
                <tr><td>Document content</td><td>Yjs Y.Doc (CRDT)</td><td>Text content, formatting</td></tr>
                <tr><td>Collaboration presence</td><td>Yjs Awareness</td><td>Cursors, selections, online users</td></tr>
                <tr><td>UI state</td><td>React state (useState/Zustand)</td><td>Modal open, sidebar visible</td></tr>
                <tr><td>Connection status</td><td>WebsocketProvider events</td><td>connected, syncing, offline</td></tr>
                <tr><td>Conflict queue</td><td>Zustand store</td><td>Pending conflicts for resolution</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Collaborative Document Class</h5>
            <pre><code>// services/CollaborativeDocument.ts
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Awareness } from 'y-protocols/awareness';

/**
 * Manages a single collaborative document with CRDT-based conflict resolution.
 * Handles real-time sync, offline persistence, and presence awareness.
 */
class CollaborativeDocument {
    private doc: Y.Doc;
    private text: Y.Text;
    private provider: WebsocketProvider | null = null;
    private persistence: IndexedDBPersistence | null = null;

    /**
     * Creates a new collaborative document instance.
     * @param documentId - Unique identifier for the document
     * @param serverUrl - WebSocket server URL for sync
     * @param userId - Current user's ID for presence
     */
    constructor(
        private documentId: string,
        private serverUrl: string,
        private userId: string
    ) {
        this.doc = new Y.Doc();
        this.text = this.doc.getText('content');
    }

    /**
     * Connects to the sync server and starts collaborating.
     * @param options - Connection options
     */
    async connect(options?: {
        /** User display name for presence */
        userName?: string;
        /** Cursor color (hex) */
        cursorColor?: string;
    }): Promise&lt;void&gt; {
        // Setup local persistence first
        this.persistence = new IndexedDBPersistence(this.documentId, this.doc);
        await this.persistence.whenSynced;

        // Connect to server
        this.provider = new WebsocketProvider(
            this.serverUrl,
            this.documentId,
            this.doc,
            { connect: true }
        );

        // Setup presence
        this.provider.awareness.setLocalStateField('user', {
            id: this.userId,
            name: options?.userName ?? 'Anonymous',
            color: options?.cursorColor ?? this.generateColor(),
        });
    }

    /**
     * Inserts text at the specified position.
     * @param index - Position to insert at
     * @param content - Text content to insert
     */
    insert(index: number, content: string): void {
        this.text.insert(index, content);
    }

    /**
     * Deletes text at the specified position.
     * @param index - Start position
     * @param length - Number of characters to delete
     */
    delete(index: number, length: number): void {
        this.text.delete(index, length);
    }

    /**
     * Applies formatting to a range of text.
     * @param index - Start position
     * @param length - Length of range
     * @param attributes - Formatting attributes
     */
    format(index: number, length: number, attributes: Record&lt;string, unknown&gt;): void {
        this.text.format(index, length, attributes);
    }

    /**
     * Returns the current document content as a string.
     */
    getContent(): string {
        return this.text.toString();
    }

    /**
     * Subscribes to document changes.
     * @param callback - Called when document content changes
     * @returns Unsubscribe function
     */
    observe(callback: (event: Y.YTextEvent, transaction: Y.Transaction) =&gt; void): () =&gt; void {
        this.text.observe(callback);
        return () =&gt; this.text.unobserve(callback);
    }

    /**
     * Returns awareness instance for presence tracking.
     */
    getAwareness(): Awareness {
        return this.provider?.awareness ?? new Awareness(this.doc);
    }

    /**
     * Updates local cursor position for other users to see.
     * @param cursor - Cursor position or null if unfocused
     */
    updateCursor(cursor: CursorPosition | null): void {
        this.provider?.awareness.setLocalStateField('cursor', cursor);
    }

    /**
     * Disconnects from server while preserving local state.
     */
    disconnect(): void {
        this.provider?.disconnect();
    }

    /**
     * Destroys the document and cleans up resources.
     */
    destroy(): void {
        this.provider?.destroy();
        this.persistence?.destroy();
        this.doc.destroy();
    }

    private generateColor(): string {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}</code></pre>

            <h5>React Hook Interface</h5>
            <pre><code>// hooks/useCollaborativeEditor.ts

interface UseCollaborativeEditorOptions {
    /** Document ID to collaborate on */
    documentId: string;
    /** WebSocket server URL */
    serverUrl: string;
    /** Current user info */
    user: { id: string; name: string };
    /** Called when document content changes */
    onChange?: (content: string) =&gt; void;
    /** Called when connection status changes */
    onStatusChange?: (status: ConnectionStatus) =&gt; void;
    /** Called when conflict needs manual resolution */
    onConflict?: (conflict: ConflictData) =&gt; void;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'syncing';

interface UseCollaborativeEditorReturn {
    /** Current document content */
    content: string;
    /** Insert text at position */
    insert: (index: number, text: string) =&gt; void;
    /** Delete text at position */
    delete: (index: number, length: number) =&gt; void;
    /** Apply formatting */
    format: (index: number, length: number, attrs: Record&lt;string, unknown&gt;) =&gt; void;
    /** Current connection status */
    status: ConnectionStatus;
    /** List of online collaborators */
    collaborators: Presence[];
    /** Update local cursor position */
    updateCursor: (position: CursorPosition | null) =&gt; void;
    /** Force reconnection attempt */
    reconnect: () =&gt; void;
    /** Undo last local change */
    undo: () =&gt; void;
    /** Redo last undone change */
    redo: () =&gt; void;
    /** Check if can undo */
    canUndo: boolean;
    /** Check if can redo */
    canRedo: boolean;
}

/**
 * React hook for collaborative document editing with CRDT-based conflict resolution.
 * Manages document state, sync, and presence.
 */
function useCollaborativeEditor(options: UseCollaborativeEditorOptions): UseCollaborativeEditorReturn;</code></pre>

            <h5>Conflict Resolution Component API</h5>
            <pre><code>// components/ConflictResolver.tsx

interface ConflictResolverProps {
    /** Conflict data to resolve */
    conflict: ConflictData;
    /** Called when user resolves the conflict */
    onResolve: (resolution: ConflictResolution) =&gt; void;
    /** Called when user dismisses without resolving */
    onDismiss?: () =&gt; void;
    /** Show auto-merge preview if available */
    showAutoMergePreview?: boolean;
}

/**
 * Modal component for manual conflict resolution.
 * Shows diff between versions and resolution options.
 */
function ConflictResolver(props: ConflictResolverProps): JSX.Element;</code></pre>

            <h5>Presence Component API</h5>
            <pre><code>// components/CollaboratorCursors.tsx

interface CollaboratorCursorsProps {
    /** List of collaborator presence data */
    collaborators: Presence[];
    /** Editor component ref for positioning */
    editorRef: React.RefObject&lt;TextInput&gt;;
    /** Current scroll offset for cursor positioning */
    scrollOffset: { x: number; y: number };
}

/**
 * Renders remote collaborator cursors and selections as overlays.
 */
function CollaboratorCursors(props: CollaboratorCursorsProps): JSX.Element;

// components/PresenceAvatars.tsx

interface PresenceAvatarsProps {
    /** List of online collaborators */
    collaborators: Presence[];
    /** Maximum avatars to show before "+N" */
    maxVisible?: number;
    /** Avatar size in pixels */
    size?: number;
    /** Called when avatar is pressed */
    onPress?: (collaborator: Presence) =&gt; void;
}

/**
 * Shows avatars of currently active collaborators.
 */
function PresenceAvatars(props: PresenceAvatarsProps): JSX.Element;</code></pre>

            <h5>Native Bridge APIs</h5>
            <pre><code>// iOS - WebSocketManager.swift

import Foundation

@objc(WebSocketManager)
class WebSocketManager: NSObject, URLSessionWebSocketDelegate {
    private var webSocket: URLSessionWebSocketTask?
    private var backgroundTaskId: UIBackgroundTaskIdentifier = .invalid
    private var reconnectAttempts = 0
    private let maxReconnectDelay: TimeInterval = 30.0

    /// Connects to the collaboration WebSocket server
    @objc func connect(_ url: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        guard let wsUrl = URL(string: url) else {
            rejecter("INVALID_URL", "Invalid WebSocket URL", nil)
            return
        }

        let session = URLSession(configuration: .default, delegate: self, delegateQueue: nil)
        webSocket = session.webSocketTask(with: wsUrl)
        webSocket?.resume()
        startReceiving()
        resolver(true)
    }

    /// Handles app moving to background - keeps connection briefly
    @objc func handleAppBackground() {
        backgroundTaskId = UIApplication.shared.beginBackgroundTask { [weak self] in
            self?.endBackgroundTask()
        }

        // Flush pending changes within background time limit
        DispatchQueue.main.asyncAfter(deadline: .now() + 25) { [weak self] in
            self?.endBackgroundTask()
        }
    }

    /// Reconnects with exponential backoff
    @objc func reconnect() {
        let delay = min(pow(2.0, Double(reconnectAttempts)), maxReconnectDelay)
        reconnectAttempts += 1

        DispatchQueue.main.asyncAfter(deadline: .now() + delay) { [weak self] in
            self?.connect(self?.currentUrl ?? "", resolver: { _ in }, rejecter: { _, _, _ in })
        }
    }

    private func endBackgroundTask() {
        if backgroundTaskId != .invalid {
            UIApplication.shared.endBackgroundTask(backgroundTaskId)
            backgroundTaskId = .invalid
        }
    }

    private func startReceiving() {
        webSocket?.receive { [weak self] result in
            switch result {
            case .success(let message):
                self?.handleMessage(message)
                self?.startReceiving()
            case .failure(let error):
                self?.handleDisconnect(error: error)
            }
        }
    }
}

// Android - CollaborationModule.kt

package com.app.collaboration

import android.app.*
import com.facebook.react.bridge.*
import okhttp3.*
import java.util.concurrent.TimeUnit

class CollaborationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var webSocket: WebSocket? = null
    private var reconnectAttempts = 0
    private val maxReconnectDelay = 30_000L

    private val client = OkHttpClient.Builder()
        .pingInterval(30, TimeUnit.SECONDS)
        .readTimeout(0, TimeUnit.MILLISECONDS) // No timeout for WebSocket
        .build()

    override fun getName() = "CollaborationModule"

    @ReactMethod
    fun connect(url: String, promise: Promise) {
        val request = Request.Builder().url(url).build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                reconnectAttempts = 0
                sendEvent("onConnect", null)
                promise.resolve(true)
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                sendEvent("onMessage", Arguments.createMap().apply {
                    putString("data", text)
                })
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                sendEvent("onDisconnect", Arguments.createMap().apply {
                    putString("error", t.message)
                })
                scheduleReconnect()
            }
        })
    }

    @ReactMethod
    fun send(data: String, promise: Promise) {
        val success = webSocket?.send(data) ?: false
        if (success) promise.resolve(true)
        else promise.reject("SEND_FAILED", "WebSocket not connected")
    }

    private fun scheduleReconnect() {
        val delay = minOf(
            (1000L * Math.pow(2.0, reconnectAttempts.toDouble())).toLong(),
            maxReconnectDelay
        )
        reconnectAttempts++

        // Use WorkManager for reliable background reconnection
        val request = OneTimeWorkRequestBuilder&lt;ReconnectWorker&gt;()
            .setInitialDelay(delay, TimeUnit.MILLISECONDS)
            .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 1, TimeUnit.SECONDS)
            .build()

        WorkManager.getInstance(reactApplicationContext).enqueue(request)
    }

    private fun sendEvent(name: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(name, params)
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Binary protocol encoding:</strong>
                    <ul>
                        <li>Problem: JSON encoding of operations is verbose, slow to parse</li>
                        <li>Solution: Yjs uses custom binary encoding (lib0) - 10x smaller than JSON, zero-copy parsing</li>
                        <li>Impact: 90% bandwidth reduction, &lt;1ms parse time for typical updates</li>
                    </ul>
                </li>
                <li><strong>Update batching:</strong>
                    <ul>
                        <li>Problem: Sending each keystroke separately creates overhead</li>
                        <li>Solution: Batch updates in 50ms window, send as single message</li>
                        <li>Impact: 80% reduction in WebSocket messages during fast typing</li>
                    </ul>
                </li>
                <li><strong>Lazy document loading:</strong>
                    <ul>
                        <li>Problem: Large documents (1MB+ CRDT state) slow initial load</li>
                        <li>Solution: Load document state progressively - snapshot first, then recent updates</li>
                        <li>Impact: Time-to-interactive reduced from 3s to 500ms for large docs</li>
                    </ul>
                </li>
                <li><strong>Awareness throttling:</strong>
                    <ul>
                        <li>Problem: Broadcasting cursor position on every movement floods network</li>
                        <li>Solution: Throttle awareness updates to 100ms intervals</li>
                        <li>Impact: 10x reduction in presence bandwidth with imperceptible delay</li>
                    </ul>
                </li>
                <li><strong>Garbage collection:</strong>
                    <ul>
                        <li>Problem: CRDT tombstones accumulate, bloating document size over time</li>
                        <li>Solution: Periodic GC when all clients have seen deletions (using state vectors)</li>
                        <li>Impact: Document size stays bounded regardless of edit history length</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background sync window</td><td>~30 seconds via beginBackgroundTask</td><td>Unlimited via foreground service</td></tr>
                <tr><td>WebSocket keep-alive</td><td>Automatic via URLSession</td><td>Manual ping every 30s (OkHttp)</td></tr>
                <tr><td>Reconnection trigger</td><td>applicationDidBecomeActive</td><td>NetworkCallback + WorkManager</td></tr>
                <tr><td>Local persistence</td><td>Application Support directory</td><td>Internal storage (getDatabasePath)</td></tr>
                <tr><td>Memory pressure</td><td>didReceiveMemoryWarning - flush to disk</td><td>onTrimMemory - reduce in-memory cache</td></tr>
                <tr><td>Text input handling</td><td>Native TextInput with IME</td><td>Native TextInput, handle composition</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Concurrent deletes of same text:</strong> CRDT handles automatically - both deletions applied, no duplication. Result is deterministic across all clients.</li>
                <li><strong>Long offline period (days):</strong> Large pending update accumulated. Use incremental sync with progress UI. Paginate if &gt;10MB of updates.</li>
                <li><strong>Network partition (split-brain):</strong> Two groups editing independently. When partition heals, CRDT merges all changes - may result in interleaved text requiring review.</li>
                <li><strong>Undo with collaboration:</strong> Local undo manager tracks only own operations. Use UndoManager from Yjs that respects operation origins.</li>
                <li><strong>Large document (1M+ characters):</strong> Virtualize rendering, lazy-load CRDT sections, consider block-based CRDT (Y.Array of Y.Text blocks).</li>
                <li><strong>User leaves mid-edit:</strong> Awareness protocol auto-cleans after 30s timeout. Pending changes already in CRDT, will sync when others connect.</li>
                <li><strong>Server restart:</strong> Document state in Redis/DB. Clients reconnect automatically. Use state vector to sync only missing updates.</li>
                <li><strong>Clock skew between clients:</strong> Yjs uses Lamport clocks (clientID:counter), not wall clock. Immune to time sync issues.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Conflict strategy</td><td>CRDT (Yjs)</td><td>Operational Transform (OT)</td><td>No central server required, works offline, simpler mental model</td></tr>
                <tr><td>CRDT library</td><td>Yjs</td><td>Automerge</td><td>Better performance, smaller updates, established ecosystem</td></tr>
                <tr><td>Transport</td><td>WebSocket</td><td>WebRTC</td><td>Simpler setup, works through firewalls, server can persist</td></tr>
                <tr><td>Presence system</td><td>Separate awareness</td><td>Embedded in CRDT</td><td>Ephemeral cursors don't bloat permanent history</td></tr>
                <tr><td>Manual conflict UI</td><td>Rare fallback</td><td>Always auto-merge</td><td>Structural conflicts may need human decision for intent</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests (CRDT logic):</strong>
                    <ul>
                        <li>Test insert/delete/format operations in isolation</li>
                        <li>Verify convergence with random operation sequences</li>
                        <li>Test undo/redo maintains consistency</li>
                    </ul>
                </li>
                <li><strong>Integration Tests (Sync):</strong>
                    <ul>
                        <li>Two clients editing simultaneously - verify convergence</li>
                        <li>Offline edit followed by sync - verify merge</li>
                        <li>Reconnection after server restart - verify state recovery</li>
                    </ul>
                </li>
                <li><strong>Chaos Tests:</strong>
                    <ul>
                        <li>Random network delays (0-5s) - verify eventual consistency</li>
                        <li>Message reordering - verify CRDT handles correctly</li>
                        <li>Simulate network partition then heal - verify merge</li>
                    </ul>
                </li>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>20 concurrent editors typing - verify &lt;100ms latency</li>
                        <li>100,000 character document - verify &lt;500ms load time</li>
                        <li>1000 operations/second - verify no dropped updates</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>Full editing session with multiple users (Detox/Appium)</li>
                        <li>Offline to online transition with pending edits</li>
                        <li>Presence indicators update correctly</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: CRDT vs Operational Transform - when to use each?</strong><br/>A: OT requires a central server to order operations - better for hosted services like Google Docs where you control the server. CRDTs work peer-to-peer with guaranteed convergence - better for offline-first apps, decentralized systems, or when you can't guarantee server availability. CRDTs have higher storage overhead (tombstones) but simpler correctness proofs.</li>
                <li><strong>Q: How do vector clocks help with conflict detection?</strong><br/>A: Vector clocks track causal relationships. Each client maintains a counter. When client A sends to B, B knows if it's seen all of A's prior operations. If B has operations not causally related to A's (concurrent), those need merging. CRDT's deterministic merge rules ensure same result regardless of arrival order.</li>
                <li><strong>Q: Why keep tombstones for deletes?</strong><br/>A: Without tombstones, a delete might not propagate correctly. Client A deletes character, client B (offline) doesn't know. When B syncs, deleted character could "resurrect." Tombstones mark deletion permanently. GC can remove tombstones once all clients have acknowledged the delete.</li>
                <li><strong>Q: How to handle intention preservation?</strong><br/>A: User types "Hello" at position 5. Another user inserts text at position 3, shifting positions. Original user's intent was to insert after specific content, not at absolute position 5. Yjs uses relative positioning via unique item IDs, so "Hello" stays after the intended character regardless of other insertions.</li>
                <li><strong>Q: Scaling to many concurrent editors?</strong><br/>A: Yjs scales well to 50-100 editors. Beyond that, consider: (1) Hierarchical awareness - only track users in your viewport, (2) Sharded documents - edit blocks independently, (3) Read-only cursors for observers, (4) Rate limiting updates per client.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>CRDT Implementation</td><td>Yjs</td><td>Battle-tested, excellent performance, active maintenance</td></tr>
                <tr><td>Alternative CRDT</td><td>Automerge</td><td>JSON-native, better for document-style data structures</td></tr>
                <tr><td>WebSocket Sync</td><td>y-websocket</td><td>Official Yjs provider, handles reconnection</td></tr>
                <tr><td>Server Framework</td><td>Hocuspocus</td><td>Production-ready Yjs server with auth, webhooks, persistence</td></tr>
                <tr><td>Presence/Awareness</td><td>y-protocols</td><td>Standard awareness protocol for cursor sharing</td></tr>
                <tr><td>Local Persistence</td><td>y-indexeddb</td><td>Automatic offline persistence for Yjs docs</td></tr>
                <tr><td>Rich Text Editor</td><td>Quill + y-quill</td><td>Mature editor with Yjs bindings</td></tr>
                <tr><td>Diff Visualization</td><td>diff-match-patch</td><td>Google's three-way merge for conflict UI</td></tr>
                <tr><td>React Native WS</td><td>react-native-websocket</td><td>Native WebSocket for RN (or use built-in)</td></tr>
            </table>
        `
     },
    {
        id: 77,
        category: "System Design",
        icon: "🏛️",
        question: "Architect a messaging app that queues messages offline and syncs reliably",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Message types:</strong> Text only, or also images, videos, voice, files? What's the max attachment size?</li>
                <li><strong>Delivery guarantees:</strong> At-least-once or exactly-once delivery? Are duplicate messages acceptable?</li>
                <li><strong>Offline duration:</strong> How long might users be offline? Hours, days, or weeks?</li>
                <li><strong>Conversation types:</strong> 1:1 only, or group chats too? If groups, how many participants?</li>
                <li><strong>Read receipts:</strong> Do we need delivered/read status tracking?</li>
                <li><strong>Message ordering:</strong> Strict chronological, or acceptable to show out of order briefly?</li>
                <li><strong>Encryption:</strong> End-to-end encryption required? Key management strategy?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Users can send text messages and media attachments (images up to 20MB, videos up to 100MB)</li>
                <li>Messages persist locally immediately and send when online</li>
                <li>Message status progression: queued → sending → sent → delivered → read</li>
                <li>Automatic retry with exponential backoff (1s, 2s, 4s, 8s... up to 5 minutes)</li>
                <li>Message ordering preserved within conversations (server-side timestamp authority)</li>
                <li>Deduplication via localId prevents double-delivery on retries</li>
                <li>Delete for self vs delete for everyone with 24-hour window</li>
                <li>Edit messages within 15 minutes, showing "edited" indicator</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Message queued and visible in UI within 50ms of user action</li>
                <li>Sync completes within 5 seconds of network restoration</li>
                <li>Handle 10,000+ queued messages during extended offline periods</li>
                <li>Zero message loss even on app crash or device restart</li>
                <li>Battery-efficient sync (batch operations, avoid wake-ups)</li>
                <li>Works on 2G/3G connections with graceful degradation</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Voice/video calling</li>
                <li>End-to-end encryption key exchange</li>
                <li>Message search across history</li>
                <li>Stickers/GIFs marketplace</li>
                <li>Channels/broadcast lists</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────┐
│                 OFFLINE MESSAGING ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                        UI LAYER                                  │ │
│  │  ┌─────────────┐  ┌───────────────┐  ┌───────────────────────┐  │ │
│  │  │ Chat Screen │  │ Message       │  │ Status Indicators     │  │ │
│  │  │ (FlashList) │  │ Composer      │  │ (✓ ✓✓ clock failed)   │  │ │
│  │  └──────┬──────┘  └───────┬───────┘  └───────────┬───────────┘  │ │
│  └─────────┼─────────────────┼──────────────────────┼──────────────┘ │
│            │                 │                      │                 │
│  ┌─────────▼─────────────────▼──────────────────────▼──────────────┐ │
│  │                      MESSAGE SERVICE LAYER                       │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐ │ │
│  │  │ Message Queue  │  │ Retry Manager  │  │ Deduplication      │ │ │
│  │  │ (FIFO Order)   │  │ (Exp. Backoff) │  │ (localId → msgId)  │ │ │
│  │  └────────┬───────┘  └────────┬───────┘  └─────────┬──────────┘ │ │
│  └───────────┼──────────────────┼─────────────────────┼─────────────┘ │
│              │                  │                     │               │
│  ┌───────────▼──────────────────▼─────────────────────▼─────────────┐ │
│  │                      PERSISTENCE LAYER                            │ │
│  │  ┌───────────────────────────┐  ┌─────────────────────────────┐  │ │
│  │  │       WatermelonDB        │  │          MMKV               │  │ │
│  │  │  ┌─────────┐ ┌─────────┐  │  │  ┌────────────────────────┐ │  │ │
│  │  │  │messages │ │queue_ops│  │  │  │ sync_cursor, queue_ids │ │  │ │
│  │  │  ├─────────┤ ├─────────┤  │  │  │ retry_timers, settings │ │  │ │
│  │  │  │convos   │ │ assets  │  │  │  └────────────────────────┘ │  │ │
│  │  │  └─────────┘ └─────────┘  │  └─────────────────────────────┘  │ │
│  │  └───────────────────────────┘                                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                              │                                         │
│                              ▼ (When Online)                           │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                         SYNC LAYER                                 │ │
│  │  ┌────────────────┐            ┌──────────────────────────────┐   │ │
│  │  │ WebSocket      │ ◄────────► │ Message Server               │   │ │
│  │  │ Connection     │   Bi-dir   │ (Push + Pull + ACK)          │   │ │
│  │  └────────┬───────┘            └────────────────┬─────────────┘   │ │
│  │           │                                     │                  │ │
│  │           │            ┌────────────────────────▼─────────────┐   │ │
│  │           └───────────►│ Background Sync (iOS BGTask/Android  │   │ │
│  │                        │ WorkManager) for offline queue flush │   │ │
│  │                        └──────────────────────────────────────┘   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Chat UI</td><td>Display messages, handle user input</td><td>FlashList for virtualization</td></tr>
                <tr><td>Message Queue</td><td>FIFO queue for pending operations</td><td>MMKV (synchronous persistence)</td></tr>
                <tr><td>Retry Manager</td><td>Exponential backoff with jitter</td><td>Custom service with timers</td></tr>
                <tr><td>Deduplication</td><td>Map localId → serverId to prevent duplicates</td><td>MMKV key-value lookup</td></tr>
                <tr><td>WatermelonDB</td><td>Local message storage with reactive queries</td><td>SQLite with lazy loading</td></tr>
                <tr><td>WebSocket Client</td><td>Bidirectional real-time communication</td><td>socket.io-client</td></tr>
                <tr><td>Background Sync</td><td>Flush queue when network available</td><td>BGTaskScheduler / WorkManager</td></tr>
            </table>

            <h5>Message Flow: Send Operation</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    MESSAGE SEND FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Taps Send                                                  │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐                                            │
│  │ 1. Generate     │  localId = nanoid()                        │
│  │    localId      │  status = 'queued'                         │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼  (Parallel)                                          │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │ 2. Save to      │    │ 3. Add to       │                     │
│  │    WatermelonDB │    │    MMKV Queue   │                     │
│  └────────┬────────┘    └────────┬────────┘                     │
│           │                      │                               │
│           └──────────┬───────────┘                               │
│                      ▼                                           │
│  ┌─────────────────────────────────────────┐                    │
│  │ 4. UI shows message immediately         │                    │
│  │    (optimistic, status indicator)       │                    │
│  └────────────────────┬────────────────────┘                    │
│                       │                                          │
│            ┌──────────▼──────────┐                               │
│            │   Network Check     │                               │
│            └──────────┬──────────┘                               │
│                       │                                          │
│         ┌─────────────┴─────────────┐                           │
│         │ Online                    │ Offline                   │
│         ▼                           ▼                           │
│  ┌─────────────────┐        ┌─────────────────┐                 │
│  │ 5. WebSocket    │        │ Wait in Queue   │                 │
│  │    send(msg)    │        │ (persisted)     │                 │
│  └────────┬────────┘        └─────────────────┘                 │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐         ┌─────────────────┐                │
│  │ 6. Server ACK   │────────►│ 7. Update DB    │                │
│  │ (serverId)      │         │ status='sent'   │                │
│  └─────────────────┘         │ map localId     │                │
│                              └─────────────────┘                │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Queue storage</td><td>MMKV (not SQLite)</td><td>Synchronous writes guarantee data survives crash mid-operation</td></tr>
                <tr><td>ID strategy</td><td>Client-generated localId</td><td>Enables offline creation, deduplication on retry, immediate UI display</td></tr>
                <tr><td>Ordering authority</td><td>Server timestamp</td><td>Single source of truth; client timestamps can drift</td></tr>
                <tr><td>Retry strategy</td><td>Exponential backoff + jitter</td><td>Prevents thundering herd, respects server capacity</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/messaging.ts

/** Message delivery status progression */
type MessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

/** Message entity stored in local database */
interface Message {
    /** Server-assigned ID (null until synced) */
    id: string | null;
    /** Client-generated UUID for deduplication */
    localId: string;
    /** Conversation this message belongs to */
    conversationId: string;
    /** Sender user ID */
    senderId: string;
    /** Message text content */
    content: string;
    /** Client timestamp when created */
    clientTimestamp: number;
    /** Server timestamp (authoritative for ordering) */
    serverTimestamp: number | null;
    /** Current delivery status */
    status: MessageStatus;
    /** Number of send attempts */
    retryCount: number;
    /** Attached media files */
    attachments?: Attachment[];
    /** ID of message being replied to */
    replyToId?: string;
    /** Whether message was edited */
    isEdited: boolean;
    /** Whether message is deleted for sender */
    isDeletedForMe: boolean;
    /** Whether message is deleted for everyone */
    isDeletedForAll: boolean;
}

/** Attachment metadata */
interface Attachment {
    /** Unique attachment ID */
    id: string;
    /** Type: image, video, file, audio */
    type: 'image' | 'video' | 'file' | 'audio';
    /** Local file URI (before upload) */
    localUri: string;
    /** Remote URL (after upload) */
    remoteUrl?: string;
    /** File name */
    name: string;
    /** File size in bytes */
    size: number;
    /** MIME type */
    mimeType: string;
    /** Upload progress 0-100 */
    uploadProgress: number;
    /** Thumbnail for images/videos */
    thumbnailUri?: string;
    /** Duration for audio/video in ms */
    duration?: number;
}

/** Queued operation for offline-first */
interface QueuedOperation {
    /** Unique operation ID */
    id: string;
    /** Operation type */
    type: 'send' | 'delete' | 'edit' | 'mark_read';
    /** Message localId this operation targets */
    messageLocalId: string;
    /** Operation payload */
    payload: Record&lt;string, unknown&gt;;
    /** When operation was created */
    createdAt: number;
    /** Number of send attempts */
    attempts: number;
    /** Next retry scheduled time */
    nextRetryAt: number | null;
}

/** Conversation entity */
interface Conversation {
    /** Conversation ID */
    id: string;
    /** Conversation type */
    type: '1:1' | 'group';
    /** Participant user IDs */
    participants: string[];
    /** Conversation title (for groups) */
    title?: string;
    /** Last message preview */
    lastMessage?: MessagePreview;
    /** Unread message count */
    unreadCount: number;
    /** Muted until timestamp */
    mutedUntil?: number;
    /** Pinned position (null if not pinned) */
    pinnedAt?: number;
}

/** Sync state tracking */
interface SyncState {
    /** Last successful sync cursor */
    lastSyncCursor: string | null;
    /** Last sync timestamp */
    lastSyncAt: number;
    /** Whether sync is in progress */
    isSyncing: boolean;
    /** Pending operation count */
    pendingCount: number;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    ENTITY RELATIONSHIPS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐                                               │
│  │ Conversation │ 1                                             │
│  │              │───────────┐                                   │
│  └──────────────┘           │                                   │
│         │ 1                 │ N                                 │
│         │                   ▼                                   │
│         │           ┌──────────────┐         ┌──────────────┐  │
│         │           │   Message    │ 1     N │  Attachment  │  │
│         │           │              │─────────│              │  │
│         │           └──────────────┘         └──────────────┘  │
│         │                   │                                   │
│         │ N                 │ 1                                 │
│         ▼                   │                                   │
│  ┌──────────────┐           │                                   │
│  │    User      │───────────┘                                   │
│  │ (participant)│  N:1 (sender)                                 │
│  └──────────────┘                                               │
│                                                                  │
│  Queue (separate storage):                                       │
│  ┌──────────────┐         ┌──────────────┐                      │
│  │ QueuedOp     │ N     1 │   Message    │                      │
│  │              │─────────│ (via localId)│                      │
│  └──────────────┘         └──────────────┘                      │
│                                                                  │
│  Legend: ─── relationship   ▼ direction                         │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Messages &amp; conversations</td><td>WatermelonDB</td><td>Reactive queries, lazy loading, SQLite performance</td></tr>
                <tr><td>Operation queue</td><td>MMKV</td><td>Synchronous writes, crash-safe, fast reads</td></tr>
                <tr><td>Sync cursor</td><td>MMKV</td><td>Quick access, doesn't need relational queries</td></tr>
                <tr><td>Attachments (pending)</td><td>File system + MMKV refs</td><td>Large files in Documents dir, refs in MMKV</td></tr>
                <tr><td>Attachments (downloaded)</td><td>Cache directory</td><td>OS can clean up when needed</td></tr>
                <tr><td>localId → serverId map</td><td>MMKV</td><td>Fast deduplication lookup</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Message Queue Service</h5>
            <pre><code>// services/MessageQueue.ts
import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';

const storage = new MMKV({ id: 'message-queue' });

/**
 * Manages the offline message queue with persistence and retry logic.
 * Ensures messages are never lost, even on app crash.
 */
class MessageQueue {
    private queue: QueuedOperation[] = [];
    private isProcessing = false;
    private unsubscribeNetwork: (() =&gt; void) | null = null;

    constructor() {
        this.loadQueue();
        this.setupNetworkListener();
    }

    /**
     * Loads persisted queue from MMKV on startup.
     */
    private loadQueue(): void {
        const saved = storage.getString('pending_queue');
        this.queue = saved ? JSON.parse(saved) : [];
    }

    /**
     * Persists queue to MMKV (synchronous, crash-safe).
     */
    private saveQueue(): void {
        storage.set('pending_queue', JSON.stringify(this.queue));
    }

    /**
     * Listens for network restoration to trigger queue processing.
     */
    private setupNetworkListener(): void {
        this.unsubscribeNetwork = NetInfo.addEventListener(state =&gt; {
            if (state.isConnected &amp;&amp; this.queue.length &gt; 0) {
                this.processQueue();
            }
        });
    }

    /**
     * Enqueues a message for sending.
     * Immediately persists to database and queue.
     * @returns The generated localId
     */
    async enqueue(message: Omit&lt;Message, 'id' | 'status' | 'retryCount'&gt;): Promise&lt;string&gt; {
        const localId = generateNanoid();

        // 1. Save to local database immediately (appears in UI)
        await database.write(async () =&gt; {
            await database.get&lt;MessageModel&gt;('messages').create(msg =&gt; {
                msg.localId = localId;
                msg.conversationId = message.conversationId;
                msg.content = message.content;
                msg.clientTimestamp = Date.now();
                msg.status = 'queued';
                msg.retryCount = 0;
            });
        });

        // 2. Add to send queue
        const operation: QueuedOperation = {
            id: generateNanoid(),
            type: 'send',
            messageLocalId: localId,
            payload: message,
            createdAt: Date.now(),
            attempts: 0,
            nextRetryAt: null,
        };

        this.queue.push(operation);
        this.saveQueue(); // Synchronous - survives crash

        // 3. Trigger immediate processing
        this.processQueue();

        return localId;
    }

    /**
     * Processes the queue in FIFO order.
     * Handles failures with exponential backoff.
     */
    async processQueue(): Promise&lt;void&gt; {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;

        const sortedQueue = [...this.queue].sort((a, b) =&gt; a.createdAt - b.createdAt);

        for (const op of sortedQueue) {
            // Skip if not ready for retry yet
            if (op.nextRetryAt &amp;&amp; op.nextRetryAt &gt; Date.now()) continue;

            try {
                await this.processOperation(op);
                this.removeFromQueue(op.id);
            } catch (error) {
                await this.handleFailure(op, error as Error);
            }
        }

        this.isProcessing = false;
    }

    /**
     * Gets current queue length (for UI status).
     */
    getPendingCount(): number {
        return this.queue.length;
    }

    /**
     * Cleanup on logout.
     */
    destroy(): void {
        this.unsubscribeNetwork?.();
        this.queue = [];
        storage.delete('pending_queue');
    }
}</code></pre>

            <h5>Retry Manager Service</h5>
            <pre><code>// services/RetryManager.ts

/**
 * Manages retry scheduling with exponential backoff and jitter.
 * Prevents thundering herd effect on server recovery.
 */
class RetryManager {
    private retryTimers = new Map&lt;string, NodeJS.Timeout&gt;();
    private readonly MAX_RETRIES = 5;
    private readonly BASE_DELAY_MS = 1000;
    private readonly MAX_DELAY_MS = 300000; // 5 minutes

    /**
     * Calculates delay with exponential backoff + jitter.
     * @param attempts - Number of previous attempts
     * @returns Delay in milliseconds
     */
    calculateDelay(attempts: number): number {
        const exponentialDelay = Math.min(
            this.BASE_DELAY_MS * Math.pow(2, attempts),
            this.MAX_DELAY_MS
        );
        // Add 0-30% jitter to prevent synchronized retries
        const jitter = Math.random() * 0.3 * exponentialDelay;
        return exponentialDelay + jitter;
    }

    /**
     * Schedules a retry for the given operation.
     */
    scheduleRetry(operation: QueuedOperation, onRetry: () =&gt; void): void {
        this.clearRetry(operation.id);

        if (operation.attempts &gt;= this.MAX_RETRIES) {
            // Mark as permanently failed
            messageQueue.markFailed(operation.id);
            return;
        }

        const delay = this.calculateDelay(operation.attempts);

        const timer = setTimeout(() =&gt; {
            this.retryTimers.delete(operation.id);
            onRetry();
        }, delay);

        this.retryTimers.set(operation.id, timer);
    }

    /**
     * Cancels a scheduled retry.
     */
    clearRetry(operationId: string): void {
        const timer = this.retryTimers.get(operationId);
        if (timer) {
            clearTimeout(timer);
            this.retryTimers.delete(operationId);
        }
    }

    /**
     * Cancels all pending retries.
     */
    clearAll(): void {
        this.retryTimers.forEach(timer =&gt; clearTimeout(timer));
        this.retryTimers.clear();
    }
}</code></pre>

            <h5>Native Background Sync APIs</h5>
            <pre><code>// iOS - BackgroundSyncModule.swift

import BackgroundTasks

@objc(BackgroundSyncModule)
class BackgroundSyncModule: NSObject {

    /// Register background task with iOS
    @objc static func registerBackgroundTask() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: "com.app.message-sync",
            using: nil
        ) { task in
            Self.handleSync(task: task as! BGProcessingTask)
        }
    }

    /// Schedule background sync when app enters background
    @objc func scheduleBackgroundSync() {
        let request = BGProcessingTaskRequest(identifier: "com.app.message-sync")
        request.requiresNetworkConnectivity = true
        request.requiresExternalPower = false
        request.earliestBeginDate = Date(timeIntervalSinceNow: 60) // 1 minute
        try? BGTaskScheduler.shared.submit(request)
    }

    /// Handle background sync execution
    private static func handleSync(task: BGProcessingTask) {
        // Set expiration handler
        task.expirationHandler = {
            MessageSyncEngine.shared.cancelSync()
        }

        // Perform sync
        MessageSyncEngine.shared.flushQueue { success in
            task.setTaskCompleted(success: success)
            // Schedule next sync if queue not empty
            if MessageSyncEngine.shared.hasPendingMessages() {
                self.scheduleBackgroundSync()
            }
        }
    }
}

// Android - MessageSyncWorker.kt

class MessageSyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        val queue = MessageQueue.getInstance(applicationContext)

        return try {
            val pending = queue.getPendingOperations()

            for (operation in pending) {
                try {
                    when (operation.type) {
                        "send" -&gt; sendMessage(operation)
                        "delete" -&gt; deleteMessage(operation)
                        "edit" -&gt; editMessage(operation)
                    }
                    queue.remove(operation.id)
                } catch (e: Exception) {
                    queue.incrementAttempts(operation.id)
                    if (operation.attempts &gt;= MAX_RETRIES) {
                        queue.markFailed(operation.id)
                    }
                }
            }

            if (queue.getPendingCount() &gt; 0) Result.retry()
            else Result.success()
        } catch (e: Exception) {
            if (runAttemptCount &lt; 3) Result.retry() else Result.failure()
        }
    }

    companion object {
        private const val MAX_RETRIES = 5

        fun schedule(context: Context) {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()

            val request = OneTimeWorkRequestBuilder&lt;MessageSyncWorker&gt;()
                .setConstraints(constraints)
                .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
                .build()

            WorkManager.getInstance(context)
                .enqueueUniqueWork("message-sync", ExistingWorkPolicy.KEEP, request)
        }
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Synchronous queue persistence:</strong>
                    <ul>
                        <li>Problem: Async writes to SQLite can lose data on crash</li>
                        <li>Solution: Use MMKV for queue (synchronous write-through). Message reaches disk before UI updates.</li>
                        <li>Impact: Zero message loss even on immediate app kill</li>
                    </ul>
                </li>
                <li><strong>Batched server sync:</strong>
                    <ul>
                        <li>Problem: Individual API calls for each message waste bandwidth</li>
                        <li>Solution: Batch up to 50 messages per API call when coming back online</li>
                        <li>Impact: 10x reduction in API calls after long offline period</li>
                    </ul>
                </li>
                <li><strong>Delta sync with cursors:</strong>
                    <ul>
                        <li>Problem: Full sync on each app launch is slow</li>
                        <li>Solution: Track sync cursor, only fetch messages since last cursor</li>
                        <li>Impact: 95% reduction in sync payload for typical usage</li>
                    </ul>
                </li>
                <li><strong>Optimistic status updates:</strong>
                    <ul>
                        <li>Problem: Waiting for server ACK delays UI feedback</li>
                        <li>Solution: Show 'sending' immediately, update to 'sent' on ACK, rollback on failure</li>
                        <li>Impact: Instant perceived send time, better UX</li>
                    </ul>
                </li>
                <li><strong>Attachment upload queue:</strong>
                    <ul>
                        <li>Problem: Large files block text messages in queue</li>
                        <li>Solution: Separate high-priority text queue and lower-priority attachment queue</li>
                        <li>Impact: Text messages deliver instantly even with pending uploads</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background sync</td><td>BGProcessingTask (15-30 min)</td><td>WorkManager with expedited (immediate)</td></tr>
                <tr><td>Push wake</td><td>Silent push triggers app</td><td>FCM high priority wakes app</td></tr>
                <tr><td>Queue storage</td><td>App Group for extension access</td><td>Internal storage (secure)</td></tr>
                <tr><td>Network detection</td><td>NWPathMonitor</td><td>ConnectivityManager callback</td></tr>
                <tr><td>Foreground service</td><td>Not needed (BGTask sufficient)</td><td>Required for reliable delivery</td></tr>
                <tr><td>Delivery receipt</td><td>Notification Service Extension</td><td>FCM onMessageReceived</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>App killed mid-send:</strong> MMKV queue persists synchronously. On restart, detect 'sending' status without ACK, requeue with attempt incremented.</li>
                <li><strong>Duplicate delivery risk:</strong> Server deduplicates by localId. If we receive ACK but crash before updating status, retry is safe - server returns existing message ID.</li>
                <li><strong>Out-of-order display:</strong> Use serverTimestamp for sorting. Client timestamp only for tie-breaking. Show "sending" messages at bottom until confirmed.</li>
                <li><strong>Conversation deleted while offline:</strong> On sync, if conversation no longer exists, discard pending messages for it and notify user.</li>
                <li><strong>Attachment upload partial:</strong> Track upload progress in MMKV. Resume from last byte offset. Server supports chunked upload.</li>
                <li><strong>Network flapping:</strong> Debounce connectivity changes (500ms). Don't trigger queue processing on rapid on/off cycles.</li>
                <li><strong>Message edit after send:</strong> Queue edit operation. If original still pending, merge edit into send payload instead.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Queue storage</td><td>MMKV</td><td>SQLite/Realm</td><td>Synchronous writes critical for crash safety</td></tr>
                <tr><td>Message DB</td><td>WatermelonDB</td><td>Realm, SQLite direct</td><td>Reactive queries, lazy loading, proven at scale</td></tr>
                <tr><td>ID generation</td><td>Client nanoid</td><td>Server UUID</td><td>Enables offline creation, immediate display</td></tr>
                <tr><td>Retry strategy</td><td>Exponential + jitter</td><td>Fixed interval</td><td>Prevents server overload, respects capacity</td></tr>
                <tr><td>Background sync</td><td>Platform APIs</td><td>Keep-alive connection</td><td>Battery efficient, OS-managed scheduling</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Queue enqueue/dequeue operations</li>
                        <li>Retry delay calculation with jitter bounds</li>
                        <li>Deduplication logic</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Offline → online transition with pending messages</li>
                        <li>App kill simulation with queue recovery</li>
                        <li>Concurrent queue operations</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>Send message while offline, verify delivery on reconnect</li>
                        <li>Send 100 messages offline, verify all arrive in order</li>
                        <li>Network flap during send, verify single delivery</li>
                    </ul>
                </li>
                <li><strong>Chaos Tests:</strong>
                    <ul>
                        <li>Random app kills during operations</li>
                        <li>Network partition with eventual heal</li>
                        <li>Server returning errors for subset of batch</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why localId instead of waiting for server ID?</strong><br/>A: Enables instant UI display, offline creation, and safe retries. Server uses localId for idempotent deduplication. Trade-off: slightly more complex state management.</li>
                <li><strong>Q: How do you guarantee exactly-once delivery?</strong><br/>A: We don't - we guarantee at-least-once with server-side deduplication. Server maintains localId → messageId map with TTL. Client retries are idempotent.</li>
                <li><strong>Q: Why exponential backoff with jitter?</strong><br/>A: Prevents thundering herd when server recovers from outage. Without jitter, all clients retry at synchronized intervals, potentially overwhelming the server again.</li>
                <li><strong>Q: How do you handle message ordering across devices?</strong><br/>A: Server timestamp is authoritative. Client timestamps can drift. On conflict, server wins. Messages show in server-timestamp order, not local-send order.</li>
                <li><strong>Q: What happens to queued messages on logout?</strong><br/>A: Option A: Flush queue before logout (blocking). Option B: Clear queue (data loss). We chose A with timeout - attempt flush for up to 30s, then warn user of unsent messages.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Queue Persistence</td><td>react-native-mmkv</td><td>Synchronous, crash-safe, 30x faster than AsyncStorage</td></tr>
                <tr><td>Message Database</td><td>WatermelonDB</td><td>Lazy loading, reactive queries, SQLite performance</td></tr>
                <tr><td>Network Detection</td><td>@react-native-community/netinfo</td><td>Reliable connectivity status, type detection</td></tr>
                <tr><td>WebSocket</td><td>socket.io-client</td><td>Auto-reconnection, fallback to polling, rooms</td></tr>
                <tr><td>Background Sync</td><td>react-native-background-fetch</td><td>Cross-platform BGTask/WorkManager wrapper</td></tr>
                <tr><td>ID Generation</td><td>nanoid</td><td>URL-safe, smaller than UUID, fast</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>Simple, minimal boilerplate for sync state</td></tr>
            </table>
        `
     },
    {
        id: 78,
        category: "System Design",
        icon: "🏛️",
        question: "Design a real-time chat system with typing indicators, read receipts, and presence",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Scale:</strong> How many concurrent users? Messages per second? Conversations per user?</li>
                <li><strong>Latency requirements:</strong> What's acceptable delay for typing indicators? Read receipts?</li>
                <li><strong>Presence granularity:</strong> Online/offline only, or also "away", "do not disturb", custom status?</li>
                <li><strong>Group chat size:</strong> What's the maximum participants? Different treatment for large groups?</li>
                <li><strong>Privacy settings:</strong> Can users disable read receipts? Hide last seen?</li>
                <li><strong>Multi-device:</strong> Should presence reflect any device online, or per-device?</li>
                <li><strong>Historical data:</strong> How far back to show "last seen"? Typing history?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Real-time message delivery with &lt;100ms latency on good network</li>
                <li>Typing indicators showing "User is typing..." with 2-second debounce</li>
                <li>Read receipts with sent → delivered → read progression</li>
                <li>User presence: online, away (after 5 min), offline with "last seen X" timestamp</li>
                <li>Group chat support showing multiple typing users ("A, B are typing...")</li>
                <li>Graceful degradation on poor network (queue events, sync on reconnect)</li>
                <li>Privacy controls for read receipts and last seen visibility</li>
                <li>Push notifications for messages when app backgrounded</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Typing indicator broadcast latency &lt;200ms end-to-end</li>
                <li>Presence update propagation within 5 seconds of state change</li>
                <li>Support 50,000+ concurrent WebSocket connections per server node</li>
                <li>Read receipts batched to prevent flooding (max 5/second)</li>
                <li>Battery-efficient: minimize mobile wake-ups, batch heartbeats</li>
                <li>Memory efficient: don't hold presence for inactive users in memory</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>End-to-end encryption of messages</li>
                <li>Voice/video calling</li>
                <li>File/media sharing</li>
                <li>Message reactions/replies</li>
                <li>Channels/broadcast functionality</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌───────────────────────────────────────────────────────────────────────┐
│                   REAL-TIME CHAT ARCHITECTURE                          │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐│
│  │                        CLIENT LAYER                                ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌─────────────────────┐  ││
│  │  │ WebSocket      │  │ Presence       │  │ Typing Manager      │  ││
│  │  │ Manager        │  │ Tracker        │  │ (debounced)         │  ││
│  │  └───────┬────────┘  └───────┬────────┘  └──────────┬──────────┘  ││
│  │          │                   │                      │              ││
│  │          └───────────────────┼──────────────────────┘              ││
│  └──────────────────────────────┼────────────────────────────────────┘│
│                                 │                                      │
│                        WebSocket (socket.io)                           │
│                                 │                                      │
│  ┌──────────────────────────────▼────────────────────────────────────┐│
│  │                        GATEWAY LAYER                               ││
│  │  ┌────────────────┐  ┌────────────────────┐  ┌─────────────────┐  ││
│  │  │ WS Gateway     │  │ Connection Router  │  │ Auth Middleware │  ││
│  │  │ Cluster        │  │ (Sticky Sessions)  │  │ (JWT verify)    │  ││
│  │  └───────┬────────┘  └────────────────────┘  └─────────────────┘  ││
│  └──────────┼────────────────────────────────────────────────────────┘│
│             │                                                          │
│  ┌──────────▼────────────────────────────────────────────────────────┐│
│  │                        SERVICE LAYER                               ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐   ││
│  │  │ Message Service │  │ Presence Service│  │ Typing Service   │   ││
│  │  │ (persist + ACK) │  │ (Redis TTL)     │  │ (ephemeral)      │   ││
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬─────────┘   ││
│  │           │                    │                    │              ││
│  │  ┌────────▼────────────────────▼────────────────────▼────────────┐││
│  │  │              Redis Cluster (Pub/Sub + Data)                   │││
│  │  │  • Channel: presence:{userId}     • Hash: online_users        │││
│  │  │  • Channel: typing:{conversationId}                           │││
│  │  │  • Channel: read_receipts:{conversationId}                    │││
│  │  └───────────────────────────────────────────────────────────────┘││
│  └───────────────────────────────────────────────────────────────────┘│
│                                 │                                      │
│  ┌──────────────────────────────▼────────────────────────────────────┐│
│  │                        PERSISTENCE LAYER                           ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐   ││
│  │  │ PostgreSQL      │  │ S3 (media)      │  │ FCM/APNs Push    │   ││
│  │  │ (messages, users)│ │                 │  │ Service          │   ││
│  │  └─────────────────┘  └─────────────────┘  └──────────────────┘   ││
│  └───────────────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>WebSocket Manager</td><td>Connection lifecycle, reconnection, event routing</td><td>socket.io-client</td></tr>
                <tr><td>Presence Tracker</td><td>Track online/away/offline status with last seen</td><td>Redis with TTL keys</td></tr>
                <tr><td>Typing Manager</td><td>Debounced typing broadcasts, timeout cleanup</td><td>Client timers + ephemeral Redis</td></tr>
                <tr><td>Read Receipt Service</td><td>Batch and deliver read receipts</td><td>Redis Pub/Sub</td></tr>
                <tr><td>Connection Router</td><td>Route messages to correct server instance</td><td>Redis Pub/Sub + sticky sessions</td></tr>
                <tr><td>Push Service</td><td>Deliver notifications when app backgrounded</td><td>FCM/APNs</td></tr>
            </table>

            <h5>Real-time Event Flow</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                  REAL-TIME EVENT FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A Types                                                    │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐   Debounce    ┌───────────────────────────┐│
│  │ onChangeText    │──(300ms)────► │ socket.emit('typing',     ││
│  │ callback        │               │   { conversationId,       ││
│  └─────────────────┘               │     isTyping: true })     ││
│                                    └────────────┬──────────────┘│
│                                                 │                │
│                                                 ▼                │
│                                    ┌───────────────────────────┐│
│                                    │  Server: Redis Pub/Sub    ││
│                                    │  PUBLISH typing:{convId}  ││
│                                    └────────────┬──────────────┘│
│                                                 │                │
│         ┌───────────────────────────────────────┘                │
│         │ (all subscribers on any server)                        │
│         ▼                                                        │
│  ┌─────────────────┐                                            │
│  │ User B/C/D      │                                            │
│  │ receive event   │                                            │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐    3 sec timeout   ┌─────────────────────┐│
│  │ Show "A is      │───────────────────►│ Clear indicator     ││
│  │ typing..."      │   (no new event)   │ automatically       ││
│  └─────────────────┘                    └─────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Transport</td><td>WebSocket (socket.io)</td><td>True bidirectional, low latency, built-in reconnection</td></tr>
                <tr><td>Presence storage</td><td>Redis with TTL</td><td>Auto-expire offline users, fast read/write, pub/sub built-in</td></tr>
                <tr><td>Typing data</td><td>Ephemeral only</td><td>No persistence needed, 3-second lifetime, memory-only</td></tr>
                <tr><td>Read receipts</td><td>Batched async</td><td>Reduce flood, eventual delivery acceptable</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/realtime.ts

/** User presence status values */
type PresenceStatus = 'online' | 'away' | 'offline';

/** Presence state for a user */
interface PresenceState {
    /** User ID */
    userId: string;
    /** Current presence status */
    status: PresenceStatus;
    /** Unix timestamp of last activity (null if online) */
    lastSeen: number | null;
    /** Device type (mobile, desktop, web) */
    device: 'mobile' | 'desktop' | 'web';
    /** Custom status message (optional) */
    statusMessage?: string;
}

/** Typing indicator event */
interface TypingEvent {
    /** Conversation where typing is happening */
    conversationId: string;
    /** User who is typing */
    userId: string;
    /** True if started typing, false if stopped */
    isTyping: boolean;
    /** Event timestamp for timeout calculation */
    timestamp: number;
}

/** Read receipt event */
interface ReadReceipt {
    /** Message that was read */
    messageId: string;
    /** Conversation containing the message */
    conversationId: string;
    /** User who read the message */
    userId: string;
    /** When the message was read */
    readAt: number;
}

/** Message delivery status update */
interface DeliveryStatus {
    /** Message ID */
    messageId: string;
    /** New status */
    status: 'delivered' | 'read';
    /** User who received/read */
    userId: string;
    /** Timestamp of status change */
    timestamp: number;
}

/** Connection state for UI display */
interface ConnectionState {
    /** Whether socket is connected */
    isConnected: boolean;
    /** Reconnection attempt count */
    reconnectAttempts: number;
    /** Last successful connection timestamp */
    lastConnected: number | null;
    /** Reason for disconnection (if any) */
    disconnectReason?: string;
}

/** Privacy settings per user */
interface PrivacySettings {
    /** Show read receipts to others */
    showReadReceipts: boolean;
    /** Show typing indicators to others */
    showTypingIndicator: boolean;
    /** Show last seen timestamp */
    showLastSeen: boolean;
    /** Who can see presence: 'everyone' | 'contacts' | 'nobody' */
    presenceVisibility: 'everyone' | 'contacts' | 'nobody';
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    ENTITY RELATIONSHIPS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐          ┌──────────────┐                     │
│  │    User      │ 1      1 │PresenceState │                     │
│  │              │──────────│              │                     │
│  └──────┬───────┘          └──────────────┘                     │
│         │                                                        │
│         │ 1                                                      │
│         │                                                        │
│         │ N                                                      │
│  ┌──────▼───────┐                                               │
│  │ Conversation │ 1      N ┌──────────────┐                     │
│  │              │──────────│ TypingEvent  │                     │
│  └──────┬───────┘          │ (ephemeral)  │                     │
│         │                  └──────────────┘                     │
│         │ 1                                                      │
│         │                                                        │
│         │ N                                                      │
│  ┌──────▼───────┐          ┌──────────────┐                     │
│  │   Message    │ 1      N │ ReadReceipt  │                     │
│  │              │──────────│              │                     │
│  └──────────────┘          └──────────────┘                     │
│                                                                  │
│  Note: PresenceState and TypingEvent are ephemeral (Redis TTL)  │
│        ReadReceipts may be persisted for history                │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Presence state</td><td>Redis (TTL 60s)</td><td>Auto-cleanup on disconnect, fast reads</td></tr>
                <tr><td>Typing events</td><td>Redis (TTL 5s)</td><td>Ephemeral, no persistence needed</td></tr>
                <tr><td>Read receipts</td><td>PostgreSQL + Redis cache</td><td>Persistent for history, cached for speed</td></tr>
                <tr><td>Last seen</td><td>PostgreSQL (updated on disconnect)</td><td>Persistent historical data</td></tr>
                <tr><td>Privacy settings</td><td>PostgreSQL + MMKV local cache</td><td>User preferences, synced locally</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>WebSocket Manager Service</h5>
            <pre><code>// services/SocketManager.ts
import { io, Socket } from 'socket.io-client';

/**
 * Manages WebSocket connection lifecycle and event routing.
 * Handles reconnection, event queueing, and subscription management.
 */
class SocketManager {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private pendingEvents: Array&lt;{ event: string; data: unknown }&gt; = [];
    private listeners = new Map&lt;string, Set&lt;(data: unknown) =&gt; void&gt;&gt;();
    private heartbeatInterval: NodeJS.Timer | null = null;

    /**
     * Connects to the WebSocket server with authentication.
     * @param token - JWT auth token
     */
    connect(token: string): void {
        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
            reconnectionAttempts: Infinity,
        });

        this.setupEventHandlers();
        this.startHeartbeat();
    }

    private setupEventHandlers(): void {
        if (!this.socket) return;

        this.socket.on('connect', () =&gt; {
            this.reconnectAttempts = 0;
            this.flushPendingEvents();
            this.emit('connection:established');
        });

        this.socket.on('disconnect', (reason) =&gt; {
            this.emit('connection:lost', { reason });
        });

        this.socket.on('connect_error', (error) =&gt; {
            this.reconnectAttempts++;
            this.emit('connection:error', { error, attempts: this.reconnectAttempts });
        });

        // Forward server events to subscribers
        const events = ['message', 'typing', 'presence', 'read_receipt', 'delivery_status'];
        events.forEach(event =&gt; {
            this.socket?.on(event, (data) =&gt; this.emit(event, data));
        });
    }

    /**
     * Sends an event to the server.
     * Queues event if disconnected.
     */
    send(event: string, data: unknown): void {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        } else {
            this.pendingEvents.push({ event, data });
        }
    }

    /**
     * Subscribes to an event type.
     * @returns Unsubscribe function
     */
    subscribe&lt;T&gt;(event: string, callback: (data: T) =&gt; void): () =&gt; void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback as (data: unknown) =&gt; void);
        return () =&gt; this.listeners.get(event)?.delete(callback as (data: unknown) =&gt; void);
    }

    /**
     * Gets current connection state.
     */
    getConnectionState(): ConnectionState {
        return {
            isConnected: this.socket?.connected ?? false,
            reconnectAttempts: this.reconnectAttempts,
            lastConnected: null, // Track separately
        };
    }

    /**
     * Gracefully disconnects the socket.
     */
    disconnect(): void {
        this.stopHeartbeat();
        this.socket?.disconnect();
    }

    private emit(event: string, data?: unknown): void {
        this.listeners.get(event)?.forEach(cb =&gt; cb(data));
    }

    private flushPendingEvents(): void {
        while (this.pendingEvents.length &gt; 0) {
            const { event, data } = this.pendingEvents.shift()!;
            this.send(event, data);
        }
    }

    private startHeartbeat(): void {
        this.heartbeatInterval = setInterval(() =&gt; {
            this.send('heartbeat', { timestamp: Date.now() });
        }, 30000);
    }

    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }
}</code></pre>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useTypingIndicator.ts

/**
 * Hook to track and display typing indicators for a conversation.
 * Automatically cleans up stale indicators.
 */
function useTypingIndicator(conversationId: string): {
    /** Array of user IDs currently typing */
    typingUserIds: string[];
    /** Send typing status for current user */
    sendTypingStatus: (isTyping: boolean) =&gt; void;
};

// hooks/usePresence.ts

/**
 * Hook to track presence status for a list of users.
 * Subscribes to presence updates via WebSocket.
 */
function usePresence(userIds: string[]): {
    /** Map of userId to presence state */
    presence: Map&lt;string, PresenceState&gt;;
    /** Whether presence data is loading */
    isLoading: boolean;
};

// hooks/useReadReceipts.ts

/**
 * Hook to manage read receipts for a conversation.
 * Batches receipts to avoid flooding.
 */
function useReadReceipts(conversationId: string): {
    /** Mark a message as read (batched) */
    markAsRead: (messageId: string) =&gt; void;
    /** Get read status for a message */
    getReadBy: (messageId: string) =&gt; string[];
};</code></pre>

            <h5>Native Bridge APIs</h5>
            <pre><code>// iOS - PresenceModule.swift

@objc(PresenceModule)
class PresenceModule: NSObject {
    private var backgroundTask: UIBackgroundTaskIdentifier = .invalid

    /// Handle app entering background - update presence to "away"
    @objc func handleAppBackground() {
        backgroundTask = UIApplication.shared.beginBackgroundTask { [weak self] in
            self?.endBackgroundTask()
        }

        // Send presence update before socket closes
        SocketBridge.shared.send("presence:update", ["status": "away"])

        // Keep alive briefly for pending operations
        DispatchQueue.main.asyncAfter(deadline: .now() + 25) { [weak self] in
            self?.endBackgroundTask()
        }
    }

    /// Handle app becoming active - update presence to "online"
    @objc func handleAppForeground() {
        SocketBridge.shared.reconnectIfNeeded()
        SocketBridge.shared.send("presence:update", ["status": "online"])
    }

    private func endBackgroundTask() {
        if backgroundTask != .invalid {
            SocketBridge.shared.disconnect()
            UIApplication.shared.endBackgroundTask(backgroundTask)
            backgroundTask = .invalid
        }
    }
}

// Android - PresenceModule.kt

class PresenceModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun onHostResume() {
        // App came to foreground
        SocketManager.getInstance().reconnectIfNeeded()
        SocketManager.getInstance().send("presence:update", mapOf("status" to "online"))
    }

    override fun onHostPause() {
        // App went to background
        SocketManager.getInstance().send("presence:update", mapOf("status" to "away"))
    }

    override fun onHostDestroy() {
        // App being killed
        SocketManager.getInstance().send("presence:update", mapOf("status" to "offline"))
        SocketManager.getInstance().disconnect()
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Typing indicator debounce:</strong>
                    <ul>
                        <li>Problem: Sending typing event on every keystroke floods server</li>
                        <li>Solution: Leading-edge debounce (300ms) - send immediately, then throttle. Stop event on 2s idle.</li>
                        <li>Impact: 95% reduction in typing events while maintaining responsive indicators</li>
                    </ul>
                </li>
                <li><strong>Read receipt batching:</strong>
                    <ul>
                        <li>Problem: Scrolling through messages sends rapid read receipts</li>
                        <li>Solution: Batch receipts into 500ms windows, send only the highest message ID per user</li>
                        <li>Impact: Single receipt per batch instead of potentially hundreds</li>
                    </ul>
                </li>
                <li><strong>Presence heartbeat optimization:</strong>
                    <ul>
                        <li>Problem: Frequent heartbeats waste battery and bandwidth</li>
                        <li>Solution: 30s heartbeat in foreground, 5-min heartbeat in background, Redis TTL of 60s</li>
                        <li>Impact: 90% reduction in heartbeat traffic while maintaining accurate presence</li>
                    </ul>
                </li>
                <li><strong>Connection pooling on server:</strong>
                    <ul>
                        <li>Problem: Each user connection consumes server memory</li>
                        <li>Solution: Redis Pub/Sub allows any server to route messages; stateless connection handlers</li>
                        <li>Impact: Linear scaling to 50K+ connections per server node</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background socket</td><td>~30s via beginBackgroundTask</td><td>Unlimited via foreground service</td></tr>
                <tr><td>Wake for messages</td><td>Silent/VoIP push (PushKit)</td><td>FCM high-priority</td></tr>
                <tr><td>Presence on background</td><td>Send "away" before disconnect</td><td>Maintain "away" in service</td></tr>
                <tr><td>Socket library</td><td>Native URLSessionWebSocketTask</td><td>OkHttp WebSocket</td></tr>
                <tr><td>Battery impact</td><td>Low - no background maintenance</td><td>Medium - foreground service</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Typing indicator timeout:</strong> Client-side timer clears indicator after 3s of no updates. Server-side Redis TTL of 5s as backup.</li>
                <li><strong>Multiple simultaneous typers:</strong> Show up to 3 names ("A, B, and C are typing"), then "Several people are typing" for 4+.</li>
                <li><strong>Socket disconnect mid-conversation:</strong> Queue typing stop event, send on reconnect. Show "Reconnecting..." UI indicator.</li>
                <li><strong>Read receipt for deleted message:</strong> Ignore silently - message already removed, receipt irrelevant.</li>
                <li><strong>Presence flapping:</strong> Debounce rapid online/offline (3s window) to prevent status flickering.</li>
                <li><strong>Privacy setting check:</strong> Server validates sender's privacy settings before broadcasting presence/receipts to recipients.</li>
                <li><strong>Multi-device presence:</strong> User is "online" if ANY device is online. "Last seen" shows most recent activity across all devices.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Transport</td><td>WebSocket (socket.io)</td><td>gRPC streaming / SSE</td><td>Bidirectional, browser fallback, room support built-in</td></tr>
                <tr><td>Presence storage</td><td>Redis TTL</td><td>Database with cleanup job</td><td>Automatic expiry, no cleanup needed, faster</td></tr>
                <tr><td>Typing transport</td><td>Same WebSocket</td><td>Separate lightweight channel</td><td>Simpler architecture, sufficient for scale</td></tr>
                <tr><td>Scaling</td><td>Sticky sessions + Redis Pub/Sub</td><td>Message broker (Kafka)</td><td>Lower latency, simpler ops for chat use case</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Debounce logic for typing indicators</li>
                        <li>Read receipt batching algorithm</li>
                        <li>Presence state machine transitions</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Socket connect/disconnect/reconnect cycles</li>
                        <li>Presence updates across multiple server instances</li>
                        <li>Privacy settings respected in broadcasts</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>User A types, User B sees indicator within 200ms</li>
                        <li>User A reads message, User B sees receipt within 1s</li>
                        <li>User A backgrounds app, User B sees "away" within 30s</li>
                    </ul>
                </li>
                <li><strong>Load Tests:</strong>
                    <ul>
                        <li>10,000 concurrent connections per server</li>
                        <li>1,000 typing events/second cluster-wide</li>
                        <li>Latency percentiles under load (p50 &lt; 50ms, p99 &lt; 200ms)</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: WebSocket vs HTTP long-polling?</strong><br/>A: WebSocket for true bidirectional, lower latency, less overhead per message. Long-polling as fallback when WebSocket blocked by corporate firewalls. Socket.io handles this automatically.</li>
                <li><strong>Q: Why sticky sessions?</strong><br/>A: Socket.io uses in-memory session state. Sticky sessions ensure client reconnects to same server. Redis Pub/Sub allows cross-server message routing regardless.</li>
                <li><strong>Q: How to scale horizontally?</strong><br/>A: Each server handles WebSocket connections independently. Redis Pub/Sub broadcasts to all servers. Any server can receive API call and publish to Redis. Sticky sessions just optimize reconnection.</li>
                <li><strong>Q: Typing indicator debounce timing?</strong><br/>A: 300ms leading-edge: send immediately when user starts typing (responsive), then throttle. 2s trailing: send "stopped typing" after 2s idle. 3s client timeout: clear indicator if no update. Balance between responsiveness and traffic.</li>
                <li><strong>Q: Battery considerations?</strong><br/>A: Batch heartbeats, reduce frequency in background, close socket when truly idle. iOS: rely on push wake. Android: optional foreground service for power users, background FCM for others.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>WebSocket Client</td><td>socket.io-client</td><td>Auto-reconnection, rooms, fallback to polling</td></tr>
                <tr><td>App State</td><td>react-native-appstate-hook</td><td>Easy foreground/background detection</td></tr>
                <tr><td>Network Info</td><td>@react-native-community/netinfo</td><td>Connectivity status for UI indicators</td></tr>
                <tr><td>Debounce</td><td>lodash.debounce or usehooks-ts</td><td>Typing indicator throttling</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>Simple reactive store for presence/typing</td></tr>
                <tr><td>Date Formatting</td><td>date-fns</td><td>Relative time for "last seen"</td></tr>
            </table>
        `
     },
    {
        id: 79,
        category: "System Design",
        icon: "🏛️",
        question: "How would you build a live auction or bidding feature?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Scale:</strong> How many concurrent bidders per auction? Peak auction events (thousands simultaneous)?</li>
                <li><strong>Auction types:</strong> English (ascending), Dutch (descending), sealed-bid, or all types?</li>
                <li><strong>Real-time requirements:</strong> What's acceptable latency for bid updates to reach all participants?</li>
                <li><strong>Anti-snipe policy:</strong> Should last-second bids extend the auction? By how much?</li>
                <li><strong>Payment integration:</strong> Pre-authorize cards, hold deposits, or payment post-win?</li>
                <li><strong>Reserve prices:</strong> Should reserve be visible, hidden, or "reserve not met" indicator?</li>
                <li><strong>Proxy/automatic bidding:</strong> Support max-bid auto-incrementing feature?</li>
                <li><strong>Offline tolerance:</strong> Can users place bids while briefly disconnected?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Real-time bid updates visible to all participants within 100ms</li>
                <li>Precise countdown timer synchronized across all devices (&lt;50ms drift)</li>
                <li>Anti-snipe protection - extend auction by 30s on bids in final 30s</li>
                <li>Complete bid history with user identification and timestamps</li>
                <li>Automatic winner determination and notification</li>
                <li>Reserve price support with "reserve not met" indicator</li>
                <li>Buy-now option to immediately end auction at fixed price</li>
                <li>Proxy/automatic bidding with user-defined maximum</li>
                <li>Outbid notifications via push, SMS, and email</li>
                <li>Watchlist functionality with auction reminder alerts</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Scalability:</strong> Handle 10,000+ concurrent bidders per auction</li>
                <li><strong>Latency:</strong> Bid processing &lt;50ms server-side, broadcast &lt;100ms to all clients</li>
                <li><strong>Consistency:</strong> Zero double-bid or race condition issues (strong consistency for bids)</li>
                <li><strong>Availability:</strong> 99.99% uptime during live auctions</li>
                <li><strong>Timer precision:</strong> Server-client time sync within 50ms</li>
                <li><strong>Mobile performance:</strong> 60fps animations, responsive UI during rapid bidding</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Item listing and inventory management</li>
                <li>Seller verification and fraud detection systems</li>
                <li>Payment processing implementation details</li>
                <li>Shipping and fulfillment logistics</li>
                <li>Multi-currency support and tax calculations</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────┐
│                      LIVE AUCTION ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                        Mobile Client                             │    │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐    │    │
│  │  │  Auction UI   │  │ State Machine │  │  WebSocket Client │    │    │
│  │  │ (Reanimated)  │  │   (XState)    │  │   (socket.io)     │    │    │
│  │  └───────────────┘  └───────────────┘  └───────────────────┘    │    │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐    │    │
│  │  │ Haptic Engine │  │ Timer Module  │  │  Optimistic UI    │    │    │
│  │  │   (Native)    │  │ (CADisplayLink│  │    Manager        │    │    │
│  │  │               │  │  /Choreograph)│  │                   │    │    │
│  │  └───────────────┘  └───────────────┘  └───────────────────┘    │    │
│  └────────────────────────────┬────────────────────────────────────┘    │
│                               │ WSS (TLS)                                │
│  ┌────────────────────────────▼────────────────────────────────────┐    │
│  │                      API Gateway / Load Balancer                 │    │
│  │              (Sticky Sessions + WebSocket Upgrade)               │    │
│  └────────────────────────────┬────────────────────────────────────┘    │
│                               │                                          │
│  ┌────────────────────────────┼────────────────────────────────────┐    │
│  │   WebSocket Server Cluster │                                     │    │
│  │  ┌─────────────────────────▼─────────────────────────────────┐  │    │
│  │  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │    │
│  │  │   │  WS Node 1  │  │  WS Node 2  │  │  WS Node N  │       │  │    │
│  │  │   │  (Auction   │  │  (Auction   │  │  (Auction   │       │  │    │
│  │  │   │   Rooms)    │  │   Rooms)    │  │   Rooms)    │       │  │    │
│  │  │   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │  │    │
│  │  └──────────┼────────────────┼────────────────┼──────────────┘  │    │
│  └─────────────┼────────────────┼────────────────┼──────────────────┘    │
│                │                │                │                        │
│  ┌─────────────▼────────────────▼────────────────▼──────────────────┐    │
│  │                         Redis Cluster                             │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐   │    │
│  │  │ Distributed │  │  Pub/Sub    │  │  Sorted Sets            │   │    │
│  │  │   Locks     │  │ (Broadcast) │  │ (Bid Leaderboard)       │   │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘   │    │
│  └──────────────────────────┬───────────────────────────────────────┘    │
│                             │                                            │
│  ┌──────────────────────────┴───────────────────────────────────────┐    │
│  │                       Service Layer                               │    │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐  │    │
│  │  │  Bid Processor   │  │ Auction Manager  │  │ Notification   │  │    │
│  │  │  (Lua Scripts)   │  │ (Timer/State)    │  │ Service        │  │    │
│  │  └────────┬─────────┘  └────────┬─────────┘  └────────┬───────┘  │    │
│  │           │                     │                     │          │    │
│  │  ┌────────▼─────────────────────▼─────────────────────▼───────┐  │    │
│  │  │                     PostgreSQL                              │  │    │
│  │  │   Auctions │ Bids │ Users │ Watchlists │ Audit Logs         │  │    │
│  │  └────────────────────────────────────────────────────────────┘  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Auction UI</td><td>Render countdown, bid history, animations</td><td>React Native + Reanimated</td></tr>
                <tr><td>State Machine</td><td>Manage auction lifecycle states</td><td>XState</td></tr>
                <tr><td>WebSocket Client</td><td>Real-time bidirectional communication</td><td>socket.io-client</td></tr>
                <tr><td>Timer Module</td><td>High-precision countdown (120fps capable)</td><td>Native CADisplayLink/Choreographer</td></tr>
                <tr><td>Haptic Engine</td><td>Tactile feedback for bids</td><td>Native UIFeedbackGenerator/VibrationEffect</td></tr>
                <tr><td>Optimistic UI</td><td>Immediate visual feedback before server confirmation</td><td>Custom state management</td></tr>
                <tr><td>API Gateway</td><td>Route WebSocket connections with sticky sessions</td><td>NGINX/AWS ALB</td></tr>
                <tr><td>WS Server Cluster</td><td>Handle connections, room management</td><td>Node.js + socket.io</td></tr>
                <tr><td>Bid Processor</td><td>Validate and process bids atomically</td><td>Redis Lua scripts</td></tr>
                <tr><td>Auction Manager</td><td>Lifecycle management, timer, state transitions</td><td>Node.js service</td></tr>
                <tr><td>Redis Cluster</td><td>Distributed locks, pub/sub, leaderboards</td><td>Redis 7+ Cluster</td></tr>
                <tr><td>Notification Service</td><td>Push, SMS, email notifications</td><td>Firebase/Twilio/SendGrid</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>BID PLACEMENT FLOW
==================

User Taps Bid          Optimistic UI           Server Processing
     │                      │                       │
     ▼                      │                       │
┌─────────┐                 │                       │
│ Validate│ ─── Invalid ──► Error Haptic + Message  │
│ Locally │                 │                       │
└────┬────┘                 │                       │
     │ Valid                │                       │
     ▼                      ▼                       │
┌─────────┐          ┌─────────────┐               │
│ Disable │          │ Show Pending│               │
│  Button │          │   Bid UI    │               │
└────┬────┘          └──────┬──────┘               │
     │                      │                       │
     └──────────────────────┼───► WebSocket ───────►│
                            │                       │
                            │          ┌────────────▼──────────┐
                            │          │ 1. Acquire dist. lock │
                            │          │ 2. Validate bid amount│
                            │          │ 3. Check auction state│
                            │          │ 4. Atomic Redis update│
                            │          │ 5. Check anti-snipe   │
                            │          │ 6. Broadcast to room  │
                            │          │ 7. Release lock       │
                            │          └────────────┬──────────┘
                            │                       │
     ◄───────── Accepted ───┼─────── Broadcast ─────┤
     │                      │                       │
     ▼                      ▼                       │
┌─────────┐          ┌─────────────┐               │
│ Success │          │ Confirm Bid │               │
│ Haptic  │          │ Animate UI  │               │
└─────────┘          └─────────────┘               │

     ◄───────── Rejected ───┼─────── Response ──────┤
     │                      │                       │
     ▼                      ▼                       │
┌─────────┐          ┌─────────────┐
│ Error   │          │Revert Optim.│
│ Haptic  │          │ Show Reason │
└─────────┘          └─────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Consistency model</td><td>CP (Consistency over Availability)</td><td>Can't have two winners; bid ordering must be deterministic</td></tr>
                <tr><td>Real-time transport</td><td>WebSocket via socket.io</td><td>Bidirectional, room-based, auto-reconnection, fallback support</td></tr>
                <tr><td>Bid processing</td><td>Redis Lua scripts</td><td>Atomic operations, no race conditions, sub-ms latency</td></tr>
                <tr><td>Distributed coordination</td><td>Redis distributed locks</td><td>Prevent concurrent bid processing for same auction</td></tr>
                <tr><td>State management</td><td>XState finite state machine</td><td>Complex auction states, predictable transitions, visual debugging</td></tr>
                <tr><td>Timer precision</td><td>Native modules (CADisplayLink/Choreographer)</td><td>60-120fps updates, not blocked by JS thread</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/auction.ts

/**
 * Represents a live auction with all state
 */
interface Auction {
    /** Unique auction identifier */
    id: string;
    /** Reference to item being auctioned */
    itemId: string;
    /** Auction title for display */
    title: string;
    /** Detailed description */
    description: string;
    /** Gallery images for the item */
    imageUrls: string[];
    /** Starting bid amount in cents */
    startingPrice: number;
    /** Current highest bid in cents */
    currentBid: number;
    /** Minimum price to sell (hidden) */
    reservePrice?: number;
    /** Instant purchase price */
    buyNowPrice?: number;
    /** ID of current high bidder */
    highestBidderId: string | null;
    /** Username of high bidder (for display) */
    highestBidderName: string | null;
    /** Scheduled start timestamp (ms) */
    startTime: number;
    /** Current end timestamp (ms) - may extend */
    endTime: number;
    /** Original end time before extensions */
    originalEndTime: number;
    /** Auction lifecycle state */
    status: AuctionStatus;
    /** Last N bids for display */
    recentBids: Bid[];
    /** Total number of bids placed */
    bidCount: number;
    /** Users currently watching */
    watcherCount: number;
    /** Whether reserve has been met */
    reserveMet: boolean;
    /** Minimum bid increment rules */
    incrementTable: BidIncrement[];
    /** Seller information */
    sellerId: string;
    /** Version for optimistic concurrency */
    version: number;
}

type AuctionStatus = 'scheduled' | 'active' | 'ending_soon' | 'ended' | 'sold' | 'cancelled' | 'reserve_not_met';

/**
 * Individual bid record
 */
interface Bid {
    /** Unique bid identifier */
    id: string;
    /** Associated auction */
    auctionId: string;
    /** Bidder's user ID */
    userId: string;
    /** Bidder's display name */
    username: string;
    /** Bid amount in cents */
    amount: number;
    /** Client timestamp when bid placed */
    clientTimestamp: number;
    /** Server timestamp when processed */
    serverTimestamp: number;
    /** Bid processing result */
    status: BidStatus;
    /** True if this was an auto-bid from proxy */
    isProxy: boolean;
    /** Rejection reason if applicable */
    rejectionReason?: string;
}

type BidStatus = 'pending' | 'accepted' | 'outbid' | 'rejected' | 'won';

/**
 * Bid increment rules by price tier
 */
interface BidIncrement {
    /** Price threshold (above this amount) */
    fromAmount: number;
    /** Required minimum increment */
    increment: number;
}

/**
 * Proxy/automatic bidding configuration
 */
interface ProxyBid {
    /** User who set up proxy */
    userId: string;
    /** Auction for proxy */
    auctionId: string;
    /** Maximum amount to bid up to */
    maxAmount: number;
    /** Whether proxy is active */
    isActive: boolean;
    /** Created timestamp */
    createdAt: number;
}

/**
 * Real-time update events
 */
interface AuctionUpdate {
    type: AuctionUpdateType;
    auctionId: string;
    payload: Partial&lt;Auction&gt; | Bid | TimeExtension;
    serverTime: number;
    /** Sequence number for ordering */
    sequence: number;
}

type AuctionUpdateType =
    | 'NEW_BID'
    | 'TIME_EXTENDED'
    | 'AUCTION_ENDED'
    | 'OUTBID'
    | 'RESERVE_MET'
    | 'WATCHER_COUNT'
    | 'AUCTION_STARTING';

interface TimeExtension {
    newEndTime: number;
    reason: 'anti_snipe' | 'manual';
    triggeringBidId?: string;
}

/**
 * Client-side auction state machine context
 */
interface AuctionContext {
    auction: Auction | null;
    myBid: Bid | null;
    myProxyBid: ProxyBid | null;
    optimisticBid: Bid | null;
    error: AuctionError | null;
    serverTimeDelta: number;
    connectionState: ConnectionState;
    isWatching: boolean;
}

type ConnectionState = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

interface AuctionError {
    code: string;
    message: string;
    retryable: boolean;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────┐       1:N        ┌─────────────┐
│   Seller    │─────────────────►│   Auction   │
└─────────────┘                  └──────┬──────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │ 1:N              │ 1:N              │ N:M
                    ▼                  ▼                  ▼
             ┌──────────┐       ┌──────────┐      ┌──────────┐
             │   Bid    │       │ ProxyBid │      │ Watcher  │
             └────┬─────┘       └────┬─────┘      └────┬─────┘
                  │                  │                 │
                  └────────┬─────────┴─────────────────┘
                           │ N:1
                           ▼
                    ┌──────────┐
                    │   User   │
                    └──────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Active auction state</td><td>Redis Hash</td><td>Sub-ms reads, atomic updates via Lua</td></tr>
                <tr><td>Recent bids (last 100)</td><td>Redis List</td><td>Fast push/trim, real-time display</td></tr>
                <tr><td>Bid leaderboard</td><td>Redis Sorted Set</td><td>O(log N) ranking queries</td></tr>
                <tr><td>Complete bid history</td><td>PostgreSQL</td><td>Full audit trail, complex queries</td></tr>
                <tr><td>Auction metadata</td><td>PostgreSQL</td><td>Relational data, search/filter</td></tr>
                <tr><td>Proxy bids</td><td>Redis Hash + PostgreSQL</td><td>Fast lookup, persistent backup</td></tr>
                <tr><td>Watcher list</td><td>Redis Set</td><td>O(1) membership check</td></tr>
                <tr><td>Distributed locks</td><td>Redis</td><td>Atomic lock with TTL</td></tr>
            </table>

            <h5>State Machine (XState)</h5>
            <pre><code>// state/auctionMachine.ts
import { createMachine } from 'xstate';

type AuctionEvent =
    | { type: 'LOAD'; auctionId: string }
    | { type: 'SYNC_COMPLETE'; delta: number }
    | { type: 'BID_PLACED'; bid: Bid }
    | { type: 'BID_ACCEPTED'; bid: Bid }
    | { type: 'BID_REJECTED'; reason: string }
    | { type: 'OUTBID'; newBid: Bid }
    | { type: 'TIME_EXTENDED'; extension: TimeExtension }
    | { type: 'AUCTION_ENDED'; result: AuctionResult }
    | { type: 'CONNECTION_LOST' }
    | { type: 'CONNECTION_RESTORED' }
    | { type: 'RETRY' };

const auctionMachine = createMachine&lt;AuctionContext, AuctionEvent&gt;({
    id: 'auction',
    initial: 'loading',
    context: {
        auction: null,
        myBid: null,
        myProxyBid: null,
        optimisticBid: null,
        error: null,
        serverTimeDelta: 0,
        connectionState: 'connecting',
        isWatching: false,
    },
    states: {
        loading: {
            invoke: {
                src: 'loadAuction',
                onDone: { target: 'syncing', actions: 'setAuction' },
                onError: { target: 'error', actions: 'setError' },
            },
        },
        syncing: {
            invoke: { src: 'syncServerTime' },
            on: {
                SYNC_COMPLETE: {
                    target: 'active',
                    actions: 'setTimeDelta',
                },
            },
        },
        active: {
            invoke: [
                { src: 'countdownTimer' },
                { src: 'websocketSubscription' },
            ],
            on: {
                BID_PLACED: { actions: ['setOptimisticBid', 'triggerHaptic'] },
                BID_ACCEPTED: { actions: ['confirmBid', 'successHaptic', 'clearOptimistic'] },
                BID_REJECTED: { actions: ['revertOptimistic', 'errorHaptic', 'setError'] },
                OUTBID: { actions: ['updateAuction', 'outbidNotification'] },
                TIME_EXTENDED: { actions: ['extendTime', 'extensionHaptic'] },
                AUCTION_ENDED: { target: 'ended' },
                CONNECTION_LOST: { target: 'reconnecting' },
            },
        },
        reconnecting: {
            invoke: { src: 'reconnect' },
            on: {
                CONNECTION_RESTORED: { target: 'syncing' },
            },
            after: {
                10000: { target: 'error', actions: 'setConnectionError' },
            },
        },
        ended: {
            type: 'final',
            entry: ['determineWinner', 'showResult'],
        },
        error: {
            on: { RETRY: 'loading' },
        },
    },
});</code></pre>

            <h4>I - Interface Definition (API)</h4>

            <h5>Bid Service API</h5>
            <pre><code>// services/BidService.ts

import { io, Socket } from 'socket.io-client';

/**
 * Service for managing auction bidding operations.
 * Handles WebSocket connection, bid placement, and real-time updates.
 */
class BidService {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;

    /**
     * Connect to auction WebSocket server and join auction room.
     * @param auctionId - Auction to join
     * @param authToken - User authentication token
     * @returns Promise resolving when connected and joined
     */
    async connect(auctionId: string, authToken: string): Promise&lt;void&gt; {
        return new Promise((resolve, reject) =&gt; {
            this.socket = io(AUCTION_WS_URL, {
                auth: { token: authToken },
                transports: ['websocket'],
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
            });

            this.socket.on('connect', () =&gt; {
                this.socket?.emit('join_auction', auctionId);
                this.reconnectAttempts = 0;
                resolve();
            });

            this.socket.on('connect_error', reject);
        });
    }

    /**
     * Place a bid on the auction.
     * @param bid - Bid details
     * @returns Promise with bid result
     */
    async placeBid(bid: PlaceBidRequest): Promise&lt;BidResult&gt; {
        return new Promise((resolve, reject) =&gt; {
            const timeout = setTimeout(() =&gt; {
                reject(new Error('Bid timeout'));
            }, 5000);

            this.socket?.emit('place_bid', bid, (response: BidResult) =&gt; {
                clearTimeout(timeout);
                resolve(response);
            });
        });
    }

    /**
     * Set up proxy/automatic bidding.
     * @param maxAmount - Maximum amount to bid up to
     */
    async setProxyBid(auctionId: string, maxAmount: number): Promise&lt;void&gt; {
        this.socket?.emit('set_proxy_bid', { auctionId, maxAmount });
    }

    /**
     * Subscribe to auction updates.
     * @param callback - Handler for auction events
     */
    onAuctionUpdate(callback: (update: AuctionUpdate) =&gt; void): void {
        this.socket?.on('auction_update', callback);
    }

    /**
     * Sync server time for accurate countdown.
     * @returns Server time delta in milliseconds
     */
    async syncTime(): Promise&lt;number&gt; {
        const samples: number[] = [];

        for (let i = 0; i &lt; 5; i++) {
            const start = Date.now();
            const serverTime = await this.requestServerTime();
            const rtt = Date.now() - start;
            const delta = serverTime - (start + rtt / 2);
            samples.push(delta);
        }

        // Use median to filter outliers
        samples.sort((a, b) =&gt; a - b);
        return samples[2];
    }

    private requestServerTime(): Promise&lt;number&gt; {
        return new Promise((resolve) =&gt; {
            this.socket?.emit('get_server_time', {}, (time: number) =&gt; {
                resolve(time);
            });
        });
    }
}

interface PlaceBidRequest {
    auctionId: string;
    amount: number;
    clientTimestamp: number;
    /** Idempotency key to prevent duplicate bids */
    bidToken: string;
}

interface BidResult {
    accepted: boolean;
    bid?: Bid;
    reason?: string;
    currentBid?: number;
    requiredBid?: number;
    retryAfter?: number;
    newEndTime?: number;
}</code></pre>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useAuction.ts

/**
 * Hook for managing auction state and interactions.
 * Combines XState machine with WebSocket subscription.
 */
function useAuction(auctionId: string): {
    /** Current auction data */
    auction: Auction | null;
    /** Auction loading state */
    isLoading: boolean;
    /** Current error if any */
    error: AuctionError | null;
    /** Time remaining in milliseconds */
    timeRemaining: number;
    /** Whether user is the high bidder */
    isWinning: boolean;
    /** User's current bid */
    myBid: Bid | null;
    /** Place a new bid */
    placeBid: (amount: number) =&gt; Promise&lt;BidResult&gt;;
    /** Set proxy/auto bidding */
    setProxyBid: (maxAmount: number) =&gt; Promise&lt;void&gt;;
    /** Toggle watchlist status */
    toggleWatch: () =&gt; void;
    /** Retry after error */
    retry: () =&gt; void;
};

// hooks/useAuctionTimer.ts

/**
 * Hook for high-precision countdown timer.
 * Uses native module for 60fps updates.
 */
function useAuctionTimer(
    endTime: number,
    serverTimeDelta: number
): {
    /** Time remaining in milliseconds */
    remaining: number;
    /** Formatted time string (HH:MM:SS) */
    formatted: string;
    /** Whether timer has ended */
    hasEnded: boolean;
    /** Whether in final seconds (urgency state) */
    isUrgent: boolean;
};

// hooks/useBidInput.ts

/**
 * Hook for bid input with validation.
 * Handles increment calculations and amount formatting.
 */
function useBidInput(auction: Auction | null): {
    /** Current input value */
    value: string;
    /** Parsed numeric amount */
    amount: number;
    /** Minimum valid bid */
    minimumBid: number;
    /** Suggested increment amounts */
    quickBids: number[];
    /** Set bid amount */
    setValue: (value: string) =&gt; void;
    /** Increment by one step */
    increment: () =&gt; void;
    /** Whether current value is valid */
    isValid: boolean;
    /** Validation error message */
    validationError: string | null;
};</code></pre>

            <h5>Native Bridge APIs</h5>
            <pre><code>// iOS - AuctionTimerModule.swift

import Foundation
import UIKit

/**
 * Native module for high-precision auction countdown timer.
 * Uses CADisplayLink for frame-accurate updates.
 */
@objc(AuctionTimerModule)
class AuctionTimerModule: NSObject {
    private var displayLink: CADisplayLink?
    private var endTime: TimeInterval = 0
    private var hasEndedCallback: RCTResponseSenderBlock?
    private var bridge: RCTBridge?

    @objc func startPrecisionTimer(
        _ endTimeMs: Double,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        self.endTime = endTimeMs / 1000.0

        DispatchQueue.main.async {
            self.displayLink = CADisplayLink(
                target: self,
                selector: #selector(self.tick)
            )
            // Support ProMotion displays (120Hz)
            if #available(iOS 15.0, *) {
                self.displayLink?.preferredFrameRateRange = CAFrameRateRange(
                    minimum: 60,
                    maximum: 120,
                    preferred: 120
                )
            }
            self.displayLink?.add(to: .main, forMode: .common)
            resolver(nil)
        }
    }

    @objc private func tick() {
        let remaining = endTime - Date().timeIntervalSince1970

        if remaining &lt;= 0 {
            displayLink?.invalidate()
            displayLink = nil
            sendEvent("auctionTimerEnded", body: ["remaining": 0])
        } else {
            sendEvent("auctionTimerTick", body: [
                "remaining": Int(remaining * 1000),
                "isUrgent": remaining &lt; 30
            ])
        }
    }

    @objc func stopTimer() {
        displayLink?.invalidate()
        displayLink = nil
    }

    /// Trigger haptic feedback for auction events
    @objc func triggerHaptic(_ type: String) {
        DispatchQueue.main.async {
            switch type {
            case "bidPlaced":
                let generator = UIImpactFeedbackGenerator(style: .medium)
                generator.impactOccurred()
            case "bidAccepted":
                let generator = UINotificationFeedbackGenerator()
                generator.notificationOccurred(.success)
            case "outbid":
                let generator = UINotificationFeedbackGenerator()
                generator.notificationOccurred(.warning)
            case "auctionEnded":
                let generator = UINotificationFeedbackGenerator()
                generator.notificationOccurred(.success)
            case "urgent":
                let generator = UIImpactFeedbackGenerator(style: .heavy)
                generator.impactOccurred()
            default:
                let generator = UIImpactFeedbackGenerator(style: .light)
                generator.impactOccurred()
            }
        }
    }

    private func sendEvent(_ name: String, body: [String: Any]) {
        bridge?.eventDispatcher().sendDeviceEvent(
            withName: name,
            body: body
        )
    }
}

// Android - AuctionTimerModule.kt

package com.app.auction

import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.Choreographer
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Native module for high-precision auction countdown timer.
 * Uses Choreographer for vsync-aligned updates.
 */
class AuctionTimerModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private var endTimeMs: Long = 0
    private var isRunning = false
    private val choreographer = Choreographer.getInstance()

    override fun getName() = "AuctionTimerModule"

    private val frameCallback = object : Choreographer.FrameCallback {
        override fun doFrame(frameTimeNanos: Long) {
            if (!isRunning) return

            val remaining = endTimeMs - System.currentTimeMillis()

            if (remaining &lt;= 0) {
                isRunning = false
                sendEvent("auctionTimerEnded", Arguments.createMap().apply {
                    putInt("remaining", 0)
                })
            } else {
                sendEvent("auctionTimerTick", Arguments.createMap().apply {
                    putInt("remaining", remaining.toInt())
                    putBoolean("isUrgent", remaining &lt; 30000)
                })
                choreographer.postFrameCallback(this)
            }
        }
    }

    @ReactMethod
    fun startPrecisionTimer(endTime: Double, promise: Promise) {
        endTimeMs = endTime.toLong()
        isRunning = true
        choreographer.postFrameCallback(frameCallback)
        promise.resolve(null)
    }

    @ReactMethod
    fun stopTimer() {
        isRunning = false
    }

    @ReactMethod
    fun triggerHaptic(type: String) {
        val vibrator = if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.S) {
            val manager = reactContext.getSystemService(VibratorManager::class.java)
            manager?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            reactContext.getSystemService(Vibrator::class.java)
        }

        if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.O) {
            val effect = when (type) {
                "bidPlaced" -&gt; VibrationEffect.createOneShot(50, 128)
                "bidAccepted" -&gt; VibrationEffect.createOneShot(100, 200)
                "outbid" -&gt; VibrationEffect.createWaveform(
                    longArrayOf(0, 100, 50, 100), -1
                )
                "auctionEnded" -&gt; VibrationEffect.createOneShot(200, 255)
                "urgent" -&gt; VibrationEffect.createOneShot(75, 255)
                else -&gt; VibrationEffect.createOneShot(25, 64)
            }
            vibrator?.vibrate(effect)
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Atomic bid processing with Lua scripts:</strong>
                    <ul>
                        <li>Problem: Multiple Redis commands create race condition window</li>
                        <li>Solution: Single Lua script executes atomically - validate, update, and return in one operation</li>
                        <li>Impact: Zero race conditions, sub-millisecond bid processing</li>
                    </ul>
                </li>
                <li><strong>Native high-precision timers:</strong>
                    <ul>
                        <li>Problem: JavaScript setInterval drifts 10-50ms under load</li>
                        <li>Solution: CADisplayLink (iOS) / Choreographer (Android) sync to display refresh</li>
                        <li>Impact: Frame-perfect countdown at 60-120fps without JS thread blocking</li>
                    </ul>
                </li>
                <li><strong>Optimistic UI with idempotent bids:</strong>
                    <ul>
                        <li>Problem: Round-trip latency makes bidding feel slow</li>
                        <li>Solution: Immediate UI update with client-generated bid token; server dedupes by token</li>
                        <li>Impact: Instant feedback, seamless retry on network issues</li>
                    </ul>
                </li>
                <li><strong>Server time synchronization:</strong>
                    <ul>
                        <li>Problem: Client clocks vary by seconds, breaks countdown accuracy</li>
                        <li>Solution: NTP-style sync on connect (5 samples, use median), recalibrate on reconnect</li>
                        <li>Impact: &lt;50ms time sync across all clients</li>
                    </ul>
                </li>
                <li><strong>Bid broadcast batching:</strong>
                    <ul>
                        <li>Problem: High-frequency bids flood WebSocket connections</li>
                        <li>Solution: Server batches broadcasts in 50ms windows; clients merge updates</li>
                        <li>Impact: 90% reduction in message count during rapid bidding</li>
                    </ul>
                </li>
            </ul>

            <h5>Server-Side Bid Processing</h5>
            <pre><code>// Lua script for atomic bid update with validation
const BID_UPDATE_SCRIPT = \`
local auctionKey = KEYS[1]
local bidsKey = KEYS[2]
local bidJson = ARGV[1]
local amount = tonumber(ARGV[2])
local userId = ARGV[3]
local serverTime = tonumber(ARGV[4])
local bidToken = ARGV[5]

-- Idempotency check
local existingBid = redis.call('HGET', 'bid_tokens', bidToken)
if existingBid then
    return cjson.encode({accepted = false, reason = 'duplicate', existing = existingBid})
end

-- Get current auction state
local currentBid = tonumber(redis.call('HGET', auctionKey, 'currentBid') or 0)
local endTime = tonumber(redis.call('HGET', auctionKey, 'endTime'))
local status = redis.call('HGET', auctionKey, 'status')

-- Validation
if status ~= 'active' then
    return cjson.encode({accepted = false, reason = 'Auction not active'})
end

if serverTime > endTime then
    redis.call('HSET', auctionKey, 'status', 'ended')
    return cjson.encode({accepted = false, reason = 'Auction ended'})
end

if amount <= currentBid then
    return cjson.encode({
        accepted = false,
        reason = 'Bid too low',
        currentBid = currentBid
    })
end

-- Update auction
local previousBidder = redis.call('HGET', auctionKey, 'highestBidderId')
redis.call('HMSET', auctionKey,
    'currentBid', amount,
    'highestBidderId', userId)
redis.call('HINCRBY', auctionKey, 'bidCount', 1)

-- Store bid
redis.call('LPUSH', bidsKey, bidJson)
redis.call('LTRIM', bidsKey, 0, 99)

-- Mark token as used
redis.call('HSET', 'bid_tokens', bidToken, bidJson)
redis.call('EXPIRE', 'bid_tokens', 3600)

-- Anti-snipe check
local timeRemaining = endTime - serverTime
local newEndTime = endTime
if timeRemaining < 30000 then
    newEndTime = serverTime + 30000
    redis.call('HSET', auctionKey, 'endTime', newEndTime)
end

return cjson.encode({
    accepted = true,
    previousBidder = previousBidder,
    newEndTime = newEndTime,
    extended = newEndTime ~= endTime
})
\`;</code></pre>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Timer precision</td><td>CADisplayLink (120Hz ProMotion)</td><td>Choreographer (60-120Hz)</td></tr>
                <tr><td>Haptic feedback</td><td>UIFeedbackGenerator (3 types)</td><td>VibrationEffect (API 26+)</td></tr>
                <tr><td>Background handling</td><td>30s via beginBackgroundTask</td><td>Foreground service optional</td></tr>
                <tr><td>Push notification</td><td>APNs with alert/badge/sound</td><td>FCM high-priority</td></tr>
                <tr><td>Animation library</td><td>UIKit + Core Animation</td><td>Compose Animation / ValueAnimator</td></tr>
                <tr><td>WebSocket keep-alive</td><td>NSURLSession auto-ping</td><td>OkHttp ping frames</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Race conditions (two bids same moment):</strong> Redis distributed locks + atomic Lua scripts ensure single writer. Loser gets "outbid" response.</li>
                <li><strong>Clock drift:</strong> NTP-style sync on connect with 5 samples. Use server time for all logic. Show "syncing..." during calibration.</li>
                <li><strong>Network partition mid-bid:</strong> Idempotent bid tokens allow safe retry. Server deduplicates. Client shows "pending" state.</li>
                <li><strong>Anti-snipe abuse:</strong> Rate limit to 1 bid per 2 seconds per user. Max 3 extensions per auction (90s total).</li>
                <li><strong>Stale UI:</strong> Version numbers on auction state. Client rejects updates with lower version. Full resync on reconnect.</li>
                <li><strong>Payment failure:</strong> Winner has 24h to pay. Auto-offer to runner-up. Repeat up to 3rd place bidder.</li>
                <li><strong>Proxy bid collision:</strong> If two proxy bids compete, execute sequentially. Stop when one proxy exhausts max.</li>
                <li><strong>Timer ends during reconnect:</strong> Server is authoritative. On reconnect, check if auction ended during disconnect.</li>
                <li><strong>Bid during time extension:</strong> Recalculate time remaining. Show "Time extended!" notification to all.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Consistency model</td><td>CP (strong consistency)</td><td>AP (eventual consistency)</td><td>Can't have two winners; auction integrity is critical</td></tr>
                <tr><td>Real-time transport</td><td>WebSocket (socket.io)</td><td>gRPC streaming / SSE</td><td>Bidirectional, reconnection, room abstraction built-in</td></tr>
                <tr><td>State management</td><td>XState FSM</td><td>Redux / Zustand</td><td>Complex state transitions, built-in guards, visual debugging</td></tr>
                <tr><td>Bid processing</td><td>Redis Lua scripts</td><td>PostgreSQL with locks</td><td>Sub-ms latency, atomic operations, no network round-trips</td></tr>
                <tr><td>Timer implementation</td><td>Native modules</td><td>JS setInterval + drift correction</td><td>Frame-perfect updates, no JS thread blocking</td></tr>
                <tr><td>Optimistic UI</td><td>Immediate feedback</td><td>Wait for server confirmation</td><td>Better UX despite rollback complexity</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Bid increment calculation at price tier boundaries</li>
                        <li>Time remaining formatting edge cases (0, negative)</li>
                        <li>State machine transitions and guards</li>
                        <li>Optimistic update and rollback logic</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Lua script atomicity (concurrent bid simulation)</li>
                        <li>WebSocket reconnection preserves auction state</li>
                        <li>Anti-snipe extension triggers correctly</li>
                        <li>Proxy bid increments compete properly</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>Complete auction flow: join → bid → win → notification</li>
                        <li>Outbid scenario: User A bids → User B outbids → User A notified</li>
                        <li>Time extension visible to all participants</li>
                        <li>Buy-now immediately ends auction</li>
                    </ul>
                </li>
                <li><strong>Load Tests:</strong>
                    <ul>
                        <li>10,000 concurrent watchers per auction</li>
                        <li>500 bids/second sustained for final minute</li>
                        <li>Broadcast latency p99 &lt; 100ms under load</li>
                        <li>Redis Lua script execution &lt; 1ms</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why choose CP over AP for auctions?</strong><br/>A: Auctions require strong consistency - you can't have two winners. A brief unavailability (rejecting bids during partition) is better than incorrect auction results. We use Redis distributed locks + Lua scripts for linearizable bid processing.</li>
                <li><strong>Q: How do you handle optimistic UI rollback?</strong><br/>A: Each optimistic bid has a client-generated token. On rejection, we match the token to revert the specific update. XState manages the state transitions, and we use Reanimated for smooth rollback animations.</li>
                <li><strong>Q: How do you scale WebSocket servers horizontally?</strong><br/>A: Sticky sessions route users to same server. Redis Pub/Sub broadcasts bids across all server instances. Any server can process a bid and publish to the auction channel. Stateless connection handlers.</li>
                <li><strong>Q: How do you prevent shill bidding?</strong><br/>A: Velocity checks (too many bids in short time), device fingerprinting (multiple accounts same device), IP analysis, bid pattern ML models. Flag suspicious auctions for manual review.</li>
                <li><strong>Q: Timer precision - why native modules?</strong><br/>A: JavaScript timers can drift 10-50ms under load and don't sync to display refresh. CADisplayLink/Choreographer give us frame-perfect updates at 60-120Hz, running on native thread without JS bridge delays.</li>
                <li><strong>Q: Reserve price - reveal or hide?</strong><br/>A: Hidden reserve with "Reserve not met" indicator. Revealing exact reserve lets bidders game to just-above-reserve. Hidden creates uncertainty and often higher final prices. Show "Reserve met!" when crossed for excitement.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>State Machine</td><td>XState</td><td>Complex auction states, visual debugger, TypeScript support</td></tr>
                <tr><td>WebSocket</td><td>socket.io-client</td><td>Auto-reconnect, rooms, acknowledgments, fallback transport</td></tr>
                <tr><td>Animations</td><td>react-native-reanimated</td><td>60fps on UI thread, shared values, gesture integration</td></tr>
                <tr><td>Timer Display</td><td>Custom native module</td><td>Frame-perfect countdown, no JS thread blocking</td></tr>
                <tr><td>Haptics</td><td>expo-haptics + native fallback</td><td>Cross-platform API, native precision when needed</td></tr>
                <tr><td>Notifications</td><td>@notifee/react-native</td><td>Foreground/background handling, channels, actions</td></tr>
                <tr><td>Currency Formatting</td><td>Intl.NumberFormat (native)</td><td>Locale-aware, no extra dependency</td></tr>
                <tr><td>Server - Redis</td><td>ioredis</td><td>Cluster support, Lua scripting, streams</td></tr>
            </table>
        `
     },
    {
        id: 80,
        category: "System Design",
        icon: "🏛️",
        question: "Design a collaborative whiteboard with multiple concurrent users",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Scale:</strong> How many concurrent users per board? How many total boards?</li>
                <li><strong>Drawing tools:</strong> Pen, shapes, text, sticky notes, images, connectors?</li>
                <li><strong>Canvas size:</strong> Fixed dimensions or infinite canvas with pan/zoom?</li>
                <li><strong>Persistence:</strong> Auto-save? Version history? Export formats?</li>
                <li><strong>Offline support:</strong> Should users be able to draw offline and sync later?</li>
                <li><strong>Permissions:</strong> View-only vs edit access? Element-level locking?</li>
                <li><strong>Performance targets:</strong> What's the minimum acceptable frame rate?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Real-time drawing with pen, shapes (rect, ellipse, line, arrow), and text tools</li>
                <li>Multiple users drawing simultaneously with live cursor/selection visibility</li>
                <li>Undo/redo that only affects the user's own changes (per-user undo stack)</li>
                <li>Infinite canvas with smooth pan, pinch-to-zoom (0.1x to 5x scale)</li>
                <li>Element manipulation: select, move, resize, rotate, delete, duplicate</li>
                <li>Layer management: bring forward/backward, z-index ordering</li>
                <li>Export to PNG, PDF, and SVG with selectable viewport or full canvas</li>
                <li>Offline drawing with automatic sync on reconnect (conflict-free merge)</li>
                <li>Sticky notes and image upload support</li>
                <li>Real-time presence indicators (who's viewing, who's drawing)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Rendering:</strong> 60fps on mid-range devices regardless of element count (up to 10,000 elements)</li>
                <li><strong>Latency:</strong> Sub-100ms for remote cursor updates, sub-200ms for element sync</li>
                <li><strong>Concurrency:</strong> Support 50+ simultaneous editors per board</li>
                <li><strong>Consistency:</strong> Conflict-free merging of concurrent edits (CRDT-based)</li>
                <li><strong>Offline:</strong> Full functionality offline, seamless merge on reconnect</li>
                <li><strong>Memory:</strong> Handle large boards without exceeding 500MB memory</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Audio/video conferencing integration</li>
                <li>Template marketplace</li>
                <li>AI-assisted drawing or shape recognition</li>
                <li>Presentation mode with slide navigation</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────┐
│                  COLLABORATIVE WHITEBOARD ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                         Mobile Client                              │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │  │
│  │  │   Skia Canvas   │  │   CRDT Layer    │  │   Presence      │    │  │
│  │  │  (GPU Render)   │  │   (Yjs Doc)     │  │   (Awareness)   │    │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │  │
│  │  │ Gesture Handler │  │  Element Store  │  │  Undo Manager   │    │  │
│  │  │ (react-native-  │  │  (Y.Map)        │  │  (Per-User)     │    │  │
│  │  │  gesture-handler│  │                 │  │                 │    │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │  │
│  │  │ Spatial Index   │  │ Viewport Mgr    │  │ Tool State      │    │  │
│  │  │ (R-tree)        │  │ (pan/zoom)      │  │ (pen/shape/etc) │    │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │  │
│  └─────────────────────────────┬─────────────────────────────────────┘  │
│                                │ WebSocket (Binary Yjs Updates)          │
│  ┌─────────────────────────────▼─────────────────────────────────────┐  │
│  │                      y-websocket Server Cluster                    │  │
│  │              (Stateful CRDT Sync + Document Persistence)           │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │  │
│  │  │   Node 1      │  │   Node 2      │  │   Node N      │          │  │
│  │  │ (Yjs Rooms)   │  │ (Yjs Rooms)   │  │ (Yjs Rooms)   │          │  │
│  │  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘          │  │
│  │          └──────────────────┼──────────────────┘                   │  │
│  └─────────────────────────────┼─────────────────────────────────────┘  │
│                                │                                         │
│  ┌─────────────────────────────┼─────────────────────────────────────┐  │
│  │   ┌─────────────────────────▼─────────────────────────────┐       │  │
│  │   │                    Redis Cluster                       │       │  │
│  │   │   Presence Pub/Sub │ Room Membership │ Rate Limiting   │       │  │
│  │   └─────────────────────────────────────────────────────────┘       │  │
│  │                                                                     │  │
│  │   ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐   │  │
│  │   │   PostgreSQL     │  │     S3 / R2      │  │      CDN       │   │  │
│  │   │ Board Metadata   │  │ Yjs Snapshots    │  │ Image Assets   │   │  │
│  │   │ Permissions      │  │ PNG/PDF Exports  │  │ Static Files   │   │  │
│  │   │ User Data        │  │ Uploaded Images  │  │                │   │  │
│  │   └──────────────────┘  └──────────────────┘  └────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Skia Canvas</td><td>GPU-accelerated 2D rendering at 60fps</td><td>@shopify/react-native-skia</td></tr>
                <tr><td>CRDT Layer</td><td>Conflict-free document synchronization</td><td>Yjs</td></tr>
                <tr><td>Presence/Awareness</td><td>Real-time cursor positions and user info</td><td>Yjs Awareness protocol</td></tr>
                <tr><td>Gesture Handler</td><td>Multi-touch gestures (draw, pan, pinch, select)</td><td>react-native-gesture-handler</td></tr>
                <tr><td>Element Store</td><td>Collaborative element storage</td><td>Y.Map</td></tr>
                <tr><td>Undo Manager</td><td>Per-user undo/redo stacks</td><td>Yjs UndoManager</td></tr>
                <tr><td>Spatial Index</td><td>Fast element lookup for rendering/selection</td><td>RBush (R-tree)</td></tr>
                <tr><td>y-websocket Server</td><td>WebSocket rooms, Yjs sync, persistence</td><td>Node.js + y-websocket</td></tr>
                <tr><td>Redis Cluster</td><td>Presence pub/sub across server nodes</td><td>Redis 7+</td></tr>
                <tr><td>S3/R2</td><td>Document snapshots, exports, uploaded images</td><td>Cloudflare R2 / AWS S3</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>DRAWING SYNCHRONIZATION FLOW
============================

User A Draws              CRDT Layer                    User B Receives
     │                        │                              │
     ▼                        │                              │
┌──────────┐                  │                              │
│ Gesture  │                  │                              │
│ Handler  │                  │                              │
└────┬─────┘                  │                              │
     │ Touch Points           │                              │
     ▼                        │                              │
┌──────────┐                  │                              │
│ Path     │ ─── Render ────► Local Skia Canvas (60fps)      │
│ Builder  │                  │                              │
└────┬─────┘                  │                              │
     │ Batch (16ms debounce)  │                              │
     ▼                        ▼                              │
┌──────────┐           ┌─────────────┐                       │
│ Y.Doc    │ ────────► │  WebSocket  │                       │
│ Transact │           │   Server    │                       │
│ (binary) │           └──────┬──────┘                       │
└──────────┘                  │ Broadcast to room            │
                              ▼                              ▼
                       ┌─────────────┐              ┌──────────────┐
                       │ Y.Doc Merge │ ────────────►│ Y.Map Observe│
                       │ (CRDT)      │              │ Callback     │
                       └─────────────┘              └──────┬───────┘
                                                          │
                                                          ▼
                                                    Render on
                                                    User B Canvas


UNDO/REDO FLOW (Per-User)
=========================

User A: draw rect → draw circle → [User B draws line] → Undo

Undo Stack (User A only):
┌───────────────┐
│ 1. Add rect   │ ◄── Undo reverts only User A's changes
│ 2. Add circle │     User B's line remains untouched
└───────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Sync protocol</td><td>CRDT (Yjs)</td><td>Offline-first, no central authority needed, automatic merge</td></tr>
                <tr><td>Rendering engine</td><td>Skia (GPU)</td><td>60fps even with thousands of elements, Metal/Vulkan backend</td></tr>
                <tr><td>Element storage</td><td>Y.Map per element</td><td>Fine-grained sync, element-level conflict resolution</td></tr>
                <tr><td>Path representation</td><td>SVG path string + points array</td><td>Compact for sync, precise for rendering</td></tr>
                <tr><td>Presence transport</td><td>Yjs Awareness</td><td>Built-in, ephemeral, no persistence needed</td></tr>
                <tr><td>Spatial indexing</td><td>R-tree (RBush)</td><td>O(log n) viewport culling and hit testing</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/whiteboard.ts

/**
 * Base interface for all whiteboard elements
 */
interface WhiteboardElement {
    /** Unique element identifier (nanoid) */
    id: string;
    /** Element type discriminator */
    type: ElementType;
    /** User who created the element */
    createdBy: string;
    /** Creation timestamp */
    createdAt: number;
    /** Last modification timestamp */
    updatedAt: number;
    /** Whether element is locked for editing */
    locked: boolean;
    /** Rendering order (higher = front) */
    zIndex: number;
    /** Bounding box for spatial indexing */
    bounds: BoundingBox;
    /** Currently selected by (user IDs) */
    selectedBy: string[];
}

type ElementType = 'path' | 'rect' | 'ellipse' | 'line' | 'arrow' | 'text' | 'image' | 'sticky';

/**
 * Freehand drawing path element
 */
interface PathElement extends WhiteboardElement {
    type: 'path';
    /** Raw touch points with pressure data */
    points: Point[];
    /** Optimized SVG path string for rendering */
    svgPath: string;
    /** Stroke color (hex) */
    color: string;
    /** Stroke width in canvas units */
    strokeWidth: number;
    /** Opacity 0-1 */
    opacity: number;
    /** Smoothing algorithm applied */
    smoothing: 'none' | 'catmull-rom' | 'bezier';
}

/**
 * Rectangle or ellipse shape
 */
interface ShapeElement extends WhiteboardElement {
    type: 'rect' | 'ellipse';
    /** Top-left X coordinate */
    x: number;
    /** Top-left Y coordinate */
    y: number;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Fill color (hex or 'transparent') */
    fill: string;
    /** Stroke color */
    stroke: string;
    /** Stroke width */
    strokeWidth: number;
    /** Corner radius (rect only) */
    cornerRadius?: number;
    /** Rotation in degrees */
    rotation: number;
}

/**
 * Line or arrow element
 */
interface LineElement extends WhiteboardElement {
    type: 'line' | 'arrow';
    /** Start point */
    startX: number;
    startY: number;
    /** End point */
    endX: number;
    endY: number;
    /** Stroke color */
    color: string;
    /** Stroke width */
    strokeWidth: number;
    /** Arrow head style (for arrows) */
    arrowHead?: 'triangle' | 'open' | 'diamond';
}

/**
 * Text element
 */
interface TextElement extends WhiteboardElement {
    type: 'text';
    /** Position */
    x: number;
    y: number;
    /** Text content */
    content: string;
    /** Font size in canvas units */
    fontSize: number;
    /** Font family */
    fontFamily: string;
    /** Text color */
    color: string;
    /** Text alignment */
    align: 'left' | 'center' | 'right';
    /** Bold/italic/underline */
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
}

/**
 * Image element
 */
interface ImageElement extends WhiteboardElement {
    type: 'image';
    x: number;
    y: number;
    width: number;
    height: number;
    /** CDN URL for the image */
    src: string;
    /** Local cache key */
    cacheKey: string;
    /** Original aspect ratio */
    aspectRatio: number;
    rotation: number;
}

/**
 * Sticky note element
 */
interface StickyElement extends WhiteboardElement {
    type: 'sticky';
    x: number;
    y: number;
    width: number;
    height: number;
    /** Note content */
    content: string;
    /** Background color */
    backgroundColor: string;
    /** Text color */
    textColor: string;
}

/**
 * Point with optional pressure data (for stylus)
 */
interface Point {
    x: number;
    y: number;
    /** Stylus pressure 0-1, undefined for touch */
    pressure?: number;
    /** Timestamp for velocity calculation */
    timestamp?: number;
}

/**
 * Bounding box for spatial indexing
 */
interface BoundingBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

/**
 * Real-time cursor state (ephemeral, via Awareness)
 */
interface CursorState {
    userId: string;
    userName: string;
    /** Assigned user color for cursor/selection */
    color: string;
    /** Canvas coordinates */
    x: number;
    y: number;
    /** Currently active tool */
    tool: ToolType;
    /** Whether user is currently drawing */
    isDrawing: boolean;
    /** Viewport for "follow" feature */
    viewport: CanvasViewport;
    /** Last activity timestamp */
    lastActive: number;
}

type ToolType = 'pen' | 'select' | 'rect' | 'ellipse' | 'line' | 'arrow' | 'text' | 'eraser' | 'pan';

/**
 * Canvas viewport state
 */
interface CanvasViewport {
    /** Pan offset X */
    x: number;
    /** Pan offset Y */
    y: number;
    /** Zoom scale (0.1 to 5.0) */
    scale: number;
}

/**
 * Board metadata (stored in PostgreSQL)
 */
interface Board {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    /** Board thumbnail URL */
    thumbnailUrl: string | null;
    /** Access control */
    visibility: 'private' | 'team' | 'public';
    /** Team ID if visibility is 'team' */
    teamId: string | null;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────┐       1:N        ┌─────────────┐
│    User     │─────────────────►│    Board    │
│             │                  │ (metadata)  │
└─────────────┘                  └──────┬──────┘
       │                                │
       │ N:M                            │ 1:1
       │                                ▼
       │                         ┌─────────────┐
       │                         │  Yjs Doc    │
       │                         │ (elements)  │
       │                         └──────┬──────┘
       │                                │
       │                                │ 1:N
       │                                ▼
       │                         ┌─────────────┐
       └────────────────────────►│  Element    │
                 createdBy       │ (in Y.Map)  │
                                 └─────────────┘

Presence (Ephemeral):
┌─────────────┐       N:1        ┌─────────────┐
│   Cursor    │◄────────────────│    User     │
│  (Awareness)│                  │             │
└─────────────┘                  └─────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Board metadata</td><td>PostgreSQL</td><td>Relational queries, permissions, search</td></tr>
                <tr><td>Elements (live)</td><td>Yjs Y.Map (in-memory)</td><td>Real-time CRDT sync, conflict-free</td></tr>
                <tr><td>Elements (persisted)</td><td>Yjs binary snapshot in S3</td><td>Compact, fast load, versioned</td></tr>
                <tr><td>Cursor positions</td><td>Yjs Awareness (ephemeral)</td><td>Not persisted, real-time only</td></tr>
                <tr><td>Uploaded images</td><td>S3/R2 + CDN</td><td>Fast delivery, global distribution</td></tr>
                <tr><td>Exported files</td><td>S3 with signed URLs</td><td>Temporary access, auto-expiry</td></tr>
                <tr><td>Spatial index</td><td>R-tree (client-side only)</td><td>Rebuilt from elements on load</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Whiteboard Sync Service</h5>
            <pre><code>// services/WhiteboardSyncService.ts
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';
import { Awareness } from 'y-protocols/awareness';

/**
 * Service for real-time whiteboard synchronization using CRDTs.
 * Handles element sync, presence, and offline persistence.
 */
class WhiteboardSyncService {
    private ydoc: Y.Doc;
    private provider: WebsocketProvider | null = null;
    private persistence: IndexeddbPersistence | null = null;
    private yElements: Y.Map&lt;WhiteboardElement&gt;;
    private awareness: Awareness;
    private undoManager: Y.UndoManager;

    /**
     * Initialize sync service for a board.
     * @param boardId - Unique board identifier
     * @param userId - Current user's ID
     * @param userName - Current user's display name
     */
    constructor(boardId: string, userId: string, userName: string) {
        this.ydoc = new Y.Doc({ guid: boardId });
        this.yElements = this.ydoc.getMap('elements');

        // Per-user undo manager - only tracks this user's changes
        this.undoManager = new Y.UndoManager(this.yElements, {
            trackedOrigins: new Set([this.ydoc.clientID]),
            captureTimeout: 500, // Group rapid changes
        });

        // Local persistence for offline support
        this.persistence = new IndexeddbPersistence(boardId, this.ydoc);

        // Connect to sync server
        this.provider = new WebsocketProvider(
            'wss://sync.example.com',
            boardId,
            this.ydoc,
            { connect: true, resyncInterval: 3000 }
        );

        this.awareness = this.provider.awareness;

        // Set initial user presence
        this.awareness.setLocalState({
            user: { id: userId, name: userName, color: generateUserColor(userId) },
            cursor: null,
        });
    }

    /**
     * Add a new element to the whiteboard.
     * @param element - Element data without ID
     * @returns Generated element ID
     */
    addElement(element: Omit&lt;WhiteboardElement, 'id'&gt;): string {
        const id = nanoid();

        this.ydoc.transact(() =&gt; {
            this.yElements.set(id, {
                ...element,
                id,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                selectedBy: [],
            });
        }, this.ydoc.clientID); // Track origin for undo

        return id;
    }

    /**
     * Update an existing element.
     * @param id - Element ID
     * @param updates - Partial element updates
     */
    updateElement(id: string, updates: Partial&lt;WhiteboardElement&gt;): void {
        this.ydoc.transact(() =&gt; {
            const existing = this.yElements.get(id);
            if (existing) {
                this.yElements.set(id, {
                    ...existing,
                    ...updates,
                    updatedAt: Date.now(),
                });
            }
        }, this.ydoc.clientID);
    }

    /**
     * Delete an element.
     * @param id - Element ID to delete
     */
    deleteElement(id: string): void {
        this.ydoc.transact(() =&gt; {
            this.yElements.delete(id);
        }, this.ydoc.clientID);
    }

    /**
     * Append points to a path element (for smooth drawing sync).
     * Batched for performance.
     * @param id - Path element ID
     * @param points - New points to append
     */
    appendPathPoints(id: string, points: Point[]): void {
        this.ydoc.transact(() =&gt; {
            const element = this.yElements.get(id) as PathElement;
            if (element?.type === 'path') {
                const newPoints = [...element.points, ...points];
                this.yElements.set(id, {
                    ...element,
                    points: newPoints,
                    svgPath: pointsToSVGPath(newPoints),
                    bounds: calculateBounds(newPoints),
                    updatedAt: Date.now(),
                });
            }
        }, this.ydoc.clientID);
    }

    /**
     * Undo last action (current user only).
     */
    undo(): void {
        this.undoManager.undo();
    }

    /**
     * Redo last undone action (current user only).
     */
    redo(): void {
        this.undoManager.redo();
    }

    /**
     * Subscribe to element changes.
     */
    onElementsChange(callback: (elements: Map&lt;string, WhiteboardElement&gt;) =&gt; void): () =&gt; void {
        const handler = () =&gt; callback(new Map(this.yElements.entries()));
        this.yElements.observe(handler);
        return () =&gt; this.yElements.unobserve(handler);
    }

    /**
     * Update cursor position (throttled to 50ms).
     */
    updateCursor(cursor: Partial&lt;CursorState&gt;): void {
        this.awareness.setLocalStateField('cursor', {
            ...this.awareness.getLocalState()?.cursor,
            ...cursor,
            lastActive: Date.now(),
        });
    }

    /**
     * Subscribe to presence updates (other users' cursors).
     */
    onPresenceChange(callback: (cursors: CursorState[]) =&gt; void): () =&gt; void {
        const handler = () =&gt; {
            const cursors: CursorState[] = [];
            this.awareness.getStates().forEach((state, clientId) =&gt; {
                if (clientId !== this.ydoc.clientID &amp;&amp; state.cursor) {
                    cursors.push({ ...state.cursor, ...state.user });
                }
            });
            callback(cursors);
        };
        this.awareness.on('change', handler);
        return () =&gt; this.awareness.off('change', handler);
    }

    /** Get connection status */
    get isConnected(): boolean {
        return this.provider?.wsconnected ?? false;
    }

    /** Cleanup resources */
    destroy(): void {
        this.provider?.disconnect();
        this.persistence?.destroy();
        this.ydoc.destroy();
    }
}</code></pre>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useWhiteboard.ts

/**
 * Main hook for whiteboard functionality.
 * Manages sync service, elements, and presence.
 */
function useWhiteboard(boardId: string): {
    /** All elements on the board */
    elements: Map&lt;string, WhiteboardElement&gt;;
    /** Other users' cursors */
    cursors: CursorState[];
    /** Connection status */
    isConnected: boolean;
    /** Whether offline changes are pending sync */
    hasPendingChanges: boolean;
    /** Add a new element */
    addElement: (element: Omit&lt;WhiteboardElement, 'id'&gt;) =&gt; string;
    /** Update an element */
    updateElement: (id: string, updates: Partial&lt;WhiteboardElement&gt;) =&gt; void;
    /** Delete an element */
    deleteElement: (id: string) =&gt; void;
    /** Append points to a path */
    appendPathPoints: (id: string, points: Point[]) =&gt; void;
    /** Undo last action */
    undo: () =&gt; void;
    /** Redo last undone action */
    redo: () =&gt; void;
    /** Whether undo is available */
    canUndo: boolean;
    /** Whether redo is available */
    canRedo: boolean;
};

// hooks/useViewport.ts

/**
 * Hook for canvas viewport management (pan/zoom).
 */
function useViewport(): {
    /** Current viewport state */
    viewport: CanvasViewport;
    /** Set viewport directly */
    setViewport: (viewport: CanvasViewport) =&gt; void;
    /** Pan by delta */
    pan: (dx: number, dy: number) =&gt; void;
    /** Zoom to point */
    zoomTo: (scale: number, centerX: number, centerY: number) =&gt; void;
    /** Fit all elements in view */
    fitToContent: (elements: WhiteboardElement[]) =&gt; void;
    /** Reset to default view */
    resetView: () =&gt; void;
    /** Convert screen coords to canvas coords */
    screenToCanvas: (screenX: number, screenY: number) =&gt; Point;
    /** Convert canvas coords to screen coords */
    canvasToScreen: (canvasX: number, canvasY: number) =&gt; Point;
};

// hooks/useDrawing.ts

/**
 * Hook for drawing path elements.
 * Handles touch events, path building, and batched sync.
 */
function useDrawing(
    syncService: WhiteboardSyncService,
    viewport: CanvasViewport
): {
    /** Currently drawing path (optimistic) */
    currentPath: PathElement | null;
    /** Start a new path */
    startPath: (point: Point, options: PathOptions) =&gt; void;
    /** Add point to current path */
    addPoint: (point: Point) =&gt; void;
    /** Finish current path */
    endPath: () =&gt; void;
    /** Cancel current path */
    cancelPath: () =&gt; void;
};

interface PathOptions {
    color: string;
    strokeWidth: number;
    opacity: number;
    smoothing: 'none' | 'catmull-rom' | 'bezier';
}</code></pre>

            <h5>Native Bridge APIs</h5>
            <pre><code>// iOS - WhiteboardCanvasModule.swift

import MetalKit
import UIKit
import PDFKit

/**
 * Native module for GPU-accelerated canvas operations.
 * Handles Metal initialization and high-quality export.
 */
@objc(WhiteboardCanvasModule)
class WhiteboardCanvasModule: NSObject {
    private var metalDevice: MTLDevice?
    private var displayLink: CADisplayLink?

    /// Initialize Metal device and display link for 120fps rendering
    @objc func initializeCanvas(
        _ resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let device = MTLCreateSystemDefaultDevice() else {
            reject("METAL_ERROR", "Metal not available", nil)
            return
        }

        self.metalDevice = device

        // Enable ProMotion for 120fps on supported devices
        DispatchQueue.main.async {
            if #available(iOS 15.0, *) {
                self.displayLink = CADisplayLink(
                    target: self,
                    selector: #selector(self.frameCallback)
                )
                self.displayLink?.preferredFrameRateRange = CAFrameRateRange(
                    minimum: 60,
                    maximum: 120,
                    preferred: 120
                )
                self.displayLink?.add(to: .main, forMode: .common)
            }

            resolve([
                "maxFPS": 120,
                "metalSupported": true,
                "deviceName": device.name
            ])
        }
    }

    /// Export canvas region to PNG file
    @objc func exportToPNG(
        _ bounds: [String: Double],
        scale: Double,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let width = Int(bounds["width"]! * scale)
        let height = Int(bounds["height"]! * scale)

        let renderer = UIGraphicsImageRenderer(
            size: CGSize(width: width, height: height)
        )

        let image = renderer.image { context in
            context.cgContext.scaleBy(x: CGFloat(scale), y: CGFloat(scale))
            // Skia will render to this context via shared texture
            NotificationCenter.default.post(
                name: .exportRender,
                object: context.cgContext
            )
        }

        let tempURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID().uuidString).png")

        guard let pngData = image.pngData() else {
            reject("EXPORT_ERROR", "Failed to encode PNG", nil)
            return
        }

        do {
            try pngData.write(to: tempURL)
            resolve(["path": tempURL.path, "size": pngData.count])
        } catch {
            reject("EXPORT_ERROR", error.localizedDescription, error)
        }
    }

    /// Export canvas to PDF
    @objc func exportToPDF(
        _ bounds: [String: Double],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let pageRect = CGRect(
            x: 0, y: 0,
            width: bounds["width"]!,
            height: bounds["height"]!
        )

        let tempURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(UUID().uuidString).pdf")

        UIGraphicsBeginPDFContextToFile(tempURL.path, pageRect, nil)
        UIGraphicsBeginPDFPage()

        guard let context = UIGraphicsGetCurrentContext() else {
            UIGraphicsEndPDFContext()
            reject("EXPORT_ERROR", "Failed to create PDF context", nil)
            return
        }

        NotificationCenter.default.post(name: .exportRender, object: context)

        UIGraphicsEndPDFContext()
        resolve(["path": tempURL.path])
    }

    @objc private func frameCallback() {
        NotificationCenter.default.post(name: .skiaFrameReady, object: nil)
    }
}

// Android - WhiteboardCanvasModule.kt

package com.app.whiteboard

import android.graphics.*
import android.graphics.pdf.PdfDocument
import android.os.Build
import android.view.Choreographer
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileOutputStream

/**
 * Native module for hardware-accelerated canvas operations.
 * Handles Vulkan detection and high-quality export.
 */
class WhiteboardCanvasModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val choreographer = Choreographer.getInstance()
    private var frameCallback: Choreographer.FrameCallback? = null

    override fun getName() = "WhiteboardCanvasModule"

    @ReactMethod
    fun initializeCanvas(promise: Promise) {
        val maxFPS = if (Build.VERSION.SDK_INT &gt;= 30) {
            currentActivity?.display?.refreshRate?.toInt() ?: 60
        } else 60

        frameCallback = object : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                sendFrameEvent(frameTimeNanos)
                choreographer.postFrameCallback(this)
            }
        }
        choreographer.postFrameCallback(frameCallback!!)

        promise.resolve(Arguments.createMap().apply {
            putInt("maxFPS", maxFPS)
            putBoolean("vulkanSupported", isVulkanSupported())
        })
    }

    @ReactMethod
    fun exportToPNG(bounds: ReadableMap, scale: Double, promise: Promise) {
        val width = (bounds.getDouble("width") * scale).toInt()
        val height = (bounds.getDouble("height") * scale).toInt()

        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        canvas.scale(scale.toFloat(), scale.toFloat())
        canvas.drawColor(Color.WHITE)

        // Trigger render callback
        sendRenderEvent(canvas)

        val file = File(reactContext.cacheDir, "\${java.util.UUID.randomUUID()}.png")
        FileOutputStream(file).use { out -&gt;
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
        }

        promise.resolve(Arguments.createMap().apply {
            putString("path", file.absolutePath)
            putInt("size", file.length().toInt())
        })
    }

    @ReactMethod
    fun exportToPDF(bounds: ReadableMap, promise: Promise) {
        val width = bounds.getDouble("width").toInt()
        val height = bounds.getDouble("height").toInt()

        val document = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(width, height, 1).create()
        val page = document.startPage(pageInfo)

        sendRenderEvent(page.canvas)

        document.finishPage(page)

        val file = File(reactContext.cacheDir, "\${java.util.UUID.randomUUID()}.pdf")
        FileOutputStream(file).use { out -&gt;
            document.writeTo(out)
        }
        document.close()

        promise.resolve(Arguments.createMap().apply {
            putString("path", file.absolutePath)
        })
    }

    private fun isVulkanSupported(): Boolean {
        return Build.VERSION.SDK_INT &gt;= 24 &amp;&amp;
            reactContext.packageManager.hasSystemFeature("android.hardware.vulkan.level")
    }

    private fun sendFrameEvent(frameTimeNanos: Long) {
        // Emit frame event to JS
    }

    private fun sendRenderEvent(canvas: Canvas) {
        // Trigger Skia render to provided canvas
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>GPU-accelerated rendering with Skia:</strong>
                    <ul>
                        <li>Problem: Canvas APIs are CPU-bound, struggle with many elements</li>
                        <li>Solution: Skia uses Metal (iOS) / Vulkan (Android) for GPU rendering</li>
                        <li>Impact: Consistent 60fps with 10,000+ elements</li>
                    </ul>
                </li>
                <li><strong>Spatial indexing with R-tree:</strong>
                    <ul>
                        <li>Problem: Checking all elements for viewport visibility is O(n)</li>
                        <li>Solution: R-tree index (RBush) for O(log n) viewport queries</li>
                        <li>Impact: Only render visible elements, massive perf gain on large boards</li>
                    </ul>
                </li>
                <li><strong>Path point batching:</strong>
                    <ul>
                        <li>Problem: Syncing every touch point floods network</li>
                        <li>Solution: Batch points in 16ms windows, sync aggregated updates</li>
                        <li>Impact: 60x reduction in sync messages during drawing</li>
                    </ul>
                </li>
                <li><strong>Path simplification with Ramer-Douglas-Peucker:</strong>
                    <ul>
                        <li>Problem: Long strokes accumulate thousands of points</li>
                        <li>Solution: RDP algorithm simplifies path on stroke end (epsilon = 1.0)</li>
                        <li>Impact: 80% point reduction with imperceptible visual difference</li>
                    </ul>
                </li>
                <li><strong>Presence throttling:</strong>
                    <ul>
                        <li>Problem: Mouse/touch move fires hundreds of events per second</li>
                        <li>Solution: Throttle cursor updates to 20fps (50ms interval)</li>
                        <li>Impact: Smooth remote cursors without bandwidth waste</li>
                    </ul>
                </li>
                <li><strong>Binary Yjs protocol:</strong>
                    <ul>
                        <li>Problem: JSON sync payloads are verbose</li>
                        <li>Solution: Yjs uses binary encoding for updates</li>
                        <li>Impact: 10x smaller payloads than equivalent JSON</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>GPU Backend</td><td>Metal (default)</td><td>Vulkan (API 24+) / OpenGL ES</td></tr>
                <tr><td>Max Refresh Rate</td><td>120Hz (ProMotion)</td><td>60-120Hz (device dependent)</td></tr>
                <tr><td>Frame Sync</td><td>CADisplayLink</td><td>Choreographer</td></tr>
                <tr><td>Touch Sampling</td><td>120Hz (iPad Pro)</td><td>60-240Hz (varies)</td></tr>
                <tr><td>Stylus Support</td><td>Apple Pencil (pressure, tilt)</td><td>S Pen, USI styluses</td></tr>
                <tr><td>Memory Limit</td><td>~1.5GB (typical)</td><td>~512MB-1GB (varies)</td></tr>
                <tr><td>Background Behavior</td><td>Suspended after 30s</td><td>Can run in background</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Simultaneous selection:</strong> Two users select same element. Show both selection colors. Lock element when either starts editing. Other user sees "Being edited by X" indicator.</li>
                <li><strong>Large canvas export:</strong> Export region exceeds memory. Use tile-based rendering (e.g., 4096x4096 tiles), composite in native code, stream to disk.</li>
                <li><strong>Network reconnect with offline edits:</strong> CRDT automatically merges without conflicts. Show toast "Syncing offline changes..." then "All changes synced."</li>
                <li><strong>Undo while others edit:</strong> Per-user undo stacks tracked via Yjs transaction origins. User A's undo never affects User B's elements.</li>
                <li><strong>Rapid drawing point flood:</strong> Batch points in 16ms windows. Apply RDP simplification on stroke end. Set max points per path (10,000).</li>
                <li><strong>Z-index conflicts:</strong> Two users "bring to front" simultaneously. LWW (Last Writer Wins) by timestamp. Rare case, acceptable behavior.</li>
                <li><strong>Image upload while offline:</strong> Queue upload, show placeholder with "Will upload when online" overlay. Complete upload on reconnect.</li>
                <li><strong>Board exceeds memory:</strong> Implement element paging - only load elements in expanded viewport. Lazy load distant regions on pan.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Sync protocol</td><td>CRDT (Yjs)</td><td>OT (Operational Transform)</td><td>Offline-first, no central server required, automatic merge</td></tr>
                <tr><td>Rendering</td><td>Skia (GPU)</td><td>SVG / Canvas 2D</td><td>60fps with many elements, path anti-aliasing, native integration</td></tr>
                <tr><td>Element storage</td><td>Y.Map (flat)</td><td>Y.Array / nested structure</td><td>Direct element access by ID, simpler conflict resolution</td></tr>
                <tr><td>Undo strategy</td><td>Per-user stacks</td><td>Global undo stack</td><td>Users expect undo to affect only their own work</td></tr>
                <tr><td>Presence transport</td><td>Yjs Awareness</td><td>Separate WebSocket channel</td><td>Integrated with doc sync, ephemeral by design</td></tr>
                <tr><td>Spatial index</td><td>R-tree (RBush)</td><td>Quadtree / Grid</td><td>Better for arbitrary rectangles, proven library</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Path point batching and simplification</li>
                        <li>Viewport coordinate transformations</li>
                        <li>Bounding box calculations</li>
                        <li>Undo/redo state tracking</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Yjs document merge with conflicting edits</li>
                        <li>Offline edit → reconnect → sync flow</li>
                        <li>Multi-user selection locking</li>
                        <li>R-tree viewport query correctness</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>User A draws → appears on User B's screen within 200ms</li>
                        <li>User A deletes element → User B sees deletion</li>
                        <li>Both users offline → reconnect → all changes preserved</li>
                        <li>Export to PNG matches canvas content</li>
                    </ul>
                </li>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>60fps sustained with 10,000 elements</li>
                        <li>Memory stays under 500MB for large boards</li>
                        <li>Drawing latency &lt; 16ms from touch to render</li>
                        <li>Remote cursor latency &lt; 100ms p95</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why CRDT over Operational Transform (OT)?</strong><br/>A: CRDTs work offline without a central server - each client can apply operations locally and sync later. OT requires a server to transform operations, making offline support complex. Yjs CRDTs have proven merge semantics and handle concurrent edits gracefully.</li>
                <li><strong>Q: How do you handle rendering performance?</strong><br/>A: Three main strategies: (1) Skia GPU rendering for hardware acceleration, (2) R-tree spatial index for O(log n) viewport culling - only render visible elements, (3) Path simplification to reduce vertex count.</li>
                <li><strong>Q: How does per-user undo work with CRDTs?</strong><br/>A: Yjs UndoManager tracks transaction origins. Each user's changes are tagged with their clientID. When undoing, only operations with matching origin are reverted. Other users' concurrent changes remain intact.</li>
                <li><strong>Q: How do you handle very large boards?</strong><br/>A: Implement progressive loading - initially load elements in viewport + buffer zone. As user pans, stream in new regions. For export, use tile-based rendering to avoid memory limits.</li>
                <li><strong>Q: Presence throttling strategy?</strong><br/>A: Cursor positions are ephemeral and frequent. Throttle to 20fps (50ms) - fast enough for smooth remote cursors, but doesn't flood bandwidth. Yjs Awareness handles automatic cleanup when users disconnect.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>2D Rendering</td><td>@shopify/react-native-skia</td><td>GPU-accelerated, Metal/Vulkan, path operations</td></tr>
                <tr><td>CRDT Sync</td><td>Yjs</td><td>Production-proven, excellent merge semantics, binary protocol</td></tr>
                <tr><td>WebSocket Provider</td><td>y-websocket</td><td>Official Yjs server, persistence hooks, awareness built-in</td></tr>
                <tr><td>Gestures</td><td>react-native-gesture-handler</td><td>Native thread gestures, multi-touch, simultaneous handlers</td></tr>
                <tr><td>Offline Persistence</td><td>y-indexeddb (web) / MMKV adapter</td><td>Persist Yjs doc locally for offline support</td></tr>
                <tr><td>Spatial Index</td><td>rbush</td><td>R-tree implementation, bulk insert, fast queries</td></tr>
                <tr><td>ID Generation</td><td>nanoid</td><td>Collision-free, URL-safe, small bundle</td></tr>
                <tr><td>Path Simplification</td><td>simplify-js</td><td>RDP algorithm, configurable tolerance</td></tr>
            </table>
        `
     },
    {
        id: 81,
        category: "System Design",
        icon: "🏛️",
        question: "Design a content blocker app requiring deep iOS/Android native integration",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Scope:</strong> Safari only (iOS) or system-wide blocking including in-app browsers?</li>
                <li><strong>Filter sources:</strong> Built-in lists only or support custom subscriptions (EasyList, uBlock filters)?</li>
                <li><strong>Blocking types:</strong> Network-level (DNS) vs content-level (CSS hiding) vs both?</li>
                <li><strong>Privacy stance:</strong> Should any data leave the device? (analytics, crash reports)</li>
                <li><strong>Whitelist granularity:</strong> Domain-level, URL-level, or element-level?</li>
                <li><strong>Update frequency:</strong> How often should filter lists auto-update?</li>
                <li><strong>Statistics scope:</strong> Per-domain breakdown or aggregate only?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Block ads, trackers, and malicious content in Safari (iOS) and system-wide (Android)</li>
                <li>Support multiple filter list subscriptions (EasyList, EasyPrivacy, regional lists)</li>
                <li>Custom rule creation with AdBlock Plus syntax support</li>
                <li>Whitelist specific sites with one-tap toggle</li>
                <li>Statistics dashboard showing blocked requests, bandwidth saved, top blocked domains</li>
                <li>Quick toggle widget to enable/disable blocking without opening app</li>
                <li>Background auto-update of filter lists (daily by default)</li>
                <li>Cosmetic filtering (CSS-based element hiding) for non-blocked elements</li>
                <li>Import/export settings and custom rules</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Performance:</strong> Zero perceptible impact on page load time (&lt;5ms filter matching overhead)</li>
                <li><strong>Battery:</strong> &lt;2% additional drain vs no blocker installed</li>
                <li><strong>Scale:</strong> Support 100,000+ blocking rules efficiently</li>
                <li><strong>Privacy:</strong> All filtering happens on-device; no network traffic for blocking logic</li>
                <li><strong>Memory:</strong> &lt;50MB memory footprint for rule engine</li>
                <li><strong>Startup:</strong> Rules loaded and active within 500ms of device boot</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>VPN-based traffic interception for HTTPS inspection</li>
                <li>Malware scanning or antivirus features</li>
                <li>Parental controls or category-based blocking</li>
                <li>Cross-device rule synchronization</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────┐
│                     CONTENT BLOCKER ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                        React Native App                            │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │  │
│  │  │  Filter List    │  │   Statistics    │  │   Whitelist     │    │  │
│  │  │  Manager UI     │  │   Dashboard     │  │   Manager       │    │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │  │
│  │  │  Rule Editor    │  │  Quick Toggle   │  │  Settings       │    │  │
│  │  │  (Custom Rules) │  │  Widget         │  │                 │    │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │  │
│  └─────────────────────────────┬─────────────────────────────────────┘  │
│                                │ Native Bridge (Turbo Modules)           │
│  ┌─────────────────────────────▼─────────────────────────────────────┐  │
│  │                      Shared Storage Layer                          │  │
│  │     iOS: App Group Container    │    Android: SharedPreferences    │  │
│  │     (Rules JSON, Stats, Config)  │   + Content Provider              │  │
│  └───────────────┬──────────────────┴──────────────┬─────────────────┘  │
│                  │                                  │                     │
│  ┌───────────────▼───────────────┐  ┌──────────────▼──────────────────┐ │
│  │            iOS                │  │            Android              │ │
│  │                               │  │                                 │ │
│  │  ┌─────────────────────────┐  │  │  ┌───────────────────────────┐ │ │
│  │  │ Safari Content Blocker  │  │  │  │   Local VPN Service       │ │ │
│  │  │ Extension               │  │  │  │   (DNS Filtering)         │ │ │
│  │  │ • Declarative JSON rules│  │  │  │   • Domain-level blocking │ │ │
│  │  │ • 50K rule limit        │  │  │  │   • No HTTPS inspection   │ │ │
│  │  │ • Safari only           │  │  │  │   • System-wide           │ │ │
│  │  └─────────────────────────┘  │  │  └───────────────────────────┘ │ │
│  │                               │  │                                 │ │
│  │  ┌─────────────────────────┐  │  │  ┌───────────────────────────┐ │ │
│  │  │ Network Extension       │  │  │  │   WebView Interceptor     │ │ │
│  │  │ (Optional - Enterprise) │  │  │  │   (Accessibility Service) │ │ │
│  │  │ • System-wide blocking  │  │  │  │   • In-app browser support│ │ │
│  │  │ • Requires MDM/Profile  │  │  │  │   • CSS injection         │ │ │
│  │  └─────────────────────────┘  │  │  └───────────────────────────┘ │ │
│  └───────────────────────────────┘  └─────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Filter List Manager</td><td>Subscribe, fetch, parse filter lists</td><td>React Native + Axios</td></tr>
                <tr><td>Rule Compiler</td><td>Convert filter syntax to platform-specific format</td><td>TypeScript + adblock-rs</td></tr>
                <tr><td>Statistics Engine</td><td>Track blocked requests, calculate savings</td><td>MMKV + Zustand</td></tr>
                <tr><td>Shared Storage</td><td>Cross-process rule and config storage</td><td>App Group (iOS) / ContentProvider (Android)</td></tr>
                <tr><td>Safari Content Blocker</td><td>Block requests in Safari via declarative rules</td><td>iOS Extension + JSON rules</td></tr>
                <tr><td>DNS VPN Service</td><td>Intercept and filter DNS queries system-wide</td><td>Android VpnService</td></tr>
                <tr><td>Domain Trie</td><td>O(n) domain matching where n = domain length</td><td>Custom Kotlin/Swift</td></tr>
                <tr><td>Background Updater</td><td>Periodic filter list refresh</td><td>BGTaskScheduler (iOS) / WorkManager (Android)</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>FILTER LIST UPDATE FLOW
=======================

Filter List URL          RN App                    Native Extension
      │                     │                            │
      ▼                     │                            │
┌──────────────┐            │                            │
│ Fetch List   │            │                            │
│ (HTTP GET)   │            │                            │
└──────┬───────┘            │                            │
       │ Raw ABP syntax     │                            │
       ▼                    │                            │
┌──────────────┐            │                            │
│ Parse Rules  │            │                            │
│ (adblock-rs) │            │                            │
└──────┬───────┘            │                            │
       │ Parsed rules       │                            │
       ▼                    │                            │
┌──────────────┐     ┌──────┴──────┐                     │
│ Compile to   │────►│ Update      │                     │
│ Platform     │     │ Statistics  │                     │
│ Format       │     └─────────────┘                     │
└──────┬───────┘                                         │
       │                                                 │
       ├────── iOS JSON ──────────────────────────────────►
       │                                   Safari Extension
       │                                   reloadContentBlocker()
       │                                                 │
       └────── Android Domains ───────────────────────────►
                                           VPN Service
                                           loadBlockList()


BLOCKING FLOW (iOS - Safari)
============================
Browser Request ──► Safari ──► Content Blocker Extension
                               ┌─────────────────────────┐
                               │ Check URL against rules │
                               │ (compiled JSON)         │
                               └───────────┬─────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    │                                             │
                    ▼                                             ▼
              Rule Match                                    No Match
                    │                                             │
                    ▼                                             ▼
              Block/Modify                                  Allow Request


BLOCKING FLOW (Android - DNS VPN)
=================================
App DNS Query ──► VPN Service ──► Domain Trie Lookup
                                  ┌─────────────────────────┐
                                  │ Check domain against    │
                                  │ blocklist (O(n) lookup) │
                                  └───────────┬─────────────┘
                                              │
                   ┌──────────────────────────┴──────────────────────┐
                   │                                                  │
                   ▼                                                  ▼
             Domain Blocked                                    Domain Allowed
                   │                                                  │
                   ▼                                                  ▼
             Return NXDOMAIN                                   Forward to DNS
             Update Statistics                                 (1.1.1.1)</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>iOS blocking method</td><td>Safari Content Blocker</td><td>Apple-approved, low battery impact, declarative rules</td></tr>
                <tr><td>Android blocking method</td><td>Local VPN (DNS only)</td><td>System-wide, no root required, minimal battery impact</td></tr>
                <tr><td>Rule format</td><td>AdBlock Plus syntax</td><td>Industry standard, compatible with popular filter lists</td></tr>
                <tr><td>Domain matching</td><td>Trie data structure</td><td>O(n) lookup where n = domain length, not rule count</td></tr>
                <tr><td>Cross-process storage</td><td>App Group / ContentProvider</td><td>Share rules between app and extension/service</td></tr>
                <tr><td>Statistics storage</td><td>MMKV</td><td>Fast synchronous writes for real-time stats</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/contentBlocker.ts

/**
 * A single blocking rule in normalized format
 */
interface BlockingRule {
    /** Unique rule identifier */
    id: string;
    /** Conditions that trigger this rule */
    trigger: RuleTrigger;
    /** Action to take when triggered */
    action: RuleAction;
    /** Higher priority rules override lower */
    priority: number;
    /** Whether rule is currently active */
    enabled: boolean;
    /** Source filter list */
    sourceListId: string;
    /** Original rule text for debugging */
    rawRule: string;
}

/**
 * Trigger conditions for a blocking rule
 */
interface RuleTrigger {
    /** URL pattern to match (regex or domain) */
    urlFilter: string;
    /** Case sensitivity for pattern matching */
    urlFilterIsCaseSensitive?: boolean;
    /** Resource types this rule applies to */
    resourceType?: ResourceType[];
    /** First-party vs third-party requests */
    loadType?: ('first-party' | 'third-party')[];
    /** Only apply on these domains */
    ifDomain?: string[];
    /** Exclude these domains */
    unlessDomain?: string[];
    /** Match against top-level URL */
    ifTopUrl?: string[];
    /** Exclude based on top-level URL */
    unlessTopUrl?: string[];
}

type ResourceType =
    | 'document'
    | 'image'
    | 'style-sheet'
    | 'script'
    | 'font'
    | 'media'
    | 'raw'
    | 'popup'
    | 'websocket'
    | 'fetch'
    | 'other';

/**
 * Action to perform when rule matches
 */
interface RuleAction {
    type: ActionType;
    /** CSS selector for element hiding */
    selector?: string;
    /** Redirect URL for redirect rules */
    redirect?: string;
}

type ActionType =
    | 'block'              // Block the request
    | 'block-cookies'      // Block only cookies
    | 'css-display-none'   // Hide element via CSS
    | 'ignore-previous-rules' // Whitelist (override)
    | 'make-https';        // Upgrade to HTTPS

/**
 * A subscribed filter list
 */
interface FilterList {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** Subscription URL */
    url: string;
    /** Publisher homepage */
    homepage: string;
    /** Whether subscription is active */
    enabled: boolean;
    /** Last successful update timestamp */
    lastUpdated: number;
    /** Number of rules in this list */
    ruleCount: number;
    /** Checksum for change detection */
    checksum: string;
    /** Category (ads, privacy, social, regional) */
    category: FilterCategory;
    /** Update interval in hours */
    updateInterval: number;
}

type FilterCategory = 'ads' | 'privacy' | 'social' | 'security' | 'regional' | 'custom';

/**
 * Blocking statistics
 */
interface BlockingStatistics {
    /** Total requests blocked all-time */
    totalBlocked: number;
    /** Breakdown by category */
    blockedByCategory: Record&lt;FilterCategory, number&gt;;
    /** Estimated bandwidth saved in bytes */
    bandwidthSaved: number;
    /** Daily statistics for charts */
    dailyStats: DailyStat[];
    /** Top blocked domains */
    topBlockedDomains: DomainStat[];
}

interface DailyStat {
    date: string; // YYYY-MM-DD
    blocked: number;
    allowed: number;
    bandwidthSaved: number;
}

interface DomainStat {
    domain: string;
    blockedCount: number;
    lastBlocked: number;
}

/**
 * User whitelist entry
 */
interface WhitelistEntry {
    /** Domain or URL pattern */
    pattern: string;
    /** Match type */
    type: 'domain' | 'url' | 'regex';
    /** When added */
    addedAt: number;
    /** User note */
    note?: string;
}

/**
 * iOS Safari Content Blocker rule format
 */
interface SafariContentBlockerRule {
    trigger: {
        'url-filter': string;
        'url-filter-is-case-sensitive'?: boolean;
        'resource-type'?: string[];
        'load-type'?: string[];
        'if-domain'?: string[];
        'unless-domain'?: string[];
    };
    action: {
        type: string;
        selector?: string;
    };
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────┐       1:N        ┌─────────────────┐
│   FilterList    │─────────────────►│  BlockingRule   │
│ (subscription)  │                  │                 │
└─────────────────┘                  └─────────────────┘
        │
        │ N:1
        ▼
┌─────────────────┐
│ FilterCategory  │
└─────────────────┘

┌─────────────────┐       1:N        ┌─────────────────┐
│      User       │─────────────────►│ WhitelistEntry  │
│   (implicit)    │                  │                 │
└─────────────────┘                  └─────────────────┘
        │
        │ 1:1
        ▼
┌─────────────────┐       1:N        ┌─────────────────┐
│   Statistics    │─────────────────►│    DailyStat    │
│   (aggregate)   │                  │                 │
└─────────────────┘                  └─────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Filter list metadata</td><td>MMKV</td><td>Fast reads for UI, small data</td></tr>
                <tr><td>Compiled iOS rules</td><td>App Group JSON file</td><td>Safari extension reads directly</td></tr>
                <tr><td>Android block domains</td><td>SharedPreferences + Trie in memory</td><td>Fast O(n) domain lookup</td></tr>
                <tr><td>Raw filter lists (cache)</td><td>File system cache</td><td>Large text files, infrequent access</td></tr>
                <tr><td>Blocking statistics</td><td>MMKV</td><td>Frequent updates, atomic writes</td></tr>
                <tr><td>Whitelist entries</td><td>MMKV</td><td>Small data, frequent reads</td></tr>
                <tr><td>Daily stats history</td><td>SQLite (expo-sqlite)</td><td>Time-series queries for charts</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Rule Compiler Service</h5>
            <pre><code>// services/RuleCompiler.ts

/**
 * Compiles AdBlock Plus syntax rules to platform-specific formats.
 * iOS: Safari Content Blocker JSON (50K rule limit)
 * Android: Domain list for DNS filtering
 */
class RuleCompiler {
    /** iOS Safari Content Blocker has 50,000 rule limit per extension */
    private readonly IOS_RULE_LIMIT = 50000;

    /**
     * Compile all enabled filter lists to platform-specific formats.
     * @param filterLists - Array of subscribed filter lists
     * @returns Compiled rules for iOS and Android with statistics
     */
    async compileRules(filterLists: FilterList[]): Promise&lt;CompiledRuleSet&gt;;

    /**
     * Convert normalized rules to Safari Content Blocker JSON format.
     * @param rules - Normalized blocking rules (max 50,000)
     * @returns Array of Safari-compatible rule objects
     */
    private compileForIOS(rules: BlockingRule[]): SafariContentBlockerRule[];

    /**
     * Extract domains for DNS-level blocking on Android.
     * @param rules - Normalized blocking rules
     * @returns Domain list and CSS rules for WebView injection
     */
    private compileForAndroid(rules: BlockingRule[]): AndroidRuleSet;

    /**
     * Remove duplicate rules by URL pattern hash.
     * @param rules - Raw parsed rules with potential duplicates
     * @returns Deduplicated rule array
     */
    private deduplicateRules(rules: BlockingRule[]): BlockingRule[];

    /**
     * Sort rules by specificity (more specific first).
     * Whitelist rules (ignore-previous-rules) placed last.
     * @param rules - Deduplicated rules
     * @returns Sorted rules by priority
     */
    private prioritizeRules(rules: BlockingRule[]): BlockingRule[];
}

interface CompiledRuleSet {
    /** Safari Content Blocker JSON string */
    ios: string;
    /** Android domain list and CSS rules JSON */
    android: string;
    /** Compilation statistics */
    statistics: {
        totalRules: number;
        byCategory: Record&lt;FilterCategory, number&gt;;
    };
}

interface AndroidRuleSet {
    /** Domains to block at DNS level */
    blockedDomains: string[];
    /** CSS rules for WebView element hiding */
    cssRules: BlockingRule[];
}</code></pre>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useContentBlocker.ts

/**
 * Main hook for content blocker functionality.
 * Manages filter lists, statistics, and whitelist.
 */
function useContentBlocker(): {
    /** Subscribed filter lists */
    filterLists: FilterList[];
    /** Subscribe to a new filter list */
    addFilterList: (url: string) =&gt; Promise&lt;void&gt;;
    /** Remove a filter list subscription */
    removeFilterList: (id: string) =&gt; void;
    /** Toggle filter list enabled state */
    toggleFilterList: (id: string) =&gt; void;
    /** Force refresh all filter lists */
    refreshLists: () =&gt; Promise&lt;void&gt;;
    /** Whether blocking is currently active */
    isEnabled: boolean;
    /** Toggle blocking on/off */
    setEnabled: (enabled: boolean) =&gt; Promise&lt;void&gt;;
    /** Total active rule count */
    ruleCount: number;
    /** Last update timestamp */
    lastUpdated: number;
    /** Update in progress */
    isUpdating: boolean;
};

// hooks/useBlockingStats.ts

/**
 * Hook for blocking statistics and analytics.
 */
function useBlockingStats(): {
    /** Total requests blocked all-time */
    totalBlocked: number;
    /** Blocked by category breakdown */
    blockedByCategory: Record&lt;FilterCategory, number&gt;;
    /** Estimated bandwidth saved in bytes */
    bandwidthSaved: number;
    /** Daily statistics for charts (last 30 days) */
    dailyStats: DailyStat[];
    /** Top 10 blocked domains */
    topBlockedDomains: DomainStat[];
    /** Reset all statistics */
    resetStats: () =&gt; void;
};

// hooks/useWhitelist.ts

/**
 * Hook for managing whitelisted domains.
 */
function useWhitelist(): {
    /** All whitelist entries */
    entries: WhitelistEntry[];
    /** Add domain to whitelist */
    addToWhitelist: (domain: string, note?: string) =&gt; void;
    /** Remove from whitelist */
    removeFromWhitelist: (pattern: string) =&gt; void;
    /** Check if domain is whitelisted */
    isWhitelisted: (domain: string) =&gt; boolean;
    /** Temporarily whitelist for session */
    temporaryWhitelist: (domain: string) =&gt; void;
};</code></pre>

            <h5>Native Bridge APIs - iOS</h5>
            <pre><code>// ios/ContentBlockerExtension/ContentBlockerRequestHandler.swift

import Foundation
import MobileCoreServices

/**
 * Safari Content Blocker Extension handler.
 * Loads compiled rules from shared App Group container.
 */
class ContentBlockerRequestHandler: NSObject, NSExtensionRequestHandling {

    /// Called by Safari when it needs blocking rules
    func beginRequest(with context: NSExtensionContext) {
        let sharedContainer = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.com.app.blocker"
        )

        let rulesURL = sharedContainer?.appendingPathComponent("blockerRules.json")

        guard let rulesURL = rulesURL,
              let rulesData = try? Data(contentsOf: rulesURL) else {
            context.completeRequest(returningItems: nil)
            return
        }

        let attachment = NSItemProvider(
            item: rulesData as NSData,
            typeIdentifier: kUTTypeJSON as String
        )

        let item = NSExtensionItem()
        item.attachments = [attachment]
        context.completeRequest(returningItems: [item])
    }
}

// ios/ContentBlockerModule.swift - React Native Bridge

import SafariServices

/**
 * Native module for iOS content blocker management.
 * Handles rule compilation, extension reload, and state queries.
 */
@objc(ContentBlockerModule)
class ContentBlockerModule: NSObject {
    private let sharedDefaults = UserDefaults(suiteName: "group.com.app.blocker")
    private let extensionIdentifier = "com.app.blocker.contentblocker"

    /// Compile and deploy rules to Safari Content Blocker
    /// - Parameters:
    ///   - rules: JSON string of Safari Content Blocker rules
    ///   - resolve: Success callback with rule count
    ///   - reject: Error callback
    @objc func compileAndUpdateRules(
        _ rules: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let rulesData = rules.data(using: .utf8),
              let _ = try? JSONSerialization.jsonObject(with: rulesData) else {
            reject("INVALID_RULES", "Invalid JSON format", nil)
            return
        }

        let sharedContainer = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.com.app.blocker"
        )

        guard let rulesURL = sharedContainer?.appendingPathComponent("blockerRules.json") else {
            reject("CONTAINER_ERROR", "Cannot access shared container", nil)
            return
        }

        do {
            try rulesData.write(to: rulesURL)

            SFContentBlockerManager.reloadContentBlocker(
                withIdentifier: extensionIdentifier
            ) { error in
                if let error = error {
                    reject("RELOAD_ERROR", error.localizedDescription, error)
                } else {
                    self.sharedDefaults?.set(Date().timeIntervalSince1970, forKey: "lastUpdated")
                    resolve(["success": true, "ruleCount": self.countRules(rulesData)])
                }
            }
        } catch {
            reject("WRITE_ERROR", error.localizedDescription, error)
        }
    }

    /// Get current state of Safari Content Blocker extension
    @objc func getExtensionState(
        _ resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        SFContentBlockerManager.getStateOfContentBlocker(
            withIdentifier: extensionIdentifier
        ) { state, error in
            if let error = error {
                reject("STATE_ERROR", error.localizedDescription, error)
            } else {
                resolve([
                    "enabled": state?.isEnabled ?? false,
                    "lastUpdated": self.sharedDefaults?.double(forKey: "lastUpdated") ?? 0
                ])
            }
        }
    }

    /// Open iOS Settings for Content Blocker configuration
    @objc func openSettings() {
        if let url = URL(string: UIApplication.openSettingsURLString) {
            DispatchQueue.main.async {
                UIApplication.shared.open(url)
            }
        }
    }

    private func countRules(_ data: Data) -&gt; Int {
        (try? JSONSerialization.jsonObject(with: data) as? [[String: Any]])?.count ?? 0
    }
}</code></pre>

            <h5>Native Bridge APIs - Android</h5>
            <pre><code>// android/app/src/main/java/com/app/blocker/DnsBlockerService.kt

package com.app.blocker

import android.app.Notification
import android.content.Intent
import android.net.VpnService
import android.os.ParcelFileDescriptor
import java.io.FileInputStream
import java.io.FileOutputStream
import java.net.DatagramSocket
import java.net.InetAddress
import java.nio.ByteBuffer

/**
 * Local VPN service for system-wide DNS filtering.
 * Routes only DNS traffic (port 53) through VPN.
 * Uses Domain Trie for O(n) lookup where n = domain length.
 */
class DnsBlockerService : VpnService() {
    private var vpnInterface: ParcelFileDescriptor? = null
    private var isRunning = false
    private lateinit var domainTrie: DomainTrie

    companion object {
        const val ACTION_START = "com.app.blocker.START"
        const val ACTION_STOP = "com.app.blocker.STOP"
        private const val VPN_ADDRESS = "10.0.0.2"
        private const val VPN_DNS = "10.0.0.1"
        private const val UPSTREAM_DNS = "1.1.1.1"
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -&gt; startVpn()
            ACTION_STOP -&gt; stopVpn()
        }
        return START_STICKY
    }

    private fun startVpn() {
        if (isRunning) return

        loadBlockList()

        val builder = Builder()
            .setSession("ContentBlocker")
            .addAddress(VPN_ADDRESS, 32)
            .addDnsServer(VPN_DNS)
            .addRoute(VPN_DNS, 32)
            .setMtu(1500)
            .setBlocking(true)

        vpnInterface = builder.establish()
        isRunning = true
        startForeground(1, createNotification())

        Thread { handleDnsPackets() }.start()
    }

    private fun handleDnsPackets() {
        val inputStream = FileInputStream(vpnInterface!!.fileDescriptor)
        val outputStream = FileOutputStream(vpnInterface!!.fileDescriptor)
        val packet = ByteBuffer.allocate(32767)
        val upstreamSocket = DatagramSocket()
        upstreamSocket.connect(InetAddress.getByName(UPSTREAM_DNS), 53)

        while (isRunning) {
            packet.clear()
            val length = inputStream.read(packet.array())
            if (length &lt;= 0) continue

            val dnsQuery = parseDnsQuery(packet) ?: continue
            val domain = dnsQuery.questionDomain

            if (domainTrie.contains(domain)) {
                outputStream.write(createNxdomainResponse(dnsQuery))
                recordBlockedRequest(domain)
            } else {
                val response = forwardDnsQuery(upstreamSocket, dnsQuery)
                outputStream.write(wrapInIpPacket(response))
            }
        }
    }

    private fun loadBlockList() {
        val prefs = getSharedPreferences("blocker", MODE_PRIVATE)
        val domains = prefs.getStringSet("blockedDomains", emptySet())!!

        domainTrie = DomainTrie()
        domains.forEach { domainTrie.insert(it) }
    }
}

/**
 * Trie data structure for efficient domain suffix matching.
 * Domains stored in reverse order for suffix matching.
 * O(n) lookup where n = length of domain being checked.
 */
class DomainTrie {
    private val root = TrieNode()

    /** Insert domain for blocking (stored reversed for suffix matching) */
    fun insert(domain: String) {
        var node = root
        domain.split(".").reversed().forEach { part -&gt;
            node = node.children.getOrPut(part) { TrieNode() }
        }
        node.isEnd = true
    }

    /** Check if domain or any parent domain is blocked */
    fun contains(domain: String): Boolean {
        var node = root
        val parts = domain.split(".").reversed()

        for (part in parts) {
            node = node.children[part] ?: return false
            if (node.isEnd) return true // Wildcard match on parent
        }
        return node.isEnd
    }
}

private class TrieNode {
    val children = mutableMapOf&lt;String, TrieNode&gt;()
    var isEnd = false
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Domain Trie data structure:</strong>
                    <ul>
                        <li>Problem: Checking 100K+ domains with regex is O(rules × domain length)</li>
                        <li>Solution: Trie stores reversed domains for O(n) suffix matching where n = domain parts</li>
                        <li>Impact: Sub-millisecond lookups regardless of rule count</li>
                    </ul>
                </li>
                <li><strong>Rule deduplication and prioritization:</strong>
                    <ul>
                        <li>Problem: Multiple filter lists have overlapping rules</li>
                        <li>Solution: Hash-based deduplication + specificity scoring</li>
                        <li>Impact: 30-40% reduction in compiled rule size</li>
                    </ul>
                </li>
                <li><strong>Lazy rule compilation:</strong>
                    <ul>
                        <li>Problem: Compiling 100K rules blocks UI thread</li>
                        <li>Solution: Compile in background thread, show progress indicator</li>
                        <li>Impact: Non-blocking UI during updates</li>
                    </ul>
                </li>
                <li><strong>Incremental statistics updates:</strong>
                    <ul>
                        <li>Problem: Writing stats on every blocked request is expensive</li>
                        <li>Solution: Batch updates in memory, flush to MMKV every 100 requests</li>
                        <li>Impact: &lt;1% CPU overhead for statistics tracking</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Blocking scope</td><td>Safari only (WebKit)</td><td>System-wide DNS filtering</td></tr>
                <tr><td>Rule format</td><td>Declarative JSON (Safari Content Blocker)</td><td>Domain list + runtime checking</td></tr>
                <tr><td>Rule limit</td><td>50,000 per extension</td><td>Unlimited (memory-constrained)</td></tr>
                <tr><td>HTTPS visibility</td><td>URL patterns only</td><td>DNS queries only (no HTTPS inspection)</td></tr>
                <tr><td>User setup</td><td>Enable in Settings &gt; Safari</td><td>Grant VPN permission</td></tr>
                <tr><td>Battery impact</td><td>Minimal (kernel-level)</td><td>Low (only DNS routed through VPN)</td></tr>
                <tr><td>Statistics</td><td>No callback for blocked requests</td><td>Can track every blocked domain</td></tr>
                <tr><td>CSS hiding</td><td>Native support via selector rules</td><td>Requires WebView injection</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>iOS extension not enabled:</strong> Detect via getStateOfContentBlocker(), show step-by-step setup guide with deep link to Settings</li>
                <li><strong>Android VPN permission denied:</strong> Fall back to WebView-only blocking via custom WebViewClient, explain limitations to user</li>
                <li><strong>iOS rule limit exceeded:</strong> Prioritize rules by specificity, truncate to 50K, show warning with count of dropped rules</li>
                <li><strong>Corrupt filter list download:</strong> Validate checksum before applying, rollback to cached version on failure</li>
                <li><strong>Site breakage from overzealous blocking:</strong> One-tap whitelist button in blocked content notice, temporary session whitelist option</li>
                <li><strong>Android battery optimization kills VPN:</strong> Detect via lifecycle callbacks, guide user to exempt app from battery optimization</li>
                <li><strong>Filter list URL unreachable:</strong> Retry with exponential backoff, use cached rules, show last successful update time</li>
                <li><strong>Rule syntax errors:</strong> Skip invalid rules with warning, continue parsing remaining rules</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>iOS blocking</td><td>Safari Content Blocker</td><td>Network Extension</td><td>No MDM required, App Store friendly, lower battery</td></tr>
                <tr><td>Android blocking</td><td>Local VPN (DNS only)</td><td>Accessibility Service</td><td>System-wide coverage, more reliable than a11y hacks</td></tr>
                <tr><td>Domain lookup</td><td>Trie data structure</td><td>HashSet</td><td>Supports wildcard subdomain matching</td></tr>
                <tr><td>Rule format</td><td>AdBlock Plus syntax</td><td>Custom format</td><td>Compatible with existing filter lists</td></tr>
                <tr><td>Statistics storage</td><td>MMKV</td><td>SQLite</td><td>Faster for frequent small writes</td></tr>
                <tr><td>Cross-process sharing</td><td>App Group / ContentProvider</td><td>File-based</td><td>OS-managed sync, atomic updates</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Rule parser: AdBlock Plus syntax parsing edge cases</li>
                        <li>Domain Trie: Insert, lookup, wildcard matching</li>
                        <li>Rule compiler: iOS/Android format output validation</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Filter list fetch and parse pipeline</li>
                        <li>Native bridge communication (rule deployment)</li>
                        <li>Statistics persistence and aggregation</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>iOS: Verify ad blocked in Safari WebView (Detox + SafariDriver)</li>
                        <li>Android: Verify DNS query blocked via VPN service</li>
                        <li>Whitelist: Verify whitelisted domains bypass blocking</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why different approaches for iOS vs Android?</strong>
                    <br/>A: Apple requires declarative rules (no runtime code in Safari), while Android allows VPN-based filtering. iOS approach is more efficient but limited to Safari; Android approach is system-wide but requires persistent VPN.</li>
                <li><strong>Q: How do you ensure user privacy with VPN-based blocking?</strong>
                    <br/>A: VPN only routes DNS traffic (not HTTPS content), all processing is local (no external servers), open-source Trie implementation for transparency, clear privacy policy about data handling.</li>
                <li><strong>Q: How does the Trie enable wildcard matching?</strong>
                    <br/>A: Domains stored in reverse order (com.google.ads becomes [ads, google, com]). When checking "subdomain.ads.google.com", we traverse and if any node is marked as end (blocking rule), we block. This naturally handles wildcards like "*.google.com".</li>
                <li><strong>Q: How would you handle cosmetic filtering (element hiding)?</strong>
                    <br/>A: iOS Safari Content Blocker supports CSS selectors natively. Android requires injecting CSS via WebViewClient.onPageFinished() or Accessibility Service for other apps.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Background Tasks</td><td>react-native-background-fetch</td><td>Periodic filter list updates with OS-managed scheduling</td></tr>
                <tr><td>Storage</td><td>react-native-mmkv</td><td>Fast synchronous writes for statistics and rules</td></tr>
                <tr><td>HTTP Client</td><td>axios + axios-cache-interceptor</td><td>Cached filter list fetching with ETag support</td></tr>
                <tr><td>Rule Parsing</td><td>adblock-rs (via native)</td><td>Industry-standard ABP syntax parser in Rust</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>Reactive stats dashboard with minimal boilerplate</td></tr>
                <tr><td>Native Bridge</td><td>Turbo Modules</td><td>Synchronous native calls for rule updates</td></tr>
                <tr><td>Charts</td><td>react-native-gifted-charts</td><td>Statistics visualization (daily blocked, bandwidth saved)</td></tr>
            </table>
        `
     },
    {
        id: 82,
        category: "System Design",
        icon: "🏛️",
        question: "How would you architect a camera app with custom filters and real-time processing?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Filter types:</strong> What categories of filters are needed? (color grading, beauty, artistic, AR face masks)</li>
                <li><strong>Performance targets:</strong> What frame rate is required for preview? (30fps vs 60fps vs 120fps ProMotion)</li>
                <li><strong>Device support:</strong> What's the minimum device tier? (affects GPU shader complexity)</li>
                <li><strong>Capture modes:</strong> Photo only, video, or both? Live photo support on iOS?</li>
                <li><strong>Filter customization:</strong> Pre-built filters only, or user-adjustable parameters?</li>
                <li><strong>Face detection:</strong> Single face or multi-face? Need landmarks for beauty effects?</li>
                <li><strong>AR requirements:</strong> Face masks only, or full body tracking/background replacement?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Real-time camera preview with filter effects at 60fps minimum</li>
                <li>20+ customizable filters across categories (color grading, beauty, artistic)</li>
                <li>Photo and video capture with filters applied in real-time</li>
                <li>Face detection for targeted beauty filters (smoothing, whitening, eye enlargement)</li>
                <li>Filter intensity adjustment via slider (0-100%)</li>
                <li>AR effects including face masks and virtual backgrounds</li>
                <li>Front/back camera switching with filter persistence</li>
                <li>LUT (Look-Up Table) based filters for professional color grading</li>
                <li>Filter preview thumbnails with live camera feed</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Latency:</strong> Zero perceptible lag between viewfinder and real scene (&lt;33ms)</li>
                <li><strong>Capture speed:</strong> Photo capture latency &lt;200ms from tap to saved image</li>
                <li><strong>Battery:</strong> Battery drain comparable to native camera apps (&lt;10%/hour active use)</li>
                <li><strong>Memory:</strong> Peak memory usage &lt;300MB including filter textures</li>
                <li><strong>Compatibility:</strong> Support devices from iPhone 8/Android API 24+</li>
                <li><strong>Thermal:</strong> No throttling warnings during 10-minute continuous recording</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Professional video editing (trimming, multi-track)</li>
                <li>Cloud-based filter processing</li>
                <li>Social sharing features</li>
                <li>Full body AR tracking or scene reconstruction</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌────────────────────────────────────────────────────────────────┐
│                   CAMERA APP ARCHITECTURE                       │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React Native UI                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │ Filter       │  │ Capture      │  │ Settings     │   │   │
│  │  │ Selector     │  │ Controls     │  │ Panel        │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │ Intensity    │  │ Camera Flip  │  │ Flash/HDR    │   │   │
│  │  │ Slider       │  │ Button       │  │ Controls     │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │ Reanimated Worklets               │
│  ┌──────────────────────────▼──────────────────────────────┐   │
│  │              react-native-vision-camera                  │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              Frame Processor (Worklet Thread)     │   │   │
│  │  │   ┌─────────┐  ┌─────────┐  ┌─────────────────┐  │   │   │
│  │  │   │ Filter  │  │ Face    │  │ ML Kit/Core ML  │  │   │   │
│  │  │   │ Plugin  │  │ Detect  │  │ Inference       │  │   │   │
│  │  │   └─────────┘  └─────────┘  └─────────────────┘  │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│  ┌──────────────────────────▼──────────────────────────────┐   │
│  │                  GPU RENDERING PIPELINE                  │   │
│  ├─────────────────────────┬────────────────────────────────┤   │
│  │   iOS (Metal)           │   Android (Vulkan/OpenGL ES)   │   │
│  │  ┌───────────────────┐  │  ┌─────────────────────────┐   │   │
│  │  │ AVFoundation      │  │  │ CameraX                 │   │   │
│  │  │ Metal Compute     │  │  │ GPUImage / RenderScript │   │   │
│  │  │ Core Image CIFilter│  │  │ OpenGL ES 3.0 Shaders  │   │   │
│  │  │ Metal Shaders (.msl)│  │  │ GLSL Fragment Shaders  │   │   │
│  │  └───────────────────┘  │  └─────────────────────────┘   │   │
│  └─────────────────────────┴────────────────────────────────┘   │
│                                                                 │
│  FILTER ASSET MANAGEMENT                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  LUT Textures (3D) │ Shader Programs │ Face Mesh Assets  │   │
│  │  Pre-compiled      │ Pre-loaded      │ Lazy-loaded       │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Camera Preview</td><td>Display real-time camera feed with filters</td><td>react-native-vision-camera</td></tr>
                <tr><td>Frame Processor</td><td>Per-frame GPU shader execution</td><td>Worklets (Reanimated)</td></tr>
                <tr><td>Filter Engine (iOS)</td><td>GPU-accelerated image processing</td><td>Metal Compute Shaders</td></tr>
                <tr><td>Filter Engine (Android)</td><td>GPU-accelerated image processing</td><td>GPUImage / OpenGL ES</td></tr>
                <tr><td>Face Detection</td><td>Real-time face landmarks</td><td>ML Kit / Vision Framework</td></tr>
                <tr><td>LUT Manager</td><td>Load and cache color lookup tables</td><td>Native texture management</td></tr>
                <tr><td>Capture Pipeline</td><td>Photo/video capture with filters</td><td>AVFoundation / CameraX</td></tr>
                <tr><td>Filter Selector</td><td>UI for browsing and selecting filters</td><td>React Native FlatList</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>FRAME PROCESSING PIPELINE
=========================

Camera Sensor → Raw Frame (YUV) → GPU Texture → Apply Shader → Display/Encode
     │              │                 │              │              │
     │              │                 │              │              │
     ▼              ▼                 ▼              ▼              ▼
  60fps        CVPixelBuffer    CVMetalTexture   Compute       MTKView
               (iOS) or         (iOS) or         Pipeline       (iOS)
               ImageProxy       SurfaceTexture   ┌────────┐    GLSurfaceView
               (Android)        (Android)        │ LUT    │    (Android)
                                                 │ Beauty │
                                                 │ AR Mask│
                                                 └────────┘

CAPTURE FLOW
============
User Tap → Freeze Preview → Apply Final Filter → Encode → Save to Gallery
                                  │
                                  ├─── Photo: HEIC/JPEG with EXIF
                                  └─── Video: H.264/H.265 with hardware encoder</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Frame processor</td><td>Vision Camera Worklets</td><td>Runs off JS thread, sub-frame latency</td></tr>
                <tr><td>Filter format</td><td>3D LUT textures</td><td>Professional color grading, GPU-native</td></tr>
                <tr><td>iOS GPU API</td><td>Metal Compute</td><td>Direct GPU access, lower latency than Core Image</td></tr>
                <tr><td>Android GPU API</td><td>GPUImage/OpenGL ES</td><td>Broad device support, proven library</td></tr>
                <tr><td>Face detection</td><td>ML Kit (Android) / Vision (iOS)</td><td>On-device, real-time landmarks</td></tr>
                <tr><td>State sharing</td><td>Reanimated shared values</td><td>UI thread isolation, worklet access</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/camera.ts

/**
 * Filter definition with type and adjustable parameters
 */
interface Filter {
    /** Unique filter identifier */
    id: string;
    /** Display name */
    name: string;
    /** Filter category */
    type: FilterType;
    /** Thumbnail for filter selector */
    thumbnailUri: string;
    /** Default intensity (0-1) */
    intensity: number;
    /** Filter-specific parameters */
    parameters: FilterParameters;
    /** Whether filter requires face detection */
    requiresFaceDetection: boolean;
    /** GPU shader program name */
    shaderName: string;
}

type FilterType = 'color' | 'beauty' | 'artistic' | 'ar' | 'lut';

/**
 * Adjustable filter parameters
 */
interface FilterParameters {
    // Color grading
    brightness?: number;      // -1 to 1
    contrast?: number;        // -1 to 1
    saturation?: number;      // -1 to 1
    temperature?: number;     // -1 (cool) to 1 (warm)
    tint?: number;            // -1 (green) to 1 (magenta)
    highlights?: number;      // -1 to 1
    shadows?: number;         // -1 to 1

    // LUT-based
    lutTexture?: string;      // Asset path to 3D LUT
    lutSize?: 32 | 64;        // LUT dimension (64x64x64 default)

    // Beauty
    smoothing?: number;       // 0-1, skin smoothing intensity
    whitening?: number;       // 0-1, skin whitening
    eyeEnlarge?: number;      // 0-1, eye size multiplier
    faceSlim?: number;        // 0-1, face narrowing
    lipColor?: string;        // Hex color for lip tint

    // AR
    maskAsset?: string;       // Face mask 3D model
    backgroundAsset?: string; // Virtual background image
}

/**
 * Camera state for UI binding
 */
interface CameraState {
    position: CameraPosition;
    flash: FlashMode;
    hdr: boolean;
    zoom: number;              // 1x to maxZoom
    exposure: number;          // -2 to 2 EV
    focusPoint?: { x: number; y: number };
    isRecording: boolean;
    isTakingPhoto: boolean;
}

type CameraPosition = 'front' | 'back';
type FlashMode = 'off' | 'on' | 'auto' | 'torch';

/**
 * Result from photo/video capture
 */
interface CaptureResult {
    /** Local file URI */
    uri: string;
    /** Image dimensions */
    width: number;
    height: number;
    /** Media type */
    type: 'photo' | 'video';
    /** Duration in seconds (video only) */
    duration?: number;
    /** Capture metadata */
    metadata: CaptureMetadata;
}

interface CaptureMetadata {
    filterId: string;
    filterIntensity: number;
    timestamp: number;
    location?: { latitude: number; longitude: number };
    deviceModel: string;
    cameraPosition: CameraPosition;
}

/**
 * Face detection result for beauty filters
 */
interface FaceDetectionResult {
    faces: Face[];
    frameWidth: number;
    frameHeight: number;
    processingTimeMs: number;
}

interface Face {
    bounds: { x: number; y: number; width: number; height: number };
    landmarks: FaceLandmarks;
    rollAngle: number;
    yawAngle: number;
    trackingId?: number;
}

interface FaceLandmarks {
    leftEye: Point;
    rightEye: Point;
    nose: Point;
    mouth: Point;
    leftCheek: Point;
    rightCheek: Point;
    chin: Point;
    contours?: Point[];  // Full face contour (68 points)
}

interface Point {
    x: number;
    y: number;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────┐       1:N        ┌─────────────────┐
│  FilterCategory │─────────────────►│     Filter      │
│  (color/beauty) │                  │                 │
└─────────────────┘                  └────────┬────────┘
                                              │
                                              │ 1:1
                                              ▼
                                     ┌─────────────────┐
                                     │FilterParameters │
                                     │ (adjustable)    │
                                     └─────────────────┘

┌─────────────────┐       1:1        ┌─────────────────┐
│   CameraState   │─────────────────►│     Filter      │
│  (current)      │                  │   (active)      │
└─────────────────┘                  └─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐       1:1        ┌─────────────────┐
│  CaptureResult  │─────────────────►│CaptureMetadata  │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘

┌─────────────────┐       1:N        ┌─────────────────┐
│FaceDetectionResult────────────────►│      Face       │
│  (per frame)    │                  │                 │
└─────────────────┘                  └────────┬────────┘
                                              │
                                              │ 1:1
                                              ▼
                                     ┌─────────────────┐
                                     │ FaceLandmarks   │
                                     │ (68 points)     │
                                     └─────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Filter definitions</td><td>Bundled JSON + assets</td><td>Fast startup, no network dependency</td></tr>
                <tr><td>LUT textures</td><td>Asset bundle (PNG)</td><td>GPU-ready format, pre-optimized</td></tr>
                <tr><td>User filter preferences</td><td>MMKV</td><td>Fast sync reads for last-used filter</td></tr>
                <tr><td>Captured media</td><td>Camera Roll / Gallery</td><td>System-managed, user accessible</td></tr>
                <tr><td>Face detection cache</td><td>In-memory only</td><td>Per-frame data, no persistence needed</td></tr>
                <tr><td>Shader programs</td><td>Pre-compiled binary</td><td>Avoid runtime compilation overhead</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useCamera.ts
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';

/**
 * Hook for camera device and format management.
 * Selects optimal device and 60fps format.
 */
function useCamera(): {
    /** Active camera device */
    device: CameraDevice | undefined;
    /** Optimal camera format for preview/capture */
    format: CameraFormat | undefined;
    /** Current flash mode */
    flash: FlashMode;
    /** Update flash mode */
    setFlash: (mode: FlashMode) =&gt; void;
    /** Switch between front/back camera */
    flipCamera: () =&gt; void;
    /** Current camera position */
    position: CameraPosition;
    /** Camera reference for capture */
    cameraRef: React.RefObject&lt;Camera&gt;;
};

// hooks/useFilter.ts

/**
 * Hook for filter selection and intensity management.
 * Integrates with Reanimated shared values for worklet access.
 */
function useFilter(): {
    /** All available filters */
    filters: Filter[];
    /** Currently selected filter */
    activeFilter: Filter;
    /** Select a filter by ID */
    setFilter: (filterId: string) =&gt; void;
    /** Current intensity (0-1) */
    intensity: number;
    /** Update intensity (Reanimated shared value) */
    setIntensity: (value: number) =&gt; void;
    /** Shared value for worklet access */
    intensityShared: SharedValue&lt;number&gt;;
    /** Shared value for filter config */
    filterConfigShared: SharedValue&lt;FilterConfig&gt;;
};

// hooks/useFaceDetection.ts

/**
 * Hook for real-time face detection results.
 * Updates on each frame when faces are detected.
 */
function useFaceDetection(): {
    /** Detected faces in current frame */
    faces: Face[];
    /** Whether face detection is active */
    isActive: boolean;
    /** Enable/disable face detection */
    setActive: (active: boolean) =&gt; void;
    /** Processing time in ms */
    processingTime: number;
};

// hooks/useCapture.ts

/**
 * Hook for photo and video capture with filters applied.
 */
function useCapture(cameraRef: React.RefObject&lt;Camera&gt;): {
    /** Take photo with current filter */
    takePhoto: () =&gt; Promise&lt;CaptureResult&gt;;
    /** Start video recording */
    startRecording: () =&gt; void;
    /** Stop video recording */
    stopRecording: () =&gt; Promise&lt;CaptureResult&gt;;
    /** Whether recording is in progress */
    isRecording: boolean;
    /** Recording duration in seconds */
    recordingDuration: number;
    /** Whether capture is in progress */
    isCapturing: boolean;
};</code></pre>

            <h5>Frame Processor Plugin Interface</h5>
            <pre><code>// frameProcessors/filterPlugin.ts
import { Frame } from 'react-native-vision-camera';

/**
 * Frame processor plugin for applying GPU filters.
 * Runs on worklet thread at 60fps.
 */
interface FilterFrameProcessorPlugin {
    /**
     * Apply filter to camera frame (called per-frame).
     * @param frame - Raw camera frame
     * @param config - Filter configuration
     * @returns Modified frame or null
     */
    applyFilter(
        frame: Frame,
        config: {
            filterId: string;
            intensity: number;
            parameters: FilterParameters;
            faceData?: FaceDetectionResult;
        }
    ): Frame | null;
}

/**
 * Face detection frame processor plugin.
 * Returns face landmarks for beauty filters.
 */
interface FaceDetectionPlugin {
    /**
     * Detect faces in frame.
     * @param frame - Raw camera frame
     * @returns Array of detected faces with landmarks
     */
    detectFaces(frame: Frame): FaceDetectionResult;
}</code></pre>

            <h5>Native Bridge APIs - iOS</h5>
            <pre><code>// ios/Filters/MetalFilterPipeline.swift

import Metal
import MetalKit
import AVFoundation

/**
 * Metal-based GPU filter pipeline for iOS.
 * Pre-compiles shaders for zero-latency filter switching.
 */
class MetalFilterPipeline {
    private let device: MTLDevice
    private let commandQueue: MTLCommandQueue
    private let textureCache: CVMetalTextureCache
    private var filterPipelines: [String: MTLComputePipelineState] = [:]

    /// Initialize Metal pipeline and pre-compile shaders
    init() throws {
        guard let device = MTLCreateSystemDefaultDevice() else {
            throw CameraError.metalNotSupported
        }
        self.device = device
        self.commandQueue = device.makeCommandQueue()!

        var cache: CVMetalTextureCache?
        CVMetalTextureCacheCreate(nil, nil, device, nil, &amp;cache)
        self.textureCache = cache!

        try loadFilterShaders()
    }

    /// Apply filter to pixel buffer in-place
    /// - Parameters:
    ///   - filterName: Shader name to execute
    ///   - pixelBuffer: CVPixelBuffer to process
    ///   - intensity: Filter intensity (0-1)
    ///   - parameters: Additional filter parameters
    func applyFilter(
        _ filterName: String,
        to pixelBuffer: CVPixelBuffer,
        intensity: Float,
        parameters: [String: Any]
    ) {
        guard let pipeline = filterPipelines[filterName] else { return }

        let width = CVPixelBufferGetWidth(pixelBuffer)
        let height = CVPixelBufferGetHeight(pixelBuffer)

        var textureRef: CVMetalTexture?
        CVMetalTextureCacheCreateTextureFromImage(
            nil, textureCache, pixelBuffer, nil,
            .bgra8Unorm, width, height, 0, &amp;textureRef
        )

        guard let textureRef = textureRef,
              let texture = CVMetalTextureGetTexture(textureRef) else { return }

        guard let commandBuffer = commandQueue.makeCommandBuffer(),
              let encoder = commandBuffer.makeComputeCommandEncoder() else { return }

        encoder.setComputePipelineState(pipeline)
        encoder.setTexture(texture, index: 0)
        encoder.setBytes([intensity], length: MemoryLayout&lt;Float&gt;.size, index: 0)

        let threadGroupSize = MTLSize(width: 16, height: 16, depth: 1)
        let threadGroups = MTLSize(
            width: (width + 15) / 16,
            height: (height + 15) / 16,
            depth: 1
        )
        encoder.dispatchThreadgroups(threadGroups, threadsPerThreadgroup: threadGroupSize)
        encoder.endEncoding()

        commandBuffer.commit()
        commandBuffer.waitUntilCompleted()
    }

    private func loadFilterShaders() throws {
        let library = device.makeDefaultLibrary()!
        let filterNames = ["grayscale", "sepia", "vintage", "vivid", "beauty", "blur", "lut"]

        for name in filterNames {
            guard let function = library.makeFunction(name: "\(name)Filter") else { continue }
            filterPipelines[name] = try device.makeComputePipelineState(function: function)
        }
    }
}

// Metal Shader Example - LUT-based color grading
/*
#include &lt;metal_stdlib&gt;
using namespace metal;

kernel void lutFilter(
    texture2d&lt;float, access::read_write&gt; image [[texture(0)]],
    texture3d&lt;float, access::sample&gt; lut [[texture(1)]],
    constant float &amp;intensity [[buffer(0)]],
    uint2 gid [[thread_position_in_grid]]
) {
    constexpr sampler s(coord::normalized, filter::linear);

    float4 color = image.read(gid);
    float3 lutCoord = color.rgb * (64.0 - 1.0) / 64.0;
    float4 lutColor = lut.sample(s, lutCoord);

    float4 result = mix(color, lutColor, intensity);
    result.a = 1.0;

    image.write(result, gid);
}
*/</code></pre>

            <h5>Native Bridge APIs - Android</h5>
            <pre><code>// android/app/src/main/java/com/app/camera/FilterFrameProcessor.kt

package com.app.camera

import android.graphics.Bitmap
import com.mrousavy.camera.frameprocessor.Frame
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin
import jp.co.cyberagent.android.gpuimage.GPUImage
import jp.co.cyberagent.android.gpuimage.filter.*

/**
 * Frame processor plugin for Vision Camera.
 * Applies GPUImage filters to each camera frame.
 */
class FilterFrameProcessor(
    private val reactContext: ReactApplicationContext
) : FrameProcessorPlugin() {

    private val gpuImage = GPUImage(reactContext)

    override fun callback(frame: Frame, params: Map&lt;String, Any&gt;?): Any? {
        val filterName = params?.get("filter") as? String ?: return null
        val intensity = (params["intensity"] as? Double)?.toFloat() ?: 1f

        val bitmap = frameToBitmap(frame)
        gpuImage.setFilter(getFilter(filterName, intensity))
        val filtered = gpuImage.getBitmapWithFilterApplied(bitmap)
        bitmapToFrame(filtered, frame)

        return null
    }

    private fun getFilter(name: String, intensity: Float): GPUImageFilter {
        return when (name) {
            "grayscale" -&gt; GPUImageGrayscaleFilter()
            "sepia" -&gt; GPUImageSepiaToneFilter().apply { setIntensity(intensity) }
            "blur" -&gt; GPUImageGaussianBlurFilter().apply { setBlurSize(intensity * 2f) }
            "beauty" -&gt; GPUImageBilateralBlurFilter().apply {
                setDistanceNormalizationFactor(intensity * 8f)
            }
            "vintage" -&gt; GPUImageLookupFilter().apply {
                // Load 3D LUT texture
            }
            else -&gt; GPUImageFilter()
        }
    }
}

// OpenGL ES Fragment Shader - Sepia filter
/*
#extension GL_OES_EGL_image_external : require
precision mediump float;
varying vec2 vTexCoord;
uniform samplerExternalOES uTexture;
uniform float uIntensity;

void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 sepia = vec3(gray * 1.2, gray * 1.0, gray * 0.8);
    gl_FragColor = vec4(mix(color.rgb, sepia, uIntensity), color.a);
}
*/</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Pre-compile all shaders on app launch:</strong>
                    <ul>
                        <li>Problem: Shader compilation causes frame drops on first filter use</li>
                        <li>Solution: Compile all Metal/OpenGL shaders during splash screen</li>
                        <li>Impact: Zero-latency filter switching after initial load</li>
                    </ul>
                </li>
                <li><strong>CVMetalTextureCache reuse:</strong>
                    <ul>
                        <li>Problem: Creating GPU textures per frame allocates memory</li>
                        <li>Solution: Reuse texture cache, avoid CVMetalTextureCacheCreate per frame</li>
                        <li>Impact: Eliminates memory allocation overhead, stable 60fps</li>
                    </ul>
                </li>
                <li><strong>LUT texture preloading:</strong>
                    <ul>
                        <li>Problem: Loading 3D LUT from disk causes frame drops</li>
                        <li>Solution: Preload popular LUTs into GPU memory on filter selector scroll</li>
                        <li>Impact: Instant LUT filter application</li>
                    </ul>
                </li>
                <li><strong>Face detection throttling:</strong>
                    <ul>
                        <li>Problem: Running ML detection every frame is expensive</li>
                        <li>Solution: Run detection every 3rd frame, interpolate landmarks between</li>
                        <li>Impact: 3x reduction in ML inference cost with smooth results</li>
                    </ul>
                </li>
                <li><strong>Thermal throttling detection:</strong>
                    <ul>
                        <li>Problem: Sustained GPU load causes thermal warnings</li>
                        <li>Solution: Monitor ProcessInfo.thermalState (iOS) / ThermalStatusManager (Android)</li>
                        <li>Impact: Proactively reduce FPS/resolution before throttling kicks in</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>GPU API</td><td>Metal Compute Shaders</td><td>OpenGL ES 3.0 / Vulkan</td></tr>
                <tr><td>Texture format</td><td>CVMetalTexture (zero-copy)</td><td>SurfaceTexture (copy required)</td></tr>
                <tr><td>Frame rate</td><td>Native 60/120fps ProMotion</td><td>Device-dependent (30-60fps)</td></tr>
                <tr><td>Face detection</td><td>Vision Framework (VNDetectFaceLandmarksRequest)</td><td>ML Kit Face Detection</td></tr>
                <tr><td>Video encoding</td><td>AVAssetWriter with Metal</td><td>MediaCodec with Surface input</td></tr>
                <tr><td>LUT format</td><td>3D texture (MTLTexture3D)</td><td>2D strip texture (workaround)</td></tr>
                <tr><td>Mirroring</td><td>CALayer.transform3D</td><td>Matrix.setScale(-1, 1)</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Device overheating:</strong> Monitor thermal state, reduce FPS to 30, disable compute-heavy beauty filters, show user notification</li>
                <li><strong>Low memory devices:</strong> Downscale preview to 720p, use smaller LUT textures (32x32x32), lazy-load filter thumbnails</li>
                <li><strong>Front camera mirroring:</strong> Mirror preview display but save un-mirrored image for selfies (matches user expectation)</li>
                <li><strong>HDR capture:</strong> Apply filter to tone-mapped result, optionally preserve original HDR in metadata</li>
                <li><strong>Filter switching during recording:</strong> Queue filter change, apply at next keyframe to avoid artifacts</li>
                <li><strong>Camera permission denied:</strong> Show educational UI explaining why camera access is needed with deep link to Settings</li>
                <li><strong>No face detected for beauty filter:</strong> Gracefully degrade to color-only filter, avoid jarring beauty effect flicker</li>
                <li><strong>Background → foreground transition:</strong> Reinitialize camera session, restore last filter state from MMKV</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Filter format</td><td>3D LUT textures</td><td>Procedural shaders</td><td>LUTs are GPU-native, professional color grading standard</td></tr>
                <tr><td>iOS GPU API</td><td>Metal Compute</td><td>Core Image CIFilter</td><td>Lower latency, direct GPU control</td></tr>
                <tr><td>Android GPU API</td><td>GPUImage library</td><td>RenderScript</td><td>GPUImage is maintained, RenderScript deprecated</td></tr>
                <tr><td>Face detection</td><td>Platform native (Vision/ML Kit)</td><td>TensorFlow Lite</td><td>Native APIs are optimized for device, no model bundling</td></tr>
                <tr><td>Filter preview</td><td>Live camera feed thumbnails</td><td>Static sample images</td><td>Real-time preview shows actual result</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Filter parameter validation (intensity bounds, LUT paths)</li>
                        <li>Camera state machine transitions</li>
                        <li>Capture metadata serialization</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Frame processor plugin registration</li>
                        <li>Filter switching during preview</li>
                        <li>Photo/video capture with filters (Detox)</li>
                    </ul>
                </li>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>Frame rate stability under filter load (60fps target)</li>
                        <li>Memory usage during LUT loading</li>
                        <li>Thermal behavior during extended recording</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why use LUT-based filters vs procedural shaders?</strong>
                    <br/>A: LUTs are pre-computed color transformations stored as 3D textures. They're faster (single texture lookup vs multiple arithmetic ops) and allow designers to create filters in Photoshop/DaVinci Resolve. Procedural filters are more flexible for effects like blur or distortion that depend on spatial information.</li>
                <li><strong>Q: How do you avoid memory allocations per frame?</strong>
                    <br/>A: Reuse CVMetalTextureCache on iOS to create textures from CVPixelBuffer without copying. On Android, use SurfaceTexture with pre-allocated EGLImage. Avoid creating new Bitmap objects per frame.</li>
                <li><strong>Q: How would you implement beauty filter face tracking?</strong>
                    <br/>A: Run face detection every 3rd frame to reduce CPU load. Interpolate landmark positions between detections for smooth results. Use face tracking ID to handle multiple faces. Apply bilateral blur selectively to skin regions identified by landmarks.</li>
                <li><strong>Q: What's the challenge with video recording + filters?</strong>
                    <br/>A: The filtered frames must be encoded in real-time by hardware encoder. On iOS, use AVAssetWriter with pixel buffer adaptor fed from Metal output. On Android, use MediaCodec Surface input. Filter must complete within frame budget (16ms at 60fps).</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Camera</td><td>react-native-vision-camera</td><td>Frame processors, 60fps, photo/video, worklet integration</td></tr>
                <tr><td>GPU Processing (iOS)</td><td>Metal Compute Shaders</td><td>Direct GPU access, minimal latency</td></tr>
                <tr><td>GPU Processing (Android)</td><td>GPUImage</td><td>Proven library, filter presets, OpenGL ES</td></tr>
                <tr><td>Face Detection</td><td>ML Kit (Android) / Vision (iOS)</td><td>On-device, real-time landmarks, no model bundling</td></tr>
                <tr><td>State Sharing</td><td>react-native-reanimated</td><td>Shared values accessible from worklets</td></tr>
                <tr><td>Media Library</td><td>@react-native-camera-roll/camera-roll</td><td>Save to system gallery with metadata</td></tr>
                <tr><td>Image Manipulation</td><td>expo-image-manipulator</td><td>Post-capture filter application for editing</td></tr>
            </table>
        `
     },
    {
        id: 83,
        category: "System Design",
        icon: "🏛️",
        question: "Design a background location tracking system that's battery-efficient",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Use case:</strong> Fitness tracking, fleet management, delivery, or general location history?</li>
                <li><strong>Accuracy needs:</strong> What's the minimum acceptable accuracy? (GPS-level vs cell tower)</li>
                <li><strong>Update frequency:</strong> Continuous streaming, periodic polling, or event-based (geofences)?</li>
                <li><strong>Battery budget:</strong> What's acceptable battery drain per hour?</li>
                <li><strong>Offline support:</strong> Should locations be buffered when offline? For how long?</li>
                <li><strong>App lifecycle:</strong> Must it work when app is killed by OS or only in background?</li>
                <li><strong>Server sync:</strong> Real-time sync or batch upload during charging/WiFi?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Track user location in background continuously or periodically</li>
                <li>Support multiple accuracy modes: high (GPS), balanced (GPS+cell+WiFi), low (cell only), significant (500m+ changes)</li>
                <li>Geofence monitoring for entry/exit of defined circular regions</li>
                <li>Batch upload locations when device is on WiFi and/or charging</li>
                <li>Resume tracking automatically after device restart</li>
                <li>Activity recognition to auto-adjust tracking mode (stationary → geofence only, driving → high accuracy)</li>
                <li>Local buffer of 10,000+ locations for offline scenarios</li>
                <li>User-visible notification showing tracking status (Android requirement)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Battery:</strong> Drain &lt;5% per hour in balanced mode, &lt;1% in significant-only mode</li>
                <li><strong>Duration:</strong> Background tracking works for 24+ hours without app interaction</li>
                <li><strong>Resilience:</strong> Survive app being killed by OS (via significant location/geofence wake-up)</li>
                <li><strong>Compliance:</strong> Adhere to iOS/Android background restrictions and privacy requirements</li>
                <li><strong>Accuracy:</strong> 10m accuracy in high mode, 100m in balanced, 500m in significant</li>
                <li><strong>Latency:</strong> Location updates delivered within 5 seconds of detection</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Indoor positioning (Bluetooth beacons, WiFi RTT)</li>
                <li>Real-time location sharing with other users</li>
                <li>Map visualization in the tracking app</li>
                <li>Server-side trip detection and analytics</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>
            <h5>System Architecture Diagram</h5>
            <pre><code>┌────────────────────────────────────────────────────────────────┐
│           BATTERY-EFFICIENT LOCATION TRACKING                   │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React Native App                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │ Location UI  │  │ Geofence Mgr │  │ Battery Mon  │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│  ┌──────────────────────────▼──────────────────────────────┐   │
│  │           ADAPTIVE LOCATION SERVICE (Native)             │   │
│  │  ┌───────────────────────────────────────────────────┐   │   │
│  │  │ Mode Selector │ Activity Monitor │ Battery Monitor│   │   │
│  │  └───────────────────────────────────────────────────┘   │   │
│  └─────────────┬────────────────────────────┬──────────────┘   │
│                │                            │                   │
│  ┌─────────────▼────────────┐  ┌───────────▼───────────────┐   │
│  │        iOS               │  │        Android            │   │
│  │  ┌───────────────────┐   │  │  ┌─────────────────────┐  │   │
│  │  │ CLLocationManager │   │  │  │ FusedLocationClient │  │   │
│  │  │ • Significant Loc │   │  │  │ • Priority modes    │  │   │
│  │  │ • Visit Monitoring│   │  │  │ • Batched updates   │  │   │
│  │  │ • Geofencing      │   │  │  │ • Geofencing API    │  │   │
│  │  └───────────────────┘   │  │  └─────────────────────┘  │   │
│  │  ┌───────────────────┐   │  │  ┌─────────────────────┐  │   │
│  │  │ CMMotionActivity  │   │  │  │ Activity Recog API  │  │   │
│  │  │ (activity type)   │   │  │  │ (walking/driving)   │  │   │
│  │  └───────────────────┘   │  │  └─────────────────────┘  │   │
│  │  ┌───────────────────┐   │  │  ┌─────────────────────┐  │   │
│  │  │ Background Task   │   │  │  │ Foreground Service  │  │   │
│  │  │ (BGTaskScheduler) │   │  │  │ + WorkManager       │  │   │
│  │  └───────────────────┘   │  │  └─────────────────────┘  │   │
│  └──────────────────────────┘  └───────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Local Storage (MMKV)                     │   │
│  │   Location Buffer │ Pending Uploads │ Tracking Config    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Adaptive Location Service</td><td>Select optimal tracking mode based on activity/battery</td><td>Native module (Swift/Kotlin)</td></tr>
                <tr><td>iOS Location Manager</td><td>GPS tracking with deferred updates, significant location</td><td>CLLocationManager</td></tr>
                <tr><td>Android Location Provider</td><td>Fused location with priority modes and batching</td><td>FusedLocationProviderClient</td></tr>
                <tr><td>Activity Recognition</td><td>Detect user activity to adjust tracking mode</td><td>CMMotionActivity / Activity Recognition API</td></tr>
                <tr><td>Geofence Manager</td><td>Monitor entry/exit of circular regions</td><td>CLCircularRegion / Geofencing API</td></tr>
                <tr><td>Battery Monitor</td><td>Adjust mode based on battery level and charging state</td><td>expo-battery</td></tr>
                <tr><td>Local Buffer</td><td>Store locations offline for later sync</td><td>MMKV</td></tr>
                <tr><td>Background Sync</td><td>Upload buffered locations on WiFi/charging</td><td>BGTaskScheduler / WorkManager</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>LOCATION TRACKING FLOW
======================

Device Sensors → Native Service → Local Buffer → Server Sync
     │               │                │              │
     ▼               ▼                ▼              ▼
┌─────────┐    ┌──────────┐     ┌─────────┐    ┌─────────┐
│GPS/Cell │    │ Filter   │     │ MMKV    │    │ Batch   │
│WiFi     │───▶│ & Dedupe │────▶│ Buffer  │───▶│ Upload  │
└─────────┘    └──────────┘     └─────────┘    └─────────┘
                    │                              │
                    ▼                              │
             ┌──────────┐                          │
             │ Activity │                          │
             │ Changed? │──── Yes ─► Adjust Mode   │
             └──────────┘                          │
                    │                              │
                    │ No                           │
                    ▼                              │
             ┌──────────┐                          │
             │ Battery  │                          │
             │ Low?     │──── Yes ─► Low Power Mode│
             └──────────┘                          │
                                                   │
                              ┌─────────────────────┘
                              │
                              ▼
                        ┌──────────┐
                        │ WiFi +   │
                        │ Charging?│──── Yes ─► Upload Now
                        └──────────┘
                              │
                              │ No
                              ▼
                        Queue for Later</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Background strategy (iOS)</td><td>Significant location + geofences</td><td>Works when app killed, minimal battery</td></tr>
                <tr><td>Background strategy (Android)</td><td>Foreground service + WorkManager</td><td>Required for continuous tracking on Android 8+</td></tr>
                <tr><td>Location batching</td><td>Deferred updates (iOS), maxUpdateDelay (Android)</td><td>Reduces wake-ups, saves battery</td></tr>
                <tr><td>Activity recognition</td><td>Platform-native APIs</td><td>Hardware-accelerated, low power</td></tr>
                <tr><td>Local storage</td><td>MMKV</td><td>Fast synchronous writes for location buffer</td></tr>
                <tr><td>Server sync</td><td>Opportunistic (WiFi + charging)</td><td>Minimizes cellular usage and battery</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>
            <h5>Core Entities</h5>
            <pre><code>// types/location.ts

/**
 * Single location point with metadata
 */
interface LocationPoint {
    /** Latitude in degrees */
    latitude: number;
    /** Longitude in degrees */
    longitude: number;
    /** Altitude in meters (null if unavailable) */
    altitude: number | null;
    /** Horizontal accuracy in meters */
    accuracy: number;
    /** Speed in m/s (null if stationary) */
    speed: number | null;
    /** Heading in degrees from true north (null if stationary) */
    heading: number | null;
    /** Unix timestamp in milliseconds */
    timestamp: number;
    /** Detected activity at time of location */
    activityType?: ActivityType;
    /** Battery level at time of location (0-1) */
    batteryLevel?: number;
    /** Whether device was charging */
    isCharging?: boolean;
    /** Upload status */
    syncStatus: 'pending' | 'synced' | 'failed';
}

/**
 * User activity type from motion sensors
 */
type ActivityType = 'stationary' | 'walking' | 'running' | 'cycling' | 'driving' | 'unknown';

/**
 * Tracking mode configuration
 */
interface TrackingConfig {
    /** Tracking mode identifier */
    mode: TrackingMode;
    /** Minimum distance change to trigger update (meters) */
    distanceFilter: number;
    /** Minimum time between updates (ms) */
    timeInterval: number;
    /** Expected activity type hint for OS optimization */
    activityType: ActivityType;
    /** Whether to batch updates for battery savings */
    deferredUpdates: boolean;
    /** Maximum batch delay in ms (for deferred updates) */
    deferredDistance?: number;
    /** Maximum batch distance in meters */
    deferredTimeout?: number;
}

type TrackingMode = 'high' | 'balanced' | 'low' | 'significant' | 'geofence';

/**
 * Geofence region definition
 */
interface Geofence {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** Center latitude */
    latitude: number;
    /** Center longitude */
    longitude: number;
    /** Radius in meters (max 100m iOS, unlimited Android) */
    radius: number;
    /** Trigger on entering region */
    notifyOnEntry: boolean;
    /** Trigger on exiting region */
    notifyOnExit: boolean;
    /** Trigger after dwelling in region */
    notifyOnDwell: boolean;
    /** Dwell time threshold in ms */
    dwellTime?: number;
    /** Custom metadata */
    metadata?: Record&lt;string, any&gt;;
}

/**
 * Geofence transition event
 */
interface GeofenceEvent {
    geofenceId: string;
    transitionType: 'enter' | 'exit' | 'dwell';
    location: LocationPoint;
    timestamp: number;
}

/**
 * Predefined tracking configurations for each mode
 */
const TRACKING_CONFIGS: Record&lt;TrackingMode, TrackingConfig&gt; = {
    high: {
        mode: 'high',
        distanceFilter: 10,
        timeInterval: 5000,
        activityType: 'driving',
        deferredUpdates: false,
    },
    balanced: {
        mode: 'balanced',
        distanceFilter: 50,
        timeInterval: 30000,
        activityType: 'walking',
        deferredUpdates: true,
        deferredDistance: 500,
        deferredTimeout: 120000,
    },
    low: {
        mode: 'low',
        distanceFilter: 100,
        timeInterval: 60000,
        activityType: 'unknown',
        deferredUpdates: true,
        deferredDistance: 1000,
        deferredTimeout: 300000,
    },
    significant: {
        mode: 'significant',
        distanceFilter: 500,
        timeInterval: 0, // Event-based only
        activityType: 'unknown',
        deferredUpdates: true,
    },
    geofence: {
        mode: 'geofence',
        distanceFilter: 0,
        timeInterval: 0,
        activityType: 'stationary',
        deferredUpdates: true,
    },
};</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────┐       1:1        ┌─────────────────┐
│  TrackingConfig │◄────────────────│  TrackingMode   │
│  (active)       │                  │  (selected)     │
└────────┬────────┘                  └─────────────────┘
         │
         │ determines
         ▼
┌─────────────────┐       1:N        ┌─────────────────┐
│ LocationService │─────────────────►│  LocationPoint  │
│  (running)      │                  │  (buffered)     │
└────────┬────────┘                  └────────┬────────┘
         │                                    │
         │ monitors                           │ syncs to
         ▼                                    ▼
┌─────────────────┐                  ┌─────────────────┐
│   Geofence[]    │                  │  Server API     │
│  (registered)   │                  │  (batch upload) │
└────────┬────────┘                  └─────────────────┘
         │
         │ triggers
         ▼
┌─────────────────┐
│ GeofenceEvent[] │
│ (enter/exit)    │
└─────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Location buffer</td><td>MMKV (circular buffer)</td><td>Fast sync writes, 10K+ points</td></tr>
                <tr><td>Tracking config</td><td>MMKV</td><td>Persist across app restarts</td></tr>
                <tr><td>Geofences</td><td>MMKV + Native registration</td><td>Survive app kill, OS-managed</td></tr>
                <tr><td>Pending uploads</td><td>MMKV queue</td><td>Retry failed syncs</td></tr>
                <tr><td>Last known location</td><td>MMKV</td><td>Fast access for UI</td></tr>
                <tr><td>Activity history</td><td>In-memory (last 10)</td><td>Mode switching logic only</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useLocationTracking.ts

/**
 * Main hook for background location tracking.
 * Manages tracking lifecycle and mode selection.
 */
function useLocationTracking(): {
    /** Current tracking mode */
    mode: TrackingMode;
    /** Start background tracking with specified mode */
    startTracking: (mode: TrackingMode) =&gt; Promise&lt;void&gt;;
    /** Stop all tracking */
    stopTracking: () =&gt; Promise&lt;void&gt;;
    /** Change tracking mode while running */
    setMode: (mode: TrackingMode) =&gt; Promise&lt;void&gt;;
    /** Whether tracking is currently active */
    isTracking: boolean;
    /** Last known location */
    lastLocation: LocationPoint | null;
    /** Error state */
    error: Error | null;
};

// hooks/useGeofence.ts

/**
 * Hook for geofence management.
 * Registers/unregisters circular regions with the OS.
 */
function useGeofence(): {
    /** All registered geofences */
    geofences: Geofence[];
    /** Add a new geofence */
    addGeofence: (geofence: Omit&lt;Geofence, 'id'&gt;) =&gt; Promise&lt;string&gt;;
    /** Remove a geofence */
    removeGeofence: (id: string) =&gt; Promise&lt;void&gt;;
    /** Remove all geofences */
    clearGeofences: () =&gt; Promise&lt;void&gt;;
    /** Recent geofence events */
    events: GeofenceEvent[];
};

// hooks/useAdaptiveTracking.ts

/**
 * Hook for automatic mode adjustment based on activity and battery.
 * Reduces battery consumption by matching mode to user behavior.
 */
function useAdaptiveTracking(): {
    /** Enable adaptive mode switching */
    enable: () =&gt; void;
    /** Disable adaptive mode (use manual mode) */
    disable: () =&gt; void;
    /** Whether adaptive tracking is enabled */
    isEnabled: boolean;
    /** Current detected activity */
    currentActivity: ActivityType;
    /** Current battery state */
    batteryState: { level: number; isCharging: boolean };
    /** Suggested mode based on current conditions */
    suggestedMode: TrackingMode;
};

// hooks/useLocationSync.ts

/**
 * Hook for syncing buffered locations to server.
 * Handles offline queueing and opportunistic upload.
 */
function useLocationSync(): {
    /** Number of locations pending upload */
    pendingCount: number;
    /** Force immediate sync (if online) */
    syncNow: () =&gt; Promise&lt;{ synced: number; failed: number }&gt;;
    /** Configure sync behavior */
    configure: (config: SyncConfig) =&gt; void;
    /** Last successful sync timestamp */
    lastSyncTime: number | null;
};</code></pre>

            <h5>Native Bridge APIs - iOS</h5>
            <pre><code>// ios/LocationModule.swift

import CoreLocation
import CoreMotion

/**
 * Native module for iOS location tracking.
 * Uses CLLocationManager with adaptive mode selection.
 */
@objc(LocationModule)
class LocationModule: NSObject {
    private let locationManager = CLLocationManager()
    private let motionManager = CMMotionActivityManager()
    private var locationBuffer: [CLLocation] = []
    private var currentMode: TrackingMode = .balanced

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.allowsBackgroundLocationUpdates = true
        locationManager.pausesLocationUpdatesAutomatically = true
    }

    /// Start background location tracking
    /// - Parameters:
    ///   - mode: Tracking mode (high/balanced/low/significant)
    ///   - resolve: Success callback
    ///   - reject: Error callback
    @objc func startTracking(
        _ mode: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard CLLocationManager.authorizationStatus() == .authorizedAlways else {
            reject("PERMISSION", "Always authorization required", nil)
            return
        }

        switch mode {
        case "high":
            locationManager.desiredAccuracy = kCLLocationAccuracyBest
            locationManager.distanceFilter = 10
            locationManager.activityType = .automotiveNavigation
            locationManager.startUpdatingLocation()

        case "balanced":
            locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters
            locationManager.distanceFilter = 50
            if CLLocationManager.deferredLocationUpdatesAvailable() {
                locationManager.allowDeferredLocationUpdates(untilTraveled: 500, timeout: 300)
            }
            locationManager.startUpdatingLocation()

        case "significant":
            locationManager.startMonitoringSignificantLocationChanges()

        default:
            locationManager.startMonitoringSignificantLocationChanges()
        }

        startActivityMonitoring()
        resolve(["started": true])
    }

    /// Register a circular geofence region
    @objc func addGeofence(
        _ config: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let id = config["id"] as? String,
              let lat = config["latitude"] as? Double,
              let lng = config["longitude"] as? Double,
              let radius = config["radius"] as? Double else {
            reject("INVALID", "Invalid geofence config", nil)
            return
        }

        let region = CLCircularRegion(
            center: CLLocationCoordinate2D(latitude: lat, longitude: lng),
            radius: min(radius, locationManager.maximumRegionMonitoringDistance),
            identifier: id
        )
        region.notifyOnEntry = config["notifyOnEntry"] as? Bool ?? true
        region.notifyOnExit = config["notifyOnExit"] as? Bool ?? true

        locationManager.startMonitoring(for: region)
        resolve(["added": true, "id": id])
    }

    private func startActivityMonitoring() {
        guard CMMotionActivityManager.isActivityAvailable() else { return }

        motionManager.startActivityUpdates(to: .main) { [weak self] activity in
            guard let activity = activity else { return }

            if activity.automotive {
                self?.adjustMode(to: .high)
            } else if activity.stationary {
                self?.adjustMode(to: .geofence)
            } else if activity.walking || activity.running {
                self?.adjustMode(to: .balanced)
            }
        }
    }
}

extension LocationModule: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let validLocations = locations.filter { location in
            let age = -location.timestamp.timeIntervalSinceNow
            return age &lt; 60 &amp;&amp; location.horizontalAccuracy &lt; 100
        }

        locationBuffer.append(contentsOf: validLocations)

        if locationBuffer.count &gt;= 10 {
            sendLocationsToJS(locationBuffer)
            locationBuffer.removeAll()
        }
    }

    func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
        sendEvent("geofenceEnter", ["id": region.identifier])
    }

    func locationManager(_ manager: CLLocationManager, didExitRegion region: CLRegion) {
        sendEvent("geofenceExit", ["id": region.identifier])
    }
}</code></pre>

            <h5>Native Bridge APIs - Android</h5>
            <pre><code>// android/LocationTrackingService.kt

package com.app.location

import android.app.Service
import android.content.Intent
import android.os.Looper
import com.google.android.gms.location.*

/**
 * Foreground service for Android background location tracking.
 * Required for Android 8+ continuous location access.
 */
class LocationTrackingService : Service() {
    private lateinit var fusedClient: FusedLocationProviderClient
    private lateinit var geofencingClient: GeofencingClient
    private val locationBuffer = mutableListOf&lt;Location&gt;()

    companion object {
        const val ACTION_START = "START"
        const val ACTION_STOP = "STOP"
        const val EXTRA_MODE = "mode"
    }

    override fun onCreate() {
        super.onCreate()
        fusedClient = LocationServices.getFusedLocationProviderClient(this)
        geofencingClient = LocationServices.getGeofencingClient(this)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -&gt; {
                val mode = intent.getStringExtra(EXTRA_MODE) ?: "balanced"
                startTracking(mode)
            }
            ACTION_STOP -&gt; stopTracking()
        }
        return START_STICKY
    }

    private fun startTracking(mode: String) {
        startForeground(NOTIFICATION_ID, createNotification(mode))

        val request = when (mode) {
            "high" -&gt; LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 5000)
                .setMinUpdateDistanceMeters(10f)
                .setGranularity(Granularity.GRANULARITY_FINE)
                .build()
            "balanced" -&gt; LocationRequest.Builder(Priority.PRIORITY_BALANCED_POWER_ACCURACY, 30000)
                .setMinUpdateDistanceMeters(50f)
                .setMaxUpdateDelayMillis(120000)
                .build()
            "low" -&gt; LocationRequest.Builder(Priority.PRIORITY_LOW_POWER, 60000)
                .setMinUpdateDistanceMeters(100f)
                .setMaxUpdateDelayMillis(300000)
                .build()
            else -&gt; LocationRequest.Builder(Priority.PRIORITY_BALANCED_POWER_ACCURACY, 30000).build()
        }

        fusedClient.requestLocationUpdates(request, locationCallback, Looper.getMainLooper())
        subscribeToActivityRecognition()
    }

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult) {
            result.locations.forEach { location -&gt;
                if (isValidLocation(location)) {
                    locationBuffer.add(location)
                }
            }

            if (locationBuffer.size &gt;= 5) {
                sendLocationsToReactNative(locationBuffer.toList())
                locationBuffer.clear()
            }
        }
    }

    fun addGeofence(config: GeofenceConfig) {
        val geofence = Geofence.Builder()
            .setRequestId(config.id)
            .setCircularRegion(config.latitude, config.longitude, config.radius)
            .setTransitionTypes(
                Geofence.GEOFENCE_TRANSITION_ENTER or
                Geofence.GEOFENCE_TRANSITION_EXIT or
                if (config.notifyOnDwell) Geofence.GEOFENCE_TRANSITION_DWELL else 0
            )
            .setLoiteringDelay(config.dwellTime ?: 30000)
            .setExpirationDuration(Geofence.NEVER_EXPIRE)
            .build()

        val request = GeofencingRequest.Builder()
            .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
            .addGeofence(geofence)
            .build()

        geofencingClient.addGeofences(request, geofencePendingIntent)
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <ul>
                <li><strong>Deferred location updates (iOS):</strong>
                    <ul>
                        <li>Problem: Frequent wake-ups drain battery</li>
                        <li>Solution: Use allowDeferredLocationUpdates to batch updates (500m or 5min)</li>
                        <li>Impact: 50% reduction in CPU wake-ups in balanced mode</li>
                    </ul>
                </li>
                <li><strong>Batched location requests (Android):</strong>
                    <ul>
                        <li>Problem: Each location update wakes the app</li>
                        <li>Solution: Set maxUpdateDelayMillis to batch multiple locations</li>
                        <li>Impact: Receive 5-10 locations per wake instead of 1</li>
                    </ul>
                </li>
                <li><strong>Activity-based mode switching:</strong>
                    <ul>
                        <li>Problem: High-accuracy tracking wastes battery when stationary</li>
                        <li>Solution: Monitor CMMotionActivity/Activity Recognition, switch to geofence-only when stationary</li>
                        <li>Impact: 80% battery reduction during stationary periods</li>
                    </ul>
                </li>
                <li><strong>Significant location changes for app wake:</strong>
                    <ul>
                        <li>Problem: App killed by OS stops tracking</li>
                        <li>Solution: Use startMonitoringSignificantLocationChanges (iOS) to wake app on ~500m movement</li>
                        <li>Impact: Tracking resumes even after app termination</li>
                    </ul>
                </li>
            </ul>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background execution</td><td>Location background mode + significant changes</td><td>Foreground service (mandatory for Android 8+)</td></tr>
                <tr><td>App killed behavior</td><td>Significant location/geofence wake app</td><td>Service restarted via START_STICKY</td></tr>
                <tr><td>Geofence limit</td><td>20 regions maximum</td><td>100 regions (per app)</td></tr>
                <tr><td>Accuracy APIs</td><td>desiredAccuracy + activityType hint</td><td>Priority enum (HIGH/BALANCED/LOW)</td></tr>
                <tr><td>Batching</td><td>allowDeferredLocationUpdates</td><td>maxUpdateDelayMillis</td></tr>
                <tr><td>Permission</td><td>"Always" required for background</td><td>ACCESS_BACKGROUND_LOCATION + foreground service</td></tr>
                <tr><td>Activity recognition</td><td>CMMotionActivityManager</td><td>Activity Recognition API</td></tr>
                <tr><td>Boot persistence</td><td>Significant location auto-restarts</td><td>BOOT_COMPLETED BroadcastReceiver</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>App killed by OS:</strong> Use significant location monitoring (iOS) or geofences to wake app; Android service is restarted via START_STICKY</li>
                <li><strong>GPS unavailable:</strong> Fall back to cell/WiFi positioning, notify user of reduced accuracy, continue buffering</li>
                <li><strong>Location permission revoked:</strong> Detect via authorization change delegate, prompt user to re-enable in Settings</li>
                <li><strong>Device restart:</strong> Register BOOT_COMPLETED receiver (Android); iOS auto-resumes significant location monitoring</li>
                <li><strong>Airplane mode:</strong> Continue buffering locations to MMKV, sync when connectivity returns</li>
                <li><strong>Mock location detected:</strong> Check isFromMockProvider (Android) / sourceInformation (iOS), flag for server validation</li>
                <li><strong>Geofence limit exceeded:</strong> Implement server-side geofence with periodic location checks for overflow regions</li>
                <li><strong>Battery critically low:</strong> Auto-switch to significant-only mode, pause sync uploads</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>iOS background</td><td>Significant location + deferred</td><td>Continuous updates</td><td>Works when killed, battery efficient</td></tr>
                <tr><td>Android background</td><td>Foreground service</td><td>WorkManager periodic</td><td>Guaranteed execution, real-time updates</td></tr>
                <tr><td>Location library</td><td>expo-location</td><td>react-native-geolocation</td><td>Task manager integration, deferred updates</td></tr>
                <tr><td>Local buffer</td><td>MMKV</td><td>SQLite</td><td>Faster writes, simpler for append-only buffer</td></tr>
                <tr><td>Server sync</td><td>Opportunistic (WiFi + charging)</td><td>Immediate upload</td><td>Saves cellular data and battery</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Location filtering logic (age, accuracy thresholds)</li>
                        <li>Mode switching conditions (activity, battery)</li>
                        <li>Buffer management (circular buffer overflow)</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Native module bridge communication</li>
                        <li>Geofence registration and event delivery</li>
                        <li>Background task execution (Detox)</li>
                    </ul>
                </li>
                <li><strong>Device Tests:</strong>
                    <ul>
                        <li>Battery consumption measurement (24hr test)</li>
                        <li>App kill and wake scenarios</li>
                        <li>Network transition (WiFi → cellular) handling</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why is iOS more restrictive for background location?</strong>
                    <br/>A: iOS aggressively kills background apps to preserve battery and system resources. Apps must use specific background modes (location, audio, VoIP) and even then face strict limits. Significant location changes and geofences are OS-managed and survive app termination.</li>
                <li><strong>Q: How does significant location monitoring work?</strong>
                    <br/>A: It uses cell tower changes rather than GPS. When the device connects to a different cell tower (~500m movement), iOS wakes the app briefly to deliver the location. This is extremely battery-efficient because no GPS is activated.</li>
                <li><strong>Q: Android geofence limit is 100, but what if you need more?</strong>
                    <br/>A: Implement a "geofence budget" system: register the 100 nearest geofences to user's current location. When user moves significantly, recalculate and re-register nearest 100. Alternative: server-side geofencing with periodic location polling.</li>
                <li><strong>Q: How do you handle GDPR for location data?</strong>
                    <br/>A: Explicit consent before tracking, clear purpose explanation, data minimization (only collect what's needed), right to deletion (clear buffer on request), data retention limits, anonymization for analytics.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Location</td><td>expo-location</td><td>Unified API, background support, deferred updates</td></tr>
                <tr><td>Task Manager</td><td>expo-task-manager</td><td>Background task registration for both platforms</td></tr>
                <tr><td>Battery</td><td>expo-battery</td><td>Monitor level and charging state for adaptive mode</td></tr>
                <tr><td>Storage</td><td>react-native-mmkv</td><td>Fast synchronous writes for location buffer</td></tr>
                <tr><td>Background Upload</td><td>react-native-background-upload</td><td>Upload while app suspended</td></tr>
                <tr><td>Network State</td><td>@react-native-community/netinfo</td><td>Detect WiFi for opportunistic sync</td></tr>
            </table>
        `
     },
    {
        id: 84,
        category: "System Design",
        icon: "🏛️",
        question: "Design a universal deep linking system that handles authentication states and deferred deep links",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Link types needed:</strong> Universal Links (iOS), App Links (Android), custom schemes, or all? Do we need web fallback for non-app users?</li>
                <li><strong>Deferred links:</strong> Should links work for users who don't have the app yet (click → app store → install → navigate)?</li>
                <li><strong>Authentication:</strong> Which screens require login? How should we handle links to protected content when logged out?</li>
                <li><strong>Attribution:</strong> Do we need marketing attribution (UTM parameters, campaign tracking, referrer)?</li>
                <li><strong>QR/NFC support:</strong> Should the app handle QR code scans and NFC tag taps as link sources?</li>
                <li><strong>Navigation depth:</strong> How deeply nested can target screens be? (e.g., Tab → Stack → Modal)</li>
                <li><strong>Link expiration:</strong> Do certain links expire? How long should deferred links remain valid?</li>
                <li><strong>Existing infra:</strong> Are we using Branch/Adjust/AppsFlyer or building custom deferred linking?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Support Universal Links (iOS), App Links (Android), and custom scheme (myapp://) entry points</li>
                <li>Implement deferred deep linking: capture link intent before install, navigate after first launch</li>
                <li>Gate protected routes behind authentication with pending link persistence</li>
                <li>Navigate to deeply nested screens (TabNavigator → StackNavigator → Screen)</li>
                <li>Extract and validate route parameters with type-safe parsing</li>
                <li>Track attribution data (campaign, source, medium, referrer) for analytics</li>
                <li>Handle QR code scans and NFC tag taps as link sources</li>
                <li>Support link generation for sharing and referrals</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Link resolution latency &lt;200ms from tap to screen render</li>
                <li>99.9% link handling reliability across cold/warm/hot app states</li>
                <li>Deferred link matching accuracy &gt;95% using probabilistic fingerprinting</li>
                <li>Pending links persist across app kills and device restarts</li>
                <li>Zero navigation flicker during auth-gated redirects</li>
                <li>TypeScript type safety for all route params and link configurations</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Email/SMS delivery infrastructure for sharing links</li>
                <li>Link shortener service (use existing like bit.ly or internal)</li>
                <li>Backend URL routing and redirect configuration</li>
                <li>A/B testing framework for different link destinations</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                      UNIVERSAL DEEP LINKING SYSTEM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LINK ENTRY POINTS                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Universal│ │App Links │ │ Custom   │ │Deferred  │ │  QR/NFC  │          │
│  │ Links    │ │(Android) │ │ Scheme   │ │  Links   │ │  Links   │          │
│  │  (iOS)   │ │          │ │myapp://  │ │          │ │          │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│       │            │            │            │            │                  │
│       └────────────┴────────────┼────────────┴────────────┘                  │
│                                 ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        LINK RESOLUTION ENGINE                           ││
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               ││
│  │  │ URL Parser    │  │ Route Matcher │  │ Param Extractor│               ││
│  │  │ & Validator   │──│ (Trie-based)  │──│ & Validator   │               ││
│  │  └───────────────┘  └───────────────┘  └───────────────┘               ││
│  └────────────────────────────────┬────────────────────────────────────────┘│
│                                   ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        LINK STATE MACHINE                               ││
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐             ││
│  │  │ PENDING │───▶│AUTH_REQ │───▶│ READY   │───▶│NAVIGATED│             ││
│  │  │         │    │         │    │         │    │         │             ││
│  │  └─────────┘    └────┬────┘    └─────────┘    └─────────┘             ││
│  │                      │              ▲                                   ││
│  │                      ▼              │                                   ││
│  │                 ┌─────────┐         │                                   ││
│  │                 │DEFERRED │─────────┘                                   ││
│  │                 │(storage)│                                             ││
│  │                 └─────────┘                                             ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                   │                                          │
│  ┌────────────────────────────────┼────────────────────────────────────────┐│
│  │         NAVIGATION LAYER       ▼                                        ││
│  │  ┌─────────────────────────────────────────────────────────────────┐   ││
│  │  │                React Navigation Integration                      │   ││
│  │  │   linking config ──▶ getStateFromPath ──▶ navigation.navigate   │   ││
│  │  └─────────────────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  PLATFORM VERIFICATION                                                       │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐        │
│  │ iOS: Associated Domains      │  │ Android: Asset Links          │        │
│  │ apple-app-site-association   │  │ assetlinks.json              │        │
│  │ /.well-known/AASA           │  │ /.well-known/assetlinks.json │        │
│  └──────────────────────────────┘  └──────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Link Entry Handler</td><td>Receive links from all sources (universal, app, scheme, QR)</td><td>Linking API, SceneDelegate, Intent</td></tr>
                <tr><td>URL Parser</td><td>Parse and validate URL components</td><td>URL API, url-parse</td></tr>
                <tr><td>Route Trie</td><td>Fast O(k) route matching with param extraction</td><td>Custom Trie implementation</td></tr>
                <tr><td>Link State Machine</td><td>Manage link lifecycle (pending → auth → ready → navigated)</td><td>XState</td></tr>
                <tr><td>Deferred Link Service</td><td>Match post-install links via fingerprinting</td><td>Server API + MMKV</td></tr>
                <tr><td>Auth Gate</td><td>Check authentication, store pending links</td><td>Auth context + MMKV</td></tr>
                <tr><td>Navigation Executor</td><td>Execute navigation to target screen</td><td>React Navigation</td></tr>
                <tr><td>Attribution Tracker</td><td>Extract and report UTM/campaign data</td><td>Analytics SDK</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>DEEP LINK RESOLUTION FLOW
=========================

User Clicks Link
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LINK ENTRY DETECTION                         │
├─────────────────────────────────────────────────────────────────┤
│  App Installed?                                                 │
│      │                                                          │
│      ├── YES ─┬── App Running ──▶ onNewIntent / scene:openURL  │
│      │        │                                                 │
│      │        └── App Closed ───▶ getInitialURL / onCreate      │
│      │                                                          │
│      └── NO ───▶ Web Smart Banner ──▶ Store Deferred Link      │
│                        │                                        │
│                        ▼                                        │
│                  App Store / Play Store                         │
│                        │                                        │
│                        ▼                                        │
│                  First Launch: Check Deferred                   │
└─────────────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    URL PARSING & VALIDATION                     │
├─────────────────────────────────────────────────────────────────┤
│  1. Parse URL components (scheme, host, path, params)           │
│  2. Detect link type (universal/applink/custom/deferred)        │
│  3. Match against route trie                                    │
│  4. Validate parameters (regex, type checking)                  │
│  5. Extract attribution data (UTM, referrer)                    │
│                                                                 │
│  Invalid Link? ──▶ Log error ──▶ Navigate to Home              │
└─────────────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION CHECK                         │
├─────────────────────────────────────────────────────────────────┤
│  Route requires auth?                                           │
│      │                                                          │
│      ├── NO ────────────────────────────▶ Navigate directly    │
│      │                                                          │
│      └── YES ─── User authenticated?                            │
│                      │                                          │
│                      ├── YES ───────────▶ Navigate directly    │
│                      │                                          │
│                      └── NO ────────────▶ Store pending link   │
│                                │                                │
│                                ▼                                │
│                          Navigate to Login                      │
│                          (with returnTo param)                  │
└─────────────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NAVIGATION EXECUTION                         │
├─────────────────────────────────────────────────────────────────┤
│  1. Build navigation state from path                            │
│  2. Handle nested navigators                                    │
│  3. Pass validated parameters                                   │
│  4. Execute navigation.navigate()                               │
│  5. Track attribution event                                     │
│  6. Clear pending link (if any)                                 │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Rationale</th><th>Trade-offs</th></tr>
                <tr><td>XState for link lifecycle</td><td>Explicit states prevent impossible transitions, visualizable for debugging</td><td>Learning curve, more boilerplate than simple flags</td></tr>
                <tr><td>Trie-based route matching</td><td>O(k) matching time (k=path segments), efficient param extraction</td><td>Memory overhead, more complex than linear search</td></tr>
                <tr><td>MMKV for pending links</td><td>Synchronous access prevents race conditions during navigation</td><td>Less queryable than SQLite, limited to simple KV</td></tr>
                <tr><td>Server-side deferred matching</td><td>More accurate fingerprint matching, handles IP changes</td><td>Requires network on first launch, server dependency</td></tr>
                <tr><td>React Navigation linking config</td><td>Built-in type safety, deep navigation support</td><td>Less flexible than fully custom routing</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/deeplink.ts

/** Represents a parsed and validated deep link */
interface DeepLink {
    id: string;                              // Unique link instance ID
    url: string;                             // Original URL string
    scheme: LinkScheme;                      // Type of link entry
    path: string;                            // URL pathname
    params: Record&lt;string, string&gt;;          // Extracted route params (:id)
    queryParams: Record&lt;string, string&gt;;     // Query string params (?foo=bar)
    requiresAuth: boolean;                   // Whether target screen needs auth
    priority: number;                        // For conflict resolution
    timestamp: number;                       // When link was received
    state: LinkState;                        // Current lifecycle state
    attribution?: LinkAttribution;           // Marketing/analytics data
}

type LinkScheme = 'universal' | 'applink' | 'custom' | 'deferred' | 'qr' | 'nfc';

type LinkState =
    | 'pending'        // Just received, being processed
    | 'auth_required'  // Needs login before navigation
    | 'deferred'       // Stored for post-install navigation
    | 'ready'          // Ready to navigate
    | 'navigated'      // Successfully navigated
    | 'expired'        // TTL exceeded
    | 'invalid';       // Failed validation

/** Attribution data for marketing analytics */
interface LinkAttribution {
    campaign?: string;   // utm_campaign
    source?: string;     // utm_source (google, facebook, email)
    medium?: string;     // utm_medium (cpc, social, newsletter)
    content?: string;    // utm_content (specific ad/link variant)
    term?: string;       // utm_term (search keywords)
    referrer?: string;   // HTTP referrer or app bundle ID
}

/** Route configuration for matching URLs to screens */
interface RouteConfig {
    pattern: string;                                    // URL pattern with params: /product/:id
    screen: string;                                     // React Navigation screen name
    paramNames?: string[];                              // Expected param keys
    requiresAuth: boolean;                              // Auth gate flag
    nestedIn?: string;                                  // Parent navigator name
    validator?: (params: Record&lt;string, string&gt;) =&gt; boolean;  // Param validation
    priority?: number;                                  // For pattern conflicts
}

/** Deferred link stored server-side for post-install matching */
interface DeferredLinkData {
    id: string;                       // Server-assigned ID
    link: string;                     // Original link URL
    fingerprint: DeviceFingerprint;   // Browser/device fingerprint
    createdAt: number;                // Timestamp when captured
    expiresAt: number;                // TTL expiration
    matched: boolean;                 // Whether matched to an install
    matchedAt?: number;               // When matched
    matchConfidence?: number;         // 0-1 confidence score
}

/** Device fingerprint for probabilistic matching */
interface DeviceFingerprint {
    ipHash: string;          // Hashed IP (privacy-preserving)
    deviceType: string;      // phone, tablet
    osVersion: string;       // iOS 17.0, Android 14
    screenWidth: number;     // Device screen dimensions
    screenHeight: number;
    timezone: string;        // IANA timezone
    language: string;        // Preferred language code
    userAgent?: string;      // Browser UA (web only)
}

/** Pending link persisted for auth-gated navigation */
interface PendingDeepLink {
    link: DeepLink;          // Full link data
    storedAt: number;        // When stored
    expiresAt: number;       // Auto-expire after 24h
    returnTo?: string;       // Screen to return to after auth
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌──────────────────┐
│    DeepLink      │
├──────────────────┤
│ id               │
│ url              │
│ scheme           │
│ path             │
│ params           │
│ state            │
│ attribution ────────┐
└────────┬─────────┘  │
         │            │
         │ matches    │     ┌──────────────────┐
         ▼            │     │ LinkAttribution  │
┌──────────────────┐  │     ├──────────────────┤
│   RouteConfig    │  └────▶│ campaign         │
├──────────────────┤        │ source           │
│ pattern          │        │ medium           │
│ screen           │        │ referrer         │
│ requiresAuth     │        └──────────────────┘
│ nestedIn         │
│ validator        │
└──────────────────┘
         │
         │ gates (if requiresAuth)
         ▼
┌──────────────────┐       ┌──────────────────┐
│ PendingDeepLink  │       │ DeferredLinkData │
├──────────────────┤       ├──────────────────┤
│ link (DeepLink)  │       │ link             │
│ storedAt         │       │ fingerprint ─────────┐
│ expiresAt        │       │ matched          │   │
│ returnTo         │       │ matchConfidence  │   │
└──────────────────┘       └──────────────────┘   │
                                                   │
                           ┌──────────────────┐   │
                           │DeviceFingerprint │◀──┘
                           ├──────────────────┤
                           │ ipHash           │
                           │ deviceType       │
                           │ screenDimensions │
                           │ timezone         │
                           └──────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Pending DeepLink</td><td>MMKV (sync)</td><td>Synchronous read on app launch, survives process kill</td></tr>
                <tr><td>Route Configurations</td><td>In-memory Trie</td><td>Built once at startup, O(k) lookups</td></tr>
                <tr><td>Deferred Link Data</td><td>Server DB (MongoDB/Postgres)</td><td>Cross-device matching, TTL indexes for cleanup</td></tr>
                <tr><td>Attribution Events</td><td>Analytics queue → server</td><td>Batched upload, offline resilience</td></tr>
                <tr><td>Deferred Check Flag</td><td>MMKV boolean</td><td>Prevent duplicate first-launch checks</td></tr>
                <tr><td>Link State History</td><td>In-memory (XState)</td><td>Debugging, not persisted between sessions</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Examples</th><th>Management</th></tr>
                <tr><td>Server State</td><td>Deferred links, attribution aggregates</td><td>Server API, cached locally for offline</td></tr>
                <tr><td>Client State</td><td>Current link being processed, XState context</td><td>XState machine + React context</td></tr>
                <tr><td>Local Persistent</td><td>Pending link, deferred-checked flag</td><td>MMKV with TTL expiration</td></tr>
                <tr><td>Navigation State</td><td>Current screen, params, history</td><td>React Navigation state</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useDeepLinking.ts

interface UseDeepLinkingOptions {
    onLinkReceived?: (link: DeepLink) =&gt; void;
    onAuthRequired?: (link: DeepLink) =&gt; void;
    onNavigated?: (link: DeepLink) =&gt; void;
    onError?: (error: Error, url: string) =&gt; void;
}

interface UseDeepLinkingReturn {
    /** Currently processing link */
    currentLink: DeepLink | null;
    /** Link waiting for auth completion */
    pendingLink: DeepLink | null;
    /** Process auth-gated link after login */
    processPendingLink: () =&gt; Promise&lt;void&gt;;
    /** Manually handle a URL */
    handleUrl: (url: string) =&gt; Promise&lt;void&gt;;
    /** Generate shareable link for screen */
    generateLink: (screen: string, params?: Record&lt;string, string&gt;) =&gt; string;
    /** Clear stored pending link */
    clearPendingLink: () =&gt; void;
}

function useDeepLinking(options?: UseDeepLinkingOptions): UseDeepLinkingReturn;

// hooks/useDeferredDeepLink.ts

interface UseDeferredDeepLinkReturn {
    /** Check for deferred link on first launch */
    checkDeferredLink: () =&gt; Promise&lt;string | null&gt;;
    /** Whether check has been performed */
    hasChecked: boolean;
    /** Whether a deferred link was found */
    deferredLink: string | null;
    /** Confidence score of match (0-1) */
    matchConfidence: number | null;
}

function useDeferredDeepLink(): UseDeferredDeepLinkReturn;

// hooks/useLinkAttribution.ts

interface UseLinkAttributionReturn {
    /** Current session attribution */
    attribution: LinkAttribution | null;
    /** Extract attribution from URL */
    extractAttribution: (url: string) =&gt; LinkAttribution;
    /** Track attribution event */
    trackAttribution: (link: DeepLink) =&gt; void;
}

function useLinkAttribution(): UseLinkAttributionReturn;</code></pre>

            <h5>Deep Link Engine Service</h5>
            <pre><code>// services/DeepLinkEngine.ts
import { Linking } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { createMachine, interpret } from 'xstate';

const storage = new MMKV({ id: 'deeplinks' });

class DeepLinkEngine {
    private routeTrie: RouteTrie;
    private pendingLinks: Map&lt;string, DeepLink&gt; = new Map();
    private machine: ReturnType&lt;typeof interpret&gt;;
    private navigationRef: NavigationContainerRef&lt;any&gt;;

    private routes: RouteConfig[] = [
        { pattern: '/product/:id', screen: 'Product', requiresAuth: false,
          validator: (p) =&gt; /^[a-zA-Z0-9-]+$/.test(p.id) },
        { pattern: '/order/:id', screen: 'OrderDetail', requiresAuth: true },
        { pattern: '/profile/:userId?', screen: 'Profile', requiresAuth: true },
        { pattern: '/invite/:code', screen: 'InviteAccept', requiresAuth: false },
        { pattern: '/settings/:section?', screen: 'Settings', requiresAuth: true },
        { pattern: '/chat/:roomId', screen: 'ChatRoom', requiresAuth: true, nestedIn: 'Messages' },
    ];

    constructor(navigationRef: NavigationContainerRef&lt;any&gt;) {
        this.navigationRef = navigationRef;
        this.routeTrie = new RouteTrie(this.routes);
        this.machine = this.createStateMachine();
        this.setupListeners();
    }

    private createStateMachine() {
        const linkMachine = createMachine({
            id: 'deeplink',
            initial: 'idle',
            context: { currentLink: null as DeepLink | null },
            states: {
                idle: {
                    on: { LINK_RECEIVED: 'parsing' }
                },
                parsing: {
                    invoke: {
                        src: 'parseLink',
                        onDone: [
                            { target: 'authCheck', cond: 'isValidLink' },
                            { target: 'idle' }
                        ]
                    }
                },
                authCheck: {
                    always: [
                        { target: 'deferred', cond: 'requiresAuthAndNotLoggedIn' },
                        { target: 'ready' }
                    ]
                },
                deferred: {
                    entry: 'storePendingLink',
                    on: { AUTH_COMPLETE: 'ready' }
                },
                ready: {
                    entry: 'navigate',
                    always: 'navigated'
                },
                navigated: {
                    entry: 'trackAttribution',
                    always: 'idle'
                }
            }
        });

        return interpret(linkMachine).start();
    }

    private setupListeners() {
        // Hot link (app already open)
        Linking.addEventListener('url', ({ url }) =&gt; {
            this.handleIncomingLink(url, 'hot');
        });

        // Cold link (app opened via link)
        Linking.getInitialURL().then(url =&gt; {
            if (url) this.handleIncomingLink(url, 'cold');
        });
    }

    async handleIncomingLink(url: string, source: 'cold' | 'hot' | 'deferred') {
        const deepLink = this.parseUrl(url);
        if (!deepLink) return;

        deepLink.attribution = this.extractAttribution(url);

        this.machine.send({ type: 'LINK_RECEIVED', link: deepLink });
    }

    private parseUrl(url: string): DeepLink | null {
        try {
            const parsed = new URL(url);
            const scheme = this.detectScheme(url);
            const path = parsed.pathname;

            const matchedRoute = this.routeTrie.match(path);
            if (!matchedRoute) return null;

            const params = this.extractParams(path, matchedRoute.pattern);

            if (matchedRoute.validator &amp;&amp; !matchedRoute.validator(params)) {
                console.warn('Deep link param validation failed:', url);
                return null;
            }

            return {
                id: this.generateLinkId(),
                url,
                scheme,
                path,
                params,
                queryParams: Object.fromEntries(parsed.searchParams),
                requiresAuth: matchedRoute.requiresAuth,
                priority: this.calculatePriority(matchedRoute),
                timestamp: Date.now(),
            };
        } catch (error) {
            console.error('Failed to parse deep link:', error);
            return null;
        }
    }

    private navigate(link: DeepLink) {
        const route = this.routeTrie.match(link.path);
        if (!route) return;

        const allParams = { ...link.params, ...link.queryParams };

        if (route.nestedIn) {
            // Navigate to nested screen
            this.navigationRef.navigate(route.nestedIn, {
                screen: route.screen,
                params: allParams,
            });
        } else {
            this.navigationRef.navigate(route.screen, allParams);
        }
    }

    // Called when user completes authentication
    onAuthenticationComplete() {
        this.machine.send('AUTH_COMPLETE');

        // Also check persistent storage for older deferred links
        const stored = storage.getString('pending_link');
        if (stored) {
            const link = JSON.parse(stored) as DeepLink;
            if (Date.now() - link.timestamp &lt; 24 * 60 * 60 * 1000) {
                this.navigate(link);
            }
            storage.delete('pending_link');
        }
    }
}</code></pre>

            <h5>iOS Platform Bridge - Universal Links &amp; Scene Delegate</h5>
            <pre><code>// ios/App/SceneDelegate.swift
import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    // Handle Universal Links when app is not running
    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {

        // Check for Universal Link
        if let userActivity = connectionOptions.userActivities.first,
           userActivity.activityType == NSUserActivityTypeBrowsingWeb,
           let url = userActivity.webpageURL {
            DeepLinkBridge.shared.handleUniversalLink(url)
        }

        // Check for Custom Scheme
        if let url = connectionOptions.urlContexts.first?.url {
            DeepLinkBridge.shared.handleCustomScheme(url)
        }
    }

    // Handle Universal Links when app is running
    func scene(_ scene: UIScene,
               continue userActivity: NSUserActivity) {
        guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
              let url = userActivity.webpageURL else { return }

        DeepLinkBridge.shared.handleUniversalLink(url)
    }

    // Handle Custom Scheme when app is running
    func scene(_ scene: UIScene,
               openURLContexts URLContexts: Set&lt;UIOpenURLContext&gt;) {
        guard let url = URLContexts.first?.url else { return }
        DeepLinkBridge.shared.handleCustomScheme(url)
    }
}

// ios/App/DeepLinkBridge.swift
@objc(DeepLinkBridge)
class DeepLinkBridge: NSObject {
    static let shared = DeepLinkBridge()

    @objc func handleUniversalLink(_ url: URL) {
        // Validate domain
        guard let host = url.host,
              ["example.com", "www.example.com"].contains(host) else {
            return
        }

        // Send to React Native
        RCTLinkingManager.application(
            UIApplication.shared,
            continue: NSUserActivity(activityType: NSUserActivityTypeBrowsingWeb),
            restorationHandler: { _ in }
        )

        // Track attribution
        AnalyticsBridge.trackDeepLink(url: url.absoluteString, type: "universal")
    }

    @objc func handleCustomScheme(_ url: URL) {
        RCTLinkingManager.application(
            UIApplication.shared,
            open: url,
            options: [:]
        )
    }
}

// apple-app-site-association (/.well-known/)
{
    "applinks": {
        "apps": [],
        "details": [{
            "appIDs": ["TEAMID.com.example.app", "TEAMID.com.example.app.debug"],
            "components": [
                { "/": "/product/*", "comment": "Product pages" },
                { "/": "/order/*", "comment": "Order tracking" },
                { "/": "/invite/*", "comment": "Invite links" },
                { "/": "/u/*", "comment": "User profiles" },
                { "/": "/share/*", "comment": "Shared content" }
            ]
        }]
    },
    "webcredentials": {
        "apps": ["TEAMID.com.example.app"]
    }
}</code></pre>

            <h5>Android Platform Bridge - App Links &amp; Intent Handling</h5>
            <pre><code>// android/app/src/main/java/com/example/DeepLinkActivity.kt
package com.example.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class DeepLinkActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        intent?.let { handleIntent(it) }
    }

    private fun handleIntent(intent: Intent) {
        val action = intent.action
        val data = intent.data

        when (action) {
            Intent.ACTION_VIEW -&gt; {
                data?.let { uri -&gt;
                    when {
                        isAppLink(uri) -&gt; handleAppLink(uri)
                        isCustomScheme(uri) -&gt; handleCustomScheme(uri)
                    }
                }
            }
        }

        // Forward to MainActivity
        val mainIntent = Intent(this, MainActivity::class.java).apply {
            this.data = data
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        startActivity(mainIntent)
        finish()
    }

    private fun isAppLink(uri: Uri): Boolean {
        return uri.scheme == "https" &amp;&amp;
               (uri.host == "example.com" || uri.host == "www.example.com")
    }

    private fun isCustomScheme(uri: Uri): Boolean {
        return uri.scheme == "myapp"
    }

    private fun handleAppLink(uri: Uri) {
        // Verify app link
        val verified = isAppLinkVerified(uri)

        // Track attribution
        DeepLinkAnalytics.track(
            url = uri.toString(),
            type = if (verified) "app_link_verified" else "app_link_unverified",
            source = intent.getStringExtra("referrer") ?: "direct"
        )
    }

    private fun isAppLinkVerified(uri: Uri): Boolean {
        return try {
            val pm = packageManager
            val resolveInfo = pm.resolveActivity(
                Intent(Intent.ACTION_VIEW, uri),
                android.content.pm.PackageManager.MATCH_DEFAULT_ONLY
            )
            resolveInfo?.activityInfo?.packageName == packageName
        } catch (e: Exception) {
            false
        }
    }
}

// AndroidManifest.xml
&lt;activity
    android:name=".DeepLinkActivity"
    android:exported="true"
    android:launchMode="singleTask"&gt;

    &lt;!-- Verified App Links --&gt;
    &lt;intent-filter android:autoVerify="true"&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;category android:name="android.intent.category.BROWSABLE" /&gt;
        &lt;data android:scheme="https"
              android:host="example.com"
              android:pathPattern="/product/.*" /&gt;
        &lt;data android:scheme="https"
              android:host="example.com"
              android:pathPattern="/order/.*" /&gt;
        &lt;data android:scheme="https"
              android:host="example.com"
              android:pathPattern="/invite/.*" /&gt;
    &lt;/intent-filter&gt;

    &lt;!-- Custom Scheme --&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;category android:name="android.intent.category.BROWSABLE" /&gt;
        &lt;data android:scheme="myapp" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;

// assetlinks.json (/.well-known/)
[{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
        "namespace": "android_app",
        "package_name": "com.example.app",
        "sha256_cert_fingerprints": [
            "SHA256:XX:XX:XX:...:XX",
            "SHA256:YY:YY:YY:...:YY"
        ]
    }
}]</code></pre>

            <h5>Deferred Deep Link Service</h5>
            <pre><code>// services/DeferredDeepLinkService.ts
import { MMKV } from 'react-native-mmkv';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

const storage = new MMKV({ id: 'deferred-links' });
const DEFERRED_LINK_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

interface FingerprintData {
    ipHash: string;
    deviceType: string;
    osVersion: string;
    screenWidth: number;
    screenHeight: number;
    timezone: string;
    language: string;
}

class DeferredDeepLinkService {
    // Server-side: Store link with fingerprint (called from web)
    static async storeLinkOnServer(link: string, fingerprint: FingerprintData) {
        return api.post('/api/deferred-links', {
            link,
            fingerprint,
            createdAt: Date.now(),
            expiresAt: Date.now() + DEFERRED_LINK_TTL,
        });
    }

    // Client-side: Check for matching deferred link on first launch
    async checkDeferredLink(): Promise&lt;string | null&gt; {
        // Only check on first launch
        if (storage.getBoolean('deferred_link_checked')) {
            return null;
        }

        try {
            const fingerprint = await this.generateFingerprint();

            const response = await api.post('/api/deferred-links/match', {
                fingerprint,
                installTime: await Application.getInstallationTimeAsync(),
            });

            storage.set('deferred_link_checked', true);

            if (response.data?.link) {
                // Track successful match
                analytics.track('deferred_link_matched', {
                    link: response.data.link,
                    matchConfidence: response.data.confidence,
                });

                return response.data.link;
            }
        } catch (error) {
            console.error('Deferred link check failed:', error);
        }

        return null;
    }

    private async generateFingerprint(): Promise&lt;FingerprintData&gt; {
        const [ipResponse, dimensions] = await Promise.all([
            fetch('https://api.example.com/ip-hash'),
            this.getScreenDimensions(),
        ]);

        return {
            ipHash: (await ipResponse.json()).hash,
            deviceType: Device.deviceType?.toString() || 'unknown',
            osVersion: Device.osVersion || 'unknown',
            screenWidth: dimensions.width,
            screenHeight: dimensions.height,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: Device.locale || 'en',
        };
    }

    private getScreenDimensions() {
        const { width, height } = Dimensions.get('screen');
        return { width: Math.round(width), height: Math.round(height) };
    }
}

// Server-side matching algorithm (Node.js)
async function matchDeferredLink(
    fingerprint: FingerprintData,
    installTime: number
): Promise&lt;{ link: string; confidence: number } | null&gt; {
    // Find candidates within time window
    const candidates = await db.deferredLinks.find({
        expiresAt: { $gt: Date.now() },
        matched: false,
        createdAt: {
            $gte: installTime - 30 * 60 * 1000, // 30 min before install
            $lte: installTime + 5 * 60 * 1000   // 5 min after install
        }
    });

    let bestMatch: { link: string; confidence: number } | null = null;

    for (const candidate of candidates) {
        const confidence = calculateConfidence(fingerprint, candidate.fingerprint);

        if (confidence &gt; 0.8 &amp;&amp; (!bestMatch || confidence &gt; bestMatch.confidence)) {
            bestMatch = { link: candidate.link, confidence };
        }
    }

    if (bestMatch) {
        await db.deferredLinks.updateOne(
            { link: bestMatch.link },
            { $set: { matched: true, matchedAt: Date.now() } }
        );
    }

    return bestMatch;
}

function calculateConfidence(a: FingerprintData, b: FingerprintData): number {
    let score = 0;
    const weights = {
        ipHash: 0.4,
        deviceType: 0.15,
        osVersion: 0.1,
        screen: 0.15,
        timezone: 0.1,
        language: 0.1,
    };

    if (a.ipHash === b.ipHash) score += weights.ipHash;
    if (a.deviceType === b.deviceType) score += weights.deviceType;
    if (a.osVersion === b.osVersion) score += weights.osVersion;
    if (a.screenWidth === b.screenWidth &amp;&amp; a.screenHeight === b.screenHeight) {
        score += weights.screen;
    }
    if (a.timezone === b.timezone) score += weights.timezone;
    if (a.language === b.language) score += weights.language;

    return score;
}</code></pre>

            <h5>React Navigation Linking Configuration</h5>
            <pre><code>// navigation/linking.ts
import { LinkingOptions, getStateFromPath } from '@react-navigation/native';

export const linking: LinkingOptions&lt;RootStackParamList&gt; = {
    prefixes: [
        'myapp://',
        'https://example.com',
        'https://www.example.com',
    ],

    config: {
        screens: {
            // Auth screens (no deep link access when authenticated)
            Auth: {
                screens: {
                    Login: 'login',
                    Register: 'register',
                    ForgotPassword: 'forgot-password',
                },
            },
            // Main app screens
            Main: {
                screens: {
                    Home: '',
                    Product: 'product/:id',
                    Category: 'category/:slug',
                    Search: 'search',
                    Cart: 'cart',
                    Checkout: 'checkout',
                    // Nested tab navigator
                    Tabs: {
                        screens: {
                            Shop: 'shop',
                            Orders: 'orders',
                            Account: 'account',
                        },
                    },
                    // Auth-required screens
                    OrderDetail: 'order/:id',
                    Profile: 'profile/:userId?',
                    Settings: {
                        path: 'settings/:section?',
                        parse: { section: (s: string) =&gt; s || 'general' },
                    },
                    // Nested chat
                    Messages: {
                        screens: {
                            ChatList: 'messages',
                            ChatRoom: 'chat/:roomId',
                        },
                    },
                },
            },
            // Special flows
            InviteAccept: 'invite/:code',
            ShareView: 'share/:shareId',
        },
    },

    getStateFromPath: (path, config) =&gt; {
        // Extract and validate parameters
        const cleanPath = sanitizePath(path);

        // Check authentication requirements
        const authRequiredPatterns = ['/order/', '/profile', '/settings', '/chat/'];
        const requiresAuth = authRequiredPatterns.some(p =&gt; cleanPath.includes(p));

        if (requiresAuth &amp;&amp; !authStore.isAuthenticated) {
            // Store path for post-auth navigation
            storage.set('pending_deep_link', path);

            // Return auth flow state
            return {
                routes: [{
                    name: 'Auth',
                    state: {
                        routes: [{
                            name: 'Login',
                            params: { returnTo: cleanPath }
                        }],
                    },
                }],
            };
        }

        // Default path handling
        return getStateFromPath(cleanPath, config);
    },

    getPathFromState: (state, config) =&gt; {
        // Custom path generation for sharing
        return getPathFromState(state, config);
    },
};

function sanitizePath(path: string): string {
    // Remove tracking params, decode, validate
    const url = new URL(path, 'https://example.com');

    // Remove UTM and tracking params from path for navigation
    // but preserve them for analytics
    const cleanParams = new URLSearchParams();
    url.searchParams.forEach((value, key) =&gt; {
        if (!key.startsWith('utm_') &amp;&amp; !['ref', 'source'].includes(key)) {
            cleanParams.set(key, value);
        }
    });

    return url.pathname + (cleanParams.toString() ? '?' + cleanParams.toString() : '');
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <table>
                <tr><th>Problem</th><th>Solution</th><th>Impact</th></tr>
                <tr><td>Slow route matching</td><td>Trie-based router with O(k) lookup (k=path segments)</td><td>Sub-millisecond matching even with 100+ routes</td></tr>
                <tr><td>Cold start link delay</td><td>Queue links until NavigationContainer ready, use onReady callback</td><td>Zero dropped links, <100ms processing after ready</td></tr>
                <tr><td>Deferred link check latency</td><td>Parallel fingerprint + API call, cache first-launch flag</td><td>300ms avg → single check only on first launch</td></tr>
                <tr><td>Auth redirect flicker</td><td>Use getStateFromPath to return auth state synchronously</td><td>No visible navigation, direct to login with returnTo</td></tr>
                <tr><td>AASA/assetlinks fetch delay</td><td>CDN-cache verification files with long TTL</td><td><50ms verification on link tap</td></tr>
            </table>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Verified links</td><td>Universal Links (AASA validated at install)</td><td>App Links (assetlinks.json verified at runtime)</td></tr>
                <tr><td>Link entry cold</td><td>scene:willConnectTo with userActivities</td><td>onCreate with Intent.ACTION_VIEW</td></tr>
                <tr><td>Link entry hot</td><td>scene:continue userActivity</td><td>onNewIntent with singleTask launchMode</td></tr>
                <tr><td>Custom scheme</td><td>scene:openURLContexts</td><td>intent-filter with android:scheme</td></tr>
                <tr><td>Fingerprinting limits</td><td>ATT prompt required for IDFA, IP+screen+timezone</td><td>GAID limited, similar probabilistic approach</td></tr>
                <tr><td>Debug testing</td><td>Associated Domains: applinks:?mode=developer</td><td>adb shell am start -W -a android.intent.action.VIEW</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Expired deferred links:</strong> Implement 7-day TTL with graceful fallback to home screen, show "Link expired" toast</li>
                <li><strong>Invalid/malformed URLs:</strong> Validate scheme, host, path; sanitize params; log error with URL (redacted); navigate to home</li>
                <li><strong>Race conditions:</strong> Queue links in MMKV until NavigationContainer onReady fires, process queue FIFO</li>
                <li><strong>Auth token expiry during wait:</strong> Re-authenticate user, then navigate to stored pending link</li>
                <li><strong>Multiple pending links:</strong> Keep only most recent link (highest timestamp), clear older ones</li>
                <li><strong>App killed during auth:</strong> Persist pending link to MMKV with 24h TTL, restore on next cold launch</li>
                <li><strong>Deep link to deleted content:</strong> Handle 404/410 from server gracefully, show "Content not found" with home CTA</li>
                <li><strong>Link shortener redirects:</strong> Follow redirects server-side, capture final URL for attribution before redirect</li>
                <li><strong>Universal link fallback:</strong> If AASA fails, fall back to custom scheme via Safari redirect</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Deferred linking</td><td>Custom implementation</td><td>Branch.io / Adjust / AppsFlyer</td><td>Full control, no third-party dependency, lower cost at scale</td></tr>
                <tr><td>Route matching</td><td>Custom Trie</td><td>React Navigation's built-in</td><td>More flexibility for validation, priority, and auth gating</td></tr>
                <tr><td>State management</td><td>XState machine</td><td>Simple useState/flags</td><td>Explicit states prevent bugs, visualizable for debugging</td></tr>
                <tr><td>Pending link storage</td><td>MMKV</td><td>AsyncStorage</td><td>Synchronous reads prevent race conditions</td></tr>
                <tr><td>Fingerprint matching</td><td>Probabilistic (IP+device)</td><td>Clipboard paste</td><td>Better UX (no paste prompt), still >95% accuracy</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>URL parsing and validation (valid/invalid schemes, special characters)</li>
                        <li>Route trie matching (exact, param extraction, no-match)</li>
                        <li>Auth gating logic (authenticated vs unauthenticated paths)</li>
                        <li>Attribution extraction (UTM params, referrer)</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Linking.getInitialURL → navigation (cold start)</li>
                        <li>Linking event listener → navigation (hot link)</li>
                        <li>Pending link storage → post-auth navigation</li>
                        <li>XState transitions (all valid state paths)</li>
                    </ul>
                </li>
                <li><strong>E2E Tests (Detox):</strong>
                    <ul>
                        <li>Universal link opens correct screen (iOS)</li>
                        <li>App link opens correct screen (Android)</li>
                        <li>Auth-gated link → login → redirect to target</li>
                        <li>Deferred link after fresh install</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: What's the difference between Universal Links and App Links?</strong>
                    <br/>A: iOS Universal Links require apple-app-site-association validation at app install time, cached by system. Android App Links verify assetlinks.json at runtime when link is clicked. Both prevent app hijacking but iOS is more aggressive about caching.</li>
                <li><strong>Q: How do you handle privacy with fingerprinting after ATT?</strong>
                    <br/>A: Use privacy-preserving fingerprinting: hashed IP (not stored raw), device type + OS version + screen dimensions + timezone. No persistent identifiers. Accuracy drops from 98% to ~92% but still viable. Consider clipboard-based deferred linking as fallback.</li>
                <li><strong>Q: Why use XState over simple flags for link state?</strong>
                    <br/>A: XState provides explicit states (no impossible combinations), guards (validation before transitions), actions (side effects), and visualization. With flags, it's easy to have (isLoading: true, isReady: true) - impossible but compilable. XState prevents this by design.</li>
                <li><strong>Q: When would you use Branch vs custom?</strong>
                    <br/>A: Branch for: quick time-to-market, complex attribution (multi-touch, cross-platform), team without deep linking expertise. Custom for: full control, cost optimization at scale (Branch charges per MAU), avoiding third-party SDK in app bundle.</li>
                <li><strong>Q: How do you test deep links in CI?</strong>
                    <br/>A: Use Detox with adb shell am start (Android) and xcrun simctl openurl (iOS simulator). For real devices, use Firebase Test Lab / AWS Device Farm with custom test harnesses. Also test AASA/assetlinks with curl + JSONPath validation.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr>
                    <th>Concern</th>
                    <th>Library</th>
                    <th>Rationale</th>
                </tr>
                <tr>
                    <td>Deep linking</td>
                    <td>@react-navigation/native linking</td>
                    <td>Built-in, type-safe integration with navigation</td>
                </tr>
                <tr>
                    <td>Attribution tracking</td>
                    <td>Branch.io / Adjust / AppsFlyer</td>
                    <td>Production-grade deferred linking and attribution</td>
                </tr>
                <tr>
                    <td>State machine</td>
                    <td>XState</td>
                    <td>Robust link state management, visualizable</td>
                </tr>
                <tr>
                    <td>URL parsing</td>
                    <td>url-parse / whatwg-url</td>
                    <td>Cross-platform URL handling</td>
                </tr>
                <tr>
                    <td>Storage</td>
                    <td>react-native-mmkv</td>
                    <td>Fast sync storage for pending links</td>
                </tr>
                <tr>
                    <td>QR codes</td>
                    <td>react-native-vision-camera + ml-kit</td>
                    <td>Native QR scanning for link capture</td>
                </tr>
            </table>
        `
     },
    {
        id: 85,
        category: "System Design",
        icon: "🏛️",
        question: "How would you architect navigation for an app with conditional flows based on user state?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>User states:</strong> What are all the possible user states? (unauthenticated, onboarding incomplete, email unverified, phone unverified, authenticated, suspended)</li>
                <li><strong>Blocking flows:</strong> Are there flows that completely block app access? (force update, maintenance mode, account banned)</li>
                <li><strong>Role-based access:</strong> Do different user roles see different navigation structures? (admin, premium, standard)</li>
                <li><strong>Deep linking:</strong> Should deep links respect these state gates or bypass them?</li>
                <li><strong>Session management:</strong> How should mid-session token expiry be handled? Silent refresh or force re-login?</li>
                <li><strong>A/B testing:</strong> Do we need to test different onboarding or navigation flows?</li>
                <li><strong>State persistence:</strong> Should navigation state persist across app kills and restarts?</li>
                <li><strong>Multi-device:</strong> How do we handle login from another device invalidating this session?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Support multiple user lifecycle states: unauthenticated, onboarding, verification, authenticated</li>
                <li>Handle blocking screens: force update (mandatory upgrade), maintenance mode</li>
                <li>Support role-based navigation (admin dashboard, premium features, standard features)</li>
                <li>Integrate with deep linking while enforcing state gates (pending link storage)</li>
                <li>Handle session expiry with graceful degradation and re-authentication</li>
                <li>Support A/B testing different onboarding and navigation flows</li>
                <li>Persist and restore navigation state across app restarts</li>
                <li>Track navigation events for analytics (screen views, flow completion)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Navigation state transitions complete in &lt;100ms (no perceptible delay)</li>
                <li>Zero flicker between navigator stacks (smooth fade transitions)</li>
                <li>State decisions made synchronously at app launch (no loading spinner between screens)</li>
                <li>TypeScript type-safety for all navigation params and route names</li>
                <li>Navigation state persists across process death and app restarts</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Authentication implementation (OAuth, JWT token management)</li>
                <li>Backend API design for config flags (force update, maintenance)</li>
                <li>Push notification deep link handling</li>
                <li>Screen-level permission checks (e.g., camera permission before photo screen)</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONDITIONAL NAVIGATION ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  APP LAUNCH                                                                  │
│      │                                                                       │
│      ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         STATE MACHINE (XState)                          ││
│  │  ┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐           ││
│  │  │  INIT   │───▶│ LOADING  │───▶│ DECIDING │───▶│ READY   │           ││
│  │  └─────────┘    └──────────┘    └──────────┘    └─────────┘           ││
│  │                                       │                                 ││
│  │                    ┌──────────────────┼──────────────────┐             ││
│  │                    ▼                  ▼                  ▼             ││
│  │            ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      ││
│  │            │FORCE_UPDATE │    │MAINTENANCE  │    │AUTH_REQUIRED│      ││
│  │            └─────────────┘    └─────────────┘    └─────────────┘      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                       │                                      │
│      ┌────────────────────────────────┼────────────────────────────────┐    │
│      │                                │                                │    │
│      ▼                                ▼                                ▼    │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │  UNAUTH STACK    │  │  GATED STACKS    │  │     MAIN APP STACK       │  │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────────────┐  │  │
│  │  │  Welcome   │  │  │  │ Onboarding │  │  │  │   Tab Navigator    │  │  │
│  │  │  Login     │  │  │  │ Verify     │  │  │  │   ┌─────┬─────┐   │  │  │
│  │  │  Register  │  │  │  │ Phone      │  │  │  │   │Home │Shop │   │  │  │
│  │  │  Forgot PW │  │  │  │ Setup      │  │  │  │   ├─────┼─────┤   │  │  │
│  │  │  SSO       │  │  │  │ Permissions│  │  │  │   │Cart │User │   │  │  │
│  │  └────────────┘  │  │  └────────────┘  │  │  │   └─────┴─────┘   │  │  │
│  └──────────────────┘  └──────────────────┘  │  ├────────────────────┤  │  │
│                                               │  │   Modal Screens    │  │  │
│  ROLE-BASED GATES                            │  │   Settings Stack   │  │  │
│  ┌──────────────────────────────────────┐    │  │   Profile Stack    │  │  │
│  │  Admin?  ──▶  Admin Dashboard        │    │  └────────────────────┘  │  │
│  │  Premium? ──▶  Premium Features      │    └──────────────────────────┘  │
│  │  Standard ──▶  Base Features         │                                   │
│  └──────────────────────────────────────┘                                   │
│                                                                              │
│  CROSS-CUTTING CONCERNS                                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Deep Link Queue │ Session Monitor │ A/B Test Router │ Analytics    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Navigation State Machine</td><td>Manage app lifecycle states, determine which stack to show</td><td>XState</td></tr>
                <tr><td>Root Navigator</td><td>Conditionally render appropriate navigator stack</td><td>React Navigation</td></tr>
                <tr><td>Navigation Gates</td><td>Priority-ordered conditions that determine navigation target</td><td>Pure functions</td></tr>
                <tr><td>Session Monitor</td><td>Watch for token expiry, background/foreground transitions</td><td>Native modules + EventEmitter</td></tr>
                <tr><td>Deep Link Queue</td><td>Store pending links until user completes required gates</td><td>MMKV + Context</td></tr>
                <tr><td>A/B Test Router</td><td>Select navigation flow variants based on experiment assignment</td><td>Feature flags (LaunchDarkly/custom)</td></tr>
                <tr><td>State Persistence</td><td>Save/restore navigation state across app restarts</td><td>MMKV + NavigationContainer</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>CONDITIONAL NAVIGATION FLOW
===========================

App Launch
    │
    ▼
┌───────────────────────────────────────────────────────────────────┐
│                    INITIALIZATION PHASE                           │
├───────────────────────────────────────────────────────────────────┤
│  1. Load persisted auth token                                     │
│  2. Fetch app config (force update, maintenance flags)            │
│  3. Validate token with server                                    │
│  4. Load user profile if authenticated                            │
│  5. Check onboarding/verification status                          │
└───────────────────────────────────────────────────────────────────┘
    │
    ▼
┌───────────────────────────────────────────────────────────────────┐
│                    DECISION MATRIX                                │
├───────────────────────────────────────────────────────────────────┤
│  Priority  │ Condition              │ Target Stack               │
│  ─────────────────────────────────────────────────────────────   │
│     1      │ Force Update Required  │ ForceUpdate (blocking)     │
│     2      │ Maintenance Mode       │ Maintenance (blocking)     │
│     3      │ Not Authenticated      │ Auth Stack                 │
│     4      │ Onboarding Incomplete  │ Onboarding Stack           │
│     5      │ Verification Needed    │ Verification Stack         │
│     6      │ All Checks Pass        │ Main App Stack             │
└───────────────────────────────────────────────────────────────────┘
    │
    ▼
┌───────────────────────────────────────────────────────────────────┐
│                    RUNTIME TRANSITIONS                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Auth Complete ─────────────────┐                                │
│       │                         │                                │
│       ▼                         ▼                                │
│  Needs Onboarding? ─── YES ──▶ Onboarding Stack                  │
│       │                                                          │
│       NO                                                         │
│       │                                                          │
│       ▼                                                          │
│  Needs Verification? ─ YES ──▶ Verification Stack                │
│       │                                                          │
│       NO                                                         │
│       │                                                          │
│       ▼                                                          │
│  Process Pending Deep Link (if any)                              │
│       │                                                          │
│       ▼                                                          │
│  Main App Stack                                                  │
│                                                                   │
│  SESSION_EXPIRED (at any point) ──▶ Reset to Auth Stack          │
└───────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Rationale</th><th>Trade-offs</th></tr>
                <tr><td>XState for navigation state</td><td>Explicit states, guards prevent invalid transitions, testable independently</td><td>Learning curve, more boilerplate</td></tr>
                <tr><td>Conditional stack rendering</td><td>Only mount active stack, cleaner than guards on every screen</td><td>Loses navigation history when switching stacks</td></tr>
                <tr><td>Priority-ordered gates</td><td>Clear precedence (force update > maintenance > auth > onboarding)</td><td>Requires careful ordering</td></tr>
                <tr><td>State persistence in MMKV</td><td>Synchronous reads prevent flash of wrong screen</td><td>Must handle schema migrations</td></tr>
                <tr><td>Fade transitions between stacks</td><td>Smooth UX when switching contexts</td><td>Slightly slower than instant swap</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/navigation.ts

/** Authentication state of the user */
type AuthState = 'unauthenticated' | 'authenticated';

/** Progress through onboarding flow */
type OnboardingState = 'not_started' | 'in_progress' | 'completed';

/** Verification status (email, phone, or both) */
type VerificationState = 'unverified' | 'email_verified' | 'phone_verified' | 'fully_verified';

/** User's subscription/access level */
type UserRole = 'standard' | 'premium' | 'admin';

/** Complete application state for navigation decisions */
interface AppState {
    auth: AuthState;                  // Login status
    onboarding: OnboardingState;      // Onboarding progress
    verification: VerificationState;  // Identity verification
    role: UserRole;                   // Access level
    forceUpdate: boolean;             // Mandatory app update required
    maintenance: boolean;             // Server maintenance mode
}

/** Navigation gate that controls access to a stack */
interface NavigationGate {
    id: string;                                    // Unique identifier
    condition: (state: AppState) =&gt; boolean;       // When to activate this gate
    stack: keyof RootStackParamList;               // Target navigator
    priority: number;                              // Higher = evaluated first
}

/** Root-level navigation type definitions */
type RootStackParamList = {
    ForceUpdate: undefined;
    Maintenance: undefined;
    Auth: NavigatorScreenParams&lt;AuthStackParamList&gt;;
    Onboarding: NavigatorScreenParams&lt;OnboardingStackParamList&gt;;
    Verification: NavigatorScreenParams&lt;VerificationStackParamList&gt;;
    Main: NavigatorScreenParams&lt;MainTabParamList&gt;;
    AdminDashboard: NavigatorScreenParams&lt;AdminStackParamList&gt;;
};

/** Auth flow screens with their params */
type AuthStackParamList = {
    Welcome: undefined;
    Login: { returnTo?: string };                   // Deep link pending
    Register: { referralCode?: string };            // Invite code
    ForgotPassword: { email?: string };             // Pre-fill email
    SSO: { provider: 'google' | 'apple' | 'facebook' };
};

/** Onboarding flow screens */
type OnboardingStackParamList = {
    Welcome: undefined;
    ProfileSetup: undefined;
    Preferences: undefined;
    Permissions: undefined;
    Complete: undefined;
};

/** Verification flow screens */
type VerificationStackParamList = {
    EmailVerification: { email: string };
    PhoneVerification: { phone?: string };
    VerificationComplete: undefined;
};

/** Main app tab navigator */
type MainTabParamList = {
    Home: undefined;
    Shop: NavigatorScreenParams&lt;ShopStackParamList&gt;;
    Cart: undefined;
    Account: NavigatorScreenParams&lt;AccountStackParamList&gt;;
};</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌──────────────────┐
│    AppState      │
├──────────────────┤
│ auth             │──────┐
│ onboarding       │──────┤
│ verification     │──────┤
│ role             │──────┤
│ forceUpdate      │      │
│ maintenance      │      │
└──────────────────┘      │
         │                │
         │ evaluated by   │ determines
         ▼                │
┌──────────────────┐      │
│ NavigationGate[] │      │
├──────────────────┤      │
│ id               │      │
│ condition()      │◀─────┘
│ stack            │
│ priority         │
└────────┬─────────┘
         │
         │ selects
         ▼
┌──────────────────────────────────────────────────────┐
│                 RootStackParamList                    │
├──────────────────────────────────────────────────────┤
│ ForceUpdate    │ Maintenance   │ Auth               │
│ Onboarding     │ Verification  │ Main               │
└──────────────────────────────────────────────────────┘
         │
         │ contains
         ▼
┌──────────────────────────────────────────────────────┐
│              Nested ParamLists                        │
├──────────────────────────────────────────────────────┤
│ AuthStackParamList      │ OnboardingStackParamList   │
│ VerificationStackParams │ MainTabParamList           │
│ ShopStackParamList      │ AccountStackParamList      │
└──────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Auth Token</td><td>react-native-keychain</td><td>Secure encrypted storage for credentials</td></tr>
                <tr><td>App State (cached)</td><td>MMKV</td><td>Synchronous read for instant navigation decisions</td></tr>
                <tr><td>Navigation State</td><td>MMKV</td><td>Persist nav history for restore on relaunch</td></tr>
                <tr><td>App Config (force update, maintenance)</td><td>Server + MMKV cache</td><td>Fetch fresh on launch, cache for offline</td></tr>
                <tr><td>Pending Deep Link</td><td>MMKV</td><td>Persist across auth flow</td></tr>
                <tr><td>A/B Test Assignments</td><td>MMKV + Server</td><td>Sticky assignment for consistent experience</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Examples</th><th>Management</th></tr>
                <tr><td>Server State</td><td>User profile, verification status</td><td>React Query / TanStack Query</td></tr>
                <tr><td>App State</td><td>Auth, onboarding, role</td><td>XState machine context</td></tr>
                <tr><td>Navigation State</td><td>Current screen, history stack</td><td>React Navigation state</td></tr>
                <tr><td>Local Persistent</td><td>Token, cached config</td><td>MMKV / Keychain</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Navigation State Machine Events</h5>
            <pre><code>// machines/navigationMachine.ts
import { createMachine, assign } from 'xstate';

/** Context for the navigation state machine */
interface NavigationContext {
    appState: AppState;              // Current app-wide state
    pendingDeepLink: string | null;  // Link waiting for auth completion
    error: Error | null;             // Last error (for error state)
}

/** Events that trigger navigation state transitions */
type NavigationEvent =
    | { type: 'INITIALIZE' }
    | { type: 'AUTH_STATE_CHANGED'; payload: { authenticated: boolean; user?: User } }
    | { type: 'ONBOARDING_COMPLETED' }
    | { type: 'VERIFICATION_COMPLETED'; payload: { type: 'email' | 'phone' } }
    | { type: 'FORCE_UPDATE_REQUIRED' }
    | { type: 'MAINTENANCE_MODE'; payload: { active: boolean } }
    | { type: 'DEEP_LINK_RECEIVED'; payload: { url: string } }
    | { type: 'SESSION_EXPIRED' };

export const navigationMachine = createMachine&lt;NavigationContext, NavigationEvent&gt;({
    id: 'navigation',
    initial: 'initializing',
    context: {
        appState: {
            auth: 'unauthenticated',
            onboarding: 'not_started',
            verification: 'unverified',
            role: 'standard',
            forceUpdate: false,
            maintenance: false,
        },
        pendingDeepLink: null,
        error: null,
    },
    states: {
        initializing: {
            invoke: {
                src: 'loadInitialState',
                onDone: {
                    target: 'deciding',
                    actions: assign({ appState: (_, event) =&gt; event.data }),
                },
                onError: 'error',
            },
        },
        deciding: {
            always: [
                { target: 'forceUpdate', cond: 'needsForceUpdate' },
                { target: 'maintenance', cond: 'isInMaintenance' },
                { target: 'unauthenticated', cond: 'isUnauthenticated' },
                { target: 'onboarding', cond: 'needsOnboarding' },
                { target: 'verification', cond: 'needsVerification' },
                { target: 'authenticated' },
            ],
        },
        forceUpdate: {
            type: 'final',
            meta: { stack: 'ForceUpdate' },
        },
        maintenance: {
            on: {
                MAINTENANCE_MODE: {
                    target: 'deciding',
                    cond: (_, event) =&gt; !event.payload.active,
                },
            },
            meta: { stack: 'Maintenance' },
        },
        unauthenticated: {
            on: {
                AUTH_STATE_CHANGED: {
                    target: 'deciding',
                    actions: assign({
                        appState: (ctx, event) =&gt; ({
                            ...ctx.appState,
                            auth: event.payload.authenticated ? 'authenticated' : 'unauthenticated',
                        }),
                    }),
                },
                DEEP_LINK_RECEIVED: {
                    actions: assign({ pendingDeepLink: (_, event) =&gt; event.payload.url }),
                },
            },
            meta: { stack: 'Auth' },
        },
        onboarding: {
            on: {
                ONBOARDING_COMPLETED: {
                    target: 'deciding',
                    actions: assign({
                        appState: (ctx) =&gt; ({ ...ctx.appState, onboarding: 'completed' }),
                    }),
                },
                SESSION_EXPIRED: 'unauthenticated',
            },
            meta: { stack: 'Onboarding' },
        },
        verification: {
            on: {
                VERIFICATION_COMPLETED: {
                    target: 'deciding',
                    actions: assign({
                        appState: (ctx, event) =&gt; ({
                            ...ctx.appState,
                            verification: event.payload.type === 'phone' ? 'fully_verified' : 'email_verified',
                        }),
                    }),
                },
                SESSION_EXPIRED: 'unauthenticated',
            },
            meta: { stack: 'Verification' },
        },
        authenticated: {
            entry: 'processPendingDeepLink',
            on: {
                SESSION_EXPIRED: 'unauthenticated',
                DEEP_LINK_RECEIVED: { actions: 'handleDeepLink' },
            },
            meta: { stack: 'Main' },
        },
        error: {
            entry: 'logError',
            on: { INITIALIZE: 'initializing' },
        },
    },
});</code></pre>

            <h5>iOS Platform Bridge - SceneDelegate &amp; State Restoration</h5>
            <pre><code>// ios/App/SceneDelegate.swift
import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {

        // Restore navigation state
        if let stateData = UserDefaults.standard.data(forKey: "navigationState"),
           let state = try? JSONDecoder().decode(NavigationState.self, from: stateData) {
            NavigationBridge.shared.restoreState(state)
        }
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Persist navigation state
        if let state = NavigationBridge.shared.getCurrentState(),
           let data = try? JSONEncoder().encode(state) {
            UserDefaults.standard.set(data, forKey: "navigationState")
        }
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Check for session validity
        SessionManager.shared.validateSession { isValid in
            if !isValid {
                NavigationBridge.shared.sendEvent("SESSION_EXPIRED")
            }
        }
    }
}

// ios/App/NavigationBridge.swift
@objc(NavigationBridge)
class NavigationBridge: RCTEventEmitter {
    static let shared = NavigationBridge()

    @objc func restoreState(_ state: NavigationState) {
        sendEvent(withName: "onStateRestore", body: state.toDictionary())
    }

    @objc func sendEvent(_ eventName: String, body: Any? = nil) {
        sendEvent(withName: eventName, body: body)
    }

    override func supportedEvents() -&gt; [String]! {
        return ["onStateRestore", "SESSION_EXPIRED", "DEEP_LINK"]
    }
}</code></pre>

            <h5>Android Platform Bridge - Lifecycle &amp; State Persistence</h5>
            <pre><code>// android/app/src/main/java/com/example/NavigationModule.kt
package com.example.app

import android.content.SharedPreferences
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ProcessLifecycleOwner
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class NavigationModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), DefaultLifecycleObserver {

    private val prefs: SharedPreferences by lazy {
        reactContext.getSharedPreferences("navigation", Context.MODE_PRIVATE)
    }

    init {
        ProcessLifecycleOwner.get().lifecycle.addObserver(this)
    }

    override fun getName() = "NavigationModule"

    @ReactMethod
    fun persistState(stateJson: String) {
        prefs.edit().putString("state", stateJson).apply()
    }

    @ReactMethod
    fun getPersistedState(promise: Promise) {
        val state = prefs.getString("state", null)
        if (state != null) {
            promise.resolve(state)
        } else {
            promise.resolve(null)
        }
    }

    override fun onStart(owner: LifecycleOwner) {
        // App coming to foreground - validate session
        validateSession { isValid -&gt;
            if (!isValid) {
                sendEvent("SESSION_EXPIRED", null)
            }
        }
    }

    override fun onStop(owner: LifecycleOwner) {
        // App going to background - persist state automatically happens via JS
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    private fun validateSession(callback: (Boolean) -&gt; Unit) {
        // Check token expiry
        val tokenExpiry = prefs.getLong("tokenExpiry", 0)
        callback(System.currentTimeMillis() &lt; tokenExpiry)
    }
}</code></pre>

            <h5>Navigation Provider &amp; Root Navigator</h5>
            <pre><code>// navigation/NavigationProvider.tsx
import { useMachine } from '@xstate/react';
import { navigationMachine } from '../machines/navigationMachine';

interface NavigationProviderProps {
    children: React.ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
    const [state, send, service] = useMachine(navigationMachine, {
        services: {
            loadInitialState: async () =&gt; {
                // Parallel fetch of all required state
                const [authState, appConfig, userData] = await Promise.all([
                    authService.getStoredAuth(),
                    configService.getAppConfig(),
                    userService.getCurrentUser(),
                ]);

                return {
                    auth: authState.isAuthenticated ? 'authenticated' : 'unauthenticated',
                    onboarding: userData?.onboardingCompletedAt ? 'completed' : 'not_started',
                    verification: getVerificationState(userData),
                    role: userData?.role || 'standard',
                    forceUpdate: appConfig.forceUpdate,
                    maintenance: appConfig.maintenance,
                };
            },
        },
        actions: {
            processPendingDeepLink: (ctx) =&gt; {
                if (ctx.pendingDeepLink) {
                    deepLinkService.navigate(ctx.pendingDeepLink);
                }
            },
            handleDeepLink: (_, event) =&gt; {
                deepLinkService.navigate(event.payload.url);
            },
        },
    });

    // Listen for native events
    useEffect(() =&gt; {
        const subscriptions = [
            NativeModules.NavigationModule.addListener('SESSION_EXPIRED', () =&gt; {
                send('SESSION_EXPIRED');
            }),
            authService.onAuthStateChanged((authenticated, user) =&gt; {
                send({ type: 'AUTH_STATE_CHANGED', payload: { authenticated, user } });
            }),
        ];

        return () =&gt; subscriptions.forEach(sub =&gt; sub.remove());
    }, [send]);

    return (
        &lt;NavigationContext.Provider value={{ state, send, service }}&gt;
            {children}
        &lt;/NavigationContext.Provider&gt;
    );
}

// navigation/RootNavigator.tsx
export function RootNavigator() {
    const { state } = useNavigationContext();
    const navigationRef = useNavigationContainerRef&lt;RootStackParamList&gt;();

    // Get current stack from state machine
    const currentStack = state.meta?.stack as keyof RootStackParamList;

    if (state.matches('initializing')) {
        return &lt;SplashScreen /&gt;;
    }

    return (
        &lt;NavigationContainer
            ref={navigationRef}
            linking={linkingConfig}
            onStateChange={(navState) =&gt; {
                // Persist navigation state
                NativeModules.NavigationModule.persistState(JSON.stringify(navState));
                // Track screen views
                analytics.trackScreenView(navState);
            }}
        &gt;
            &lt;RootStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}&gt;
                {currentStack === 'ForceUpdate' &amp;&amp; (
                    &lt;RootStack.Screen name="ForceUpdate" component={ForceUpdateScreen} /&gt;
                )}
                {currentStack === 'Maintenance' &amp;&amp; (
                    &lt;RootStack.Screen name="Maintenance" component={MaintenanceScreen} /&gt;
                )}
                {currentStack === 'Auth' &amp;&amp; (
                    &lt;RootStack.Screen name="Auth" component={AuthNavigator} /&gt;
                )}
                {currentStack === 'Onboarding' &amp;&amp; (
                    &lt;RootStack.Screen name="Onboarding" component={OnboardingNavigator} /&gt;
                )}
                {currentStack === 'Verification' &amp;&amp; (
                    &lt;RootStack.Screen name="Verification" component={VerificationNavigator} /&gt;
                )}
                {currentStack === 'Main' &amp;&amp; (
                    &lt;RootStack.Screen name="Main" component={MainNavigator} /&gt;
                )}
            &lt;/RootStack.Navigator&gt;
        &lt;/NavigationContainer&gt;
    );
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <table>
                <tr><th>Problem</th><th>Solution</th><th>Impact</th></tr>
                <tr><td>Flash of wrong screen on launch</td><td>Sync read cached auth state from MMKV before first render</td><td>Zero flicker, instant correct navigator</td></tr>
                <tr><td>Slow state resolution</td><td>Parallel fetch: auth + config + user profile</td><td>&lt;100ms total initialization</td></tr>
                <tr><td>Navigation history loss on stack switch</td><td>Persist nav state per stack, restore when returning</td><td>Seamless resumption of previous position</td></tr>
                <tr><td>Jarring transitions between stacks</td><td>Fade animation on RootStack.Navigator</td><td>Smooth 300ms transition between contexts</td></tr>
                <tr><td>Redundant re-renders</td><td>Memoize gate conditions, use React.memo on navigators</td><td>Minimal re-render on state changes</td></tr>
            </table>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>State persistence</td><td>SceneDelegate sceneDidEnterBackground</td><td>ProcessLifecycleOwner onStop</td></tr>
                <tr><td>Session validation</td><td>sceneWillEnterForeground</td><td>onStart lifecycle callback</td></tr>
                <tr><td>Background fetch</td><td>Background App Refresh (limited)</td><td>WorkManager for deferred config fetch</td></tr>
                <tr><td>Secure storage</td><td>Keychain (automatic backup to iCloud)</td><td>Keystore (hardware-backed on supported devices)</td></tr>
                <tr><td>Deep link handling</td><td>scene:continue userActivity</td><td>onNewIntent with launchMode="singleTask"</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Token refresh during navigation:</strong> Queue pending navigation actions, complete silent refresh, replay queued actions</li>
                <li><strong>Concurrent state changes:</strong> XState event queue ensures serialization - only one event processed at a time</li>
                <li><strong>Deep link to protected screen:</strong> Store in pendingDeepLink context, process after auth/onboarding complete</li>
                <li><strong>Social login skipping onboarding:</strong> Pre-populate profile from OAuth payload, mark relevant steps as complete</li>
                <li><strong>Multi-device session invalidation:</strong> Listen for 401 from any API, send SESSION_EXPIRED event</li>
                <li><strong>Network loss during state check:</strong> Use cached state, show subtle offline indicator, retry when connectivity returns</li>
                <li><strong>Config fetch timeout:</strong> Use cached config with short TTL, background refresh when successful</li>
                <li><strong>Partial onboarding completion:</strong> Track step-by-step progress, resume from last incomplete step</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>State management</td><td>XState</td><td>Redux / Zustand</td><td>Explicit states prevent impossible combinations, visual debugging</td></tr>
                <tr><td>Stack switching</td><td>Conditional rendering</td><td>Guards on every screen</td><td>Cleaner architecture, single source of truth</td></tr>
                <tr><td>State persistence</td><td>MMKV</td><td>AsyncStorage</td><td>Synchronous reads eliminate flash</td></tr>
                <tr><td>Token storage</td><td>react-native-keychain</td><td>MMKV encrypted</td><td>OS-level security, biometric integration</td></tr>
                <tr><td>A/B testing</td><td>Feature flags in machine config</td><td>Separate machine instances</td><td>Single machine, easier to test and debug</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>XState machine transitions (all state → event → state combinations)</li>
                        <li>Gate condition functions (isolated pure function tests)</li>
                        <li>Navigation type definitions (compile-time via TypeScript)</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>NavigationProvider with mocked services</li>
                        <li>State persistence and restoration</li>
                        <li>Deep link queue processing after auth</li>
                    </ul>
                </li>
                <li><strong>E2E Tests (Detox):</strong>
                    <ul>
                        <li>Complete onboarding flow</li>
                        <li>Session expiry → re-authentication</li>
                        <li>Force update blocking screen</li>
                        <li>Deep link to protected content when logged out</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why use XState instead of simple useState/context?</strong>
                    <br/>A: XState makes states explicit - you can't have (isLoading: true, isReady: true) because states are mutually exclusive. Guards prevent invalid transitions, and the state chart is visualizable for debugging. The machine is testable independently of React.</li>
                <li><strong>Q: How do you prevent screen flickering on app launch?</strong>
                    <br/>A: Use synchronous storage (MMKV) to read cached auth state before first render. Show splash screen only during async operations (token validation), not during initial state determination.</li>
                <li><strong>Q: How would you implement A/B testing for different onboarding flows?</strong>
                    <br/>A: Inject experiment assignment into machine context, use guards that check assignment. e.g., cond: (ctx) =&gt; ctx.experiment === 'onboarding_v2'. All flows defined in same machine, selected at runtime.</li>
                <li><strong>Q: What happens if config fetch fails on launch?</strong>
                    <br/>A: Use cached config with short TTL. If cache is valid, proceed normally. If stale and fetch fails, show user (maybe soft-block). Background refresh when network returns.</li>
                <li><strong>Q: How do you handle reset() vs navigate() for auth changes?</strong>
                    <br/>A: reset() clears the navigation stack entirely - use for auth state changes (logout, session expiry) to prevent back navigation to protected screens. navigate() for in-app transitions where history should be preserved.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Navigation</td><td>@react-navigation/native v6+</td><td>Type-safe, flexible stack management, native transitions</td></tr>
                <tr><td>State machine</td><td>XState</td><td>Visualizable flows, guards for transitions, devtools</td></tr>
                <tr><td>Auth state</td><td>Zustand + react-native-keychain</td><td>Simple state management with secure token storage</td></tr>
                <tr><td>Type safety</td><td>TypeScript with @react-navigation types</td><td>Full type inference for params and navigation</td></tr>
                <tr><td>Persistence</td><td>react-native-mmkv</td><td>Fast synchronous storage for navigation state</td></tr>
                <tr><td>Analytics</td><td>@react-navigation/native onStateChange</td><td>Built-in screen tracking integration</td></tr>
            </table>
        `
     },
    {
        id: 86,
        category: "System Design",
        icon: "🏛️",
        question: "Design an image/video upload system with progress, retry logic, and background uploads",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>File size limits:</strong> What's the maximum file size? (1GB video? 50MB image?)</li>
                <li><strong>Network policy:</strong> Should uploads continue on cellular or WiFi-only? User preference?</li>
                <li><strong>Background behavior:</strong> Continue uploading when app is minimized? What about when killed?</li>
                <li><strong>Compression:</strong> Should we compress before upload? Quality targets for images/videos?</li>
                <li><strong>Resumability:</strong> If upload fails mid-way, resume from checkpoint or restart?</li>
                <li><strong>Concurrent uploads:</strong> How many simultaneous uploads? Prioritization rules?</li>
                <li><strong>Server protocol:</strong> S3 presigned URLs? tus resumable protocol? Custom multipart?</li>
                <li><strong>Storage quotas:</strong> Per-user storage limits? Deduplication requirements?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Support image (JPEG, PNG, HEIC) and video (MP4, MOV) uploads up to 2GB</li>
                <li>Show real-time upload progress with accurate percentage per file</li>
                <li>Implement automatic retry with exponential backoff (3 retries, 1s → 2s → 4s)</li>
                <li>Continue uploads in background when app is minimized</li>
                <li>Resume interrupted uploads from last successfully uploaded chunk</li>
                <li>Support concurrent uploads (max 3) with priority queue management</li>
                <li>Compress media client-side before upload (configurable quality)</li>
                <li>Allow pause/resume/cancel of individual uploads</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Memory efficient: stream chunks (5MB) without loading entire file</li>
                <li>Battery optimized: batch operations, adaptive chunk size based on network</li>
                <li>Handle network transitions (WiFi ↔ cellular) seamlessly with user preference</li>
                <li>Complete pending uploads after app restart (persist queue state)</li>
                <li>Upload progress updates &lt;100ms latency (smooth UI)</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Server-side storage and CDN configuration</li>
                <li>Video transcoding pipeline (assume server handles)</li>
                <li>Gallery/media browsing UI (just upload functionality)</li>
                <li>Download/playback of uploaded media</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                      MEDIA UPLOAD SYSTEM ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         UPLOAD QUEUE                                    ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          ││
│  │  │ File 1  │ │ File 2  │ │ File 3  │ │ File 4  │ │ File 5  │          ││
│  │  │ 75% ▓▓▓ │ │ 20% ▓░░ │ │ Queued  │ │ Paused  │ │ Failed  │          ││
│  │  │ Active  │ │ Active  │ │ Pending │ │ Manual  │ │ Retry:2 │          ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────────┐│
│  │                        UPLOAD COORDINATOR                               ││
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               ││
│  │  │ Queue Manager │  │ Chunk Engine  │  │ State Machine │               ││
│  │  │ • Priority    │  │ • 5MB chunks  │  │ • Persist     │               ││
│  │  │ • Concurrency │  │ • Checksums   │  │ • Resume      │               ││
│  │  │ • Scheduling  │  │ • Parallel    │  │ • Retry       │               ││
│  │  └───────────────┘  └───────────────┘  └───────────────┘               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│       ┌────────────────────────────┼────────────────────────────┐           │
│       │                            │                            │           │
│       ▼                            ▼                            ▼           │
│  ┌──────────────┐           ┌──────────────┐           ┌──────────────┐    │
│  │ Foreground   │           │ Background   │           │ Native       │    │
│  │ (JS Thread)  │           │ (JS + Native)│           │ (iOS/Android)│    │
│  │ Real-time    │           │ App minimized│           │ App killed   │    │
│  │ progress UI  │           │ headless task│           │ system task  │    │
│  └──────────────┘           └──────────────┘           └──────────────┘    │
│                                                                              │
│  MEDIA PROCESSING PIPELINE                                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Select → Validate → Compress → Chunk → Upload → Verify → Complete   │   │
│  │                        │                   │                         │   │
│  │                  Image: HEIC→JPEG      S3 Presigned                 │   │
│  │                  Video: H.265→H.264   or tus protocol               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Upload Queue UI</td><td>Display upload progress, allow pause/resume/cancel</td><td>React Native + FlatList</td></tr>
                <tr><td>Upload Coordinator</td><td>Orchestrate uploads, manage concurrency, handle retries</td><td>TypeScript + EventEmitter</td></tr>
                <tr><td>Queue Manager</td><td>Priority ordering, concurrency limits, FIFO scheduling</td><td>Custom priority queue</td></tr>
                <tr><td>Chunk Engine</td><td>Split files into 5MB chunks, calculate checksums, parallel upload</td><td>Native modules + ArrayBuffer</td></tr>
                <tr><td>State Machine</td><td>Persist queue state, enable resume after app restart</td><td>MMKV + XState</td></tr>
                <tr><td>Background Service (iOS)</td><td>Continue uploads when app backgrounded/killed</td><td>NSURLSession background tasks</td></tr>
                <tr><td>Background Service (Android)</td><td>Continue uploads via foreground service</td><td>WorkManager + Foreground Service</td></tr>
                <tr><td>Media Compressor</td><td>Reduce file size before upload (HEIC→JPEG, H.265→H.264)</td><td>react-native-image-resizer, FFmpeg</td></tr>
                <tr><td>Network Monitor</td><td>Detect connectivity changes, pause on cellular if configured</td><td>NetInfo</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>UPLOAD LIFECYCLE FLOW
=====================

User Selects Media
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PREPARATION PHASE                           │
├─────────────────────────────────────────────────────────────────┤
│  1. Validate file (size, type, permissions)                     │
│  2. Generate thumbnail for preview                              │
│  3. Compress if needed (images: HEIC→JPEG, video: re-encode)   │
│  4. Calculate file hash for deduplication                       │
│  5. Split into chunks (5MB each)                               │
│  6. Persist task state to storage                              │
└─────────────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     UPLOAD PHASE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Queue: [Task1] [Task2] [Task3] ...                            │
│              │                                                  │
│              ▼                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Active Upload (max 3 concurrent)                       │   │
│  │                                                         │   │
│  │  1. Init session (get presigned URLs / tus location)   │   │
│  │  2. Upload chunks in parallel (max 4 per file)         │   │
│  │     ┌────┐ ┌────┐ ┌────┐ ┌────┐                        │   │
│  │     │ C1 │ │ C2 │ │ C3 │ │ C4 │  → → → Server         │   │
│  │     └────┘ └────┘ └────┘ └────┘                        │   │
│  │  3. Track progress per chunk                           │   │
│  │  4. Verify checksums                                   │   │
│  │  5. Complete upload (notify server)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  On Error:                                                      │
│  ├── Network error → Pause, wait for connectivity, retry       │
│  ├── Server error (5xx) → Exponential backoff, retry           │
│  ├── Client error (4xx) → Mark failed, don't retry             │
│  └── App backgrounded → Continue via native background task    │
└─────────────────────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     COMPLETION PHASE                            │
├─────────────────────────────────────────────────────────────────┤
│  1. Server combines chunks                                      │
│  2. Server returns final media URL                              │
│  3. Update local state                                          │
│  4. Remove from queue                                           │
│  5. Emit completion event                                       │
│  6. Clean up temp files                                         │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Upload protocol</td><td>tus resumable protocol</td><td>Industry standard for resumable uploads, wide server support, automatic resume</td></tr>
                <tr><td>Chunk size</td><td>5MB</td><td>Balance between request overhead and resume granularity; reasonable for mobile networks</td></tr>
                <tr><td>Concurrency model</td><td>3 files × 4 chunks</td><td>Maximize throughput without overwhelming network or memory</td></tr>
                <tr><td>Queue persistence</td><td>MMKV</td><td>Synchronous, fast writes for real-time state persistence; survives app kill</td></tr>
                <tr><td>Background strategy (iOS)</td><td>NSURLSession background</td><td>OS-managed uploads that continue even after app termination</td></tr>
                <tr><td>Background strategy (Android)</td><td>WorkManager + foreground service</td><td>Guaranteed execution with persistent notification; survives doze mode</td></tr>
                <tr><td>Retry strategy</td><td>Exponential backoff (1s → 2s → 4s)</td><td>Standard practice to avoid thundering herd; respects server rate limits</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/upload.ts

/**
 * Status of an upload task through its lifecycle.
 */
type UploadStatus = 'queued' | 'preparing' | 'uploading' | 'paused' | 'failed' | 'completed';

/**
 * Priority levels for upload queue ordering.
 */
type UploadPriority = 'high' | 'normal' | 'low';

/**
 * Primary entity representing a file upload task.
 * Tracks progress, chunks, and retry state.
 */
interface UploadTask {
    /** Unique task identifier (UUID) */
    id: string;
    /** Local file URI (file:// or content://) */
    uri: string;
    /** Original filename with extension */
    fileName: string;
    /** MIME type (image/jpeg, video/mp4, etc.) */
    mimeType: string;
    /** Total file size in bytes */
    fileSize: number;
    /** Current task status */
    status: UploadStatus;
    /** Overall progress percentage (0-100) */
    progress: number;
    /** Total bytes successfully uploaded */
    bytesUploaded: number;
    /** Individual chunk states for resumable upload */
    chunks: ChunkState[];
    /** Number of retry attempts made */
    retryCount: number;
    /** Maximum retries before permanent failure */
    maxRetries: number;
    /** Queue priority for scheduling */
    priority: UploadPriority;
    /** Timestamp when task was created */
    createdAt: number;
    /** Error details if status is 'failed' */
    error?: UploadError;
    /** Custom metadata to attach to upload */
    metadata?: Record&lt;string, unknown&gt;;
    /** Server-assigned upload session URL (tus) */
    uploadUrl?: string;
    /** Final media URL after completion */
    completedUrl?: string;
}

/**
 * State of a single chunk within an upload task.
 * Enables resumption from last successful chunk.
 */
interface ChunkState {
    /** Zero-based chunk index */
    index: number;
    /** Byte offset in original file */
    offset: number;
    /** Chunk size in bytes */
    size: number;
    /** MD5/SHA checksum for integrity verification */
    checksum: string;
    /** Whether chunk was successfully uploaded */
    uploaded: boolean;
    /** Presigned URL for this specific chunk (S3 multipart) */
    uploadUrl?: string;
    /** ETag returned by server after upload */
    etag?: string;
}

/**
 * Configuration for the upload system.
 */
interface UploadConfig {
    /** Size of each chunk in bytes (default: 5MB) */
    chunkSize: number;
    /** Max concurrent file uploads (default: 3) */
    maxConcurrentUploads: number;
    /** Max concurrent chunks per file (default: 4) */
    maxConcurrentChunks: number;
    /** Max retry attempts before failure (default: 3) */
    maxRetries: number;
    /** Base retry delay in ms (default: 1000) */
    retryDelayMs: number;
    /** Enable background uploads when app minimized */
    backgroundEnabled: boolean;
    /** Allow uploads on cellular network */
    allowCellular: boolean;
    /** Compress media before upload */
    compressionEnabled: boolean;
    /** Image compression quality (0-1) */
    imageQuality: number;
    /** Video compression preset */
    videoPreset: 'low' | 'medium' | 'high';
}

/**
 * Error details for failed uploads.
 */
interface UploadError {
    /** Error category */
    code: 'NETWORK' | 'SERVER' | 'TIMEOUT' | 'CANCELLED' | 'INVALID_FILE' | 'STORAGE_FULL' | 'QUOTA_EXCEEDED';
    /** Human-readable error message */
    message: string;
    /** Whether this error type is retryable */
    retryable: boolean;
    /** HTTP status code if server error */
    httpStatus?: number;
}

/**
 * Media file selected for upload.
 */
interface MediaFile {
    /** Local URI */
    uri: string;
    /** Original filename */
    fileName: string;
    /** MIME type */
    mimeType: string;
    /** File size in bytes */
    size: number;
    /** Image/video dimensions */
    dimensions?: { width: number; height: number };
    /** Video duration in seconds */
    duration?: number;
}

/**
 * Upload session from server (tus protocol).
 */
interface UploadSession {
    /** Server-assigned upload URL */
    uploadUrl: string;
    /** Expected final URL after completion */
    finalUrl: string;
    /** Session expiry timestamp */
    expiresAt: number;
}

/**
 * Progress event emitted during upload.
 */
interface UploadProgressEvent {
    /** Task ID */
    taskId: string;
    /** Progress percentage (0-100) */
    progress: number;
    /** Bytes uploaded so far */
    bytesUploaded: number;
    /** Total bytes to upload */
    totalBytes: number;
    /** Current upload speed in bytes/sec */
    speed: number;
    /** Estimated time remaining in seconds */
    eta: number;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENTITY RELATIONSHIPS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  UploadConfig (Singleton)                                                    │
│       │                                                                      │
│       │ configures                                                           │
│       ▼                                                                      │
│  UploadCoordinator ◄──────────────────────────────────────────────────────┐ │
│       │                                                                   │ │
│       │ manages 1:N                                                       │ │
│       ▼                                                                   │ │
│  UploadTask ─────────────────┐                                            │ │
│       │                      │ has 0..1                                   │ │
│       │ contains 1:N         ▼                                            │ │
│       ▼                  UploadError                                      │ │
│  ChunkState                  │                                            │ │
│       │                      │ retryable?                                 │ │
│       │ uploaded?            ▼                                            │ │
│       ▼                  RetryScheduler ─────────────────────────────────►│ │
│  UploadSession (1:1)                                                        │
│       │                                                                      │
│       │ progress events                                                      │
│       ▼                                                                      │
│  UploadProgressEvent ──► UI / Analytics                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

MediaFile (input) ──► UploadTask (processing) ──► completedUrl (output)</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Upload Queue State</td><td>MMKV (persisted)</td><td>Synchronous access for fast updates; survives app kill; enables resume</td></tr>
                <tr><td>Chunk States</td><td>MMKV (within task)</td><td>Nested in UploadTask; granular resume capability</td></tr>
                <tr><td>Upload Config</td><td>MMKV (persisted)</td><td>User preferences for cellular policy, compression settings</td></tr>
                <tr><td>Active Controllers</td><td>In-memory Map</td><td>AbortControllers for pause/cancel; not needed after restart</td></tr>
                <tr><td>File Chunks</td><td>Native file system</td><td>Streamed from disk; never load full file into memory</td></tr>
                <tr><td>Completed URLs</td><td>Server / API response</td><td>Final URLs returned by backend after upload completion</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Location</th><th>Examples</th></tr>
                <tr><td>Server State</td><td>Backend / S3</td><td>Uploaded files, presigned URLs, upload sessions</td></tr>
                <tr><td>Persistent State</td><td>MMKV</td><td>Queue state, chunk progress, user config</td></tr>
                <tr><td>Session State</td><td>In-memory (Zustand)</td><td>Active uploads map, abort controllers, network state</td></tr>
                <tr><td>UI State</td><td>React state / Context</td><td>Selected files, upload sheet visibility, expanded items</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Upload Coordinator Service</h5>
            <pre><code>// services/UploadCoordinator.ts
import { EventEmitter } from 'events';
import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';

const storage = new MMKV({ id: 'uploads' });

/**
 * Central orchestrator for all upload operations.
 * Manages queue, concurrency, persistence, and retry logic.
 *
 * @example
 * const coordinator = new UploadCoordinator({ maxConcurrentUploads: 2 });
 * coordinator.on('progress', ({ taskId, progress }) =&gt; updateUI(taskId, progress));
 * const taskId = await coordinator.addUpload(mediaFile, { albumId: '123' });
 */
class UploadCoordinator extends EventEmitter {
    private queue: Map&lt;string, UploadTask&gt; = new Map();
    private activeUploads: Map&lt;string, AbortController&gt; = new Map();
    private config: UploadConfig;
    private networkState: 'wifi' | 'cellular' | 'none' = 'wifi';

    constructor(config: Partial&lt;UploadConfig&gt; = {}) {
        super();
        this.config = {
            chunkSize: 5 * 1024 * 1024, // 5MB
            maxConcurrentUploads: 3,
            maxConcurrentChunks: 4,
            maxRetries: 3,
            retryDelayMs: 1000,
            backgroundEnabled: true,
            allowCellular: true,
            compressionEnabled: true,
            imageQuality: 0.8,
            videoPreset: 'medium',
            ...config,
        };
        this.restoreQueue();
        this.setupNetworkListener();
    }

    /** Restore queue from persistent storage on app launch */
    private restoreQueue(): void {
        const saved = storage.getString('queue');
        if (saved) {
            const tasks: UploadTask[] = JSON.parse(saved);
            tasks.forEach(task =&gt; {
                if (task.status === 'uploading') {
                    task.status = 'queued'; // Resume interrupted uploads
                }
                this.queue.set(task.id, task);
            });
            this.processQueue();
        }
    }

    /** Persist queue state to survive app restart */
    private persistQueue(): void {
        const tasks = Array.from(this.queue.values());
        storage.set('queue', JSON.stringify(tasks));
    }

    /** Monitor network changes and auto-resume */
    private setupNetworkListener(): void {
        NetInfo.addEventListener(state =&gt; {
            const newState = state.isConnected
                ? (state.type === 'wifi' ? 'wifi' : 'cellular')
                : 'none';

            if (this.networkState === 'none' &amp;&amp; newState !== 'none') {
                this.processQueue(); // Network restored - resume uploads
            }

            // Pause if cellular and not allowed
            if (newState === 'cellular' &amp;&amp; !this.config.allowCellular) {
                this.pauseAll();
            }

            this.networkState = newState;
        });
    }

    /**
     * Add a file to the upload queue.
     * @param file - Media file to upload
     * @param metadata - Custom metadata to attach
     * @returns Task ID for tracking
     */
    async addUpload(file: MediaFile, metadata?: Record&lt;string, unknown&gt;): Promise&lt;string&gt; {
        const task: UploadTask = {
            id: generateUUID(),
            uri: file.uri,
            fileName: file.fileName,
            mimeType: file.mimeType,
            fileSize: file.size,
            status: 'queued',
            progress: 0,
            bytesUploaded: 0,
            chunks: [],
            retryCount: 0,
            maxRetries: this.config.maxRetries,
            priority: 'normal',
            createdAt: Date.now(),
            metadata,
        };

        this.queue.set(task.id, task);
        this.persistQueue();
        this.emit('taskAdded', task);
        this.processQueue();

        return task.id;
    }

    /** Pause a specific upload */
    pauseUpload(taskId: string): void {
        const controller = this.activeUploads.get(taskId);
        if (controller) {
            controller.abort();
            const task = this.queue.get(taskId);
            if (task) {
                task.status = 'paused';
                this.emit('taskUpdated', task);
                this.persistQueue();
            }
        }
    }

    /** Resume a paused upload */
    resumeUpload(taskId: string): void {
        const task = this.queue.get(taskId);
        if (task &amp;&amp; task.status === 'paused') {
            task.status = 'queued';
            this.processQueue();
        }
    }

    /** Cancel and remove an upload */
    cancelUpload(taskId: string): void {
        this.pauseUpload(taskId);
        this.queue.delete(taskId);
        this.persistQueue();
        this.emit('taskCancelled', taskId);
    }

    /** Set priority for a queued upload */
    setPriority(taskId: string, priority: UploadPriority): void {
        const task = this.queue.get(taskId);
        if (task) {
            task.priority = priority;
            this.persistQueue();
        }
    }

    /** Get all tasks in queue */
    getTasks(): UploadTask[] {
        return Array.from(this.queue.values());
    }

    /** Pause all active uploads */
    pauseAll(): void {
        this.activeUploads.forEach((_, taskId) =&gt; this.pauseUpload(taskId));
    }

    /** Process queue and start pending uploads */
    private async processQueue(): Promise&lt;void&gt; {
        if (this.networkState === 'none') return;
        if (this.networkState === 'cellular' &amp;&amp; !this.config.allowCellular) return;

        const activeCount = this.activeUploads.size;
        const available = this.config.maxConcurrentUploads - activeCount;
        if (available &lt;= 0) return;

        const pending = Array.from(this.queue.values())
            .filter(t =&gt; t.status === 'queued')
            .sort((a, b) =&gt; {
                const priorityOrder = { high: 0, normal: 1, low: 2 };
                const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                return pDiff !== 0 ? pDiff : a.createdAt - b.createdAt;
            })
            .slice(0, available);

        for (const task of pending) {
            this.startUpload(task);
        }
    }

    /** Start uploading a task */
    private async startUpload(task: UploadTask): Promise&lt;void&gt; {
        const controller = new AbortController();
        this.activeUploads.set(task.id, controller);
        task.status = 'preparing';
        this.emit('taskUpdated', task);

        try {
            if (task.chunks.length === 0) {
                task.chunks = await this.prepareChunks(task);
            }

            const session = await this.initUploadSession(task);
            task.uploadUrl = session.uploadUrl;

            task.status = 'uploading';
            await this.uploadChunks(task, session, controller.signal);
            await this.completeUpload(task, session);

            task.status = 'completed';
            task.progress = 100;
            this.emit('taskCompleted', task);

        } catch (error) {
            if (error.name === 'AbortError') {
                task.status = 'paused';
            } else {
                task.status = 'failed';
                task.error = this.categorizeError(error);

                if (task.error.retryable &amp;&amp; task.retryCount &lt; task.maxRetries) {
                    this.scheduleRetry(task);
                }
            }
            this.emit('taskUpdated', task);
        } finally {
            this.activeUploads.delete(task.id);
            this.persistQueue();
            this.processQueue();
        }
    }

    /** Schedule exponential backoff retry */
    private scheduleRetry(task: UploadTask): void {
        task.retryCount++;
        const delay = this.config.retryDelayMs * Math.pow(2, task.retryCount - 1);

        setTimeout(() =&gt; {
            if (task.status === 'failed') {
                task.status = 'queued';
                this.processQueue();
            }
        }, delay);
    }
}</code></pre>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useUploadQueue.ts

/**
 * Hook for accessing and managing the upload queue.
 * Provides reactive updates as uploads progress.
 */
function useUploadQueue(): {
    /** All tasks in the queue */
    tasks: UploadTask[];
    /** Tasks currently uploading */
    activeTasks: UploadTask[];
    /** Tasks waiting to upload */
    pendingTasks: UploadTask[];
    /** Tasks that failed */
    failedTasks: UploadTask[];
    /** Add file to upload queue */
    addUpload: (file: MediaFile, metadata?: Record&lt;string, unknown&gt;) =&gt; Promise&lt;string&gt;;
    /** Pause specific upload */
    pauseUpload: (taskId: string) =&gt; void;
    /** Resume paused upload */
    resumeUpload: (taskId: string) =&gt; void;
    /** Cancel and remove upload */
    cancelUpload: (taskId: string) =&gt; void;
    /** Pause all active uploads */
    pauseAll: () =&gt; void;
    /** Retry a failed upload */
    retryUpload: (taskId: string) =&gt; void;
    /** Clear all completed uploads from list */
    clearCompleted: () =&gt; void;
};

// hooks/useUploadProgress.ts

/**
 * Hook for tracking a single upload's progress.
 * Optimized for frequent updates (throttled to 16ms).
 */
function useUploadProgress(taskId: string): {
    /** Progress percentage (0-100) */
    progress: number;
    /** Current status */
    status: UploadStatus;
    /** Bytes uploaded */
    bytesUploaded: number;
    /** Total bytes */
    totalBytes: number;
    /** Upload speed (bytes/sec) */
    speed: number;
    /** Estimated time remaining (seconds) */
    eta: number;
    /** Error if failed */
    error: UploadError | null;
};

// hooks/useMediaPicker.ts

/**
 * Hook for selecting media from device.
 * Handles permissions and returns MediaFile objects.
 */
function useMediaPicker(): {
    /** Pick images from gallery */
    pickImages: (options?: PickerOptions) =&gt; Promise&lt;MediaFile[]&gt;;
    /** Pick videos from gallery */
    pickVideos: (options?: PickerOptions) =&gt; Promise&lt;MediaFile[]&gt;;
    /** Capture photo with camera */
    takePhoto: () =&gt; Promise&lt;MediaFile | null&gt;;
    /** Record video with camera */
    recordVideo: (maxDuration?: number) =&gt; Promise&lt;MediaFile | null&gt;;
    /** Check if permissions granted */
    hasPermission: boolean;
    /** Request permissions */
    requestPermission: () =&gt; Promise&lt;boolean&gt;;
};

interface PickerOptions {
    /** Maximum number of items to select */
    maxSelection?: number;
    /** Maximum file size in bytes */
    maxFileSize?: number;
    /** Allowed MIME types */
    mimeTypes?: string[];
}</code></pre>

            <h5>iOS Platform Bridge (NSURLSession Background)</h5>
            <pre><code>// ios/UploadModule.swift
import Foundation

@objc(BackgroundUploadModule)
class BackgroundUploadModule: RCTEventEmitter {

    private lazy var backgroundSession: URLSession = {
        let config = URLSessionConfiguration.background(
            withIdentifier: "com.app.backgroundUpload"
        )
        config.isDiscretionary = false
        config.sessionSendsLaunchEvents = true
        config.shouldUseExtendedBackgroundIdleMode = true

        return URLSession(
            configuration: config,
            delegate: self,
            delegateQueue: nil
        )
    }()

    private var uploadTasks: [String: URLSessionUploadTask] = [:]
    private var progressHandlers: [Int: (Double) -&gt; Void] = [:]

    @objc func uploadFile(
        _ taskId: String,
        fileUrl: String,
        uploadUrl: String,
        headers: NSDictionary,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let url = URL(string: uploadUrl),
              let fileURL = URL(string: fileUrl) else {
            rejecter("INVALID_URL", "Invalid URL provided", nil)
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")

        // Add custom headers
        if let headersDict = headers as? [String: String] {
            for (key, value) in headersDict {
                request.setValue(value, forHTTPHeaderField: key)
            }
        }

        let task = backgroundSession.uploadTask(with: request, fromFile: fileURL)
        task.taskDescription = taskId
        uploadTasks[taskId] = task

        task.resume()
        resolver(["started": true])
    }

    @objc func pauseUpload(_ taskId: String) {
        uploadTasks[taskId]?.suspend()
    }

    @objc func resumeUpload(_ taskId: String) {
        uploadTasks[taskId]?.resume()
    }

    @objc func cancelUpload(_ taskId: String) {
        uploadTasks[taskId]?.cancel()
        uploadTasks.removeValue(forKey: taskId)
    }
}

extension BackgroundUploadModule: URLSessionTaskDelegate, URLSessionDataDelegate {

    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didSendBodyData bytesSent: Int64,
        totalBytesSent: Int64,
        totalBytesExpectedToSend: Int64
    ) {
        guard let taskId = task.taskDescription else { return }
        let progress = Double(totalBytesSent) / Double(totalBytesExpectedToSend)

        sendEvent(withName: "uploadProgress", body: [
            "taskId": taskId,
            "progress": progress * 100,
            "bytesSent": totalBytesSent,
            "totalBytes": totalBytesExpectedToSend
        ])
    }

    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didCompleteWithError error: Error?
    ) {
        guard let taskId = task.taskDescription else { return }

        if let error = error {
            sendEvent(withName: "uploadFailed", body: [
                "taskId": taskId,
                "error": error.localizedDescription
            ])
        } else {
            sendEvent(withName: "uploadCompleted", body: [
                "taskId": taskId
            ])
        }

        uploadTasks.removeValue(forKey: taskId)
    }

    // Handle background session completion
    func urlSessionDidFinishEvents(forBackgroundURLSession session: URLSession) {
        DispatchQueue.main.async {
            if let appDelegate = UIApplication.shared.delegate as? AppDelegate,
               let completionHandler = appDelegate.backgroundSessionCompletionHandler {
                appDelegate.backgroundSessionCompletionHandler = nil
                completionHandler()
            }
        }
    }
}</code></pre>

            <h5>Android Platform Bridge (WorkManager + Foreground Service)</h5>
            <pre><code>// android/app/src/main/java/com/example/UploadWorker.kt
package com.example.app

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.work.*
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File
import java.util.concurrent.TimeUnit

class UploadWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    companion object {
        const val KEY_FILE_URI = "file_uri"
        const val KEY_UPLOAD_URL = "upload_url"
        const val KEY_TASK_ID = "task_id"
        const val CHANNEL_ID = "upload_channel"

        fun enqueue(
            context: Context,
            taskId: String,
            fileUri: String,
            uploadUrl: String
        ): Operation {
            val data = workDataOf(
                KEY_TASK_ID to taskId,
                KEY_FILE_URI to fileUri,
                KEY_UPLOAD_URL to uploadUrl
            )

            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()

            val request = OneTimeWorkRequestBuilder&lt;UploadWorker&gt;()
                .setInputData(data)
                .setConstraints(constraints)
                .setBackoffCriteria(
                    BackoffPolicy.EXPONENTIAL,
                    1,
                    TimeUnit.MINUTES
                )
                .addTag(taskId)
                .build()

            return WorkManager.getInstance(context)
                .enqueueUniqueWork(taskId, ExistingWorkPolicy.REPLACE, request)
        }
    }

    private val client = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(120, TimeUnit.SECONDS)
        .build()

    override suspend fun doWork(): Result {
        val taskId = inputData.getString(KEY_TASK_ID) ?: return Result.failure()
        val fileUri = inputData.getString(KEY_FILE_URI) ?: return Result.failure()
        val uploadUrl = inputData.getString(KEY_UPLOAD_URL) ?: return Result.failure()

        // Show foreground notification
        setForeground(createForegroundInfo(taskId))

        return withContext(Dispatchers.IO) {
            try {
                val file = File(fileUri)
                val progressRequestBody = ProgressRequestBody(
                    file,
                    "application/octet-stream".toMediaType()
                ) { progress -&gt;
                    // Update notification progress
                    setProgressAsync(workDataOf("progress" to progress))
                    sendProgressEvent(taskId, progress)
                }

                val request = Request.Builder()
                    .url(uploadUrl)
                    .put(progressRequestBody)
                    .build()

                val response = client.newCall(request).execute()

                if (response.isSuccessful) {
                    sendCompletedEvent(taskId)
                    Result.success()
                } else {
                    sendFailedEvent(taskId, "Server error: \${response.code}")
                    Result.retry()
                }
            } catch (e: Exception) {
                sendFailedEvent(taskId, e.message ?: "Unknown error")
                if (runAttemptCount &lt; 3) Result.retry() else Result.failure()
            }
        }
    }

    private fun createForegroundInfo(taskId: String): ForegroundInfo {
        createNotificationChannel()

        val notification = NotificationCompat.Builder(applicationContext, CHANNEL_ID)
            .setContentTitle("Uploading media")
            .setSmallIcon(R.drawable.ic_upload)
            .setProgress(100, 0, false)
            .setOngoing(true)
            .build()

        return ForegroundInfo(taskId.hashCode(), notification)
    }

    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "Media Uploads",
            NotificationManager.IMPORTANCE_LOW
        )
        val manager = applicationContext.getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }
}

class ProgressRequestBody(
    private val file: File,
    private val contentType: MediaType,
    private val onProgress: (Int) -&gt; Unit
) : RequestBody() {

    override fun contentType() = contentType
    override fun contentLength() = file.length()

    override fun writeTo(sink: okio.BufferedSink) {
        val buffer = ByteArray(8192)
        var uploaded: Long = 0
        val total = file.length()

        file.inputStream().use { input -&gt;
            var read: Int
            while (input.read(buffer).also { read = it } != -1) {
                sink.write(buffer, 0, read)
                uploaded += read
                onProgress(((uploaded * 100) / total).toInt())
            }
        }
    }
}</code></pre>

            <h5>Tus Resumable Upload Protocol</h5>
            <pre><code>// services/TusUploader.ts
// tus protocol: https://tus.io/protocols/resumable-upload

class TusUploader {
    private tusEndpoint: string;

    async initUpload(task: UploadTask): Promise&lt;string&gt; {
        const response = await fetch(this.tusEndpoint, {
            method: 'POST',
            headers: {
                'Tus-Resumable': '1.0.0',
                'Upload-Length': task.fileSize.toString(),
                'Upload-Metadata': this.encodeMetadata(task),
            },
        });

        const location = response.headers.get('Location');
        if (!location) throw new Error('No upload location returned');

        return location;
    }

    async uploadChunk(
        uploadUrl: string,
        chunk: ArrayBuffer,
        offset: number,
        signal: AbortSignal
    ): Promise&lt;number&gt; {
        const response = await fetch(uploadUrl, {
            method: 'PATCH',
            headers: {
                'Tus-Resumable': '1.0.0',
                'Upload-Offset': offset.toString(),
                'Content-Type': 'application/offset+octet-stream',
            },
            body: chunk,
            signal,
        });

        if (!response.ok) {
            throw new Error(\`Upload failed: \${response.status}\`);
        }

        const newOffset = response.headers.get('Upload-Offset');
        return parseInt(newOffset || '0', 10);
    }

    async getUploadOffset(uploadUrl: string): Promise&lt;number&gt; {
        const response = await fetch(uploadUrl, {
            method: 'HEAD',
            headers: { 'Tus-Resumable': '1.0.0' },
        });

        const offset = response.headers.get('Upload-Offset');
        return parseInt(offset || '0', 10);
    }

    private encodeMetadata(task: UploadTask): string {
        const metadata = {
            filename: task.fileName,
            filetype: task.mimeType,
            ...task.metadata,
        };

        return Object.entries(metadata)
            .map(([key, value]) =&gt;
                \`\${key} \${Buffer.from(String(value)).toString('base64')}\`
            )
            .join(',');
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <table>
                <tr><th>Problem</th><th>Solution</th><th>Impact</th></tr>
                <tr><td>Large files exhaust memory</td><td>Stream chunks from disk using native file APIs (NSFileHandle/RandomAccessFile); never load entire file</td><td>Upload 2GB+ files on 2GB RAM devices</td></tr>
                <tr><td>Slow upload on poor networks</td><td>Adaptive chunk size based on bandwidth estimation (1MB slow, 10MB fast); smaller chunks = more frequent progress</td><td>Better perceived progress, faster resume</td></tr>
                <tr><td>Progress updates lag UI</td><td>Throttle progress events to 60fps (16ms); batch chunk updates; use requestAnimationFrame for smooth animations</td><td>&lt;16ms update latency, no jank</td></tr>
                <tr><td>Compression blocks UI thread</td><td>Run compression in native thread (ios: DispatchQueue, Android: coroutine); show placeholder during processing</td><td>UI remains responsive during 10s+ compression</td></tr>
                <tr><td>Queue serialization is slow</td><td>Use MMKV instead of AsyncStorage; partial updates instead of full queue rewrite</td><td>10x faster persistence, ~1ms writes</td></tr>
                <tr><td>Network detection is delayed</td><td>Subscribe to NetInfo before upload starts; proactively pause when cellular detected (if user preference)</td><td>No wasted data on cellular</td></tr>
            </table>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Background API</td><td>NSURLSession with background configuration; OS manages upload even after app kill</td><td>WorkManager with expedited work + foreground service; survives doze mode</td></tr>
                <tr><td>Background Duration</td><td>~30s after suspension, then system takes over; wakes app on completion</td><td>Foreground service can run indefinitely with persistent notification</td></tr>
                <tr><td>Progress Reporting</td><td>URLSessionTaskDelegate provides byte-level progress</td><td>OkHttp interceptor or custom RequestBody with callback</td></tr>
                <tr><td>File Access</td><td>file:// URLs work directly; photo library needs PHAsset export first</td><td>content:// URIs need ContentResolver; may need to copy to app cache</td></tr>
                <tr><td>HEIC Handling</td><td>Native support; can convert to JPEG via CGImageDestination</td><td>Limited support; use android-heif-writer or convert server-side</td></tr>
                <tr><td>Video Compression</td><td>AVAssetExportSession with presets; hardware H.264/HEVC encoder</td><td>MediaCodec API; hardware encoder varies by device</td></tr>
                <tr><td>Wake on Completion</td><td>application:handleEventsForBackgroundURLSession calls completionHandler</td><td>BroadcastReceiver from WorkManager; can trigger notification</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Large file handling:</strong> Stream chunks from disk instead of loading entire file. Use file descriptors with offset/length reads. Never allocate fileSize bytes in memory.</li>
                <li><strong>Network switch (WiFi ↔ cellular):</strong> Listen to NetInfo changes. If user preference is "WiFi only", pause active uploads on cellular. Resume automatically when WiFi returns.</li>
                <li><strong>Storage full during compression:</strong> Check available space (2x file size for safety) before starting compression. Clean up temp files on error. Show "Not enough storage" error.</li>
                <li><strong>App killed mid-upload:</strong> iOS NSURLSession completes in background, wakes app on finish. Android WorkManager re-schedules on app restart. JS layer resumes from persisted chunk state.</li>
                <li><strong>Server timeout / 5xx errors:</strong> Implement client-side timeout (2min per chunk). Exponential backoff (1s → 2s → 4s). Max 3 retries before permanent failure. Surface error to user.</li>
                <li><strong>Duplicate detection:</strong> Calculate file hash (MD5/SHA) before upload. Send hash to server; if exists, skip upload and return existing URL. Save bandwidth and storage.</li>
                <li><strong>Partial chunk upload:</strong> tus protocol HEAD request returns Upload-Offset. Resume from exact byte, not full chunk restart. Verify checksum on server side.</li>
                <li><strong>User cancels mid-upload:</strong> Abort fetch immediately. Delete partial upload on server (tus DELETE or S3 abort-multipart). Clean local temp files. Remove from queue.</li>
                <li><strong>Presigned URL expires:</strong> S3 presigned URLs have TTL. If chunk upload takes too long, request fresh URL before retry. Typically 15min expiry is sufficient.</li>
                <li><strong>Low battery mode:</strong> Detect via react-native-device-info. Optionally pause non-critical uploads. Reduce compression quality to save power.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Upload protocol</td><td>tus resumable</td><td>S3 multipart / custom chunked</td><td>Standard protocol; wide server support; automatic resume; upload progress built-in</td></tr>
                <tr><td>Chunk size</td><td>5MB fixed</td><td>Adaptive (1-10MB)</td><td>Simpler implementation; 5MB is good balance; adaptive adds complexity</td></tr>
                <tr><td>Queue persistence</td><td>MMKV</td><td>AsyncStorage / SQLite</td><td>Synchronous access; 10x faster; native performance</td></tr>
                <tr><td>Compression timing</td><td>Before queue (eager)</td><td>Just-in-time (lazy)</td><td>User sees final size immediately; can upload while selecting more</td></tr>
                <tr><td>Background strategy</td><td>Native APIs (NSURLSession/WorkManager)</td><td>JS headless task</td><td>Survives app termination; OS-optimized scheduling; required for large files</td></tr>
                <tr><td>Progress source</td><td>Byte-level from native</td><td>Chunk completion events</td><td>Smoother progress bar; more accurate; users expect continuous movement</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>Chunk splitting logic (edge cases: 0 bytes, exact chunk size, size+1)</li>
                        <li>Priority queue ordering</li>
                        <li>Exponential backoff timing</li>
                        <li>Error categorization (retryable vs permanent)</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>Full upload flow with mock tus server</li>
                        <li>Resume after simulated network failure</li>
                        <li>Queue persistence across app restart</li>
                        <li>Concurrent upload limit enforcement</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>Upload 100MB video on real device</li>
                        <li>Background upload completes after app minimized</li>
                        <li>Cancel and re-queue same file</li>
                        <li>Verify uploaded file integrity (checksum)</li>
                    </ul>
                </li>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>Memory stays under 100MB during 2GB upload</li>
                        <li>Progress UI maintains 60fps</li>
                        <li>Queue with 50 pending items loads &lt;100ms</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: Why chunked upload instead of single request?</strong><br/>A: Large files timeout or exhaust memory. Chunks enable resumption from failure point (only re-upload failed chunks). Progress tracking is more granular. Server can start processing early chunks while receiving later ones.</li>
                <li><strong>Q: How does tus protocol differ from S3 multipart?</strong><br/>A: tus is an open protocol with standardized semantics (HEAD for offset, PATCH for upload, DELETE for abort). S3 multipart is AWS-specific with presigned URLs per part. tus is simpler client-side; S3 scales better for CDN distribution.</li>
                <li><strong>Q: How do you handle iOS 30-second background limit?</strong><br/>A: Don't use JS background tasks for uploads. Use NSURLSession with background configuration - the OS takes over the upload after suspension, completes it, and wakes the app via delegate callback. This works even if the app is terminated.</li>
                <li><strong>Q: Chunk-based vs byte-level progress?</strong><br/>A: Users perceive stuck progress bars negatively. Byte-level progress (from native layer) shows continuous movement. Chunk-based (5MB jumps) feels laggy. Trade-off: more events to process, but throttling to 60fps keeps it efficient.</li>
                <li><strong>Q: Client-side vs server-side compression?</strong><br/>A: Client-side saves bandwidth and storage quota. Server-side is simpler and gives consistent quality. We chose client-side for mobile (expensive data, storage limits) with user-configurable quality presets.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Background upload</td><td>react-native-background-upload</td><td>Native NSURLSession/WorkManager wrapper; handles wake-on-complete</td></tr>
                <tr><td>File access</td><td>expo-file-system / react-native-fs</td><td>Read chunks, file info, temp storage, directory management</td></tr>
                <tr><td>Image compression</td><td>react-native-image-resizer</td><td>Efficient JPEG/PNG compression with quality control</td></tr>
                <tr><td>Video compression</td><td>react-native-video-compressor</td><td>Hardware-accelerated H.264 transcoding; preset quality levels</td></tr>
                <tr><td>Network state</td><td>@react-native-community/netinfo</td><td>WiFi/cellular detection; connection quality estimation</td></tr>
                <tr><td>Queue persistence</td><td>react-native-mmkv</td><td>Synchronous storage; 10x faster than AsyncStorage</td></tr>
                <tr><td>Media picker</td><td>react-native-image-picker / expo-image-picker</td><td>Cross-platform gallery/camera access with permissions</td></tr>
                <tr><td>Hash computation</td><td>react-native-hash</td><td>Native MD5/SHA for deduplication; streaming support</td></tr>
            </table>
        `
     },
    {
        id: 87,
        category: "System Design",
        icon: "🏛️",
        question: "How would you architect a video streaming feature with adaptive quality?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Content type:</strong> VOD only, or live streaming too? What's the expected latency for live (30s standard vs 2-5s low-latency)?</li>
                <li><strong>DRM requirements:</strong> Which content needs DRM protection? What security levels required (Widevine L1 for HD)?</li>
                <li><strong>Offline support:</strong> Allow downloads? Time-limited licenses? Storage limits?</li>
                <li><strong>Quality ladder:</strong> What resolutions to support? 360p through 4K? HDR/Dolby Vision?</li>
                <li><strong>Background playback:</strong> Audio-only in background? Picture-in-picture support?</li>
                <li><strong>Cast/AirPlay:</strong> Need Chromecast, AirPlay, or other casting support?</li>
                <li><strong>Subtitles/Audio tracks:</strong> Multiple languages? Closed captions? Audio descriptions?</li>
                <li><strong>Analytics requirements:</strong> QoE metrics, engagement tracking, error reporting?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Support HLS (iOS primary) and DASH (Android primary) adaptive bitrate streaming</li>
                <li>Automatic quality adjustment based on network bandwidth and buffer health</li>
                <li>Manual quality selection override with "Auto" default</li>
                <li>DRM protection using FairPlay (iOS) and Widevine (Android) for premium content</li>
                <li>Offline download with user-selected quality (stored with persistent DRM license)</li>
                <li>Background audio playback with lock screen controls</li>
                <li>Subtitle/caption support (WebVTT, TTML) with multiple language tracks</li>
                <li>Playback controls: play/pause, seek, 10s skip, playback speed (0.5x-2x)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li><strong>Startup latency:</strong> Time to first frame &lt; 2 seconds on 4G networks</li>
                <li><strong>Rebuffering:</strong> Zero rebuffering events on stable connections (&gt;3Mbps)</li>
                <li><strong>Quality transitions:</strong> Smooth switching without visible artifacts or stalls</li>
                <li><strong>Battery efficiency:</strong> Hardware decoding only; &lt;5% drain per hour of playback</li>
                <li><strong>Memory usage:</strong> &lt;150MB during 1080p playback</li>
                <li><strong>Seek latency:</strong> &lt;500ms to resume playback after seek</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Video encoding/transcoding pipeline (assume CDN provides HLS/DASH)</li>
                <li>Content management system for videos</li>
                <li>User-generated content upload</li>
                <li>Live streaming production tools</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                    VIDEO STREAMING ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        VIDEO PLAYER LAYER                               ││
│  │  ┌───────────────────────────────────────────────────────────────────┐ ││
│  │  │                    react-native-video v6                          │ ││
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │ ││
│  │  │  │  AVPlayer   │  │  ExoPlayer  │  │   Controls  │               │ ││
│  │  │  │   (iOS)     │  │  (Android)  │  │     UI      │               │ ││
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘               │ ││
│  │  └───────────────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────────┐│
│  │                     ADAPTIVE BITRATE ENGINE                             ││
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               ││
│  │  │ Bandwidth     │  │ Buffer Health │  │ Quality       │               ││
│  │  │ Estimator     │──│ Monitor       │──│ Selector      │               ││
│  │  │ EWMA algo     │  │ Target: 30s   │  │ ABR logic     │               ││
│  │  └───────────────┘  └───────────────┘  └───────────────┘               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────────┐│
│  │                        DRM LAYER                                        ││
│  │  ┌────────────────────────────┐  ┌────────────────────────────┐        ││
│  │  │  FairPlay (iOS)            │  │  Widevine (Android)        │        ││
│  │  │  • License acquisition     │  │  • License acquisition     │        ││
│  │  │  • Key renewal             │  │  • Security Level L1/L3   │        ││
│  │  │  • Offline keys            │  │  • Offline keys            │        ││
│  │  └────────────────────────────┘  └────────────────────────────┘        ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────────┐│
│  │                     OFFLINE/DOWNLOAD LAYER                              ││
│  │  ┌───────────────────────────────────────────────────────────────────┐ ││
│  │  │  Download Manager                                                 │ ││
│  │  │  • Quality selection   • Progress tracking   • Storage management │ ││
│  │  │  • Background downloads • Resume support    • Expiry handling     │ ││
│  │  └───────────────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  CONTENT DELIVERY                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  CDN → HLS/DASH Manifest → Segment Requests → License Server (DRM)  │   │
│  │                                                                      │   │
│  │  Quality Ladder: 360p(0.5Mbps) → 480p(1Mbps) → 720p(3Mbps)         │   │
│  │                  → 1080p(6Mbps) → 4K(15Mbps)                        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>Video Player</td><td>Core playback, seeking, buffering</td><td>react-native-video (AVPlayer/ExoPlayer)</td></tr>
                <tr><td>Controls UI</td><td>Play/pause, seek bar, quality selector, subtitles</td><td>React Native + Reanimated</td></tr>
                <tr><td>Bandwidth Estimator</td><td>Measure download speeds, maintain EWMA average</td><td>Native segment timing hooks</td></tr>
                <tr><td>Buffer Monitor</td><td>Track buffer health, trigger quality changes</td><td>Player event callbacks</td></tr>
                <tr><td>Quality Selector</td><td>ABR algorithm, select appropriate bitrate</td><td>Custom logic or player defaults</td></tr>
                <tr><td>DRM Manager</td><td>License acquisition, key storage, renewal</td><td>FairPlay SDK / Widevine CDM</td></tr>
                <tr><td>Download Manager</td><td>Offline content download, storage, expiry</td><td>AVAssetDownloadTask / DownloadService</td></tr>
                <tr><td>Analytics</td><td>QoE metrics, error tracking, engagement</td><td>Mux / Conviva / custom</td></tr>
            </table>

            <h5>Data Flow</h5>
            <pre><code>VIDEO STREAMING FLOW
====================

User Initiates Playback
        │
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                    INITIALIZATION                                  │
├───────────────────────────────────────────────────────────────────┤
│  1. Fetch manifest (HLS: .m3u8 / DASH: .mpd)                     │
│  2. Parse available quality levels                                │
│  3. Initialize DRM if required (fetch license)                    │
│  4. Select initial quality (based on network probe)              │
│  5. Start buffering first segments                               │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                    PLAYBACK LOOP                                   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Segment Request Cycle                                      │ │
│  │                                                             │ │
│  │  Request Segment → Download → Decrypt (DRM) → Decode →    │ │
│  │       ↑                                          │         │ │
│  │       │                                          ▼         │ │
│  │       └──────────── Next Segment ←─────── Render Frame    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Quality Adaptation (continuous):                                │
│  ├─ Monitor download speed per segment                           │
│  ├─ Update bandwidth estimate (EWMA)                             │
│  ├─ Check buffer health                                          │
│  └─ Switch quality if needed (up/down)                           │
│                                                                   │
│  Rebuffer handling:                                              │
│  ├─ Buffer < minBuffer → Pause playback, show spinner           │
│  ├─ Switch to lower quality immediately                          │
│  ├─ Resume when buffer > bufferForPlaybackAfterRebuffer         │
│  └─ Gradually increase quality once stable                       │
└───────────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────────┐
│                    OFFLINE DOWNLOAD FLOW                          │
├───────────────────────────────────────────────────────────────────┤
│  1. User selects quality for download                            │
│  2. Fetch DRM license for offline (persistent)                   │
│  3. Download all segments for selected quality                   │
│  4. Store encrypted content + license locally                    │
│  5. Track download progress, support pause/resume               │
│  6. Set expiry based on license terms                            │
└───────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Streaming protocol</td><td>HLS primary, DASH fallback</td><td>HLS native on iOS, ExoPlayer handles both; DASH for VP9/AV1 codecs</td></tr>
                <tr><td>Player library</td><td>react-native-video v6</td><td>Wraps native players; DRM support; active maintenance; TypeScript types</td></tr>
                <tr><td>ABR algorithm</td><td>Native player default + buffer override</td><td>Native ABR is well-tuned; custom logic for special cases (low battery)</td></tr>
                <tr><td>DRM integration</td><td>Platform native (FairPlay/Widevine)</td><td>Required for HD content on Android; Apple requirement for premium</td></tr>
                <tr><td>Buffer strategy</td><td>30s target, 15s min, 50s max</td><td>Balance between startup time and rebuffer resilience</td></tr>
                <tr><td>Offline downloads</td><td>Native APIs (AVAssetDownload/DownloadService)</td><td>Background download support; proper DRM license persistence</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/video.ts

/**
 * Video source configuration for the player.
 */
interface VideoSource {
    /** Stream URL (HLS m3u8, DASH mpd, or direct MP4) */
    uri: string;
    /** Stream type for proper handling */
    type: 'hls' | 'dash' | 'mp4';
    /** DRM configuration if content is protected */
    drmConfig?: DRMConfig;
    /** Video metadata for UI display */
    metadata?: VideoMetadata;
    /** Starting position in seconds (for resume) */
    startPosition?: number;
    /** Custom headers for manifest/segment requests */
    headers?: Record&lt;string, string&gt;;
}

/**
 * DRM configuration for protected content.
 */
interface DRMConfig {
    /** DRM system type */
    type: 'fairplay' | 'widevine' | 'playready';
    /** License server URL for key acquisition */
    licenseServerUrl: string;
    /** FairPlay certificate URL (iOS only) */
    certificateUrl?: string;
    /** Custom headers for license requests */
    headers?: Record&lt;string, string&gt;;
    /** Whether to persist license for offline playback */
    persistLicense?: boolean;
}

/**
 * Video metadata for display and analytics.
 */
interface VideoMetadata {
    /** Video title */
    title: string;
    /** Total duration in seconds */
    duration: number;
    /** Thumbnail/poster image URL */
    thumbnail: string;
    /** Available quality levels from manifest */
    qualities: QualityLevel[];
    /** Available subtitle tracks */
    subtitles?: SubtitleTrack[];
    /** Available audio tracks */
    audioTracks?: AudioTrack[];
}

/**
 * A quality level/variant from HLS/DASH manifest.
 */
interface QualityLevel {
    /** Human-readable resolution label */
    resolution: '360p' | '480p' | '720p' | '1080p' | '4k';
    /** Bitrate in bits per second */
    bitrate: number;
    /** Video codec (e.g., 'avc1.4d401f', 'hvc1') */
    codec: string;
    /** Frame width in pixels */
    width: number;
    /** Frame height in pixels */
    height: number;
    /** Frame rate (optional) */
    frameRate?: number;
    /** HDR type if applicable */
    hdrType?: 'sdr' | 'hdr10' | 'dolby-vision';
}

/**
 * Subtitle/caption track.
 */
interface SubtitleTrack {
    /** Language code (e.g., 'en', 'es') */
    language: string;
    /** Display label */
    label: string;
    /** Track type */
    type: 'subtitles' | 'captions';
    /** Whether this is the default track */
    isDefault?: boolean;
}

/**
 * Audio track variant.
 */
interface AudioTrack {
    /** Language code */
    language: string;
    /** Display label (e.g., 'English', 'Spanish (Latin America)') */
    label: string;
    /** Audio characteristics */
    characteristics?: ('describes-video' | 'public.accessibility')[];
    /** Codec (e.g., 'mp4a.40.2', 'ac-3') */
    codec: string;
}

/**
 * Current playback state.
 */
interface PlaybackState {
    /** Current player status */
    status: 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'buffering' | 'ended' | 'error';
    /** Current playback position in seconds */
    currentTime: number;
    /** Total duration in seconds */
    duration: number;
    /** Buffered duration ahead of playhead */
    bufferedDuration: number;
    /** Currently playing quality ('auto' or specific level) */
    currentQuality: QualityLevel | 'auto';
    /** Selected quality by user (may differ from current during transition) */
    selectedQuality: 'auto' | string;
    /** Volume level (0-1) */
    volume: number;
    /** Muted state */
    muted: boolean;
    /** Playback speed multiplier */
    playbackRate: number;
    /** Currently active subtitle track (null if off) */
    activeSubtitle: SubtitleTrack | null;
    /** Currently active audio track */
    activeAudio: AudioTrack | null;
    /** Error details if status is 'error' */
    error?: PlaybackError;
}

/**
 * Playback error details.
 */
interface PlaybackError {
    /** Error code */
    code: 'NETWORK' | 'DECODE' | 'DRM' | 'SOURCE' | 'UNKNOWN';
    /** Human-readable message */
    message: string;
    /** Whether retry might succeed */
    retryable: boolean;
}

/**
 * Buffer configuration for the player.
 */
interface BufferConfig {
    /** Minimum buffer before playback starts (ms) */
    minBufferMs: number;
    /** Maximum buffer to maintain (ms) */
    maxBufferMs: number;
    /** Buffer required to start initial playback (ms) */
    bufferForPlaybackMs: number;
    /** Buffer required after rebuffering event (ms) */
    bufferForPlaybackAfterRebufferMs: number;
}

/**
 * Offline download state.
 */
interface DownloadState {
    /** Video identifier */
    videoId: string;
    /** Download status */
    status: 'pending' | 'downloading' | 'paused' | 'completed' | 'failed';
    /** Progress percentage (0-100) */
    progress: number;
    /** Downloaded bytes */
    bytesDownloaded: number;
    /** Total bytes expected */
    totalBytes: number;
    /** Selected quality for download */
    quality: QualityLevel;
    /** Local file path when completed */
    localPath?: string;
    /** DRM license expiry timestamp */
    licenseExpiresAt?: number;
    /** Error if failed */
    error?: string;
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENTITY RELATIONSHIPS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  VideoSource                                                                 │
│       │                                                                      │
│       ├── has 0..1 ──► DRMConfig                                            │
│       │                     │                                                │
│       │                     └── requires ──► License Server                 │
│       │                                                                      │
│       └── has 0..1 ──► VideoMetadata                                        │
│                             │                                                │
│                             ├── contains 1:N ──► QualityLevel              │
│                             ├── contains 0:N ──► SubtitleTrack              │
│                             └── contains 0:N ──► AudioTrack                 │
│                                                                              │
│  VideoPlayer                                                                 │
│       │                                                                      │
│       ├── plays ──► VideoSource                                             │
│       │                                                                      │
│       ├── maintains ──► PlaybackState                                       │
│       │                      │                                               │
│       │                      └── references ──► QualityLevel (current)      │
│       │                                                                      │
│       └── configured by ──► BufferConfig                                    │
│                                                                              │
│  DownloadManager                                                             │
│       │                                                                      │
│       └── manages 0:N ──► DownloadState                                     │
│                               │                                              │
│                               └── references ──► QualityLevel (selected)    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data Type</th><th>Storage</th><th>Rationale</th></tr>
                <tr><td>Playback State</td><td>In-memory (Zustand/Context)</td><td>Rapidly changing; no persistence needed during session</td></tr>
                <tr><td>Watch Progress</td><td>Server + local cache (MMKV)</td><td>Resume across devices; local cache for offline</td></tr>
                <tr><td>Quality Preference</td><td>MMKV (persisted)</td><td>User preference remembered across sessions</td></tr>
                <tr><td>Downloaded Content</td><td>Native file system (encrypted)</td><td>Large files; DRM encryption; platform managed</td></tr>
                <tr><td>DRM Licenses</td><td>Secure storage (Keychain/Keystore)</td><td>Security requirement; platform DRM APIs handle</td></tr>
                <tr><td>Download Queue</td><td>MMKV</td><td>Survive app restart; resume downloads</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Adaptive Video Player Component</h5>
            <pre><code>// components/AdaptiveVideoPlayer.tsx
import Video, { VideoRef, OnLoadData, OnProgressData, OnBufferData } from 'react-native-video';
import { useVideoAnalytics } from '../hooks/useVideoAnalytics';

interface AdaptiveVideoPlayerProps {
    source: VideoSource;
    poster?: string;
    autoPlay?: boolean;
    onQualityChange?: (quality: QualityLevel) =&gt; void;
}

export function AdaptiveVideoPlayer({
    source,
    poster,
    autoPlay = false,
    onQualityChange,
}: AdaptiveVideoPlayerProps) {
    const videoRef = useRef&lt;VideoRef&gt;(null);
    const [state, setState] = useState&lt;PlaybackState&gt;({
        status: 'idle',
        currentTime: 0,
        duration: 0,
        bufferedDuration: 0,
        currentQuality: 'auto',
        volume: 1,
        playbackRate: 1,
    });
    const [selectedQuality, setSelectedQuality] = useState&lt;'auto' | string&gt;('auto');
    const [availableQualities, setAvailableQualities] = useState&lt;QualityLevel[]&gt;([]);

    const analytics = useVideoAnalytics(source.metadata?.title);

    // Buffer configuration optimized for mobile
    const bufferConfig: BufferConfig = useMemo(() =&gt; ({
        minBufferMs: 15000,         // 15s minimum buffer
        maxBufferMs: 50000,         // 50s maximum buffer
        bufferForPlaybackMs: 2500,  // Start playing after 2.5s buffered
        bufferForPlaybackAfterRebufferMs: 5000, // After rebuffer, wait for 5s
    }), []);

    const handleLoad = useCallback((data: OnLoadData) =&gt; {
        setState(prev =&gt; ({
            ...prev,
            status: autoPlay ? 'playing' : 'paused',
            duration: data.duration,
        }));

        // Extract available qualities from HLS manifest
        if (data.videoTracks) {
            const qualities = data.videoTracks.map(track =&gt; ({
                resolution: getResolutionLabel(track.height),
                bitrate: track.bitrate,
                codec: track.codecs,
                width: track.width,
                height: track.height,
            }));
            setAvailableQualities(qualities);
        }

        analytics.trackLoad(data.duration);
    }, [autoPlay, analytics]);

    const handleProgress = useCallback((data: OnProgressData) =&gt; {
        setState(prev =&gt; ({
            ...prev,
            currentTime: data.currentTime,
            bufferedDuration: data.playableDuration,
        }));
    }, []);

    const handleBuffer = useCallback((data: OnBufferData) =&gt; {
        setState(prev =&gt; ({
            ...prev,
            status: data.isBuffering ? 'buffering' : prev.status === 'buffering' ? 'playing' : prev.status,
        }));

        if (data.isBuffering) {
            analytics.trackBuffering(state.currentTime);
        }
    }, [analytics, state.currentTime]);

    const handleQualityChange = useCallback((quality: 'auto' | string) =&gt; {
        setSelectedQuality(quality);
        onQualityChange?.(quality === 'auto' ? 'auto' : availableQualities.find(q =&gt; q.resolution === quality)!);
        analytics.trackQualityChange(quality);
    }, [availableQualities, onQualityChange, analytics]);

    // Build DRM config for native player
    const drmConfig = useMemo(() =&gt; {
        if (!source.drmConfig) return undefined;

        return {
            type: source.drmConfig.type,
            licenseServer: source.drmConfig.licenseServerUrl,
            certificateUrl: source.drmConfig.certificateUrl,
            headers: source.drmConfig.headers,
        };
    }, [source.drmConfig]);

    return (
        &lt;View style={styles.container}&gt;
            &lt;Video
                ref={videoRef}
                source={{
                    uri: source.uri,
                    type: source.type === 'hls' ? 'm3u8' : source.type,
                }}
                style={styles.video}
                poster={poster}
                posterResizeMode="cover"
                resizeMode="contain"
                paused={state.status !== 'playing'}
                volume={state.volume}
                rate={state.playbackRate}
                drm={drmConfig}
                bufferConfig={bufferConfig}
                automaticallyWaitsToMinimizeStalling={true}
                preferredForwardBufferDuration={30}
                selectedVideoTrack={
                    selectedQuality === 'auto'
                        ? { type: 'auto' }
                        : { type: 'resolution', value: parseInt(selectedQuality) }
                }
                onLoad={handleLoad}
                onProgress={handleProgress}
                onBuffer={handleBuffer}
                onError={(error) =&gt; {
                    setState(prev =&gt; ({ ...prev, status: 'error' }));
                    analytics.trackError(error);
                }}
                onEnd={() =&gt; {
                    setState(prev =&gt; ({ ...prev, status: 'ended' }));
                    analytics.trackComplete();
                }}
            /&gt;

            &lt;VideoControls
                state={state}
                onPlay={() =&gt; setState(prev =&gt; ({ ...prev, status: 'playing' }))}
                onPause={() =&gt; setState(prev =&gt; ({ ...prev, status: 'paused' }))}
                onSeek={(time) =&gt; videoRef.current?.seek(time)}
                availableQualities={availableQualities}
                selectedQuality={selectedQuality}
                onQualityChange={handleQualityChange}
            /&gt;

            {state.status === 'buffering' &amp;&amp; &lt;BufferingIndicator /&gt;}
        &lt;/View&gt;
    );
}</code></pre>

            <h5>iOS Platform Bridge (FairPlay DRM)</h5>
            <pre><code>// ios/VideoModule.swift
import AVFoundation
import AVKit

@objc(FairPlayDRMModule)
class FairPlayDRMModule: NSObject {

    private var contentKeySession: AVContentKeySession?
    private var asset: AVURLAsset?

    @objc func configureFairPlay(
        _ assetUrl: String,
        certificateUrl: String,
        licenseServerUrl: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let url = URL(string: assetUrl) else {
            rejecter("INVALID_URL", "Invalid asset URL", nil)
            return
        }

        // Create content key session for FairPlay
        contentKeySession = AVContentKeySession(keySystem: .fairPlayStreaming)
        contentKeySession?.setDelegate(self, queue: DispatchQueue.main)

        // Configure asset with content key session
        asset = AVURLAsset(url: url)
        contentKeySession?.addContentKeyRecipient(asset!)

        // Store license server URL for delegate callbacks
        UserDefaults.standard.set(licenseServerUrl, forKey: "licenseServerUrl")
        UserDefaults.standard.set(certificateUrl, forKey: "certificateUrl")

        resolver(["configured": true])
    }

    @objc func downloadForOffline(
        _ assetUrl: String,
        quality: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let url = URL(string: assetUrl) else {
            rejecter("INVALID_URL", "Invalid URL", nil)
            return
        }

        let asset = AVURLAsset(url: url)

        // Select quality variant
        let downloadConfig = AVAssetDownloadConfiguration(
            asset: asset,
            title: "Downloaded Video"
        )

        // Set preferred bitrate based on quality
        let bitrate: Int64
        switch quality {
        case "1080p": bitrate = 6_000_000
        case "720p": bitrate = 3_000_000
        case "480p": bitrate = 1_500_000
        default: bitrate = 1_000_000
        }
        downloadConfig.primaryContentConfiguration.variantQualifiers = [
            AVAssetVariantQualifier.predicate(
                .init(format: "peakBitRate &lt;= %lld", bitrate)
            )
        ]

        let downloadTask = URLSession.shared.makeAssetDownloadTask(
            downloadConfiguration: downloadConfig
        )

        downloadTask?.resume()
        resolver(["taskId": downloadTask?.taskIdentifier ?? 0])
    }
}

extension FairPlayDRMModule: AVContentKeySessionDelegate {

    func contentKeySession(
        _ session: AVContentKeySession,
        didProvide keyRequest: AVContentKeyRequest
    ) {
        handleContentKeyRequest(keyRequest)
    }

    private func handleContentKeyRequest(_ keyRequest: AVContentKeyRequest) {
        guard let certificateUrl = UserDefaults.standard.string(forKey: "certificateUrl"),
              let url = URL(string: certificateUrl) else { return }

        // 1. Fetch FairPlay certificate
        URLSession.shared.dataTask(with: url) { [weak self] data, _, error in
            guard let certificateData = data, error == nil else {
                keyRequest.processContentKeyResponseError(error!)
                return
            }

            // 2. Create SPC (Server Playback Context)
            do {
                let spcData = try keyRequest.makeStreamingContentKeyRequestData(
                    forApp: certificateData,
                    contentIdentifier: keyRequest.identifier as! Data
                )

                // 3. Send SPC to license server
                self?.fetchLicense(spc: spcData, keyRequest: keyRequest)

            } catch {
                keyRequest.processContentKeyResponseError(error)
            }
        }.resume()
    }

    private func fetchLicense(spc: Data, keyRequest: AVContentKeyRequest) {
        guard let licenseUrl = UserDefaults.standard.string(forKey: "licenseServerUrl"),
              let url = URL(string: licenseUrl) else { return }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = spc

        URLSession.shared.dataTask(with: request) { data, _, error in
            guard let ckc = data, error == nil else {
                keyRequest.processContentKeyResponseError(error!)
                return
            }

            // 4. Provide CKC (Content Key Context) to player
            let response = AVContentKeyResponse(fairPlayStreamingKeyResponseData: ckc)
            keyRequest.processContentKeyResponse(response)
        }.resume()
    }
}</code></pre>

            <h5>Android Platform Bridge (Widevine DRM)</h5>
            <pre><code>// android/app/src/main/java/com/example/WidevineDRMModule.kt
package com.example.app

import android.net.Uri
import androidx.media3.common.MediaItem
import androidx.media3.common.util.Util
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.drm.DefaultDrmSessionManager
import androidx.media3.exoplayer.drm.HttpMediaDrmCallback
import androidx.media3.exoplayer.drm.FrameworkMediaDrm
import androidx.media3.exoplayer.offline.DownloadHelper
import androidx.media3.exoplayer.offline.DownloadRequest
import com.facebook.react.bridge.*

class WidevineDRMModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "WidevineDRMModule"

    @ReactMethod
    fun configureWidevine(
        assetUrl: String,
        licenseServerUrl: String,
        headers: ReadableMap?,
        promise: Promise
    ) {
        try {
            // Create DRM callback
            val drmCallback = HttpMediaDrmCallback(
                licenseServerUrl,
                DefaultHttpDataSource.Factory()
            )

            // Add custom headers if provided
            headers?.toHashMap()?.forEach { (key, value) -&gt;
                drmCallback.setKeyRequestProperty(key, value.toString())
            }

            // Create DRM session manager
            val drmSessionManager = DefaultDrmSessionManager.Builder()
                .setUuidAndExoMediaDrmProvider(
                    C.WIDEVINE_UUID,
                    FrameworkMediaDrm.DEFAULT_PROVIDER
                )
                .build(drmCallback)

            // Store for later use
            DRMSessionStore.setDrmSessionManager(assetUrl, drmSessionManager)

            // Check security level
            val securityLevel = getWidevineSecurityLevel()
            promise.resolve(Arguments.createMap().apply {
                putBoolean("configured", true)
                putString("securityLevel", securityLevel)
            })

        } catch (e: Exception) {
            promise.reject("DRM_ERROR", e.message)
        }
    }

    @ReactMethod
    fun downloadForOffline(
        assetUrl: String,
        quality: String,
        promise: Promise
    ) {
        val uri = Uri.parse(assetUrl)

        // Build media item with DRM config
        val mediaItem = MediaItem.Builder()
            .setUri(uri)
            .setDrmConfiguration(
                MediaItem.DrmConfiguration.Builder(C.WIDEVINE_UUID)
                    .setLicenseUri(DRMSessionStore.getLicenseUrl(assetUrl))
                    .build()
            )
            .build()

        // Create download helper
        DownloadHelper.forMediaItem(
            reactContext,
            mediaItem,
            null,
            DefaultHttpDataSource.Factory()
        ).prepare(object : DownloadHelper.Callback {

            override fun onPrepared(helper: DownloadHelper) {
                // Select quality track
                val trackIndex = selectQualityTrack(helper, quality)
                helper.clearTrackSelections(0)
                helper.addTrackSelection(0, DefaultTrackSelector.Parameters.Builder(reactContext)
                    .setMaxVideoBitrate(getBitrateForQuality(quality))
                    .build())

                // Build download request
                val downloadRequest = helper.getDownloadRequest(
                    Util.getUtf8Bytes(assetUrl).contentHashCode().toString(),
                    null
                )

                // Start download
                DownloadService.sendAddDownload(
                    reactContext,
                    VideoDownloadService::class.java,
                    downloadRequest,
                    false
                )

                promise.resolve(Arguments.createMap().apply {
                    putString("downloadId", downloadRequest.id)
                })

                helper.release()
            }

            override fun onPrepareError(helper: DownloadHelper, e: IOException) {
                promise.reject("DOWNLOAD_ERROR", e.message)
                helper.release()
            }
        })
    }

    private fun getWidevineSecurityLevel(): String {
        return try {
            val drm = FrameworkMediaDrm.newInstance(C.WIDEVINE_UUID)
            val level = drm.getPropertyString("securityLevel")
            drm.release()
            level // L1 = hardware, L3 = software
        } catch (e: Exception) {
            "unknown"
        }
    }

    private fun getBitrateForQuality(quality: String): Int {
        return when (quality) {
            "1080p" -&gt; 6_000_000
            "720p" -&gt; 3_000_000
            "480p" -&gt; 1_500_000
            else -&gt; 1_000_000
        }
    }
}</code></pre>

            <h5>Adaptive Bitrate Controller</h5>
            <pre><code>// services/ABRController.ts
// Custom ABR logic (react-native-video handles this natively, but useful for analytics)

interface BandwidthSample {
    timestamp: number;
    bytesTransferred: number;
    durationMs: number;
}

class ABRController {
    private samples: BandwidthSample[] = [];
    private readonly EWMA_SLOW = 0.95;  // Long-term average
    private readonly EWMA_FAST = 0.5;   // Short-term average
    private estimatedBandwidth = 0;

    addSample(bytesTransferred: number, durationMs: number) {
        const sample: BandwidthSample = {
            timestamp: Date.now(),
            bytesTransferred,
            durationMs,
        };
        this.samples.push(sample);

        // Keep last 20 samples
        if (this.samples.length &gt; 20) {
            this.samples.shift();
        }

        this.updateBandwidthEstimate(sample);
    }

    private updateBandwidthEstimate(sample: BandwidthSample) {
        const sampleBandwidth = (sample.bytesTransferred * 8) / (sample.durationMs / 1000);

        if (this.estimatedBandwidth === 0) {
            this.estimatedBandwidth = sampleBandwidth;
        } else {
            // EWMA with fast and slow factors for stability
            const slow = this.estimatedBandwidth * this.EWMA_SLOW + sampleBandwidth * (1 - this.EWMA_SLOW);
            const fast = this.estimatedBandwidth * this.EWMA_FAST + sampleBandwidth * (1 - this.EWMA_FAST);

            // Use slower estimate for conservative switching
            this.estimatedBandwidth = Math.min(slow, fast);
        }
    }

    selectQuality(
        availableQualities: QualityLevel[],
        currentBufferDuration: number,
        targetBufferDuration: number = 30
    ): QualityLevel {
        // Sort by bitrate descending
        const sortedQualities = [...availableQualities].sort((a, b) =&gt; b.bitrate - a.bitrate);

        // Buffer health factor (0.5 - 1.5)
        const bufferHealth = Math.max(0.5, Math.min(1.5, currentBufferDuration / targetBufferDuration));

        // Effective bandwidth with buffer health adjustment
        const effectiveBandwidth = this.estimatedBandwidth * bufferHealth;

        // Select highest quality that fits in bandwidth (with 20% safety margin)
        const safetyMargin = 0.8;
        const selectedQuality = sortedQualities.find(
            q =&gt; q.bitrate &lt;= effectiveBandwidth * safetyMargin
        ) || sortedQualities[sortedQualities.length - 1];

        return selectedQuality;
    }

    getEstimatedBandwidth(): number {
        return this.estimatedBandwidth;
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Performance Optimizations</h5>
            <table>
                <tr><th>Problem</th><th>Solution</th><th>Impact</th></tr>
                <tr><td>Slow startup time</td><td>Start with lowest quality (fast decode); switch up once buffer is healthy; preload manifest</td><td>Time to first frame &lt;2s on 4G</td></tr>
                <tr><td>Rebuffering events</td><td>Conservative ABR with 20% safety margin; maintain 30s buffer target; drop quality early</td><td>Zero rebuffer on stable 3Mbps+</td></tr>
                <tr><td>Quality oscillation</td><td>EWMA with slow decay (0.95) for stability; hysteresis (switch up needs higher threshold than down)</td><td>Stable quality for 30s+ stretches</td></tr>
                <tr><td>Seek latency</td><td>Pre-fetch I-frames at seek targets; keep decoded frames in memory; cancel pending segments</td><td>&lt;500ms seek latency</td></tr>
                <tr><td>Memory usage</td><td>Limit buffer size (50s max); release decoded frames outside window; use hardware decoder</td><td>&lt;150MB during 1080p playback</td></tr>
                <tr><td>Battery drain</td><td>Hardware decoding only; throttle analytics events; reduce wake locks during pause</td><td>&lt;5% battery per hour</td></tr>
            </table>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Native Player</td><td>AVPlayer (highly optimized)</td><td>ExoPlayer (Media3)</td></tr>
                <tr><td>DRM System</td><td>FairPlay Streaming</td><td>Widevine (L1 for HD, L3 for SD)</td></tr>
                <tr><td>HD Requirement</td><td>FairPlay required for premium</td><td>Widevine L1 (hardware) for HD on some content</td></tr>
                <tr><td>Offline Downloads</td><td>AVAssetDownloadURLSession</td><td>Media3 DownloadService</td></tr>
                <tr><td>Background Audio</td><td>AVAudioSession .playback category</td><td>Foreground service with notification</td></tr>
                <tr><td>PiP Support</td><td>AVPictureInPictureController</td><td>Activity.enterPictureInPictureMode()</td></tr>
                <tr><td>HDR Support</td><td>Dolby Vision, HDR10</td><td>HDR10, HDR10+ (device dependent)</td></tr>
                <tr><td>AirPlay/Cast</td><td>Native AirPlay</td><td>Google Cast SDK</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Network transition during playback:</strong> Don't immediately switch quality on network change. Buffer through transient drops (up to 5s). Only downgrade if buffer falls below threshold. Resume previous quality once stable.</li>
                <li><strong>DRM license expiry:</strong> Track license expiry timestamp. Refresh 5 minutes before expiry during playback. For offline content, show warning 24h before expiry. Block playback after expiry with clear message.</li>
                <li><strong>Background audio:</strong> Enable audio-only mode when app backgrounds. Handle audio interruptions (phone calls) gracefully - pause, then resume. Maintain lock screen controls and now playing info.</li>
                <li><strong>Seek to unbuffered region:</strong> Cancel pending segment downloads. Show loading spinner. Buffer at least bufferForPlaybackMs before resuming. Prefer nearest I-frame for faster start.</li>
                <li><strong>Device rotation:</strong> Maintain exact playback position across rotation. Don't restart player. Update layout constraints. Consider auto-fullscreen on landscape.</li>
                <li><strong>Storage full for downloads:</strong> Check available space before starting (estimate: bitrate × duration × 1.1). Show warning if &lt;500MB free. Clean expired downloads automatically. Allow manual deletion of downloads.</li>
                <li><strong>Codec not supported:</strong> Fallback to compatible variant from manifest. If no compatible variant, show clear error. Log for analytics to track device coverage.</li>
                <li><strong>CDN failure:</strong> Implement multi-CDN with automatic failover. Retry on different edge server. Track CDN performance for routing decisions.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Streaming format</td><td>HLS primary</td><td>DASH only</td><td>Native iOS support; ExoPlayer handles both; better Apple ecosystem integration</td></tr>
                <tr><td>ABR algorithm</td><td>Native player defaults</td><td>Custom ABR (Bola, MPC)</td><td>Native ABR is well-tuned; custom adds complexity; marginal gains</td></tr>
                <tr><td>Player library</td><td>react-native-video</td><td>Custom native wrapper</td><td>Active community; DRM support; cross-platform consistency</td></tr>
                <tr><td>DRM approach</td><td>Platform DRM (FairPlay/Widevine)</td><td>App-level encryption</td><td>Required by content providers; hardware security; industry standard</td></tr>
                <tr><td>Offline storage</td><td>Platform download APIs</td><td>Custom segment downloader</td><td>Background downloads; proper DRM license persistence; storage management</td></tr>
                <tr><td>Quality selector</td><td>Auto + manual override</td><td>Manual only</td><td>Most users prefer auto; manual for specific needs (data saving)</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <ul>
                <li><strong>Unit Tests:</strong>
                    <ul>
                        <li>ABR bandwidth estimation with mock samples</li>
                        <li>Quality selection logic with various buffer states</li>
                        <li>Playback state machine transitions</li>
                        <li>Download state persistence</li>
                    </ul>
                </li>
                <li><strong>Integration Tests:</strong>
                    <ul>
                        <li>HLS manifest parsing (various formats, encryption)</li>
                        <li>DRM license acquisition flow</li>
                        <li>Offline download and playback cycle</li>
                        <li>Quality switching during playback</li>
                    </ul>
                </li>
                <li><strong>E2E Tests:</strong>
                    <ul>
                        <li>Full playback from start to end</li>
                        <li>Seek to various positions</li>
                        <li>Network condition changes (throttling)</li>
                        <li>Background/foreground transitions</li>
                    </ul>
                </li>
                <li><strong>Performance Tests:</strong>
                    <ul>
                        <li>Time to first frame measurement</li>
                        <li>Rebuffer count under network throttling</li>
                        <li>Memory usage during extended playback</li>
                        <li>Battery drain per hour of playback</li>
                    </ul>
                </li>
            </ul>

            <h5>Interview Discussion Points</h5>
            <ul>
                <li><strong>Q: HLS vs DASH - when to use each?</strong><br/>A: HLS is native on iOS and well-supported by ExoPlayer on Android. Use HLS for maximum compatibility. DASH offers newer codecs (VP9, AV1) and more flexibility. Some content providers require DASH for Widevine. Consider both with HLS primary, DASH fallback.</li>
                <li><strong>Q: How do ABR algorithms work?</strong><br/>A: Two main approaches: (1) Throughput-based - measure download speed, select highest quality below bandwidth. (2) Buffer-based - consider buffer health, be more conservative when buffer is low. Best is hybrid: use throughput with buffer health multiplier. EWMA smooths bandwidth estimates to avoid oscillation.</li>
                <li><strong>Q: What's the difference between Widevine L1 and L3?</strong><br/>A: L1 uses hardware TEE for decryption - required by content providers for HD/4K. L3 is software-only - limited to SD quality by most providers. Device needs hardware support for L1. Check security level before offering HD downloads.</li>
                <li><strong>Q: How to handle live streaming latency?</strong><br/>A: Standard HLS has ~30s latency (3 segments × 10s). Low-Latency HLS (LL-HLS) achieves 2-5s using partial segments and blocking playlist requests. Trade-off: lower latency = more rebuffer risk. Use LL-HLS for live events, standard for VOD.</li>
                <li><strong>Q: Multi-CDN strategy?</strong><br/>A: Use primary CDN with failover to secondary. Measure segment download times; switch CDN if consistently slow. Consider geographic routing based on user location. Some use DNS-based switching, others do client-side with health checks.</li>
            </ul>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Video player</td><td>react-native-video v6</td><td>AVPlayer/ExoPlayer wrapper; DRM support; TypeScript; active maintenance</td></tr>
                <tr><td>DRM integration</td><td>Native AVFoundation / Media3</td><td>Platform DRM SDKs; required for FairPlay/Widevine</td></tr>
                <tr><td>Offline downloads</td><td>AVAssetDownloadURLSession / DownloadService</td><td>Native HLS/DASH download with proper DRM license persistence</td></tr>
                <tr><td>Analytics/QoE</td><td>mux-react-native / @conviva/react-native-sdk</td><td>QoE metrics; rebuffer analysis; quality scoring; error tracking</td></tr>
                <tr><td>Subtitles</td><td>Built-in (react-native-video)</td><td>WebVTT/TTML support out of the box</td></tr>
                <tr><td>Chromecast</td><td>react-native-google-cast</td><td>Google Cast SDK wrapper; session management; media routing</td></tr>
                <tr><td>Gestures</td><td>react-native-gesture-handler</td><td>Seek gestures; double-tap to skip; pinch to zoom</td></tr>
                <tr><td>Orientation</td><td>react-native-orientation-locker</td><td>Lock/unlock orientation; fullscreen landscape mode</td></tr>
            </table>
        `
     },
    {
        id: 88,
        category: "System Design",
        icon: "🏛️",
        question: "Design a secure authentication flow with biometrics, token refresh, and session management",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>R - Requirements Exploration</h4>

            <h5>Clarifying Questions to Ask</h5>
            <ul>
                <li><strong>Authentication methods:</strong> Which login methods need support (email/password, social OAuth, SSO/SAML, magic links)?</li>
                <li><strong>Biometric requirements:</strong> Should biometric be required for sensitive operations or just quick unlock?</li>
                <li><strong>MFA policies:</strong> Is MFA optional, mandatory, or adaptive based on risk signals?</li>
                <li><strong>Session policies:</strong> What inactivity timeout is acceptable (5min for banking vs 30min for social)?</li>
                <li><strong>Multi-device support:</strong> Can users be logged into unlimited devices or is there a cap?</li>
                <li><strong>Token lifetimes:</strong> What access/refresh token durations are acceptable for security vs UX?</li>
                <li><strong>Offline auth:</strong> Should users access the app offline with cached credentials?</li>
                <li><strong>Compliance requirements:</strong> Any specific standards (OWASP MASVS, PCI-DSS, HIPAA)?</li>
            </ul>

            <h5>Functional Requirements</h5>
            <ul>
                <li>Support email/password, social OAuth (Google, Apple, Facebook), and enterprise SSO/SAML</li>
                <li>Biometric authentication for quick unlock (Face ID, Touch ID, Fingerprint)</li>
                <li>JWT access/refresh token system with automatic renewal</li>
                <li>Multi-device session management with remote logout capability</li>
                <li>MFA support (TOTP authenticator, SMS, push notification approval)</li>
                <li>Account recovery flow with secure email/phone verification</li>
                <li>Password reset with rate limiting and account lockout protection</li>
                <li>Session activity tracking (device, location, last active timestamp)</li>
            </ul>

            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Tokens stored in hardware-backed secure storage (Secure Enclave / StrongBox)</li>
                <li>OWASP Mobile Application Security (MASVS L2) compliance</li>
                <li>Token refresh transparent to user (no re-login interruption)</li>
                <li>Session timeout after 15 min inactivity for financial/sensitive apps</li>
                <li>Authentication latency &lt; 500ms for biometric, &lt; 2s for full login</li>
                <li>Support 99.9% of devices with graceful degradation for older hardware</li>
            </ul>

            <h5>Out of Scope</h5>
            <ul>
                <li>Backend authentication server implementation</li>
                <li>Identity provider (IdP) configuration</li>
                <li>Admin portal for user management</li>
                <li>Fraud detection and risk scoring algorithms</li>
            </ul>

            <h4>A - Architecture / High-level Design</h4>

            <h5>System Architecture Diagram</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURE AUTHENTICATION ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AUTHENTICATION METHODS                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ Email/Pass   │ │ Social OAuth │ │ Biometric    │ │ SSO/SAML     │       │
│  │ + MFA        │ │ PKCE Flow    │ │ Quick Unlock │ │ Enterprise   │       │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘       │
│         │                │                │                │                 │
│         └────────────────┴────────────────┴────────────────┘                 │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                      AUTH STATE MACHINE                                 ││
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐             ││
│  │  │LOGGED   │───▶│NEEDS    │───▶│BIOMETRIC│───▶│FULLY    │             ││
│  │  │OUT      │    │MFA      │    │PROMPT   │    │AUTHED   │             ││
│  │  └─────────┘    └─────────┘    └─────────┘    └─────────┘             ││
│  │       ▲              │              │              │                   ││
│  │       └──────────────┴──────────────┴──────────────┘                   ││
│  │                     (Session Expired / Logout)                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────────┐│
│  │                      TOKEN MANAGEMENT                                   ││
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               ││
│  │  │ Access Token  │  │ Refresh Token │  │ Device Token  │               ││
│  │  │ Short-lived   │  │ Long-lived    │  │ Persistent    │               ││
│  │  │ 15 min        │  │ 30 days       │  │ Permanent     │               ││
│  │  │ In memory     │  │ Keychain      │  │ Keychain      │               ││
│  │  └───────────────┘  └───────────────┘  └───────────────┘               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────────┐│
│  │                      SECURE STORAGE                                     ││
│  │  ┌────────────────────────────┐  ┌────────────────────────────┐        ││
│  │  │  iOS Keychain              │  │  Android Keystore          │        ││
│  │  │  • Secure Enclave (A7+)    │  │  • StrongBox (Pixel 3+)   │        ││
│  │  │  • kSecAttrAccessible      │  │  • TEE fallback           │        ││
│  │  │  • LocalAuthentication     │  │  • BiometricPrompt        │        ││
│  │  └────────────────────────────┘  └────────────────────────────┘        ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  SESSION MANAGEMENT                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  • Active sessions list (device, location, last active)              │   │
│  │  • Remote session revocation                                         │   │
│  │  • Inactivity timeout (app-configurable)                            │   │
│  │  • Background token refresh                                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Component Overview</h5>
            <table>
                <tr><th>Component</th><th>Responsibility</th><th>Technology</th></tr>
                <tr><td>AuthStateManager</td><td>Manages authentication state machine transitions</td><td>Zustand store</td></tr>
                <tr><td>TokenManager</td><td>Handles token storage, refresh, and expiration</td><td>JWT + Axios interceptors</td></tr>
                <tr><td>SecureStorage</td><td>Platform-specific encrypted credential storage</td><td>Keychain / Keystore</td></tr>
                <tr><td>BiometricAuthenticator</td><td>Face ID / Touch ID / Fingerprint verification</td><td>LocalAuthentication</td></tr>
                <tr><td>OAuthClient</td><td>Handles social login PKCE flows</td><td>react-native-app-auth</td></tr>
                <tr><td>MFACoordinator</td><td>Multi-factor authentication flow orchestration</td><td>TOTP / SMS / Push</td></tr>
                <tr><td>SessionManager</td><td>Tracks active sessions across devices</td><td>Backend API + local cache</td></tr>
                <tr><td>ApiClient</td><td>HTTP client with automatic token refresh</td><td>Axios with interceptors</td></tr>
            </table>

            <h5>Key Architecture Decisions</h5>
            <table>
                <tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr>
                <tr><td>Token storage</td><td>Hardware-backed keychain</td><td>Secure Enclave (iOS) / StrongBox (Android) provide hardware isolation</td></tr>
                <tr><td>Access token lifetime</td><td>15 minutes</td><td>Limits exposure window if token is compromised</td></tr>
                <tr><td>Refresh token rotation</td><td>One-time use</td><td>Prevents token theft replay attacks</td></tr>
                <tr><td>OAuth flow</td><td>Authorization Code + PKCE</td><td>Most secure flow for mobile; implicit flow is deprecated</td></tr>
                <tr><td>Biometric gate</td><td>Required for keychain access</td><td>Even with device access, attacker needs biometric to get tokens</td></tr>
                <tr><td>State management</td><td>Finite state machine</td><td>Clear transitions prevent invalid auth states</td></tr>
            </table>

            <h4>D - Data Model / Core Entities</h4>

            <h5>Core Entities</h5>
            <pre><code>// types/auth.ts

/** JWT token pair with expiration timestamps */
interface AuthTokens {
    /** Short-lived access token (15 min) - stored in memory */
    accessToken: string;
    /** Long-lived refresh token (30 days) - stored in keychain */
    refreshToken: string;
    /** Unix timestamp when access token expires */
    accessTokenExpiresAt: number;
    /** Unix timestamp when refresh token expires */
    refreshTokenExpiresAt: number;
    /** Token type (always 'Bearer') */
    tokenType: 'Bearer';
}

/** Authenticated user profile */
interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    phone?: string;
    phoneVerified: boolean;
    displayName?: string;
    avatarUrl?: string;
    mfaEnabled: boolean;
    mfaMethods: MFAMethod[];
    createdAt: number;
    lastLoginAt: number;
}

/** Supported MFA methods */
type MFAMethod = 'totp' | 'sms' | 'push' | 'email';

/** Device session information */
interface Session {
    id: string;
    deviceId: string;
    deviceName: string;
    deviceModel: string;
    platform: 'ios' | 'android';
    osVersion: string;
    appVersion: string;
    lastActive: number;
    createdAt: number;
    location?: SessionLocation;
    current: boolean;
    trusted: boolean;
}

interface SessionLocation {
    ip: string;
    city?: string;
    region?: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

/** Finite state machine for authentication */
type AuthState =
    | { status: 'logged_out' }
    | { status: 'authenticating'; method: AuthMethod }
    | { status: 'needs_mfa'; mfaToken: string; availableMethods: MFAMethod[]; attemptsRemaining: number }
    | { status: 'needs_biometric'; reason: 'session_resume' | 'sensitive_action' }
    | { status: 'authenticated'; user: User; tokens: AuthTokens; session: Session }
    | { status: 'error'; error: AuthError };

type AuthMethod = 'email_password' | 'google' | 'apple' | 'facebook' | 'sso' | 'biometric';

/** Authentication error with code and metadata */
interface AuthError {
    code: AuthErrorCode;
    message: string;
    /** Seconds until retry is allowed (for rate limiting) */
    retryAfter?: number;
    /** Number of attempts remaining before lockout */
    attemptsRemaining?: number;
    /** Additional context (e.g., which field failed validation) */
    field?: string;
}

type AuthErrorCode =
    | 'INVALID_CREDENTIALS'
    | 'MFA_REQUIRED'
    | 'MFA_INVALID'
    | 'ACCOUNT_LOCKED'
    | 'ACCOUNT_DISABLED'
    | 'SESSION_EXPIRED'
    | 'REFRESH_TOKEN_EXPIRED'
    | 'BIOMETRIC_FAILED'
    | 'BIOMETRIC_NOT_ENROLLED'
    | 'BIOMETRIC_LOCKOUT'
    | 'DEVICE_NOT_TRUSTED'
    | 'RATE_LIMITED'
    | 'NETWORK_ERROR'
    | 'SERVER_ERROR';

/** OAuth configuration for social login */
interface OAuthConfig {
    provider: 'google' | 'apple' | 'facebook';
    clientId: string;
    redirectUrl: string;
    scopes: string[];
    additionalParameters?: Record&lt;string, string&gt;;
}

/** Biometric capability information */
interface BiometricCapability {
    isAvailable: boolean;
    isEnrolled: boolean;
    biometryType: 'face_id' | 'touch_id' | 'fingerprint' | 'none';
    securityLevel: 'strong' | 'weak' | 'none';
}</code></pre>

            <h5>Entity Relationships</h5>
            <pre><code>┌─────────────────────────────────────────────────────────────────────────────┐
│                         ENTITY RELATIONSHIPS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐        │
│  │    User      │ 1     N │   Session    │ 1     1 │   Device     │        │
│  │              │─────────│              │─────────│              │        │
│  │  id          │         │  userId      │         │  deviceId    │        │
│  │  email       │         │  deviceId    │         │  deviceName  │        │
│  │  mfaMethods  │         │  tokens      │         │  platform    │        │
│  └──────────────┘         └──────────────┘         └──────────────┘        │
│         │                        │                                          │
│         │ 1                      │ 1                                        │
│         │                        │                                          │
│         N                        1                                          │
│  ┌──────────────┐         ┌──────────────┐                                 │
│  │  MFAMethod   │         │  AuthTokens  │                                 │
│  │              │         │              │                                 │
│  │  type        │         │  accessToken │                                 │
│  │  secret      │         │  refreshToken│                                 │
│  │  verified    │         │  expiresAt   │                                 │
│  └──────────────┘         └──────────────┘                                 │
│                                                                              │
│  STORAGE MAPPING:                                                            │
│  • User: Server + Local cache (encrypted)                                   │
│  • Session: Server + Local reference                                        │
│  • AuthTokens: Keychain/Keystore (hardware-backed)                         │
│  • Device: AsyncStorage (device ID persistent)                             │
│  • MFAMethod: Server only (secrets never on device)                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Storage Strategy</h5>
            <table>
                <tr><th>Data</th><th>Storage</th><th>Encryption</th><th>Rationale</th></tr>
                <tr><td>Access Token</td><td>In-memory only</td><td>N/A</td><td>Never persisted; lost on app close</td></tr>
                <tr><td>Refresh Token</td><td>Keychain/Keystore</td><td>Hardware-backed</td><td>Secure Enclave / StrongBox encryption</td></tr>
                <tr><td>Device ID</td><td>Keychain/Keystore</td><td>Hardware-backed</td><td>Persistent across reinstalls</td></tr>
                <tr><td>User Profile</td><td>MMKV (encrypted)</td><td>AES-256</td><td>Fast sync access with encryption</td></tr>
                <tr><td>Session List</td><td>Server + memory</td><td>TLS</td><td>Fetched on demand, not persisted</td></tr>
                <tr><td>MFA Secrets</td><td>Server only</td><td>HSM</td><td>Never stored on client</td></tr>
            </table>

            <h5>State Management Mapping</h5>
            <table>
                <tr><th>State Type</th><th>Data</th><th>Manager</th></tr>
                <tr><td>Auth State</td><td>Current auth status, user, tokens</td><td>Zustand store (useAuthStore)</td></tr>
                <tr><td>Server State</td><td>Sessions list, MFA methods</td><td>TanStack Query</td></tr>
                <tr><td>Secure Storage</td><td>Tokens, device ID, biometric keys</td><td>SecureStorage service</td></tr>
                <tr><td>UI State</td><td>Loading, error display, form inputs</td><td>Component state</td></tr>
            </table>

            <h4>I - Interface Definition (API)</h4>

            <h5>Auth Store Interface</h5>
            <pre><code>// services/AuthService.ts
import { create } from 'zustand';

/** Authentication store interface */
interface AuthStore {
    /** Current authentication state */
    state: AuthState;

    /** Login with email and password */
    login: (email: string, password: string) =&gt; Promise&lt;void&gt;;

    /** Login using social OAuth provider */
    loginWithOAuth: (provider: 'google' | 'apple' | 'facebook') =&gt; Promise&lt;void&gt;;

    /** Authenticate with biometric for session resume */
    loginWithBiometric: () =&gt; Promise&lt;void&gt;;

    /** Verify MFA code during authentication */
    verifyMFA: (code: string, method: MFAMethod) =&gt; Promise&lt;void&gt;;

    /** Refresh access token using refresh token */
    refreshTokens: () =&gt; Promise&lt;void&gt;;

    /** Logout and clear all credentials */
    logout: (options?: { revokeAllSessions?: boolean }) =&gt; Promise&lt;void&gt;;

    /** Check if biometric authentication is available */
    checkBiometricAvailability: () =&gt; Promise&lt;BiometricCapability&gt;;
}</code></pre>

            <h5>React Hooks Interface</h5>
            <pre><code>// hooks/useAuth.ts

/**
 * Main authentication hook
 * @returns Auth state and actions
 */
function useAuth(): {
    /** Current authentication state */
    state: AuthState;
    /** Whether user is authenticated */
    isAuthenticated: boolean;
    /** Current user (if authenticated) */
    user: User | null;
    /** Login with credentials */
    login: (email: string, password: string) =&gt; Promise&lt;void&gt;;
    /** Login with OAuth provider */
    loginWithOAuth: (provider: OAuthProvider) =&gt; Promise&lt;void&gt;;
    /** Login with biometric */
    loginWithBiometric: () =&gt; Promise&lt;void&gt;;
    /** Logout current session */
    logout: () =&gt; Promise&lt;void&gt;;
};

/**
 * Hook for MFA verification flow
 */
function useMFA(): {
    /** Available MFA methods for current auth attempt */
    availableMethods: MFAMethod[];
    /** Remaining verification attempts */
    attemptsRemaining: number;
    /** Verify MFA code */
    verify: (code: string, method: MFAMethod) =&gt; Promise&lt;void&gt;;
    /** Request new SMS/email code */
    resendCode: (method: 'sms' | 'email') =&gt; Promise&lt;void&gt;;
    /** Cancel MFA and return to login */
    cancel: () =&gt; void;
};

/**
 * Hook for biometric configuration
 */
function useBiometric(): {
    /** Biometric capability of device */
    capability: BiometricCapability;
    /** Whether biometric is enabled for this app */
    isEnabled: boolean;
    /** Enable biometric authentication */
    enable: () =&gt; Promise&lt;void&gt;;
    /** Disable biometric authentication */
    disable: () =&gt; Promise&lt;void&gt;;
    /** Prompt for biometric authentication */
    authenticate: (reason: string) =&gt; Promise&lt;boolean&gt;;
};

/**
 * Hook for session management
 */
function useSessions(): {
    /** List of active sessions */
    sessions: Session[];
    /** Loading state */
    isLoading: boolean;
    /** Fetch sessions from server */
    refresh: () =&gt; Promise&lt;void&gt;;
    /** Revoke a specific session */
    revokeSession: (sessionId: string) =&gt; Promise&lt;void&gt;;
    /** Revoke all sessions except current */
    revokeAllOtherSessions: () =&gt; Promise&lt;void&gt;;
};</code></pre>

            <h5>Secure Storage Service Interface</h5>
            <pre><code>// services/SecureStorage.ts

interface SecureStorageService {
    /**
     * Store tokens with optional biometric protection
     * @param tokens - Auth tokens to store
     * @param requireBiometric - Require biometric to access
     */
    storeTokens(tokens: AuthTokens, requireBiometric?: boolean): Promise&lt;void&gt;;

    /**
     * Retrieve tokens (may trigger biometric prompt)
     * @param promptMessage - Message to show in biometric prompt
     */
    getTokens(promptMessage?: string): Promise&lt;AuthTokens | null&gt;;

    /**
     * Get tokens without biometric (for background refresh)
     * Only works if tokens were stored without biometric requirement
     */
    getTokensWithoutBiometric(): Promise&lt;AuthTokens | null&gt;;

    /**
     * Clear all stored tokens
     */
    clearTokens(): Promise&lt;void&gt;;

    /**
     * Get or create persistent device ID
     */
    getDeviceId(): Promise&lt;string&gt;;

    /**
     * Check if tokens exist (without decrypting)
     */
    hasTokens(): Promise&lt;boolean&gt;;
}</code></pre>

            <h5>iOS Platform Bridge (Keychain with Secure Enclave)</h5>
            <pre><code>// ios/SecureStorageModule.swift
import Security
import LocalAuthentication

@objc(SecureStorageModule)
class SecureStorageModule: NSObject {

    private let service = "com.app.auth"

    @objc func storeTokens(
        _ tokensJson: String,
        requireBiometric: Bool,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let data = tokensJson.data(using: .utf8) else {
            rejecter("ENCODE_ERROR", "Failed to encode tokens", nil)
            return
        }

        // Create access control flags
        var accessControl: SecAccessControl?
        if requireBiometric {
            accessControl = SecAccessControlCreateWithFlags(
                nil,
                kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
                [.biometryCurrentSet, .privateKeyUsage],
                nil
            )
        }

        // Build query
        var query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: "auth_tokens",
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
        ]

        if let ac = accessControl {
            query[kSecAttrAccessControl as String] = ac
        }

        // Use Secure Enclave if available
        if SecureEnclave.isAvailable {
            query[kSecAttrTokenID as String] = kSecAttrTokenIDSecureEnclave
        }

        // Delete existing then add
        SecItemDelete(query as CFDictionary)
        let status = SecItemAdd(query as CFDictionary, nil)

        if status == errSecSuccess {
            resolver(["stored": true])
        } else {
            rejecter("STORE_ERROR", "Failed to store: \(status)", nil)
        }
    }

    @objc func getTokens(
        _ promptMessage: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        // Create LAContext for biometric
        let context = LAContext()
        context.localizedReason = promptMessage

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: "auth_tokens",
            kSecReturnData as String: true,
            kSecUseAuthenticationContext as String: context,
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &amp;result)

        if status == errSecSuccess, let data = result as? Data,
           let json = String(data: data, encoding: .utf8) {
            resolver(json)
        } else if status == errSecUserCanceled {
            rejecter("USER_CANCELED", "Biometric canceled", nil)
        } else {
            rejecter("NOT_FOUND", "Tokens not found", nil)
        }
    }

    @objc func clearTokens(
        _ resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: "auth_tokens",
        ]

        let status = SecItemDelete(query as CFDictionary)
        resolver(status == errSecSuccess || status == errSecItemNotFound)
    }
}</code></pre>

            <h5>Android Platform Bridge (Keystore with BiometricPrompt)</h5>
            <pre><code>// android/app/src/main/java/com/example/SecureStorageModule.kt
package com.example.app

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

class SecureStorageModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
    private val prefs = reactContext.getSharedPreferences("secure_storage", Context.MODE_PRIVATE)
    private val keyAlias = "auth_tokens_key"

    override fun getName() = "SecureStorageModule"

    @ReactMethod
    fun storeTokens(tokensJson: String, requireBiometric: Boolean, promise: Promise) {
        try {
            val key = getOrCreateKey(requireBiometric)
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.ENCRYPT_MODE, key)

            val encrypted = cipher.doFinal(tokensJson.toByteArray())
            val iv = cipher.iv

            // Store encrypted data and IV
            prefs.edit()
                .putString("encrypted_tokens", android.util.Base64.encodeToString(encrypted, 0))
                .putString("iv", android.util.Base64.encodeToString(iv, 0))
                .apply()

            promise.resolve(Arguments.createMap().apply {
                putBoolean("stored", true)
            })
        } catch (e: Exception) {
            promise.reject("STORE_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getTokens(promptMessage: String, promise: Promise) {
        val activity = currentActivity as? FragmentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No activity")
            return
        }

        val encryptedStr = prefs.getString("encrypted_tokens", null)
        val ivStr = prefs.getString("iv", null)

        if (encryptedStr == null || ivStr == null) {
            promise.reject("NOT_FOUND", "Tokens not found")
            return
        }

        val encrypted = android.util.Base64.decode(encryptedStr, 0)
        val iv = android.util.Base64.decode(ivStr, 0)

        // Setup cipher for decryption
        val key = keyStore.getKey(keyAlias, null) as SecretKey
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        cipher.init(Cipher.DECRYPT_MODE, key, GCMParameterSpec(128, iv))

        // Check if biometric is required for key
        val biometricPrompt = BiometricPrompt(
            activity,
            ContextCompat.getMainExecutor(reactContext),
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    try {
                        val decrypted = result.cryptoObject?.cipher?.doFinal(encrypted)
                            ?: cipher.doFinal(encrypted)
                        promise.resolve(String(decrypted))
                    } catch (e: Exception) {
                        promise.reject("DECRYPT_ERROR", e.message)
                    }
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    promise.reject("AUTH_ERROR", errString.toString())
                }

                override fun onAuthenticationFailed() {
                    // Don't reject - user can retry
                }
            }
        )

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Authentication Required")
            .setSubtitle(promptMessage)
            .setNegativeButtonText("Cancel")
            .setAllowedAuthenticators(
                BiometricManager.Authenticators.BIOMETRIC_STRONG or
                BiometricManager.Authenticators.DEVICE_CREDENTIAL
            )
            .build()

        biometricPrompt.authenticate(promptInfo, BiometricPrompt.CryptoObject(cipher))
    }

    private fun getOrCreateKey(requireBiometric: Boolean): SecretKey {
        if (keyStore.containsAlias(keyAlias)) {
            return keyStore.getKey(keyAlias, null) as SecretKey
        }

        val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")

        val builder = KeyGenParameterSpec.Builder(
            keyAlias,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
        )
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .setKeySize(256)

        if (requireBiometric) {
            builder
                .setUserAuthenticationRequired(true)
                .setUserAuthenticationParameters(0, KeyProperties.AUTH_BIOMETRIC_STRONG)
                .setInvalidatedByBiometricEnrollment(true)
        }

        // Use StrongBox if available
        if (android.os.Build.VERSION.SDK_INT &gt;= android.os.Build.VERSION_CODES.P) {
            builder.setIsStrongBoxBacked(true)
        }

        keyGenerator.init(builder.build())
        return keyGenerator.generateKey()
    }
}</code></pre>

            <h5>Token Refresh Interceptor (Axios)</h5>
            <pre><code>// services/ApiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

class ApiClient {
    private client: AxiosInstance;
    private accessToken: string | null = null;
    private isRefreshing = false;
    private refreshSubscribers: ((token: string) =&gt; void)[] = [];

    constructor(baseURL: string) {
        this.client = axios.create({ baseURL, timeout: 30000 });
        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor: add access token
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) =&gt; {
                if (this.accessToken) {
                    config.headers.Authorization = \`Bearer \${this.accessToken}\`;
                }
                return config;
            }
        );

        // Response interceptor: handle 401 and refresh
        this.client.interceptors.response.use(
            (response) =&gt; response,
            async (error: AxiosError) =&gt; {
                const originalRequest = error.config as InternalAxiosRequestConfig &amp; { _retry?: boolean };

                // Only handle 401 Unauthorized
                if (error.response?.status !== 401 || originalRequest._retry) {
                    return Promise.reject(error);
                }

                // If already refreshing, queue this request
                if (this.isRefreshing) {
                    return new Promise((resolve) =&gt; {
                        this.refreshSubscribers.push((newToken: string) =&gt; {
                            originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
                            resolve(this.client(originalRequest));
                        });
                    });
                }

                originalRequest._retry = true;
                this.isRefreshing = true;

                try {
                    const newToken = await this.performTokenRefresh();

                    // Notify all queued requests
                    this.refreshSubscribers.forEach((callback) =&gt; callback(newToken));
                    this.refreshSubscribers = [];

                    // Retry original request
                    originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
                    return this.client(originalRequest);

                } catch (refreshError) {
                    // Refresh failed - logout user
                    this.refreshSubscribers = [];
                    await useAuthStore.getState().logout();
                    throw refreshError;

                } finally {
                    this.isRefreshing = false;
                }
            }
        );
    }

    private async performTokenRefresh(): Promise&lt;string&gt; {
        const tokens = await secureStorage.getTokensWithoutBiometric();
        if (!tokens?.refreshToken) {
            throw new Error('No refresh token');
        }

        const response = await axios.post(\`\${this.client.defaults.baseURL}/auth/refresh\`, {
            refreshToken: tokens.refreshToken,
            deviceId: await getDeviceId(),
        });

        const newTokens = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            accessTokenExpiresAt: Date.now() + response.data.expiresIn * 1000,
            refreshTokenExpiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        };

        await secureStorage.storeTokens(newTokens);
        this.accessToken = newTokens.accessToken;

        return newTokens.accessToken;
    }

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    clearAccessToken() {
        this.accessToken = null;
    }
}</code></pre>

            <h4>O - Optimizations and Deep Dive</h4>

            <h5>Authentication Flow Diagram</h5>
            <pre><code>AUTHENTICATION FLOW
===================

User Opens App
      │
      ▼
┌───────────────────────────────────────────────────────────────────┐
│                    INITIAL AUTH CHECK                             │
├───────────────────────────────────────────────────────────────────┤
│  1. Check for stored refresh token (no biometric yet)            │
│  2. If found and not expired → Show biometric prompt             │
│  3. If not found or expired → Show login screen                  │
└───────────────────────────────────────────────────────────────────┘
      │
      ▼
┌───────────────────────────────────────────────────────────────────┐
│                    LOGIN FLOW                                     │
├───────────────────────────────────────────────────────────────────┤
│  Email/Password → Server validates → Returns:                     │
│  ├── Success: access_token + refresh_token                       │
│  ├── MFA Required: mfa_token + available methods                 │
│  └── Error: INVALID_CREDENTIALS / ACCOUNT_LOCKED                 │
│                                                                   │
│  If MFA Required:                                                 │
│  └── User enters code → Server validates → Returns tokens        │
└───────────────────────────────────────────────────────────────────┘
      │
      ▼
┌───────────────────────────────────────────────────────────────────┐
│                    TOKEN STORAGE                                  │
├───────────────────────────────────────────────────────────────────┤
│  1. Generate encryption key (Secure Enclave / StrongBox)         │
│  2. Encrypt tokens with key                                       │
│  3. Store encrypted tokens in Keychain/Keystore                  │
│  4. Configure biometric requirement for access                    │
│  5. Store access token in memory for API calls                   │
└───────────────────────────────────────────────────────────────────┘
      │
      ▼
┌───────────────────────────────────────────────────────────────────┐
│                    TOKEN REFRESH CYCLE                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  API Request ────────────────────────────────────────────────┐   │
│       │                                                       │   │
│       ▼                                                       │   │
│  Access Token Valid? ─── YES ────────────────────────────▶ Success│
│       │                                                           │
│       NO (401)                                                    │
│       │                                                           │
│       ▼                                                           │
│  Already Refreshing? ─── YES ──▶ Queue request                   │
│       │                              │                            │
│       NO                             ▼                            │
│       │                         Wait for new token                │
│       ▼                              │                            │
│  Call /auth/refresh                  │                            │
│       │                              │                            │
│       ▼                              │                            │
│  Store new tokens                    │                            │
│       │                              │                            │
│       ▼                              │                            │
│  Retry original request ◀────────────┘                           │
│       │                                                           │
│       ▼                                                           │
│    Success                                                        │
└───────────────────────────────────────────────────────────────────┘</code></pre>

            <h5>Performance Optimizations</h5>
            <table>
                <tr><th>Problem</th><th>Solution</th><th>Impact</th></tr>
                <tr><td>Biometric prompt latency</td><td>Pre-warm LocalAuthentication context on app foreground</td><td>200-400ms faster biometric prompt</td></tr>
                <tr><td>Concurrent 401 responses</td><td>Request queue with single refresh, replay all pending</td><td>Prevents token refresh race conditions</td></tr>
                <tr><td>Token expiration checks</td><td>Proactive refresh 1 min before expiry</td><td>Eliminates user-facing 401 errors</td></tr>
                <tr><td>Keychain access latency</td><td>Cache device ID in memory after first read</td><td>50ms saved per API request</td></tr>
                <tr><td>OAuth callback handling</td><td>Deep link with state validation</td><td>Secure redirect without WebView</td></tr>
            </table>

            <h5>Platform-Specific Considerations</h5>
            <table>
                <tr><th>Aspect</th><th>iOS</th><th>Android</th></tr>
                <tr><td>Secure storage</td><td>Keychain with Secure Enclave (A7+)</td><td>Keystore with StrongBox (Pixel 3+) or TEE</td></tr>
                <tr><td>Biometric API</td><td>LocalAuthentication (Face ID / Touch ID)</td><td>BiometricPrompt (Fingerprint / Face)</td></tr>
                <tr><td>Key protection</td><td>kSecAttrAccessibleWhenUnlockedThisDeviceOnly</td><td>setUserAuthenticationRequired(true)</td></tr>
                <tr><td>Biometric invalidation</td><td>kSecAccessControlBiometryCurrentSet</td><td>setInvalidatedByBiometricEnrollment(true)</td></tr>
                <tr><td>Background access</td><td>Not allowed with biometric protection</td><td>Not allowed with biometric protection</td></tr>
                <tr><td>Fallback auth</td><td>Device passcode optional</td><td>DEVICE_CREDENTIAL authenticator</td></tr>
            </table>

            <h5>Edge Cases and Error Handling</h5>
            <ol>
                <li><strong>Biometric enrollment change:</strong> Keys bound to biometryCurrentSet are automatically invalidated when fingerprints change. Detect errSecAuthFailed and prompt re-authentication.</li>
                <li><strong>Concurrent 401 responses:</strong> Queue all failed requests during refresh, replay with new token after success. Prevents multiple refresh calls.</li>
                <li><strong>Refresh token rotation race:</strong> Server should accept both old and new refresh token briefly (grace period) to handle simultaneous refresh from multiple requests.</li>
                <li><strong>Device compromise:</strong> Support remote session revocation via sessions list. Revoked session returns 403 which triggers local logout.</li>
                <li><strong>App backgrounded during auth:</strong> Persist auth state to AsyncStorage, resume on foreground with AppState listener.</li>
                <li><strong>Biometric not enrolled:</strong> Check isEnrolledAsync before attempting. Fall back to full re-authentication if biometric unavailable.</li>
                <li><strong>Biometric lockout:</strong> After 5 failures, biometric is temporarily disabled. Show passcode fallback or wait indicator.</li>
                <li><strong>Network failure during refresh:</strong> Retry with exponential backoff. After 3 failures, show offline mode or re-login prompt.</li>
                <li><strong>Clock skew:</strong> Use server time from response headers to calculate token expiration instead of device clock.</li>
                <li><strong>Jailbreak/root detection:</strong> Check for compromise and warn user or disable sensitive features.</li>
            </ol>

            <h5>Trade-offs and Alternatives</h5>
            <table>
                <tr><th>Decision</th><th>Chosen</th><th>Alternative</th><th>Why Chosen</th></tr>
                <tr><td>Token storage</td><td>Hardware keychain</td><td>Encrypted AsyncStorage</td><td>Hardware isolation prevents extraction even with device access</td></tr>
                <tr><td>Access token lifetime</td><td>15 minutes</td><td>1 hour</td><td>Shorter lifetime limits exposure window</td></tr>
                <tr><td>Refresh token rotation</td><td>One-time use</td><td>Long-lived reusable</td><td>Prevents token theft replay attacks</td></tr>
                <tr><td>Biometric requirement</td><td>Required for token access</td><td>Optional convenience</td><td>Defense in depth - device access insufficient</td></tr>
                <tr><td>OAuth flow</td><td>Authorization Code + PKCE</td><td>Implicit flow</td><td>PKCE is more secure, implicit is deprecated</td></tr>
                <tr><td>State management</td><td>Zustand with persistence</td><td>Redux with redux-persist</td><td>Simpler API, smaller bundle, sufficient for auth</td></tr>
            </table>

            <h5>Testing Strategy</h5>
            <table>
                <tr><th>Test Type</th><th>Coverage</th><th>Tools</th></tr>
                <tr><td>Unit Tests</td><td>Auth state transitions, token parsing, error handling</td><td>Jest</td></tr>
                <tr><td>Integration Tests</td><td>API interceptors, token refresh flow, storage operations</td><td>Jest + MSW</td></tr>
                <tr><td>E2E Tests</td><td>Full login flows, biometric mocking, session management</td><td>Detox</td></tr>
                <tr><td>Security Tests</td><td>Token storage verification, biometric bypass attempts</td><td>Frida, OWASP ZAP</td></tr>
            </table>

            <h5>Interview Discussion Points</h5>
            <p><strong>Q: Why use short-lived access tokens with refresh tokens?</strong></p>
            <p>A: Short-lived access tokens (15 min) limit the damage window if compromised - an attacker has limited time before the token expires. Refresh tokens enable seamless UX without re-login while allowing server-side revocation. The refresh token is stored securely and only used to obtain new access tokens.</p>

            <p><strong>Q: Why is PKCE required for mobile OAuth?</strong></p>
            <p>A: Mobile apps cannot securely store client secrets (they can be extracted from APK/IPA). PKCE (Proof Key for Code Exchange) replaces the client secret with a dynamically generated code verifier/challenge pair. This prevents authorization code interception attacks since the attacker doesn't have the original verifier.</p>

            <p><strong>Q: What's the benefit of Secure Enclave/StrongBox?</strong></p>
            <p>A: These are separate security processors with their own encrypted memory. Keys generated in the enclave never leave it - even the main CPU can't read them. The enclave only performs cryptographic operations when biometric authentication succeeds. This means even a fully compromised OS can't extract tokens.</p>

            <p><strong>Q: How do you handle token refresh race conditions?</strong></p>
            <p>A: Use a single-flight pattern: when the first 401 triggers a refresh, set a flag and queue subsequent requests. All queued requests wait for the single refresh to complete, then replay with the new token. This prevents multiple concurrent refresh calls which could cause rotation conflicts.</p>

            <p><strong>Q: When should biometric be required vs optional?</strong></p>
            <p>A: For sensitive apps (banking, health), biometric should gate all token access. For social/entertainment apps, biometric can be optional convenience. Consider adaptive authentication: require biometric for sensitive actions (transfers, settings changes) even if not required for general access.</p>

            <h5>Library Recommendations</h5>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Secure storage</td><td>react-native-keychain</td><td>Cross-platform Keychain/Keystore with biometric support</td></tr>
                <tr><td>Biometric auth</td><td>expo-local-authentication</td><td>Simple API abstracting Face ID / Touch ID / Fingerprint</td></tr>
                <tr><td>OAuth flows</td><td>react-native-app-auth</td><td>RFC-compliant PKCE implementation for all providers</td></tr>
                <tr><td>State management</td><td>Zustand</td><td>Lightweight state with persistence middleware</td></tr>
                <tr><td>API client</td><td>Axios</td><td>Interceptors for automatic token refresh</td></tr>
                <tr><td>MFA TOTP</td><td>otpauth</td><td>RFC 6238 compliant TOTP generation</td></tr>
                <tr><td>Device info</td><td>react-native-device-info</td><td>Device ID, model, OS version for session tracking</td></tr>
                <tr><td>Encrypted storage</td><td>react-native-mmkv</td><td>Fast encrypted key-value for user profile cache</td></tr>
            </table>
        `
     },
    {
        id: 89,
        category: "System Design",
        icon: "🏛️",
        question: "How would you architect secure storage for sensitive user data?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            &lt;h4&gt;R - Requirements Exploration&lt;/h4&gt;

            &lt;h5&gt;Clarifying Questions to Ask&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Data classification:&lt;/strong&gt; What types of sensitive data need storage (credentials, PII, health data, financial info)?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Compliance requirements:&lt;/strong&gt; Which regulations apply (GDPR, HIPAA, PCI-DSS, SOC 2)?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Access patterns:&lt;/strong&gt; Is data accessed frequently (sub-second) or occasionally (can tolerate latency)?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Biometric policy:&lt;/strong&gt; Which data requires biometric authentication before access?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Device support:&lt;/strong&gt; What's the minimum iOS/Android version? Can we require hardware security?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Backup strategy:&lt;/strong&gt; Should encrypted data sync across devices or be device-only?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Key management:&lt;/strong&gt; What's the key rotation policy? How to handle key compromise?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Data lifecycle:&lt;/strong&gt; How long is data retained? Secure deletion requirements?&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Functional Requirements&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Tiered storage based on data sensitivity classification (critical, sensitive, internal, public)&lt;/li&gt;
                &lt;li&gt;Hardware-backed encryption for credentials and tokens (Secure Enclave / StrongBox)&lt;/li&gt;
                &lt;li&gt;Encrypted database for PII and structured sensitive data&lt;/li&gt;
                &lt;li&gt;Biometric protection for critical data access (configurable per data type)&lt;/li&gt;
                &lt;li&gt;Secure key generation using platform cryptographic APIs&lt;/li&gt;
                &lt;li&gt;Key rotation without data loss or downtime&lt;/li&gt;
                &lt;li&gt;Data integrity verification (checksums) to detect tampering&lt;/li&gt;
                &lt;li&gt;Audit logging for sensitive data access (without exposing data)&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Non-Functional Requirements&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Zero plaintext storage of sensitive data at rest&lt;/li&gt;
                &lt;li&gt;OWASP MASVS L2 compliance for security-critical apps&lt;/li&gt;
                &lt;li&gt;Sub-50ms read latency for encrypted data (synchronous access)&lt;/li&gt;
                &lt;li&gt;Secure data deletion with memory wiping&lt;/li&gt;
                &lt;li&gt;Graceful degradation on devices without hardware security&lt;/li&gt;
                &lt;li&gt;Support GDPR right to erasure (verifiable deletion)&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Out of Scope&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Server-side encryption and key management (HSM)&lt;/li&gt;
                &lt;li&gt;Network transport security (TLS configuration)&lt;/li&gt;
                &lt;li&gt;User authentication flows (covered in auth question)&lt;/li&gt;
                &lt;li&gt;Jailbreak/root detection and app attestation&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h4&gt;A - Architecture / High-level Design&lt;/h4&gt;

            &lt;h5&gt;System Architecture Diagram&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                    SECURE STORAGE ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    APPLICATION LAYER                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ SecureStore │  │ DataClassify │  │  AuditLogger    │  │  │
│  │  │   Facade    │  │    Engine    │  │                 │  │  │
│  │  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘  │  │
│  └─────────┼────────────────┼──────────────────┼────────────┘  │
│            │                │                   │                │
│  ┌─────────▼────────────────▼───────────────────▼────────────┐  │
│  │                  ENCRYPTION LAYER                          │  │
│  │  ┌──────────────────┐  ┌───────────────────────────────┐  │  │
│  │  │  Key Management  │  │  Encryption Engine (AES-256)  │  │  │
│  │  │  • Generation    │  │  • Encrypt/Decrypt            │  │  │
│  │  │  • Rotation      │  │  • Authenticated encryption   │  │  │
│  │  │  • Derivation    │  │  • Memory protection          │  │  │
│  │  └────────┬─────────┘  └───────────────────────────────┘  │  │
│  └───────────┼───────────────────────────────────────────────┘  │
│              │                                                   │
│  ┌───────────▼───────────────────────────────────────────────┐  │
│  │                   STORAGE TIERS                            │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  TIER 1: CRITICAL (Hardware Security)                │ │  │
│  │  │  iOS: Keychain + Secure Enclave (kSecAttrTokenID)    │ │  │
│  │  │  Android: Keystore + StrongBox/TEE                   │ │  │
│  │  │  Data: Auth tokens, API keys, encryption keys        │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  TIER 2: SENSITIVE (Encrypted Database)              │ │  │
│  │  │  SQLCipher / Realm Encryption                        │ │  │
│  │  │  Key stored in Tier 1                                │ │  │
│  │  │  Data: PII, health data, financial records           │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  TIER 3: INTERNAL (Encrypted Key-Value)              │ │  │
│  │  │  MMKV with encryption enabled                        │ │  │
│  │  │  Data: User preferences, app state, drafts           │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  TIER 4: PUBLIC (Unencrypted)                        │ │  │
│  │  │  AsyncStorage / UserDefaults                         │ │  │
│  │  │  Data: Theme, locale, onboarding flags               │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    NATIVE SECURITY                          │  │
│  │  iOS: Data Protection API │ Android: EncryptedSharedPrefs  │  │
│  │       File Protection       │         AndroidKeystore        │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Component Overview&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Component&lt;/th&gt;&lt;th&gt;Responsibility&lt;/th&gt;&lt;th&gt;Technology&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;SecureStorageFacade&lt;/td&gt;&lt;td&gt;Unified API for all storage tiers&lt;/td&gt;&lt;td&gt;TypeScript service class&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;DataClassifier&lt;/td&gt;&lt;td&gt;Routes data to appropriate tier based on classification&lt;/td&gt;&lt;td&gt;Classification rules engine&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;KeyManager&lt;/td&gt;&lt;td&gt;Key generation, rotation, and derivation&lt;/td&gt;&lt;td&gt;Platform crypto APIs&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;EncryptionEngine&lt;/td&gt;&lt;td&gt;AES-256-GCM encryption/decryption&lt;/td&gt;&lt;td&gt;react-native-quick-crypto&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Tier1Storage&lt;/td&gt;&lt;td&gt;Hardware-backed storage for critical data&lt;/td&gt;&lt;td&gt;Keychain / Keystore&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Tier2Storage&lt;/td&gt;&lt;td&gt;Encrypted database for structured sensitive data&lt;/td&gt;&lt;td&gt;SQLCipher / Realm&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Tier3Storage&lt;/td&gt;&lt;td&gt;Encrypted key-value for internal data&lt;/td&gt;&lt;td&gt;MMKV with encryption&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;AuditLogger&lt;/td&gt;&lt;td&gt;Logs access to sensitive data without exposing values&lt;/td&gt;&lt;td&gt;Structured logging&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Key Architecture Decisions&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Decision&lt;/th&gt;&lt;th&gt;Choice&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Storage tier model&lt;/td&gt;&lt;td&gt;4-tier classification&lt;/td&gt;&lt;td&gt;Balances security with performance; critical data gets hardware protection&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encryption algorithm&lt;/td&gt;&lt;td&gt;AES-256-GCM&lt;/td&gt;&lt;td&gt;Industry standard, authenticated encryption, hardware-accelerated&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Key storage&lt;/td&gt;&lt;td&gt;Hardware-backed (Secure Enclave / StrongBox)&lt;/td&gt;&lt;td&gt;Keys never leave hardware; extraction-resistant even with device access&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Database encryption&lt;/td&gt;&lt;td&gt;SQLCipher (page-level)&lt;/td&gt;&lt;td&gt;Transparent encryption; works with existing SQLite queries&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Key-value store&lt;/td&gt;&lt;td&gt;MMKV over AsyncStorage&lt;/td&gt;&lt;td&gt;10x faster, native encryption support, synchronous API&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Integrity verification&lt;/td&gt;&lt;td&gt;SHA-256 checksums&lt;/td&gt;&lt;td&gt;Detects tampering and corruption&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;D - Data Model / Core Entities&lt;/h4&gt;

            &lt;h5&gt;Core Entities&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// Type definitions for secure storage
interface DataClassification {
  tier: 'critical' | 'sensitive' | 'internal' | 'public';
  requiresBiometric: boolean;
  encryptionRequired: boolean;
  auditAccess: boolean;
  ttlSeconds?: number;
}

interface SecureStorageConfig {
  classifications: Record&lt;string, DataClassification&gt;;
  keyRotationIntervalDays: number;
  enableAuditLogging: boolean;
  biometricFallbackEnabled: boolean;
}

interface StorageItem&lt;T&gt; {
  data: T;
  metadata: {
    createdAt: number;
    accessedAt: number;
    version: number;
    classification: string;
    checksum: string;
  };
}

interface KeyInfo {
  keyId: string;
  algorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305';
  createdAt: number;
  rotatedAt?: number;
  hardwareBacked: boolean;
}

// Secure storage facade
import * as Keychain from 'react-native-keychain';
import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';

const DATA_CLASSIFICATIONS: Record&lt;string, DataClassification&gt; = {
  auth_token: { tier: 'critical', requiresBiometric: false, encryptionRequired: true, auditAccess: true },
  refresh_token: { tier: 'critical', requiresBiometric: false, encryptionRequired: true, auditAccess: true },
  encryption_key: { tier: 'critical', requiresBiometric: true, encryptionRequired: true, auditAccess: true },
  user_pii: { tier: 'sensitive', requiresBiometric: false, encryptionRequired: true, auditAccess: true },
  health_data: { tier: 'sensitive', requiresBiometric: true, encryptionRequired: true, auditAccess: true },
  payment_info: { tier: 'sensitive', requiresBiometric: true, encryptionRequired: true, auditAccess: true },
  preferences: { tier: 'internal', requiresBiometric: false, encryptionRequired: true, auditAccess: false },
  cache: { tier: 'public', requiresBiometric: false, encryptionRequired: false, auditAccess: false },
};

class SecureStorageManager {
  private encryptedMMKV: MMKV;
  private publicMMKV: MMKV;
  private auditLogger: AuditLogger;
  private keyManager: KeyManager;

  constructor() {
    this.auditLogger = new AuditLogger();
    this.keyManager = new KeyManager();
  }

  async initialize(): Promise&lt;void&gt; {
    // Initialize key manager first
    await this.keyManager.initialize();

    // Get or create database encryption key
    const dbKey = await this.keyManager.getDatabaseKey();

    // Initialize encrypted MMKV for internal tier
    this.encryptedMMKV = new MMKV({
      id: 'secure-storage',
      encryptionKey: dbKey,
    });

    // Public storage (no encryption)
    this.publicMMKV = new MMKV({ id: 'public-storage' });
  }

  async store&lt;T&gt;(key: string, data: T, classification: string): Promise&lt;void&gt; {
    const config = DATA_CLASSIFICATIONS[classification];
    if (!config) throw new Error(\`Unknown classification: \${classification}\`);

    const item: StorageItem&lt;T&gt; = {
      data,
      metadata: {
        createdAt: Date.now(),
        accessedAt: Date.now(),
        version: 1,
        classification,
        checksum: await this.computeChecksum(data),
      },
    };

    switch (config.tier) {
      case 'critical':
        await this.storeCritical(key, item, config);
        break;
      case 'sensitive':
        await this.storeSensitive(key, item);
        break;
      case 'internal':
        this.encryptedMMKV.set(key, JSON.stringify(item));
        break;
      case 'public':
        this.publicMMKV.set(key, JSON.stringify(item));
        break;
    }

    if (config.auditAccess) {
      this.auditLogger.log('WRITE', key, classification);
    }
  }

  async retrieve&lt;T&gt;(key: string, classification: string): Promise&lt;T | null&gt; {
    const config = DATA_CLASSIFICATIONS[classification];
    if (!config) throw new Error(\`Unknown classification: \${classification}\`);

    let item: StorageItem&lt;T&gt; | null = null;

    switch (config.tier) {
      case 'critical':
        item = await this.retrieveCritical(key, config);
        break;
      case 'sensitive':
        item = await this.retrieveSensitive(key);
        break;
      case 'internal':
        const internalRaw = this.encryptedMMKV.getString(key);
        item = internalRaw ? JSON.parse(internalRaw) : null;
        break;
      case 'public':
        const publicRaw = this.publicMMKV.getString(key);
        item = publicRaw ? JSON.parse(publicRaw) : null;
        break;
    }

    if (item) {
      // Verify integrity
      const checksum = await this.computeChecksum(item.data);
      if (checksum !== item.metadata.checksum) {
        this.auditLogger.log('INTEGRITY_VIOLATION', key, classification);
        throw new Error('Data integrity check failed');
      }

      if (config.auditAccess) {
        this.auditLogger.log('READ', key, classification);
      }
    }

    return item?.data ?? null;
  }

  private async storeCritical&lt;T&gt;(
    key: string,
    item: StorageItem&lt;T&gt;,
    config: DataClassification
  ): Promise&lt;void&gt; {
    const options: Keychain.Options = {
      service: key,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    };

    if (config.requiresBiometric) {
      options.accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
    }

    await Keychain.setGenericPassword(
      key,
      JSON.stringify(item),
      options
    );
  }

  private async retrieveCritical&lt;T&gt;(
    key: string,
    config: DataClassification
  ): Promise&lt;StorageItem&lt;T&gt; | null&gt; {
    const options: Keychain.Options = { service: key };

    if (config.requiresBiometric) {
      options.authenticationPrompt = {
        title: 'Authentication Required',
        subtitle: 'Verify your identity to access secure data',
      };
    }

    const result = await Keychain.getGenericPassword(options);
    if (!result) return null;
    return JSON.parse(result.password);
  }

  async secureDelete(key: string, classification: string): Promise&lt;void&gt; {
    const config = DATA_CLASSIFICATIONS[classification];

    switch (config.tier) {
      case 'critical':
        await Keychain.resetGenericPassword({ service: key });
        break;
      case 'sensitive':
        await this.sensitiveDB?.delete(key);
        break;
      case 'internal':
        this.encryptedMMKV.delete(key);
        break;
      case 'public':
        this.publicMMKV.delete(key);
        break;
    }

    this.auditLogger.log('DELETE', key, classification);
  }

  private async computeChecksum(data: unknown): Promise&lt;string&gt; {
    const str = JSON.stringify(data);
    // Use expo-crypto or react-native-quick-crypto
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      str
    );
    return hash;
  }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Entity Relationships&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────────────────┐
│                         ENTITY RELATIONSHIPS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐                                                       │
│  │ DataClassification│                                                      │
│  │   • tier          │                                                      │
│  │   • requiresBio   │                                                      │
│  │   • encryption    │                                                      │
│  └────────┬─────────┘                                                       │
│           │ classifies                                                      │
│           ▼                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐                         │
│  │   StorageItem    │ 1     1 │    KeyInfo       │                         │
│  │   • data         │─────────│    • keyId       │                         │
│  │   • metadata     │encrypted│    • algorithm   │                         │
│  │   • checksum     │   by    │    • hardwareBacked│                       │
│  └──────────────────┘         └──────────────────┘                         │
│                                        │                                     │
│                                        │ stored in                          │
│                                        ▼                                     │
│                               ┌──────────────────┐                          │
│                               │   StorageTier    │                          │
│                               │   • Tier1: Keychain                         │
│                               │   • Tier2: SQLCipher                        │
│                               │   • Tier3: MMKV                             │
│                               │   • Tier4: AsyncStorage                     │
│                               └──────────────────┘                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Storage Strategy&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Tier&lt;/th&gt;&lt;th&gt;Data Examples&lt;/th&gt;&lt;th&gt;Storage&lt;/th&gt;&lt;th&gt;Protection&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Critical&lt;/td&gt;&lt;td&gt;Auth tokens, API keys, encryption keys&lt;/td&gt;&lt;td&gt;Keychain / Keystore&lt;/td&gt;&lt;td&gt;Secure Enclave / StrongBox&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Sensitive&lt;/td&gt;&lt;td&gt;PII, health data, payment info&lt;/td&gt;&lt;td&gt;SQLCipher database&lt;/td&gt;&lt;td&gt;AES-256, key in Tier 1&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Internal&lt;/td&gt;&lt;td&gt;User preferences, app state, drafts&lt;/td&gt;&lt;td&gt;MMKV (encrypted)&lt;/td&gt;&lt;td&gt;AES-256 encryption&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Public&lt;/td&gt;&lt;td&gt;Theme, locale, feature flags&lt;/td&gt;&lt;td&gt;AsyncStorage / MMKV&lt;/td&gt;&lt;td&gt;None (non-sensitive)&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;I - Interface Definition (API)&lt;/h4&gt;

            &lt;h5&gt;Secure Storage Service Interface&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// services/SecureStorage.ts

interface SecureStorageService {
    /**
     * Initialize storage with key generation
     */
    initialize(): Promise&lt;void&gt;;

    /**
     * Store data with automatic classification routing
     * @param key - Unique identifier for the data
     * @param data - Data to store
     * @param classification - Data classification (determines storage tier)
     */
    store&lt;T&gt;(key: string, data: T, classification: string): Promise&lt;void&gt;;

    /**
     * Retrieve data (may trigger biometric prompt for critical data)
     * @param key - Unique identifier for the data
     * @param classification - Data classification
     */
    retrieve&lt;T&gt;(key: string, classification: string): Promise&lt;T | null&gt;;

    /**
     * Securely delete data with memory wiping
     * @param key - Unique identifier for the data
     * @param classification - Data classification
     */
    secureDelete(key: string, classification: string): Promise&lt;void&gt;;

    /**
     * Rotate encryption keys without data loss
     * @param keyId - Key identifier to rotate
     */
    rotateKey(keyId: string): Promise&lt;void&gt;;

    /**
     * Clear all data for a specific classification
     * @param classification - Classification to clear
     */
    clearClassification(classification: string): Promise&lt;void&gt;;
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;iOS Platform Bridge (Keychain with Secure Enclave)&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// SecureStorageModule.swift
import Foundation
import Security
import LocalAuthentication

@objc(SecureStorageModule)
class SecureStorageModule: NSObject {

    enum SecurityLevel {
        case standard           // kSecAttrAccessibleWhenUnlocked
        case afterFirstUnlock   // kSecAttrAccessibleAfterFirstUnlock
        case deviceOnly         // kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        case secureEnclave      // Hardware-backed with biometric
    }

    @objc func storeWithSecureEnclave(
        _ key: String,
        value: String,
        requireBiometric: Bool,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        var error: Unmanaged&lt;CFError&gt;?

        // Create access control with Secure Enclave
        var accessFlags: SecAccessControlCreateFlags = [.privateKeyUsage]
        if requireBiometric {
            accessFlags.insert(.biometryCurrentSet)
        }

        guard let accessControl = SecAccessControlCreateWithFlags(
            kCFAllocatorDefault,
            kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
            accessFlags,
            &amp;error
        ) else {
            rejecter("ACCESS_CONTROL_ERROR", "Failed to create access control", error?.takeRetainedValue())
            return
        }

        // Generate key in Secure Enclave for encryption
        let keyParams: [String: Any] = [
            kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
            kSecAttrKeySizeInBits as String: 256,
            kSecAttrTokenID as String: kSecAttrTokenIDSecureEnclave,
            kSecPrivateKeyAttrs as String: [
                kSecAttrIsPermanent as String: true,
                kSecAttrApplicationTag as String: "com.app.securekey.\(key)".data(using: .utf8)!,
                kSecAttrAccessControl as String: accessControl
            ]
        ]

        guard let privateKey = SecKeyCreateRandomKey(keyParams as CFDictionary, &amp;error) else {
            rejecter("KEY_GEN_ERROR", "Failed to generate Secure Enclave key", error?.takeRetainedValue())
            return
        }

        // Get public key for encryption
        guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
            rejecter("PUBLIC_KEY_ERROR", "Failed to get public key", nil)
            return
        }

        // Encrypt data with public key
        guard let valueData = value.data(using: .utf8),
              let encryptedData = SecKeyCreateEncryptedData(
                  publicKey,
                  .eciesEncryptionCofactorX963SHA256AESGCM,
                  valueData as CFData,
                  &amp;error
              ) else {
            rejecter("ENCRYPTION_ERROR", "Failed to encrypt data", error?.takeRetainedValue())
            return
        }

        // Store encrypted data in Keychain
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "com.app.securestorage",
            kSecAttrAccount as String: key,
            kSecValueData as String: encryptedData,
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        ]

        // Delete existing item first
        SecItemDelete(query as CFDictionary)

        let status = SecItemAdd(query as CFDictionary, nil)
        if status == errSecSuccess {
            resolver(["success": true])
        } else {
            rejecter("STORE_ERROR", "Failed to store encrypted data: \(status)", nil)
        }
    }

    @objc func retrieveWithBiometric(
        _ key: String,
        reason: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        let context = LAContext()
        context.localizedReason = reason

        // Query for encrypted data
        let dataQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "com.app.securestorage",
            kSecAttrAccount as String: key,
            kSecReturnData as String: true
        ]

        var dataResult: AnyObject?
        let dataStatus = SecItemCopyMatching(dataQuery as CFDictionary, &amp;dataResult)

        guard dataStatus == errSecSuccess,
              let encryptedData = dataResult as? Data else {
            rejecter("NOT_FOUND", "No data found for key", nil)
            return
        }

        // Query for private key (will trigger biometric)
        let keyQuery: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
            kSecAttrApplicationTag as String: "com.app.securekey.\(key)".data(using: .utf8)!,
            kSecAttrKeyClass as String: kSecAttrKeyClassPrivate,
            kSecReturnRef as String: true,
            kSecUseAuthenticationContext as String: context
        ]

        var keyResult: AnyObject?
        let keyStatus = SecItemCopyMatching(keyQuery as CFDictionary, &amp;keyResult)

        guard keyStatus == errSecSuccess else {
            if keyStatus == errSecUserCanceled {
                rejecter("USER_CANCELED", "Biometric authentication canceled", nil)
            } else {
                rejecter("KEY_ERROR", "Failed to retrieve key: \(keyStatus)", nil)
            }
            return
        }

        let privateKey = keyResult as! SecKey
        var error: Unmanaged&lt;CFError&gt;?

        // Decrypt data
        guard let decryptedData = SecKeyCreateDecryptedData(
            privateKey,
            .eciesEncryptionCofactorX963SHA256AESGCM,
            encryptedData as CFData,
            &amp;error
        ) else {
            rejecter("DECRYPT_ERROR", "Failed to decrypt data", error?.takeRetainedValue())
            return
        }

        if let value = String(data: decryptedData as Data, encoding: .utf8) {
            resolver(["value": value])
        } else {
            rejecter("DECODE_ERROR", "Failed to decode decrypted data", nil)
        }
    }

    // Secure deletion with memory wiping
    @objc func secureDelete(_ key: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        // Delete encrypted data
        let dataQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "com.app.securestorage",
            kSecAttrAccount as String: key
        ]
        SecItemDelete(dataQuery as CFDictionary)

        // Delete Secure Enclave key
        let keyQuery: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrApplicationTag as String: "com.app.securekey.\(key)".data(using: .utf8)!
        ]
        SecItemDelete(keyQuery as CFDictionary)

        resolver(["success": true])
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Android Platform Bridge (Keystore with StrongBox)&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// SecureStorageModule.kt
package com.app.securestorage

import android.os.Build
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import androidx.biometric.BiometricPrompt
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import android.util.Base64
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

class SecureStorageModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
    private val GCM_TAG_LENGTH = 128
    private val IV_LENGTH = 12

    override fun getName() = "SecureStorageModule"

    @ReactMethod
    fun storeWithStrongBox(
        key: String,
        value: String,
        requireBiometric: Boolean,
        promise: Promise
    ) {
        try {
            val secretKey = getOrCreateKey(key, requireBiometric)
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.ENCRYPT_MODE, secretKey)

            val iv = cipher.iv
            val encryptedBytes = cipher.doFinal(value.toByteArray(Charsets.UTF_8))

            // Combine IV + encrypted data
            val combined = ByteArray(iv.size + encryptedBytes.size)
            System.arraycopy(iv, 0, combined, 0, iv.size)
            System.arraycopy(encryptedBytes, 0, combined, iv.size, encryptedBytes.size)

            // Store in EncryptedSharedPreferences
            val masterKey = MasterKey.Builder(reactApplicationContext)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val encryptedPrefs = EncryptedSharedPreferences.create(
                reactApplicationContext,
                "secure_storage",
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

            encryptedPrefs.edit()
                .putString(key, Base64.encodeToString(combined, Base64.NO_WRAP))
                .apply()

            promise.resolve(Arguments.createMap().apply {
                putBoolean("success", true)
            })
        } catch (e: Exception) {
            promise.reject("STORE_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun retrieveWithBiometric(
        key: String,
        promptTitle: String,
        promptSubtitle: String,
        promise: Promise
    ) {
        val activity = currentActivity as? FragmentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No activity available")
            return
        }

        try {
            // Get encrypted data
            val masterKey = MasterKey.Builder(reactApplicationContext)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val encryptedPrefs = EncryptedSharedPreferences.create(
                reactApplicationContext,
                "secure_storage",
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

            val encoded = encryptedPrefs.getString(key, null)
            if (encoded == null) {
                promise.reject("NOT_FOUND", "No data found for key")
                return
            }

            val combined = Base64.decode(encoded, Base64.NO_WRAP)
            val iv = combined.copyOfRange(0, IV_LENGTH)
            val encryptedBytes = combined.copyOfRange(IV_LENGTH, combined.size)

            // Get key and create cipher for biometric
            val secretKey = keyStore.getKey(key, null) as SecretKey
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.DECRYPT_MODE, secretKey, GCMParameterSpec(GCM_TAG_LENGTH, iv))

            // Show biometric prompt
            val promptInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle(promptTitle)
                .setSubtitle(promptSubtitle)
                .setNegativeButtonText("Cancel")
                .build()

            val biometricPrompt = BiometricPrompt(
                activity,
                { it.run() },
                object : BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                        try {
                            val decryptCipher = result.cryptoObject?.cipher ?: cipher
                            val decrypted = String(decryptCipher.doFinal(encryptedBytes), Charsets.UTF_8)
                            promise.resolve(Arguments.createMap().apply {
                                putString("value", decrypted)
                            })
                        } catch (e: Exception) {
                            promise.reject("DECRYPT_ERROR", e.message, e)
                        }
                    }

                    override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                        promise.reject("AUTH_ERROR", errString.toString())
                    }

                    override fun onAuthenticationFailed() {
                        // Don't reject yet, allow retry
                    }
                }
            )

            activity.runOnUiThread {
                biometricPrompt.authenticate(promptInfo, BiometricPrompt.CryptoObject(cipher))
            }
        } catch (e: Exception) {
            promise.reject("RETRIEVE_ERROR", e.message, e)
        }
    }

    private fun getOrCreateKey(alias: String, requireBiometric: Boolean): SecretKey {
        keyStore.getKey(alias, null)?.let { return it as SecretKey }

        val builder = KeyGenParameterSpec.Builder(
            alias,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
        )
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .setKeySize(256)

        // Use StrongBox if available (Pixel 3+, Samsung S10+)
        if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.P) {
            builder.setIsStrongBoxBacked(true)
        }

        if (requireBiometric) {
            builder.setUserAuthenticationRequired(true)
            if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.R) {
                builder.setUserAuthenticationParameters(
                    0, // Require auth every time
                    KeyProperties.AUTH_BIOMETRIC_STRONG
                )
            } else {
                @Suppress("DEPRECATION")
                builder.setUserAuthenticationValidityDurationSeconds(-1)
            }
        }

        val keyGenerator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES,
            "AndroidKeyStore"
        )
        keyGenerator.init(builder.build())
        return keyGenerator.generateKey()
    }

    @ReactMethod
    fun secureDelete(key: String, promise: Promise) {
        try {
            // Delete from Keystore
            if (keyStore.containsAlias(key)) {
                keyStore.deleteEntry(key)
            }

            // Delete from EncryptedSharedPreferences
            val masterKey = MasterKey.Builder(reactApplicationContext)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val encryptedPrefs = EncryptedSharedPreferences.create(
                reactApplicationContext,
                "secure_storage",
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

            encryptedPrefs.edit().remove(key).apply()

            promise.resolve(Arguments.createMap().apply {
                putBoolean("success", true)
            })
        } catch (e: Exception) {
            promise.reject("DELETE_ERROR", e.message, e)
        }
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Key Management Service&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// Key rotation and derivation
class KeyManager {
  private readonly KEY_VERSION_KEY = 'key_version';
  private readonly CURRENT_VERSION = 2;

  async initialize(): Promise&lt;void&gt; {
    const storedVersion = await this.getKeyVersion();

    if (storedVersion &lt; this.CURRENT_VERSION) {
      await this.migrateKeys(storedVersion, this.CURRENT_VERSION);
    }
  }

  async getDatabaseKey(): Promise&lt;string&gt; {
    const keyId = 'database_encryption_key';

    // Try to retrieve existing key
    const existingKey = await Keychain.getGenericPassword({ service: keyId });
    if (existingKey) {
      return existingKey.password;
    }

    // Generate new 256-bit key
    const newKey = await this.generateSecureKey(32);

    await Keychain.setGenericPassword(keyId, newKey, {
      service: keyId,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    });

    return newKey;
  }

  async rotateKey(keyId: string): Promise&lt;void&gt; {
    // 1. Generate new key
    const newKey = await this.generateSecureKey(32);

    // 2. Re-encrypt all data with new key
    const oldKey = await this.getKey(keyId);
    await this.reEncryptData(keyId, oldKey, newKey);

    // 3. Store new key
    await this.storeKey(keyId, newKey);

    // 4. Securely delete old key
    await this.secureDeleteKey(\`\${keyId}_old\`);

    // 5. Update version
    await this.incrementKeyVersion();
  }

  private async generateSecureKey(bytes: number): Promise&lt;string&gt; {
    // Use platform-native secure random
    const randomBytes = await Crypto.getRandomBytesAsync(bytes);
    return Buffer.from(randomBytes).toString('base64');
  }

  private async deriveKey(
    masterKey: string,
    salt: string,
    purpose: string
  ): Promise&lt;string&gt; {
    // HKDF key derivation
    const info = \`\${purpose}-v\${this.CURRENT_VERSION}\`;
    // Use react-native-quick-crypto for HKDF
    const derived = await hkdf(masterKey, salt, info, 32);
    return Buffer.from(derived).toString('base64');
  }

  private async migrateKeys(
    fromVersion: number,
    toVersion: number
  ): Promise&lt;void&gt; {
    console.log(\`Migrating keys from v\${fromVersion} to v\${toVersion}\`);

    // Version-specific migrations
    if (fromVersion &lt; 2) {
      // v1 -&gt; v2: Upgrade to hardware-backed keys
      await this.upgradeToHardwareBacked();
    }

    await AsyncStorage.setItem(this.KEY_VERSION_KEY, toVersion.toString());
  }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;O - Optimizations and Deep Dive&lt;/h4&gt;

            &lt;h5&gt;Data Flow Diagram&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                    SECURE STORAGE DATA FLOW                      │
└─────────────────────────────────────────────────────────────────┘

WRITE FLOW:
┌─────────┐    ┌───────────────┐    ┌──────────────┐    ┌─────────┐
│ App     │───▶│ Classify Data │───▶│ Select Tier  │───▶│ Route   │
│ Request │    │ (PII? Token?) │    │ Based on     │    │         │
└─────────┘    └───────────────┘    │ Sensitivity  │    └────┬────┘
                                    └──────────────┘         │
                    ┌────────────────────────────────────────┤
                    ▼                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
            │ Tier 1:      │    │ Tier 2:      │    │ Tier 3/4:    │
            │ Keychain/    │    │ Get DB key   │    │ Direct store │
            │ Keystore     │    │ from Tier 1  │    │ MMKV/Async   │
            └──────────────┘    └──────┬───────┘    └──────────────┘
                                       ▼
                                ┌──────────────┐
                                │ Encrypt with │
                                │ SQLCipher    │
                                └──────────────┘

READ FLOW (Biometric-Protected):
┌─────────┐    ┌───────────────┐    ┌──────────────┐    ┌─────────┐
│ App     │───▶│ Check if      │───▶│ YES: Trigger │───▶│ Verify  │
│ Request │    │ Biometric     │    │ Face ID/     │    │ Success │
└─────────┘    │ Required      │    │ Fingerprint  │    └────┬────┘
               └───────┬───────┘    └──────────────┘         │
                       │ NO                                   │
                       ▼                                      ▼
               ┌──────────────┐                       ┌──────────────┐
               │ Direct       │                       │ Unlock Secure│
               │ Retrieval    │                       │ Enclave Key  │
               └──────┬───────┘                       └──────┬───────┘
                      │                                      │
                      ▼                                      ▼
               ┌──────────────────────────────────────────────────┐
               │  Decrypt Data → Verify Checksum → Return         │
               └──────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Performance Optimizations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Problem&lt;/th&gt;&lt;th&gt;Solution&lt;/th&gt;&lt;th&gt;Impact&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Slow encrypted reads&lt;/td&gt;&lt;td&gt;Use MMKV instead of AsyncStorage for tier 3&lt;/td&gt;&lt;td&gt;10x faster reads (sync vs async)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Keychain latency&lt;/td&gt;&lt;td&gt;Cache non-biometric items in memory after first read&lt;/td&gt;&lt;td&gt;~50ms saved per subsequent access&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encryption overhead&lt;/td&gt;&lt;td&gt;Use hardware-accelerated AES (available on all modern devices)&lt;/td&gt;&lt;td&gt;Near-zero CPU overhead&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Key derivation time&lt;/td&gt;&lt;td&gt;Pre-derive keys on app launch in background&lt;/td&gt;&lt;td&gt;Eliminates derivation latency on first use&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Large data encryption&lt;/td&gt;&lt;td&gt;Stream encryption for files &gt; 1MB&lt;/td&gt;&lt;td&gt;Constant memory usage regardless of size&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Platform-Specific Considerations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Aspect&lt;/th&gt;&lt;th&gt;iOS&lt;/th&gt;&lt;th&gt;Android&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Hardware security&lt;/td&gt;&lt;td&gt;Secure Enclave (A7+ chips)&lt;/td&gt;&lt;td&gt;StrongBox (Pixel 3+, Samsung S10+) or TEE&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Key accessibility&lt;/td&gt;&lt;td&gt;kSecAttrAccessibleWhenUnlockedThisDeviceOnly&lt;/td&gt;&lt;td&gt;setUserAuthenticationRequired(true)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Biometric binding&lt;/td&gt;&lt;td&gt;kSecAccessControlBiometryCurrentSet&lt;/td&gt;&lt;td&gt;setInvalidatedByBiometricEnrollment(true)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Backup behavior&lt;/td&gt;&lt;td&gt;Keychain items excluded from iCloud backup by default with ThisDeviceOnly&lt;/td&gt;&lt;td&gt;Use android:allowBackup="false" or exclude specific keys&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;App reinstall&lt;/td&gt;&lt;td&gt;Keychain persists - check for orphaned keys&lt;/td&gt;&lt;td&gt;Keystore cleared on uninstall&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Fallback&lt;/td&gt;&lt;td&gt;Software-based encryption if Secure Enclave unavailable&lt;/td&gt;&lt;td&gt;TEE if StrongBox unavailable, software if neither&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Edge Cases and Error Handling&lt;/h5&gt;
            &lt;ol&gt;
                &lt;li&gt;&lt;strong&gt;Biometric enrollment change:&lt;/strong&gt; Keys bound to biometryCurrentSet are automatically invalidated when fingerprints change. Detect errSecAuthFailed and re-authenticate user fully.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Device migration:&lt;/strong&gt; iOS Keychain with ThisDeviceOnly won't sync to new device. Implement secure re-authentication flow for device transfers.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Jailbreak/root detection:&lt;/strong&gt; Check device integrity using attestation APIs before storing critical data. Warn user or disable features on compromised devices.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Memory protection:&lt;/strong&gt; Zero-fill sensitive byte arrays after use. Avoid storing passwords as JavaScript strings (immutable, garbage collected unpredictably).&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Hardware unavailability:&lt;/strong&gt; Fall back gracefully when Secure Enclave/StrongBox not available. Use software encryption with clear security level indication.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;App reinstall (iOS):&lt;/strong&gt; Keychain persists after uninstall. Check for orphaned keys on first launch and offer to clear or recover.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Key rotation failure:&lt;/strong&gt; Implement atomic rotation with backup key. Roll back to old key if re-encryption fails partway.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Checksum mismatch:&lt;/strong&gt; Data tampering detected. Log audit event, invalidate data, require fresh fetch from server.&lt;/li&gt;
            &lt;/ol&gt;

            &lt;h5&gt;Trade-offs and Alternatives&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Decision&lt;/th&gt;&lt;th&gt;Chosen&lt;/th&gt;&lt;th&gt;Alternative&lt;/th&gt;&lt;th&gt;Why Chosen&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Tier 1 storage&lt;/td&gt;&lt;td&gt;Platform Keychain/Keystore&lt;/td&gt;&lt;td&gt;Custom encryption file&lt;/td&gt;&lt;td&gt;Hardware backing provides extraction resistance&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Tier 2 storage&lt;/td&gt;&lt;td&gt;SQLCipher&lt;/td&gt;&lt;td&gt;Realm Encryption&lt;/td&gt;&lt;td&gt;SQLCipher is more widely audited; Realm has simpler API&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Tier 3 storage&lt;/td&gt;&lt;td&gt;MMKV&lt;/td&gt;&lt;td&gt;AsyncStorage + encryption&lt;/td&gt;&lt;td&gt;10x faster, native encryption, synchronous&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encryption algorithm&lt;/td&gt;&lt;td&gt;AES-256-GCM&lt;/td&gt;&lt;td&gt;ChaCha20-Poly1305&lt;/td&gt;&lt;td&gt;AES has hardware acceleration on all devices&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Key derivation&lt;/td&gt;&lt;td&gt;HKDF&lt;/td&gt;&lt;td&gt;PBKDF2&lt;/td&gt;&lt;td&gt;HKDF is faster; PBKDF2 better for password-derived keys&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Testing Strategy&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Test Type&lt;/th&gt;&lt;th&gt;Coverage&lt;/th&gt;&lt;th&gt;Tools&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Unit Tests&lt;/td&gt;&lt;td&gt;Encryption/decryption, checksum validation, classification routing&lt;/td&gt;&lt;td&gt;Jest + mocked native modules&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Integration Tests&lt;/td&gt;&lt;td&gt;Full storage flows, key rotation, tier routing&lt;/td&gt;&lt;td&gt;Jest with actual native modules&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;E2E Tests&lt;/td&gt;&lt;td&gt;Biometric flows (mocked), data persistence across app restarts&lt;/td&gt;&lt;td&gt;Detox&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Security Audit&lt;/td&gt;&lt;td&gt;Verify no plaintext storage, memory analysis, extraction attempts&lt;/td&gt;&lt;td&gt;Frida, objection, OWASP tools&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Interview Discussion Points&lt;/h5&gt;
            &lt;p&gt;&lt;strong&gt;Q: What's the difference between Secure Enclave and software encryption?&lt;/strong&gt;&lt;/p&gt;
            &lt;p&gt;A: Secure Enclave is a separate security processor with its own encrypted memory. Keys generated inside never leave the enclave—even the main CPU can't read them. Software encryption stores keys in regular memory, which could be extracted via memory dump, debugger, or on a jailbroken device. Secure Enclave provides hardware-level isolation.&lt;/p&gt;

            &lt;p&gt;&lt;strong&gt;Q: How do you handle key rotation without downtime?&lt;/strong&gt;&lt;/p&gt;
            &lt;p&gt;A: Use atomic rotation: (1) Generate new key, (2) Keep old key as backup, (3) Re-encrypt all data with new key in a transaction, (4) Verify all data accessible with new key, (5) Delete old key. If any step fails, roll back to old key. For large datasets, use incremental migration during background processing.&lt;/p&gt;

            &lt;p&gt;&lt;strong&gt;Q: How do you comply with GDPR right to erasure?&lt;/strong&gt;&lt;/p&gt;
            &lt;p&gt;A: Implement verifiable deletion: (1) Delete encryption keys (making data unreadable), (2) Overwrite storage locations, (3) Clear all backup copies, (4) Log deletion event for audit trail. For hardware-backed keys, delete the key alias which makes data permanently unrecoverable.&lt;/p&gt;

            &lt;p&gt;&lt;strong&gt;Q: What threats does this architecture protect against?&lt;/strong&gt;&lt;/p&gt;
            &lt;p&gt;A: It protects against: (1) Device theft - data encrypted at rest, biometric required for critical data, (2) Malicious apps - hardware isolation prevents cross-app access, (3) Memory dumps - sensitive data zeroed after use, keys in hardware, (4) Network interception - data encrypted before network calls, (5) Database theft - SQLCipher page-level encryption. It does NOT fully protect against: sophisticated attackers with physical access to jailbroken devices.&lt;/p&gt;

            &lt;h5&gt;Library Recommendations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Concern&lt;/th&gt;&lt;th&gt;Library&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Keychain/Keystore&lt;/td&gt;&lt;td&gt;react-native-keychain&lt;/td&gt;&lt;td&gt;Hardware-backed, biometric support, cross-platform&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encrypted KV&lt;/td&gt;&lt;td&gt;react-native-mmkv&lt;/td&gt;&lt;td&gt;10x faster than AsyncStorage, native encryption support&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encrypted DB&lt;/td&gt;&lt;td&gt;react-native-quick-sqlite + SQLCipher&lt;/td&gt;&lt;td&gt;AES-256 page encryption, synchronous API, SQL flexibility&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Crypto operations&lt;/td&gt;&lt;td&gt;react-native-quick-crypto&lt;/td&gt;&lt;td&gt;Native crypto primitives, HKDF, PBKDF2, hashing&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Biometrics&lt;/td&gt;&lt;td&gt;expo-local-authentication&lt;/td&gt;&lt;td&gt;Unified API for Face ID, Touch ID, fingerprint&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Secure random&lt;/td&gt;&lt;td&gt;expo-crypto&lt;/td&gt;&lt;td&gt;Cryptographically secure random byte generation&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Integrity checks&lt;/td&gt;&lt;td&gt;jail-monkey&lt;/td&gt;&lt;td&gt;Jailbreak/root detection for risk assessment&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;
        `
     },
    {
        id: 90,
        category: "System Design",
        icon: "🏛️",
        question: "Design an error tracking and crash reporting system",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            &lt;h4&gt;R - Requirements Exploration&lt;/h4&gt;

            &lt;h5&gt;Clarifying Questions to Ask&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Error types:&lt;/strong&gt; Which errors need tracking (JS exceptions, native crashes, ANR, OOM)?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Volume expectations:&lt;/strong&gt; How many DAU? What's the expected crash rate?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Privacy requirements:&lt;/strong&gt; What PII scrubbing is needed for GDPR/CCPA compliance?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Alerting needs:&lt;/strong&gt; Who should be notified? What thresholds trigger alerts?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Existing tools:&lt;/strong&gt; Any existing error tracking or APM tools to integrate with?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Release process:&lt;/strong&gt; How often are releases? CodePush/OTA updates used?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Cost constraints:&lt;/strong&gt; Budget for error tracking services? Need sampling?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Debug info:&lt;/strong&gt; What context is needed beyond stack traces (breadcrumbs, user actions)?&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Functional Requirements&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Capture JS exceptions, unhandled promise rejections, and native crashes&lt;/li&gt;
                &lt;li&gt;Automatic source map symbolication for readable stack traces&lt;/li&gt;
                &lt;li&gt;Breadcrumb trail of user actions leading to crash (navigation, network, UI events)&lt;/li&gt;
                &lt;li&gt;User context and device info attached to every report&lt;/li&gt;
                &lt;li&gt;Release tracking with regression detection and commit association&lt;/li&gt;
                &lt;li&gt;Error grouping/deduplication to reduce noise and identify unique issues&lt;/li&gt;
                &lt;li&gt;Alert configuration for Slack, PagerDuty, email notifications&lt;/li&gt;
                &lt;li&gt;React Error Boundary integration with user-facing recovery UI&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Non-Functional Requirements&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Zero impact on app launch time (&lt;10ms SDK initialization)&lt;/li&gt;
                &lt;li&gt;Offline error queueing with automatic sync on reconnection&lt;/li&gt;
                &lt;li&gt;PII scrubbing for GDPR/privacy compliance (emails, phones, passwords)&lt;/li&gt;
                &lt;li&gt;Sample rate control to manage costs at scale (configurable per environment)&lt;/li&gt;
                &lt;li&gt;99.9% of errors captured and delivered to backend&lt;/li&gt;
                &lt;li&gt;Support Hermes bytecode symbolication&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Out of Scope&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Custom error tracking backend (will use Sentry/Crashlytics)&lt;/li&gt;
                &lt;li&gt;Real-time error streaming dashboard&lt;/li&gt;
                &lt;li&gt;Root cause analysis AI/ML&lt;/li&gt;
                &lt;li&gt;Integration with ticketing systems (Jira, Linear)&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h4&gt;A - Architecture / High-level Design&lt;/h4&gt;

            &lt;h5&gt;System Architecture Diagram&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                ERROR TRACKING ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   CAPTURE LAYER                            │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ JS Errors   │  │ React Error  │  │ Native Crashes  │  │  │
│  │  │ • try/catch │  │ Boundaries   │  │ • iOS NSException│  │  │
│  │  │ • Promise   │  │ • Component  │  │ • Android Signal│  │  │
│  │  │   rejection │  │   Stack      │  │ • OOM/ANR       │  │  │
│  │  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘  │  │
│  └─────────┼────────────────┼──────────────────┼────────────┘  │
│            └────────────────┼──────────────────┘                │
│                             ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                 ENRICHMENT LAYER                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ Breadcrumbs │  │ User Context │  │ Device/App      │  │  │
│  │  │ • Navigation│  │ • ID, email  │  │ • OS version    │  │  │
│  │  │ • Network   │  │ • Subscription│ │ • App version   │  │  │
│  │  │ • UI Events │  │ • Segment    │  │ • Memory/CPU    │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                 PROCESSING LAYER                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ PII Scrub   │  │ Sampling     │  │ Offline Queue   │  │  │
│  │  │ • Emails    │  │ • Rate limit │  │ • Persist       │  │  │
│  │  │ • Passwords │  │ • Throttle   │  │ • Batch send    │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  BACKEND SERVICES                          │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │                    Sentry                             │ │  │
│  │  │  ┌────────────┐  ┌───────────┐  ┌────────────────┐  │ │  │
│  │  │  │ Symbolicat │  │ Grouping  │  │ Alerting       │  │ │  │
│  │  │  │ • JS maps  │  │ • Fingerpr│  │ • Slack        │  │ │  │
│  │  │  │ • dSYM     │  │ • Rules   │  │ • PagerDuty    │  │ │  │
│  │  │  │ • Proguard │  │ • Merging │  │ • Thresholds   │  │ │  │
│  │  │  └────────────┘  └───────────┘  └────────────────┘  │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  BUILD PIPELINE                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ CI/CD: Upload source maps, dSYMs, Proguard mappings │  │  │
│  │  │        Create releases, associate commits           │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Component Overview&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Component&lt;/th&gt;&lt;th&gt;Responsibility&lt;/th&gt;&lt;th&gt;Technology&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;JS Error Handler&lt;/td&gt;&lt;td&gt;Catch exceptions, promise rejections, console errors&lt;/td&gt;&lt;td&gt;Sentry JavaScript SDK&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;React Error Boundary&lt;/td&gt;&lt;td&gt;Catch component render errors with recovery UI&lt;/td&gt;&lt;td&gt;React Component + Sentry&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Native Crash Handler&lt;/td&gt;&lt;td&gt;Capture iOS NSExceptions, Android signals, ANR&lt;/td&gt;&lt;td&gt;Sentry Native SDK&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Breadcrumb Collector&lt;/td&gt;&lt;td&gt;Track user actions, navigation, network requests&lt;/td&gt;&lt;td&gt;Sentry Integrations&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;PII Scrubber&lt;/td&gt;&lt;td&gt;Remove emails, phones, passwords from payloads&lt;/td&gt;&lt;td&gt;Custom beforeSend hook&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Offline Queue&lt;/td&gt;&lt;td&gt;Persist errors when offline, sync on reconnect&lt;/td&gt;&lt;td&gt;Sentry Envelope Transport&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Symbolication Pipeline&lt;/td&gt;&lt;td&gt;Map minified JS and native stacks to source&lt;/td&gt;&lt;td&gt;sentry-cli + CI/CD&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Alert Manager&lt;/td&gt;&lt;td&gt;Send notifications for new/spiking errors&lt;/td&gt;&lt;td&gt;Sentry Alerts + Slack/PagerDuty&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Key Architecture Decisions&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Decision&lt;/th&gt;&lt;th&gt;Choice&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Error tracking service&lt;/td&gt;&lt;td&gt;Sentry&lt;/td&gt;&lt;td&gt;Best-in-class RN support, source maps, native crashes, APM&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;SDK initialization&lt;/td&gt;&lt;td&gt;Lazy with bootstrap&lt;/td&gt;&lt;td&gt;Zero app launch impact, cache previous session's config&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Breadcrumb strategy&lt;/td&gt;&lt;td&gt;100 max, auto-collect navigation/network&lt;/td&gt;&lt;td&gt;Balance context vs payload size&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;PII handling&lt;/td&gt;&lt;td&gt;Client-side scrubbing in beforeSend&lt;/td&gt;&lt;td&gt;Prevent sensitive data leaving device&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Sampling approach&lt;/td&gt;&lt;td&gt;Configurable per environment&lt;/td&gt;&lt;td&gt;100% in dev, 20% traces in prod for cost control&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Symbol upload&lt;/td&gt;&lt;td&gt;CI/CD pipeline automation&lt;/td&gt;&lt;td&gt;Ensure every release has symbolication data&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;D - Data Model / Core Entities&lt;/h4&gt;

            &lt;h5&gt;Core Entities&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// types/errorTracking.ts

/**
 * Represents a captured error event with full context
 */
interface ErrorEvent {
  id: string;
  timestamp: number;
  type: 'js_error' | 'promise_rejection' | 'native_crash' | 'anr';
  message: string;
  stack?: StackFrame[];
  breadcrumbs: Breadcrumb[];
  context: ErrorContext;
  tags: Record&lt;string, string&gt;;
  extra: Record&lt;string, unknown&gt;;
}

interface StackFrame {
  filename: string;
  function: string;
  lineno: number;
  colno: number;
  in_app: boolean;
}

interface Breadcrumb {
  timestamp: number;
  category: 'navigation' | 'network' | 'ui' | 'console' | 'user';
  message: string;
  level: 'debug' | 'info' | 'warning' | 'error';
  data?: Record&lt;string, unknown&gt;;
}

interface ErrorContext {
  user: { id: string; email?: string; segment?: string };
  device: { os: string; osVersion: string; model: string; memory: number };
  app: { version: string; build: string; environment: string };
  release: { id: string; commit?: string };
}

/**
 * Configuration for PII scrubbing patterns
 */
interface PIIScrubConfig {
  patterns: Array&lt;{ regex: RegExp; replacement: string; description: string }&gt;;
  sensitiveKeys: string[];
  enabled: boolean;
}

/**
 * Offline error queue entry
 */
interface QueuedError {
  id: string;
  envelope: Uint8Array;
  queuedAt: number;
  retryCount: number;
  priority: 'critical' | 'high' | 'normal';
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Entity Relationships&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                   ERROR TRACKING ENTITY MODEL                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐     1:N     ┌─────────────────┐
│ ErrorEvent  │────────────▶│  StackFrame[]   │
│             │             │  (ordered list) │
└──────┬──────┘             └─────────────────┘
       │
       │ 1:N
       ▼
┌─────────────────┐
│  Breadcrumb[]   │
│  (last 100)     │
└─────────────────┘

┌─────────────┐     1:1     ┌─────────────────┐
│ ErrorEvent  │────────────▶│  ErrorContext   │
│             │             │                 │
└─────────────┘             └────────┬────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │ 1:1            │ 1:1            │ 1:1
                    ▼                ▼                ▼
             ┌───────────┐   ┌───────────┐   ┌───────────┐
             │   User    │   │  Device   │   │    App    │
             │ Context   │   │  Context  │   │  Context  │
             └───────────┘   └───────────┘   └───────────┘

┌─────────────┐     N:1     ┌─────────────────┐
│ ErrorEvent  │────────────▶│    Release      │
│             │             │ (version+build) │
└─────────────┘             └─────────────────┘

┌─────────────┐     N:N     ┌─────────────────┐
│ ErrorEvent  │────────────▶│      Tags       │
│             │             │ (key-value)     │
└─────────────┘             └─────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Storage Strategy&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Data Type&lt;/th&gt;&lt;th&gt;Storage&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;SDK Configuration&lt;/td&gt;&lt;td&gt;In-memory (Sentry SDK)&lt;/td&gt;&lt;td&gt;Fast access, persists for session duration&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Offline Error Queue&lt;/td&gt;&lt;td&gt;Sentry Envelope Store (SQLite)&lt;/td&gt;&lt;td&gt;Survive app restart, automatic retry&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Breadcrumbs&lt;/td&gt;&lt;td&gt;Ring buffer (memory)&lt;/td&gt;&lt;td&gt;Last 100, O(1) insert, no persistence needed&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;User Context&lt;/td&gt;&lt;td&gt;Sentry Scope (memory)&lt;/td&gt;&lt;td&gt;Set once per session, cleared on logout&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Session Data&lt;/td&gt;&lt;td&gt;Sentry Session Store (disk)&lt;/td&gt;&lt;td&gt;Track session health, crash-free rate&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Source Maps / dSYMs&lt;/td&gt;&lt;td&gt;Sentry Cloud Storage&lt;/td&gt;&lt;td&gt;Uploaded during CI/CD, linked to releases&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;I - Interface Definition (API)&lt;/h4&gt;

            &lt;h5&gt;Error Tracking Service Interface&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// services/errorTracking.ts

import * as Sentry from '@sentry/react-native';

/**
 * Error tracking service providing unified interface for Sentry operations
 */
interface ErrorTrackingService {
  /**
   * Initialize error tracking SDK with configuration
   * @returns Promise resolving when SDK is ready
   */
  initialize(config: ErrorTrackingConfig): Promise&lt;void&gt;;

  /**
   * Set user context for all subsequent error reports
   */
  setUser(user: { id: string; email?: string; segment?: string } | null): void;

  /**
   * Capture an exception with optional context
   * @returns Event ID for reference
   */
  captureException(error: Error, context?: Record&lt;string, unknown&gt;): string;

  /**
   * Capture a custom message at specified severity level
   */
  captureMessage(message: string, level: SeverityLevel): string;

  /**
   * Add a breadcrumb for debugging context
   */
  addBreadcrumb(breadcrumb: BreadcrumbInput): void;

  /**
   * Set a tag that will be attached to all events
   */
  setTag(key: string, value: string): void;

  /**
   * Set extra context data
   */
  setExtra(key: string, value: unknown): void;

  /**
   * Start a performance transaction
   */
  startTransaction(name: string, op: string): Transaction;

  /**
   * Flush all pending events before app close
   */
  flush(timeout?: number): Promise&lt;boolean&gt;;
}

interface ErrorTrackingConfig {
  dsn: string;
  environment: 'development' | 'staging' | 'production';
  release: string;
  dist?: string;
  tracesSampleRate: number;
  enableNativeCrashHandling: boolean;
  beforeSend?: (event: SentryEvent) =&gt; SentryEvent | null;
}

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

// Comprehensive Sentry initialization
import * as Sentry from '@sentry/react-native';
import { CaptureConsole, HttpClient, ReactNativeTracing } from '@sentry/integrations';

export function initializeErrorTracking(): void {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: __DEV__ ? 'development' : 'production',
    release: \`\${APP_NAME}@\${APP_VERSION}+\${BUILD_NUMBER}\`,
    dist: BUILD_NUMBER,

    // Performance monitoring
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    profilesSampleRate: __DEV__ ? 1.0 : 0.1,

    // Session tracking
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,

    // Integrations
    integrations: [
      new ReactNativeTracing({
        tracingOrigins: ['api.myapp.com', /^\\/api/],
        routingInstrumentation: Sentry.reactNavigationIntegration,
      }),
      new CaptureConsole({ levels: ['error', 'warn'] }),
      new HttpClient(),
    ],

    // Event processing
    beforeSend(event, hint) {
      return processEvent(event, hint);
    },

    beforeBreadcrumb(breadcrumb) {
      return processBreadcrumb(breadcrumb);
    },

    // Attachment limits
    maxBreadcrumbs: 100,
    attachStacktrace: true,
    normalizeDepth: 5,
  });
}

function processEvent(
  event: Sentry.Event,
  hint: Sentry.EventHint
): Sentry.Event | null {
  // 1. Filter out known non-issues
  const message = event.exception?.values?.[0]?.value || '';
  const ignoredPatterns = [
    /Network request failed/i,
    /timeout of \\d+ms exceeded/i,
    /ResizeObserver loop/i,
  ];

  if (ignoredPatterns.some(pattern =&gt; pattern.test(message))) {
    return null;
  }

  // 2. Scrub PII
  event = scrubPII(event);

  // 3. Add custom fingerprinting for better grouping
  if (message.includes('ChunkLoadError')) {
    event.fingerprint = ['chunk-load-error', '{{ default }}'];
  }

  // 4. Enrich with app state
  event.contexts = {
    ...event.contexts,
    state: {
      isOnline: NetInfo.isConnected,
      memoryWarning: lastMemoryWarning,
      screenName: currentScreen,
    },
  };

  return event;
}

function scrubPII(event: Sentry.Event): Sentry.Event {
  const piiPatterns = [
    { pattern: /\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z]{2,}\\b/gi, replacement: '[EMAIL]' },
    { pattern: /\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b/g, replacement: '[PHONE]' },
    { pattern: /\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b/g, replacement: '[CARD]' },
    { pattern: /"password"\\s*:\\s*"[^"]*"/gi, replacement: '"password": "[REDACTED]"' },
    { pattern: /"token"\\s*:\\s*"[^"]*"/gi, replacement: '"token": "[REDACTED]"' },
  ];

  const scrub = (obj: unknown): unknown =&gt; {
    if (typeof obj === 'string') {
      return piiPatterns.reduce(
        (str, { pattern, replacement }) =&gt; str.replace(pattern, replacement),
        obj
      );
    }
    if (Array.isArray(obj)) return obj.map(scrub);
    if (obj &amp;&amp; typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) =&gt; [k, scrub(v)])
      );
    }
    return obj;
  };

  return scrub(event) as Sentry.Event;
}

// Error boundary with recovery
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

export class ErrorBoundary extends Component&lt;
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
&gt; {
  state: ErrorBoundaryState = { hasError: false, error: null, eventId: null };

  static getDerivedStateFromError(error: Error): Partial&lt;ErrorBoundaryState&gt; {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: { componentStack: errorInfo.componentStack },
      },
    });
    this.setState({ eventId });

    // Track error recovery attempts
    Sentry.addBreadcrumb({
      category: 'error_boundary',
      message: 'Error caught by boundary',
      level: 'error',
      data: { componentStack: errorInfo.componentStack?.slice(0, 500) },
    });
  }

  handleRetry = (): void =&gt; {
    Sentry.addBreadcrumb({
      category: 'user',
      message: 'User attempted error recovery',
      level: 'info',
    });
    this.setState({ hasError: false, error: null, eventId: null });
  };

  handleReport = (): void =&gt; {
    if (this.state.eventId) {
      Sentry.showReportDialog({ eventId: this.state.eventId });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        &lt;ErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
          onReport={this.handleReport}
        /&gt;
      );
    }
    return this.props.children;
  }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;React Hooks Interface&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// hooks/useErrorTracking.ts

import * as Sentry from '@sentry/react-native';
import { useCallback, useEffect } from 'react';

/**
 * Hook for capturing errors with component context
 */
export function useErrorCapture() {
  const captureError = useCallback((
    error: Error,
    context?: Record&lt;string, unknown&gt;
  ): string =&gt; {
    return Sentry.captureException(error, { extra: context });
  }, []);

  const captureMessage = useCallback((
    message: string,
    level: Sentry.SeverityLevel = 'info'
  ): string =&gt; {
    return Sentry.captureMessage(message, level);
  }, []);

  return { captureError, captureMessage };
}

/**
 * Hook for adding breadcrumbs from components
 */
export function useBreadcrumb() {
  return useCallback((
    category: string,
    message: string,
    data?: Record&lt;string, unknown&gt;
  ): void =&gt; {
    Sentry.addBreadcrumb({ category, message, data, level: 'info' });
  }, []);
}

/**
 * Hook for performance transaction tracking
 */
export function useTransaction(name: string, op: string) {
  useEffect(() =&gt; {
    const transaction = Sentry.startTransaction({ name, op });
    Sentry.getCurrentHub().configureScope(scope =&gt;
      scope.setSpan(transaction)
    );

    return () =&gt; {
      transaction.finish();
    };
  }, [name, op]);
}

/**
 * Hook for setting user context (call after auth)
 */
export function useErrorUser(user: { id: string; email?: string } | null) {
  useEffect(() =&gt; {
    if (user) {
      Sentry.setUser({ id: user.id, email: user.email });
    } else {
      Sentry.setUser(null);
    }
  }, [user?.id, user?.email]);
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;iOS Platform Bridge (Sentry Native)&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// CrashReportingModule.swift
import Foundation
import Sentry

@objc(CrashReportingModule)
class CrashReportingModule: NSObject {

    @objc static func requiresMainQueueSetup() -&gt; Bool { return true }

    @objc func initializeNative(_ options: NSDictionary) {
        // Enable native crash reporting
        SentrySDK.start { options in
            options.dsn = ProcessInfo.processInfo.environment["SENTRY_DSN"]

            // Enable crash handling
            options.enableCrashHandler = true
            options.enableOutOfMemoryTracking = true

            // App hang detection (ANR equivalent)
            options.enableAppHangTracking = true
            options.appHangTimeoutInterval = 2.0

            // Attach screenshots on crash
            options.attachScreenshot = true
            options.attachViewHierarchy = true

            // Performance
            options.enableAutoPerformanceTracing = true
            options.enableUIViewControllerTracing = true
            options.enableNetworkTracking = true
            options.enableFileIOTracing = true
            options.enableCoreDataTracing = true
        }
    }

    // Manual dSYM upload in build phase
    // Build Phases -&gt; New Run Script Phase:
    /*
    if [ "$CONFIGURATION" = "Release" ]; then
        export SENTRY_ORG="your-org"
        export SENTRY_PROJECT="your-project"
        export SENTRY_AUTH_TOKEN="$SENTRY_AUTH_TOKEN"

        # Upload dSYM files
        /usr/local/bin/sentry-cli upload-dif --include-sources \\
            "$DWARF_DSYM_FOLDER_PATH"

        # Associate commits
        sentry-cli releases set-commits "$APP_VERSION+$BUILD_NUMBER" --auto
    fi
    */

    @objc func captureNativeException(_ name: String, reason: String, userInfo: NSDictionary?) {
        let exception = NSException(name: NSExceptionName(name), reason: reason, userInfo: userInfo as? [AnyHashable: Any])
        SentrySDK.capture(exception: exception)
    }

    @objc func addNativeBreadcrumb(_ category: String, message: String, level: String, data: NSDictionary?) {
        let crumb = Breadcrumb()
        crumb.category = category
        crumb.message = message
        crumb.level = sentryLevel(from: level)
        crumb.data = data as? [String: Any]
        SentrySDK.addBreadcrumb(crumb)
    }

    private func sentryLevel(from string: String) -&gt; SentryLevel {
        switch string {
        case "debug": return .debug
        case "info": return .info
        case "warning": return .warning
        case "error": return .error
        case "fatal": return .fatal
        default: return .info
        }
    }

    // Memory warning tracking
    @objc func registerMemoryWarningObserver() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleMemoryWarning),
            name: UIApplication.didReceiveMemoryWarningNotification,
            object: nil
        )
    }

    @objc private func handleMemoryWarning() {
        let crumb = Breadcrumb()
        crumb.category = "device"
        crumb.message = "Memory warning received"
        crumb.level = .warning
        crumb.data = [
            "available_memory": ProcessInfo.processInfo.physicalMemory,
            "thermal_state": ProcessInfo.processInfo.thermalState.rawValue
        ]
        SentrySDK.addBreadcrumb(crumb)
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Android Platform Bridge (Sentry Native)&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// CrashReportingModule.kt
package com.app.crashreporting

import android.app.ActivityManager
import android.content.Context
import android.os.Debug
import com.facebook.react.bridge.*
import io.sentry.Sentry
import io.sentry.SentryLevel
import io.sentry.android.core.SentryAndroid
import io.sentry.android.core.SentryAndroidOptions
import io.sentry.Breadcrumb

class CrashReportingModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CrashReportingModule"

    @ReactMethod
    fun initializeNative(options: ReadableMap) {
        SentryAndroid.init(reactApplicationContext) { sentryOptions -&gt;
            sentryOptions.dsn = BuildConfig.SENTRY_DSN

            // Enable ANR detection
            sentryOptions.isAnrEnabled = true
            sentryOptions.anrTimeoutIntervalMillis = 5000

            // Enable NDK crash reporting
            sentryOptions.isEnableNdk = true

            // Proguard deobfuscation
            sentryOptions.isEnableAutoSessionTracking = true

            // Performance monitoring
            sentryOptions.tracesSampleRate = 0.2
            sentryOptions.isEnableActivityLifecycleTracking = true
            sentryOptions.isEnableAutoActivityLifecycleTracing = true

            // Attach screenshots
            sentryOptions.isAttachScreenshot = true
            sentryOptions.isAttachViewHierarchy = true

            // Add app start timing
            sentryOptions.isEnableAppStartProfiling = true
        }

        // Register component callbacks for memory pressure
        reactApplicationContext.registerComponentCallbacks(MemoryPressureCallback())
    }

    /* Proguard mapping upload in build.gradle:
    android {
        buildTypes {
            release {
                minifyEnabled true
                proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            }
        }
    }

    // In app/build.gradle
    sentry {
        autoUploadProguardMapping = true
        uploadNativeSymbols = true
        includeNativeSources = true
        org = "your-org"
        projectName = "your-project"
        authToken = System.getenv("SENTRY_AUTH_TOKEN")
    }
    */

    @ReactMethod
    fun captureNativeException(name: String, message: String, data: ReadableMap?) {
        Sentry.captureException(RuntimeException("$name: $message")) { scope -&gt;
            data?.toHashMap()?.forEach { (key, value) -&gt;
                scope.setExtra(key, value)
            }
        }
    }

    @ReactMethod
    fun addNativeBreadcrumb(
        category: String,
        message: String,
        level: String,
        data: ReadableMap?
    ) {
        val breadcrumb = Breadcrumb().apply {
            this.category = category
            this.message = message
            this.level = when (level) {
                "debug" -&gt; SentryLevel.DEBUG
                "info" -&gt; SentryLevel.INFO
                "warning" -&gt; SentryLevel.WARNING
                "error" -&gt; SentryLevel.ERROR
                "fatal" -&gt; SentryLevel.FATAL
                else -&gt; SentryLevel.INFO
            }
            data?.toHashMap()?.forEach { (key, value) -&gt;
                this.setData(key, value)
            }
        }
        Sentry.addBreadcrumb(breadcrumb)
    }

    @ReactMethod
    fun getMemoryInfo(promise: Promise) {
        val activityManager = reactApplicationContext
            .getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val memoryInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memoryInfo)

        val result = Arguments.createMap().apply {
            putDouble("availableMemory", memoryInfo.availMem.toDouble())
            putDouble("totalMemory", memoryInfo.totalMem.toDouble())
            putBoolean("lowMemory", memoryInfo.lowMemory)
            putDouble("threshold", memoryInfo.threshold.toDouble())
            putDouble("nativeHeap", Debug.getNativeHeapAllocatedSize().toDouble())
        }
        promise.resolve(result)
    }

    inner class MemoryPressureCallback : android.content.ComponentCallbacks2 {
        override fun onTrimMemory(level: Int) {
            val levelName = when (level) {
                android.content.ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW -&gt; "RUNNING_LOW"
                android.content.ComponentCallbacks2.TRIM_MEMORY_RUNNING_CRITICAL -&gt; "RUNNING_CRITICAL"
                android.content.ComponentCallbacks2.TRIM_MEMORY_COMPLETE -&gt; "COMPLETE"
                else -&gt; "LEVEL_$level"
            }

            Sentry.addBreadcrumb(Breadcrumb().apply {
                category = "device.memory"
                message = "Memory trim: $levelName"
                this.level = if (level &gt;= 15) SentryLevel.WARNING else SentryLevel.INFO
                setData("trim_level", level)
            })
        }

        override fun onConfigurationChanged(config: android.content.res.Configuration) {}
        override fun onLowMemory() {
            Sentry.addBreadcrumb(Breadcrumb().apply {
                category = "device.memory"
                message = "Low memory warning"
                level = SentryLevel.ERROR
            })
        }
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;O - Optimizations and Deep Dive&lt;/h4&gt;

            &lt;h5&gt;Performance Optimizations&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Lazy SDK initialization:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: SDK init blocks app startup&lt;/li&gt;
                        &lt;li&gt;Solution: Initialize after first frame, use cached config from previous session&lt;/li&gt;
                        &lt;li&gt;Impact: Zero launch time impact (&lt;10ms async init)&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Breadcrumb ring buffer:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Unbounded breadcrumb list grows memory&lt;/li&gt;
                        &lt;li&gt;Solution: Ring buffer with 100 max entries, O(1) insert&lt;/li&gt;
                        &lt;li&gt;Impact: Constant ~50KB memory for breadcrumbs regardless of session length&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Envelope batching:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Many small network requests for events&lt;/li&gt;
                        &lt;li&gt;Solution: Batch events into envelopes, single upload per flush&lt;/li&gt;
                        &lt;li&gt;Impact: 80% reduction in network calls&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Sampling strategies:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: High volume apps generate expensive event counts&lt;/li&gt;
                        &lt;li&gt;Solution: Configurable sample rates (100% errors, 20% traces)&lt;/li&gt;
                        &lt;li&gt;Impact: 5x cost reduction while maintaining error visibility&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Client-side PII scrubbing:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Sensitive data in error payloads&lt;/li&gt;
                        &lt;li&gt;Solution: beforeSend hook scrubs emails, passwords, tokens&lt;/li&gt;
                        &lt;li&gt;Impact: PII never leaves device, GDPR compliant by default&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Source Map &amp;amp; Symbol Upload Pipeline&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;# CI/CD Pipeline for symbol upload (.github/workflows/release.yml)
name: Release Build

on:
  push:
    tags: ['v*']

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build iOS Release
        run: |
          cd ios &amp;&amp; xcodebuild archive \\
            -workspace App.xcworkspace \\
            -scheme App \\
            -configuration Release \\
            -archivePath build/App.xcarchive

      - name: Upload dSYMs to Sentry
        env:
          SENTRY_AUTH_TOKEN: \${{ secrets.SENTRY_AUTH_TOKEN }}
        run: |
          npx sentry-cli upload-dif \\
            --org your-org \\
            --project your-project \\
            --include-sources \\
            ios/build/App.xcarchive/dSYMs

      - name: Create Sentry Release
        run: |
          VERSION=\$(cat package.json | jq -r '.version')
          BUILD=\${{ github.run_number }}

          npx sentry-cli releases new "app@\${VERSION}+\${BUILD}"
          npx sentry-cli releases set-commits "app@\${VERSION}+\${BUILD}" --auto
          npx sentry-cli releases finalize "app@\${VERSION}+\${BUILD}"

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Android Release
        run: |
          cd android &amp;&amp; ./gradlew assembleRelease

      - name: Upload Proguard mappings
        env:
          SENTRY_AUTH_TOKEN: \${{ secrets.SENTRY_AUTH_TOKEN }}
        run: |
          npx sentry-cli upload-proguard \\
            --org your-org \\
            --project your-project \\
            android/app/build/outputs/mapping/release/mapping.txt

  upload-sourcemaps:
    runs-on: ubuntu-latest
    steps:
      - name: Bundle JS with source maps
        run: |
          npx react-native bundle \\
            --platform android \\
            --dev false \\
            --entry-file index.js \\
            --bundle-output bundle.js \\
            --sourcemap-output bundle.js.map

      - name: Upload source maps
        run: |
          VERSION=\$(cat package.json | jq -r '.version')
          BUILD=\${{ github.run_number }}

          npx sentry-cli releases files "app@\${VERSION}+\${BUILD}" \\
            upload-sourcemaps \\
            --dist \${BUILD} \\
            --strip-prefix /Users/runner/work \\
            --rewrite \\
            bundle.js bundle.js.map&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Platform-Specific Considerations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Aspect&lt;/th&gt;&lt;th&gt;iOS&lt;/th&gt;&lt;th&gt;Android&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Crash Handler&lt;/td&gt;&lt;td&gt;NSException + Signal handlers&lt;/td&gt;&lt;td&gt;UncaughtExceptionHandler + NDK signals&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;ANR Detection&lt;/td&gt;&lt;td&gt;App Hang Tracking (2s threshold)&lt;/td&gt;&lt;td&gt;ANR Watchdog (5s threshold)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;OOM Tracking&lt;/td&gt;&lt;td&gt;enableOutOfMemoryTracking&lt;/td&gt;&lt;td&gt;ComponentCallbacks2.onTrimMemory()&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Symbol Format&lt;/td&gt;&lt;td&gt;dSYM files (DWARF)&lt;/td&gt;&lt;td&gt;Proguard mapping.txt&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Native Crashes&lt;/td&gt;&lt;td&gt;Built-in, automatic&lt;/td&gt;&lt;td&gt;Requires isEnableNdk = true&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Screenshot Capture&lt;/td&gt;&lt;td&gt;attachScreenshot = true&lt;/td&gt;&lt;td&gt;isAttachScreenshot = true&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;View Hierarchy&lt;/td&gt;&lt;td&gt;attachViewHierarchy = true&lt;/td&gt;&lt;td&gt;isAttachViewHierarchy = true&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Edge Cases and Error Handling&lt;/h5&gt;
            &lt;ol&gt;
                &lt;li&gt;&lt;strong&gt;Hermes bytecode stack traces:&lt;/strong&gt; Ensure Hermes bytecode source maps are uploaded alongside JS source maps. Use react-native-bundle command with --sourcemap-output flag.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;CodePush OTA updates:&lt;/strong&gt; Track CodePush release hashes separately from native versions. Use dist field to differentiate bundles with same version but different code.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;OOM crashes:&lt;/strong&gt; Native OOM doesn't always trigger crash handlers. Use memory pressure callbacks (didReceiveMemoryWarning, onTrimMemory) to add breadcrumbs before crash.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;ANR vs actual deadlock:&lt;/strong&gt; Distinguish between UI thread blocking (recoverable) and actual deadlocks. App hang tracking detects both but provides stack traces for debugging.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Offline crashes:&lt;/strong&gt; Crashes while offline may be lost if app is force-killed before reconnection. Sentry persists events to disk, but OOM/force-kill scenarios can lose data.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Debug vs release symbolication:&lt;/strong&gt; Symbolication only works for release builds with uploaded symbols. Ensure CI/CD always uploads symbols for every release.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;React Native version mismatch:&lt;/strong&gt; Upgrading RN can break Sentry native integration. Pin @sentry/react-native version and test after RN upgrades.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Error boundary cascade:&lt;/strong&gt; Errors in error boundary fallback UI cause infinite loops. Use try-catch in fallback render and have simple fallback of fallback.&lt;/li&gt;
            &lt;/ol&gt;

            &lt;h5&gt;Trade-offs and Alternatives&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Decision&lt;/th&gt;&lt;th&gt;Chosen&lt;/th&gt;&lt;th&gt;Alternative&lt;/th&gt;&lt;th&gt;Why Chosen&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Error tracking service&lt;/td&gt;&lt;td&gt;Sentry&lt;/td&gt;&lt;td&gt;Firebase Crashlytics&lt;/td&gt;&lt;td&gt;Better RN support, source maps, APM, self-host option&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Client-side vs server-side PII scrub&lt;/td&gt;&lt;td&gt;Client-side (beforeSend)&lt;/td&gt;&lt;td&gt;Server-side data scrubbing&lt;/td&gt;&lt;td&gt;PII never leaves device, GDPR safer&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Breadcrumb storage&lt;/td&gt;&lt;td&gt;Ring buffer (100 max)&lt;/td&gt;&lt;td&gt;Unbounded list&lt;/td&gt;&lt;td&gt;Constant memory, most recent context matters&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Error grouping&lt;/td&gt;&lt;td&gt;Custom fingerprinting&lt;/td&gt;&lt;td&gt;Default Sentry grouping&lt;/td&gt;&lt;td&gt;Prevents over-grouping dynamic errors&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Sampling strategy&lt;/td&gt;&lt;td&gt;100% errors, 20% traces&lt;/td&gt;&lt;td&gt;Uniform sampling&lt;/td&gt;&lt;td&gt;Never miss errors, control trace costs&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;SDK initialization&lt;/td&gt;&lt;td&gt;Lazy after first frame&lt;/td&gt;&lt;td&gt;Eager in index.js&lt;/td&gt;&lt;td&gt;Zero impact on app startup time&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Testing Strategy&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Unit Tests:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;PII scrubbing regex patterns (emails, phones, tokens)&lt;/li&gt;
                        &lt;li&gt;Error filtering logic (ignored patterns)&lt;/li&gt;
                        &lt;li&gt;Custom fingerprinting rules&lt;/li&gt;
                        &lt;li&gt;Breadcrumb processing and truncation&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Integration Tests:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Error boundary catches and reports errors&lt;/li&gt;
                        &lt;li&gt;Offline queue persists and retries on reconnect&lt;/li&gt;
                        &lt;li&gt;User context attached to all events&lt;/li&gt;
                        &lt;li&gt;Source maps symbolicate correctly in staging&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;E2E Tests:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Throw test error → verify appears in Sentry dashboard&lt;/li&gt;
                        &lt;li&gt;Force native crash → verify dSYM symbolication&lt;/li&gt;
                        &lt;li&gt;Verify PII not present in captured events&lt;/li&gt;
                        &lt;li&gt;Verify breadcrumb trail matches user actions&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Interview Discussion Points&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you handle error sampling at scale?&lt;/strong&gt;&lt;br/&gt;A: Use tiered sampling - 100% for errors (never miss crashes), 10-20% for traces (cost control), dynamic rates for high-volume endpoints. Consider client-side sampling with beforeSend returning null for sampled-out events.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you prevent error grouping issues?&lt;/strong&gt;&lt;br/&gt;A: Custom fingerprinting for dynamic error messages (e.g., ChunkLoadError with hash). Group by error type + component stack, not just message. Regular review of "similar issues" suggestions.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you manage alert fatigue?&lt;/strong&gt;&lt;br/&gt;A: Alert on rate of change, not absolute counts. Set regression alerts for new errors in releases. Use crash-free session rate (target 99.5%+) as key metric. Route to on-call only for P0 (affects &gt;5% users).&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you ensure GDPR compliance?&lt;/strong&gt;&lt;br/&gt;A: Client-side PII scrubbing in beforeSend, never send user content in extra/tags. Use pseudonymous user IDs, not emails. Sentry data retention settings. Document data processing agreement.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you debug Hermes crashes?&lt;/strong&gt;&lt;br/&gt;A: Hermes uses bytecode, so standard source maps aren't enough. Must upload Hermes source maps during build. Use react-native-bundle with --sourcemap-output and upload via sentry-cli with correct dist version.&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Library Recommendations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Concern&lt;/th&gt;&lt;th&gt;Library&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Error Tracking&lt;/td&gt;&lt;td&gt;@sentry/react-native&lt;/td&gt;&lt;td&gt;Comprehensive JS + native crash support, source maps&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Performance APM&lt;/td&gt;&lt;td&gt;Sentry Performance&lt;/td&gt;&lt;td&gt;Transaction tracing, slow frame detection&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Firebase Alternative&lt;/td&gt;&lt;td&gt;@react-native-firebase/crashlytics&lt;/td&gt;&lt;td&gt;Free, good native crash support, Firebase integration&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Network Logging&lt;/td&gt;&lt;td&gt;Reactotron&lt;/td&gt;&lt;td&gt;Development debugging, network inspector&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Release Management&lt;/td&gt;&lt;td&gt;sentry-cli&lt;/td&gt;&lt;td&gt;Symbol upload, release creation, commit tracking&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Hermes Profiling&lt;/td&gt;&lt;td&gt;react-native-performance&lt;/td&gt;&lt;td&gt;Startup timing, Hermes-specific metrics&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Error Boundaries&lt;/td&gt;&lt;td&gt;react-error-boundary&lt;/td&gt;&lt;td&gt;Declarative error boundaries with reset&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Session Replay&lt;/td&gt;&lt;td&gt;Sentry Session Replay&lt;/td&gt;&lt;td&gt;Visual reproduction of errors (optional)&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;
        `
     },
    {
        id: 91,
        category: "System Design",
        icon: "🏛️",
        question: "How would you architect feature flags and A/B testing infrastructure?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            &lt;h4&gt;R - Requirements Exploration&lt;/h4&gt;

            &lt;h5&gt;Clarifying Questions to Ask&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Flag types:&lt;/strong&gt; Boolean only, or also string/number/JSON payloads?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Targeting complexity:&lt;/strong&gt; Simple percentage rollout or complex user attribute targeting?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Update latency:&lt;/strong&gt; Real-time updates needed or periodic polling acceptable?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Experiment types:&lt;/strong&gt; A/B only or multivariate (A/B/C/n)?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Analytics integration:&lt;/strong&gt; Which platforms (Amplitude, Mixpanel, custom)?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Self-hosted vs SaaS:&lt;/strong&gt; Build custom or use LaunchDarkly/Statsig/GrowthBook?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Bucketing requirements:&lt;/strong&gt; Sticky assignment across sessions? Cross-platform consistency?&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Kill switch latency:&lt;/strong&gt; How fast must emergency flag changes propagate?&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Functional Requirements&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Boolean feature flags for gradual rollout and kill switches&lt;/li&gt;
                &lt;li&gt;Multivariate experiments (A/B/n testing) with variant assignment and payloads&lt;/li&gt;
                &lt;li&gt;User targeting by attributes (country, subscription tier, device type, app version)&lt;/li&gt;
                &lt;li&gt;Percentage-based rollouts with consistent bucketing (same user = same bucket)&lt;/li&gt;
                &lt;li&gt;Real-time flag updates via SSE/WebSocket without app restart&lt;/li&gt;
                &lt;li&gt;Exposure tracking for experiment analysis (who saw what variant)&lt;/li&gt;
                &lt;li&gt;Analytics integration for conversion metrics (Amplitude, Mixpanel)&lt;/li&gt;
                &lt;li&gt;Admin dashboard for flag management and experiment configuration&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Non-Functional Requirements&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Startup:&lt;/strong&gt; Zero blocking on app startup (cache-first, fetch in background)&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Consistency:&lt;/strong&gt; Same variant across sessions and devices for same user&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Offline:&lt;/strong&gt; Full functionality with cached flag values when offline&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Performance:&lt;/strong&gt; Sub-millisecond flag evaluation (local computation only)&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Latency:&lt;/strong&gt; Flag updates propagate to all clients within 5 seconds&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Reliability:&lt;/strong&gt; Graceful degradation to defaults if service unavailable&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Out of Scope&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;Custom analytics backend (will integrate with existing)&lt;/li&gt;
                &lt;li&gt;Statistical significance calculation (use external tools)&lt;/li&gt;
                &lt;li&gt;Multi-armed bandit algorithms&lt;/li&gt;
                &lt;li&gt;Backend feature flags (focus on mobile client)&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h4&gt;A - Architecture / High-level Design&lt;/h4&gt;

            &lt;h5&gt;System Architecture Diagram&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│              FEATURE FLAG &amp;amp; EXPERIMENTATION PLATFORM             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    ADMIN DASHBOARD                         │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ Flag Mgmt   │  │ Experiment   │  │ Targeting       │  │  │
│  │  │ • Create    │  │ Config       │  │ Rules           │  │  │
│  │  │ • Archive   │  │ • Variants   │  │ • Segments      │  │  │
│  │  │ • Kill      │  │ • Hypothesis │  │ • Attributes    │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                    BACKEND SERVICE                         │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Flag Evaluation Engine                               │  │  │
│  │  │ • Rule evaluation (targeting)                        │  │  │
│  │  │ • Consistent hashing (bucketing)                     │  │  │
│  │  │ • Default values                                     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────┐  ┌───────────────┐  ┌─────────────┐  │  │
│  │  │ REST API       │  │ Streaming     │  │ Assignment  │  │  │
│  │  │ /flags/eval    │  │ SSE/WebSocket │  │ Logging     │  │  │
│  │  └────────────────┘  └───────────────┘  └─────────────┘  │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                    CLIENT SDK                              │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ Flag Cache  │  │ Local Eval   │  │ Streaming       │  │  │
│  │  │ • MMKV      │  │ Engine       │  │ Updates         │  │  │
│  │  │ • Bootstrap │  │ • Rules      │  │ • SSE listener  │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                   APP INTEGRATION                          │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ React Hooks │  │ Exposure     │  │ Analytics       │  │  │
│  │  │ useFlag()   │  │ Tracking     │  │ Integration     │  │  │
│  │  │ useExpt()   │  │              │  │ • Amplitude     │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  ANALYTICS PIPELINE                        │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │ Exposure Events → Warehouse → Statistical Analysis   │ │  │
│  │  │                              → Significance Testing  │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Component Overview&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Component&lt;/th&gt;&lt;th&gt;Responsibility&lt;/th&gt;&lt;th&gt;Technology&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Flag Cache&lt;/td&gt;&lt;td&gt;Persist flags for offline and instant startup&lt;/td&gt;&lt;td&gt;MMKV (fast key-value)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Local Evaluation Engine&lt;/td&gt;&lt;td&gt;Evaluate targeting rules client-side&lt;/td&gt;&lt;td&gt;TypeScript rule engine&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Streaming Client&lt;/td&gt;&lt;td&gt;Receive real-time flag updates&lt;/td&gt;&lt;td&gt;SSE (EventSource)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Exposure Tracker&lt;/td&gt;&lt;td&gt;Log which users saw which variants&lt;/td&gt;&lt;td&gt;Batched event queue&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Bucketing Service&lt;/td&gt;&lt;td&gt;Consistent user-to-variant assignment&lt;/td&gt;&lt;td&gt;MurmurHash3 (deterministic)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;React Hooks&lt;/td&gt;&lt;td&gt;Reactive flag access in components&lt;/td&gt;&lt;td&gt;Zustand + React hooks&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Analytics Bridge&lt;/td&gt;&lt;td&gt;Send experiment data to analytics&lt;/td&gt;&lt;td&gt;Amplitude/Mixpanel SDK&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Backend API&lt;/td&gt;&lt;td&gt;Serve flag configs, stream updates&lt;/td&gt;&lt;td&gt;REST + SSE endpoints&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Key Architecture Decisions&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Decision&lt;/th&gt;&lt;th&gt;Choice&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Flag evaluation&lt;/td&gt;&lt;td&gt;Client-side&lt;/td&gt;&lt;td&gt;Sub-ms latency, works offline, no network round-trip&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Bucketing algorithm&lt;/td&gt;&lt;td&gt;MurmurHash3&lt;/td&gt;&lt;td&gt;Fast, uniform distribution, deterministic across platforms&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Update mechanism&lt;/td&gt;&lt;td&gt;SSE (Server-Sent Events)&lt;/td&gt;&lt;td&gt;Lightweight, auto-reconnect, one-way push sufficient&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Cache storage&lt;/td&gt;&lt;td&gt;MMKV&lt;/td&gt;&lt;td&gt;Fast synchronous reads, reliable persistence&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;State management&lt;/td&gt;&lt;td&gt;Zustand with selectors&lt;/td&gt;&lt;td&gt;Fine-grained subscriptions, minimal re-renders&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Exposure tracking&lt;/td&gt;&lt;td&gt;Batched queue (10s flush)&lt;/td&gt;&lt;td&gt;Reduce network calls, survive app close&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;D - Data Model / Core Entities&lt;/h4&gt;

            &lt;h5&gt;Core Entities&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// types/featureFlags.ts

/**
 * Represents a feature flag with targeting rules
 */
interface FeatureFlag {
  key: string;
  type: 'boolean' | 'string' | 'number' | 'json';
  defaultValue: FlagValue;
  rules: TargetingRule[];
  enabled: boolean;
  archived: boolean;
}

interface Experiment {
  key: string;
  hypothesis: string;
  variants: Variant[];
  allocation: number; // 0-100, what % of eligible users enter experiment
  targeting: TargetingRule[];
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
}

interface Variant {
  key: string;
  weight: number; // 0-100 percentage
  payload?: Record&lt;string, unknown&gt;;
}

interface TargetingRule {
  id: string;
  conditions: Condition[];
  variation: string | number | boolean;
  percentage?: number;
}

interface Condition {
  attribute: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'contains' | 'in' | 'regex';
  value: unknown;
}

interface UserContext {
  userId: string;
  deviceId: string;
  attributes: Record&lt;string, unknown&gt;;
}

interface ExposureEvent {
  flagKey: string;
  variant: string;
  userId: string;
  timestamp: number;
  context: UserContext;
}

// Feature flag SDK implementation
import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import murmurhash from 'murmurhash';

interface FlagState {
  flags: Map&lt;string, FeatureFlag&gt;;
  experiments: Map&lt;string, Experiment&gt;;
  assignments: Map&lt;string, string&gt;; // experiment key -&gt; variant key
  userContext: UserContext | null;
  isInitialized: boolean;
  lastFetchedAt: number;
}

const useFlagStore = create&lt;FlagState&gt;()(
  subscribeWithSelector((set) =&gt; ({
    flags: new Map(),
    experiments: new Map(),
    assignments: new Map(),
    userContext: null,
    isInitialized: false,
    lastFetchedAt: 0,
  }))
);

class FeatureFlagSDK {
  private storage = new MMKV({ id: 'feature-flags' });
  private eventSource: EventSource | null = null;
  private exposureQueue: ExposureEvent[] = [];
  private flushInterval: NodeJS.Timer | null = null;

  async initialize(userContext: UserContext): Promise&lt;void&gt; {
    useFlagStore.setState({ userContext });

    // 1. Load cached flags immediately (non-blocking)
    this.loadCachedFlags();

    // 2. Fetch fresh flags in background
    try {
      await this.fetchFlags();
    } catch (error) {
      console.warn('Failed to fetch flags, using cache');
    }

    // 3. Start streaming updates
    this.startStreaming();

    // 4. Start exposure event flushing
    this.flushInterval = setInterval(() =&gt; this.flushExposures(), 10000);

    useFlagStore.setState({ isInitialized: true });
  }

  private loadCachedFlags(): void {
    const cached = this.storage.getString('flag_data');
    if (cached) {
      const data = JSON.parse(cached);
      useFlagStore.setState({
        flags: new Map(Object.entries(data.flags || {})),
        experiments: new Map(Object.entries(data.experiments || {})),
        assignments: new Map(Object.entries(data.assignments || {})),
      });
    }
  }

  private async fetchFlags(): Promise&lt;void&gt; {
    const { userContext } = useFlagStore.getState();
    if (!userContext) return;

    const response = await fetch(\`\${API_URL}/flags/evaluate\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: userContext }),
    });

    const data = await response.json();

    useFlagStore.setState({
      flags: new Map(Object.entries(data.flags)),
      experiments: new Map(Object.entries(data.experiments)),
      lastFetchedAt: Date.now(),
    });

    // Cache for offline use
    this.storage.set('flag_data', JSON.stringify({
      flags: Object.fromEntries(data.flags),
      experiments: Object.fromEntries(data.experiments),
      assignments: Object.fromEntries(useFlagStore.getState().assignments),
    }));
  }

  private startStreaming(): void {
    const { userContext } = useFlagStore.getState();
    if (!userContext) return;

    this.eventSource = new EventSource(
      \`\${API_URL}/flags/stream?userId=\${userContext.userId}\`
    );

    this.eventSource.onmessage = (event) =&gt; {
      const update = JSON.parse(event.data);
      if (update.type === 'flag_update') {
        const { flags } = useFlagStore.getState();
        flags.set(update.key, update.flag);
        useFlagStore.setState({ flags: new Map(flags) });
      }
    };
  }

  // Boolean flag evaluation
  isEnabled(flagKey: string, defaultValue = false): boolean {
    const { flags, userContext } = useFlagStore.getState();
    const flag = flags.get(flagKey);

    if (!flag || !flag.enabled) return defaultValue;
    if (!userContext) return defaultValue;

    const value = this.evaluateRules(flag.rules, userContext, flag.defaultValue);
    return Boolean(value);
  }

  // Multivariate flag evaluation
  getVariant&lt;T&gt;(flagKey: string, defaultValue: T): T {
    const { flags, userContext } = useFlagStore.getState();
    const flag = flags.get(flagKey);

    if (!flag || !flag.enabled || !userContext) return defaultValue;

    return this.evaluateRules(flag.rules, userContext, flag.defaultValue) as T;
  }

  // Experiment assignment with consistent bucketing
  getExperimentVariant(experimentKey: string): string | null {
    const { experiments, assignments, userContext } = useFlagStore.getState();
    const experiment = experiments.get(experimentKey);

    if (!experiment || experiment.status !== 'running' || !userContext) {
      return null;
    }

    // Check if user is already assigned
    const existingAssignment = assignments.get(experimentKey);
    if (existingAssignment) {
      this.trackExposure(experimentKey, existingAssignment);
      return existingAssignment;
    }

    // Check targeting rules
    if (!this.matchesTargeting(experiment.targeting, userContext)) {
      return null;
    }

    // Determine if user is in experiment allocation
    const allocationHash = this.hash(\`\${experimentKey}:\${userContext.userId}:allocation\`);
    if (allocationHash &gt; experiment.allocation) {
      return null; // User not in experiment
    }

    // Assign variant using consistent hashing
    const variantHash = this.hash(\`\${experimentKey}:\${userContext.userId}:variant\`);
    const variant = this.selectVariant(experiment.variants, variantHash);

    // Store assignment for consistency
    assignments.set(experimentKey, variant.key);
    useFlagStore.setState({ assignments: new Map(assignments) });
    this.persistAssignments();

    this.trackExposure(experimentKey, variant.key);
    return variant.key;
  }

  private evaluateRules(
    rules: TargetingRule[],
    context: UserContext,
    defaultValue: unknown
  ): unknown {
    for (const rule of rules) {
      if (this.matchesConditions(rule.conditions, context)) {
        // Check percentage rollout
        if (rule.percentage !== undefined) {
          const hash = this.hash(\`\${rule.id}:\${context.userId}\`);
          if (hash &gt; rule.percentage) continue;
        }
        return rule.variation;
      }
    }
    return defaultValue;
  }

  private matchesConditions(conditions: Condition[], context: UserContext): boolean {
    return conditions.every(condition =&gt; {
      const value = context.attributes[condition.attribute];
      switch (condition.operator) {
        case 'eq': return value === condition.value;
        case 'neq': return value !== condition.value;
        case 'gt': return (value as number) &gt; (condition.value as number);
        case 'lt': return (value as number) &lt; (condition.value as number);
        case 'contains': return String(value).includes(String(condition.value));
        case 'in': return (condition.value as unknown[]).includes(value);
        case 'regex': return new RegExp(condition.value as string).test(String(value));
        default: return false;
      }
    });
  }

  private hash(input: string): number {
    // Returns 0-100 for percentage bucketing
    return murmurhash.v3(input) % 100;
  }

  private selectVariant(variants: Variant[], hash: number): Variant {
    let cumulative = 0;
    for (const variant of variants) {
      cumulative += variant.weight;
      if (hash &lt; cumulative) return variant;
    }
    return variants[variants.length - 1];
  }

  private trackExposure(flagKey: string, variant: string): void {
    const { userContext } = useFlagStore.getState();
    if (!userContext) return;

    this.exposureQueue.push({
      flagKey,
      variant,
      userId: userContext.userId,
      timestamp: Date.now(),
      context: userContext,
    });
  }

  private async flushExposures(): Promise&lt;void&gt; {
    if (this.exposureQueue.length === 0) return;

    const events = [...this.exposureQueue];
    this.exposureQueue = [];

    try {
      await fetch(\`\${API_URL}/flags/exposures\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
      });
    } catch {
      // Re-queue on failure
      this.exposureQueue.unshift(...events);
    }
  }

  cleanup(): void {
    this.eventSource?.close();
    if (this.flushInterval) clearInterval(this.flushInterval);
    this.flushExposures();
  }
}

export const featureFlags = new FeatureFlagSDK();&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Entity Relationships&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                FEATURE FLAG ENTITY MODEL                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐     1:N     ┌─────────────────┐
│  FeatureFlag    │────────────▶│ TargetingRule[] │
│  (key, type,    │             │ (conditions,    │
│   defaultValue) │             │  percentage)    │
└─────────────────┘             └────────┬────────┘
                                         │ 1:N
                                         ▼
                                ┌─────────────────┐
                                │  Condition[]    │
                                │ (attribute,     │
                                │  operator, val) │
                                └─────────────────┘

┌─────────────────┐     1:N     ┌─────────────────┐
│   Experiment    │────────────▶│   Variant[]     │
│  (key, status,  │             │ (key, weight,   │
│   allocation)   │             │  payload)       │
└────────┬────────┘             └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│ TargetingRule[] │
│ (who qualifies) │
└─────────────────┘

┌─────────────────┐     N:1     ┌─────────────────┐
│ ExposureEvent   │────────────▶│   UserContext   │
│ (flagKey,       │             │ (userId,        │
│  variant, ts)   │             │  attributes)    │
└─────────────────┘             └─────────────────┘

BUCKETING FLOW:
UserContext.userId ──▶ MurmurHash3(userId + flagKey)
                              │
                              ▼
                      hash % 100 = bucket (0-99)
                              │
                              ▼
                      Compare to rule percentages
                              │
                              ▼
                      Assign variant (deterministic)&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Storage Strategy&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Data Type&lt;/th&gt;&lt;th&gt;Storage&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Flag Definitions&lt;/td&gt;&lt;td&gt;MMKV (persistent cache)&lt;/td&gt;&lt;td&gt;Instant startup, offline support&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Experiment Configs&lt;/td&gt;&lt;td&gt;MMKV (persistent cache)&lt;/td&gt;&lt;td&gt;Consistent with flags, same access pattern&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;User Assignments&lt;/td&gt;&lt;td&gt;MMKV (persistent)&lt;/td&gt;&lt;td&gt;Sticky assignments across sessions&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Active State&lt;/td&gt;&lt;td&gt;Zustand (in-memory)&lt;/td&gt;&lt;td&gt;Reactive updates, fast access&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Exposure Queue&lt;/td&gt;&lt;td&gt;In-memory array + flush&lt;/td&gt;&lt;td&gt;Batch for efficiency, acceptable to lose on crash&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;User Context&lt;/td&gt;&lt;td&gt;Zustand (in-memory)&lt;/td&gt;&lt;td&gt;Changes on login/logout, no persistence needed&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;I - Interface Definition (API)&lt;/h4&gt;

            &lt;h5&gt;React Hooks Interface&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// React hooks for feature flags and experiments
import { useEffect, useMemo, useRef } from 'react';
import { useSyncExternalStore } from 'react';

// Hook for boolean feature flags
export function useFeatureFlag(flagKey: string, defaultValue = false): boolean {
  const trackedRef = useRef(false);

  const value = useSyncExternalStore(
    (callback) =&gt; useFlagStore.subscribe(
      (state) =&gt; state.flags.get(flagKey),
      callback
    ),
    () =&gt; featureFlags.isEnabled(flagKey, defaultValue),
    () =&gt; defaultValue // Server snapshot for SSR
  );

  useEffect(() =&gt; {
    if (!trackedRef.current) {
      trackedRef.current = true;
      // Track flag exposure once per component mount
      analytics.track('feature_flag_exposure', {
        flag_key: flagKey,
        value,
      });
    }
  }, [flagKey, value]);

  return value;
}

// Hook for multivariate flags
export function useVariant&lt;T&gt;(flagKey: string, defaultValue: T): T {
  const trackedRef = useRef(false);

  const value = useSyncExternalStore(
    (callback) =&gt; useFlagStore.subscribe(
      (state) =&gt; state.flags.get(flagKey),
      callback
    ),
    () =&gt; featureFlags.getVariant(flagKey, defaultValue),
    () =&gt; defaultValue
  );

  useEffect(() =&gt; {
    if (!trackedRef.current) {
      trackedRef.current = true;
      analytics.track('variant_exposure', { flag_key: flagKey, variant: value });
    }
  }, [flagKey, value]);

  return value;
}

// Hook for A/B experiments
export function useExperiment(experimentKey: string): {
  variant: string | null;
  isInExperiment: boolean;
} {
  const trackedRef = useRef(false);

  const variant = useSyncExternalStore(
    (callback) =&gt; useFlagStore.subscribe(
      (state) =&gt; state.experiments.get(experimentKey),
      callback
    ),
    () =&gt; featureFlags.getExperimentVariant(experimentKey),
    () =&gt; null
  );

  useEffect(() =&gt; {
    if (!trackedRef.current &amp;&amp; variant) {
      trackedRef.current = true;
      analytics.track('experiment_exposure', {
        experiment_key: experimentKey,
        variant,
      });
    }
  }, [experimentKey, variant]);

  return {
    variant,
    isInExperiment: variant !== null,
  };
}

// Higher-order component for feature gating
export function withFeatureFlag&lt;P extends object&gt;(
  WrappedComponent: React.ComponentType&lt;P&gt;,
  flagKey: string,
  FallbackComponent?: React.ComponentType&lt;P&gt;
): React.FC&lt;P&gt; {
  return function FeatureGatedComponent(props: P) {
    const isEnabled = useFeatureFlag(flagKey);

    if (!isEnabled) {
      return FallbackComponent ? &lt;FallbackComponent {...props} /&gt; : null;
    }

    return &lt;WrappedComponent {...props} /&gt;;
  };
}

// Usage examples
function CheckoutScreen() {
  const showNewCheckout = useFeatureFlag('new_checkout_flow');
  const { variant, isInExperiment } = useExperiment('checkout_redesign');
  const checkoutTheme = useVariant('checkout_theme', 'default');

  if (!showNewCheckout) {
    return &lt;LegacyCheckout /&gt;;
  }

  if (isInExperiment) {
    switch (variant) {
      case 'single_page':
        return &lt;SinglePageCheckout theme={checkoutTheme} /&gt;;
      case 'multi_step':
        return &lt;MultiStepCheckout theme={checkoutTheme} /&gt;;
      default:
        return &lt;DefaultCheckout theme={checkoutTheme} /&gt;;
    }
  }

  return &lt;DefaultCheckout theme={checkoutTheme} /&gt;;
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h5&gt;Targeting Rule Examples&lt;/h5&gt;
            &lt;pre&gt;&lt;code&gt;// Flag configuration examples

// 1. Gradual percentage rollout
const gradualRollout: FeatureFlag = {
  key: 'new_payment_flow',
  type: 'boolean',
  defaultValue: false,
  enabled: true,
  archived: false,
  rules: [
    // Always on for internal team
    {
      id: 'internal',
      conditions: [{ attribute: 'email', operator: 'contains', value: '@company.com' }],
      variation: true,
    },
    // Always on for beta users
    {
      id: 'beta',
      conditions: [{ attribute: 'subscription', operator: 'eq', value: 'beta' }],
      variation: true,
    },
    // 25% of remaining users
    {
      id: 'rollout',
      conditions: [],
      variation: true,
      percentage: 25,
    },
  ],
};

// 2. Geographic targeting
const geoTargeted: FeatureFlag = {
  key: 'local_currency',
  type: 'string',
  defaultValue: 'USD',
  enabled: true,
  archived: false,
  rules: [
    {
      id: 'europe',
      conditions: [{ attribute: 'country', operator: 'in', value: ['DE', 'FR', 'ES', 'IT'] }],
      variation: 'EUR',
    },
    {
      id: 'uk',
      conditions: [{ attribute: 'country', operator: 'eq', value: 'GB' }],
      variation: 'GBP',
    },
    {
      id: 'japan',
      conditions: [{ attribute: 'country', operator: 'eq', value: 'JP' }],
      variation: 'JPY',
    },
  ],
};

// 3. A/B experiment with hypothesis
const experiment: Experiment = {
  key: 'onboarding_v2',
  hypothesis: 'Reducing onboarding steps from 5 to 3 will increase completion rate',
  status: 'running',
  allocation: 50, // Only 50% of eligible users enter experiment
  targeting: [
    {
      id: 'new_users',
      conditions: [
        { attribute: 'signup_date', operator: 'gt', value: '2024-01-01' },
        { attribute: 'completed_onboarding', operator: 'eq', value: false },
      ],
      variation: 'eligible',
    },
  ],
  variants: [
    { key: 'control', weight: 50 }, // Current 5-step flow
    { key: 'treatment', weight: 50, payload: { steps: 3, skipIntro: true } },
  ],
  startDate: new Date('2024-01-15'),
};

// 4. Kill switch pattern
class KillSwitch {
  private sdk: FeatureFlagSDK;

  constructor(sdk: FeatureFlagSDK) {
    this.sdk = sdk;
  }

  async disable(flagKey: string, reason: string): Promise&lt;void&gt; {
    await fetch(\`\${API_URL}/flags/\${flagKey}/kill\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${ADMIN_TOKEN}\`,
      },
      body: JSON.stringify({
        reason,
        disabledBy: currentUser.email,
        timestamp: Date.now(),
      }),
    });

    // Force refresh all clients
    await this.sdk.forceRefresh();
  }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;O - Optimizations and Deep Dive&lt;/h4&gt;

            &lt;h5&gt;Performance Optimizations&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Cache-first architecture:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Network fetch blocks app startup&lt;/li&gt;
                        &lt;li&gt;Solution: Load cached flags from MMKV synchronously, fetch fresh in background&lt;/li&gt;
                        &lt;li&gt;Impact: Zero startup delay, flags available on first render&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Client-side evaluation:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Server-side evaluation adds network latency per flag check&lt;/li&gt;
                        &lt;li&gt;Solution: Download rules once, evaluate locally using murmurhash&lt;/li&gt;
                        &lt;li&gt;Impact: Sub-millisecond flag checks, works offline&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Exposure batching:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Tracking every flag check floods analytics&lt;/li&gt;
                        &lt;li&gt;Solution: Queue exposures, flush every 10s or on app background&lt;/li&gt;
                        &lt;li&gt;Impact: 90% reduction in analytics API calls&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;SSE streaming with reconnection:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: Polling is inefficient, WebSocket is heavyweight&lt;/li&gt;
                        &lt;li&gt;Solution: SSE (EventSource) with exponential backoff reconnection&lt;/li&gt;
                        &lt;li&gt;Impact: Real-time updates with minimal battery/network impact&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Selector-based subscriptions:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Problem: All components re-render when any flag changes&lt;/li&gt;
                        &lt;li&gt;Solution: Zustand with subscribeWithSelector, useSyncExternalStore per flag&lt;/li&gt;
                        &lt;li&gt;Impact: Only components using changed flag re-render&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Platform-Specific Considerations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Aspect&lt;/th&gt;&lt;th&gt;iOS&lt;/th&gt;&lt;th&gt;Android&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Background refresh&lt;/td&gt;&lt;td&gt;BGAppRefreshTask (limited)&lt;/td&gt;&lt;td&gt;WorkManager (more flexible)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;SSE connection&lt;/td&gt;&lt;td&gt;URLSession background config&lt;/td&gt;&lt;td&gt;Foreground service for long-lived&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Device ID&lt;/td&gt;&lt;td&gt;identifierForVendor (resets on uninstall)&lt;/td&gt;&lt;td&gt;Android ID (persistent)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Cache location&lt;/td&gt;&lt;td&gt;Documents directory (backed up)&lt;/td&gt;&lt;td&gt;Internal storage (app-private)&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;App state detection&lt;/td&gt;&lt;td&gt;UIApplication.shared.applicationState&lt;/td&gt;&lt;td&gt;ProcessLifecycleOwner&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Edge Cases and Error Handling&lt;/h5&gt;
            &lt;ol&gt;
                &lt;li&gt;&lt;strong&gt;First-time users:&lt;/strong&gt; No cached flags on first launch. Solution: Bootstrap config bundled in app, updated on first fetch. Use conservative defaults.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Stale assignments:&lt;/strong&gt; User assigned to variant then experiment ends. Solution: Check experiment status before returning variant, fallback to default gracefully.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Multiple exposures:&lt;/strong&gt; Same user sees flag multiple times per session. Solution: Track per-mount with useRef, dedupe in exposure queue by flagKey+session.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Anonymous to authenticated:&lt;/strong&gt; User signs up mid-session. Solution: Use deviceId for initial bucketing, persist assignment when userId becomes available.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Flag cleanup debt:&lt;/strong&gt; Old flags accumulate in codebase. Solution: Add flag expiration dates, lint rules for stale flags, periodic cleanup sprints.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Streaming disconnection:&lt;/strong&gt; SSE drops in poor network. Solution: Exponential backoff reconnection (1s, 2s, 4s...), max 30s, with jitter.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Conflicting rules:&lt;/strong&gt; Multiple rules match same user. Solution: Rules evaluated in order, first match wins. Document rule priority in admin UI.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Cross-platform consistency:&lt;/strong&gt; Same user gets different variant on web vs mobile. Solution: Use same bucketing algorithm (murmurhash3) and seed across all platforms.&lt;/li&gt;
            &lt;/ol&gt;

            &lt;h5&gt;Trade-offs and Alternatives&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Decision&lt;/th&gt;&lt;th&gt;Chosen&lt;/th&gt;&lt;th&gt;Alternative&lt;/th&gt;&lt;th&gt;Why Chosen&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Evaluation location&lt;/td&gt;&lt;td&gt;Client-side&lt;/td&gt;&lt;td&gt;Server-side&lt;/td&gt;&lt;td&gt;Speed, offline support, reduced backend load&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Update mechanism&lt;/td&gt;&lt;td&gt;SSE streaming&lt;/td&gt;&lt;td&gt;Polling / WebSocket&lt;/td&gt;&lt;td&gt;Lightweight, auto-reconnect, sufficient for one-way updates&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Bucketing algorithm&lt;/td&gt;&lt;td&gt;MurmurHash3&lt;/td&gt;&lt;td&gt;MD5 / SHA1&lt;/td&gt;&lt;td&gt;Faster, uniform distribution, 32-bit sufficient&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Build vs Buy&lt;/td&gt;&lt;td&gt;Custom SDK&lt;/td&gt;&lt;td&gt;LaunchDarkly / Statsig&lt;/td&gt;&lt;td&gt;Full control, no vendor lock-in, cost savings at scale&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Cache storage&lt;/td&gt;&lt;td&gt;MMKV&lt;/td&gt;&lt;td&gt;AsyncStorage&lt;/td&gt;&lt;td&gt;Synchronous reads critical for startup&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Exposure tracking&lt;/td&gt;&lt;td&gt;Batched queue&lt;/td&gt;&lt;td&gt;Immediate send&lt;/td&gt;&lt;td&gt;Network efficiency, acceptable latency for analytics&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h5&gt;Testing Strategy&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Unit Tests:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;MurmurHash bucketing produces uniform distribution&lt;/li&gt;
                        &lt;li&gt;Rule evaluation matches expected outcomes&lt;/li&gt;
                        &lt;li&gt;Condition operators (eq, contains, in, regex) work correctly&lt;/li&gt;
                        &lt;li&gt;Percentage rollout boundaries are correct (0-24 = 25%)&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Integration Tests:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Cache persistence survives app restart&lt;/li&gt;
                        &lt;li&gt;SSE updates propagate to store and UI&lt;/li&gt;
                        &lt;li&gt;Exposure events are batched and sent correctly&lt;/li&gt;
                        &lt;li&gt;Offline mode uses cached values&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;E2E Tests:&lt;/strong&gt;
                    &lt;ul&gt;
                        &lt;li&gt;Flag change in admin UI reflects in app within 5s&lt;/li&gt;
                        &lt;li&gt;Same user always gets same variant across sessions&lt;/li&gt;
                        &lt;li&gt;Kill switch disables feature immediately&lt;/li&gt;
                        &lt;li&gt;Analytics receives correct exposure events&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Interview Discussion Points&lt;/h5&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you ensure consistent bucketing?&lt;/strong&gt;&lt;br/&gt;A: Use deterministic hashing (MurmurHash3) with userId + flagKey as input. Hash output mod 100 gives bucket 0-99. Same input always produces same bucket. Critical: use same algorithm across all platforms (web, iOS, Android).&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: Server-side vs client-side evaluation trade-offs?&lt;/strong&gt;&lt;br/&gt;A: Client-side: sub-ms latency, works offline, but rules are visible in app bundle. Server-side: rules are secret, but adds network latency and requires connectivity. Hybrid: download rules, evaluate locally, best of both.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you handle statistical significance?&lt;/strong&gt;&lt;br/&gt;A: Use experiment platforms (Statsig, Amplitude) with built-in significance testing. Minimum sample size calculation before experiment. Avoid peeking at results early. Consider sequential testing for early stopping.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: How do you prevent flag debt?&lt;/strong&gt;&lt;br/&gt;A: Add expiration dates to flags. Lint rules that warn on flags past expiration. Quarterly cleanup sprints. Dashboard showing flag age and usage. Auto-archive flags at 100% rollout after grace period.&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Q: What are guardrail metrics?&lt;/strong&gt;&lt;br/&gt;A: Metrics you monitor to ensure experiment doesn't cause unintended harm even if primary metric improves. Examples: crash rate, latency, customer support tickets. Auto-disable experiment if guardrails breach thresholds.&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h5&gt;Library Recommendations&lt;/h5&gt;
            &lt;table&gt;
                &lt;tr&gt;&lt;th&gt;Concern&lt;/th&gt;&lt;th&gt;Library&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Feature Flags (SaaS)&lt;/td&gt;&lt;td&gt;LaunchDarkly&lt;/td&gt;&lt;td&gt;Enterprise-grade, streaming updates, robust SDKs&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Experimentation (SaaS)&lt;/td&gt;&lt;td&gt;Statsig / Amplitude Experiment&lt;/td&gt;&lt;td&gt;Built-in statistical analysis, experiment lifecycle&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Firebase (Free tier)&lt;/td&gt;&lt;td&gt;Firebase Remote Config&lt;/td&gt;&lt;td&gt;Free, good React Native SDK, A/B testing support&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Self-hosted&lt;/td&gt;&lt;td&gt;Unleash / Flagsmith / GrowthBook&lt;/td&gt;&lt;td&gt;Open-source, full control, on-premise deployment&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Caching&lt;/td&gt;&lt;td&gt;react-native-mmkv&lt;/td&gt;&lt;td&gt;Synchronous reads, instant flag access on startup&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Hashing&lt;/td&gt;&lt;td&gt;murmurhash&lt;/td&gt;&lt;td&gt;Fast, consistent bucketing for percentage rollouts&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;State Management&lt;/td&gt;&lt;td&gt;zustand&lt;/td&gt;&lt;td&gt;Lightweight, selector subscriptions, React 18 ready&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;SSE Client&lt;/td&gt;&lt;td&gt;react-native-sse&lt;/td&gt;&lt;td&gt;Native EventSource implementation for RN&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;
        `
    },
];

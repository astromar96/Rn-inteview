// Comprehensive React Native Interview Questions Database
const questionsData = [
    // ==================== CORE REACT NATIVE ====================
    {
        id: 1,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the difference between React Native and React.js. How does React Native render components?",
        difficulty: "beginner",
        answer: `
            <h4>Key Differences</h4>
            <ul>
                <li><strong>React.js</strong> renders to the DOM using ReactDOM, creating HTML elements</li>
                <li><strong>React Native</strong> renders to native platform components through a bridge</li>
            </ul>

            <h4>React Native Rendering Process</h4>
            <ol>
                <li>JavaScript code runs in a JS engine (Hermes/JSC)</li>
                <li>React reconciles the virtual DOM</li>
                <li>Native commands are sent across the bridge (or via JSI in new architecture)</li>
                <li>Native UI components are rendered (UIView on iOS, android.view on Android)</li>
            </ol>

            <h4>Component Mapping Examples</h4>
            <pre><code>// React Native → Native Components
&lt;View&gt; → UIView (iOS) / android.view.View (Android)
&lt;Text&gt; → UITextView / TextView
&lt;Image&gt; → UIImageView / ImageView
&lt;ScrollView&gt; → UIScrollView / ScrollView</code></pre>
        `
    },
    {
        id: 2,
        category: "Core React Native",
        icon: "⚛️",
        question: "What is the Virtual DOM and how does React Native's reconciliation work?",
        difficulty: "intermediate",
        answer: `
            <h4>Virtual DOM Concept</h4>
            <p>The Virtual DOM is a lightweight JavaScript representation of the actual UI. React maintains this virtual representation and uses it to compute the minimal set of changes needed.</p>

            <h4>Reconciliation Process</h4>
            <ol>
                <li><strong>Diffing:</strong> React compares the new virtual tree with the previous one</li>
                <li><strong>Keys:</strong> Uses keys to identify which items have changed in lists</li>
                <li><strong>Batching:</strong> Groups multiple updates together for efficiency</li>
                <li><strong>Commit:</strong> Applies the computed changes to native views</li>
            </ol>

            <h4>Optimization Strategies</h4>
            <ul>
                <li>Use <code>React.memo()</code> for functional components</li>
                <li>Implement <code>shouldComponentUpdate</code> for class components</li>
                <li>Always use stable keys for list items (not array index)</li>
                <li>Avoid creating new objects/functions in render</li>
            </ul>
        `
    },
    {
        id: 3,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the component lifecycle in React Native. How do hooks relate to lifecycle methods?",
        difficulty: "intermediate",
        answer: `
            <h4>Class Component Lifecycle</h4>
            <pre><code>// Mounting
constructor() → getDerivedStateFromProps() → render() → componentDidMount()

// Updating
getDerivedStateFromProps() → shouldComponentUpdate() → render() →
getSnapshotBeforeUpdate() → componentDidUpdate()

// Unmounting
componentWillUnmount()</code></pre>

            <h4>Hooks Equivalents</h4>
            <pre><code>// componentDidMount
useEffect(() => {
    // mount logic
}, []);

// componentDidUpdate
useEffect(() => {
    // update logic
}, [dependency]);

// componentWillUnmount
useEffect(() => {
    return () => {
        // cleanup logic
    };
}, []);

// getDerivedStateFromProps
const [state, setState] = useState();
useMemo(() => {
    // derive state from props
}, [props]);</code></pre>
        `
    },
    {
        id: 4,
        category: "Core React Native",
        icon: "⚛️",
        question: "What are the differences between FlatList and ScrollView? When would you use each?",
        difficulty: "intermediate",
        answer: `
            <h4>ScrollView</h4>
            <ul>
                <li>Renders all children at once</li>
                <li>Good for small, bounded lists</li>
                <li>Simple API, no required props</li>
                <li>Can scroll horizontally and vertically</li>
            </ul>

            <h4>FlatList</h4>
            <ul>
                <li>Virtualizes content - only renders visible items</li>
                <li>Memory efficient for large datasets</li>
                <li>Built-in pull-to-refresh, infinite scroll</li>
                <li>Requires <code>data</code> and <code>renderItem</code> props</li>
            </ul>

            <h4>FlatList Optimization Props</h4>
            <pre><code>&lt;FlatList
    data={items}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
    })}
    windowSize={5}
    maxToRenderPerBatch={10}
    initialNumToRender={10}
    removeClippedSubviews={true}
/&gt;</code></pre>

            <h4>When to Use</h4>
            <ul>
                <li><strong>ScrollView:</strong> &lt;50 items, mixed content layouts</li>
                <li><strong>FlatList:</strong> Large lists, homogeneous data</li>
                <li><strong>SectionList:</strong> Grouped data with headers</li>
            </ul>
        `
    },
    {
        id: 5,
        category: "Core React Native",
        icon: "⚛️",
        question: "How do you handle platform-specific code in React Native?",
        difficulty: "beginner",
        answer: `
            <h4>1. Platform Module</h4>
            <pre><code>import { Platform } from 'react-native';

// Platform.OS check
const styles = {
    container: {
        paddingTop: Platform.OS === 'ios' ? 44 : 0,
    }
};

// Platform.select
const component = Platform.select({
    ios: () => require('./ComponentIOS'),
    android: () => require('./ComponentAndroid'),
    default: () => require('./ComponentDefault'),
})();</code></pre>

            <h4>2. Platform-Specific File Extensions</h4>
            <pre><code>// File structure
Component.ios.js
Component.android.js
Component.js (fallback)

// Import automatically resolves
import Component from './Component';</code></pre>

            <h4>3. Platform Version Check</h4>
            <pre><code>if (Platform.Version >= 21) {
    // Android Lollipop+ specific code
}

if (parseInt(Platform.Version, 10) >= 14) {
    // iOS 14+ specific code
}</code></pre>
        `
    },
    {
        id: 6,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the purpose and usage of useCallback and useMemo hooks in React Native.",
        difficulty: "intermediate",
        answer: `
            <h4>useMemo - Memoize Values</h4>
            <p>Caches computed values to avoid expensive recalculations:</p>
            <pre><code>const expensiveValue = useMemo(() => {
    return items.filter(item => item.active)
                .map(item => transform(item));
}, [items]); // Only recomputes when items change</code></pre>

            <h4>useCallback - Memoize Functions</h4>
            <p>Caches function references to maintain referential equality:</p>
            <pre><code>const handlePress = useCallback((id) => {
    setSelectedId(id);
    onItemSelect(id);
}, [onItemSelect]); // Stable reference unless onItemSelect changes

// Important for FlatList optimization
&lt;FlatList
    data={items}
    renderItem={({ item }) => (
        &lt;Item onPress={handlePress} data={item} /&gt;
    )}
/&gt;</code></pre>

            <h4>When to Use</h4>
            <ul>
                <li><strong>useMemo:</strong> Expensive computations, derived state</li>
                <li><strong>useCallback:</strong> Passing callbacks to optimized child components</li>
                <li><strong>Don't overuse:</strong> Premature optimization adds complexity</li>
            </ul>
        `
    },

    // ==================== NAVIGATION ====================
    {
        id: 7,
        category: "Navigation",
        icon: "🧭",
        question: "Compare different navigation solutions in React Native. Why is React Navigation the most popular?",
        difficulty: "intermediate",
        answer: `
            <h4>Navigation Solutions</h4>
            <table>
                <tr><td><strong>React Navigation</strong></td><td>Most popular, JS-based, highly customizable</td></tr>
                <tr><td><strong>React Native Navigation</strong></td><td>Native implementation, better performance, complex setup</td></tr>
                <tr><td><strong>Expo Router</strong></td><td>File-based routing, built on React Navigation</td></tr>
            </table>

            <h4>React Navigation Advantages</h4>
            <ul>
                <li>Pure JavaScript - easier debugging</li>
                <li>Extensive documentation and community</li>
                <li>Works with Expo out of the box</li>
                <li>Highly customizable animations and gestures</li>
                <li>TypeScript support</li>
            </ul>

            <h4>Navigator Types</h4>
            <pre><code>// Stack Navigator - push/pop screens
&lt;Stack.Navigator&gt;
    &lt;Stack.Screen name="Home" component={Home} /&gt;
&lt;/Stack.Navigator&gt;

// Tab Navigator - bottom/top tabs
&lt;Tab.Navigator&gt;
    &lt;Tab.Screen name="Feed" component={Feed} /&gt;
&lt;/Tab.Navigator&gt;

// Drawer Navigator - side menu
&lt;Drawer.Navigator&gt;
    &lt;Drawer.Screen name="Settings" component={Settings} /&gt;
&lt;/Drawer.Navigator&gt;</code></pre>
        `
    },
    {
        id: 8,
        category: "Navigation",
        icon: "🧭",
        question: "How do you pass parameters between screens and handle deep linking in React Navigation?",
        difficulty: "intermediate",
        answer: `
            <h4>Passing Parameters</h4>
            <pre><code>// Sending params
navigation.navigate('Details', {
    itemId: 42,
    title: 'Product'
});

// Receiving params
function DetailsScreen({ route }) {
    const { itemId, title } = route.params;
}

// With TypeScript
type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number; title: string };
};

type Props = NativeStackScreenProps&lt;RootStackParamList, 'Details'&gt;;</code></pre>

            <h4>Deep Linking Configuration</h4>
            <pre><code>const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
        screens: {
            Home: '',
            Details: 'details/:itemId',
            Profile: {
                path: 'user/:id',
                parse: { id: Number }
            }
        }
    }
};

&lt;NavigationContainer linking={linking}&gt;
    {/* navigators */}
&lt;/NavigationContainer&gt;</code></pre>

            <h4>Universal Links Setup</h4>
            <ul>
                <li>iOS: apple-app-site-association file</li>
                <li>Android: intent filters in AndroidManifest.xml</li>
            </ul>
        `
    },
    {
        id: 9,
        category: "Navigation",
        icon: "🧭",
        question: "How do you implement authentication flow with protected routes in React Navigation?",
        difficulty: "advanced",
        answer: `
            <h4>Authentication Flow Pattern</h4>
            <pre><code>function RootNavigator() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return &lt;SplashScreen /&gt;;
    }

    return (
        &lt;Stack.Navigator screenOptions={{ headerShown: false }}&gt;
            {user ? (
                // Authenticated screens
                &lt;Stack.Screen name="Main" component={MainNavigator} /&gt;
            ) : (
                // Auth screens
                &lt;Stack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{ animationTypeForReplace: 'pop' }}
                /&gt;
            )}
        &lt;/Stack.Navigator&gt;
    );
}</code></pre>

            <h4>Auth Context</h4>
            <pre><code>const AuthContext = createContext&lt;AuthContextType&gt;(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check stored token on mount
        checkAuthState();
    }, []);

    const signIn = async (credentials) => {
        const userData = await authService.login(credentials);
        await SecureStore.setItemAsync('token', userData.token);
        setUser(userData);
    };

    return (
        &lt;AuthContext.Provider value={{ user, signIn, signOut, isLoading }}&gt;
            {children}
        &lt;/AuthContext.Provider&gt;
    );
}</code></pre>
        `
    },

    // ==================== STATE MANAGEMENT ====================
    {
        id: 10,
        category: "State Management",
        icon: "🗃️",
        question: "Compare Redux, Context API, Zustand, and Jotai. When would you use each?",
        difficulty: "advanced",
        answer: `
            <h4>Comparison Table</h4>
            <ul>
                <li><strong>Redux:</strong> Predictable, time-travel debugging, large apps, team standards</li>
                <li><strong>Context API:</strong> Built-in, low-frequency updates, theme/auth state</li>
                <li><strong>Zustand:</strong> Simple API, no boilerplate, good performance</li>
                <li><strong>Jotai:</strong> Atomic state, fine-grained updates, React-centric</li>
            </ul>

            <h4>Redux Toolkit Example</h4>
            <pre><code>const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, loading: false },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});</code></pre>

            <h4>Zustand Example</h4>
            <pre><code>const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null })
}));

// Usage - no Provider needed!
const user = useStore((state) => state.user);</code></pre>

            <h4>Recommendations</h4>
            <ul>
                <li><strong>Small app:</strong> Context + useReducer or Zustand</li>
                <li><strong>Large app:</strong> Redux Toolkit or Zustand</li>
                <li><strong>Server state:</strong> React Query / TanStack Query</li>
            </ul>
        `
    },
    {
        id: 11,
        category: "State Management",
        icon: "🗃️",
        question: "What is React Query/TanStack Query and why is it important for React Native apps?",
        difficulty: "intermediate",
        answer: `
            <h4>What is TanStack Query?</h4>
            <p>A powerful data-fetching and caching library that handles server state separately from client state.</p>

            <h4>Key Features</h4>
            <ul>
                <li>Automatic caching and cache invalidation</li>
                <li>Background refetching</li>
                <li>Pagination and infinite scroll support</li>
                <li>Optimistic updates</li>
                <li>Offline support</li>
            </ul>

            <h4>Basic Usage</h4>
            <pre><code>// Query - fetching data
const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutation - modifying data
const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }
});

// Optimistic Update
const mutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
        await queryClient.cancelQueries(['todos']);
        const previous = queryClient.getQueryData(['todos']);
        queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
        return { previous };
    },
    onError: (err, newTodo, context) => {
        queryClient.setQueryData(['todos'], context.previous);
    }
});</code></pre>
        `
    },
    {
        id: 12,
        category: "State Management",
        icon: "🗃️",
        question: "How do you handle global state persistence in React Native?",
        difficulty: "intermediate",
        answer: `
            <h4>AsyncStorage Basics</h4>
            <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('user', JSON.stringify(userData));

// Retrieve data
const jsonValue = await AsyncStorage.getItem('user');
const user = jsonValue != null ? JSON.parse(jsonValue) : null;

// Remove data
await AsyncStorage.removeItem('user');</code></pre>

            <h4>Redux Persist</h4>
            <pre><code>import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'settings'], // only persist these
    blacklist: ['ui'], // don't persist these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});</code></pre>

            <h4>Zustand Persist</h4>
            <pre><code>import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);</code></pre>
        `
    },

    // ==================== PERFORMANCE ====================
    {
        id: 13,
        category: "Performance",
        icon: "⚡",
        question: "What are the main causes of performance issues in React Native and how do you diagnose them?",
        difficulty: "advanced",
        answer: `
            <h4>Common Performance Issues</h4>
            <ul>
                <li><strong>JS Thread Blocking:</strong> Heavy computations, large state updates</li>
                <li><strong>Bridge Congestion:</strong> Too much data passing between JS and native</li>
                <li><strong>Re-renders:</strong> Unnecessary component updates</li>
                <li><strong>Memory Leaks:</strong> Uncleared timers, listeners, subscriptions</li>
                <li><strong>Large Lists:</strong> Not using FlatList correctly</li>
            </ul>

            <h4>Diagnostic Tools</h4>
            <pre><code>// React DevTools Profiler
// - Identifies slow components
// - Shows render counts and timing

// Flipper
// - Native and JS debugging
// - Network inspector
// - Performance monitoring

// React Native Performance Monitor
// - In-app FPS monitor
// - Shake device → "Show Perf Monitor"

// Systrace (Android)
npx react-native start --reset-cache
// Enable systrace in Dev Menu</code></pre>

            <h4>Key Metrics to Monitor</h4>
            <ul>
                <li><strong>JS FPS:</strong> Should stay at 60fps</li>
                <li><strong>UI FPS:</strong> Native thread responsiveness</li>
                <li><strong>RAM Usage:</strong> Memory consumption trends</li>
                <li><strong>TTI:</strong> Time to Interactive on app launch</li>
            </ul>
        `
    },
    {
        id: 14,
        category: "Performance",
        icon: "⚡",
        question: "How do you optimize FlatList for rendering thousands of items?",
        difficulty: "advanced",
        answer: `
            <h4>Essential Optimizations</h4>
            <pre><code>&lt;FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}

    // Layout optimization - CRITICAL for performance
    getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })}

    // Virtualization tuning
    windowSize={5}              // Render 5 screens worth
    maxToRenderPerBatch={10}    // Items per batch
    updateCellsBatchingPeriod={50}
    initialNumToRender={10}

    // Memory optimization
    removeClippedSubviews={true}

    // Prevent re-renders
    extraData={selectedId}      // Only when needed
/&gt;</code></pre>

            <h4>Component Optimization</h4>
            <pre><code>// Memoize renderItem
const renderItem = useCallback(({ item }) => (
    &lt;MemoizedItem item={item} onPress={handlePress} /&gt;
), [handlePress]);

// Memoize list items
const MemoizedItem = React.memo(({ item, onPress }) => (
    &lt;TouchableOpacity onPress={() => onPress(item.id)}&gt;
        &lt;Text&gt;{item.title}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
), (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
});</code></pre>

            <h4>Advanced: FlashList</h4>
            <pre><code>// Shopify's FlashList - drop-in replacement
import { FlashList } from "@shopify/flash-list";

&lt;FlashList
    data={data}
    renderItem={renderItem}
    estimatedItemSize={80}  // Required
/&gt;</code></pre>
        `
    },
    {
        id: 15,
        category: "Performance",
        icon: "⚡",
        question: "Explain Hermes and its benefits. How does it improve React Native performance?",
        difficulty: "intermediate",
        answer: `
            <h4>What is Hermes?</h4>
            <p>Hermes is a JavaScript engine optimized specifically for React Native, developed by Meta.</p>

            <h4>Key Benefits</h4>
            <ul>
                <li><strong>Faster App Launch:</strong> Bytecode precompilation reduces startup time</li>
                <li><strong>Lower Memory Usage:</strong> Optimized garbage collection</li>
                <li><strong>Smaller App Size:</strong> Bytecode is smaller than minified JS</li>
                <li><strong>Better Performance:</strong> Optimized for mobile constraints</li>
            </ul>

            <h4>Enabling Hermes</h4>
            <pre><code>// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]

// iOS - Podfile
use_react_native!(
    :hermes_enabled => true
)

// Then run
cd ios && pod install</code></pre>

            <h4>Performance Comparison</h4>
            <ul>
                <li>TTI (Time to Interactive): ~30-40% faster</li>
                <li>Memory: ~20-30% reduction</li>
                <li>App Size: ~10-20% smaller</li>
            </ul>

            <h4>Debugging with Hermes</h4>
            <pre><code>// Use Flipper for debugging
// Chrome DevTools via Flipper plugin
// Direct debugging: chrome://inspect</code></pre>
        `
    },
    {
        id: 16,
        category: "Performance",
        icon: "⚡",
        question: "How do you prevent unnecessary re-renders in React Native?",
        difficulty: "intermediate",
        answer: `
            <h4>1. React.memo for Functional Components</h4>
            <pre><code>const MyComponent = React.memo(({ data, onPress }) => {
    return &lt;View&gt;...&lt;/View&gt;;
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.data.id === nextProps.data.id;
});</code></pre>

            <h4>2. useCallback for Event Handlers</h4>
            <pre><code>// ❌ Bad - new function every render
&lt;Button onPress={() => handlePress(id)} /&gt;

// ✅ Good - stable function reference
const handlePressCallback = useCallback(() => {
    handlePress(id);
}, [id, handlePress]);

&lt;Button onPress={handlePressCallback} /&gt;</code></pre>

            <h4>3. useMemo for Expensive Computations</h4>
            <pre><code>const filteredData = useMemo(() => {
    return data.filter(item => item.active)
               .sort((a, b) => a.name.localeCompare(b.name));
}, [data]);</code></pre>

            <h4>4. State Structure Optimization</h4>
            <pre><code>// ❌ Bad - entire component re-renders
const [state, setState] = useState({ user: null, posts: [], ui: {} });

// ✅ Good - separate concerns
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [ui, setUi] = useState({});</code></pre>

            <h4>5. Context Splitting</h4>
            <pre><code>// Split context to prevent cascading re-renders
const UserContext = createContext();
const UserDispatchContext = createContext();</code></pre>
        `
    },

    // ==================== NATIVE MODULES ====================
    {
        id: 17,
        category: "Native Modules",
        icon: "🔧",
        question: "Explain the React Native Bridge architecture. What are its limitations?",
        difficulty: "advanced",
        answer: `
            <h4>Bridge Architecture (Old Architecture)</h4>
            <p>The bridge is an asynchronous, serialized, batched communication layer between JavaScript and Native.</p>

            <h4>How It Works</h4>
            <ol>
                <li>JS code makes a native call</li>
                <li>Call is serialized to JSON</li>
                <li>JSON is sent across the bridge asynchronously</li>
                <li>Native side deserializes and executes</li>
                <li>Response follows the same path back</li>
            </ol>

            <h4>Bridge Limitations</h4>
            <ul>
                <li><strong>Asynchronous:</strong> No synchronous calls possible</li>
                <li><strong>Serialization Overhead:</strong> JSON encoding/decoding is costly</li>
                <li><strong>No Type Safety:</strong> All data is serialized as JSON</li>
                <li><strong>Single Threaded:</strong> Bridge operations are queued</li>
                <li><strong>Memory Copies:</strong> Data is copied between realms</li>
            </ul>

            <h4>Performance Impact</h4>
            <pre><code>// Heavy bridge traffic example
// Each frame sends layout data across bridge
// 60fps × multiple views = thousands of bridge calls/second

// Gestures are particularly affected
// Touch events must cross bridge for JS handling</code></pre>
        `
    },
    {
        id: 18,
        category: "Native Modules",
        icon: "🔧",
        question: "How do you create a Native Module for iOS and Android?",
        difficulty: "advanced",
        answer: `
            <h4>iOS Native Module (Objective-C)</h4>
            <pre><code>// CalendarModule.m
#import &lt;React/RCTBridgeModule.h&gt;

@interface CalendarModule : NSObject &lt;RCTBridgeModule&gt;
@end

@implementation CalendarModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createEvent:(NSString *)title
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    // Native implementation
    resolve(@{@"eventId": @"123"});
}

@end</code></pre>

            <h4>Android Native Module (Kotlin)</h4>
            <pre><code>// CalendarModule.kt
class CalendarModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CalendarModule"

    @ReactMethod
    fun createEvent(title: String, location: String, promise: Promise) {
        try {
            // Native implementation
            promise.resolve(mapOf("eventId" to "123"))
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
}</code></pre>

            <h4>JavaScript Usage</h4>
            <pre><code>import { NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;

const result = await CalendarModule.createEvent(
    'Meeting',
    'Office'
);</code></pre>
        `
    },
    {
        id: 19,
        category: "Native Modules",
        icon: "🔧",
        question: "What is JSI and how does it differ from the traditional bridge?",
        difficulty: "advanced",
        answer: `
            <h4>JavaScript Interface (JSI)</h4>
            <p>JSI is a lightweight C++ layer that allows JavaScript to directly hold references to C++ objects and invoke methods on them.</p>

            <h4>Key Differences from Bridge</h4>
            <table>
                <tr><td><strong>Bridge</strong></td><td><strong>JSI</strong></td></tr>
                <tr><td>Asynchronous only</td><td>Synchronous + Async</td></tr>
                <tr><td>JSON serialization</td><td>Direct memory access</td></tr>
                <tr><td>Data copying</td><td>Shared ownership</td></tr>
                <tr><td>Batched calls</td><td>Immediate execution</td></tr>
            </table>

            <h4>JSI Benefits</h4>
            <ul>
                <li><strong>Zero-copy data sharing:</strong> ArrayBuffer shared between JS and native</li>
                <li><strong>Synchronous calls:</strong> Critical for animations and gestures</li>
                <li><strong>Type safety:</strong> Direct C++ bindings</li>
                <li><strong>Lazy loading:</strong> Load native modules on demand</li>
            </ul>

            <h4>JSI Example</h4>
            <pre><code>// JSI Host Object (C++)
class MyModule : public jsi::HostObject {
public:
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override {
        if (name.utf8(rt) == "multiply") {
            return jsi::Function::createFromHostFunction(rt, name, 2,
                [](jsi::Runtime& rt, const jsi::Value& thisVal,
                   const jsi::Value* args, size_t count) {
                    double a = args[0].asNumber();
                    double b = args[1].asNumber();
                    return jsi::Value(a * b);
                });
        }
        return jsi::Value::undefined();
    }
};</code></pre>
        `
    },

    // ==================== NEW ARCHITECTURE ====================
    {
        id: 20,
        category: "New Architecture",
        icon: "🏗️",
        question: "Explain the React Native New Architecture: Fabric, TurboModules, and Codegen.",
        difficulty: "advanced",
        answer: `
            <h4>Three Pillars of New Architecture</h4>

            <h4>1. Fabric (New Renderer)</h4>
            <ul>
                <li>Replaces the old UI Manager</li>
                <li>Written in C++ for cross-platform consistency</li>
                <li>Enables synchronous layout measurements</li>
                <li>Supports concurrent rendering features</li>
            </ul>

            <h4>2. TurboModules</h4>
            <ul>
                <li>Replacement for Native Modules</li>
                <li>Lazy loading - modules loaded on first use</li>
                <li>Direct JSI bindings - no bridge serialization</li>
                <li>Type-safe interfaces via Codegen</li>
            </ul>

            <h4>3. Codegen</h4>
            <ul>
                <li>Generates native interface code from TypeScript specs</li>
                <li>Ensures type safety between JS and native</li>
                <li>Reduces boilerplate code</li>
            </ul>

            <h4>Enabling New Architecture</h4>
            <pre><code>// Android - gradle.properties
newArchEnabled=true

// iOS - Podfile
ENV['RCT_NEW_ARCH_ENABLED'] = '1'

// Run
cd ios && RCT_NEW_ARCH_ENABLED=1 pod install</code></pre>

            <h4>Benefits</h4>
            <ul>
                <li>Improved performance (no bridge bottleneck)</li>
                <li>Better type safety</li>
                <li>Concurrent rendering support</li>
                <li>Consistent behavior across platforms</li>
            </ul>
        `
    },
    {
        id: 21,
        category: "New Architecture",
        icon: "🏗️",
        question: "How do you migrate an existing app to the New Architecture?",
        difficulty: "advanced",
        answer: `
            <h4>Migration Steps</h4>

            <h4>1. Prerequisites</h4>
            <pre><code>// Ensure RN 0.71+ (recommended 0.73+)
// Update all dependencies
npx react-native upgrade

// Check library compatibility
npx react-native-new-arch-check</code></pre>

            <h4>2. Enable New Architecture</h4>
            <pre><code>// android/gradle.properties
newArchEnabled=true

// iOS Podfile
ENV['RCT_NEW_ARCH_ENABLED'] = '1'</code></pre>

            <h4>3. Update Native Modules to TurboModules</h4>
            <pre><code>// Create spec file: NativeCalendar.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    createEvent(title: string, location: string): Promise&lt;string&gt;;
}

export default TurboModuleRegistry.getEnforcing&lt;Spec&gt;(
    'Calendar'
);</code></pre>

            <h4>4. Update Native Components to Fabric</h4>
            <pre><code>// Create component spec
// MyComponentNativeComponent.ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

interface NativeProps extends ViewProps {
    color?: string;
    enabled?: boolean;
}

export default codegenNativeComponent&lt;NativeProps&gt;('MyComponent');</code></pre>

            <h4>Common Migration Issues</h4>
            <ul>
                <li>Third-party libraries not yet compatible</li>
                <li>Direct native code modifications needed</li>
                <li>Testing thoroughly on both platforms</li>
            </ul>
        `
    },

    // ==================== ANIMATIONS ====================
    {
        id: 22,
        category: "Animations",
        icon: "✨",
        question: "Compare Animated API vs Reanimated. When should you use each?",
        difficulty: "intermediate",
        answer: `
            <h4>Animated API (Built-in)</h4>
            <ul>
                <li>Ships with React Native</li>
                <li>Uses bridge for JS-driven animations</li>
                <li>useNativeDriver for basic transforms</li>
                <li>Good for simple animations</li>
            </ul>

            <h4>Reanimated 2/3</h4>
            <ul>
                <li>Runs entirely on UI thread</li>
                <li>Worklets - JS functions running on native</li>
                <li>No bridge bottleneck</li>
                <li>Complex gesture-driven animations</li>
            </ul>

            <h4>Animated API Example</h4>
            <pre><code>const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true, // Important!
    }).start();
}, []);

&lt;Animated.View style={{ opacity: fadeAnim }}&gt;
    &lt;Text&gt;Fade In&lt;/Text&gt;
&lt;/Animated.View&gt;</code></pre>

            <h4>Reanimated Example</h4>
            <pre><code>import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';

const offset = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
}));

const handlePress = () => {
    offset.value = withSpring(offset.value + 50);
};

&lt;Animated.View style={[styles.box, animatedStyle]} /&gt;</code></pre>

            <h4>Use Cases</h4>
            <ul>
                <li><strong>Animated:</strong> Simple fades, basic transforms, progress bars</li>
                <li><strong>Reanimated:</strong> Gesture-driven, complex sequences, shared element transitions</li>
            </ul>
        `
    },
    {
        id: 23,
        category: "Animations",
        icon: "✨",
        question: "How do you implement gesture-driven animations with Reanimated and Gesture Handler?",
        difficulty: "advanced",
        answer: `
            <h4>Setup</h4>
            <pre><code>npm install react-native-reanimated react-native-gesture-handler

// babel.config.js
plugins: ['react-native-reanimated/plugin']

// Wrap app with GestureHandlerRootView</code></pre>

            <h4>Pan Gesture with Animation</h4>
            <pre><code>import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';

function DraggableBox() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({ x: 0, y: 0 });

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = {
                x: translateX.value,
                y: translateY.value
            };
        })
        .onUpdate((event) => {
            translateX.value = context.value.x + event.translationX;
            translateY.value = context.value.y + event.translationY;
        })
        .onEnd(() => {
            // Spring back to origin
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        &lt;GestureDetector gesture={gesture}&gt;
            &lt;Animated.View style={[styles.box, animatedStyle]} /&gt;
        &lt;/GestureDetector&gt;
    );
}</code></pre>
        `
    },
    {
        id: 24,
        category: "Animations",
        icon: "✨",
        question: "What is LayoutAnimation and when should you use it?",
        difficulty: "beginner",
        answer: `
            <h4>What is LayoutAnimation?</h4>
            <p>LayoutAnimation automatically animates views to their new positions when the next layout change happens.</p>

            <h4>Basic Usage</h4>
            <pre><code>import { LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable on Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function MyComponent() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        &lt;View&gt;
            &lt;TouchableOpacity onPress={toggleExpand}&gt;
                &lt;Text&gt;Toggle&lt;/Text&gt;
            &lt;/TouchableOpacity&gt;
            &lt;View style={{ height: expanded ? 200 : 100 }} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Custom Configuration</h4>
            <pre><code>LayoutAnimation.configureNext({
    duration: 300,
    create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
    },
    delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.opacity,
    },
});</code></pre>

            <h4>When to Use</h4>
            <ul>
                <li>List item additions/removals</li>
                <li>Expanding/collapsing sections</li>
                <li>Simple layout transitions</li>
                <li>Not for continuous or gesture-driven animations</li>
            </ul>
        `
    },

    // ==================== TESTING ====================
    {
        id: 25,
        category: "Testing",
        icon: "🧪",
        question: "Explain the testing pyramid for React Native apps. What tools would you use at each level?",
        difficulty: "intermediate",
        answer: `
            <h4>Testing Pyramid</h4>
            <pre><code>        /\\
       /E2E\\      ← Detox, Appium, Maestro
      /------\\
     / Integ  \\   ← React Native Testing Library
    /----------\\
   /    Unit    \\ ← Jest, React Test Renderer
  /--------------\\</code></pre>

            <h4>Unit Tests (Jest)</h4>
            <pre><code>// Testing utilities and hooks
describe('formatCurrency', () => {
    it('formats USD correctly', () => {
        expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });
});

// Testing custom hooks
import { renderHook, act } from '@testing-library/react-hooks';

test('useCounter increments', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
});</code></pre>

            <h4>Component Tests (RNTL)</h4>
            <pre><code>import { render, fireEvent } from '@testing-library/react-native';

test('button calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(&lt;Button onPress={onPress}&gt;Click&lt;/Button&gt;);

    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
});</code></pre>

            <h4>E2E Tests (Detox)</h4>
            <pre><code>describe('Login Flow', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should login successfully', async () => {
        await element(by.id('email')).typeText('user@test.com');
        await element(by.id('password')).typeText('password');
        await element(by.id('login-btn')).tap();
        await expect(element(by.id('home-screen'))).toBeVisible();
    });
});</code></pre>
        `
    },
    {
        id: 26,
        category: "Testing",
        icon: "🧪",
        question: "How do you mock native modules and platform-specific code in tests?",
        difficulty: "advanced",
        answer: `
            <h4>Mocking Native Modules</h4>
            <pre><code>// __mocks__/react-native-camera.js
export default {
    takePictureAsync: jest.fn().mockResolvedValue({ uri: 'mock-uri' }),
};

// jest.setup.js
jest.mock('react-native-camera');

// Or inline mock
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);</code></pre>

            <h4>Mocking Platform</h4>
            <pre><code>// Test iOS-specific code
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    Version: '14.0',
    select: jest.fn((objs) => objs.ios),
}));

// Or use doMock for test-specific mocks
beforeEach(() => {
    jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
        Version: 30,
    }));
});</code></pre>

            <h4>Mocking NativeModules</h4>
            <pre><code>// jest.setup.js
import { NativeModules } from 'react-native';

NativeModules.CalendarModule = {
    createEvent: jest.fn().mockResolvedValue({ eventId: '123' }),
};

NativeModules.SettingsManager = {
    settings: { AppleLocale: 'en_US' },
};</code></pre>

            <h4>Testing Platform-Specific Components</h4>
            <pre><code>// Component.ios.test.js
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    RN.Platform.OS = 'ios';
    return RN;
});

import Component from './Component'; // Loads Component.ios.js</code></pre>
        `
    },

    // ==================== TYPESCRIPT ====================
    {
        id: 27,
        category: "TypeScript",
        icon: "📘",
        question: "How do you properly type navigation props and route params in React Navigation with TypeScript?",
        difficulty: "intermediate",
        answer: `
            <h4>Define Route Params</h4>
            <pre><code>// navigation/types.ts
export type RootStackParamList = {
    Home: undefined;
    Details: { itemId: string; title?: string };
    Profile: { userId: string };
    Settings: undefined;
};

export type RootTabParamList = {
    Feed: undefined;
    Search: { query?: string };
    Notifications: undefined;
};</code></pre>

            <h4>Typed Navigation Hook</h4>
            <pre><code>import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Create typed hooks
type DetailsScreenNavigationProp = NativeStackNavigationProp&lt;
    RootStackParamList,
    'Details'
&gt;;
type DetailsScreenRouteProp = RouteProp&lt;RootStackParamList, 'Details'&gt;;

function DetailsScreen() {
    const navigation = useNavigation&lt;DetailsScreenNavigationProp&gt;();
    const route = useRoute&lt;DetailsScreenRouteProp&gt;();

    const { itemId, title } = route.params; // Typed!

    navigation.navigate('Profile', { userId: '123' }); // Type-checked!
}</code></pre>

            <h4>Global Type Declaration</h4>
            <pre><code>// Enables autocomplete everywhere
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}</code></pre>
        `
    },
    {
        id: 28,
        category: "TypeScript",
        icon: "📘",
        question: "How do you type custom hooks and Context in React Native with TypeScript?",
        difficulty: "intermediate",
        answer: `
            <h4>Typed Custom Hook</h4>
            <pre><code>interface UseApiOptions&lt;T&gt; {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

interface UseApiResult&lt;T&gt; {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise&lt;void&gt;;
}

function useApi&lt;T&gt;(
    url: string,
    options?: UseApiOptions&lt;T&gt;
): UseApiResult&lt;T&gt; {
    const [data, setData] = useState&lt;T | null&gt;(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState&lt;Error | null&gt;(null);

    // ... implementation

    return { data, loading, error, refetch };
}</code></pre>

            <h4>Typed Context</h4>
            <pre><code>interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise&lt;void&gt;;
    signOut: () => Promise&lt;void&gt;;
}

const AuthContext = createContext&lt;AuthContextType | null&gt;(null);

// Type-safe hook
function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
    // ... implementation
    return (
        &lt;AuthContext.Provider value={{ user, isLoading, signIn, signOut }}&gt;
            {children}
        &lt;/AuthContext.Provider&gt;
    );
}</code></pre>
        `
    },

    // ==================== DEBUGGING ====================
    {
        id: 29,
        category: "Debugging",
        icon: "🐛",
        question: "What debugging tools are available for React Native and when would you use each?",
        difficulty: "intermediate",
        answer: `
            <h4>Debugging Tools Overview</h4>

            <h4>1. Flipper (Recommended)</h4>
            <ul>
                <li>Network inspector</li>
                <li>Layout inspector</li>
                <li>React DevTools integration</li>
                <li>Native logs (iOS/Android)</li>
                <li>Hermes debugger</li>
                <li>Custom plugins</li>
            </ul>

            <h4>2. React Native Debugger</h4>
            <ul>
                <li>Redux DevTools built-in</li>
                <li>React DevTools</li>
                <li>Network inspection</li>
                <li>AsyncStorage viewer</li>
            </ul>

            <h4>3. Chrome DevTools</h4>
            <pre><code>// Enable remote debugging
// Shake device → Debug with Chrome
// Open chrome://inspect</code></pre>

            <h4>4. Console Methods</h4>
            <pre><code>console.log('Basic logging');
console.warn('Warning - shows yellow box');
console.error('Error - shows red box');
console.table(arrayOfObjects); // Tabular view
console.time('operation');
// ... code
console.timeEnd('operation'); // Shows duration</code></pre>

            <h4>5. Native Debugging</h4>
            <ul>
                <li><strong>iOS:</strong> Xcode debugger, Instruments</li>
                <li><strong>Android:</strong> Android Studio, Logcat</li>
            </ul>

            <h4>6. Performance Profiling</h4>
            <pre><code>// Enable Performance Monitor
// Shake → Show Perf Monitor
// Watch JS and UI frame rates</code></pre>
        `
    },
    {
        id: 30,
        category: "Debugging",
        icon: "🐛",
        question: "How do you debug memory leaks in React Native?",
        difficulty: "advanced",
        answer: `
            <h4>Common Memory Leak Causes</h4>
            <ul>
                <li>Uncleared timers (setTimeout, setInterval)</li>
                <li>Event listeners not removed</li>
                <li>Subscriptions not unsubscribed</li>
                <li>Closures holding references</li>
                <li>Large images not released</li>
            </ul>

            <h4>Prevention Patterns</h4>
            <pre><code>useEffect(() => {
    // Timer
    const timer = setTimeout(() => {}, 1000);

    // Event listener
    const subscription = eventEmitter.addListener('event', handler);

    // API call with abort
    const controller = new AbortController();
    fetch(url, { signal: controller.signal });

    // Cleanup function
    return () => {
        clearTimeout(timer);
        subscription.remove();
        controller.abort();
    };
}, []);</code></pre>

            <h4>Detecting Leaks</h4>
            <pre><code>// 1. Flipper Memory Plugin
// Monitor JS heap size over time

// 2. Xcode Memory Graph
// Debug → Debug Workflow → View Memory Graph

// 3. Android Studio Profiler
// View → Tool Windows → Profiler

// 4. why-did-you-render library
import React from 'react';

if (__DEV__) {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, { trackAllPureComponents: true });
}</code></pre>

            <h4>Memory Monitoring</h4>
            <pre><code>// Check memory periodically
if (__DEV__) {
    setInterval(() => {
        const used = performance.memory?.usedJSHeapSize;
        console.log('Memory:', Math.round(used / 1024 / 1024), 'MB');
    }, 5000);
}</code></pre>
        `
    },

    // ==================== BUILD & DEPLOYMENT ====================
    {
        id: 31,
        category: "Build & Deployment",
        icon: "📦",
        question: "Explain the differences between Debug and Release builds. How do you optimize Release builds?",
        difficulty: "intermediate",
        answer: `
            <h4>Debug vs Release Builds</h4>
            <table>
                <tr><td><strong>Debug</strong></td><td><strong>Release</strong></td></tr>
                <tr><td>Dev server enabled</td><td>Bundle embedded</td></tr>
                <tr><td>Debugging tools active</td><td>Debug code stripped</td></tr>
                <tr><td>No code optimization</td><td>Minified & optimized</td></tr>
                <tr><td>Source maps included</td><td>Source maps separate</td></tr>
                <tr><td>Slower performance</td><td>Full performance</td></tr>
            </table>

            <h4>Creating Release Builds</h4>
            <pre><code>// Android
cd android && ./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/

// iOS
xcodebuild -workspace ios/App.xcworkspace \\
    -scheme App \\
    -configuration Release \\
    -archivePath build/App.xcarchive \\
    archive</code></pre>

            <h4>Release Optimizations</h4>
            <pre><code>// 1. Enable Hermes
// android/app/build.gradle
project.ext.react = [enableHermes: true]

// 2. Enable ProGuard (Android)
// android/app/build.gradle
def enableProguardInReleaseBuilds = true

// 3. Code splitting with Re.Pack
// Dynamic imports for large features

// 4. Asset optimization
// Compress images, use WebP format

// 5. Remove console logs
// babel.config.js (with babel-plugin-transform-remove-console)
plugins: [
    ['transform-remove-console', { exclude: ['error', 'warn'] }]
]</code></pre>
        `
    },
    {
        id: 32,
        category: "Build & Deployment",
        icon: "📦",
        question: "How do you set up CI/CD for React Native apps? What tools would you use?",
        difficulty: "advanced",
        answer: `
            <h4>Popular CI/CD Tools</h4>
            <ul>
                <li><strong>EAS Build (Expo):</strong> Managed build service</li>
                <li><strong>Fastlane:</strong> Automation for iOS/Android</li>
                <li><strong>GitHub Actions:</strong> CI/CD workflows</li>
                <li><strong>Bitrise:</strong> Mobile-focused CI</li>
                <li><strong>App Center:</strong> MS build & distribution</li>
            </ul>

            <h4>GitHub Actions Example</h4>
            <pre><code># .github/workflows/build.yml
name: Build & Test

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'
      - run: yarn install
      - run: yarn test
      - run: yarn lint

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: 17
      - run: yarn install
      - run: cd android && ./gradlew assembleRelease
      - uses: actions/upload-artifact@v3
        with:
          name: android-release
          path: android/app/build/outputs/apk/release/</code></pre>

            <h4>Fastlane Setup</h4>
            <pre><code># fastlane/Fastfile
platform :ios do
  lane :beta do
    build_app(scheme: "MyApp")
    upload_to_testflight
  end
end

platform :android do
  lane :beta do
    gradle(task: "assembleRelease")
    upload_to_play_store(track: "beta")
  end
end</code></pre>
        `
    },
    {
        id: 33,
        category: "Build & Deployment",
        icon: "📦",
        question: "What is CodePush and how does it enable over-the-air updates?",
        difficulty: "intermediate",
        answer: `
            <h4>What is CodePush?</h4>
            <p>CodePush allows you to push JavaScript and asset updates directly to users without going through app store review.</p>

            <h4>How It Works</h4>
            <ol>
                <li>App checks CodePush server on launch</li>
                <li>If update available, downloads JS bundle</li>
                <li>Applies update (immediately or on next restart)</li>
                <li>Users get updates without store update</li>
            </ol>

            <h4>Setup</h4>
            <pre><code>// Install
npm install react-native-code-push

// Wrap App component
import codePush from 'react-native-code-push';

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

export default codePush(codePushOptions)(App);</code></pre>

            <h4>Deployment</h4>
            <pre><code># Release to staging
appcenter codepush release-react -a Owner/App-iOS -d Staging

# Promote to production
appcenter codepush promote -a Owner/App-iOS -s Staging -d Production

# Release with target version
appcenter codepush release-react -a Owner/App -t "1.2.x"</code></pre>

            <h4>Limitations</h4>
            <ul>
                <li>Cannot update native code</li>
                <li>Limited to JS/assets changes</li>
                <li>Store policies still apply for major changes</li>
                <li>Alternatives: Expo Updates, custom solution</li>
            </ul>
        `
    },

    // ==================== SECURITY ====================
    {
        id: 34,
        category: "Security",
        icon: "🔒",
        question: "What are the main security concerns in React Native apps and how do you address them?",
        difficulty: "advanced",
        answer: `
            <h4>Key Security Concerns</h4>

            <h4>1. Secure Storage</h4>
            <pre><code>// ❌ Don't use AsyncStorage for sensitive data
// ✅ Use secure storage
import * as SecureStore from 'expo-secure-store'; // Expo
import Keychain from 'react-native-keychain'; // Bare

// Store sensitive data
await Keychain.setGenericPassword('user', token);
const credentials = await Keychain.getGenericPassword();</code></pre>

            <h4>2. Network Security</h4>
            <pre><code>// SSL Pinning
import { fetch } from 'react-native-ssl-pinning';

fetch(url, {
    sslPinning: {
        certs: ['cert1', 'cert2'] // Certificate names
    }
});

// Or use TrustKit (iOS) / OkHttp CertificatePinner (Android)</code></pre>

            <h4>3. Code Obfuscation</h4>
            <ul>
                <li>Hermes bytecode provides some protection</li>
                <li>Use ProGuard for Android</li>
                <li>Consider tools like jscrambler</li>
            </ul>

            <h4>4. Prevent Reverse Engineering</h4>
            <pre><code>// Detect rooted/jailbroken devices
import JailMonkey from 'jail-monkey';

if (JailMonkey.isJailBroken()) {
    // Handle security risk
}

// Detect debugger
if (__DEV__ === false && JailMonkey.isDebuggedMode()) {
    // Potential tampering
}</code></pre>

            <h4>5. Input Validation</h4>
            <ul>
                <li>Validate all user inputs</li>
                <li>Sanitize data before rendering (XSS prevention)</li>
                <li>Use parameterized queries for databases</li>
            </ul>
        `
    },
    {
        id: 35,
        category: "Security",
        icon: "🔒",
        question: "How do you securely handle authentication tokens in React Native?",
        difficulty: "advanced",
        answer: `
            <h4>Token Storage Best Practices</h4>
            <pre><code>// Use platform-specific secure storage
// iOS: Keychain
// Android: Keystore

import * as Keychain from 'react-native-keychain';

// Store token
async function storeToken(token: string) {
    await Keychain.setGenericPassword('auth', token, {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    });
}

// Retrieve token
async function getToken(): Promise&lt;string | null&gt; {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
}</code></pre>

            <h4>Token Refresh Pattern</h4>
            <pre><code>// Axios interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                await storeToken(newToken);

                originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                await logout();
                throw refreshError;
            }
        }

        throw error;
    }
);</code></pre>

            <h4>Additional Security Measures</h4>
            <ul>
                <li>Use short-lived access tokens</li>
                <li>Implement refresh token rotation</li>
                <li>Clear tokens on logout</li>
                <li>Validate tokens server-side</li>
            </ul>
        `
    },

    // ==================== OFFLINE & STORAGE ====================
    {
        id: 36,
        category: "Offline & Storage",
        icon: "💾",
        question: "Compare different storage solutions in React Native. When would you use each?",
        difficulty: "intermediate",
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

    // ==================== EXPO ====================
    {
        id: 38,
        category: "Expo",
        icon: "📱",
        question: "Compare Expo managed workflow vs bare workflow. When would you choose each?",
        difficulty: "intermediate",
        answer: `
            <h4>Managed Workflow</h4>
            <ul>
                <li>No native code access</li>
                <li>Build with EAS Build cloud service</li>
                <li>Limited to Expo SDK modules</li>
                <li>Faster development setup</li>
                <li>OTA updates with Expo Updates</li>
            </ul>

            <h4>Bare Workflow</h4>
            <ul>
                <li>Full native code access</li>
                <li>Use any native library</li>
                <li>Local builds possible</li>
                <li>More setup complexity</li>
                <li>Still can use many Expo modules</li>
            </ul>

            <h4>When to Use Managed</h4>
            <ul>
                <li>Rapid prototyping</li>
                <li>Small team without native expertise</li>
                <li>Standard features (camera, location, etc.)</li>
                <li>Don't need custom native code</li>
            </ul>

            <h4>When to Use Bare (or Eject)</h4>
            <ul>
                <li>Custom native modules required</li>
                <li>Libraries not supported by Expo</li>
                <li>Need fine-grained native control</li>
                <li>Specific build configurations</li>
            </ul>

            <h4>Ejecting</h4>
            <pre><code># Convert managed to bare
npx expo prebuild

# This generates ios/ and android/ folders
# You can still use Expo modules!</code></pre>
        `
    },
    {
        id: 39,
        category: "Expo",
        icon: "📱",
        question: "What is EAS (Expo Application Services) and how does it help with app development?",
        difficulty: "intermediate",
        answer: `
            <h4>EAS Services</h4>

            <h4>1. EAS Build</h4>
            <ul>
                <li>Cloud-based native builds</li>
                <li>No local Xcode/Android Studio needed</li>
                <li>Handles signing and credentials</li>
            </ul>
            <pre><code># Build for both platforms
eas build --platform all

# Build for specific profile
eas build --platform ios --profile production</code></pre>

            <h4>2. EAS Submit</h4>
            <ul>
                <li>Automated store submissions</li>
                <li>App Store and Play Store</li>
            </ul>
            <pre><code># Submit to stores
eas submit --platform ios
eas submit --platform android</code></pre>

            <h4>3. EAS Update (OTA)</h4>
            <ul>
                <li>Over-the-air JavaScript updates</li>
                <li>Instant updates without store review</li>
                <li>Branch-based deployment</li>
            </ul>
            <pre><code># Publish update
eas update --branch production --message "Bug fix"</code></pre>

            <h4>eas.json Configuration</h4>
            <pre><code>{
    "build": {
        "development": {
            "developmentClient": true,
            "distribution": "internal"
        },
        "preview": {
            "distribution": "internal"
        },
        "production": {}
    },
    "submit": {
        "production": {
            "ios": { "appleId": "..." },
            "android": { "track": "production" }
        }
    }
}</code></pre>
        `
    },

    // ==================== ARCHITECTURE ====================
    {
        id: 40,
        category: "Architecture",
        icon: "🏛️",
        question: "Describe different architectural patterns for React Native apps. What's your preferred approach?",
        difficulty: "advanced",
        answer: `
            <h4>Common Architecture Patterns</h4>

            <h4>1. Feature-Based Structure</h4>
            <pre><code>src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── screens/
│   │   ├── services/
│   │   └── store/
│   ├── products/
│   └── orders/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── navigation/</code></pre>

            <h4>2. Clean Architecture</h4>
            <pre><code>src/
├── domain/           # Business logic, entities
│   ├── entities/
│   └── usecases/
├── data/             # Data sources, repositories
│   ├── repositories/
│   └── datasources/
├── presentation/     # UI layer
│   ├── screens/
│   └── components/
└── infrastructure/   # External services</code></pre>

            <h4>3. Redux + Container Pattern</h4>
            <pre><code>// Container component (connects to store)
const UserListContainer = () => {
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    return &lt;UserList users={users} onRefresh={() => dispatch(fetchUsers())} /&gt;;
};

// Presentational component (pure UI)
const UserList = ({ users, onRefresh }) => (
    &lt;FlatList data={users} ... /&gt;
);</code></pre>

            <h4>Recommended Approach</h4>
            <ul>
                <li>Feature-based for most apps (scalable, maintainable)</li>
                <li>Separate business logic from UI</li>
                <li>Use custom hooks for reusable logic</li>
                <li>Keep components small and focused</li>
            </ul>
        `
    },
    {
        id: 41,
        category: "Architecture",
        icon: "🏛️",
        question: "How do you structure and organize a large-scale React Native codebase?",
        difficulty: "advanced",
        answer: `
            <h4>Recommended Project Structure</h4>
            <pre><code>src/
├── app/                    # App entry, providers, navigation
│   ├── App.tsx
│   ├── navigation/
│   └── providers/
├── features/               # Feature modules
│   ├── auth/
│   │   ├── api/           # API calls
│   │   ├── components/    # Feature-specific components
│   │   ├── hooks/         # Feature hooks
│   │   ├── screens/       # Screen components
│   │   ├── store/         # Feature state (slice)
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Public exports
│   └── ...
├── shared/                 # Shared/common code
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Common hooks
│   ├── services/          # API client, analytics, etc.
│   ├── utils/             # Helper functions
│   └── constants/
├── assets/                # Images, fonts, etc.
└── types/                 # Global type definitions</code></pre>

            <h4>Key Principles</h4>
            <ul>
                <li><strong>Colocation:</strong> Keep related files together</li>
                <li><strong>Public API:</strong> Export only what's needed via index.ts</li>
                <li><strong>Dependency direction:</strong> Features can import shared, not vice versa</li>
                <li><strong>Single responsibility:</strong> One purpose per module</li>
            </ul>

            <h4>Naming Conventions</h4>
            <pre><code>// Components: PascalCase
UserProfile.tsx
UserProfile.styles.ts
UserProfile.test.tsx

// Hooks: camelCase with 'use' prefix
useAuth.ts
useUserProfile.ts

// Utils/Services: camelCase
api.ts
analytics.ts
formatters.ts</code></pre>
        `
    },

    // ==================== ADVANCED CONCEPTS ====================
    {
        id: 42,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "Explain Error Boundaries in React Native. How do you implement global error handling?",
        difficulty: "intermediate",
        answer: `
            <h4>Error Boundary Component</h4>
            <pre><code>class ErrorBoundary extends Component&lt;Props, State&gt; {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log to crash reporting service
        crashlytics().recordError(error);
        analytics.logEvent('error_boundary_caught', {
            error: error.message,
            componentStack: errorInfo.componentStack,
        });
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return &lt;ErrorFallback
                error={this.state.error}
                onRetry={this.resetError}
            /&gt;;
        }
        return this.props.children;
    }
}</code></pre>

            <h4>Global Error Handler</h4>
            <pre><code>// Handle unhandled JS errors
ErrorUtils.setGlobalHandler((error, isFatal) => {
    crashlytics().recordError(error);

    if (isFatal) {
        Alert.alert('Unexpected Error', 'The app needs to restart.');
    }
});

// Handle unhandled promise rejections
if (!__DEV__) {
    require('promise/setimmediate/rejection-tracking').enable({
        allRejections: true,
        onUnhandled: (id, error) => {
            crashlytics().recordError(error);
        },
    });
}</code></pre>

            <h4>Usage</h4>
            <pre><code>&lt;ErrorBoundary&gt;
    &lt;NavigationContainer&gt;
        &lt;RootNavigator /&gt;
    &lt;/NavigationContainer&gt;
&lt;/ErrorBoundary&gt;</code></pre>
        `
    },
    {
        id: 43,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you implement push notifications in React Native?",
        difficulty: "intermediate",
        answer: `
            <h4>Setup with Notifee + Firebase</h4>
            <pre><code>// Install dependencies
npm install @notifee/react-native @react-native-firebase/app @react-native-firebase/messaging</code></pre>

            <h4>Request Permissions</h4>
            <pre><code>import messaging from '@react-native-firebase/messaging';

async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        const token = await messaging().getToken();
        // Send token to your server
        await api.registerDeviceToken(token);
    }
}</code></pre>

            <h4>Handle Messages</h4>
            <pre><code>import notifee from '@notifee/react-native';

// Foreground messages
useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Display notification using Notifee
        await notifee.displayNotification({
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            android: {
                channelId: 'default',
                pressAction: { id: 'default' },
            },
        });
    });

    return unsubscribe;
}, []);

// Background/Quit state messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message:', remoteMessage);
});

// Handle notification press
notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
        // Navigate to relevant screen
        navigation.navigate('Details', { id: detail.notification?.data?.id });
    }
});</code></pre>
        `
    },
    {
        id: 44,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "What is Metro bundler and how does it work?",
        difficulty: "intermediate",
        answer: `
            <h4>What is Metro?</h4>
            <p>Metro is the JavaScript bundler for React Native. It transforms and bundles your JS code and assets.</p>

            <h4>How It Works</h4>
            <ol>
                <li><strong>Resolution:</strong> Finds all required modules starting from entry point</li>
                <li><strong>Transformation:</strong> Transforms code (Babel, TypeScript, etc.)</li>
                <li><strong>Serialization:</strong> Combines modules into a bundle</li>
            </ol>

            <h4>metro.config.js</h4>
            <pre><code>const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Custom resolver
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];

// Asset extensions
config.resolver.assetExts.push('db', 'mp3', 'ttf');

// Transform options
config.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer'
);

// Watchman settings (file watching)
config.watchFolders = [path.resolve(__dirname, '../shared')];

module.exports = config;</code></pre>

            <h4>Common Commands</h4>
            <pre><code># Start with fresh cache
npx react-native start --reset-cache

# Create bundle manually
npx react-native bundle \\
    --entry-file index.js \\
    --bundle-output bundle.js \\
    --platform ios \\
    --dev false</code></pre>

            <h4>Performance Tips</h4>
            <ul>
                <li>Use <code>--reset-cache</code> when seeing stale code</li>
                <li>Configure <code>watchFolders</code> for monorepos</li>
                <li>Exclude large folders with <code>blockList</code></li>
            </ul>
        `
    },
    {
        id: 45,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you handle app state management (foreground, background, inactive)?",
        difficulty: "intermediate",
        answer: `
            <h4>App State Values</h4>
            <ul>
                <li><strong>active:</strong> App is running in foreground</li>
                <li><strong>background:</strong> App is in background</li>
                <li><strong>inactive:</strong> Transitioning (iOS only, e.g., during calls)</li>
            </ul>

            <h4>Basic Usage</h4>
            <pre><code>import { AppState, AppStateStatus } from 'react-native';

function useAppState() {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState: AppStateStatus) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    console.log('App came to foreground');
                    // Refresh data, check auth, etc.
                }

                if (nextAppState === 'background') {
                    console.log('App went to background');
                    // Save state, pause activities
                }

                appState.current = nextAppState;
                setAppStateVisible(nextAppState);
            }
        );

        return () => subscription.remove();
    }, []);

    return appStateVisible;
}</code></pre>

            <h4>Common Use Cases</h4>
            <pre><code>// Pause video when backgrounded
useEffect(() => {
    if (appState === 'background') {
        videoRef.current?.pause();
    }
}, [appState]);

// Refresh auth token on foreground
useEffect(() => {
    if (appState === 'active') {
        checkAndRefreshToken();
    }
}, [appState]);

// With React Query
import { focusManager } from '@tanstack/react-query';

focusManager.setEventListener((handleFocus) => {
    const subscription = AppState.addEventListener('change', (state) => {
        handleFocus(state === 'active');
    });
    return () => subscription.remove();
});</code></pre>
        `
    },

    // ==================== BEHAVIORAL ====================
    {
        id: 46,
        category: "Behavioral",
        icon: "💬",
        question: "Describe a challenging bug you encountered in React Native and how you solved it.",
        difficulty: "intermediate",
        answer: `
            <h4>Framework for Answering</h4>
            <ol>
                <li><strong>Context:</strong> Describe the app and feature</li>
                <li><strong>Problem:</strong> What was the bug and its impact?</li>
                <li><strong>Investigation:</strong> How did you diagnose it?</li>
                <li><strong>Solution:</strong> What fixed it?</li>
                <li><strong>Prevention:</strong> How did you prevent recurrence?</li>
            </ol>

            <h4>Example Answer Structure</h4>
            <p><strong>Context:</strong> "We had a FlatList showing real-time stock prices..."</p>
            <p><strong>Problem:</strong> "Users reported the app becoming unresponsive after viewing the list for a few minutes. Memory usage kept climbing."</p>
            <p><strong>Investigation:</strong> "Used Flipper's memory profiler to track allocations. Found that each price update was creating new objects without cleanup. The WebSocket listener wasn't being removed on unmount."</p>
            <p><strong>Solution:</strong> "Implemented proper cleanup in useEffect, used React.memo with custom comparison for list items, and throttled updates to 1/second instead of real-time."</p>
            <p><strong>Prevention:</strong> "Added memory profiling to our CI pipeline, created a custom hook for WebSocket subscriptions with automatic cleanup."</p>

            <h4>Key Points to Emphasize</h4>
            <ul>
                <li>Systematic debugging approach</li>
                <li>Use of profiling tools</li>
                <li>Root cause analysis</li>
                <li>Preventive measures implemented</li>
            </ul>
        `
    },
    {
        id: 47,
        category: "Behavioral",
        icon: "💬",
        question: "How do you approach code reviews for React Native projects? What do you look for?",
        difficulty: "intermediate",
        answer: `
            <h4>Code Review Checklist</h4>

            <h4>1. Performance</h4>
            <ul>
                <li>Unnecessary re-renders (missing memo/useCallback)</li>
                <li>Heavy computations in render</li>
                <li>FlatList optimizations present</li>
                <li>Image optimization</li>
            </ul>

            <h4>2. React Native Specific</h4>
            <ul>
                <li>Platform-specific code handled correctly</li>
                <li>Proper keyboard handling</li>
                <li>Safe area insets respected</li>
                <li>Accessibility labels present</li>
            </ul>

            <h4>3. Code Quality</h4>
            <ul>
                <li>TypeScript types properly defined</li>
                <li>No <code>any</code> types without justification</li>
                <li>Consistent naming conventions</li>
                <li>Proper error handling</li>
            </ul>

            <h4>4. Security</h4>
            <ul>
                <li>No sensitive data in AsyncStorage</li>
                <li>Input validation present</li>
                <li>No hardcoded secrets</li>
            </ul>

            <h4>5. Testing</h4>
            <ul>
                <li>New components have tests</li>
                <li>Edge cases covered</li>
                <li>Mocks are appropriate</li>
            </ul>

            <h4>Review Approach</h4>
            <ol>
                <li>Understand the context (PR description, linked ticket)</li>
                <li>Review architecture decisions first</li>
                <li>Check for patterns and consistency</li>
                <li>Provide actionable feedback with examples</li>
                <li>Distinguish between blockers and suggestions</li>
            </ol>
        `
    },
    {
        id: 48,
        category: "Behavioral",
        icon: "💬",
        question: "How do you stay updated with React Native ecosystem changes?",
        difficulty: "beginner",
        answer: `
            <h4>Official Sources</h4>
            <ul>
                <li><strong>React Native Blog:</strong> Official announcements, release notes</li>
                <li><strong>GitHub Releases:</strong> Detailed changelogs</li>
                <li><strong>React Native Directory:</strong> Curated library list</li>
            </ul>

            <h4>Community Resources</h4>
            <ul>
                <li><strong>React Native Radio:</strong> Podcast with core team</li>
                <li><strong>Infinite Red:</strong> React Native Newsletter</li>
                <li><strong>Callstack Blog:</strong> Deep technical posts</li>
                <li><strong>William Candillon:</strong> Animation tutorials</li>
            </ul>

            <h4>Social/Discussion</h4>
            <ul>
                <li>Twitter/X: @reactnative, @expo</li>
                <li>Discord: Reactiflux, Expo</li>
                <li>Reddit: r/reactnative</li>
            </ul>

            <h4>Hands-On Learning</h4>
            <ul>
                <li>Try new features in side projects</li>
                <li>Contribute to open source libraries</li>
                <li>Attend React Native conferences (App.js, Chain React)</li>
                <li>Read source code of popular libraries</li>
            </ul>

            <h4>Key Areas to Monitor</h4>
            <ul>
                <li>New Architecture adoption</li>
                <li>Expo SDK updates</li>
                <li>Navigation library changes</li>
                <li>State management trends</li>
                <li>Build tooling improvements</li>
            </ul>
        `
    },
    {
        id: 49,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you implement internationalization (i18n) in React Native?",
        difficulty: "intermediate",
        answer: `
            <h4>Popular i18n Libraries</h4>
            <ul>
                <li><strong>react-i18next:</strong> Most popular, flexible</li>
                <li><strong>expo-localization:</strong> Device locale detection</li>
                <li><strong>react-intl:</strong> Format.js ecosystem</li>
            </ul>

            <h4>Setup with react-i18next</h4>
            <pre><code>// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
    },
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});</code></pre>

            <h4>Translation Files</h4>
            <pre><code>// locales/en.json
{
    "welcome": "Welcome, {{name}}!",
    "items": {
        "one": "{{count}} item",
        "other": "{{count}} items"
    }
}</code></pre>

            <h4>Usage in Components</h4>
            <pre><code>import { useTranslation } from 'react-i18next';

function HomeScreen() {
    const { t, i18n } = useTranslation();

    return (
        &lt;View&gt;
            &lt;Text&gt;{t('welcome', { name: 'John' })}&lt;/Text&gt;
            &lt;Text&gt;{t('items', { count: 5 })}&lt;/Text&gt;

            &lt;Button
                title="Switch to Spanish"
                onPress={() => i18n.changeLanguage('es')}
            /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>RTL Support</h4>
            <pre><code>import { I18nManager } from 'react-native';

// Enable RTL for Arabic, Hebrew, etc.
I18nManager.forceRTL(isRTL);
// Requires app restart</code></pre>
        `
    },
    {
        id: 50,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "What accessibility (a11y) features does React Native support and how do you implement them?",
        difficulty: "intermediate",
        answer: `
            <h4>Core Accessibility Props</h4>
            <pre><code>&lt;TouchableOpacity
    accessible={true}
    accessibilityLabel="Submit order button"
    accessibilityHint="Double tap to submit your order"
    accessibilityRole="button"
    accessibilityState={{ disabled: isLoading }}
&gt;
    &lt;Text&gt;Submit Order&lt;/Text&gt;
&lt;/TouchableOpacity&gt;</code></pre>

            <h4>Accessibility Roles</h4>
            <ul>
                <li><code>button</code>, <code>link</code>, <code>header</code></li>
                <li><code>image</code>, <code>imagebutton</code></li>
                <li><code>text</code>, <code>adjustable</code> (slider)</li>
                <li><code>checkbox</code>, <code>radio</code>, <code>switch</code></li>
            </ul>

            <h4>Accessibility States</h4>
            <pre><code>accessibilityState={{
    disabled: false,
    selected: true,
    checked: 'mixed', // true | false | 'mixed'
    busy: false,
    expanded: true,
}}</code></pre>

            <h4>Screen Reader Announcements</h4>
            <pre><code>import { AccessibilityInfo } from 'react-native';

// Announce to screen reader
AccessibilityInfo.announceForAccessibility('Order submitted successfully');

// Check if screen reader is enabled
const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();</code></pre>

            <h4>Focus Management</h4>
            <pre><code>import { AccessibilityInfo, findNodeHandle } from 'react-native';

const buttonRef = useRef(null);

// Set focus programmatically
const focusOnButton = () => {
    const node = findNodeHandle(buttonRef.current);
    if (node) {
        AccessibilityInfo.setAccessibilityFocus(node);
    }
};</code></pre>

            <h4>Testing Accessibility</h4>
            <ul>
                <li>iOS: VoiceOver (Settings → Accessibility)</li>
                <li>Android: TalkBack (Settings → Accessibility)</li>
                <li>Use Accessibility Inspector in Xcode</li>
            </ul>
        `
    }
];

// App State
let completedQuestions = new Set();
let currentFilter = 'all';
let currentCategory = 'all';
let searchQuery = '';
let currentModalQuestion = null;

// DOM Elements
const questionsContainer = document.getElementById('questions-container');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const progressPercentageEl = document.getElementById('progress-percentage');
const progressFillEl = document.getElementById('progress-fill');
const searchInput = document.getElementById('search-input');
const categoryButtonsContainer = document.getElementById('category-buttons');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('answer-modal');
const modalQuestion = document.getElementById('modal-question');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalAnswer = document.getElementById('modal-answer');
const modalClose = document.getElementById('modal-close');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCompleteBtn = document.getElementById('modal-complete-btn');

// Initialize App
function init() {
    loadFromLocalStorage();
    renderCategoryButtons();
    renderQuestions();
    updateProgress();
    setupEventListeners();
}

// Load completed questions from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('rn-interview-completed');
    if (saved) {
        completedQuestions = new Set(JSON.parse(saved));
    }
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('rn-interview-completed', JSON.stringify([...completedQuestions]));
}

// Get unique categories
function getCategories() {
    const categories = [...new Set(questionsData.map(q => q.category))];
    return categories;
}

// Render category buttons
function renderCategoryButtons() {
    const categories = getCategories();
    categoryButtonsContainer.innerHTML = categories.map(category => {
        const icon = questionsData.find(q => q.category === category)?.icon || '📝';
        return `<button class="nav-btn" data-category="${category}">${icon} ${category}</button>`;
    }).join('');
}

// Filter questions
function getFilteredQuestions() {
    let filtered = questionsData;

    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(q => q.category === currentCategory);
    }

    // Completion filter
    if (currentFilter === 'completed') {
        filtered = filtered.filter(q => completedQuestions.has(q.id));
    } else if (currentFilter === 'pending') {
        filtered = filtered.filter(q => !completedQuestions.has(q.id));
    }

    // Search filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(q =>
            q.question.toLowerCase().includes(query) ||
            q.category.toLowerCase().includes(query)
        );
    }

    return filtered;
}

// Render questions
function renderQuestions() {
    const filtered = getFilteredQuestions();

    if (filtered.length === 0) {
        questionsContainer.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <p>No questions found</p>
            </div>
        `;
        return;
    }

    // Group by category
    const grouped = {};
    filtered.forEach(q => {
        if (!grouped[q.category]) {
            grouped[q.category] = [];
        }
        grouped[q.category].push(q);
    });

    let html = '';
    Object.keys(grouped).forEach(category => {
        const questions = grouped[category];
        const completedInCategory = questions.filter(q => completedQuestions.has(q.id)).length;
        const icon = questions[0]?.icon || '📝';

        html += `
            <div class="category-section">
                <div class="category-header">
                    <span class="category-icon">${icon}</span>
                    <h2 class="category-title">${category}</h2>
                    <span class="category-count">${completedInCategory}/${questions.length}</span>
                </div>
                <div class="questions-list">
                    ${questions.map(q => renderQuestionCard(q)).join('')}
                </div>
            </div>
        `;
    });

    questionsContainer.innerHTML = html;
}

// Render single question card
function renderQuestionCard(question) {
    const isCompleted = completedQuestions.has(question.id);

    return `
        <div class="question-card ${isCompleted ? 'completed' : ''}" data-id="${question.id}">
            <div class="checkbox-container">
                <div class="checkbox" data-id="${question.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
            </div>
            <div class="question-content">
                <p class="question-text">${question.question}</p>
                <div class="question-meta">
                    <span class="difficulty-badge ${question.difficulty}">${question.difficulty}</span>
                    <span class="category-tag">${question.category}</span>
                    <span class="view-answer">Click to view answer →</span>
                </div>
            </div>
        </div>
    `;
}

// Update progress
function updateProgress() {
    const total = questionsData.length;
    const completed = completedQuestions.size;
    const percentage = Math.round((completed / total) * 100);

    completedCountEl.textContent = completed;
    totalCountEl.textContent = total;
    progressPercentageEl.textContent = `${percentage}%`;
    progressFillEl.style.width = `${percentage}%`;
}

// Toggle question completion
function toggleQuestion(id) {
    if (completedQuestions.has(id)) {
        completedQuestions.delete(id);
    } else {
        completedQuestions.add(id);
    }
    saveToLocalStorage();
    renderQuestions();
    updateProgress();
    updateModalButton();
}

// Open modal
function openModal(question) {
    currentModalQuestion = question;
    modalQuestion.textContent = question.question;
    modalDifficulty.textContent = question.difficulty;
    modalDifficulty.className = `difficulty-badge ${question.difficulty}`;
    modalAnswer.innerHTML = question.answer;
    updateModalButton();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update modal button
function updateModalButton() {
    if (!currentModalQuestion) return;
    const isCompleted = completedQuestions.has(currentModalQuestion.id);
    modalCompleteBtn.textContent = isCompleted ? '✓ Completed' : 'Mark as Completed';
    modalCompleteBtn.classList.toggle('completed', isCompleted);
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentModalQuestion = null;
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        completedQuestions.clear();
        saveToLocalStorage();
        renderQuestions();
        updateProgress();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Question cards
    questionsContainer.addEventListener('click', (e) => {
        const checkbox = e.target.closest('.checkbox');
        const card = e.target.closest('.question-card');

        if (checkbox) {
            e.stopPropagation();
            const id = parseInt(checkbox.dataset.id);
            toggleQuestion(id);
        } else if (card) {
            const id = parseInt(card.dataset.id);
            const question = questionsData.find(q => q.id === id);
            if (question) {
                openModal(question);
            }
        }
    });

    // Category buttons
    document.querySelector('.category-nav').addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (!btn) return;

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderQuestions();
    });

    // Filter buttons
    document.querySelector('.filter-buttons').addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderQuestions();
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderQuestions();
    });

    // Reset button
    resetBtn.addEventListener('click', resetProgress);

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
    modalCompleteBtn.addEventListener('click', () => {
        if (currentModalQuestion) {
            toggleQuestion(currentModalQuestion.id);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize
init();

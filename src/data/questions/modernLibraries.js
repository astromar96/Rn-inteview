// Modern Libraries Interview Questions
export const modernLibrariesQuestions = [
    {
        id: 108,
        category: "Modern Libraries",
        icon: "📚",
        question: "Compare data fetching with useEffect vs TanStack Query (React Query). When would you use each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>useEffect Approach</h4>
            <pre><code>function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetchUser(userId)
            .then(data => {
                if (!cancelled) setUser(data);
            })
            .catch(err => {
                if (!cancelled) setError(err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [userId]);

    // Must handle: loading, error, caching, refetching, stale data...
}</code></pre>

            <h4>TanStack Query Approach</h4>
            <pre><code>import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
        staleTime: 5 * 60 * 1000,     // 5 min before refetch
        cacheTime: 30 * 60 * 1000,    // 30 min in cache
        retry: 3,
    });

    // Automatic: caching, deduplication, background refetch,
    // error retry, window focus refetch, pagination support
}</code></pre>

            <h4>When to Use Each</h4>
            <table>
                <tr><th>Use useEffect</th><th>Use TanStack Query</th></tr>
                <tr><td>Simple one-time fetches</td><td>Complex data requirements</td></tr>
                <tr><td>No caching needed</td><td>Caching is important</td></tr>
                <tr><td>Learning/prototyping</td><td>Production apps</td></tr>
                <tr><td>Non-server data effects</td><td>Server state management</td></tr>
            </table>

            <h4>TanStack Query Features</h4>
            <ul>
                <li><strong>Automatic caching:</strong> Reduces network requests</li>
                <li><strong>Background refetching:</strong> Data stays fresh</li>
                <li><strong>Request deduplication:</strong> Multiple components, one request</li>
                <li><strong>Optimistic updates:</strong> Instant UI feedback</li>
                <li><strong>Infinite queries:</strong> Built-in pagination</li>
            </ul>
        `
     },
    {
        id: 109,
        category: "Modern Libraries",
        icon: "📚",
        question: "Explain worklets in Reanimated 3 and how they enable smooth animations.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>What are Worklets?</h4>
            <p>Worklets are small JavaScript functions that run on the UI thread, enabling 60fps animations without bridge communication.</p>

            <h4>Basic Worklet Example</h4>
            <pre><code>import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnUI
} from 'react-native-reanimated';

function AnimatedBox() {
    const offset = useSharedValue(0);

    // This runs on UI thread
    const animatedStyle = useAnimatedStyle(() => {
        'worklet';  // Marks function as worklet
        return {
            transform: [{ translateX: offset.value }],
        };
    });

    const handlePress = () => {
        // Animate on UI thread
        offset.value = withSpring(offset.value + 50);
    };

    return &lt;Animated.View style={animatedStyle} /&gt;;
}</code></pre>

            <h4>How Worklets Work</h4>
            <pre><code>// JS Thread                    UI Thread
// ─────────────                ─────────────
// 1. Define worklet
const myWorklet = () => {
    'worklet';
    return sharedValue.value * 2;
};

// 2. Babel transforms it → serializable form
// 3. Sent to UI thread via JSI
// 4. Executed directly on UI thread

// No bridge! No serialization during animation!</code></pre>

            <h4>Shared Values</h4>
            <pre><code>// Shared between JS and UI threads
const progress = useSharedValue(0);

// Read/write from JS thread
progress.value = 100;

// Read/write from UI thread (in worklet)
const style = useAnimatedStyle(() => {
    'worklet';
    return { opacity: progress.value / 100 };
});</code></pre>

            <h4>Gesture-Driven Animations</h4>
            <pre><code>import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const gesture = Gesture.Pan()
    .onUpdate((e) => {
        // Runs on UI thread as worklet
        translateX.value = e.translationX;
        translateY.value = e.translationY;
    })
    .onEnd(() => {
        // Spring back to origin
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
    });</code></pre>

            <h4>Why Worklets Matter</h4>
            <ul>
                <li>No JS-Native bridge during animations</li>
                <li>Consistent 60fps even with heavy JS work</li>
                <li>Gesture-driven animations without frame drops</li>
                <li>Complex physics-based animations</li>
            </ul>
        `
     },
    {
        id: 110,
        category: "Modern Libraries",
        icon: "📚",
        question: "Why did Shopify create FlashList and when should you use it over FlatList?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Why FlashList Was Created</h4>
            <p>Shopify found FlatList performance insufficient for their complex product lists. FlashList uses cell recycling (like native UICollectionView/RecyclerView) for better performance.</p>

            <h4>Key Differences</h4>
            <table>
                <tr><th>Aspect</th><th>FlatList</th><th>FlashList</th></tr>
                <tr><td>Cell handling</td><td>Unmount/remount</td><td>Recycle cells</td></tr>
                <tr><td>Memory usage</td><td>Higher</td><td>Lower (reuses views)</td></tr>
                <tr><td>Scroll perf</td><td>Good</td><td>Excellent</td></tr>
                <tr><td>Blank cells</td><td>Common</td><td>Rare</td></tr>
                <tr><td>Setup</td><td>Simple</td><td>Needs estimatedItemSize</td></tr>
            </table>

            <h4>Basic FlashList Usage</h4>
            <pre><code>import { FlashList } from '@shopify/flash-list';

function ProductList({ products }) {
    return (
        &lt;FlashList
            data={products}
            renderItem={({ item }) => &lt;ProductCard product={item} /&gt;}
            estimatedItemSize={120}  // Required! Estimate item height
            keyExtractor={(item) => item.id}
        /&gt;
    );
}</code></pre>

            <h4>When to Use FlashList</h4>
            <ul>
                <li><strong>Use FlashList:</strong>
                    <ul>
                        <li>Lists with 100+ items</li>
                        <li>Complex item components</li>
                        <li>Fast scrolling requirements</li>
                        <li>Memory-constrained apps</li>
                    </ul>
                </li>
                <li><strong>FlatList is fine for:</strong>
                    <ul>
                        <li>Small lists (&lt;50 items)</li>
                        <li>Simple item components</li>
                        <li>When migration cost isn't worth it</li>
                    </ul>
                </li>
            </ul>

            <h4>Performance Tips</h4>
            <pre><code>&lt;FlashList
    data={products}
    renderItem={({ item }) => &lt;ProductCard product={item} /&gt;}
    estimatedItemSize={100}
    // Optimize further:
    overrideItemLayout={(layout, item) => {
        layout.size = item.type === 'header' ? 50 : 100;
    }}
    getItemType={(item) => item.type}  // For heterogeneous lists
    drawDistance={250}  // Pre-render distance
/&gt;</code></pre>
        `
     },
    {
        id: 111,
        category: "Modern Libraries",
        icon: "📚",
        question: "Compare Zustand vs Redux for state management in React Native.",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Zustand: Minimal Setup</h4>
            <pre><code>import { create } from 'zustand';

// Define store in one file
const useStore = create((set, get) => ({
    count: 0,
    user: null,

    increment: () => set((state) => ({ count: state.count + 1 })),
    setUser: (user) => set({ user }),
    reset: () => set({ count: 0, user: null }),
}));

// Use in component
function Counter() {
    const count = useStore((state) => state.count);
    const increment = useStore((state) => state.increment);

    return &lt;Button onPress={increment} title={String(count)} /&gt;;
}</code></pre>

            <h4>Redux Toolkit: More Structure</h4>
            <pre><code>// slice.ts
const counterSlice = createSlice({
    name: 'counter',
    initialState: { count: 0 },
    reducers: {
        increment: (state) => { state.count += 1; },
    },
});

// store.ts
const store = configureStore({
    reducer: { counter: counterSlice.reducer },
});

// Component
function Counter() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return &lt;Button onPress={() => dispatch(increment())} /&gt;;
}</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Zustand</th><th>Redux Toolkit</th></tr>
                <tr><td>Boilerplate</td><td>Minimal</td><td>More setup</td></tr>
                <tr><td>Bundle size</td><td>~2KB</td><td>~15KB</td></tr>
                <tr><td>DevTools</td><td>Basic</td><td>Excellent</td></tr>
                <tr><td>Middleware</td><td>Simple</td><td>Powerful</td></tr>
                <tr><td>Learning curve</td><td>Easy</td><td>Moderate</td></tr>
                <tr><td>TypeScript</td><td>Excellent</td><td>Good</td></tr>
            </table>

            <h4>When to Use Each</h4>
            <ul>
                <li><strong>Zustand:</strong> Small-medium apps, prototypes, simpler state needs</li>
                <li><strong>Redux:</strong> Large apps, complex async flows, need time-travel debugging, team familiarity</li>
            </ul>

            <h4>Zustand with Persistence</h4>
            <pre><code>import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
    persist(
        (set) => ({ user: null, setUser: (user) => set({ user }) }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);</code></pre>
        `
     },
    {
        id: 112,
        category: "Modern Libraries",
        icon: "📚",
        question: "What is MMKV and why is it faster than AsyncStorage?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is MMKV?</h4>
            <p>MMKV is a key-value storage library developed by WeChat, offering 30x faster performance than AsyncStorage through memory mapping.</p>

            <h4>Performance Comparison</h4>
            <table>
                <tr><th>Operation</th><th>AsyncStorage</th><th>MMKV</th></tr>
                <tr><td>Read 1000 items</td><td>~550ms</td><td>~15ms</td></tr>
                <tr><td>Write 1000 items</td><td>~1200ms</td><td>~25ms</td></tr>
                <tr><td>API</td><td>Async only</td><td>Sync & Async</td></tr>
            </table>

            <h4>Basic Usage</h4>
            <pre><code>import { MMKV } from 'react-native-mmkv';

// Create instance
const storage = new MMKV();

// Synchronous operations!
storage.set('username', 'john');
storage.set('age', 25);
storage.set('settings', JSON.stringify({ theme: 'dark' }));

const username = storage.getString('username');
const age = storage.getNumber('age');
const exists = storage.contains('username');

storage.delete('age');
storage.clearAll();</code></pre>

            <h4>Why It's Faster</h4>
            <pre><code>// AsyncStorage
// 1. JS calls native module (async)
// 2. Native reads from SQLite
// 3. Data serialized back to JS
// Multiple async hops!

// MMKV
// 1. Memory-mapped file (mmap)
// 2. Direct memory access via JSI
// 3. No serialization overhead
// Synchronous, single operation!</code></pre>

            <h4>With Zustand Persist</h4>
            <pre><code>import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage = {
    getItem: (name) => storage.getString(name) ?? null,
    setItem: (name, value) => storage.set(name, value),
    removeItem: (name) => storage.delete(name),
};

const useStore = create(
    persist(
        (set) =&gt; ({
            user: null,
            token: null,
            setUser: (user) =&gt; set({ user }),
            setToken: (token) =&gt; set({ token }),
        }),
        { storage: createJSONStorage(() => mmkvStorage) }
    )
);</code></pre>

            <h4>When to Use MMKV</h4>
            <ul>
                <li>Frequent read/write operations</li>
                <li>Synchronous access needed</li>
                <li>Performance-critical storage</li>
                <li>Replacing AsyncStorage in existing apps</li>
            </ul>
        `
     },
    {
        id: 113,
        category: "Modern Libraries",
        icon: "📚",
        question: "How do you implement complex gestures with React Native Gesture Handler 2?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>New Gesture API (v2)</h4>
            <pre><code>import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

function DraggableCard() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
        });

    // Combine gestures to run simultaneously
    const composed = Gesture.Simultaneous(panGesture, pinchGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return (
        &lt;GestureDetector gesture={composed}&gt;
            &lt;Animated.View style={[styles.card, animatedStyle]} /&gt;
        &lt;/GestureDetector&gt;
    );
}</code></pre>

            <h4>Gesture Composition</h4>
            <pre><code>// Run in sequence
const sequence = Gesture.Sequence(longPress, pan);

// Run simultaneously
const simultaneous = Gesture.Simultaneous(pan, pinch, rotate);

// Exclusive (first wins)
const exclusive = Gesture.Exclusive(doubleTap, singleTap);

// Race (first to activate wins)
const race = Gesture.Race(swipeLeft, swipeRight);</code></pre>

            <h4>Swipe to Delete Example</h4>
            <pre><code>function SwipeableRow({ onDelete }) {
    const translateX = useSharedValue(0);
    const DELETE_THRESHOLD = -100;

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((e) => {
            translateX.value = Math.min(0, e.translationX);
        })
        .onEnd(() => {
            if (translateX.value < DELETE_THRESHOLD) {
                translateX.value = withTiming(-500, {}, () => {
                    runOnJS(onDelete)();
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    return (
        &lt;GestureDetector gesture={panGesture}&gt;
            &lt;Animated.View style={useAnimatedStyle(() =&gt; ({
                transform: [{ translateX: translateX.value }],
            }))} /&gt;
        &lt;/GestureDetector&gt;
    );
}</code></pre>

            <h4>Benefits of Gesture Handler 2</h4>
            <ul>
                <li>Declarative gesture definition</li>
                <li>Better TypeScript support</li>
                <li>Worklet-powered (UI thread)</li>
                <li>Composable gestures</li>
            </ul>
        `
     },
    {
        id: 114,
        category: "Modern Libraries",
        icon: "📚",
        question: "How do you implement type-safe navigation with React Navigation and TypeScript?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Define Navigation Types</h4>
            <pre><code>// navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root Stack
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    ProductDetail: { productId: string; title: string };
    Settings: { section?: 'profile' | 'notifications' };
};

// Tab Navigator
export type MainTabParamList = {
    Home: undefined;
    Search: { query?: string };
    Profile: undefined;
};

// Screen props helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

// Global type declaration
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}</code></pre>

            <h4>Create Typed Navigators</h4>
            <pre><code>import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function RootNavigator() {
    return (
        &lt;Stack.Navigator&gt;
            &lt;Stack.Screen name="Auth" component={AuthScreen} /&gt;
            &lt;Stack.Screen name="Main" component={MainTabs} /&gt;
            &lt;Stack.Screen name="ProductDetail" component={ProductDetailScreen} /&gt;
        &lt;/Stack.Navigator&gt;
    );
}</code></pre>

            <h4>Type-Safe Navigation in Screens</h4>
            <pre><code>// With screen props
function ProductDetailScreen({ route, navigation }: RootStackScreenProps&lt;'ProductDetail'&gt;) {
    const { productId, title } = route.params; // Typed!

    return (
        &lt;Button
            title="Go to Settings"
            onPress={() =&gt; navigation.navigate('Settings', { section: 'profile' })}
        /&gt;
    );
}

// With useNavigation hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function ProductCard({ product }) {
    const navigation = useNavigation&lt;NativeStackNavigationProp&lt;RootStackParamList&gt;&gt;();

    return (
        &lt;TouchableOpacity
            onPress={() =&gt; navigation.navigate('ProductDetail', {
                productId: product.id,
                title: product.title,  // Required params enforced!
            })}
        /&gt;
    );
}</code></pre>

            <h4>Benefits</h4>
            <ul>
                <li>Autocomplete for screen names</li>
                <li>Required params enforced</li>
                <li>Refactoring safety</li>
                <li>Catch errors at compile time</li>
            </ul>
        `
     },
    {
        id: 115,
        category: "Modern Libraries",
        icon: "📚",
        question: "What is Legend State and how does it compare to other state management solutions?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>What is Legend State?</h4>
            <p>A fast, fine-grained reactive state library that uses Proxy for automatic tracking, enabling minimal re-renders.</p>

            <h4>Basic Usage</h4>
            <pre><code>import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

// Create observable state
const state$ = observable({
    user: { name: 'John', email: 'john@example.com' },
    todos: [],
    settings: { theme: 'dark' },
});

// Component auto-subscribes to accessed fields only
const UserName = observer(function UserName() {
    // Only re-renders when user.name changes
    return <Text>{state$.user.name.get()}</Text>;
});

// Update state
state$.user.name.set('Jane');
state$.todos.push({ id: 1, text: 'Learn Legend' });</code></pre>

            <h4>Comparison with Other Libraries</h4>
            <table>
                <tr><th>Feature</th><th>Legend</th><th>Zustand</th><th>Redux</th></tr>
                <tr><td>Fine-grained</td><td>✅ Auto</td><td>❌ Manual</td><td>❌ Manual</td></tr>
                <tr><td>Boilerplate</td><td>Minimal</td><td>Minimal</td><td>More</td></tr>
                <tr><td>Persistence</td><td>Built-in</td><td>Middleware</td><td>Middleware</td></tr>
                <tr><td>Sync</td><td>Built-in</td><td>❌</td><td>❌</td></tr>
                <tr><td>Bundle size</td><td>~4KB</td><td>~2KB</td><td>~15KB</td></tr>
            </table>

            <h4>Built-in Persistence</h4>
            <pre><code>import { configureSynced } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';

const state$ = observable(
    synced({
        initial: { user: null, settings: {} },
        persist: {
            name: 'app-state',
            plugin: ObservablePersistMMKV,
        },
    })
);

// Automatically persists and rehydrates!</code></pre>

            <h4>Fine-Grained Reactivity Example</h4>
            <pre><code>// With Zustand/Redux: entire list re-renders
const todos = useSelector(state => state.todos);
return todos.map(todo => <TodoItem key={todo.id} todo={todo} />);

// With Legend State: only changed item re-renders
const TodoList = observer(() => {
    return state$.todos.map((todo$) => (
        <TodoItem key={todo$.id.peek()} todo$={todo$} />
    ));
});

const TodoItem = observer(({ todo$ }) => {
    // Only this component re-renders when this todo changes
    return <Text>{todo$.text.get()}</Text>;
});</code></pre>

            <h4>When to Use Legend State</h4>
            <ul>
                <li>Performance-critical apps with complex state</li>
                <li>Need fine-grained reactivity without manual optimization</li>
                <li>Built-in persistence and sync requirements</li>
                <li>Real-time collaborative features</li>
            </ul>
        `
    },
];

// Performance Interview Questions
export const performanceQuestions = [
    {
        id: 13,
        category: "Performance",
        icon: "⚡",
        question: "What are the main causes of performance issues in React Native and how do you diagnose them?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Performance is often the make-or-break factor for React Native apps. This question tests your ability to identify, diagnose, and fix the most common performance bottlenecks in production apps.</p>

            <h4>React Native's Threading Model</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────────────┐
│                    React Native Architecture                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐
│    JS Thread         │      │    UI/Main Thread    │
│    (JavaScript)      │      │    (Native)          │
├──────────────────────┤      ├──────────────────────┤
│ • React reconciliation│      │ • Native view updates│
│ • Your business logic │ ←→   │ • Touch handling     │
│ • Event handlers      │Bridge│ • Animations (native)│
│ • API calls          │      │ • Platform APIs      │
│ • State management   │      │ • Rendering          │
└──────────────────────┘      └──────────────────────┘
         │                              │
         │     ┌──────────────────┐     │
         └────→│  Shadow Thread   │←────┘
               │  (Yoga Layout)   │
               └──────────────────┘

⚠️ If JS Thread is blocked → UI events queue up → janky feel
⚠️ If UI Thread is blocked → Frame drops → visible stuttering</code></pre>

            <h4>Top 10 Performance Issues & Solutions</h4>

            <h5>1. Too Many Re-renders</h5>
            <pre><code>// ❌ Problem: Function created every render
&lt;FlatList
    renderItem={({ item }) => &lt;Item data={item} onPress={() => handlePress(item.id)} /&gt;}
/&gt;

// ✅ Solution: Memoize callback + component
const handlePress = useCallback((id) =&gt; {
    navigation.navigate('Details', { itemId: id });
}, [navigation]);
const renderItem = useCallback(({ item }) => (
    &lt;MemoizedItem data={item} onPress={handlePress} /&gt;
), [handlePress]);

const MemoizedItem = React.memo(Item);</code></pre>

            <h5>2. JS Thread Blocking</h5>
            <pre><code>// ❌ Problem: Heavy computation on JS thread
function SearchResults({ query }) {
    // This blocks the JS thread while computing!
    const results = items
        .filter(item =&gt; item.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) =&gt; {
            // Complex sorting logic
            const scoreA = calculateRelevanceScore(a, query);
            const scoreB = calculateRelevanceScore(b, query);
            return scoreB - scoreA;
        });
}

// ✅ Solution: Debounce + InteractionManager + Pagination
const debouncedSearch = useDebouncedCallback((query) => {
    InteractionManager.runAfterInteractions(() => {
        const results = search(query).slice(0, 20);  // Paginate
        setResults(results);
    });
}, 300);

// ✅ Better: Move heavy work off JS thread with WorkletJS or Native Module</code></pre>

            <h5>3. Large Images</h5>
            <pre><code>// ❌ Problem: Loading 4000x3000 image for 100x100 thumbnail
&lt;Image source={{ uri: largeImageUrl }} style={{ width: 100, height: 100 }} /&gt;

// ✅ Solution: Use appropriately sized images + FastImage
import FastImage from 'react-native-fast-image';

&lt;FastImage
    source={{
        uri: \`\${imageUrl}?w=\${100 * PixelRatio.get()}\`,  // Request right size
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
    }}
    style={{ width: 100, height: 100 }}
/&gt;</code></pre>

            <h5>4. Bridge Congestion</h5>
            <pre><code>// ❌ Problem: Sending large data across bridge frequently
onScroll={(event) => {
    // This fires 60 times/second, flooding the bridge
    setScrollPosition(event.nativeEvent.contentOffset.y);
}}

// ✅ Solution: Use native driver or throttle
// Option 1: Native animated scroll
&lt;Animated.ScrollView
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }  // Stays on native thread
    )}
/&gt;

// Option 2: Throttle events
const handleScroll = useThrottledCallback((y) => {
    setScrollPosition(y);
}, 100);</code></pre>

            <h4>Diagnostic Tools Deep Dive</h4>
            <pre><code>// 1. React DevTools Profiler
// - Install: React Native Debugger or Flipper
// - What to look for:
//   • Components rendering too often (high "Rendered at")
//   • Long render times (> 16ms = frame drop)
//   • "Cascading" renders (parent → many children)

// 2. Performance Monitor (Built-in)
// - Enable: Shake → "Show Perf Monitor"
// Metrics:
//   • JS FPS: Should be 60 (dips = JS thread busy)
//   • UI FPS: Should be 60 (dips = native thread busy)
//   • Views: Total native views (lower = better)
//   • RAM: Memory usage

// 3. Flipper Performance Plugin
// - Tracks: Network, Database, Startup time
// - Can create custom markers

// 4. Why Did You Render
import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true,
});

// Add to component:
MyComponent.whyDidYouRender = true;</code></pre>

            <h4>Performance Checklist</h4>
            <pre><code>□ FlatList instead of ScrollView for long lists
□ React.memo() on list items and expensive components
□ useCallback/useMemo for callbacks and derived data
□ getItemLayout for fixed-height FlatList items
□ FastImage instead of Image for network images
□ useNativeDriver: true for Animated
□ Hermes enabled (faster startup, lower memory)
□ InteractionManager for deferred heavy work
□ Proper cleanup in useEffect (prevent memory leaks)
□ Avoid inline styles and objects in render</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain the <strong>two-thread model</strong> (JS + Native) and how blocking either causes jank</li>
                <li>Know specific tools: <strong>React DevTools Profiler, Flipper, Performance Monitor</strong></li>
                <li>Discuss <strong>useNativeDriver</strong> and why it helps animations</li>
                <li>Mention the <strong>New Architecture</strong> reduces bridge congestion via JSI</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Optimizing before measuring (premature optimization)</li>
                <li>Adding memo/useCallback everywhere (adds overhead for simple cases)</li>
                <li>Not testing on low-end Android devices</li>
                <li>Ignoring memory usage until app crashes</li>
            </ul>
        `
     },
    {
        id: 14,
        category: "Performance",
        icon: "⚡",
        question: "How do you optimize FlatList for rendering thousands of items?",
        difficulty: "advanced",
        seniority: "mid",
        answer: `
            <h4>Essential Optimizations</h4>
            <pre><code>&lt;FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}

    // Layout optimization - CRITICAL for performance
    getItemLayout={(data, index) =&gt; ({
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

function ProductList({ products }) {
    return (
        &lt;FlashList
            data={products}
            renderItem={({ item }) =&gt; (
                &lt;View style={styles.item}&gt;
                    &lt;Text&gt;{item.title}&lt;/Text&gt;
                    &lt;Text&gt;\${item.price}&lt;/Text&gt;
                &lt;/View&gt;
            )}
            estimatedItemSize={80}  // Required!
            keyExtractor={(item) => item.id}
        /&gt;
    );
}</code></pre>
        `
     },
    {
        id: 15,
        category: "Performance",
        icon: "⚡",
        question: "Explain Hermes and its benefits. How does it improve React Native performance?",
        difficulty: "intermediate",
        seniority: "mid",
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
        seniority: "mid",
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
    {
        id: 60,
        category: "Performance",
        icon: "⚡",
        question: "What is the InteractionManager and when should you use it?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is InteractionManager?</h4>
            <p>InteractionManager allows scheduling long-running work after interactions/animations have completed, keeping the UI responsive.</p>

            <h4>Basic Usage</h4>
            <pre><code>import { InteractionManager } from 'react-native';

function DetailScreen() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Wait for navigation animation to complete
        const interaction = InteractionManager.runAfterInteractions(() => {
            // Now safe to do heavy work
            loadHeavyData().then(setData);
        });

        return () => interaction.cancel();
    }, []);

    return data ? &lt;HeavyContent data={data} /&gt; : &lt;Placeholder /&gt;;
}</code></pre>

            <h4>Creating Custom Interactions</h4>
            <pre><code>// Create a handle when starting animation
const handle = InteractionManager.createInteractionHandle();

// Start your animation
Animated.timing(opacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
}).start(() => {
    // Clear handle when animation completes
    InteractionManager.clearInteractionHandle(handle);
});</code></pre>

            <h4>Use Cases</h4>
            <ul>
                <li><strong>Screen transitions:</strong> Defer data loading until animation completes</li>
                <li><strong>Heavy computations:</strong> Process large datasets after UI settles</li>
                <li><strong>Analytics:</strong> Track events without blocking UI</li>
                <li><strong>Image processing:</strong> Resize/compress after interaction</li>
            </ul>

            <h4>With Promises</h4>
            <pre><code>async function initializeScreen() {
    // Wait for all interactions
    await InteractionManager.runAfterInteractions();

    // Now perform heavy operations
    const data = await fetchData();
    const processed = await processData(data);

    return processed;
}</code></pre>

            <h4>Debugging Tip</h4>
            <pre><code>// Log all interactions
InteractionManager.setDeadline(100); // Warning if > 100ms

// In development
if (__DEV__) {
    const start = Date.now();
    InteractionManager.runAfterInteractions(() => {
        console.log(\`Interactions took: \${Date.now() - start}ms\`);
    });
}</code></pre>
        `
     },
    {
        id: 61,
        category: "Performance",
        icon: "⚡",
        question: "How do you optimize images in React Native for better performance?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Image Optimization Strategies</h4>

            <h4>1. Use Correct Dimensions</h4>
            <pre><code>// ❌ Bad: Large image, small display
&lt;Image
    source={{ uri: 'https://example.com/photo-4000x3000.jpg' }}
    style={{ width: 100, height: 100 }}
/&gt;

// ✅ Good: Request appropriately sized image
&lt;Image
    source={{
        uri: \`https://example.com/photo.jpg?w=\${width * PixelRatio.get()}\`
    }}
    style={{ width: 100, height: 100 }}
/&gt;</code></pre>

            <h4>2. Use FastImage Library</h4>
            <pre><code>import FastImage from 'react-native-fast-image';

&lt;FastImage
    source={{
        uri: 'https://example.com/photo.jpg',
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
    }}
    style={{ width: 200, height: 200 }}
    resizeMode={FastImage.resizeMode.cover}
/&gt;

// Preload images
FastImage.preload([
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
]);</code></pre>

            <h4>3. Progressive Loading</h4>
            <pre><code>function ProgressiveImage({ thumbnailUri, uri, style }) {
    const [loaded, setLoaded] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    const onLoad = () => {
        setLoaded(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        &lt;View style={style}&gt;
            {/* Blurred thumbnail */}
            &lt;Image
                source={{ uri: thumbnailUri }}
                style={[StyleSheet.absoluteFill, style]}
                blurRadius={2}
            /&gt;
            {/* Full resolution image */}
            &lt;Animated.Image
                source={{ uri }}
                style={[style, { opacity }]}
                onLoad={onLoad}
            /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>4. Format Optimization</h4>
            <ul>
                <li><strong>WebP:</strong> 25-35% smaller than JPEG, supports transparency</li>
                <li><strong>AVIF:</strong> Even better compression (newer devices)</li>
                <li><strong>SVG:</strong> For icons and simple graphics</li>
            </ul>

            <h4>5. Memory Management</h4>
            <pre><code>// In FlatList, images outside viewport are recycled
&lt;FlatList
    removeClippedSubviews={true}
    windowSize={3} // Smaller window = less memory
    maxToRenderPerBatch={5}
/&gt;

// Clear image cache when needed
FastImage.clearMemoryCache();
FastImage.clearDiskCache();</code></pre>
        `
     },
    {
        id: 62,
        category: "Performance",
        icon: "⚡",
        question: "Explain React Native's bridge batching and how it affects performance.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Bridge Batching Concept</h4>
            <p>React Native batches multiple native calls together and sends them across the bridge in a single message to reduce overhead.</p>

            <h4>How Batching Works</h4>
            <pre><code>// Without batching (hypothetical):
// JS → Native: setBackgroundColor(red)
// JS → Native: setWidth(100)
// JS → Native: setHeight(200)
// = 3 bridge crossings

// With batching (actual):
// JS → Native: [
//   setBackgroundColor(red),
//   setWidth(100),
//   setHeight(200)
// ]
// = 1 bridge crossing</code></pre>

            <h4>When Batching Breaks Down</h4>
            <pre><code>// ❌ Problem: Synchronous native calls force flush
// Reading dimensions causes immediate bridge flush
const { width, height } = someNativeModule.getMeasurements();
// All pending batched calls are flushed

// ❌ Problem: Frequent small updates
items.forEach(item => {
    setState(prev => [...prev, item]); // Each triggers batch
});

// ✅ Solution: Batch updates manually
setState(prev => [...prev, ...items]); // Single update</code></pre>

            <h4>Avoiding Bridge Congestion</h4>
            <pre><code>// ❌ Bad: Sending large data across bridge
const hugeArray = new Array(10000).fill(data);
NativeModule.processData(hugeArray); // Serialization overhead

// ✅ Good: Process in chunks
const chunks = chunkArray(hugeArray, 100);
for (const chunk of chunks) {
    await NativeModule.processData(chunk);
    // Allow UI to breathe
    await new Promise(r => setTimeout(r, 0));
}

// ✅ Better: Use JSI for large data
// JSI allows direct memory sharing without serialization</code></pre>

            <h4>Monitoring Bridge Traffic</h4>
            <pre><code>// Enable bridge spy (development only)
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

if (__DEV__) {
    MessageQueue.spy((msg) => {
        if (msg.type === 0) { // Call from JS to Native
            console.log('JS→Native:', msg.module, msg.method);
        }
    });
}</code></pre>

            <h4>New Architecture Solution</h4>
            <p>The New Architecture (Fabric + TurboModules) eliminates many batching issues:</p>
            <ul>
                <li>JSI enables synchronous calls without serialization</li>
                <li>No more JSON encoding/decoding</li>
                <li>Direct memory sharing possible</li>
            </ul>
        `
    },
];

// Core React Native Interview Questions
export const coreReactNativeQuestions = [
    {
        id: 1,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the difference between React Native and React.js. How does React Native render components?",
        difficulty: "beginner",
        seniority: "junior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>This is often the first question in RN interviews. Interviewers want to verify you understand the fundamental architecture and aren't just treating RN as "React for mobile."</p>

            <h4>Key Differences</h4>
            <table>
                <tr><td><strong>Aspect</strong></td><td><strong>React.js</strong></td><td><strong>React Native</strong></td></tr>
                <tr><td>Render Target</td><td>Browser DOM (HTML elements)</td><td>Native platform views</td></tr>
                <tr><td>Styling</td><td>CSS files, CSS-in-JS</td><td>JavaScript StyleSheet objects</td></tr>
                <tr><td>Layout</td><td>CSS (Flexbox, Grid, etc.)</td><td>Yoga (Flexbox only)</td></tr>
                <tr><td>Components</td><td>&lt;div&gt;, &lt;span&gt;, &lt;input&gt;</td><td>&lt;View&gt;, &lt;Text&gt;, &lt;TextInput&gt;</td></tr>
                <tr><td>Navigation</td><td>React Router (URL-based)</td><td>React Navigation (stack-based)</td></tr>
                <tr><td>Execution</td><td>Browser JS engine</td><td>Hermes/JSC + Native runtime</td></tr>
            </table>

            <h4>React Native Rendering Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────┐
│                     JavaScript Thread                        │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ Your React  │ →  │    React     │ →  │  Virtual DOM  │  │
│  │    Code     │    │  Reconciler  │    │    (Fiber)    │  │
│  └─────────────┘    └──────────────┘    └───────┬───────┘  │
└─────────────────────────────────────────────────┼───────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────┐
                    │         Bridge / JSI        ▼             │
                    │    (Serialization & Communication)        │
                    └─────────────────────────────┬─────────────┘
                                                  │
┌─────────────────────────────────────────────────┼───────────┐
│                      Native Thread              ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │   UIView    │ ←  │   Shadow     │ ←  │    Native     │  │
│  │  Hierarchy  │    │    Tree      │    │   Commands    │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
└─────────────────────────────────────────────────────────────┘</code></pre>

            <h4>Rendering Process Step by Step</h4>
            <ol>
                <li><strong>JS Execution:</strong> Your JavaScript code runs in Hermes (default) or JavaScriptCore engine</li>
                <li><strong>Reconciliation:</strong> React's Fiber reconciler computes what changed in the virtual DOM</li>
                <li><strong>Serialization:</strong> UI operations are serialized and sent across the bridge (JSON in old arch, direct calls in new arch)</li>
                <li><strong>Shadow Tree:</strong> Native side builds a shadow tree for layout calculation using Yoga</li>
                <li><strong>Layout:</strong> Yoga calculates exact positions and dimensions using Flexbox algorithm</li>
                <li><strong>Native Rendering:</strong> Platform-specific views are created and displayed</li>
            </ol>

            <h4>Component Mapping Examples</h4>
            <pre><code>// React Native → Native Components
┌──────────────────┬─────────────────────┬────────────────────────┐
│  React Native    │       iOS           │        Android         │
├──────────────────┼─────────────────────┼────────────────────────┤
│  &lt;View&gt;          │  UIView             │  android.view.View     │
│  &lt;Text&gt;          │  UITextView         │  TextView              │
│  &lt;Image&gt;         │  UIImageView        │  ImageView             │
│  &lt;ScrollView&gt;    │  UIScrollView       │  ScrollView            │
│  &lt;TextInput&gt;     │  UITextField        │  EditText              │
│  &lt;Switch&gt;        │  UISwitch           │  Switch                │
│  &lt;FlatList&gt;      │  UITableView        │  RecyclerView          │
└──────────────────┴─────────────────────┴────────────────────────┘</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Mention the <strong>New Architecture</strong> (Fabric + TurboModules) that replaces the bridge with JSI for synchronous, direct calls</li>
                <li>Explain why RN is <strong>not a WebView</strong> - it renders actual native components</li>
                <li>Discuss trade-offs: truly native performance vs. write-once flexibility</li>
            </ul>

            <h4>🚫 Common Misconceptions</h4>
            <ul>
                <li><strong>Wrong:</strong> "React Native is a WebView wrapper like Cordova"</li>
                <li><strong>Wrong:</strong> "React Native compiles to native code"</li>
                <li><strong>Correct:</strong> "React Native bridges JavaScript to native platform APIs and renders native views"</li>
            </ul>
        `
     },
    {
        id: 2,
        category: "Core React Native",
        icon: "⚛️",
        question: "What is the Virtual DOM and how does React Native's reconciliation work?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding reconciliation is crucial for writing performant React Native apps. Interviewers ask this to gauge your depth of knowledge about React's internals and your ability to optimize applications.</p>

            <h4>Virtual DOM Concept</h4>
            <p>The Virtual DOM is a lightweight JavaScript object tree that mirrors the structure of the actual UI. Instead of directly manipulating native views (which is expensive), React:</p>
            <ol>
                <li>Maintains an in-memory representation of the UI</li>
                <li>When state changes, creates a new virtual tree</li>
                <li>Compares (diffs) the new tree with the previous one</li>
                <li>Calculates the minimum set of changes needed</li>
                <li>Applies only those changes to the actual native views</li>
            </ol>

            <h4>React Fiber Architecture</h4>
            <p>React 16+ uses "Fiber" - a complete rewrite of the reconciliation algorithm:</p>
            <pre><code>// Fiber Node Structure (simplified)
{
    type: 'View',           // Component type
    key: 'unique-key',      // For list reconciliation
    props: { style: {...} },// Component props
    stateNode: nativeView,  // Reference to native view
    child: fiberNode,       // First child
    sibling: fiberNode,     // Next sibling
    return: fiberNode,      // Parent node
    effectTag: 'UPDATE',    // What operation to perform
    alternate: prevFiber,   // Previous version for diffing
}</code></pre>

            <h4>Reconciliation Process Deep Dive</h4>
            <pre><code>// Phase 1: Render Phase (can be interrupted)
┌─────────────────────────────────────────────────────────┐
│  1. Start from root, traverse tree                      │
│  2. For each fiber:                                     │
│     - Call render() or function component               │
│     - Compare with previous fiber (diffing)             │
│     - Mark with effect tag (Placement/Update/Deletion)  │
│  3. Build "work-in-progress" tree                       │
└─────────────────────────────────────────────────────────┘
                          ↓
// Phase 2: Commit Phase (synchronous, can't be interrupted)
┌─────────────────────────────────────────────────────────┐
│  1. Apply all DOM/Native mutations                      │
│  2. Call lifecycle methods (componentDidMount, etc.)    │
│  3. Call useEffect callbacks                            │
│  4. Swap current tree with work-in-progress tree        │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Diffing Algorithm Heuristics</h4>
            <p>React uses O(n) heuristics instead of O(n³) tree comparison:</p>
            <ul>
                <li><strong>Different types = rebuild:</strong> If element type changes (View → Text), React destroys old tree and builds new</li>
                <li><strong>Same type = update:</strong> React keeps the instance and updates props</li>
                <li><strong>Keys for lists:</strong> Keys help React identify which items moved, were added, or removed</li>
            </ul>

            <h4>Keys: Why They Matter</h4>
            <pre><code>// ❌ BAD: Using index as key
{items.map((item, index) => (
    &lt;Item key={index} data={item} /&gt;  // Problems when list reorders!
))}

// What happens when you delete item at index 0:
// Before: [A(key=0), B(key=1), C(key=2)]
// After:  [B(key=0), C(key=1)]
// React thinks: A→B (update), B→C (update), delete C
// Actually: A deleted, B and C should stay!

// ✅ GOOD: Using stable unique ID
{items.map((item) => (
    &lt;Item key={item.id} data={item} /&gt;  // Correct behavior
))}

// What happens when you delete item with id='a':
// Before: [A(key=a), B(key=b), C(key=c)]
// After:  [B(key=b), C(key=c)]
// React correctly: delete A, keep B and C</code></pre>

            <h4>Optimization Strategies</h4>
            <pre><code>// 1. React.memo - prevent re-render if props unchanged
const MemoizedItem = React.memo(({ item, onPress }) => {
    console.log('Rendering item:', item.id);
    return &lt;TouchableOpacity onPress={onPress}&gt;...&lt;/TouchableOpacity&gt;;
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.item.id === nextProps.item.id &&
           prevProps.item.updatedAt === nextProps.item.updatedAt;
});

// 2. useMemo - memoize expensive calculations
const sortedItems = useMemo(() => {
    console.log('Sorting items...');  // Only runs when items change
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// 3. useCallback - stable function references
const handlePress = useCallback((id) => {
    setSelectedId(id);
}, []); // Function reference stays same across renders</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li><strong>Fiber Architecture:</strong> Explain that Fiber is React's reimplementation of the reconciler (React 16+). It breaks rendering into units of work called "fibers" that can be paused, resumed, or aborted. This enables:
                    <ul>
                        <li><strong>Concurrent Mode:</strong> Multiple versions of UI can be prepared in memory simultaneously</li>
                        <li><strong>Suspense:</strong> Components can "suspend" rendering while waiting for async data</li>
                        <li><strong>Transitions:</strong> Mark updates as non-urgent so they don't block user input (useTransition, startTransition)</li>
                        <li><strong>Time Slicing:</strong> Long renders are split across multiple frames to keep UI responsive</li>
                    </ul>
                </li>
                <li><strong>Two-Phase Commit - Be prepared to explain in detail:</strong>
                    <ul>
                        <li><strong>Render Phase (interruptible):</strong> React traverses the component tree, calls render functions, and calculates changes. No side effects should happen here. Can be paused/restarted. This is where diffing occurs.</li>
                        <li><strong>Commit Phase (synchronous):</strong> React applies all changes to the DOM/native views in one go. Runs lifecycle methods (componentDidMount, useLayoutEffect, then useEffect). Cannot be interrupted to ensure UI consistency.</li>
                    </ul>
                </li>
                <li><strong>New Architecture (Fabric) - Key differences to highlight:</strong>
                    <ul>
                        <li><strong>Synchronous rendering:</strong> Fabric can render synchronously when needed (e.g., for gestures, keyboard input) via JSI direct calls</li>
                        <li><strong>No more bridge serialization:</strong> Direct C++ communication between JS and native eliminates JSON serialization overhead</li>
                        <li><strong>Concurrent renderer:</strong> Fabric supports React 18's concurrent features natively out of the box</li>
                        <li><strong>Multiple render priorities:</strong> Different updates can have different priorities (user input > background updates)</li>
                    </ul>
                </li>
                <li><strong>Practical Examples to Mention:</strong>
                    <ul>
                        <li>Why typing in a search box stays smooth even while filtering a large list (concurrent features prioritize input)</li>
                        <li>How Suspense boundaries work with React.lazy() for code splitting</li>
                        <li>Why keys are critical for list performance (helps reconciler identify moved items vs recreated)</li>
                    </ul>
                </li>
                <li><strong>Performance Questions Follow-up - Be ready to discuss:</strong>
                    <ul>
                        <li>When to use React.memo (components that receive same props often) vs useMemo (expensive calculations) vs useCallback (function props to memoized children)</li>
                        <li>How to profile renders with React DevTools Profiler - identify unnecessary re-renders</li>
                        <li>The cost of reconciliation and how to minimize unnecessary re-renders (component splitting, memoization)</li>
                    </ul>
                </li>
            </ul>

            <h4>🔑 Key Vocabulary to Use</h4>
            <p>Using these terms correctly shows deep understanding:</p>
            <ul>
                <li><strong>Reconciliation:</strong> The algorithm React uses to diff two trees and determine the minimal set of operations to transform one into the other</li>
                <li><strong>Fiber:</strong> A JavaScript object representing a unit of work; also the name of the reconciler architecture itself</li>
                <li><strong>Work-in-progress tree:</strong> The new fiber tree being built during the render phase</li>
                <li><strong>Current tree:</strong> The fiber tree that corresponds to what's currently rendered on screen</li>
                <li><strong>Double buffering:</strong> React maintains two trees (current and work-in-progress) and swaps them on commit</li>
                <li><strong>Effect list:</strong> A linked list of fibers that have side effects (DOM updates, lifecycle calls) to process in commit phase</li>
                <li><strong>Lanes:</strong> React 18's priority system for scheduling updates (replaced the older "expiration times" model)</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li><strong>Using array index as key in dynamic lists:</strong> Causes incorrect component reuse when items are reordered, added, or removed. State gets attached to wrong items. Always use stable unique IDs.</li>
                <li><strong>Creating new objects/functions inline in render:</strong> Breaks memoization because new references are created every render. Bad: <code>&lt;Child style={{color: 'red'}} /&gt;</code> or <code>&lt;Button onPress={() => doSomething()} /&gt;</code>. Good: Define outside or use useMemo/useCallback.</li>
                <li><strong>Over-using useMemo/useCallback:</strong> These have memory overhead and add complexity. Only use when: passing callbacks to memoized children, expensive calculations (O(n²) or more), or referential equality matters (useEffect dependencies).</li>
                <li><strong>Mutating state directly:</strong> React relies on reference comparison for change detection. <code>state.items.push(newItem)</code> won't trigger re-render because the array reference didn't change. Always create new references.</li>
                <li><strong>Not understanding batching:</strong> In React 18+, all updates are automatically batched. But knowing this history shows depth: pre-React 18, only event handlers were batched, not setTimeout/promises.</li>
            </ul>
        `
     },
    {
        id: 3,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the component lifecycle in React Native. How do hooks relate to lifecycle methods?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding lifecycle is essential for managing side effects, subscriptions, and cleanup. This question reveals whether you can prevent memory leaks and handle async operations properly.</p>

            <h4>Component Lifecycle Visual</h4>
            <pre><code>
┌─────────────────── MOUNTING ───────────────────┐
│                                                │
│  constructor(props)                            │
│       ↓                                        │
│  static getDerivedStateFromProps(props, state) │
│       ↓                                        │
│  render()                                      │
│       ↓                                        │
│  componentDidMount() ← API calls, subscriptions│
│                                                │
└────────────────────────────────────────────────┘
                      ↓
┌─────────────────── UPDATING ───────────────────┐
│  (triggered by: new props, setState, forceUpdate)
│                                                │
│  static getDerivedStateFromProps(props, state) │
│       ↓                                        │
│  shouldComponentUpdate(nextProps, nextState)   │
│       ↓ (return false to skip render)          │
│  render()                                      │
│       ↓                                        │
│  getSnapshotBeforeUpdate(prevProps, prevState) │
│       ↓                                        │
│  componentDidUpdate(prevProps, prevState, snap)│
│                                                │
└────────────────────────────────────────────────┘
                      ↓
┌─────────────────── UNMOUNTING ─────────────────┐
│                                                │
│  componentWillUnmount() ← cleanup, unsubscribe │
│                                                │
└────────────────────────────────────────────────┘</code></pre>

            <h4>Hooks Equivalents (Modern Approach)</h4>
            <pre><code>function MyComponent({ userId }) {
    // ══════════════════════════════════════════
    // constructor equivalent: useState initialization
    // ══════════════════════════════════════════
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ══════════════════════════════════════════
    // componentDidMount equivalent
    // Empty dependency array = runs once on mount
    // ══════════════════════════════════════════
    useEffect(() => {
        console.log('Component mounted');

        // Setup subscriptions
        const subscription = eventEmitter.subscribe(handleEvent);

        // Cleanup function = componentWillUnmount
        return () => {
            console.log('Component will unmount');
            subscription.unsubscribe();
        };
    }, []);

    // ══════════════════════════════════════════
    // componentDidUpdate equivalent
    // Runs when userId changes
    // ══════════════════════════════════════════
    useEffect(() => {
        console.log('userId changed, fetching user...');

        let isMounted = true;  // Prevent state update after unmount
        const controller = new AbortController();

        async function fetchUser() {
            setLoading(true);
            try {
                const data = await api.getUser(userId, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setUser(data);
                }
            } catch (error) {
                if (error.name !== 'AbortError' && isMounted) {
                    console.error(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchUser();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [userId]);  // Dependency array

    // ══════════════════════════════════════════
    // getDerivedStateFromProps equivalent
    // useMemo recalculates when props change
    // ══════════════════════════════════════════
    const fullName = useMemo(() => {
        return user ? \`\${user.firstName} \${user.lastName}\` : '';
    }, [user]);

    // ══════════════════════════════════════════
    // shouldComponentUpdate equivalent
    // Use React.memo() at component level
    // ══════════════════════════════════════════

    return loading ? &lt;ActivityIndicator /&gt; : &lt;Text&gt;{fullName}&lt;/Text&gt;;
}</code></pre>

            <h4>useEffect Execution Order</h4>
            <pre><code>function Parent() {
    useEffect(() => {
        console.log('1. Parent effect');
        return () => console.log('4. Parent cleanup');
    }, []);

    return &lt;Child /&gt;;
}

function Child() {
    useEffect(() => {
        console.log('2. Child effect');
        return () => console.log('3. Child cleanup');
    }, []);

    return &lt;Text&gt;Child&lt;/Text&gt;;
}

// Mount order:  Child effect → Parent effect
// Unmount order: Child cleanup → Parent cleanup
// Update order: All cleanups first, then all effects</code></pre>

            <h4>useLayoutEffect vs useEffect</h4>
            <pre><code>// useEffect: Runs AFTER paint (async, non-blocking)
// Good for: API calls, subscriptions, logging
useEffect(() => {
    fetchData();
}, []);

// useLayoutEffect: Runs BEFORE paint (sync, blocking)
// Good for: DOM measurements, preventing flicker
useLayoutEffect(() => {
    // Measure element and update state before user sees
    const { height } = ref.current.getBoundingClientRect();
    setHeight(height);
}, []);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always mention <strong>cleanup functions</strong> to prevent memory leaks</li>
                <li>Discuss <strong>dependency arrays</strong> and why incorrect deps cause bugs</li>
                <li>Know when to use <strong>useLayoutEffect</strong> (DOM measurements, preventing visual flicker)</li>
                <li>Explain the <strong>closure trap</strong> and how to avoid stale state in effects</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <pre><code>// ❌ Missing cleanup - memory leak!
useEffect(() => {
    const subscription = eventEmitter.subscribe(handler);
    // No cleanup function!
}, []);

// ❌ Missing dependency - stale closure
useEffect(() => {
    const interval = setInterval(() => {
        setCount(count + 1);  // count is stale!
    }, 1000);
    return () => clearInterval(interval);
}, []);  // count missing from deps

// ✅ Correct - use functional update
useEffect(() => {
    const interval = setInterval(() => {
        setCount(c => c + 1);  // Always uses latest value
    }, 1000);
    return () => clearInterval(interval);
}, []);</code></pre>
        `
     },
    {
        id: 4,
        category: "Core React Native",
        icon: "⚛️",
        question: "What are the differences between FlatList and ScrollView? When would you use each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>List performance is one of the most common pain points in React Native apps. This question tests your understanding of virtualization and your ability to build smooth, performant scrolling experiences.</p>

            <h4>Comparison Table</h4>
            <table>
                <tr><td><strong>Feature</strong></td><td><strong>ScrollView</strong></td><td><strong>FlatList</strong></td></tr>
                <tr><td>Rendering</td><td>All children at once</td><td>Only visible items (virtualized)</td></tr>
                <tr><td>Memory</td><td>High (all items in memory)</td><td>Low (recycles views)</td></tr>
                <tr><td>Initial render</td><td>Slow for large lists</td><td>Fast (renders few items)</td></tr>
                <tr><td>Scroll perf</td><td>Good (already rendered)</td><td>Can be janky if not optimized</td></tr>
                <tr><td>Pull to refresh</td><td>Manual implementation</td><td>Built-in</td></tr>
                <tr><td>Infinite scroll</td><td>Manual implementation</td><td>Built-in (onEndReached)</td></tr>
                <tr><td>Item separators</td><td>Manual</td><td>Built-in (ItemSeparatorComponent)</td></tr>
            </table>

            <h4>How FlatList Virtualization Works</h4>
            <pre><code>
┌──────────────────────────────────────────────────┐
│                Off-screen (top)                   │
│  Items recycled and removed from memory           │
├──────────────────────────────────────────────────┤ ← windowSize start
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           Rendered but not visible           │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
│  ╔═════════════════════════════════════════════╗ │ ← Viewport
│  ║                                             ║ │
│  ║              VISIBLE ITEMS                  ║ │
│  ║           (what user sees)                  ║ │
│  ║                                             ║ │
│  ╚═════════════════════════════════════════════╝ │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           Rendered but not visible           │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
├──────────────────────────────────────────────────┤ ← windowSize end
│                Off-screen (bottom)                │
│  Items recycled and removed from memory           │
└──────────────────────────────────────────────────┘</code></pre>

            <h4>FlatList Complete Optimization Guide</h4>
            <pre><code>const ITEM_HEIGHT = 80;

function OptimizedList({ items }) {
    // 1. Memoize renderItem to prevent recreation
    const renderItem = useCallback(({ item, index }) => (
        &lt;MemoizedListItem item={item} onPress={handlePress} /&gt;
    ), [handlePress]);

    // 2. Stable keyExtractor
    const keyExtractor = useCallback((item) => item.id, []);

    // 3. getItemLayout for fixed-height items (HUGE perf win)
    const getItemLayout = useCallback((data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    return (
        &lt;FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}

            // ═══════════════════════════════════
            // CRITICAL: Layout optimization
            // ═══════════════════════════════════
            getItemLayout={getItemLayout}  // Skip measurement

            // ═══════════════════════════════════
            // Virtualization tuning
            // ═══════════════════════════════════
            windowSize={5}           // 5 viewport heights (2 above, 2 below)
            initialNumToRender={10}  // Initial items to render
            maxToRenderPerBatch={5}  // Items per scroll batch
            updateCellsBatchingPeriod={50}  // Batch update interval

            // ═══════════════════════════════════
            // Memory optimization
            // ═══════════════════════════════════
            removeClippedSubviews={Platform.OS === 'android'}  // Android only!

            // ═══════════════════════════════════
            // Features
            // ═══════════════════════════════════
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}  // Trigger at 50% from bottom
            refreshControl={&lt;RefreshControl refreshing={refreshing} onRefresh={onRefresh} /&gt;}

            // ═══════════════════════════════════
            // UI Components
            // ═══════════════════════════════════
            ListHeaderComponent={Header}
            ListFooterComponent={loading ? &lt;ActivityIndicator /&gt; : null}
            ListEmptyComponent={&lt;EmptyState /&gt;}
            ItemSeparatorComponent={() => &lt;View style={styles.separator} /&gt;}
        /&gt;
    );
}

// 4. Memoized list item component
const MemoizedListItem = React.memo(({ item, onPress }) => (
    &lt;TouchableOpacity onPress={() => onPress(item.id)} style={styles.item}&gt;
        &lt;FastImage source={{ uri: item.avatar }} style={styles.avatar} /&gt;
        &lt;Text&gt;{item.name}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
), (prev, next) => prev.item.id === next.item.id);</code></pre>

            <h4>FlashList: The Better Alternative</h4>
            <pre><code>// Shopify's FlashList - drop-in replacement, much faster
import { FlashList } from "@shopify/flash-list";

&lt;FlashList
    data={items}
    renderItem={renderItem}
    estimatedItemSize={80}  // Required: helps with scroll position
    keyExtractor={keyExtractor}
/&gt;

// FlashList advantages:
// - Consistent 60fps scrolling
// - Better memory management
// - Simpler API (fewer props to tune)
// - Works great out of the box</code></pre>

            <h4>Decision Guide</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────┐
│                    Which component?                      │
└─────────────────────────────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              │   How many items?      │
              └───────────┬───────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
      < 20 items    20-100 items     > 100 items
          │               │               │
          ▼               ▼               ▼
     ScrollView       FlatList      FlashList
          │               │               │
          │     ┌─────────┴─────────┐     │
          │     ▼                   ▼     │
          │  Grouped?          Dynamic    │
          │     │              height?    │
          │     ▼                   │     │
          │  SectionList           │     │
          │                        ▼     │
          │               FlatList with   │
          │               getItemLayout   │
          └───────────────────────────────┘</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always mention <strong>getItemLayout</strong> for fixed-height items - it's the biggest perf win</li>
                <li>Discuss <strong>FlashList</strong> as the modern alternative to FlatList</li>
                <li>Explain <strong>removeClippedSubviews</strong> only works reliably on Android</li>
                <li>Know the difference between <strong>initialNumToRender</strong> and <strong>maxToRenderPerBatch</strong></li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Using ScrollView for lists with 100+ items</li>
                <li>Creating new function in renderItem (breaks memoization)</li>
                <li>Not implementing getItemLayout for fixed-height lists</li>
                <li>Using removeClippedSubviews on iOS (can cause rendering bugs)</li>
            </ul>
        `
     },
    {
        id: 5,
        category: "Core React Native",
        icon: "⚛️",
        question: "How do you handle platform-specific code in React Native?",
        difficulty: "beginner",
        seniority: "junior",
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
        seniority: "mid",
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
    {
        id: 51,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the difference between Controlled and Uncontrolled components in React Native. When would you use each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Controlled Components</h4>
            <p>Form data is handled by React state. The component receives its value from props and notifies changes through callbacks.</p>
            <pre><code>function ControlledInput() {
    const [value, setValue] = useState('');

    return (
        &lt;TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Controlled input"
        /&gt;
    );
}

// Benefits:
// - Single source of truth
// - Easy to validate/transform input
// - Form state is predictable</code></pre>

            <h4>Uncontrolled Components</h4>
            <p>Form data is handled by the DOM/native component itself. Use refs to access values when needed.</p>
            <pre><code>function UncontrolledInput() {
    const inputRef = useRef&lt;TextInput&gt;(null);

    const handleSubmit = () => {
        // Access value imperatively
        // Note: Not recommended in RN
        console.log(inputRef.current);
    };

    return (
        &lt;TextInput
            ref={inputRef}
            defaultValue="Initial"
            placeholder="Uncontrolled input"
        /&gt;
    );
}</code></pre>

            <h4>When to Use Each</h4>
            <table>
                <tr><td><strong>Controlled</strong></td><td><strong>Uncontrolled</strong></td></tr>
                <tr><td>Form validation needed</td><td>Simple forms without validation</td></tr>
                <tr><td>Conditional input disabling</td><td>Integration with non-React code</td></tr>
                <tr><td>Enforcing input format</td><td>Performance-critical scenarios</td></tr>
                <tr><td>Dynamic input values</td><td>File inputs (always uncontrolled)</td></tr>
            </table>

            <h4>Recommendation</h4>
            <p>In React Native, <strong>always prefer controlled components</strong>. They provide better debugging, testing, and predictability.</p>
        `
     },
    {
        id: 52,
        category: "Core React Native",
        icon: "⚛️",
        question: "What is the difference between useRef and useState? When should you use useRef?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Key Differences</h4>
            <table>
                <tr><td><strong>useState</strong></td><td><strong>useRef</strong></td></tr>
                <tr><td>Triggers re-render on change</td><td>Does NOT trigger re-render</td></tr>
                <tr><td>Returns [value, setter]</td><td>Returns { current: value }</td></tr>
                <tr><td>Value is immutable between renders</td><td>Value persists across renders</td></tr>
                <tr><td>For UI-related state</td><td>For mutable values, DOM refs</td></tr>
            </table>

            <h4>When to Use useRef</h4>
            <pre><code>// 1. Storing component references
const inputRef = useRef&lt;TextInput&gt;(null);
inputRef.current?.focus();

// 2. Storing previous values
const prevValueRef = useRef(value);
useEffect(() => {
    prevValueRef.current = value;
}, [value]);

// 3. Storing mutable values without re-render
const timerIdRef = useRef&lt;NodeJS.Timeout&gt;();
timerIdRef.current = setTimeout(() => {}, 1000);
// Cleanup: clearTimeout(timerIdRef.current)

// 4. Storing instance variables (like class this.x)
const renderCount = useRef(0);
renderCount.current += 1; // Won't cause re-render

// 5. Tracking mounted state
const isMounted = useRef(true);
useEffect(() => {
    return () => { isMounted.current = false; };
}, []);

// In async callback:
if (isMounted.current) {
    setState(data);
}</code></pre>

            <h4>Common Mistake</h4>
            <pre><code>// ❌ Wrong: Using ref for UI state
const [_, forceUpdate] = useState(0);
const countRef = useRef(0);
countRef.current += 1;
// UI won't update!

// ✅ Correct: Use state for UI
const [count, setCount] = useState(0);
setCount(c => c + 1);
// UI updates properly</code></pre>
        `
     },
    {
        id: 53,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the useReducer hook. When would you choose it over useState?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>useReducer Basics</h4>
            <p>useReducer is an alternative to useState for managing complex state logic.</p>
            <pre><code>// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: action.payload };
        default:
            throw new Error(\`Unknown action: \${action.type}\`);
    }
}

// Usage in component
function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        &lt;View&gt;
            &lt;Text&gt;Count: {state.count}&lt;/Text&gt;
            &lt;Button title="+" onPress={() => dispatch({ type: 'INCREMENT' })} /&gt;
            &lt;Button title="-" onPress={() => dispatch({ type: 'DECREMENT' })} /&gt;
            &lt;Button title="Reset" onPress={() => dispatch({ type: 'RESET', payload: 0 })} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>When to Use useReducer</h4>
            <ul>
                <li><strong>Complex state logic:</strong> Multiple sub-values or complex update logic</li>
                <li><strong>Next state depends on previous:</strong> state + action → new state</li>
                <li><strong>Multiple related updates:</strong> One action updates multiple fields</li>
                <li><strong>Testing:</strong> Reducer functions are easy to test in isolation</li>
            </ul>

            <h4>Practical Example: Form State</h4>
            <pre><code>const formReducer = (state, action) => {
    switch (action.type) {
        case 'FIELD_CHANGE':
            return {
                ...state,
                values: { ...state.values, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: null },
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors };
        case 'SET_SUBMITTING':
            return { ...state, isSubmitting: action.value };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const initialState = {
    values: { email: '', password: '' },
    errors: {},
    isSubmitting: false,
};

function LoginForm() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleEmailChange = (email: string) =&gt; {
        dispatch({ type: 'SET_FIELD', field: 'email', value: email });
    };

    const handleSubmit = async () =&gt; {
        dispatch({ type: 'SET_SUBMITTING', payload: true });
        try {
            await loginAPI(state.email, state.password);
            dispatch({ type: 'SET_SUCCESS' });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', field: 'general', message: error.message });
        }
    };

    return (
        &lt;View style={styles.form}&gt;
            &lt;TextInput
                value={state.email}
                onChangeText={handleEmailChange}
                placeholder="Email"
                editable={!state.isSubmitting}
            /&gt;
            {state.errors.email && &lt;Text style={styles.error}&gt;{state.errors.email}&lt;/Text&gt;}

            &lt;Button
                title={state.isSubmitting ? 'Logging in...' : 'Login'}
                onPress={handleSubmit}
                disabled={state.isSubmitting}
            /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>useState vs useReducer</h4>
            <table>
                <tr><td><strong>useState</strong></td><td>Simple, independent state values</td></tr>
                <tr><td><strong>useReducer</strong></td><td>Complex state objects, state machines</td></tr>
            </table>
        `
     },
    {
        id: 54,
        category: "Core React Native",
        icon: "⚛️",
        question: "What are Portals in React and how do they work in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Portals in React</h4>
            <p>Portals provide a way to render children into a DOM node that exists outside the parent component's hierarchy.</p>

            <h4>React Native Equivalent</h4>
            <p>React Native doesn't have built-in portals like React DOM, but we can achieve similar results using:</p>

            <h4>1. Using Modal Component</h4>
            <pre><code>import { Modal, View, Text } from 'react-native';

function MyComponent() {
    const [visible, setVisible] = useState(false);

    return (
        &lt;View&gt;
            &lt;Button title="Open" onPress={() => setVisible(true)} /&gt;

            {/* Modal renders outside the component tree */}
            &lt;Modal
                visible={visible}
                transparent
                animationType="fade"
            &gt;
                &lt;View style={styles.overlay}&gt;
                    &lt;View style={styles.content}&gt;
                        &lt;Text&gt;I'm rendered at root level!&lt;/Text&gt;
                    &lt;/View&gt;
                &lt;/View&gt;
            &lt;/Modal&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>2. Custom Portal Implementation</h4>
            <pre><code>// PortalContext.tsx
const PortalContext = createContext&lt;{
    mount: (key: string, element: ReactNode) => void;
    unmount: (key: string) => void;
}&gt;(null);

export function PortalProvider({ children }) {
    const [portals, setPortals] = useState&lt;Map&lt;string, ReactNode&gt;&gt;(new Map());

    const mount = useCallback((key: string, element: ReactNode) => {
        setPortals(prev => new Map(prev).set(key, element));
    }, []);

    const unmount = useCallback((key: string) => {
        setPortals(prev => {
            const next = new Map(prev);
            next.delete(key);
            return next;
        });
    }, []);

    return (
        &lt;PortalContext.Provider value={{ mount, unmount }}&gt;
            {children}
            {/* Portal host - renders at root */}
            {Array.from(portals.entries()).map(([key, element]) => (
                &lt;View key={key}&gt;{element}&lt;/View&gt;
            ))}
        &lt;/PortalContext.Provider&gt;
    );
}

// Portal component
export function Portal({ children }) {
    const { mount, unmount } = useContext(PortalContext);
    const key = useId();

    useEffect(() => {
        mount(key, children);
        return () => unmount(key);
    }, [children, key, mount, unmount]);

    return null;
}</code></pre>

            <h4>Use Cases</h4>
            <ul>
                <li>Modals and dialogs</li>
                <li>Tooltips and popovers</li>
                <li>Toast notifications</li>
                <li>Dropdown menus that need to overflow parents</li>
            </ul>
        `
     },
    {
        id: 55,
        category: "Core React Native",
        icon: "⚛️",
        question: "Explain the concept of Render Props pattern and how it compares to Hooks in React Native.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Render Props Pattern</h4>
            <p>A technique for sharing code between components using a prop whose value is a function.</p>
            <pre><code>// Render Props component
class MouseTracker extends Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (event) => {
        this.setState({ x: event.pageX, y: event.pageY });
    };

    render() {
        return (
            &lt;View onTouchMove={this.handleMouseMove}&gt;
                {this.props.render(this.state)}
            &lt;/View&gt;
        );
    }
}

// Usage
&lt;MouseTracker
    render={({ x, y }) => (
        &lt;Text&gt;Position: {x}, {y}&lt;/Text&gt;
    )}
/&gt;</code></pre>

            <h4>Modern Equivalent with Hooks</h4>
            <pre><code>// Custom Hook (preferred)
function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() =&gt; {
        const handler = (event) =&gt; {
            setPosition({ x: event.pageX, y: event.pageY });
        };

        // Add event listener (for React Native Web or gesture tracking)
        window.addEventListener('mousemove', handler);

        // Cleanup: Remove listener on unmount
        return () =&gt; {
            window.removeEventListener('mousemove', handler);
        };
    }, []);

    return position;
}

// Usage - much cleaner!
function MyComponent() {
    const { x, y } = useMousePosition();
    return &lt;Text&gt;Position: {x}, {y}&lt;/Text&gt;;
}</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><td><strong>Render Props</strong></td><td><strong>Hooks</strong></td></tr>
                <tr><td>Works with class components</td><td>Only functional components</td></tr>
                <tr><td>Can cause "wrapper hell"</td><td>Flat component structure</td></tr>
                <tr><td>Explicit data flow</td><td>Implicit but cleaner</td></tr>
                <tr><td>Runtime composition</td><td>Static composition</td></tr>
            </table>

            <h4>When Render Props Still Useful</h4>
            <pre><code>// Dynamic children based on state
&lt;FlatList
    data={items}
    renderItem={({ item, index }) => (
        &lt;ItemComponent item={item} index={index} /&gt;
    )}
/&gt;

// Animation libraries
&lt;Animated.View&gt;
    {(animatedValue) => (
        &lt;View style={{ opacity: animatedValue }} /&gt;
    )}
&lt;/Animated.View&gt;</code></pre>

            <h4>Recommendation</h4>
            <p><strong>Use Hooks for most cases.</strong> Render Props are still valid for component libraries needing dynamic rendering flexibility.</p>
        `
    },
];

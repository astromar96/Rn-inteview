// Comprehensive React Native Interview Questions Database
export const questionsData = [
    // ==================== CORE REACT NATIVE ====================
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

    // ==================== NAVIGATION ====================
    {
        id: 7,
        category: "Navigation",
        icon: "🧭",
        question: "Compare different navigation solutions in React Native. Why is React Navigation the most popular?",
        difficulty: "intermediate",
        seniority: "mid",
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
        seniority: "mid",
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
        seniority: "senior",
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
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>State management choice significantly impacts app architecture, performance, and developer experience. Interviewers want to see that you can make informed decisions based on project needs, not just use whatever you've always used.</p>

            <h4>Comprehensive Comparison</h4>
            <table>
                <tr>
                    <td><strong>Aspect</strong></td>
                    <td><strong>Redux</strong></td>
                    <td><strong>Context</strong></td>
                    <td><strong>Zustand</strong></td>
                    <td><strong>Jotai</strong></td>
                </tr>
                <tr>
                    <td>Bundle size</td>
                    <td>~12kb</td>
                    <td>0 (built-in)</td>
                    <td>~1kb</td>
                    <td>~2kb</td>
                </tr>
                <tr>
                    <td>Boilerplate</td>
                    <td>Medium (RTK)</td>
                    <td>Low</td>
                    <td>Very Low</td>
                    <td>Very Low</td>
                </tr>
                <tr>
                    <td>DevTools</td>
                    <td>Excellent</td>
                    <td>Basic</td>
                    <td>Good</td>
                    <td>Good</td>
                </tr>
                <tr>
                    <td>Re-render control</td>
                    <td>Selectors</td>
                    <td>Poor</td>
                    <td>Selectors</td>
                    <td>Atomic</td>
                </tr>
                <tr>
                    <td>Learning curve</td>
                    <td>Steep</td>
                    <td>Easy</td>
                    <td>Easy</td>
                    <td>Medium</td>
                </tr>
                <tr>
                    <td>Middleware</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>Limited</td>
                </tr>
            </table>

            <h4>When to Use Each</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────────┐
│                   State Management Decision Tree             │
└─────────────────────────────────────────────────────────────┘
                              │
                  ┌───────────┴───────────┐
                  │ Is it server state?    │
                  │ (API data, cache)      │
                  └───────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
             YES             NO              BOTH
              │               │               │
              ▼               │               ▼
        TanStack Query        │         TanStack Query
        (React Query)         │         + client state lib
                              │
                  ┌───────────┴───────────┐
                  │  App size & complexity │
                  └───────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
       Small              Medium               Large
      (< 10 screens)   (10-30 screens)      (30+ screens)
          │                   │                   │
          ▼                   ▼                   ▼
   Context + useReducer   Zustand            Redux Toolkit
   or Zustand             or Jotai           or Zustand</code></pre>

            <h4>Redux Toolkit (Modern Redux)</h4>
            <pre><code>// store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for API calls
export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.getUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null as User | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        // Immer allows "mutations" - actually creates new state
        setUser: (state, action: PayloadAction&lt;User&gt;) => {
            state.data = action.payload;
        },
        clearUser: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Usage with typed hooks
const user = useAppSelector((state) => state.user.data);
const dispatch = useAppDispatch();
dispatch(fetchUser('123'));</code></pre>

            <h4>Zustand (Simple & Powerful)</h4>
            <pre><code>// store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStore {
    user: User | null;
    loading: boolean;
    setUser: (user: User) => void;
    fetchUser: (id: string) => Promise&lt;void&gt;;
    logout: () => void;
}

export const useUserStore = create&lt;UserStore&gt;()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,

            setUser: (user) => set({ user }),

            fetchUser: async (id) => {
                set({ loading: true });
                try {
                    const user = await api.getUser(id);
                    set({ user, loading: false });
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },

            logout: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ user: state.user }),  // Only persist user
        }
    )
);

// Usage - no Provider needed!
function Profile() {
    // Only re-renders when user changes
    const user = useUserStore((state) => state.user);
    const fetchUser = useUserStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser('123');
    }, []);

    return &lt;Text&gt;{user?.name}&lt;/Text&gt;;
}</code></pre>

            <h4>Context API (Built-in, Use Carefully)</h4>
            <pre><code>// ⚠️ Context re-renders ALL consumers when value changes
// Split contexts to minimize re-renders

// ✅ Good: Separate contexts for different concerns
const UserContext = createContext&lt;User | null&gt;(null);
const UserDispatchContext = createContext&lt;Dispatch&lt;UserAction&gt;&gt;(null);

function UserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, null);

    return (
        &lt;UserContext.Provider value={user}&gt;
            &lt;UserDispatchContext.Provider value={dispatch}&gt;
                {children}
            &lt;/UserDispatchContext.Provider&gt;
        &lt;/UserContext.Provider&gt;
    );
}

// Components only subscribe to what they need
function UserName() {
    const user = useContext(UserContext);  // Only re-renders on user change
    return &lt;Text&gt;{user?.name}&lt;/Text&gt;;
}

function LogoutButton() {
    const dispatch = useContext(UserDispatchContext);  // Never re-renders!
    return &lt;Button onPress={() => dispatch({ type: 'LOGOUT' })} /&gt;;
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Distinguish between <strong>client state</strong> (UI state) and <strong>server state</strong> (API data)</li>
                <li>Mention <strong>TanStack Query</strong> for server state - it handles caching, refetching, and syncing</li>
                <li>Explain Context's <strong>re-render problem</strong> and how to mitigate it</li>
                <li>Know that Zustand doesn't need a Provider wrapper</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Using Redux for everything when simpler solutions work</li>
                <li>Putting server state in Redux instead of using React Query</li>
                <li>Creating one giant Context that re-renders the entire app</li>
                <li>Not using selectors in Redux, causing unnecessary re-renders</li>
            </ul>
        `
    },
    {
        id: 11,
        category: "State Management",
        icon: "🗃️",
        question: "What is React Query/TanStack Query and why is it important for React Native apps?",
        difficulty: "intermediate",
        seniority: "mid",
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
        seniority: "mid",
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

    // ==================== NATIVE MODULES ====================
    {
        id: 17,
        category: "Native Modules",
        icon: "🔧",
        question: "Explain the React Native Bridge architecture. What are its limitations?",
        difficulty: "advanced",
        seniority: "senior",
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
        seniority: "senior",
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
        seniority: "senior",
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
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>The New Architecture is the biggest change to React Native since its inception. It's now enabled by default in RN 0.76+. Understanding it demonstrates you're up-to-date with the platform and can build high-performance apps.</p>

            <h4>Old vs New Architecture Overview</h4>
            <pre><code>
════════════════════════════════════════════════════════════════
                    OLD ARCHITECTURE
════════════════════════════════════════════════════════════════

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  JavaScript │   JSON  │   Bridge    │  JSON   │   Native    │
│   Thread    │ ──────→ │ (Async,     │ ──────→ │   Thread    │
│             │ ←────── │  Batched)   │ ←────── │             │
└─────────────┘         └─────────────┘         └─────────────┘

Problems:
• All communication is asynchronous
• JSON serialization overhead
• Data copying between threads
• No synchronous measurements possible
• Bridge is a bottleneck

════════════════════════════════════════════════════════════════
                    NEW ARCHITECTURE
════════════════════════════════════════════════════════════════

┌─────────────┐                                 ┌─────────────┐
│  JavaScript │ ◄──────── JSI ────────────────► │   Native    │
│   Thread    │   (Direct C++ bindings)         │   Thread    │
└─────────────┘                                 └─────────────┘
        │                                               │
        │           ┌───────────────────┐              │
        └──────────►│  Shared C++ Core  │◄─────────────┘
                    │  (Fabric, Yoga)   │
                    └───────────────────┘

Benefits:
• Synchronous method calls possible
• No serialization overhead
• Direct memory access
• Shared ownership of objects
• Concurrent rendering support</code></pre>

            <h4>The Three Pillars Explained</h4>

            <h4>1. JSI (JavaScript Interface)</h4>
            <p>The foundation - a C++ API that allows JavaScript to hold references to and call C++ objects directly.</p>
            <pre><code>// Old way: Bridge (async, serialized)
NativeModules.MyModule.calculate(1, 2, (result) => {
    console.log(result);  // Callback after bridge round-trip
});

// New way: JSI (sync possible, no serialization)
// JavaScript can call C++ directly
const result = global.MyModule.calculate(1, 2);  // Synchronous!
console.log(result);</code></pre>

            <h4>2. Fabric (New Rendering System)</h4>
            <p>Replaces the old UI Manager. Written in C++ for cross-platform consistency.</p>
            <pre><code>// Key Fabric improvements:

// 1. Synchronous layout measurement
// Old: Request measurement → wait for bridge → get result
// New: Measure immediately when needed
const { width, height } = view.measure();  // Sync!

// 2. Concurrent rendering support
// Can interrupt rendering to handle high-priority updates
// Enables React 18 features: Suspense, Transitions

// 3. Multiple render priorities
// Priority 1: User input (touch, keyboard)
// Priority 2: Animations
// Priority 3: Data loading

// 4. C++ Shadow Tree
// Layout calculated in C++, shared between platforms
// Same layout behavior on iOS and Android</code></pre>

            <h4>3. TurboModules</h4>
            <p>Replacement for Native Modules with lazy loading and type safety.</p>
            <pre><code>// TurboModule Definition (TypeScript spec)
// NativeCalculator.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    // Codegen generates native interfaces from this!
    add(a: number, b: number): number;  // Sync
    fetchData(url: string): Promise&lt;string&gt;;  // Async
    readonly PI: number;  // Constants
}

export default TurboModuleRegistry.getEnforcing&lt;Spec&gt;('Calculator');

// Key improvements over Native Modules:
// 1. Lazy loading: Module code loaded only when first accessed
// 2. Type safety: TypeScript spec → native code generation
// 3. Direct calls: No JSON serialization via JSI
// 4. Sync methods: Can return values synchronously</code></pre>

            <h4>4. Codegen</h4>
            <p>Automatically generates native code from TypeScript specifications.</p>
            <pre><code>// Your TypeScript spec
interface Spec extends TurboModule {
    multiply(a: number, b: number): number;
}

// Codegen generates:

// iOS (Objective-C++ header)
@protocol NativeCalculatorSpec &lt;RCTBridgeModule, RCTTurboModule&gt;
- (NSNumber *)multiply:(double)a b:(double)b;
@end

// Android (Java interface)
public interface NativeCalculatorSpec extends ReactModule {
    double multiply(double a, double b);
}

// Benefits:
// • Type mismatches caught at build time
// • No manual native interface writing
// • Consistent contracts between JS and native</code></pre>

            <h4>Enabling New Architecture</h4>
            <pre><code>// React Native 0.76+ has it enabled by default!

// For older versions:

// Android - android/gradle.properties
newArchEnabled=true

// iOS - Podfile (before 'use_react_native!')
ENV['RCT_NEW_ARCH_ENABLED'] = '1'

// Then install pods
cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

// Verify it's working
// In your app:
import { Platform } from 'react-native';
console.log('Fabric enabled:', global._IS_FABRIC);
console.log('TurboModules:', !!global.__turboModuleProxy);</code></pre>

            <h4>Performance Comparison</h4>
            <table>
                <tr><td><strong>Metric</strong></td><td><strong>Old Arch</strong></td><td><strong>New Arch</strong></td></tr>
                <tr><td>Module initialization</td><td>All at startup</td><td>Lazy (on first use)</td></tr>
                <tr><td>JS → Native call</td><td>~1-2ms (async)</td><td>~0.01ms (sync possible)</td></tr>
                <tr><td>Layout sync measurement</td><td>Not possible</td><td>Yes</td></tr>
                <tr><td>Memory for large data</td><td>Copied (2x)</td><td>Shared</td></tr>
                <tr><td>Concurrent rendering</td><td>No</td><td>Yes</td></tr>
            </table>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Know the <strong>three pillars</strong>: JSI, Fabric, TurboModules</li>
                <li>Explain <strong>why it's faster</strong>: no JSON serialization, sync calls, shared memory</li>
                <li>Mention <strong>Codegen</strong> for type safety</li>
                <li>Note that <strong>RN 0.76+</strong> has New Architecture enabled by default</li>
            </ul>

            <h4>🚫 Common Misconceptions</h4>
            <ul>
                <li><strong>Wrong:</strong> "New Architecture is optional" - It's now the default</li>
                <li><strong>Wrong:</strong> "All libraries need updating" - Most popular libraries already support it</li>
                <li><strong>Correct:</strong> "It enables synchronous communication when needed"</li>
            </ul>
        `
    },
    {
        id: 21,
        category: "New Architecture",
        icon: "🏗️",
        question: "How do you migrate an existing app to the New Architecture?",
        difficulty: "advanced",
        seniority: "senior",
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
        seniority: "mid",
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
        seniority: "senior",
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
        seniority: "junior",
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
        seniority: "mid",
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
        seniority: "senior",
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
        seniority: "mid",
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
        seniority: "mid",
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

    const fetchData = useCallback(async () =&gt; {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            const result = await response.json();
            setData(result);
            options?.onSuccess?.(result);
        } catch (err) =&gt; {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
            options?.onError?.(error);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() =&gt; {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() =&gt; fetchData(), [fetchData]);

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
    const [user, setUser] = useState&lt;User | null&gt;(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() =&gt; {
        const checkAuth = async () =&gt; {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    const userData = await api.getCurrentUser(token);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const signIn = async (email: string, password: string) =&gt; {
        setIsLoading(true);
        try {
            const { user, token } = await api.login(email, password);
            await AsyncStorage.setItem('authToken', token);
            setUser(user);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () =&gt; {
        await AsyncStorage.removeItem('authToken');
        setUser(null);
    };

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
        seniority: "mid",
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
        seniority: "senior",
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
        seniority: "mid",
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
        seniority: "senior",
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
        seniority: "mid",
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
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Mobile security is critical for protecting user data and meeting compliance requirements (GDPR, HIPAA, PCI-DSS). This question tests your awareness of mobile-specific threats and your ability to implement defense-in-depth.</p>

            <h4>Mobile Security Threat Model</h4>
            <pre><code>
┌─────────────────────────────────────────────────────────────┐
│                    ATTACK SURFACE                            │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐         ┌──────────────┐
    │   Device     │         │   Network    │
    │   Attacks    │         │   Attacks    │
    ├──────────────┤         ├──────────────┤
    │ • Rooted/JB  │         │ • MITM       │
    │ • Malware    │         │ • Sniffing   │
    │ • Theft      │         │ • Replay     │
    │ • Keyloggers │         │ • Injection  │
    └──────────────┘         └──────────────┘

    ┌──────────────┐         ┌──────────────┐
    │   Binary     │         │   Backend    │
    │   Attacks    │         │   Attacks    │
    ├──────────────┤         ├──────────────┤
    │ • Reverse Eng│         │ • Auth bypass│
    │ • Tampering  │         │ • API abuse  │
    │ • Debugging  │         │ • Data leak  │
    │ • Cloning    │         │ • Injection  │
    └──────────────┘         └──────────────┘</code></pre>

            <h4>1. Secure Storage (Critical)</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// ❌ NEVER store sensitive data in AsyncStorage
// ═══════════════════════════════════════════════════
// AsyncStorage is NOT encrypted, easily readable on rooted devices

// ═══════════════════════════════════════════════════
// ✅ Use Platform Secure Storage
// ═══════════════════════════════════════════════════

// Option 1: react-native-keychain
import * as Keychain from 'react-native-keychain';

// Store credentials with hardware security
async function storeToken(token: string) {
    await Keychain.setGenericPassword('auth', token, {
        // iOS: Store in Secure Enclave when available
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        // Android: Use hardware-backed keystore
        securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        // Require biometric to access
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    });
}

// Option 2: expo-secure-store
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    requireAuthentication: true,
});

// ═══════════════════════════════════════════════════
// What goes where:
// ═══════════════════════════════════════════════════
// SecureStore/Keychain: Tokens, passwords, API keys, PII
// AsyncStorage: Preferences, non-sensitive cache
// MMKV (encrypted): Large non-sensitive data needing speed</code></pre>

            <h4>2. Network Security</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// Certificate Pinning - Prevent MITM attacks
// ═══════════════════════════════════════════════════

// Using react-native-ssl-pinning
import { fetch } from 'react-native-ssl-pinning';

const response = await fetch('https://api.myapp.com/data', {
    method: 'GET',
    headers: { Authorization: \`Bearer \${token}\` },
    sslPinning: {
        certs: ['my_cert'],  // Certificate in app bundle
    },
    timeoutInterval: 10000,
});

// ═══════════════════════════════════════════════════
// For Axios users: react-native-ssl-public-key-pinning
// ═══════════════════════════════════════════════════
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';

await initializeSslPinning({
    'api.myapp.com': {
        includeSubdomains: true,
        publicKeyHashes: [
            'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
            'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',  // Backup
        ],
    },
});

// ═══════════════════════════════════════════════════
// Additional Network Security
// ═══════════════════════════════════════════════════
// 1. Always use HTTPS
// 2. Validate server certificates
// 3. Don't trust user-installed CAs in production
// 4. Implement request signing for sensitive APIs</code></pre>

            <h4>3. Runtime Security</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// Detect compromised devices
// ═══════════════════════════════════════════════════
import JailMonkey from 'jail-monkey';
import DeviceInfo from 'react-native-device-info';

async function checkSecurityStatus() {
    const checks = {
        isRooted: JailMonkey.isJailBroken(),
        isDebugged: JailMonkey.isDebuggedMode(),
        isEmulator: await DeviceInfo.isEmulator(),
        hasHooks: JailMonkey.hookDetected(),  // Frida, Xposed
        canMockLocation: JailMonkey.canMockLocation(),
    };

    // Risk scoring
    const riskLevel = Object.values(checks).filter(Boolean).length;

    if (riskLevel >= 2) {
        // High risk: Block sensitive features
        return { safe: false, reason: 'Device security compromised' };
    }

    if (checks.isRooted && !__DEV__) {
        // Rooted in production: Warn user
        Alert.alert(
            'Security Warning',
            'This device may be compromised. Some features are disabled.'
        );
    }

    return { safe: true };
}

// ═══════════════════════════════════════════════════
// Detect tampering (app integrity)
// ═══════════════════════════════════════════════════
// iOS: App Attest API
// Android: Play Integrity API
// Consider: freerasp library for comprehensive checks</code></pre>

            <h4>4. Code Protection</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// Hermes provides baseline protection
// ═══════════════════════════════════════════════════
// JS is compiled to bytecode (not plain text)
// But can still be decompiled!

// ═══════════════════════════════════════════════════
// Android: Enable ProGuard/R8
// ═══════════════════════════════════════════════════
// android/app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
                          'proguard-rules.pro'
        }
    }
}

// ═══════════════════════════════════════════════════
// What NOT to put in your code
// ═══════════════════════════════════════════════════
// ❌ API keys (use server-side proxy)
// ❌ Encryption keys (derive at runtime or use secure storage)
// ❌ Backend URLs for admin endpoints
// ❌ Feature flags that reveal unreleased features</code></pre>

            <h4>Security Checklist</h4>
            <pre><code>□ Sensitive data in Keychain/Keystore, NOT AsyncStorage
□ Certificate pinning enabled for API calls
□ No hardcoded secrets in JavaScript
□ Root/jailbreak detection with appropriate response
□ Biometric auth for sensitive operations
□ Input validation on all user inputs
□ Auto-logout on app background (for sensitive apps)
□ Secure WebView configuration (if used)
□ Hermes enabled (bytecode vs plaintext JS)
□ ProGuard/R8 enabled for Android release builds</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Emphasize <strong>defense in depth</strong> - multiple layers of security</li>
                <li>Know the difference between <strong>AsyncStorage and secure storage</strong></li>
                <li>Explain <strong>certificate pinning</strong> and why it prevents MITM</li>
                <li>Discuss <strong>compliance requirements</strong> (OWASP MASVS, GDPR)</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li>Storing tokens in AsyncStorage</li>
                <li>Hardcoding API keys in JavaScript</li>
                <li>Not validating input from deep links</li>
                <li>Trusting client-side validation alone</li>
            </ul>
        `
    },
    {
        id: 35,
        category: "Security",
        icon: "🔒",
        question: "How do you securely handle authentication tokens in React Native?",
        difficulty: "advanced",
        seniority: "senior",
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

    // ==================== EXPO ====================
    {
        id: 38,
        category: "Expo",
        icon: "📱",
        question: "Compare Expo managed workflow vs bare workflow. When would you choose each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding Expo workflows is crucial for project architecture decisions. This question tests whether you can make informed choices that balance development speed, app capabilities, and long-term maintenance based on project requirements.</p>

            <h4>Workflow Comparison Table</h4>
            <table>
                <tr><td><strong>Aspect</strong></td><td><strong>Managed Workflow</strong></td><td><strong>Bare Workflow</strong></td></tr>
                <tr><td>Native Code Access</td><td>No direct access</td><td>Full access (ios/, android/)</td></tr>
                <tr><td>Build Process</td><td>EAS Build (cloud)</td><td>Local or EAS Build</td></tr>
                <tr><td>Native Libraries</td><td>Expo SDK only</td><td>Any native library</td></tr>
                <tr><td>Setup Time</td><td>Minutes</td><td>Hours (native tooling)</td></tr>
                <tr><td>OTA Updates</td><td>Built-in (expo-updates)</td><td>Requires setup</td></tr>
                <tr><td>App Size</td><td>Larger (includes all Expo)</td><td>Optimized (only what you use)</td></tr>
                <tr><td>Debugging</td><td>Expo Go app</td><td>Native debuggers (Xcode, Android Studio)</td></tr>
                <tr><td>Team Skills Needed</td><td>JavaScript/React only</td><td>+ iOS/Android native</td></tr>
            </table>

            <h4>Architecture Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     MANAGED WORKFLOW                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐   │
│  │  Your JS    │ ──→ │  Expo SDK   │ ──→ │   EAS Build     │   │
│  │    Code     │     │  (bundled)  │     │   (cloud)       │   │
│  └─────────────┘     └─────────────┘     └─────────────────┘   │
│                              ↓                                   │
│                    Native code is hidden                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      BARE WORKFLOW                               │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐   │
│  │  Your JS    │ ──→ │  ios/ &     │ ──→ │  Local Build or │   │
│  │    Code     │     │  android/   │     │    EAS Build    │   │
│  └─────────────┘     └─────────────┘     └─────────────────┘   │
│                              ↓                                   │
│                    Full native access + Expo modules             │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>When to Use Managed Workflow</h4>
            <pre><code>✅ CHOOSE MANAGED WHEN:

1. Rapid Prototyping / MVP
   - Get to market fast
   - Test ideas without native overhead

2. Team Composition
   - No iOS/Android developers on team
   - JavaScript-focused developers

3. Standard Features Only
   - Camera, location, notifications
   - Social auth, payments (Stripe)
   - Push notifications

4. Simplified DevOps
   - Don't want to manage certificates
   - CI/CD through EAS

5. Instant Updates Critical
   - OTA updates without app store review
   - A/B testing, quick bug fixes</code></pre>

            <h4>When to Use Bare Workflow</h4>
            <pre><code>✅ CHOOSE BARE WHEN:

1. Custom Native Code Required
   - Proprietary SDK integration
   - Custom native modules
   - Platform-specific features

2. Performance Critical
   - Optimize app size (remove unused Expo)
   - Native-level performance tuning

3. Specific Library Needs
   - Libraries not supported by Expo
   - React Native Firebase (advanced features)
   - Custom video players, ML models

4. Enterprise Requirements
   - On-premise builds (security)
   - Custom signing configurations
   - White-labeling multiple apps

5. Full Control Needed
   - Specific Gradle/Podfile configurations
   - Native UI customizations
   - Background processing</code></pre>

            <h4>Migration: Managed to Bare (Prebuild)</h4>
            <pre><code># Modern approach: Continuous Native Generation (CNG)
# Generate native projects from config

npx expo prebuild

# Result:
my-app/
├── app.json              # Configuration source
├── ios/                  # Generated iOS project
│   ├── Podfile
│   └── MyApp.xcworkspace
├── android/              # Generated Android project
│   ├── build.gradle
│   └── app/
└── package.json

# Key benefit: You can STILL use Expo modules!
# Best of both worlds

# Regenerate when needed (clean rebuild)
npx expo prebuild --clean

# This is NOT the same as old "eject"
# You can regenerate native folders anytime</code></pre>

            <h4>Decision Flowchart</h4>
            <pre><code>                    ┌─────────────────────┐
                    │ Starting new project │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Need custom native  │──── Yes ──→ Bare Workflow
                    │ code or unsupported │              (or Dev Build)
                    │ libraries?          │
                    └──────────┬──────────┘
                               │ No
                               ▼
                    ┌─────────────────────┐
                    │ Team has native     │──── Yes ──→ Consider Bare
                    │ iOS/Android skills? │              (more control)
                    └──────────┬──────────┘
                               │ No
                               ▼
                    ┌─────────────────────┐
                    │ App size/perf       │──── Yes ──→ Bare Workflow
                    │ critical concern?   │
                    └──────────┬──────────┘
                               │ No
                               ▼
                    ┌─────────────────────┐
                    │   Managed Workflow  │
                    │   (fastest start)   │
                    └─────────────────────┘</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Mention <strong>Expo Dev Client</strong> as the middle ground - managed workflow with custom native modules</li>
                <li>Explain that <strong>prebuild</strong> replaced the old "eject" - it's now reversible and repeatable</li>
                <li>Discuss <strong>Continuous Native Generation (CNG)</strong> - native folders regenerated from config</li>
                <li>Note that most Expo modules work in bare workflow too</li>
            </ul>

            <h4>🚫 Common Misconceptions</h4>
            <ul>
                <li><strong>Wrong:</strong> "Ejecting from Expo means you can't use Expo anymore"</li>
                <li><strong>Wrong:</strong> "Managed workflow is only for simple apps"</li>
                <li><strong>Correct:</strong> "Bare workflow with Expo modules gives you best of both worlds"</li>
                <li><strong>Correct:</strong> "EAS Build works for both managed and bare workflows"</li>
            </ul>
        `
    },
    {
        id: 39,
        category: "Expo",
        icon: "📱",
        question: "What is EAS (Expo Application Services) and how does it help with app development?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>EAS has become the standard for building, deploying, and updating React Native apps. Understanding EAS demonstrates knowledge of modern mobile DevOps practices and can significantly reduce time-to-production for teams.</p>

            <h4>EAS Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                  Expo Application Services (EAS)                 │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   EAS Build     │   EAS Submit    │       EAS Update            │
│   (compile)     │   (distribute)  │       (patch)               │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ • Cloud builds  │ • App Store     │ • OTA JS updates            │
│ • Credentials   │ • Play Store    │ • No store review           │
│ • CI/CD ready   │ • TestFlight    │ • Branch deployments        │
└─────────────────┴─────────────────┴─────────────────────────────┘
                              │
                   ┌──────────▼──────────┐
                   │    eas.json         │
                   │  (configuration)    │
                   └─────────────────────┘</code></pre>

            <h4>1. EAS Build - Cloud Native Compilation</h4>
            <pre><code># Why EAS Build?
┌────────────────────────────────────────────────────────────┐
│  Traditional Build             vs    EAS Build             │
├────────────────────────────────────────────────────────────┤
│  • Need Mac for iOS builds     │  • Build iOS from any OS  │
│  • Install Xcode (50GB+)       │  • No local tools needed  │
│  • Manage certificates         │  • Auto credentials mgmt  │
│  • CI server maintenance       │  • Managed infrastructure │
│  • Codesigning headaches       │  • One command builds     │
└────────────────────────────────────────────────────────────┘

# Build Commands
eas build --platform ios           # iOS only
eas build --platform android       # Android only
eas build --platform all           # Both platforms

# Build for specific profile
eas build --platform ios --profile production
eas build --platform android --profile preview

# Local build (if you have native tools)
eas build --platform android --local

# Check build status
eas build:list</code></pre>

            <h4>2. EAS Submit - Automated Store Submission</h4>
            <pre><code># Automate the tedious submission process
# No more manual uploads through App Store Connect!

# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android

# Submit specific build
eas submit --platform ios --id BUILD_ID

# What EAS Submit handles:
┌─────────────────────────────────────────────────┐
│  iOS                    │  Android              │
├─────────────────────────┼───────────────────────┤
│  • App Store Connect    │  • Play Console API   │
│  • TestFlight upload    │  • Track selection    │
│  • Apple credentials    │  • Service account    │
│  • Version management   │  • Release notes      │
└─────────────────────────┴───────────────────────┘</code></pre>

            <h4>3. EAS Update - Over-The-Air Updates</h4>
            <pre><code># Push JavaScript/asset updates WITHOUT app store review
# Users get updates instantly on next app launch

# Publish update to production branch
eas update --branch production --message "Fix login bug"

# Publish to preview branch
eas update --branch preview --message "New feature testing"

# How OTA Updates Work:
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   App Launch  ──→  Check for Update  ──→  Download JS Bundle    │
│                         │                        │               │
│                         ▼                        ▼               │
│               ┌─────────────────┐    ┌──────────────────────┐  │
│               │  No update?     │    │  Apply on next       │  │
│               │  Use cached     │    │  launch (or instant) │  │
│               └─────────────────┘    └──────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

# Branch-based deployment
eas update --branch production    # Live users
eas update --branch staging       # QA testing
eas update --branch feature-x     # Feature testing

# IMPORTANT: What CAN'T be updated OTA:
# ❌ Native code changes
# ❌ New native modules
# ❌ iOS/Android permissions
# ❌ App icons, splash screens (baked into binary)

# ✅ What CAN be updated OTA:
# ✅ JavaScript code
# ✅ React components
# ✅ Images/assets in JS bundle
# ✅ Business logic</code></pre>

            <h4>Complete eas.json Configuration</h4>
            <pre><code>{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk"  // or "app-bundle" for Play Store
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"  // or "internal", "alpha", "beta"
      }
    }
  }
}</code></pre>

            <h4>EAS Workflow Example</h4>
            <pre><code># Complete CI/CD workflow

# 1. Development: Build dev client for testing
eas build --profile development --platform all

# 2. Preview: Internal testing build
eas build --profile preview --platform all

# 3. Production: App store build
eas build --profile production --platform all

# 4. Submit to stores
eas submit --platform all --profile production

# 5. Hot fix? Push OTA update
eas update --branch production --message "Critical fix v1.2.1"

# Typical Release Flow:
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Feature │ ─→ │ Preview │ ─→ │ Submit  │ ─→ │ OTA for │
│  Build  │    │  Test   │    │ to Store│    │ patches │
└─────────┘    └─────────┘    └─────────┘    └─────────┘</code></pre>

            <h4>EAS vs Alternatives</h4>
            <table>
                <tr><td><strong>Feature</strong></td><td><strong>EAS</strong></td><td><strong>Fastlane</strong></td><td><strong>App Center</strong></td></tr>
                <tr><td>Cloud Builds</td><td>✅ Native</td><td>❌ Need CI</td><td>✅ Yes</td></tr>
                <tr><td>iOS from Windows</td><td>✅ Yes</td><td>❌ No</td><td>✅ Yes</td></tr>
                <tr><td>Credentials Mgmt</td><td>✅ Auto</td><td>✅ Match</td><td>⚠️ Manual</td></tr>
                <tr><td>OTA Updates</td><td>✅ Native</td><td>❌ No</td><td>✅ Yes</td></tr>
                <tr><td>Expo Integration</td><td>✅ Perfect</td><td>⚠️ Config</td><td>⚠️ Config</td></tr>
                <tr><td>Pricing</td><td>Free tier + paid</td><td>Free (self-host)</td><td>Free tier + paid</td></tr>
            </table>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain the <strong>three pillars</strong>: Build, Submit, Update - each solves a specific pain point</li>
                <li>Mention <strong>channels and branches</strong> for managing different deployment environments</li>
                <li>Know the <strong>limitations of OTA updates</strong> - native code changes require new builds</li>
                <li>Discuss <strong>cost considerations</strong> - free tier is generous but production may need paid</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li><strong>Mistake:</strong> Trying to push native module changes via OTA update</li>
                <li><strong>Mistake:</strong> Not setting up proper channels for staging vs production</li>
                <li><strong>Mistake:</strong> Forgetting to configure credentials before first build</li>
                <li><strong>Best Practice:</strong> Always test OTA updates on preview channel before production</li>
            </ul>
        `
    },

    // ==================== ARCHITECTURE ====================
    {
        id: 40,
        category: "Architecture",
        icon: "🏛️",
        question: "Describe different architectural patterns for React Native apps. What's your preferred approach?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Architecture decisions made early in a project have long-lasting effects on scalability, testability, and team productivity. Senior engineers must understand trade-offs between different patterns and choose appropriately based on project needs, team size, and complexity.</p>

            <h4>Architecture Patterns Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE SPECTRUM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Simple ◄────────────────────────────────────────────► Complex  │
│                                                                  │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────────────┐ │
│  │ Flat    │   │ Feature │   │ Clean   │   │ Domain-Driven   │ │
│  │Structure│   │  Based  │   │ Arch    │   │ Design (DDD)    │ │
│  └─────────┘   └─────────┘   └─────────┘   └─────────────────┘ │
│                                                                  │
│  Small apps    Medium apps   Large apps   Enterprise/Complex    │
│  MVPs          Most teams    Testability  Microservices-like    │
│  Prototypes    Recommended   important    Multiple domains      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>1. Feature-Based Architecture (Recommended)</h4>
            <pre><code>// Best for: Most production apps, growing teams

src/
├── features/                    # Feature modules
│   ├── auth/                    # Authentication feature
│   │   ├── components/          # Feature-specific components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── hooks/               # Feature-specific hooks
│   │   │   └── useAuth.ts
│   │   ├── screens/             # Feature screens
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── services/            # API calls
│   │   │   └── authApi.ts
│   │   ├── store/               # State management
│   │   │   └── authSlice.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── auth.types.ts
│   │   ├── utils/               # Feature utilities
│   │   │   └── validation.ts
│   │   └── index.ts             # Public API (barrel export)
│   │
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── screens/
│   │   └── index.ts
│   │
│   └── checkout/
│       └── ...
│
├── shared/                      # Cross-feature code
│   ├── components/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── hooks/                   # Shared hooks
│   │   ├── useDebounce.ts
│   │   └── useNetworkStatus.ts
│   ├── services/                # Shared services
│   │   ├── api.ts               # API client
│   │   └── analytics.ts
│   ├── utils/                   # Utilities
│   │   └── formatters.ts
│   └── constants/
│       └── config.ts
│
├── navigation/                  # App navigation
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── MainNavigator.tsx
│
└── App.tsx

// KEY RULES:
// ✅ Features can import from shared/
// ✅ Features can import public API from other features (via index.ts)
// ❌ Features CANNOT import internal files from other features
// ❌ Shared CANNOT import from features</code></pre>

            <h4>2. Clean Architecture</h4>
            <pre><code>// Best for: Complex apps, high testability requirements, large teams

// Core principle: Dependencies point INWARD
// Outer layers depend on inner layers, never the reverse

┌─────────────────────────────────────────────────────────────────┐
│                    CLEAN ARCHITECTURE LAYERS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌───────────────────────────────────────────────────────┐    │
│   │              PRESENTATION (UI Layer)                   │    │
│   │   Screens, Components, ViewModels                      │    │
│   │   ┌───────────────────────────────────────────────┐   │    │
│   │   │              APPLICATION (Use Cases)           │   │    │
│   │   │   Business logic, orchestration               │   │    │
│   │   │   ┌───────────────────────────────────────┐   │   │    │
│   │   │   │            DOMAIN (Entities)           │   │   │    │
│   │   │   │   Core business objects, interfaces   │   │   │    │
│   │   │   │   NO FRAMEWORK DEPENDENCIES           │   │   │    │
│   │   │   └───────────────────────────────────────┘   │   │    │
│   │   └───────────────────────────────────────────────┘   │    │
│   └───────────────────────────────────────────────────────┘    │
│                                                                  │
│   ┌───────────────────────────────────────────────────────┐    │
│   │              INFRASTRUCTURE (External)                 │    │
│   │   API clients, databases, native modules              │    │
│   └───────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

src/
├── domain/                      # Pure business logic (framework-agnostic)
│   ├── entities/
│   │   ├── User.ts              # Business objects
│   │   └── Product.ts
│   ├── repositories/            # Interfaces (abstractions)
│   │   ├── IUserRepository.ts
│   │   └── IProductRepository.ts
│   └── usecases/                # Business operations
│       ├── LoginUser.ts
│       └── GetProducts.ts
│
├── data/                        # Data layer (implements domain interfaces)
│   ├── repositories/            # Concrete implementations
│   │   ├── UserRepository.ts
│   │   └── ProductRepository.ts
│   └── datasources/             # API, database, etc.
│       ├── ApiDataSource.ts
│       └── LocalDataSource.ts
│
├── presentation/                # UI layer
│   ├── screens/
│   ├── components/
│   └── viewmodels/              # or hooks/
│
└── infrastructure/              # Framework-specific code
    ├── di/                      # Dependency injection
    │   └── container.ts
    └── navigation/</code></pre>

            <h4>Clean Architecture Code Example</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// DOMAIN LAYER - Pure TypeScript, no React dependencies
// ═══════════════════════════════════════════════════

// domain/entities/User.ts
export interface User {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
}

// domain/repositories/IUserRepository.ts
export interface IUserRepository {
    getUser(id: string): Promise<User>;
    updateUser(user: User): Promise<void>;
}

// domain/usecases/GetUserProfile.ts
export class GetUserProfile {
    constructor(private userRepo: IUserRepository) {}

    async execute(userId: string): Promise<User> {
        const user = await this.userRepo.getUser(userId);
        if (!user) throw new Error('User not found');
        return user;
    }
}

// ═══════════════════════════════════════════════════
// DATA LAYER - Implements domain interfaces
// ═══════════════════════════════════════════════════

// data/repositories/UserRepository.ts
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { ApiClient } from '../datasources/ApiClient';

export class UserRepository implements IUserRepository {
    constructor(private api: ApiClient) {}

    async getUser(id: string): Promise<User> {
        const dto = await this.api.get(\`/users/\${id}\`);
        return this.mapToEntity(dto);
    }

    private mapToEntity(dto: any): User {
        return {
            id: dto.id,
            email: dto.email,
            name: \`\${dto.first_name} \${dto.last_name}\`,
            isPremium: dto.subscription === 'premium',
        };
    }
}

// ═══════════════════════════════════════════════════
// PRESENTATION LAYER - React components
// ═══════════════════════════════════════════════════

// presentation/hooks/useUserProfile.ts
export function useUserProfile(userId: string) {
    const getUserProfile = useInjection(GetUserProfile);
    const [state, setState] = useState<{ user?: User; loading: boolean; error?: Error }>();

    useEffect(() => {
        setState({ loading: true });
        getUserProfile.execute(userId)
            .then(user => setState({ user, loading: false }))
            .catch(error => setState({ error, loading: false }));
    }, [userId]);

    return state;
}

// presentation/screens/ProfileScreen.tsx
function ProfileScreen({ userId }) {
    const { user, loading, error } = useUserProfile(userId);

    if (loading) return &lt;LoadingSpinner /&gt;;
    if (error) return &lt;ErrorMessage error={error} /&gt;;

    return &lt;ProfileCard user={user} /&gt;;
}</code></pre>

            <h4>3. Redux + Container/Presentational Pattern</h4>
            <pre><code>// Best for: Apps heavily using Redux, clear separation of concerns

// CONTAINER: Connects to Redux, handles logic
// containers/UserListContainer.tsx
function UserListContainer() {
    const users = useSelector(selectUsers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const handleRefresh = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = useCallback((id: string) => {
        dispatch(deleteUser(id));
    }, [dispatch]);

    // Container handles all logic, passes pure props
    return (
        &lt;UserList
            users={users}
            isLoading={isLoading}
            error={error}
            onRefresh={handleRefresh}
            onDelete={handleDelete}
        /&gt;
    );
}

// PRESENTATIONAL: Pure UI, receives everything via props
// components/UserList.tsx
interface UserListProps {
    users: User[];
    isLoading: boolean;
    error?: Error;
    onRefresh: () => void;
    onDelete: (id: string) => void;
}

const UserList = memo(({ users, isLoading, error, onRefresh, onDelete }: UserListProps) => {
    if (isLoading) return &lt;LoadingSpinner /&gt;;
    if (error) return &lt;ErrorMessage message={error.message} /&gt;;

    return (
        &lt;FlatList
            data={users}
            renderItem={({ item }) => (
                &lt;UserCard user={item} onDelete={() => onDelete(item.id)} /&gt;
            )}
            refreshing={isLoading}
            onRefresh={onRefresh}
        /&gt;
    );
});

// Benefits:
// ✅ Presentational components are highly reusable
// ✅ Easy to test UI in isolation
// ✅ Clear separation of state and presentation
// ❌ Can lead to prop drilling
// ❌ More files/boilerplate</code></pre>

            <h4>Architecture Comparison Table</h4>
            <table>
                <tr><td><strong>Pattern</strong></td><td><strong>Best For</strong></td><td><strong>Pros</strong></td><td><strong>Cons</strong></td></tr>
                <tr><td>Feature-Based</td><td>Most apps, teams 3-15</td><td>Scalable, easy to navigate</td><td>Feature boundaries can blur</td></tr>
                <tr><td>Clean Architecture</td><td>Complex domain, high test needs</td><td>Very testable, decoupled</td><td>More boilerplate, learning curve</td></tr>
                <tr><td>Container/Presentational</td><td>Redux-heavy apps</td><td>Clear separation, reusable UI</td><td>Prop drilling, more files</td></tr>
                <tr><td>Flat Structure</td><td>Small apps, MVPs</td><td>Simple, fast to start</td><td>Doesn't scale</td></tr>
            </table>

            <h4>My Recommended Approach (Hybrid)</h4>
            <pre><code>// For most production apps: Feature-Based + Clean-ish

src/
├── features/
│   └── auth/
│       ├── api/              # Data fetching (Clean: data layer)
│       ├── hooks/            # Business logic (Clean: use cases)
│       ├── components/       # UI components
│       ├── screens/          # Screen components
│       ├── types/            # TypeScript types
│       └── index.ts          # Public API
├── shared/
│   ├── components/           # Design system
│   ├── hooks/                # Shared hooks
│   ├── services/             # API client, analytics
│   └── utils/
└── navigation/

// Key principles:
1. Colocate related code (feature modules)
2. Export only public API via index.ts
3. Business logic in custom hooks (not components)
4. Keep components focused on rendering
5. Use TypeScript for contracts between layers</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Don't just describe patterns—explain <strong>when you'd choose each</strong> and trade-offs</li>
                <li>Mention your <strong>experience</strong> with different architectures and lessons learned</li>
                <li>Discuss how architecture affects <strong>testing strategy</strong></li>
                <li>Talk about <strong>migration</strong>—how to evolve architecture as app grows</li>
            </ul>

            <h4>🚫 Architecture Anti-Patterns</h4>
            <ul>
                <li><strong>Over-engineering:</strong> Using Clean Architecture for a simple CRUD app</li>
                <li><strong>Under-engineering:</strong> Flat structure for a 50-screen app</li>
                <li><strong>Circular dependencies:</strong> Features importing from each other's internals</li>
                <li><strong>God components:</strong> 1000-line components mixing UI and business logic</li>
                <li><strong>Premature abstraction:</strong> Creating abstractions before understanding patterns</li>
            </ul>
        `
    },
    {
        id: 41,
        category: "Architecture",
        icon: "🏛️",
        question: "How do you structure and organize a large-scale React Native codebase?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Large-scale codebases (100+ files, 5+ developers) require thoughtful organization to maintain productivity. Poor structure leads to confusion, merge conflicts, circular dependencies, and slow onboarding. This question tests your experience with real production apps.</p>

            <h4>Complete Production Project Structure</h4>
            <pre><code>my-app/
├── .github/                     # CI/CD workflows
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
├── .husky/                      # Git hooks (lint-staged)
├── __mocks__/                   # Jest mocks
├── android/                     # Native Android project
├── ios/                         # Native iOS project
├── src/
│   ├── app/                     # App entry and setup
│   │   ├── App.tsx              # Root component
│   │   ├── providers/           # Context providers wrapper
│   │   │   ├── index.tsx
│   │   │   ├── QueryProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── navigation/          # Navigation configuration
│   │       ├── RootNavigator.tsx
│   │       ├── AuthNavigator.tsx
│   │       ├── MainNavigator.tsx
│   │       ├── linking.ts       # Deep linking config
│   │       └── types.ts         # Navigation types
│   │
│   ├── features/                # Feature modules (CORE)
│   │   ├── auth/
│   │   │   ├── api/             # Feature API calls
│   │   │   │   ├── authApi.ts
│   │   │   │   └── authApi.test.ts
│   │   │   ├── components/      # Feature-specific components
│   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── BiometricPrompt.tsx
│   │   │   ├── hooks/           # Feature hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useAuth.test.ts
│   │   │   ├── screens/         # Feature screens
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── SignupScreen.tsx
│   │   │   │   └── ForgotPasswordScreen.tsx
│   │   │   ├── store/           # Feature state (Redux slice or Zustand)
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── authSelectors.ts
│   │   │   ├── types/           # Feature TypeScript types
│   │   │   │   └── auth.types.ts
│   │   │   ├── utils/           # Feature utilities
│   │   │   │   └── validation.ts
│   │   │   └── index.ts         # Public API exports
│   │   │
│   │   ├── products/
│   │   │   └── ... (same structure)
│   │   │
│   │   ├── checkout/
│   │   │   └── ...
│   │   │
│   │   └── profile/
│   │       └── ...
│   │
│   ├── shared/                  # Cross-feature shared code
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── index.ts         # Barrel export
│   │   │
│   │   ├── hooks/               # Shared hooks
│   │   │   ├── useDebounce.ts
│   │   │   ├── useNetworkStatus.ts
│   │   │   └── useKeyboard.ts
│   │   │
│   │   ├── services/            # External services
│   │   │   ├── api/
│   │   │   │   ├── client.ts    # Axios/fetch instance
│   │   │   │   └── interceptors.ts
│   │   │   ├── analytics.ts
│   │   │   ├── crashReporting.ts
│   │   │   └── storage.ts       # AsyncStorage wrapper
│   │   │
│   │   ├── utils/               # Pure utility functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   │
│   │   └── constants/
│   │       ├── config.ts
│   │       └── routes.ts
│   │
│   ├── design-system/           # Design tokens & primitives
│   │   ├── tokens/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   └── spacing.ts
│   │   ├── primitives/
│   │   │   ├── Box.tsx
│   │   │   └── Text.tsx
│   │   └── theme.ts
│   │
│   ├── assets/                  # Static assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── animations/          # Lottie files
│   │
│   └── types/                   # Global TypeScript types
│       ├── global.d.ts
│       ├── env.d.ts
│       └── navigation.d.ts
│
├── e2e/                         # E2E tests (Detox/Maestro)
│   ├── auth.test.ts
│   └── checkout.test.ts
│
├── scripts/                     # Build scripts
│   └── generate-icons.sh
│
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── app.json                     # Expo config
├── babel.config.js
├── jest.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md</code></pre>

            <h4>Feature Module Pattern (Barrel Exports)</h4>
            <pre><code>// features/auth/index.ts - PUBLIC API ONLY
// This is the only file other features can import from

// Screens (for navigation)
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';

// Hooks (for cross-feature usage)
export { useAuth } from './hooks/useAuth';

// Types (for type sharing)
export type { User, AuthState, LoginCredentials } from './types/auth.types';

// Store (for root store setup)
export { authReducer } from './store/authSlice';
export { selectUser, selectIsAuthenticated } from './store/authSelectors';

// ❌ DO NOT export internal components
// export { LoginForm } from './components/LoginForm'; // WRONG!

// ═══════════════════════════════════════════════════
// USAGE FROM OTHER FEATURES:
// ═══════════════════════════════════════════════════

// ✅ CORRECT - import from barrel export
import { useAuth, User } from '@/features/auth';

// ❌ WRONG - importing internal implementation
import { LoginForm } from '@/features/auth/components/LoginForm'; // NO!
import { validateEmail } from '@/features/auth/utils/validation'; // NO!</code></pre>

            <h4>Path Aliases Configuration</h4>
            <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"],
      "@assets/*": ["src/assets/*"],
      "@design-system": ["src/design-system"]
    }
  }
}

// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@features': './src/features',
          '@shared': './src/shared',
          '@assets': './src/assets',
          '@design-system': './src/design-system',
        },
      },
    ],
  ],
};

// Now you can import:
import { Button } from '@shared/components';
import { useAuth } from '@features/auth';
import { colors } from '@design-system/tokens';</code></pre>

            <h4>Naming Conventions</h4>
            <pre><code>// ═══════════════════════════════════════════════════
// FILE NAMING
// ═══════════════════════════════════════════════════

// Components: PascalCase
UserProfile.tsx
UserProfile.styles.ts
UserProfile.test.tsx
UserProfile.stories.tsx      // Storybook

// Hooks: camelCase with 'use' prefix
useAuth.ts
useUserProfile.ts
useDebounce.ts

// Services/Utils: camelCase
api.ts
analytics.ts
formatters.ts
validators.ts

// Types: camelCase with .types suffix
auth.types.ts
navigation.types.ts

// Constants: camelCase or SCREAMING_SNAKE_CASE
config.ts
routes.ts
API_ENDPOINTS.ts

// ═══════════════════════════════════════════════════
// COMPONENT NAMING PATTERNS
// ═══════════════════════════════════════════════════

// Screens: end with "Screen"
LoginScreen.tsx
ProductDetailScreen.tsx

// Container/Smart components: end with "Container" (optional)
UserListContainer.tsx

// List items: end with "Item" or "Card"
ProductItem.tsx
UserCard.tsx

// Forms: end with "Form"
LoginForm.tsx
CheckoutForm.tsx

// Modals: end with "Modal"
ConfirmationModal.tsx
FilterModal.tsx</code></pre>

            <h4>Dependency Rules (Import Boundaries)</h4>
            <pre><code>// Visual representation of allowed imports
┌─────────────────────────────────────────────────────────────────┐
│                         IMPORT RULES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   features/auth ──────────→ shared/          ✅ ALLOWED         │
│                                                                  │
│   features/auth ──────────→ features/products/index.ts           │
│                              (public API only) ✅ ALLOWED        │
│                                                                  │
│   features/auth ──────────→ features/products/components/        │
│                              (internal files)  ❌ FORBIDDEN      │
│                                                                  │
│   shared/ ────────────────→ features/*       ❌ FORBIDDEN        │
│                                                                  │
│   design-system ──────────→ nothing          ✅ STANDALONE       │
│                                                                  │
│   app/navigation ─────────→ features/*/screens ✅ ALLOWED        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

// Enforcing with ESLint (eslint-plugin-import)
// .eslintrc.js
module.exports = {
  rules: {
    'import/no-restricted-paths': ['error', {
      zones: [
        // shared cannot import from features
        {
          target: './src/shared',
          from: './src/features',
          message: 'Shared modules cannot import from features',
        },
        // features cannot import other features' internals
        {
          target: './src/features/auth',
          from: './src/features/!(auth)/*/**',
          message: 'Import from feature index.ts only',
        },
      ],
    }],
  },
};</code></pre>

            <h4>Scaling Guidelines</h4>
            <pre><code>// When to split a feature:
// ─────────────────────────────────────────────────────
// ✓ Feature folder has 20+ files
// ✓ Multiple developers working on same feature
// ✓ Clear sub-domain boundaries emerge
// ✓ Screens could logically be separate apps

// Example: Splitting a "shopping" feature
// BEFORE:
features/
└── shopping/
    ├── screens/
    │   ├── ProductListScreen.tsx
    │   ├── ProductDetailScreen.tsx
    │   ├── CartScreen.tsx
    │   ├── CheckoutScreen.tsx
    │   └── OrderConfirmationScreen.tsx
    └── ... (30+ files)

// AFTER:
features/
├── catalog/              # Product browsing
│   ├── screens/
│   │   ├── ProductListScreen.tsx
│   │   └── ProductDetailScreen.tsx
│   └── ...
├── cart/                 # Shopping cart
│   ├── screens/
│   │   └── CartScreen.tsx
│   └── ...
└── checkout/             # Purchase flow
    ├── screens/
    │   ├── CheckoutScreen.tsx
    │   └── OrderConfirmationScreen.tsx
    └── ...</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain <strong>why</strong> you organize this way, not just what the structure is</li>
                <li>Discuss <strong>barrel exports</strong> (index.ts) and how they enforce boundaries</li>
                <li>Mention <strong>tooling</strong>: ESLint import rules, path aliases, TypeScript</li>
                <li>Talk about <strong>when to refactor</strong>: signs a feature needs splitting</li>
                <li>Address <strong>team dynamics</strong>: how structure affects parallel work</li>
            </ul>

            <h4>🚫 Common Mistakes</h4>
            <ul>
                <li><strong>Too many shared components:</strong> If it's only used in one feature, keep it there</li>
                <li><strong>Deep nesting:</strong> Avoid more than 3-4 levels of directories</li>
                <li><strong>Inconsistent naming:</strong> Establish conventions early and enforce with linting</li>
                <li><strong>No barrel exports:</strong> Without index.ts, imports become messy and uncontrolled</li>
                <li><strong>Circular dependencies:</strong> Feature A imports from Feature B which imports from Feature A</li>
            </ul>
        `
    },

    // ==================== ADVANCED CONCEPTS ====================
    {
        id: 42,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "Explain Error Boundaries in React Native. How do you implement global error handling?",
        difficulty: "intermediate",
        seniority: "mid",
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
        seniority: "mid",
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
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Metro is the heart of React Native development - every line of JavaScript you write passes through it. Understanding Metro helps you debug build issues, optimize bundle size, configure monorepos, and understand why hot reloading sometimes breaks.</p>

            <h4>What is Metro?</h4>
            <p>Metro is the JavaScript bundler specifically built for React Native by Meta. Unlike webpack (used in web), Metro is optimized for mobile development with features like fast incremental builds and instant Hot Module Replacement (HMR).</p>

            <h4>Metro Pipeline Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     METRO BUNDLING PIPELINE                      │
└─────────────────────────────────────────────────────────────────┘

         index.js (entry point)
              │
              ▼
┌─────────────────────────┐
│    1. RESOLUTION        │  ← Finds all required modules
│    ─────────────────    │
│  • Parse import/require │
│  • Resolve file paths   │
│  • Build dependency     │
│    graph                │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│    2. TRANSFORMATION    │  ← Converts code (Babel, TS, etc.)
│    ─────────────────    │
│  • Babel transpilation  │
│  • TypeScript → JS      │
│  • JSX → React.create   │
│  • Flow type stripping  │
│  • Minification (prod)  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│    3. SERIALIZATION     │  ← Combines into final bundle
│    ─────────────────    │
│  • Combine all modules  │
│  • Generate source maps │
│  • Create bundle file   │
│  • Asset handling       │
└───────────┬─────────────┘
            │
            ▼
       bundle.js + assets</code></pre>

            <h4>Resolution Phase Deep Dive</h4>
            <pre><code>// When Metro sees this import:
import { Button } from './components/Button';

// Resolution steps:
1. Check ./components/Button.tsx  ← matches sourceExts
2. Check ./components/Button.ts
3. Check ./components/Button.jsx
4. Check ./components/Button.js
5. Check ./components/Button/index.tsx
6. Check ./components/Button/index.js

// For node_modules:
import React from 'react';

// Metro looks in:
1. ./node_modules/react
2. ../node_modules/react
3. ../../node_modules/react  ← walks up directory tree

// The dependency graph might look like:
index.js
├── App.js
│   ├── ./screens/HomeScreen.js
│   │   └── ./components/Button.js
│   └── ./screens/ProfileScreen.js
├── react
│   └── react/index.js
└── react-native
    └── react-native/index.js</code></pre>

            <h4>Complete metro.config.js Configuration</h4>
            <pre><code>const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  // ═══════════════════════════════════════════════════
  // RESOLVER: How Metro finds and resolves modules
  // ═══════════════════════════════════════════════════
  resolver: {
    // File extensions to consider as source code
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs'],

    // File extensions for assets (images, fonts, etc.)
    assetExts: [...defaultConfig.resolver.assetExts, 'db', 'mp3', 'ttf', 'otf'],

    // Folders to exclude from bundling (regex)
    blockList: [
      /node_modules\\/.*\\/node_modules\\/react-native\\/.*/,
      /\\.git\\/.*/,
    ],

    // For monorepos: extra folders to look for modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'), // monorepo root
    ],

    // Resolve platform-specific files
    // Button.ios.js vs Button.android.js
    platforms: ['ios', 'android', 'native', 'web'],

    // Custom module resolution
    resolveRequest: (context, moduleName, platform) => {
      // Custom resolution logic here
      return context.resolveRequest(context, moduleName, platform);
    },
  },

  // ═══════════════════════════════════════════════════
  // TRANSFORMER: How Metro transforms/compiles code
  // ═══════════════════════════════════════════════════
  transformer: {
    // Custom transformer for specific file types
    babelTransformerPath: require.resolve('react-native-svg-transformer'),

    // Babel configuration
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Improves startup time
      },
    }),

    // Minifier options for production
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },

  // ═══════════════════════════════════════════════════
  // WATCHER: File watching configuration (Watchman)
  // ═══════════════════════════════════════════════════
  watchFolders: [
    path.resolve(__dirname, '../shared'), // Shared packages in monorepo
    path.resolve(__dirname, '../../packages'), // Other packages
  ],

  // ═══════════════════════════════════════════════════
  // SERVER: Development server options
  // ═══════════════════════════════════════════════════
  server: {
    port: 8081, // Default Metro port
    enhanceMiddleware: (middleware) => {
      // Add custom middleware
      return middleware;
    },
  },

  // ═══════════════════════════════════════════════════
  // SERIALIZER: How the final bundle is created
  // ═══════════════════════════════════════════════════
  serializer: {
    // Modules to include regardless of imports
    getModulesRunBeforeMainModule: () => [
      require.resolve('./polyfills.js'),
    ],

    // Custom serializer for bundle output
    createModuleIdFactory: () => {
      // Custom module ID generation
      return (path) => path;
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);</code></pre>

            <h4>SVG Handling Example</h4>
            <pre><code>// To use SVGs as React components, you need a custom transformer

// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

// Now you can:
import Logo from './assets/logo.svg';

function Header() {
  return &lt;Logo width={100} height={100} /&gt;;
}</code></pre>

            <h4>Common Metro Commands</h4>
            <pre><code># Start development server
npx react-native start

# Start with clean cache (fixes most weird issues!)
npx react-native start --reset-cache

# Create production bundle for iOS
npx react-native bundle \\
  --entry-file index.js \\
  --platform ios \\
  --dev false \\
  --bundle-output ios/main.jsbundle \\
  --assets-dest ios

# Create production bundle for Android
npx react-native bundle \\
  --entry-file index.js \\
  --platform android \\
  --dev false \\
  --bundle-output android/app/src/main/assets/index.android.bundle \\
  --assets-dest android/app/src/main/res

# Generate RAM bundle (for better startup performance)
npx react-native ram-bundle \\
  --entry-file index.js \\
  --platform android \\
  --dev false \\
  --bundle-output android/app/src/main/assets/index.android.bundle</code></pre>

            <h4>Hot Module Replacement (HMR)</h4>
            <pre><code>// Metro enables Fast Refresh (HMR) automatically in dev

// How it works:
┌─────────────────────────────────────────────────────────┐
│  1. You edit Button.js                                   │
│  2. Metro detects change via Watchman                    │
│  3. Only Button.js is re-transformed (not entire app)   │
│  4. HMR runtime patches the module in-place             │
│  5. React re-renders affected components                 │
│  6. State is preserved! 🎉                               │
└─────────────────────────────────────────────────────────┘

// HMR breaks when:
// ❌ Module has side effects at top level
// ❌ Export is not a component (plain functions)
// ❌ Anonymous default exports
// ❌ Class components (sometimes)

// Best practices for HMR:
// ✅ Named exports
// ✅ Function components with hooks
// ✅ Keep side effects in useEffect</code></pre>

            <h4>Monorepo Configuration</h4>
            <pre><code>// For monorepos (Yarn workspaces, npm workspaces, etc.)

// Project structure:
monorepo/
├── packages/
│   ├── shared/           # Shared code
│   │   └── package.json
│   └── mobile/           # React Native app
│       ├── metro.config.js
│       └── package.json
└── package.json

// metro.config.js in packages/mobile/
const path = require('path');

module.exports = {
  // Tell Metro to watch the shared package
  watchFolders: [
    path.resolve(__dirname, '../../packages/shared'),
    path.resolve(__dirname, '../../node_modules'),
  ],

  resolver: {
    // Help Metro find hoisted modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],

    // Prevent duplicate React
    extraNodeModules: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
};</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Explain the <strong>three phases</strong>: Resolution → Transformation → Serialization</li>
                <li>Know when to use <strong>--reset-cache</strong> (stale code, weird errors, after config changes)</li>
                <li>Understand <strong>inlineRequires</strong> and how it improves startup time</li>
                <li>Be ready to discuss <strong>monorepo setup</strong> with watchFolders and nodeModulesPaths</li>
            </ul>

            <h4>🚫 Common Issues & Fixes</h4>
            <ul>
                <li><strong>Error: "Unable to resolve module"</strong> - Check sourceExts, clear cache, check paths</li>
                <li><strong>Duplicate module "react"</strong> - Use extraNodeModules in monorepos</li>
                <li><strong>Slow bundling</strong> - Add large folders to blockList</li>
                <li><strong>HMR not working</strong> - Avoid side effects, use named exports</li>
                <li><strong>Old code showing</strong> - Always try --reset-cache first</li>
            </ul>
        `
    },
    {
        id: 45,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you handle app state management (foreground, background, inactive)?",
        difficulty: "intermediate",
        seniority: "mid",
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
        seniority: "junior",
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
        seniority: "mid",
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
        seniority: "junior",
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
        seniority: "mid",
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
        seniority: "mid",
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
    },

    // ==================== ADDITIONAL CORE REACT NATIVE ====================
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

    // ==================== ADDITIONAL NAVIGATION ====================
    {
        id: 56,
        category: "Navigation",
        icon: "🧭",
        question: "How do you handle nested navigators and what are the common patterns?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Nested Navigator Structure</h4>
            <pre><code>function App() {
    return (
        &lt;NavigationContainer&gt;
            &lt;RootStack.Navigator&gt;
                {/* Tab Navigator nested in Stack */}
                &lt;RootStack.Screen
                    name="Main"
                    component={MainTabs}
                    options={{ headerShown: false }}
                /&gt;
                {/* Full-screen modals */}
                &lt;RootStack.Screen
                    name="Modal"
                    component={ModalScreen}
                    options={{ presentation: 'modal' }}
                /&gt;
            &lt;/RootStack.Navigator&gt;
        &lt;/NavigationContainer&gt;
    );
}

function MainTabs() {
    return (
        &lt;Tab.Navigator&gt;
            &lt;Tab.Screen name="Home" component={HomeStack} /&gt;
            &lt;Tab.Screen name="Profile" component={ProfileStack} /&gt;
        &lt;/Tab.Navigator&gt;
    );
}

function HomeStack() {
    return (
        &lt;Stack.Navigator&gt;
            &lt;Stack.Screen name="HomeScreen" component={HomeScreen} /&gt;
            &lt;Stack.Screen name="Details" component={DetailsScreen} /&gt;
        &lt;/Stack.Navigator&gt;
    );
}</code></pre>

            <h4>Navigating Across Nested Navigators</h4>
            <pre><code>// Navigate to screen in different stack
navigation.navigate('Profile', {
    screen: 'Settings',
    params: { userId: 123 },
});

// Navigate to deeply nested screen
navigation.navigate('Main', {
    screen: 'Home',
    params: {
        screen: 'Details',
        params: { itemId: 456 },
    },
});

// Reset navigation state
navigation.reset({
    index: 0,
    routes: [{ name: 'Main' }],
});</code></pre>

            <h4>Common Patterns</h4>
            <ul>
                <li><strong>Auth Flow:</strong> Stack with conditional screens based on auth state</li>
                <li><strong>Tab + Stack:</strong> Each tab has its own stack navigator</li>
                <li><strong>Drawer + Tabs:</strong> Drawer containing tab navigator</li>
                <li><strong>Modal Stack:</strong> Root stack with modal screens for overlays</li>
            </ul>

            <h4>Best Practices</h4>
            <ul>
                <li>Keep nesting to 2-3 levels max</li>
                <li>Use <code>headerShown: false</code> when child handles header</li>
                <li>Define types for all param lists</li>
                <li>Use <code>getParent()</code> to access parent navigator</li>
            </ul>
        `
    },
    {
        id: 57,
        category: "Navigation",
        icon: "🧭",
        question: "How do you implement custom transitions and animations in React Navigation?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Built-in Animation Options</h4>
            <pre><code>&lt;Stack.Navigator
    screenOptions={{
        animation: 'slide_from_right', // iOS-like
        // Other options:
        // 'slide_from_bottom', 'fade', 'none',
        // 'flip', 'simple_push', 'slide_from_left'
    }}
&gt;</code></pre>

            <h4>Custom Transition Config</h4>
            <pre><code>import { TransitionPresets } from '@react-navigation/stack';

const customTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: {
            animation: 'spring',
            config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            },
        },
        close: {
            animation: 'timing',
            config: {
                duration: 200,
                easing: Easing.linear,
            },
        },
    },
    cardStyleInterpolator: ({ current, layouts }) => ({
        cardStyle: {
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                    }),
                },
                {
                    scale: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                    }),
                },
            ],
            opacity: current.progress,
        },
    }),
};</code></pre>

            <h4>Shared Element Transitions</h4>
            <pre><code>// Using react-native-shared-element
import { SharedElement } from 'react-navigation-shared-element';

// Source screen
&lt;SharedElement id={\`item.\${item.id}.photo\`}&gt;
    &lt;Image source={item.image} style={styles.image} /&gt;
&lt;/SharedElement&gt;

// Detail screen
&lt;SharedElement id={\`item.\${item.id}.photo\`}&gt;
    &lt;Image source={item.image} style={styles.largeImage} /&gt;
&lt;/SharedElement&gt;

// Navigator config
&lt;Stack.Navigator
    screenOptions={{
        ...TransitionPresets.DefaultTransition,
    }}
&gt;
    &lt;Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route) => {
            const { item } = route.params;
            return [\`item.\${item.id}.photo\`];
        }}
    /&gt;
&lt;/Stack.Navigator&gt;</code></pre>

            <h4>Per-Screen Transitions</h4>
            <pre><code>&lt;Stack.Screen
    name="Modal"
    component={ModalScreen}
    options={{
        presentation: 'transparentModal',
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
                opacity: progress,
            },
            overlayStyle: {
                opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        }),
    }}
/&gt;</code></pre>
        `
    },

    // ==================== ADDITIONAL STATE MANAGEMENT ====================
    {
        id: 58,
        category: "State Management",
        icon: "🗃️",
        question: "How do you implement optimistic updates and handle rollbacks in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>What is Optimistic Update?</h4>
            <p>Updating the UI immediately before the server confirms the change, then rolling back if the request fails.</p>

            <h4>With TanStack Query</h4>
            <pre><code>const queryClient = useQueryClient();

const updateTodoMutation = useMutation({
    mutationFn: updateTodo,

    // When mutation starts
    onMutate: async (newTodo) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['todos'] });

        // Snapshot previous value
        const previousTodos = queryClient.getQueryData(['todos']);

        // Optimistically update
        queryClient.setQueryData(['todos'], (old) =>
            old.map(todo =>
                todo.id === newTodo.id ? newTodo : todo
            )
        );

        // Return context for rollback
        return { previousTodos };
    },

    // On error, roll back
    onError: (err, newTodo, context) => {
        queryClient.setQueryData(['todos'], context.previousTodos);
        Toast.show({ type: 'error', text1: 'Update failed' });
    },

    // Always refetch after error or success
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
});</code></pre>

            <h4>With Redux Toolkit</h4>
            <pre><code>// Slice with optimistic update
const todosSlice = createSlice({
    name: 'todos',
    initialState: { items: [], pendingUpdates: {} },
    reducers: {
        optimisticUpdate: (state, action) => {
            const { id, changes } = action.payload;
            // Store original for rollback
            const original = state.items.find(t => t.id === id);
            state.pendingUpdates[id] = original;
            // Apply optimistic change
            const index = state.items.findIndex(t => t.id === id);
            state.items[index] = { ...original, ...changes };
        },
        confirmUpdate: (state, action) => {
            delete state.pendingUpdates[action.payload.id];
        },
        rollbackUpdate: (state, action) => {
            const { id } = action.payload;
            const original = state.pendingUpdates[id];
            if (original) {
                const index = state.items.findIndex(t => t.id === id);
                state.items[index] = original;
                delete state.pendingUpdates[id];
            }
        },
    },
});

// Thunk with rollback
export const updateTodoAsync = (id, changes) => async (dispatch) => {
    dispatch(optimisticUpdate({ id, changes }));
    try {
        await api.updateTodo(id, changes);
        dispatch(confirmUpdate({ id }));
    } catch (error) {
        dispatch(rollbackUpdate({ id }));
        throw error;
    }
};</code></pre>

            <h4>Best Practices</h4>
            <ul>
                <li>Always store original data for rollback</li>
                <li>Show loading indicator for critical actions</li>
                <li>Provide user feedback on failure</li>
                <li>Consider retry logic for transient failures</li>
            </ul>
        `
    },
    {
        id: 59,
        category: "State Management",
        icon: "🗃️",
        question: "Explain the concept of Atomic State Management (Jotai/Recoil). How does it differ from Redux?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>What is Atomic State?</h4>
            <p>State is split into independent atoms. Components subscribe only to atoms they use, enabling fine-grained re-renders.</p>

            <h4>Jotai Example</h4>
            <pre><code>import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// Define atoms
const userAtom = atom(null);
const todosAtom = atom([]);

// Derived atom (computed value)
const completedTodosAtom = atom(
    (get) => get(todosAtom).filter(t => t.completed)
);

// Async atom
const userDataAtom = atom(async (get) => {
    const user = get(userAtom);
    if (!user) return null;
    const response = await fetch(\`/api/users/\${user.id}\`);
    return response.json();
});

// Write-only atom (action)
const addTodoAtom = atom(
    null, // read value (not used)
    (get, set, newTodo) => {
        const todos = get(todosAtom);
        set(todosAtom, [...todos, newTodo]);
    }
);

// Usage in components
function TodoList() {
    const todos = useAtomValue(todosAtom);
    const addTodo = useSetAtom(addTodoAtom);

    return (
        &lt;View&gt;
            {todos.map(todo => &lt;TodoItem key={todo.id} todo={todo} /&gt;)}
            &lt;Button onPress={() => addTodo({ id: Date.now(), text: 'New' })} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Comparison: Redux vs Atomic</h4>
            <table>
                <tr><td><strong>Redux</strong></td><td><strong>Jotai/Recoil</strong></td></tr>
                <tr><td>Single store</td><td>Multiple atoms</td></tr>
                <tr><td>Top-down data flow</td><td>Bottom-up composition</td></tr>
                <tr><td>Reducers + actions</td><td>Atoms + derived atoms</td></tr>
                <tr><td>Requires selectors for perf</td><td>Fine-grained by default</td></tr>
                <tr><td>More boilerplate</td><td>Minimal boilerplate</td></tr>
                <tr><td>Great DevTools</td><td>Limited debugging tools</td></tr>
            </table>

            <h4>When to Use Atomic State</h4>
            <ul>
                <li>Many independent pieces of state</li>
                <li>Frequent updates to small state portions</li>
                <li>Need fine-grained re-render control</li>
                <li>Prefer minimal boilerplate</li>
            </ul>

            <h4>Atom with Storage (Persistence)</h4>
            <pre><code>import { atomWithStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    getItem: async (key) => {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    setItem: async (key, value) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key) => {
        await AsyncStorage.removeItem(key);
    },
};

const themeAtom = atomWithStorage('theme', 'light', storage);</code></pre>
        `
    },

    // ==================== ADDITIONAL PERFORMANCE ====================
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

    // ==================== ADDITIONAL TESTING ====================
    {
        id: 63,
        category: "Testing",
        icon: "🧪",
        question: "How do you test async operations and API calls in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Testing Async Components</h4>
            <pre><code>import { render, waitFor, screen } from '@testing-library/react-native';

// Component that fetches data
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);

    if (!user) return &lt;Text&gt;Loading...&lt;/Text&gt;;
    return &lt;Text testID="username"&gt;{user.name}&lt;/Text&gt;;
}

// Test
test('loads and displays user', async () => {
    // Mock the API
    jest.spyOn(api, 'fetchUser').mockResolvedValue({
        id: 1,
        name: 'John Doe'
    });

    render(&lt;UserProfile userId={1} /&gt;);

    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeTruthy();

    // Wait for async update
    await waitFor(() => {
        expect(screen.getByTestId('username')).toHaveTextContent('John Doe');
    });
});</code></pre>

            <h4>Testing with MSW (Mock Service Worker)</h4>
            <pre><code>import { setupServer } from 'msw/native';
import { http, HttpResponse } from 'msw';

const server = setupServer(
    http.get('/api/users/:id', ({ params }) => {
        return HttpResponse.json({
            id: params.id,
            name: 'Test User',
        });
    }),

    http.post('/api/login', async ({ request }) => {
        const body = await request.json();
        if (body.password === 'correct') {
            return HttpResponse.json({ token: 'abc123' });
        }
        return HttpResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('handles login error', async () => {
    render(&lt;LoginScreen /&gt;);

    fireEvent.changeText(screen.getByTestId('email'), 'user@test.com');
    fireEvent.changeText(screen.getByTestId('password'), 'wrong');
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeTruthy();
    });
});</code></pre>

            <h4>Testing Custom Hooks</h4>
            <pre><code>import { renderHook, waitFor } from '@testing-library/react-native';

test('useApi hook fetches data', async () => {
    const mockData = { items: [1, 2, 3] };
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useApi('/api/items'));

    // Initially loading
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
});</code></pre>

            <h4>Testing Error States</h4>
            <pre><code>test('displays error message on API failure', async () => {
    server.use(
        http.get('/api/users', () => {
            return HttpResponse.json(
                { message: 'Server error' },
                { status: 500 }
            );
        })
    );

    render(&lt;UserList /&gt;);

    await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeTruthy();
    });
});</code></pre>
        `
    },
    {
        id: 64,
        category: "Testing",
        icon: "🧪",
        question: "How do you implement snapshot testing in React Native and when is it useful?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is Snapshot Testing?</h4>
            <p>Snapshot tests capture the rendered output of a component and compare it against a stored reference file.</p>

            <h4>Basic Snapshot Test</h4>
            <pre><code>import { render } from '@testing-library/react-native';

test('Button renders correctly', () => {
    const tree = render(
        &lt;Button title="Press me" onPress={() => {}} /&gt;
    );

    expect(tree.toJSON()).toMatchSnapshot();
});

// First run: Creates __snapshots__/Button.test.tsx.snap
// Subsequent runs: Compares against snapshot</code></pre>

            <h4>Inline Snapshots</h4>
            <pre><code>test('renders user card', () => {
    const tree = render(&lt;UserCard name="John" avatar="url" /&gt;);

    expect(tree.toJSON()).toMatchInlineSnapshot(\`
        &lt;View style={[Object]}&gt;
            &lt;Image source={[Object]} /&gt;
            &lt;Text&gt;John&lt;/Text&gt;
        &lt;/View&gt;
    \`);
});</code></pre>

            <h4>Snapshot with Dynamic Data</h4>
            <pre><code>test('renders with date', () => {
    const tree = render(&lt;Post createdAt={new Date('2024-01-01')} /&gt;);

    expect(tree.toJSON()).toMatchSnapshot({
        // Property matchers for dynamic values
        children: expect.arrayContaining([
            expect.objectContaining({
                type: 'Text',
                children: [expect.any(String)], // Date string
            }),
        ]),
    });
});</code></pre>

            <h4>When to Use Snapshots</h4>
            <ul>
                <li><strong>Good for:</strong> UI components, styled components, detecting unintended changes</li>
                <li><strong>Not good for:</strong> Complex logic, frequently changing components</li>
            </ul>

            <h4>Best Practices</h4>
            <pre><code>// 1. Keep snapshots small and focused
test('button label renders', () => {
    const { getByText } = render(&lt;Button title="Submit" /&gt;);
    expect(getByText('Submit')).toBeTruthy();
});

// 2. Use descriptive test names
test('disabled button has reduced opacity', () =&gt; {
    const { getByRole } = render(&lt;Button title="Submit" disabled /&gt;);
    const button = getByRole('button');
    expect(button).toHaveStyle({ opacity: 0.5 });
});

// 3. Review snapshot changes carefully
// Don't just update snapshots blindly!
// npm test -- -u  // Updates all snapshots

// 4. Commit snapshots to version control
// They serve as documentation</code></pre>

            <h4>Snapshot Testing Gotchas</h4>
            <ul>
                <li>Large snapshots are hard to review</li>
                <li>Brittle: Small changes trigger failures</li>
                <li>Can lead to "approval fatigue"</li>
                <li>Don't test implementation details</li>
            </ul>
        `
    },
    {
        id: 65,
        category: "Testing",
        icon: "🧪",
        question: "Explain how to set up and write Detox E2E tests for React Native.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Detox Setup</h4>
            <pre><code>// Install
npm install detox --save-dev
npm install jest-circus --save-dev

// Initialize
npx detox init

// .detoxrc.js
module.exports = {
    testRunner: {
        args: {
            $0: 'jest',
            config: 'e2e/jest.config.js',
        },
        jest: {
            setupTimeout: 120000,
        },
    },
    apps: {
        'ios.debug': {
            type: 'ios.app',
            binaryPath: 'ios/build/MyApp.app',
            build: 'xcodebuild -workspace ios/MyApp.xcworkspace ...',
        },
        'android.debug': {
            type: 'android.apk',
            binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
            build: 'cd android && ./gradlew assembleDebug',
        },
    },
    devices: {
        simulator: {
            type: 'ios.simulator',
            device: { type: 'iPhone 14' },
        },
        emulator: {
            type: 'android.emulator',
            device: { avdName: 'Pixel_4_API_30' },
        },
    },
    configurations: {
        'ios.sim.debug': {
            device: 'simulator',
            app: 'ios.debug',
        },
    },
};</code></pre>

            <h4>Writing E2E Tests</h4>
            <pre><code>// e2e/login.test.js
describe('Login Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should show login screen', async () => {
        await expect(element(by.id('login-screen'))).toBeVisible();
    });

    it('should login with valid credentials', async () => {
        await element(by.id('email-input')).typeText('user@test.com');
        await element(by.id('password-input')).typeText('password123');
        await element(by.id('login-button')).tap();

        // Wait for navigation
        await waitFor(element(by.id('home-screen')))
            .toBeVisible()
            .withTimeout(5000);
    });

    it('should show error for invalid login', async () => {
        await element(by.id('email-input')).typeText('user@test.com');
        await element(by.id('password-input')).typeText('wrong');
        await element(by.id('login-button')).tap();

        await expect(element(by.text('Invalid credentials'))).toBeVisible();
    });
});</code></pre>

            <h4>Advanced Matchers & Actions</h4>
            <pre><code>// Scrolling
await element(by.id('scroll-view')).scroll(200, 'down');
await element(by.id('list')).scrollTo('bottom');

// Swiping
await element(by.id('card')).swipe('left', 'fast');

// Long press
await element(by.id('item')).longPress();

// Text matching
await element(by.text('Submit')).tap();
await element(by.label('Close button')).tap(); // Accessibility

// Multiple elements
await element(by.id('item').atIndex(2)).tap();

// Waiting
await waitFor(element(by.id('loader')))
    .not.toBeVisible()
    .withTimeout(10000);</code></pre>

            <h4>Running Tests</h4>
            <pre><code># Build app for testing
npx detox build --configuration ios.sim.debug

# Run tests
npx detox test --configuration ios.sim.debug

# Run specific test file
npx detox test e2e/login.test.js</code></pre>
        `
    },

    // ==================== STYLING & UI ====================
    {
        id: 66,
        category: "Styling & UI",
        icon: "🎨",
        question: "Compare different styling approaches in React Native: StyleSheet, Styled Components, and NativeWind.",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>1. StyleSheet (Built-in)</h4>
            <pre><code>import { StyleSheet, View, Text } from 'react-native';

function MyComponent() {
    return (
        &lt;View style={styles.container}&gt;
            &lt;Text style={[styles.text, styles.bold]}&gt;Hello&lt;/Text&gt;
        &lt;/View&gt;
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
});

// Pros: No dependencies, best performance, type safety
// Cons: Verbose, no dynamic themes without extra setup</code></pre>

            <h4>2. Styled Components</h4>
            <pre><code>import styled from 'styled-components/native';

const Container = styled.View\`
    flex: 1;
    padding: 16px;
    background-color: \${props => props.theme.background};
\`;

const Title = styled.Text&lt;{ primary?: boolean }&gt;\`
    font-size: 24px;
    color: \${props => props.primary ? '#007AFF' : '#333'};
    font-weight: \${props => props.primary ? 'bold' : 'normal'};
\`;

function MyComponent() {
    return (
        &lt;Container&gt;
            &lt;Title primary&gt;Hello World&lt;/Title&gt;
        &lt;/Container&gt;
    );
}

// Pros: Familiar CSS syntax, theming, dynamic styles
// Cons: Runtime overhead, larger bundle</code></pre>

            <h4>3. NativeWind (Tailwind for RN)</h4>
            <pre><code>import { View, Text } from 'react-native';
import { styled } from 'nativewind';

// Enable styling
const StyledView = styled(View);
const StyledText = styled(Text);

function MyComponent() {
    return (
        &lt;StyledView className="flex-1 p-4 bg-white dark:bg-gray-900"&gt;
            &lt;StyledText className="text-2xl font-bold text-gray-800 dark:text-white"&gt;
                Hello World
            &lt;/StyledText&gt;
        &lt;/StyledView&gt;
    );
}

// Or with v4 (no wrapper needed)
function MyComponent() {
    return (
        &lt;View className="flex-1 p-4 bg-white dark:bg-gray-900"&gt;
            &lt;Text className="text-2xl font-bold"&gt;Hello&lt;/Text&gt;
        &lt;/View&gt;
    );
}

// Pros: Utility-first, consistent design system, dark mode
// Cons: Learning curve, className strings</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><td><strong>Approach</strong></td><td><strong>Performance</strong></td><td><strong>DX</strong></td></tr>
                <tr><td>StyleSheet</td><td>Best</td><td>Verbose</td></tr>
                <tr><td>Styled Components</td><td>Good</td><td>Excellent</td></tr>
                <tr><td>NativeWind</td><td>Very Good</td><td>Great (if familiar with Tailwind)</td></tr>
            </table>
        `
    },
    {
        id: 67,
        category: "Styling & UI",
        icon: "🎨",
        question: "How do you implement dark mode and dynamic theming in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>1. Using React Native's useColorScheme</h4>
            <pre><code>import { useColorScheme, View, Text } from 'react-native';

function App() {
    const colorScheme = useColorScheme(); // 'light' | 'dark'

    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        &lt;View style={{ backgroundColor: theme.background }}&gt;
            &lt;Text style={{ color: theme.text }}&gt;Hello&lt;/Text&gt;
        &lt;/View&gt;
    );
}

const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
};

const darkTheme = {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
};</code></pre>

            <h4>2. Theme Context with Manual Override</h4>
            <pre><code>type ThemeMode = 'light' | 'dark' | 'system';

const ThemeContext = createContext&lt;{
    theme: Theme;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}&gt;(null);

export function ThemeProvider({ children }) {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState&lt;ThemeMode&gt;('system');

    const theme = useMemo(() => {
        const activeScheme = mode === 'system' ? systemScheme : mode;
        return activeScheme === 'dark' ? darkTheme : lightTheme;
    }, [mode, systemScheme]);

    // Persist preference
    useEffect(() => {
        AsyncStorage.setItem('themeMode', mode);
    }, [mode]);

    return (
        &lt;ThemeContext.Provider value={{ theme, mode, setMode }}&gt;
            {children}
        &lt;/ThemeContext.Provider&gt;
    );
}

export const useTheme = () => useContext(ThemeContext);</code></pre>

            <h4>3. With NativeWind</h4>
            <pre><code>// tailwind.config.js
module.exports = {
    darkMode: 'class', // or 'media' for system preference
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#007AFF',
                    dark: '#0A84FF',
                },
            },
        },
    },
};

// Component
&lt;View className="bg-white dark:bg-black"&gt;
    &lt;Text className="text-gray-900 dark:text-white"&gt;
        Themed Text
    &lt;/Text&gt;
&lt;/View&gt;

// Toggle dark mode
import { useColorScheme } from 'nativewind';
const { colorScheme, setColorScheme } = useColorScheme();
setColorScheme('dark'); // 'light' | 'dark' | 'system'</code></pre>

            <h4>4. Navigation Theme Integration</h4>
            <pre><code>import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

function App() {
    const scheme = useColorScheme();

    return (
        &lt;NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}&gt;
            &lt;RootNavigator /&gt;
        &lt;/NavigationContainer&gt;
    );
}</code></pre>
        `
    },
    {
        id: 68,
        category: "Styling & UI",
        icon: "🎨",
        question: "How do you handle responsive design and different screen sizes in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>1. Using Dimensions API</h4>
            <pre><code>import { Dimensions, useWindowDimensions } from 'react-native';

// Static (doesn't update on rotation)
const { width, height } = Dimensions.get('window');

// Hook (updates on dimension change)
function ResponsiveComponent() {
    const { width, height } = useWindowDimensions();

    const isTablet = width >= 768;
    const isLandscape = width > height;

    return (
        &lt;View style={{
            flexDirection: isLandscape ? 'row' : 'column',
            padding: isTablet ? 32 : 16,
        }}&gt;
            {/* content */}
        &lt;/View&gt;
    );
}</code></pre>

            <h4>2. Responsive Scaling</h4>
            <pre><code>import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 375; // iPhone X width

// Scale based on screen width
export const scale = (size: number) =>
    (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale with max limit
export const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

// Usage
const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(24),
        padding: scale(16),
    },
});</code></pre>

            <h4>3. Flexbox Responsive Layouts</h4>
            <pre><code>function ResponsiveGrid({ items }) {
    const { width } = useWindowDimensions();
    const numColumns = width >= 768 ? 3 : width >= 480 ? 2 : 1;
    const itemWidth = (width - 32 - (numColumns - 1) * 16) / numColumns;

    return (
        &lt;FlatList
            data={items}
            numColumns={numColumns}
            key={numColumns} // Force re-render on column change
            renderItem={({ item }) => (
                &lt;View style={{ width: itemWidth, margin: 8 }}&gt;
                    &lt;ItemCard item={item} /&gt;
                &lt;/View&gt;
            )}
        /&gt;
    );
}</code></pre>

            <h4>4. Safe Area Handling</h4>
            <pre><code>import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function Screen() {
    const insets = useSafeAreaInsets();

    return (
        &lt;View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}&gt;
            {/* Content */}
        &lt;/View&gt;
    );
}

// Or use SafeAreaView
&lt;SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}&gt;
    {/* Content */}
&lt;/SafeAreaView&gt;</code></pre>

            <h4>5. Platform-Specific Styling</h4>
            <pre><code>const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
            },
            android: {
                elevation: 4,
            },
        }),
    },
});</code></pre>
        `
    },

    // ==================== SYSTEM DESIGN ====================
    {
        id: 69,
        category: "System Design",
        icon: "🏛️",
        question: "Design the architecture for a large-scale e-commerce app with offline support",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            &lt;h4&gt;Architecture Overview&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │   Screens   │ │  Components │ │  Navigation Stack   ││
│  └──────┬──────┘ └──────┬──────┘ └──────────┬──────────┘│
└─────────┼───────────────┼───────────────────┼───────────┘
          │               │                   │
┌─────────┴───────────────┴───────────────────┴───────────┐
│                     DOMAIN LAYER                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │  Use Cases  │ │   Entities  │ │  Repository Intf    ││
│  └──────┬──────┘ └─────────────┘ └──────────┬──────────┘│
└─────────┼───────────────────────────────────┼───────────┘
          │                                   │
┌─────────┴───────────────────────────────────┴───────────┐
│                      DATA LAYER                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │ Repositories│ │  Data Src   │ │   Sync Engine       ││
│  └──────┬──────┘ └──────┬──────┘ └──────────┬──────────┘│
└─────────┼───────────────┼───────────────────┼───────────┘
          │               │                   │
┌─────────┴───────────────┴───────────────────┴───────────┐
│                  INFRASTRUCTURE LAYER                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │ Database │ │   API    │ │  Cache   │ │  Storage    │ │
│  │(Watermelon)│ │ (Axios)  │ │ (MMKV)   │ │ (FS)       │ │
│  └──────────┘ └──────────┘ └──────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Feature Module Structure&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;src/
├── features/
│   ├── catalog/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   ├── cart/
│   ├── checkout/
│   └── profile/
├── core/
│   ├── database/
│   ├── network/
│   ├── sync/
│   └── storage/
└── shared/
    ├── components/
    ├── hooks/
    └── utils/&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Offline Sync Queue&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// core/sync/SyncQueue.ts
interface SyncOperation {
    id: string;
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    entity: string;
    payload: unknown;
    timestamp: number;
    retryCount: number;
}

class SyncQueue {
    private queue: SyncOperation[] = [];

    async enqueue(operation: Omit&amp;lt;SyncOperation, 'id' | 'timestamp' | 'retryCount'&amp;gt;) {
        const op: SyncOperation = {
            ...operation,
            id: uuid(),
            timestamp: Date.now(),
            retryCount: 0,
        };
        this.queue.push(op);
        await this.persistQueue();
    }

    async processQueue() {
        const pending = [...this.queue];

        for (const operation of pending) {
            try {
                await this.executeOperation(operation);
                this.queue = this.queue.filter(op =&amp;gt; op.id !== operation.id);
            } catch (error) {
                operation.retryCount++;
                if (operation.retryCount &amp;gt;= MAX_RETRIES) {
                    await this.handleFailedOperation(operation);
                }
            }
        }
        await this.persistQueue();
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Repository Pattern&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// features/catalog/services/ProductRepository.ts
class ProductRepository {
    constructor(
        private localDB: Database,
        private api: ProductAPI,
        private syncQueue: SyncQueue
    ) {}

    async getProducts(categoryId: string): Promise&amp;lt;Product[]&amp;gt; {
        // Always read from local first
        const local = await this.localDB.products
            .query(Q.where('category_id', categoryId))
            .fetch();

        // Trigger background sync if online
        if (NetInfo.isConnected) {
            this.syncFromRemote(categoryId);
        }

        return local;
    }

    async addToCart(productId: string, quantity: number) {
        // Update local immediately
        await this.localDB.write(async () =&amp;gt; {
            await this.localDB.get('cart_items').create(item =&amp;gt; {
                item.productId = productId;
                item.quantity = quantity;
                item.syncStatus = 'pending';
            });
        });

        // Queue for sync
        await this.syncQueue.enqueue({
            type: 'CREATE',
            entity: 'cart_item',
            payload: { productId, quantity }
        });
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Optimistic UI:&lt;/strong&gt; Update UI immediately, sync in background&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Conflict Resolution:&lt;/strong&gt; Server timestamp wins for inventory, merge for cart&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Data Freshness:&lt;/strong&gt; Show stale indicators, pull-to-refresh&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Storage Limits:&lt;/strong&gt; Implement LRU cache for product images&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;State Categories&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│                    STATE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐   Global, persisted, rare updates      │
│  │GLOBAL STATE │   Examples: user, settings, theme      │
│  │  (Zustand)  │   Access: useAuthStore(), useSettings()│
│  └─────────────┘                                        │
│         │                                                │
│  ┌──────┴──────┐   Cached API data, auto-refresh        │
│  │SERVER STATE │   Examples: products, orders, posts    │
│  │(TanStack Q) │   Access: useQuery(), useMutation()    │
│  └─────────────┘                                        │
│         │                                                │
│  ┌──────┴──────┐   Screen-specific, ephemeral           │
│  │ LOCAL STATE │   Examples: form inputs, modals        │
│  │ (useState)  │   Access: useState(), useReducer()     │
│  └─────────────┘                                        │
│         │                                                │
│  ┌──────┴──────┐   Complex flows, explicit transitions  │
│  │ UI MACHINES │   Examples: checkout, onboarding       │
│  │  (XState)   │   Access: useMachine()                 │
│  └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Zustand Store Slicing&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// stores/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Auth slice
interface AuthSlice {
    user: User | null;
    token: string | null;
    login: (credentials: Credentials) =&amp;gt; Promise&amp;lt;void&amp;gt;;
    logout: () =&amp;gt; void;
}

// Cart slice
interface CartSlice {
    items: CartItem[];
    addItem: (product: Product) =&amp;gt; void;
    removeItem: (id: string) =&amp;gt; void;
    total: number;
}

// Combined store with slices
type AppStore = AuthSlice &amp;amp; CartSlice;

export const useStore = create&amp;lt;AppStore&amp;gt;()(
    persist(
        immer((set, get) =&amp;gt; ({
            // Auth slice
            user: null,
            token: null,
            login: async (credentials) =&amp;gt; {
                const response = await authAPI.login(credentials);
                set(state =&amp;gt; {
                    state.user = response.user;
                    state.token = response.token;
                });
            },
            logout: () =&amp;gt; set({ user: null, token: null }),

            // Cart slice
            items: [],
            addItem: (product) =&amp;gt; set(state =&amp;gt; {
                state.items.push({ product, quantity: 1 });
            }),
            removeItem: (id) =&amp;gt; set(state =&amp;gt; {
                state.items = state.items.filter(i =&amp;gt; i.product.id !== id);
            }),
            get total() {
                return get().items.reduce((sum, i) =&amp;gt; sum + i.product.price * i.quantity, 0);
            },
        })),
        { name: 'app-store' }
    )
);&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Server State with TanStack Query&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// hooks/useProducts.ts
export function useProducts(categoryId: string) {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: () =&amp;gt; productAPI.getByCategory(categoryId),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
    });
}

// Optimistic updates
export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartAPI.addItem,
        onMutate: async (newItem) =&amp;gt; {
            await queryClient.cancelQueries(['cart']);
            const previous = queryClient.getQueryData(['cart']);

            queryClient.setQueryData(['cart'], (old) =&amp;gt; ({
                ...old,
                items: [...old.items, newItem],
            }));

            return { previous };
        },
        onError: (err, newItem, context) =&amp;gt; {
            queryClient.setQueryData(['cart'], context.previous);
        },
        onSettled: () =&amp;gt; {
            queryClient.invalidateQueries(['cart']);
        },
    });
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;State Machine for Complex Flows&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// machines/checkoutMachine.ts
import { createMachine, assign } from 'xstate';

const checkoutMachine = createMachine({
    id: 'checkout',
    initial: 'cart',
    context: {
        items: [],
        shipping: null,
        payment: null,
        error: null,
    },
    states: {
        cart: {
            on: { PROCEED: 'shipping' }
        },
        shipping: {
            on: {
                BACK: 'cart',
                SUBMIT_SHIPPING: {
                    target: 'payment',
                    actions: assign({ shipping: (_, e) =&amp;gt; e.data })
                }
            }
        },
        payment: {
            on: {
                BACK: 'shipping',
                SUBMIT_PAYMENT: 'processing'
            }
        },
        processing: {
            invoke: {
                src: 'processOrder',
                onDone: 'success',
                onError: {
                    target: 'payment',
                    actions: assign({ error: (_, e) =&amp;gt; e.data })
                }
            }
        },
        success: { type: 'final' }
    }
});&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Guidelines&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;Keep global state minimal - only truly global data&lt;/li&gt;
                &lt;li&gt;Use TanStack Query for all API data - handles caching, refetching&lt;/li&gt;
                &lt;li&gt;Use XState for complex multi-step flows&lt;/li&gt;
                &lt;li&gt;Colocate state as close to usage as possible&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Monorepo Structure&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;my-app/
├── apps/
│   ├── mobile/              # Main RN app shell
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── navigation/
│   │   └── package.json
│   └── storybook/           # Component documentation
├── packages/
│   ├── ui/                  # Shared UI components
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── core/                # Shared utilities
│   │   ├── src/
│   │   │   ├── api/
│   │   │   ├── storage/
│   │   │   └── hooks/
│   │   └── package.json
│   └── config/              # Shared configs (TS, ESLint)
├── features/
│   ├── auth/                # Auth team owns this
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   └── index.ts     # Public API
│   │   ├── package.json
│   │   └── README.md
│   ├── checkout/            # Payments team owns this
│   ├── catalog/             # Discovery team owns this
│   └── profile/             # Growth team owns this
├── nx.json                  # Nx workspace config
├── package.json
└── turbo.json               # Or Turborepo config&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Module Interface Contract&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// features/auth/src/index.ts - Public API
// Only export what other modules can use

// Screens (for navigation registration)
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';

// Hooks (for consuming auth state)
export { useAuth, useCurrentUser } from './hooks/useAuth';

// Types
export type { User, AuthState } from './types';

// Navigation params
export type { AuthStackParamList } from './navigation/types';

// DO NOT export internal components, utilities, or API calls
// They are implementation details&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Dependency Injection&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// packages/core/src/di/container.ts
import { createContext, useContext } from 'react';

interface AppServices {
    api: APIClient;
    analytics: AnalyticsService;
    storage: StorageService;
    featureFlags: FeatureFlagService;
}

const ServiceContext = createContext&amp;lt;AppServices | null&amp;gt;(null);

export function ServiceProvider({
    children,
    services
}: {
    children: ReactNode;
    services: AppServices;
}) {
    return (
        &amp;lt;ServiceContext.Provider value={services}&amp;gt;
            {children}
        &amp;lt;/ServiceContext.Provider&amp;gt;
    );
}

export function useServices(): AppServices {
    const services = useContext(ServiceContext);
    if (!services) throw new Error('ServiceProvider not found');
    return services;
}

// Usage in feature module
function CheckoutScreen() {
    const { api, analytics } = useServices();
    // Feature doesn't know concrete implementations
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Feature Flag Per Module&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// features/checkout/src/hooks/useCheckoutFlags.ts
export function useCheckoutFlags() {
    const { featureFlags } = useServices();

    return {
        newPaymentFlow: featureFlags.isEnabled('checkout_new_payment_flow'),
        applePay: featureFlags.isEnabled('checkout_apple_pay'),
        expressCheckout: featureFlags.isEnabled('checkout_express'),
    };
}

// Gradual rollout of new feature
function PaymentScreen() {
    const { newPaymentFlow } = useCheckoutFlags();

    if (newPaymentFlow) {
        return &amp;lt;NewPaymentFlow /&amp;gt;;
    }
    return &amp;lt;LegacyPaymentFlow /&amp;gt;;
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Build Optimization&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production"],
      "cache": true
    }
  },
  "namedInputs": {
    "production": [
      "default",
      "!{projectRoot}/**/*.spec.tsx",
      "!{projectRoot}/test/**/*"
    ]
  }
}

// Only rebuild what changed
// nx affected:build --base=main&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Team Workflow&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Code Ownership:&lt;/strong&gt; CODEOWNERS file per feature directory&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;API Contracts:&lt;/strong&gt; Breaking changes require RFC&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Testing:&lt;/strong&gt; Each feature has own test suite&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Releases:&lt;/strong&gt; Feature flags allow independent deployment&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Architecture Overview&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│                      FEED SCREEN                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐│
│  │              FlashList / RecyclerView               ││
│  │  ┌─────────────────────────────────────────────┐   ││
│  │  │            Virtualized Window               │   ││
│  │  │  ┌───────────────────────────────────────┐ │   ││
│  │  │  │  Cell 1: Image Post                   │ │   ││
│  │  │  │  - Cached Image (expo-image)          │ │   ││
│  │  │  │  - Interaction buttons                │ │   ││
│  │  │  └───────────────────────────────────────┘ │   ││
│  │  │  ┌───────────────────────────────────────┐ │   ││
│  │  │  │  Cell 2: Video Post                   │ │   ││
│  │  │  │  - Auto-play when visible             │ │   ││
│  │  │  │  - Paused when off-screen             │ │   ││
│  │  │  └───────────────────────────────────────┘ │   ││
│  │  │  ┌───────────────────────────────────────┐ │   ││
│  │  │  │  Cell 3: Text Post                    │ │   ││
│  │  │  └───────────────────────────────────────┘ │   ││
│  │  └─────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;FlashList Implementation&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';

function FeedScreen() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['feed'],
        queryFn: ({ pageParam = null }) =&amp;gt; feedAPI.getPosts(pageParam),
        getNextPageParam: (lastPage) =&amp;gt; lastPage.nextCursor,
    });

    const posts = data?.pages.flatMap(page =&amp;gt; page.posts) ?? [];

    return (
        &amp;lt;FlashList
            data={posts}
            renderItem={({ item }) =&amp;gt; &amp;lt;FeedItem post={item} /&amp;gt;}
            estimatedItemSize={400}
            keyExtractor={(item) =&amp;gt; item.id}
            onEndReached={() =&amp;gt; hasNextPage &amp;amp;&amp;amp; fetchNextPage()}
            onEndReachedThreshold={0.5}
            getItemType={(item) =&amp;gt; item.type} // 'image' | 'video' | 'text'
            ListFooterComponent={isFetchingNextPage ? &amp;lt;Spinner /&amp;gt; : null}
            drawDistance={250}
        /&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Optimized Feed Item&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import { Image } from 'expo-image';
import { memo, useCallback } from 'react';

const FeedItem = memo(function FeedItem({ post }: { post: Post }) {
    // Memoize callbacks to prevent re-renders
    const handleLike = useCallback(() =&amp;gt; {
        likePost(post.id);
    }, [post.id]);

    return (
        &amp;lt;View style={styles.container}&amp;gt;
            &amp;lt;UserHeader user={post.author} /&amp;gt;

            {post.type === 'image' &amp;amp;&amp;amp; (
                &amp;lt;Image
                    source={{ uri: post.imageUrl }}
                    style={styles.image}
                    contentFit="cover"
                    placeholder={post.blurhash}
                    transition={200}
                    cachePolicy="memory-disk"
                /&amp;gt;
            )}

            {post.type === 'video' &amp;amp;&amp;amp; (
                &amp;lt;VideoCell videoUrl={post.videoUrl} /&amp;gt;
            )}

            &amp;lt;InteractionBar
                likes={post.likes}
                comments={post.comments}
                onLike={handleLike}
            /&amp;gt;
        &amp;lt;/View&amp;gt;
    );
});

// Flatten the view hierarchy for performance
const styles = StyleSheet.create({
    container: {
        // Avoid nested Views when possible
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
});&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Video Auto-play Management&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import { useCallback, useState } from 'react';
import { ViewToken } from 'react-native';

function FeedScreen() {
    const [visibleVideoId, setVisibleVideoId] = useState&amp;lt;string | null&amp;gt;(null);

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) =&amp;gt; {
            // Find the first visible video
            const visibleVideo = viewableItems.find(
                item =&amp;gt; item.isViewable &amp;amp;&amp;amp; item.item.type === 'video'
            );
            setVisibleVideoId(visibleVideo?.item.id ?? null);
        },
        []
    );

    return (
        &amp;lt;FlashList
            data={posts}
            renderItem={({ item }) =&amp;gt; (
                &amp;lt;FeedItem
                    post={item}
                    shouldPlayVideo={item.id === visibleVideoId}
                /&amp;gt;
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 60,
                minimumViewTime: 300,
            }}
        /&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Performance Checklist&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Use FlashList:&lt;/strong&gt; 10x faster than FlatList for large lists&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Memoize items:&lt;/strong&gt; memo() with stable keys&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Image caching:&lt;/strong&gt; expo-image with blurhash placeholders&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Flatten views:&lt;/strong&gt; Reduce nesting depth&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;getItemType:&lt;/strong&gt; Enable cell recycling by type&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;estimatedItemSize:&lt;/strong&gt; Provide accurate estimate&lt;/li&gt;
            &lt;/ul&gt;
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
            <h4>Startup Timeline Breakdown</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                  APP STARTUP PHASES                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  0ms ─────────── Native Init ─────────── 200ms          │
│  │  • Load native libraries                             │
│  │  • Initialize React Native bridge                    │
│  └─────────────────────────────────────────────────────  │
│                                                          │
│  200ms ────────── JS Bundle Load ────────── 600ms       │
│  │  • Download/load JS bundle                           │
│  │  • Parse JavaScript                                  │
│  │  • Hermes bytecode execution                         │
│  └─────────────────────────────────────────────────────  │
│                                                          │
│  600ms ────────── React Init ────────── 1000ms          │
│  │  • Component tree creation                           │
│  │  • Initial render                                    │
│  └─────────────────────────────────────────────────────  │
│                                                          │
│  1000ms ────────── Data Fetch ────────── 1500ms         │
│  │  • API calls                                         │
│  │  • Cache hydration                                   │
│  └─────────────────────────────────────────────────────  │
│                                                          │
│  1500ms ────────── Interactive ────────── 2000ms        │
│  │  • Full render complete                              │
│  │  • Ready for interaction                             │
│  └─────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Hermes Optimization</h4>
            <pre><code>// android/app/build.gradle
android {
    defaultConfig {
        // Enable Hermes
        buildConfigField "boolean", "IS_HERMES_ENABLED", "true"
    }
}

// metro.config.js - Enable bytecode compilation
module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true, // Defer requires until needed
            },
        }),
    },
};</code></pre>

            <h4>Deferred Initialization</h4>
            <pre><code>// App.tsx - Lazy load non-critical features
import { lazy, Suspense } from 'react';

// Eagerly load critical path
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';

// Defer analytics, monitoring until after interactive
const Analytics = lazy(() => import('./services/analytics'));
const Monitoring = lazy(() => import('./services/monitoring'));

function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            // Only load critical data
            await Promise.all([
                loadUserSession(),
                prefetchHomeData(),
            ]);
            setIsReady(true);

            // Initialize non-critical after render
            requestIdleCallback(() => {
                initAnalytics();
                initPushNotifications();
                preloadSecondaryScreens();
            });
        }
        prepare();
    }, []);

    if (!isReady) return &lt;SplashScreen /&gt;;

    return (
        &lt;Suspense fallback={null}&gt;
            &lt;Analytics /&gt;
            &lt;Monitoring /&gt;
            &lt;Navigation /&gt;
        &lt;/Suspense&gt;
    );
}</code></pre>

            <h4>Bundle Analysis &amp; Splitting</h4>
            <pre><code># Analyze bundle size
npx react-native-bundle-visualizer

# metro.config.js - Tree shaking
module.exports = {
    transformer: {
        minifierConfig: {
            keep_classnames: false,
            keep_fnames: false,
            mangle: true,
            toplevel: true,
        },
    },
};

// Use specific imports instead of barrel imports
// Bad: import { Button, Input, Card } from '@ui';
// Good: import Button from '@ui/Button';
// Good: import Input from '@ui/Input';</code></pre>

            <h4>Native Splash Screen</h4>
            <pre><code>// Prevent white flash with native splash
// ios/AppDelegate.mm
- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Keep splash visible until JS ready
    RNSplashScreen.show();
    return YES;
}

// App.tsx
import SplashScreen from 'react-native-splash-screen';

useEffect(() => {
    async function init() {
        await initializeApp();
        SplashScreen.hide(); // Hide only when ready
    }
    init();
}, []);</code></pre>

            <h4>Key Metrics to Track</h4>
            <ul>
                <li><strong>TTFB:</strong> Time to first byte of JS bundle</li>
                <li><strong>TTI:</strong> Time to interactive</li>
                <li><strong>FCP:</strong> First contentful paint</li>
                <li><strong>Bundle Size:</strong> Keep under 2MB compressed</li>
            </ul>
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
            <h4>Cell Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                   COMPLEX CELL LAYOUT                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐│
│  │  Header Row                                         ││
│  │  ┌────────┐ ┌────────────────────────────┐         ││
│  │  │ Avatar │ │ Username + Timestamp       │  •••    ││
│  │  └────────┘ └────────────────────────────┘         ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │  Media Container (Image OR Video)                   ││
│  │  ┌─────────────────────────────────────────────┐   ││
│  │  │                                             │   ││
│  │  │         Image with Blurhash                 │   ││
│  │  │              OR                             │   ││
│  │  │     Video with Play/Pause overlay           │   ││
│  │  │                                             │   ││
│  │  └─────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │  Interaction Row                                    ││
│  │  [♡ Like]  [💬 Comment]  [↗ Share]  [⋯ More]      ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │  Caption &amp; Comments Preview                        ││
│  │  "Caption text with @mentions and #hashtags..."    ││
│  │  View all 42 comments                              ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Cell Type Recycling</h4>
            <pre><code>import { FlashList } from '@shopify/flash-list';

type CellType = 'image' | 'video' | 'carousel' | 'text';

interface Post {
    id: string;
    type: CellType;
    // ... other fields
}

function Feed({ posts }: { posts: Post[] }) {
    return (
        &lt;FlashList
            data={posts}
            renderItem={({ item }) =&gt; {
                switch (item.type) {
                    case 'image': return &lt;ImageCell post={item} /&gt;;
                    case 'video': return &lt;VideoCell post={item} /&gt;;
                    case 'carousel': return &lt;CarouselCell post={item} /&gt;;
                    case 'text': return &lt;TextCell post={item} /&gt;;
                }
            }}
            // Critical: Enable cell recycling by type
            getItemType={(item) =&gt; item.type}
            // Provide accurate size estimates per type
            overrideItemLayout={(layout, item) =&gt; {
                switch (item.type) {
                    case 'image':
                        layout.size = 500;
                        break;
                    case 'video':
                        layout.size = 600;
                        break;
                    case 'carousel':
                        layout.size = 550;
                        break;
                    case 'text':
                        layout.size = 200;
                        break;
                }
            }}
            estimatedItemSize={450}
        /&gt;
    );
}</code></pre>

            <h4>Optimized Image Cell</h4>
            <pre><code>import { Image } from 'expo-image';
import { memo, useCallback, useMemo } from 'react';

const ImageCell = memo(function ImageCell({ post }: { post: Post }) {
    // Memoize style calculations
    const imageStyle = useMemo(() => ({
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * post.aspectRatio,
    }), [post.aspectRatio]);

    // Stable callback references
    const onLike = useCallback(() => likePost(post.id), [post.id]);
    const onComment = useCallback(() => navigate('Comments', { postId: post.id }), [post.id]);

    return (
        &lt;View style={styles.cell}&gt;
            &lt;PostHeader author={post.author} timestamp={post.createdAt} /&gt;

            &lt;Image
                source={{ uri: post.imageUrl }}
                style={imageStyle}
                placeholder={{ blurhash: post.blurhash }}
                contentFit="cover"
                transition={150}
                recyclingKey={post.id}
                cachePolicy="memory-disk"
            /&gt;

            &lt;PostActions
                postId={post.id}
                likes={post.likeCount}
                comments={post.commentCount}
                onLike={onLike}
                onComment={onComment}
            /&gt;

            &lt;PostCaption text={post.caption} /&gt;
        &lt;/View&gt;
    );
});</code></pre>

            <h4>Video Cell with Visibility</h4>
            <pre><code>import Video from 'react-native-video';

const VideoCell = memo(function VideoCell({
    post,
    isVisible
}: {
    post: Post;
    isVisible: boolean;
}) {
    const [isMuted, setIsMuted] = useState(true);

    return (
        &lt;View style={styles.cell}&gt;
            &lt;PostHeader author={post.author} /&gt;

            &lt;Pressable onPress={() =&gt; setIsMuted(!isMuted)}&gt;
                &lt;Video
                    source={{ uri: post.videoUrl }}
                    style={styles.video}
                    paused={!isVisible}
                    muted={isMuted}
                    repeat
                    resizeMode="cover"
                    posterResizeMode="cover"
                    poster={post.thumbnailUrl}
                /&gt;
                {isMuted &amp;&amp; &lt;MuteIndicator /&gt;}
            &lt;/Pressable&gt;

            &lt;PostActions postId={post.id} /&gt;
        &lt;/View&gt;
    );
});</code></pre>

            <h4>Performance Guidelines</h4>
            <ul>
                <li><strong>Avoid inline styles:</strong> Use StyleSheet.create()</li>
                <li><strong>Memoize components:</strong> memo() for all cell types</li>
                <li><strong>Stable keys:</strong> Use unique IDs, never array index</li>
                <li><strong>Minimize re-renders:</strong> useCallback for event handlers</li>
                <li><strong>Profile regularly:</strong> Use Flipper performance tools</li>
            </ul>
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
            <h4>Data Model</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                  BLOCK-BASED STRUCTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Page                                                    │
│  ├── Block (type: heading)                              │
│  │   └── content: "Project Overview"                    │
│  ├── Block (type: paragraph)                            │
│  │   └── content: "Description text..."                 │
│  ├── Block (type: todo)                                 │
│  │   ├── content: "Task item"                           │
│  │   └── checked: false                                 │
│  ├── Block (type: image)                                │
│  │   └── imageUrl: "local://..."                        │
│  └── Block (type: nested)                               │
│      └── children: [Block, Block, ...]                  │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Database Schema (WatermelonDB)</h4>
            <pre><code>// models/Page.ts
import { Model } from '@nozbe/watermelondb';
import { field, children, date, readonly } from '@nozbe/watermelondb/decorators';

class Page extends Model {
    static table = 'pages';
    static associations = {
        blocks: { type: 'has_many', foreignKey: 'page_id' },
    };

    @field('title') title!: string;
    @field('icon') icon!: string;
    @field('parent_id') parentId!: string | null;
    @field('sync_status') syncStatus!: 'synced' | 'pending' | 'conflict';
    @field('version') version!: number;
    @readonly @date('created_at') createdAt!: Date;
    @date('updated_at') updatedAt!: Date;
    @children('blocks') blocks!: Query&lt;Block&gt;;
}

// models/Block.ts
class Block extends Model {
    static table = 'blocks';

    @field('page_id') pageId!: string;
    @field('type') type!: BlockType;
    @field('content') content!: string;
    @field('properties') properties!: string; // JSON
    @field('order') order!: number;
    @field('parent_block_id') parentBlockId!: string | null;
}</code></pre>

            <h4>Sync Engine Architecture</h4>
            <pre><code>// services/SyncEngine.ts
class SyncEngine {
    private operationLog: Operation[] = [];
    private lastSyncTimestamp: number = 0;

    // Track all local changes
    async trackChange(operation: Operation) {
        this.operationLog.push({
            ...operation,
            timestamp: Date.now(),
            clientId: this.clientId,
        });
        await this.persistLog();
    }

    // Push local changes to server
    async pushChanges(): Promise&lt;void&gt; {
        const pending = this.operationLog.filter(
            op =&gt; op.timestamp &gt; this.lastSyncTimestamp
        );

        if (pending.length === 0) return;

        const response = await api.sync({
            operations: pending,
            lastSync: this.lastSyncTimestamp,
        });

        // Handle conflicts
        for (const conflict of response.conflicts) {
            await this.resolveConflict(conflict);
        }

        this.lastSyncTimestamp = response.serverTimestamp;
        this.operationLog = this.operationLog.filter(
            op =&gt; op.timestamp &gt; this.lastSyncTimestamp
        );
    }

    // Pull remote changes
    async pullChanges(): Promise&lt;void&gt; {
        const changes = await api.getChanges({
            since: this.lastSyncTimestamp,
            clientId: this.clientId,
        });

        await database.write(async () =&gt; {
            for (const change of changes.operations) {
                await this.applyRemoteChange(change);
            }
        });

        this.lastSyncTimestamp = changes.serverTimestamp;
    }
}</code></pre>

            <h4>Conflict Resolution</h4>
            <pre><code>// services/ConflictResolver.ts
class ConflictResolver {
    async resolve(conflict: Conflict): Promise&lt;Resolution&gt; {
        const { local, remote, base } = conflict;

        // For text content, attempt three-way merge
        if (conflict.type === 'text') {
            const merged = threeWayMerge(base.content, local.content, remote.content);

            if (!merged.hasConflicts) {
                return { action: 'merge', content: merged.result };
            }

            // Show conflict UI to user
            return {
                action: 'manual',
                options: [
                    { label: 'Keep mine', value: local },
                    { label: 'Use theirs', value: remote },
                    { label: 'Keep both', value: [...local, ...remote] },
                ],
            };
        }

        // For structural changes (block order), use timestamps
        if (conflict.type === 'structural') {
            return local.timestamp &gt; remote.timestamp
                ? { action: 'use_local' }
                : { action: 'use_remote' };
        }
    }
}</code></pre>

            <h4>Offline Queue</h4>
            <pre><code>// hooks/useOfflineSync.ts
function useOfflineSync() {
    const netInfo = useNetInfo();

    useEffect(() =&gt; {
        if (netInfo.isConnected) {
            // Online: sync immediately
            syncEngine.pushChanges();
            syncEngine.pullChanges();
        }
    }, [netInfo.isConnected]);

    // Queue operations when offline
    const updateBlock = useCallback(async (blockId: string, content: string) =&gt; {
        // Update local immediately
        await database.write(async () =&gt; {
            const block = await database.get&lt;Block&gt;('blocks').find(blockId);
            await block.update(b =&gt; {
                b.content = content;
                b.syncStatus = 'pending';
            });
        });

        // Track for sync
        await syncEngine.trackChange({
            type: 'UPDATE',
            entity: 'block',
            id: blockId,
            changes: { content },
        });
    }, []);

    return { updateBlock };
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Optimistic updates:</strong> UI updates immediately, syncs in background</li>
                <li><strong>Version vectors:</strong> Track changes per client to detect conflicts</li>
                <li><strong>Operational transforms:</strong> For collaborative real-time editing</li>
                <li><strong>Periodic sync:</strong> Background sync every 30s when online</li>
            </ul>
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
            <h4>Conflict Resolution Strategies</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│              CONFLICT RESOLUTION APPROACHES              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. LAST-WRITE-WINS (LWW)                               │
│     • Simplest approach                                 │
│     • Uses timestamps to pick winner                    │
│     • May lose data                                     │
│                                                          │
│  2. OPERATIONAL TRANSFORM (OT)                          │
│     • Transforms operations against each other          │
│     • Used by Google Docs                               │
│     • Complex to implement                              │
│                                                          │
│  3. CRDT (Conflict-free Replicated Data Types)          │
│     • Mathematically guaranteed to converge             │
│     • No central server needed                          │
│     • Used by Figma, Linear                             │
│                                                          │
│  4. THREE-WAY MERGE                                     │
│     • Compares local, remote, and common ancestor       │
│     • Used by Git                                       │
│     • Manual resolution for conflicts                   │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>CRDT Implementation</h4>
            <pre><code>// Simple LWW-Register CRDT
interface LWWRegister&lt;T&gt; {
    value: T;
    timestamp: number;
    nodeId: string;
}

class LWWRegisterCRDT&lt;T&gt; {
    private state: LWWRegister&lt;T&gt;;

    update(value: T, timestamp: number, nodeId: string): void {
        // Higher timestamp wins; tie-break on nodeId
        if (timestamp &gt; this.state.timestamp ||
            (timestamp === this.state.timestamp &amp;&amp;
             nodeId &gt; this.state.nodeId)) {
            this.state = { value, timestamp, nodeId };
        }
    }

    merge(other: LWWRegister&lt;T&gt;): void {
        this.update(other.value, other.timestamp, other.nodeId);
    }

    getValue(): T {
        return this.state.value;
    }
}

// G-Counter CRDT for likes/counts
class GCounter {
    private counts: Map&lt;string, number&gt; = new Map();

    increment(nodeId: string): void {
        const current = this.counts.get(nodeId) || 0;
        this.counts.set(nodeId, current + 1);
    }

    merge(other: GCounter): void {
        for (const [nodeId, count] of other.counts) {
            const current = this.counts.get(nodeId) || 0;
            this.counts.set(nodeId, Math.max(current, count));
        }
    }

    getValue(): number {
        let total = 0;
        for (const count of this.counts.values()) {
            total += count;
        }
        return total;
    }
}</code></pre>

            <h4>Vector Clock for Causality</h4>
            <pre><code>// Track causal relationships between events
class VectorClock {
    private clock: Map&lt;string, number&gt; = new Map();

    constructor(private nodeId: string) {
        this.clock.set(nodeId, 0);
    }

    increment(): VectorClock {
        const current = this.clock.get(this.nodeId) || 0;
        this.clock.set(this.nodeId, current + 1);
        return this;
    }

    merge(other: VectorClock): VectorClock {
        for (const [nodeId, time] of other.clock) {
            const current = this.clock.get(nodeId) || 0;
            this.clock.set(nodeId, Math.max(current, time));
        }
        return this;
    }

    // Check if this clock happened before another
    happenedBefore(other: VectorClock): boolean {
        let atLeastOneLess = false;

        for (const [nodeId, time] of this.clock) {
            const otherTime = other.clock.get(nodeId) || 0;
            if (time &gt; otherTime) return false;
            if (time &lt; otherTime) atLeastOneLess = true;
        }

        return atLeastOneLess;
    }

    // Check if concurrent (neither happened before the other)
    isConcurrent(other: VectorClock): boolean {
        return !this.happenedBefore(other) &amp;&amp; !other.happenedBefore(this);
    }
}</code></pre>

            <h4>Three-Way Merge</h4>
            <pre><code>// For text content conflicts
function threeWayMerge(
    base: string,
    local: string,
    remote: string
): { result: string; hasConflicts: boolean } {
    const baseLines = base.split('\n');
    const localLines = local.split('\n');
    const remoteLines = remote.split('\n');

    const result: string[] = [];
    let hasConflicts = false;

    // Simple line-by-line merge
    const maxLen = Math.max(baseLines.length, localLines.length, remoteLines.length);

    for (let i = 0; i &lt; maxLen; i++) {
        const baseLine = baseLines[i] || '';
        const localLine = localLines[i] || '';
        const remoteLine = remoteLines[i] || '';

        if (localLine === remoteLine) {
            // Both made same change or no change
            result.push(localLine);
        } else if (localLine === baseLine) {
            // Only remote changed
            result.push(remoteLine);
        } else if (remoteLine === baseLine) {
            // Only local changed
            result.push(localLine);
        } else {
            // Both changed differently - conflict!
            hasConflicts = true;
            result.push(\`&lt;&lt;&lt;&lt;&lt;&lt;&lt; LOCAL\`);
            result.push(localLine);
            result.push(\`=======\`);
            result.push(remoteLine);
            result.push(\`&gt;&gt;&gt;&gt;&gt;&gt;&gt; REMOTE\`);
        }
    }

    return { result: result.join('\n'), hasConflicts };
}</code></pre>

            <h4>User-Facing Conflict UI</h4>
            <pre><code>function ConflictModal({ conflict, onResolve }) {
    return (
        &lt;Modal visible={true}&gt;
            &lt;Text&gt;Sync Conflict Detected&lt;/Text&gt;

            &lt;View style={styles.comparison}&gt;
                &lt;View style={styles.version}&gt;
                    &lt;Text&gt;Your Version&lt;/Text&gt;
                    &lt;Text&gt;{conflict.local.content}&lt;/Text&gt;
                    &lt;Text&gt;Modified: {conflict.local.timestamp}&lt;/Text&gt;
                &lt;/View&gt;

                &lt;View style={styles.version}&gt;
                    &lt;Text&gt;Server Version&lt;/Text&gt;
                    &lt;Text&gt;{conflict.remote.content}&lt;/Text&gt;
                    &lt;Text&gt;Modified: {conflict.remote.timestamp}&lt;/Text&gt;
                &lt;/View&gt;
            &lt;/View&gt;

            &lt;Button title="Keep Mine" onPress={() =&gt; onResolve('local')} /&gt;
            &lt;Button title="Use Theirs" onPress={() =&gt; onResolve('remote')} /&gt;
            &lt;Button title="Keep Both" onPress={() =&gt; onResolve('both')} /&gt;
        &lt;/Modal&gt;
    );
}</code></pre>

            <h4>When to Use Each Approach</h4>
            <ul>
                <li><strong>LWW:</strong> Simple counters, last-edit-wins scenarios</li>
                <li><strong>CRDT:</strong> Real-time collaboration, offline-first apps</li>
                <li><strong>OT:</strong> Text editing with cursor positions</li>
                <li><strong>Three-way merge:</strong> Document versioning, Git-like workflows</li>
            </ul>
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
            <h4>Message Queue Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                   MESSAGE LIFECYCLE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Compose] → [Queue] → [Send] → [Delivered] → [Read]    │
│      │          │         │          │           │       │
│   pending    queued    sending   delivered     read      │
│                                                          │
│  Local States:                                          │
│  • pending: User typed, not yet queued                  │
│  • queued: In offline queue, waiting for network        │
│  • sending: Actively being sent                         │
│  • sent: Server acknowledged receipt                    │
│  • delivered: Recipient device received                 │
│  • read: Recipient opened message                       │
│  • failed: Send failed, needs retry                     │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Offline Message Queue</h4>
            <pre><code>// services/MessageQueue.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'message-queue' });

interface QueuedMessage {
    localId: string;
    conversationId: string;
    content: string;
    timestamp: number;
    status: 'queued' | 'sending' | 'failed';
    retryCount: number;
    attachments?: Attachment[];
}

class MessageQueue {
    private queue: QueuedMessage[] = [];
    private isProcessing = false;

    constructor() {
        this.loadQueue();
    }

    private loadQueue() {
        const saved = storage.getString('queue');
        this.queue = saved ? JSON.parse(saved) : [];
    }

    private saveQueue() {
        storage.set('queue', JSON.stringify(this.queue));
    }

    async enqueue(message: Omit&lt;QueuedMessage, 'localId' | 'status' | 'retryCount'&gt;) {
        const queued: QueuedMessage = {
            ...message,
            localId: generateUUID(),
            status: 'queued',
            retryCount: 0,
        };

        this.queue.push(queued);
        this.saveQueue();

        // Trigger immediate send if online
        this.processQueue();

        return queued.localId;
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const pending = this.queue.filter(m =&gt; m.status === 'queued');

        for (const message of pending) {
            try {
                message.status = 'sending';
                this.saveQueue();

                const response = await api.sendMessage({
                    conversationId: message.conversationId,
                    content: message.content,
                    localId: message.localId,
                    attachments: message.attachments,
                });

                // Remove from queue on success
                this.queue = this.queue.filter(m =&gt; m.localId !== message.localId);
                this.saveQueue();

                // Update local message with server ID
                await database.updateMessage(message.localId, {
                    serverId: response.id,
                    status: 'sent',
                });
            } catch (error) {
                message.status = 'failed';
                message.retryCount++;
                this.saveQueue();

                if (message.retryCount &gt;= 3) {
                    // Notify user of permanent failure
                    notifyMessageFailed(message);
                }
            }
        }

        this.isProcessing = false;
    }
}</code></pre>

            <h4>Retry with Exponential Backoff</h4>
            <pre><code>// services/RetryService.ts
class RetryService {
    private retryTimeouts: Map&lt;string, NodeJS.Timeout&gt; = new Map();

    scheduleRetry(messageId: string, retryCount: number) {
        // Clear existing retry if any
        const existing = this.retryTimeouts.get(messageId);
        if (existing) clearTimeout(existing);

        // Exponential backoff: 1s, 2s, 4s, 8s, 16s
        const delay = Math.min(1000 * Math.pow(2, retryCount), 16000);

        const timeout = setTimeout(() =&gt; {
            messageQueue.retryMessage(messageId);
            this.retryTimeouts.delete(messageId);
        }, delay);

        this.retryTimeouts.set(messageId, timeout);
    }

    cancelRetry(messageId: string) {
        const timeout = this.retryTimeouts.get(messageId);
        if (timeout) {
            clearTimeout(timeout);
            this.retryTimeouts.delete(messageId);
        }
    }
}

// Listen for network changes
NetInfo.addEventListener(state =&gt; {
    if (state.isConnected) {
        messageQueue.processQueue();
    }
});</code></pre>

            <h4>Message Deduplication</h4>
            <pre><code>// Server-side deduplication using localId
// But also handle on client for robustness

class MessageDeduplicator {
    private recentIds: Set&lt;string&gt; = new Set();
    private readonly MAX_CACHE_SIZE = 1000;

    isDuplicate(messageId: string): boolean {
        return this.recentIds.has(messageId);
    }

    markSeen(messageId: string) {
        this.recentIds.add(messageId);

        // Prevent unbounded growth
        if (this.recentIds.size &gt; this.MAX_CACHE_SIZE) {
            const first = this.recentIds.values().next().value;
            this.recentIds.delete(first);
        }
    }
}

// Usage in message handler
function handleIncomingMessage(message: Message) {
    if (deduplicator.isDuplicate(message.id)) {
        return; // Already processed
    }

    deduplicator.markSeen(message.id);
    processMessage(message);
}</code></pre>

            <h4>UI Integration</h4>
            <pre><code>function MessageBubble({ message }: { message: Message }) {
    return (
        &lt;View style={styles.bubble}&gt;
            &lt;Text&gt;{message.content}&lt;/Text&gt;

            &lt;View style={styles.status}&gt;
                {message.status === 'queued' &amp;&amp; &lt;ClockIcon /&gt;}
                {message.status === 'sending' &amp;&amp; &lt;SpinnerIcon /&gt;}
                {message.status === 'sent' &amp;&amp; &lt;CheckIcon /&gt;}
                {message.status === 'delivered' &amp;&amp; &lt;DoubleCheckIcon /&gt;}
                {message.status === 'read' &amp;&amp; &lt;DoubleCheckIcon color="blue" /&gt;}
                {message.status === 'failed' &amp;&amp; (
                    &lt;Pressable onPress={() =&gt; retryMessage(message.localId)}&gt;
                        &lt;ErrorIcon /&gt;
                        &lt;Text&gt;Tap to retry&lt;/Text&gt;
                    &lt;/Pressable&gt;
                )}
            &lt;/View&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Idempotency:</strong> Use localId to prevent duplicate sends</li>
                <li><strong>Order preservation:</strong> Process queue in FIFO order</li>
                <li><strong>Background sync:</strong> Use background fetch on iOS/Android</li>
                <li><strong>Conflict handling:</strong> Server timestamp for ordering</li>
            </ul>
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
            <h4>Real-Time Features Overview</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│              REAL-TIME CHAT FEATURES                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  PRESENCE                                               │
│  ├── Online/Offline status                              │
│  ├── Last seen timestamp                                │
│  └── "Active now" indicator                             │
│                                                          │
│  TYPING INDICATORS                                      │
│  ├── "User is typing..."                                │
│  ├── Debounced updates                                  │
│  └── Timeout after 3 seconds                            │
│                                                          │
│  READ RECEIPTS                                          │
│  ├── Message delivered to device                        │
│  ├── Message seen by user                               │
│  └── Batch updates for efficiency                       │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>WebSocket Connection Manager</h4>
            <pre><code>// services/SocketManager.ts
import { io, Socket } from 'socket.io-client';

class SocketManager {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private listeners: Map&lt;string, Set&lt;Function&gt;&gt; = new Map();

    connect(token: string) {
        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        this.socket.on('connect', () =&gt; {
            this.reconnectAttempts = 0;
            this.emit('connected');
        });

        this.socket.on('disconnect', (reason) =&gt; {
            this.emit('disconnected', reason);
        });

        // Forward all events to subscribers
        this.socket.onAny((event, data) =&gt; {
            this.emit(event, data);
        });
    }

    subscribe(event: string, callback: Function) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);

        return () =&gt; this.listeners.get(event)?.delete(callback);
    }

    send(event: string, data: any) {
        this.socket?.emit(event, data);
    }

    private emit(event: string, data?: any) {
        this.listeners.get(event)?.forEach(cb =&gt; cb(data));
    }
}</code></pre>

            <h4>Typing Indicators</h4>
            <pre><code>// hooks/useTypingIndicator.ts
function useTypingIndicator(conversationId: string) {
    const [typingUsers, setTypingUsers] = useState&lt;string[]&gt;([]);
    const typingTimeouts = useRef&lt;Map&lt;string, NodeJS.Timeout&gt;&gt;(new Map());

    useEffect(() =&gt; {
        const unsubscribe = socketManager.subscribe(
            'typing',
            ({ conversationId: cid, userId, isTyping }) =&gt; {
                if (cid !== conversationId) return;

                // Clear existing timeout
                const existing = typingTimeouts.current.get(userId);
                if (existing) clearTimeout(existing);

                if (isTyping) {
                    setTypingUsers(prev =&gt;
                        prev.includes(userId) ? prev : [...prev, userId]
                    );

                    // Auto-remove after 3 seconds of no updates
                    const timeout = setTimeout(() =&gt; {
                        setTypingUsers(prev =&gt; prev.filter(id =&gt; id !== userId));
                    }, 3000);

                    typingTimeouts.current.set(userId, timeout);
                } else {
                    setTypingUsers(prev =&gt; prev.filter(id =&gt; id !== userId));
                }
            }
        );

        return unsubscribe;
    }, [conversationId]);

    return typingUsers;
}

// Debounced typing emission
function useSendTypingIndicator(conversationId: string) {
    const lastSent = useRef(0);
    const isTyping = useRef(false);

    const sendTyping = useCallback(() =&gt; {
        const now = Date.now();
        // Only send every 2 seconds while typing
        if (now - lastSent.current &gt; 2000) {
            socketManager.send('typing', { conversationId, isTyping: true });
            lastSent.current = now;
            isTyping.current = true;
        }
    }, [conversationId]);

    const stopTyping = useCallback(() =&gt; {
        if (isTyping.current) {
            socketManager.send('typing', { conversationId, isTyping: false });
            isTyping.current = false;
        }
    }, [conversationId]);

    return { sendTyping, stopTyping };
}</code></pre>

            <h4>Presence System</h4>
            <pre><code>// services/PresenceService.ts
class PresenceService {
    private presenceCache: Map&lt;string, PresenceState&gt; = new Map();
    private heartbeatInterval: NodeJS.Timer | null = null;

    start() {
        // Send heartbeat every 30 seconds
        this.heartbeatInterval = setInterval(() =&gt; {
            socketManager.send('heartbeat', { timestamp: Date.now() });
        }, 30000);

        // Listen for presence updates
        socketManager.subscribe('presence', ({ userId, status, lastSeen }) =&gt; {
            this.presenceCache.set(userId, { status, lastSeen });
            this.notifySubscribers(userId);
        });
    }

    getPresence(userId: string): PresenceState {
        return this.presenceCache.get(userId) || {
            status: 'offline',
            lastSeen: null
        };
    }

    // Handle app state changes
    handleAppStateChange(state: AppStateStatus) {
        if (state === 'active') {
            socketManager.send('presence', { status: 'online' });
        } else if (state === 'background') {
            socketManager.send('presence', { status: 'away' });
        }
    }
}</code></pre>

            <h4>Read Receipts</h4>
            <pre><code>// hooks/useReadReceipts.ts
function useReadReceipts(conversationId: string) {
    const pendingReceipts = useRef&lt;string[]&gt;([]);
    const flushTimeout = useRef&lt;NodeJS.Timeout&gt;();

    // Batch read receipts for efficiency
    const markAsRead = useCallback((messageId: string) =&gt; {
        pendingReceipts.current.push(messageId);

        // Debounce: flush after 500ms of no new receipts
        if (flushTimeout.current) clearTimeout(flushTimeout.current);

        flushTimeout.current = setTimeout(() =&gt; {
            if (pendingReceipts.current.length &gt; 0) {
                socketManager.send('read_receipts', {
                    conversationId,
                    messageIds: [...pendingReceipts.current],
                });
                pendingReceipts.current = [];
            }
        }, 500);
    }, [conversationId]);

    // Mark visible messages as read
    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) =&gt; {
            viewableItems.forEach(item =&gt; {
                if (item.item.status !== 'read' &amp;&amp; item.item.senderId !== currentUserId) {
                    markAsRead(item.item.id);
                }
            });
        },
        [markAsRead]
    );

    return { markAsRead, onViewableItemsChanged };
}</code></pre>

            <h4>Chat Screen Integration</h4>
            <pre><code>function ChatScreen({ conversationId }) {
    const typingUsers = useTypingIndicator(conversationId);
    const { sendTyping, stopTyping } = useSendTypingIndicator(conversationId);
    const { onViewableItemsChanged } = useReadReceipts(conversationId);

    return (
        &lt;View style={styles.container}&gt;
            &lt;FlashList
                data={messages}
                renderItem={({ item }) =&gt; &lt;MessageBubble message={item} /&gt;}
                onViewableItemsChanged={onViewableItemsChanged}
                inverted
            /&gt;

            {typingUsers.length &gt; 0 &amp;&amp; (
                &lt;TypingIndicator users={typingUsers} /&gt;
            )}

            &lt;MessageInput
                onChangeText={sendTyping}
                onBlur={stopTyping}
                onSend={stopTyping}
            /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Debounce typing:</strong> Don't flood server with every keystroke</li>
                <li><strong>Batch receipts:</strong> Combine multiple read receipts</li>
                <li><strong>Handle reconnection:</strong> Resync state after disconnect</li>
                <li><strong>Privacy:</strong> Allow users to disable read receipts</li>
            </ul>
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
            <h4>Auction System Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                   AUCTION ARCHITECTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   Mobile    │    │   Server    │    │  Database   │ │
│  │   Client    │◄──►│  (Node.js)  │◄──►│ (Postgres)  │ │
│  └─────────────┘    └──────┬──────┘    └─────────────┘ │
│         │                  │                            │
│         │           ┌──────┴──────┐                     │
│         │           │    Redis    │                     │
│         │           │  (Pub/Sub)  │                     │
│         │           └──────┬──────┘                     │
│         │                  │                            │
│         └──────────────────┘                            │
│              WebSocket                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Auction State Machine</h4>
            <pre><code>// machines/auctionMachine.ts
import { createMachine, assign } from 'xstate';

interface AuctionContext {
    itemId: string;
    currentBid: number;
    highestBidderId: string | null;
    endTime: number;
    bidHistory: Bid[];
}

const auctionMachine = createMachine({
    id: 'auction',
    initial: 'idle',
    context: {
        itemId: '',
        currentBid: 0,
        highestBidderId: null,
        endTime: 0,
        bidHistory: [],
    },
    states: {
        idle: {
            on: { START: 'active' }
        },
        active: {
            on: {
                BID: {
                    actions: assign({
                        currentBid: (_, event) =&gt; event.amount,
                        highestBidderId: (_, event) =&gt; event.userId,
                        bidHistory: (context, event) =&gt; [
                            ...context.bidHistory,
                            { amount: event.amount, userId: event.userId, timestamp: Date.now() }
                        ],
                    }),
                    cond: (context, event) =&gt; event.amount &gt; context.currentBid,
                },
                EXTEND: {
                    actions: assign({
                        endTime: (context) =&gt; context.endTime + 30000, // +30 seconds
                    }),
                },
                END: 'ended',
            },
            invoke: {
                src: 'countdownTimer',
                onDone: 'ended',
            },
        },
        ended: {
            type: 'final',
            entry: 'notifyWinner',
        },
    },
});</code></pre>

            <h4>Real-Time Bid Updates</h4>
            <pre><code>// hooks/useAuction.ts
function useAuction(auctionId: string) {
    const [auction, setAuction] = useState&lt;AuctionState | null&gt;(null);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() =&gt; {
        // Subscribe to auction updates
        const unsubscribe = socketManager.subscribe(
            \`auction:\${auctionId}\`,
            (update: AuctionUpdate) =&gt; {
                setAuction(prev =&gt; ({
                    ...prev,
                    ...update,
                }));

                // Haptic feedback on new bid
                if (update.type === 'NEW_BID') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
            }
        );

        // Fetch initial state
        fetchAuctionState(auctionId).then(setAuction);

        return unsubscribe;
    }, [auctionId]);

    // Synchronized countdown
    useEffect(() =&gt; {
        if (!auction) return;

        const interval = setInterval(() =&gt; {
            const remaining = auction.endTime - Date.now();
            setTimeRemaining(Math.max(0, remaining));

            if (remaining &lt;= 0) {
                clearInterval(interval);
            }
        }, 100); // Update every 100ms for smooth countdown

        return () =&gt; clearInterval(interval);
    }, [auction?.endTime]);

    return { auction, timeRemaining };
}</code></pre>

            <h4>Optimistic Bid Placement</h4>
            <pre><code>// hooks/usePlaceBid.ts
function usePlaceBid(auctionId: string) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState&lt;string | null&gt;(null);

    const placeBid = async (amount: number) =&gt; {
        setIsPending(true);
        setError(null);

        // Optimistic update
        const optimisticBid = {
            amount,
            userId: currentUser.id,
            timestamp: Date.now(),
            status: 'pending',
        };

        // Show optimistic UI immediately
        updateLocalAuctionState(auctionId, optimisticBid);

        try {
            const result = await api.placeBid({
                auctionId,
                amount,
                // Include client timestamp for server validation
                clientTimestamp: Date.now(),
            });

            if (result.accepted) {
                // Bid was accepted - real update will come via WebSocket
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
                // Bid was outbid before it reached server
                setError(result.reason);
                revertOptimisticUpdate(auctionId);
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        } catch (err) {
            setError('Failed to place bid. Please try again.');
            revertOptimisticUpdate(auctionId);
        } finally {
            setIsPending(false);
        }
    };

    return { placeBid, isPending, error };
}</code></pre>

            <h4>Server-Side Bid Validation</h4>
            <pre><code>// server/auctionService.ts
class AuctionService {
    async placeBid(auctionId: string, userId: string, amount: number): Promise&lt;BidResult&gt; {
        // Use Redis transaction for atomic bid placement
        const result = await redis.watch(\`auction:\${auctionId}\`);

        const auction = await this.getAuction(auctionId);

        // Validate bid
        if (auction.status !== 'active') {
            return { accepted: false, reason: 'Auction has ended' };
        }

        if (amount &lt;= auction.currentBid) {
            return { accepted: false, reason: 'Bid must be higher than current bid' };
        }

        const minIncrement = this.getMinIncrement(auction.currentBid);
        if (amount &lt; auction.currentBid + minIncrement) {
            return { accepted: false, reason: \`Minimum increment is \${minIncrement}\` };
        }

        // Atomic update
        await redis.multi()
            .hset(\`auction:\${auctionId}\`, {
                currentBid: amount,
                highestBidderId: userId,
            })
            .exec();

        // Extend auction if bid in last 30 seconds
        if (auction.endTime - Date.now() &lt; 30000) {
            await this.extendAuction(auctionId, 30000);
        }

        // Broadcast to all participants
        await this.broadcastUpdate(auctionId, {
            type: 'NEW_BID',
            amount,
            userId,
            timestamp: Date.now(),
        });

        return { accepted: true };
    }
}</code></pre>

            <h4>Auction UI</h4>
            <pre><code>function AuctionScreen({ auctionId }) {
    const { auction, timeRemaining } = useAuction(auctionId);
    const { placeBid, isPending, error } = usePlaceBid(auctionId);
    const [bidAmount, setBidAmount] = useState('');

    const minBid = auction ? auction.currentBid + getMinIncrement(auction.currentBid) : 0;

    return (
        &lt;View style={styles.container}&gt;
            &lt;Image source={{ uri: auction?.imageUrl }} style={styles.image} /&gt;

            &lt;View style={styles.bidInfo}&gt;
                &lt;Text style={styles.currentBid}&gt;
                    Current Bid: ${auction?.currentBid.toLocaleString()}
                &lt;/Text&gt;

                &lt;CountdownTimer
                    timeRemaining={timeRemaining}
                    style={timeRemaining &lt; 30000 ? styles.urgentTimer : styles.timer}
                /&gt;
            &lt;/View&gt;

            &lt;BidHistory bids={auction?.bidHistory || []} /&gt;

            &lt;View style={styles.bidSection}&gt;
                &lt;TextInput
                    value={bidAmount}
                    onChangeText={setBidAmount}
                    keyboardType="numeric"
                    placeholder={\`Min: $\${minBid}\`}
                /&gt;

                &lt;Button
                    title={isPending ? 'Placing...' : 'Place Bid'}
                    onPress={() =&gt; placeBid(Number(bidAmount))}
                    disabled={isPending || Number(bidAmount) &lt; minBid}
                /&gt;
            &lt;/View&gt;

            {error &amp;&amp; &lt;Text style={styles.error}&gt;{error}&lt;/Text&gt;}
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Race conditions:</strong> Use Redis transactions for atomic updates</li>
                <li><strong>Clock sync:</strong> Use server time, not client time</li>
                <li><strong>Snipe protection:</strong> Extend auction on last-second bids</li>
                <li><strong>Feedback:</strong> Haptics and animations for engagement</li>
            </ul>
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
            <h4>Whiteboard Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│              COLLABORATIVE WHITEBOARD                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │                 Canvas Layer                        ││
│  │  ┌─────────────────────────────────────────────┐   ││
│  │  │         react-native-skia                   │   ││
│  │  │    (GPU-accelerated 2D graphics)            │   ││
│  │  └─────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │               Sync Layer (CRDT)                     ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────────────┐   ││
│  │  │  Yjs    │ │WebSocket│ │  Operation Queue    │   ││
│  │  └─────────┘ └─────────┘ └─────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Presence Layer                         ││
│  │  • User cursors                                     ││
│  │  • Selection highlights                             ││
│  │  • Active tool indicators                           ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Canvas Implementation with Skia</h4>
            <pre><code>import { Canvas, Path, useCanvasRef, Skia } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

function WhiteboardCanvas({ elements, onDraw }) {
    const canvasRef = useCanvasRef();
    const [currentPath, setCurrentPath] = useState&lt;SkPath | null&gt;(null);

    const panGesture = Gesture.Pan()
        .onStart((e) =&gt; {
            const path = Skia.Path.Make();
            path.moveTo(e.x, e.y);
            setCurrentPath(path);
        })
        .onUpdate((e) =&gt; {
            if (currentPath) {
                currentPath.lineTo(e.x, e.y);
                // Force re-render
                setCurrentPath(Skia.Path.MakeFromSVGString(currentPath.toSVGString()));
            }
        })
        .onEnd(() =&gt; {
            if (currentPath) {
                onDraw({
                    type: 'path',
                    data: currentPath.toSVGString(),
                    color: selectedColor,
                    strokeWidth: selectedWidth,
                });
                setCurrentPath(null);
            }
        });

    return (
        &lt;GestureDetector gesture={panGesture}&gt;
            &lt;Canvas ref={canvasRef} style={styles.canvas}&gt;
                {/* Render existing elements */}
                {elements.map((element) =&gt; (
                    &lt;WhiteboardElement key={element.id} element={element} /&gt;
                ))}

                {/* Render current drawing */}
                {currentPath &amp;&amp; (
                    &lt;Path
                        path={currentPath}
                        color={selectedColor}
                        style="stroke"
                        strokeWidth={selectedWidth}
                    /&gt;
                )}

                {/* Render other users' cursors */}
                {remoteCursors.map((cursor) =&gt; (
                    &lt;RemoteCursor key={cursor.userId} cursor={cursor} /&gt;
                ))}
            &lt;/Canvas&gt;
        &lt;/GestureDetector&gt;
    );
}</code></pre>

            <h4>CRDT-Based Sync with Yjs</h4>
            <pre><code>import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// Initialize Yjs document
const ydoc = new Y.Doc();
const yElements = ydoc.getArray&lt;WhiteboardElement&gt;('elements');

// Connect to sync server
const provider = new WebsocketProvider(
    'wss://sync.example.com',
    'whiteboard-room-123',
    ydoc
);

// Hook for React integration
function useWhiteboardSync(roomId: string) {
    const [elements, setElements] = useState&lt;WhiteboardElement[]&gt;([]);

    useEffect(() =&gt; {
        // Observe changes from all clients
        const observer = () =&gt; {
            setElements(yElements.toArray());
        };

        yElements.observe(observer);

        // Initial load
        setElements(yElements.toArray());

        return () =&gt; yElements.unobserve(observer);
    }, [roomId]);

    const addElement = useCallback((element: Omit&lt;WhiteboardElement, 'id'&gt;) =&gt; {
        const newElement = {
            ...element,
            id: generateId(),
            createdBy: currentUser.id,
            createdAt: Date.now(),
        };

        ydoc.transact(() =&gt; {
            yElements.push([newElement]);
        });
    }, []);

    const updateElement = useCallback((id: string, updates: Partial&lt;WhiteboardElement&gt;) =&gt; {
        ydoc.transact(() =&gt; {
            const index = yElements.toArray().findIndex(el =&gt; el.id === id);
            if (index !== -1) {
                const element = yElements.get(index);
                yElements.delete(index, 1);
                yElements.insert(index, [{ ...element, ...updates }]);
            }
        });
    }, []);

    const deleteElement = useCallback((id: string) =&gt; {
        ydoc.transact(() =&gt; {
            const index = yElements.toArray().findIndex(el =&gt; el.id === id);
            if (index !== -1) {
                yElements.delete(index, 1);
            }
        });
    }, []);

    return { elements, addElement, updateElement, deleteElement };
}</code></pre>

            <h4>User Presence &amp; Cursors</h4>
            <pre><code>// Awareness for user presence
const awareness = provider.awareness;

function usePresence() {
    const [remoteCursors, setRemoteCursors] = useState&lt;CursorState[]&gt;([]);

    useEffect(() =&gt; {
        const onChange = () =&gt; {
            const states: CursorState[] = [];

            awareness.getStates().forEach((state, clientId) =&gt; {
                if (clientId !== ydoc.clientID &amp;&amp; state.cursor) {
                    states.push({
                        ...state.cursor,
                        clientId,
                        user: state.user,
                    });
                }
            });

            setRemoteCursors(states);
        };

        awareness.on('change', onChange);
        return () =&gt; awareness.off('change', onChange);
    }, []);

    // Broadcast local cursor position
    const updateCursor = useCallback((x: number, y: number) =&gt; {
        awareness.setLocalStateField('cursor', {
            x,
            y,
            timestamp: Date.now(),
        });
    }, []);

    return { remoteCursors, updateCursor };
}

// Remote cursor component
function RemoteCursor({ cursor }: { cursor: CursorState }) {
    return (
        &lt;Group transform={[{ translateX: cursor.x }, { translateY: cursor.y }]}&gt;
            {/* Cursor arrow */}
            &lt;Path
                path="M0,0 L0,20 L5,15 L10,25 L15,23 L10,13 L18,10 Z"
                color={cursor.user.color}
            /&gt;

            {/* User name label */}
            &lt;RoundedRect x={20} y={5} width={80} height={20} r={4} color={cursor.user.color} /&gt;
            &lt;Text x={25} y={18} text={cursor.user.name} color="white" font={font} /&gt;
        &lt;/Group&gt;
    );
}</code></pre>

            <h4>Undo/Redo Stack</h4>
            <pre><code>import { UndoManager } from 'yjs';

const undoManager = new UndoManager(yElements, {
    trackedOrigins: new Set([ydoc.clientID]),
    captureTimeout: 500, // Group changes within 500ms
});

function useUndoRedo() {
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    useEffect(() =&gt; {
        const updateState = () =&gt; {
            setCanUndo(undoManager.canUndo());
            setCanRedo(undoManager.canRedo());
        };

        undoManager.on('stack-item-added', updateState);
        undoManager.on('stack-item-popped', updateState);

        return () =&gt; {
            undoManager.off('stack-item-added', updateState);
            undoManager.off('stack-item-popped', updateState);
        };
    }, []);

    return {
        canUndo,
        canRedo,
        undo: () =&gt; undoManager.undo(),
        redo: () =&gt; undoManager.redo(),
    };
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Conflict-free:</strong> CRDT ensures eventual consistency</li>
                <li><strong>Low latency:</strong> Optimistic local updates</li>
                <li><strong>Offline support:</strong> Changes sync when reconnected</li>
                <li><strong>Performance:</strong> Use Skia for 60fps rendering</li>
            </ul>
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
            <h4>Content Blocker Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│              CONTENT BLOCKER ARCHITECTURE                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │              React Native App                       ││
│  │  • Rule management UI                               ││
│  │  • Filter list subscriptions                        ││
│  │  • Statistics dashboard                             ││
│  └──────────────────────┬──────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │              Native Bridge                          ││
│  └──────────┬───────────────────────────┬──────────────┘│
│             │                           │                │
│  ┌──────────┴──────────┐    ┌──────────┴──────────────┐ │
│  │   iOS Extension     │    │   Android Service       │ │
│  │ (Content Blocker)   │    │ (VPN/Accessibility)     │ │
│  └─────────────────────┘    └─────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>iOS Safari Content Blocker</h4>
            <pre><code>// ios/ContentBlockerExtension/ContentBlockerRequestHandler.swift
import Foundation

class ContentBlockerRequestHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        // Load rules from shared container
        let sharedDefaults = UserDefaults(suiteName: "group.com.app.blocker")
        let rulesJSON = sharedDefaults?.string(forKey: "blockingRules") ?? "[]"

        let attachment = NSItemProvider(
            item: rulesJSON as NSSecureCoding,
            typeIdentifier: "public.json"
        )

        let item = NSExtensionItem()
        item.attachments = [attachment]
        context.completeRequest(returningItems: [item])
    }
}

// Rule format for Safari Content Blocker
/*
[
    {
        "trigger": {
            "url-filter": ".*\\.doubleclick\\.net.*",
            "resource-type": ["script", "image"]
        },
        "action": {
            "type": "block"
        }
    }
]
*/</code></pre>

            <h4>Native Module for Rule Management</h4>
            <pre><code>// ios/ContentBlockerModule.swift
import SafariServices

@objc(ContentBlockerModule)
class ContentBlockerModule: NSObject {
    @objc
    func updateRules(_ rules: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        // Save rules to shared container
        let sharedDefaults = UserDefaults(suiteName: "group.com.app.blocker")
        sharedDefaults?.set(rules, forKey: "blockingRules")

        // Notify Safari to reload rules
        SFContentBlockerManager.reloadContentBlocker(
            withIdentifier: "com.app.blocker.extension"
        ) { error in
            if let error = error {
                rejecter("RELOAD_FAILED", error.localizedDescription, error)
            } else {
                resolver(true)
            }
        }
    }

    @objc
    func getBlockerState(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        SFContentBlockerManager.getStateOfContentBlocker(
            withIdentifier: "com.app.blocker.extension"
        ) { state, error in
            if let state = state {
                resolver(["enabled": state.isEnabled])
            } else {
                rejecter("STATE_ERROR", error?.localizedDescription, error)
            }
        }
    }
}</code></pre>

            <h4>Android DNS-Based Blocking</h4>
            <pre><code>// android/app/src/main/java/com/app/DnsVpnService.kt
class DnsVpnService : VpnService() {
    private var vpnInterface: ParcelFileDescriptor? = null
    private val blockedDomains = mutableSetOf&lt;String&gt;()

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Load blocked domains
        loadBlockList()

        // Configure VPN
        val builder = Builder()
            .setSession("ContentBlocker")
            .addAddress("10.0.0.1", 32)
            .addDnsServer("10.0.0.2")
            .addRoute("0.0.0.0", 0)

        vpnInterface = builder.establish()

        // Start DNS proxy in background
        startDnsProxy()

        return START_STICKY
    }

    private fun startDnsProxy() {
        thread {
            val socket = DatagramSocket(53, InetAddress.getByName("10.0.0.2"))

            while (true) {
                val buffer = ByteArray(512)
                val packet = DatagramPacket(buffer, buffer.size)
                socket.receive(packet)

                val query = parseDnsQuery(packet.data)

                if (blockedDomains.contains(query.domain)) {
                    // Return empty response for blocked domains
                    sendBlockedResponse(socket, packet)
                } else {
                    // Forward to real DNS
                    forwardDnsQuery(socket, packet)
                }
            }
        }
    }
}</code></pre>

            <h4>React Native Bridge</h4>
            <pre><code>// src/native/ContentBlocker.ts
import { NativeModules, Platform } from 'react-native';

const { ContentBlockerModule } = NativeModules;

interface Rule {
    trigger: {
        urlFilter: string;
        resourceType?: string[];
    };
    action: {
        type: 'block' | 'css-display-none' | 'ignore-previous-rules';
        selector?: string;
    };
}

class ContentBlocker {
    async updateRules(rules: Rule[]): Promise&lt;void&gt; {
        const rulesJSON = JSON.stringify(
            rules.map(rule =&gt; ({
                trigger: {
                    'url-filter': rule.trigger.urlFilter,
                    'resource-type': rule.trigger.resourceType,
                },
                action: {
                    type: rule.action.type,
                    selector: rule.action.selector,
                },
            }))
        );

        await ContentBlockerModule.updateRules(rulesJSON);
    }

    async isEnabled(): Promise&lt;boolean&gt; {
        if (Platform.OS === 'ios') {
            const state = await ContentBlockerModule.getBlockerState();
            return state.enabled;
        }
        // Android: check VPN service status
        return ContentBlockerModule.isVpnActive();
    }

    async enable(): Promise&lt;void&gt; {
        if (Platform.OS === 'android') {
            await ContentBlockerModule.startVpnService();
        }
        // iOS: direct user to Settings
    }
}

export const contentBlocker = new ContentBlocker();</code></pre>

            <h4>Filter List Management</h4>
            <pre><code>// services/FilterListService.ts
interface FilterList {
    id: string;
    name: string;
    url: string;
    enabled: boolean;
    lastUpdated: number;
    ruleCount: number;
}

class FilterListService {
    private lists: FilterList[] = [];

    async updateLists(): Promise&lt;void&gt; {
        const enabledLists = this.lists.filter(l =&gt; l.enabled);
        const allRules: Rule[] = [];

        for (const list of enabledLists) {
            try {
                const response = await fetch(list.url);
                const text = await response.text();
                const rules = this.parseFilterList(text);
                allRules.push(...rules);

                list.lastUpdated = Date.now();
                list.ruleCount = rules.length;
            } catch (error) {
                console.error(\`Failed to update \${list.name}:\`, error);
            }
        }

        // iOS has 50,000 rule limit per extension
        const limitedRules = allRules.slice(0, 50000);
        await contentBlocker.updateRules(limitedRules);
    }

    private parseFilterList(text: string): Rule[] {
        return text
            .split('\n')
            .filter(line =&gt; line &amp;&amp; !line.startsWith('!'))
            .map(line =&gt; this.parseRule(line))
            .filter(Boolean) as Rule[];
    }
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>iOS limits:</strong> 50,000 rules per content blocker extension</li>
                <li><strong>Android:</strong> Requires VPN permission for system-wide blocking</li>
                <li><strong>Battery impact:</strong> Optimize rule matching algorithms</li>
                <li><strong>Updates:</strong> Background refresh for filter lists</li>
            </ul>
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
            <h4>Camera App Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                 CAMERA APP ARCHITECTURE                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │                Camera Preview                       ││
│  │  ┌─────────────────────────────────────────────┐   ││
│  │  │       react-native-vision-camera            │   ││
│  │  │  • 60fps preview                            │   ││
│  │  │  • Frame processor support                  │   ││
│  │  └─────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │              Frame Processor (Worklet)              ││
│  │  • Runs on separate thread                          ││
│  │  • GPU shader processing                            ││
│  │  • ML model inference                               ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │                Filter Pipeline                      ││
│  │  [Input] → [Filter 1] → [Filter 2] → [Output]      ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Vision Camera Setup</h4>
            <pre><code>import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { useSharedValue } from 'react-native-reanimated';

function CameraScreen() {
    const device = useCameraDevice('back');
    const [activeFilter, setActiveFilter] = useState&lt;FilterType&gt;('none');

    // Frame processor runs on every frame
    const frameProcessor = useFrameProcessor((frame) =&gt; {
        'worklet';

        // Apply filter based on selection
        switch (activeFilter) {
            case 'grayscale':
                applyGrayscaleFilter(frame);
                break;
            case 'sepia':
                applySepiaFilter(frame);
                break;
            case 'blur':
                applyBlurFilter(frame);
                break;
            case 'beauty':
                applyBeautyFilter(frame);
                break;
        }
    }, [activeFilter]);

    if (!device) return &lt;Text&gt;No camera available&lt;/Text&gt;;

    return (
        &lt;View style={styles.container}&gt;
            &lt;Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                video={true}
                frameProcessor={frameProcessor}
                frameProcessorFps={30}
            /&gt;

            &lt;FilterSelector
                activeFilter={activeFilter}
                onSelect={setActiveFilter}
            /&gt;

            &lt;CaptureButton onCapture={handleCapture} /&gt;
        &lt;/View&gt;
    );
}</code></pre>

            <h4>Frame Processor Plugins</h4>
            <pre><code>// plugins/GrayscaleFilter.ts
import { VisionCameraProxy, Frame } from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('grayscaleFilter');

export function applyGrayscaleFilter(frame: Frame): void {
    'worklet';
    if (plugin) {
        plugin.call(frame);
    }
}

// ios/GrayscaleFilterPlugin.swift
@objc(GrayscaleFilterPlugin)
class GrayscaleFilterPlugin: FrameProcessorPlugin {
    override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -&gt; Any? {
        guard let pixelBuffer = frame.pixelBuffer else { return nil }

        // Apply Core Image filter
        let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
        let filter = CIFilter(name: "CIPhotoEffectMono")!
        filter.setValue(ciImage, forKey: kCIInputImageKey)

        if let output = filter.outputImage {
            let context = CIContext()
            context.render(output, to: pixelBuffer)
        }

        return nil
    }
}</code></pre>

            <h4>GPU Shader Filters</h4>
            <pre><code>// For complex filters, use Metal/OpenGL shaders
// ios/BeautyFilterPlugin.swift

class BeautyFilterPlugin: FrameProcessorPlugin {
    private let metalDevice: MTLDevice
    private let commandQueue: MTLCommandQueue
    private let computePipeline: MTLComputePipelineState

    override init() {
        metalDevice = MTLCreateSystemDefaultDevice()!
        commandQueue = metalDevice.makeCommandQueue()!

        // Load beauty filter shader
        let library = metalDevice.makeDefaultLibrary()!
        let kernelFunction = library.makeFunction(name: "beautyFilter")!
        computePipeline = try! metalDevice.makeComputePipelineState(function: kernelFunction)
    }

    override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -&gt; Any? {
        guard let pixelBuffer = frame.pixelBuffer else { return nil }

        // Create Metal texture from pixel buffer
        var textureRef: CVMetalTexture?
        CVMetalTextureCacheCreateTextureFromImage(
            nil, textureCache, pixelBuffer, nil,
            .bgra8Unorm, CVPixelBufferGetWidth(pixelBuffer),
            CVPixelBufferGetHeight(pixelBuffer), 0, &amp;textureRef
        )

        guard let texture = CVMetalTextureGetTexture(textureRef!) else { return nil }

        // Apply shader
        let commandBuffer = commandQueue.makeCommandBuffer()!
        let encoder = commandBuffer.makeComputeCommandEncoder()!

        encoder.setComputePipelineState(computePipeline)
        encoder.setTexture(texture, index: 0)
        encoder.dispatchThreadgroups(/* ... */)
        encoder.endEncoding()

        commandBuffer.commit()
        commandBuffer.waitUntilCompleted()

        return nil
    }
}

// Beauty filter shader (Metal)
/*
kernel void beautyFilter(
    texture2d&lt;float, access::read_write&gt; image [[texture(0)]],
    uint2 gid [[thread_position_in_grid]]
) {
    float4 color = image.read(gid);

    // Skin smoothing with bilateral filter
    float4 smoothed = bilateralFilter(image, gid, 5.0, 0.1);

    // Preserve edges
    float edge = detectEdge(image, gid);
    float4 result = mix(smoothed, color, edge);

    // Slight brightness boost
    result.rgb = result.rgb * 1.05;

    image.write(result, gid);
}
*/</code></pre>

            <h4>Capture with Filter Applied</h4>
            <pre><code>// Capture photo with current filter
async function captureWithFilter(camera: Camera, filter: FilterType): Promise&lt;string&gt; {
    // Take photo without filter
    const photo = await camera.takePhoto({
        qualityPrioritization: 'quality',
    });

    // Apply filter in post-processing
    const processedUri = await applyFilterToImage(photo.path, filter);

    return processedUri;
}

// services/ImageProcessor.ts
async function applyFilterToImage(imagePath: string, filter: FilterType): Promise&lt;string&gt; {
    // Use expo-image-manipulator or native processing
    const manipulateResult = await ImageManipulator.manipulateAsync(
        imagePath,
        [
            // Apply filter-specific transformations
            ...(filter === 'grayscale' ? [{ grayscale: true }] : []),
        ],
        { compress: 0.9, format: SaveFormat.JPEG }
    );

    return manipulateResult.uri;
}</code></pre>

            <h4>Filter Selector UI</h4>
            <pre><code>function FilterSelector({ activeFilter, onSelect }) {
    const filters: FilterType[] = ['none', 'grayscale', 'sepia', 'vivid', 'beauty', 'vintage'];

    return (
        &lt;ScrollView horizontal style={styles.filterScroll}&gt;
            {filters.map((filter) =&gt; (
                &lt;Pressable
                    key={filter}
                    onPress={() =&gt; onSelect(filter)}
                    style={[
                        styles.filterButton,
                        activeFilter === filter &amp;&amp; styles.activeFilter,
                    ]}
                &gt;
                    &lt;FilterPreview filter={filter} /&gt;
                    &lt;Text&gt;{filter}&lt;/Text&gt;
                &lt;/Pressable&gt;
            ))}
        &lt;/ScrollView&gt;
    );
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Performance:</strong> Use GPU for real-time processing</li>
                <li><strong>Battery:</strong> Reduce frame processor FPS when possible</li>
                <li><strong>Memory:</strong> Reuse buffers, avoid allocations in frame processor</li>
                <li><strong>Worklets:</strong> Frame processors run on separate JS thread</li>
            </ul>
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
            <h4>Location Tracking Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│           BATTERY-EFFICIENT LOCATION TRACKING            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  TRACKING MODES                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ HIGH ACCURACY    │ GPS + Cell + WiFi  │ 5-10m      ││
│  │ BALANCED         │ Cell + WiFi        │ 50-100m    ││
│  │ LOW POWER        │ Cell only          │ 500m+      ││
│  │ SIGNIFICANT      │ Only major moves   │ 500m+      ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  BATTERY OPTIMIZATION STRATEGIES                        │
│  • Use geofences instead of continuous tracking         │
│  • Batch location updates                               │
│  • Adaptive accuracy based on speed/activity            │
│  • Defer uploads until WiFi/charging                    │
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>iOS Background Location</h4>
            <pre><code>// ios/LocationService.swift
import CoreLocation

class LocationService: NSObject, CLLocationManagerDelegate {
    private let locationManager = CLLocationManager()
    private var locationBuffer: [CLLocation] = []

    func startSignificantLocationMonitoring() {
        locationManager.delegate = self
        locationManager.requestAlwaysAuthorization()

        // Most battery-efficient option
        locationManager.startMonitoringSignificantLocationChanges()

        // Also set up geofences for key areas
        setupGeofences()
    }

    func startContinuousTracking(accuracy: LocationAccuracy) {
        locationManager.desiredAccuracy = accuracy.clAccuracy
        locationManager.distanceFilter = accuracy.distanceFilter
        locationManager.allowsBackgroundLocationUpdates = true
        locationManager.pausesLocationUpdatesAutomatically = true

        locationManager.startUpdatingLocation()
    }

    private func setupGeofences() {
        // Monitor entry/exit of important regions
        let regions = [
            CLCircularRegion(center: homeCoordinate, radius: 100, identifier: "home"),
            CLCircularRegion(center: workCoordinate, radius: 100, identifier: "work"),
        ]

        regions.forEach { region in
            region.notifyOnEntry = true
            region.notifyOnExit = true
            locationManager.startMonitoring(for: region)
        }
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // Buffer locations for batch upload
        locationBuffer.append(contentsOf: locations)

        // Upload when buffer is full or significant time passed
        if locationBuffer.count &gt;= 10 || shouldFlushBuffer() {
            uploadLocations(locationBuffer)
            locationBuffer.removeAll()
        }
    }

    func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
        // Handle geofence entry
        NotificationCenter.default.post(name: .didEnterRegion, object: region)
    }
}</code></pre>

            <h4>Android Foreground Service</h4>
            <pre><code>// android/LocationTrackingService.kt
class LocationTrackingService : Service() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private val locationBuffer = mutableListOf&lt;Location&gt;()

    override fun onCreate() {
        super.onCreate()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        // Required for Android 8+ background location
        startForeground(NOTIFICATION_ID, createNotification())
    }

    fun startTracking(accuracy: LocationAccuracy) {
        val request = LocationRequest.Builder(
            accuracy.priority,
            accuracy.intervalMillis
        ).apply {
            setMinUpdateDistanceMeters(accuracy.minDistance)
            setWaitForAccurateLocation(false)
        }.build()

        fusedLocationClient.requestLocationUpdates(
            request,
            locationCallback,
            Looper.getMainLooper()
        )
    }

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult) {
            result.locations.forEach { location -&gt;
                locationBuffer.add(location)

                // Batch upload
                if (locationBuffer.size &gt;= 10) {
                    uploadLocations(locationBuffer.toList())
                    locationBuffer.clear()
                }
            }
        }
    }

    // Use WorkManager for deferred uploads
    private fun scheduleUpload() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.UNMETERED) // WiFi only
            .setRequiresCharging(true) // While charging
            .build()

        val uploadWork = OneTimeWorkRequestBuilder&lt;LocationUploadWorker&gt;()
            .setConstraints(constraints)
            .build()

        WorkManager.getInstance(this).enqueue(uploadWork)
    }
}</code></pre>

            <h4>React Native Integration</h4>
            <pre><code>// hooks/useLocationTracking.ts
import { useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK = 'background-location-task';

// Define background task
TaskManager.defineTask(LOCATION_TASK, ({ data, error }) =&gt; {
    if (error) {
        console.error(error);
        return;
    }

    const { locations } = data as { locations: Location.LocationObject[] };

    // Process locations in background
    locations.forEach(location =&gt; {
        saveLocationLocally(location);
    });
});

function useLocationTracking() {
    const [isTracking, setIsTracking] = useState(false);

    const startTracking = useCallback(async (mode: TrackingMode) =&gt; {
        const { status } = await Location.requestBackgroundPermissionsAsync();

        if (status !== 'granted') {
            throw new Error('Background location permission required');
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
            accuracy: mode === 'high'
                ? Location.Accuracy.High
                : Location.Accuracy.Balanced,
            distanceInterval: mode === 'high' ? 10 : 100,
            timeInterval: mode === 'high' ? 5000 : 30000,
            // iOS specific
            activityType: Location.ActivityType.AutomotiveNavigation,
            showsBackgroundLocationIndicator: true,
            // Android specific
            foregroundService: {
                notificationTitle: 'Location Tracking',
                notificationBody: 'Tracking your location in background',
            },
        });

        setIsTracking(true);
    }, []);

    const stopTracking = useCallback(async () =&gt; {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK);
        setIsTracking(false);
    }, []);

    return { isTracking, startTracking, stopTracking };
}</code></pre>

            <h4>Adaptive Accuracy</h4>
            <pre><code>// services/AdaptiveLocationService.ts
class AdaptiveLocationService {
    private currentMode: TrackingMode = 'balanced';

    async adjustAccuracyBasedOnActivity() {
        // Check device motion/activity
        const activity = await getDeviceActivity();

        switch (activity) {
            case 'driving':
                // High frequency updates while moving fast
                this.setMode('high');
                break;

            case 'walking':
                // Medium frequency
                this.setMode('balanced');
                break;

            case 'stationary':
                // Switch to geofence-only mode
                this.setMode('geofence');
                break;
        }
    }

    async adjustBasedOnBattery() {
        const batteryLevel = await Battery.getBatteryLevelAsync();

        if (batteryLevel &lt; 0.2) {
            // Low battery - minimal tracking
            this.setMode('significant');
        } else if (batteryLevel &lt; 0.5) {
            // Medium battery - reduce accuracy
            this.setMode('balanced');
        }
    }

    private setMode(mode: TrackingMode) {
        if (this.currentMode === mode) return;

        this.currentMode = mode;
        // Restart tracking with new settings
        locationTracking.stopTracking();
        locationTracking.startTracking(mode);
    }
}</code></pre>

            <h4>Battery Impact Monitoring</h4>
            <pre><code>// Monitor battery drain from location tracking
async function measureBatteryImpact() {
    const startLevel = await Battery.getBatteryLevelAsync();
    const startTime = Date.now();

    // After tracking period
    const endLevel = await Battery.getBatteryLevelAsync();
    const duration = (Date.now() - startTime) / 3600000; // hours

    const drainPerHour = (startLevel - endLevel) / duration;

    // Log for analytics
    analytics.track('location_battery_impact', {
        drainPerHour,
        trackingMode: currentMode,
        locationCount: locationsCollected,
    });

    // Warn user if drain is excessive
    if (drainPerHour &gt; 0.1) { // &gt;10% per hour
        showBatteryWarning();
    }
}</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Permissions:</strong> Request "Always" permission only when needed</li>
                <li><strong>User control:</strong> Easy toggle for tracking modes</li>
                <li><strong>Transparency:</strong> Show battery impact in app</li>
                <li><strong>Deferred uploads:</strong> Batch and upload on WiFi/charging</li>
            </ul>
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
            <h4>Deep Linking Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────┐
│                DEEP LINKING ARCHITECTURE                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  LINK TYPES                                             │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Custom Scheme    │ myapp://product/123              ││
│  │ Universal Links  │ example.com/product/123 (iOS)   ││
│  │ App Links        │ example.com/product/123 (Android)││
│  │ Deferred         │ Stored for post-install          ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  HANDLING FLOW                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Link Received → Parse → Auth Check → Navigate       ││
│  │      │             │          │           │          ││
│  │      ▼             ▼          ▼           ▼          ││
│  │   Store if    Extract    If needed,   Navigate      ││
│  │   deferred    params     defer link   to screen     ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘</code></pre>

            <h4>Deep Link Handler</h4>
            <pre><code>// services/DeepLinkService.ts
import { Linking } from 'react-native';
import { parse } from 'url';

interface DeepLink {
    path: string;
    params: Record&lt;string, string&gt;;
    requiresAuth: boolean;
}

class DeepLinkService {
    private pendingLink: DeepLink | null = null;
    private isAuthenticated = false;

    constructor() {
        // Handle links when app is already open
        Linking.addEventListener('url', this.handleUrl);

        // Handle initial link (app opened via link)
        this.checkInitialLink();
    }

    private async checkInitialLink() {
        const url = await Linking.getInitialURL();
        if (url) {
            this.handleUrl({ url });
        }
    }

    private handleUrl = ({ url }: { url: string }) =&gt; {
        const deepLink = this.parseDeepLink(url);

        if (deepLink.requiresAuth &amp;&amp; !this.isAuthenticated) {
            // Store for after authentication
            this.pendingLink = deepLink;
            // Navigate to login
            navigate('Login', { returnTo: deepLink.path });
        } else {
            this.navigateToLink(deepLink);
        }
    };

    parseDeepLink(url: string): DeepLink {
        const parsed = parse(url, true);
        const path = parsed.pathname || '/';
        const params = parsed.query as Record&lt;string, string&gt;;

        // Define which routes require auth
        const authRequiredPaths = ['/profile', '/orders', '/settings'];
        const requiresAuth = authRequiredPaths.some(p =&gt; path.startsWith(p));

        return { path, params, requiresAuth };
    }

    navigateToLink(link: DeepLink) {
        const { path, params } = link;

        // Route mapping
        const routes: Record&lt;string, () =&gt; void&gt; = {
            '/product/:id': () =&gt; navigate('Product', { id: params.id }),
            '/category/:slug': () =&gt; navigate('Category', { slug: params.slug }),
            '/order/:id': () =&gt; navigate('OrderDetail', { orderId: params.id }),
            '/profile': () =&gt; navigate('Profile'),
            '/settings': () =&gt; navigate('Settings'),
        };

        // Match route pattern
        for (const [pattern, handler] of Object.entries(routes)) {
            if (matchPath(path, pattern, params)) {
                handler();
                return;
            }
        }

        // Fallback to home
        navigate('Home');
    }

    // Called after successful authentication
    onAuthenticated() {
        this.isAuthenticated = true;

        if (this.pendingLink) {
            this.navigateToLink(this.pendingLink);
            this.pendingLink = null;
        }
    }
}</code></pre>

            <h4>iOS Universal Links Setup</h4>
            <pre><code>// apple-app-site-association (hosted at example.com/.well-known/)
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "TEAMID.com.example.app",
                "paths": [
                    "/product/*",
                    "/category/*",
                    "/order/*",
                    "/invite/*"
                ]
            }
        ]
    }
}

// ios/Info.plist
&lt;key&gt;com.apple.developer.associated-domains&lt;/key&gt;
&lt;array&gt;
    &lt;string&gt;applinks:example.com&lt;/string&gt;
    &lt;string&gt;applinks:www.example.com&lt;/string&gt;
&lt;/array&gt;</code></pre>

            <h4>Android App Links Setup</h4>
            <pre><code>// assetlinks.json (hosted at example.com/.well-known/)
[
    {
        "relation": ["delegate_permission/common.handle_all_urls"],
        "target": {
            "namespace": "android_app",
            "package_name": "com.example.app",
            "sha256_cert_fingerprints": [
                "SHA256:..."
            ]
        }
    }
]

// android/app/src/main/AndroidManifest.xml
&lt;activity&gt;
    &lt;intent-filter android:autoVerify="true"&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;category android:name="android.intent.category.BROWSABLE" /&gt;
        &lt;data android:scheme="https" android:host="example.com" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>

            <h4>Deferred Deep Links</h4>
            <pre><code>// services/DeferredDeepLinkService.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'deferred-links' });

class DeferredDeepLinkService {
    // Store link when user doesn't have app installed
    // (Called from website before redirect to app store)
    static async storeOnServer(link: string, fingerprint: string) {
        await api.post('/deferred-link', {
            link,
            fingerprint,
            timestamp: Date.now(),
        });
    }

    // Check for deferred link on first app launch
    async checkDeferredLink(): Promise&lt;string | null&gt; {
        // Skip if not first launch
        if (storage.getBoolean('deferred_checked')) {
            return null;
        }

        try {
            // Get device fingerprint
            const fingerprint = await this.getDeviceFingerprint();

            // Check server for matching deferred link
            const response = await api.get('/deferred-link', {
                params: { fingerprint },
            });

            storage.set('deferred_checked', true);

            if (response.data?.link) {
                return response.data.link;
            }
        } catch (error) {
            console.error('Deferred link check failed:', error);
        }

        return null;
    }

    private async getDeviceFingerprint(): Promise&lt;string&gt; {
        // Combine device identifiers for matching
        const deviceId = await Application.getIosIdForVendorAsync();
        const installTime = await Application.getInstallationTimeAsync();

        return \`\${deviceId}-\${installTime.getTime()}\`;
    }
}

// Usage in App initialization
async function initializeApp() {
    // Check for deferred deep link
    const deferredLink = await deferredDeepLinkService.checkDeferredLink();

    if (deferredLink) {
        deepLinkService.handleUrl({ url: deferredLink });
    }
}</code></pre>

            <h4>React Navigation Integration</h4>
            <pre><code>// navigation/linking.ts
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions&lt;RootStackParamList&gt; = {
    prefixes: [
        'myapp://',
        'https://example.com',
        'https://www.example.com',
    ],
    config: {
        screens: {
            Home: '',
            Product: 'product/:id',
            Category: 'category/:slug',
            OrderDetail: 'order/:id',
            Profile: 'profile',
            Settings: 'settings',
            // Nested navigators
            MainTabs: {
                screens: {
                    Shop: 'shop',
                    Cart: 'cart',
                    Account: 'account',
                },
            },
        },
    },
    // Custom link handling
    getStateFromPath: (path, config) =&gt; {
        // Check if link requires authentication
        const requiresAuth = authRequiredPaths.some(p =&gt; path.startsWith(p));

        if (requiresAuth &amp;&amp; !isAuthenticated()) {
            // Return login state with return path
            return {
                routes: [
                    { name: 'Login', params: { returnTo: path } },
                ],
            };
        }

        // Default behavior
        return getStateFromPath(path, config);
    },
};</code></pre>

            <h4>Key Considerations</h4>
            <ul>
                <li><strong>Auth handling:</strong> Defer links requiring authentication</li>
                <li><strong>Deep link validation:</strong> Validate params before navigation</li>
                <li><strong>Analytics:</strong> Track deep link attribution</li>
                <li><strong>Testing:</strong> Test all link scenarios thoroughly</li>
            </ul>
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
            &lt;h4&gt;Conditional Navigation Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│            CONDITIONAL NAVIGATION FLOW                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  App Launch                                             │
│      │                                                   │
│      ▼                                                   │
│  ┌──────────┐  No   ┌──────────────────────────────┐   │
│  │Has Token?├──────►│     Unauthenticated Stack     │   │
│  └────┬─────┘       │  • Login                      │   │
│       │ Yes         │  • Register                   │   │
│       ▼             │  • ForgotPassword             │   │
│  ┌──────────┐       └──────────────────────────────┘   │
│  │Onboarded?│ No   ┌──────────────────────────────┐    │
│  └────┬─────┼─────►│      Onboarding Stack         │   │
│       │ Yes        │  • Welcome                    │   │
│       ▼            │  • Permissions                │   │
│  ┌──────────┐      │  • Preferences                │   │
│  │Verified? │      └──────────────────────────────┘   │
│  └────┬─────┘ No   ┌──────────────────────────────┐    │
│       │     └─────►│     Verification Stack        │   │
│       │ Yes        │  • VerifyEmail                │   │
│       ▼            │  • VerifyPhone                │   │
│  ┌──────────────┐  └──────────────────────────────┘   │
│  │ Main App     │                                      │
│  │ TabNavigator │                                      │
│  └──────────────┘                                      │
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Navigation Container with State&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// navigation/RootNavigator.tsx
function RootNavigator() {
    const { isAuthenticated, isOnboarded, isVerified, isLoading } = useAuth();

    if (isLoading) {
        return &amp;lt;SplashScreen /&amp;gt;;
    }

    return (
        &amp;lt;NavigationContainer&amp;gt;
            &amp;lt;Stack.Navigator screenOptions={{ headerShown: false }}&amp;gt;
                {!isAuthenticated ? (
                    &amp;lt;Stack.Screen name="Auth" component={AuthStack} /&amp;gt;
                ) : !isOnboarded ? (
                    &amp;lt;Stack.Screen name="Onboarding" component={OnboardingStack} /&amp;gt;
                ) : !isVerified ? (
                    &amp;lt;Stack.Screen name="Verification" component={VerificationStack} /&amp;gt;
                ) : (
                    &amp;lt;Stack.Screen name="Main" component={MainTabNavigator} /&amp;gt;
                )}
            &amp;lt;/Stack.Navigator&amp;gt;
        &amp;lt;/NavigationContainer&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Auth Context with Persistence&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// context/AuthContext.tsx
export function AuthProvider({ children }) {
    const [state, setState] = useState({
        isAuthenticated: false,
        isOnboarded: false,
        isVerified: false,
        user: null,
        isLoading: true,
    });

    useEffect(() =&amp;gt; {
        async function restoreAuth() {
            try {
                const token = await SecureStore.getItemAsync('auth_token');
                const userJSON = await SecureStore.getItemAsync('user');

                if (token &amp;amp;&amp;amp; userJSON) {
                    const user = JSON.parse(userJSON);
                    const isValid = await api.validateToken(token);

                    if (isValid) {
                        setState({
                            isAuthenticated: true,
                            isOnboarded: user.onboardedAt !== null,
                            isVerified: user.emailVerifiedAt !== null,
                            user,
                            isLoading: false,
                        });
                        return;
                    }
                }
            } catch (error) {
                console.error('Auth restore failed:', error);
            }
            setState(prev =&amp;gt; ({ ...prev, isLoading: false }));
        }
        restoreAuth();
    }, []);

    const login = async (credentials) =&amp;gt; {
        const { token, user } = await api.login(credentials);
        await SecureStore.setItemAsync('auth_token', token);
        await SecureStore.setItemAsync('user', JSON.stringify(user));
        setState({
            isAuthenticated: true,
            isOnboarded: user.onboardedAt !== null,
            isVerified: user.emailVerifiedAt !== null,
            user,
            isLoading: false,
        });
    };

    return (
        &amp;lt;AuthContext.Provider value={{ ...state, login }}&amp;gt;
            {children}
        &amp;lt;/AuthContext.Provider&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Protected Route Hook&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;function useProtectedRoute(requiredState) {
    const navigation = useNavigation();
    const { isAuthenticated, isOnboarded, isVerified } = useAuth();

    useEffect(() =&amp;gt; {
        if (requiredState.authenticated &amp;amp;&amp;amp; !isAuthenticated) {
            navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
            return;
        }
        if (requiredState.onboarded &amp;amp;&amp;amp; !isOnboarded) {
            navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
            return;
        }
        if (requiredState.verified &amp;amp;&amp;amp; !isVerified) {
            navigation.reset({ index: 0, routes: [{ name: 'Verification' }] });
        }
    }, [isAuthenticated, isOnboarded, isVerified]);
}

// Usage in protected screens
function ProfileScreen() {
    useProtectedRoute({ authenticated: true, verified: true });
    return &amp;lt;View&amp;gt;{/* Profile content */}&amp;lt;/View&amp;gt;;
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Persistence:&lt;/strong&gt; Save and restore navigation state&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Deep links:&lt;/strong&gt; Handle auth requirements gracefully&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Transitions:&lt;/strong&gt; Smooth animations between states&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Testing:&lt;/strong&gt; Test all conditional paths&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Upload System Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│                 UPLOAD SYSTEM ARCHITECTURE               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │                   Upload Queue                      ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ││
│  │  │ File 1  │ │ File 2  │ │ File 3  │ │ File 4  │  ││
│  │  │ 75%     │ │ Queued  │ │ Queued  │ │ Failed  │  ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘  ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │              Upload Manager                          ││
│  │  • Concurrent upload limit (3)                       ││
│  │  • Retry with exponential backoff                    ││
│  │  • Resume interrupted uploads                        ││
│  │  • Background upload support                         ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Upload Queue Manager&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;class UploadManager extends EventEmitter {
    private queue = [];
    private activeUploads = new Map();
    private maxConcurrent = 3;

    async addToQueue(files) {
        const tasks = files.map(file =&amp;gt; ({
            id: generateUUID(),
            uri: file.uri,
            fileName: file.fileName,
            status: 'queued',
            progress: 0,
            retryCount: 0,
        }));
        this.queue.push(...tasks);
        this.persistQueue();
        this.processQueue();
        return tasks.map(t =&amp;gt; t.id);
    }

    private async processQueue() {
        const activeCount = this.activeUploads.size;
        const available = this.maxConcurrent - activeCount;
        if (available &amp;lt;= 0) return;

        const pending = this.queue
            .filter(t =&amp;gt; t.status === 'queued')
            .slice(0, available);

        for (const task of pending) {
            this.uploadFile(task);
        }
    }

    private async uploadFile(task) {
        const controller = new AbortController();
        this.activeUploads.set(task.id, controller);
        task.status = 'uploading';

        try {
            const { uploadUrl } = await api.getUploadUrl(task);
            await this.uploadWithProgress(task, uploadUrl, controller.signal);
            task.status = 'completed';
            this.emit('completed', task);
        } catch (error) {
            task.status = 'failed';
            task.retryCount++;
            if (task.retryCount &amp;lt; 3) {
                const delay = Math.pow(2, task.retryCount) * 1000;
                setTimeout(() =&amp;gt; {
                    task.status = 'queued';
                    this.processQueue();
                }, delay);
            }
        } finally {
            this.activeUploads.delete(task.id);
            this.processQueue();
        }
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Upload Progress UI&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;function UploadProgress({ taskId }) {
    const [task, setTask] = useState(null);

    useEffect(() =&amp;gt; {
        const unsub = uploadManager.on('progress', (t) =&amp;gt; {
            if (t.id === taskId) setTask({ ...t });
        });
        return unsub;
    }, [taskId]);

    if (!task) return null;

    return (
        &amp;lt;View style={styles.container}&amp;gt;
            &amp;lt;Text&amp;gt;{task.fileName}&amp;lt;/Text&amp;gt;
            &amp;lt;View style={styles.progressBar}&amp;gt;
                &amp;lt;View style={[styles.progress, { width: task.progress + '%' }]} /&amp;gt;
            &amp;lt;/View&amp;gt;
            &amp;lt;Text&amp;gt;{task.progress}%&amp;lt;/Text&amp;gt;
            {task.status === 'failed' &amp;amp;&amp;amp; (
                &amp;lt;Pressable onPress={() =&amp;gt; uploadManager.retryUpload(taskId)}&amp;gt;
                    &amp;lt;Text&amp;gt;Retry&amp;lt;/Text&amp;gt;
                &amp;lt;/Pressable&amp;gt;
            )}
        &amp;lt;/View&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Chunked upload:&lt;/strong&gt; Use multipart for files &gt;5MB&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Resume:&lt;/strong&gt; Track uploaded chunks for resumable uploads&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Compression:&lt;/strong&gt; Compress images/videos before upload&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Background:&lt;/strong&gt; Use native background upload APIs&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Video Streaming Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│               VIDEO STREAMING ARCHITECTURE               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │                Video Player                         ││
│  │  • HLS/DASH playback                                ││
│  │  • Adaptive bitrate                                 ││
│  │  • DRM support                                      ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │           Adaptive Bitrate Controller               ││
│  │  • Monitor network bandwidth                        ││
│  │  • Buffer health tracking                           ││
│  │  • Quality switching logic                          ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Video Player Setup&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import Video from 'react-native-video';

function AdaptiveVideoPlayer({ source, poster }) {
    const videoRef = useRef(null);
    const [quality, setQuality] = useState('auto');
    const [isBuffering, setIsBuffering] = useState(false);

    return (
        &amp;lt;View style={styles.container}&amp;gt;
            &amp;lt;Video
                ref={videoRef}
                source={{ uri: source.uri, type: 'm3u8' }}
                style={styles.video}
                poster={poster}
                resizeMode="contain"
                onBuffer={({ isBuffering }) =&amp;gt; setIsBuffering(isBuffering)}
                automaticallyWaitsToMinimizeStalling={true}
                preferredForwardBufferDuration={30}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                }}
                selectedVideoTrack={
                    quality === 'auto'
                        ? { type: 'auto' }
                        : { type: 'resolution', value: parseInt(quality) }
                }
            /&amp;gt;
            {isBuffering &amp;amp;&amp;amp; &amp;lt;ActivityIndicator style={styles.loader} /&amp;gt;}
            &amp;lt;QualitySelector quality={quality} onSelect={setQuality} /&amp;gt;
        &amp;lt;/View&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Quality Selector&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;const QUALITIES = ['auto', '1080', '720', '480', '360'];

function QualitySelector({ quality, onSelect }) {
    return (
        &amp;lt;View style={styles.selector}&amp;gt;
            {QUALITIES.map(q =&amp;gt; (
                &amp;lt;Pressable
                    key={q}
                    onPress={() =&amp;gt; onSelect(q)}
                    style={[styles.option, quality === q &amp;amp;&amp;amp; styles.active]}
                &amp;gt;
                    &amp;lt;Text&amp;gt;{q === 'auto' ? 'Auto' : q + 'p'}&amp;lt;/Text&amp;gt;
                &amp;lt;/Pressable&amp;gt;
            ))}
        &amp;lt;/View&amp;gt;
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Adaptive:&lt;/strong&gt; Let player auto-select quality based on bandwidth&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Buffering:&lt;/strong&gt; Configure buffer sizes for smooth playback&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Offline:&lt;/strong&gt; Download specific quality for offline viewing&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;DRM:&lt;/strong&gt; FairPlay (iOS) / Widevine (Android) for protected content&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Authentication Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│              SECURE AUTHENTICATION FLOW                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  LOGIN FLOW                                             │
│  Email/Password → Server Auth → Access + Refresh Tokens │
│                                                          │
│  BIOMETRIC UNLOCK                                       │
│  Biometric Auth → Unlock Keychain → Access Token        │
│                                                          │
│  TOKEN REFRESH                                          │
│  Access Expired → Use Refresh Token → New Access        │
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Secure Token Storage&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import * as Keychain from 'react-native-keychain';

class SecureStorage {
    async storeTokens(accessToken, refreshToken) {
        await Keychain.setGenericPassword(
            'auth_tokens',
            JSON.stringify({ accessToken, refreshToken }),
            {
                accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
                securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
            }
        );
    }

    async getTokens() {
        try {
            const credentials = await Keychain.getGenericPassword({
                authenticationPrompt: {
                    title: 'Authenticate',
                    subtitle: 'Unlock to access your account',
                },
            });
            if (credentials) {
                return JSON.parse(credentials.password);
            }
        } catch (error) {
            console.error('Failed to get tokens:', error);
        }
        return null;
    }

    async clearTokens() {
        await Keychain.resetGenericPassword();
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Token Refresh Interceptor&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;class ApiClient {
    private isRefreshing = false;
    private refreshSubscribers = [];

    setupInterceptors() {
        this.client.interceptors.response.use(
            (response) =&amp;gt; response,
            async (error) =&amp;gt; {
                const originalRequest = error.config;

                if (error.response?.status === 401 &amp;amp;&amp;amp; !originalRequest._retry) {
                    if (this.isRefreshing) {
                        return new Promise((resolve) =&amp;gt; {
                            this.refreshSubscribers.push((token) =&amp;gt; {
                                originalRequest.headers.Authorization = 'Bearer ' + token;
                                resolve(this.client(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshToken();
                        this.refreshSubscribers.forEach((cb) =&amp;gt; cb(newToken));
                        this.refreshSubscribers = [];
                        originalRequest.headers.Authorization = 'Bearer ' + newToken;
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        await this.logout();
                        throw refreshError;
                    } finally {
                        this.isRefreshing = false;
                    }
                }
                return Promise.reject(error);
            }
        );
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;PKCE:&lt;/strong&gt; Use for OAuth to prevent code interception&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Keychain/Keystore:&lt;/strong&gt; Hardware-backed secure storage&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Token rotation:&lt;/strong&gt; Rotate refresh tokens on each use&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Session timeout:&lt;/strong&gt; Re-authenticate after inactivity&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Secure Storage Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│               SECURE STORAGE LAYERS                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │  HIGHLY SENSITIVE (Credentials, Tokens)             ││
│  │  → iOS Keychain / Android Keystore                  ││
│  │  → Hardware-backed encryption                       ││
│  │  → Biometric protection optional                    ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │  SENSITIVE (User PII, Payment Info)                 ││
│  │  → Encrypted SQLite / Realm                         ││
│  │  → Key stored in Keychain/Keystore                  ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │  NON-SENSITIVE (Preferences, Cache)                 ││
│  │  → AsyncStorage / MMKV                              ││
│  │  → No encryption required                           ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Keychain/Keystore Usage&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import * as Keychain from 'react-native-keychain';

// Store sensitive credential
async function storeCredential(key, value) {
    await Keychain.setInternetCredentials(
        key,
        key,
        value,
        {
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        }
    );
}

// Retrieve with biometric auth
async function getCredentialWithBiometrics(key) {
    const result = await Keychain.getInternetCredentials(key, {
        authenticationPrompt: {
            title: 'Authenticate',
            description: 'Verify your identity',
        },
    });
    return result ? result.password : null;
}

// Store encryption key for database
async function storeEncryptionKey(key) {
    await Keychain.setGenericPassword(
        'db_encryption_key',
        key,
        {
            service: 'database',
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        }
    );
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Encrypted Database&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import SQLite from 'react-native-sqlcipher';

class EncryptedDatabase {
    private db = null;

    async initialize() {
        // Get or generate encryption key
        let key = await this.getEncryptionKey();
        if (!key) {
            key = await this.generateKey();
            await storeEncryptionKey(key);
        }

        // Open encrypted database
        this.db = await SQLite.openDatabase({
            name: 'secure.db',
            key: key,
        });
    }

    private async generateKey() {
        const randomBytes = await Crypto.getRandomBytesAsync(32);
        return Buffer.from(randomBytes).toString('hex');
    }

    async storeUserData(userId, data) {
        const encrypted = await this.encrypt(JSON.stringify(data));
        await this.db.executeSql(
            'INSERT OR REPLACE INTO user_data (id, data) VALUES (?, ?)',
            [userId, encrypted]
        );
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Data Classification&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;const DataClassification = {
    CRITICAL: {
        storage: 'keychain',
        examples: ['auth_tokens', 'api_keys', 'encryption_keys'],
        protection: 'biometric',
    },
    SENSITIVE: {
        storage: 'encrypted_db',
        examples: ['ssn', 'payment_info', 'health_data'],
        protection: 'encryption',
    },
    INTERNAL: {
        storage: 'mmkv',
        examples: ['user_preferences', 'app_state'],
        protection: 'none',
    },
    PUBLIC: {
        storage: 'asyncstorage',
        examples: ['theme', 'language', 'cache'],
        protection: 'none',
    },
};&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Never hardcode:&lt;/strong&gt; No secrets in code or config&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Key rotation:&lt;/strong&gt; Plan for encryption key updates&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Secure delete:&lt;/strong&gt; Properly wipe sensitive data&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Audit logging:&lt;/strong&gt; Track access to sensitive data&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Error Tracking Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│              ERROR TRACKING ARCHITECTURE                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │                   App Layer                         ││
│  │  • Error Boundaries (React)                         ││
│  │  • Global error handlers (JS)                       ││
│  │  • Native crash handlers                            ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │              Error Processing                        ││
│  │  • Deduplication                                    ││
│  │  • Symbolication (source maps)                      ││
│  │  • Context enrichment                               ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │           Sentry / Crashlytics                      ││
│  │  • Issue grouping                                   ││
│  │  • Alerting                                         ││
│  │  • Release tracking                                 ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Sentry Setup&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import * as Sentry from '@sentry/react-native';

Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: __DEV__ ? 'development' : 'production',
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
    tracesSampleRate: 0.2,
    attachStacktrace: true,
    beforeSend(event) {
        // Filter or modify events
        if (event.exception?.values?.[0]?.type === 'NetworkError') {
            return null; // Don't send network errors
        }
        return event;
    },
});

// Set user context
Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
});

// Add breadcrumbs for debugging
Sentry.addBreadcrumb({
    category: 'navigation',
    message: 'Navigated to ProductScreen',
    level: 'info',
});&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Error Boundary&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import * as Sentry from '@sentry/react-native';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, {
            extra: {
                componentStack: errorInfo.componentStack,
            },
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                &amp;lt;View style={styles.container}&amp;gt;
                    &amp;lt;Text&amp;gt;Something went wrong&amp;lt;/Text&amp;gt;
                    &amp;lt;Button
                        title="Try Again"
                        onPress={() =&amp;gt; this.setState({ hasError: false })}
                    /&amp;gt;
                    &amp;lt;Button
                        title="Report Issue"
                        onPress={() =&amp;gt; Sentry.showReportDialog()}
                    /&amp;gt;
                &amp;lt;/View&amp;gt;
            );
        }
        return this.props.children;
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Source Map Upload&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;# Upload source maps during build
# Add to CI/CD pipeline

# For React Native
npx sentry-cli releases new app@1.0.0
npx sentry-cli releases files app@1.0.0 upload-sourcemaps \\
    --dist 1 \\
    --rewrite \\
    ./android/app/build/generated/assets/react/release
npx sentry-cli releases finalize app@1.0.0

# metro.config.js for source maps
module.exports = {
    transformer: {
        minifierConfig: {
            sourceMap: {
                includeSources: true,
            },
        },
    },
};&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Source maps:&lt;/strong&gt; Upload for each release&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Breadcrumbs:&lt;/strong&gt; Add context for debugging&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Alerting:&lt;/strong&gt; Set up alerts for new issues&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Privacy:&lt;/strong&gt; Scrub PII from error reports&lt;/li&gt;
            &lt;/ul&gt;
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
            &lt;h4&gt;Feature Flags Architecture&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────┐
│            FEATURE FLAG INFRASTRUCTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Feature Flag Service                   ││
│  │  (LaunchDarkly / Firebase Remote Config)            ││
│  │  • Flag definitions                                 ││
│  │  • User targeting rules                             ││
│  │  • Percentage rollouts                              ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │              Client SDK                              ││
│  │  • Fetch flags on app start                         ││
│  │  • Cache locally                                    ││
│  │  • Real-time updates (streaming)                    ││
│  └─────────────────────────────────────────────────────┘│
│                         │                                │
│  ┌──────────────────────┴──────────────────────────────┐│
│  │              App Integration                         ││
│  │  • useFeatureFlag() hook                            ││
│  │  • Conditional rendering                            ││
│  │  • Analytics tracking                               ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Feature Flag Service&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;import { MMKV } from 'react-native-mmkv';

class FeatureFlagService {
    private flags = new Map();
    private storage = new MMKV({ id: 'feature-flags' });

    async initialize(userId) {
        // Load cached flags first for instant access
        this.loadCachedFlags();

        // Fetch fresh flags from server
        try {
            const response = await api.get('/feature-flags', {
                params: { userId },
            });
            this.flags = new Map(Object.entries(response.data));
            this.cacheFlags();
        } catch (error) {
            console.warn('Failed to fetch flags, using cached');
        }
    }

    isEnabled(flagKey, defaultValue = false) {
        return this.flags.get(flagKey) ?? defaultValue;
    }

    getVariant(experimentKey, defaultVariant = 'control') {
        const flag = this.flags.get(experimentKey);
        return flag?.variant ?? defaultVariant;
    }

    private loadCachedFlags() {
        const cached = this.storage.getString('flags');
        if (cached) {
            this.flags = new Map(Object.entries(JSON.parse(cached)));
        }
    }

    private cacheFlags() {
        this.storage.set('flags', JSON.stringify(Object.fromEntries(this.flags)));
    }
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;React Hook Integration&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;function useFeatureFlag(flagKey, defaultValue = false) {
    const [isEnabled, setIsEnabled] = useState(
        featureFlagService.isEnabled(flagKey, defaultValue)
    );

    useEffect(() =&amp;gt; {
        const unsubscribe = featureFlagService.subscribe(flagKey, (value) =&amp;gt; {
            setIsEnabled(value);
        });
        return unsubscribe;
    }, [flagKey]);

    return isEnabled;
}

function useExperiment(experimentKey) {
    const variant = featureFlagService.getVariant(experimentKey);

    useEffect(() =&amp;gt; {
        analytics.track('experiment_exposure', {
            experiment: experimentKey,
            variant,
        });
    }, [experimentKey, variant]);

    return variant;
}

// Usage
function CheckoutScreen() {
    const newCheckoutEnabled = useFeatureFlag('new_checkout_flow');
    const checkoutVariant = useExperiment('checkout_redesign');

    if (newCheckoutEnabled) {
        return checkoutVariant === 'variantA'
            ? &amp;lt;CheckoutA /&amp;gt;
            : &amp;lt;CheckoutB /&amp;gt;;
    }
    return &amp;lt;LegacyCheckout /&amp;gt;;
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Gradual Rollout&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// Server-side flag configuration
const flagConfig = {
    new_checkout_flow: {
        type: 'boolean',
        defaultValue: false,
        rules: [
            // Internal testing
            { segment: 'internal', value: true },
            // Beta users
            { segment: 'beta', value: true },
            // 10% rollout
            { percentage: 10, value: true },
        ],
    },
    checkout_redesign: {
        type: 'experiment',
        variants: ['control', 'variantA', 'variantB'],
        weights: [34, 33, 33], // Percentage distribution
        targeting: {
            // Only for users who saw new checkout
            requires: 'new_checkout_flow',
        },
    },
};

// Kill switch - disable feature instantly
async function disableFeature(flagKey) {
    await api.patch('/feature-flags/' + flagKey, {
        defaultValue: false,
        rules: [], // Clear all rules
    });
}&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;Key Considerations&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Cache first:&lt;/strong&gt; Load cached flags instantly on startup&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Kill switch:&lt;/strong&gt; Ability to disable features immediately&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Analytics:&lt;/strong&gt; Track flag exposure for A/B analysis&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Cleanup:&lt;/strong&gt; Remove old flags after full rollout&lt;/li&gt;
            &lt;/ul&gt;
        `
    },
    // ==================== ADDITIONAL ADVANCED CONCEPTS ====================
    {
        id: 92,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you implement biometric authentication (Face ID/Touch ID) in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Using expo-local-authentication</h4>
            <pre><code>import * as LocalAuthentication from 'expo-local-authentication';

async function authenticateWithBiometrics(): Promise&lt;boolean&gt; {
    // Check if hardware supports biometrics
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
        console.log('No biometric hardware available');
        return false;
    }

    // Check if biometrics are enrolled
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
        console.log('No biometrics enrolled');
        return false;
    }

    // Check available types
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    // [1] = Fingerprint, [2] = Face Recognition, [3] = Iris

    // Authenticate
    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false, // Allow PIN fallback
        fallbackLabel: 'Use Passcode',
    });

    return result.success;
}</code></pre>

            <h4>Secure Token Storage with Biometrics</h4>
            <pre><code>import * as SecureStore from 'expo-secure-store';

// Store token with biometric protection
async function storeSecureToken(token: string) {
    await SecureStore.setItemAsync('authToken', token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        // Requires biometric auth on iOS
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to save credentials',
    });
}

// Retrieve token (will prompt for biometrics)
async function getSecureToken(): Promise&lt;string | null&gt; {
    try {
        return await SecureStore.getItemAsync('authToken', {
            requireAuthentication: true,
            authenticationPrompt: 'Authenticate to access your account',
        });
    } catch (error) {
        if (error.code === 'E_USER_CANCELLED') {
            // User cancelled authentication
            return null;
        }
        throw error;
    }
}</code></pre>

            <h4>React Native Keychain (Bare RN)</h4>
            <pre><code>import * as Keychain from 'react-native-keychain';

// Store with biometric protection
await Keychain.setGenericPassword('user', token, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
});

// Retrieve (prompts biometrics)
const credentials = await Keychain.getGenericPassword({
    authenticationPrompt: {
        title: 'Authentication Required',
        subtitle: 'Please authenticate to continue',
        cancel: 'Cancel',
    },
});

if (credentials) {
    console.log('Token:', credentials.password);
}</code></pre>

            <h4>Best Practices</h4>
            <ul>
                <li>Always provide fallback (PIN/password)</li>
                <li>Handle cancellation gracefully</li>
                <li>Don't store sensitive data without encryption</li>
                <li>Re-authenticate for sensitive operations</li>
                <li>Check enrollment before prompting</li>
            </ul>
        `
    },
    {
        id: 93,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you implement background tasks and scheduled jobs in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Background Fetch (iOS & Android)</h4>
            <pre><code>import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// Define the task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        // Fetch new data
        const newData = await api.checkForUpdates();

        if (newData.hasUpdates) {
            // Update local storage
            await AsyncStorage.setItem('lastData', JSON.stringify(newData));

            // Optionally show notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'New updates available!',
                    body: 'Tap to view new content',
                },
                trigger: null,
            });
        }

        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

// Register the task
async function registerBackgroundFetch() {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 15 * 60, // 15 minutes minimum
        stopOnTerminate: false,
        startOnBoot: true,
    });
}</code></pre>

            <h4>Background Location Tracking</h4>
            <pre><code>import * as Location from 'expo-location';

const LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
    if (error) {
        console.error(error);
        return;
    }

    if (data) {
        const { locations } = data;
        // Process location updates
        await api.sendLocationUpdate(locations[0]);
    }
});

async function startLocationTracking() {
    const { status } = await Location.requestBackgroundPermissionsAsync();

    if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 60000, // 1 minute
            distanceInterval: 100, // 100 meters
            foregroundService: {
                notificationTitle: 'Tracking location',
                notificationBody: 'Running in background',
            },
        });
    }
}</code></pre>

            <h4>Headless JS (Android only)</h4>
            <pre><code>// index.js
import { AppRegistry } from 'react-native';

// Register headless task
AppRegistry.registerHeadlessTask('MyBackgroundTask', () => async (taskData) => {
    // Runs even when app is killed
    await performBackgroundWork(taskData);
});

// Start from native code (Java/Kotlin)
// Or use react-native-background-actions library</code></pre>

            <h4>react-native-background-actions</h4>
            <pre><code>import BackgroundService from 'react-native-background-actions';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const backgroundTask = async (taskData) => {
    const { delay } = taskData;

    while (BackgroundService.isRunning()) {
        await doWork();
        await sleep(delay);
    }
};

const options = {
    taskName: 'SyncTask',
    taskTitle: 'Syncing data...',
    taskDesc: 'Background sync in progress',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: { delay: 60000 },
};

// Start
await BackgroundService.start(backgroundTask, options);

// Stop
await BackgroundService.stop();</code></pre>
        `
    },
    {
        id: 94,
        category: "Advanced Concepts",
        icon: "🎓",
        question: "How do you handle app updates and force update scenarios in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Version Check Architecture</h4>
            <pre><code>interface VersionInfo {
    currentVersion: string;
    minimumVersion: string;
    latestVersion: string;
    updateUrl: {
        ios: string;
        android: string;
    };
    forceUpdate: boolean;
    updateMessage: string;
}

async function checkForUpdates(): Promise&lt;void&gt; {
    const currentVersion = getAppVersion(); // From app.json or native
    const versionInfo = await api.getVersionInfo();

    const needsUpdate = compareVersions(currentVersion, versionInfo.minimumVersion) < 0;
    const hasOptionalUpdate = compareVersions(currentVersion, versionInfo.latestVersion) < 0;

    if (needsUpdate || versionInfo.forceUpdate) {
        showForceUpdateModal(versionInfo);
    } else if (hasOptionalUpdate) {
        showOptionalUpdateBanner(versionInfo);
    }
}</code></pre>

            <h4>Force Update Modal</h4>
            <pre><code>function ForceUpdateModal({ versionInfo, visible }) {
    const handleUpdate = () => {
        const url = Platform.select({
            ios: versionInfo.updateUrl.ios,
            android: versionInfo.updateUrl.android,
        });
        Linking.openURL(url);
    };

    return (
        &lt;Modal visible={visible} animationType="slide"&gt;
            &lt;View style={styles.container}&gt;
                &lt;Image source={require('./update-icon.png')} /&gt;
                &lt;Text style={styles.title}&gt;Update Required&lt;/Text&gt;
                &lt;Text style={styles.message}&gt;
                    {versionInfo.updateMessage}
                &lt;/Text&gt;
                &lt;Button title="Update Now" onPress={handleUpdate} /&gt;
                {/* No close button for force update */}
            &lt;/View&gt;
        &lt;/Modal&gt;
    );
}</code></pre>

            <h4>Version Comparison Utility</h4>
            <pre><code>function compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const num1 = parts1[i] || 0;
        const num2 = parts2[i] || 0;

        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0; // Equal
}

// Usage
compareVersions('1.2.3', '1.2.4'); // -1 (needs update)
compareVersions('2.0.0', '1.9.9'); // 1 (newer)
compareVersions('1.0.0', '1.0.0'); // 0 (same)</code></pre>

            <h4>Using Libraries</h4>
            <pre><code>// react-native-version-check
import VersionCheck from 'react-native-version-check';

const checkVersion = async () => {
    const updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded.isNeeded) {
        Alert.alert(
            'Update Available',
            'A new version is available. Please update.',
            [
                { text: 'Update', onPress: () => Linking.openURL(updateNeeded.storeUrl) },
                { text: 'Later', style: 'cancel' },
            ]
        );
    }
};

// sp-react-native-in-app-updates (Android Play Store)
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates();
await inAppUpdates.checkNeedsUpdate().then((result) => {
    if (result.shouldUpdate) {
        inAppUpdates.startUpdate({
            updateType: IAUUpdateKind.IMMEDIATE, // or FLEXIBLE
        });
    }
});</code></pre>
        `
    },

    // ==================== ADDITIONAL BEHAVIORAL ====================
    {
        id: 95,
        category: "Behavioral",
        icon: "💬",
        question: "How do you handle technical debt in a React Native project?",
        difficulty: "intermediate",
        seniority: "senior",
        answer: `
            <h4>Identifying Technical Debt</h4>
            <ul>
                <li><strong>Code smells:</strong> Duplicated code, long functions, god components</li>
                <li><strong>Outdated dependencies:</strong> Security vulnerabilities, missing features</li>
                <li><strong>Missing tests:</strong> Low coverage, brittle tests</li>
                <li><strong>Performance issues:</strong> Slow screens, memory leaks</li>
                <li><strong>Documentation gaps:</strong> Undocumented APIs, missing READMEs</li>
            </ul>

            <h4>Tracking Technical Debt</h4>
            <pre><code>// Use TODO/FIXME comments with context
// TODO(john): Refactor to use new auth API - ticket: PROJ-123
// FIXME: Memory leak when navigating - priority: high
// HACK: Workaround for RN bug #12345 - remove when fixed

// Document in code
/**
 * @deprecated Use NewComponent instead
 * @see NewComponent
 * Technical debt: This component uses class lifecycle,
 * should be migrated to hooks. Ticket: PROJ-456
 */
class OldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null, loading: true };
    }

    async componentDidMount() {
        try {
            const response = await fetch(this.props.url);
            const data = await response.json();
            this.setState({ data, loading: false });
        } catch (error) {
            console.error(error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { data, loading } = this.state;
        if (loading) return &lt;ActivityIndicator /&gt;;
        return &lt;View&gt;&lt;Text&gt;{JSON.stringify(data)}&lt;/Text&gt;&lt;/View&gt;;
    }
}</code></pre>

            <h4>Prioritization Framework</h4>
            <table>
                <tr><td><strong>Impact</strong></td><td><strong>Effort</strong></td><td><strong>Priority</strong></td></tr>
                <tr><td>High (bugs, security)</td><td>Low</td><td>Do immediately</td></tr>
                <tr><td>High</td><td>High</td><td>Plan for sprint</td></tr>
                <tr><td>Low</td><td>Low</td><td>Include with related work</td></tr>
                <tr><td>Low</td><td>High</td><td>Backlog / reconsider</td></tr>
            </table>

            <h4>Strategies for Managing Debt</h4>
            <ol>
                <li><strong>Boy Scout Rule:</strong> Leave code better than you found it</li>
                <li><strong>Dedicated time:</strong> 20% of sprint for tech debt</li>
                <li><strong>Refactor alongside features:</strong> Clean up as you work</li>
                <li><strong>Track metrics:</strong> Monitor test coverage, bundle size, dependencies</li>
            </ol>

            <h4>Communication with Stakeholders</h4>
            <ul>
                <li>Frame debt in business terms (risk, velocity impact)</li>
                <li>Show concrete benefits of addressing debt</li>
                <li>Propose incremental improvements</li>
                <li>Include debt reduction in regular planning</li>
            </ul>

            <h4>Prevention</h4>
            <ul>
                <li>Code reviews with quality focus</li>
                <li>Automated linting and formatting</li>
                <li>CI/CD quality gates</li>
                <li>Architecture decision records (ADRs)</li>
            </ul>
        `
    },
    {
        id: 96,
        category: "Behavioral",
        icon: "💬",
        question: "Describe how you would onboard a new developer to an existing React Native codebase.",
        difficulty: "intermediate",
        seniority: "senior",
        answer: `
            <h4>Week 1: Environment & Fundamentals</h4>
            <ul>
                <li><strong>Day 1-2:</strong> Development environment setup
                    <ul>
                        <li>Clone repo, install dependencies</li>
                        <li>Run app on simulator/device</li>
                        <li>Access to all tools (Jira, Figma, Slack)</li>
                    </ul>
                </li>
                <li><strong>Day 3-4:</strong> Codebase walkthrough
                    <ul>
                        <li>Project structure explanation</li>
                        <li>Key architectural decisions</li>
                        <li>Navigation flow overview</li>
                    </ul>
                </li>
                <li><strong>Day 5:</strong> First small task (bug fix or minor UI change)</li>
            </ul>

            <h4>Documentation to Prepare</h4>
            <pre><code>README.md
├── Getting Started
│   ├── Prerequisites
│   ├── Installation
│   └── Running the app
├── Architecture
│   ├── Folder structure
│   ├── State management approach
│   └── Navigation setup
├── Development Workflow
│   ├── Git branching strategy
│   ├── PR process
│   └── CI/CD pipeline
├── Testing
│   ├── Running tests
│   └── Writing tests guide
└── Troubleshooting
    └── Common issues & solutions</code></pre>

            <h4>Pair Programming Sessions</h4>
            <ul>
                <li>Feature implementation walkthrough</li>
                <li>Debugging session</li>
                <li>Code review participation</li>
                <li>Deploy to TestFlight/Play Store</li>
            </ul>

            <h4>Onboarding Checklist</h4>
            <pre><code>□ Development environment working
□ Can run app on both platforms
□ Understands project structure
□ Completed first PR
□ Understands state management
□ Can write and run tests
□ Knows deployment process
□ Has submitted first feature
□ Participated in code review
□ Understands monitoring/analytics</code></pre>

            <h4>Resources to Share</h4>
            <ul>
                <li>Internal wiki/Notion documentation</li>
                <li>Design system in Figma</li>
                <li>API documentation (Swagger/Postman)</li>
                <li>Past architecture decision records</li>
                <li>Key Slack channels</li>
            </ul>

            <h4>Feedback Loop</h4>
            <ul>
                <li>Daily check-ins during first week</li>
                <li>Weekly 1:1s during first month</li>
                <li>30-day retrospective</li>
                <li>Document onboarding improvements</li>
            </ul>
        `
    },
    {
        id: 97,
        category: "Behavioral",
        icon: "💬",
        question: "How do you balance delivering features quickly vs maintaining code quality?",
        difficulty: "intermediate",
        seniority: "senior",
        answer: `
            <h4>The Quality vs Speed Tradeoff</h4>
            <p>This isn't binary - it's about making informed tradeoffs and understanding consequences.</p>

            <h4>Framework for Decision Making</h4>
            <pre><code>Questions to ask:
1. What's the risk if this breaks in production?
   - User-facing payment flow → High quality required
   - Internal admin tool → More flexibility

2. How long will this code live?
   - Prototype/experiment → Speed over perfection
   - Core feature → Invest in quality

3. What's the blast radius of changes?
   - Isolated component → Easier to refactor later
   - Shared utility → Get it right first time

4. Do we have the expertise to fix it later?
   - Team knows the area well → Can iterate
   - Complex domain → Document decisions now</code></pre>

            <h4>Strategies That Enable Both</h4>
            <ol>
                <li><strong>Automated quality gates:</strong>
                    <ul>
                        <li>Linting and formatting (zero effort)</li>
                        <li>Type checking (catches bugs early)</li>
                        <li>Basic test coverage requirements</li>
                    </ul>
                </li>
                <li><strong>Progressive enhancement:</strong>
                    <ul>
                        <li>MVP first, polish later</li>
                        <li>Feature flags for gradual rollout</li>
                        <li>Planned refactoring sprints</li>
                    </ul>
                </li>
                <li><strong>Technical debt tracking:</strong>
                    <ul>
                        <li>Document shortcuts taken</li>
                        <li>Create tickets for follow-up</li>
                        <li>Allocate time for debt reduction</li>
                    </ul>
                </li>
            </ol>

            <h4>What I Won't Compromise On</h4>
            <ul>
                <li><strong>Security:</strong> No shortcuts on authentication, data handling</li>
                <li><strong>Accessibility:</strong> Basic a11y from the start</li>
                <li><strong>Core architecture:</strong> Foundation should be solid</li>
                <li><strong>Tests for critical paths:</strong> Payment, auth, data integrity</li>
            </ul>

            <h4>Communication</h4>
            <pre><code>"We can ship this in 2 days with manual testing,
 or 4 days with proper test coverage.

 Given this is our checkout flow, I recommend
 taking the extra time. Here's why..."

"For this experimental feature, I suggest we
 ship a simpler version first to validate the
 concept, then invest in polish if it works."</code></pre>
        `
    },

    // ==================== REAL-WORLD SCENARIOS ====================
    {
        id: 98,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "You notice the app is crashing for some users but you can't reproduce it. How do you debug this?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Step 1: Gather Information</h4>
            <pre><code>// Check crash reporting dashboard
- Crashlytics / Sentry / Bugsnag
- Look for:
  • Stack trace
  • Device info (model, OS version)
  • App version
  • User actions leading to crash
  • Frequency and affected user %

// Questions to answer:
1. Is it device-specific? (old phones, specific OS)
2. Is it version-specific? (recent release regression)
3. Is it feature-specific? (certain screen/action)
4. Is it data-specific? (certain user data triggers it)</code></pre>

            <h4>Step 2: Analyze Crash Reports</h4>
            <pre><code>// Common patterns to look for:

// 1. Null/undefined access
TypeError: Cannot read property 'x' of undefined
→ Check for optional chaining, null checks

// 2. Native module crash
Fatal Exception: java.lang.NullPointerException
→ Check native module initialization

// 3. Out of memory
Termination Reason: MEMORY PRESSURE
→ Check for memory leaks, large images

// 4. Main thread blocked
Watchdog timeout
→ Check for heavy computation on UI thread</code></pre>

            <h4>Step 3: Reproduce the Environment</h4>
            <pre><code>// Match the crash environment
1. Same device/OS version (use simulators/real devices)
2. Same app version
3. Same user data (if possible, anonymized)
4. Same network conditions

// Tools:
- Charles Proxy for network replay
- User session recordings (FullStory, LogRocket)
- Debug builds with verbose logging</code></pre>

            <h4>Step 4: Add Targeted Logging</h4>
            <pre><code>// Add breadcrumbs around suspected area
function SuspectedComponent() {
    useEffect(() => {
        crashlytics().log('SuspectedComponent mounted');
        crashlytics().setCustomKey('componentState', JSON.stringify(state));

        return () => {
            crashlytics().log('SuspectedComponent unmounted');
        };
    }, [state]);

    // Log at critical points
    const handleAction = () => {
        crashlytics().log('handleAction called');
        crashlytics().setCustomKey('actionData', JSON.stringify(data));
        // ...
    };
}</code></pre>

            <h4>Step 5: Gradual Rollout of Fix</h4>
            <pre><code>// 1. Deploy fix to beta testers
// 2. Monitor crash rates
// 3. Gradual rollout (10% → 50% → 100%)
// 4. Keep old code path with feature flag
// 5. Document root cause and prevention</code></pre>

            <h4>Prevention</h4>
            <ul>
                <li>Implement comprehensive error boundaries</li>
                <li>Add breadcrumb logging at key points</li>
                <li>Test on low-end devices</li>
                <li>Monitor crash-free sessions rate</li>
            </ul>
        `
    },
    {
        id: 99,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "Users report the app is slow. How do you identify and fix performance issues?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Step 1: Define "Slow"</h4>
            <pre><code>// Quantify the problem
- Which screens are slow?
- What actions are slow? (loading, scrolling, tapping)
- How slow? (measure baseline)
- Which devices? (all or specific?)
- When did it start? (recent regression?)

// Key metrics to measure
- Time to Interactive (TTI)
- Frame rate (target: 60fps)
- JS thread responsiveness
- Memory usage</code></pre>

            <h4>Step 2: Profile the App</h4>
            <pre><code>// 1. React DevTools Profiler
- Enable in dev menu
- Record interaction
- Look for:
  • Components rendering too often
  • Slow render times (> 16ms)
  • Cascading re-renders

// 2. Performance Monitor (Dev Menu)
- Watch JS FPS (should be 60)
- Watch UI FPS (should be 60)
- Drops indicate bottlenecks

// 3. Flipper Performance Plugin
- Network request timing
- Layout inspector
- Database queries

// 4. Native Profilers
- Xcode Instruments (iOS)
- Android Studio Profiler</code></pre>

            <h4>Step 3: Common Issues & Fixes</h4>
            <pre><code>// Issue: FlatList janky scroll
// Fix:
const ITEM_HEIGHT = 80;  // Fixed item height

&lt;FlatList
    data={items}
    renderItem={renderItem}
    removeClippedSubviews={true}
    maxToRenderPerBatch={5}
    windowSize={3}
    getItemLayout={(data, index) =&gt; ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })}
    keyExtractor={(item) => item.id}
/&gt;

// Issue: Slow screen mount
// Fix: Defer heavy work
useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
        loadHeavyData();
    });
}, []);

// Issue: Unnecessary re-renders
// Fix: Memoization
const MemoizedItem = React.memo(Item, (prevProps, nextProps) =&gt; {
    return prevProps.item.id === nextProps.item.id;
});
const handlePress = useCallback((itemId) =&gt; {
    navigation.navigate('Details', { itemId });
}, [navigation]);

// Issue: Large images
// Fix: Optimize images
&lt;FastImage
    source={{ uri, priority: 'high', cache: 'immutable' }}
    resizeMode="cover"
/&gt;

// Issue: Bridge congestion
// Fix: Batch updates
// Move to new architecture (JSI)</code></pre>

            <h4>Step 4: Measure Improvement</h4>
            <pre><code>// Before/after comparison
// Use consistent test conditions:
- Same device
- Same data set
- Cold start vs warm start

// Automate performance testing
describe('Performance', () => {
    it('renders list in under 100ms', async () => {
        const start = performance.now();
        render(&lt;HeavyList items={1000} /&gt;);
        const duration = performance.now() - start;
        expect(duration).toBeLessThan(100);
    });
});</code></pre>

            <h4>Monitoring in Production</h4>
            <ul>
                <li>Custom performance marks/measures</li>
                <li>Real User Monitoring (RUM)</li>
                <li>Alerting on p95 latency regressions</li>
            </ul>
        `
    },

    // ==================== NEW ARCHITECTURE ====================
    {
        id: 100,
        category: "New Architecture",
        icon: "🏗️",
        question: "What is Bridgeless Mode in React Native 0.74+ and why is it important?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>What is Bridgeless Mode?</h4>
            <p>Bridgeless Mode removes the legacy Bridge entirely, making JSI the only communication layer between JavaScript and Native code.</p>

            <h4>Key Changes</h4>
            <pre><code>// Old Architecture (with Bridge)
JS Thread → Bridge (JSON serialization) → Native Thread
// Async, batched, slow for high-frequency calls

// New Architecture (Bridgeless)
JS Thread → JSI (C++ bindings) → Native Thread
// Synchronous, direct memory access, much faster</code></pre>

            <h4>Benefits</h4>
            <ul>
                <li><strong>Performance:</strong> No serialization overhead</li>
                <li><strong>Synchronous calls:</strong> Direct native method invocation</li>
                <li><strong>Type safety:</strong> Codegen ensures type correctness</li>
                <li><strong>Smaller bundle:</strong> No bridge code needed</li>
            </ul>

            <h4>Enabling Bridgeless Mode</h4>
            <pre><code>// react-native.config.js
module.exports = {
    project: {
        ios: { unstable_reactLegacyComponentNames: [] },
        android: { unstable_reactLegacyComponentNames: [] },
    },
};

// Android - MainApplication.kt
override fun isNewArchEnabled(): Boolean = true
override fun isBridgelessEnabled(): Boolean = true

// iOS - AppDelegate.mm
- (BOOL)bridgelessEnabled { return YES; }</code></pre>

            <h4>Migration Considerations</h4>
            <ul>
                <li>All native modules must be TurboModules</li>
                <li>All native components must use Fabric</li>
                <li>Third-party libraries must support New Architecture</li>
            </ul>
        `
    },
    {
        id: 101,
        category: "New Architecture",
        icon: "🏗️",
        question: "How do you create a TurboModule from scratch?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Step 1: Define the Spec (TypeScript)</h4>
            <pre><code>// src/specs/NativeCalculator.ts
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    add(a: number, b: number): number;           // Sync
    multiply(a: number, b: number): Promise<number>; // Async
    getConstants(): { PI: number };
}

export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeCalculator'
);</code></pre>

            <h4>Step 2: Run Codegen</h4>
            <pre><code>// package.json
"codegenConfig": {
    "name": "NativeCalculatorSpec",
    "type": "modules",
    "jsSrcsDir": "src/specs",
    "android": {
        "javaPackageName": "com.myapp.calculator"
    }
}

// Generate native code
npx react-native codegen</code></pre>

            <h4>Step 3: iOS Implementation (Objective-C++)</h4>
            <pre><code>// NativeCalculator.mm
#import "NativeCalculatorSpec.h"

@interface NativeCalculator : NSObject <NativeCalculatorSpec>
@end

@implementation NativeCalculator
RCT_EXPORT_MODULE()

- (NSNumber *)add:(double)a b:(double)b {
    return @(a + b);
}

- (void)multiply:(double)a b:(double)b
         resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject {
    resolve(@(a * b));
}

- (NSDictionary *)getConstants {
    return @{ @"PI": @3.14159 };
}

- (std::shared_ptr<facebook::react::TurboModule>)
    getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}
@end</code></pre>

            <h4>Step 4: Android Implementation (Kotlin)</h4>
            <pre><code>// NativeCalculatorModule.kt
class NativeCalculatorModule(context: ReactApplicationContext) :
    NativeCalculatorSpec(context) {

    override fun getName() = NAME

    override fun add(a: Double, b: Double): Double = a + b

    override fun multiply(a: Double, b: Double, promise: Promise) {
        promise.resolve(a * b)
    }

    override fun getTypedExportedConstants(): Map<String, Any> =
        mapOf("PI" to 3.14159)

    companion object {
        const val NAME = "NativeCalculator"
    }
}</code></pre>
        `
    },
    {
        id: 102,
        category: "New Architecture",
        icon: "🏗️",
        question: "Explain how Fabric's Shadow Tree works and why it matters.",
        difficulty: "advanced",
        seniority: "staff",
        answer: `
            <h4>What is the Shadow Tree?</h4>
            <p>A C++ representation of the UI tree that enables synchronous layout calculations and efficient diffing.</p>

            <h4>Architecture Overview</h4>
            <pre><code>React Tree (JS)
     ↓
Shadow Tree (C++)  ←── Layout calculation (Yoga)
     ↓
View Tree (Native iOS/Android)</code></pre>

            <h4>Key Components</h4>
            <pre><code>// ShadowNode: Immutable node in the tree
class ShadowNode {
    ShadowNodeFamily family;      // Identity across updates
    Props props;                  // Component properties
    State state;                  // Component state
    vector<ShadowNode> children;  // Child nodes
    LayoutMetrics layoutMetrics;  // Calculated layout
}

// ShadowTree: Complete UI representation
class ShadowTree {
    ShadowNode rootShadowNode;

    // Commit a new tree version
    void commit(ShadowNode newRoot);

    // Calculate diff for mounting
    MountingTransaction diff(ShadowTree oldTree);
}</code></pre>

            <h4>Why Immutability Matters</h4>
            <ul>
                <li><strong>Thread safety:</strong> Trees can be read from any thread</li>
                <li><strong>Efficient diffing:</strong> Compare tree references, not content</li>
                <li><strong>Consistent snapshots:</strong> No partial updates visible</li>
                <li><strong>Background layout:</strong> Yoga runs off main thread</li>
            </ul>

            <h4>Mounting Process</h4>
            <pre><code>// 1. JS updates state
setState({ items: newItems });

// 2. New Shadow Tree created (background thread)
newShadowTree = clone(oldShadowTree, changes);

// 3. Layout calculated (Yoga, background thread)
calculateLayout(newShadowTree);

// 4. Diff computed
mutations = diff(oldShadowTree, newShadowTree);

// 5. Mutations applied (main thread)
applyMutations(mutations); // CREATE, DELETE, UPDATE, INSERT</code></pre>

            <h4>Performance Benefits</h4>
            <ul>
                <li>Layout happens in parallel with JS execution</li>
                <li>Only changed nodes are updated</li>
                <li>Reduced main thread work</li>
            </ul>
        `
    },
    {
        id: 103,
        category: "New Architecture",
        icon: "🏗️",
        question: "What is JSI and how does it differ from the Bridge?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>JSI (JavaScript Interface)</h4>
            <p>A C++ API that allows JavaScript to hold references to C++ objects and invoke methods on them directly.</p>

            <h4>Bridge vs JSI Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Bridge</th><th>JSI</th></tr>
                <tr><td>Communication</td><td>Async, JSON messages</td><td>Sync, direct calls</td></tr>
                <tr><td>Data transfer</td><td>Serialization required</td><td>Shared memory</td></tr>
                <tr><td>Threading</td><td>Message queue</td><td>Any thread</td></tr>
                <tr><td>Performance</td><td>~5ms per call</td><td>~0.01ms per call</td></tr>
                <tr><td>Type safety</td><td>Runtime only</td><td>Compile-time (Codegen)</td></tr>
            </table>

            <h4>JSI Example</h4>
            <pre><code>// C++ side - Expose a function to JS
runtime.global().setProperty(
    runtime,
    "nativeAdd",
    jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "nativeAdd"),
        2, // argument count
        [](jsi::Runtime& rt,
           const jsi::Value& thisVal,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            double a = args[0].asNumber();
            double b = args[1].asNumber();
            return jsi::Value(a + b);
        }
    )
);

// JS side - Call directly
const result = global.nativeAdd(5, 3); // Synchronous!</code></pre>

            <h4>Host Objects</h4>
            <pre><code>// Expose complex objects to JS
class MyHostObject : public jsi::HostObject {
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override {
        if (name.utf8(rt) == "value") {
            return jsi::Value(42);
        }
        return jsi::Value::undefined();
    }
};

// JS can access like a regular object
console.log(myHostObject.value); // 42</code></pre>
        `
    },
    {
        id: 104,
        category: "New Architecture",
        icon: "🏗️",
        question: "How do you migrate an existing app to the New Architecture?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Migration Checklist</h4>
            <pre><code>□ Update React Native to 0.71+
□ Update all dependencies to NA-compatible versions
□ Enable New Architecture in build config
□ Migrate custom native modules to TurboModules
□ Migrate custom native components to Fabric
□ Test thoroughly on both platforms</code></pre>

            <h4>Step 1: Check Library Compatibility</h4>
            <pre><code># Check which libraries support New Architecture
npx react-native-new-architecture-app-check

# Common libraries status:
✅ react-navigation
✅ react-native-reanimated (3.x)
✅ react-native-gesture-handler (2.x)
✅ react-native-screens
⚠️ Some libraries need updates</code></pre>

            <h4>Step 2: Enable New Architecture</h4>
            <pre><code>// Android - gradle.properties
newArchEnabled=true

// iOS - Podfile
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
pod install</code></pre>

            <h4>Step 3: Handle Interop Layer</h4>
            <pre><code>// For libraries not yet migrated, use interop
// react-native.config.js
module.exports = {
    project: {
        ios: {
            // Components that need legacy renderer
            unstable_reactLegacyComponentNames: [
                'LegacyViewManager',
            ],
        },
        android: {
            unstable_reactLegacyComponentNames: [
                'LegacyViewManager',
            ],
        },
    },
};</code></pre>

            <h4>Step 4: Migrate Custom Modules</h4>
            <pre><code>// Before: Bridge Native Module
@ReactMethod
public void doSomething(String arg, Promise promise) {
    promise.resolve(result);
}

// After: TurboModule with Codegen
// 1. Write TypeScript spec
// 2. Run codegen
// 3. Implement generated interface</code></pre>

            <h4>Gradual Migration Strategy</h4>
            <ol>
                <li>Enable NA on fresh branch</li>
                <li>Fix build errors</li>
                <li>Test core flows</li>
                <li>Use interop for problematic libraries</li>
                <li>Migrate custom code incrementally</li>
            </ol>
        `
    },
    {
        id: 105,
        category: "New Architecture",
        icon: "🏗️",
        question: "What is Codegen in React Native and how does it ensure type safety?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is Codegen?</h4>
            <p>Codegen generates native code (C++, Objective-C, Java/Kotlin) from TypeScript specs, ensuring type safety between JS and Native layers.</p>

            <h4>How It Works</h4>
            <pre><code>TypeScript Spec
      ↓
   Codegen
      ↓
┌─────────────────┐
│ C++ Interfaces  │ ← Shared types
├─────────────────┤
│ iOS (ObjC/C++)  │ ← Platform-specific
├─────────────────┤
│ Android (Java)  │ ← Platform-specific
└─────────────────┘</code></pre>

            <h4>Writing a Spec</h4>
            <pre><code>// NativeUserModule.ts
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    // Supported types:
    // Primitives: string, number, boolean
    // Objects: { key: Type }
    // Arrays: Array<Type>
    // Callbacks: (value: Type) => void
    // Promises: Promise<Type>

    getUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
    }>;

    updateUser(user: {
        id: string;
        name?: string;
    }): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('UserModule');</code></pre>

            <h4>Configuration</h4>
            <pre><code>// package.json
{
    "codegenConfig": {
        "name": "MyAppSpecs",
        "type": "all",
        "jsSrcsDir": "src/specs",
        "android": {
            "javaPackageName": "com.myapp.specs"
        }
    }
}</code></pre>

            <h4>Type Safety Benefits</h4>
            <ul>
                <li><strong>Compile-time errors:</strong> Catch type mismatches before runtime</li>
                <li><strong>IDE autocomplete:</strong> Native implementation guided by types</li>
                <li><strong>No serialization bugs:</strong> Types enforced at boundary</li>
                <li><strong>Documentation:</strong> Spec serves as contract</li>
            </ul>
        `
    },
    {
        id: 106,
        category: "New Architecture",
        icon: "🏗️",
        question: "How do you create a Fabric Native Component?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Step 1: Define the Component Spec</h4>
            <pre><code>// src/specs/CustomViewNativeComponent.ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type {
    Float,
    Int32,
    WithDefault
} from 'react-native/Libraries/Types/CodegenTypes';

interface NativeProps extends ViewProps {
    color?: string;
    radius?: WithDefault<Float, 0>;
    count?: Int32;
    enabled?: WithDefault<boolean, true>;
    onValueChange?: (event: { value: number }) => void;
}

export default codegenNativeComponent<NativeProps>('CustomView');</code></pre>

            <h4>Step 2: iOS Implementation</h4>
            <pre><code>// CustomView.h
#import <React/RCTViewComponentView.h>

@interface CustomView : RCTViewComponentView
@end

// CustomView.mm
#import "CustomView.h"
#import <react/renderer/components/MyAppSpecs/ComponentDescriptors.h>
#import <react/renderer/components/MyAppSpecs/Props.h>

using namespace facebook::react;

@implementation CustomView {
    UIView *_innerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<CustomViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const CustomViewProps>();
        _props = defaultProps;
        _innerView = [[UIView alloc] init];
        [self addSubview:_innerView];
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
    const auto &newProps = *std::static_pointer_cast<CustomViewProps const>(props);

    if (newProps.color != oldProps.color) {
        _innerView.backgroundColor = [UIColor colorWithHex:newProps.color];
    }

    [super updateProps:props oldProps:oldProps];
}
@end</code></pre>

            <h4>Step 3: Usage in JS</h4>
            <pre><code>import CustomView from './specs/CustomViewNativeComponent';

function App() {
    return (
        &lt;CustomView
            color="#FF0000"
            radius={10}
            enabled={true}
            onValueChange={(e) => console.log(e.nativeEvent.value)}
            style={{ width: 100, height: 100 }}
        /&gt;
    );
}</code></pre>
        `
    },
    {
        id: 107,
        category: "New Architecture",
        icon: "🏗️",
        question: "What are the performance improvements of the New Architecture?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Key Performance Improvements</h4>

            <h4>1. Synchronous Native Calls (JSI)</h4>
            <pre><code>// Old: Async bridge call (~5-10ms)
NativeModules.Calculator.add(1, 2).then(result => {});

// New: Sync JSI call (~0.01ms)
const result = global.nativeCalculator.add(1, 2);</code></pre>

            <h4>2. Reduced Serialization</h4>
            <pre><code>// Old: JSON serialization for every call
JS Object → JSON.stringify → Bridge → JSON.parse → Native

// New: Direct memory access
JS Object → JSI HostObject → Native (shared memory)</code></pre>

            <h4>3. Concurrent Rendering (Fabric)</h4>
            <pre><code>// Old: All rendering on main thread
Update → Layout → Paint (blocking)

// New: Background layout calculation
Update → Layout (background) → Paint (main thread)

// Benefits:
- Interruptible rendering
- Better responsiveness during heavy updates
- Priority-based updates</code></pre>

            <h4>4. Lazy Module Loading</h4>
            <pre><code>// Old: All modules loaded at startup
// Increased startup time

// New: TurboModules load on demand
const module = TurboModuleRegistry.get('HeavyModule');
// Only loaded when first accessed</code></pre>

            <h4>Benchmark Comparisons</h4>
            <table>
                <tr><th>Metric</th><th>Old Arch</th><th>New Arch</th></tr>
                <tr><td>Native call latency</td><td>~5ms</td><td>~0.01ms</td></tr>
                <tr><td>Startup time</td><td>Baseline</td><td>10-30% faster</td></tr>
                <tr><td>List scrolling FPS</td><td>45-55</td><td>58-60</td></tr>
                <tr><td>Memory overhead</td><td>Higher</td><td>Lower</td></tr>
            </table>

            <h4>Real-World Impact</h4>
            <ul>
                <li>Smoother animations during heavy JS work</li>
                <li>Faster gesture response</li>
                <li>Better performance on low-end devices</li>
                <li>Reduced jank during navigation</li>
            </ul>
        `
    },

    // ==================== MODERN LIBRARIES ====================
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

    // ==================== HERMES ====================
    {
        id: 116,
        category: "Hermes",
        icon: "⚡",
        question: "What is Hermes and what are its advantages over JavaScriptCore?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is Hermes?</h4>
            <p>Hermes is a JavaScript engine optimized for React Native, developed by Meta. It compiles JS to bytecode at build time for faster startup.</p>

            <h4>Key Advantages</h4>
            <table>
                <tr><th>Metric</th><th>JavaScriptCore</th><th>Hermes</th></tr>
                <tr><td>Startup time (TTI)</td><td>Baseline</td><td>40-50% faster</td></tr>
                <tr><td>Memory usage</td><td>Higher</td><td>30% lower</td></tr>
                <tr><td>App size</td><td>Larger</td><td>Smaller bundle</td></tr>
                <tr><td>Bytecode</td><td>Compiled at runtime</td><td>Pre-compiled</td></tr>
            </table>

            <h4>How Hermes Works</h4>
            <pre><code>// Traditional JS Engine Flow
Source Code → Parse → AST → Bytecode → Execute
(All happens at app startup)

// Hermes Flow
Build Time: Source Code → Parse → AST → Bytecode (.hbc file)
Runtime:    Load Bytecode → Execute
(Parsing already done, faster startup!)</code></pre>

            <h4>Enabling Hermes</h4>
            <pre><code>// Android - android/gradle.properties
hermesEnabled=true

// iOS - ios/Podfile
:hermes_enabled => true

// Verify Hermes is running
const isHermes = () => !!global.HermesInternal;
console.log('Hermes enabled:', isHermes());</code></pre>

            <h4>Hermes Features</h4>
            <ul>
                <li><strong>Ahead-of-time compilation:</strong> Bytecode bundled with app</li>
                <li><strong>Optimized garbage collector:</strong> Lower memory pressure</li>
                <li><strong>ES6+ support:</strong> Most modern JS features</li>
                <li><strong>Source maps:</strong> Debugging with original source</li>
            </ul>

            <h4>Limitations</h4>
            <ul>
                <li>No JIT compilation (intentional for security)</li>
                <li>Some ES features may lag behind</li>
                <li>Proxy support added in newer versions</li>
            </ul>
        `
    },
    {
        id: 117,
        category: "Hermes",
        icon: "⚡",
        question: "How do you debug a React Native app running Hermes?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Debugging Options</h4>

            <h4>1. Flipper (Recommended)</h4>
            <pre><code>// Flipper provides:
- Hermes Debugger integration
- Network inspector
- Layout inspector
- React DevTools
- Native logs

// Enable in your app
// Already enabled by default in RN 0.62+</code></pre>

            <h4>2. Chrome DevTools via Hermes</h4>
            <pre><code>// 1. Open dev menu (shake or Cmd+D)
// 2. Select "Open Debugger"
// 3. Opens Chrome with Hermes target

// Or connect directly:
// chrome://inspect → Configure → localhost:8081

// Note: Uses Hermes inspector protocol,
// NOT Chrome Remote Debugging (deprecated)</code></pre>

            <h4>3. Console Logging</h4>
            <pre><code>// Standard console methods work
console.log('Debug info');
console.warn('Warning');
console.error('Error');

// Performance timing
console.time('operation');
// ... code
console.timeEnd('operation');

// Group logs
console.group('User Action');
console.log('Step 1');
console.log('Step 2');
console.groupEnd();</code></pre>

            <h4>4. Source Maps</h4>
            <pre><code>// Ensure source maps are generated
// metro.config.js
module.exports = {
    transformer: {
        // Enable source maps for release builds
        minifierConfig: {
            sourceMap: {
                includeSources: true,
            },
        },
    },
};

// Upload to crash reporting service
// (Sentry, Crashlytics, etc.)</code></pre>

            <h4>Hermes-Specific Debugging</h4>
            <pre><code>// Check Hermes internals
if (global.HermesInternal) {
    // Get runtime stats
    const stats = global.HermesInternal.getRuntimeProperties();
    console.log('Hermes version:', stats['OSS Release Version']);

    // Trigger garbage collection (debug only)
    global.HermesInternal.getInstrumentedStats();
}</code></pre>

            <h4>Common Issues</h4>
            <ul>
                <li><strong>Debugger not connecting:</strong> Check Metro is running</li>
                <li><strong>Breakpoints not hitting:</strong> Ensure source maps enabled</li>
                <li><strong>Old Chrome DevTools:</strong> Use Flipper or new inspector</li>
            </ul>
        `
    },
    {
        id: 118,
        category: "Hermes",
        icon: "⚡",
        question: "Explain Hermes bytecode compilation and its impact on app performance.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Bytecode Compilation Process</h4>
            <pre><code>// Build Pipeline
1. Metro bundles JavaScript
      ↓
2. Hermes compiler (hermesc) processes bundle
      ↓
3. Outputs .hbc (Hermes Bytecode) file
      ↓
4. Bytecode included in app binary

// Command line compilation
hermesc -emit-binary -out bundle.hbc bundle.js</code></pre>

            <h4>Bytecode File Structure</h4>
            <pre><code>// .hbc file contains:
┌─────────────────────┐
│ Header              │ Magic number, version
├─────────────────────┤
│ Function Table      │ Function metadata
├─────────────────────┤
│ String Table        │ All strings (deduped)
├─────────────────────┤
│ Bytecode            │ Compiled instructions
├─────────────────────┤
│ Debug Info          │ Source maps (optional)
└─────────────────────┘</code></pre>

            <h4>Performance Impact</h4>
            <table>
                <tr><th>Phase</th><th>Without Hermes</th><th>With Hermes</th></tr>
                <tr><td>Parse JS</td><td>~200ms</td><td>Skipped</td></tr>
                <tr><td>Compile to bytecode</td><td>~150ms</td><td>Pre-done</td></tr>
                <tr><td>Load bytecode</td><td>N/A</td><td>~20ms</td></tr>
                <tr><td>Total startup</td><td>~350ms</td><td>~20ms</td></tr>
            </table>

            <h4>Optimization Levels</h4>
            <pre><code>// Hermes compiler optimization flags
hermesc -O0  // No optimization (fastest compile)
hermesc -O   // Standard optimization (default)
hermesc -Og  // Optimize for debugging

// Production builds use -O by default
// Optimizations include:
// - Dead code elimination
// - Constant folding
// - Function inlining (limited)</code></pre>

            <h4>Memory Mapping</h4>
            <pre><code>// Bytecode is memory-mapped (mmap)
// Benefits:
1. Pages loaded on-demand
2. Shared between processes
3. Can be swapped to disk under memory pressure
4. Faster initial load (no copy needed)

// This is why Hermes apps use less RAM</code></pre>

            <h4>Verifying Bytecode</h4>
            <pre><code>// Check if using bytecode in release
adb shell run-as com.yourapp ls files/
// Should see: index.android.bundle (bytecode)

// Inspect bytecode
hermes -dump-bytecode bundle.hbc</code></pre>
        `
    },
    {
        id: 119,
        category: "Hermes",
        icon: "⚡",
        question: "What JavaScript features are not supported in Hermes and how do you handle them?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Unsupported/Limited Features (as of Hermes 0.12)</h4>
            <pre><code>// ❌ Not Supported
- with statement (deprecated anyway)
- Local mode eval() (only global eval)
- Reflect.construct with newTarget

// ⚠️ Limited Support
- Proxy (supported since Hermes 0.7)
- Symbols (mostly supported)
- WeakRef (added recently)
- BigInt (limited support)</code></pre>

            <h4>Handling Unsupported Features</h4>

            <h4>1. Use Polyfills</h4>
            <pre><code>// Install core-js for missing features
npm install core-js

// babel.config.js
module.exports = {
    presets: [
        ['module:metro-react-native-babel-preset', {
            unstable_transformProfile: 'hermes-stable',
        }],
    ],
    plugins: [
        // Add specific polyfills
    ],
};</code></pre>

            <h4>2. Check Feature Availability</h4>
            <pre><code>// Runtime feature detection
const supportsProxy = typeof Proxy !== 'undefined';
const supportsBigInt = typeof BigInt !== 'undefined';

if (!supportsProxy) {
    // Use alternative implementation
    console.warn('Proxy not supported, using fallback');
}

// Check Hermes version
if (global.HermesInternal) {
    const version = global.HermesInternal
        .getRuntimeProperties()['OSS Release Version'];
    console.log('Hermes version:', version);
}</code></pre>

            <h4>3. Babel Transforms</h4>
            <pre><code>// babel.config.js - Transform unsupported syntax
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        // Transform optional chaining for older Hermes
        '@babel/plugin-proposal-optional-chaining',
        // Transform nullish coalescing
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
};</code></pre>

            <h4>4. Library Compatibility</h4>
            <pre><code>// Some libraries may need Hermes-compatible versions
// Check library requirements:

// ✅ Works with Hermes
- react-native-reanimated (uses JSI)
- react-native-mmkv (uses JSI)

// ⚠️ May need configuration
- Libraries using eval()
- Libraries relying on Proxy (older Hermes)</code></pre>

            <h4>Best Practices</h4>
            <ul>
                <li>Keep Hermes updated for latest feature support</li>
                <li>Test on both iOS (JSC) and Android (Hermes) if supporting both</li>
                <li>Use feature detection rather than engine detection</li>
                <li>Check release notes for newly supported features</li>
            </ul>
        `
    },

    // ==================== CI/CD & DEVOPS ====================
    {
        id: 120,
        category: "CI/CD",
        icon: "🔄",
        question: "How do you set up a CI/CD pipeline for a React Native app using GitHub Actions?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Basic Workflow Structure</h4>
            <pre><code># .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run linter
        run: yarn lint

      - name: Run type check
        run: yarn tsc --noEmit

      - name: Run tests
        run: yarn test --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3</code></pre>

            <h4>Android Build Job</h4>
            <pre><code>  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Cache Gradle
        uses: actions/cache@v4
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: gradle-\${{ hashFiles('**/*.gradle*') }}

      - name: Build Android
        run: |
          cd android
          ./gradlew assembleRelease

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/</code></pre>

            <h4>iOS Build Job</h4>
            <pre><code>  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Cache Pods
        uses: actions/cache@v4
        with:
          path: ios/Pods
          key: pods-\${{ hashFiles('ios/Podfile.lock') }}

      - name: Install Pods
        run: cd ios && pod install

      - name: Build iOS
        run: |
          xcodebuild -workspace ios/App.xcworkspace \\
            -scheme App \\
            -configuration Release \\
            -sdk iphonesimulator \\
            -derivedDataPath build</code></pre>
        `
    },
    {
        id: 121,
        category: "CI/CD",
        icon: "🔄",
        question: "Explain how to manage iOS code signing in a CI environment.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Code Signing Components</h4>
            <pre><code>// Required for iOS distribution:
1. Signing Certificate (.p12)
   - Development or Distribution certificate
   - Private key included

2. Provisioning Profile (.mobileprovision)
   - Links app ID, certificate, and devices
   - App Store, Ad Hoc, or Development

3. Keychain
   - Stores certificates securely
   - CI creates temporary keychain</code></pre>

            <h4>Fastlane Match (Recommended)</h4>
            <pre><code># Matchfile
git_url("git@github.com:org/certificates.git")
storage_mode("git")
type("appstore")
app_identifier("com.company.app")

# CI workflow
- name: Setup certificates
  run: |
    bundle exec fastlane match appstore --readonly
  env:
    MATCH_PASSWORD: \${{ secrets.MATCH_PASSWORD }}
    MATCH_GIT_BASIC_AUTHORIZATION: \${{ secrets.GIT_AUTH }}</code></pre>

            <h4>Manual Setup (GitHub Actions)</h4>
            <pre><code># Store secrets in GitHub:
# - BUILD_CERTIFICATE_BASE64
# - P12_PASSWORD
# - BUILD_PROVISION_PROFILE_BASE64
# - KEYCHAIN_PASSWORD

- name: Install certificates
  env:
    CERTIFICATE: \${{ secrets.BUILD_CERTIFICATE_BASE64 }}
    P12_PASSWORD: \${{ secrets.P12_PASSWORD }}
    PROFILE: \${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
    KEYCHAIN_PASSWORD: \${{ secrets.KEYCHAIN_PASSWORD }}
  run: |
    # Create keychain
    security create-keychain -p "\$KEYCHAIN_PASSWORD" build.keychain
    security default-keychain -s build.keychain
    security unlock-keychain -p "\$KEYCHAIN_PASSWORD" build.keychain

    # Import certificate
    echo "\$CERTIFICATE" | base64 --decode > certificate.p12
    security import certificate.p12 -k build.keychain \\
      -P "\$P12_PASSWORD" -T /usr/bin/codesign

    # Install provisioning profile
    echo "\$PROFILE" | base64 --decode > profile.mobileprovision
    mkdir -p ~/Library/MobileDevice/Provisioning\\ Profiles
    cp profile.mobileprovision ~/Library/MobileDevice/Provisioning\\ Profiles/

    # Allow codesign access
    security set-key-partition-list -S apple-tool:,apple: \\
      -s -k "\$KEYCHAIN_PASSWORD" build.keychain</code></pre>

            <h4>EAS Build Alternative</h4>
            <pre><code># Expo's EAS handles signing automatically
eas build --platform ios --profile production

# Credentials stored in Expo's secure cloud
# Or use local credentials:
eas credentials</code></pre>
        `
    },
    {
        id: 122,
        category: "CI/CD",
        icon: "🔄",
        question: "How do you implement automatic version bumping and changelog generation?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Semantic Versioning with standard-version</h4>
            <pre><code># Install
npm install --save-dev standard-version

# package.json scripts
{
    "scripts": {
        "release": "standard-version",
        "release:minor": "standard-version --release-as minor",
        "release:major": "standard-version --release-as major"
    }
}

# Creates:
# - Version bump in package.json
# - CHANGELOG.md update
# - Git tag</code></pre>

            <h4>Conventional Commits</h4>
            <pre><code>// Commit message format
type(scope): description

// Examples:
feat(auth): add biometric login
fix(payments): resolve card validation bug
chore(deps): update react-native to 0.73
docs(readme): add setup instructions

// Types that trigger version bumps:
feat: → minor version (1.0.0 → 1.1.0)
fix:  → patch version (1.0.0 → 1.0.1)
BREAKING CHANGE: → major version (1.0.0 → 2.0.0)</code></pre>

            <h4>React Native Version Sync</h4>
            <pre><code>// react-native-version package
npm install react-native-version --save-dev

// package.json
{
    "scripts": {
        "postversion": "react-native-version"
    }
}

// Syncs version to:
// - android/app/build.gradle (versionCode, versionName)
// - ios/App/Info.plist (CFBundleVersion, CFBundleShortVersionString)</code></pre>

            <h4>CI Automation</h4>
            <pre><code># .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4

      - name: Install dependencies
        run: yarn install

      - name: Create release
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          yarn release

      - name: Push changes
        run: |
          git push --follow-tags origin main</code></pre>

            <h4>Generated CHANGELOG.md</h4>
            <pre><code># Changelog

## [1.2.0] - 2024-01-15

### Features
* **auth:** add biometric login (#123)
* **profile:** implement avatar upload (#125)

### Bug Fixes
* **payments:** resolve card validation (#124)

### [1.1.0] - 2024-01-01
...</code></pre>
        `
    },
    {
        id: 123,
        category: "CI/CD",
        icon: "🔄",
        question: "What is EAS Build and how does it compare to building locally or with Fastlane?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>EAS Build Overview</h4>
            <p>Expo Application Services (EAS) Build is a cloud build service that compiles React Native apps without local native toolchains.</p>

            <h4>Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Local/Fastlane</th><th>EAS Build</th></tr>
                <tr><td>Setup time</td><td>Hours</td><td>Minutes</td></tr>
                <tr><td>Machine requirements</td><td>Mac for iOS</td><td>None</td></tr>
                <tr><td>Code signing</td><td>Manual setup</td><td>Managed or manual</td></tr>
                <tr><td>Build speed</td><td>Depends on machine</td><td>Powerful cloud VMs</td></tr>
                <tr><td>Cost</td><td>Hardware + time</td><td>Free tier + paid</td></tr>
                <tr><td>Caching</td><td>Local only</td><td>Cloud cache</td></tr>
            </table>

            <h4>EAS Build Setup</h4>
            <pre><code># Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Initialize (creates eas.json)
eas build:configure

# eas.json
{
    "build": {
        "development": {
            "developmentClient": true,
            "distribution": "internal"
        },
        "preview": {
            "distribution": "internal"
        },
        "production": {
            "autoIncrement": true
        }
    }
}</code></pre>

            <h4>Running Builds</h4>
            <pre><code># Build for both platforms
eas build --platform all

# Build specific profile
eas build --platform ios --profile production

# Local build (uses cloud config, builds locally)
eas build --platform android --local

# Submit to stores
eas submit --platform ios
eas submit --platform android</code></pre>

            <h4>When to Use Each</h4>
            <ul>
                <li><strong>EAS Build:</strong>
                    <ul>
                        <li>Teams without Mac hardware</li>
                        <li>Quick setup needed</li>
                        <li>Managed signing preferred</li>
                        <li>Expo or bare RN projects</li>
                    </ul>
                </li>
                <li><strong>Local/Fastlane:</strong>
                    <ul>
                        <li>Full control needed</li>
                        <li>Complex custom build steps</li>
                        <li>Air-gapped environments</li>
                        <li>Cost optimization at scale</li>
                    </ul>
                </li>
            </ul>
        `
    },
    {
        id: 124,
        category: "CI/CD",
        icon: "🔄",
        question: "How do you implement over-the-air (OTA) updates in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>OTA Update Options</h4>

            <h4>1. EAS Update (Expo)</h4>
            <pre><code># Setup
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes"

# eas.json
{
    "build": {
        "production": {
            "channel": "production"
        }
    }
}

// app.json
{
    "expo": {
        "updates": {
            "url": "https://u.expo.dev/your-project-id"
        },
        "runtimeVersion": {
            "policy": "sdkVersion"
        }
    }
}</code></pre>

            <h4>2. CodePush (Microsoft)</h4>
            <pre><code>// Install
npm install react-native-code-push

// Wrap root component
import codePush from 'react-native-code-push';

const App = () => { ... };

export default codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);

// Release update
appcenter codepush release-react -a Owner/App-iOS -d Production
appcenter codepush release-react -a Owner/App-Android -d Production</code></pre>

            <h4>Update Strategies</h4>
            <pre><code>// Silent update (next restart)
codePush.sync({
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
});

// Immediate update (critical fix)
codePush.sync({
    installMode: codePush.InstallMode.IMMEDIATE,
    updateDialog: {
        title: "Update Available",
        mandatoryUpdateMessage: "A critical update is required.",
        mandatoryContinueButtonLabel: "Update Now",
    },
});

// Background update with progress
codePush.sync(
    { installMode: codePush.InstallMode.ON_NEXT_RESUME },
    (status) => console.log('Status:', status),
    (progress) => console.log('Progress:', progress)
);</code></pre>

            <h4>What Can Be Updated OTA</h4>
            <table>
                <tr><th>✅ Can Update</th><th>❌ Cannot Update</th></tr>
                <tr><td>JavaScript code</td><td>Native code (Swift/Kotlin)</td></tr>
                <tr><td>Images (require())</td><td>New native modules</td></tr>
                <tr><td>JSON assets</td><td>App icons/splash</td></tr>
                <tr><td>Fonts</td><td>Permissions changes</td></tr>
            </table>

            <h4>Best Practices</h4>
            <ul>
                <li>Test updates on staging channel first</li>
                <li>Use rollback capability for critical bugs</li>
                <li>Monitor update adoption metrics</li>
                <li>Version runtime to prevent incompatible updates</li>
            </ul>
        `
    },
    {
        id: 125,
        category: "CI/CD",
        icon: "🔄",
        question: "How do you set up Fastlane for automating React Native app releases?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Fastlane Setup</h4>
            <pre><code># Install
brew install fastlane

# Initialize in ios/ and android/ folders
cd ios && fastlane init
cd android && fastlane init</code></pre>

            <h4>iOS Fastfile</h4>
            <pre><code># ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Push to TestFlight"
  lane :beta do
    setup_ci if ENV['CI']

    match(type: "appstore", readonly: true)

    increment_build_number(
      xcodeproj: "App.xcodeproj",
      build_number: ENV['BUILD_NUMBER'] || latest_testflight_build_number + 1
    )

    build_app(
      workspace: "App.xcworkspace",
      scheme: "App",
      export_method: "app-store"
    )

    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )

    slack(message: "iOS beta deployed! 🚀")
  end

  desc "Deploy to App Store"
  lane :release do
    build_app(scheme: "App")
    upload_to_app_store(
      submit_for_review: true,
      automatic_release: true
    )
  end
end</code></pre>

            <h4>Android Fastfile</h4>
            <pre><code># android/fastlane/Fastfile
default_platform(:android)

platform :android do
  desc "Deploy to Play Store Internal"
  lane :beta do
    gradle(
      task: "bundle",
      build_type: "Release",
      properties: {
        "versionCode" => ENV['BUILD_NUMBER'],
      }
    )

    upload_to_play_store(
      track: "internal",
      aab: "app/build/outputs/bundle/release/app-release.aab"
    )
  end

  desc "Promote to Production"
  lane :release do
    upload_to_play_store(
      track: "internal",
      track_promote_to: "production",
      skip_upload_aab: true
    )
  end
end</code></pre>

            <h4>Shared Configuration</h4>
            <pre><code># fastlane/Appfile (iOS)
app_identifier("com.company.app")
apple_id("developer@company.com")
team_id("TEAM_ID")

# fastlane/Appfile (Android)
json_key_file("play-store-key.json")
package_name("com.company.app")</code></pre>

            <h4>CI Integration</h4>
            <pre><code># GitHub Actions
- name: Deploy iOS
  run: |
    cd ios
    bundle exec fastlane beta
  env:
    MATCH_PASSWORD: \${{ secrets.MATCH_PASSWORD }}
    FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD: \${{ secrets.ASP }}

- name: Deploy Android
  run: |
    cd android
    bundle exec fastlane beta
  env:
    PLAY_STORE_JSON_KEY: \${{ secrets.PLAY_STORE_KEY }}</code></pre>
        `
    },

    // ==================== EXPO ADVANCED ====================
    {
        id: 126,
        category: "Expo",
        icon: "📱",
        question: "What is Expo Router and how does it compare to React Navigation?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is Expo Router?</h4>
            <p>A file-based routing system for React Native (like Next.js for mobile), built on top of React Navigation.</p>

            <h4>File-Based Routing</h4>
            <pre><code>app/
├── _layout.tsx      // Root layout
├── index.tsx        // "/" - Home screen
├── about.tsx        // "/about"
├── settings/
│   ├── _layout.tsx  // Nested layout
│   ├── index.tsx    // "/settings"
│   └── profile.tsx  // "/settings/profile"
├── [id].tsx         // "/123" - Dynamic route
└── [...missing].tsx // Catch-all 404</code></pre>

            <h4>Comparison</h4>
            <table>
                <tr><th>Feature</th><th>React Navigation</th><th>Expo Router</th></tr>
                <tr><td>Route definition</td><td>Config objects</td><td>File system</td></tr>
                <tr><td>Deep linking</td><td>Manual config</td><td>Automatic</td></tr>
                <tr><td>Type safety</td><td>Manual setup</td><td>Auto-generated</td></tr>
                <tr><td>Web support</td><td>Separate config</td><td>Built-in</td></tr>
                <tr><td>Learning curve</td><td>Moderate</td><td>Lower (if know Next.js)</td></tr>
            </table>

            <h4>Basic Usage</h4>
            <pre><code>// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="[id]" options={{ title: 'Details' }} />
        </Stack>
    );
}

// app/index.tsx
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View>
            <Link href="/about">About</Link>
            <Link href="/product/123">Product 123</Link>
            <Link href={{ pathname: '/user/[id]', params: { id: '456' } }}>
                User Profile
            </Link>
        </View>
    );
}

// Navigation hooks
import { useRouter, useLocalSearchParams } from 'expo-router';

function ProductScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <Button onPress={() => router.push('/checkout')} />
    );
}</code></pre>

            <h4>When to Use Each</h4>
            <ul>
                <li><strong>Expo Router:</strong> New projects, web support needed, prefer convention</li>
                <li><strong>React Navigation:</strong> Existing apps, complex custom navigators, more control</li>
            </ul>
        `
    },
    {
        id: 127,
        category: "Expo",
        icon: "📱",
        question: "What are Expo Config Plugins and when would you create one?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>What are Config Plugins?</h4>
            <p>Config Plugins let you customize native iOS/Android configuration without writing native code directly. They modify native files during prebuild.</p>

            <h4>When to Use</h4>
            <ul>
                <li>Add native SDK that requires Info.plist/AndroidManifest changes</li>
                <li>Modify build.gradle or Podfile settings</li>
                <li>Add custom entitlements or permissions</li>
                <li>Configure native libraries not yet supported by Expo</li>
            </ul>

            <h4>Using Existing Plugins</h4>
            <pre><code>// app.json
{
    "expo": {
        "plugins": [
            "expo-camera",
            ["expo-image-picker", { "cameraPermission": "Allow camera" }],
            ["expo-build-properties", {
                "android": { "compileSdkVersion": 34 },
                "ios": { "deploymentTarget": "14.0" }
            }]
        ]
    }
}</code></pre>

            <h4>Creating Custom Plugin</h4>
            <pre><code>// plugins/withCustomPermission.js
const { withInfoPlist, withAndroidManifest } = require('@expo/config-plugins');

function withCustomPermission(config, { permissionText }) {
    // Modify iOS Info.plist
    config = withInfoPlist(config, (config) => {
        config.modResults.NSCustomPermission = permissionText;
        return config;
    });

    // Modify Android Manifest
    config = withAndroidManifest(config, (config) => {
        const mainApp = config.modResults.manifest.application[0];
        mainApp.$['android:customAttribute'] = 'value';
        return config;
    });

    return config;
}

module.exports = withCustomPermission;

// Usage in app.json
{
    "plugins": [
        ["./plugins/withCustomPermission", { "permissionText": "We need this" }]
    ]
}</code></pre>

            <h4>Modifying Gradle</h4>
            <pre><code>const { withAppBuildGradle } = require('@expo/config-plugins');

function withCustomGradle(config) {
    return withAppBuildGradle(config, (config) => {
        config.modResults.contents = config.modResults.contents.replace(
            'dependencies {',
            \`dependencies {
    implementation 'com.custom:library:1.0.0'\`
        );
        return config;
    });
}

module.exports = withCustomGradle;</code></pre>

            <h4>Run Prebuild</h4>
            <pre><code># Generate native projects with plugins applied
npx expo prebuild

# Clean and regenerate
npx expo prebuild --clean</code></pre>
        `
    },
    {
        id: 128,
        category: "Expo",
        icon: "📱",
        question: "Explain the difference between Expo Go, Development Builds, and Production builds.",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>Build Types Comparison</h4>
            <table>
                <tr><th>Aspect</th><th>Expo Go</th><th>Dev Build</th><th>Production</th></tr>
                <tr><td>Native code</td><td>Pre-bundled</td><td>Custom</td><td>Custom</td></tr>
                <tr><td>Custom modules</td><td>❌</td><td>✅</td><td>✅</td></tr>
                <tr><td>Setup time</td><td>Instant</td><td>Build needed</td><td>Build needed</td></tr>
                <tr><td>App Store</td><td>❌</td><td>❌ (internal)</td><td>✅</td></tr>
                <tr><td>Debug tools</td><td>Limited</td><td>Full</td><td>None</td></tr>
            </table>

            <h4>Expo Go</h4>
            <pre><code>// Quick prototyping, no native code changes
// Just scan QR code to run

// Limitations:
- Can't use libraries requiring native code
- Fixed set of Expo SDK modules
- Can't customize app icon, splash, etc.

// Usage
npx expo start
// Scan QR with Expo Go app</code></pre>

            <h4>Development Build</h4>
            <pre><code>// Custom native code + dev tools
// Like Expo Go but with your native modules

// Create development build
npx expo install expo-dev-client
eas build --profile development --platform ios

// Or build locally
npx expo run:ios

// Benefits:
- Use any native library
- Custom native code
- Dev menu and debugging
- Internal distribution for team</code></pre>

            <h4>Production Build</h4>
            <pre><code>// Optimized for App Store / Play Store

// Create production build
eas build --profile production --platform all

// Characteristics:
- No dev tools
- Optimized bundle (minified, tree-shaken)
- Proper code signing
- Can be submitted to stores

// Submit to stores
eas submit --platform ios
eas submit --platform android</code></pre>

            <h4>Workflow Recommendation</h4>
            <pre><code>Development Flow:
1. Start with Expo Go for rapid prototyping
2. Switch to Dev Build when you need:
   - Custom native modules
   - Libraries not in Expo Go
   - Testing production-like behavior

3. Use Production Build for:
   - Beta testing (TestFlight, Internal Track)
   - App Store releases</code></pre>
        `
    },
    {
        id: 129,
        category: "Expo",
        icon: "📱",
        question: "How do you create a custom Expo Module with native code?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>Expo Modules API</h4>
            <p>Modern way to write native modules for Expo using Swift and Kotlin (no Objective-C or Java).</p>

            <h4>Create Module</h4>
            <pre><code># Create new module
npx create-expo-module my-module

# Structure created:
my-module/
├── src/
│   └── MyModule.ts        # JS interface
├── ios/
│   └── MyModule.swift     # iOS implementation
├── android/
│   └── MyModule.kt        # Android implementation
└── expo-module.config.json</code></pre>

            <h4>TypeScript Definition</h4>
            <pre><code>// src/MyModule.ts
import { NativeModule, requireNativeModule } from 'expo-modules-core';

interface MyModuleType extends NativeModule {
    PI: number;
    hello(): string;
    addAsync(a: number, b: number): Promise<number>;
}

export default requireNativeModule<MyModuleType>('MyModule');</code></pre>

            <h4>iOS Implementation (Swift)</h4>
            <pre><code>// ios/MyModule.swift
import ExpoModulesCore

public class MyModule: Module {
    public func definition() -> ModuleDefinition {
        Name("MyModule")

        // Constants
        Constants([
            "PI": Double.pi
        ])

        // Sync function
        Function("hello") {
            return "Hello from Swift!"
        }

        // Async function
        AsyncFunction("addAsync") { (a: Double, b: Double) -> Double in
            return a + b
        }

        // View component
        View(MyNativeView.self) {
            Prop("color") { (view, color: UIColor) in
                view.backgroundColor = color
            }

            Events("onPress")
        }
    }
}</code></pre>

            <h4>Android Implementation (Kotlin)</h4>
            <pre><code>// android/MyModule.kt
package expo.modules.mymodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("MyModule")

        Constants(
            "PI" to Math.PI
        )

        Function("hello") {
            "Hello from Kotlin!"
        }

        AsyncFunction("addAsync") { a: Double, b: Double ->
            a + b
        }
    }
}</code></pre>

            <h4>Using the Module</h4>
            <pre><code>import MyModule from 'my-module';

console.log(MyModule.PI);         // 3.14159...
console.log(MyModule.hello());    // "Hello from Swift/Kotlin!"

const sum = await MyModule.addAsync(2, 3);  // 5</code></pre>
        `
    },
    {
        id: 130,
        category: "Expo",
        icon: "📱",
        question: "What is Expo Prebuild and how does it enable bare workflow features in managed workflow?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>What is Prebuild?</h4>
            <p>Prebuild generates native iOS and Android projects from your app.json/app.config.js configuration, bridging managed and bare workflows.</p>

            <h4>How It Works</h4>
            <pre><code># Generate native projects
npx expo prebuild

# Result:
my-app/
├── app.json          # Configuration source
├── ios/              # Generated iOS project
│   ├── Podfile
│   └── MyApp.xcworkspace
├── android/          # Generated Android project
│   ├── build.gradle
│   └── app/
└── node_modules/</code></pre>

            <h4>Continuous Native Generation (CNG)</h4>
            <pre><code>// .gitignore - Don't commit native folders
/ios
/android

// Regenerate when needed
npx expo prebuild --clean

// Benefits:
- Native code is derived from config
- Upgrade RN by regenerating
- No merge conflicts in native code
- Consistent builds across team</code></pre>

            <h4>Configuration Flow</h4>
            <pre><code>// app.config.js → Config Plugins → Native Code

// app.config.js
export default {
    name: "My App",
    ios: {
        bundleIdentifier: "com.company.app",
        infoPlist: {
            NSCameraUsageDescription: "For photos"
        }
    },
    android: {
        package: "com.company.app",
        permissions: ["CAMERA"]
    },
    plugins: [
        "expo-camera",
        ["expo-build-properties", {
            ios: { deploymentTarget: "14.0" }
        }]
    ]
};

// Prebuild applies all config to native projects</code></pre>

            <h4>When to Use Prebuild</h4>
            <ul>
                <li><strong>Use Prebuild (regenerate):</strong>
                    <ul>
                        <li>Adding new native modules</li>
                        <li>Changing app.json config</li>
                        <li>Upgrading Expo SDK</li>
                        <li>CI/CD builds</li>
                    </ul>
                </li>
                <li><strong>Commit native folders (eject):</strong>
                    <ul>
                        <li>Heavy native customization</li>
                        <li>Manual native code changes</li>
                        <li>Legacy projects</li>
                    </ul>
                </li>
            </ul>

            <h4>Prebuild vs Eject</h4>
            <table>
                <tr><th>Prebuild (CNG)</th><th>Eject (Legacy)</th></tr>
                <tr><td>Regenerate native code</td><td>One-time generation</td></tr>
                <tr><td>Config-driven</td><td>Manual maintenance</td></tr>
                <tr><td>Easy upgrades</td><td>Manual upgrade work</td></tr>
                <tr><td>Modern approach</td><td>Deprecated pattern</td></tr>
            </table>
        `
    },

    // NOTE: Old System Design section (IDs 112-116) removed - questions now consolidated at IDs 69-91
    // ==================== TYPESCRIPT (EXPANDED) ====================
    {
        id: 131,
        category: "TypeScript",
        icon: "📘",
        question: "How do you create type-safe generic components in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Generic components enable reusability while maintaining full type safety. Interviewers assess your ability to write flexible, maintainable TypeScript code.</p>

            <h4>Generic List Component</h4>
            <pre><code>interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  onItemPress?: (item: T) => void;
}

function GenericList<T>({ data, renderItem, keyExtractor, onItemPress }: ListProps<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onItemPress?.(item)}>
          {renderItem(item, index)}
        </TouchableOpacity>
      )}
    />
  );
}

// Usage with full type inference
interface User { id: string; name: string; }
<GenericList<User>
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <Text>{user.name}</Text>}
  onItemPress={(user) => console.log(user.name)}
/></code></pre>

            <h4>Generic Form Hook</h4>
            <pre><code>function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  return { values, errors, setValue, setErrors };
}

// Type-safe usage
const { values, setValue } = useForm({ email: '', password: '' });
setValue('email', 'test@example.com'); // ✓ Type-safe
setValue('email', 123); // ✗ Error: number not assignable to string</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Use constraints (<code>extends</code>) to limit generic types</li>
                <li>Prefer inference over explicit type parameters when possible</li>
                <li>Generic components reduce code duplication significantly</li>
            </ul>
        `
    },
    {
        id: 132,
        category: "TypeScript",
        icon: "📘",
        question: "How do you implement type-safe navigation with React Navigation in TypeScript?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Type-safe navigation prevents runtime crashes from incorrect params and enables autocomplete. This is essential for large apps with complex navigation.</p>

            <h4>Define Navigation Types</h4>
            <pre><code>// navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root stack params
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Profile: { userId: string };
  Settings: { section?: 'account' | 'privacy' };
};

// Tab params
export type MainTabParamList = {
  Home: undefined;
  Search: { query?: string };
  Notifications: undefined;
};

// Screen props helper
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Nested navigation props
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;</code></pre>

            <h4>Type-Safe Screen Components</h4>
            <pre><code>// screens/ProfileScreen.tsx
function ProfileScreen({ route, navigation }: RootStackScreenProps<'Profile'>) {
  const { userId } = route.params; // Type: string

  // Type-safe navigation
  navigation.navigate('Settings', { section: 'account' }); // ✓
  navigation.navigate('Settings', { section: 'invalid' }); // ✗ Error
}

// Typed useNavigation hook
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function MyComponent() {
  const navigation = useNavigation<NavigationProp>();
  navigation.navigate('Profile', { userId: '123' }); // ✓ Type-safe
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always define param lists as types, not interfaces (for compatibility)</li>
                <li>Use <code>undefined</code> for screens with no params</li>
                <li>CompositeScreenProps handles nested navigators</li>
            </ul>
        `
    },
    {
        id: 133,
        category: "TypeScript",
        icon: "📘",
        question: "How do you type Redux or Zustand stores in React Native applications?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Properly typed state management prevents bugs and enables excellent developer experience with autocomplete and refactoring support.</p>

            <h4>Redux Toolkit Typing</h4>
            <pre><code>// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage
const user = useAppSelector(state => state.user); // Fully typed
const dispatch = useAppDispatch();
dispatch(setUser({ id: '1', name: 'John' })); // Type-checked</code></pre>

            <h4>Zustand Typing</h4>
            <pre><code>// store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        const { user, token } = await authApi.login(email, password);
        set({ user, token, isLoading: false });
      },
      logout: () => set({ user: null, token: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Usage - fully typed
const { user, login } = useAuthStore();
await login('email@test.com', 'password');</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always infer RootState from store, don't manually define it</li>
                <li>Create typed hooks to avoid repetitive type annotations</li>
                <li>Zustand's middleware requires the curried <code>create<State>()()</code> syntax</li>
            </ul>
        `
    },
    {
        id: 134,
        category: "TypeScript",
        icon: "📘",
        question: "How do you write declaration files for native modules in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>When using native modules without TypeScript support, you need declaration files for type safety. This shows deep TypeScript and RN integration knowledge.</p>

            <h4>Basic Native Module Declaration</h4>
            <pre><code>// types/react-native-custom-module.d.ts
declare module 'react-native-custom-module' {
  export interface CustomModuleOptions {
    timeout?: number;
    retryCount?: number;
  }

  export interface CustomModuleResult {
    success: boolean;
    data: string;
    timestamp: number;
  }

  export function initialize(apiKey: string): Promise<void>;
  export function performAction(
    action: string,
    options?: CustomModuleOptions
  ): Promise<CustomModuleResult>;
  export function cleanup(): void;

  const CustomModule: {
    initialize: typeof initialize;
    performAction: typeof performAction;
    cleanup: typeof cleanup;
  };

  export default CustomModule;
}</code></pre>

            <h4>NativeModules Extension</h4>
            <pre><code>// types/native-modules.d.ts
import { NativeModule } from 'react-native';

interface BiometricModule extends NativeModule {
  isSupported(): Promise<boolean>;
  authenticate(reason: string): Promise<{
    success: boolean;
    error?: string;
  }>;
  getBiometryType(): Promise<'FaceID' | 'TouchID' | 'Fingerprint' | null>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    BiometricModule: BiometricModule;
  }
}

// Usage
import { NativeModules } from 'react-native';
const { BiometricModule } = NativeModules;
const supported = await BiometricModule.isSupported(); // Typed!</code></pre>

            <h4>TurboModule Codegen Types</h4>
            <pre><code>// With New Architecture, use codegen spec
// specs/NativeBiometric.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isSupported(): Promise<boolean>;
  authenticate(reason: string): Promise<{ success: boolean }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Biometric');</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Place .d.ts files in a <code>types/</code> folder included in tsconfig</li>
                <li>Use module augmentation to extend existing types</li>
                <li>New Architecture codegen generates types automatically</li>
            </ul>
        `
    },
    {
        id: 135,
        category: "TypeScript",
        icon: "📘",
        question: "What are TypeScript strict mode best practices for React Native projects?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Strict mode catches bugs at compile time. Interviewers want to see you can configure and work with strict TypeScript effectively.</p>

            <h4>Recommended tsconfig.json</h4>
            <pre><code>{
  "compilerOptions": {
    // Strict mode flags
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Additional safety
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // React Native specific
    "jsx": "react-native",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}</code></pre>

            <h4>Handling Strict Null Checks</h4>
            <pre><code>// Bad: Will error with strictNullChecks
function getUser(id: string) {
  const user = users.find(u => u.id === id);
  return user.name; // Error: user might be undefined
}

// Good: Handle null case
function getUser(id: string): string | undefined {
  const user = users.find(u => u.id === id);
  return user?.name;
}

// Or assert non-null when certain
function getRequiredUser(id: string): string {
  const user = users.find(u => u.id === id);
  if (!user) throw new Error(\`User \${id} not found\`);
  return user.name;
}</code></pre>

            <h4>Type Guards for Runtime Safety</h4>
            <pre><code>// API response validation
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is { data: T; error: undefined } {
  return response.data !== undefined && !response.error;
}

// Usage
const response = await fetchUser(id);
if (isSuccessResponse(response)) {
  console.log(response.data.name); // data is guaranteed
} else {
  console.error(response.error);
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Enable strict mode from project start - retrofitting is painful</li>
                <li>Use type guards instead of type assertions when possible</li>
                <li><code>noUncheckedIndexedAccess</code> catches array access bugs</li>
            </ul>
        `
    },
    {
        id: 136,
        category: "TypeScript",
        icon: "📘",
        question: "How do you use type guards and discriminated unions effectively in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Type guards and discriminated unions enable type-safe handling of complex state and API responses, reducing runtime errors significantly.</p>

            <h4>Discriminated Unions for State</h4>
            <pre><code>// Network request state
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function UserProfile() {
  const [state, setState] = useState<RequestState<User>>({ status: 'idle' });

  // TypeScript narrows type based on status
  switch (state.status) {
    case 'idle':
      return <Text>Ready to load</Text>;
    case 'loading':
      return <ActivityIndicator />;
    case 'success':
      return <Text>{state.data.name}</Text>; // data exists here
    case 'error':
      return <Text>{state.error.message}</Text>; // error exists here
  }
}</code></pre>

            <h4>Custom Type Guards</h4>
            <pre><code>// Check if value is a specific type
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    typeof (value as User).id === 'string'
  );
}

// API response validation
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('Invalid user data');
  }
}

// Usage
const data = await api.getUser(id);
assertUser(data); // Throws if invalid
console.log(data.email); // TypeScript knows it's User</code></pre>

            <h4>Navigation Event Types</h4>
            <pre><code>type DeepLinkEvent =
  | { type: 'profile'; userId: string }
  | { type: 'product'; productId: string; variant?: string }
  | { type: 'settings'; section: 'account' | 'privacy' }
  | { type: 'unknown'; url: string };

function handleDeepLink(event: DeepLinkEvent) {
  switch (event.type) {
    case 'profile':
      navigation.navigate('Profile', { userId: event.userId });
      break;
    case 'product':
      navigation.navigate('Product', {
        id: event.productId,
        variant: event.variant // Optional, properly typed
      });
      break;
    case 'settings':
      navigation.navigate('Settings', { section: event.section });
      break;
    case 'unknown':
      console.warn('Unknown deep link:', event.url);
  }
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Discriminated unions use a common "tag" property (like <code>status</code> or <code>type</code>)</li>
                <li>Type guards return <code>value is Type</code> for narrowing</li>
                <li>Assertion functions use <code>asserts value is Type</code></li>
            </ul>
        `
    },
    // ==================== DEBUGGING (EXPANDED) ====================
    {
        id: 137,
        category: "Debugging",
        icon: "🐛",
        question: "How do you use React DevTools Profiler to identify performance issues in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>The Profiler is essential for finding unnecessary re-renders and slow components. Interviewers want to see practical debugging skills.</p>

            <h4>Setting Up React DevTools</h4>
            <pre><code>// Install standalone devtools
npm install -g react-devtools

// Run devtools
react-devtools

// In your app's index.js (dev only)
if (__DEV__) {
  require('react-devtools');
}</code></pre>

            <h4>Profiler Workflow</h4>
            <pre><code>1. Open React DevTools → Profiler tab
2. Click "Record" button
3. Perform the interaction you want to profile
4. Click "Stop" button
5. Analyze the flame graph

Key Metrics to Watch:
┌─────────────────────────────────────────┐
│ Commit Duration    │ Total render time  │
│ Render Count       │ How many re-renders│
│ Component Time     │ Per-component cost │
│ "Why did render?"  │ What prop changed  │
└─────────────────────────────────────────┘</code></pre>

            <h4>Finding Problematic Components</h4>
            <pre><code>// Enable "Highlight updates" in DevTools settings
// Components flash when they re-render

// Common issues to look for:
// 1. Components re-rendering on every parent render
// 2. Large lists re-rendering entirely
// 3. Context causing cascading re-renders

// Fix with React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  // Only re-renders when data changes
  return <ComplexVisualization data={data} />;
});

// Fix with useMemo for computed values
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Profile in release mode for accurate timings (dev mode is slower)</li>
                <li>Look for yellow/red components in the flame graph</li>
                <li>"Why did this render?" feature shows exact prop changes</li>
            </ul>
        `
    },
    {
        id: 138,
        category: "Debugging",
        icon: "🐛",
        question: "How do you debug native crashes in React Native on iOS and Android?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Native crashes require different debugging approaches than JS errors. Senior developers must be able to diagnose issues at all levels of the stack.</p>

            <h4>iOS Native Crash Debugging</h4>
            <pre><code>// 1. Check Xcode console for crash logs
// Product → Scheme → Edit Scheme → Run → Diagnostics
// Enable: Address Sanitizer, Thread Sanitizer

// 2. Symbolicate crash logs
// Window → Devices and Simulators → View Device Logs

// 3. Common iOS crash causes:
┌─────────────────────────────────────────┐
│ EXC_BAD_ACCESS   │ Memory access error  │
│ SIGABRT          │ Assertion failure    │
│ SIGKILL          │ System killed app    │
│ EXC_CRASH        │ Unhandled exception  │
└─────────────────────────────────────────┘

// 4. Enable crash reporting
// Add to AppDelegate.m:
- (BOOL)application:(UIApplication *)application didFinishLaunching... {
  NSSetUncaughtExceptionHandler(&handleException);
  signal(SIGABRT, handleSignal);
  signal(SIGSEGV, handleSignal);
}</code></pre>

            <h4>Android Native Crash Debugging</h4>
            <pre><code>// 1. Check logcat for crash stack traces
adb logcat *:E | grep -E "(FATAL|AndroidRuntime|crash)"

// 2. Use Android Studio Profiler
// View → Tool Windows → Logcat
// Filter by your app's package name

// 3. Common Android crash causes:
┌─────────────────────────────────────────┐
│ NullPointerException  │ Null reference   │
│ OutOfMemoryError      │ Memory exhausted │
│ IllegalStateException │ Invalid state    │
│ SecurityException     │ Permission issue │
└─────────────────────────────────────────┘

// 4. Enable strict mode for development
// In MainApplication.java:
if (BuildConfig.DEBUG) {
  StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
    .detectAll()
    .penaltyLog()
    .build());
}</code></pre>

            <h4>Crash Reporting Services</h4>
            <pre><code>// Sentry setup
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN',
  enableNativeCrashHandling: true,
  attachStacktrace: true,
});

// Firebase Crashlytics
import crashlytics from '@react-native-firebase/crashlytics';
crashlytics().recordError(new Error('Test crash'));</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always check both JS and native logs for crashes</li>
                <li>Use symbolication to convert addresses to function names</li>
                <li>Implement crash reporting before production release</li>
            </ul>
        `
    },
    {
        id: 139,
        category: "Debugging",
        icon: "🐛",
        question: "How do you detect and fix memory leaks in React Native applications?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Memory leaks cause app slowdowns and crashes. This tests your ability to diagnose complex issues that worsen over time.</p>

            <h4>Common Memory Leak Sources</h4>
            <pre><code>// 1. Uncleared subscriptions/listeners
useEffect(() => {
  const subscription = eventEmitter.addListener('event', handler);
  // LEAK: No cleanup!
});

// Fixed:
useEffect(() => {
  const subscription = eventEmitter.addListener('event', handler);
  return () => subscription.remove(); // Cleanup!
}, []);

// 2. Uncleared timers
useEffect(() => {
  setInterval(() => updateData(), 1000);
  // LEAK: Timer runs forever
});

// Fixed:
useEffect(() => {
  const timer = setInterval(() => updateData(), 1000);
  return () => clearInterval(timer);
}, []);

// 3. State updates on unmounted components
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then(result => setData(result)); // LEAK if unmounted
});

// Fixed:
useEffect(() => {
  let mounted = true;
  fetchData().then(result => {
    if (mounted) setData(result);
  });
  return () => { mounted = false; };
}, []);</code></pre>

            <h4>Detection Tools</h4>
            <pre><code>// Flipper Memory Plugin
// 1. Open Flipper → Memory tab
// 2. Take heap snapshot before and after navigation
// 3. Compare retained objects

// Xcode Memory Graph Debugger
// Debug → Debug Workflow → View Memory Graph
// Look for unexpected retained objects

// Android Profiler
// View → Tool Windows → Profiler → Memory
// Record allocations during suspected leak

// why-did-you-render library
import React from 'react';
if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, { trackAllPureComponents: true });
}</code></pre>

            <h4>Automated Leak Detection</h4>
            <pre><code>// Custom hook for leak detection in dev
function useLeakDetection(componentName: string) {
  useEffect(() => {
    if (__DEV__) {
      console.log(\`[Mount] \${componentName}\`);
      return () => console.log(\`[Unmount] \${componentName}\`);
    }
  }, []);
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always return cleanup functions from useEffect</li>
                <li>Use AbortController for fetch requests</li>
                <li>Profile memory before and after navigation flows</li>
            </ul>
        `
    },
    {
        id: 140,
        category: "Debugging",
        icon: "🐛",
        question: "What is the difference between remote debugging and Hermes inspector? When should you use each?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Understanding debugging tools helps you choose the right approach for different issues. This shows practical debugging experience.</p>

            <h4>Comparison Table</h4>
            <pre><code>┌───────────────────┬─────────────────────┬─────────────────────┐
│ Feature           │ Remote Debugging    │ Hermes Inspector    │
├───────────────────┼─────────────────────┼─────────────────────┤
│ JS Engine         │ Chrome V8           │ Hermes              │
│ Performance       │ Slower (different   │ Accurate (same      │
│                   │ engine)             │ engine as prod)     │
│ Breakpoints       │ ✓ Full support      │ ✓ Full support      │
│ Network Tab       │ ✗ Not available     │ ✓ Via Flipper       │
│ Console           │ ✓ Full support      │ ✓ Full support      │
│ Profiling         │ ✗ Inaccurate        │ ✓ Accurate          │
│ Setup             │ Shake → Debug       │ Flipper/Chrome      │
└───────────────────┴─────────────────────┴─────────────────────┘</code></pre>

            <h4>Remote Debugging (Legacy)</h4>
            <pre><code>// Shake device → "Debug with Chrome"
// Opens chrome://inspect

// Pros:
// - Familiar Chrome DevTools interface
// - Good for quick debugging
// - Works without Hermes

// Cons:
// - JS runs in Chrome V8, not Hermes
// - Timing issues (async bridge communication)
// - Can hide/cause different bugs
// - Deprecated for Hermes apps</code></pre>

            <h4>Hermes Inspector (Recommended)</h4>
            <pre><code>// Option 1: Direct Chrome connection
// chrome://inspect → Configure → localhost:8081

// Option 2: Flipper (recommended)
// - Download Flipper from fbflipper.com
// - Connect device/emulator
// - Use Hermes Debugger plugin

// Enable Hermes in android/app/build.gradle:
project.ext.react = [
    enableHermes: true
]

// metro.config.js - ensure source maps
module.exports = {
  transformer: {
    minifierConfig: {
      sourceMap: { includeSources: true }
    }
  }
};</code></pre>

            <h4>When to Use Each</h4>
            <pre><code>Use Hermes Inspector when:
✓ Debugging performance issues
✓ Investigating timing-sensitive bugs
✓ Profiling JavaScript execution
✓ Production-like debugging

Use Remote Debugging when:
✓ Quick inspection of state/props
✓ Apps without Hermes enabled
✓ Rapid prototyping/learning</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Hermes is the default and recommended engine since RN 0.70</li>
                <li>Remote debugging runs code in a different engine - results may differ</li>
                <li>Flipper provides additional tools like network inspection</li>
            </ul>
        `
    },
    // ==================== SECURITY (EXPANDED) ====================
    {
        id: 141,
        category: "Security",
        icon: "🔒",
        question: "How do you implement secure storage using Keychain (iOS) and Keystore (Android)?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Storing sensitive data properly is critical for app security. This tests knowledge of platform-specific secure storage mechanisms.</p>

            <h4>react-native-keychain Usage</h4>
            <pre><code>import * as Keychain from 'react-native-keychain';

// Store credentials securely
async function saveCredentials(username: string, password: string) {
  await Keychain.setGenericPassword(username, password, {
    service: 'com.myapp.auth',
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

// Retrieve credentials
async function getCredentials() {
  const credentials = await Keychain.getGenericPassword({
    service: 'com.myapp.auth',
  });
  if (credentials) {
    return { username: credentials.username, password: credentials.password };
  }
  return null;
}

// Delete credentials
async function clearCredentials() {
  await Keychain.resetGenericPassword({ service: 'com.myapp.auth' });
}</code></pre>

            <h4>Security Levels Comparison</h4>
            <pre><code>┌────────────────────────┬──────────────┬─────────────────────┐
│ Storage Method         │ Security     │ Use Case            │
├────────────────────────┼──────────────┼─────────────────────┤
│ AsyncStorage           │ ❌ None      │ Non-sensitive prefs │
│ Encrypted AsyncStorage │ ⚠️ Medium   │ Moderate sensitivity│
│ Keychain/Keystore      │ ✅ High      │ Tokens, passwords   │
│ Secure Enclave         │ ✅ Highest   │ Cryptographic keys  │
└────────────────────────┴──────────────┴─────────────────────┘</code></pre>

            <h4>Advanced: Store Encryption Keys</h4>
            <pre><code>import * as Keychain from 'react-native-keychain';
import CryptoJS from 'crypto-js';

// Generate and store encryption key
async function setupEncryption() {
  let credentials = await Keychain.getGenericPassword({
    service: 'encryption-key'
  });

  if (!credentials) {
    // Generate random key
    const key = CryptoJS.lib.WordArray.random(256/8).toString();
    await Keychain.setGenericPassword('key', key, {
      service: 'encryption-key',
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return key;
  }
  return credentials.password;
}

// Encrypt sensitive data
function encryptData(data: string, key: string): string {
  return CryptoJS.AES.encrypt(data, key).toString();
}

// Decrypt data
function decryptData(encrypted: string, key: string): string {
  return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Never store tokens in AsyncStorage - use Keychain/Keystore</li>
                <li>Use <code>WHEN_UNLOCKED_THIS_DEVICE_ONLY</code> for maximum security</li>
                <li>Keychain data persists across app reinstalls on iOS</li>
            </ul>
        `
    },
    {
        id: 142,
        category: "Security",
        icon: "🔒",
        question: "How do you implement certificate pinning in React Native to prevent MITM attacks?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Certificate pinning prevents man-in-the-middle attacks even when device is compromised. Essential for apps handling sensitive data.</p>

            <h4>Using react-native-ssl-pinning</h4>
            <pre><code>import { fetch as sslFetch } from 'react-native-ssl-pinning';

// Option 1: Pin to certificate
const response = await sslFetch('https://api.myapp.com/data', {
  method: 'GET',
  sslPinning: {
    certs: ['cert1', 'cert2'], // Certificate file names (without extension)
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Option 2: Pin to public key hash (recommended)
const response = await sslFetch('https://api.myapp.com/data', {
  method: 'POST',
  sslPinning: {
    certs: ['sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='],
  },
  body: JSON.stringify(data),
});</code></pre>

            <h4>Getting Certificate Hash</h4>
            <pre><code># Get SHA256 hash for pinning
openssl s_client -servername api.myapp.com -connect api.myapp.com:443 | \\
  openssl x509 -pubkey -noout | \\
  openssl rsa -pubin -outform der | \\
  openssl dgst -sha256 -binary | \\
  openssl enc -base64

# Output: sha256/AAAA...= (use this for pinning)</code></pre>

            <h4>Native Implementation (iOS)</h4>
            <pre><code>// ios/MyApp/AppDelegate.m
#import &lt;TrustKit/TrustKit.h&gt;

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  NSDictionary *trustKitConfig = @{
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains: @{
      @"api.myapp.com": @{
        kTSKIncludeSubdomains: @YES,
        kTSKPublicKeyHashes: @[
          @"sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
          @"sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=", // Backup
        ],
      },
    },
  };
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
}</code></pre>

            <h4>Best Practices</h4>
            <pre><code>// 1. Always pin backup certificates
// 2. Handle pinning failures gracefully
try {
  const response = await sslFetch(url, options);
} catch (error) {
  if (error.message.includes('SSL')) {
    // Log security event
    analytics.track('ssl_pinning_failure', { url });
    // Show user-friendly error
    Alert.alert('Security Error', 'Unable to establish secure connection');
  }
}

// 3. Plan for certificate rotation
// Pin to multiple certs including upcoming ones</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Public key pinning survives certificate renewal</li>
                <li>Always have backup pins for certificate rotation</li>
                <li>Test pinning with proxy tools like Charles/mitmproxy</li>
            </ul>
        `
    },
    {
        id: 143,
        category: "Security",
        icon: "🔒",
        question: "How do you implement biometric authentication (Face ID/Touch ID/Fingerprint) in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Biometric auth improves UX while maintaining security. This is increasingly expected in modern apps.</p>

            <h4>Using react-native-biometrics</h4>
            <pre><code>import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

// Check availability
async function checkBiometrics() {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable();

  if (available) {
    switch (biometryType) {
      case BiometryTypes.TouchID:
        return 'Touch ID available';
      case BiometryTypes.FaceID:
        return 'Face ID available';
      case BiometryTypes.Biometrics:
        return 'Biometrics available (Android)';
    }
  }
  return 'Biometrics not available';
}

// Simple authentication
async function authenticate() {
  const { success, error } = await rnBiometrics.simplePrompt({
    promptMessage: 'Confirm your identity',
    cancelButtonText: 'Cancel',
  });

  if (success) {
    console.log('Authentication successful');
    return true;
  }
  console.log('Authentication failed:', error);
  return false;
}</code></pre>

            <h4>Cryptographic Biometric Auth</h4>
            <pre><code>// Generate keys protected by biometrics
async function setupBiometricKeys() {
  const { publicKey } = await rnBiometrics.createKeys();
  // Send publicKey to server for registration
  await api.registerBiometricKey(publicKey);
}

// Sign data with biometric-protected key
async function biometricLogin() {
  const payload = JSON.stringify({
    userId: 'user123',
    timestamp: Date.now(),
  });

  const { success, signature } = await rnBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload,
  });

  if (success) {
    // Server verifies signature with stored public key
    const { token } = await api.verifyBiometricSignature({
      payload,
      signature,
    });
    return token;
  }
  throw new Error('Biometric authentication failed');
}</code></pre>

            <h4>Fallback Strategy</h4>
            <pre><code>async function authenticateUser() {
  const { available } = await rnBiometrics.isSensorAvailable();

  if (available) {
    const biometricResult = await authenticate();
    if (biometricResult) return true;
  }

  // Fallback to PIN/password
  return showPinInput();
}

// iOS: Add to Info.plist
// &lt;key&gt;NSFaceIDUsageDescription&lt;/key&gt;
// &lt;string&gt;Authenticate to access your account&lt;/string&gt;</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always provide fallback authentication method</li>
                <li>Use cryptographic biometrics for high-security apps</li>
                <li>iOS requires NSFaceIDUsageDescription in Info.plist</li>
            </ul>
        `
    },
    {
        id: 144,
        category: "Security",
        icon: "🔒",
        question: "How do you prevent sensitive data from appearing in logs and screenshots in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Data leakage through logs and screenshots is a common security oversight. This tests awareness of production security practices.</p>

            <h4>Preventing Logging in Production</h4>
            <pre><code>// babel.config.js - Remove console in production
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};

// Or selective logging wrapper
const logger = {
  log: (...args) => {
    if (__DEV__) console.log(...args);
  },
  error: (...args) => {
    // Always log errors but sanitize sensitive data
    const sanitized = args.map(arg => sanitize(arg));
    console.error(...sanitized);
  },
};

function sanitize(data) {
  if (typeof data === 'object') {
    const copy = { ...data };
    const sensitiveKeys = ['password', 'token', 'ssn', 'creditCard'];
    sensitiveKeys.forEach(key => {
      if (copy[key]) copy[key] = '[REDACTED]';
    });
    return copy;
  }
  return data;
}</code></pre>

            <h4>Preventing Screenshots</h4>
            <pre><code>// iOS: Blur when app goes to background
// AppDelegate.m
- (void)applicationWillResignActive:(UIApplication *)application {
  UIBlurEffect *blur = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
  UIVisualEffectView *blurView = [[UIVisualEffectView alloc] initWithEffect:blur];
  blurView.frame = self.window.bounds;
  blurView.tag = 1234;
  [self.window addSubview:blurView];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [[self.window viewWithTag:1234] removeFromSuperview];
}

// Android: Prevent screenshots
// MainActivity.java
import android.view.WindowManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  getWindow().setFlags(
    WindowManager.LayoutParams.FLAG_SECURE,
    WindowManager.LayoutParams.FLAG_SECURE
  );
}</code></pre>

            <h4>React Native Implementation</h4>
            <pre><code>import { useEffect } from 'react';
import { AppState, Platform, NativeModules } from 'react-native';

function useScreenshotPrevention() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NativeModules.PreventScreenshot?.enable();
      return () => NativeModules.PreventScreenshot?.disable();
    }
  }, []);
}

// Mask sensitive fields in app switcher
function SensitiveScreen() {
  const [isBackground, setIsBackground] = useState(false);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      setIsBackground(state !== 'active');
    });
    return () => sub.remove();
  }, []);

  if (isBackground) {
    return <View style={styles.masked}><Text>Content Hidden</Text></View>;
  }
  return <SensitiveContent />;
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Remove console.log in production builds</li>
                <li>Use FLAG_SECURE on Android for sensitive screens</li>
                <li>Blur/hide content when app enters background</li>
            </ul>
        `
    },
    // ==================== OFFLINE & STORAGE (EXPANDED) ====================
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
    // ==================== ARCHITECTURE (EXPANDED) ====================
    {
        id: 149,
        category: "Architecture",
        icon: "🏛️",
        question: "How do you set up a monorepo for React Native with shared code across platforms?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Monorepos enable code sharing across mobile, web, and backend. This tests your ability to architect scalable project structures.</p>

            <h4>Monorepo Structure with Turborepo</h4>
            <pre><code>my-monorepo/
├── apps/
│   ├── mobile/              # React Native app
│   │   ├── src/
│   │   ├── ios/
│   │   ├── android/
│   │   └── package.json
│   ├── web/                 # Next.js/React web app
│   │   └── package.json
│   └── admin/               # Admin dashboard
│       └── package.json
├── packages/
│   ├── ui/                  # Shared UI components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── utils/               # Shared utilities
│   ├── api-client/          # API client
│   ├── types/               # Shared TypeScript types
│   └── config/              # Shared configs (eslint, tsconfig)
├── turbo.json
├── package.json
└── pnpm-workspace.yaml</code></pre>

            <h4>Workspace Configuration</h4>
            <pre><code>// pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'

// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}

// Root package.json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "mobile": "turbo run dev --filter=mobile",
    "web": "turbo run dev --filter=web"
  }
}</code></pre>

            <h4>Cross-Platform UI Package</h4>
            <pre><code>// packages/ui/src/Button.tsx
import { Platform } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  // Works on both web and native
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, styles[variant]]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

// packages/ui/package.json
{
  "name": "@myapp/ui",
  "main": "src/index.ts",
  "react-native": "src/index.ts"
}</code></pre>

            <h4>Metro Config for Monorepo</h4>
            <pre><code>// apps/mobile/metro.config.js
const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Use pnpm for better monorepo performance</li>
                <li>Turborepo caches builds for faster CI</li>
                <li>Keep platform-specific code in apps/, shared in packages/</li>
            </ul>
        `
    },
    {
        id: 150,
        category: "Architecture",
        icon: "🏛️",
        question: "How do you implement Clean Architecture in a React Native application?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Clean Architecture separates concerns and makes code testable and maintainable. This tests advanced architectural thinking.</p>

            <h4>Layer Structure</h4>
            <pre><code>src/
├── domain/                    # Business logic (innermost)
│   ├── entities/
│   │   └── User.ts
│   ├── repositories/          # Interfaces only
│   │   └── UserRepository.ts
│   └── usecases/
│       └── GetUserUseCase.ts
├── data/                      # Data layer
│   ├── repositories/          # Implementations
│   │   └── UserRepositoryImpl.ts
│   ├── datasources/
│   │   ├── remote/
│   │   └── local/
│   └── models/
│       └── UserDTO.ts
├── presentation/              # UI layer (outermost)
│   ├── screens/
│   ├── components/
│   ├── viewmodels/
│   └── navigation/
└── di/                        # Dependency injection
    └── container.ts</code></pre>

            <h4>Domain Layer (Pure Business Logic)</h4>
            <pre><code>// domain/entities/User.ts
export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
}

// domain/repositories/UserRepository.ts
export interface UserRepository {
  getUser(id: string): Promise<User>;
  updateUser(user: User): Promise<void>;
}

// domain/usecases/GetUserUseCase.ts
export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.getUser(userId);
    // Business logic here
    return user;
  }
}</code></pre>

            <h4>Data Layer (External Dependencies)</h4>
            <pre><code>// data/repositories/UserRepositoryImpl.ts
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private api: ApiClient,
    private cache: CacheService
  ) {}

  async getUser(id: string): Promise<User> {
    // Check cache first
    const cached = await this.cache.get(\`user:\${id}\`);
    if (cached) return this.mapToEntity(cached);

    // Fetch from API
    const dto = await this.api.get<UserDTO>(\`/users/\${id}\`);
    await this.cache.set(\`user:\${id}\`, dto);
    return this.mapToEntity(dto);
  }

  private mapToEntity(dto: UserDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      name: \`\${dto.firstName} \${dto.lastName}\`,
      isPremium: dto.subscription === 'premium',
    };
  }
}</code></pre>

            <h4>Presentation Layer (UI + ViewModel)</h4>
            <pre><code>// presentation/viewmodels/useUserViewModel.ts
export function useUserViewModel(userId: string) {
  const getUserUseCase = useInjection(GetUserUseCase);
  const [state, setState] = useState<ViewState>({ status: 'idle' });

  const loadUser = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const user = await getUserUseCase.execute(userId);
      setState({ status: 'success', data: user });
    } catch (error) {
      setState({ status: 'error', error });
    }
  }, [userId]);

  return { state, loadUser };
}

// presentation/screens/ProfileScreen.tsx
function ProfileScreen({ userId }) {
  const { state, loadUser } = useUserViewModel(userId);
  // UI only cares about state, not implementation
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Domain layer has zero dependencies on frameworks</li>
                <li>Use dependency injection for testability</li>
                <li>Data flows inward; dependencies point inward</li>
            </ul>
        `
    },
    {
        id: 151,
        category: "Architecture",
        icon: "🏛️",
        question: "How do you structure a feature-based folder architecture in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Feature-based structure scales better than type-based organization. This shows practical experience with large codebases.</p>

            <h4>Feature-Based Structure</h4>
            <pre><code>src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── store/
│   │   │   └── authSlice.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts            # Public exports
│   ├── profile/
│   │   ├── components/
│   │   ├── screens/
│   │   └── index.ts
│   └── checkout/
│       └── ...
├── shared/                     # Cross-feature code
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── hooks/
│   ├── utils/
│   └── services/
├── navigation/
│   └── RootNavigator.tsx
└── App.tsx</code></pre>

            <h4>Feature Module Pattern</h4>
            <pre><code>// features/auth/index.ts
// Only export public API of the feature
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';
export { useAuth } from './hooks/useAuth';
export { authReducer } from './store/authSlice';
export type { User, AuthState } from './types/auth.types';

// Internal components stay private
// Don't export: LoginForm, validation utils, etc.

// Usage from another feature
import { useAuth, User } from '@/features/auth';
// NOT: import { LoginForm } from '@/features/auth/components/LoginForm';</code></pre>

            <h4>Path Aliases Configuration</h4>
            <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}

// babel.config.js
module.exports = {
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@': './src',
        '@features': './src/features',
        '@shared': './src/shared',
      },
    }],
  ],
};</code></pre>

            <h4>Feature Boundaries</h4>
            <pre><code>// Rules for feature boundaries:

// ✓ Feature can import from shared/
import { Button } from '@shared/components';

// ✓ Feature can import public exports from other features
import { useAuth } from '@features/auth';

// ✗ Never import internal files from other features
import { LoginForm } from '@features/auth/components/LoginForm';

// ✗ Never create circular dependencies between features
// If two features need to share, move to shared/</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Each feature should be deletable without breaking others</li>
                <li>Use barrel exports (index.ts) to define public API</li>
                <li>Shared folder contains truly generic, reusable code</li>
            </ul>
        `
    },
    {
        id: 152,
        category: "Architecture",
        icon: "🏛️",
        question: "How do you build a design system architecture for React Native apps?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Design systems ensure UI consistency and speed up development. This tests your ability to create scalable, maintainable component libraries.</p>

            <h4>Design System Structure</h4>
            <pre><code>design-system/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── primitives/
│   ├── Box.tsx
│   ├── Text.tsx
│   └── Pressable.tsx
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   └── Card/
├── patterns/
│   ├── FormField/
│   └── ListItem/
└── theme/
    ├── ThemeProvider.tsx
    └── useTheme.ts</code></pre>

            <h4>Design Tokens</h4>
            <pre><code>// tokens/colors.ts
export const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    500: '#2196F3',
    900: '#0D47A1',
  },
  neutral: {
    0: '#FFFFFF',
    100: '#F5F5F5',
    900: '#212121',
  },
  semantic: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  },
} as const;

// tokens/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// tokens/typography.ts
export const typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
} as const;</code></pre>

            <h4>Primitive Components</h4>
            <pre><code>// primitives/Box.tsx
interface BoxProps extends ViewProps {
  p?: keyof typeof spacing;
  m?: keyof typeof spacing;
  bg?: string;
  flex?: number;
  row?: boolean;
}

export function Box({ p, m, bg, flex, row, style, ...props }: BoxProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        p && { padding: spacing[p] },
        m && { margin: spacing[m] },
        bg && { backgroundColor: bg },
        flex && { flex },
        row && { flexDirection: 'row' },
        style,
      ]}
      {...props}
    />
  );
}

// Usage
<Box p="md" bg={colors.neutral[100]} row>
  <Text variant="body">Hello</Text>
</Box></code></pre>

            <h4>Component Variants</h4>
            <pre><code>// components/Button/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onPress: () => void;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary[500] },
  secondary: { backgroundColor: colors.neutral[100] },
  ghost: { backgroundColor: 'transparent' },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  children,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[variantStyles[variant], sizeStyles[size]]}
    >
      {loading ? <ActivityIndicator /> : children}
    </Pressable>
  );
}</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Tokens are the foundation - components use tokens, never raw values</li>
                <li>Primitives handle layout; components handle specific UI patterns</li>
                <li>Use TypeScript for variant autocomplete and validation</li>
            </ul>
        `
    },
    // ==================== REAL-WORLD SCENARIOS (EXPANDED) ====================
    {
        id: 153,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "How would you migrate a large Expo app to bare React Native workflow?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Migration decisions impact development velocity and capabilities. This tests strategic thinking and practical experience.</p>

            <h4>Migration Decision Framework</h4>
            <pre><code>Consider migrating when:
✓ Need custom native modules not supported by Expo
✓ Require specific native SDK integrations
✓ App size optimization is critical
✓ Need full control over native build process

Stay with Expo when:
✓ Rapid iteration is priority
✓ Team lacks native development experience
✓ Using Expo's managed services (EAS, updates)
✓ Features are available in Expo SDK</code></pre>

            <h4>Step-by-Step Migration</h4>
            <pre><code>// Step 1: Eject from Expo
npx expo prebuild

// This generates:
// - ios/ folder with Xcode project
// - android/ folder with Gradle project
// - Updates package.json with native dependencies

// Step 2: Audit Expo dependencies
// Replace expo-* packages with community alternatives:
expo-camera → react-native-camera / vision-camera
expo-location → react-native-geolocation-service
expo-notifications → react-native-push-notification
expo-file-system → react-native-fs

// Step 3: Update imports
// Before:
import * as Location from 'expo-location';

// After:
import Geolocation from 'react-native-geolocation-service';</code></pre>

            <h4>Handling Expo-Specific Features</h4>
            <pre><code>// OTA Updates: expo-updates → CodePush
// Before (Expo):
import * as Updates from 'expo-updates';
await Updates.checkForUpdateAsync();

// After (CodePush):
import codePush from 'react-native-code-push';
codePush.sync({ updateDialog: true });

// Auth Session replacement
// expo-auth-session → react-native-app-auth
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: 'YOUR_CLIENT_ID',
  redirectUrl: 'com.myapp:/oauth2redirect',
  scopes: ['openid', 'profile'],
};

const result = await authorize(config);</code></pre>

            <h4>Migration Checklist</h4>
            <pre><code>□ Run 'expo prebuild' to generate native projects
□ Audit all expo-* dependencies
□ Replace with community alternatives
□ Update native project configurations
□ Set up native build pipeline (Fastlane/CI)
□ Configure code signing (iOS) and signing keys (Android)
□ Test all features on physical devices
□ Update deployment process
□ Document new native development setup</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Consider Expo Dev Client as middle ground</li>
                <li>Migrate incrementally - one module at a time</li>
                <li>Plan for increased maintenance burden</li>
            </ul>
        `
    },
    {
        id: 154,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "How do you handle app store rejections in React Native apps?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>App store rejections delay releases and frustrate stakeholders. This tests your knowledge of platform guidelines and debugging skills.</p>

            <h4>Common iOS Rejection Reasons</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Rejection Type          │ Solution                  │
├─────────────────────────┼───────────────────────────┤
│ Guideline 2.1 - Crashes │ Test all flows, fix bugs  │
│ Guideline 2.3 - Metadata│ Accurate screenshots/desc │
│ Guideline 4.2 - Spam    │ Unique value proposition  │
│ Guideline 5.1 - Privacy │ Add privacy policy, IDFA  │
│ Guideline 3.1 - Payments│ Use StoreKit for digital  │
└─────────────────────────┴───────────────────────────┘</code></pre>

            <h4>Privacy & Permissions</h4>
            <pre><code>// ios/MyApp/Info.plist - Required usage descriptions
&lt;key&gt;NSCameraUsageDescription&lt;/key&gt;
&lt;string&gt;Take photos for your profile&lt;/string&gt;

&lt;key&gt;NSPhotoLibraryUsageDescription&lt;/key&gt;
&lt;string&gt;Select photos from your library&lt;/string&gt;

&lt;key&gt;NSLocationWhenInUseUsageDescription&lt;/key&gt;
&lt;string&gt;Find nearby stores&lt;/string&gt;

// App Tracking Transparency (iOS 14.5+)
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

async function requestTracking() {
  const { status } = await requestTrackingPermissionsAsync();
  if (status === 'granted') {
    // Enable analytics with IDFA
  }
}</code></pre>

            <h4>Android Rejection Handling</h4>
            <pre><code>// Common Google Play rejections:

// 1. Policy violation: Permissions
// Only request permissions you actually need
// Explain why in store listing

// 2. Target API level
// android/app/build.gradle
android {
  defaultConfig {
    targetSdkVersion 34  // Must meet current requirement
  }
}

// 3. Data Safety form
// Declare all data collection in Play Console
// Be specific: what data, why, shared with whom

// 4. App content rating
// Complete the content rating questionnaire accurately</code></pre>

            <h4>Rejection Response Strategy</h4>
            <pre><code>// 1. Read rejection carefully - understand specific issue

// 2. Check Resolution Center for details
// Apple often provides specific feedback

// 3. If unclear, reply requesting clarification:
"Thank you for your feedback. Could you please provide
more details about which specific feature or screen
triggered this rejection? We want to ensure we address
the correct issue."

// 4. Document changes made:
"We have addressed the issue by:
1. Removing X feature
2. Adding privacy disclosure for Y
3. Updating screenshots to reflect Z"

// 5. Keep records for future submissions</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Test on physical devices before submission</li>
                <li>Read App Store Review Guidelines thoroughly</li>
                <li>Use TestFlight/Internal Testing before production</li>
            </ul>
        `
    },
    {
        id: 155,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "How do you achieve a crash-free release in React Native?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Crash-free rates directly impact user retention and app store ranking. This tests quality assurance and release management skills.</p>

            <h4>Pre-Release Checklist</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Phase             │ Actions                         │
├───────────────────┼─────────────────────────────────┤
│ Development       │ TypeScript strict mode          │
│                   │ ESLint with strict rules        │
│                   │ Unit tests for business logic   │
├───────────────────┼─────────────────────────────────┤
│ Testing           │ Integration tests               │
│                   │ E2E tests (Detox)               │
│                   │ Manual QA on devices            │
├───────────────────┼─────────────────────────────────┤
│ Pre-Release       │ Beta testing (TestFlight)       │
│                   │ Staged rollout (1% → 100%)      │
│                   │ Crash monitoring active         │
├───────────────────┼─────────────────────────────────┤
│ Post-Release      │ Monitor crash-free rate         │
│                   │ Quick hotfix process ready      │
│                   │ Rollback plan prepared          │
└───────────────────┴─────────────────────────────────┘</code></pre>

            <h4>Error Boundaries for JS Crashes</h4>
            <pre><code>class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Report to crash service
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text>Something went wrong</Text>
          <Button
            title="Try Again"
            onPress={() => this.setState({ hasError: false })}
          />
        </View>
      );
    }
    return this.props.children;
  }
}

// Wrap critical sections
<ErrorBoundary>
  <PaymentFlow />
</ErrorBoundary></code></pre>

            <h4>Staged Rollout Strategy</h4>
            <pre><code>// Google Play staged rollout
Day 1: 1% of users
Day 2: 5% if crash-free > 99%
Day 3: 20% if crash-free > 99%
Day 5: 50% if crash-free > 99%
Day 7: 100% if stable

// iOS: Use phased release
// App Store Connect → Phased Release
// Automatically rolls out over 7 days

// CodePush for JS-only fixes
codePush.sync({
  deploymentKey: PRODUCTION_KEY,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  rollbackRetryOptions: {
    delayInHours: 24,
    maxRetryAttempts: 3,
  },
});</code></pre>

            <h4>Crash Monitoring Setup</h4>
            <pre><code>// Sentry configuration
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,
  tracesSampleRate: 0.2,
  beforeSend(event) {
    // Sanitize sensitive data
    if (event.user) {
      delete event.user.email;
    }
    return event;
  },
});

// Set user context for better debugging
Sentry.setUser({ id: userId });
Sentry.setTag('app_version', appVersion);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Target 99.5%+ crash-free rate</li>
                <li>Have rollback/hotfix process ready before release</li>
                <li>Use feature flags to disable problematic features</li>
            </ul>
        `
    },
    {
        id: 156,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "Describe how you would debug a production performance regression.",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Production issues require systematic debugging without access to user devices. This tests real-world problem-solving skills.</p>

            <h4>Investigation Workflow</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Step 1: Identify Scope                              │
├─────────────────────────────────────────────────────┤
│ - Which version introduced the regression?          │
│ - Which screens/features are affected?              │
│ - Which devices/OS versions?                        │
│ - What % of users are impacted?                     │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│ Step 2: Gather Data                                 │
├─────────────────────────────────────────────────────┤
│ - Performance monitoring (Firebase/Sentry)          │
│ - User feedback/support tickets                     │
│ - App store reviews mentioning slowness             │
│ - Compare metrics: before vs after release          │
└─────────────────────────────────────────────────────┘</code></pre>

            <h4>Remote Performance Monitoring</h4>
            <pre><code>// Track custom performance metrics
import perf from '@react-native-firebase/perf';

async function measureScreenLoad(screenName: string) {
  const trace = await perf().newTrace(\`screen_\${screenName}\`);
  await trace.start();

  // Screen renders...

  await trace.stop();
}

// Track specific operations
const httpMetric = await perf().newHttpMetric(url, 'GET');
await httpMetric.start();
const response = await fetch(url);
httpMetric.setHttpResponseCode(response.status);
httpMetric.setResponseContentType(response.headers.get('Content-Type'));
await httpMetric.stop();</code></pre>

            <h4>Reproduce Locally</h4>
            <pre><code>// 1. Match production environment
// - Use release build, not debug
cd android && ./gradlew assembleRelease
cd ios && xcodebuild -configuration Release

// 2. Test on same device models reported
// Use Firebase Test Lab or BrowserStack

// 3. Profile with production-like data
// Import anonymized production data

// 4. Use Flipper/Profiler in release
// Add to metro.config.js for release profiling
module.exports = {
  transformer: {
    minifierConfig: {
      keep_fnames: true, // Keep function names for profiling
    },
  },
};</code></pre>

            <h4>Common Regression Causes</h4>
            <pre><code>// 1. New dependency with performance issues
// Check: package-lock.json diff between versions

// 2. Accidental debug code in production
if (__DEV__) { // Make sure this is correct
  enableScreens(); // Not: enableScreens(false)
}

// 3. Missing memoization after refactor
// Before (fast):
const MemoizedList = React.memo(ExpensiveList);

// After refactor (slow - memo removed accidentally):
const List = ExpensiveList;

// 4. Increased re-renders from context changes
// Use React DevTools Profiler "Highlight updates"</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Always compare git diffs between working and broken versions</li>
                <li>Use feature flags to isolate suspect code</li>
                <li>Binary search through commits if cause unclear</li>
            </ul>
        `
    },
    {
        id: 157,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "How do you handle breaking changes when upgrading React Native versions?",
        difficulty: "advanced",
        seniority: "senior",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>RN upgrades are notoriously challenging. This tests your experience with complex migration projects and risk management.</p>

            <h4>Upgrade Strategy</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Phase 1: Assessment                                 │
├─────────────────────────────────────────────────────┤
│ 1. Read release notes and changelog                 │
│ 2. Check react-native-community/upgrade-helper      │
│ 3. Audit third-party dependencies compatibility     │
│ 4. Estimate effort and create upgrade branch        │
└─────────────────────────────────────────────────────┘

// Use upgrade helper
npx react-native upgrade-helper 0.72.0 0.73.0
// Shows exact file diffs needed</code></pre>

            <h4>Dependency Audit</h4>
            <pre><code>// Check compatibility before upgrading
npx npm-check-updates --target minor

// Common breaking changes to check:
// - react-native-reanimated (often needs updates)
// - react-navigation (major version changes)
// - native-base, react-native-paper (UI libs)

// Create compatibility matrix
┌─────────────────────────┬───────────┬───────────┐
│ Package                 │ Current   │ RN 0.73   │
├─────────────────────────┼───────────┼───────────┤
│ react-native-reanimated │ 3.3.0     │ 3.6.0 ✓   │
│ react-navigation        │ 6.x       │ 6.x ✓     │
│ react-native-maps       │ 1.7.1     │ 1.8.0 ✓   │
│ some-old-lib            │ 2.0.0     │ ✗ No      │
└─────────────────────────┴───────────┴───────────┘</code></pre>

            <h4>Incremental Migration</h4>
            <pre><code>// Step 1: Upgrade React Native core
npm install react-native@0.73.0 react@18.2.0

// Step 2: Update native files
// Follow upgrade-helper diff for:
// - android/app/build.gradle
// - ios/Podfile
// - android/gradle.properties
// - ios/MyApp/AppDelegate.mm

// Step 3: Update dependencies one by one
npm install react-native-reanimated@latest
cd ios && pod install

// Step 4: Fix breaking changes
// New Architecture migration if needed
// Update deprecated APIs</code></pre>

            <h4>Common Breaking Changes</h4>
            <pre><code>// RN 0.73: Remove Flipper by default
// android/app/build.gradle - remove flipper deps

// RN 0.72: Kotlin required for Android
// android/build.gradle
buildscript {
  ext {
    kotlinVersion = "1.8.0"
  }
}

// RN 0.71: TypeScript by default
// Rename .js files to .tsx

// RN 0.70: Hermes default engine
// Remove JavaScriptCore references

// After upgrade, test thoroughly:
npx react-native run-android --variant=release
npx react-native run-ios --configuration Release</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Never upgrade more than 2 minor versions at once</li>
                <li>Create a dedicated branch, don't upgrade in main</li>
                <li>Run full regression test suite after upgrade</li>
            </ul>
        `
    },
    {
        id: 158,
        category: "Real-World Scenarios",
        icon: "🌍",
        question: "How would you implement a feature flag system for gradual feature rollout?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Feature flags enable safe releases and A/B testing. This tests your understanding of release strategies and risk mitigation.</p>

            <h4>Feature Flag Architecture</h4>
            <pre><code>// Simple local implementation
interface FeatureFlags {
  newCheckout: boolean;
  darkMode: boolean;
  experimentalSearch: boolean;
}

const defaultFlags: FeatureFlags = {
  newCheckout: false,
  darkMode: true,
  experimentalSearch: false,
};

// Context provider
const FeatureFlagContext = createContext<FeatureFlags>(defaultFlags);

function FeatureFlagProvider({ children }) {
  const [flags, setFlags] = useState(defaultFlags);

  useEffect(() => {
    // Fetch from remote config
    fetchFeatureFlags().then(setFlags);
  }, []);

  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

// Hook for components
function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const flags = useContext(FeatureFlagContext);
  return flags[flag];
}</code></pre>

            <h4>Firebase Remote Config</h4>
            <pre><code>import remoteConfig from '@react-native-firebase/remote-config';

async function initializeFeatureFlags() {
  await remoteConfig().setDefaults({
    new_checkout: false,
    checkout_variant: 'control',
    feature_rollout_percentage: 0,
  });

  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 3600000, // 1 hour
  });

  await remoteConfig().fetchAndActivate();
}

function useRemoteFeature(key: string, defaultValue: boolean) {
  const [enabled, setEnabled] = useState(defaultValue);

  useEffect(() => {
    const value = remoteConfig().getValue(key);
    setEnabled(value.asBoolean());

    // Listen for updates
    const unsubscribe = remoteConfig().onConfigUpdated(() => {
      remoteConfig().activate().then(() => {
        setEnabled(remoteConfig().getValue(key).asBoolean());
      });
    });

    return unsubscribe;
  }, [key]);

  return enabled;
}</code></pre>

            <h4>Percentage-Based Rollout</h4>
            <pre><code>function isFeatureEnabledForUser(
  userId: string,
  rolloutPercentage: number
): boolean {
  // Deterministic hash based on userId
  // Same user always gets same result
  const hash = hashCode(userId);
  const bucket = Math.abs(hash) % 100;
  return bucket < rolloutPercentage;
}

// Usage
const rolloutPercentage = remoteConfig()
  .getValue('new_checkout_percentage')
  .asNumber();

const showNewCheckout = isFeatureEnabledForUser(userId, rolloutPercentage);

// Gradually increase: 1% → 5% → 20% → 50% → 100%</code></pre>

            <h4>Component Usage</h4>
            <pre><code>function CheckoutScreen() {
  const newCheckoutEnabled = useFeatureFlag('newCheckout');

  if (newCheckoutEnabled) {
    return <NewCheckoutFlow />;
  }
  return <LegacyCheckoutFlow />;
}

// Or with a Feature component
function Feature({ flag, children, fallback = null }) {
  const enabled = useFeatureFlag(flag);
  return enabled ? children : fallback;
}

<Feature flag="experimentalSearch" fallback={<OldSearch />}>
  <NewSearch />
</Feature></code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Use deterministic hashing for consistent user experience</li>
                <li>Always have a kill switch for quick rollback</li>
                <li>Clean up old flags after full rollout</li>
            </ul>
        `
    },
    // ==================== ACCESSIBILITY (NEW CATEGORY) ====================
    {
        id: 159,
        category: "Accessibility",
        icon: "♿",
        question: "How do you implement VoiceOver (iOS) and TalkBack (Android) support in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Accessibility is both a legal requirement and ethical responsibility. Apps must be usable by people with visual impairments.</p>

            <h4>Core Accessibility Props</h4>
            <pre><code>// Basic accessible component
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add item to cart"
  accessibilityHint="Double tap to add this product to your shopping cart"
  accessibilityRole="button"
  accessibilityState={{ disabled: isLoading }}
  onPress={addToCart}
>
  <Text>Add to Cart</Text>
</TouchableOpacity>

// Image with description
<Image
  source={productImage}
  accessible={true}
  accessibilityLabel="Red Nike running shoes, size 10"
/>

// Group related elements
<View
  accessible={true}
  accessibilityLabel="Product: Nike Shoes. Price: $99.99. Rating: 4.5 stars"
>
  <Text>Nike Shoes</Text>
  <Text>$99.99</Text>
  <StarRating value={4.5} />
</View></code></pre>

            <h4>Accessibility Roles</h4>
            <pre><code>// Common roles
accessibilityRole="button"      // Clickable element
accessibilityRole="link"        // Navigation link
accessibilityRole="header"      // Section header
accessibilityRole="image"       // Decorative or informative image
accessibilityRole="text"        // Static text
accessibilityRole="search"      // Search field
accessibilityRole="adjustable"  // Slider or stepper
accessibilityRole="alert"       // Important message
accessibilityRole="checkbox"    // Toggle with checked state
accessibilityRole="switch"      // On/off toggle

// State announcements
<Switch
  accessibilityRole="switch"
  accessibilityState={{
    checked: isEnabled,
  }}
  accessibilityLabel="Enable notifications"
/></code></pre>

            <h4>Dynamic Announcements</h4>
            <pre><code>import { AccessibilityInfo } from 'react-native';

// Announce changes to screen reader
function announceCartUpdate(itemCount: number) {
  AccessibilityInfo.announceForAccessibility(
    \`Cart updated. You now have \${itemCount} items in your cart.\`
  );
}

// After form submission
async function submitForm() {
  try {
    await api.submit(formData);
    AccessibilityInfo.announceForAccessibility(
      'Form submitted successfully'
    );
  } catch (error) {
    AccessibilityInfo.announceForAccessibility(
      'Error submitting form. Please try again.'
    );
  }
}</code></pre>

            <h4>Testing Accessibility</h4>
            <pre><code>// iOS: Settings → Accessibility → VoiceOver
// Android: Settings → Accessibility → TalkBack

// Keyboard shortcuts for testing:
// iOS Simulator: Cmd + Ctrl + Z (toggle VoiceOver)
// Android: Hold volume keys

// Check if screen reader is active
const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

useEffect(() => {
  AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);
  const subscription = AccessibilityInfo.addEventListener(
    'screenReaderChanged',
    setScreenReaderEnabled
  );
  return () => subscription.remove();
}, []);</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Test with actual VoiceOver/TalkBack, not just visual inspection</li>
                <li>accessibilityLabel describes what element is</li>
                <li>accessibilityHint describes what happens when activated</li>
            </ul>
        `
    },
    {
        id: 160,
        category: "Accessibility",
        icon: "♿",
        question: "How do you implement focus management and keyboard navigation in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Proper focus management is crucial for screen reader users and keyboard navigation. Poor focus handling creates confusing experiences.</p>

            <h4>Managing Focus Order</h4>
            <pre><code>// Control focus order with refs
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  return (
    &lt;View&gt;
      &lt;TextInput
        ref={emailRef}
        accessibilityLabel="Email address"
        returnKeyType="next"
        onSubmitEditing={() =&gt; passwordRef.current?.focus()}
      /&gt;
      &lt;TextInput
        ref={passwordRef}
        accessibilityLabel="Password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={() =&gt; submitRef.current?.focus()}
      /&gt;
      &lt;TouchableOpacity
        ref={submitRef}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Sign in"
      &gt;
        &lt;Text&gt;Sign In&lt;/Text&gt;
      &lt;/TouchableOpacity&gt;
    &lt;/View&gt;
  );
}</code></pre>

            <h4>Focus on Screen Change</h4>
            <pre><code>import { findNodeHandle, AccessibilityInfo } from 'react-native';

function ProductScreen({ productId }) {
  const headerRef = useRef(null);

  useEffect(() =&gt; {
    // Move focus to header when screen loads
    const node = findNodeHandle(headerRef.current);
    if (node) {
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }, [productId]);

  return (
    &lt;View&gt;
      &lt;Text
        ref={headerRef}
        accessibilityRole="header"
        accessible={true}
      &gt;
        Product Details
      &lt;/Text&gt;
      {/* Rest of screen */}
    &lt;/View&gt;
  );
}</code></pre>

            <h4>Modal Focus Trapping</h4>
            <pre><code>function AccessibleModal({ visible, onClose, children }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() =&gt; {
    if (visible) {
      // Focus first element when modal opens
      setTimeout(() =&gt; {
        const node = findNodeHandle(closeButtonRef.current);
        if (node) {
          AccessibilityInfo.setAccessibilityFocus(node);
        }
      }, 100);
    }
  }, [visible]);

  return (
    &lt;Modal
      visible={visible}
      onRequestClose={onClose}
      accessibilityViewIsModal={true} // iOS: trap focus in modal
    &gt;
      &lt;View
        ref={modalRef}
        accessible={false}
        importantForAccessibility="yes"
      &gt;
        &lt;TouchableOpacity
          ref={closeButtonRef}
          onPress={onClose}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
        &gt;
          &lt;Text&gt;×&lt;/Text&gt;
        &lt;/TouchableOpacity&gt;
        {children}
      &lt;/View&gt;
    &lt;/Modal&gt;
  );
}</code></pre>

            <h4>Hide Decorative Elements</h4>
            <pre><code>// Hide from screen readers
&lt;View
  accessible={false}
  importantForAccessibility="no-hide-descendants"
&gt;
  &lt;Image source={decorativePattern} /&gt;
&lt;/View&gt;

// Or for individual elements
&lt;Image
  source={icon}
  accessibilityElementsHidden={true}  // iOS
  importantForAccessibility="no"       // Android
/&gt;</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>accessibilityViewIsModal traps focus in modals (iOS)</li>
                <li>Set focus to meaningful content after navigation</li>
                <li>Hide purely decorative elements from screen readers</li>
            </ul>
        `
    },
    {
        id: 161,
        category: "Accessibility",
        icon: "♿",
        question: "How do you support Dynamic Type and system font scaling in React Native?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Users with low vision rely on system font scaling. Apps that don't respect this setting are difficult or impossible to use.</p>

            <h4>Respecting System Font Size</h4>
            <pre><code>import { Text, PixelRatio, useWindowDimensions } from 'react-native';

// By default, RN Text respects system font scaling
// This is already accessible:
<Text style={{ fontSize: 16 }}>Hello World</Text>
// Will scale based on system accessibility settings

// Get current font scale
const fontScale = PixelRatio.getFontScale();
// 1.0 = default, 1.35 = larger, etc.

// Hook for responsive font
function useAccessibleFontSize(baseSize: number) {
  const { fontScale } = useWindowDimensions();
  return baseSize * fontScale;
}</code></pre>

            <h4>Preventing Text Scaling (When Necessary)</h4>
            <pre><code>// Sometimes scaling breaks layout (use sparingly!)
<Text
  style={{ fontSize: 16 }}
  allowFontScaling={false}  // Disables system scaling
  maxFontSizeMultiplier={1.5}  // Better: cap at 1.5x
>
  Tab Label
</Text>

// For entire app, set in Text defaultProps
// (Not recommended - breaks accessibility)
Text.defaultProps = {
  ...Text.defaultProps,
  maxFontSizeMultiplier: 2.0,  // Cap at 2x instead of disabling
};</code></pre>

            <h4>Adaptive Layouts for Large Text</h4>
            <pre><code>function AdaptiveHeader() {
  const { fontScale } = useWindowDimensions();
  const isLargeText = fontScale > 1.2;

  return (
    <View style={[
      styles.header,
      // Stack vertically when text is large
      isLargeText && styles.headerStacked
    ]}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});</code></pre>

            <h4>Testing Font Scaling</h4>
            <pre><code>// iOS Simulator:
// Settings → Accessibility → Display & Text Size → Larger Text

// Android Emulator:
// Settings → Accessibility → Font size

// Test at these levels:
// - Default (1.0x)
// - Large (1.35x)
// - Extra Large (1.5x+)

// Common issues to check:
// ✓ Text not truncated unexpectedly
// ✓ Buttons still tappable (44pt minimum)
// ✓ Layout doesn't break
// ✓ Scrolling works when content overflows</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Never disable font scaling entirely - use maxFontSizeMultiplier</li>
                <li>Test UI at 200% font scale</li>
                <li>Use flexible layouts that adapt to text size changes</li>
            </ul>
        `
    },
    {
        id: 162,
        category: "Accessibility",
        icon: "♿",
        question: "How do you test and audit accessibility in React Native applications?",
        difficulty: "intermediate",
        seniority: "mid",
        answer: `
            <h4>🎯 Why This Question Matters</h4>
            <p>Accessibility must be tested systematically, not assumed. This shows you understand how to verify accessibility compliance.</p>

            <h4>Manual Testing Checklist</h4>
            <pre><code>┌─────────────────────────────────────────────────────┐
│ Test                        │ How to Verify         │
├─────────────────────────────┼───────────────────────┤
│ Screen reader navigation    │ Use VoiceOver/TalkBack│
│ Focus order logical         │ Tab through elements  │
│ All interactive elements    │ Can be activated      │
│   labeled                   │                       │
│ Images have alt text        │ Check announcements   │
│ Color contrast sufficient   │ Use contrast checker  │
│ Font scaling works          │ Test at 200% scale    │
│ Touch targets ≥44pt         │ Measure tap areas     │
│ Error messages announced    │ Test form validation  │
└─────────────────────────────┴───────────────────────┘</code></pre>

            <h4>Automated Testing with Detox</h4>
            <pre><code>// e2e/accessibility.test.js
describe('Accessibility', () => {
  it('login button should be accessible', async () => {
    await expect(element(by.id('login-button'))).toHaveLabel('Sign in');
    await expect(element(by.id('login-button'))).toHaveValue('button');
  });

  it('form inputs should have labels', async () => {
    await expect(element(by.id('email-input')))
      .toHaveLabel('Email address');
    await expect(element(by.id('password-input')))
      .toHaveLabel('Password');
  });

  it('error state should be announced', async () => {
    await element(by.id('submit-button')).tap();
    await expect(element(by.id('error-message')))
      .toHaveLabel(/Please enter a valid email/);
  });
});</code></pre>

            <h4>React Native Testing Library</h4>
            <pre><code>import { render, screen } from '@testing-library/react-native';

describe('Button Accessibility', () => {
  it('should have correct accessibility props', () => {
    render(<AddToCartButton disabled={false} />);

    const button = screen.getByRole('button', { name: 'Add to cart' });
    expect(button).toBeTruthy();
    expect(button).not.toBeDisabled();
  });

  it('should announce loading state', () => {
    render(<AddToCartButton loading={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibilityState({ busy: true });
  });

  it('should be focusable', () => {
    render(<AddToCartButton />);
    const button = screen.getByRole('button');
    expect(button.props.accessible).toBe(true);
  });
});</code></pre>

            <h4>Accessibility Audit Tools</h4>
            <pre><code>// iOS: Accessibility Inspector
// Xcode → Open Developer Tool → Accessibility Inspector

// Android: Accessibility Scanner app
// Download from Play Store, run on your app

// Flipper Plugin
// Install flipper-plugin-accessibility
// Shows accessibility tree and issues

// ESLint plugin for React Native
// .eslintrc.js
module.exports = {
  plugins: ['react-native-a11y'],
  rules: {
    'react-native-a11y/has-accessibility-props': 'error',
    'react-native-a11y/has-valid-accessibility-role': 'error',
    'react-native-a11y/no-nested-touchables': 'error',
  },
};</code></pre>

            <h4>WCAG Compliance Levels</h4>
            <pre><code>// Target WCAG 2.1 Level AA minimum

// Level A (minimum):
// - All images have alt text
// - Form inputs have labels
// - Content is navigable with keyboard

// Level AA (recommended):
// - Color contrast 4.5:1 for normal text
// - Text resizable to 200%
// - Focus visible on all elements
// - Error suggestions provided

// Level AAA (enhanced):
// - Color contrast 7:1
// - Sign language for video
// - Extended audio descriptions</code></pre>

            <h4>💡 Interview Tips</h4>
            <ul>
                <li>Test with real screen readers, not just automated tools</li>
                <li>Include users with disabilities in testing when possible</li>
                <li>Accessibility should be tested throughout development, not at the end</li>
            </ul>
        `
    }
];

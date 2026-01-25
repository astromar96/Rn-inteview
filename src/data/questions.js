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
            <h4>1. Requirements Clarification</h4>
            <h5>Functional Requirements</h5>
            <ul>
                <li>Browse product catalog offline with cached data</li>
                <li>Add/remove items from cart while offline</li>
                <li>View order history without network</li>
                <li>Queue purchases for sync when back online</li>
                <li>Real-time inventory updates when connected</li>
                <li>Search products with offline index</li>
            </ul>
            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Sync latency &lt; 5 seconds when reconnecting</li>
                <li>Local storage &lt; 100MB for core catalog data</li>
                <li>Conflict resolution without data loss</li>
                <li>Battery-efficient background sync</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// Types
interface Product {
    id: string;
    name: string;
    price: number;
    inventory: number;
    categoryId: string;
    images: string[];
    syncedAt: number;
}

interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    syncStatus: 'synced' | 'pending' | 'failed';
    localUpdatedAt: number;
}

interface SyncOperation {
    id: string;
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    entity: 'cart' | 'order' | 'wishlist';
    payload: unknown;
    timestamp: number;
    retryCount: number;
    maxRetries: number;
}

// Repository with offline-first pattern
class ProductRepository {
    constructor(
        private db: Database,
        private api: ProductAPI,
        private syncQueue: SyncQueue
    ) {}

    async getProducts(categoryId: string): Promise&lt;Product[]&gt; {
        // Always read from local first (instant UI)
        const local = await this.db.products
            .query(Q.where('category_id', categoryId))
            .fetch();

        // Background sync if online
        if (await NetInfo.fetch().then(s =&gt; s.isConnected)) {
            this.syncFromRemote(categoryId).catch(console.warn);
        }

        return local;
    }

    private async syncFromRemote(categoryId: string) {
        const remote = await this.api.getProducts(categoryId);
        await this.db.write(async () =&gt; {
            for (const product of remote) {
                await this.db.get('products').create(p =&gt; {
                    Object.assign(p, product);
                    p.syncedAt = Date.now();
                });
            }
        });
    }
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <h5>iOS Background Sync</h5>
            <pre><code>// iOS: BGTaskScheduler for background refresh
// AppDelegate.swift
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -&gt; Bool {
    BGTaskScheduler.shared.register(
        forTaskWithIdentifier: "com.app.sync",
        using: nil
    ) { task in
        self.handleBackgroundSync(task: task as! BGAppRefreshTask)
    }
    return true
}

func scheduleBackgroundSync() {
    let request = BGAppRefreshTaskRequest(identifier: "com.app.sync")
    request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)
    try? BGTaskScheduler.shared.submit(request)
}</code></pre>

            <h5>Android Background Sync</h5>
            <pre><code>// Android: WorkManager for reliable background work
// SyncWorker.kt
class SyncWorker(context: Context, params: WorkerParameters) :
    CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            val syncEngine = SyncEngine.getInstance()
            syncEngine.processQueue()
            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount &lt; 3) Result.retry()
            else Result.failure()
        }
    }
}

// Schedule periodic sync
val syncRequest = PeriodicWorkRequestBuilder&lt;SyncWorker&gt;(
    15, TimeUnit.MINUTES
).setConstraints(
    Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()
).build()

WorkManager.getInstance(context).enqueueUniquePeriodicWork(
    "ecommerce_sync",
    ExistingPeriodicWorkPolicy.KEEP,
    syncRequest
)</code></pre>

            <h4>5. Sync Protocol &amp; Conflict Resolution</h4>
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
└─────────────────────────────────────────────────────────────┘

// Conflict resolver implementation
class ConflictResolver {
    resolve(local: SyncEntity, remote: SyncEntity): SyncEntity {
        switch (local.entityType) {
            case 'cart_item':
                // Last-write-wins based on timestamp
                return local.updatedAt &gt; remote.updatedAt ? local : remote;

            case 'inventory':
                // Server always wins
                return remote;

            case 'user_preferences':
                // Deep merge
                return this.deepMerge(local, remote);

            default:
                return remote;
        }
    }
}</code></pre>

            <h4>6. Data Flow</h4>
            <pre><code>User Action (Add to Cart)
        │
        ▼
┌───────────────────┐
│ Update Local DB   │ ◀── Instant UI feedback
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

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Local Database</td><td>WatermelonDB</td><td>SQLite with lazy loading, sync primitives built-in</td></tr>
                <tr><td>Fast KV Storage</td><td>react-native-mmkv</td><td>10x faster than AsyncStorage, sync access</td></tr>
                <tr><td>Network State</td><td>@react-native-community/netinfo</td><td>Reliable connectivity detection</td></tr>
                <tr><td>Server State</td><td>TanStack Query</td><td>Caching, background refetch, optimistic updates</td></tr>
                <tr><td>Global State</td><td>Zustand</td><td>Lightweight, persist middleware, no boilerplate</td></tr>
                <tr><td>Image Caching</td><td>expo-image</td><td>Disk caching, blurhash placeholders, memory efficient</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Cart item deleted on server while offline:</strong> Show "item unavailable" on sync, offer alternatives</li>
                <li><strong>Price changed during offline session:</strong> Display price difference alert before checkout</li>
                <li><strong>Inventory depleted:</strong> Gracefully reduce quantity or remove item with explanation</li>
                <li><strong>Sync queue grows too large:</strong> Implement queue size limits, prioritize recent operations</li>
                <li><strong>App killed during sync:</strong> Resume from last successful operation on next launch</li>
                <li><strong>Multiple devices:</strong> Use device ID in sync to handle cross-device conflicts</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Why WatermelonDB over Realm?</strong> Lazy loading prevents memory issues with large catalogs; sync primitives built-in</li>
                <li><strong>CQRS consideration:</strong> Separate read models (fast local queries) from write models (sync queue)</li>
                <li><strong>Optimistic UI tradeoffs:</strong> Better UX but requires careful rollback handling on conflicts</li>
                <li><strong>Partial sync strategy:</strong> Sync only user's categories/wishlist to minimize storage</li>
                <li><strong>Testing offline:</strong> Use Network Link Conditioner (iOS) / throttling (Android) for realistic testing</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <h5>Functional Requirements</h5>
            <ul>
                <li>Global state shared across all 50+ screens (auth, theme, settings)</li>
                <li>Server data with caching, refetching, and optimistic updates</li>
                <li>Form state with validation across multi-step wizards</li>
                <li>Complex UI flows (checkout, onboarding) with explicit state transitions</li>
                <li>Real-time data subscriptions (notifications, chat)</li>
            </ul>
            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Minimal re-renders - only components using changed state re-render</li>
                <li>Memory efficient - no leaks from subscriptions or cached data</li>
                <li>Developer experience - easy debugging, predictable updates</li>
                <li>Persistence - survive app restarts for critical state</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     STATE ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    GLOBAL STATE (Zustand)                  │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │  │
│  │  │ Auth Store  │ │Theme Store  │ │Settings Store│          │  │
│  │  │ user, token │ │ mode, colors│ │ prefs, locale│          │  │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘          │  │
│  │         │  Persisted to MMKV    │                          │  │
│  └─────────┼───────────────────────┼──────────────────────────┘  │
│            │                       │                             │
│  ┌─────────▼───────────────────────▼──────────────────────────┐  │
│  │                   SERVER STATE (TanStack Query)            │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │  │
│  │  │  Products   │ │   Orders    │ │    Users    │          │  │
│  │  │ useQuery()  │ │useMutation()│ │useInfinite()│          │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘          │  │
│  │         │  Auto cache, refetch, optimistic updates         │  │
│  └─────────┼──────────────────────────────────────────────────┘  │
│            │                                                     │
│  ┌─────────▼──────────────────────────────────────────────────┐  │
│  │                    LOCAL STATE (useState/useReducer)       │  │
│  │  • Form inputs    • Modal visibility    • Scroll position  │  │
│  │  • Tab selection  • Expanded sections   • Input focus      │  │
│  └─────────┬──────────────────────────────────────────────────┘  │
│            │                                                     │
│  ┌─────────▼──────────────────────────────────────────────────┐  │
│  │                    UI MACHINES (XState)                    │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │  │
│  │  │  Checkout   │ │ Onboarding  │ │   Booking   │          │  │
│  │  │   Machine   │ │   Machine   │ │   Machine   │          │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘          │  │
│  │         │  Explicit states, transitions, side effects      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// State category types
interface GlobalState {
    // Auth slice
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    // Theme slice
    mode: 'light' | 'dark' | 'system';
    accentColor: string;

    // Settings slice
    locale: string;
    notifications: boolean;
}

interface ServerState&lt;T&gt; {
    data: T | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () =&gt; void;
}

// Zustand store with slices and persistence
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mmkvStorage } from './mmkvStorage';

interface AuthSlice {
    user: User | null;
    token: string | null;
    login: (creds: Credentials) =&gt; Promise&lt;void&gt;;
    logout: () =&gt; void;
}

interface ThemeSlice {
    mode: 'light' | 'dark' | 'system';
    setMode: (mode: ThemeSlice['mode']) =&gt; void;
}

type AppStore = AuthSlice &amp; ThemeSlice;

export const useAppStore = create&lt;AppStore&gt;()(
    persist(
        immer((set) =&gt; ({
            // Auth
            user: null,
            token: null,
            login: async (creds) =&gt; {
                const { user, token } = await authAPI.login(creds);
                set((state) =&gt; {
                    state.user = user;
                    state.token = token;
                });
            },
            logout: () =&gt; set({ user: null, token: null }),

            // Theme
            mode: 'system',
            setMode: (mode) =&gt; set({ mode }),
        })),
        {
            name: 'app-store',
            storage: createJSONStorage(() =&gt; mmkvStorage),
            partialize: (state) =&gt; ({
                user: state.user,
                token: state.token,
                mode: state.mode,
            }),
        }
    )
);

// Selector hooks for minimal re-renders
export const useUser = () =&gt; useAppStore((s) =&gt; s.user);
export const useTheme = () =&gt; useAppStore((s) =&gt; s.mode);</code></pre>

            <h4>4. Server State with TanStack Query</h4>
            <pre><code>// Query configuration for different data types
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,      // 5 minutes
            gcTime: 30 * 60 * 1000,         // 30 minutes (formerly cacheTime)
            retry: 2,
            refetchOnWindowFocus: false,    // Mobile doesn't have window focus
            refetchOnReconnect: true,
        },
    },
});

// Typed query hooks
export function useProducts(categoryId: string) {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: () =&gt; productAPI.getByCategory(categoryId),
        staleTime: 10 * 60 * 1000, // Products change less often
    });
}

// Optimistic mutation with rollback
export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cartAPI.addItem,
        onMutate: async (newItem) =&gt; {
            // Cancel in-flight queries
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            // Snapshot current state
            const previous = queryClient.getQueryData&lt;Cart&gt;(['cart']);

            // Optimistically update
            queryClient.setQueryData&lt;Cart&gt;(['cart'], (old) =&gt;
                old ? { ...old, items: [...old.items, newItem] } : old
            );

            return { previous };
        },
        onError: (err, newItem, context) =&gt; {
            // Rollback on error
            if (context?.previous) {
                queryClient.setQueryData(['cart'], context.previous);
            }
        },
        onSettled: () =&gt; {
            // Always refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}</code></pre>

            <h4>5. State Machines for Complex Flows</h4>
            <pre><code>// XState machine for checkout flow
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

interface CheckoutContext {
    items: CartItem[];
    shipping: ShippingInfo | null;
    payment: PaymentInfo | null;
    error: string | null;
    orderId: string | null;
}

type CheckoutEvent =
    | { type: 'PROCEED' }
    | { type: 'BACK' }
    | { type: 'SET_SHIPPING'; data: ShippingInfo }
    | { type: 'SET_PAYMENT'; data: PaymentInfo }
    | { type: 'RETRY' };

const checkoutMachine = createMachine&lt;CheckoutContext, CheckoutEvent&gt;({
    id: 'checkout',
    initial: 'cart',
    context: {
        items: [],
        shipping: null,
        payment: null,
        error: null,
        orderId: null,
    },
    states: {
        cart: {
            on: { PROCEED: 'shipping' },
        },
        shipping: {
            on: {
                BACK: 'cart',
                SET_SHIPPING: {
                    target: 'payment',
                    actions: assign({ shipping: (_, e) =&gt; e.data }),
                },
            },
        },
        payment: {
            on: {
                BACK: 'shipping',
                SET_PAYMENT: {
                    target: 'processing',
                    actions: assign({ payment: (_, e) =&gt; e.data }),
                },
            },
        },
        processing: {
            invoke: {
                src: 'submitOrder',
                onDone: {
                    target: 'success',
                    actions: assign({ orderId: (_, e) =&gt; e.data.orderId }),
                },
                onError: {
                    target: 'error',
                    actions: assign({ error: (_, e) =&gt; e.data.message }),
                },
            },
        },
        error: {
            on: {
                RETRY: 'processing',
                BACK: 'payment',
            },
        },
        success: { type: 'final' },
    },
});

// Usage in component
function CheckoutScreen() {
    const [state, send] = useMachine(checkoutMachine);

    return (
        &lt;View&gt;
            {state.matches('cart') &amp;&amp; &lt;CartStep onProceed={() =&gt; send('PROCEED')} /&gt;}
            {state.matches('shipping') &amp;&amp; &lt;ShippingStep ... /&gt;}
            {state.matches('processing') &amp;&amp; &lt;LoadingSpinner /&gt;}
            {state.matches('success') &amp;&amp; &lt;SuccessScreen orderId={state.context.orderId} /&gt;}
        &lt;/View&gt;
    );
}</code></pre>

            <h4>6. Data Flow</h4>
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
            └───────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Global State</td><td>Zustand</td><td>Minimal boilerplate, selector-based subscriptions, persist middleware</td></tr>
                <tr><td>Server State</td><td>TanStack Query v5</td><td>Caching, deduplication, optimistic updates, infinite queries</td></tr>
                <tr><td>Complex Flows</td><td>XState v5</td><td>Explicit states, visualizer, TypeScript support</td></tr>
                <tr><td>Form State</td><td>React Hook Form</td><td>Minimal re-renders, validation, uncontrolled inputs</td></tr>
                <tr><td>Persistence</td><td>react-native-mmkv</td><td>Synchronous, fast, encryption support</td></tr>
                <tr><td>Atomic State</td><td>Jotai</td><td>For fine-grained reactivity when needed</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Stale closures:</strong> Use refs or callbacks to avoid capturing stale state in effects</li>
                <li><strong>Memory leaks:</strong> Clean up subscriptions in useEffect return; use query gcTime</li>
                <li><strong>Circular dependencies:</strong> Keep stores independent; communicate via events or shared queries</li>
                <li><strong>Hydration mismatch:</strong> Persist only serializable state; handle loading states</li>
                <li><strong>Race conditions:</strong> TanStack Query handles this; for Zustand use immer for atomic updates</li>
                <li><strong>Deep navigation state:</strong> Reset machine state when navigating away from flow</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Why Zustand over Redux?</strong> Less boilerplate, no providers needed, built-in persistence, better TypeScript inference</li>
                <li><strong>When to use Context vs Zustand?</strong> Context for truly static data (theme provider); Zustand for anything that updates frequently</li>
                <li><strong>State normalization:</strong> TanStack Query handles this for server data; for complex local state consider normalizing manually</li>
                <li><strong>Testing state:</strong> Zustand stores can be tested directly; machines can be tested with @xstate/test</li>
                <li><strong>Performance monitoring:</strong> Use React DevTools Profiler, why-did-you-render, Flipper plugins</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <h5>Functional Requirements</h5>
            <ul>
                <li>Multiple teams (5+) can develop features independently</li>
                <li>Features can be shipped/toggled without full app releases</li>
                <li>Shared UI components and core utilities across features</li>
                <li>Clear ownership boundaries with CODEOWNERS</li>
                <li>Independent testing per feature module</li>
            </ul>
            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Build time &lt; 5 minutes for affected packages only</li>
                <li>No circular dependencies between feature modules</li>
                <li>Type-safe contracts between modules</li>
                <li>Incremental adoption - migrate existing code gradually</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                        MONOREPO STRUCTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    apps/mobile (Shell)                     │  │
│  │  • Navigation registration    • Feature composition        │  │
│  │  • Provider setup             • Entry point                │  │
│  └─────────────────────────────────┬─────────────────────────┘  │
│                                    │                             │
│      ┌─────────────────────────────┼─────────────────────────┐  │
│      ▼                             ▼                         ▼  │
│  ┌─────────┐               ┌─────────────┐            ┌────────┐│
│  │features/│               │  features/  │            │features/││
│  │  auth   │               │  checkout   │            │ catalog ││
│  │ (TeamA) │               │  (Team B)   │            │(Team C) ││
│  └────┬────┘               └──────┬──────┘            └────┬───┘│
│       │                          │                         │    │
│       └──────────────────────────┼─────────────────────────┘    │
│                                  ▼                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    packages/ (Shared)                      │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │  │
│  │  │   ui    │  │  core   │  │  api    │  │ config  │      │  │
│  │  │ Button  │  │ hooks   │  │ client  │  │ tsconfig│      │  │
│  │  │ Input   │  │ storage │  │ types   │  │ eslint  │      │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Dependency Flow: features → packages (never packages → features)│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// Monorepo directory structure
my-app/
├── apps/
│   ├── mobile/                    # Main RN app shell
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── navigation/
│   │   │   │   └── RootNavigator.tsx
│   │   │   └── providers/
│   │   └── package.json
│   └── storybook/                 # Component playground
├── packages/
│   ├── ui/                        # Shared design system
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── core/                      # Shared utilities
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   ├── storage/
│   │   │   └── di/
│   │   └── package.json
│   └── api/                       # API client &amp; types
├── features/
│   ├── auth/                      # Auth team
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   └── index.ts           # PUBLIC API
│   │   ├── package.json
│   │   ├── CODEOWNERS
│   │   └── README.md
│   ├── checkout/                  # Payments team
│   ├── catalog/                   # Discovery team
│   └── profile/                   # Growth team
├── nx.json
└── turbo.json

// Feature module public API (features/auth/src/index.ts)
// ONLY export what other modules need
export { LoginScreen } from './screens/LoginScreen';
export { SignupScreen } from './screens/SignupScreen';
export { useAuth, useCurrentUser } from './hooks/useAuth';
export type { User, AuthState } from './types';
export type { AuthStackParamList } from './navigation/types';
// Internal components, API calls, utilities are NOT exported</code></pre>

            <h4>4. Dependency Injection &amp; Module Communication</h4>
            <pre><code>// packages/core/src/di/ServiceProvider.tsx
interface AppServices {
    api: APIClient;
    analytics: AnalyticsService;
    storage: StorageService;
    featureFlags: FeatureFlagService;
}

const ServiceContext = createContext&lt;AppServices | null&gt;(null);

export function ServiceProvider({
    children,
    services,
}: {
    children: ReactNode;
    services: AppServices;
}) {
    return (
        &lt;ServiceContext.Provider value={services}&gt;
            {children}
        &lt;/ServiceContext.Provider&gt;
    );
}

export function useServices(): AppServices {
    const services = useContext(ServiceContext);
    if (!services) throw new Error('Wrap app in ServiceProvider');
    return services;
}

// Feature modules use services without knowing implementations
// features/checkout/src/screens/CheckoutScreen.tsx
function CheckoutScreen() {
    const { api, analytics } = useServices();

    const handlePurchase = async () =&gt; {
        analytics.track('purchase_started');
        await api.checkout.submit(cartItems);
    };
}

// Cross-feature communication via event bus
// packages/core/src/events/eventBus.ts
type EventMap = {
    'auth:login': { userId: string };
    'auth:logout': undefined;
    'cart:updated': { itemCount: number };
};

class EventBus {
    private listeners = new Map&lt;string, Set&lt;Function&gt;&gt;();

    emit&lt;K extends keyof EventMap&gt;(event: K, payload: EventMap[K]) {
        this.listeners.get(event)?.forEach(fn =&gt; fn(payload));
    }

    on&lt;K extends keyof EventMap&gt;(event: K, handler: (payload: EventMap[K]) =&gt; void) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
        return () =&gt; this.listeners.get(event)!.delete(handler);
    }
}</code></pre>

            <h4>5. Build System &amp; CI/CD</h4>
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
            "outputs": [],
            "cache": true
        },
        "lint": {
            "outputs": [],
            "cache": true
        }
    }
}

// nx.json - Nx alternative
{
    "targetDefaults": {
        "build": {
            "dependsOn": ["^build"],
            "inputs": ["production", "^production"],
            "cache": true
        }
    },
    "namedInputs": {
        "production": [
            "default",
            "!{projectRoot}/**/*.spec.tsx",
            "!{projectRoot}/**/*.test.tsx"
        ]
    }
}

// CI Pipeline (GitHub Actions)
// .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # For affected detection

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Affected Build
        run: npx nx affected:build --base=origin/main

      - name: Affected Test
        run: npx nx affected:test --base=origin/main</code></pre>

            <h4>6. Data Flow</h4>
            <pre><code>Feature Team Develops
        │
        ▼
┌───────────────────────┐
│ Work in features/xxx  │
│ - Own screens         │
│ - Own components      │
│ - Own tests           │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Import from packages/ │
│ - @app/ui (buttons)   │
│ - @app/core (hooks)   │
│ - @app/api (client)   │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Export public API     │
│ via index.ts          │
│ (screens, hooks,types)│
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Shell app imports     │
│ feature public APIs   │
│ &amp; registers in nav    │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Feature flag controls │
│ visibility/rollout    │
└───────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Monorepo Tooling</td><td>Turborepo or Nx</td><td>Affected builds, caching, task orchestration</td></tr>
                <tr><td>Package Manager</td><td>pnpm</td><td>Faster installs, strict hoisting, workspace support</td></tr>
                <tr><td>Feature Flags</td><td>LaunchDarkly / Statsig</td><td>Gradual rollouts, A/B testing, kill switches</td></tr>
                <tr><td>Module Federation</td><td>Re.Pack</td><td>Dynamic feature loading (advanced)</td></tr>
                <tr><td>Code Generation</td><td>Plop.js</td><td>Consistent feature scaffolding</td></tr>
                <tr><td>Dependency Graph</td><td>nx graph / Madge</td><td>Visualize and enforce boundaries</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Circular dependencies:</strong> Use dependency-cruiser or nx boundaries to detect and prevent</li>
                <li><strong>Version conflicts:</strong> Pin shared dependencies in root package.json, use pnpm overrides</li>
                <li><strong>Breaking API changes:</strong> Require RFC process, deprecation period, semver for packages</li>
                <li><strong>Hot reload across packages:</strong> Configure metro.config.js watchFolders properly</li>
                <li><strong>Native module conflicts:</strong> Hoist native deps to root, single version policy</li>
                <li><strong>Large team onboarding:</strong> Document module boundaries, provide generator scripts</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Nx vs Turborepo:</strong> Nx has more features (generators, plugins); Turbo is simpler and faster for basic needs</li>
                <li><strong>Module Federation:</strong> Allows loading features at runtime (Re.Pack), but adds complexity; evaluate if truly needed</li>
                <li><strong>Micro-frontends debate:</strong> In mobile, usually overkill; monorepo with clear boundaries is often sufficient</li>
                <li><strong>Testing strategy:</strong> Each feature has unit tests; integration tests in shell app; E2E tests for critical paths</li>
                <li><strong>Migration path:</strong> Start with packages/ extraction, then gradually split features from existing code</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <h5>Functional Requirements</h5>
            <ul>
                <li>Infinite scroll with cursor-based pagination</li>
                <li>Mixed content types: text, images, videos, carousels</li>
                <li>Auto-play videos when &gt;60% visible, pause when scrolled away</li>
                <li>Pull-to-refresh for new content</li>
                <li>Like/comment/share interactions without scroll interruption</li>
                <li>Real-time like count updates</li>
            </ul>
            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>Maintain 60fps during fast scrolling (16.67ms frame budget)</li>
                <li>Memory usage &lt; 200MB even with 1000+ items scrolled</li>
                <li>Time to first meaningful paint &lt; 500ms</li>
                <li>Smooth image loading with no layout shifts</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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
│  │  │  • Videos paused, images kept in memory cache       │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                    State Management                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │TanStack Qry │  │ Visible IDs │  │Interaction  │       │  │
│  │  │(pagination) │  │ (video ctrl)│  │ Cache       │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// Types
interface Post {
    id: string;
    type: 'text' | 'image' | 'video' | 'carousel';
    author: User;
    content: string;
    mediaUrl?: string;
    blurhash?: string;           // For placeholder
    aspectRatio?: number;        // Prevent layout shifts
    likes: number;
    comments: number;
    createdAt: string;
}

interface FeedPage {
    posts: Post[];
    nextCursor: string | null;
}

// FlashList implementation with infinite scroll
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';

function FeedScreen() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: ['feed'],
        queryFn: ({ pageParam }) =&gt; feedAPI.getPosts(pageParam),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) =&gt; lastPage.nextCursor,
        staleTime: 60_000,
    });

    const posts = useMemo(
        () =&gt; data?.pages.flatMap((page) =&gt; page.posts) ?? [],
        [data]
    );

    return (
        &lt;FlashList
            data={posts}
            renderItem={({ item }) =&gt; &lt;FeedItem post={item} /&gt;}
            estimatedItemSize={400}
            keyExtractor={(item) =&gt; item.id}
            getItemType={(item) =&gt; item.type}  // Enables cell recycling
            onEndReached={() =&gt; hasNextPage &amp;&amp; fetchNextPage()}
            onEndReachedThreshold={0.5}
            drawDistance={300}                  // Pre-render buffer
            refreshing={isRefetching}
            onRefresh={refetch}
            ListFooterComponent={
                isFetchingNextPage ? &lt;ActivityIndicator /&gt; : null
            }
        /&gt;
    );
}</code></pre>

            <h4>4. Platform-Specific Optimizations</h4>
            <h5>iOS Optimizations</h5>
            <pre><code>// iOS: UICollectionView under the hood
// FlashList uses UICollectionView on iOS

// Additional iOS optimizations:
// 1. Enable Hermes for faster JS execution
// 2. Use CALayer for image rendering

// ios/Podfile
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
            # Enable aggressive optimizations
            config.build_settings['GCC_OPTIMIZATION_LEVEL'] = 's'
        end
    end
end

// Image prefetching with native priority
import { Image } from 'expo-image';

// Prefetch next page images
const prefetchImages = (posts: Post[]) =&gt; {
    posts
        .filter(p =&gt; p.type === 'image')
        .slice(0, 5)
        .forEach(p =&gt; Image.prefetch(p.mediaUrl));
};</code></pre>

            <h5>Android Optimizations</h5>
            <pre><code>// Android: RecyclerView under the hood
// FlashList uses RecyclerView on Android

// android/app/build.gradle
android {
    buildTypes {
        release {
            // Enable R8 full mode for smaller APK
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
        }
    }
}

// Optimize image loading for Android
// Glide/Fresco configuration via expo-image

// Reduce overdraw
// In FeedItem, avoid unnecessary background colors
const styles = StyleSheet.create({
    container: {
        // Don't set backgroundColor unless needed
        // Reduces GPU overdraw
    },
});

// Use native driver for animations
Animated.timing(opacity, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,  // Critical for 60fps
});</code></pre>

            <h4>5. Video Auto-play Strategy</h4>
            <pre><code>// Video visibility management
function FeedScreen() {
    const [activeVideoId, setActiveVideoId] = useState&lt;string | null&gt;(null);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 60,
        minimumViewTime: 300,
    }).current;

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) =&gt; {
            // Find first visible video
            const visibleVideo = viewableItems.find(
                (item) =&gt; item.isViewable &amp;&amp; item.item.type === 'video'
            );
            setActiveVideoId(visibleVideo?.item.id ?? null);
        },
        []
    );

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]).current;

    return (
        &lt;FlashList
            data={posts}
            renderItem={({ item }) =&gt; (
                &lt;FeedItem
                    post={item}
                    isVideoActive={item.id === activeVideoId}
                /&gt;
            )}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        /&gt;
    );
}

// Video cell component
const VideoCell = memo(({ url, isActive }: Props) =&gt; {
    const videoRef = useRef&lt;Video&gt;(null);

    useEffect(() =&gt; {
        if (isActive) {
            videoRef.current?.playAsync();
        } else {
            videoRef.current?.pauseAsync();
        }
    }, [isActive]);

    return (
        &lt;Video
            ref={videoRef}
            source={{ uri: url }}
            resizeMode="cover"
            shouldPlay={isActive}
            isLooping
            isMuted={true}  // Autoplay requires muted
        /&gt;
    );
});</code></pre>

            <h4>6. Data Flow</h4>
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

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>List Virtualization</td><td>@shopify/flash-list</td><td>10x faster than FlatList, cell recycling</td></tr>
                <tr><td>Image Loading</td><td>expo-image</td><td>Blurhash, memory-disk cache, transitions</td></tr>
                <tr><td>Video Playback</td><td>react-native-video v6</td><td>Native players, caching, background audio</td></tr>
                <tr><td>Server State</td><td>TanStack Query</td><td>Infinite queries, background refetch</td></tr>
                <tr><td>Animations</td><td>Reanimated 3</td><td>JS thread-free animations, worklets</td></tr>
                <tr><td>Gestures</td><td>react-native-gesture-handler</td><td>Native gesture recognition</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Rapid scrolling:</strong> Use drawDistance to pre-render items; avoid complex calculations in renderItem</li>
                <li><strong>Memory pressure:</strong> Monitor with Flipper; limit video instances to 2-3 max</li>
                <li><strong>Layout shifts:</strong> Always provide aspectRatio from API; use blurhash placeholders</li>
                <li><strong>Stale data on return:</strong> Use staleTime wisely; show "new posts" banner instead of auto-refresh</li>
                <li><strong>Network failures mid-scroll:</strong> Show inline error with retry button; preserve scroll position</li>
                <li><strong>Multiple videos visible:</strong> Only play topmost video; pause others</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>FlashList vs FlatList:</strong> FlashList recycles cells by type, uses native list components, handles variable heights better</li>
                <li><strong>Why cursor pagination?</strong> Offset pagination breaks when new posts are added; cursors provide stable pagination</li>
                <li><strong>Measuring performance:</strong> Use Perf Monitor (cmd+M), Flipper, React DevTools Profiler, systrace</li>
                <li><strong>Image caching strategy:</strong> Memory cache for visible + buffer; disk cache for persistence; blurhash for instant placeholder</li>
                <li><strong>Handling 10k+ items:</strong> FlashList handles this fine; key is proper estimatedItemSize and getItemType</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <h5>Functional Requirements</h5>
            <ul>
                <li>Cold start to interactive home screen &lt; 2 seconds</li>
                <li>Show meaningful content during loading (not just spinner)</li>
                <li>Restore user session without re-login</li>
                <li>Prefetch critical data before hiding splash</li>
                <li>Support offline launch with cached data</li>
            </ul>
            <h5>Non-Functional Requirements</h5>
            <ul>
                <li>JS bundle size &lt; 2MB compressed</li>
                <li>No white flash between native splash and React content</li>
                <li>Works on low-end devices (2GB RAM, older CPUs)</li>
                <li>Consistent startup time across app versions</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    STARTUP OPTIMIZATION LAYERS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  0ms ─────────── NATIVE INIT ─────────── 150ms                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Native splash screen displayed                          │  │
│  │  • Load native modules (minimal set)                       │  │
│  │  • Initialize Hermes VM                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  150ms ─────────── JS BUNDLE LOAD ─────────── 500ms             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Load Hermes bytecode (pre-compiled)                     │  │
│  │  • Execute critical path only (inline requires)            │  │
│  │  • Defer non-critical modules                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  500ms ─────────── REACT RENDER ─────────── 800ms               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Render shell/skeleton UI                                │  │
│  │  • Hydrate state from MMKV cache                           │  │
│  │  • Start critical data fetches                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  800ms ─────────── INTERACTIVE ─────────── 1500ms               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Hide splash, show real content                          │  │
│  │  • User can interact                                       │  │
│  │  • Background: load deferred modules                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  1500ms+ ─────────── POST-INTERACTIVE ───────────               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  • Initialize analytics, crash reporting                   │  │
│  │  • Prefetch secondary screens                              │  │
│  │  • Register push notifications                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// Critical path initialization
// App.tsx - Optimized startup sequence
import { useEffect, useState, Suspense, lazy } from 'react';
import { InteractionManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';

// Eagerly import ONLY critical screens
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';

// Defer everything else
const ProfileScreen = lazy(() =&gt; import('./screens/ProfileScreen'));
const SettingsScreen = lazy(() =&gt; import('./screens/SettingsScreen'));

function App() {
    const [isReady, setIsReady] = useState(false);
    const [hasSession] = useMMKVBoolean('hasSession');
    const [cachedUser] = useMMKVString('cachedUser');

    useEffect(() =&gt; {
        async function bootstrap() {
            // Step 1: Restore session from cache (instant)
            if (hasSession &amp;&amp; cachedUser) {
                restoreUserFromCache(JSON.parse(cachedUser));
            }

            // Step 2: Fetch critical data with timeout
            const criticalData = await Promise.race([
                fetchHomeData(),
                timeout(2000), // Don't block startup longer than 2s
            ]);

            // Step 3: Mark ready, hide splash
            setIsReady(true);
            SplashScreen.hide();

            // Step 4: Defer non-critical work
            InteractionManager.runAfterInteractions(() =&gt; {
                initAnalytics();
                initCrashReporting();
                prefetchSecondaryScreens();
                validateSessionWithServer();
            });
        }

        bootstrap();
    }, []);

    if (!isReady) {
        return null; // Native splash is still visible
    }

    return (
        &lt;NavigationContainer&gt;
            &lt;Suspense fallback={&lt;ScreenSkeleton /&gt;}&gt;
                {hasSession ? &lt;MainNavigator /&gt; : &lt;AuthNavigator /&gt;}
            &lt;/Suspense&gt;
        &lt;/NavigationContainer&gt;
    );
}</code></pre>

            <h4>4. Platform-Specific Optimizations</h4>
            <h5>iOS Optimizations</h5>
            <pre><code>// ios/AppDelegate.mm
#import "RNSplashScreen.h"

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Show splash immediately to prevent white flash
    [RNSplashScreen show];

    // Use launch storyboard for instant native splash
    // Configure in Xcode: General &gt; App Icons and Launch Images

    return [super application:application
        didFinishLaunchingWithOptions:launchOptions];
}

// Prewarming (iOS 15+)
// Info.plist - Enable background modes for prewarming
&lt;key&gt;UIApplicationSceneManifest&lt;/key&gt;
&lt;dict&gt;
    &lt;key&gt;UISceneConfigurations&lt;/key&gt;
    // Scene configuration for prewarming
&lt;/dict&gt;

// Reduce native module initialization
// Only link native modules you actually use
// Podfile: use_frameworks! :linkage =&gt; :static</code></pre>

            <h5>Android Optimizations</h5>
            <pre><code>// android/app/build.gradle
android {
    defaultConfig {
        // Enable Hermes (required for fast startup)
        buildConfigField "boolean", "IS_HERMES_ENABLED", "true"
    }

    buildTypes {
        release {
            // Enable R8 full mode
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
        }
    }
}

// Use windowBackground for instant splash
// android/app/src/main/res/values/styles.xml
&lt;style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar"&gt;
    &lt;item name="android:windowBackground"&gt;@drawable/splash&lt;/item&gt;
    &lt;item name="android:windowNoTitle"&gt;true&lt;/item&gt;
&lt;/style&gt;

// Baseline Profiles (Android 7+)
// Generates AOT compiled code for critical paths
// android/app/src/main/baseline-prof.txt
HSPLcom/facebook/react/**-&gt;**(**)**
HSPLcom/myapp/MainActivity;-&gt;onCreate(**)</code></pre>

            <h4>5. Bundle Optimization Strategy</h4>
            <pre><code>// metro.config.js - Optimize bundle
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
                    inlineRequires: true,  // Critical: defer module execution
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

// Avoid barrel imports (causes entire module tree to load)
// BAD:
import { Button, Input, Card } from '@ui';

// GOOD:
import Button from '@ui/Button';
import Input from '@ui/Input';

// Analyze bundle size
// npx react-native-bundle-visualizer

// Common culprits to check:
// - moment.js (use date-fns or dayjs instead)
// - lodash (use lodash-es with tree shaking)
// - Large icon libraries (import individual icons)</code></pre>

            <h4>6. Data Flow</h4>
            <pre><code>App Launch
    │
    ▼
┌─────────────────────┐
│ Native Splash Shows │
│ (windowBackground)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Hermes loads        │
│ bytecode bundle     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Execute critical    │────▶│ MMKV cache read     │
│ path only           │     │ (sync, instant)     │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Render skeleton     │◀────│ Restore user state  │
│ with cached data    │     │ from cache          │
└──────────┬──────────┘     └─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ Hide splash         │
│ Show real content   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Background tasks:   │
│ - Validate session  │
│ - Init analytics    │
│ - Prefetch screens  │
└─────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Splash Screen</td><td>react-native-splash-screen</td><td>Smooth transition, no white flash</td></tr>
                <tr><td>Fast Storage</td><td>react-native-mmkv</td><td>Sync reads during startup, 30x faster than AsyncStorage</td></tr>
                <tr><td>Bundle Analysis</td><td>react-native-bundle-visualizer</td><td>Identify large dependencies</td></tr>
                <tr><td>JS Engine</td><td>Hermes (built-in)</td><td>Bytecode precompilation, faster startup</td></tr>
                <tr><td>Navigation</td><td>@react-navigation/native</td><td>Lazy screen loading built-in</td></tr>
                <tr><td>Performance</td><td>Flipper + Perf Monitor</td><td>Measure actual startup metrics</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>First launch (no cache):</strong> Show skeleton UI, don't block on network</li>
                <li><strong>Expired session:</strong> Show home with cached data, background token refresh</li>
                <li><strong>Slow network:</strong> Set timeouts, proceed with cached data after 2s</li>
                <li><strong>App update (cache mismatch):</strong> Clear incompatible cache, re-fetch</li>
                <li><strong>Low-end devices:</strong> Test on budget phones, reduce animations</li>
                <li><strong>Debug vs Release:</strong> Always measure in Release mode (dev is 10x slower)</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Measuring startup:</strong> Use Flipper performance plugin, adb shell am start-activity, Xcode Instruments</li>
                <li><strong>Hermes vs JSC:</strong> Hermes precompiles to bytecode, ~50% faster startup; JSC interprets at runtime</li>
                <li><strong>Code splitting in RN:</strong> React.lazy works but no true code splitting; Re.Pack enables it</li>
                <li><strong>Inline requires:</strong> Defers module execution until first import, critical for startup</li>
                <li><strong>Trade-offs:</strong> Aggressive caching vs data freshness; skeleton vs splash duration</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Render infinite-scrolling feed with 10,000+ items</li>
                <li>Support mixed cell types: images, videos, carousels, text-only</li>
                <li>Auto-play videos when visible, pause when scrolled away</li>
                <li>Interactive elements: likes, comments, shares with instant feedback</li>
                <li>Pull-to-refresh and infinite scroll pagination</li>
                <li>Smooth scroll performance at 60fps on mid-range devices</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Memory footprint under 150MB with 100 items visible in buffer</li>
                <li>Frame drops &lt; 5% during fast scrolling</li>
                <li>Initial render under 100ms for first 10 items</li>
                <li>Graceful degradation on low-end devices</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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
│  │  │  Image Cache    │  │ Video Pool   │  │ Blurhash       │ ││
│  │  │  (Memory+Disk)  │  │ (3 players)  │  │ Placeholders   │ ││
│  │  └─────────────────┘  └──────────────┘  └────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   DATA LAYER                                ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ TanStack Query │  │ Optimistic     │  │ Virtualized   │ ││
│  │  │ (Infinite)     │  │ Updates Store  │  │ Data Window   │ ││
│  │  └────────────────┘  └────────────────┘  └───────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/feed.ts
type CellType = 'image' | 'video' | 'carousel' | 'text';

interface BasePost {
    id: string;
    type: CellType;
    author: Author;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    caption: string;
}

interface ImagePost extends BasePost {
    type: 'image';
    imageUrl: string;
    blurhash: string;
    aspectRatio: number;
}

interface VideoPost extends BasePost {
    type: 'video';
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    aspectRatio: number;
}

interface CarouselPost extends BasePost {
    type: 'carousel';
    media: Array&lt;{ url: string; type: 'image' | 'video'; aspectRatio: number }&gt;;
}

interface TextPost extends BasePost {
    type: 'text';
}

type Post = ImagePost | VideoPost | CarouselPost | TextPost;

// Constants for cell height estimation
const CELL_HEIGHTS: Record&lt;CellType, number&gt; = {
    image: 500,
    video: 600,
    carousel: 550,
    text: 200,
};

// components/Feed.tsx
import { FlashList, ViewToken } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';

export function Feed() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['feed'],
            queryFn: ({ pageParam = null }) =&gt; fetchFeedPage(pageParam),
            getNextPageParam: (lastPage) =&gt; lastPage.nextCursor,
        });

    const posts = data?.pages.flatMap(page =&gt; page.posts) ?? [];
    const [visibleItems, setVisibleItems] = useState&lt;Set&lt;string&gt;&gt;(new Set());

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) =&gt; {
            const visibleIds = new Set(
                viewableItems.map(item =&gt; item.item.id)
            );
            setVisibleItems(visibleIds);
        },
        []
    );

    const renderItem = useCallback(
        ({ item }: { item: Post }) =&gt; {
            const isVisible = visibleItems.has(item.id);
            switch (item.type) {
                case 'image':
                    return &lt;ImageCell post={item} /&gt;;
                case 'video':
                    return &lt;VideoCell post={item} isVisible={isVisible} /&gt;;
                case 'carousel':
                    return &lt;CarouselCell post={item} isVisible={isVisible} /&gt;;
                case 'text':
                    return &lt;TextCell post={item} /&gt;;
            }
        },
        [visibleItems]
    );

    return (
        &lt;FlashList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) =&gt; item.id}
            getItemType={(item) =&gt; item.type}
            overrideItemLayout={(layout, item) =&gt; {
                layout.size = CELL_HEIGHTS[item.type];
            }}
            estimatedItemSize={450}
            onEndReached={() =&gt; hasNextPage &amp;&amp; fetchNextPage()}
            onEndReachedThreshold={0.5}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            refreshing={false}
            onRefresh={refetch}
            drawDistance={500}
        /&gt;
    );
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - UICollectionView Optimization:</strong></p>
            <pre><code>// FlashList uses UICollectionView under the hood
// Configure native prefetching behavior:

// ios/AppDelegate.mm - Increase image decode thread pool
#import &lt;SDWebImage/SDImageCodersManager.h&gt;

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Increase concurrent image decode operations
    SDImageCodersManager.sharedManager.coders = @[
        [[SDImageIOCoder alloc] init]
    ];

    // Configure URLSession for video prefetch
    NSURLSessionConfiguration *config =
        [NSURLSessionConfiguration defaultSessionConfiguration];
    config.HTTPMaximumConnectionsPerHost = 6;
    config.timeoutIntervalForRequest = 30;

    return YES;
}

// Video player pool - native module
// ios/VideoPlayerPool.swift
@objc class VideoPlayerPool: NSObject {
    static let shared = VideoPlayerPool()
    private var players: [AVPlayer] = []
    private let maxPlayers = 3

    @objc func getPlayer() -&gt; AVPlayer {
        if let available = players.first(where: { $0.currentItem == nil }) {
            return available
        }
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
}</code></pre>

            <p><strong>Android Strategy - RecyclerView Optimization:</strong></p>
            <pre><code>// FlashList uses RecyclerView under the hood
// Configure native prefetching:

// android/app/src/main/java/com/app/FeedOptimization.kt
class FeedOptimizationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    @ReactMethod
    fun configureRecyclerView(viewTag: Int) {
        val recyclerView = findViewByTag(viewTag) as? RecyclerView
        recyclerView?.apply {
            // Increase view cache for smoother scrolling
            setItemViewCacheSize(20)

            // Enable prefetch for better performance
            (layoutManager as? LinearLayoutManager)?.apply {
                initialPrefetchItemCount = 4
            }

            // Optimize for fixed-size items (when possible)
            setHasFixedSize(false)

            // Configure scroll physics
            addOnScrollListener(object : RecyclerView.OnScrollListener() {
                override fun onScrollStateChanged(rv: RecyclerView, state: Int) {
                    // Pause image loading during fast fling
                    when (state) {
                        RecyclerView.SCROLL_STATE_SETTLING -&gt; {
                            Glide.with(context).pauseRequests()
                        }
                        RecyclerView.SCROLL_STATE_IDLE -&gt; {
                            Glide.with(context).resumeRequests()
                        }
                    }
                }
            })
        }
    }
}

// ExoPlayer pool for video cells
object VideoPlayerPool {
    private val players = mutableListOf&lt;ExoPlayer&gt;()
    private const val MAX_PLAYERS = 3

    fun getPlayer(context: Context): ExoPlayer {
        synchronized(this) {
            players.find { !it.isPlaying }?.let { return it }

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
            return players.removeAt(0).also { players.add(it) }
        }
    }
}</code></pre>

            <h4>5. Optimized Cell Components</h4>
            <pre><code>// components/ImageCell.tsx
import { Image } from 'expo-image';
import { memo, useCallback, useMemo } from 'react';

const ImageCell = memo(function ImageCell({ post }: { post: ImagePost }) {
    const imageStyle = useMemo(() =&gt; ({
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * post.aspectRatio,
    }), [post.aspectRatio]);

    const onLike = useCallback(() =&gt; likePost(post.id), [post.id]);

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
            &lt;PostActions post={post} onLike={onLike} /&gt;
            &lt;PostCaption text={post.caption} /&gt;
        &lt;/View&gt;
    );
});

// components/VideoCell.tsx
import Video from 'react-native-video';

const VideoCell = memo(function VideoCell({
    post,
    isVisible
}: {
    post: VideoPost;
    isVisible: boolean;
}) {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef&lt;Video&gt;(null);

    // Pause video when not visible
    useEffect(() =&gt; {
        if (!isVisible &amp;&amp; videoRef.current) {
            videoRef.current.seek(0);
        }
    }, [isVisible]);

    return (
        &lt;View style={styles.cell}&gt;
            &lt;PostHeader author={post.author} /&gt;
            &lt;Pressable onPress={() =&gt; setIsMuted(m =&gt; !m)}&gt;
                &lt;Video
                    ref={videoRef}
                    source={{ uri: post.videoUrl }}
                    style={[styles.video, { aspectRatio: post.aspectRatio }]}
                    paused={!isVisible}
                    muted={isMuted}
                    repeat
                    resizeMode="cover"
                    poster={post.thumbnailUrl}
                    posterResizeMode="cover"
                    bufferConfig={{
                        minBufferMs: 2000,
                        maxBufferMs: 5000,
                        bufferForPlaybackMs: 1000,
                        bufferForPlaybackAfterRebufferMs: 2000,
                    }}
                /&gt;
                &lt;VideoOverlay isMuted={isMuted} duration={post.duration} /&gt;
            &lt;/Pressable&gt;
            &lt;PostActions post={post} /&gt;
        &lt;/View&gt;
    );
});</code></pre>

            <h4>6. Data Flow Diagram</h4>
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
│  │ Manager         │                    │  (Paginated Feed)    ││
│  └────────┬────────┘                    └───────────┬──────────┘│
│           │                                         │            │
│           │ visibleIds                              │ Posts[]    │
│           ▼                                         ▼            │
│  ┌─────────────────┐                    ┌──────────────────────┐│
│  │ Video Cells     │◄───────────────────│  Query Cache         ││
│  │ (play/pause)    │    Re-render       │  (Merged Pages)      ││
│  └─────────────────┘                    └──────────────────────┘│
│                                                                  │
│  Media Loading Flow:                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌──────────────┐ │
│  │ Cell    │───►│ Check   │───►│ Fetch   │───►│ Decode &amp;     │ │
│  │ Mounts  │    │ Cache   │    │ Remote  │    │ Display      │ │
│  └─────────┘    └─────────┘    └─────────┘    └──────────────┘ │
│                       │                                         │
│                       ▼ Cache Hit                               │
│              ┌─────────────────┐                                │
│              │ Instant Display │                                │
│              │ (blurhash fade) │                                │
│              └─────────────────┘                                │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>List Virtualization</td><td>@shopify/flash-list</td><td>5x faster than FlatList, cell recycling by type</td></tr>
                <tr><td>Image Loading</td><td>expo-image</td><td>Blurhash, recyclingKey, memory-disk cache</td></tr>
                <tr><td>Video Playback</td><td>react-native-video v6</td><td>Buffer config, poster support, player pooling</td></tr>
                <tr><td>Data Fetching</td><td>TanStack Query</td><td>Infinite queries, optimistic updates, cache</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>Lightweight store for UI state (mute, likes)</td></tr>
                <tr><td>Animations</td><td>react-native-reanimated</td><td>60fps like animations, gesture handlers</td></tr>
                <tr><td>Profiling</td><td>Flipper + Performance plugin</td><td>Frame rate monitoring, render tracking</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Rapid scrolling:</strong> Pause image/video loading during fling, resume on settle</li>
                <li><strong>Memory pressure:</strong> Release off-screen video players, reduce image cache</li>
                <li><strong>Orientation changes:</strong> Recalculate cell heights, maintain scroll position</li>
                <li><strong>Network degradation:</strong> Show cached thumbnails, queue video prefetch</li>
                <li><strong>Multiple videos visible:</strong> Only play topmost video to save bandwidth/battery</li>
                <li><strong>Deep scroll jump:</strong> Handle scroll-to-index for thousands of items efficiently</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Cell recycling:</strong> getItemType enables FlashList to reuse cells of same type, avoiding expensive unmount/remount</li>
                <li><strong>Video player pooling:</strong> Maintain 2-3 native video players, swap content rather than creating new instances</li>
                <li><strong>Visibility detection:</strong> onViewableItemsChanged with viewabilityConfig determines which cells are "visible"</li>
                <li><strong>Image placeholder strategy:</strong> Blurhash shows content preview while loading, smoother than spinner</li>
                <li><strong>Optimistic UI:</strong> Update like count immediately, reconcile with server response</li>
                <li><strong>Memory vs performance:</strong> Larger drawDistance improves scrolling but increases memory; tune per device tier</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Create, edit, delete pages with block-based content (text, headings, lists, images)</li>
                <li>Nested page hierarchy (pages within pages)</li>
                <li>Full offline editing capability with zero data loss</li>
                <li>Automatic sync when connectivity returns</li>
                <li>Conflict detection and resolution for concurrent edits</li>
                <li>Cross-device sync (phone, tablet, web)</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Edits persisted locally within 100ms</li>
                <li>Sync latency under 2s when reconnecting</li>
                <li>Handle 10,000+ pages with 100+ blocks each</li>
                <li>Battery-efficient background sync</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                 OFFLINE-FIRST NOTE APP ARCHITECTURE              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    UI LAYER (React Native)                  ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ ││
│  │  │ Page Editor │  │ Block       │  │ Navigation Tree     │ ││
│  │  │ (Rich Text) │  │ Components  │  │ (Nested Pages)      │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ ││
│  └─────────┼────────────────┼───────────────────┼──────────────┘│
│            │                │                   │                │
│  ┌─────────▼────────────────▼───────────────────▼──────────────┐│
│  │                  STATE &amp; SYNC LAYER                         ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ Zustand Store  │  │ Sync Engine    │  │ Operation Log │ ││
│  │  │ (UI State)     │  │ (Push/Pull)    │  │ (CRDT Queue)  │ ││
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
│  │  │ REST/WebSocket │ ◄──► │ Backend (PostgreSQL + Redis)   │││
│  │  └────────────────┘      └────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/notes.ts
type BlockType = 'text' | 'heading' | 'todo' | 'bullet' | 'numbered' |
                 'image' | 'code' | 'quote' | 'divider' | 'toggle';

interface Block {
    id: string;
    pageId: string;
    type: BlockType;
    content: string;
    properties: Record&lt;string, unknown&gt;;
    order: number;
    parentBlockId: string | null;
    createdAt: number;
    updatedAt: number;
    syncStatus: 'synced' | 'pending' | 'conflict';
    version: number;
}

interface Page {
    id: string;
    title: string;
    icon: string | null;
    coverImage: string | null;
    parentId: string | null;
    workspaceId: string;
    createdAt: number;
    updatedAt: number;
    syncStatus: 'synced' | 'pending' | 'conflict';
    version: number;
}

interface Operation {
    id: string;
    type: 'INSERT' | 'UPDATE' | 'DELETE';
    entity: 'page' | 'block';
    entityId: string;
    changes: Record&lt;string, unknown&gt;;
    timestamp: number;
    clientId: string;
    baseVersion: number;
}

// models/Page.ts (WatermelonDB)
import { Model } from '@nozbe/watermelondb';
import { field, children, date, readonly, writer } from '@nozbe/watermelondb/decorators';

export class PageModel extends Model {
    static table = 'pages';
    static associations = {
        blocks: { type: 'has_many' as const, foreignKey: 'page_id' },
    };

    @field('title') title!: string;
    @field('icon') icon!: string | null;
    @field('parent_id') parentId!: string | null;
    @field('sync_status') syncStatus!: string;
    @field('version') version!: number;
    @readonly @date('created_at') createdAt!: Date;
    @date('updated_at') updatedAt!: Date;
    @children('blocks') blocks!: Query&lt;BlockModel&gt;;

    @writer async updateTitle(newTitle: string) {
        await this.update(page =&gt; {
            page.title = newTitle;
            page.syncStatus = 'pending';
            page.version += 1;
        });
    }
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - Background Sync with BGTaskScheduler:</strong></p>
            <pre><code>// ios/NotesApp/BackgroundSync.swift
import BackgroundTasks

class BackgroundSyncManager {
    static let syncTaskId = "com.notesapp.sync"

    static func register() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: syncTaskId,
            using: nil
        ) { task in
            handleSync(task: task as! BGProcessingTask)
        }
    }

    static func scheduleSync() {
        let request = BGProcessingTaskRequest(identifier: syncTaskId)
        request.requiresNetworkConnectivity = true
        request.requiresExternalPower = false
        request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)

        try? BGTaskScheduler.shared.submit(request)
    }

    static func handleSync(task: BGProcessingTask) {
        task.expirationHandler = {
            SyncEngine.shared.cancelSync()
        }

        SyncEngine.shared.performSync { success in
            task.setTaskCompleted(success: success)
            scheduleSync() // Reschedule
        }
    }
}

// CloudKit for iOS-native sync option
import CloudKit

class CloudKitSync {
    let container = CKContainer(identifier: "iCloud.com.notesapp")
    let privateDB: CKDatabase

    init() {
        privateDB = container.privateCloudDatabase
    }

    func subscribeToChanges() {
        let subscription = CKDatabaseSubscription(subscriptionID: "notes-changes")
        let notificationInfo = CKSubscription.NotificationInfo()
        notificationInfo.shouldSendContentAvailable = true
        subscription.notificationInfo = notificationInfo

        privateDB.save(subscription) { _, _ in }
    }
}</code></pre>

            <p><strong>Android Strategy - WorkManager for Reliable Sync:</strong></p>
            <pre><code>// android/app/src/main/java/com/notesapp/sync/SyncWorker.kt
class SyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            val syncEngine = SyncEngine.getInstance(applicationContext)
            syncEngine.pushChanges()
            syncEngine.pullChanges()
            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount &lt; 3) {
                Result.retry()
            } else {
                Result.failure()
            }
        }
    }

    companion object {
        fun schedule(context: Context) {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()

            val syncRequest = PeriodicWorkRequestBuilder&lt;SyncWorker&gt;(
                15, TimeUnit.MINUTES
            )
                .setConstraints(constraints)
                .setBackoffCriteria(
                    BackoffPolicy.EXPONENTIAL,
                    1, TimeUnit.MINUTES
                )
                .build()

            WorkManager.getInstance(context)
                .enqueueUniquePeriodicWork(
                    "notes-sync",
                    ExistingPeriodicWorkPolicy.KEEP,
                    syncRequest
                )
        }
    }
}

// Trigger immediate sync when app comes online
class NetworkCallback(private val context: Context) :
    ConnectivityManager.NetworkCallback() {

    override fun onAvailable(network: Network) {
        val immediateSync = OneTimeWorkRequestBuilder&lt;SyncWorker&gt;()
            .setConstraints(
                Constraints.Builder()
                    .setRequiredNetworkType(NetworkType.CONNECTED)
                    .build()
            )
            .build()

        WorkManager.getInstance(context).enqueue(immediateSync)
    }
}</code></pre>

            <h4>5. Sync Engine Implementation</h4>
            <pre><code>// services/SyncEngine.ts
import NetInfo from '@react-native-community/netinfo';
import { database } from './database';

class SyncEngine {
    private clientId: string;
    private lastSyncTimestamp: number = 0;
    private isSyncing: boolean = false;

    constructor() {
        this.clientId = getDeviceId();
        this.setupNetworkListener();
    }

    private setupNetworkListener() {
        NetInfo.addEventListener(state =&gt; {
            if (state.isConnected &amp;&amp; !this.isSyncing) {
                this.sync();
            }
        });
    }

    async sync(): Promise&lt;void&gt; {
        if (this.isSyncing) return;
        this.isSyncing = true;

        try {
            // 1. Push local changes
            await this.pushChanges();

            // 2. Pull remote changes
            await this.pullChanges();

            // 3. Resolve any conflicts
            await this.resolveConflicts();

        } finally {
            this.isSyncing = false;
        }
    }

    private async pushChanges(): Promise&lt;void&gt; {
        const pendingOps = await database
            .get('operations')
            .query(Q.where('synced', false))
            .fetch();

        if (pendingOps.length === 0) return;

        const response = await api.pushOperations({
            operations: pendingOps.map(op =&gt; op._raw),
            clientId: this.clientId,
            lastSync: this.lastSyncTimestamp,
        });

        // Mark operations as synced
        await database.write(async () =&gt; {
            for (const op of pendingOps) {
                if (response.accepted.includes(op.id)) {
                    await op.update(o =&gt; { o.synced = true; });
                }
            }
        });

        // Handle rejected operations (conflicts)
        for (const rejection of response.rejected) {
            await this.handleRejection(rejection);
        }
    }

    private async pullChanges(): Promise&lt;void&gt; {
        const response = await api.getChanges({
            since: this.lastSyncTimestamp,
            clientId: this.clientId,
        });

        await database.write(async () =&gt; {
            for (const change of response.changes) {
                await this.applyRemoteChange(change);
            }
        });

        this.lastSyncTimestamp = response.timestamp;
        await MMKV.setItem('lastSync', String(this.lastSyncTimestamp));
    }
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    OFFLINE SYNC DATA FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Edits Block                                                │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐    Immediate    ┌──────────────────────────┐│
│  │  UI Component   │ ──────────────► │  WatermelonDB           ││
│  │  (Optimistic)   │                 │  (Local Write)          ││
│  └────────┬────────┘                 └───────────┬──────────────┘│
│           │                                      │               │
│           │ Re-render                            │ Create Op     │
│           ▼                                      ▼               │
│  ┌─────────────────┐                 ┌──────────────────────────┐│
│  │ Updated Block   │                 │  Operations Table        ││
│  │ (syncStatus:    │                 │  (synced: false)         ││
│  │  pending)       │                 └───────────┬──────────────┘│
│  └─────────────────┘                             │               │
│                                                  │               │
│  ═══════════════════ WHEN ONLINE ═══════════════│═══════════════│
│                                                  │               │
│                                     ┌────────────▼──────────────┐│
│                                     │  Sync Engine              ││
│                                     │  pushChanges()            ││
│                                     └────────────┬──────────────┘│
│                                                  │               │
│                                                  ▼               │
│  ┌─────────────────┐    Accepted    ┌──────────────────────────┐│
│  │  Mark synced    │ ◄───────────── │  Backend Server          ││
│  │  (synced: true) │                │  (Apply &amp; Store)         ││
│  └─────────────────┘                └───────────┬──────────────┘│
│                                                 │ Broadcast      │
│                                                 ▼               │
│                                     ┌──────────────────────────┐│
│                                     │  Other Clients           ││
│                                     │  pullChanges()           ││
│                                     └──────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Local Database</td><td>WatermelonDB</td><td>Lazy-loading, reactive queries, built for sync</td></tr>
                <tr><td>Key-Value Store</td><td>react-native-mmkv</td><td>Sync timestamps, preferences, fast access</td></tr>
                <tr><td>Network Status</td><td>@react-native-community/netinfo</td><td>Reliable connectivity detection</td></tr>
                <tr><td>Rich Text Editor</td><td>react-native-pell-rich-editor</td><td>Block-based editing, markdown support</td></tr>
                <tr><td>CRDT Library</td><td>Yjs</td><td>Real-time collaboration if needed</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>UI state separate from persisted data</td></tr>
                <tr><td>Image Handling</td><td>expo-image + expo-file-system</td><td>Local caching, lazy loading</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Long offline period:</strong> Batch sync with pagination to avoid timeout</li>
                <li><strong>Conflicting edits:</strong> Three-way merge for text, last-write-wins for structure</li>
                <li><strong>Large attachments:</strong> Sync text first, queue images for background upload</li>
                <li><strong>Deleted on another device:</strong> Soft delete with "restore" option during sync</li>
                <li><strong>Mid-sync app kill:</strong> Operations log ensures no data loss on resume</li>
                <li><strong>Version mismatch:</strong> Server rejects stale versions, client rebases and retries</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>CRDT vs OT:</strong> CRDTs converge without coordination; OT requires server ordering</li>
                <li><strong>Version vectors:</strong> Track causality across clients to detect concurrent edits</li>
                <li><strong>Tombstones:</strong> Deleted items kept with deleted flag to prevent resurrection</li>
                <li><strong>Sync granularity:</strong> Block-level sync minimizes conflicts vs page-level</li>
                <li><strong>Conflict UI:</strong> Show diff view for manual resolution when auto-merge fails</li>
                <li><strong>Sync frequency:</strong> Balance battery life vs data freshness (15-30 min background)</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Multiple users editing the same document simultaneously</li>
                <li>Real-time cursor and selection visibility</li>
                <li>Offline editing with sync on reconnection</li>
                <li>Automatic conflict resolution without data loss</li>
                <li>Manual conflict resolution UI when auto-merge fails</li>
                <li>Edit history and version tracking</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Latency under 100ms for keystroke propagation</li>
                <li>Guaranteed eventual consistency across all clients</li>
                <li>Handle 10+ concurrent editors per document</li>
                <li>Works offline with seamless sync</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│               COLLABORATIVE EDITING ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    CLIENT A                                 ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ ││
│  │  │ Editor UI   │  │ CRDT State  │  │ Operation Buffer    │ ││
│  │  │ (React)     │  │ (Yjs Doc)   │  │ (Pending Ops)       │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ ││
│  └─────────┼────────────────┼───────────────────┼──────────────┘│
│            │                │                   │                │
│            └────────────────┼───────────────────┘                │
│                             │                                    │
│                    WebSocket Connection                          │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────────────┐│
│  │                    SYNC SERVER                              ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ Connection     │  │ Document       │  │ Presence      │ ││
│  │  │ Manager        │  │ State (CRDT)   │  │ Manager       │ ││
│  │  └────────┬───────┘  └────────┬───────┘  └───────┬───────┘ ││
│  │           │                   │                  │          ││
│  │           └───────────────────┼──────────────────┘          ││
│  │                               │                              ││
│  │                    ┌──────────▼──────────┐                  ││
│  │                    │   Redis (Pub/Sub)   │                  ││
│  │                    │   Document Store    │                  ││
│  │                    └─────────────────────┘                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                             │                                    │
│                    WebSocket Connection                          │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────────────┐│
│  │                    CLIENT B                                 ││
│  │  (Same structure as Client A)                               ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/collaboration.ts
interface Operation {
    type: 'insert' | 'delete' | 'format';
    position: number;
    content?: string;
    length?: number;
    attributes?: Record&lt;string, unknown&gt;;
    clientId: string;
    timestamp: number;
    vectorClock: VectorClock;
}

interface VectorClock {
    [clientId: string]: number;
}

interface Presence {
    clientId: string;
    userId: string;
    cursor: { index: number; length: number } | null;
    color: string;
    name: string;
}

interface ConflictResolution {
    type: 'auto' | 'manual';
    strategy: 'merge' | 'local' | 'remote' | 'both';
    result: string;
}

// Using Yjs CRDT library
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

class CollaborativeDocument {
    private doc: Y.Doc;
    private provider: WebsocketProvider;
    private text: Y.Text;

    constructor(documentId: string, serverUrl: string) {
        this.doc = new Y.Doc();
        this.text = this.doc.getText('content');

        this.provider = new WebsocketProvider(
            serverUrl,
            documentId,
            this.doc
        );

        // Handle sync status
        this.provider.on('sync', (isSynced: boolean) =&gt; {
            console.log('Sync status:', isSynced);
        });
    }

    insert(index: number, content: string): void {
        this.text.insert(index, content);
    }

    delete(index: number, length: number): void {
        this.text.delete(index, length);
    }

    observe(callback: (event: Y.YTextEvent) =&gt; void): void {
        this.text.observe(callback);
    }

    getContent(): string {
        return this.text.toString();
    }
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - Background WebSocket Handling:</strong></p>
            <pre><code>// ios/CollaborativeEdit/WebSocketManager.swift
import Foundation

class WebSocketManager: NSObject, URLSessionWebSocketDelegate {
    private var webSocket: URLSessionWebSocketTask?
    private var backgroundTaskId: UIBackgroundTaskIdentifier = .invalid

    func connect(to url: URL) {
        let session = URLSession(
            configuration: .default,
            delegate: self,
            delegateQueue: OperationQueue()
        )
        webSocket = session.webSocketTask(with: url)
        webSocket?.resume()
        receiveMessage()
    }

    // Handle app backgrounding
    func handleAppBackground() {
        backgroundTaskId = UIApplication.shared.beginBackgroundTask {
            self.endBackgroundTask()
        }

        // Keep connection alive briefly for pending syncs
        DispatchQueue.main.asyncAfter(deadline: .now() + 25) {
            self.endBackgroundTask()
        }
    }

    private func endBackgroundTask() {
        if backgroundTaskId != .invalid {
            UIApplication.shared.endBackgroundTask(backgroundTaskId)
            backgroundTaskId = .invalid
        }
    }

    // Reconnection with exponential backoff
    func reconnect() {
        var delay: TimeInterval = 1.0

        func attempt() {
            connect(to: serverUrl)

            if !isConnected {
                delay = min(delay * 2, 30)
                DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
                    attempt()
                }
            }
        }

        attempt()
    }
}</code></pre>

            <p><strong>Android Strategy - Foreground Service for Sync:</strong></p>
            <pre><code>// android/app/src/main/java/com/app/CollaborationService.kt
class CollaborationService : Service() {
    private var webSocket: WebSocket? = null
    private val client = OkHttpClient.Builder()
        .pingInterval(30, TimeUnit.SECONDS)
        .build()

    override fun onCreate() {
        super.onCreate()
        startForeground(NOTIFICATION_ID, createNotification())
    }

    fun connect(documentId: String) {
        val request = Request.Builder()
            .url("wss://collab.example.com/doc/$documentId")
            .build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onMessage(webSocket: WebSocket, text: String) {
                // Handle CRDT update from server
                handleRemoteUpdate(text)
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                // Exponential backoff reconnection
                scheduleReconnect()
            }
        })
    }

    private fun scheduleReconnect() {
        val workRequest = OneTimeWorkRequestBuilder&lt;ReconnectWorker&gt;()
            .setBackoffCriteria(
                BackoffPolicy.EXPONENTIAL,
                1, TimeUnit.SECONDS
            )
            .build()

        WorkManager.getInstance(this).enqueue(workRequest)
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Collaborative Editing")
            .setContentText("Syncing document changes...")
            .setSmallIcon(R.drawable.ic_sync)
            .build()
    }
}</code></pre>

            <h4>5. CRDT Conflict Resolution</h4>
            <pre><code>// Yjs handles most conflicts automatically via CRDT
// Manual conflict UI for structural conflicts

// components/ConflictResolver.tsx
interface ConflictData {
    localVersion: string;
    remoteVersion: string;
    baseVersion: string;
    conflictType: 'text' | 'structure' | 'delete';
}

function ConflictResolver({ conflict, onResolve }: {
    conflict: ConflictData;
    onResolve: (resolution: ConflictResolution) =&gt; void;
}) {
    const [selectedResolution, setSelectedResolution] = useState&lt;string | null&gt;(null);

    // Attempt auto-merge first
    const autoMergeResult = useMemo(() =&gt; {
        if (conflict.conflictType === 'text') {
            return threeWayMerge(
                conflict.baseVersion,
                conflict.localVersion,
                conflict.remoteVersion
            );
        }
        return null;
    }, [conflict]);

    if (autoMergeResult &amp;&amp; !autoMergeResult.hasConflicts) {
        // Auto-merge succeeded
        useEffect(() =&gt; {
            onResolve({ type: 'auto', strategy: 'merge', result: autoMergeResult.result });
        }, []);
        return null;
    }

    return (
        &lt;Modal visible={true}&gt;
            &lt;Text style={styles.title}&gt;Resolve Conflict&lt;/Text&gt;

            &lt;View style={styles.diffView}&gt;
                &lt;DiffViewer
                    original={conflict.baseVersion}
                    modified={conflict.localVersion}
                    title="Your Changes"
                /&gt;
                &lt;DiffViewer
                    original={conflict.baseVersion}
                    modified={conflict.remoteVersion}
                    title="Their Changes"
                /&gt;
            &lt;/View&gt;

            &lt;View style={styles.options}&gt;
                &lt;TouchableOpacity onPress={() =&gt; onResolve({
                    type: 'manual', strategy: 'local', result: conflict.localVersion
                })}&gt;
                    &lt;Text&gt;Keep My Version&lt;/Text&gt;
                &lt;/TouchableOpacity&gt;

                &lt;TouchableOpacity onPress={() =&gt; onResolve({
                    type: 'manual', strategy: 'remote', result: conflict.remoteVersion
                })}&gt;
                    &lt;Text&gt;Use Their Version&lt;/Text&gt;
                &lt;/TouchableOpacity&gt;

                &lt;TouchableOpacity onPress={() =&gt; onResolve({
                    type: 'manual',
                    strategy: 'both',
                    result: conflict.localVersion + '\\n---\\n' + conflict.remoteVersion
                })}&gt;
                    &lt;Text&gt;Keep Both&lt;/Text&gt;
                &lt;/TouchableOpacity&gt;
            &lt;/View&gt;
        &lt;/Modal&gt;
    );
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                  CONFLICT RESOLUTION FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A Types "Hello"          User B Types "World"              │
│         │                              │                         │
│         ▼                              ▼                         │
│  ┌─────────────────┐          ┌─────────────────┐               │
│  │ Create Operation│          │ Create Operation│               │
│  │ Insert(0,"Hello")          │ Insert(0,"World")               │
│  │ VectorClock: A=1│          │ VectorClock: B=1│               │
│  └────────┬────────┘          └────────┬────────┘               │
│           │                            │                         │
│           └──────────┬─────────────────┘                         │
│                      ▼                                           │
│           ┌──────────────────┐                                   │
│           │   CRDT Engine    │                                   │
│           │   (Yjs / Automerge)                                  │
│           └────────┬─────────┘                                   │
│                    │                                             │
│          ┌────────┴────────┐                                    │
│          ▼                 ▼                                    │
│  ┌───────────────┐ ┌───────────────┐                            │
│  │ Concurrent?   │ │ Sequential?   │                            │
│  │ (VectorClock) │ │ (One before)  │                            │
│  └───────┬───────┘ └───────┬───────┘                            │
│          │                 │                                     │
│          ▼                 ▼                                     │
│  ┌───────────────┐ ┌───────────────┐                            │
│  │ Transform Ops │ │ Apply As-Is   │                            │
│  │ Insert(0,"Hello")=&gt;Insert(0,"Hello")                         │
│  │ Insert(0,"World")=&gt;Insert(5,"World")                         │
│  └───────┬───────┘ └───────────────┘                            │
│          │                                                       │
│          ▼                                                       │
│  ┌───────────────────────────────────┐                          │
│  │        Final State: "HelloWorld"  │                          │
│  │        (Deterministic on all clients)                        │
│  └───────────────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>CRDT Implementation</td><td>Yjs</td><td>Battle-tested, supports text/rich-text/arrays</td></tr>
                <tr><td>Alternative CRDT</td><td>Automerge</td><td>JSON-like data structures, no server required</td></tr>
                <tr><td>WebSocket</td><td>y-websocket</td><td>Yjs-compatible sync provider</td></tr>
                <tr><td>Presence</td><td>y-presence</td><td>Cursor positions, user awareness</td></tr>
                <tr><td>Rich Text</td><td>Quill + y-quill</td><td>Editor with CRDT bindings</td></tr>
                <tr><td>Offline Persistence</td><td>y-indexeddb</td><td>Local CRDT state persistence</td></tr>
                <tr><td>Diff Visualization</td><td>diff-match-patch</td><td>Three-way merge algorithm</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Concurrent deletes:</strong> Both users delete overlapping text; CRDT ensures no duplication</li>
                <li><strong>Long offline period:</strong> Large operation log; batch sync with progress indicator</li>
                <li><strong>Network partition:</strong> Split-brain scenario; merge when reconnected</li>
                <li><strong>Undo/redo with collaboration:</strong> Local undo shouldn't affect others' changes</li>
                <li><strong>Large documents:</strong> Lazy-load sections, sync visible portions first</li>
                <li><strong>User leaves mid-edit:</strong> Presence cleanup, cursor removal</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>CRDT vs OT:</strong> CRDTs are commutative/associative (order-independent); OT requires centralized transform server</li>
                <li><strong>Vector clocks:</strong> Track causality to detect concurrent operations vs sequential</li>
                <li><strong>Tombstones:</strong> Deleted items kept with marker to prevent resurrection during sync</li>
                <li><strong>Intention preservation:</strong> User intent should be maintained even after transformation</li>
                <li><strong>Garbage collection:</strong> Periodically clean up old tombstones to reduce document size</li>
                <li><strong>Consistency models:</strong> Eventual consistency vs strong consistency trade-offs</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Send text messages and media attachments</li>
                <li>Messages persist and send when offline</li>
                <li>Message status: queued → sending → sent → delivered → read</li>
                <li>Automatic retry with exponential backoff</li>
                <li>Message ordering preserved within conversations</li>
                <li>Deduplication prevents double-delivery</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Messages queued within 50ms of user action</li>
                <li>Sync completes within 5s of network restoration</li>
                <li>Handle 1000+ queued messages during extended offline</li>
                <li>Zero message loss even on app crash</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                 OFFLINE MESSAGING ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    UI LAYER                                 ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ ││
│  │  │ Chat Screen │  │ Message     │  │ Status Indicators   │ ││
│  │  │             │  │ Composer    │  │ (✓ ✓✓ 🕐 ❌)         │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ ││
│  └─────────┼────────────────┼───────────────────┼──────────────┘│
│            │                │                   │                │
│  ┌─────────▼────────────────▼───────────────────▼──────────────┐│
│  │                   MESSAGE LAYER                             ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ Message Queue  │  │ Retry Service  │  │ Deduplicator  │ ││
│  │  │ (MMKV backed)  │  │ (Exp Backoff)  │  │ (localId)     │ ││
│  │  └────────┬───────┘  └────────┬───────┘  └───────┬───────┘ ││
│  └───────────┼──────────────────┼──────────────────┼───────────┘│
│              │                  │                  │             │
│  ┌───────────▼──────────────────▼──────────────────▼───────────┐│
│  │                   PERSISTENCE LAYER                         ││
│  │  ┌───────────────────────────────────────────────────────┐ ││
│  │  │                    WatermelonDB                       │ ││
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐│ ││
│  │  │  │messages  │  │queue_ops │  │ conversations        ││ ││
│  │  │  └──────────┘  └──────────┘  └──────────────────────┘│ ││
│  │  └───────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼ (When Online)                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    SYNC LAYER                               ││
│  │  ┌────────────────┐      ┌────────────────────────────────┐││
│  │  │ WebSocket      │ ◄──► │ Message Server                 │││
│  │  │ Connection     │      │ (Push + Pull)                  │││
│  │  └────────────────┘      └────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/messaging.ts
type MessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

interface Message {
    id: string;           // Server ID (null until synced)
    localId: string;      // Client-generated UUID
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: number;
    status: MessageStatus;
    retryCount: number;
    attachments?: Attachment[];
    replyTo?: string;
}

interface QueuedOperation {
    id: string;
    type: 'send' | 'delete' | 'edit';
    messageLocalId: string;
    payload: Record&lt;string, unknown&gt;;
    createdAt: number;
    attempts: number;
}

// services/MessageQueue.ts
import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';

const storage = new MMKV({ id: 'message-queue' });

class MessageQueue {
    private queue: QueuedOperation[] = [];
    private isProcessing = false;

    constructor() {
        this.loadQueue();
        this.setupNetworkListener();
    }

    private loadQueue(): void {
        const saved = storage.getString('pending_queue');
        this.queue = saved ? JSON.parse(saved) : [];
    }

    private saveQueue(): void {
        storage.set('pending_queue', JSON.stringify(this.queue));
    }

    private setupNetworkListener(): void {
        NetInfo.addEventListener(state =&gt; {
            if (state.isConnected &amp;&amp; this.queue.length &gt; 0) {
                this.processQueue();
            }
        });
    }

    async enqueue(message: Omit&lt;Message, 'id' | 'status' | 'retryCount'&gt;): Promise&lt;string&gt; {
        const localId = generateUUID();

        // 1. Save to local database immediately
        await database.write(async () =&gt; {
            await database.get('messages').create(msg =&gt; {
                msg.localId = localId;
                msg.conversationId = message.conversationId;
                msg.content = message.content;
                msg.timestamp = Date.now();
                msg.status = 'queued';
                msg.retryCount = 0;
            });
        });

        // 2. Add to send queue
        const operation: QueuedOperation = {
            id: generateUUID(),
            type: 'send',
            messageLocalId: localId,
            payload: message,
            createdAt: Date.now(),
            attempts: 0,
        };

        this.queue.push(operation);
        this.saveQueue();

        // 3. Trigger immediate processing
        this.processQueue();

        return localId;
    }

    async processQueue(): Promise&lt;void&gt; {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;

        // Process in FIFO order
        const sortedQueue = [...this.queue].sort((a, b) =&gt; a.createdAt - b.createdAt);

        for (const op of sortedQueue) {
            try {
                await this.processOperation(op);
                this.removeFromQueue(op.id);
            } catch (error) {
                await this.handleFailure(op, error);
            }
        }

        this.isProcessing = false;
    }

    private async processOperation(op: QueuedOperation): Promise&lt;void&gt; {
        // Update status to sending
        await this.updateMessageStatus(op.messageLocalId, 'sending');

        const response = await api.sendMessage({
            ...op.payload,
            localId: op.messageLocalId,
        });

        // Update with server ID and sent status
        await database.write(async () =&gt; {
            const msg = await database.get('messages')
                .query(Q.where('local_id', op.messageLocalId))
                .fetchOne();
            await msg.update(m =&gt; {
                m.serverId = response.id;
                m.status = 'sent';
            });
        });
    }
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - Notification Service Extension:</strong></p>
            <pre><code>// ios/NotificationService/NotificationService.swift
// Handle push notifications even when app is killed

class NotificationService: UNNotificationServiceExtension {
    var contentHandler: ((UNNotificationContent) -&gt; Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(
        _ request: UNNotificationRequest,
        withContentHandler contentHandler: @escaping (UNNotificationContent) -&gt; Void
    ) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

        guard let content = bestAttemptContent,
              let messageData = content.userInfo["message"] as? [String: Any] else {
            contentHandler(request.content)
            return
        }

        // Store message in shared container (App Group)
        let sharedDefaults = UserDefaults(suiteName: "group.com.app.messaging")
        var pendingMessages = sharedDefaults?.array(forKey: "pending_messages") as? [[String: Any]] ?? []
        pendingMessages.append(messageData)
        sharedDefaults?.set(pendingMessages, forKey: "pending_messages")

        // Mark as delivered via silent API call
        if let messageId = messageData["id"] as? String {
            markDelivered(messageId: messageId)
        }

        contentHandler(content)
    }

    private func markDelivered(messageId: String) {
        // Quick API call to mark delivery
        var request = URLRequest(url: URL(string: "https://api.app.com/messages/\\(messageId)/delivered")!)
        request.httpMethod = "POST"
        URLSession.shared.dataTask(with: request).resume()
    }
}</code></pre>

            <p><strong>Android Strategy - WorkManager for Reliable Delivery:</strong></p>
            <pre><code>// android/app/src/main/java/com/app/MessageSyncWorker.kt
class MessageSyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        val messageQueue = MessageQueue.getInstance(applicationContext)

        return try {
            val pending = messageQueue.getPendingMessages()

            for (message in pending) {
                try {
                    sendMessage(message)
                    messageQueue.markSent(message.localId)
                } catch (e: Exception) {
                    messageQueue.incrementRetry(message.localId)

                    if (message.retryCount &gt;= MAX_RETRIES) {
                        messageQueue.markFailed(message.localId)
                    }
                }
            }

            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount &lt; 3) Result.retry() else Result.failure()
        }
    }

    companion object {
        private const val MAX_RETRIES = 5

        fun scheduleSync(context: Context, isImmediate: Boolean = false) {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()

            val request = if (isImmediate) {
                OneTimeWorkRequestBuilder&lt;MessageSyncWorker&gt;()
                    .setConstraints(constraints)
                    .build()
            } else {
                OneTimeWorkRequestBuilder&lt;MessageSyncWorker&gt;()
                    .setConstraints(constraints)
                    .setBackoffCriteria(
                        BackoffPolicy.EXPONENTIAL,
                        1, TimeUnit.SECONDS
                    )
                    .build()
            }

            WorkManager.getInstance(context)
                .enqueueUniqueWork(
                    "message-sync",
                    ExistingWorkPolicy.REPLACE,
                    request
                )
        }
    }
}

// FCM Service for incoming messages
class MessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        remoteMessage.data["message"]?.let { messageJson -&gt;
            val message = Gson().fromJson(messageJson, Message::class.java)

            // Store locally
            MessageDatabase.getInstance(this).messageDao().insert(message)

            // Acknowledge delivery
            acknowledgeDelivery(message.id)
        }
    }
}</code></pre>

            <h4>5. Retry Strategy with Exponential Backoff</h4>
            <pre><code>// services/RetryManager.ts
class RetryManager {
    private retryTimers: Map&lt;string, NodeJS.Timeout&gt; = new Map();
    private readonly MAX_RETRIES = 5;
    private readonly BASE_DELAY = 1000; // 1 second
    private readonly MAX_DELAY = 30000; // 30 seconds

    scheduleRetry(operation: QueuedOperation): void {
        this.clearRetry(operation.id);

        const delay = Math.min(
            this.BASE_DELAY * Math.pow(2, operation.attempts),
            this.MAX_DELAY
        );

        // Add jitter to prevent thundering herd
        const jitter = Math.random() * 0.3 * delay;
        const finalDelay = delay + jitter;

        const timer = setTimeout(() =&gt; {
            messageQueue.retryOperation(operation.id);
            this.retryTimers.delete(operation.id);
        }, finalDelay);

        this.retryTimers.set(operation.id, timer);
    }

    clearRetry(operationId: string): void {
        const timer = this.retryTimers.get(operationId);
        if (timer) {
            clearTimeout(timer);
            this.retryTimers.delete(operationId);
        }
    }

    clearAll(): void {
        this.retryTimers.forEach(timer =&gt; clearTimeout(timer));
        this.retryTimers.clear();
    }
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    MESSAGE SEND FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Sends Message                                              │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐                                            │
│  │ 1. Generate     │  localId = UUID()                          │
│  │    localId      │  status = 'queued'                         │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │ 2. Save to      │───►│ 3. Add to       │                     │
│  │    Local DB     │    │    Send Queue   │                     │
│  └─────────────────┘    └────────┬────────┘                     │
│                                  │                               │
│           ┌──────────────────────┘                               │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐    Online?    ┌─────────────────┐          │
│  │ 4. Process      │──────────────►│ 5. Send to      │          │
│  │    Queue        │      Yes      │    Server       │          │
│  └────────┬────────┘               └────────┬────────┘          │
│           │ No                              │                    │
│           ▼                                 ▼                    │
│  ┌─────────────────┐               ┌─────────────────┐          │
│  │ Wait for        │               │ 6. Server ACK   │          │
│  │ Network         │               │    (serverId)   │          │
│  └─────────────────┘               └────────┬────────┘          │
│                                             │                    │
│                                             ▼                    │
│                                    ┌─────────────────┐          │
│                                    │ 7. Update       │          │
│                                    │    status='sent'│          │
│                                    └─────────────────┘          │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Queue Persistence</td><td>react-native-mmkv</td><td>Synchronous, fast, crash-safe</td></tr>
                <tr><td>Message Database</td><td>WatermelonDB</td><td>Lazy loading, reactive queries</td></tr>
                <tr><td>Network Detection</td><td>@react-native-community/netinfo</td><td>Reliable connectivity status</td></tr>
                <tr><td>WebSocket</td><td>Socket.io-client</td><td>Auto-reconnection, fallback to polling</td></tr>
                <tr><td>Background Sync</td><td>react-native-background-fetch</td><td>iOS BGTask + Android WorkManager</td></tr>
                <tr><td>UUID Generation</td><td>uuid or nanoid</td><td>Fast, collision-resistant IDs</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>App killed mid-send:</strong> Queue persisted to MMKV survives; resume on next launch</li>
                <li><strong>Duplicate delivery:</strong> Server deduplicates by localId; client checks before insert</li>
                <li><strong>Out-of-order arrival:</strong> Sort by timestamp when displaying; server reorders if needed</li>
                <li><strong>Large attachment offline:</strong> Queue reference, upload when online with progress</li>
                <li><strong>Conversation deleted:</strong> Clean up pending messages for that conversation</li>
                <li><strong>Network flap:</strong> Debounce connectivity changes to avoid rapid retry cycles</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Idempotency:</strong> localId ensures server can deduplicate retried sends</li>
                <li><strong>FIFO ordering:</strong> Process queue in creation order to maintain conversation flow</li>
                <li><strong>Exponential backoff:</strong> Prevent server overload during outages; add jitter</li>
                <li><strong>Delivery guarantees:</strong> At-least-once with deduplication = effectively exactly-once</li>
                <li><strong>Push vs pull:</strong> Push for real-time; pull on app launch to catch missed messages</li>
                <li><strong>Battery efficiency:</strong> Batch queue processing; avoid frequent wake-ups</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Real-time message delivery (under 100ms latency)</li>
                <li>Typing indicators with "User is typing..." display</li>
                <li>Read receipts: sent → delivered → read status</li>
                <li>User presence: online, away, offline with last seen</li>
                <li>Group chat support with multiple typing users</li>
                <li>Handle network interruptions gracefully</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Typing indicator latency under 200ms</li>
                <li>Presence updates within 5s of state change</li>
                <li>Support 10,000+ concurrent connections per server</li>
                <li>Battery-efficient on mobile (minimize wake-ups)</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                 REAL-TIME CHAT ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    CLIENT LAYER                             ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ ││
│  │  │ Socket      │  │ Presence    │  │ Typing              │ ││
│  │  │ Manager     │  │ Service     │  │ Manager             │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ ││
│  └─────────┼────────────────┼───────────────────┼──────────────┘│
│            │                │                   │                │
│            └────────────────┼───────────────────┘                │
│                             │                                    │
│                   WebSocket Connection                           │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────────────┐│
│  │                    GATEWAY LAYER                            ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ WebSocket      │  │ Load Balancer  │  │ Connection    │ ││
│  │  │ Gateway        │  │ (sticky)       │  │ Registry      │ ││
│  │  └────────┬───────┘  └────────────────┘  └───────┬───────┘ ││
│  └───────────┼──────────────────────────────────────┼──────────┘│
│              │                                      │            │
│  ┌───────────▼──────────────────────────────────────▼──────────┐│
│  │                    SERVICE LAYER                            ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ Message        │  │ Presence       │  │ Notification  │ ││
│  │  │ Service        │  │ Service        │  │ Service       │ ││
│  │  └────────┬───────┘  └────────┬───────┘  └───────┬───────┘ ││
│  └───────────┼──────────────────┼──────────────────┼───────────┘│
│              │                  │                  │             │
│  ┌───────────▼──────────────────▼──────────────────▼───────────┐│
│  │                    DATA LAYER                               ││
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ ││
│  │  │ Redis          │  │ PostgreSQL     │  │ Message Queue │ ││
│  │  │ (Pub/Sub +     │  │ (Persistence)  │  │ (Kafka/SQS)   │ ││
│  │  │  Presence)     │  │                │  │               │ ││
│  │  └────────────────┘  └────────────────┘  └───────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/realtime.ts
type PresenceStatus = 'online' | 'away' | 'offline';

interface PresenceState {
    userId: string;
    status: PresenceStatus;
    lastSeen: number | null;
    device: string;
}

interface TypingEvent {
    conversationId: string;
    userId: string;
    isTyping: boolean;
    timestamp: number;
}

interface ReadReceipt {
    messageId: string;
    conversationId: string;
    userId: string;
    readAt: number;
}

// services/SocketManager.ts
import { io, Socket } from 'socket.io-client';

class SocketManager {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private pendingEvents: Array&lt;{ event: string; data: unknown }&gt; = [];
    private listeners = new Map&lt;string, Set&lt;(data: unknown) =&gt; void&gt;&gt;();

    connect(token: string): void {
        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
            reconnectionAttempts: 10,
        });

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
        ['message', 'typing', 'presence', 'read_receipt'].forEach(event =&gt; {
            this.socket?.on(event, (data) =&gt; this.emit(event, data));
        });
    }

    send(event: string, data: unknown): void {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        } else {
            // Queue for later delivery
            this.pendingEvents.push({ event, data });
        }
    }

    subscribe&lt;T&gt;(event: string, callback: (data: T) =&gt; void): () =&gt; void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback as (data: unknown) =&gt; void);
        return () =&gt; this.listeners.get(event)?.delete(callback as (data: unknown) =&gt; void);
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
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - Background Socket Management:</strong></p>
            <pre><code>// ios/ChatApp/SocketBackgroundManager.swift
import UIKit
import BackgroundTasks

class SocketBackgroundManager {
    static let shared = SocketBackgroundManager()
    private var backgroundTask: UIBackgroundTaskIdentifier = .invalid

    func handleAppEnteringBackground() {
        // Request background time to gracefully close socket
        backgroundTask = UIApplication.shared.beginBackgroundTask { [weak self] in
            self?.endBackgroundTask()
        }

        // Send presence update before socket closes
        SocketBridge.shared.sendPresence(status: "away")

        // Keep socket alive briefly for pending operations
        DispatchQueue.main.asyncAfter(deadline: .now() + 25) { [weak self] in
            self?.endBackgroundTask()
        }
    }

    private func endBackgroundTask() {
        if backgroundTask != .invalid {
            // Gracefully disconnect
            SocketBridge.shared.disconnect()
            UIApplication.shared.endBackgroundTask(backgroundTask)
            backgroundTask = .invalid
        }
    }

    func handleAppBecomingActive() {
        // Reconnect and sync presence
        SocketBridge.shared.reconnect()
        SocketBridge.shared.sendPresence(status: "online")
    }
}

// VoIP Push for instant reconnection (requires entitlement)
import PushKit

class VoIPPushHandler: NSObject, PKPushRegistryDelegate {
    func pushRegistry(_ registry: PKPushRegistry,
                     didReceiveIncomingPushWith payload: PKPushPayload,
                     for type: PKPushType) {
        // Wake app and reconnect socket for incoming message
        SocketBridge.shared.reconnect()
    }
}</code></pre>

            <p><strong>Android Strategy - Foreground Service for Socket:</strong></p>
            <pre><code>// android/app/src/main/java/com/app/SocketService.kt
class SocketService : Service() {
    private var socket: Socket? = null

    override fun onCreate() {
        super.onCreate()
        startForeground(NOTIFICATION_ID, createNotification())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_CONNECT -&gt; connectSocket()
            ACTION_DISCONNECT -&gt; disconnectSocket()
            ACTION_SEND_PRESENCE -&gt; sendPresence(intent.getStringExtra("status") ?: "online")
        }
        return START_STICKY
    }

    private fun connectSocket() {
        val opts = IO.Options().apply {
            auth = mapOf("token" to getAuthToken())
            transports = arrayOf("websocket")
            reconnection = true
        }

        socket = IO.socket(SOCKET_URL, opts).apply {
            on(Socket.EVENT_CONNECT) {
                sendPresence("online")
            }
            on(Socket.EVENT_DISCONNECT) {
                // Will auto-reconnect
            }
            connect()
        }
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Chat Active")
            .setSmallIcon(R.drawable.ic_chat)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }
}

// Lifecycle-aware connection management
class SocketLifecycleObserver : DefaultLifecycleObserver {
    override fun onStart(owner: LifecycleOwner) {
        ContextCompat.startForegroundService(
            context,
            Intent(context, SocketService::class.java).apply {
                action = SocketService.ACTION_CONNECT
            }
        )
    }

    override fun onStop(owner: LifecycleOwner) {
        // Keep service running but update presence
        context.startService(
            Intent(context, SocketService::class.java).apply {
                action = SocketService.ACTION_SEND_PRESENCE
                putExtra("status", "away")
            }
        )
    }
}</code></pre>

            <h4>5. Typing &amp; Presence Implementation</h4>
            <pre><code>// hooks/useTypingIndicator.ts
function useTypingIndicator(conversationId: string) {
    const [typingUsers, setTypingUsers] = useState&lt;Map&lt;string, number&gt;&gt;(new Map());

    useEffect(() =&gt; {
        const unsubscribe = socketManager.subscribe&lt;TypingEvent&gt;(
            'typing',
            ({ conversationId: cid, userId, isTyping, timestamp }) =&gt; {
                if (cid !== conversationId) return;

                setTypingUsers(prev =&gt; {
                    const next = new Map(prev);
                    if (isTyping) {
                        next.set(userId, timestamp);
                    } else {
                        next.delete(userId);
                    }
                    return next;
                });
            }
        );

        // Cleanup stale typing indicators every second
        const cleanup = setInterval(() =&gt; {
            const now = Date.now();
            setTypingUsers(prev =&gt; {
                const next = new Map(prev);
                for (const [userId, timestamp] of next) {
                    if (now - timestamp &gt; 3000) {
                        next.delete(userId);
                    }
                }
                return next.size !== prev.size ? next : prev;
            });
        }, 1000);

        return () =&gt; {
            unsubscribe();
            clearInterval(cleanup);
        };
    }, [conversationId]);

    return Array.from(typingUsers.keys());
}

// hooks/usePresence.ts
function usePresence(userIds: string[]) {
    const [presence, setPresence] = useState&lt;Map&lt;string, PresenceState&gt;&gt;(new Map());

    useEffect(() =&gt; {
        // Subscribe to presence changes
        const unsubscribe = socketManager.subscribe&lt;PresenceState&gt;(
            'presence',
            (state) =&gt; {
                if (userIds.includes(state.userId)) {
                    setPresence(prev =&gt; new Map(prev).set(state.userId, state));
                }
            }
        );

        // Request initial presence for users
        socketManager.send('presence:subscribe', { userIds });

        return () =&gt; {
            unsubscribe();
            socketManager.send('presence:unsubscribe', { userIds });
        };
    }, [userIds.join(',')]);

    return presence;
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                  REAL-TIME EVENT FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A Types                                                    │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐   Debounce    ┌───────────────────────────┐│
│  │ onChangeText    │──(2 sec)────► │ socket.emit('typing',     ││
│  │ callback        │               │   { conversationId,       ││
│  └─────────────────┘               │     isTyping: true })     ││
│                                    └────────────┬──────────────┘│
│                                                 │                │
│                                                 ▼                │
│                                    ┌───────────────────────────┐│
│                                    │    Server (Redis PubSub)  ││
│                                    │    Broadcast to room      ││
│                                    └────────────┬──────────────┘│
│                                                 │                │
│         ┌───────────────────────────────────────┘                │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────┐                                            │
│  │ User B Client   │                                            │
│  │ receives event  │                                            │
│  └────────┬────────┘                                            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐    3 sec timeout   ┌─────────────────────┐│
│  │ Show "A is      │───────────────────►│ Clear indicator     ││
│  │ typing..."      │                    │ (no update received)││
│  └─────────────────┘                    └─────────────────────┘│
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>WebSocket Client</td><td>socket.io-client</td><td>Auto-reconnection, room support, fallback</td></tr>
                <tr><td>Alternative WS</td><td>react-native-websocket</td><td>Lightweight, no polling fallback</td></tr>
                <tr><td>App State</td><td>@react-native-community/appstate</td><td>Background/foreground detection</td></tr>
                <tr><td>Network Info</td><td>@react-native-community/netinfo</td><td>Connectivity status</td></tr>
                <tr><td>State Management</td><td>Zustand</td><td>Simple store for presence/typing state</td></tr>
                <tr><td>Background (iOS)</td><td>PushKit</td><td>VoIP push for instant wake</td></tr>
                <tr><td>Background (Android)</td><td>Foreground Service</td><td>Maintain socket in background</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Typing timeout:</strong> Clear indicator after 3s if no update received</li>
                <li><strong>Multiple typers:</strong> Show "A, B, and C are typing..." with overflow handling</li>
                <li><strong>Socket disconnect:</strong> Queue events, reconnect with exponential backoff</li>
                <li><strong>Read receipt batching:</strong> Combine multiple receipts to reduce traffic</li>
                <li><strong>Presence flapping:</strong> Debounce rapid online/offline transitions</li>
                <li><strong>Privacy settings:</strong> Honor user preferences for hiding read receipts/presence</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>WebSocket vs HTTP polling:</strong> WS for real-time; long-polling as fallback</li>
                <li><strong>Sticky sessions:</strong> Required for socket.io; ALB with sticky cookies</li>
                <li><strong>Horizontal scaling:</strong> Redis Pub/Sub to broadcast across server instances</li>
                <li><strong>Battery optimization:</strong> Batch updates, reduce heartbeat frequency in background</li>
                <li><strong>Typing debounce:</strong> 2s prevents flooding; 3s timeout clears stale indicators</li>
                <li><strong>Read receipt privacy:</strong> Some users disable; respect preferences server-side</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Real-time bid updates visible to all participants within 100ms</li>
                <li>Precise countdown timer synchronized across devices</li>
                <li>Anti-snipe protection (extend auction on last-second bids)</li>
                <li>Bid history with user identification</li>
                <li>Automatic winner notification and payment processing</li>
                <li>Support for reserve prices and buy-now options</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Handle 10,000+ concurrent bidders per auction</li>
                <li>Bid processing latency &lt;50ms server-side</li>
                <li>Zero double-bid or race condition issues</li>
                <li>Graceful degradation during network issues</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌────────────────────────────────────────────────────────────────┐
│                   LIVE AUCTION ARCHITECTURE                     │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Mobile Client                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │ Auction UI  │  │ State Mgmt  │  │ WebSocket Client│  │   │
│  │  │ (Animated)  │  │  (XState)   │  │  (socket.io)    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │ WSS                               │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                    API Gateway                           │   │
│  │           (Load Balanced WebSocket Cluster)              │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│  ┌─────────────┬────────────┴────────────┬─────────────────┐   │
│  │             │                         │                 │   │
│  │  ┌──────────▼──────────┐  ┌──────────▼──────────┐      │   │
│  │  │   Bid Processor     │  │   Auction Manager   │      │   │
│  │  │  (High Priority)    │  │   (Timer/State)     │      │   │
│  │  └──────────┬──────────┘  └──────────┬──────────┘      │   │
│  │             │                         │                 │   │
│  │  ┌──────────▼─────────────────────────▼──────────┐     │   │
│  │  │              Redis Cluster                     │     │   │
│  │  │   • Distributed Locks  • Pub/Sub  • Leaderboard│    │   │
│  │  └──────────┬─────────────────────────────────────┘     │   │
│  │             │                                           │   │
│  │  ┌──────────▼──────────┐  ┌─────────────────────┐      │   │
│  │  │   PostgreSQL        │  │   Notification Svc  │      │   │
│  │  │  (Bid History)      │  │   (Push/SMS/Email)  │      │   │
│  │  └─────────────────────┘  └─────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/auction.ts
interface Auction {
    id: string;
    itemId: string;
    title: string;
    description: string;
    imageUrls: string[];
    startingPrice: number;
    currentBid: number;
    reservePrice?: number;
    buyNowPrice?: number;
    highestBidderId: string | null;
    startTime: number;
    endTime: number;
    status: 'scheduled' | 'active' | 'ended' | 'cancelled';
    bidHistory: Bid[];
    bidCount: number;
    watcherCount: number;
}

interface Bid {
    id: string;
    auctionId: string;
    userId: string;
    username: string;
    amount: number;
    timestamp: number;
    serverTimestamp: number;
    status: 'pending' | 'accepted' | 'outbid' | 'rejected';
}

interface AuctionUpdate {
    type: 'NEW_BID' | 'TIME_EXTENDED' | 'AUCTION_ENDED' | 'OUTBID' | 'WATCHLIST_UPDATE';
    auctionId: string;
    payload: Partial&lt;Auction&gt; | Bid;
    serverTime: number;
}

// Auction State Machine with XState
import { createMachine, assign } from 'xstate';

interface AuctionContext {
    auction: Auction | null;
    myBid: Bid | null;
    optimisticBid: Bid | null;
    error: string | null;
    serverTimeDelta: number;
}

type AuctionEvent =
    | { type: 'LOAD'; auctionId: string }
    | { type: 'BID_PLACED'; bid: Bid }
    | { type: 'BID_ACCEPTED'; bid: Bid }
    | { type: 'BID_REJECTED'; reason: string }
    | { type: 'OUTBID'; newBid: Bid }
    | { type: 'TIME_EXTENDED'; newEndTime: number }
    | { type: 'AUCTION_ENDED'; winner: string };

const auctionMachine = createMachine&lt;AuctionContext, AuctionEvent&gt;({
    id: 'auction',
    initial: 'loading',
    context: {
        auction: null,
        myBid: null,
        optimisticBid: null,
        error: null,
        serverTimeDelta: 0,
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
            invoke: { src: 'syncServerTime', onDone: { actions: 'setTimeDelta' } },
            always: { target: 'active', cond: 'isAuctionActive' },
        },
        active: {
            on: {
                BID_PLACED: { actions: ['setOptimisticBid', 'hapticFeedback'] },
                BID_ACCEPTED: { actions: ['confirmBid', 'successHaptic'] },
                BID_REJECTED: { actions: ['revertOptimistic', 'errorHaptic', 'setError'] },
                OUTBID: { actions: ['updateAuction', 'outbidNotification'] },
                TIME_EXTENDED: { actions: ['extendTime', 'hapticFeedback'] },
                AUCTION_ENDED: 'ended',
            },
            invoke: { src: 'countdownTimer' },
        },
        ended: {
            type: 'final',
            entry: ['determineWinner', 'notifyResult'],
        },
        error: {
            on: { RETRY: 'loading' },
        },
    },
});</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS - High-Precision Timer & Haptics:</strong></p>
            <pre><code>// ios/AuctionTimerModule.swift
import Foundation
import UIKit

@objc(AuctionTimerModule)
class AuctionTimerModule: NSObject {
    private var displayLink: CADisplayLink?
    private var endTime: TimeInterval = 0
    private var callback: RCTResponseSenderBlock?

    @objc func startPrecisionTimer(
        _ endTimeMs: Double,
        callback: @escaping RCTResponseSenderBlock
    ) {
        self.endTime = endTimeMs / 1000.0
        self.callback = callback

        DispatchQueue.main.async {
            self.displayLink = CADisplayLink(
                target: self,
                selector: #selector(self.tick)
            )
            self.displayLink?.preferredFrameRateRange = CAFrameRateRange(
                minimum: 60,
                maximum: 120,
                preferred: 120
            )
            self.displayLink?.add(to: .main, forMode: .common)
        }
    }

    @objc private func tick() {
        let remaining = endTime - Date().timeIntervalSince1970

        if remaining &lt;= 0 {
            displayLink?.invalidate()
            callback?(["ended", 0])
        } else {
            callback?(["tick", Int(remaining * 1000)])
        }
    }

    @objc func triggerBidHaptic(_ intensity: String) {
        let generator: UIFeedbackGenerator

        switch intensity {
        case "success":
            generator = UINotificationFeedbackGenerator()
            (generator as! UINotificationFeedbackGenerator).notificationOccurred(.success)
        case "outbid":
            generator = UINotificationFeedbackGenerator()
            (generator as! UINotificationFeedbackGenerator).notificationOccurred(.warning)
        case "urgent":
            generator = UIImpactFeedbackGenerator(style: .heavy)
            (generator as! UIImpactFeedbackGenerator).impactOccurred()
        default:
            generator = UIImpactFeedbackGenerator(style: .medium)
            (generator as! UIImpactFeedbackGenerator).impactOccurred()
        }
    }
}</code></pre>

            <p><strong>Android - Choreographer Timer & Haptics:</strong></p>
            <pre><code>// android/AuctionTimerModule.kt
package com.app.auction

import android.os.Build
import android.view.Choreographer
import android.view.HapticFeedbackConstants
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class AuctionTimerModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private var endTimeMs: Long = 0
    private var isRunning = false
    private val choreographer = Choreographer.getInstance()

    private val frameCallback = object : Choreographer.FrameCallback {
        override fun doFrame(frameTimeNanos: Long) {
            if (!isRunning) return

            val remaining = endTimeMs - System.currentTimeMillis()

            if (remaining &lt;= 0) {
                sendEvent("auctionTick", Arguments.createMap().apply {
                    putString("status", "ended")
                    putInt("remaining", 0)
                })
                isRunning = false
            } else {
                sendEvent("auctionTick", Arguments.createMap().apply {
                    putString("status", "tick")
                    putInt("remaining", remaining.toInt())
                })
                choreographer.postFrameCallback(this)
            }
        }
    }

    @ReactMethod
    fun startPrecisionTimer(endTime: Double) {
        endTimeMs = endTime.toLong()
        isRunning = true
        choreographer.postFrameCallback(frameCallback)
    }

    @ReactMethod
    fun triggerBidHaptic(intensity: String) {
        currentActivity?.window?.decorView?.let { view -&gt;
            val feedbackConstant = when (intensity) {
                "success" -&gt; HapticFeedbackConstants.CONFIRM
                "outbid" -&gt; HapticFeedbackConstants.REJECT
                "urgent" -&gt; if (Build.VERSION.SDK_INT &gt;= 30)
                    HapticFeedbackConstants.GESTURE_END else
                    HapticFeedbackConstants.LONG_PRESS
                else -&gt; HapticFeedbackConstants.CONTEXT_CLICK
            }
            view.performHapticFeedback(feedbackConstant)
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}</code></pre>

            <h4>5. Bid Processing & Validation</h4>
            <pre><code>// server/bidProcessor.ts
import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

class BidProcessor {
    private redis: Redis.Cluster;
    private readonly LOCK_TTL = 5000; // 5 seconds

    async placeBid(
        auctionId: string,
        userId: string,
        amount: number,
        clientTimestamp: number
    ): Promise&lt;BidResult&gt; {
        const lockKey = \`lock:auction:\${auctionId}\`;
        const lockValue = uuid();

        // Acquire distributed lock
        const acquired = await this.redis.set(
            lockKey, lockValue, 'PX', this.LOCK_TTL, 'NX'
        );

        if (!acquired) {
            return {
                accepted: false,
                reason: 'Auction busy, please retry',
                retryAfter: 100
            };
        }

        try {
            const auction = await this.getAuction(auctionId);
            const serverTime = Date.now();

            // Validation checks
            if (auction.status !== 'active') {
                return { accepted: false, reason: 'Auction has ended' };
            }

            if (serverTime &gt; auction.endTime) {
                await this.endAuction(auctionId);
                return { accepted: false, reason: 'Auction has ended' };
            }

            if (amount &lt;= auction.currentBid) {
                return {
                    accepted: false,
                    reason: 'Bid must exceed current bid',
                    currentBid: auction.currentBid
                };
            }

            const minIncrement = this.calculateMinIncrement(auction.currentBid);
            if (amount &lt; auction.currentBid + minIncrement) {
                return {
                    accepted: false,
                    reason: \`Minimum increment: $\${minIncrement}\`,
                    requiredBid: auction.currentBid + minIncrement
                };
            }

            // Check user bidding limits
            if (await this.hasExceededBidLimit(userId, auctionId)) {
                return { accepted: false, reason: 'Bid rate limit exceeded' };
            }

            // Create bid record
            const bid: Bid = {
                id: uuid(),
                auctionId,
                userId,
                amount,
                timestamp: clientTimestamp,
                serverTimestamp: serverTime,
                status: 'accepted',
            };

            // Atomic update with Lua script
            await this.redis.eval(
                BID_UPDATE_SCRIPT,
                2,
                \`auction:\${auctionId}\`,
                \`bids:\${auctionId}\`,
                JSON.stringify(bid),
                amount.toString(),
                userId
            );

            // Anti-snipe extension
            const timeRemaining = auction.endTime - serverTime;
            if (timeRemaining &lt; 30000) {
                const newEndTime = serverTime + 30000;
                await this.extendAuction(auctionId, newEndTime);
                await this.broadcast(auctionId, {
                    type: 'TIME_EXTENDED',
                    newEndTime,
                });
            }

            // Notify previous high bidder
            if (auction.highestBidderId &amp;&amp; auction.highestBidderId !== userId) {
                await this.notifyOutbid(auction.highestBidderId, auctionId, amount);
            }

            // Broadcast to all watchers
            await this.broadcast(auctionId, {
                type: 'NEW_BID',
                bid,
                serverTime,
            });

            return {
                accepted: true,
                bid,
                newEndTime: auction.endTime,
            };
        } finally {
            // Release lock only if we own it
            await this.redis.eval(
                RELEASE_LOCK_SCRIPT,
                1,
                lockKey,
                lockValue
            );
        }
    }

    private calculateMinIncrement(currentBid: number): number {
        if (currentBid &lt; 100) return 5;
        if (currentBid &lt; 500) return 10;
        if (currentBid &lt; 1000) return 25;
        if (currentBid &lt; 5000) return 50;
        return 100;
    }
}

// Lua script for atomic bid update
const BID_UPDATE_SCRIPT = \`
local auctionKey = KEYS[1]
local bidsKey = KEYS[2]
local bidJson = ARGV[1]
local amount = tonumber(ARGV[2])
local userId = ARGV[3]

local currentBid = tonumber(redis.call('HGET', auctionKey, 'currentBid') or 0)

if amount &gt; currentBid then
    redis.call('HSET', auctionKey, 'currentBid', amount)
    redis.call('HSET', auctionKey, 'highestBidderId', userId)
    redis.call('HINCRBY', auctionKey, 'bidCount', 1)
    redis.call('LPUSH', bidsKey, bidJson)
    redis.call('LTRIM', bidsKey, 0, 99)
    return 1
end
return 0
\`;</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                      BID PLACEMENT FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Taps Bid          Optimistic UI           Server Process   │
│       │                      │                       │           │
│       ▼                      │                       │           │
│  ┌─────────┐                 │                       │           │
│  │ Validate│ ─── Invalid ──► Error Message          │           │
│  │ Locally │                 │                       │           │
│  └────┬────┘                 │                       │           │
│       │ Valid                │                       │           │
│       ▼                      ▼                       │           │
│  ┌─────────┐          ┌─────────────┐               │           │
│  │ Disable │          │ Show Pending│               │           │
│  │  Button │          │   Bid UI    │               │           │
│  └────┬────┘          └──────┬──────┘               │           │
│       │                      │                       │           │
│       └──────────────────────┼───► WebSocket ───────►│           │
│                              │                       │           │
│                              │          ┌────────────▼──────┐    │
│                              │          │ Acquire Lock      │    │
│                              │          │ Validate Bid      │    │
│                              │          │ Update Redis      │    │
│                              │          │ Release Lock      │    │
│                              │          └────────────┬──────┘    │
│                              │                       │           │
│       ◄───────── Accepted ───┼─────── Broadcast ─────┤           │
│       │                      │                       │           │
│       ▼                      ▼                       │           │
│  ┌─────────┐          ┌─────────────┐               │           │
│  │ Success │          │ Confirm Bid │               │           │
│  │ Haptic  │          │  Update UI  │               │           │
│  └─────────┘          └─────────────┘               │           │
│                                                                  │
│       ◄───────── Rejected ──┼─────── Response ──────┤           │
│       │                      │                       │           │
│       ▼                      ▼                       │           │
│  ┌─────────┐          ┌─────────────┐               │           │
│  │ Error   │          │Revert Optim.│               │           │
│  │ Haptic  │          │ Show Error  │               │           │
│  └─────────┘          └─────────────┘               │           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>State Machine</td><td>XState</td><td>Complex auction states with visualizer</td></tr>
                <tr><td>WebSocket</td><td>socket.io-client</td><td>Auto-reconnect, room-based broadcasting</td></tr>
                <tr><td>Animations</td><td>react-native-reanimated</td><td>60fps bid animations on UI thread</td></tr>
                <tr><td>Server Cache</td><td>Redis Cluster</td><td>Distributed locks, pub/sub, sorted sets</td></tr>
                <tr><td>Haptics</td><td>expo-haptics + native</td><td>Cross-platform with native precision</td></tr>
                <tr><td>Time Sync</td><td>Custom NTP</td><td>Server time synchronization</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Race conditions:</strong> Two bids at exact same moment - distributed locks + atomic Lua scripts</li>
                <li><strong>Clock drift:</strong> Client/server time mismatch - sync on connect, use server time for all logic</li>
                <li><strong>Network partition:</strong> Client disconnects mid-bid - idempotent bid IDs, retry with same ID</li>
                <li><strong>Anti-snipe abuse:</strong> Rapid last-second bids - rate limit + max extension count</li>
                <li><strong>Stale UI:</strong> User sees old price - version vectors, reject stale bids client-side</li>
                <li><strong>Payment failure:</strong> Winner can't pay - automatic second-chance to runner-up</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Consistency vs availability:</strong> Why CP over AP for bidding (can't have two winners)</li>
                <li><strong>Optimistic UI tradeoffs:</strong> Better UX but complex rollback handling</li>
                <li><strong>Scaling WebSocket:</strong> Sticky sessions, Redis pub/sub for cross-server broadcasts</li>
                <li><strong>Fraud prevention:</strong> Shill bidding detection, velocity checks, device fingerprinting</li>
                <li><strong>Reserve price strategy:</strong> When to reveal, psychological impact</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Real-time drawing with pen, shapes, text, and eraser tools</li>
                <li>Multiple users drawing simultaneously with cursors visible</li>
                <li>Undo/redo that only affects the user's own changes</li>
                <li>Infinite canvas with pan and zoom</li>
                <li>Export to PNG/PDF and share functionality</li>
                <li>Offline drawing with sync on reconnect</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>60fps rendering regardless of element count</li>
                <li>Sub-100ms latency for remote cursor updates</li>
                <li>Support 50+ concurrent users per board</li>
                <li>Conflict-free merging of concurrent edits</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌────────────────────────────────────────────────────────────────┐
│              COLLABORATIVE WHITEBOARD ARCHITECTURE              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Mobile Client                         │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │  Skia Canvas │  │  CRDT Layer  │  │  Presence    │   │   │
│  │  │  (GPU Render)│  │  (Yjs Doc)   │  │  (Awareness) │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │ Gesture Hand.│  │ Element Store│  │ Undo Manager │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │ WebSocket                         │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                    y-websocket Server                    │   │
│  │           (Stateful CRDT Sync + Persistence)             │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│  ┌─────────────┬────────────┴────────────┬─────────────────┐   │
│  │             │                         │                 │   │
│  │  ┌──────────▼──────────┐  ┌──────────▼──────────┐      │   │
│  │  │   Redis             │  │   PostgreSQL        │      │   │
│  │  │  (Presence/Pub-Sub) │  │  (Board Metadata)   │      │   │
│  │  └─────────────────────┘  └─────────────────────┘      │   │
│  │             │                                           │   │
│  │  ┌──────────▼──────────┐  ┌─────────────────────┐      │   │
│  │  │   S3/R2             │  │   CDN               │      │   │
│  │  │  (Snapshots/Export) │  │  (Asset Delivery)   │      │   │
│  │  └─────────────────────┘  └─────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/whiteboard.ts
interface WhiteboardElement {
    id: string;
    type: 'path' | 'rect' | 'ellipse' | 'text' | 'image' | 'sticky';
    createdBy: string;
    createdAt: number;
    updatedAt: number;
    locked: boolean;
    zIndex: number;
}

interface PathElement extends WhiteboardElement {
    type: 'path';
    points: Point[];
    svgPath: string;
    color: string;
    strokeWidth: number;
    opacity: number;
}

interface ShapeElement extends WhiteboardElement {
    type: 'rect' | 'ellipse';
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
}

interface TextElement extends WhiteboardElement {
    type: 'text';
    x: number;
    y: number;
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}

interface Point {
    x: number;
    y: number;
    pressure?: number;
}

interface CursorState {
    userId: string;
    userName: string;
    color: string;
    x: number;
    y: number;
    tool: 'pen' | 'select' | 'shape' | 'eraser';
    isDrawing: boolean;
}

interface CanvasViewport {
    x: number;
    y: number;
    scale: number;
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS - Metal-Backed Skia Canvas:</strong></p>
            <pre><code>// ios/WhiteboardCanvasModule.swift
import MetalKit
import UIKit

@objc(WhiteboardCanvasModule)
class WhiteboardCanvasModule: NSObject {
    private var metalDevice: MTLDevice?
    private var displayLink: CADisplayLink?

    @objc func initializeCanvas(_ resolve: @escaping RCTPromiseResolveBlock,
                                  reject: @escaping RCTPromiseRejectBlock) {
        guard let device = MTLCreateSystemDefaultDevice() else {
            reject("METAL_ERROR", "Metal not available", nil)
            return
        }

        self.metalDevice = device

        // Enable ProMotion for 120fps on supported devices
        if #available(iOS 15.0, *) {
            displayLink = CADisplayLink(target: self, selector: #selector(render))
            displayLink?.preferredFrameRateRange = CAFrameRateRange(
                minimum: 60,
                maximum: 120,
                preferred: 120
            )
            displayLink?.add(to: .main, forMode: .common)
        }

        resolve(["maxFPS": 120, "metalSupported": true])
    }

    @objc func exportToPNG(_ elements: [[String: Any]],
                           viewport: [String: Double],
                           resolve: @escaping RCTPromiseResolveBlock,
                           reject: @escaping RCTPromiseRejectBlock) {
        // Render elements to off-screen buffer
        let renderer = UIGraphicsImageRenderer(
            size: CGSize(width: viewport["width"]!, height: viewport["height"]!)
        )

        let image = renderer.image { context in
            // Render each element to CGContext
            for element in elements {
                self.renderElement(element, to: context.cgContext)
            }
        }

        // Save to temp file
        let tempURL = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString + ".png")

        if let pngData = image.pngData() {
            try? pngData.write(to: tempURL)
            resolve(["path": tempURL.path])
        } else {
            reject("EXPORT_ERROR", "Failed to export PNG", nil)
        }
    }

    @objc private func render() {
        // CADisplayLink callback - signal Skia to redraw
        NotificationCenter.default.post(name: .skiaFrameReady, object: nil)
    }
}</code></pre>

            <p><strong>Android - Hardware Acceleration:</strong></p>
            <pre><code>// android/WhiteboardCanvasModule.kt
package com.app.whiteboard

import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Build
import android.view.Choreographer
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileOutputStream

class WhiteboardCanvasModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private var choreographerCallback: Choreographer.FrameCallback? = null
    private val choreographer = Choreographer.getInstance()

    @ReactMethod
    fun initializeCanvas(promise: Promise) {
        val info = Arguments.createMap().apply {
            putInt("maxFPS", if (Build.VERSION.SDK_INT &gt;= 30) 120 else 60)
            putBoolean("vulkanSupported", isVulkanSupported())
        }

        // Start frame callback for smooth rendering
        choreographerCallback = object : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                sendFrameEvent(frameTimeNanos)
                choreographer.postFrameCallback(this)
            }
        }
        choreographer.postFrameCallback(choreographerCallback!!)

        promise.resolve(info)
    }

    @ReactMethod
    fun exportToPNG(
        elements: ReadableArray,
        viewport: ReadableMap,
        promise: Promise
    ) {
        val width = viewport.getDouble("width").toInt()
        val height = viewport.getDouble("height").toInt()

        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        canvas.drawColor(android.graphics.Color.WHITE)

        // Render elements to bitmap
        for (i in 0 until elements.size()) {
            val element = elements.getMap(i)
            renderElement(element, canvas)
        }

        // Save to cache directory
        val file = File(reactContext.cacheDir, "${java.util.UUID.randomUUID()}.png")
        FileOutputStream(file).use { out -&gt;
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
        }

        promise.resolve(Arguments.createMap().apply {
            putString("path", file.absolutePath)
        })
    }

    private fun isVulkanSupported(): Boolean {
        return Build.VERSION.SDK_INT &gt;= 24 &amp;&amp;
               reactContext.packageManager.hasSystemFeature("android.hardware.vulkan.level")
    }
}</code></pre>

            <h4>5. CRDT Sync & Conflict Resolution</h4>
            <pre><code>// services/whiteboardSync.ts
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

class WhiteboardSyncService {
    private ydoc: Y.Doc;
    private provider: WebsocketProvider | null = null;
    private persistence: IndexeddbPersistence | null = null;
    private yElements: Y.Map&lt;WhiteboardElement&gt;;
    private awareness: Awareness;

    constructor(boardId: string) {
        this.ydoc = new Y.Doc();
        this.yElements = this.ydoc.getMap('elements');

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
    }

    addElement(element: Omit&lt;WhiteboardElement, 'id'&gt;): string {
        const id = generateNanoid();

        this.ydoc.transact(() =&gt; {
            this.yElements.set(id, {
                ...element,
                id,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
        }, this.ydoc.clientID);

        return id;
    }

    updateElement(id: string, updates: Partial&lt;WhiteboardElement&gt;) {
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

    // Incremental path updates for smooth drawing
    appendPathPoints(id: string, points: Point[]) {
        this.ydoc.transact(() =&gt; {
            const element = this.yElements.get(id) as PathElement;
            if (element &amp;&amp; element.type === 'path') {
                const newPoints = [...element.points, ...points];
                this.yElements.set(id, {
                    ...element,
                    points: newPoints,
                    svgPath: pointsToSVGPath(newPoints),
                    updatedAt: Date.now(),
                });
            }
        }, this.ydoc.clientID);
    }

    subscribeToChanges(callback: (elements: Map&lt;string, WhiteboardElement&gt;) =&gt; void) {
        this.yElements.observe((event) =&gt; {
            callback(new Map(this.yElements.entries()));
        });
    }

    // Cursor presence
    updateCursor(cursor: Partial&lt;CursorState&gt;) {
        this.awareness.setLocalStateField('cursor', {
            ...this.awareness.getLocalState()?.cursor,
            ...cursor,
            timestamp: Date.now(),
        });
    }

    subscribeToPresence(callback: (cursors: CursorState[]) =&gt; void) {
        this.awareness.on('change', () =&gt; {
            const cursors: CursorState[] = [];
            this.awareness.getStates().forEach((state, clientId) =&gt; {
                if (clientId !== this.ydoc.clientID &amp;&amp; state.cursor) {
                    cursors.push(state.cursor);
                }
            });
            callback(cursors);
        });
    }

    destroy() {
        this.provider?.disconnect();
        this.persistence?.destroy();
    }
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    DRAWING SYNC FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A Draws              CRDT Layer                 User B UI  │
│       │                        │                          │      │
│       ▼                        │                          │      │
│  ┌──────────┐                  │                          │      │
│  │ Gesture  │                  │                          │      │
│  │ Handler  │                  │                          │      │
│  └────┬─────┘                  │                          │      │
│       │ Points                 │                          │      │
│       ▼                        │                          │      │
│  ┌──────────┐                  │                          │      │
│  │ Local    │ ─── Render ────► Skia Canvas (60fps)       │      │
│  │ Path     │                  │                          │      │
│  └────┬─────┘                  │                          │      │
│       │ Batch (16ms)           │                          │      │
│       ▼                        ▼                          │      │
│  ┌──────────┐           ┌─────────────┐                   │      │
│  │ Y.Doc    │ ────────► │  WebSocket  │                   │      │
│  │ Transact │           │   Server    │                   │      │
│  └──────────┘           └──────┬──────┘                   │      │
│                                │ Broadcast                │      │
│                                ▼                          ▼      │
│                         ┌─────────────┐           ┌──────────┐   │
│                         │ Y.Doc Merge │ ────────► │ Observe  │   │
│                         │ (CRDT)      │           │ Callback │   │
│                         └─────────────┘           └────┬─────┘   │
│                                                        │         │
│                                                        ▼         │
│                                                   Render on      │
│                                                   User B Canvas  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>2D Rendering</td><td>@shopify/react-native-skia</td><td>GPU-accelerated, Metal/Vulkan backend</td></tr>
                <tr><td>CRDT</td><td>Yjs</td><td>Production-proven, excellent merge semantics</td></tr>
                <tr><td>Sync Server</td><td>y-websocket</td><td>Official Yjs server with persistence hooks</td></tr>
                <tr><td>Gestures</td><td>react-native-gesture-handler</td><td>Native thread gestures, multi-touch</td></tr>
                <tr><td>Offline Storage</td><td>y-indexeddb</td><td>Browser-compatible persistence for Yjs</td></tr>
                <tr><td>ID Generation</td><td>nanoid</td><td>Collision-free, URL-safe IDs</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Simultaneous selection:</strong> Two users select same element - show both selections, lock on edit</li>
                <li><strong>Large canvas export:</strong> Memory limits - tile-based rendering, progressive export</li>
                <li><strong>Network reconnect:</strong> Offline edits diverge - CRDT auto-merges, show conflict indicator</li>
                <li><strong>Undo across users:</strong> User A undoes while B edits same element - track origin, only undo own changes</li>
                <li><strong>Rapid drawing:</strong> Point flood during fast strokes - batch points, simplify paths with Ramer-Douglas-Peucker</li>
                <li><strong>Element z-index conflicts:</strong> Two users bring to front - LWW (Last Writer Wins) with timestamp</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>CRDT vs OT:</strong> Why CRDT (no central server required, offline-first) vs OT (simpler but server-dependent)</li>
                <li><strong>Rendering optimization:</strong> Spatial indexing (R-tree) for culling off-screen elements</li>
                <li><strong>Path simplification:</strong> Reduce point count without losing visual fidelity</li>
                <li><strong>Presence throttling:</strong> Cursor updates every 50ms max to reduce bandwidth</li>
                <li><strong>Snapshot strategy:</strong> Periodic snapshots + incremental updates for fast board loading</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Block ads, trackers, and malicious content across browsers and apps</li>
                <li>Customizable filter lists (EasyList, EasyPrivacy, custom rules)</li>
                <li>Whitelist specific sites or apps</li>
                <li>Statistics dashboard (blocked requests, bandwidth saved)</li>
                <li>Quick toggle to enable/disable blocking</li>
                <li>Auto-update filter lists in background</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Zero perceptible impact on browsing performance</li>
                <li>Minimal battery drain (&lt;2% additional)</li>
                <li>Support 100,000+ blocking rules efficiently</li>
                <li>Privacy-preserving (no data leaves device)</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
            <pre><code>┌────────────────────────────────────────────────────────────────┐
│                  CONTENT BLOCKER ARCHITECTURE                   │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   React Native App                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │ Rule Manager │  │ Statistics   │  │ Whitelist    │   │   │
│  │  │ UI           │  │ Dashboard    │  │ Manager      │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │ Native Bridge                     │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                    Shared App Group                      │   │
│  │           (Rules JSON, Statistics, Config)               │   │
│  └─────────────┬────────────────────────────┬──────────────┘   │
│                │                            │                   │
│  ┌─────────────▼────────────┐  ┌───────────▼───────────────┐   │
│  │        iOS               │  │        Android            │   │
│  │  ┌───────────────────┐   │  │  ┌─────────────────────┐  │   │
│  │  │ Safari Content    │   │  │  │ Local VPN Service   │  │   │
│  │  │ Blocker Extension │   │  │  │ (DNS Filtering)     │  │   │
│  │  └───────────────────┘   │  │  └─────────────────────┘  │   │
│  │  ┌───────────────────┐   │  │  ┌─────────────────────┐  │   │
│  │  │ Network Extension │   │  │  │ Accessibility Svc   │  │   │
│  │  │ (System-wide)     │   │  │  │ (WebView blocking)  │  │   │
│  │  └───────────────────┘   │  │  └─────────────────────┘  │   │
│  └──────────────────────────┘  └───────────────────────────┘   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/contentBlocker.ts
interface BlockingRule {
    id: string;
    trigger: RuleTrigger;
    action: RuleAction;
    priority: number;
    enabled: boolean;
}

interface RuleTrigger {
    urlFilter: string;
    urlFilterIsCaseSensitive?: boolean;
    resourceType?: ResourceType[];
    loadType?: ('first-party' | 'third-party')[];
    ifDomain?: string[];
    unlessDomain?: string[];
    ifTopUrl?: string[];
    unlessTopUrl?: string[];
}

type ResourceType =
    | 'document'
    | 'image'
    | 'style-sheet'
    | 'script'
    | 'font'
    | 'media'
    | 'popup'
    | 'websocket';

interface RuleAction {
    type: 'block' | 'block-cookies' | 'css-display-none' |
          'ignore-previous-rules' | 'make-https';
    selector?: string; // For css-display-none
}

interface FilterList {
    id: string;
    name: string;
    url: string;
    homepage: string;
    enabled: boolean;
    lastUpdated: number;
    ruleCount: number;
    checksum: string;
}

interface BlockingStatistics {
    totalBlocked: number;
    blockedByCategory: Record&lt;string, number&gt;;
    bandwidthSaved: number; // bytes
    dailyStats: DailyStat[];
}

interface DailyStat {
    date: string;
    blocked: number;
    allowed: number;
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS - Safari Content Blocker Extension:</strong></p>
            <pre><code>// ios/ContentBlockerExtension/ContentBlockerRequestHandler.swift
import Foundation
import MobileCoreServices

class ContentBlockerRequestHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        // Load compiled rules from shared app group
        let sharedContainer = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.com.app.blocker"
        )

        let rulesURL = sharedContainer?.appendingPathComponent("blockerRules.json")

        guard let rulesURL = rulesURL,
              let rulesData = try? Data(contentsOf: rulesURL) else {
            // Return empty rules if file doesn't exist
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

// ios/ContentBlockerModule.swift - Native module
import SafariServices

@objc(ContentBlockerModule)
class ContentBlockerModule: NSObject {
    private let sharedDefaults = UserDefaults(suiteName: "group.com.app.blocker")
    private let extensionIdentifier = "com.app.blocker.contentblocker"

    @objc func compileAndUpdateRules(
        _ rules: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        // Validate JSON structure
        guard let rulesData = rules.data(using: .utf8),
              let _ = try? JSONSerialization.jsonObject(with: rulesData) else {
            reject("INVALID_RULES", "Invalid JSON format", nil)
            return
        }

        // Write to shared container
        let sharedContainer = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.com.app.blocker"
        )

        guard let rulesURL = sharedContainer?.appendingPathComponent("blockerRules.json") else {
            reject("CONTAINER_ERROR", "Cannot access shared container", nil)
            return
        }

        do {
            try rulesData.write(to: rulesURL)

            // Tell Safari to reload the extension
            SFContentBlockerManager.reloadContentBlocker(
                withIdentifier: extensionIdentifier
            ) { error in
                if let error = error {
                    reject("RELOAD_ERROR", error.localizedDescription, error)
                } else {
                    // Track statistics
                    self.incrementRuleUpdateCount()
                    resolve(["success": true, "ruleCount": self.countRules(rulesData)])
                }
            }
        } catch {
            reject("WRITE_ERROR", error.localizedDescription, error)
        }
    }

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

    @objc func openSettings() {
        if let url = URL(string: UIApplication.openSettingsURLString) {
            DispatchQueue.main.async {
                UIApplication.shared.open(url)
            }
        }
    }
}</code></pre>

            <p><strong>Android - Local VPN DNS Filtering:</strong></p>
            <pre><code>// android/app/src/main/java/com/app/blocker/DnsBlockerService.kt
package com.app.blocker

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Intent
import android.net.VpnService
import android.os.ParcelFileDescriptor
import java.io.FileInputStream
import java.io.FileOutputStream
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress
import java.nio.ByteBuffer

class DnsBlockerService : VpnService() {
    private var vpnInterface: ParcelFileDescriptor? = null
    private var isRunning = false

    private lateinit var blockedDomains: HashSet&lt;String&gt;
    private lateinit var domainTrie: DomainTrie // Efficient domain matching

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

        // Load block list into trie for O(n) lookup where n = domain length
        loadBlockList()

        // Build VPN interface
        val builder = Builder()
            .setSession("ContentBlocker")
            .addAddress(VPN_ADDRESS, 32)
            .addDnsServer(VPN_DNS)
            .addRoute(VPN_DNS, 32) // Only route DNS through VPN
            .setMtu(1500)
            .setBlocking(true)

        // Exclude certain apps from VPN (optional)
        excludedApps.forEach { packageName -&gt;
            try { builder.addDisallowedApplication(packageName) }
            catch (_: Exception) {}
        }

        vpnInterface = builder.establish()

        isRunning = true
        startForeground(1, createNotification())

        // Start packet handling threads
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

            packet.limit(length)

            // Parse IP header to extract DNS query
            val dnsQuery = parseDnsQuery(packet)
            if (dnsQuery == null) continue

            val domain = dnsQuery.questionDomain

            if (shouldBlock(domain)) {
                // Send NXDOMAIN response
                val blockedResponse = createNxdomainResponse(dnsQuery)
                outputStream.write(blockedResponse)
                recordBlockedRequest(domain)
            } else {
                // Forward to upstream DNS
                val response = forwardDnsQuery(upstreamSocket, dnsQuery)
                outputStream.write(wrapInIpPacket(response))
            }
        }
    }

    private fun shouldBlock(domain: String): Boolean {
        // Check exact match and all parent domains
        return domainTrie.contains(domain) ||
               blockedDomains.contains(domain)
    }

    private fun loadBlockList() {
        val prefs = getSharedPreferences("blocker", MODE_PRIVATE)
        val rulesJson = prefs.getString("rules", "[]")

        blockedDomains = HashSet()
        domainTrie = DomainTrie()

        // Parse and index domains
        JSONArray(rulesJson).let { rules -&gt;
            for (i in 0 until rules.length()) {
                val rule = rules.getJSONObject(i)
                val urlFilter = rule.getJSONObject("trigger")
                    .getString("url-filter")

                // Extract domain from url-filter pattern
                extractDomain(urlFilter)?.let { domain -&gt;
                    blockedDomains.add(domain)
                    domainTrie.insert(domain)
                }
            }
        }
    }
}

// Efficient domain matching with Trie
class DomainTrie {
    private val root = TrieNode()

    fun insert(domain: String) {
        var node = root
        // Insert reversed domain for suffix matching
        domain.split(".").reversed().forEach { part -&gt;
            node = node.children.getOrPut(part) { TrieNode() }
        }
        node.isEnd = true
    }

    fun contains(domain: String): Boolean {
        var node = root
        val parts = domain.split(".").reversed()

        for (part in parts) {
            node = node.children[part] ?: return false
            if (node.isEnd) return true // Wildcard match
        }
        return node.isEnd
    }
}</code></pre>

            <h4>5. Rule Compilation & Optimization</h4>
            <pre><code>// services/RuleCompiler.ts
import { Platform } from 'react-native';

interface CompiledRuleSet {
    ios: string; // Safari Content Blocker JSON
    android: string; // Domain list for DNS filtering
    statistics: {
        totalRules: number;
        byCategory: Record&lt;string, number&gt;;
    };
}

class RuleCompiler {
    // iOS has 50,000 rule limit per extension
    private readonly IOS_RULE_LIMIT = 50000;

    async compileRules(filterLists: FilterList[]): Promise&lt;CompiledRuleSet&gt; {
        const enabledLists = filterLists.filter(l =&gt; l.enabled);
        const allRules: BlockingRule[] = [];

        for (const list of enabledLists) {
            const rules = await this.fetchAndParse(list);
            allRules.push(...rules);
        }

        // Deduplicate and prioritize rules
        const deduped = this.deduplicateRules(allRules);
        const prioritized = this.prioritizeRules(deduped);

        // Platform-specific compilation
        const iosRules = this.compileForIOS(prioritized.slice(0, this.IOS_RULE_LIMIT));
        const androidRules = this.compileForAndroid(prioritized);

        return {
            ios: JSON.stringify(iosRules),
            android: JSON.stringify(androidRules),
            statistics: {
                totalRules: prioritized.length,
                byCategory: this.categorizeRules(prioritized),
            },
        };
    }

    private compileForIOS(rules: BlockingRule[]): object[] {
        return rules.map(rule =&gt; ({
            trigger: {
                'url-filter': rule.trigger.urlFilter,
                'url-filter-is-case-sensitive': rule.trigger.urlFilterIsCaseSensitive,
                'resource-type': rule.trigger.resourceType,
                'load-type': rule.trigger.loadType,
                'if-domain': rule.trigger.ifDomain,
                'unless-domain': rule.trigger.unlessDomain,
            },
            action: {
                type: rule.action.type,
                selector: rule.action.selector,
            },
        }));
    }

    private compileForAndroid(rules: BlockingRule[]): object {
        // Extract domains for DNS-level blocking
        const domains = new Set&lt;string&gt;();

        rules.forEach(rule =&gt; {
            const domain = this.extractDomainFromFilter(rule.trigger.urlFilter);
            if (domain) domains.add(domain);
        });

        return {
            blockedDomains: Array.from(domains),
            cssRules: rules.filter(r =&gt; r.action.type === 'css-display-none'),
        };
    }

    private prioritizeRules(rules: BlockingRule[]): BlockingRule[] {
        // Sort by specificity and priority
        return rules.sort((a, b) =&gt; {
            // Whitelist rules (ignore-previous-rules) go last
            if (a.action.type === 'ignore-previous-rules') return 1;
            if (b.action.type === 'ignore-previous-rules') return -1;

            // More specific rules first
            const aSpecificity = this.calculateSpecificity(a);
            const bSpecificity = this.calculateSpecificity(b);

            return bSpecificity - aSpecificity;
        });
    }
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                     RULE UPDATE FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Filter List URLs          Background Task         Native Layer  │
│       │                          │                      │        │
│       ▼                          │                      │        │
│  ┌──────────┐                    │                      │        │
│  │ Fetch    │                    │                      │        │
│  │ Lists    │                    │                      │        │
│  └────┬─────┘                    │                      │        │
│       │ Raw text                 │                      │        │
│       ▼                          │                      │        │
│  ┌──────────┐                    │                      │        │
│  │ Parse    │ ─── Stats ───────► Update UI            │        │
│  │ Rules    │                    │                      │        │
│  └────┬─────┘                    │                      │        │
│       │ BlockingRule[]           │                      │        │
│       ▼                          │                      │        │
│  ┌──────────┐                    │                      │        │
│  │ Compile  │                    │                      │        │
│  │ Per-Plat │                    │                      │        │
│  └────┬─────┘                    │                      │        │
│       │                          │                      │        │
│       ├───── iOS JSON ──────────────────────────────────►│       │
│       │                          │               Safari Extension │
│       │                          │               reloadContentBlocker
│       │                          │                      │        │
│       └───── Android ───────────────────────────────────►│       │
│                                  │               VPN Service     │
│                                  │               loadBlockList()  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Background Tasks</td><td>react-native-background-fetch</td><td>Periodic filter list updates</td></tr>
                <tr><td>Storage</td><td>react-native-mmkv</td><td>Fast rule storage and retrieval</td></tr>
                <tr><td>HTTP Client</td><td>axios + axios-cache-interceptor</td><td>Cached filter list fetching</td></tr>
                <tr><td>Rule Parsing</td><td>adblock-rs (via native)</td><td>Industry-standard filter syntax</td></tr>
                <tr><td>Statistics</td><td>Zustand</td><td>Reactive stats dashboard</td></tr>
                <tr><td>Native Bridge</td><td>Turbo Modules</td><td>Fast synchronous rule updates</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>iOS extension not enabled:</strong> Detect via getStateOfContentBlocker, show setup guide</li>
                <li><strong>Android VPN permission denied:</strong> Fall back to WebView-only blocking via Accessibility Service</li>
                <li><strong>Rule limit exceeded:</strong> Prioritize and truncate, show warning to user</li>
                <li><strong>Corrupt filter list:</strong> Validate checksum, rollback to cached version</li>
                <li><strong>Site breakage:</strong> Quick whitelist button on blocked content notice</li>
                <li><strong>Battery optimization kills VPN:</strong> Guide user to exempt app from battery optimization</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>iOS vs Android approaches:</strong> Why Safari uses declarative rules vs Android needs runtime filtering</li>
                <li><strong>Privacy implications:</strong> Local VPN sees all DNS - how to ensure user trust</li>
                <li><strong>Performance at scale:</strong> Trie-based domain matching vs regex, memory vs speed tradeoffs</li>
                <li><strong>Filter list formats:</strong> AdBlock Plus syntax, uBlock Origin static filters, hosts files</li>
                <li><strong>Cosmetic filtering:</strong> CSS injection to hide elements vs network-level blocking</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Real-time camera preview with filter effects at 60fps</li>
                <li>20+ customizable filters (color grading, beauty, artistic)</li>
                <li>Photo and video capture with filters applied</li>
                <li>Face detection for targeted beauty filters</li>
                <li>Filter intensity adjustment via slider</li>
                <li>AR effects (face masks, backgrounds)</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Zero perceptible lag between viewfinder and real scene</li>
                <li>Capture latency &lt;200ms from tap to saved image</li>
                <li>Battery drain comparable to native camera apps</li>
                <li>Support devices from iPhone 8/Android API 24+</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
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
│  ┌─────────────┬────────────┴────────────┬─────────────────┐   │
│  │             │                         │                 │   │
│  │  ┌──────────▼──────────┐  ┌──────────▼──────────┐      │   │
│  │  │   iOS               │  │   Android           │      │   │
│  │  │ AVFoundation        │  │ CameraX             │      │   │
│  │  │ Metal Shaders       │  │ OpenGL ES / Vulkan  │      │   │
│  │  │ Core Image          │  │ RenderScript        │      │   │
│  │  └─────────────────────┘  └─────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/camera.ts
interface Filter {
    id: string;
    name: string;
    type: 'color' | 'beauty' | 'artistic' | 'ar';
    thumbnailUri: string;
    intensity: number; // 0-1
    parameters: FilterParameters;
}

interface FilterParameters {
    // Color grading
    brightness?: number;
    contrast?: number;
    saturation?: number;
    temperature?: number;
    tint?: number;
    // LUT-based
    lutTexture?: string;
    // Beauty
    smoothing?: number;
    whitening?: number;
    eyeEnlarge?: number;
    faceSlim?: number;
}

interface CaptureResult {
    uri: string;
    width: number;
    height: number;
    metadata: {
        filter: string;
        timestamp: number;
        location?: { lat: number; lng: number };
    };
}

type CameraPosition = 'front' | 'back';
type FlashMode = 'off' | 'on' | 'auto';

// hooks/useCamera.ts
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';

function useCamera() {
    const [position, setPosition] = useState&lt;CameraPosition&gt;('back');
    const [flash, setFlash] = useState&lt;FlashMode&gt;('off');

    const device = useCameraDevice(position, {
        physicalDevices: [
            'ultra-wide-angle-camera',
            'wide-angle-camera',
            'telephoto-camera',
        ],
    });

    // Select format that supports 60fps
    const format = useCameraFormat(device, [
        { fps: 60 },
        { videoResolution: { width: 1920, height: 1080 } },
        { photoResolution: { width: 4032, height: 3024 } },
    ]);

    const flipCamera = useCallback(() =&gt; {
        setPosition(p =&gt; p === 'back' ? 'front' : 'back');
    }, []);

    return { device, format, flash, setFlash, flipCamera, position };
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS - Metal Shader Pipeline:</strong></p>
            <pre><code>// ios/Filters/MetalFilterPipeline.swift
import Metal
import MetalKit
import AVFoundation

class MetalFilterPipeline {
    private let device: MTLDevice
    private let commandQueue: MTLCommandQueue
    private let textureCache: CVMetalTextureCache
    private var filterPipelines: [String: MTLComputePipelineState] = [:]

    init() throws {
        guard let device = MTLCreateSystemDefaultDevice() else {
            throw CameraError.metalNotSupported
        }
        self.device = device
        self.commandQueue = device.makeCommandQueue()!

        var cache: CVMetalTextureCache?
        CVMetalTextureCacheCreate(nil, nil, device, nil, &amp;cache)
        self.textureCache = cache!

        // Pre-compile filter shaders
        try loadFilterShaders()
    }

    private func loadFilterShaders() throws {
        let library = device.makeDefaultLibrary()!

        let filterNames = ["grayscale", "sepia", "vintage", "vivid", "beauty", "blur"]
        for name in filterNames {
            guard let function = library.makeFunction(name: "\(name)Filter") else {
                continue
            }
            filterPipelines[name] = try device.makeComputePipelineState(function: function)
        }
    }

    func applyFilter(
        _ filterName: String,
        to pixelBuffer: CVPixelBuffer,
        intensity: Float,
        parameters: [String: Any]
    ) {
        guard let pipeline = filterPipelines[filterName] else { return }

        // Create texture from pixel buffer
        let width = CVPixelBufferGetWidth(pixelBuffer)
        let height = CVPixelBufferGetHeight(pixelBuffer)

        var textureRef: CVMetalTexture?
        CVMetalTextureCacheCreateTextureFromImage(
            nil, textureCache, pixelBuffer, nil,
            .bgra8Unorm, width, height, 0, &amp;textureRef
        )

        guard let textureRef = textureRef,
              let texture = CVMetalTextureGetTexture(textureRef) else { return }

        // Execute compute shader
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
}

// Metal shader example - LUT-based color grading
/*
#include <metal_stdlib>
using namespace metal;

kernel void lutFilter(
    texture2d&lt;float, access::read_write&gt; image [[texture(0)]],
    texture3d&lt;float, access::sample&gt; lut [[texture(1)]],
    constant float &amp;intensity [[buffer(0)]],
    uint2 gid [[thread_position_in_grid]]
) {
    constexpr sampler s(coord::normalized, filter::linear);

    float4 color = image.read(gid);

    // Sample from 3D LUT
    float3 lutCoord = color.rgb * (64.0 - 1.0) / 64.0;
    float4 lutColor = lut.sample(s, lutCoord);

    // Blend based on intensity
    float4 result = mix(color, lutColor, intensity);
    result.a = 1.0;

    image.write(result, gid);
}
*/</code></pre>

            <p><strong>Android - OpenGL ES / GPUImage:</strong></p>
            <pre><code>// android/app/src/main/java/com/app/camera/FilterRenderer.kt
package com.app.camera

import android.graphics.SurfaceTexture
import android.opengl.GLES20
import android.opengl.GLSurfaceView
import android.opengl.Matrix
import javax.microedition.khronos.egl.EGLConfig
import javax.microedition.khronos.opengles.GL10

class FilterRenderer(
    private val surfaceTexture: SurfaceTexture
) : GLSurfaceView.Renderer {

    private var filterProgram: Int = 0
    private var currentFilter: String = "none"
    private var intensity: Float = 1.0f

    private val vertexShader = """
        attribute vec4 aPosition;
        attribute vec2 aTexCoord;
        varying vec2 vTexCoord;
        uniform mat4 uMVPMatrix;
        uniform mat4 uTexMatrix;

        void main() {
            gl_Position = uMVPMatrix * aPosition;
            vTexCoord = (uTexMatrix * vec4(aTexCoord, 0.0, 1.0)).xy;
        }
    """.trimIndent()

    private val sepiaFragmentShader = """
        #extension GL_OES_EGL_image_external : require
        precision mediump float;
        varying vec2 vTexCoord;
        uniform samplerExternalOES uTexture;
        uniform float uIntensity;

        void main() {
            vec4 color = texture2D(uTexture, vTexCoord);

            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            vec3 sepia = vec3(
                gray * 1.2,
                gray * 1.0,
                gray * 0.8
            );

            gl_FragColor = vec4(mix(color.rgb, sepia, uIntensity), color.a);
        }
    """.trimIndent()

    override fun onSurfaceCreated(gl: GL10?, config: EGLConfig?) {
        GLES20.glClearColor(0f, 0f, 0f, 1f)
        compileShaders()
    }

    override fun onDrawFrame(gl: GL10?) {
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT)

        surfaceTexture.updateTexImage()

        GLES20.glUseProgram(filterProgram)

        // Set uniforms
        val intensityLoc = GLES20.glGetUniformLocation(filterProgram, "uIntensity")
        GLES20.glUniform1f(intensityLoc, intensity)

        // Draw quad with texture
        drawTexturedQuad()
    }

    fun setFilter(filterName: String, filterIntensity: Float) {
        currentFilter = filterName
        intensity = filterIntensity
        // Recompile with appropriate fragment shader
        recompileShader(filterName)
    }
}

// Frame processor plugin for Vision Camera
class FilterFrameProcessor(
    private val reactContext: ReactApplicationContext
) : FrameProcessorPlugin() {

    private val gpuImage = GPUImage(reactContext)

    override fun callback(frame: Frame, params: Map&lt;String, Any&gt;?): Any? {
        val filterName = params?.get("filter") as? String ?: return null
        val intensity = (params["intensity"] as? Double)?.toFloat() ?: 1f

        // Convert frame to bitmap
        val bitmap = frameToBitmap(frame)

        // Apply GPUImage filter
        gpuImage.setFilter(getFilter(filterName, intensity))
        val filtered = gpuImage.getBitmapWithFilterApplied(bitmap)

        // Write back to frame
        bitmapToFrame(filtered, frame)

        return null
    }

    private fun getFilter(name: String, intensity: Float): GPUImageFilter {
        return when (name) {
            "grayscale" -&gt; GPUImageGrayscaleFilter()
            "sepia" -&gt; GPUImageSepiaToneFilter().apply { setIntensity(intensity) }
            "blur" -&gt; GPUImageGaussianBlurFilter().apply { setBlurSize(intensity * 2f) }
            "beauty" -&gt; GPUImageBilateralBlurFilter().apply { setDistanceNormalizationFactor(intensity * 8f) }
            else -&gt; GPUImageFilter()
        }
    }
}</code></pre>

            <h4>5. Filter Pipeline & LUT System</h4>
            <pre><code>// services/FilterManager.ts
import { MMKV } from 'react-native-mmkv';

class FilterManager {
    private storage = new MMKV();
    private loadedLUTs = new Map&lt;string, string&gt;();

    readonly builtInFilters: Filter[] = [
        {
            id: 'original',
            name: 'Original',
            type: 'color',
            thumbnailUri: 'asset://filters/original.png',
            intensity: 1,
            parameters: {},
        },
        {
            id: 'vivid',
            name: 'Vivid',
            type: 'color',
            thumbnailUri: 'asset://filters/vivid.png',
            intensity: 1,
            parameters: {
                saturation: 1.3,
                contrast: 1.1,
                brightness: 1.05,
            },
        },
        {
            id: 'vintage',
            name: 'Vintage',
            type: 'color',
            thumbnailUri: 'asset://filters/vintage.png',
            intensity: 1,
            parameters: {
                lutTexture: 'vintage_lut.png',
            },
        },
        {
            id: 'beauty',
            name: 'Beauty',
            type: 'beauty',
            thumbnailUri: 'asset://filters/beauty.png',
            intensity: 0.5,
            parameters: {
                smoothing: 0.5,
                whitening: 0.3,
            },
        },
    ];

    async loadLUT(filterId: string): Promise&lt;string&gt; {
        if (this.loadedLUTs.has(filterId)) {
            return this.loadedLUTs.get(filterId)!;
        }

        const filter = this.builtInFilters.find(f =&gt; f.id === filterId);
        if (!filter?.parameters.lutTexture) {
            throw new Error('No LUT for this filter');
        }

        // Load from assets and cache
        const lutPath = await this.extractLUTFromAssets(filter.parameters.lutTexture);
        this.loadedLUTs.set(filterId, lutPath);

        return lutPath;
    }

    getFilterConfig(filterId: string, intensity: number): FilterConfig {
        const filter = this.builtInFilters.find(f =&gt; f.id === filterId);
        if (!filter) return { type: 'none' };

        return {
            type: filter.type,
            parameters: {
                ...filter.parameters,
                intensity: intensity * filter.intensity,
            },
        };
    }
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                      FRAME PROCESSING FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Camera Sensor          Frame Processor          Display/Capture │
│       │                      │                        │          │
│       ▼                      │                        │          │
│  ┌──────────┐                │                        │          │
│  │ Raw      │                │                        │          │
│  │ Frame    │                │                        │          │
│  │ (YUV)    │                │                        │          │
│  └────┬─────┘                │                        │          │
│       │ 60fps                │                        │          │
│       ▼                      ▼                        │          │
│  ┌──────────┐         ┌─────────────┐                │          │
│  │ Convert  │ ──────► │ GPU Texture │                │          │
│  │ to BGRA  │         │ (CVMetal/GL)│                │          │
│  └──────────┘         └──────┬──────┘                │          │
│                              │                        │          │
│                              ▼                        │          │
│                       ┌─────────────┐                │          │
│                       │ Apply       │                │          │
│                       │ Shader/LUT  │                │          │
│                       └──────┬──────┘                │          │
│                              │                        │          │
│                   ┌──────────┼──────────┐            │          │
│                   │          │          │            │          │
│                   ▼          ▼          ▼            │          │
│            ┌──────────┐ ┌────────┐ ┌────────┐       │          │
│            │ Preview  │ │ Photo  │ │ Video  │       │          │
│            │ Surface  │ │ Capture│ │ Encoder│       │          │
│            └──────────┘ └────────┘ └────────┘       │          │
│                   │          │          │            │          │
│                   └──────────┴──────────┴───────────►│          │
│                                                      │          │
│                                              Output to User      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Camera</td><td>react-native-vision-camera</td><td>Frame processors, 60fps, photo/video</td></tr>
                <tr><td>GPU Processing</td><td>Metal (iOS) / GPUImage (Android)</td><td>Real-time shader execution</td></tr>
                <tr><td>Face Detection</td><td>ML Kit / Vision Framework</td><td>Real-time face landmarks</td></tr>
                <tr><td>Image Manipulation</td><td>expo-image-manipulator</td><td>Post-capture filter application</td></tr>
                <tr><td>Animations</td><td>react-native-reanimated</td><td>Worklet-compatible state sharing</td></tr>
                <tr><td>Media Library</td><td>@react-native-camera-roll</td><td>Save to camera roll</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Device overheating:</strong> Reduce FPS dynamically, disable compute-heavy filters</li>
                <li><strong>Low memory devices:</strong> Downscale preview resolution, lazy-load LUTs</li>
                <li><strong>Front camera mirroring:</strong> Flip preview but save un-mirrored for selfies</li>
                <li><strong>HDR capture:</strong> Apply filter to tone-mapped result, preserve original HDR</li>
                <li><strong>Filter switching lag:</strong> Pre-compile all shaders on app launch</li>
                <li><strong>Video with filters:</strong> Hardware encode filtered frames in real-time</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>LUT vs procedural filters:</strong> LUTs are faster but less flexible than computed effects</li>
                <li><strong>Texture memory management:</strong> Reusing CVMetalTextureCache, avoiding allocations per frame</li>
                <li><strong>Beauty filter challenges:</strong> Face detection latency, handling multiple faces, edge cases</li>
                <li><strong>Video encoding:</strong> Applying filters before hardware encoder, maintaining quality</li>
                <li><strong>AR filters:</strong> Face mesh rendering, anchor tracking, depth estimation</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Track user location in background continuously or periodically</li>
                <li>Support multiple accuracy modes (high/balanced/low power)</li>
                <li>Geofence monitoring for entry/exit of defined regions</li>
                <li>Batch upload locations when on WiFi/charging</li>
                <li>Resume tracking after device restart</li>
                <li>Activity recognition to adjust tracking mode</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Battery drain &lt;5% per hour in balanced mode</li>
                <li>Background tracking works for 24+ hours</li>
                <li>Survive app being killed by OS</li>
                <li>Comply with iOS/Android background restrictions</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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
│  │               Native Location Service                    │   │
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
│  └──────────────────────────┘  └───────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Local Storage (MMKV)                     │   │
│  │           Location Buffer + Pending Uploads              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/location.ts
interface LocationPoint {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    speed: number | null;
    heading: number | null;
    timestamp: number;
    activityType?: ActivityType;
    batteryLevel?: number;
}

type ActivityType = 'stationary' | 'walking' | 'running' | 'cycling' | 'driving' | 'unknown';

interface TrackingConfig {
    mode: TrackingMode;
    distanceFilter: number; // meters
    timeInterval: number; // ms
    activityType: ActivityType;
    deferredUpdates: boolean;
}

type TrackingMode = 'high' | 'balanced' | 'low' | 'significant' | 'geofence';

interface Geofence {
    id: string;
    latitude: number;
    longitude: number;
    radius: number;
    notifyOnEntry: boolean;
    notifyOnExit: boolean;
    notifyOnDwell: boolean;
    dwellTime?: number;
}

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
    },
    low: {
        mode: 'low',
        distanceFilter: 100,
        timeInterval: 60000,
        activityType: 'unknown',
        deferredUpdates: true,
    },
    significant: {
        mode: 'significant',
        distanceFilter: 500,
        timeInterval: 0, // Event-based
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

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS - CLLocationManager with Adaptive Modes:</strong></p>
            <pre><code>// ios/LocationModule.swift
import CoreLocation
import CoreMotion

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

    @objc func startTracking(_ mode: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard CLLocationManager.authorizationStatus() == .authorizedAlways else {
            reject("PERMISSION", "Always authorization required", nil)
            return
        }

        switch mode {
        case "high":
            startHighAccuracyTracking()
        case "balanced":
            startBalancedTracking()
        case "significant":
            startSignificantLocationMonitoring()
        case "geofence":
            // Geofences are set separately
            break
        default:
            startBalancedTracking()
        }

        // Start activity monitoring to adjust mode
        startActivityMonitoring()

        resolve(["started": true])
    }

    private func startHighAccuracyTracking() {
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.distanceFilter = 10
        locationManager.activityType = .automotiveNavigation
        locationManager.startUpdatingLocation()
    }

    private func startBalancedTracking() {
        locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters
        locationManager.distanceFilter = 50

        // Use deferred updates for battery efficiency
        if CLLocationManager.deferredLocationUpdatesAvailable() {
            locationManager.allowDeferredLocationUpdates(
                untilTraveled: 500,
                timeout: 300 // 5 minutes
            )
        }

        locationManager.startUpdatingLocation()
    }

    private func startSignificantLocationMonitoring() {
        // Most battery efficient - only major cell tower changes
        locationManager.startMonitoringSignificantLocationChanges()
    }

    // Visit monitoring for places
    func startVisitMonitoring() {
        if CLLocationManager.significantLocationChangeMonitoringAvailable() {
            locationManager.startMonitoringVisits()
        }
    }

    private func startActivityMonitoring() {
        guard CMMotionActivityManager.isActivityAvailable() else { return }

        motionManager.startActivityUpdates(to: .main) { [weak self] activity in
            guard let activity = activity else { return }

            if activity.automotive {
                self?.adjustToHighAccuracy()
            } else if activity.stationary {
                self?.adjustToGeofenceOnly()
            } else if activity.walking || activity.running {
                self?.adjustToBalanced()
            }
        }
    }

    @objc func addGeofence(_ config: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
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
        resolve(["added": true])
    }
}

extension LocationModule: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        // Filter stale/inaccurate locations
        let validLocations = locations.filter { location in
            let age = -location.timestamp.timeIntervalSinceNow
            return age &lt; 60 &amp;&amp; location.horizontalAccuracy &lt; 100
        }

        locationBuffer.append(contentsOf: validLocations)

        // Batch to reduce bridge calls
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

            <p><strong>Android - FusedLocationClient with Foreground Service:</strong></p>
            <pre><code>// android/LocationModule.kt
package com.app.location

import android.app.Notification
import android.app.Service
import android.content.Intent
import android.os.Looper
import com.google.android.gms.location.*

class LocationTrackingService : Service() {
    private lateinit var fusedClient: FusedLocationProviderClient
    private lateinit var geofencingClient: GeofencingClient
    private var currentRequest: LocationRequest? = null
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
        // Required for Android 8+ background location
        startForeground(NOTIFICATION_ID, createNotification(mode))

        val request = when (mode) {
            "high" -&gt; createHighAccuracyRequest()
            "balanced" -&gt; createBalancedRequest()
            "low" -&gt; createLowPowerRequest()
            else -&gt; createBalancedRequest()
        }

        currentRequest = request

        fusedClient.requestLocationUpdates(
            request,
            locationCallback,
            Looper.getMainLooper()
        )

        // Subscribe to activity recognition
        subscribeToActivityRecognition()
    }

    private fun createHighAccuracyRequest(): LocationRequest {
        return LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            5000 // 5 seconds
        ).apply {
            setMinUpdateDistanceMeters(10f)
            setGranularity(Granularity.GRANULARITY_FINE)
            setWaitForAccurateLocation(true)
        }.build()
    }

    private fun createBalancedRequest(): LocationRequest {
        return LocationRequest.Builder(
            Priority.PRIORITY_BALANCED_POWER_ACCURACY,
            30000 // 30 seconds
        ).apply {
            setMinUpdateDistanceMeters(50f)
            setMaxUpdates(Int.MAX_VALUE)
            // Enable batching for battery efficiency
            setMaxUpdateDelayMillis(120000) // 2 minute batches
        }.build()
    }

    private fun createLowPowerRequest(): LocationRequest {
        return LocationRequest.Builder(
            Priority.PRIORITY_LOW_POWER,
            60000 // 1 minute
        ).apply {
            setMinUpdateDistanceMeters(100f)
            setMaxUpdateDelayMillis(300000) // 5 minute batches
        }.build()
    }

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult) {
            result.locations.forEach { location -&gt;
                if (isValidLocation(location)) {
                    locationBuffer.add(location)
                }
            }

            // Send batch to JS
            if (locationBuffer.size &gt;= 5) {
                sendLocationsToReactNative(locationBuffer.toList())
                locationBuffer.clear()
            }
        }

        override fun onLocationAvailability(availability: LocationAvailability) {
            if (!availability.isLocationAvailable) {
                sendEvent("locationUnavailable", null)
            }
        }
    }

    private fun isValidLocation(location: Location): Boolean {
        // Filter by accuracy and age
        return location.accuracy &lt; 100 &amp;&amp;
               System.currentTimeMillis() - location.time &lt; 60000
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

            <h4>5. Adaptive Mode Selection</h4>
            <pre><code>// services/AdaptiveLocationService.ts
import * as Location from 'expo-location';
import * as Battery from 'expo-battery';
import { MMKV } from 'react-native-mmkv';

class AdaptiveLocationService {
    private storage = new MMKV();
    private currentMode: TrackingMode = 'balanced';
    private activitySubscription: any;

    async start() {
        // Monitor battery state
        Battery.addBatteryStateListener(({ batteryState, batteryLevel }) =&gt; {
            this.adjustForBattery(batteryLevel, batteryState);
        });

        // Monitor activity (requires separate permission)
        this.startActivityRecognition();

        // Start with appropriate mode
        const initialMode = await this.determineInitialMode();
        await this.setMode(initialMode);
    }

    private async determineInitialMode(): Promise&lt;TrackingMode&gt; {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        const batteryState = await Battery.getBatteryStateAsync();

        if (batteryState === Battery.BatteryState.CHARGING) {
            return 'high'; // Plugged in, can use more battery
        }

        if (batteryLevel &lt; 0.15) {
            return 'significant'; // Critical battery
        }

        if (batteryLevel &lt; 0.30) {
            return 'low'; // Low battery
        }

        return 'balanced';
    }

    private adjustForBattery(level: number, state: Battery.BatteryState) {
        if (state === Battery.BatteryState.CHARGING) {
            // On charger - can use high accuracy
            if (this.currentMode !== 'high') {
                this.setMode('high');
            }
            return;
        }

        // Not charging - adjust based on level
        if (level &lt; 0.15 &amp;&amp; this.currentMode !== 'significant') {
            this.setMode('significant');
        } else if (level &lt; 0.30 &amp;&amp; this.currentMode === 'high') {
            this.setMode('balanced');
        }
    }

    private async adjustForActivity(activity: ActivityType) {
        // Don't change if on charger
        const state = await Battery.getBatteryStateAsync();
        if (state === Battery.BatteryState.CHARGING) return;

        switch (activity) {
            case 'driving':
                // High speed needs frequent updates
                await this.setMode('high');
                break;

            case 'walking':
            case 'running':
            case 'cycling':
                // Moving but slower
                await this.setMode('balanced');
                break;

            case 'stationary':
                // Not moving - geofence only
                await this.setMode('geofence');
                break;
        }
    }

    private async setMode(mode: TrackingMode) {
        if (mode === this.currentMode) return;

        console.log(\`Switching location mode: \${this.currentMode} → \${mode}\`);

        await Location.stopLocationUpdatesAsync(LOCATION_TASK);

        const config = TRACKING_CONFIGS[mode];

        if (mode === 'geofence') {
            // Stop active tracking, rely on geofences
            return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
            accuracy: this.modeToAccuracy(mode),
            distanceInterval: config.distanceFilter,
            timeInterval: config.timeInterval,
            deferredUpdatesInterval: config.deferredUpdates ? 120000 : 0,
            deferredUpdatesDistance: config.deferredUpdates ? 500 : 0,
            foregroundService: {
                notificationTitle: 'Location Tracking',
                notificationBody: this.getModeDescription(mode),
            },
        });

        this.currentMode = mode;
        this.storage.set('lastTrackingMode', mode);
    }

    private modeToAccuracy(mode: TrackingMode): Location.Accuracy {
        switch (mode) {
            case 'high': return Location.Accuracy.BestForNavigation;
            case 'balanced': return Location.Accuracy.Balanced;
            case 'low': return Location.Accuracy.Low;
            case 'significant': return Location.Accuracy.Lowest;
            default: return Location.Accuracy.Balanced;
        }
    }
}</code></pre>

            <h4>6. Data Flow Diagram</h4>
            <pre><code>┌─────────────────────────────────────────────────────────────────┐
│                    LOCATION TRACKING FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Device Sensors          Native Service           App/Server    │
│       │                      │                        │          │
│       ▼                      │                        │          │
│  ┌──────────┐                │                        │          │
│  │ GPS/Cell │                │                        │          │
│  │ WiFi     │                │                        │          │
│  └────┬─────┘                │                        │          │
│       │ Raw location         │                        │          │
│       ▼                      │                        │          │
│  ┌──────────┐                │                        │          │
│  │ Fused/CL │ ─── Filter ──► Valid locations         │          │
│  │ Manager  │   (accuracy,   │                        │          │
│  └──────────┘    age)        │                        │          │
│                              ▼                        │          │
│                       ┌─────────────┐                │          │
│                       │ Local Buffer│                │          │
│                       │ (MMKV)      │                │          │
│                       └──────┬──────┘                │          │
│                              │                        │          │
│        ┌─────────────────────┼────────────────┐      │          │
│        │                     │                │      │          │
│        ▼                     ▼                ▼      │          │
│  ┌──────────┐         ┌──────────┐    ┌──────────┐  │          │
│  │ Immediate│         │ Batched  │    │ Deferred │  │          │
│  │ Upload   │         │ Upload   │    │ Upload   │  │          │
│  │ (high)   │         │ (balanced)│   │ (WiFi)   │  │          │
│  └────┬─────┘         └────┬─────┘    └────┬─────┘  │          │
│       │                    │               │         │          │
│       └────────────────────┴───────────────┴────────►│          │
│                                                 API Server       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘</code></pre>

            <h4>7. Library Recommendations</h4>
            <table>
                <tr><th>Concern</th><th>Library</th><th>Rationale</th></tr>
                <tr><td>Location</td><td>expo-location</td><td>Unified API, background support</td></tr>
                <tr><td>Task Manager</td><td>expo-task-manager</td><td>Background task registration</td></tr>
                <tr><td>Battery</td><td>expo-battery</td><td>Monitor level and charging state</td></tr>
                <tr><td>Storage</td><td>react-native-mmkv</td><td>Fast local buffer for locations</td></tr>
                <tr><td>Background Upload</td><td>react-native-background-upload</td><td>Upload while app suspended</td></tr>
                <tr><td>WorkManager</td><td>@react-native-community/workmanager</td><td>Android deferred work</td></tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>App killed by OS:</strong> Use startMonitoringSignificantLocationChanges/Geofencing to relaunch</li>
                <li><strong>GPS unavailable:</strong> Fall back to cell/WiFi, notify user of reduced accuracy</li>
                <li><strong>Permission revoked:</strong> Gracefully degrade, prompt user to re-enable</li>
                <li><strong>Device restart:</strong> Use BOOT_COMPLETED receiver (Android) / significant location (iOS)</li>
                <li><strong>Airplane mode:</strong> Buffer locally, sync when connectivity returns</li>
                <li><strong>Location spoofing:</strong> Detect mock locations, flag for server-side validation</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>iOS vs Android background:</strong> iOS kills apps aggressively; Android requires foreground service</li>
                <li><strong>Significant location:</strong> Cell tower based, ~500m accuracy, minimal battery</li>
                <li><strong>Geofence limits:</strong> iOS 20 regions, Android 100 - strategies for more</li>
                <li><strong>Privacy considerations:</strong> GDPR compliance, data minimization, user consent</li>
                <li><strong>Server-side trip detection:</strong> Clustering algorithm for visit extraction</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Support multiple link types: custom schemes, universal links (iOS), app links (Android)</li>
                <li>Handle deferred deep links for users installing app from links</li>
                <li>Manage authentication gating with pending link storage</li>
                <li>Support nested navigation and deep screen targeting</li>
                <li>Track link attribution for marketing and analytics</li>
                <li>Handle QR codes and NFC tag links</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Link resolution under 200ms for optimal UX</li>
                <li>99.9% link handling reliability across app states</li>
                <li>Deferred link matching accuracy &gt;95%</li>
                <li>Support millions of concurrent link resolutions</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/deeplink.ts
interface DeepLink {
    id: string;
    url: string;
    scheme: 'universal' | 'applink' | 'custom' | 'deferred';
    path: string;
    params: Record&lt;string, string&gt;;
    queryParams: Record&lt;string, string&gt;;
    requiresAuth: boolean;
    priority: number;
    timestamp: number;
    attribution?: LinkAttribution;
}

interface LinkAttribution {
    campaign?: string;
    source?: string;
    medium?: string;
    content?: string;
    referrer?: string;
}

interface RouteConfig {
    pattern: string;
    screen: string;
    params?: string[];
    requiresAuth: boolean;
    nestedIn?: string;
    validator?: (params: Record&lt;string, string&gt;) =&gt; boolean;
}

type LinkState = 'pending' | 'auth_required' | 'deferred' | 'ready' | 'navigated' | 'expired';

interface DeferredLinkData {
    link: string;
    fingerprint: DeviceFingerprint;
    createdAt: number;
    expiresAt: number;
    matched: boolean;
}

interface DeviceFingerprint {
    ipHash: string;
    userAgent: string;
    screenResolution: string;
    timezone: string;
    language: string;
}</code></pre>

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

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - Universal Links &amp; Scene Delegate:</strong></p>
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

            <p><strong>Android Strategy - App Links &amp; Intent Handling:</strong></p>
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

            <h4>5. Deferred Deep Links Implementation</h4>
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

            <h4>6. React Navigation Integration</h4>
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

            <h4>7. Data Flow Diagram</h4>
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

            <h4>8. Library Recommendations</h4>
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

            <h4>9. Edge Cases to Address</h4>
            <ol>
                <li><strong>Expired deferred links:</strong> Implement TTL (7 days) with graceful fallback to home screen</li>
                <li><strong>Invalid/malformed URLs:</strong> Validate all inputs, sanitize params, log and recover gracefully</li>
                <li><strong>Race conditions:</strong> Link received before navigation is ready - queue until mounted</li>
                <li><strong>Auth token expiry:</strong> Token expires during deferred link wait - re-authenticate then navigate</li>
                <li><strong>Multiple pending links:</strong> Only keep most recent, or prioritize by link type</li>
                <li><strong>App killed during auth:</strong> Persist pending link to MMKV, restore on next launch</li>
                <li><strong>Deep link to deleted content:</strong> Handle 404s gracefully with user-friendly messaging</li>
            </ol>

            <h4>10. Interview Discussion Points</h4>
            <ul>
                <li><strong>Universal vs App Links:</strong> iOS requires AASA file validation at install, Android verifies assetlinks at runtime</li>
                <li><strong>Privacy considerations:</strong> Fingerprinting accuracy vs user privacy (ATT on iOS)</li>
                <li><strong>Link shorteners:</strong> How to handle redirects while preserving attribution</li>
                <li><strong>Testing strategies:</strong> Debug mode, link validators, staging environments</li>
                <li><strong>Fallback hierarchy:</strong> Universal link → App link → Custom scheme → Web fallback</li>
                <li><strong>Branch/Adjust trade-offs:</strong> When to use third-party vs custom implementation</li>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Support multiple user states: unauthenticated, onboarding, verification, authenticated</li>
                <li>Handle forced updates and maintenance mode screens</li>
                <li>Support role-based navigation (admin, premium, standard users)</li>
                <li>Integrate with deep linking while respecting state requirements</li>
                <li>Handle session expiry and token refresh mid-navigation</li>
                <li>Support A/B testing different navigation flows</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Navigation state transitions under 100ms</li>
                <li>Seamless screen transitions with no flicker</li>
                <li>Persist navigation state across app restarts</li>
                <li>TypeScript type-safety for all navigation params</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/navigation.ts
type AuthState = 'unauthenticated' | 'authenticated';
type OnboardingState = 'not_started' | 'in_progress' | 'completed';
type VerificationState = 'unverified' | 'email_verified' | 'phone_verified' | 'fully_verified';
type UserRole = 'standard' | 'premium' | 'admin';

interface AppState {
    auth: AuthState;
    onboarding: OnboardingState;
    verification: VerificationState;
    role: UserRole;
    forceUpdate: boolean;
    maintenance: boolean;
}

interface NavigationGate {
    id: string;
    condition: (state: AppState) =&gt; boolean;
    stack: keyof RootStackParamList;
    priority: number;
}

type RootStackParamList = {
    ForceUpdate: undefined;
    Maintenance: undefined;
    Auth: NavigatorScreenParams&lt;AuthStackParamList&gt;;
    Onboarding: NavigatorScreenParams&lt;OnboardingStackParamList&gt;;
    Verification: NavigatorScreenParams&lt;VerificationStackParamList&gt;;
    Main: NavigatorScreenParams&lt;MainTabParamList&gt;;
    AdminDashboard: NavigatorScreenParams&lt;AdminStackParamList&gt;;
};

type AuthStackParamList = {
    Welcome: undefined;
    Login: { returnTo?: string };
    Register: { referralCode?: string };
    ForgotPassword: { email?: string };
    SSO: { provider: 'google' | 'apple' | 'facebook' };
};

type OnboardingStackParamList = {
    Welcome: undefined;
    ProfileSetup: undefined;
    Preferences: undefined;
    Permissions: undefined;
    Complete: undefined;
};</code></pre>

            <pre><code>// machines/navigationMachine.ts
import { createMachine, assign } from 'xstate';

interface NavigationContext {
    appState: AppState;
    pendingDeepLink: string | null;
    error: Error | null;
}

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

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - SceneDelegate &amp; State Restoration:</strong></p>
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

            <p><strong>Android Strategy - Activity Lifecycle &amp; State Persistence:</strong></p>
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

            <h4>5. Navigation Provider &amp; Root Navigator</h4>
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

            <h4>6. Data Flow Diagram</h4>
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

            <h4>7. Library Recommendations</h4>
            <table>
                <tr>
                    <th>Concern</th>
                    <th>Library</th>
                    <th>Rationale</th>
                </tr>
                <tr>
                    <td>Navigation</td>
                    <td>@react-navigation/native v6+</td>
                    <td>Type-safe, flexible stack management, native transitions</td>
                </tr>
                <tr>
                    <td>State machine</td>
                    <td>XState</td>
                    <td>Visualizable flows, guards for transitions, devtools</td>
                </tr>
                <tr>
                    <td>Auth state</td>
                    <td>Zustand + react-native-keychain</td>
                    <td>Simple state management with secure token storage</td>
                </tr>
                <tr>
                    <td>Type safety</td>
                    <td>TypeScript with @react-navigation types</td>
                    <td>Full type inference for params and navigation</td>
                </tr>
                <tr>
                    <td>Persistence</td>
                    <td>react-native-mmkv</td>
                    <td>Fast synchronous storage for navigation state</td>
                </tr>
                <tr>
                    <td>Analytics</td>
                    <td>@react-navigation/native onStateChange</td>
                    <td>Built-in screen tracking integration</td>
                </tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Token refresh during navigation:</strong> Queue navigation actions, complete refresh, then replay</li>
                <li><strong>Concurrent state changes:</strong> XState handles this with event queue - only process one at a time</li>
                <li><strong>Deep link to protected screen:</strong> Store pending link, complete auth flow, then navigate</li>
                <li><strong>Onboarding skip scenarios:</strong> Handle social login users who may skip certain steps</li>
                <li><strong>Multi-device session:</strong> Handle session invalidation from another device</li>
                <li><strong>Network loss during state check:</strong> Use cached state, retry when online</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Why XState vs simple context:</strong> Visualizable, prevents impossible states, explicit transitions</li>
                <li><strong>Screen flickering prevention:</strong> Load all state before rendering navigator, use fade transitions</li>
                <li><strong>Testing strategy:</strong> State machine can be tested independently of React components</li>
                <li><strong>A/B testing flows:</strong> Inject different decision logic via machine configuration</li>
                <li><strong>Analytics integration:</strong> Track state transitions and screen views in onStateChange</li>
                <li><strong>Reset vs navigate:</strong> Use reset() for auth changes to clear stack, navigate() for in-app transitions</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Support image and video uploads up to 2GB</li>
                <li>Show real-time progress with accurate percentage</li>
                <li>Retry failed uploads with exponential backoff</li>
                <li>Continue uploads in background when app is minimized</li>
                <li>Resume interrupted uploads from last checkpoint</li>
                <li>Support concurrent uploads with queue management</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Memory efficient - never load entire file into memory</li>
                <li>Battery optimized for large uploads</li>
                <li>Handle network transitions (WiFi ↔ cellular) seamlessly</li>
                <li>Complete pending uploads even after app restart</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/upload.ts
type UploadStatus = 'queued' | 'preparing' | 'uploading' | 'paused' | 'failed' | 'completed';

interface UploadTask {
    id: string;
    uri: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    status: UploadStatus;
    progress: number;
    bytesUploaded: number;
    chunks: ChunkState[];
    retryCount: number;
    maxRetries: number;
    priority: 'high' | 'normal' | 'low';
    createdAt: number;
    error?: UploadError;
    metadata?: Record&lt;string, any&gt;;
}

interface ChunkState {
    index: number;
    offset: number;
    size: number;
    checksum: string;
    uploaded: boolean;
    uploadUrl?: string;
}

interface UploadConfig {
    chunkSize: number;          // 5MB default
    maxConcurrentUploads: number; // 3 default
    maxConcurrentChunks: number;  // 4 per file
    maxRetries: number;          // 3 default
    retryDelayMs: number;        // 1000 base
    backgroundEnabled: boolean;
}

interface UploadError {
    code: 'NETWORK' | 'SERVER' | 'TIMEOUT' | 'CANCELLED' | 'INVALID_FILE';
    message: string;
    retryable: boolean;
}</code></pre>

            <pre><code>// services/UploadCoordinator.ts
import { EventEmitter } from 'events';
import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';

const storage = new MMKV({ id: 'uploads' });

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
            ...config,
        };
        this.restoreQueue();
        this.setupNetworkListener();
    }

    private restoreQueue() {
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

    private persistQueue() {
        const tasks = Array.from(this.queue.values());
        storage.set('queue', JSON.stringify(tasks));
    }

    private setupNetworkListener() {
        NetInfo.addEventListener(state =&gt; {
            const newState = state.isConnected
                ? (state.type === 'wifi' ? 'wifi' : 'cellular')
                : 'none';

            if (this.networkState === 'none' &amp;&amp; newState !== 'none') {
                // Network restored - resume uploads
                this.processQueue();
            }
            this.networkState = newState;
        });
    }

    async addUpload(file: MediaFile, metadata?: Record&lt;string, any&gt;): Promise&lt;string&gt; {
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

    private async processQueue() {
        if (this.networkState === 'none') return;

        const activeCount = this.activeUploads.size;
        const available = this.config.maxConcurrentUploads - activeCount;
        if (available &lt;= 0) return;

        const pending = Array.from(this.queue.values())
            .filter(t =&gt; t.status === 'queued')
            .sort((a, b) =&gt; {
                // Priority then FIFO
                const priorityOrder = { high: 0, normal: 1, low: 2 };
                const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                return pDiff !== 0 ? pDiff : a.createdAt - b.createdAt;
            })
            .slice(0, available);

        for (const task of pending) {
            this.startUpload(task);
        }
    }

    private async startUpload(task: UploadTask) {
        const controller = new AbortController();
        this.activeUploads.set(task.id, controller);
        task.status = 'preparing';
        this.emit('taskUpdated', task);

        try {
            // 1. Prepare chunks if not already done
            if (task.chunks.length === 0) {
                task.chunks = await this.prepareChunks(task);
            }

            // 2. Get upload session
            const session = await this.initUploadSession(task);

            // 3. Upload chunks
            task.status = 'uploading';
            await this.uploadChunks(task, session, controller.signal);

            // 4. Complete upload
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

    private async prepareChunks(task: UploadTask): Promise&lt;ChunkState[]&gt; {
        const chunks: ChunkState[] = [];
        const numChunks = Math.ceil(task.fileSize / this.config.chunkSize);

        for (let i = 0; i &lt; numChunks; i++) {
            const offset = i * this.config.chunkSize;
            const size = Math.min(this.config.chunkSize, task.fileSize - offset);

            chunks.push({
                index: i,
                offset,
                size,
                checksum: '', // Computed during upload
                uploaded: false,
            });
        }

        return chunks;
    }

    private async uploadChunks(
        task: UploadTask,
        session: UploadSession,
        signal: AbortSignal
    ) {
        const pendingChunks = task.chunks.filter(c =&gt; !c.uploaded);

        // Upload chunks with concurrency limit
        await pMap(pendingChunks, async (chunk) =&gt; {
            await this.uploadChunk(task, chunk, session, signal);

            task.bytesUploaded += chunk.size;
            task.progress = Math.round((task.bytesUploaded / task.fileSize) * 100);
            this.emit('progress', { taskId: task.id, progress: task.progress });
        }, { concurrency: this.config.maxConcurrentChunks });
    }

    private scheduleRetry(task: UploadTask) {
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

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - NSURLSession Background Upload:</strong></p>
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

            <p><strong>Android Strategy - WorkManager with Foreground Service:</strong></p>
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

            <h4>5. Chunked Upload Protocol (tus)</h4>
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

            <h4>6. Data Flow Diagram</h4>
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

            <h4>7. Library Recommendations</h4>
            <table>
                <tr>
                    <th>Concern</th>
                    <th>Library</th>
                    <th>Rationale</th>
                </tr>
                <tr>
                    <td>Background upload</td>
                    <td>react-native-background-upload</td>
                    <td>Native NSURLSession/WorkManager integration</td>
                </tr>
                <tr>
                    <td>File access</td>
                    <td>expo-file-system / react-native-fs</td>
                    <td>Read chunks, file info, temp storage</td>
                </tr>
                <tr>
                    <td>Image compression</td>
                    <td>react-native-image-resizer</td>
                    <td>Efficient JPEG/PNG compression</td>
                </tr>
                <tr>
                    <td>Video compression</td>
                    <td>react-native-video-compressor</td>
                    <td>Hardware-accelerated transcoding</td>
                </tr>
                <tr>
                    <td>Network state</td>
                    <td>@react-native-community/netinfo</td>
                    <td>Network change detection, connection quality</td>
                </tr>
                <tr>
                    <td>Persistence</td>
                    <td>react-native-mmkv</td>
                    <td>Fast queue persistence for resume</td>
                </tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Large file handling:</strong> Stream chunks instead of loading entire file into memory</li>
                <li><strong>Network switch:</strong> Detect WiFi↔cellular transition, potentially pause on cellular</li>
                <li><strong>Storage full:</strong> Check available space before compression, clean temp files</li>
                <li><strong>App killed during upload:</strong> Native background tasks complete, JS resumes on next launch</li>
                <li><strong>Server timeout:</strong> Implement client-side timeout with retry</li>
                <li><strong>Duplicate detection:</strong> Hash file before upload, skip if already exists</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Chunked vs single upload:</strong> Tradeoffs between complexity and reliability</li>
                <li><strong>tus protocol benefits:</strong> Standardized resumable uploads with wide server support</li>
                <li><strong>Background upload limits:</strong> iOS 30s limit after suspension, use native URLSession</li>
                <li><strong>Progress accuracy:</strong> Chunk-based progress vs byte-level streaming progress</li>
                <li><strong>Presigned URLs vs direct:</strong> S3 presigned for scalability, direct for small apps</li>
                <li><strong>Compression strategy:</strong> Client vs server-side, quality vs speed tradeoffs</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Support HLS and DASH adaptive bitrate streaming</li>
                <li>Automatic quality adjustment based on network conditions</li>
                <li>Manual quality selection override</li>
                <li>DRM protection for premium content (FairPlay, Widevine)</li>
                <li>Offline download with quality selection</li>
                <li>Background audio playback support</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Buffer startup under 2 seconds on 4G</li>
                <li>Zero rebuffering on stable connections</li>
                <li>Smooth quality transitions without visible artifacts</li>
                <li>Battery efficient playback</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/video.ts
interface VideoSource {
    uri: string;
    type: 'hls' | 'dash' | 'mp4';
    drmConfig?: DRMConfig;
    metadata?: VideoMetadata;
}

interface DRMConfig {
    type: 'fairplay' | 'widevine';
    licenseServerUrl: string;
    certificateUrl?: string; // FairPlay only
    headers?: Record&lt;string, string&gt;;
}

interface VideoMetadata {
    title: string;
    duration: number;
    thumbnail: string;
    qualities: QualityLevel[];
}

interface QualityLevel {
    resolution: '360p' | '480p' | '720p' | '1080p' | '4k';
    bitrate: number;
    codec: string;
    width: number;
    height: number;
}

interface PlaybackState {
    status: 'idle' | 'loading' | 'playing' | 'paused' | 'buffering' | 'ended' | 'error';
    currentTime: number;
    duration: number;
    bufferedDuration: number;
    currentQuality: QualityLevel | 'auto';
    volume: number;
    playbackRate: number;
}

interface BufferConfig {
    minBufferMs: number;
    maxBufferMs: number;
    bufferForPlaybackMs: number;
    bufferForPlaybackAfterRebufferMs: number;
}</code></pre>

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

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - AVPlayer with FairPlay DRM:</strong></p>
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

            <p><strong>Android Strategy - ExoPlayer with Widevine DRM:</strong></p>
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

            <h4>5. Adaptive Bitrate Selection Algorithm</h4>
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

            <h4>6. Data Flow Diagram</h4>
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
│  ├─ Buffer &lt; minBuffer → Pause playback, show spinner           │
│  ├─ Switch to lower quality immediately                          │
│  ├─ Resume when buffer &gt; bufferForPlaybackAfterRebuffer         │
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

            <h4>7. Library Recommendations</h4>
            <table>
                <tr>
                    <th>Concern</th>
                    <th>Library</th>
                    <th>Rationale</th>
                </tr>
                <tr>
                    <td>Video player</td>
                    <td>react-native-video v6</td>
                    <td>AVPlayer/ExoPlayer wrapper with DRM support</td>
                </tr>
                <tr>
                    <td>DRM</td>
                    <td>Native AVFoundation / Media3</td>
                    <td>Platform DRM SDKs for FairPlay/Widevine</td>
                </tr>
                <tr>
                    <td>Offline</td>
                    <td>AVAssetDownloadURLSession / DownloadService</td>
                    <td>Native HLS/DASH download with DRM</td>
                </tr>
                <tr>
                    <td>Analytics</td>
                    <td>mux-react-native / conviva</td>
                    <td>QoE tracking, rebuffer analysis, quality metrics</td>
                </tr>
                <tr>
                    <td>Captions</td>
                    <td>Built-in (react-native-video)</td>
                    <td>WebVTT/TTML subtitle support</td>
                </tr>
                <tr>
                    <td>Chromecast</td>
                    <td>react-native-google-cast</td>
                    <td>Cast SDK integration for streaming</td>
                </tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Network transition during playback:</strong> Buffer through, avoid quality switch on transient drops</li>
                <li><strong>DRM license expiry:</strong> Renew license before expiry, handle offline license limits</li>
                <li><strong>Background audio:</strong> Enable audio-only playback, handle interruptions (calls)</li>
                <li><strong>Seek to unbuffered region:</strong> Show loading, buffer enough before resuming play</li>
                <li><strong>Device rotation:</strong> Maintain playback state, reconfigure player layout</li>
                <li><strong>Storage full for downloads:</strong> Check space before download, clean expired content</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>HLS vs DASH:</strong> HLS for Apple devices, DASH for broader codec support (VP9, AV1)</li>
                <li><strong>ABR algorithms:</strong> Buffer-based vs throughput-based vs hybrid approaches</li>
                <li><strong>DRM levels:</strong> Widevine L1 (hardware) required for HD on some platforms</li>
                <li><strong>Latency modes:</strong> Low-latency HLS/DASH for live streaming (2-5s vs 30s)</li>
                <li><strong>CDN selection:</strong> Multi-CDN with failover, edge caching strategies</li>
                <li><strong>QoE metrics:</strong> Rebuffer rate, time to first frame, video quality score</li>
            </ul>
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
            <h4>1. Requirements Clarification</h4>
            <p><strong>Functional Requirements:</strong></p>
            <ul>
                <li>Support email/password, social login (Google, Apple, Facebook), and SSO</li>
                <li>Biometric authentication for quick unlock (Face ID, Touch ID, Fingerprint)</li>
                <li>JWT access/refresh token system with automatic renewal</li>
                <li>Multi-device session management with remote logout</li>
                <li>MFA support (TOTP, SMS, push notification)</li>
                <li>Account recovery flow with secure verification</li>
            </ul>
            <p><strong>Non-Functional Requirements:</strong></p>
            <ul>
                <li>Tokens stored in hardware-backed secure storage</li>
                <li>OWASP Mobile Security compliance</li>
                <li>Token refresh transparent to user (no re-login)</li>
                <li>Session timeout after 15 min inactivity for sensitive apps</li>
            </ul>

            <h4>2. High-Level Architecture</h4>
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

            <h4>3. Core Components Deep Dive</h4>
            <pre><code>// types/auth.ts
interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
}

interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    mfaEnabled: boolean;
    mfaMethods: ('totp' | 'sms' | 'push')[];
}

interface Session {
    id: string;
    deviceId: string;
    deviceName: string;
    platform: 'ios' | 'android';
    lastActive: number;
    location?: { city: string; country: string };
    current: boolean;
}

type AuthState =
    | { status: 'logged_out' }
    | { status: 'authenticating' }
    | { status: 'needs_mfa'; mfaToken: string; methods: string[] }
    | { status: 'needs_biometric' }
    | { status: 'authenticated'; user: User; tokens: AuthTokens }
    | { status: 'error'; error: AuthError };

interface AuthError {
    code: 'INVALID_CREDENTIALS' | 'MFA_REQUIRED' | 'ACCOUNT_LOCKED' |
          'SESSION_EXPIRED' | 'BIOMETRIC_FAILED' | 'NETWORK_ERROR';
    message: string;
    retryAfter?: number;
}</code></pre>

            <pre><code>// services/AuthService.ts
import * as Keychain from 'react-native-keychain';
import * as LocalAuthentication from 'expo-local-authentication';
import { create } from 'zustand';

interface AuthStore {
    state: AuthState;
    login: (email: string, password: string) =&gt; Promise&lt;void&gt;;
    loginWithBiometric: () =&gt; Promise&lt;void&gt;;
    verifyMFA: (code: string, method: string) =&gt; Promise&lt;void&gt;;
    logout: () =&gt; Promise&lt;void&gt;;
    refreshTokens: () =&gt; Promise&lt;void&gt;;
}

export const useAuthStore = create&lt;AuthStore&gt;((set, get) =&gt; ({
    state: { status: 'logged_out' },

    login: async (email, password) =&gt; {
        set({ state: { status: 'authenticating' } });

        try {
            const response = await api.post('/auth/login', {
                email,
                password,
                deviceId: await getDeviceId(),
                deviceInfo: await getDeviceInfo(),
            });

            if (response.data.mfaRequired) {
                set({
                    state: {
                        status: 'needs_mfa',
                        mfaToken: response.data.mfaToken,
                        methods: response.data.mfaMethods,
                    },
                });
                return;
            }

            await handleSuccessfulAuth(response.data, set);

        } catch (error) {
            set({ state: { status: 'error', error: parseAuthError(error) } });
        }
    },

    loginWithBiometric: async () =&gt; {
        try {
            // Check biometric availability
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware || !isEnrolled) {
                throw new Error('Biometric not available');
            }

            // Authenticate with biometric
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to continue',
                cancelLabel: 'Use password',
                disableDeviceFallback: false,
            });

            if (!result.success) {
                throw new Error('Biometric authentication failed');
            }

            // Retrieve tokens from secure storage (requires biometric)
            const tokens = await secureStorage.getTokens();

            if (!tokens) {
                set({ state: { status: 'logged_out' } });
                return;
            }

            // Validate refresh token is not expired
            if (Date.now() &gt; tokens.refreshTokenExpiresAt) {
                await secureStorage.clearTokens();
                set({ state: { status: 'logged_out' } });
                return;
            }

            // Refresh access token
            await get().refreshTokens();

        } catch (error) {
            set({
                state: {
                    status: 'error',
                    error: { code: 'BIOMETRIC_FAILED', message: error.message },
                },
            });
        }
    },

    verifyMFA: async (code, method) =&gt; {
        const currentState = get().state;
        if (currentState.status !== 'needs_mfa') return;

        try {
            const response = await api.post('/auth/mfa/verify', {
                mfaToken: currentState.mfaToken,
                code,
                method,
            });

            await handleSuccessfulAuth(response.data, set);

        } catch (error) {
            set({ state: { status: 'error', error: parseAuthError(error) } });
        }
    },

    refreshTokens: async () =&gt; {
        const tokens = await secureStorage.getTokens();
        if (!tokens) throw new Error('No refresh token');

        const response = await api.post('/auth/refresh', {
            refreshToken: tokens.refreshToken,
            deviceId: await getDeviceId(),
        });

        const newTokens: AuthTokens = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken, // Rotated
            accessTokenExpiresAt: Date.now() + response.data.expiresIn * 1000,
            refreshTokenExpiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        };

        await secureStorage.storeTokens(newTokens);
        api.setAccessToken(newTokens.accessToken);

        set({
            state: {
                status: 'authenticated',
                user: response.data.user,
                tokens: newTokens,
            },
        });
    },

    logout: async () =&gt; {
        try {
            const tokens = await secureStorage.getTokens();
            if (tokens) {
                await api.post('/auth/logout', {
                    refreshToken: tokens.refreshToken,
                });
            }
        } catch {
            // Ignore logout API errors
        }

        await secureStorage.clearTokens();
        api.clearAccessToken();
        set({ state: { status: 'logged_out' } });
    },
}));

async function handleSuccessfulAuth(
    data: { accessToken: string; refreshToken: string; expiresIn: number; user: User },
    set: Function
) {
    const tokens: AuthTokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpiresAt: Date.now() + data.expiresIn * 1000,
        refreshTokenExpiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };

    // Store tokens securely with biometric protection
    await secureStorage.storeTokens(tokens);

    // Set access token for API calls
    api.setAccessToken(tokens.accessToken);

    set({ state: { status: 'authenticated', user: data.user, tokens } });
}</code></pre>

            <h4>4. Platform-Specific Implementation</h4>
            <p><strong>iOS Strategy - Keychain with Secure Enclave:</strong></p>
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

            <p><strong>Android Strategy - Keystore with Biometric:</strong></p>
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

            <h4>5. Token Refresh Interceptor</h4>
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

            <h4>6. Data Flow Diagram</h4>
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

            <h4>7. Library Recommendations</h4>
            <table>
                <tr>
                    <th>Concern</th>
                    <th>Library</th>
                    <th>Rationale</th>
                </tr>
                <tr>
                    <td>Keychain storage</td>
                    <td>react-native-keychain</td>
                    <td>Cross-platform secure storage with biometric support</td>
                </tr>
                <tr>
                    <td>Biometrics</td>
                    <td>expo-local-authentication</td>
                    <td>Simple API for Face ID / Touch ID / Fingerprint</td>
                </tr>
                <tr>
                    <td>OAuth flows</td>
                    <td>react-native-app-auth</td>
                    <td>PKCE-compliant OAuth 2.0 for social login</td>
                </tr>
                <tr>
                    <td>State management</td>
                    <td>Zustand</td>
                    <td>Simple auth state management with persistence</td>
                </tr>
                <tr>
                    <td>API client</td>
                    <td>Axios with interceptors</td>
                    <td>Token refresh handling built into interceptors</td>
                </tr>
                <tr>
                    <td>MFA TOTP</td>
                    <td>otpauth (for QR generation)</td>
                    <td>Standards-compliant TOTP implementation</td>
                </tr>
            </table>

            <h4>8. Edge Cases to Address</h4>
            <ol>
                <li><strong>Biometric enrollment change:</strong> Invalidate tokens when fingerprints change</li>
                <li><strong>Concurrent 401s:</strong> Queue requests during refresh, replay after success</li>
                <li><strong>Refresh token rotation:</strong> Handle race conditions when two devices refresh simultaneously</li>
                <li><strong>Device compromise:</strong> Remote session revocation from another device</li>
                <li><strong>App backgrounded during auth:</strong> Resume auth flow on foreground</li>
                <li><strong>Biometric not enrolled:</strong> Fall back to passcode or re-authenticate</li>
            </ol>

            <h4>9. Interview Discussion Points</h4>
            <ul>
                <li><strong>Access vs refresh token:</strong> Short-lived access (15min) limits exposure, long-lived refresh enables persistence</li>
                <li><strong>PKCE for mobile:</strong> Why authorization code with PKCE is preferred over implicit flow</li>
                <li><strong>Secure Enclave benefits:</strong> Hardware isolation, key never leaves enclave</li>
                <li><strong>Token rotation security:</strong> One-time refresh tokens prevent token theft replay</li>
                <li><strong>Session vs token expiry:</strong> Inactivity timeout vs absolute token lifetime</li>
                <li><strong>Biometric fallback:</strong> When to allow passcode vs requiring full re-authentication</li>
            </ul>
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
            &lt;h4&gt;1. Requirements Clarification&lt;/h4&gt;
            &lt;p&gt;&lt;strong&gt;Functional Requirements:&lt;/strong&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Tiered storage based on data sensitivity classification&lt;/li&gt;
                &lt;li&gt;Hardware-backed encryption for credentials and tokens&lt;/li&gt;
                &lt;li&gt;Encrypted database for PII and sensitive user data&lt;/li&gt;
                &lt;li&gt;Biometric protection for critical data access&lt;/li&gt;
                &lt;li&gt;Secure key generation and management&lt;/li&gt;
                &lt;li&gt;Data migration and key rotation capabilities&lt;/li&gt;
            &lt;/ul&gt;
            &lt;p&gt;&lt;strong&gt;Non-Functional Requirements:&lt;/strong&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Zero plaintext storage of sensitive data&lt;/li&gt;
                &lt;li&gt;OWASP MASVS compliance (L1/L2)&lt;/li&gt;
                &lt;li&gt;Sub-50ms read latency for encrypted data&lt;/li&gt;
                &lt;li&gt;Secure data deletion with memory wiping&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h4&gt;2. High-Level Architecture&lt;/h4&gt;
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

            &lt;h4&gt;3. Core Components&lt;/h4&gt;
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

            &lt;h4&gt;4. Platform-Specific Implementation&lt;/h4&gt;
            &lt;p&gt;&lt;strong&gt;iOS - Keychain with Data Protection:&lt;/strong&gt;&lt;/p&gt;
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

            &lt;p&gt;&lt;strong&gt;Android - Keystore with StrongBox:&lt;/strong&gt;&lt;/p&gt;
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

            &lt;h4&gt;5. Key Management Strategy&lt;/h4&gt;
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

            &lt;h4&gt;6. Data Flow Diagram&lt;/h4&gt;
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

            &lt;h4&gt;7. Library Recommendations&lt;/h4&gt;
            &lt;table border="1" cellpadding="8" cellspacing="0"&gt;
                &lt;tr&gt;&lt;th&gt;Concern&lt;/th&gt;&lt;th&gt;Library&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Keychain/Keystore&lt;/td&gt;&lt;td&gt;react-native-keychain&lt;/td&gt;&lt;td&gt;Hardware-backed, biometric support, cross-platform&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encrypted KV&lt;/td&gt;&lt;td&gt;react-native-mmkv&lt;/td&gt;&lt;td&gt;10x faster than AsyncStorage, native encryption&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Encrypted DB&lt;/td&gt;&lt;td&gt;react-native-quick-sqlite + SQLCipher&lt;/td&gt;&lt;td&gt;AES-256 encryption, synchronous API&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Crypto Operations&lt;/td&gt;&lt;td&gt;react-native-quick-crypto&lt;/td&gt;&lt;td&gt;Native crypto, HKDF, PBKDF2 support&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Biometrics&lt;/td&gt;&lt;td&gt;expo-local-authentication&lt;/td&gt;&lt;td&gt;Face ID, Touch ID, fingerprint with graceful fallback&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Secure Random&lt;/td&gt;&lt;td&gt;expo-crypto&lt;/td&gt;&lt;td&gt;Cryptographically secure random bytes&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;8. Edge Cases to Address&lt;/h4&gt;
            &lt;ol&gt;
                &lt;li&gt;&lt;strong&gt;Biometric Change:&lt;/strong&gt; Detect when user adds/removes fingerprints, invalidate biometric-protected keys&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Device Migration:&lt;/strong&gt; Handle iCloud Keychain sync vs device-only keys; Android backup exclusion&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Jailbreak/Root Detection:&lt;/strong&gt; Check device integrity before storing critical data&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Memory Protection:&lt;/strong&gt; Clear sensitive data from memory after use (especially passwords)&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Key Unavailability:&lt;/strong&gt; Handle Secure Enclave/StrongBox not available on older devices&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;App Reinstall:&lt;/strong&gt; Keychain persists on iOS; handle orphaned keys after reinstall&lt;/li&gt;
            &lt;/ol&gt;

            &lt;h4&gt;9. Interview Discussion Points&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Hardware vs Software Security:&lt;/strong&gt; Trade-offs between Secure Enclave/StrongBox availability and security level&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Key Rotation Strategy:&lt;/strong&gt; How to rotate encryption keys without data loss or downtime&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Compliance Requirements:&lt;/strong&gt; GDPR right to erasure, HIPAA encryption requirements, PCI DSS for payment data&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Threat Modeling:&lt;/strong&gt; Protecting against memory dumps, device theft, malicious apps&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Audit Trail:&lt;/strong&gt; Logging access to sensitive data for compliance without exposing the data itself&lt;/li&gt;
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
            &lt;h4&gt;1. Requirements Clarification&lt;/h4&gt;
            &lt;p&gt;&lt;strong&gt;Functional Requirements:&lt;/strong&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Capture JS exceptions, unhandled promise rejections, and native crashes&lt;/li&gt;
                &lt;li&gt;Automatic source map symbolication for readable stack traces&lt;/li&gt;
                &lt;li&gt;Breadcrumb trail of user actions leading to crash&lt;/li&gt;
                &lt;li&gt;User context and device info attached to reports&lt;/li&gt;
                &lt;li&gt;Release tracking with regression detection&lt;/li&gt;
                &lt;li&gt;Error grouping/deduplication to reduce noise&lt;/li&gt;
            &lt;/ul&gt;
            &lt;p&gt;&lt;strong&gt;Non-Functional Requirements:&lt;/strong&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Zero impact on app launch time (&lt;10ms SDK init)&lt;/li&gt;
                &lt;li&gt;Offline error queueing with background sync&lt;/li&gt;
                &lt;li&gt;PII scrubbing for GDPR/privacy compliance&lt;/li&gt;
                &lt;li&gt;Sample rate control to manage costs at scale&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h4&gt;2. High-Level Architecture&lt;/h4&gt;
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

            &lt;h4&gt;3. Core Components&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// Type definitions for error tracking
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

            &lt;h4&gt;4. Platform-Specific Implementation&lt;/h4&gt;
            &lt;p&gt;&lt;strong&gt;iOS - Native Crash Reporting:&lt;/strong&gt;&lt;/p&gt;
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

            &lt;p&gt;&lt;strong&gt;Android - Native Crash Reporting:&lt;/strong&gt;&lt;/p&gt;
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

            &lt;h4&gt;5. Source Map &amp;amp; Symbol Upload Pipeline&lt;/h4&gt;
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

            &lt;h4&gt;6. Data Flow Diagram&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                     ERROR CAPTURE FLOW                           │
└─────────────────────────────────────────────────────────────────┘

ERROR OCCURS:
┌─────────────┐    ┌───────────────┐    ┌──────────────┐
│ Exception   │───▶│ Error Handler │───▶│ Create Event │
│ Thrown      │    │ (try/catch,   │    │ Object       │
└─────────────┘    │  boundary)    │    └──────┬───────┘
                   └───────────────┘           │
                                               ▼
ENRICH EVENT:                          ┌──────────────┐
┌─────────────┐    ┌───────────────┐   │ Attach:      │
│ Breadcrumbs │───▶│               │◀──│ • Stack trace│
│ (last 100)  │    │   Enrichment  │   │ • User       │
└─────────────┘    │    Engine     │   │ • Device     │
                   │               │   │ • App state  │
┌─────────────┐    │               │   └──────────────┘
│ Tags &amp;      │───▶│               │
│ Context     │    └───────┬───────┘
└─────────────┘            │
                           ▼
PROCESS:           ┌───────────────┐    ┌──────────────┐
                   │ beforeSend()  │───▶│ PII Scrub    │
                   │ Hook          │    │ &amp; Filter     │
                   └───────┬───────┘    └──────┬───────┘
                           │                    │
                           ▼                    ▼
TRANSMIT:          ┌───────────────┐    ┌──────────────┐
                   │ Check Online  │───▶│ YES: Send    │
                   │               │    │ immediately  │
                   └───────┬───────┘    └──────────────┘
                           │
                           │ NO
                           ▼
                   ┌───────────────┐    ┌──────────────┐
                   │ Queue in      │───▶│ Retry on     │
                   │ Offline Store │    │ Reconnect    │
                   └───────────────┘    └──────────────┘

BACKEND PROCESSING:
┌─────────────┐    ┌───────────────┐    ┌──────────────┐
│ Receive     │───▶│ Symbolicate   │───▶│ Group by     │
│ Event       │    │ Stack Trace   │    │ Fingerprint  │
└─────────────┘    └───────────────┘    └──────┬───────┘
                                               │
                   ┌───────────────┐           │
                   │ Send Alerts   │◀──────────┘
                   │ (if new/spike)│
                   └───────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;7. Library Recommendations&lt;/h4&gt;
            &lt;table border="1" cellpadding="8" cellspacing="0"&gt;
                &lt;tr&gt;&lt;th&gt;Concern&lt;/th&gt;&lt;th&gt;Library&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Error Tracking&lt;/td&gt;&lt;td&gt;@sentry/react-native&lt;/td&gt;&lt;td&gt;Comprehensive JS + native crash support, source maps&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Performance APM&lt;/td&gt;&lt;td&gt;Sentry Performance&lt;/td&gt;&lt;td&gt;Transaction tracing, slow frame detection&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Firebase Alternative&lt;/td&gt;&lt;td&gt;@react-native-firebase/crashlytics&lt;/td&gt;&lt;td&gt;Free, good native crash support, Firebase integration&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Network Logging&lt;/td&gt;&lt;td&gt;Reactotron&lt;/td&gt;&lt;td&gt;Development debugging, network inspector&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Release Management&lt;/td&gt;&lt;td&gt;sentry-cli&lt;/td&gt;&lt;td&gt;Symbol upload, release creation, commit tracking&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Hermes Profiling&lt;/td&gt;&lt;td&gt;react-native-performance&lt;/td&gt;&lt;td&gt;Startup timing, Hermes-specific metrics&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;8. Edge Cases to Address&lt;/h4&gt;
            &lt;ol&gt;
                &lt;li&gt;&lt;strong&gt;Hermes Stack Traces:&lt;/strong&gt; Ensure Hermes bytecode source maps are uploaded alongside JS source maps&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;CodePush Updates:&lt;/strong&gt; Track CodePush release hashes separately from native versions&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;OOM Crashes:&lt;/strong&gt; Native OOM doesn't always trigger crash handlers; use memory pressure callbacks&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;ANR vs Deadlock:&lt;/strong&gt; Distinguish between UI thread blocking and actual deadlocks&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Offline Crashes:&lt;/strong&gt; Crashes while offline may be lost if app is force-killed before reconnection&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Debug vs Release:&lt;/strong&gt; Symbolication only works for release builds with uploaded symbols&lt;/li&gt;
            &lt;/ol&gt;

            &lt;h4&gt;9. Interview Discussion Points&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Sampling Strategies:&lt;/strong&gt; How to balance cost vs. visibility with dynamic sample rates based on error severity&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Error Grouping:&lt;/strong&gt; Custom fingerprinting rules to prevent over/under-grouping of similar errors&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Alert Fatigue:&lt;/strong&gt; Setting up intelligent alerting thresholds (rate of change, not absolute count)&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Release Health:&lt;/strong&gt; Using crash-free session rate as a release quality metric&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Privacy Compliance:&lt;/strong&gt; Configuring PII scrubbing for GDPR, ensuring no user content in stack traces&lt;/li&gt;
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
            &lt;h4&gt;1. Requirements Clarification&lt;/h4&gt;
            &lt;p&gt;&lt;strong&gt;Functional Requirements:&lt;/strong&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Boolean feature flags for gradual rollout and kill switches&lt;/li&gt;
                &lt;li&gt;Multivariate experiments (A/B/n testing) with variant assignment&lt;/li&gt;
                &lt;li&gt;User targeting by attributes (country, subscription, device)&lt;/li&gt;
                &lt;li&gt;Percentage-based rollouts with consistent bucketing&lt;/li&gt;
                &lt;li&gt;Real-time flag updates without app restart&lt;/li&gt;
                &lt;li&gt;Analytics integration for experiment analysis&lt;/li&gt;
            &lt;/ul&gt;
            &lt;p&gt;&lt;strong&gt;Non-Functional Requirements:&lt;/strong&gt;&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Zero blocking on app startup (cache-first)&lt;/li&gt;
                &lt;li&gt;Consistent user experience (same variant across sessions)&lt;/li&gt;
                &lt;li&gt;Offline support with cached flag values&lt;/li&gt;
                &lt;li&gt;Sub-millisecond flag evaluation (local computation)&lt;/li&gt;
            &lt;/ul&gt;

            &lt;h4&gt;2. High-Level Architecture&lt;/h4&gt;
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

            &lt;h4&gt;3. Core Components&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;// Type definitions for feature flags
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

            &lt;h4&gt;4. React Hooks Integration&lt;/h4&gt;
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

            &lt;h4&gt;5. Targeting and Rollout Strategies&lt;/h4&gt;
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

            &lt;h4&gt;6. Data Flow Diagram&lt;/h4&gt;
            &lt;pre&gt;&lt;code&gt;┌─────────────────────────────────────────────────────────────────┐
│                   FEATURE FLAG EVALUATION FLOW                   │
└─────────────────────────────────────────────────────────────────┘

APP STARTUP:
┌─────────────┐    ┌───────────────┐    ┌──────────────┐
│ App Launch  │───▶│ Load Cached   │───▶│ Render with  │
│             │    │ Flags (MMKV)  │    │ Cached Values│
└─────────────┘    └───────┬───────┘    └──────────────┘
                           │
                           │ Background
                           ▼
                   ┌───────────────┐    ┌──────────────┐
                   │ Fetch Fresh   │───▶│ Update Store │
                   │ Flags (API)   │    │ &amp; Cache      │
                   └───────────────┘    └──────────────┘

FLAG EVALUATION:
┌─────────────┐    ┌───────────────┐    ┌──────────────┐
│ useFlag()   │───▶│ Get from      │───▶│ Check Rules  │
│ Hook Called │    │ Store         │    │ (in order)   │
└─────────────┘    └───────────────┘    └──────┬───────┘
                                               │
                   ┌───────────────────────────┤
                   ▼                           ▼
           ┌──────────────┐           ┌──────────────┐
           │ Match Found  │           │ No Match     │
           │ Return Rule  │           │ Return       │
           │ Variation    │           │ Default      │
           └──────┬───────┘           └──────┬───────┘
                  │                          │
                  └──────────┬───────────────┘
                             ▼
                   ┌───────────────┐    ┌──────────────┐
                   │ Queue         │───▶│ Batch Send   │
                   │ Exposure Event│    │ to Analytics │
                   └───────────────┘    └──────────────┘

REAL-TIME UPDATES:
┌─────────────┐    ┌───────────────┐    ┌──────────────┐
│ SSE Stream  │───▶│ Flag Change   │───▶│ Update Store │
│ Connection  │    │ Received      │    │              │
└─────────────┘    └───────────────┘    └──────┬───────┘
                                               │
                                               ▼
                                       ┌──────────────┐
                                       │ React Re-    │
                                       │ renders with │
                                       │ New Value    │
                                       └──────────────┘&lt;/code&gt;&lt;/pre&gt;

            &lt;h4&gt;7. Library Recommendations&lt;/h4&gt;
            &lt;table border="1" cellpadding="8" cellspacing="0"&gt;
                &lt;tr&gt;&lt;th&gt;Concern&lt;/th&gt;&lt;th&gt;Library&lt;/th&gt;&lt;th&gt;Rationale&lt;/th&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Feature Flags (SaaS)&lt;/td&gt;&lt;td&gt;LaunchDarkly&lt;/td&gt;&lt;td&gt;Enterprise-grade, streaming updates, robust SDKs&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Experimentation (SaaS)&lt;/td&gt;&lt;td&gt;Statsig / Amplitude Experiment&lt;/td&gt;&lt;td&gt;Built-in statistical analysis, experiment lifecycle&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Firebase (Free tier)&lt;/td&gt;&lt;td&gt;Firebase Remote Config&lt;/td&gt;&lt;td&gt;Free, good React Native SDK, A/B testing support&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Self-hosted&lt;/td&gt;&lt;td&gt;Unleash / Flagsmith&lt;/td&gt;&lt;td&gt;Open-source, full control, on-premise deployment&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Caching&lt;/td&gt;&lt;td&gt;react-native-mmkv&lt;/td&gt;&lt;td&gt;Synchronous reads, instant flag access on startup&lt;/td&gt;&lt;/tr&gt;
                &lt;tr&gt;&lt;td&gt;Hashing&lt;/td&gt;&lt;td&gt;murmurhash&lt;/td&gt;&lt;td&gt;Fast, consistent bucketing for percentage rollouts&lt;/td&gt;&lt;/tr&gt;
            &lt;/table&gt;

            &lt;h4&gt;8. Edge Cases to Address&lt;/h4&gt;
            &lt;ol&gt;
                &lt;li&gt;&lt;strong&gt;First-time Users:&lt;/strong&gt; No cached flags on first launch; use sensible defaults or bootstrapped config&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Stale Assignments:&lt;/strong&gt; User assigned to variant then experiment ends; handle gracefully&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Multiple Exposures:&lt;/strong&gt; Same user sees flag multiple times; dedupe exposure events&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Anonymous Users:&lt;/strong&gt; Use device ID for consistent bucketing before login&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Flag Cleanup:&lt;/strong&gt; Remove stale flags from code after 100% rollout to avoid tech debt&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Streaming Disconnection:&lt;/strong&gt; Handle SSE reconnection with exponential backoff&lt;/li&gt;
            &lt;/ol&gt;

            &lt;h4&gt;9. Interview Discussion Points&lt;/h4&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;strong&gt;Statistical Significance:&lt;/strong&gt; How to determine when an experiment has enough data to draw conclusions&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Consistent Bucketing:&lt;/strong&gt; Why murmurhash ensures same user always gets same variant&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Server vs Client Evaluation:&lt;/strong&gt; Trade-offs between evaluating flags on server (secure) vs client (fast)&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Flag Debt:&lt;/strong&gt; Strategies for tracking and removing flags after experiments conclude&lt;/li&gt;
                &lt;li&gt;&lt;strong&gt;Guardrail Metrics:&lt;/strong&gt; Monitoring for negative impact even when primary metric improves&lt;/li&gt;
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

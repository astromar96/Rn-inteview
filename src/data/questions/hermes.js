// Hermes Interview Questions
export const hermesQuestions = [
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
];

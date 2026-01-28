// Real-World Scenarios Interview Questions
export const realWorldScenariosQuestions = [
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
];

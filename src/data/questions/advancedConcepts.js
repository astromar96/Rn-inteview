// Advanced Concepts Interview Questions
export const advancedConceptsQuestions = [
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
];

// Expo Interview Questions
export const expoQuestions = [
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
];

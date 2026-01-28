// Native Modules Interview Questions
export const nativeModulesQuestions = [
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
];

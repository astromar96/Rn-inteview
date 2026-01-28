// Accessibility Interview Questions
export const accessibilityQuestions = [
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

// Styling & UI Interview Questions
export const stylingUIQuestions = [
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
];

// TypeScript Interview Questions
export const typeScriptQuestions = [
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
];

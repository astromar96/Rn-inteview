// Architecture Interview Questions
export const architectureQuestions = [
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
];

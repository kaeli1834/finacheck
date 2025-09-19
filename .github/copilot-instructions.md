# FinaCheck - Copilot Development Instructions

This is a Next.js/TypeScript web application for calculating student funding eligibility in Belgium. It features a multi-step form interface with real-time validation and client-side storage capabilities.

## Code Standards & Development Flow

### Required Before Each Commit
- Run `npm run lint` to ensure code quality and catch issues early
- Ensure TypeScript compilation passes: `npm run build --turbopack`
- Test validation logic: `npm run test:validation`
- Follow established component architecture patterns

### Development Commands
- **Development**: `npm run dev` (with Turbopack for fast builds)
- **Build**: `npm run build --turbopack` (production build)
- **Start**: `npm run start` (production server)
- **Linting**: `npm run lint` (ESLint with Next.js config)
- **Validation Testing**: `npm run test:validation`

## Repository Architecture

### Core Application Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # Server-side API endpoints
│   ├── calc/              # Multi-step calculation form
│   ├── privacy/           # Privacy policy page
│   └── mentions-legales/  # Legal mentions page
├── components/            # React components
│   ├── form/             # Reusable form components
│   ├── parcours/         # Academic path specific components
│   └── *.tsx             # Shared UI components (Navbar, Button)
├── hooks/                # Custom React hooks
├── lib/                  # Core utilities and configurations
├── utils/                # Business logic utilities
├── types/                # TypeScript type definitions
└── data/                 # Static configuration data
```

### Key Files & Responsibilities

**Core Application**
- `src/app/calc/page.tsx` - Main multi-step form page with form state management
- `src/app/api/calc/` - Server-side calculation endpoints and validation contracts

**Component Architecture**
- `src/components/form/` - Generic, reusable form components (RadioButtonGroup, FieldGroup, CreditFields)
- `src/components/parcours/` - Domain-specific academic path components
- `src/components/` - Shared UI components (Navbar, StorageModeWarning, ProgressIndicator)

**Core Logic**
- `src/hooks/useParcours.ts` - Academic path CRUD operations and form management
- `src/hooks/useFieldWatch.ts` - Optimized form field watching and validation
- `src/hooks/useCookieConsent.ts` - Privacy compliance management
- `src/lib/clientStorage.ts` - Privacy-compliant storage abstraction (cookies/sessionStorage/memory)
- `src/utils/validation.ts` - Form validation rules and business logic
- `src/utils/parcoursUtils.ts` - Academic path helper functions

**Configuration & Types**
- `src/types/parcours.ts` - Academic path and form type definitions
- `src/data/formOptions.ts` - Form options and static configurations

## Architecture Patterns

### Component Design Principles
1. **Atomic Design**: Components organized from generic (`form/`) to specific (`parcours/`)
2. **Feature-based Organization**: Related components grouped by domain
3. **Single Responsibility**: Each component has one clear purpose
4. **Composition over Inheritance**: Use children props and component composition

### Form Management Strategy
- **react-hook-form** with **zod** validation schemas for type-safe form handling
- Multi-step form with conditional field rendering based on user selections
- Real-time validation with immediate user feedback
- Persistent state using privacy-compliant client-side storage
- Progressive validation (validate per-step, not just on submit)

### State Management
- **Form State**: react-hook-form with custom hooks for complex form logic
- **UI State**: React hooks with context only when needed for cross-component state
- **Storage**: Abstracted client storage with fallback strategies (cookie → session → memory)

## Development Guidelines

### React/Next.js Best Practices

1. **TypeScript First**
   - Use strict TypeScript - avoid `any` types unless absolutely necessary
   - Define proper interfaces/types before implementation
   - Leverage TypeScript for compile-time validation

2. **Next.js App Router Conventions**
   - Use Server Components by default
   - Client Components (`"use client"`) only when needed for interactivity
   - Follow Next.js routing conventions for pages and API routes
   - Implement proper error boundaries and loading states

3. **Performance & Accessibility**
   - Optimize for Core Web Vitals and lighthouse scores
   - Include proper ARIA attributes and semantic HTML
   - Use React.memo() and useMemo() judiciously for performance
   - Implement proper code splitting and lazy loading

### Component Development

1. **Structure & Organization**
   - Keep components focused and small (prefer ~100 lines max)
   - Create generic components in `src/components/form/` for reusable patterns
   - Use TypeScript interfaces defined in `src/types/` for consistency
   - Follow established naming conventions and file organization

2. **Form Components Specifically**
   - All form components should accept common props: `name`, `label`, `error`
   - Use consistent styling with Tailwind classes and theme colors (violet, blue, orange, amber)
   - Implement proper validation feedback and error states
   - Support both controlled and uncontrolled component patterns

3. **Academic Path Components**
   - Components in `parcours/` should handle complex academic year logic
   - Use `useParcours` hook for CRUD operations on academic years
   - Implement conditional rendering based on `cursusType` and other field values
   - Handle "Première inscription" special case logic

### Form & Validation Patterns

1. **Zod Schema Validation**
   - Define validation schemas in `src/app/api/calc/contracts.ts`
   - Use progressive validation per step: `Step1`, `Step2`, etc.
   - Implement custom validation rules with clear error messages
   - Test all validation scenarios with `npm run test:validation`

2. **Form Flow Management**
   - Use `react-hook-form`'s `FormProvider` for nested component access
   - Implement step-by-step validation before allowing navigation
   - Save form state persistently respecting privacy preferences
   - Provide clear progress indicators and user feedback

3. **Field Watching & Dependencies**
   - Use `useFieldWatch` hook for optimized field watching
   - Implement conditional field rendering based on other field values
   - Handle dynamic field addition/removal (especially for academic years)
   - Validate field dependencies and relationships

### Privacy & Compliance

1. **Storage Strategy**
   - Respect user cookie consent preferences before using cookies
   - Fallback strategy: cookies → sessionStorage → memory-only
   - Use `canUseCookies()` check before any persistent storage
   - Clear user data appropriately when consent is withdrawn

2. **Data Handling**
   - Only collect and store necessary form data
   - Implement data minimization principles
   - Provide clear privacy documentation and user controls
   - Handle storage failures gracefully with fallbacks

### Styling & Design System

1. **Tailwind CSS Patterns**
   - Use consistent design tokens and color schemes
   - Implement dark mode support throughout the application
   - Follow responsive design principles (mobile-first approach)
   - Maintain design consistency through reusable component patterns

2. **Component Themes**
   - Use established color themes: violet (primary), blue, orange, amber
   - Apply consistent spacing, typography, and interaction patterns
   - Ensure proper color contrast and accessibility compliance
   - Use semantic color names in component props

### Testing & Validation

1. **Testing Strategy**
   - Write unit tests for utility functions in `src/utils/`
   - Create validation tests for business logic rules
   - Test form flows and user interaction scenarios
   - Test across different storage modes and privacy settings

2. **Validation Testing**
   - Use `npm run test:validation` to test form validation rules
   - Verify academic path validation logic thoroughly
   - Test edge cases like credit limits, year dependencies
   - Ensure error messages are user-friendly and actionable

## Development Workflow

### Adding New Features

1. **Planning Phase**
   - Document architecture decisions in `ARCHITECTURE.md`
   - Define TypeScript interfaces in appropriate `src/types/` files
   - Plan component hierarchy and data flow

2. **Implementation Phase**
   - Create reusable components following established patterns
   - Extract complex logic into custom hooks
   - Add comprehensive validation rules and error handling
   - Update relevant documentation and type definitions

3. **Testing & Integration**
   - Test validation rules with existing test suite
   - Verify privacy compliance and storage behavior
   - Check accessibility and responsive design
   - Run full lint and build process

### Modifying Existing Features

1. **Impact Analysis**
   - Consider effects on existing form state and validation
   - Check backward compatibility with saved form data
   - Review type safety implications of structural changes
   - Assess privacy implications of data changes

2. **Safe Modification Process**
   - Update TypeScript definitions first
   - Modify validation schemas to match data changes
   - Test with existing saved data scenarios
   - Run comprehensive validation suite after changes

## Common Patterns & Examples

### Creating New Form Components
```typescript
// Define props interface
interface MyFieldProps {
  name: string;
  label: string;
  error?: string;
  theme?: "violet" | "blue" | "orange" | "amber";
}

// Implement with proper validation and styling
export function MyField({ name, label, error, theme = "violet" }: MyFieldProps) {
  const { register } = useFormContext();
  
  return (
    <FieldGroup label={label} error={error} theme={theme}>
      <input
        {...register(name)}
        className={`form-input theme-${theme}`}
      />
    </FieldGroup>
  );
}
```

### Academic Path Validation
```typescript
// Use existing validation utilities
import { validateParcoursField } from "@/utils/validation";

// Validate academic year fields
const validation = validateParcoursField(fieldData);
if (!validation.isValid) {
  // Handle validation errors
  console.log("Missing fields:", validation.missingFields);
}
```

### Storage with Privacy Compliance
```typescript
// Always check consent before storage
import { canUseCookies } from "@/lib/cookies";
import { saveFormData, loadFormData } from "@/lib/clientStorage";

// Save form data respecting privacy
if (canUseCookies()) {
  saveFormData(formData);
}
```

## Performance Considerations

- Leverage Next.js App Router for optimal loading and SSR
- Use Turbopack for fast development builds
- Implement code splitting for large form components
- Optimize images and static assets in `public/`
- Monitor Core Web Vitals and performance metrics
- Use proper caching strategies for API endpoints

## Key Reminders

- **Always run linting and build before committing**
- **Test validation scenarios thoroughly**
- **Respect user privacy preferences for data storage**
- **Follow established component patterns and naming conventions**
- **Keep components focused and maintainable**
- **Document complex business logic and validation rules**
- **Consider accessibility in all UI components**
- **Test across different browser environments and storage modes**
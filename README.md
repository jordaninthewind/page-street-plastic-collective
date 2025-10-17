 # Page Street Plastic Collective

 ### Revision October 17, 2025

## Project Overview
The **Page Street Plastic Collective** is a React-based web application built with Vite, currently focusing on addressing the problem of stolen drain pipe covers in San Francisco. The app educates users about the issue and promotes community solutions.

## Technology Stack
- **Frontend Framework**: React 18.3.1 with JSX
- **Build Tool**: Vite 7.0.0
- **UI Library**: Material-UI (MUI) 7.1.2 with Emotion styling
- **Analytics**: PostHog for user tracking, Vercel Analytics
- **3D Viewer**: react-stl-viewer for 3D model display
- **Backend Integration**: Supabase for data persistence

## Directory Structure
page-street-plastic-collective/
├── public/ # Static assets
│ ├── sewer-cover-type-1.jpg # Images for the application
│ ├── uncovered-sewer-cap-type-1.jpg
│ ├── uncovered-sewer-cap-type-1-a.jpg
│ └── vite.svg
├── src/ # Source code
│ ├── components/ # Reusable UI components
│ │ ├── index.js # Component exports
│ │ ├── Title.jsx # Animated title component
│ │ ├── Title.css # Title styling
│ │ └── ThemeExample.jsx # Theme demonstration
│ ├── containers/ # Layout and container components
│ │ ├── index.js # Container exports
│ │ ├── Layout.jsx # Main app layout wrapper
│ │ ├── Layout.css # Layout styling
│ │ └── Section.jsx # Reusable section wrapper
│ ├── sections/ # Page sections/components
│ │ ├── index.js # Section exports
│ │ ├── Contact.jsx # Contact information
│ │ ├── Contact.css # Contact styling
│ │ ├── CoverTheCity.jsx # City coverage section
│ │ ├── CoverTheCity.css # City coverage styling
│ │ ├── Map.jsx # Interactive map component
│ │ ├── Map.css # Map styling
│ │ ├── Model3D.jsx # 3D model viewer
│ │ ├── Model3D.css # 3D model styling
│ │ ├── Partners.jsx # Partners section
│ │ ├── Partners.css # Partners styling
│ │ ├── Privacy.jsx # Privacy policy
│ │ ├── Privacy.css # Privacy styling
│ │ ├── Problem.jsx # Problem description
│ │ ├── Problem.css # Problem styling
│ │ ├── SocialLinks.jsx # Social media links
│ │ ├── Solution.jsx # Solution presentation
│ │ ├── Solution.css # Solution styling
│ │ ├── SupportUs.jsx # Support section
│ │ └── SupportUs.css # Support styling
│ ├── services/ # API and external services
│ │ └── index.js # Service functions (Supabase integration)
│ ├── theme/ # Material-UI theme configuration
│ │ ├── index.js # Main theme file
│ │ ├── README.md # Theme documentation
│ │ └── utils.js # Theme utilities
│ ├── assets/ # Application assets
│ │ ├── draINvader.png # Custom graphics
│ │ └── react.svg # React logo
│ ├── App.jsx # Main application component
│ ├── main.jsx # Application entry point
│ └── index.css # Global styles
├── package.json # Dependencies and scripts
├── vite.config.js # Vite configuration
├── jsconfig.json # JavaScript configuration
├── eslint.config.js # ESLint configuration
└── README.md # Project documentation


## Key Architecture Patterns

### Component Organization
- **Components**: Reusable UI elements (`Title`, `ThemeExample`)
- **Containers**: Layout and structural components (`Layout`, `Section`)
- **Sections**: Page-specific content sections (all sections in `/sections/`)

### Import Aliasing
The project uses `@app` as an alias for the `src` directory, configured in `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@app': '/src'
  }
}
```

### Theme System
- Centralized Material-UI theme in `/src/theme/index.js`
- Custom color palette focused on environmental themes
- Comprehensive typography and component styling
- Custom properties for plastic types and environmental impact

### Analytics Integration
- PostHog for user behavior tracking
- Vercel Analytics for performance monitoring
- Automatic page view tracking in the Layout component

## Application Flow

### Entry Point (`main.jsx`)
```javascript
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### Main App Structure (`App.jsx`)
The app follows a linear section-based layout:
1. **Problem** - Describes the drain cover theft issue
2. **Solution** - Presents the community solution
3. **Model3D** - Interactive 3D model viewer
4. **Map** - Geographic visualization
5. **Partners** - Community partners
6. **CoverTheCity** - City-wide coverage initiative
7. **Contact** - Contact information
8. **SupportUs** - Support and donation section
9. **SocialLinks** - Social media integration
10. **Privacy** - Privacy policy

### Layout Wrapper (`Layout.jsx`)
- Provides Material-UI theme context
- Handles PostHog analytics initialization
- Renders the animated title
- Wraps all sections in a vertical stack

## Styling Approach

### Material-UI Integration
- Comprehensive theme customization
- Component-specific style overrides
- Consistent spacing and typography

### CSS Modules
- Each component has its own CSS file
- Scoped styling for component-specific needs
- Global styles in `index.css`

### Responsive Design
- Material-UI breakpoint system
- Mobile-first approach
- Flexible layout components

## Data Management

### Services Layer (`/src/services/`)
- Supabase integration for backend communication
- Environment variable configuration for API endpoints
- Message saving functionality for contact forms

### Environment Variables
- `VITE_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `VITE_PUBLIC_POSTHOG_HOST` - PostHog host URL
- `VITE_REACT_APP_SAVE_ENDPOINT_URL` - Supabase endpoint
- `VITE_REACT_APP_AUTHORIZATION_TOKEN` - Supabase auth token

## Development Workflow

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality
- ESLint configuration for React best practices
- TypeScript-like strict checking in `jsconfig.json`
- Consistent code formatting and linting rules

## Key Features

### Interactive 3D Model
- Uses `react-stl-viewer` for 3D model display
- Likely shows drain cover designs or solutions

### Geographic Mapping
- Interactive map component for location-based information
- Possibly shows affected areas or coverage zones

### Community Engagement
- Contact forms with Supabase backend
- Social media integration
- Support and donation functionality

### Educational Content
- Problem explanation with visual aids
- Solution presentation
- Partner showcase

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Variables section)
4. Start development server: `npm run dev`
5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Contributing

This project focuses on addressing the drain cover theft problem in San Francisco through community engagement and education. Contributions are welcome to improve the user experience and add new features.

## Implementation Goals
### Interactive map where:
- Users can add pictures of their own prints and covered sewers
- Users can request covers
- Stale data awareness
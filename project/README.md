# SkillSwap Platform

A modern, full-featured skill exchange platform built with React, TypeScript, and Tailwind CSS. Users can list skills they offer, request skills in return, and manage skill swap requests with a comprehensive rating and feedback system.

## Features

### Authentication & User Management
- User registration and login with secure session management
- Profile management with photo upload, skills, availability, and privacy settings
- Password reset functionality (mock implementation)

### Browse & Search
- Browse users by skill with advanced filtering
- Search by skill, location, and availability status
- Responsive pagination for large user lists
- Modern, card-based user interface

### Swap Request System
- Send, accept, reject, and delete swap requests
- Real-time status tracking (pending, accepted, rejected, completed, cancelled)
- Message system for swap coordination
- Comprehensive swap history and management

### Feedback & Rating System
- Rate and review users after completed swaps
- Display ratings and feedback on user profiles
- Build reputation through community feedback

### Admin Dashboard (Future Enhancement)
- Moderate skill descriptions and user content
- User management and banning capabilities
- Swap request oversight and management
- Platform-wide announcements
- Activity reports and analytics

## Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: Context API with useReducer
- **Styling**: CSS Modules with responsive design
- **Routing**: React Router v6+
- **Icons**: Lucide React
- **Development**: Vite for fast development and building

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Modal, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── user/            # User-specific components
│   ├── swap/            # Swap-related components
│   └── auth/            # Authentication components
├── pages/               # Route-level page components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and constants
├── assets/              # Static assets
└── styles/              # Global styles
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Key Components

### Core UI Components
- **Button**: Flexible button component with multiple variants and sizes
- **Input**: Form input with validation, icons, and accessibility features
- **Modal**: Accessible modal with keyboard navigation
- **Card**: Flexible card container with hover effects
- **Pagination**: Full-featured pagination with page info

### Specialized Components
- **UserCard**: Displays user information, skills, and availability
- **SwapRequestCard**: Shows swap request details with status-based actions
- **Header**: Navigation with responsive mobile menu
- **LoadingSpinner**: Loading states with customizable sizes

## State Management

The application uses React Context API for state management:

- **AuthContext**: User authentication, login/logout, profile updates
- **AppContext**: Swap requests, feedback, announcements, and app-wide state

## API Integration

The application includes mock services that can be easily replaced with real API calls:

- **userService**: User search, profile management, feedback
- **swapService**: Swap request CRUD operations
- **authService**: Authentication and session management

## Responsive Design

The platform is fully responsive with:
- Mobile-first CSS approach
- Breakpoints for mobile, tablet, and desktop
- Touch-friendly interfaces on mobile devices
- Optimized navigation for all screen sizes

## Accessibility Features

- ARIA labels and roles for screen readers
- Keyboard navigation support
- High contrast color schemes
- Focus management for modals and navigation
- Semantic HTML structure

## Testing

The project includes test utilities and examples:

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

Example test files are provided for components and hooks.

## Customization

### Styling
- Modify CSS modules in `src/styles/` for component-specific styles
- Update color scheme in CSS custom properties
- Adjust responsive breakpoints in component CSS

### Mock Data
- Update mock data in `src/services/` files
- Add new user profiles, skills, and swap requests
- Modify API response structures

### Features
- Add new skill categories in `src/utils/constants.ts`
- Extend user profile fields in type definitions
- Create additional swap status types

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting platform

3. Configure environment variables for production API endpoints

4. Set up proper routing for single-page application

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Real-time messaging system
- Video call integration for skill sessions
- Advanced search with skill-level filtering
- Mobile application development
- Integration with external learning platforms
- Skill verification system
- Community forums and discussions
- Advanced analytics and reporting
# IBM Cloud Dashboard

A fully functional and clickable IBM Cloud dashboard built with React and IBM's Carbon Design System, based on the Figma design at https://viewer-pleat-13031451.figma.site/

## Features

✅ **Complete IBM Cloud Dashboard UI** including:
- Header with account dropdown, support, manage, and notification actions
- Left sidebar navigation with project and resource management
- Welcome section with personalized greeting
- Status cards for Issues, Cloud incidents, and Maintenance
- AI-powered search input with voice and send actions
- Information cards (New features, Promotions, News, Learning)
- Shortcuts grid with service icons
- Recently visited resources list
- Recent chats sidebar

✅ **Built with Carbon Design System**:
- Carbon React components
- Carbon design tokens for consistent styling
- Carbon icons and pictograms
- Responsive layout
- Accessible components

## Technologies Used

- **React 19** with TypeScript
- **Carbon Design System** (@carbon/react, @carbon/styles, @carbon/icons-react)
- **SASS** for styling
- **Create React App** for project setup

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd ibm-cloud-dashboard
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000) (or port 3001 if 3000 is in use).

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` directory.

## Project Structure

```
ibm-cloud-dashboard/
├── public/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.scss         # Application styles with Carbon tokens
│   ├── index.tsx        # Application entry point
│   ├── index.css        # Global styles
│   └── ...
├── package.json
└── README.md
```

## Key Components Used

### Carbon Components
- **Header** - Top navigation bar
- **SideNav** - Left sidebar navigation
- **Search** - Search input fields
- **Tile** - Card components for information display
- **Button** - Action buttons
- **Tag** - Status indicators
- **StructuredList** - Recently visited resources table
- **Theme** - Carbon theming system

### Carbon Icons
- Notification, UserAvatar, Switcher
- Home, Catalog, Activity, FolderOpen, List
- ChevronRight, Microphone, SendAlt
- Cube, Code, WatsonHealth3DCursor, Gateway
- DataBase, VirtualMachine, Network_3
- WarningAlt, Misuse

## Customization

### Changing Theme
The application uses the Carbon "white" theme by default. To change it, modify the `theme` prop in [`App.tsx`](src/App.tsx:48):

```tsx
<Theme theme="g10"> {/* Options: white, g10, g90, g100 */}
```

### Styling
All styles are in [`App.scss`](src/App.scss:1) using Carbon design tokens for consistency. Modify spacing, colors, and typography using Carbon's token system.

### Adding Functionality
The current implementation includes the UI structure. To add functionality:
1. Add state management (React Context, Redux, etc.)
2. Connect to backend APIs
3. Implement navigation routing
4. Add authentication

## Features Implemented

- ✅ Responsive layout
- ✅ Carbon Design System integration
- ✅ All UI components from Figma design
- ✅ Clickable elements with hover states
- ✅ Accessible components
- ✅ Clean, maintainable code structure

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.

## Acknowledgments

- IBM Carbon Design System
- Figma design reference: https://viewer-pleat-13031451.figma.site/

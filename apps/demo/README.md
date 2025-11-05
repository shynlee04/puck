# Puck Demo - Visual Page Builder

> 🎨 **Drag-and-drop visual editor for React** - A fully functional demo showcasing Puck's capabilities with Next.js 15 and App Router.

## ✨ Features

### 🏗️ Core Functionality
- **Visual Editor**: Drag-and-drop interface for building pages
- **11 Pre-built Components**: Ready-to-use layout and content components
- **Component Categories**: Organized component library (Layout, Typography, Actions, Other)
- **Real-time Preview**: Live editing with instant feedback
- **Responsive Design**: Mobile-first components with viewport controls
- **Plugin System**: Extensible with custom plugins (heading analyzer included)

### 🎯 Advanced Features
- **External Data Integration**: Connect components to external APIs
- **Field Transforms**: Dynamic prop modifications
- **Permission System**: Fine-grained access control
- **Custom Fields**: Extensible field types
- **Inline Editing**: Direct text editing in the editor
- **Component Validation**: Built-in prop validation

### 🚀 Technical Stack
- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript** for type safety
- **CSS Modules** for styling
- **@dnd-kit** for drag-and-drop
- **Turborepo** for monorepo management

## 🛠️ Demo Components

### Layout Components
- **Grid**: Responsive grid system (1-12 columns, customizable gaps)
- **Flex**: Flexbox container with alignment controls
- **Space**: Responsive spacing component

### Content Components
- **Heading**: Editable headings with alignment and size options
- **Text**: Rich text content with inline editing
- **Hero**: Featured sections with images, titles, and CTAs
- **Card**: Container components with multiple display modes
- **Button**: Interactive buttons with variants and links
- **Stats**: Statistical data display with customizable items
- **Logos**: Brand logo showcase
- **Template**: Reusable page templates

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/measuredco/puck.git
cd puck

# Install dependencies
yarn install

# Start the demo server
yarn dev
```

The demo will be available at `http://localhost:3001`.

## 🎮 Using the Demo

### 1. View Pages
- Visit `http://localhost:3001` to see the demo homepage
- Navigate to other pages like `/pricing`, `/about`

### 2. Edit Pages
- Add `/edit` to any URL to open the editor
- Example: `http://localhost:3001/edit`
- **Authentication**: Use password `puck-demo-2024` or visit `/login`

### 3. Custom UI Variant
- Visit `/custom-ui/edit` for an alternative editor interface
- Features different sidebar and header layouts

### 4. RSC Demo
- Visit `/rsc` to see server-side rendering in action
- Demonstrates static generation capabilities

## 🔐 Authentication

The demo includes a simple authentication system:

**Demo Password**: `puck-demo-2024`

**Access Methods**:
1. Direct URL: `http://localhost:3001/edit?password=puck-demo-2024`
2. Login page: Visit `/login` and enter the password
3. Session cookie: Once logged in, you can access edit routes for 24 hours

**Production Note**: Replace this demo authentication with a proper solution like NextAuth.js, Clerk, or Auth0.

## 🎨 Component Customization

### Adding Custom Components

1. **Create Component**:
```bash
# Create new component folder
mkdir -p apps/demo/config/blocks/MyComponent
```

2. **Implement Component**:
```typescript
// apps/demo/config/blocks/MyComponent/index.tsx
import React from "react";
import { ComponentConfig } from "@/core";

export type MyComponentProps = {
  title: string;
  description: string;
};

export const MyComponent: ComponentConfig<MyComponentProps> = {
  label: "My Component",
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
  },
  defaultProps: {
    title: "Hello World",
    description: "This is my custom component",
  },
  render: ({ title, description }) => (
    <div style={{ padding: "20px", border: "2px dashed #ccc" }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
};
```

3. **Register Component**:
```typescript
// apps/demo/config/index.tsx
import { MyComponent } from "./blocks/MyComponent";

export const conf: UserConfig = {
  // ... existing config
  components: {
    // ... existing components
    MyComponent,
  },
  categories: {
    custom: {
      title: "Custom",
      components: ["MyComponent"],
    },
  },
};
```

### Styling Components

Components use CSS Modules for styling:

```css
/* apps/demo/config/blocks/MyComponent/styles.module.css */
.container {
  padding: 20px;
  border: 2px dashed #ccc;
  background: #f9f9f9;
}

.title {
  color: #333;
  margin-bottom: 10px;
}
```

```typescript
// In your component
import styles from "./styles.module.css";

render: ({ title, description }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    <p>{description}</p>
  </div>
)
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DATA_DOMAIN=your-domain.com

# Demo Authentication
DEMO_PASSWORD=puck-demo-2024
NEXT_PUBLIC_DEMO_PASSWORD=puck-demo-2024

# Database (Production)
# DATABASE_URL=postgresql://...
# NEXTAUTH_SECRET=your-secret-key
# NEXTAUTH_URL=https://your-domain.com
```

### Component Categories

Components are organized into categories in `apps/demo/config/index.tsx`:

```typescript
categories: {
  layout: {
    components: ["Grid", "Flex", "Space"],
  },
  typography: {
    components: ["Heading", "Text"],
  },
  interactive: {
    title: "Actions",
    components: ["Button"],
  },
  other: {
    title: "Other",
    components: ["Card", "Hero", "Logos", "Stats", "Template"],
  },
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Deploy to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Use these build settings:
  - **Build Command**: `yarn build:demo`
  - **Output Directory**: `apps/demo/.next`
  - **Install Command**: `yarn install`

3. **Environment Variables**:
```
DEMO_PASSWORD=puck-demo-2024
NEXT_PUBLIC_DEMO_PASSWORD=puck-demo-2024
```

📖 **Full Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📱 Mobile Responsiveness

All components are built mobile-first:

- **Responsive Grid**: Automatic column adjustment based on viewport
- **Flexible Typography**: Scalable text sizes
- **Touch Controls**: Mobile-friendly drag-and-drop
- **Viewport Controls**: Test different screen sizes in the editor

## 🔌 Plugin System

The demo includes plugins for enhanced functionality:

### Heading Analyzer Plugin
Analyzes document structure for WCAG 2.1 compliance:
```typescript
import headingAnalyzer from "@/plugin-heading-analyzer/src/HeadingAnalyzer";

<Puck
  config={config}
  plugins={[headingAnalyzer]}
  // ... other props
/>
```

### Custom Plugins
Create your own plugins:
```typescript
const myPlugin = {
  // Plugin implementation
};
```

## 🗄️ Data Management

### Current Storage
- **Demo Mode**: Uses browser localStorage
- **Data Format**: JSON structure
- **Persistence**: Session-based

### Production Setup
Replace localStorage with your preferred database:

```javascript
// Example API integration
const savePage = async (path: string, data: UserData) => {
  const response = await fetch('/api/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, data })
  });
  return response.json();
};
```

**Database Options**:
- PostgreSQL with Vercel Postgres
- MongoDB with Atlas
- Supabase
- PlanetScale

## 🎯 Use Cases

### Content Teams
- **Marketing Pages**: Update landing pages without developer involvement
- **Campaign Pages**: Create promotional pages quickly
- **A/B Testing**: Test different page layouts
- **Content Management**: Manage website content visually

### Development Teams
- **Component Libraries**: Showcase reusable components
- **Design Systems**: Implement design system visually
- **Rapid Prototyping**: Build page mockups quickly
- **Client Demos**: Interactive client presentations

### Product Teams
- **Documentation**: Create and maintain documentation pages
- **Product Tours**: Build interactive product tours
- **Feature Announcements**: Create feature announcement pages
- **User Guides**: Build step-by-step guides

## 🐛 Troubleshooting

### Common Issues

**Build Fails**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
yarn install
yarn build
```

**Components Not Loading**:
- Check component exports in `config/index.tsx`
- Verify TypeScript types
- Check console for errors

**Authentication Issues**:
- Clear browser cookies
- Verify environment variables
- Check middleware configuration

**Performance Issues**:
- Use Chrome DevTools for performance profiling
- Check bundle size with `yarn analyze`
- Optimize images and assets

## 📚 Resources

- **Puck Documentation**: [puckeditor.com/docs](https://puckeditor.com/docs)
- **GitHub Repository**: [github.com/measuredco/puck](https://github.com/measuredco/puck)
- **Community**: [GitHub Discussions](https://github.com/measuredco/puck/discussions)
- **Issues**: [GitHub Issues](https://github.com/measuredco/puck/issues)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

**Built with ❤️ by the Measured team**

Enjoy building with Puck! 🚀
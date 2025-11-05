# Puck Demo - Vercel Deployment Guide

This guide will help you deploy the Puck page builder demo to Vercel with all features properly configured.

## 🚀 Quick Deploy to Vercel

### 1. Push to GitHub

First, ensure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "feat: prepare demo for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Configure the following:

#### Build Settings
- **Build Command**: `yarn build:demo`
- **Output Directory**: `apps/demo/.next`
- **Install Command**: `yarn install`

#### Environment Variables
Add these environment variables in your Vercel dashboard:

```env
# Demo Authentication (Required)
DEMO_PASSWORD=puck-demo-2024
NEXT_PUBLIC_DEMO_PASSWORD=puck-demo-2024

# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DATA_DOMAIN=your-domain.com
```

### 3. Deploy

Click "Deploy" and wait for the build to complete. Your Puck demo will be live!

## 📋 Pre-Deployment Checklist

### ✅ Features Configured

- **[x] Next.js 15 with App Router**: Latest Next.js with optimal configuration
- **[x] 11 Pre-built Components**: All components working and tested
- **[x] Drag & Drop Editor**: Full visual editing capabilities
- **[x] Component Categories**: Organized component library
- **[x] Responsive Design**: Mobile-friendly components
- **[x] Plugin Integration**: Heading analyzer plugin included
- **[x] Custom UI Variant**: Alternative editor interface
- **[x] RSC Support**: React Server Components demo
- **[x] Authentication**: Demo auth for edit routes
- **[x] SEO Optimized**: Proper meta tags and structure
- **[x] Performance**: Optimized build and static generation

### 🔐 Authentication

The demo includes a simple authentication system for edit routes:

- **Public Routes**: All pages are publicly viewable
- **Protected Routes**: Routes ending in `/edit` require authentication
- **Demo Password**: `puck-demo-2024`
- **Access Method**: Append `?password=puck-demo-2024` to any edit URL or login via `/login`

**Production Recommendation**: Replace the demo authentication with a proper solution like:
- [NextAuth.js](https://next-auth.js.org/)
- [Clerk](https://clerk.com/)
- [Auth0](https://auth0.com/)

### 🗄️ Data Persistence

**Current**: Uses localStorage for demo purposes
**Production**: Replace with your preferred database:

```javascript
// Example: Replace localStorage in use-demo-data.ts
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
- Your existing database

## 🎨 Demo Features

### 1. Main Editor (`/edit`)
- Full visual editor with drag-and-drop
- Component library with 11 pre-built components
- Real-time preview
- Responsive viewport controls
- Inline editing

### 2. Custom UI (`/custom-ui/edit`)
- Alternative editor interface
- Custom header and sidebar
- Different layout options

### 3. RSC Demo (`/rsc`)
- Server-side rendering example
- Static generation capabilities

### 4. Component Library

#### Layout Components
- **Grid**: Responsive grid with customizable columns
- **Flex**: Flexbox container with alignment controls
- **Space**: Responsive spacing component

#### Content Components
- **Heading**: Editable text headings with alignment
- **Text**: Rich text content with inline editing
- **Hero**: Featured sections with images and CTAs
- **Card**: Container components with styling options
- **Button**: Interactive buttons with variants
- **Stats**: Statistical data display
- **Logos**: Brand logo showcase
- **Template**: Reusable page templates

### 5. Advanced Features
- **External Data Integration**: Hero component with quote selection
- **Field Transforms**: Dynamic prop modifications
- **Permission System**: Fine-grained access control
- **Plugin Architecture**: Extensible with custom plugins

## 🔧 Customization

### Adding Custom Components

1. Create component in `apps/demo/config/blocks/YourComponent/`
2. Export with proper TypeScript types
3. Add to component configuration in `apps/demo/config/index.tsx`

```typescript
// Example: Add your component
import { YourComponent } from "./blocks/YourComponent";

export const conf: UserConfig = {
  // ... existing config
  components: {
    // ... existing components
    YourComponent,
  },
  categories: {
    custom: {
      title: "Custom",
      components: ["YourComponent"],
    },
  },
};
```

### Styling

Components use CSS Modules for styling. Modify styles in each component's `styles.module.css` file.

### Plugins

Add plugins to the editor in `apps/demo/app/[...puckPath]/client.tsx`:

```typescript
<Puck
  config={config}
  data={data}
  plugins={[headingAnalyzer, yourCustomPlugin]}
  // ... other props
/>
```

## 🚀 Production Optimizations

### Performance
- ✅ Optimized images with Next.js Image component
- ✅ Code splitting with dynamic imports
- ✅ CSS-in-JS with CSS Modules
- ✅ Tree-shaking for minimal bundle size
- ✅ Static generation where possible

### Security
- ✅ Content Security Policy headers
- ✅ XSS protection headers
- ✅ Frame protection headers
- ✅ Demo authentication for admin routes

### SEO
- ✅ Automatic meta tag generation
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Open Graph support ready

## 📱 Mobile Responsiveness

All components are built with mobile-first design:
- Responsive grid systems
- Flexible typography
- Touch-friendly interactions
- Proper viewport configurations

## 🔄 CI/CD Integration

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./apps/demo
```

## 🐛 Troubleshooting

### Build Issues
- Ensure `yarn install` runs successfully
- Check TypeScript compilation: `yarn type-check`
- Verify all dependencies are installed

### Runtime Issues
- Check browser console for errors
- Verify environment variables are set
- Test authentication flow

### Performance Issues
- Use Vercel Analytics to monitor performance
- Check bundle size with `yarn analyze`
- Optimize images and assets

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/measuredco/puck/issues)
- **Documentation**: [Puck docs](https://puckeditor.com/docs)
- **Community**: [GitHub Discussions](https://github.com/measuredco/puck/discussions)

## 🎉 Next Steps

1. **Customize**: Add your own components and styling
2. **Integrate**: Connect to your CMS or database
3. **Scale**: Add proper authentication and user management
4. **Monitor**: Set up analytics and error tracking
5. **Extend**: Build custom plugins and field types

Your Puck demo is now ready for production deployment! 🚀
# Josephine Claire Nogot - Portfolio

A cozy, pastel-themed portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Deployment to DigitalOcean App Platform

### Prerequisites
- DigitalOcean account
- GitHub repository connected to DigitalOcean

### Automatic Deployment

This project is configured for automatic deployment to DigitalOcean App Platform:

1. **Connect GitHub Repository**
   - Go to DigitalOcean App Platform
   - Create a new app
   - Connect your GitHub repository: `clairenogot/myportfolio`
   - Select the `main` branch

2. **Configure App Settings**
   - The `.digitalocean/app.yaml` file contains all necessary configuration
   - Build Command: `npm ci && npm run build`
   - Output Directory: `dist`
   - Environment: Node.js 18.18.0

3. **Deploy**
   - Click "Create Resources"
   - DigitalOcean will automatically build and deploy your app
   - Any push to the `main` branch will trigger a new deployment

### Manual Deployment Steps

If you prefer manual configuration:

1. **Environment Variables** (if needed):
   ```
   NODE_VERSION=18.18.0
   ```

2. **Build Settings**:
   - Build Command: `npm ci && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

3. **Run Settings**:
   - HTTP Port: 3000 (for preview)
   - Health Check Path: `/`

## 🛠️ Local Development

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### TypeScript Type Checking

```bash
# Run type checking
npm run lint
```

## 📁 Project Structure

```
myportfolio/
├── .digitalocean/
│   └── app.yaml           # DigitalOcean deployment config
├── public/                # Static assets
│   └── assets/           # Images, SVGs, etc.
├── src/
│   ├── components/       # React components
│   ├── sections/         # Page sections
│   ├── games/            # Interactive features
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── main.tsx          # App entry point
│   └── vite-env.d.ts     # TypeScript declarations
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.cjs   # Tailwind CSS config
├── postcss.config.cjs    # PostCSS config
├── tsconfig.json         # TypeScript config
├── .nvmrc                # Node version
└── .node-version         # Node version (alternative)
```

## 🎨 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS 5** - Styling
- **Framer Motion** - Animations
- **Phosphor Icons** - Icon system

## 🔧 Configuration Files

### vite.config.ts
- Optimized build settings
- Code splitting for better performance
- Production-ready configuration

### tailwind.config.cjs
- Custom cozy color palette
- Dark mode support
- Custom font configuration

### postcss.config.cjs
- Tailwind CSS integration
- Autoprefixer for browser compatibility

## 📦 Dependencies

### Production Dependencies
- `react` & `react-dom` - UI framework
- `framer-motion` - Animation library
- `phosphor-react` - Icon system

### Development Dependencies
- `vite` - Build tool
- `typescript` - Type checking
- `tailwindcss` - CSS framework
- `@vitejs/plugin-react` - Vite React plugin
- `postcss` & `autoprefixer` - CSS processing

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run build
```

### TypeScript Errors

```bash
# Check for type errors
npm run lint

# Ensure all types are installed
npm install --save-dev @types/react @types/react-dom @types/node
```

### Deployment Issues

- Verify Node.js version matches `.nvmrc` (18.18.0)
- Check build logs in DigitalOcean dashboard
- Ensure all dependencies are in `package.json`
- Verify `dist` folder is generated locally with `npm run build`

## 📝 Notes

- The app uses relative paths for assets
- All routes are handled by the SPA (Single Page Application)
- Dark mode is toggled via CSS class on the `<html>` element
- Sound effects are optional and can be toggled

## 📄 License

Private - All rights reserved

## 👤 Author

**Josephine Claire Nogot**
- Email: nogotjosephineclaire@gmail.com
- LinkedIn: [jclairenogot](https://linkedin.com/in/jclairenogot)

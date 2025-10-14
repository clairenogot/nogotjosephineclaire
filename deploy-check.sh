#!/bin/bash

# Deployment Pre-Check Script
# Run this before deploying to verify everything is ready

echo "🚀 Starting deployment pre-check..."
echo ""

# Check Node version
echo "📦 Checking Node.js version..."
node --version
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "⚠️  node_modules not found. Installing dependencies..."
  npm ci
  echo ""
fi

# Run TypeScript type checking
echo "🔍 Running TypeScript type checking..."
npm run lint
if [ $? -eq 0 ]; then
  echo "✅ TypeScript check passed!"
else
  echo "❌ TypeScript check failed. Please fix errors before deploying."
  exit 1
fi
echo ""

# Test production build
echo "🏗️  Testing production build..."
npm run build
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed. Please fix errors before deploying."
  exit 1
fi
echo ""

# Check if dist directory was created
if [ -d "dist" ]; then
  echo "✅ dist directory created successfully!"
  echo "📊 Build output size:"
  du -sh dist
else
  echo "❌ dist directory not found after build!"
  exit 1
fi
echo ""

# Verify critical files exist in dist
echo "🔍 Verifying critical files..."
critical_files=("dist/index.html" "dist/assets")
for file in "${critical_files[@]}"; do
  if [ -e "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file is missing!"
    exit 1
  fi
done
echo ""

echo "🎉 All pre-checks passed! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Prepare for deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. DigitalOcean will automatically deploy your changes"

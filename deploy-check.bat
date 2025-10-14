@echo off
REM Deployment Pre-Check Script (Windows)
REM Run this before deploying to verify everything is ready

echo Starting deployment pre-check...
echo.

REM Check Node version
echo Checking Node.js version...
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
  echo node_modules not found. Installing dependencies...
  call npm ci
  echo.
)

REM Run TypeScript type checking
echo Running TypeScript type checking...
call npm run lint
if errorlevel 1 (
  echo TypeScript check failed. Please fix errors before deploying.
  exit /b 1
)
echo TypeScript check passed!
echo.

REM Test production build
echo Testing production build...
call npm run build
if errorlevel 1 (
  echo Build failed. Please fix errors before deploying.
  exit /b 1
)
echo Build successful!
echo.

REM Check if dist directory was created
if exist "dist" (
  echo dist directory created successfully!
) else (
  echo dist directory not found after build!
  exit /b 1
)
echo.

REM Verify critical files exist in dist
echo Verifying critical files...
if exist "dist\index.html" (
  echo dist\index.html exists
) else (
  echo dist\index.html is missing!
  exit /b 1
)

if exist "dist\assets" (
  echo dist\assets directory exists
) else (
  echo dist\assets directory is missing!
  exit /b 1
)
echo.

echo All pre-checks passed! Ready for deployment.
echo.
echo Next steps:
echo 1. Commit your changes: git add . ^&^& git commit -m "Prepare for deployment"
echo 2. Push to GitHub: git push origin main
echo 3. DigitalOcean will automatically deploy your changes

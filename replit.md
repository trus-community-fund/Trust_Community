# Trust Community Fund

## Overview
A community fund management application built with Firebase for backend services (authentication, realtime database) and a Node.js/Express server for serving static files and API endpoints.

## Project Structure
- `server.js` - Express server that serves static files and API endpoints
- `index.html` - Main application page
- `user-main.js` - Main JavaScript module for app initialization
- `user-data.js` - Data fetching and processing logic
- `user-ui.js` - UI rendering and interaction logic
- `user-style.css` - Application styles
- `sw.js` - Service worker for PWA functionality
- `api/` - Original Vercel serverless functions (now handled by Express server)

## Environment Variables
The application requires the following environment variables:
- `FIREBASE_API_KEY` - Firebase API key (stored as secret)
- `FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `FIREBASE_DATABASE_URL` - Firebase realtime database URL
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `FIREBASE_APP_ID` - Firebase app ID
- `FIREBASE_MEASUREMENT_ID` - Firebase measurement ID
- `IMGBB_API_KEY` - ImgBB API key (optional, for image hosting)

## Running the Application
The application runs on port 5000 using the Express server:
```
npm start
```

## API Endpoints
- `GET /api/firebase-config` - Returns Firebase configuration
- `GET /api/config` - Returns full configuration including ImgBB

## Recent Changes
- Migrated from Vercel serverless functions to Express.js server for Replit compatibility
- Added proper cache control headers
- Configured for Replit deployment

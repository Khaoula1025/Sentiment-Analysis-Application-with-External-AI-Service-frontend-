# Sentiment Analysis - Frontend

> **🔌 Backend API Repository:** [sentiment-analysis-backend](https://github.com/Khaoula1025/Khaoula1025-Sentiment-Analysis-Application-with-External-AI-Service-backend.git)  
> **📚 Full System Documentation:** See backend repository for complete architecture and system overview

A Next.js web interface for testing and using the Sentiment Analysis API with real-time feedback analysis and JWT authentication.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Pages](#pages)
- [Components](#components)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Running the App](#running-the-app)
- [Docker Deployment](#docker-deployment)
- [Styling](#styling)
- [Testing](#testing)

---

## Overview

This is the frontend interface for the Sentiment Analysis micro-service. It provides a user-friendly way to:
- Authenticate users via JWT
- Submit customer feedback text
- Display sentiment analysis results in real-time
- Handle loading states and errors gracefully

**Prerequisites:** The backend API must be running. See [backend repository](https://github.com/Khaoula1025/Khaoula1025-Sentiment-Analysis-Application-with-External-AI-Service-backend.git) for setup instructions.

---

## Features

✅ User authentication with JWT   
✅ Real-time sentiment analysis  
✅ Visual feedback (positive/negative/neutral indicators)  
✅ Loading states during API calls  
✅ Error handling 
✅ Responsive design  
✅ Protected routes (redirect to login if not authenticated)  
✅ Docker support  

---

## Tech Stack

- **Framework:** Next.js 14
- **Language:** JavaScript / TypeScript (optional)
- **Styling:** Tailwind CSS / CSS Modules
- **HTTP Client:** Fetch API 
- **State Management:** React Hooks (useState, useEffect)
- **Authentication:** JWT stored in localStorage

---

## Project Structure

```
sentiment-analysis-application-with-external-ai-service-frontend-/
├── pages/
│   ├── _app.js              # App wrapper, global styles
│   ├── index.js             # Landing/redirect page
│   ├── login.js             # Login page
│   └── sentiment.js         # Sentiment analysis page
├── components/
│   ├── LoginForm.js         # Login form component
│   ├── SentimentForm.js     # Text input form
│   ├── SentimentResult.js   # Results display
│   ├── Layout.js            # Page layout wrapper
│   └── Navbar.js            # Navigation bar
├── services/
│   └── api.js               # API client functions
├── utils/
│   ├── auth.js              # JWT storage & retrieval
│   └── constants.js         # App constants
├── styles/
│   ├── globals.css          # Global styles
│   └── Home.module.css      # Component styles
├── public/
│   └── favicon.ico
├── .env.local.example       # Example environment variables
├── .gitignore
├── Dockerfile
├── package.json
├── next.config.js
└── README.md
```

---

## Installation

### Prerequisites
- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Setup Steps

**1. Clone the repository:**
```bash
git clone https://github.com/Khaoula1025/Sentiment-Analysis-Application-with-External-AI-Service-frontend-.git
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run development server:**
```bash
npm run dev
```

**4. Open browser:**
```
http://localhost:3000
```

---

## Pages

### 1. `/login` - Authentication Page

**Features:**
- Username and password input fields
- Form validation
- Submit credentials to backend `/login` endpoint
- Store JWT token in localStorage
- Redirect to `/sentiment` on success
- Display error messages for failed login

**Default Credentials (for testing):**
```
Username: test
Password: testtest
```

---

### 2. `/sentiment` - Sentiment Analysis Page

**Features:**
- Protected route (requires valid JWT)
- Text input area for customer feedback
- Submit button to analyze sentiment
- Real-time results display
- Error handling for:
  - Invalid/expired JWT
  - Network errors
  - Empty text input
- Logout functionality

---

## Authentication Flow

### Login Process

```
1. User enters credentials on /login page
   ↓
2. Frontend sends POST to backend /login
   ↓
3. Backend validates credentials
   ↓
4. Backend returns JWT token
   ↓
5. Frontend stores token in localStorage
   ↓
6. Frontend redirects to /sentiment page
```

### Protected Route Access

```
1. User navigates to /sentiment page
   ↓
2. Page checks for JWT in localStorage
   ↓
3. If no token → redirect to /login
   ↓
4. If token exists → allow access
   ↓
5. User submits text for analysis
   ↓
6. Frontend sends request with JWT in header
   ↓
7. Backend validates JWT
   ↓
8. Backend returns sentiment analysis
   ↓
9. Frontend displays results
```
---

## Running the App

### Development Mode

```bash
npm run dev
```
Access at: http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---



### Run Container

```bash
docker run -d \
  --name sentiment-ui \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  sentiment-ui:latest
```

---

## Testing

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should show error)
- [ ] Navigate to /sentiment without login (should redirect)
- [ ] Submit positive text (should show green indicator)
- [ ] Submit negative text (should show red indicator)
- [ ] Submit neutral text (should show gray indicator)
- [ ] Submit empty text (should show validation error)
- [ ] Test with expired JWT (should redirect to login)
- [ ] Logout functionality
- [ ] Responsive design on mobile

### Test Scenarios

**Positive Text:**
```
"This product is absolutely amazing! Best purchase ever!"
Expected: Score 5, Positive ✅
```

**Negative Text:**
```
"Terrible quality. Complete waste of money. Very disappointed."
Expected: Score 1-2, Negative ❌
```

**Neutral Text:**
```
"The product is okay. Nothing special but works fine."
Expected: Score 3, Neutral ⚪
```

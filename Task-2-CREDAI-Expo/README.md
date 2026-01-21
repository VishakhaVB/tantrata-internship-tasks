# CREDAI Pune Property Expo 2026

Welcome to the official repository for the **CREDAI Pune Property Expo 2026** website. This project helps users register for the expo, view event details, and explore property highlights.

![link]([https://credai.org/assets/images/credai-logo.png](https://tantrata-credai-expo.netlify.app/))

## 🚀 Features

-   **Premium UI/UX**: Modern, responsive design with glassmorphism and smooth animations.
-   **5-Step Registration**: Seamless flow (Details -> Mobile OTP -> Email OTP -> Preferences -> Success).
-   **Mock OTP System**: Frontend simulation for Email OTP verification.
-   **Live Map**: Integrated Google Maps for event location.
-   **Fallback Demo Mode**: Automatically switches to mock data if the backend is offline.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3, Vanilla JavaScript (Mock API Support)
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (Local)
-   **Authentication**: JWT (Admin), OTP (User)

## 📦 Installation & Run

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/credai-expo-2026.git
cd credai-expo-2026
```

### 2. Frontend Only (Static Demo)
Simply open `index.html` in your browser.
*Note: It will run in "Demo Mode" if the backend is not running.*

### 3. Full Stack Setup (Local)
**Prerequisites**: Node.js and MongoDB installed.

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/credai-expo
    JWT_SECRET=your_secret_key
    ```

3.  **Start Backend**
    ```bash
    npm start
    ```
    (Or `npm run dev` for development)

4.  **Open Frontend**
    Open `index.html` in your browser. It will automatically connect to `http://localhost:5000`.

## 📂 Project Structure
```
├── backend/            # Express Application
│   ├── config/         # DB Connection
│   ├── controllers/    # Logic for OTP, Reg, Admin
│   ├── models/         # Mongoose Models
│   └── routes/         # API Routes
├── style.css           # Global Styles
├── script.js           # Frontend Logic
└── index.html          # Main Entry Point
```

## 🛡️ License
This project is for educational/demonstration purposes.

## 🌍 Deployment Guide

This project is configured for deployment on **Render (Backend)** and **Netlify (Frontend)**.

### 1. Backend Deployment (Render)
1. Push this repository to GitHub.
2. Log in to [Render](https://dashboard.render.com/) and click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**:
   Go to the "Environment" tab and add:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: A secure random string
   - `FRONTEND_URL`: Your Netlify Frontend URL (e.g., `https://my-expo-app.netlify.app`)
   - `SMTP_HOST`, `SMTP_USER`, etc. (if using Email features)

### 2. Frontend Deployment (Netlify)
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Select your GitHub repository.
4. **Build Settings**:
   - **Base directory**: `/`
   - **Publish directory**: `/` (or leave empty)
   - **Build command**: (leave empty)
5. Click **Deploy**.

**Post-Deployment Configuration**:
- Once deployed, copy your **Render Backend URL** (e.g., `https://my-api.onrender.com`).
- Update `script.js` (Line ~4) in your repository with this URL:
  ```javascript
  const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
      ? 'http://localhost:5000/api' 
      : 'https://YOUR-RENDER-APP.onrender.com/api';
  ```
- Push the change to GitHub (Netlify will auto-redeploy).

### 🌐 Live Demo
- **Frontend**: [Link to your Netlify App]
- **Backend**: [Link to your Render App]

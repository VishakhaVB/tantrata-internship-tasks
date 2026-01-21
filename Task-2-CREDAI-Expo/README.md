# CREDAI Pune Property Expo 2026

Welcome to the official repository for the **CREDAI Pune Property Expo 2026** website. This project helps users register for the expo, view event details, and explore property highlights.

![Expo Banner](https://credai.org/assets/images/credai-logo.png)

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

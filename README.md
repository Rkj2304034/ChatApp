# ChatApp 

A modern real-time messaging platform built using the MERN stack, enabling instant communication, secure authentication, profile management, and media sharing.

---

##  Live Demo

https://chat-app-npll.vercel.app

---

##  Features

### Authentication

* User Registration
* User Login
* Secure Password Hashing
* JWT Authentication
* Cookie-Based Authorization
* Protected Routes

### Real-Time Communication

* Instant Messaging
* Real-Time Updates using Socket.IO
* Online User Detection
* One-to-One Chat

### User Profile

* Update Profile Information
* Profile Picture Upload
* User Search Functionality

### Media Support

* Image Sharing
* Cloudinary Integration
* Optimized Media Storage

---

## 📸 Screenshots

### 💬 Real-Time Chat Interface

![Chat Interface](./screenshot/chat)

### 📁 Multimedia Sharing

![Multimedia Sharing](./screenshot/multidedia)

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* DaisyUI
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Socket.IO
* Multer
* Cloudinary

### Deployment

* MongoDB Atlas
* Render
* Vercel

---

## 🏗️ Architecture

```text
Client (React)
       │
       ▼
Express Server
       │
 ┌─────┴─────┐
 ▼           ▼
MongoDB    Socket.IO
 Atlas      Server
```

---

## 📂 Project Structure

```bash
ChatApp
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── hooks
│   │   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd ChatApp
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=8000

MONGO_URL=your_mongodb_atlas_url

SECRET_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_BACKEND_URL=http://localhost:8000
```

Run Frontend

```bash
npm run dev
```

---

## 🔐 Security Features

* JWT Authentication
* HTTP-Only Cookies
* Password Hashing using bcrypt
* Protected API Routes
* Input Validation

---

## 🎯 What I Learned

Through this project, I gained practical experience with:

* Full Stack Development
* REST APIs
* Authentication & Authorization
* Real-Time Communication
* Redux State Management
* Cloud Storage Integration
* Deployment on Render & Vercel

---

## 🚀 Future Improvements

* Group Chats
* Voice Messages
* Video Calling
* Read Receipts
* Message Reactions
* End-to-End Encryption
* AI Chat Assistant

---

## 👨‍💻 Author

**Rahul Kumar Jha**

GitHub: https://github.com/Rkj2304034

---

## ⭐ Support

If you found this project helpful, consider giving it a star.

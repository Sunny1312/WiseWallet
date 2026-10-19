# 💰 WiseWallet - Your Budgeting Partner

A full-stack personal finance management application built with the MERN stack. Track your income, expenses, and visualize your spending patterns with interactive charts.

![WiseWallet Dashboard](https://img.shields.io/badge/Status-Live-success)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-success)
![Node.js](https://img.shields.io/badge/Node.js-14+-success)
![React](https://img.shields.io/badge/React-18+-blue)

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with password hashing
- **Income & Expense Tracking**: Add, view, and delete financial transactions
- **Category Management**: Organize transactions by customizable categories
- **Interactive Analytics**: 
  - Pie charts showing expense/income breakdown by category
  - Line charts displaying income vs expenses trends over time
  - Real-time balance calculation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RESTful API**: Clean API architecture with 150ms average response time

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library with hooks (useState, useEffect, useContext)
- **React Router DOM** - Client-side routing
- **Chart.js & React-Chartjs-2** - Data visualization
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication tokens
- **bcrypt.js** - Password hashing
- **Express Validator** - Input validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Sunny1312/WiseWallet.git
cd WiseWallet
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
touch .env
```

Add the following to `backend/.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/wisewallet
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

For MongoDB Atlas (cloud database):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/--?retryWrites=true&w=majority
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:5001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on http://localhost:3000

## 📁 Project Structure
```
WiseWallet/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Income.js          # Income transaction schema
│   │   └── Expense.js         # Expense transaction schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── income.js          # Income CRUD routes
│   │   └── expense.js         # Expense CRUD routes
│   ├── .env
│   ├── server.js              # Express app entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/          # Login & Register components
    │   │   ├── Dashboard/     # Dashboard, Forms, Transaction List
    │   │   ├── Charts/        # Pie & Line chart components
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx # Global auth state
    │   ├── utils/
    │   │   └── api.js         # Axios configuration
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Income
- `GET /api/income` - Get all income (protected)
- `POST /api/income` - Create income (protected)
- `DELETE /api/income/:id` - Delete income (protected)
- `GET /api/income/stats` - Get income statistics (protected)

### Expenses
- `GET /api/expense` - Get all expenses (protected)
- `POST /api/expense` - Create expense (protected)
- `DELETE /api/expense/:id` - Delete expense (protected)
- `GET /api/expense/stats` - Get expense statistics (protected)

## 🎨 Features Showcase

### Dashboard Overview
- Real-time balance calculation
- Total income and expenses summary
- Visual breakdown by category

### Income Management
- Add income with title, amount, category, date, and description
- Categories: Salary, Freelance, Business, Investment, Other

### Expense Tracking
- Track expenses across 8 categories
- Categories: Food, Transport, Shopping, Entertainment, Bills, Healthcare, Education, Other

### Analytics
- Pie charts for category-wise distribution
- Line charts showing monthly trends
- Responsive visualizations

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication (30-day expiry)
- Protected API routes with middleware
- Input validation with express-validator
- CORS configuration for secure cross-origin requests

## 🚀 Performance Optimizations

- MongoDB indexing on user and date fields for faster queries
- Parallel data fetching with Promise.all
- React Context API for efficient state management
- Optimized API response times (~150ms average)

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly UI elements
- Smooth animations and transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Surya Sunanda Meesala**
- GitHub: [@Sunny1312](https://github.com/Sunny1312)
- LinkedIn: [surya-sunanda-meesala](https://linkedin.com/in/surya-sunanda-meesala)
- Email: meesalasuryasunanda@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of a learning journey in full-stack development
- Inspired by modern personal finance management needs
- Special thanks to the open-source community

---

**⭐ If you found this project helpful, please consider giving it a star!**

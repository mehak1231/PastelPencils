# 🎨 Pastel Pencils – Aesthetic Stationery Store 🛒

**Pastel Pencils** is a feature-rich, full-stack e-commerce web application designed for lovers of aesthetic stationery. With its pastel-themed UI and seamless user experience, this application enables users to browse, shop, and manage stationery products while offering admin users full control over inventory and orders. This project showcases the application of modern web development tools and practices using the MERN architecture (React.js + Node.js + MySQL via Sequelize).


## 🌟 Project Highlights

- Full-stack e-commerce platform
- Beautiful pastel-themed UI/UX
- Role-based access for users and admins
- Real-time notifications using React Toastify
- PDF invoice generation via PDFKit
- Razorpay payment gateway integration (test mode)
- EmailJS-based contact form with no backend email server
- Fully responsive and scalable codebase


## 🛠️ Tech Stack

| Layer        | Technology Used                                                  |
|--------------|------------------------------------------------------------------|
| **Frontend** | React.js, React Router, Context API, styled-components, Toastify |
| **Backend**  | Node.js, Express.js                                              |
| **Database** | MySQL (Relational DB) with Sequelize ORM                         |
| **Email**    | EmailJS (client-side email service)                              |
| **PDF**      | PDFKit for invoice generation                                    |
| **Payments** | Razorpay Payment Gateway (test mode)                             |


## 🏗️ Project Architecture

The application follows a **layered and modular structure**, separating the frontend and backend for scalability and maintainability:
<pre>
PastelPencils/
├── backend/                 # Backend logic and API
│   ├── controllers/         # Business logic and route handlers
│   ├── models/              # Sequelize models (User, Product, Order, etc.)
│   ├── routes/              # Express route definitions
│   ├── configs/             # Database configuration (e.g., database.js)
│   └── index.js             # Main server entry point

├── frontend/                # React-based frontend
│   └── src/
│       ├── components/      # Reusable UI components (buttons, cards, modals)
│       ├── pages/           # Pages for routing (Home, Cart, Admin, etc.)
│       ├── context/         # Context API for global state management
│       ├── assets/          # Static files (images, icons)
│       └── App.js           # App entry point and routing setup

├── database/                # Database schema and seed files
│   └── pastelpencils.sql    # SQL schema dump (optional)

├── README.md                # Project documentation
└── package.json             # Project metadata and depend
</pre>


## 🎨 GUI Features

### 🏠 Home Page
- Showcases featured stationery categories like pens, sharpeners, notepads, and more.
- Responsive product cards with pastel color themes.
- Quick links to product listings and details.

### 🛍️ Product Listing Page
- Category-wise product browsing with filters.
- Clickable product cards showing name, price, and action buttons.

### 🛒 Cart Page
- Interactive cart with quantity updates.
- Promo code entry.
- Subtotal, discount, and total calculation.

### 💳 Checkout Page
- Collects delivery address, email, and contact number.
- Integrates Razorpay for secure payment processing.

### 📦 Orders Page
- Tabular view of past orders with order ID, items, total, and status.
- Cancel order option for pending orders.
- Download invoice (PDF) for each order.

### 👑 Admin Dashboard
- Admin login page with session authentication.
- Dashboard includes:
  - Add new products (name, description, image, category, price)
  - Delete existing products
  - View all orders
  - Filter/search orders by status or username
  - Download invoices

### 📩 Contact Us
- Interactive contact form using EmailJS to send messages.
- Confirmation popup after message submission.

### 🔐 Authentication
- User signup, login, and logout functionality.
- Email verification optional.
- Password recovery/forgot password support.


## 🔧 Installation & Setup Guide

Follow these steps to set up the project locally on your machine:
### 1️⃣ Clone the Repository

<pre>
git clone https://github.com/yourusername/pastel-pencils.git
cd pastel-pencils
</pre>

### 2️⃣ Backend Setup
<pre>
cd backend
npm install
</pre>

Create a .env file in the backend/ directory and configure your database:
<pre>
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=pastelpencils
</pre>

Run database setup commands:
<pre>
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm start
</pre>


### 3️⃣ Frontend Setup
Open a new terminal and navigate to the frontend:
<pre>
cd frontend
npm install
npm start
</pre>


### 4️⃣ Database Setup (MySQL)
Open MySQL and create a database named pastelpencils.

Optionally import the schema from database/pastelpencils.sql.

## 💳 Payment Integration (Razorpay – Test Mode)
Implemented Razorpay payment gateway on the checkout page.

Accepts secure card input in test mode.

On successful payment:

Stores the payment ID.

Marks the order as paid and confirms it to the user.

## 📄 PDF Invoice Generation
Each order generates a downloadable PDF invoice using PDFKit.

Invoice contains:

Order ID and timestamp

Customer name and address

List of purchased products

Total payable amount

Invoices are downloadable via a button on the Orders page.

## 🔔 Notifications
Integrated React Toastify for real-time toast notifications.

Notifications appear on:

Adding items to cart or wishlist

Successful user login or logout

Placing or cancelling an order

## 💌 Contact via EmailJS
Users can send messages directly from the Contact Us page.

Uses EmailJS, enabling email sending from the frontend without a backend server.

Users receive confirmation after successful submission.

## 🚀 Future Enhancements
✅ Deploy frontend on Vercel, backend on Railway

⭐ Add product ratings and reviews

🔐 Integrate social login (Google, GitHub)

📊 Build admin dashboards and analytics with Chart.js or Recharts

📱 Improve mobile responsiveness across all views

🔔 Add push notifications using OneSignal or Firebase



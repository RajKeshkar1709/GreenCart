# 🌿 GreenCart

GreenCart is a professional, full-stack, eco-conscious e-commerce web application built on the **MERN** stack (MongoDB, Express, React, Node.js). It offers a robust and feature-rich shopping experience for customers looking for organic and eco-friendly products, combined with a comprehensive dashboard for sellers to manage products and orders.

---

## 🚀 Features

### 👤 Customer Experience
* **Dynamic Product Catalog:** Filter products by category, view best sellers, and search with debounced inputs.
* **Product Details:** High-resolution product images, prices, descriptions, and categories.
* **Shopping Cart & Checkout:** Seamlessly add/remove items, adjust quantities, and manage delivery addresses.
* **Stripe Payments:** Fully integrated, secure card processing through Stripe.
* **Real-time Order Tracking:** Customers can view order history and current shipping/delivery status.
* **Elegant Alerts:** Interactive, non-blocking toast notifications using `react-hot-toast`.

### 💼 Seller Dashboard
* **Product Management:** Add new products with image uploads directly from the interface.
* **Seller Inventory:** Track, view, and update list of items currently for sale.
* **Order Fulfilment:** Manage customer orders, update order status (e.g. Processing, Shipped, Delivered).
* **Cloud Storage Integration:** Automated product image uploads to Cloudinary.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19 (Functional Components, Hooks, Context API)
* **Build System:** Vite
* **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
* **Routing:** React Router DOM v7
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast

### Backend
* **Runtime:** Node.js
* **Framework:** Express (MVC architecture)
* **Database:** MongoDB via Mongoose ORM
* **Authentication:** JSON Web Tokens (JWT) & BcryptJS (password hashing)
* **File Uploads:** Multer & Cloudinary
* **Payment Gateway:** Stripe API

---

## 📁 Repository Structure

```directory
GreenCart/
├── Backend/                    # Express Server Codebase
│   ├── configs/                # DB and API Configurations (Cloudinary, DB Connection)
│   ├── controllers/            # Controller logics handling request & response
│   ├── middlewares/            # Auth, Admin and File Upload Middlewares
│   ├── models/                 # Mongoose schemas (User, Product, Order, Address)
│   ├── routes/                 # Express API Endpoint route definitions
│   ├── server.js               # Entry point of the server
│   └── vercel.json             # Backend server deployment configuration
│
└── FrontEnd/                   # React Client Codebase
    ├── public/                 # Static assets
    ├── src/
    │   ├── assets/             # Brand logos & banners
    │   ├── components/         # Reusable UI components (Navbar, Footer, ProductCard, etc.)
    │   ├── context/            # Global React Context providers (Cart, Auth, Shop)
    │   ├── pages/              # Application views (Home, Cart, ProductDetails, etc.)
    │   │   └── seller/         # Seller dashboard components and pages
    │   ├── App.jsx             # Main router and app layout configuration
    │   └── main.jsx            # React root entry point
    └── vercel.json             # Frontend hosting configuration
```

---

## ⚙️ Configuration & Setup

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/RajKeshkar1709/GreenCart.git
cd GreenCart
```

### 2. Configure Backend
Navigate to the `Backend` directory:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and define the following variables:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Cloudinary Credentials (For image storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Keys (For payment gateway)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Seller Credentials (Default admin login details)
SELLER_EMAIL=seller@greencart.com
SELLER_PASSWORD=secure_password
```

Start the Backend development server:
```bash
npm run server
```
*The backend server will run on `http://localhost:4000` (or the PORT defined in your `.env` file).*

### 3. Configure Frontend
Navigate to the `FrontEnd` directory:
```bash
cd ../FrontEnd
npm install
```

Create a `.env` file in the `FrontEnd` directory:
```env
VITE_CURRENCY=$
VITE_BACKEND_URL=http://localhost:4000
```

Start the Frontend dev server:
```bash
npm run dev
```
*The frontend application will boot up at `http://localhost:5173`.*

---

## 🔌 API Endpoints (Quick Reference)

### Authentication / User
* `POST /api/user/register` - Create a new user account
* `POST /api/user/login` - Authenticate a user and issue token
* `POST /api/user/logout` - Clear user session

### Products
* `GET /api/product` - Get all listed products
* `GET /api/product/:id` - Fetch details for a specific product
* `POST /api/product/add` - Add new product (Multer upload to Cloudinary) *(Requires Seller Auth)*
* `DELETE /api/product/:id` - Remove a product *(Requires Seller Auth)*

### Orders & Checkout
* `POST /api/order/place` - Initiate payment session via Stripe
* `POST /api/order/verify` - Confirm Stripe checkout status & save order
* `GET /api/order/userorders` - Get current user's order history
* `GET /api/order/sellerorders` - Fetch all orders *(Requires Seller Auth)*
* `PUT /api/order/status` - Update delivery status of an order *(Requires Seller Auth)*

---

## 🌐 Deployment

The project is pre-configured for seamless deployments on [Vercel](https://vercel.com).
* The **Backend** uses `Backend/vercel.json` to handle routing for serverless execution.
* The **Frontend** uses `FrontEnd/vercel.json` for fallback routing configuration (crucial for React Router client routing).

---

## 📄 License
This project is licensed under the ISC License.

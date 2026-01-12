# GreenLife Organic - Backend

Express.js backend API for GreenLife Organic Store (MVC).

## Setup

```bash
cd backend
npm install
```

## Run

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## Structure (MVC)

- controllers/ — request handlers using models
- models/ — data access and business logic
- routes/ — maps HTTP endpoints to controllers
- data/ — file-based persistence (can swap for DB later)
- server.js — app bootstrap and middleware
- .env — environment configuration

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email
- `POST /api/auth/register` - Register new user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders/user/:userId` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin)

## Data Storage

Data is persisted to `backend/data/storage.json` file.

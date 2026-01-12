# Admin Panel Documentation

## Overview
The Admin Panel allows authorized administrators to manage products in the GreenLife organic store. Admins can perform full CRUD operations: Create, Read, Update, and Delete products.

## Features

### 1. **Admin Dashboard**
- View all products in a table format
- Search products by name
- Real-time statistics:
  - Total number of products
  - Total inventory value
  - Count of low-stock items (< 5 units)
- Quick access to edit and delete products

### 2. **Add Product**
- Create new products with the following fields:
  - Product Name (required)
  - Price in ₹ (required)
  - Category (Vegetables, Fruits, Grains, Dairy, Spices, General)
  - Stock Quantity
  - Description
  - Image URL
  - Image preview before saving

### 3. **Edit Product**
- Update existing products
- All fields are editable
- Image preview functionality
- Real-time validation

### 4. **Delete Product**
- Remove products from inventory
- Confirmation dialog to prevent accidental deletion

## Backend API Endpoints

All admin endpoints require the admin token header: `x-admin-token: admin123`

### Products Management

#### Get All Products
```
GET /api/admin/products
Headers: x-admin-token: admin123
Response: { success: true, products: [...] }
```

#### Create Product
```
POST /api/admin/products
Headers: x-admin-token: admin123
Body: {
  name: string (required),
  price: number (required),
  description: string,
  category: string,
  image: string,
  stock: number
}
Response: { success: true, product: {...} }
```

#### Update Product
```
PUT /api/admin/products/:id
Headers: x-admin-token: admin123
Body: {
  name: string,
  price: number,
  description: string,
  category: string,
  image: string,
  stock: number
}
Response: { success: true, product: {...} }
```

#### Delete Product
```
DELETE /api/admin/products/:id
Headers: x-admin-token: admin123
Response: { success: true, message: "Product deleted successfully" }
```

#### Get Admin Statistics
```
GET /api/admin/stats
Headers: x-admin-token: admin123
Response: {
  success: true,
  stats: {
    totalProducts: number,
    totalValue: number,
    lowStockProducts: [...]
  }
}
```

## Frontend Components

### AdminDashboard.jsx
Main dashboard component showing:
- Product table with search functionality
- Statistics cards
- Edit/Delete action buttons

**File Location:** `frontend/pages/AdminDashboard.jsx`
**Route:** `/admin`

### AddProduct.jsx
Form for creating new products
**File Location:** `frontend/pages/AddProduct.jsx`
**Route:** `/admin/add-product`

### EditProduct.jsx
Form for editing existing products
**File Location:** `frontend/pages/EditProduct.jsx`
**Route:** `/admin/edit-product/:id`

## Frontend API Service

### adminApi.js
Centralized API client for admin operations

**Methods:**
- `getAllProducts()` - Fetch all products
- `createProduct(productData)` - Create new product
- `updateProduct(id, productData)` - Update product
- `deleteProduct(id)` - Delete product
- `getStats()` - Get admin statistics

**File Location:** `frontend/services/adminApi.js`

## Backend Controllers

### adminController.js
Contains all admin business logic:
- `getAllProducts()` - Retrieve all products
- `createProduct()` - Add new product with validation
- `updateProduct()` - Update product with auth check
- `deleteProduct()` - Remove product with auth check
- `getProductStats()` - Calculate inventory statistics

**File Location:** `backend/controllers/adminController.js`

## Backend Routes

### admin.js
Router configuration for all admin endpoints

**Routes:**
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/stats` - Get statistics

**File Location:** `backend/routes/admin.js`

## Styling

### AdminDashboard.css
Styles for:
- Admin header and buttons
- Statistics cards
- Product table
- Search bar
- Responsive design

**File Location:** `frontend/styles/AdminDashboard.css`

### ProductForm.css
Styles for:
- Form layout and inputs
- Image preview section
- Submit/Cancel buttons
- Error messages

**File Location:** `frontend/styles/ProductForm.css`

## Authentication

### Admin Authorization
Currently uses a simple token-based system:
- Admin token: `admin123`
- Passed via header: `x-admin-token`

**For Production:** 
- Implement role-based access control (RBAC)
- Use JWT tokens with role claims
- Store roles in user model

### In Navigation
The admin panel only appears in the navbar if `user.isAdmin` is true.

## Usage

### Access Admin Panel
1. User must be logged in with `isAdmin: true`
2. Admin link appears in navbar (desktop and mobile)
3. Click "Admin" to go to dashboard

### Add New Product
1. Click "+ Add New Product" button
2. Fill in product details
3. Add image URL and preview
4. Click "Add Product"

### Edit Product
1. From dashboard, click "Edit" button on product row
2. Modify desired fields
3. Click "Update Product"

### Delete Product
1. From dashboard, click "Delete" button
2. Confirm deletion in dialog
3. Product is removed

### View Statistics
- Statistics automatically display on dashboard
- Updates in real-time as products are added/removed

## Error Handling

All API responses follow this format:
```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "Error message" }
```

Frontend displays user-friendly error messages:
- Network errors
- Validation errors
- Authorization failures
- Server errors

## Future Enhancements

- [ ] Bulk import/export of products
- [ ] Product categories management
- [ ] Advanced filtering and sorting
- [ ] Stock alerts and notifications
- [ ] Product analytics and reports
- [ ] Image upload instead of URL
- [ ] Role-based permissions
- [ ] Admin activity logging
- [ ] Multi-language support
- [ ] Dark mode for admin panel

## Troubleshooting

### Admin Panel Not Appearing
- Ensure user is logged in
- Check if `user.isAdmin` is true in AppContext
- Verify authentication token is correct

### Products Not Loading
- Check backend is running on port 5000
- Verify admin token in headers
- Check browser console for errors

### Images Not Displaying
- Verify image URL is valid
- Ensure URL is HTTPS or http
- Check CORS settings on image host

### Create/Update Failing
- Check all required fields are filled
- Verify price is a valid number
- Check network tab for API response

## Support
For issues or questions, check:
1. Backend logs for API errors
2. Browser console for frontend errors
3. Network tab in browser dev tools for request/response details

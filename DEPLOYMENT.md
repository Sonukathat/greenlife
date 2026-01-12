# GreenLife Organic - Deployment Guide

## 🔒 Security Checklist (✅ Fixed)

### Before Deployment:

1. **✅ Authentication System**
   - JWT-based authentication implemented
   - Hardcoded admin token removed
   - Proper middleware authentication on all admin routes

2. **✅ Environment Variables**
   - `.env.example` files created for both frontend and backend
   - Sensitive data moved to environment variables

3. **🔐 Required Steps Before Going Live:**

## Backend Setup

1. **Set Environment Variables:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   CORS_ORIGIN=https://your-frontend-domain.com
   JWT_SECRET=generate-a-strong-random-secret-key-here
   NODE_ENV=production
   ```

3. **Generate Strong JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Create Admin User in MongoDB:**
   - Register a normal user through the app
   - Then manually set `isAdmin: true` in MongoDB for that user
   
   ```javascript
   db.users.updateOne(
     { email: "admin@yoursite.com" },
     { $set: { isAdmin: true } }
   )
   ```

5. **Install dependencies:**
   ```bash
   npm install
   ```

6. **Start server:**
   ```bash
   npm start
   ```

## Frontend Setup

1. **Set Environment Variables:**
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```
   VITE_API_URL=https://your-backend-api-url.com/api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment Platforms

### Backend (Recommended: Render / Railway / Fly.io)

**Render.com:**
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `cd backend && npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

**Railway.app:**
1. Create new project
2. Connect GitHub repo
3. Set root directory: `backend`
4. Add environment variables
5. Deploy automatically

### Frontend (Recommended: Vercel / Netlify)

**Vercel:**
1. Import project from GitHub
2. Set root directory: `frontend`
3. Framework preset: Vite
4. Add environment variable: `VITE_API_URL`
5. Deploy

**Netlify:**
1. New site from Git
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`

## 🚨 Security Best Practices

### ✅ Already Implemented:
- JWT token authentication
- Password hashing with bcrypt
- Admin-only routes protected with middleware
- Environment variables for sensitive data

### 📋 Additional Recommendations:

1. **Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```

2. **Helmet.js (Security Headers):**
   ```bash
   npm install helmet
   ```

3. **MongoDB Connection:**
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication
   - Use strong passwords

4. **CORS Configuration:**
   - Update `CORS_ORIGIN` to your actual frontend URL
   - Don't use wildcard (*) in production

5. **HTTPS:**
   - Always use HTTPS in production
   - Most hosting platforms provide free SSL

## Testing After Deployment

1. **Test Regular User Flow:**
   - Register new user
   - Login
   - Browse products
   - Add to cart

2. **Test Admin Flow:**
   - Login with admin account
   - Access /admin route
   - Create/Edit/Delete products
   - Manage categories

3. **Test Security:**
   - Try accessing /admin without login (should redirect)
   - Try accessing /admin as regular user (should show access denied)
   - Try API calls without token (should return 401)

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check `CORS_ORIGIN` in backend `.env`
   - Must match exact frontend URL (no trailing slash)

2. **API Connection Failed:**
   - Verify `VITE_API_URL` in frontend `.env`
   - Check backend is running and accessible

3. **Admin Access Denied:**
   - Verify user has `isAdmin: true` in database
   - Check JWT token is being sent in requests

## Production Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] MongoDB Atlas connection working
- [ ] Environment variables set correctly
- [ ] Admin user created in database
- [ ] JWT_SECRET is strong and unique
- [ ] CORS configured for frontend domain
- [ ] HTTPS enabled on both frontend and backend
- [ ] Tested login/logout flow
- [ ] Tested admin panel access
- [ ] Tested product CRUD operations

## Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify all environment variables are set
4. Check MongoDB connection

---

**Important:** Never commit `.env` files to Git! They should already be in `.gitignore`.

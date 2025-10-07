# Quick Start Guide

## ✅ What Was Fixed

Your project had client and server mixed together. Now they're properly separated:

- **Root**: Only manages running both apps together (optional)
- **Client**: Standalone React app in `client/` folder
- **Server**: Standalone Node.js app in `server1/` folder

## 🚀 How to Run

### Run Client ONLY (No Server)

```bash
cd client
npm start
```

**OR** from root directory:

```bash
npm run client
```

This will:
- ✅ Start ONLY the frontend on http://localhost:3000
- ✅ NOT start the backend server
- ✅ Work independently

### Run Server ONLY

```bash
cd server1
npm run dev
```

**OR** from root directory:

```bash
npm run server
```

### Run Both Together (Optional)

```bash
# From root directory
npm run dev
```

## 📋 First Time Setup

If you haven't installed dependencies yet:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server1
npm install
```

**OR** from root:

```bash
npm run install-all
```

## ⚙️ Environment Variables

### Client (`.env` in `client/` folder)

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

### Server (`.env` in `server1/` folder)

Copy from `.env.example` and fill in your:
- MongoDB URL
- JWT Secret
- Cloudinary credentials
- Email credentials
- Razorpay credentials

## 🔧 What Changed

### Files Modified:
1. ✅ `package.json` (root) - Cleaned up, removed client deps
2. ✅ `client/package.json` - Added all React dependencies
3. ✅ `client/tailwind.config.js` - Created (moved from root)
4. ✅ `client/postcss.config.js` - Created (moved from root)
5. ✅ `client/.env.example` - Created template
6. ✅ `server1/.env.example` - Created template
7. ✅ `README.md` - Updated with new instructions

### New Scripts Available:

**Root directory:**
- `npm run client` - Run frontend only
- `npm run server` - Run backend only
- `npm run dev` - Run both together
- `npm run install-all` - Install all dependencies

**Client directory:**
- `npm start` - Start dev server
- `npm run build` - Build for production

**Server directory:**
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

## ✨ Benefits

1. **Independent Development**: Work on frontend without running backend
2. **Faster Startup**: Only start what you need
3. **Clear Separation**: Each part has its own dependencies
4. **Better Organization**: Standard monorepo structure
5. **Easier Deployment**: Deploy client and server separately

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
cd client
npm install
```

### Client still tries to run server
Make sure you're in the `client/` directory or using `npm run client` from root

### API calls not working
1. Check `client/.env` has `REACT_APP_BASE_URL=http://localhost:4000/api/v1`
2. Make sure server is running on port 4000
3. Check server CORS settings allow `http://localhost:3000`

## 📁 Directory Structure

```
PROJECT - Copy/
├── client/                    # ← Frontend (React)
│   ├── src/
│   ├── public/
│   ├── package.json          # Client dependencies
│   ├── .env                  # Client environment vars
│   └── ...
│
├── server1/                   # ← Backend (Node.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json          # Server dependencies
│   ├── .env                  # Server environment vars
│   └── index.js
│
└── package.json              # Root (optional, for running both)
```

## 🎯 Next Steps

1. ✅ Configuration complete
2. ⏭️ Run `cd client && npm install` if not done
3. ⏭️ Configure `.env` files
4. ⏭️ Test: `cd client && npm start`
5. ⏭️ Verify it runs WITHOUT starting the server

---

**Need help?** Check `SETUP_GUIDE.md` for detailed information.

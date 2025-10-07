# Setup Guide - Client/Server Separation

## What Was Changed

### 1. Root Directory (`package.json`)
- **Before**: Contained all client dependencies and ran both client/server with `npm start`
- **After**: Clean monorepo configuration with only `concurrently` as dependency
- **New Scripts**:
  - `npm run client` - Run frontend only
  - `npm run server` - Run backend only
  - `npm run dev` - Run both (using concurrently)
  - `npm run install-all` - Install all dependencies

### 2. Client Directory (`client/`)
- **Added**: Complete `package.json` with all React dependencies
- **Added**: `tailwind.config.js` - Tailwind CSS configuration
- **Added**: `postcss.config.js` - PostCSS configuration
- **Added**: `.env.example` - Environment variable template

### 3. Server Directory (`server1/`)
- **Added**: `.env.example` - Environment variable template
- **No changes needed**: Already properly configured

## How to Run

### First Time Setup

1. **Install Dependencies**:
   ```bash
   # From root directory
   npm run install-all
   ```

2. **Configure Environment Variables**:
   
   **Client** (`client/.env`):
   ```
   REACT_APP_BASE_URL=http://localhost:4000/api/v1
   ```
   
   **Server** (`server1/.env`):
   - Copy from `.env.example` and fill in your credentials

### Running the Application

#### Option 1: Run Client Only (Your Use Case)
```bash
# From root
npm run client

# OR from client directory
cd client
npm start
```

#### Option 2: Run Server Only
```bash
# From root
npm run server

# OR from server directory
cd server1
npm run dev
```

#### Option 3: Run Both Together
```bash
# From root
npm run dev
```

## What Fixed the Issue

### Problem
When running `npm start` from root, it was trying to run both client and server because:
1. Root `package.json` had `"start": "react-scripts start"`
2. It also had a `"dev"` script with `concurrently` that ran both
3. Client dependencies were in root, not in client folder

### Solution
1. ✅ Separated all client dependencies to `client/package.json`
2. ✅ Moved Tailwind/PostCSS configs to `client/` directory
3. ✅ Updated root scripts to use `cd client && npm start` instead of direct `react-scripts`
4. ✅ Created `.env.example` files for both client and server
5. ✅ Updated README with clear instructions

## Verification

After setup, verify:

1. **Client runs independently**:
   ```bash
   cd client
   npm start
   ```
   Should open http://localhost:3000 WITHOUT starting the server

2. **Server runs independently**:
   ```bash
   cd server1
   npm run dev
   ```
   Should start on http://localhost:4000 WITHOUT starting the client

3. **Both run together** (optional):
   ```bash
   # From root
   npm run dev
   ```
   Should start both in parallel

## File Structure

```
PROJECT - Copy/
├── client/                    # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json          # Client dependencies
│   ├── tailwind.config.js    # Tailwind config
│   ├── postcss.config.js     # PostCSS config
│   ├── .env                  # Client environment variables
│   └── .env.example          # Template
│
├── server1/                   # Backend application
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json          # Server dependencies
│   ├── index.js              # Server entry point
│   ├── .env                  # Server environment variables
│   └── .env.example          # Template
│
├── package.json              # Root (monorepo management)
├── README.md                 # Updated documentation
└── SETUP_GUIDE.md           # This file
```

## Troubleshooting

### Issue: "Module not found" errors
**Solution**: Run `npm install` in the client directory
```bash
cd client
npm install
```

### Issue: Client still tries to run server
**Solution**: Make sure you're running from the client directory or using `npm run client` from root

### Issue: API calls failing
**Solution**: Check `client/.env` has correct `REACT_APP_BASE_URL=http://localhost:4000/api/v1`

### Issue: CORS errors
**Solution**: Server is configured to accept requests from `http://localhost:3000` and `http://localhost:3001`

## Next Steps

1. ✅ Install client dependencies (running now)
2. ⏳ Verify client starts without server
3. ⏳ Test API connectivity with server running separately
4. ⏳ Optional: Clean up old root `node_modules` if needed

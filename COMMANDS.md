# Quick Command Reference

## 🚀 Running the Application

### Frontend Only (Client)
```bash
cd client
npm start
```
**Port:** http://localhost:3000  
**Note:** Use `npm start` NOT `npm run dev`

### Backend Only (Server)
```bash
cd server1
npm run dev
```
**Port:** http://localhost:4000

### Both Together
```bash
# From root directory
npm run dev
```

## 📦 Installation

### First Time Setup
```bash
# Install all dependencies
npm run install-all

# OR install separately
cd client && npm install
cd ../server1 && npm install
```

### Install Client Only
```bash
cd client
npm install
```

### Install Server Only
```bash
cd server1
npm install
```

## 🔧 Configuration

### Create Client .env
```bash
cd client
echo REACT_APP_BASE_URL=http://localhost:4000/api/v1 > .env
```

### Create Server .env
```bash
cd server1
cp .env.example .env
# Then edit .env with your credentials
```

## 🧪 Testing

### Test Client Runs Alone
```bash
cd client
npm start
# Should NOT start server
```

### Test Server Runs Alone
```bash
cd server1
npm run dev
# Should NOT start client
```

### Check Server is Running
```bash
curl http://localhost:4000
# Should return: {"success":true,"message":"Your server is up and running......"}
```

## 🐛 Troubleshooting

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Client
cd client
rm -rf node_modules package-lock.json
npm install

# Server
cd server1
rm -rf node_modules package-lock.json
npm install
```

### Check Port Usage
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Check if port 4000 is in use
netstat -ano | findstr :4000
```

### Kill Process on Port
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 4000
npx kill-port 4000
```

## 📝 Build Commands

### Build Client for Production
```bash
cd client
npm run build
```

### Start Server in Production
```bash
cd server1
npm start
```

## 🔍 Debugging

### Check Environment Variables
```bash
# In client directory
cat .env

# In server directory
cd server1
cat .env
```

### View Client Logs
```bash
cd client
npm start
# Check terminal output
```

### View Server Logs
```bash
cd server1
npm run dev
# Check terminal output
```

## 📊 Useful Scripts

### Root Directory
```bash
npm run client      # Run frontend only
npm run server      # Run backend only
npm run dev         # Run both together
npm run install-all # Install all dependencies
```

### Client Directory
```bash
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
```

### Server Directory
```bash
npm start           # Start production server
npm run dev         # Start dev server with nodemon
```

## 🎯 Common Tasks

### Start Fresh Development Session
```bash
# Terminal 1: Start server
cd server1
npm run dev

# Terminal 2: Start client
cd client
npm start
```

### Update Dependencies
```bash
# Client
cd client
npm update

# Server
cd server1
npm update
```

### Check for Outdated Packages
```bash
# Client
cd client
npm outdated

# Server
cd server1
npm outdated
```

## 💡 Pro Tips

- Use separate terminals for client and server
- Keep server running when developing frontend
- Restart client after `.env` changes
- Use `Ctrl+C` to stop running processes
- Check browser console (F12) for errors
- Use Network tab to debug API calls

---

**Quick Reference for:** StudyNotion Project  
**Last Updated:** 2025-10-08

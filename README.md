# StudyNotion - EdTech Platform

LINK -- https://studynotion-liard-beta.vercel.app/

A full-stack educational technology platform built with React and Node.js.

## Project Structure

```
PROJECT/
├── client/          # React frontend application
├── server1/         # Node.js backend application
└── package.json     # Root package.json for running both apps
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## Installation

### 1. Install Dependencies

From the root directory, install dependencies for both client and server:

```bash
npm run install-all
```

Or install them separately:

```bash
# Install client dependencies
npm run install-client

# Install server dependencies
npm run install-server
```

### 2. Environment Configuration

#### Client Configuration
Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

Edit `client/.env` and set:
```
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

#### Server Configuration
Create a `.env` file in the `server1` directory:

```bash
cd server1
cp .env.example .env
```

Edit `server1/.env` with your credentials:
- MongoDB connection string
- JWT secret
- Cloudinary credentials
- Mail server credentials
- Razorpay credentials

## Running the Application

### Run Both Client and Server (Recommended for Development)

From the root directory:

```bash
npm run dev
```

This will start:
- **Client** on http://localhost:3000
- **Server** on http://localhost:4000

### Run Client Only

```bash
npm run client
```

Or from the client directory:

```bash
cd client
npm start
```

### Run Server Only

```bash
npm run server
```

Or from the server directory:

```bash
cd server1
npm run dev
```

## Available Scripts

### Root Directory

- `npm run dev` - Run both client and server concurrently
- `npm run client` - Run only the client
- `npm run server` - Run only the server
- `npm run install-all` - Install dependencies for both client and server

### Client Directory

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Directory

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Tech Stack

### Frontend
- React 18
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Chart.js
- React Hook Form
- And more...

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (File uploads)
- Razorpay (Payments)
- Nodemailer (Email)

## API Endpoints

The backend API is available at `http://localhost:4000/api/v1`

Main routes:
- `/api/v1/auth` - Authentication
- `/api/v1/profile` - User profiles
- `/api/v1/course` - Course management
- `/api/v1/payment` - Payment processing

## Troubleshooting

### Port Already in Use

If you get a port conflict error:
- Client default port: 3000
- Server default port: 4000

Change the port in the respective `.env` files.

### Module Not Found Errors

Run `npm run install-all` to ensure all dependencies are installed.

### CORS Errors

Ensure the server's CORS configuration includes your client URL (default: http://localhost:3000)

## License

ISC 
"# studynotion" 
"# studynotion" 

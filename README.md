# FlowX Server

Backend API for FlowX — a full-stack expense tracker.

## Stack
- Node.js
- Express.js
- MongoDB (local)

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root:

MONGO_URI=mongodb://localhost:27017/flowx
PORT=5000
CLIENT_URL=http://localhost:5173
APP_PASSWORD=flowx2026

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| POST | `/api/auth/login` | Verify password |

## Note
MongoDB must be running before starting the server.
Windows: `net start MongoDB` (run PowerShell as Administrator)

# FlowX API Documentation

**Version:** 1.0  
**Base URL:** `http://localhost:5000/api`  
**Content-Type:** `application/json`  
**Database:** MongoDB (local) — `mongodb://localhost:27017/flowx`

---

## Authentication

### POST /auth/login
Verify the app password and establish a session.

**Request Body:**
```json
{ "password": "flowx2026" }
```

**Response — 200 OK:**
```json
{ "success": true }
```

**Response — 401 Unauthorized:**
```json
{ "success": false, "message": "Invalid password" }
```

---

## Transactions

### GET /transactions
Fetch all transactions sorted by date descending.

**Response — 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123...",
      "type": "expense",
      "amount": 500,
      "category": "Food & Dining",
      "description": "Zomato order",
      "date": "2026-05-28",
      "isRecurring": false
    }
  ]
}
```

---

### POST /transactions
Create a new transaction.

**Request Body:**
```json
{
  "type": "income" | "expense",
  "amount": 500,
  "category": "Food & Dining",
  "description": "Zomato order",
  "date": "2026-05-28",
  "isRecurring": false
}
```

**Response — 201 Created:**
```json
{ "success": true, "data": { ...transaction } }
```

---

### PUT /transactions/:id
Update an existing transaction by its MongoDB ID.

**URL Param:** `:id` — MongoDB ObjectId of the transaction

**Request Body:**
```json
{
  "type": "income" | "expense",
  "amount": 500,
  "category": "Food & Dining",
  "description": "Zomato order",
  "date": "2026-05-28",
  "isRecurring": false
}
```

**Response — 200 OK:**
```json
{ "success": true, "data": { ...updatedTransaction } }
```

---

### DELETE /transactions/:id
Delete a transaction by its MongoDB ID.

**URL Param:** `:id` — MongoDB ObjectId of the transaction

**Response — 200 OK:**
```json
{ "success": true, "message": "Transaction deleted" }
```

---

## Transaction Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | String | Yes | `"income"` or `"expense"` |
| amount | Number | Yes | Positive number in INR |
| category | String | Yes | Must match a valid category |
| description | String | Yes | Free text description |
| date | String | Yes | Format: `YYYY-MM-DD` |
| isRecurring | Boolean | No | Defaults to `false`. Auto-creates monthly. |

---

## Valid Categories

| Income | Expense |
|--------|---------|
| Salary | Food & Dining |
| Freelance | Transport |
| Investment | Entertainment |
| Business | Shopping |
| Gift | Healthcare |
| Other Income | Utilities |
| | Education |
| | Rent |
| | Other Expense |

---

## Error Responses

| Status Code | Meaning |
|-------------|---------|
| 400 Bad Request | Missing or invalid fields in request body |
| 401 Unauthorized | Wrong password on /auth/login |
| 404 Not Found | Transaction ID does not exist |
| 500 Internal Server Error | Server or database error |

---

*FlowX • Built by Aditya Jaiswal • VIT Vellore • 2026*

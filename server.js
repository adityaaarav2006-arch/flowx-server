const MONGO_URI = "mongodb://localhost:27017/flowx";
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/transactions", require("./routes/transactions"));

app.get("/", (req, res) => {
  res.json({ status: "FlowX API is running 🚀" });
});
app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.APP_PASSWORD) {
    res.json({ success: true, message: "Access granted" });
  } else {
    res.status(401).json({ success: false, message: "Wrong password" });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
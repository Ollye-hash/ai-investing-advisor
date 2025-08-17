const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Placeholder API for Kenyan stocks (replace with NSE API endpoint)
app.get('/api/stocks', async (req, res) => {
  try {
    // Example: Replace this with real NSE API call
    const stocks = [
      { symbol: "SCOM", name: "Safaricom", price: 20.5 },
      { symbol: "KENO", name: "KenolKobil", price: 9.2 },
      { symbol: "EQTY", name: "Equity Bank", price: 45.1 }
    ];
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Recommendation placeholder
app.post('/api/recommend', (req, res) => {
  const { goal, horizon } = req.body;
  let recommendations = [];

  if (horizon === "short-term") {
    recommendations = ["Safaricom", "KenolKobil"];
  } else {
    recommendations = ["Equity Bank", "Safaricom"];
  }

  res.json({
    goal,
    horizon,
    recommendations
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

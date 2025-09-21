// index.js
const express = require('express');
const cors = require('cors');
const scrapeShops = require('./scraper');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/search-shops', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const results = await scrapeShops(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

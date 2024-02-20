const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

dotenv.config();
connectDB();
app.use(cors());

const PORT = process.env.PORT || 4000;


const username = 'BRINDHA'
const password = 'Brindha@1988'


app.get('/deals', async (req, res) => {
  try {
    const body = {
      'source': 'amazon_product',
      'domain': 'com',
      'query': 'deals of the day',
      'parse': true,
      'pages': 1
    };

    const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
      }
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.results || data.results.length === 0) {
      throw new Error('Unexpected API response format');
    }

     const results = data.results[0].content.results.organic;
    
     
     const filteredDeals = results.filter(deal => deal.price_strikethrough);

    const sortedByBestDeal = filteredDeals.sort((b, a) =>
     ((a.price_strikethrough - a.price_strikethrough) / a.price_strikethrough * 100) - 
     ((b.price_strikethrough - b.price_strikethrough) / b.price_strikethrough * 100));
    

    res.send(sortedByBestDeal);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () =>
  console.log(`server Running on ${PORT}`)
);

 
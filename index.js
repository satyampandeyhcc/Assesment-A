const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


const PANTRY_ID = 'ed2a282e-a843-4c5a-8d42-741784311a88';

// Endpoint to add an item to the Pantry
app.post('/add-item', async (req, res) => {
  try {
    const { basketKey, payload } = req.body;
    const response = await axios.post(`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/${basketKey}`, payload);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get an item from the Pantry
app.get('/get-item/:basketKey', async (req, res) => {
  try {
    const basketKey = req.params.basketKey;
    const response = await axios.get(`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/${basketKey}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Item not found' });
  }
});

// Endpoint to list baskets in the Pantry
app.get('/list-baskets', async (req, res) => {
  try {
    const response = await axios.get(`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}`);
    const { baskets } = response.data;
    
    // Implement filtering by name here if needed
    
    res.json(baskets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update an item in the Pantry
app.put('/update-item/:basketKey', async (req, res) => {
  try {
    const basketKey = req.params.basketKey;
    const payload = req.body;
    const response = await axios.put(`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/${basketKey}`, payload);
    res.json(response.data);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete an item from the Pantry
app.delete('/delete-item/:basketKey', async (req, res) => {
  try {
    const basketKey = req.params.basketKey;
    const response = await axios.delete(`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/${basketKey}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Dockerfile content:
// FROM node:14
// WORKDIR /app
// COPY package*.json ./
// RUN npm install
// COPY . .
// EXPOSE 9443
// CMD ["node", "app.js"]

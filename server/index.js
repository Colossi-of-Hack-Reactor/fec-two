require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const productsAPI = require('./productsAPI.js');

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, '../public/')));

app.get('/products', productsAPI.getProducts);
app.get('/products/:product_id', productsAPI.getProduct);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

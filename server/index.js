require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const Promise = require('bluebird');
const app = express();
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

app.use(express.json());
// app.use(express.static(path.join(__dirname, '../public/')));

app.get('/products', (req, res) => {
  axios.get(`${baseURL}/products`, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get products error', err);
    });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

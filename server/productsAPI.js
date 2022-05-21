
const axios = require('axios');
const Promise = require('bluebird');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

exports.getProducts = (req, res) => {
  axios.get(`${baseURL}/products`, { headers })
    .then((response) => {
      console.log('request get /products');
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get products error', err);
    });
};

exports.getProduct = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}`, { headers })
    .then((response) => {
      console.log(`reqest get /products/${req.params.product_id}`);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get product info error', err);
    });
};

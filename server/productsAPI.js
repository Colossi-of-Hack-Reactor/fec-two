
const axios = require('axios');
const Promise = require('bluebird');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

exports.getProducts = (req, res) => {
  axios.get(`${baseURL}/products`, { headers, params: req.query })
    .then((response) => {
      console.log('request get /products', req.query);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get products error', err);
    });
};

exports.getProduct = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}`, { headers })
    .then((response) => {
      console.log(`request get /products/${req.params.product_id}`);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get product info error', err);
    });
};

exports.getStyles = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}/styles`, { headers })
    .then((response) => {
      console.log(`request get /products/${req.params.product_id}/styles`);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get product info error', err);
    });
};

exports.getRelated = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}/related`, { headers })
    .then((response) => {
      console.log(`request get /products/${req.params.product_id}/related`);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get product info error', err);
    });
};
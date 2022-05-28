const axios = require('axios');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

exports.getProducts = (req, res) => {
  axios.get(`${baseURL}/products`, { headers, params: req.query })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.satus(404).send(err);
    });
};

exports.getProduct = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}`, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.satus(404).send(err);
    });
};

exports.getStyles = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}/styles`, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.getRelated = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}/related`, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.satus(404).send(err);
    });
};

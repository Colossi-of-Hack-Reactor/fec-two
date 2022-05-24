require('dotenv').config();
const axios = require('axios');
const Promise = require('bluebird');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

/* *******Get Ratings Model + Route******* */
exports.getReviews = (req, res) => {
  axios.get(`${baseURL}/reviews`, { headers, params: req.query })
    .then((response) => {
      console.log('request get /reviews', req.query);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      // console.log('axios get reviews error', err);
    });
};

exports.addReview = (req, res) => {
  console.log(req.body);
  axios.post(`${baseURL}/products/${req.body.product_id}/reviews`, { headers, params: req.body })
    .then((response) => {
      console.log('request post /reviews/', req.body);
      res.status(200).send(response.data);
    })
    .catch((err) => {
      // console.log('axios post reviews error', err);
    });
};

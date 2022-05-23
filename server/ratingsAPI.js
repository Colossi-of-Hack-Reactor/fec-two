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
      console.log('axios get reviews error', err);
    });
};

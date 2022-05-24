require('dotenv').config();
const axios = require('axios');
const Promise = require('bluebird');
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

/* *******Get Ratings and Reviews Model + Route******* */
exports.getReviews = (req, res) => {
  axios.get(`${baseURL}/reviews/`, { headers, params: req.query })
    .then((response) => {
      res.status(200).send(response.data.results);
    })
    .catch((err) => {
      console.log('axios get reviews error', err);
    });
};

exports.getReviewsByProductId = (req, res) => {
  axios.get(`${baseURL}/reviews/meta`, { headers, params: req.query })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get reviews error', err);
    });
};

exports.addReview = (req, res) => {
  axios.post(`${baseURL}/reviews`, { headers, params: req.body })
    .then((response) => {
      // console.log('request post /reviews/', req.body);
      res.status(201).send(response.data);
    })
    .catch((err) => {
      console.log('axios post reviews error', err);
    });
};

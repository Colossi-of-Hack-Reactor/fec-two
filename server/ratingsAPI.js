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

exports.getRatingsByProductId = (req, res) => {
  axios.get(`${baseURL}/reviews/meta`, { headers, params: req.query })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get ratings by product id', err);
    });
};

exports.addReview = (req, res) => {
  axios.post(`${baseURL}/reviews`, req.body, { headers })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      console.log('axios post reviews error', err);
    });
};

exports.putReviewHelpful = (req, res) => {
  axios.put(`${baseURL}/reviews/${req.params.review_id}/helpful`, req.body, { headers })
    .then((response) => {
      res.status(204).send(response.data);
    })
    .catch((err) => {
      console.log('axios put review helpful error', err);
    });
};

exports.putReviewReport = (req, res) => {
  axios.put(`${baseURL}/reviews/${req.params.review_id}/report`, req.body, { headers })
    .then((response) => {
      res.status(204).send(response.data);
    })
    .catch((err) => {
      console.log('axios put review report error', err);
    });
};

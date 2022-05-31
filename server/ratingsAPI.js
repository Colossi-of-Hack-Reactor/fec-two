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
      res.status(404).send(err);
    });
};

exports.getRatingsByProductId = (req, res) => {
  axios.get(`${baseURL}/reviews/meta`, { headers, params: req.query })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
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
      res.status(404).send(err);
    });
};

exports.putReviewReport = (req, res) => {
  axios.put(`${baseURL}/reviews/${req.params.review_id}/report`, req.body, { headers })
    .then((response) => {
      res.status(204).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

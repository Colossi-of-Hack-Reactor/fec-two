require('dotenv').config();
const axios = require('axios');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';

const getQuestions = (params, callback) => {
  const options = {
    method: 'GET',
    url: `${baseURL}qa/questions?product_id=${params}&count=20`,
    headers: { Authorization: process.env.GITHUBKEY },
  };
  axios(options)
    .then((response) => callback(response.data))
    .catch((error) => {
      console.log(error);
    });
};


module.exports ={
  getQuestions,
}
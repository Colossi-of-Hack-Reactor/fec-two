const axios = require('axios');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

exports.postInteraction = (req, res) => {
  axios.post(`${baseURL}/interactions`, req.body, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
      console.log(err);
    });
};

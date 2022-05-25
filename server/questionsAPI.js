require("dotenv").config();
const axios = require("axios");

const baseURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe";

/* *******Get Questions Model + Route******* */
const getQuestionsModel = (params, callback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/qa/questions?product_id=${params}&count=20`,
    headers: { Authorization: process.env.GITHUBKEY },
  };
  axios(options)
    .then((response) => {callback(response.data)})
    .catch((error) => {
      console.log(error);
    });
};
const putQuestionsModel = (params, callback) => {
  const options = {
    method: "PUT",
    url: `${baseURL}/qa/questions/${params}/helpful`,
    headers: { Authorization: process.env.GITHUBKEY },
  };
  axios(options)
    .then((response) => callback(response.data))
    .catch((error) => {
      console.log(error);
    });
};
const getQuestionsRoute = ('/questions',
(req, res) => {
  console.log("Get /questions");
  const cid = req.query.questionID;
  
  getQuestionsModel(cid, (data) => {
    res.send(data);
  });
});

const putHelpful = ('/qa', (req, res) => {
  const qid = req.params.question_id;
  putQuestionsModel(qid, (data) => {
    res.send("Success");
  });
});

module.exports = {
  getQuestionsRoute,
  putHelpful,
};
/*
(`/qa/questions?question_id=${req.query.question_id}/report`, )
(req, res) => {
  console.log('hi');
  axios.put(`${baseURL}/qa/questions?question_id=${req.query.question_id}/report`, { Authorization: process.env.GITHUBKEY })
    .then((response) => {
      console.log(response)
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('axios get product info error', err);
    });
}; */

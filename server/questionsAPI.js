require("dotenv").config();
const axios = require("axios");

const baseURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe";

/* *******Get Questions Model + Route******* */
const getQuestionsModel = (params, callback) => {
  const options = {
    method: "GET",
    url: `${baseURL}/qa/questions?product_id=${params}&count=500`,
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
const putAnswersModel = (params, callback) => {
  const options = {
    method: "PUT",
    url: `${baseURL}/qa/answers/${params}/helpful`,
    headers: { Authorization: process.env.GITHUBKEY },
  };
  axios(options)
    .then((response) => callback(response.data))
    .catch((error) => {
      console.log(error);
    });
};
const putAnswerReportModel = (params, callback) => {
  const options = {
    method: "PUT",
    url: `${baseURL}/qa/answers/${params}/report`,
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

const putHelpful = ('/qa/questions', (req, res) => {
  const qid = req.params.question_id;
  putQuestionsModel(qid, (data) => {
    res.send("Success");
  });
});

const putAnswerHelpful = ('/qa/answers', (req, res) => {
  const aid = req.params.answer_id;
  putAnswersModel(aid, (data) => {
    res.send("Success");
  });
});

const putAnswerReport = ('/qa/answers', (req, res) => {
  const aid = req.params.answer_id;
  putAnswerReportModel(aid, (data) => {
    res.send("Success");
  });
});

module.exports = {
  getQuestionsRoute,
  putHelpful,
  putAnswerHelpful,
  putAnswerReport,
};


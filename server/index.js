require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const productsAPI = require('./productsAPI');
const questionsAPI = require('./questionsAPI');
const ratingsAPI = require('./ratingsAPI');
const interactionsAPI = require('./interactionsAPI');
const searchAPI = require('./searchAPI');

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '../public/index.html'));
});

app.get('/products', productsAPI.getProducts);
app.get('/products/:product_id', productsAPI.getProduct);
app.get('/products/:product_id/styles', productsAPI.getStyles);
app.get('/products/:product_id/related', productsAPI.getRelated);

/* API for Questions */
app.get('/qa', questionsAPI.getQuestionsRoute);
app.put('/qa/questions/:question_id/helpful', questionsAPI.putHelpful);
app.put('/qa/answers/:answer_id/helpful', questionsAPI.putAnswerHelpful);
app.put('/qa/answers/:answer_id/report', questionsAPI.putAnswerReport);
app.post('/qa/questions/:question_id/answers', questionsAPI.addAnswer);
app.post('/qa/questions/', questionsAPI.postQuestion);

/* API for Ratings */
app.get('/reviews/', ratingsAPI.getReviews);
app.get('/reviews/meta', ratingsAPI.getRatingsByProductId);
app.post('/reviews', ratingsAPI.addReview);
app.put('/reviews/:review_id/helpful', ratingsAPI.putReviewHelpful);
app.put('/reviews/:review_id/report', ratingsAPI.putReviewReport);

app.post('/interactions', interactionsAPI.postInteraction);

app.get('/search/:term', searchAPI.search);
app.get('/randomSale', searchAPI.randomSale);

app.listen(process.env.PORT);
// eslint-disable-next-line no-console
console.log(`Listening at http://localhost:${process.env.PORT}`);

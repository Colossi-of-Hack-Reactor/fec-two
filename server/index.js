require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const productsAPI = require('./productsAPI.js');
const questionsAPI = require('./questionsAPI.js');
const ratingsAPI = require('./ratingsAPI.js');
const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, '../public/')));

app.get('/products', productsAPI.getProducts);
app.get('/products/:product_id', productsAPI.getProduct);
app.get('/products/:product_id/styles', productsAPI.getStyles);
app.get('/products/:product_id/related', productsAPI.getRelated);

/* API for Questions*/
app.get('/qa', questionsAPI.getQuestionsRoute);
app.put('/qa/questions/:question_id/helpful', questionsAPI.putHelpful);
//http://localhost:3001/qa/questions/?question_id=542996/helpful

/* API for Ratings*/
app.get('/reviews/', ratingsAPI.getReviews);
app.get('/reviews/meta', ratingsAPI.getReviewsByProductId);
app.post('/reviews', ratingsAPI.addReview);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

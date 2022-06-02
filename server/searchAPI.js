const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(`mongodb+srv://${process.env.mongoUN}:${process.env.mongoPW}@cluster0.y9iir.mongodb.net/fec?retryWrites=true&w=majority`);

const productSchema = new mongoose.Schema({
  id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
});

const Product = mongoose.model('Products', productSchema);

const saleSchema = new mongoose.Schema({
  product_id: Number,
  style_id: Number,
  product_name: String,
  style_name: String,
  original_price: String,
  sale_price: String,
});

const Sales = mongoose.model('Sales2', saleSchema);

exports.search = (req, res) => {
  const term = new RegExp(req.params.term, 'i');
  Product.find({ name: term })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};

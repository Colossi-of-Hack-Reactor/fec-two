const axios = require('axios');
const mongoose = require("mongoose");
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

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

const addProduct = function(product) {
  return Product.create({
    id: product.id,
    campus: product.campus,
    name: product.name,
    slogan: product.slogan,
    description: product.description,
    category: product.category,
    default_price: product.default_price,
    created_at: product.created_at,
    updated_at: product.updated_at,
  });
};

const saleSchema = new mongoose.Schema({
  product_id: Number,
  style_id: Number,
  product_name: String,
  style_name: String,
  original_price: String,
  sale_price: String,
});

const Sales = mongoose.model('Sales2', saleSchema);

const addSales = function(sale) {
  return Sales.create({
    product_id: sale.product_id,
    style_id: sale.style_id,
    product_name: sale.product_name,
    style_name: sale.style_name,
    original_price: sale.original_price,
    sale_price: sale.sale_price,
  });
};

exports.getProducts = (req, res) => {
  axios.get(`${baseURL}/products`, { headers, params: req.query })
    .then((response) => {
      const products = response.data;
      for (let i = 0; i < products.length; i++) {
        addProduct(products[i])
          .then(() => {
            console.log(products[i].id);
          })
          .catch(err => {
            console.log('error on ', products[i].id);
            console.log(err);
          });
      }

      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.getProduct = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}`, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.getStyles = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}/styles`, { headers })
    .then((response) => {
      const pid = response.data.product_id;
      const styles = response.data.results;
      let productName;
      for (let i = 0; i < styles.length; i++) {
        if (styles[i].sale_price) {
          Product.find({id: pid}, 'name')
            .then((data) => {
              productName = data[0].name;
              return addSales({
                product_id: pid,
                style_id: styles[i].style_id,
                product_name: productName,
                style_name: styles[i].name,
                original_price: styles[i].original_price,
                sale_price: styles[i].sale_price,
              })
            })
            .then(() => {
              console.log(pid);
            })
            .catch(err => {
              console.log('error on ', pid);
              console.log(err);
            });
        }
      }
      res.status(200).send(response.data.results);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.getRelated = (req, res) => {
  axios.get(`${baseURL}/products/${req.params.product_id}/related`, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

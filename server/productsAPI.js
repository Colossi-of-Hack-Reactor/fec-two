const axios = require('axios');
const mongoose = require('mongoose');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const headers = {
  Authorization: process.env.GITHUBKEY,
};

mongoose.connect(`mongodb+srv://${process.env.mongoUN}:${process.env.mongoPW}@cluster0.y9iir.mongodb.net/fec2?retryWrites=true&w=majority`);

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

const featureSchema = new mongoose.Schema({
  id: Number,
  feature: String,
  value: String,
});

const Feature = mongoose.model('Features', featureSchema);

const addFeature = function(feature) {
  return Feature.create({
    id: feature.id,
    feature: feature.feature,
    value: feature.value,
  });
};

const styleSchema = new mongoose.Schema({
  product_id: Number,
  style_id: Number,
  product_name: String,
  style_name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
});

const Styles = mongoose.model('Styles', styleSchema);

const addStyles = function(style) {
  return Styles.create({
    product_id: style.product_id,
    style_id: style.style_id,
    product_name: style.product_name,
    style_name: style.style_name,
    original_price: style.original_price,
    sale_price: style.sale_price,
    default: style.default,
  });
};

const photoSchema = new mongoose.Schema({
  product_id: Number,
  style_id: Number,
  thumbnail_url: String,
  url: String,
});

const Photos = mongoose.model('Photos', photoSchema);

const addPhotos = function(photo) {
  return Photos.create({
    product_id: photo.product_id,
    style_id: photo.style_id,
    thumbnail_url: photo.thumbnail_url,
    url: photo.url,
  });
};

const skuSchema = new mongoose.Schema({
  product_id: Number,
  style_id: Number,
  sku_id: String,
  quantity: Number,
  size: String,
});

const SKUs = mongoose.model('SKUs', skuSchema);

const addSKUs = function(sku) {
  return SKUs.create({
    product_id: sku.product_id,
    style_id: sku.style_id,
    sku_id: sku.id,
    quantity: sku.quantity,
    size: sku.size,
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
      for (let i = 0; i < response.data.features.length; i++) {
        const prod = {};
        prod.id = response.data.id;
        prod.feature = response.data.features[i].feature;
        prod.value = response.data.features[i].value;
        addFeature(prod)
          .then(() => {
            console.log(prod.id);
          })
          .catch(err => {
            console.log('error on ', prod.id);
            console.log(err);
          });
      }
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.getStyles = (req, res) => {
  let productName;
  const pid = req.params.product_id;

  Product.find({ id: pid }, 'name')
    .then((data) => {
      productName = data[0].name;
      return axios.get(`${baseURL}/products/${req.params.product_id}/styles`, { headers });
    })
    .then((response) => {
      const styles = response.data.results;
      for (let i = 0; i < styles.length; i++) {
        addStyles({
          product_id: pid,
          style_id: styles[i].style_id,
          product_name: productName,
          style_name: styles[i].name,
          original_price: styles[i].original_price,
          sale_price: styles[i].sale_price,
          default: styles[i]['default?'],
        }).then(() => {
          for (let j = 0; j < styles[i].photos.length; j++) {
            addPhotos({
              product_id: pid,
              style_id: styles[i].style_id,
              thumbnail_url: styles[i].photos[j].thumbnail_url,
              url: styles[i].photos[j].url,
            });
          }
        }).then(() => {
          const sku_ids = Object.keys(styles[i].skus);
          for (let k = 0; k < sku_ids.length; k++) {
            addSKUs({
              product_id: pid,
              style_id: styles[i].style_id,
              sku_id: sku_ids[k],
              quantity: styles[i].skus[sku_ids[k]].quantity,
              size: styles[i].skus[sku_ids[k]].size,
            });
          }
        })
          .then(() => {
            console.log(pid);
          })
          .catch(err => {
            console.log('error on ', pid);
            console.log(err);
          });
      }
    })
    .then(() => {
      res.status(200).end();
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

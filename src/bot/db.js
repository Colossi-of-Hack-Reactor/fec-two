const mongoose = require("mongoose");
const Promise = require("bluebird");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

mongoose.connect(`mongodb+srv://${process.env.mongoUN}:${process.env.mongoPW}@cluster0.y9iir.mongodb.net/glossary?retryWrites=true&w=majority`);

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
  name: String,
  original_price: String,
  sale_price: String,
});

const Sales = mongoose.model('Sales', saleSchema);

const addSales = function(sale) {
  return Sales.create({
    product_id: sale.product_id,
    style_id: sale.style_id,
    name: sale.name,
    original_price: sale.original_price,
    sale_price: sale.sale_price,
  });
};

module.exports.addProduct = addProduct;
module.exports.addSales = addSales;

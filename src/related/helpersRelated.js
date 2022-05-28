/* eslint-disable camelcase */
import axios from 'axios';

const compileOutfits = (productList, setProducts) => {
  Promise.allSettled(productList.map((id) => axios.get(`/products/${id}`)))
    .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
    .then((productsArr) => {
      Promise.allSettled(productList.map((id) => axios.get(`/products/${id}/styles`)))
        .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
        .then((data) => productsArr.map((product, i) => Object.assign(data[i], product)))
        .then((finalProductArr) => setProducts(finalProductArr));
    })
    .catch((err) => console.log('FAILURE', err));
};

const updateRelatedCards = (product_id, setProducts) => {
  if (product_id !== undefined) {
    axios.get(`/products/${product_id}/related`)
      .then((res) => res.data)
      .then((relatedIds) => {
        const uniqIdsList = relatedIds.filter((id, i) => relatedIds.indexOf(id) === i);
        compileOutfits(uniqIdsList, setProducts);
      })
      .catch((err) => console.log('FAILURE', err));
  }
};

const populateAltCards = (product, altCards) => {
  let defaultIndex;
  product.results.forEach((altStyle) => {
    const {
      name, original_price, photos, sale_price = 0,
    } = altStyle;

    altCards.push({
      default: altStyle['default?'],
      category: product.category,
      style_name: name,
      original_price,
      sale_price,
      photos,
    });
  });
  altCards.forEach((card, i) => {
    if (card.default) {
      defaultIndex = i;
    }
  });
  return defaultIndex;
};

export { compileOutfits, updateRelatedCards, populateAltCards };

/* eslint-disable max-len */
/* eslint-disable camelcase */
import axios from 'axios';

const compileOutfits = (productList, setProducts) => (Promise.allSettled(productList.map((id) => axios.get(`/products/${id}`)))
  .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
  .then((productsArr) => {
    Promise.allSettled(productList.map((id) => axios.get(`/products/${id}/styles`)))
      .then((promisesArr) => promisesArr.map((res) => (res.status === 'fulfilled' ? res.value.data : {})))
      .then((data) => productsArr.map((product, i) => Object.assign(data[i], product)))
      .then((newProductsArr) => Promise.allSettled(productList.map((id) => axios.get('reviews/meta', { params: { product_id: id } })))
        .then((reviewsMetaResArr) => { // array of prod info
          const ratingsData = reviewsMetaResArr.map((ratingsRes) => [Object.keys(ratingsRes.value.data.characteristics), ratingsRes.value.data.characteristics]);
          const productsRatings = ratingsData.map(([keys, ratings]) => keys.map((cat) => ratings[cat].value));

          const avgProductsRatings = productsRatings.map((product) => {
            const avgRating = ((product.reduce((memo, rating) => memo + Number.parseFloat(rating), 0)) / product.length).toFixed(2);
            return Number.parseFloat(avgRating);
          });
          newProductsArr.forEach((product, i) => {
            // eslint-disable-next-line no-param-reassign
            product.rating = avgProductsRatings[i];
          });
          return newProductsArr;
        })
        .then((finalProductsArr) => {
          if (setProducts) {
            setProducts(() => finalProductsArr);
          }
          return finalProductsArr;
        }));
  })
  .catch((err) => console.log('FAILURE', err))
);

const updateListCards = (product_id, setProducts, related) => {
  if (related) {
    axios.get(`/products/${product_id}/related`)
      .then((res) => res.data)
      .then((relatedIds) => {
        //relatedIds.push(product_id);
        const uniqIdsList = relatedIds.filter((id, i) => relatedIds.indexOf(id) === i);
        compileOutfits(uniqIdsList, setProducts);
      })
      .catch((err) => console.log('FAILURE', err));
  } else {
    compileOutfits([product_id], setProducts);
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

export { compileOutfits, updateListCards, populateAltCards };

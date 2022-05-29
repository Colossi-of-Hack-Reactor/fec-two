/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import QuantitySelector from './quantitySelector.jsx'
import SizeSelector from './sizeSelector.jsx';
import StyleSelector from './styleSelector.jsx';
import ImageGallery from './imageGallery2.jsx';
import {
  Product, Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv,
  FeatsDiv, OverallDiv,
} from './overviewStyled.js';
import { EmptyStarLink, FullStarLink } from './overviewAssets.js';

function Overview(props) {
  const [count, setCount] = useState(5);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(1);
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(0);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState({ value: 1, label: 1 });
  const [image, setImage] = useState(0);
  const [thumb, setThumb] = useState(6);
  const { product_id, setProduct_id, setLoading } = props;
  const selectRef = React.useRef();

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get('/products', {
      params: {
        count, page,
      },
    })
      .then((response) => {
        setProducts(response.data);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get products error', err);
        setLoading((a) => a - 1);
      });
  }, [count, page]);

  useEffect(() => {
    setLoading((a) => a + 1);
    axios.get(`/products/${product_id}`)
      .then((response) => {
        setProduct(response.data);
        return axios.get(`/products/${product_id}/styles`);
      })
      .then((response) => {
        setStyles(response.data.results);
        setLoading((a) => a - 1);
      })
      .catch((err) => {
        console.log('axios get products error', err);
        setLoading((a) => a - 1);
      });
  }, [product_id]);

  useEffect(() => {
    setStyle(0);
  }, [styles]);

  useEffect(() => {
    setSize(null);
    setQuantity(null);
    if (styles[style]) {
      if (styles[style].photos.length <= image) {
        setImage(styles[style].photos.length - 1);
        setThumb(Math.max(6, styles[style].photos.length - 1));
      }
    }
  }, [style, styles]);

  useEffect(() => {
    if (image > thumb) {
      setThumb(image);
    } else if (image < thumb - 6) {
      setThumb(image + 6);
    }
  }, [image]);

  useEffect(() => {
    setQuantity({ value: 1, label: 1 });
  }, [size]);

  return (
    <OverallDiv>
      <form>
        <label>
          Product Count:
          <input
            type="number"
            name="count"
            label="count"
            value={count}
            min="1"
            onChange={(e) => {
              setCount(e.target.value);
            }}
          />
        </label>
        <label>
          Page:
          <input
            type="number"
            name="page"
            label="page"
            value={page}
            min="1"
            onChange={(e) => {
              setPage(e.target.value);
            }}
          />
        </label>
      </form>
      {products.length ? products.map((d) => (
        <Product key={d.id} data-testid="product" onClick={() => { setProduct_id(d.id); }}>
          <span>
            {d.id}
          </span>
          :
          {' '}
          {d.name}
        </Product>
      )) : <Product>No products.</Product>}
      {styles[style] ? (
        <>
          <OverviewDiv>
            <ImageDiv>
              <ImageGallery
                style={style}
                styles={styles}
                image={image}
                setImage={setImage}
                thumb={thumb}
                setThumb={setThumb}
              />
            </ImageDiv>
            <InfoDiv>
              <div>
                Rating
              </div>
              <div>
                Reviews
              </div>
              <div>
                Category:
                {' '}
                {product.category}
              </div>
              <div>
                Expanded Product Name:
                {' '}
                {product.name}
              </div>
              <div>
                Price:
                {' '}
                {styles[style].sale_price ? (
                  <>
                    <Sale>
                      $
                      {styles[style].sale_price}
                      {' '}
                    </Sale>
                    <Original>
                      $
                      {styles[style].original_price}
                    </Original>
                  </>
                ) : (
                  <>
                    $
                    {styles[style].original_price}
                  </>
                )}
              </div>
              <StyleSelector setStyle={setStyle} styles={styles} style={style} />
              <SizeSelector
                size={size}
                setSize={setSize}
                style={style}
                styles={styles}
                selectRef={selectRef}
              />
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                size={size}
                style={style}
                styles={styles}
                selectRef={selectRef}
              />
              {
                styles[style].skus.null ? (null) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectRef.current) {
                          selectRef.current.focus();
                        }
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                )
              }
              <div>
                <img src={EmptyStarLink} alt="empty star" />
                <img src={FullStarLink} alt="full star" />
              </div>
            </InfoDiv>
          </OverviewDiv>
          <WordsDiv>
            <SloDesDiv>
              <p style={{ fontWeight: 'bold' }}>
                {product.slogan}
              </p>
              <p style={{ fontStyle: 'italic' }}>
                {product.description}
              </p>
            </SloDesDiv>
            <FeatsDiv>
              {product.features.map((feat) => (
                <p key={feat.feature}>
                  {feat.feature}
                  {': '}
                  {feat.value}
                </p>
              ))}
            </FeatsDiv>
          </WordsDiv>
        </>
      ) : ''}
    </OverallDiv>
  );
}

Overview.propTypes = {
  product_id: PropTypes.number.isRequired,
  setProduct_id: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Overview;

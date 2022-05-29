/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import QuantitySelector from './quantitySelector.jsx'
import SizeSelector from './sizeSelector.jsx';
import StyleSelector from './styleSelector.jsx';
import ImageGallery from './imageGallery2.jsx';
import {
  Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv,
  FeatsDiv, OverallDiv, SelectSizeMsg, SizeQuantityDiv, SelectSpan,
} from './overviewStyled.js';
import { EmptyStarLink, FullStarLink } from './overviewAssets.js';

let timeoutID = null;

function Overview(props) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(0);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState({ value: 1, label: 1 });
  const [image, setImage] = useState(0);
  const [thumb, setThumb] = useState(6);
  const [showSelectSizeMsg, setShowSelectSizeMsg] = useState(false);
  const { product_id, setLoading } = props;
  const selectRef = React.useRef();

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
              <SelectSizeMsg vis={showSelectSizeMsg}>
                Please select a size.
              </SelectSizeMsg>
              <SizeQuantityDiv>
                <SelectSpan>
                  <SizeSelector
                    size={size}
                    setSize={setSize}
                    style={style}
                    styles={styles}
                    selectRef={selectRef}
                    setShowSelectSizeMsg={setShowSelectSizeMsg}
                  />
                </SelectSpan>
                <SelectSpan
                  onClick={() => {
                    if (size === null && styles[style].skus[size] === undefined) {
                      if (selectRef.current) {
                        selectRef.current.focus();
                      }
                      setShowSelectSizeMsg(true);
                      clearTimeout(timeoutID);
                      timeoutID = setTimeout(() => setShowSelectSizeMsg(false), 3000);
                    }
                  }}
                >
                  <QuantitySelector
                    quantity={quantity}
                    setQuantity={setQuantity}
                    size={size}
                    style={style}
                    styles={styles}
                    selectRef={selectRef}
                  />
                </SelectSpan>
              </SizeQuantityDiv>
              {
                styles[style].skus.null ? (null) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (size === null) {
                          if (selectRef.current) {
                            selectRef.current.focus();
                          }
                          setShowSelectSizeMsg(true);
                          clearTimeout(timeoutID);
                          timeoutID = setTimeout(() => setShowSelectSizeMsg(false), 3000);
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
  setLoading: PropTypes.func.isRequired,
};

export default Overview;

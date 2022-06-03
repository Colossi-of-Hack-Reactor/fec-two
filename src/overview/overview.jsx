/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import QuantitySelector from './quantitySelector.jsx'
import SizeSelector from './sizeSelector.jsx';
import StyleSelector from './styleSelector.jsx';
import ImageGallery from './imageGallery2.jsx';
import {
  Sale, Original, OverviewDiv, ImageDiv, InfoDiv, WordsDiv, SloDesDiv,
  FeatsDiv, OverallDiv, SelectSizeMsg, SizeQuantityDiv, SelectSpan,
  CategoryDiv, ProductNameDiv, PriceDiv, SocialDiv, SocialImg, BagOutfitDiv,
  BagButton, StarButton, ReviewsSpan,
} from './overviewStyled.js';
import {
  EmptyStarLink, FullStarLink, FacebookLink, TwitterLink, PinterestLink, InstagramLink,
} from './overviewAssets.js';

let timeoutID = null;

function Overview(props) {
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(0);
  const [size, setSize] = useState('Select');
  const [quantity, setQuantity] = useState('1');
  const [image, setImage] = useState(0);
  const [thumb, setThumb] = useState(6);
  const [score, setScore] = useState(1);
  const [showSelectSizeMsg, setShowSelectSizeMsg] = useState(false);
  const {
    product_id, setLoading, reviews, meta, ratingsRef, product, setProduct,
    cart, setCart,
  } = props;
  const selectRef = React.useRef();
  const [favorite, setFavorite] = useState(false);

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
    setSize('Select');
    setQuantity('1');
    setFavorite(false);
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
    setQuantity('1');
  }, [size]);

  useEffect(() => {
    let totalScore = 0;
    let totalRating = 0;
    if (Object.keys(meta).length !== 0) {
      for (const key in meta.ratings) {
        totalScore += key * Number(meta.ratings[key]);
        totalRating += Number(meta.ratings[key]);
      }
    }
    const total = (totalScore / totalRating);
    setScore(Math.ceil(4 * total) * 0.25);
  }, [meta]);

  return (
    <OverallDiv className="Overview">
      {styles[style] ? (
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
            {reviews.length ? (
              <>
                <StarRatings
                  rating={score}
                  starDimension="20px"
                  starSpacing="5px"
                  starRatedColor="DimGray"
                  starEmptyColor="Gainsboro"
                />
                <ReviewsSpan
                  onClick={() => {
                    if (ratingsRef.current) {
                      ratingsRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }}
                >
                  Read all
                  {' '}
                  {reviews.length}
                  {' '}
                  reviews
                </ReviewsSpan>
              </>
            ) : ''}
            <ProductNameDiv data-testid="productName">
              {product.name}
            </ProductNameDiv>
            <CategoryDiv data-testid="category">
              {product.category}
            </CategoryDiv>
            <PriceDiv data-testid="price">
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
            </PriceDiv>
            <StyleSelector setStyle={setStyle} styles={styles} style={style} />
            <SizeQuantityDiv>
              <SelectSizeMsg vis={showSelectSizeMsg} data-testid="selectSizeMsg">
                Please select a size.
              </SelectSizeMsg>
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
                  if (size === 'Select' && styles[style].skus[size] === undefined) {
                    if (selectRef.current) {
                      selectRef.current.focus();
                    }
                    setShowSelectSizeMsg(true);
                    clearTimeout(timeoutID);
                    timeoutID = setTimeout(() => setShowSelectSizeMsg(false), 3000);
                  }
                }}
                data-testid="qtySelectSpan"
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
                <BagOutfitDiv>
                  <SelectSpan>
                    <BagButton
                      type="button"
                      onClick={() => {
                        if (size === 'Select') {
                          if (selectRef.current) {
                            selectRef.current.focus();
                          }
                          setShowSelectSizeMsg(true);
                          clearTimeout(timeoutID);
                          timeoutID = setTimeout(() => setShowSelectSizeMsg(false), 3000);
                        } else {
                          let newCart = cart.slice();
                          let inBag = false;
                          for (let i = 0; i < newCart.length; i++) {
                            if (newCart[i].sku === size) {
                              newCart[i].quantity = quantity;
                              inBag = true;
                              break;
                            }
                          }
                          if (!inBag) {
                            newCart.push({
                              sku: size,
                              productName: product.name,
                              styleName: styles[style].name,
                              size: styles[style].skus[size].size,
                              quantity,
                              originalPrice: styles[style].original_price,
                              salePrice: styles[style].sale_price,
                            });
                          }
                          setCart(newCart);
                        }
                      }}
                    >
                      Add to Bag
                    </BagButton>
                  </SelectSpan>
                  <SelectSpan>
                    <StarButton
                      src={favorite ? FullStarLink : EmptyStarLink}
                      onClick={()=>setFavorite((f) => !f)}
                    />
                    {/* <img src={EmptyStarLink} alt="empty star" />
                    <img src={FullStarLink} alt="full star" /> */}
                  </SelectSpan>
                </BagOutfitDiv>
              )
            }
            <SocialDiv>
              <SocialImg src={FacebookLink} />
              <SocialImg src={TwitterLink} />
              <SocialImg src={PinterestLink} />
              <SocialImg src={InstagramLink} />
            </SocialDiv>
        <WordsDiv>
          <SloDesDiv data-testid="sloganDescription">
            <p style={{ fontWeight: 'bold' }}>
              {product.slogan}
            </p>
            <p style={{ fontStyle: 'italic' }}>
              {product.description}
            </p>
          </SloDesDiv>
          <FeatsDiv data-testid="features">
            {product.features.map((feat) => (
              <p key={feat.feature}>
                {feat.feature}
                {': '}
                {feat.value}
              </p>
            ))}
          </FeatsDiv>
        </WordsDiv>
          </InfoDiv>
        </OverviewDiv>
      ) : ''}
    </OverallDiv>
  );
}

Overview.propTypes = {
  product_id: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  meta: PropTypes.shape().isRequired,
  ratingsRef: PropTypes.shape().isRequired,
};

export default Overview;

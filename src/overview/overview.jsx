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
  CategoryDiv, ProductNameDiv, PriceDiv, SocialDiv, SocialImg, BagOutfitDiv,
  BagButton, StarButton,
} from './overviewStyled.js';
import {
  EmptyStarLink, FullStarLink, FacebookLink, TwitterLink, PinterestLink, InstagramLink,
} from './overviewAssets.js';

let timeoutID = null;

function Overview(props) {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState(0);
  const [size, setSize] = useState('Select');
  const [quantity, setQuantity] = useState('1');
  const [image, setImage] = useState(0);
  const [thumb, setThumb] = useState(6);
  const [showSelectSizeMsg, setShowSelectSizeMsg] = useState(false);
  const { product_id, setLoading } = props;
  const selectRef = React.useRef();
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <OverallDiv className="Overview">
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
              <CategoryDiv data-testid="category">
                {product.category}
              </CategoryDiv>
              <ProductNameDiv data-testid="productName">
                {product.name}
              </ProductNameDiv>
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
                          }
                        }}
                      >
                        Add to Bag
                      </BagButton>
                    </SelectSpan>
                    <SelectSpan>
                      <StarButton
                        src={isFavorite ? FullStarLink : EmptyStarLink}
                        onClick={() => { setIsFavorite((a) => (!a)); }}
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
            </InfoDiv>
          </OverviewDiv>
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

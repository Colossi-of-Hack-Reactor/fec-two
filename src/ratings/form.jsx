import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const FormContainer = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FormItem = styled.div`
  margin-top: 25px;
  margin-bottom: 30px;
`;

const Scroll = styled.div`
  width: 100%;
  height: 500px;
  overflow: scroll;
`;

const FormHeader = styled.h2`
  margin: 10% 10% 2%;
`;

const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 30px;
`;

export default function Form({ product_id, handleClose }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setChar] = useState(
    {
      Size: '3', Width: '3', Comfort: '5', Quality: '5', Length: '3', Fit: '3',
    },
  );
  const chars = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleCheck = () => {
    if (recommend === true) {
      setRecommend(false);
    }
    setRecommend(true);
  };

  const handleSelectChange = (e) => {
    const cha = { ...characteristics };
    cha[e.target.name] = e.target.value;
    setChar(cha);
  };

  const handleSubmit = () => {
    axios.post('/reviews', {
      product_id, rating, summary, body, recommend, name, email, photos, characteristics,
    })
      .then(() => {
        console.log('Added a review! ');
      })
      .catch((err) => {
        console.log('axios post reviews error', err);
      });
    handleClose();
  };

  return (
    <div>
      <FormHeader>
        Write Your Review
        <small>
          &nbsp; - &nbsp;About the product
          {' '}
          {product_id}
        </small>
      </FormHeader>
      <Scroll>
        <FormContainer>
          <form>
            <FormItem>
              <h3>
                <label>
                  <span>Overall rating</span>
                </label>
              </h3>
              <StarRatings
                rating={rating}
                starDimension="30px"
                starRatedColor="rgb(230, 67, 47)"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
              />
            </FormItem>
            <hr />
            <FormItem>
              <label>
                <span>Do you recommend this product?</span>
                &nbsp;&nbsp;
                <input name="status" type="checkbox" onChange={handleCheck} />
                {' '}
                Yes
              </label>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Characteristics</span>
                </label>
              </h3>
              <CharContainer>
                {Object.keys(chars).map((char, i) => (
                  <div key={i}>
                    <span>{char}</span>
                    &nbsp;
                    <select name={char} value={characteristics[char]} onChange={handleSelectChange}>
                      {chars[char].map((elem, i) => (
                        <option
                          key={i}
                          value={i + 1}
                          label={elem}
                        />
                      ))}
                    </select>
                    {' '}
                  </div>
                ))}
              </CharContainer>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Review summary</span>
                </label>
              </h3>
              <label>
                <textarea
                  value={summary}
                  maxLength="60"
                  rows="2"
                  cols="70"
                  placeholder="Example: Best purchase ever!"
                  onChange={(e) => setSummary(e.target.value)}
                />
              </label>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Review body</span>
                </label>
              </h3>
              <label>
                <textarea
                  maxLength="1000"
                  minLength="50"
                  rows="10"
                  cols="70"
                  value={body}
                  placeholder="Why did you like the product or not?"
                  required
                  autoComplete="off"
                  onChange={(e) => setBody(e.target.value)}
                />
              </label>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Upload your photos</span>
                </label>
              </h3>
              <button type="button">
                <input
                  type="file"
                  accept="image/*,video/*"
                />
              </button>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>What is your name?</span>
                </label>
              </h3>
              <span> For privacy reasons, do not use your full name or email address </span>
              <label>
                <input
                  type="email"
                  required
                  value={name}
                  maxLength="60"
                  width="100%"
                  placeholder="Example: jackson11!"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Your email</span>
                </label>
              </h3>
              <span> For authentication reasons, you will not be emailed </span>
              <label>
                <input
                  value={email}
                  maxLength="60"
                  placeholder="Example: jackson11@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </FormItem>
            <hr />
            <FormItem>
              <button type="button" onClick={handleSubmit}>
                <span>Submit review</span>
              </button>
            </FormItem>
          </form>
        </FormContainer>
      </Scroll>
    </div>
  );
}

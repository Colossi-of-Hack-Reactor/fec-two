import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import AlertPopup from './alertModal.jsx';

const FormContainer = styled.div`
  margin: 0 10% 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FormItem = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`;

const Scroll = styled.div`
  width: 100%;
  height: 700px;
  overflow: hidden scroll;
`;

const FormHeader = styled.h2`
  margin: 10% 10% 2%;
`;

const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 30px;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const Label = styled.label`
  cursor: pointer;
  background-color: WhiteSmoke;
  color: DimGray;
  padding: 18px 25px;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
`;

const Summary = styled.textarea`
  width: 99%;
  height: 60px;
`;

const Body = styled.textarea`
  width: 99%;
  height: 100px;
`;

const Input = styled.input`
  width: 99%;
  height: 24px;
`;

const Button = styled.button`
  background-color: WhiteSmoke;
  border: none;
  color: DimGray;
  padding: 10px 14px;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px
`;

const Alert = styled.label`
  padding: 50px;
  background-color: black;
  color: white;
`;

export default function Form({ product_id, handleClose, meta }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setChar] = useState({});
  const [charId, setCharId] = useState({});
  const [submit, setSubmit] = useState(false);
  const defaultChar = { Size: 3, Width: 3, Comfort: 5, Quality: 5, Length: 3, Fit: 3 };
  const chars = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
    document.documentElement.style.overflow = 'hidden';
  };
  const hideModal = () => {
    setShow(false);
  };

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleCheckRecommend = (e) => {
    if (e.target.value === 'yes') {
      setRecommend(true);
    } else if (e.target.value === 'no') {
      setRecommend(false);
    }
  };

  const handleImgChange = (e) => {
    const images = [...photos];
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    if (!images.includes(imgUrl)) {
      images.push(imgUrl);
    }
    setPhotos(images);
  };

  const handleDelete = (e) => {
    const images = [...photos];
    const imgUrl = e.target.src;
    if (images.includes(imgUrl)) {
      const i = images.indexOf(imgUrl);
      images.splice(i, 1);
    }
    setPhotos(images);
  };

  const handleSelectChange = (e) => {
    const cha = { ...characteristics };
    cha[e.target.name] = Number(e.target.value);
    setChar(cha);
  };

  const handleResetForm = () => {
    setRating(5);
    setSummary('');
    setBody('');
    setRecommend(true);
    setName('');
    setEmail('');
    setPhotos([]);
    const charStorage = {};
    if (meta.characteristics) {
      Object.keys(meta.characteristics).forEach((char) => {
        charStorage[meta.characteristics[char].id] = defaultChar[char];
        charId[char] = meta.characteristics[char].id;
      });
      setChar(charStorage);
      setCharId(charId);
    }
  };

  const handleSubmit = () => {
    showModal();
    axios.post('/reviews', {
      product_id, rating, summary, body, recommend, name, email, photos, characteristics,
    })
      .then(() => {
        console.log('Added a review! ');
        handleClose();
        setSubmit(true);
      })
      .catch((err) => {
        console.log('axios post reviews error', err);
        setShow(true);
      });
  };

  useEffect(() => {
    handleResetForm();
    setSubmit(false);
  }, [product_id, meta]);

  useEffect(() => {
    if (submit === true) {
      handleResetForm();
      setSubmit(false);
    }
  }, [submit]);

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
          <form data-testid="form">
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
                name="rating"
                data-testid="rating"
              />
            </FormItem>
            <hr />
            <FormItem>
              <label>
                <span>Do you recommend this product?</span>
                &nbsp;&nbsp;
                <input name="recommend" type="radio" value="yes" onChange={handleCheckRecommend} checked="checked" data-testid="checkbox" />
                Yes
                &nbsp;&nbsp;
                <input name="recommend" type="radio" value="no" onChange={handleCheckRecommend} />
                No
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
                {meta.characteristics ? Object.keys(meta.characteristics).map((char, i) => (
                  <div key={i}>
                    <span>{char}</span>
                    &nbsp;
                    {characteristics[charId[char]] ? (
                      <select name={charId[char]} value={characteristics[charId[char]]} onChange={handleSelectChange} data-testid="char">
                        {chars[char].map((elem, i) => (
                          <option key={i} value={i + 1} label={elem}>{elem}</option>
                        ))}
                      </select>
                    ) : null}
                    {' '}
                  </div>
                )) : null}
              </CharContainer>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Review summary</span>
                </label>
              </h3>
              <Summary
                value={summary}
                maxLength="60"
                placeholder="Example: Best purchase ever!"
                required
                autoComplete="off"
                onChange={(e) => setSummary(e.target.value)}
                data-testid="summary"
              />
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Review body</span>
                </label>
              </h3>
              <Body
                maxLength="1000"
                minLength="50"
                value={body}
                placeholder="Why did you like the product or not?"
                required
                autoComplete="off"
                onChange={(e) => setBody(e.target.value)}
                data-testid="body"
              />
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Upload your photos</span>
                </label>
              </h3>
              <PhotoContainer>
                {photos.map((url, i) =>
                  <img src={url} key={i} height="60px" width="60px" alt="preview" onClick={handleDelete} style={{ cursor: "not-allowed" }} />
                )}
                <Label htmlFor="upload-photo">
                  +
                  <input style={{ display: 'none' }} type="file" id="upload-photo" name="photo" accept="image/*,video/*" onChange={handleImgChange} />
                </Label>
              </PhotoContainer>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>What is your name?</span>
                </label>
              </h3>
              <label>
                <Input
                  value={name}
                  maxLength="60"
                  width="100%"
                  placeholder="Example: jackson11!"
                  onChange={(e) => setName(e.target.value)}
                  data-testid="name"
                />
              </label>
              <Right>
                <small> For privacy reasons, do not use your full name or email address </small>
              </Right>
            </FormItem>
            <hr />
            <FormItem>
              <h3>
                <label>
                  <span>Your email</span>
                </label>
              </h3>
              <div>
                <Input
                  type="email"
                  required
                  value={email}
                  maxLength="60"
                  placeholder="Example: jackson11@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="email"
                />
              </div>
              <Right>
                <small> For authentication reasons, you will not be emailed </small>
              </Right>
            </FormItem>
            <FormItem>
              <Right>
                <Button type="button" onClick={handleSubmit} data-testid="submit">
                  Submit review
                </Button>
              </Right>
              <AlertPopup show={show} handleClose={hideModal}>
                <Alert>Please complete the form!</Alert>
              </AlertPopup>
            </FormItem>
          </form>
        </FormContainer>
      </Scroll>
    </div>
  );
}

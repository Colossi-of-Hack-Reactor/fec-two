import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal.jsx'
// import withRangeOption from "./withRangeOption.jsx"

export default function Form({ product_id }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState('true');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setChar] = useState({});

  const handleCheck = () => {
    if (recommend === 'true') {
      setRecommend('false');
    }
    setRecommend('true');
  };

  const handleSubmit = () => {
    // console.log({product_id, summary, name, content, email});
    axios.post('/reviews', {
      product_id, summary, body, recommend, name, email,
    })
      .then(() => {
        console.log('Added a review! ');
      })
      .catch((err) => {
        console.log('axios post reviews error', err);
      });
  };

  return (
    <section>
      <header>
        <h3>✏️ Write Your Review</h3>
        {/* <h4>About the {product}</h4> */}
      </header>
      <form>
        <div>
          <label>
            Overall rating
            {/* <Stars /> */}
          </label>
        </div>
        <div>
          <label>
            Do you recommend this product?
            {' '}
            <small>Yes</small>
            {' '}
            <input name="status" type="checkbox" onChange={handleCheck} />
          </label>
        </div>
        <div>
          <label>
            Characteristics
          </label>
        </div>
        <div>
          <label>
            Review summary
            <br />
            <textarea
              value={summary}
              maxLength="60"
              placeholder="Example: Best purchase ever!"
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Review body
            <br />
            <textarea
              maxLength="1000"
              minLength="50"
              value={body}
              placeholder="Why did you like the product or not?"
              required
              autoComplete="off"
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Upload your photos
            <input
              type="text"
              name="image_id"
              placeholder="RSQadxSSW_Y"
              required
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label>
            What is your name?
            <br />
            <input
              value={name}
              maxLength="60"
              placeholder="Example: jackson11!"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <small> For privacy reasons, do not use your full name or email address </small>
          </label>
        </div>
        <div>
          <label>
            Your email
            <br />
            <input
              value={email}
              maxLength="60"
              placeholder="Example: jackson11@email.com"
              onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <small> For authentication reasons, you will not be emailed </small>
          </label>
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            Submit review
          </button>
        </div>
      </form>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import withRangeOption from "./withRangeOption.jsx"

export default function Form() {

  // const[overall, setOverall] = useState("Great");
  // 1 star - “Poor”
  // 2 stars - “Fair”
  // 3 stars - “Average”
  // 4 stars - “Good”
  // 5 stars - “Great”
  // const[recommend, setRecommend] = useState("Yes");
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');


  // useEffect(handleCheck() {
  //   if(recommend === "Yes") {
  //   setRecommend("No");
  // }
  // setRecommend("Yes");
  //   });

  // handlePost(e) {
  //   e.preventDefault();
  //   const { newEntry } = this.state;
  //   axios.post("/posts", newEntry)
  //     .then((data) => {
  //       console.log("Added a post!");
  //     })
  //     .catch((err) => console.log(err));
  //   this.props.onSubmit();
  // }

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
            <input name="status" type="checkbox" />
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
              onChange={(e) => { setSummary(e.target.value) }}
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
              value={content}
              placeholder="Why did you like the product or not?"
              required
              autoComplete="off"
              onChange={(e) => { setContent(e.target.value) }}
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
            What is your nickname?
            <br />
            <input
              value={nickname}
              maxLength="60"
              placeholder="Example: jackson11!"
              onChange={(e) => { setNickname(e.target.value) }}
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
          {/* <button type="submit" value="Submit review" onClick={this.handleSubmit} /> */}
        </div>
      </form>
    </section>
  );
}
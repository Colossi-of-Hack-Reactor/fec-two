import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RatingList from "./ratingList.jsx";
import Form from "./form.jsx";

function Ratings(props) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("relevance");

  useEffect(() => {
    axios.get('/reviews')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log('axios get reviews error', err);
      });
  }, []);

  // checkFilter () {
  //   if (filter === "")
  // };

  return (
    <div>
      <div>
        {data.length}
        {' '}
        reviews, sort by
        {' '}
        {filter}
      </div>
      <RatingList reviews={data} />
      <Form />
    </div>
  );
}

export default Ratings;

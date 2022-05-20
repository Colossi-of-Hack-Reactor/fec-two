import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Overview(props) {

  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log('axios get products error', err);
      });
  }, []);

  console.log(props);
  return (
    <>
      <button type="button" onClick={() => { setCount(count + 1); }}>
        Click to increase OVERVIEW.
      </button>
      <p>
        Overview:
        {count}
      </p>
      {data.map((d) => {
        return <p onClick={() => {props.setProduct_id(d.id)}}>{d.id}: {d.name}</p>;
      })}
    </>
  );
}

export default Overview;

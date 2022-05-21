import React, { useState } from 'react';
import Overview from './overview/overview.jsx';
import Related from './related/related.jsx';
import Questions from './questions/questions.jsx';
import Ratings from './ratings/ratings.jsx';

function App() {
  const [product_id, setProduct_id] = useState(37311);

  return (
    <>
      <h1>Hello World</h1>
      <Overview product_id={product_id} setProduct_id={setProduct_id}/>
      <Related product_id={product_id} setProduct_id={setProduct_id} />
      <Questions product_id={product_id} setProduct_id={setProduct_id} />
      <Ratings product_id={product_id} setProduct_id={setProduct_id} />
    </>
  );
}

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import Overview from './overview/overview.jsx';
import Related from './related/related.jsx';
import Questions from './questions/questions.jsx';
import Ratings from './ratings/ratings.jsx';

const root = createRoot(document.getElementById('root'));

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <Overview />
      <Related />
      <Questions />
      <Ratings />
    </>
  );
}

// render the root element with the provided component
root.render(<App />);

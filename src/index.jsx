import React from 'react';
import { createRoot } from 'react-dom/client';
import Overview from './overview/overview';
import Related from './related/related';
import Questions from './questions/questions';
import Ratings from './ratings/ratings';

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

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';

const root = createRoot(document.getElementById('root'));

// render the root element with the provided component
root.render(<App />);

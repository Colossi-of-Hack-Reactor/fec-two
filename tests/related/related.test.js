/**
 * @jest-environment jsdom
 */
//import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../../src/App.jsx'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';
// import Related from '../../src/related/related.jsx'
// import ProductCard from '../../src/related/productCard.jsx';
// import {
//   productInfo37311, productInfo37312, productInfo37313, productInfo37317, productInfo37318,
// } from './mockData/productsAPI.js';
// import { relatedProductIds, relatedProductIdsRepeat, relatedProductIdsEmpty } from './mockData/relatedAPI.js';
// import {
//   stylesProduct37312, stylesProduct37313, stylesProduct37317, stylesProduct37318,
// } from './mockData/relatedStylesAPI.js';

// let whichArray = 'normal';

// const server = setupServer(
//   rest.get('/products/:product_id/styles', (req, res, ctx) => {
//     if (req.params.product_id === '37312') {
//       return res(ctx.json(stylesProduct37312));
//     }
//     if (req.params.product_id === '37313') {
//       return res(ctx.json(stylesProduct37313));
//     }
//     if (req.params.product_id === '37317') {
//       return res(ctx.json(stylesProduct37317));
//     }
//     if (req.params.product_id === '37318') {
//       return res(ctx.json(stylesProduct37318));
//     }
//   }),
//   rest.get('/products/:product_id', (req, res, ctx) => {
//     if (req.params.product_id === '37311') {
//       return res(ctx.json(productInfo37311));
//     }
//     if (req.params.product_id === '37312') {
//       return res(ctx.json(productInfo37312));
//     }
//     if (req.params.product_id === '37313') {
//       return res(ctx.json(productInfo37313));
//     }
//     if (req.params.product_id === '37317') {
//       return res(ctx.json(productInfo37317));
//     }
//     if (req.params.product_id === '37318') {
//       return res(ctx.json(productInfo37318));
//     }
//   }),
//   rest.get('/products/:product_id/related', (req, res, ctx) => {
//     if (whichArray === 'normal') {
//       return res(ctx.json(relatedProductIds))
//     }
//     if (whichArray === 'repeat') {
//       return res(ctx.json(relatedProductIdsRepeat))
//     }
//     if (whichArray === 'empty') {
//       return res(ctx.json(relatedProductIdsEmpty))
//     }
//   })
// )
// beforeAll(() => server.listen({ unUnhandledRequest: 'error'}))
// afterAll(() => server.close())

it('Widget works when there are no repeat related items', async () => {
  //render(<Related product_id={37311} outfitsIdList={[]} outfits={{}} setProduct_id={() => { }} setOutfits={() => { }} setOutfitsIdList={() => { }} />);
  //act(() => render(<App />))
  render(<App />)
  await waitFor(() => expect(screen.getAllByAltText("white", { exact: false })).toBeDefined());
  fireEvent.click(screen.getAllByText(/dd this to my outfit/)[0])
  fireEvent.click(screen.getAllByRole('button')[0])
  fireEvent.click(screen.getAllByText(/emove/)[0])
  fireEvent.click(screen.getAllByText(/dd this to my outfit/)[0])
  screen.getAllByRole('button')[0].focus();
  // fireEvent.keyDown(document.activeElement || document.body, {key: 'Enter', code: 'Enter', charCode: 13})
  // fireEvent.keyDown(screen.getAllByRole('button')[0], {key: 'Enter', code: 'Enter', charCode: 13})
})
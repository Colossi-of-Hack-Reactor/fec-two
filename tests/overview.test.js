/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, fireEvent, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import axios from 'axios';
import App from '../src/app.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

describe('Overview component', function() {

  it('should load product 37311 by default and change to different product when clicked', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByText('id: 37311')).toBeInTheDocument();
    await user.click(screen.getByText('37312', {ignore: 'div'}));
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByText('id: 37312')).toBeInTheDocument();
  });

  it('should load number of products based on input', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.queryAllByTestId('product').length).toBe(5);
    const countInput = screen.getByRole('spinbutton', {name: "Product Count:"});
    expect(countInput).toHaveValue(5);
    await user.clear(countInput);
    await user.type(countInput, '10');
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.queryAllByTestId('product').length).toBe(10);
  });

});
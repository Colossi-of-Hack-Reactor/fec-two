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

  it('should increase the count after pressing the button', async () => {
    render(<App />);
    const user = userEvent.setup();
    expect(screen.getByText('Overview:0')).toBeInTheDocument();
    await user.click(screen.getByText('Click to increase OVERVIEW.'));
    expect(screen.getByText('Overview:1')).toBeInTheDocument();
  });

  it('should load product 37311 by default and change to different product when clicked', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.queryByText('No products.'));
    expect(screen.getByText('id:37311')).toBeInTheDocument();
    await user.click(screen.getByText('37312'));
    await waitFor(() => {
      expect(screen.getByText('id:37312')).toBeInTheDocument();
    });
  });

});
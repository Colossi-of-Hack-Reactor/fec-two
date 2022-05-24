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

  it('should disable/enable certain menus and buttons conditionally', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Add to Bag'})).toBeDisabled();
    await user.selectOptions(screen.getByRole('combobox', {name: 'Select Size'}), screen.getByRole('option', {name: 'S'}));
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).not.toBeDisabled();
    expect(screen.getByRole('button', {name: 'Add to Bag'})).not.toBeDisabled();
    await user.click(screen.getByTestId('style-1'));
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Add to Bag'})).toBeDisabled();
  })

});
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

  it('should disable/enable quantity menu based on size selection', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();
    await user.selectOptions(screen.getByRole('combobox', {name: 'Select Size'}), screen.getByRole('option', {name: 'S'}));
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).not.toBeDisabled();
  })

  it('should reset size and quantity selectors when different style is selected', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();
    await user.selectOptions(screen.getByRole('combobox', {name: 'Select Size'}), screen.getByRole('option', {name: 'S'}))
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).not.toBeDisabled();
    await user.selectOptions(screen.getByRole('combobox', {name: 'Style'}), screen.getByRole('option', {name: 'Sky Blue & White'}));
    expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();

  })
});
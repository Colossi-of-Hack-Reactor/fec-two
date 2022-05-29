/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, fireEvent, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import selectEvent from 'react-select-event';
import axios from 'axios';
import App from '../src/app.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

describe('Overview component', function() {

  it('should render properly', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByTestId('category')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('productName')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('price')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('style')).toHaveTextContent(/^STYLE > .+$/);
    expect(screen.getByTestId('styleGrid')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('sloganDescription')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('features')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('selectSizeMsg')).not.toBeVisible();
    await user.click(screen.getByTestId('qtySelect'));
    expect(screen.getByTestId('selectSizeMsg')).toBeVisible();
    await selectEvent.select(screen.getByTestId('sizeSelect'), ['S']);
    expect(screen.getByTestId('sizeSelect')).toHaveFormValues({value: 2});
    expect(screen.getByTestId('qtySelect')).toHaveFormValues({value: 2});

  });

  xit('should change displayed information when different style is chosen', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const style0 = screen.getByTestId('style').innerHTML;
    await user.click(screen.getByTestId('style-1'));
    const style1 = screen.getByTestId('style').innerHTML;
    expect(style0).not.toEqual(style1);
  });

  xit('should disable/enable certain menus and buttons conditionally', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    expect(screen.getByTestId('sizeSelect')).toHaveFormValues({});
    expect(screen.getByTestId('qtySelect')).toBeNull();

    // expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    // expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();
    // expect(screen.getByRole('button', {name: 'Add to Bag'})).toBeDisabled();
    // await user.selectOptions(screen.getByRole('combobox', {name: 'Select Size'}), screen.getByRole('option', {name: 'S'}));
    // expect(screen.getByRole('combobox', {name: 'Select Quantity'})).not.toBeDisabled();
    // expect(screen.getByRole('button', {name: 'Add to Bag'})).not.toBeDisabled();
    // await user.click(screen.getByTestId('style-1'));
    // await new Promise((r) => setTimeout(r, 500));
    // expect(screen.getByRole('combobox', {name: 'Select Size'})).toHaveValue('Select');
    // expect(screen.getByRole('combobox', {name: 'Select Quantity'})).toBeDisabled();
    // expect(screen.getByRole('button', {name: 'Add to Bag'})).toBeDisabled();
  })

});
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

describe('Ratings component', function() {
  jest.setTimeout(15000);

  it('should render properly', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByTestId('form')).not.toBeVisible();
    expect(screen.getByTestId('ratingList')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('reviewList')).not.toBeEmptyDOMElement();
    expect(screen.getByText('Relevant')).toBeVisible();
    expect(screen.getByTestId('filter')).toBeEmptyDOMElement();
    await user.click(screen.getAllByTestId('filterRating')[0]);
    expect(screen.getByTestId('filter')).not.toBeEmptyDOMElement();
    await user.click(screen.getAllByTestId('filterRating')[0]);
    expect(screen.getByTestId('filter')).toBeEmptyDOMElement();
    await user.click(screen.getByText('clear filter'));
    expect(screen.getByTestId('filter')).toBeEmptyDOMElement();
    const yesCount = screen.getAllByTestId('yesCount')[0].innerHTML
    await user.click(screen.getAllByTestId('yes')[0]);
    await new Promise((r) => setTimeout(r, 1000));
    expect(screen.getAllByTestId('yesCount')[0].innerHTML).not.toEqual(yesCount);
    await user.selectOptions(screen.getByTestId('sort'), screen.getByRole('option', {name: 'Helpful'}));
    expect(screen.getByTestId('sort')).toHaveValue('helpful');

    await user.click(screen.getByTestId('addReview'));
    expect(screen.getByTestId('form')).toBeVisible();
    expect(screen.getAllByTestId('char')[0]).toHaveValue('3');
    await user.selectOptions(screen.getAllByTestId('char')[0], screen.getAllByRole('option', {name: 'A size too small'})[0]);
    expect(screen.getAllByTestId('char')[0]).toHaveValue('1');
    await user.click(screen.getByTestId('checkbox'));
    expect(screen.getByTestId('checkbox').checked).toEqual(true)
    await user.click(screen.getByTestId('submit'));
    expect(screen.getByTestId('form')).not.toBeVisible();
    await user.type(screen.getByTestId('summary'), 'Nice product');
    expect(screen.getByTestId('summary')).toHaveValue('Nice product');
    await user.type(screen.getByTestId('body'), 'I love this product');
    expect(screen.getByTestId('body')).toHaveValue('I love this product');
    await user.type(screen.getByTestId('name'), 'Lucy Lau');
    expect(screen.getByTestId('name')).toHaveValue('Lucy Lau');
    await user.type(screen.getByTestId('email'), '23@gmail.com');
    expect(screen.getByTestId('email')).toHaveValue('23@gmail.com');
  });
});
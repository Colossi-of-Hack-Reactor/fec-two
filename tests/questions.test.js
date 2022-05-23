/* *
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, fireEvent, act, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import axios from 'axios';
import SearchBar from '../src/questions/searchbar.jsx';

axios.defaults.baseURL = 'http://localhost:3000';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Questions", () => {

  it('Render input', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText("HAVE A QUESTION? SEARCH FOR ANSWERS ... 🔍");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });
  test('should hold entered value', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.type(screen.getByRole('textbox'), 'Cory');
    expect(screen.getByRole('textbox').value).toBe('Cory')

  })


});

/* it('Should store value enter in search in component state', async () => {
  const user = userEvent.setup()
  render(<SearchInput />);
  const inputElement = screen.getByTestId("questionSearchForm");
  userEvent.type(inputElement, "cory");
  fireEvent.submit(getByTestId("questionSearchForm"));
  expect(handleSubmit.callCount).to.equal(1);
}) */
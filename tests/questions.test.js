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

/* *
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, fireEvent, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import axios from 'axios';
import App from '../src/app.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

describe('Questions component', function() {
  jest.setTimeout(15000);
  it('should render properly', async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getAllByTestId('addAnswer')).toBeDefined()
    expect(screen.getAllByTestId('moreQ')).toBeDefined()
    expect(screen.getAllByTestId('searchbar')).toBeDefined()
    await user.click(screen.getByTestId('addQuestion'));
    expect(screen.getByTestId('questionModal')).toBeVisible();
    expect(screen.getByTestId('nameInput')).toBeVisible()
    expect(screen.getByText('Submit')).toBeVisible()
    expect(screen.getByText('Cancel')).toBeVisible()
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[0]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[1]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[2]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[3]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[4]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[6]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[7]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[8]));
    await waitFor(() => userEvent.click(screen.getAllByText('Yes')[9]));

    await user.click(screen.getByTestId('moreQ'));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[0]));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[1]));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[2]));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[3]));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[4]));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[5]));
    await waitFor(() => userEvent.click(screen.getAllByText('| AddAnswer')[6]));

    await user.click(screen.getAllByText('Submit')[0])
    await user.click(screen.getAllByText('Submit')[1])
    await user.click(screen.getAllByText('Cancel')[0])
    await user.click(screen.getAllByText('Cancel')[1])
    expect(screen.queryByTestId('questionModal')).toBeInTheDocument();
    await user.click(screen.getByTestId('moreQ'));
    expect(screen.queryByText('ShowLess')).not.toBeInTheDocument();
  })
});
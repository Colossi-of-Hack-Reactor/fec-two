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


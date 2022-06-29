import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import SinglePage from './components/SinglePage';

test('renders SinglePage module', () => {
  render(<App />);
  expect(<SinglePage/>).toBeInTheDocument();
});

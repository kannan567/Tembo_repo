import { render, screen } from '@testing-library/react';
import App from '../src/App';

/**
 * @file App.test.js
 * @description Unit tests for the App component
 * @type {import('@testing-library/react').RenderResult}
 */

test('renders Sample App heading', () => {
  render(<App />);
  const heading = screen.getByText(/Sample App/i);
  expect(heading).toBeInTheDocument();
});

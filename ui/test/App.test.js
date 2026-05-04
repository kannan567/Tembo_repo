import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders Sample App heading', () => {
  render(<App />);
  const heading = screen.getByText(/Sample App/i);
  expect(heading).toBeInTheDocument();
});

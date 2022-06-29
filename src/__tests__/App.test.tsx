import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../components/SinglePage', () =>{
  const SinglePage = () => <></>;
  return SinglePage;
})

test('renders author info correctly', () => {
  render(<App />);
  expect(screen.getByText(/by Tomasz Lipczyński/i)).toBeInTheDocument();
});

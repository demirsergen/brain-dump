import { render } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const container = document.getElementById('home');

    expect(container).toBeInTheDocument();
  });
});

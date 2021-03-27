import { render, screen } from '@testing-library/react';
import App from './layouts/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Test trzymamy w tym samym folderze, co testowany plik.
// Ten test jest nieaktualny, prawda?
// Monika, jak powaznie podchodzisz do nauki reacta? Rozwazasz pisanie testow? 

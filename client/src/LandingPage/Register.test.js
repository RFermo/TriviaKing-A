import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';

test('renders Trivia King title', () => {
    render(<Register />);
    const elem = screen.getByText('Trivia King');
    expect(elem).toBeInTheDocument();
});

test('renders form', () => {
    render(<Register />);
    const elem = screen.getByTestId('registerForm');
    expect(elem).toBeInTheDocument();
});

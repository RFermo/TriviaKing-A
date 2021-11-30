import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';

const MockRegister = () => {
    return (
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
};

describe('Element rendering and passing values to inputs', () => {

    test('renders Trivia King title', () => {
        render(<MockRegister />);
        const elem = screen.getByText('Trivia King');
        expect(elem).toBeInTheDocument();
    });
    
    test('renders form', () => {
        render(<MockRegister />);
        const elem = screen.getByTestId('registerForm');
        expect(elem).toBeInTheDocument();
    });

    test('pass name to input field', () => {
        render(<MockRegister />);
        const nameInput = screen.getByTestId("name-field");
        userEvent.type(nameInput, "RFermo");
        expect(nameInput).toHaveValue("RFermo");
    });

    test('pass email to input field', () => {
        render(<MockRegister />);
        const emailInput = screen.getByTestId("email-input");
        userEvent.type(emailInput, "rfermo@gmail.com");
        expect(emailInput).toHaveValue("rfermo@gmail.com");
    });

    test('pass password to input field', () => {
        render(<MockRegister />);
        const passwordInput = screen.getByTestId("password-field");
        userEvent.type(passwordInput, "Del4cro1x");
        expect(passwordInput).toHaveValue("Del4cro1x");
    });
});

describe("Signing up functionality", () => {

    test('no error message on signing up', async () => {
        render(<MockRegister />);

        // Mock the user typing data

        const signupbtn = screen.getByTestId("signup");
        const nameInput = screen.getByTestId("name-field");
        userEvent.type(nameInput, "my_username");
        const emailInput = screen.getByTestId("email-input");
        userEvent.type(emailInput, "rfermo@gmail.com");
        const passwordInput = screen.getByTestId("password-field");
        userEvent.type(passwordInput, "Del4cro1x");

        // Fire the async event
        fireEvent.click(signupbtn);

        // We expect the signup_error to be hidden since the user was successfully signed up
        const signup_error = await screen.findByTestId("signup_error");
        expect(signup_error).toHaveClass("hidden");
    });
});


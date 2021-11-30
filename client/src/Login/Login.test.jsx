import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
};

describe('Passing values to login', () => {

    test('pass username to input field', () => {
        render(<MockLogin />);
        const username = screen.getByTestId("username-field");
        userEvent.type(username, "RFermo");
        expect(username).toHaveValue("RFermo");
    });

    test('pass password to input field', () => {
        render(<MockLogin />);
        const password = screen.getByTestId("password-field");
        userEvent.type(password, "Del4cro1x");
        expect(password).toHaveValue("Del4cro1x");
    });
});
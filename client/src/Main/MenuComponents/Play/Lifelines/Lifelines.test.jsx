import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Lifelines from './Lifelines';
import { BrowserRouter } from 'react-router-dom';

const MockLifelines = () => {
    return (
        <BrowserRouter>
            <Lifelines />
        </BrowserRouter>
    );
};

describe('Lifeline integration test', () => {

    test('50-50 working test', () => {
        render(<MockLifelines />);
        const lifelineSystem = screen.getByTestId("50-50");
        expect(lifelineSystem).toBeInTheDocument();
    });

    test('change working test', () => {
        render(<MockLifelines />);
        const lifelineSystem = screen.getByTestId("changeQ");
        expect(lifelineSystem).toBeInTheDocument();
    });
});
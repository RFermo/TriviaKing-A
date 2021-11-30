import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Play from './Play';
import { BrowserRouter } from 'react-router-dom';

const MockPlay = () => {
    return (
        <BrowserRouter>
            <Play />
        </BrowserRouter>
    );
};

describe('Play integration test', () => {

    test('Start playing button', () => {
        render(<MockPlay />);
        const button = screen.getByTestId("playbtn");
        expect(button).toBeInTheDocument();
    });
});




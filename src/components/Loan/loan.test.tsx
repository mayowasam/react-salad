import React from 'react';
import { cleanup, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import Loan , {Phone, LoanComponent } from './loan';
import { Api } from '../../scripts/endpoints'; // Adjust import path as necessary
import Providers from '../../scripts/providers';
import { useQuery } from '@tanstack/react-query';


export function useCustomHook() {
    return useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' })
  }

const mockSetCurrent = jest.fn();
const mockHandler = jest.fn();

jest.mock('../../scripts/localstorage', () => ({
    handler: jest.fn((...args) => mockHandler(...args))
}));


beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    }));
});

afterEach(cleanup)

describe('Phone Component', () => {
    beforeEach(() => {
        render(<Phone current={0} setCurrent={mockSetCurrent} />);
    });

    test('renders the Phone component', () => {
        expect(screen.getByText('Getting Started')).toBeTruthy();
        expect(screen.getByLabelText('Phone Number')).toBeTruthy();
        expect(screen.getByText('Continue')).toBeTruthy();
    });

    test('submits the form with valid input', async () => {
        fireEvent.change(screen.getByPlaceholderText('Enter phone number'), { target: { value: '08099770290' } });
        fireEvent.click(screen.getByText('Continue'));

        await waitFor(() => {
            expect(mockHandler).toHaveBeenCalledWith('salad-widget-loan', {
                phone: '+2348099770290',
                loan_type: 'salad_loan',
            });
            expect(mockSetCurrent).toHaveBeenCalledWith(1);
        });
    });

    test('shows validation error for empty phone number', async () => {
        fireEvent.click(screen.getByText('Continue'));

        expect(await screen.findByText('Please input your phone number!')).toBeTruthy();
    });
});


describe('Loan', () => {
    test('renders the initial step (Phone)', () => {
        render(<Loan name='Reposebay'/>);

        expect(screen.getByText('Getting Started')).toBeTruthy();
    });

    test('advances to the next step on successful form submission', async () => {
        render(<Loan name='Reposebay'/>);

        // Navigate to the Phone step
        expect(screen.getByText('Getting Started')).toBeTruthy();

        // Fill and submit the form
        fireEvent.change(screen.getByPlaceholderText('Enter phone number'), { target: { value: '1234567890' } });
        fireEvent.click(screen.getByText('Continue'));

        await waitFor(() => {
            expect(screen.getByText('OTP Verification')).toBeTruthy();
        });
    });

    test('test the loan component', async () => {
        const WrappedLoanComponent = () => <Providers><LoanComponent/></Providers>
        render(<WrappedLoanComponent/>);

        // checking the onfinish
        const { result } = renderHook(() => useCustomHook(), {wrapper: Providers });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));


        // Fill and submit the form
        
    });
});


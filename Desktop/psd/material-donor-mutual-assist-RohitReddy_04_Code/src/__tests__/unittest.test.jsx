// __tests__/unittests.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Components/Login';

describe('Login Component', () => {
  test('renders login form correctly', () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    const emailInput = getByLabelText('Email address');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Submit');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates input value', () => {
    // Render the Login component
    const { getByLabelText } = render(<Login />);
    
    // Get input elements by their respective labels
    const emailInput = getByLabelText('Email address');
    const passwordInput = getByLabelText('Password');
  
    // Simulate user input by changing the input values
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  
    // Check if the input values are updated correctly
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');
  });

  

  test('handles form submission correctly with valid credentials', async () => {
    const fakeAuthToken = 'fakeAuthToken';
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true, authtoken: fakeAuthToken }),
    });

    const { getByLabelText, getByText } = render(<Login />);

    const emailInput = getByLabelText('Email address');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(localStorage.getItem('token')).toEqual(fakeAuthToken));
    expect(window.location.href).toBe('http://localhost/');
  });

});
